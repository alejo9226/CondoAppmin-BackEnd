const Resident = require('../models/resident.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { transporter } = require('../utils/mailer')
module.exports = {
  async create(req, res) {
    try {
      const { password } = req.body
      console.log('body', req.body)
      const encPassword = await bcrypt.hash(password, 8)
      const resident = await Resident.create({
        ...req.body,
        password: encPassword,
      })
      await transporter.sendMail({
        from: '"Administración <admon.condoapp@gmail.com>"',
        to: req.body.email,
        subject: `Administración: Tu cuenta de CondoApp`,
        html: `
        <div>
            <h3>Hola ${req.body.name}</h3>
            <p>Una vez más te damos la bienvenida.</p>
            
           <p> Siempre pensando en la comodidad de nuestros residentes y
            brindarles servicios de calidad, te queremos presentar <a>CondoApp.com</a>,
            un espacio virtual en donde podrás reservar los espacios de recreación, estar enterado de
            todas las noticias de nuestro conjunto, establecer una conversación con administración para solicitar reparaciones,
            resolver dudas y solucionar requerimientos.</p>
            
            <p>A continuación te entregamos tu usuario y contraseña (Te recomendamos cambiarla al iniciar sesión):
            <ul>
              <li>usuario: ${req.body.email}</li>
              <li>Contraseña: ${req.body.password}</li>
            </ul>
            </p>
            <p></p>
            <p></p>
            <p></p>
            <p>¡Juntos contruiremos una gran convivencia!</p>
            <p></p>
            <p></p>
            <p>ADMINISTRACIÓN</p>
        </div>`,
      })
      res.status(201).json({ message: 'Resident Created!', data: resident })
    } catch (err) {
      console.log(err)
      res.status(400).json({
        message: 'Something went wrong! Resident not created',
        data: err,
      })
    }
  },
  async authenticate(req, res) {
    try {
      const resId = req.user
      const resident = await Resident.findOne({ _id: resId }).populate(
        'condoId',
        '_id name'
      )
      res.status(200).json({
        message: 'resident found',
        name: resident.name,
        id: resident._id,
        email: resident.email,
        condoId: resident.condoId._id,
        condoName: resident.condoId.name,
      })
    } catch (err) {
      res.status(400).json({ message: 'admins could not be found' })
    }
  },
  async show(req, res) {
    try {
      const { condoid } = req.params

      const residents = await Resident.find({ condoId: condoid }).populate(
        'unitId',
        'name'
      )
      res.status(200).json({ message: 'Residents found', data: residents })
    } catch (err) {
      res
        .status(400)
        .json({ message: 'Residents could not be found', data: err })
    }
  },
  async showOne(req, res) {
    try {
      const { residentid } = req.params

      const resident = await Resident.find({ _id: residentid }).populate(
        'unitId',
        'name'
      )
      res.status(200).json({ message: 'Resident found', data: resident })
    } catch (err) {
      res
        .status(400)
        .json({ message: 'Resident could not be found', data: err })
    }
  },
  async foundEmail(req, res) {
    try {
      const { email } = req.body
      const resident = await Resident.findOne({ email: email })
      res.status(200).json({
        message: 'Email found',
        id: resident._id,
      })
    } catch (err) {
      res.status(400).json({ message: 'Email not found', data: err })
    }
  },

  async signin(req, res) {
    try {
      const { email, password } = req.body
      const resident = await Resident.findOne({ email })

      if (!resident) {
        throw new Error('Usuario o contraseña invalida')
      }

      const isValid = await bcrypt.compare(password, resident.password)

      if (!isValid) {
        throw new Error('Usuario o contraseña invalida')
      }

      const token = jwt.sign(
        {
          id: resident._id,
        },
        process.env.SECRET,
        {
          expiresIn: 60 * 60 * 24,
        }
      )

      res.status(200).json({ token, name: resident.name })
    } catch (err) {
      res.status(401).json({ message: err.message })
    }
  },
  async list(req, res) {
    try {
      const residents = await Resident.find()
      res.status(200).json({ message: 'Residents found', data: residents })
    } catch (err) {
      res.status(400).json({ message: 'Residents could not be found' })
    }
  },
  async deleteAll(req, res) {
    try {
      const deletedMessages = await Resident.deleteMany({})
      res
        .status(200)
        .json({ message: 'Residents deleted', data: deletedMessages })
    } catch (err) {
      res.status(400).json({ message: 'Residents could not be deleted' })
    }
  },
  async deleteOne(req, res) {
    try {
      const { residentid } = req.params

      const deletedResident = await Resident.findByIdAndDelete({
        _id: residentid,
      })
      res
        .status(200)
        .json({ message: 'Resident deleted', data: deletedResident })
    } catch (err) {
      res
        .status(400)
        .json({ message: 'Resident could not be deleted', data: err })
    }
  },
  async update(req, res) {
    try {
      const { residentid } = req.params
      const updatedResident = await Resident.findByIdAndUpdate(
        residentid,
        req.body
      )
      res
        .status(200)
        .json({ message: 'Resident updated', data: updatedResident })
    } catch (err) {
      res
        .status(400)
        .json({ message: 'Resident not updated', data: err.message })
    }
  },
}

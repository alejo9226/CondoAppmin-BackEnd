const nodemailer = require('nodemailer')
require('dotenv').config()

exports.transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
})
exports.verify = async (transporter) => {
  const connection = await transporter.verify()
  if (connection) console.log('Email server ready')
}

exports.residentWelcome = (condoName, userName, userEmail, userPassword) => {
  return {
    from: `"${condoName}" <${process.env.USER_EMAIL}>`,
    to: userEmail,
    subject: `Administración: Tu cuenta de CondoApp`,
    html: `
    <div>
        <h3>Hola ${userName}</h3>
        <p>Una vez más te damos la bienvenida.</p>
        
        <p> Siempre pensando en la comodidad de nuestros residentes y
          brindarles servicios de calidad, te queremos presentar <a>CondoApp.com</a>,
          un espacio virtual en donde podrás reservar los espacios de recreación, estar enterado de
          todas las noticias de nuestro conjunto, establecer una conversación con administración para solicitar reparaciones,
          resolver dudas y solucionar requerimientos.</p>
          
        <p>A continuación te entregamos tu usuario y contraseña (Te recomendamos cambiarla al iniciar sesión):
        <ul>
          <li>usuario: ${userEmail}</li>
          <li>Contraseña: ${userPassword}</li>
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
  }
}
exports.adminWelcome = (userName, userEmail, userPassword) => {
  return {
    from: `"CondoAppmin Team" <${process.env.USER_EMAIL}>`,
    to: userEmail,
    subject: `Administración: Tu cuenta de CondoApp`,
    html: `
    <div>
        <h3>Hola ${userName}</h3>
        <p>Una vez más te damos la bienvenida.</p>
        
        <p> Siempre pensando en la comodidad de nuestros usuarios te queremos presentar <a href="#">CondoApp.com</a>,
          un espacio virtual en donde podrás administrar tu conjunto residencial.</p>
          
        <p>A continuación te entregamos tu usuario y contraseña (Te recomendamos cambiarla al iniciar sesión):
        <ul>
          <li>Usuario: ${userEmail}</li>
          <li>Contraseña: ${userPassword}</li>
        </ul>
        </p>
        <p>¡Juntos contruiremos una gran convivencia!</p>
        <p>CondoAppmin CEO</p>
        <p>Alejandro Alfaro</p>
    </div>`,
  }
}
exports.residentPayment = (userName, userEmail, condoName, service, period, dueDate) => {
  return {
    from: `"${condoName}" <${process.env.USER_EMAIL}>`,
    to: userEmail,
    subject: `Tienes un nuevo pago pendiente de ${service}`,
    html: `
    <div>
        <h3 style='color:red;'>Hola ${userName}</h3>
        <p>Tienes un pago pendiente de ${service}.
        De acuerdo a los términos del conjunto estamos generando el pago de 
        ${service} del mes de ${period}
        </p>
        <p>De acuerdo a lo que se ha definido en el conjunto el ultimo
        plazo para pago es: ${dueDate} 
        </p>
        <p>Para hacer el pago haz click <a href="#">aquí</a></p>
        <p>¡Juntos contruiremos una gran convivencia!</p>
        <p></p>
        <p></p>
        <p>ADMINISTRACIÓN</p>
    </div>`,
  }
}
exports.residentPaymentReminder = (condoName, resident, payment, message) => {
  return {
    from: `"${condoName}" <${process.env.USER_EMAIL}>`,
    to: resident.email,
    subject: `Recordatorio de pago de ${payment.service}`,
    html: `
    <div>
        <h3 style='color:red;'>Hola ${resident.name}</h3>
        <p>De acuerdo a lo que se ha definido en el conjunto el ultimo
        plazo para tu pago es: ${payment.dueDate} 
        <p>${message}.
        No olvides que el pago oportuno de ${payment.service} se puede hacer hasta ${payment.dueDate} 
        Si deseas puedes hacer el pago a través de la plataforma o también a través de este 
        <a href="#">link</a>
        </p>
    
        <p>¡Juntos contruiremos una gran convivencia!</p>
        <p></p>
        <p></p>
        <p>ADMINISTRACIÓN</p>
    </div>`,
  }
}
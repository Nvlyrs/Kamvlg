"use strict"

require('dotenv').config();
const nodemailer = require("nodemailer");

let main = async function send(data = {}){  
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
    });

    transporter.sendMail({
      form: "peskovatzkov.vs@gmail.com",
      to: "peskovatzkov.vs@gmail.com",
      subject: "Письмо от клиента",
      html: `
             <h1>Пользователь предоставил следующие данные:</h1>
             <p><b>Имя:</b> ${data.name} </p> 
             <p><b>Электронная почта:</b> ${data.email}</p>
             <p><b>Телефон:</b> ${data.tel ? data.tel : 'Телефон не указан'} </p>
             <p><b>Время:</b> ${data.time ? data.time : 'Время не указано'} </p>
             <p><b>Согласие на рассылку:</b> ${data.mailing === 'on' ? 'Есть' : 'Нет'} </p>
            `
      }, 
      (error) => {
        console.error(error);
      });
      console.log("Отправленно!");
}

module.exports = main;
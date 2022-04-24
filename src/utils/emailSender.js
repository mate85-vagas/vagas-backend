import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const checkLanguageAndResume = async (profile) => {
  let language = '';
  let resume = '';
  if (profile.languages) {
    language = profile.languages;
  } else {
    language = 'Não informado';
  }
  if (profile.linkResume) {
    resume = profile.linkResume;
  } else {
    resume = 'Não informado';
  }
  return [language, resume];
};
const buildMailOptions = async (userApplier, userReceiver, profileUserApplier, jobToApply) => {
  const languageAndResume = await checkLanguageAndResume(profileUserApplier);
  const languages = languageAndResume[0];
  const resume = languageAndResume[1];
  let mailOptions = {
    from: process.env.LOGIN,
    to: userReceiver.email,
    subject: `Aplicação para a vaga ${jobToApply.title}`,
    html: `<p>Olá ${userReceiver.name},</p>
        <p></p>
        <p>O usuário de nome <b>${userApplier.name}</b> aplicou para a vaga entitulada <b>${jobToApply.title}</b></p>
        <p></p>
        <p> Abaixo algumas informações sobre o usuário que podem ser úteis:</p>
        <p></p>
        <p><b>Escolaridade</b>: ${profileUserApplier.scholarity}</p>
        <p><b>Habilidade</b>: ${profileUserApplier.knowledge}</p>
        <p><b>Tecnologias conhecidas</b>: ${profileUserApplier.technologies}</p>
        <p><b>Idiomas conhecidos</b>: ${languages}</p>
        <p><b>E-mail para contato</b>: ${userApplier.email}</p>
        <p><b>Link para currículo online</b>: ${resume}</p>
        <p></p>
        <p>Obs: este é um e-mail automático, favor não responder. Qualquer contato deve ser feito diretamente ao aplicante.</p>`
  };
  return mailOptions;
};

export const mail_sender = async (userApplier, userReceiver, profileUserApplier, jobToApply) => {
  try {
    const mailOptions = await buildMailOptions(userApplier, userReceiver, profileUserApplier, jobToApply);
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.LOGIN,
        pass: process.env.PASSWORD
      }
    });
    transporter.sendMail(mailOptions, function (err, info) {
      return err || info;
    });
  } catch (e) {
    throw new Error(e);
  }
};

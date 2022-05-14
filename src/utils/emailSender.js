import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import fs from 'fs';

dotenv.config();

const returnScholarityFullDescription = (scholarity) => {
  if (scholarity == 'supc') return 'Superior Completo';
  else if (scholarity == 'supinc') return 'Superior Incompleto';
  else return 'Pós-Graduação';
};

const splitArrayByComma = (value) => {
  return value.split(';').join(', ');
};

const htmlSetup = (userApplier, userReceiver, profileUserApplier, jobToApply) => {
  try {
    let html = fs.readFileSync('./././email.html', 'utf8');
    const languageAndResume = checkLanguageAndResume(profileUserApplier);
    const languages = languageAndResume[0];
    const resume = languageAndResume[1];
    html = html.replace('${userReceiver.name}', userReceiver.name);
    html = html.replace('${userApplier.name}', userApplier.name);
    html = html.replace('${jobToApply.title}', jobToApply.title);
    html = html.replace('${knowledge}', splitArrayByComma(profileUserApplier.knowledge));
    html = html.replace('${scholarity}', returnScholarityFullDescription(profileUserApplier.scholarity));
    html = html.replace('${technologies}', splitArrayByComma(profileUserApplier.technologies));
    html = html.replace('${profile.languages}', languages);
    html = html.replace(
      '${email}',
      `<a style="color: white" href="mailto:${userApplier.email}"> ${userApplier.email} </a>`
    );
    html = html.replace('${profile.resume}', resume);
    html = html.replace(
      '${contato}',
      `Para entrar em contato com o aplicante, <a style="color: white" href="mailto:${userApplier.email}"> clique aqui </a>.`
    );
    console.log(profileUserApplier.technologies);
    return html;
  } catch (e) {
    throw Error(e);
  }
};

const checkLanguageAndResume = (profile) => {
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

const buildMailOptions = (userReceiver, jobToApply, htmlEmail) => {
  let mailOptions = {
    from: process.env.LOGIN,
    to: userReceiver.email,
    subject: `Aplicação para a vaga ${jobToApply.title}`,
    html: htmlEmail
  };
  return mailOptions;
};

export const mail_sender = async (userApplier, userReceiver, profileUserApplier, jobToApply) => {
  try {
    let htmlEmail = htmlSetup(userApplier, userReceiver, profileUserApplier, jobToApply);
    const mailOptions = buildMailOptions(userReceiver, jobToApply, htmlEmail);
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.LOGIN,
        pass: process.env.PASSWORD
      }
    });
    return transporter.sendMail(mailOptions, function (err, info) {
      return err || info;
    });
  } catch (e) {
    throw new Error(e);
  }
};

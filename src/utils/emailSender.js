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
      `Para entrar em contato com o aplicante, <a style="color: white" href="mailto:${userApplier.email}"> clique aqui.</a>`
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
      service: 'outlook',
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

export const inviteMail = async (newUserEmail) => {
  try {
    let html = fs.readFileSync('./././inviteEmail.html', 'utf8');
    html = html.replace('${link}', process.env.SIGNUP_URL);
    let mailOptions = inviteMailOptions(newUserEmail, html);
    var transporter = nodemailer.createTransport({
      service: 'outlook',
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

const inviteMailOptions = (newUserEmail, html) => {
  let mailOptions = {
    from: process.env.LOGIN,
    to: newUserEmail,
    subject: `Convite para Talentos-IC`,
    html: html
  };
  return mailOptions;
};

export const recoveryMail = async (email, token) => {
  try {
    let html = fs.readFileSync('./././recoveryMail.html', 'utf8');
    html = html.replace('${link}', process.env.RECOVERY_URL + token);
    let mailOptions = recoveryMailOptions(email, html);
    var transporter = nodemailer.createTransport({
      service: 'outlook',
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

const recoveryMailOptions = (email, html) => {
  let mailOptions = {
    from: process.env.LOGIN,
    to: email,
    subject: `Recuperação de Senha (Talentos-IC)`,
    html: html
  };
  return mailOptions;
};

export const emailsListMail = async(job, emailsLists) => {
  try{
    let html = fs.readFileSync('./././vagaCriada.html', 'utf-8');
    html = html.replace('${description}', job.description);
    let tipo = {  
      "estagio": 'Estágio',
      "trabalho": 'Trabalho',
      "iniccient": 'Iniciação Cientifica',
      "tcc": 'TCC',
      "mestrado": 'Mestrado',
      "doutorado": 'Doutorado',
      "extensao": 'Extensão',
      "pesquisa": 'Pesquisa',
      "complementar": 'Complementar',
      "outro": 'Outro'
    }
    html = html.replace('${type}', tipo[job.type])
    html = html.replace('${site}', job.site);
    html = html.replace('${workload}', job.workload);
    html = html.replace('${salary}', job.salary);
    let escol = {
      "notgrad": 'Não Graduado',
      "supinc": 'Superior Incompleto',
      "supc": 'Superior Completo',
      "posgrad": 'Pós-Graduação'
    }
    const escolaridade = job.scholarity
    html = html.replace('${scholarity}', escol[escolaridade]);
    html = html.replace('${titulo}', job.title)
    html = html.replace('${link}', process.env.URL_VAGA + (job.id).toString())
    let mailOptions = emailsListMailOptions(html, emailsLists)
    var transporter = nodemailer.createTransport({
      service: 'outlook',
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

const emailsListMailOptions = (html, emailsLists) => {
  let mailOptions = {
    from: process.env.LOGIN,
    to: emailsLists,
    subject: `Nova Vaga disponível! (Talentos IC)`,
    html: html
  }
  return mailOptions
};

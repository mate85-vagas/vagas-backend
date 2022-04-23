import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import fs from 'fs';
import Hogan from 'hogan.js'

dotenv.config();

const htmlSetup = async (userApplier, userReceiver,
    profileUserApplier, jobToApply) => {
        try {
            let html = fs.readFileSync('./././email.html', 'utf8')
            const languageAndResume = await checkLanguageAndResume(profileUserApplier)
            const languages = languageAndResume[0]
            const resume = languageAndResume[1]
        html = html.replace('${userReceiver.name}', userReceiver.name)
        html = html.replace('${userApplier.name}', userApplier.name)
        html = html.replace('${jobToApply.title}', jobToApply.title)
        html = html.replace('${profileUserApplier.knowledge}',
            profileUserApplier.knowledge)
        html = html.replace('${profileUserApplier.scholarity}',
            profileUserApplier.scholarity)
        html = html.replace('${profileUserApplier.technologies}',
            profileUserApplier.technologies)
            html = html.replace('${languages}', languages)  
            html = html.replace('${userApplier.email}', userApplier.email)
            html = html.replace('${resume}', resume)
            return html
        } 
      catch (e) {
          throw Error(e)
      }
}

const checkLanguageAndResume = async (profile) => {
    let language = ''
    let resume = ''
    if (profile.languages){
        language = profile.languages
    }
    else {
        language = "Não informado"
    }
    if (profile.linkResume){
        resume = profile.linkResume
    }
    else {
        resume = "Não informado"
    }
    return [language, resume]
}

const buildMailOptions = async (
        userReceiver, jobToApply, htmlEmail) => {
    let mailOptions = {
        from: process.env.LOGIN,
        to: 'brunodipaolo12@gmail.com',
        subject: `Aplicação para a vaga ${jobToApply.title}`,
        html: htmlEmail
    };
    return mailOptions;
}

export const mail_sender = async (
    userApplier, userReceiver,
    profileUserApplier, jobToApply) => {
    try{
        let htmlEmail = await htmlSetup(userApplier, userReceiver,
            profileUserApplier, jobToApply) 
        const mailOptions = await buildMailOptions(
            userReceiver, jobToApply, htmlEmail)
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.LOGIN, 
                pass: process.env.PASSWORD 
            },
        });
        transporter.sendMail(mailOptions, function (err, info) {
            return err || info
         });
    }
    catch (e){
        throw new Error(e)
    }
}
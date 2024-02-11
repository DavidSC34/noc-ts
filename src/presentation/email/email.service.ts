
import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugins';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';



interface SendMailOptions{
    to:string | string [];
    subject:string;
    htmlBody:string;
    attachments?: Attachment[];
}

interface Attachment{
    fileName:string;
    path:string;
}


// todo: Attachment

export class EmailService{

    private transporter = nodemailer.createTransport({
        service:envs.MAILER_SERVICE,
        auth:{
            user:envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });
    //inyeccion de dependencias
    // constructor(
    //     private readonly logRepository: LogRepository,
    // ){}


    async sendEmail(options:SendMailOptions):Promise<boolean>{
        const {to,subject,htmlBody,attachments=[]} = options;

        try {
            const sentInformation = await this.transporter.sendMail({
                to:to,
                subject:subject,
                html:htmlBody,
                attachments:attachments,
            });
             // console.log(sentInformation);
            const log = new LogEntity({
                message:'email sent',
                level: LogSeverityLevel.low,
                origin:'email.service.ts'
            });
          
            return true;
        } catch (error) {

            const log =new LogEntity({
                message:'email not sent',
                level: LogSeverityLevel.heigh,
                origin:'email.service.ts'
            });
         
            return false;   
        }


    }

     async sendEmailWithFileSystemLogs(to:string | string[]){
            const subject ='Logs del servidor';
            const htmlBody=`
             <h3>Logs de sistema - NOC</h3>
             <p>lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum</p>
             <p>Ver logs adjuntos</p>
            `;

            const attachments:Attachment[]=[
                {fileName:'logs-all.log',path:'./logs/logs-all.log'},
                {fileName:'logs-high.log',path:'./logs/logs-high.log'},
                {fileName:'logs-medium.log',path:'./logs/logs-medium.log'},
            ];


           return this.sendEmail({
                    to,
                    subject,
                    attachments,
                    htmlBody
            });
    }

}
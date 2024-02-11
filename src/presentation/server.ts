import { envs } from "../config/plugins/envs.plugins";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repository/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from './email/email.service';


const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
);

const emailService = new EmailService();


export class Server{
    public static start(){
        console.log('Server started...');
        // console.log(envs.MAILER_SECRET_KEY, envs.MAILER_EMAIL);
      
        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute(
        //     [ 'peter.palmer.1137@gmail.com', 'leonardwil37@gmail.com']
        // );
      
        // emailService.sendEmail({
        //     to:'peter.palmer.1137@gmail.com',
        //     subject:'Logs del sistema NOC',
        //     htmlBody:`
        //      <h3>Logs de sistema - NOC</h3>
        //      <p>lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum</p>
        //      <p>Ver logs adjuntos</p>
        //     `,
        // });

        // emailService.sendEmailWithFileSystemLogs([
        //     'peter.palmer.1137@gmail.com',
        //     'leonardwil37@gmail.com'
        // ]);
        
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     ()=>{
        //         const url = 'http://google.com';
        //         new CheckService(
        //             fileSystemLogRepository,
        //             ()=>console.log(`${url} is ok`),
        //             (error)=>console.log(error),
        //         ).execute(url);
        //         // new CheckService().execute('http://localhost:3000/posts');
        //     }
        // );
       
       




    }


}
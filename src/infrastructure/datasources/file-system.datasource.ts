import  fs  from "fs";
import { LogDatasource } from "../../domain/datasources/log.datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class FileSystemDatasource implements LogDatasource{
    
    private readonly logPath = 'logs';
    private readonly allLogsPath =  'logs/logs-all.log';
    private readonly mediumLogsPath =  'logs/logs-medium.log';
    private readonly highLogsPath =  'logs/logs-high.log';
    
    //Debemos asegurarnos que los directorios existan y se pueda granar, entonces usamos un constructor
    constructor(){
        this.createLogsFiles();
    }

    private createLogsFiles = ()=>{
        if(!fs.existsSync(this.logPath)){
            fs.mkdirSync(this.logPath);
        }
        //asegurar los demas archivos esten creados
        [
            this.allLogsPath, 
            this.mediumLogsPath, 
            this.highLogsPath, 
        ].forEach(path=>{
            if(fs.existsSync(path)) return;
              fs.writeFileSync(path,'');
        });
        
        // if(fs.existsSync(this.allLogsPath)) return;         
        //   fs.writeFileSync(this.allLogsPath,'');
        
    }


    async saveLog(newLog: LogEntity): Promise<void> {
        
        const logAsJson =`${JSON.stringify(newLog)}\n`;

        fs.appendFileSync(this.allLogsPath,logAsJson); //sin importar la severidad aqui caen todos

        if(newLog.level === LogSeverityLevel.low) return;

        if(newLog.level === LogSeverityLevel.medium){
            fs.appendFileSync(this.mediumLogsPath,logAsJson); 
        }else{
            fs.appendFileSync(this.highLogsPath,logAsJson); 
        }        
        
        
    }
    getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }
    
}
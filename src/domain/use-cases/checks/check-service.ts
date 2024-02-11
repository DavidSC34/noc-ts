import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';
interface CheckServiceUseCase{
    execute(url:string):Promise<boolean>;
}

type SuccessCallback = (()=>void) | undefined;
type ErrorCallback = ((error:string)=> void) | undefined;


//este metodo no es estatico, por que se requiere una inyeccion para implementarlo
export class CheckService implements CheckServiceUseCase{

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCalback :SuccessCallback,
        private readonly erroCallback: ErrorCallback
    ){}

   public async execute(url: string): Promise<boolean> {
       try {
        const req = await fetch(url);

        if(!req.ok){
            throw new Error(`Error on check service ${url}`);
        }
        const log = new LogEntity({message:`Serice ${url} working`,level: LogSeverityLevel.low,origin:'check-service.ts'});
        this.logRepository.saveLogs(log);
        this.successCalback && this.successCalback(); //forma corta de un if de si existe la y si si llamala
        // console.log(`${url} is ok`);
        return true;
       
    } catch (error) {
         
        const errorMessage = `${url} is not ok .${error}`;
         const log = new LogEntity({message:errorMessage,level: LogSeverityLevel.heigh, origin:'check-service.ts'});
         this.logRepository.saveLogs(log);
         this.erroCallback && this.erroCallback(`${error}`);
         return false;
    }

   }

    
}
import { create } from "domain";

export enum LogSeverityLevel{
    low = 'low',
    medium = 'medium',
    heigh = 'heigh',
}

export interface LogEntityoptions{
    level:LogSeverityLevel;
    message:string;
    createdAt?:Date;
    origin:string;
    
}





export class LogEntity{

    public level:LogSeverityLevel;//enum
    public message:string;
    public createdAt:Date;
    public origin:string;

    constructor( options:LogEntityoptions){
        const { message, level, createdAt= new Date(), origin} =options;
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
    }
    
    //factory constructor en nuestra clase
    static fromJson = (json: string):LogEntity=>{
       const {message, level, createdAt,origin} = JSON.parse(json);

       const log = new LogEntity({
        message:message,
        level:level,
        createdAt:createdAt,
        origin:origin
    });
    //    log.createdAt = new Date(createdAt);

       return log;
    
       //--> Tambien puedo asgregar validaciones
    //    if(!message) throw new Error('Message is required');
    //    if(!level) throw new Error('Message is required');
    //    if(!createdAt) throw new Error('Message is required');

    }

}
export enum LogSeverityLevel{
    low = 'low',
    medium = 'medium',
    heigh = 'heigh',
}

export class LogEntity{

    public level:LogSeverityLevel;//enum
    public message:string;
    public createdAt: Date;

    constructor( message:string, level:LogSeverityLevel){
        this.message = message;
        this.level = level;
        this.createdAt = new Date();
    }
    
    //factory constructor en nuestra clase
    static fromJson = (json: string):LogEntity=>{
       const {message, level, createdAt} = JSON.parse(json);

       const log = new LogEntity(message,level);
       log.createdAt = new Date(createdAt);

       return log;
    
       //--> Tambien puedo asgregar validaciones
    //    if(!message) throw new Error('Message is required');
    //    if(!level) throw new Error('Message is required');
    //    if(!createdAt) throw new Error('Message is required');

    }

}
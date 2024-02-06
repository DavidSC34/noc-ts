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

}
//metdo estatito por que solo ocupo el metodo

import { CronJob } from "cron";
//cuando es un titpoi de dato nuevo, aqui se uyso type
type CronTime = string | Date;
type OnTick = ()=> void;



export class CronService{

  static createJob( cronTime:CronTime, onTick: OnTick): CronJob{//si recibe mas de dos argumentos entonces si mandar un objeto
    const job = new CronJob(cronTime,onTick);
    job.start();

    return job;
  }
}
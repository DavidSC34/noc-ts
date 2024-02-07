import { LogDatasource } from '../../domain/datasources/log.datasources';
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";


export class LogRepositoryImpl implements LogRepository {
    
    //euivale a ponerlo
    //private readonly logDatasource: LogDatasource
    // this.logDatasource = logDatasource
    constructor(
        private readonly logDatasource: LogDatasource
    ){}

    async saveLogs(log: LogEntity): Promise<void> {
        this.logDatasource.saveLogs(log);
    }
    async getLogs(severityLevel: LogSeverityLevel  ): Promise<LogEntity[]> {
      return this.logDatasource.getLogs(severityLevel);
    }

}
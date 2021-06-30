import { config } from './Config';

enum LogLevel {
    None = 0,
    Info = 1,
    Warning = 2,
    Error = 3
}

class Logger {
    private static instance: Logger;

    private logLevelText: Map<LogLevel,string>;
    private logLevel: LogLevel = LogLevel.None;

    private constructor() {
        this.logLevelText = new Map<LogLevel, string>();
        this.logLevelText.set(LogLevel.Info, 'INFO   ');
        this.logLevelText.set(LogLevel.Warning, 'WARNING');
        this.logLevelText.set(LogLevel.Error, 'ERROR  ');
    }

    public static getInstance(): Logger {
        return this.instance || (this.instance = new this());
    }

    initialize(): boolean {
        switch (config.DIGITWIN_LOG_LEVEL) {
            case 'none': {
                this.logLevel = LogLevel.None;
                break;
            }
            case 'info': {
                this.logLevel = LogLevel.Info;
                break;
            }
            case 'warning': {
                this.logLevel = LogLevel.Warning;
                break;
            }
            case 'error': {
                this.logLevel = LogLevel.Error;
                break;
            }
        }
        return true;
    }

    info(message: string): void {
        this.logMessage(LogLevel.Info, message);
    }

    warning(message: string): void {
        this.logMessage(LogLevel.Warning, message);
    }

    error(message: string): void {
        this.logMessage(LogLevel.Error, message);
    }

    private logMessage(level: LogLevel, message: string) {
        if (level <= this.logLevel) {
            let logDate: Date = new Date();
            let year: string = logDate.getFullYear().toString().padStart(4, '0');
            let month: string = logDate.getMonth().toString().padStart(2, '0');
            let day: string = logDate.getDay().toString().padStart(2, '0');
            let hours: string = logDate.getHours().toString().padStart(2, '0');
            let minutes: string = logDate.getMinutes().toString().padStart(2, '0');
            let seconds: string = logDate.getSeconds().toString().padStart(2, '0');

            console.log(year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds + ' ' + this.logLevelText.get(level) + ' ' + message);
        }
    }
}

export const logger = Logger.getInstance();

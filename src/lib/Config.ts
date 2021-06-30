class Config {
    private static instance: Config;

    DIGITWIN_LOG_LEVEL: string;
    DIGITWIN_API_PORT: number;

    DIGITWIN_FIWARE_CONTEXT_URL: string;
    DIGITWIN_FIWARE_AUTHENTICATION: string;
    DIGITWIN_FIWARE_ACCOUNTS_URL: string;
    DIGITWIN_FIWARE_USERNAME: string;
    DIGITWIN_FIWARE_PASSWORD: string;
    DIGITWIN_FIWARE_SERVICE: string;
    DIGITWIN_FIWARE_SERVICEPATH: string;

    TOKEN_SERVICE_CLIENT_ID: string;
    TOKEN_SERVICE_CLIENT_SECRET: string;

    AUTHENTICATION_TIMEOUT: number;
    AUTHENTICATION_REFRESH: number;
    AUTHENTICATION_RETRIES: number;
    
    private constructor () {
        this.DIGITWIN_LOG_LEVEL = 'none';
        this.DIGITWIN_API_PORT = 0;

        this.DIGITWIN_FIWARE_CONTEXT_URL = '';
        this.DIGITWIN_FIWARE_AUTHENTICATION = 'none';
        this.DIGITWIN_FIWARE_ACCOUNTS_URL = '';
        this.DIGITWIN_FIWARE_USERNAME = '';
        this.DIGITWIN_FIWARE_PASSWORD = '';
        this.DIGITWIN_FIWARE_SERVICE = '';
        this.DIGITWIN_FIWARE_SERVICEPATH = '';

        this.TOKEN_SERVICE_CLIENT_ID = '';
        this.TOKEN_SERVICE_CLIENT_SECRET = '';

        this.AUTHENTICATION_TIMEOUT = 60000;
        this.AUTHENTICATION_REFRESH = 3600;
        this.AUTHENTICATION_RETRIES = 3;
    }

    public static getInstance(): Config {
        return this.instance || (this.instance = new this());
    }

    getEnvironment(): boolean {
        let valid: boolean = true;

        if (process.env.DIGITWIN_LOG_LEVEL) {
            let logLevels: string[] = ['none', 'info', 'warning', 'error'];
            if (logLevels.includes(process.env.DIGITWIN_LOG_LEVEL)) {
                this.DIGITWIN_LOG_LEVEL = process.env.DIGITWIN_LOG_LEVEL;
            } else {
                console.log('DIGITWIN_LOG_LEVEL invalid');
                valid = false;
            }
        } else {
            console.log('DIGITWIN_LOG_LEVEL missing');
            valid = false;
        }

        if (process.env.DIGITWIN_API_PORT) {
            if (!isNaN(Number(process.env.DIGITWIN_API_PORT))) {
                this.DIGITWIN_API_PORT = Number(process.env.DIGITWIN_API_PORT);
            } else {
                console.log('DIGITWIN_API_PORT invalid');
                valid = false;
            }
        } else {
            console.log('DIGITWIN_API_PORT missing');
            valid = false;
        }

        if (process.env.DIGITWIN_FIWARE_CONTEXT_URL) {
            this.DIGITWIN_FIWARE_CONTEXT_URL = process.env.DIGITWIN_FIWARE_CONTEXT_URL;
        } else {
            console.log('DIGITWIN_FIWARE_CONTEXT_URL missing');
            valid = false;
        }

        if (process.env.DIGITWIN_FIWARE_AUTHENTICATION) {
            let authentications: string[] = ['none', 'oauth2'];
            if (authentications.includes(process.env.DIGITWIN_FIWARE_AUTHENTICATION)) {
                this.DIGITWIN_FIWARE_AUTHENTICATION = process.env.DIGITWIN_FIWARE_AUTHENTICATION;
            } else {
                console.log('DIGITWIN_FIWARE_AUTHENTICATION invalid');
                valid = false;
            }
        } else {
            console.log('DIGITWIN_FIWARE_AUTHENTICATION missing');
            valid = false;
        }

        if (process.env.DIGITWIN_FIWARE_ACCOUNTS_URL) {
            this.DIGITWIN_FIWARE_ACCOUNTS_URL = process.env.DIGITWIN_FIWARE_ACCOUNTS_URL;
        } else if (this.DIGITWIN_FIWARE_ACCOUNTS_URL == 'none') {
            console.log('DIGITWIN_FIWARE_ACCOUNTS_URL missing');
            valid = false;
        }

        if (process.env.DIGITWIN_FIWARE_USERNAME) {
            this.DIGITWIN_FIWARE_USERNAME = process.env.DIGITWIN_FIWARE_USERNAME;
        } else if (this.DIGITWIN_FIWARE_AUTHENTICATION == 'none') {
            console.log('DIGITWIN_FIWARE_USERNAME missing');
            valid = false;
        }

        if (process.env.DIGITWIN_FIWARE_PASSWORD) {
            this.DIGITWIN_FIWARE_PASSWORD = process.env.DIGITWIN_FIWARE_PASSWORD;
        } else if (this.DIGITWIN_FIWARE_AUTHENTICATION == 'none') {
            console.log('DIGITWIN_FIWARE_PASSWORD missing');
            valid = false;
        }

        if (process.env.DIGITWIN_FIWARE_SERVICE) {
            this.DIGITWIN_FIWARE_SERVICE = process.env.DIGITWIN_FIWARE_SERVICE;
        } else if (this.DIGITWIN_FIWARE_AUTHENTICATION == 'none') {
            console.log('DIGITWIN_FIWARE_SERVICE missing');
            valid = false;
        }

        if (process.env.DIGITWIN_FIWARE_SERVICEPATH) {
            this.DIGITWIN_FIWARE_SERVICEPATH = process.env.DIGITWIN_FIWARE_SERVICEPATH;
        } else if (this.DIGITWIN_FIWARE_AUTHENTICATION == 'none') {
            console.log('DIGITWIN_FIWARE_SERVICEPATH missing');
            valid = false;
        }

        if (process.env.TOKEN_SERVICE_CLIENT_ID) {
            this.TOKEN_SERVICE_CLIENT_ID = process.env.TOKEN_SERVICE_CLIENT_ID;
        } else if (this.DIGITWIN_FIWARE_AUTHENTICATION == 'none') {
            console.log('TOKEN_SERVICE_CLIENT_ID missing');
            valid = false;
        }

        if (process.env.TOKEN_SERVICE_CLIENT_SECRET) {
            this.TOKEN_SERVICE_CLIENT_SECRET = process.env.TOKEN_SERVICE_CLIENT_SECRET;
        } else if (this.DIGITWIN_FIWARE_AUTHENTICATION == 'none') {
            console.log('TOKEN_SERVICE_CLIENT_SECRET missing');
            valid = false;
        }

        return valid;
    }
}

export const config = Config.getInstance();

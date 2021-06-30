import { HttpStatusCode } from '../lib/HttpStatusCode';
import { config } from './Config';
import { logger } from '../lib/Logger';

type ContextResult = {
    status: number,
    data?: any
}

type AccountsResult = {
    status: number,
    accessToken?: string,
    refreshToken?: string,
    tokenType?: string,
    expiresIn?: number
}

class ContextBroker {
    private static instance: ContextBroker;

    private contextUrl: string;
    private authentication: string;
    private accountsUrl: string;
    private username: string;
    private password: string;
    private service: string;
    private servicepath: string;

    private tokenServiceClientId: string;
    private tokenServiceClientSecret: string;

    private accessToken: string;
    private refreshToken: string;
    private tokenType: string;
    private expireDate: number;

    private authenticated: boolean;
    private refreshTime: number;
    private retryLimit: number;
    private retries: number;

    private constructor() {
        this.contextUrl = '';
        this.authentication = 'none';
        this.accountsUrl = '';
        this.username = '';
        this.password = '';
        this.service = '';
        this.servicepath = ''

        this.tokenServiceClientId = '';
        this.tokenServiceClientSecret = '';

        this.accessToken = '';
        this.refreshToken = '';
        this.tokenType = '';
        this.expireDate = Date.now();

        this.authenticated = false;
        this.refreshTime = 0;
        this.retryLimit = 0;
        this.retries = 0;
    }

    public static getInstance(): ContextBroker {
        return this.instance || (this.instance = new this());
    }

    initialize(): boolean {
        this.contextUrl = config.DIGITWIN_FIWARE_CONTEXT_URL;
        this.authentication = config.DIGITWIN_FIWARE_AUTHENTICATION;
        this.accountsUrl = config.DIGITWIN_FIWARE_ACCOUNTS_URL;
        this.username = config.DIGITWIN_FIWARE_USERNAME;
        this.password = config.DIGITWIN_FIWARE_PASSWORD;
        this.service = config.DIGITWIN_FIWARE_SERVICE;
        this.servicepath = config.DIGITWIN_FIWARE_SERVICEPATH;

        this.tokenServiceClientId = config.TOKEN_SERVICE_CLIENT_ID;
        this.tokenServiceClientSecret = config.TOKEN_SERVICE_CLIENT_SECRET;

        this.authenticated = false;
        this.refreshTime = config.AUTHENTICATION_REFRESH * 1000;
        this.retryLimit = config.AUTHENTICATION_RETRIES;
        this.retries = 0;
        return true;
    }

    authenticate(callback: (successful: boolean) => void) {
        if (this.authentication == 'none') {
            this.authenticated = true;
            callback(this.authenticated)
        }

        if (this.authentication == 'oauth2') {
            this.getAccessToken((result: AccountsResult) => {
                if (result.status == HttpStatusCode.OK) {
                    this.accessToken = result.accessToken;
                    this.refreshToken = result.refreshToken;
                    this.tokenType = result.tokenType;
                    this.expireDate = Date.now() + result.expiresIn * 1000;

                    this.authenticated = true;
                    this.retries = 0;
                } else {
                    this.authenticated = false;
                }
                callback(this.authenticated);
            });
        }
    }

    checkAuthentication() {
        if (!this.authenticated) {
            this.getAccessToken((result: AccountsResult) => {
                if (result.status == HttpStatusCode.OK) {
                    this.accessToken = result.accessToken;
                    this.refreshToken = result.refreshToken;
                    this.tokenType = result.tokenType;
                    this.expireDate = Date.now() + result.expiresIn * 1000;
    
                    this.authenticated = true;
                    this.retries = 0;
                } else {
                    if (this.retries++ > this.retryLimit) {
                        logger.error('Authentication retry limit exeeded!')
                        process.exit(1);
                    }
                }
            });
        } else {
            if (this.expireDate - Date.now() < this.refreshTime) {
                this.getRefreshToken((result: AccountsResult) => {
                    if (result.status == HttpStatusCode.OK) {
                        this.accessToken = result.accessToken;
                        this.refreshToken = result.refreshToken;
                        this.tokenType = result.tokenType;
                        this.expireDate = Date.now() + result.expiresIn * 1000;

                        this.authenticated = true;
                        this.retries = 0;
                    } else {
                        this.authenticated = false;
                    }
                });
            }
        }
    }

    private getAccessToken(callback: (result: AccountsResult) => void) {
        const request = require('request');

        let headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        let form = {
            'grant_type': 'password',
            'client_id': this.tokenServiceClientId,
            'client_secret': this.tokenServiceClientSecret,
            'username': this.username,
            'password': this.password
        }
    
        let options = {
            baseUrl: this.accountsUrl,
            url: '/oauth2/password',
            headers: headers,
            json: true,
            form: form
        };

        request.post(options, function (error: any, response: any, body: any) {
            if (error) {
                let result: AccountsResult = { status: HttpStatusCode.INTERNAL_SERVER_ERROR };
                logger.error('getAccessToken: ' + 'result: ' + JSON.stringify(result));
                callback(result);
            } else {
                let result: AccountsResult = { status: response.statusCode };
                if (result.status == HttpStatusCode.OK) {
                    result.accessToken = body['access_token'];
                    result.refreshToken = body['refresh_token'];
                    result.tokenType = body['token_type'];
                    result.expiresIn = body['expires_in'];
                    logger.info('getAccessToken: ' + 'result: ' + JSON.stringify(result));
                } else {
                    logger.warning('getAccessToken: ' + 'result: ' + JSON.stringify(result));
                }
                callback(result);
            }
        });
    }

    private getRefreshToken(callback: (result: AccountsResult) => void) {
        const request = require('request');

        let headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        let form = {
            'grant_type': 'refresh_token',
            'client_id': this.tokenServiceClientId,
            'client_secret': this.tokenServiceClientSecret,
            'refresh_token': this.refreshToken
        }
    
        let options = {
            baseUrl: this.accountsUrl,
            url: '/oauth2/password',
            headers: headers,
            json: true,
            form: form
        };

        request.post(options, function (error: any, response: any, body: any) {
            if (error) {
                let result:AccountsResult = { status: HttpStatusCode.INTERNAL_SERVER_ERROR };
                logger.error('getRefreshToken: ' + 'result: ' + JSON.stringify(result));
                callback(result);
            } else {
                let result: AccountsResult = { status: response.statusCode };
                if (result.status == HttpStatusCode.OK) {
                    result.accessToken = body['access_token'];
                    result.refreshToken = body['refresh_token'];
                    result.tokenType = body['token_type'];
                    result.expiresIn = body['expires_in'];
                    logger.info('getRefreshToken: ' + 'result: ' + JSON.stringify(result));
                } else {
                    logger.warning('getRefreshToken: ' + 'result: ' + JSON.stringify(result));
                }
                callback(result);
            }
        });
    }

    async createEntity(entity: any): Promise<ContextResult> {
        const request = require('request');
    
        let headers = {
            'Fiware-Service': this.service,
            'Fiware-ServicePath': this.servicepath
        };

        if (this.authentication == 'oauth2') {
            let authorization: string = this.tokenType + ' ' + this.accessToken;
            headers['Authorization'] = authorization;
        }

        let options = {
            baseUrl: this.contextUrl,
            url: '/entities',
            headers: headers,
            json: true,
            qs: {
                options: 'keyValues'
            },
            body: entity
        };

        return new Promise<ContextResult>((resolve, reject) => {
            request.post(options, function (error: any, response: any, body: any) {
                if (error) {
                    let result: ContextResult = {
                        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
                        data: {
                            error: (error.errno) ? error.errno : 'UNDEFINED',
                            description: 'Internal communication error.'
                        }
                    };
                    logger.error('createEntity: ' + entity.id + ' result: ' + JSON.stringify(result));
                    reject(result);
                } else {
                    let result: ContextResult = {
                        status: response.statusCode
                    };
                    if (body) result['data'] = body;

                    if (response.statusCode == HttpStatusCode.CREATED) {
                        logger.info('createEntity: ' + entity.id + ' result: ' + JSON.stringify(result));
                    } else {
                        logger.warning('createEntity: ' + entity.id + ' result: ' + JSON.stringify(result));
                    }
                    resolve(result);
                }
            })
        });
    }

    async readEntities(entityType?: string): Promise<ContextResult> {
        const request = require('request');
    
        let headers = {
            'Fiware-Service': this.service,
            'Fiware-ServicePath': this.servicepath
        };

        if (this.authentication == 'oauth2') {
            let authorization: string = this.tokenType + ' ' + this.accessToken;
            headers['Authorization'] = authorization;
        }

        let options = {
            baseUrl: this.contextUrl,
            url: '/entities',
            headers: headers,
            json: true,
            qs: {
                options: 'keyValues'
            }
        };

        if (entityType) options.qs['type'] = entityType;

        return new Promise<ContextResult>((resolve, reject) => {
            request.get(options, function (error: any, response: any, body: any) {
                if (error) {
                    let result: ContextResult = {
                        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
                        data: {
                            error: (error.errno) ? error.errno : 'UNDEFINED',
                            description: 'Internal communication error.'
                        }
                    };
                    logger.error('readEntities: ' + 'result: ' + JSON.stringify(result));
                    reject(result);
                } else {
                    let result: ContextResult = {
                        status: response.statusCode
                    };
                    if (body) result['data'] = body;

                    if (response.statusCode == HttpStatusCode.OK) {
                        logger.info('readEntities: ' + 'result: ' + JSON.stringify(result));
                    } else {
                        logger.warning('readEntities: ' + 'result: ' + JSON.stringify(result));
                    }
                    resolve(result);
                }
            })
        });
    }

    async readEntity(entityId: string, entityType?: string): Promise<ContextResult> {
        const request = require('request');
    
        let headers = {
            'Fiware-Service': this.service,
            'Fiware-ServicePath': this.servicepath
        };

        if (this.authentication == 'oauth2') {
            let authorization: string = this.tokenType + ' ' + this.accessToken;
            headers['Authorization'] = authorization;
        }

        let options = {
            baseUrl: this.contextUrl,
            url: '/entities/' + entityId,
            headers: headers,
            json: true,
            qs: {
                options: 'keyValues'
            }
        };

        if (entityType) options.qs['type'] = entityType;

        return new Promise<ContextResult>((resolve, reject) => {
            request.get(options, function (error: any, response: any, body: any) {
                if (error) {
                    let result: ContextResult = {
                        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
                        data: {
                            error: (error.errno) ? error.errno : 'UNDEFINED',
                            description: 'Internal communication error.'
                        }
                    };
                    logger.error('readEntity: ' + entityId + ' result: ' + JSON.stringify(result));
                    reject(result);
                } else {
                    let result: ContextResult = {
                        status: response.statusCode
                    };
                    if (body) result['data'] = body;

                    if (response.statusCode == HttpStatusCode.OK) {
                        logger.info('readEntity: ' + entityId + ' result: ' + JSON.stringify(result));
                    } else {
                        logger.warning('readEntity: ' + entityId + ' result: ' + JSON.stringify(result));
                    }
                    resolve(result);
                }
            })
        });
    }

    async updateEntity(entityId: string, entityType: string, attrs: any): Promise<ContextResult> {
        const request = require('request');

        let headers = {
            'Fiware-Service': this.service,
            'Fiware-ServicePath': this.servicepath
        };

        if (this.authentication == 'oauth2') {
            let authorization: string = this.tokenType + ' ' + this.accessToken;
            headers['Authorization'] = authorization;
        }

        let options = {
            baseUrl: this.contextUrl,
            url: '/entities/' + entityId + '/attrs',
            headers: headers,
            json: true,
            qs: {
                options: 'keyValues',
                type: entityType
            },
            body: attrs
        };

        return new Promise<ContextResult>((resolve, reject) => {
            request.put(options, function (error: any, response: any, body: any) {
                if (error) {
                    let result: ContextResult = {
                        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
                        data: {
                            error: (error.errno) ? error.errno : 'UNDEFINED',
                            description: 'Internal communication error.'
                        }
                    };
                    logger.error('updateEntity: ' + entityId + ' result: ' + JSON.stringify(result));
                    reject(result);
                } else {
                    let result: ContextResult = {
                        status: response.statusCode
                    };
                    if (body) result['data'] = body;

                    if (response.statusCode == HttpStatusCode.NO_CONTENT) {
                        logger.info('updateEntity: ' + entityId + ' result: ' + JSON.stringify(result));
                    } else {
                        logger.warning('updateEntity: ' + entityId + ' result: ' + JSON.stringify(result));
                    }
                    resolve(result);
                }
            })
        });
    }

    async deleteEntity(entityId: string, entityType?: string) : Promise<ContextResult> {
        const request = require('request');
    
        let headers = {
            'Fiware-Service': this.service,
            'Fiware-ServicePath': this.servicepath
        };

        if (this.authentication == 'oauth2') {
            let authorization: string = this.tokenType + ' ' + this.accessToken;
            headers['Authorization'] = authorization;
        }

        let options = {
            baseUrl: this.contextUrl,
            url: '/entities/' + entityId,
            headers: headers,
            json: true,
            qs: {
                options: 'keyValues'
            }
        };

        if (entityType) options.qs['type'] = entityType;

        return new Promise<ContextResult>((resolve, reject) => {
            request.delete(options, function (error: any, response: any, body: any) {
                if (error) {
                    let result: ContextResult = {
                        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
                        data: {
                            error: (error.errno) ? error.errno : 'UNDEFINED',
                            description: 'Internal communication error.'
                        }
                    };

                    logger.error('deleteEntity: ' + entityId + ' result: ' + JSON.stringify(result));
                    reject(result);
                } else {
                    let result: ContextResult = {
                        status: response.statusCode
                    };
                    if (body) result['data'] = body;

                    if (response.statusCode == HttpStatusCode.NO_CONTENT) {
                        logger.info('deleteEntity: ' + entityId + ' result: ' + JSON.stringify(result));
                    } else {
                        logger.warning('deleteEntity: ' + entityId + ' result: ' + JSON.stringify(result));
                    }
                    resolve(result);
                }
            })
        });
    }
}

export const contextBroker = ContextBroker.getInstance();

import { contextBroker } from '../lib/ContextBroker';

class MobilityModel {
    async readMobilityRegions(callback: (status: number, data?: any) => void ) {
        try {
            let result = await contextBroker.readEntities('MobilityRegion');
            (result.data) ? callback(result.status, result.data) : callback(result.status);
        } catch (error) {
            (error.data) ? callback(error.status, error.data) : callback(error.status);
        }
    }

    async readMobilityRegion(id: string, callback: (status: number, data?: any) => void ) {
        try {
            let result = await contextBroker.readEntity(id, 'MobilityRegion');
            (result.data) ? callback(result.status, result.data) : callback(result.status);
        } catch (error) {
            (error.data) ? callback(error.status, error.data) : callback(error.status);
        }
    }

    async readMobilityStations(callback: (status: number, data?: any) => void ) {
        try {
            let result = await contextBroker.readEntities('MobilityStation');
            (result.data) ? callback(result.status, result.data) : callback(result.status);
        } catch (error) {
            (error.data) ? callback(error.status, error.data) : callback(error.status);
        }
    }

    async readMobilityStation(id: string, callback: (status: number, data?: any) => void ) {
        try {
            let result = await contextBroker.readEntity(id, 'MobilityStation');
            (result.data) ? callback(result.status, result.data) : callback(result.status);
        } catch (error) {
            (error.data) ? callback(error.status, error.data) : callback(error.status);
        }
    }

    async readMobilityServices(callback: (status: number, data?: any) => void ) {
        try {
            let result = await contextBroker.readEntities('MobilityService');
            (result.data) ? callback(result.status, result.data) : callback(result.status);
        } catch (error) {
            (error.data) ? callback(error.status, error.data) : callback(error.status);
        }
    }

    async readMobilityService(id: string, callback: (status: number, data?: any) => void ) {
        try {
            let result = await contextBroker.readEntity(id, 'MobilityService');
            (result.data) ? callback(result.status, result.data) : callback(result.status);
        } catch (error) {
            (error.data) ? callback(error.status, error.data) : callback(error.status);
        }
    }
}

export const mobilityModel = new MobilityModel();

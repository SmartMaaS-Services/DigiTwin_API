import { contextBroker } from '../lib/ContextBroker';

class TransportationModel {
    async readBikeHireDockingStations(callback: (status: number, data?: any) => void ) {
        try {
            let result = await contextBroker.readEntities('BikeHireDockingStation');
            (result.data) ? callback(result.status, result.data) : callback(result.status);
        } catch (error) {
            (error.data) ? callback(error.status, error.data) : callback(error.status);
        }
    }

    async readBikeHireDockingStation(id: string, callback: (status: number, data?: any) => void ) {
        try {
            let result = await contextBroker.readEntity(id, 'BikeHireDockingStation');
            (result.data) ? callback(result.status, result.data) : callback(result.status);
        } catch (error) {
            (error.data) ? callback(error.status, error.data) : callback(error.status);
        }
    }

    async readTransportStations(callback: (status: number, data?: any) => void ) {
        try {
            let result = await contextBroker.readEntities('TransportStation');
            (result.data) ? callback(result.status, result.data) : callback(result.status);
        } catch (error) {
            (error.data) ? callback(error.status, error.data) : callback(error.status);
        }
    }

    async readTransportStation(id: string, callback: (status: number, data?: any) => void ) {
        try {
            let result = await contextBroker.readEntity(id, 'TransportStation');
            (result.data) ? callback(result.status, result.data) : callback(result.status);
        } catch (error) {
            (error.data) ? callback(error.status, error.data) : callback(error.status);
        }
    }
}

export const transportationModel = new TransportationModel();

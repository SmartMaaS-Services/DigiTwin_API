import { contextBroker } from '../lib/ContextBroker';

class ParkingModel {
    async readOffStreetParkings(callback: (status: number, data?: any) => void ) {
        try {
            let result = await contextBroker.readEntities('OffStreetParking');
            (result.data) ? callback(result.status, result.data) : callback(result.status);
        } catch (error) {
            (error.data) ? callback(error.status, error.data) : callback(error.status);
        }
    }

    async readOffStreetParking(id: string, callback: (status: number, data?: any) => void ) {
        try {
            let result = await contextBroker.readEntity(id, 'OffStreetParking');
            (result.data) ? callback(result.status, result.data) : callback(result.status);
        } catch (error) {
            (error.data) ? callback(error.status, error.data) : callback(error.status);
        }
    }

    async readOnStreetParkings(callback: (status: number, data?: any) => void ) {
        try {
            let result = await contextBroker.readEntities('OnStreetParking');
            (result.data) ? callback(result.status, result.data) : callback(result.status);
        } catch (error) {
            (error.data) ? callback(error.status, error.data) : callback(error.status);
        }
    }

    async readOnStreetParking(id: string, callback: (status: number, data?: any) => void ) {
        try {
            let result = await contextBroker.readEntity(id, 'OnStreetParking');
            (result.data) ? callback(result.status, result.data) : callback(result.status);
        } catch (error) {
            (error.data) ? callback(error.status, error.data) : callback(error.status);
        }
    }

    async readParkingSpots(callback: (status: number, data?: any) => void ) {
        try {
            let result = await contextBroker.readEntities('ParkingSpot');
            (result.data) ? callback(result.status, result.data) : callback(result.status);
        } catch (error) {
            (error.data) ? callback(error.status, error.data) : callback(error.status);
        }
    }

    async readParkingSpot(id: string, callback: (status: number, data?: any) => void ) {
        try {
            let result = await contextBroker.readEntity(id, 'ParkingSpot');
            (result.data) ? callback(result.status, result.data) : callback(result.status);
        } catch (error) {
            (error.data) ? callback(error.status, error.data) : callback(error.status);
        }
    }
}

export const parkingModel = new ParkingModel();

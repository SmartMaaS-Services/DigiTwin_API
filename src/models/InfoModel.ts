import { contextBroker } from '../lib/ContextBroker';

class InfoModel {
    async readWeatherObserveds(callback: (status: number, data?: any) => void ) {
        try {
            let result = await contextBroker.readEntities('WeatherObserved');
            (result.data) ? callback(result.status, result.data) : callback(result.status);
        } catch (error) {
            (error.data) ? callback(error.status, error.data) : callback(error.status);
        }
    }

    async readWeatherObserved(id: string, callback: (status: number, data?: any) => void ) {
        try {
            let result = await contextBroker.readEntity(id, 'WeatherObserved');
            (result.data) ? callback(result.status, result.data) : callback(result.status);
        } catch (error) {
            (error.data) ? callback(error.status, error.data) : callback(error.status);
        }
    }

    async readAirQualityObserveds(callback: (status: number, data?: any) => void ) {
        try {
            let result = await contextBroker.readEntities('AirQualityObserved');
            (result.data) ? callback(result.status, result.data) : callback(result.status);
        } catch (error) {
            (error.data) ? callback(error.status, error.data) : callback(error.status);
        }
    }

    async readAirQualityObserved(id: string, callback: (status: number, data?: any) => void ) {
        try {
            let result = await contextBroker.readEntity(id, 'AirQualityObserved');
            (result.data) ? callback(result.status, result.data) : callback(result.status);
        } catch (error) {
            (error.data) ? callback(error.status, error.data) : callback(error.status);
        }
    }
}

export const infoModel = new InfoModel();

import { Request, Response } from 'express';
import { infoModel } from '../models/InfoModel';

class InfoController {
    public readWeatherObserveds(req: Request, res: Response): void {
        infoModel.readWeatherObserveds((status: number, data?: any) => {
            if (data) {
                res.status(status).json(data);
            } else {
                res.sendStatus(status);
            }
        });
    }

    public readWeatherObserved(req: Request, res: Response): void {
        let id: string = req.params.id;

        infoModel.readWeatherObserved(id, (status: number, data?: any) => {
            if (data) {
                res.status(status).json(data);
            } else {
                res.sendStatus(status);
            }
        });
    }

    public readAirQualityObserveds(req: Request, res: Response): void {
        infoModel.readAirQualityObserveds((status: number, data?: any) => {
            if (data) {
                res.status(status).json(data);
            } else {
                res.sendStatus(status);
            }
        });
    }

    public readAirQualityObserved(req: Request, res: Response): void {
        let id: string = req.params.id;

        infoModel.readAirQualityObserved(id, (status: number, data?: any) => {
            if (data) {
                res.status(status).json(data);
            } else {
                res.sendStatus(status);
            }
        });
    }
}

export const infoController = new InfoController();

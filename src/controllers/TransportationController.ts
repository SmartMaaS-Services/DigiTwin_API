import { Request, Response } from 'express';
import { transportationModel } from '../models/TransportationModel';

class TransportationController {
    public readBikeHireDockingStations(req: Request, res: Response): void {
        transportationModel.readBikeHireDockingStations((status: number, data?: any) => {
            if (data) {
                res.status(status).json(data);
            } else {
                res.sendStatus(status);
            }
        });
    }

    public readBikeHireDockingStation(req: Request, res: Response): void {
        let id: string = req.params.id;

        transportationModel.readBikeHireDockingStation(id, (status: number, data?: any) => {
            if (data) {
                res.status(status).json(data);
            } else {
                res.sendStatus(status);
            }
        });
    }

    public readTransportStations(req: Request, res: Response): void {
        transportationModel.readTransportStations((status: number, data?: any) => {
            if (data) {
                res.status(status).json(data);
            } else {
                res.sendStatus(status);
            }
        });
    }

    public readTransportStation(req: Request, res: Response): void {
        let id: string = req.params.id;

        transportationModel.readTransportStation(id, (status: number, data?: any) => {
            if (data) {
                res.status(status).json(data);
            } else {
                res.sendStatus(status);
            }
        });
    }
}

export const transportationController = new TransportationController();

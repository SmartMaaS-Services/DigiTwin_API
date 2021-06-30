import { Request, Response } from 'express';
import { mobilityModel } from '../models/MobilityModel';

class MobilityController {
    public readMobilityRegions(req: Request, res: Response): void {
        mobilityModel.readMobilityRegions((status: number, data?: any) => {
            if (data) {
                res.status(status).json(data);
            } else {
                res.sendStatus(status);
            }
        });
    }

    public readMobilityRegion(req: Request, res: Response): void {
        let id: string = req.params.id;

        mobilityModel.readMobilityRegion(id, (status: number, data?: any) => {
            if (data) {
                res.status(status).json(data);
            } else {
                res.sendStatus(status);
            }
        });
    }

    public readMobilityStations(req: Request, res: Response): void {
        mobilityModel.readMobilityStations((status: number, data?: any) => {
            if (data) {
                res.status(status).json(data);
            } else {
                res.sendStatus(status);
            }
        });
    }

    public readMobilityStation(req: Request, res: Response): void {
        let id: string = req.params.id;

        mobilityModel.readMobilityStation(id, (status: number, data?: any) => {
            if (data) {
                res.status(status).json(data);
            } else {
                res.sendStatus(status);
            }
        });
    }

    public readMobilityServices(req: Request, res: Response): void {
        mobilityModel.readMobilityServices((status: number, data?: any) => {
            if (data) {
                res.status(status).json(data);
            } else {
                res.sendStatus(status);
            }
        });
    }

    public readMobilityService(req: Request, res: Response): void {
        let id: string = req.params.id;

        mobilityModel.readMobilityService(id, (status: number, data?: any) => {
            if (data) {
                res.status(status).json(data);
            } else {
                res.sendStatus(status);
            }
        });
    }
}

export const mobilityController = new MobilityController();

import { Request, Response } from 'express';
import { parkingModel } from '../models/ParkingModel';

class ParkingController {
    public readOffStreetParkings(req: Request, res: Response): void {
        parkingModel.readOffStreetParkings((status: number, data?: any) => {
            if (data) {
                res.status(status).json(data);
            } else {
                res.sendStatus(status);
            }
        });
    }

    public readOffStreetParking(req: Request, res: Response): void {
        let id: string = req.params.id;

        parkingModel.readOffStreetParking(id, (status: number, data?: any) => {
            if (data) {
                res.status(status).json(data);
            } else {
                res.sendStatus(status);
            }
        });
    }

    public readOnStreetParkings(req: Request, res: Response): void {
        parkingModel.readOnStreetParkings((status: number, data?: any) => {
            if (data) {
                res.status(status).json(data);
            } else {
                res.sendStatus(status);
            }
        });
    }

    public readOnStreetParking(req: Request, res: Response): void {
        let id: string = req.params.id;

        parkingModel.readOnStreetParking(id, (status: number, data?: any) => {
            if (data) {
                res.status(status).json(data);
            } else {
                res.sendStatus(status);
            }
        });
    }

    public readParkingSpots(req: Request, res: Response): void {
        parkingModel.readParkingSpots((status: number, data?: any) => {
            if (data) {
                res.status(status).json(data);
            } else {
                res.sendStatus(status);
            }
        });
    }

    public readParkingSpot(req: Request, res: Response): void {
        let id: string = req.params.id;

        parkingModel.readParkingSpot(id, (status: number, data?: any) => {
            if (data) {
                res.status(status).json(data);
            } else {
                res.sendStatus(status);
            }
        });
    }
}

export const parkingController = new ParkingController();

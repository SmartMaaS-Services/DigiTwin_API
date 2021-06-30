import  express = require('express');
import { Request, Response } from 'express';
import { parkingController } from '../controllers/ParkingController';

const router = express.Router( { strict: true } );

router.get('/offstreet', (req: Request, res: Response) => {
    parkingController.readOffStreetParkings(req, res);
});

router.get('/offstreet/:id', (req: Request, res: Response) => {
    parkingController.readOffStreetParking(req, res);
});

router.get('/onstreet', (req: Request, res: Response) => {
    parkingController.readOnStreetParkings(req, res);
});

router.get('/onstreet/:id', (req: Request, res: Response) => {
    parkingController.readOnStreetParking(req, res);
});

router.get('/spots', (req: Request, res: Response) => {
    parkingController.readParkingSpots(req, res);
});

router.get('/spots/:id', (req: Request, res: Response) => {
    parkingController.readParkingSpot(req, res);
});

export { router as parkingRouter };

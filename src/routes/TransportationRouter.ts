import  express = require('express');
import { Request, Response } from 'express';
import { transportationController } from '../controllers/TransportationController';

const router = express.Router( { strict: true } );

router.get('/bikehiredockingstations', (req: Request, res: Response) => {
    transportationController.readBikeHireDockingStations(req, res);
});

router.get('/bikehiredockingstations/:id', (req: Request, res: Response) => {
    transportationController.readBikeHireDockingStation(req, res);
});

router.get('/transportstations', (req: Request, res: Response) => {
    transportationController.readTransportStations(req, res);
});

router.get('/transportstations/:id', (req: Request, res: Response) => {
    transportationController.readTransportStation(req, res);
});

export { router as transportationRouter };

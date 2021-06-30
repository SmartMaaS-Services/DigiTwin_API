import  express = require('express');
import { Request, Response } from 'express';
import { mobilityController } from '../controllers/MobilityController';

const router = express.Router( { strict: true } );

router.get('/regions', (req: Request, res: Response) => {
    mobilityController.readMobilityRegions(req, res);
});

router.get('/regions/:id', (req: Request, res: Response) => {
    mobilityController.readMobilityRegion(req, res);
});

router.get('/stations', (req: Request, res: Response) => {
    mobilityController.readMobilityStations(req, res);
});

router.get('/stations/:id', (req: Request, res: Response) => {
    mobilityController.readMobilityStation(req, res);
});

router.get('/services', (req: Request, res: Response) => {
    mobilityController.readMobilityServices(req, res);
});

router.get('/services/:id', (req: Request, res: Response) => {
    mobilityController.readMobilityService(req, res);
});

export { router as mobilityRouter };

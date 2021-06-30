import  express = require('express');
import { Request, Response } from 'express';
import { infoController } from '../controllers/InfoController';

const router = express.Router( { strict: true } );

router.get('/weather', (req: Request, res: Response) => {
    infoController.readWeatherObserveds(req, res);
});

router.get('/weather/:id', (req: Request, res: Response) => {
    infoController.readWeatherObserved(req, res);
});

router.get('/airquality', (req: Request, res: Response) => {
    infoController.readAirQualityObserveds(req, res);
});

router.get('/airquality/:id', (req: Request, res: Response) => {
    infoController.readAirQualityObserved(req, res);
});

export { router as infoRouter };

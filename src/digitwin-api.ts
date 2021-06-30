import cors = require('cors');
import express = require('express');

import { config } from './lib/Config';
import { logger } from './lib/Logger';
import { contextBroker } from './lib/ContextBroker';

import { mobilityRouter } from './routes/MobilityRouter';
import { parkingRouter } from './routes/ParkingRouter';
import { transportationRouter } from './routes/TransportationRouter';
import { infoRouter } from './routes/InfoRouter';

if (!config.getEnvironment()) {
    process.exit(1);
}

if (!logger.initialize()) {
    process.exit(1);
}

if (!contextBroker.initialize()) {
    process.exit(1);
}

contextBroker.authenticate((successful: boolean) => {
    if (successful) {
        setInterval(() => { contextBroker.checkAuthentication(); }, config.AUTHENTICATION_TIMEOUT);
    } else {
        process.exit(1);
    }
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/mobility', mobilityRouter);
app.use('/parking', parkingRouter);
app.use('/transportation', transportationRouter);
app.use('/info', infoRouter);

app.listen(config.DIGITWIN_API_PORT, () => {
    logger.info('*** Digital Twin API Server ***');
});

/*******************************************************************************
 * Developer: JT Fleetwood
 * Date: 5/27/2022
 * Module: Express backend app that will serve as a controller for all incoming
 * api requests.
 * ****************************************************************************/

import express from 'express';
import bodyParser from 'body-parser';
import errorhandler from 'errorhandler';
import {post_router} from './routers/post_router.js';
import {win_router} from './routers/win_router.js';
import { users_router } from './routers/users_router.js';
import { maintenance_router } from './routers/maintenance_router.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to handle request body parsing, and error handling.
app.use(cors({
    origin: '*'
}));

app.use(bodyParser.json());
app.use(errorhandler());


app.use('/posts', post_router);
app.use('/wins', win_router);
app.use('/users', users_router);
app.use('/maintenance', maintenance_router);

app.listen(PORT);


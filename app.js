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

const app = express();
const PORT = 4000;


app.use('/posts', post_router);
app.use('/wins', win_router);

// Middleware to handle request body parsing, and error handling.
app.use(bodyParser.json());
app.use(errorhandler());

app.listen(PORT);


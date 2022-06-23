/*******************************************************************************
 * Developer: JT Fleetwood
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
import { expressjwt } from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// JWT acknowledgement, allows auth0 to issue JWT's that will be verified by the audience (our API).
var jwtCheck = expressjwt({
    secret: expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 15,
        jwksUri: process.env.JWK_URI
  }),
  audience: process.env.API_URL,
  issuer: process.env.TOKEN_ISSUER,
  algorithms: ['RS256']
});


// CORS policy does not really matter at this moment with all endpoints beings secured via JWT bearer token verification.
app.use(cors({
    origin: '*'
}));


// Middleware to check JWT passed in through header, parse body of request, and handle errors.
app.use(jwtCheck);
app.use(bodyParser.json());
app.use(errorhandler());

// Different routes used.
app.use('/posts', post_router);
app.use('/wins', win_router);
app.use('/users', users_router);
app.use('/maintenance', maintenance_router);

app.listen(PORT);

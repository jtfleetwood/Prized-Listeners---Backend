/*******************************************************************************
 * Developer: JT Fleetwood
 * Module: Auth0 config data that supports backend integration with Auth0 
 * Management API (handles administrative-related tasks for users).
 * ****************************************************************************/

import dotenv from 'dotenv';
import findConfig from 'find-config';

dotenv.config({path:findConfig('.env')});

export const auth0_data = {
    client_id:process.env.AUTH0_CLIENT_ID,
    client_secret:process.env.AUTH0_CLIENT_SECRET,
    audience:process.env.AUTH0_AUDIENCE,
    grant_type:"client_credentials",
}


export const TOKEN_REQ_URL = process.env.AUTH0_ISSUER_BASE_URL;

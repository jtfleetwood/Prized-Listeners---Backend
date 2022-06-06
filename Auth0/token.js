import fetch from 'node-fetch';
import {auth0_data} from './auth0_config.js';

try {
    
    const response = await fetch(TOKEN_REQ_URL, auth0_data);

    const token = await response.json();

    console.log(token);
}

catch (error) {
    console.log(error.message);
}
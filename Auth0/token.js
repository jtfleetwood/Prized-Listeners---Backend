import fetch from 'node-fetch';
import {auth0_data, TOKEN_REQ_URL} from './auth0_config.js';

try {
    
    const response = await fetch(TOKEN_REQ_URL, auth0_data);

    const token = await response.json();

    
}

catch (error) {
    console.log(error.message);
}
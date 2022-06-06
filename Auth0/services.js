import fetch from 'node-fetch';
import {auth0_data, TOKEN_REQ_URL} from './auth0_config.js';


const get_token = async () => {
    try {
    
        const response = await fetch(TOKEN_REQ_URL, {
            method:'POST',
            headers:{'content-type':'application/json'},
            body: JSON.stringify(auth0_data)
        });
    
        const token = await response.json();

        return token.access_token;
        
    }
    
    catch (error) {
        console.log(error);
    }

}

export const set_did_vote = async (user_id) => {
    try {
        const token = await get_token()
        
        const response = await fetch(`${auth0_data.audience}users/${user_id}`, {
            method: 'PATCH',
            headers:{authorization:'Bearer ' + token, 'content-type':'application/json'},
            body:JSON.stringify({app_metadata: {did_vote:true}})
        });

        const json_response = await response.json();
        
    }

    catch(error) {
        console.log(error);
    }
}

export const get_users = async () => {
    try {
        const token = await get_token()
        
        const response = await fetch(`${auth0_data.audience}users`, {
            method: 'GET',
            headers:{authorization:'Bearer ' + token, 'content-type':'application/json'},
        });

        const users = await response.json();

        return users;
        
    }

    catch(error) {
        console.log(error);
    }
}

export const get_user_vote = async (user_id) => {
    try {
        const token = await get_token()
        
        const response = await fetch(`${auth0_data.audience}users/${user_id}`, {
            method: 'GET',
            headers:{authorization:'Bearer ' + token, 'content-type':'application/json'},
        });

        const user = await response.json();

        return user.app_metadata;
        
    }

    catch(error) {
        console.log(error);
    }
}




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


export const reset_user_vote = async (user_id, token) => {
    try {

        const response = await fetch(`${auth0_data.audience}users/${user_id}`, {
            method: 'PATCH',
            headers:{authorization:'Bearer ' + token, 'content-type':'application/json'},
            body:JSON.stringify({app_metadata: {did_vote:false}})
        });

        const json_response = await response.json();
        
    }

    catch(error) {
        console.log(error);
    }
}

export const get_users = async () => {
    try {
        const token = await get_token();
        
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

        return {did_vote:user.app_metadata.did_vote}
        
    }

    catch(error) {
        console.log(error);
    }
}

export const get_user_by_id = async (user_id) => {
    try {
        const token = await get_token()
        
        const response = await fetch(`${auth0_data.audience}users/${user_id}`, {
            method: 'GET',
            headers:{authorization:'Bearer ' + token, 'content-type':'application/json'},
        });

        const user = await response.json();

        return user;
        
    }

    catch(error) {
        console.log(error);
    }
}

export const get_user_win_count = async (user_id) => {
    try {

        const user = await get_user_by_id(user_id);

        return {win_count:user.app_metadata.win_count};
    }

    catch(error) {
        console.log(error);
    }
   
}

export const get_user_tie_count = async (user_id) => {
    try {
        const user = await get_user_by_id(user_id);

        return {tie_count:user.app_metadata.tie_count};
    }

    catch(error) {
        console.log(error);
    }
}

export const init_user_metadata = async (user_id) => {
    try {
        const token = await get_token()
        
        const response = await fetch(`${auth0_data.audience}users/${user_id}`, {
            method: 'PATCH',
            headers:{authorization:'Bearer ' + token, 'content-type':'application/json'},
            body:JSON.stringify({app_metadata: {did_vote:false, win_count:0, tie_count:0}})
        });
        
    }

    catch(error) {
        console.log(error);
    }
}

export const check_new_user = async (user_id) => {
    try {
        const user = await get_user_by_id(user_id);

        try {
            if (user.app_metadata.did_vote) {
                return;
            }
        }

        catch (error) {
            await init_user_metadata(user_id);
        }
    }

    catch (error) {
        console.log(error);
    }
}

export const change_user_display_name = async (user_id, name) => {
    try {
        const token = await get_token();

        const response = await fetch(`${auth0_data.audience}users/${user_id}`, {
            method:'PATCH',
            headers:{authorization:'Bearer ' + token, 'content-type':'application/json'},
            body:JSON.stringify({nickname:name})
        });

        return response;
    }

    catch (error) {
        console.log(error);
    }
}

export const set_users_to_winners = async (winners) => {
    try {
        const token = await get_token();

        if (winners.rowCount === 1) {
            let user_win_count = await get_user_win_count(winners.rows[0].user_id);

            user_win_count.win_count += 1;

            const response = await fetch(`${auth0_data.audience}users/${winners.rows[0].user_id}`, {
                method:'PATCH',
                headers:{authorization:'Bearer ' + token, 'content-type':'application/json'},
                body:JSON.stringify({app_metadata:{win_count:user_win_count.win_count}})
            });
    
            return response;

        }

        for (let i = 0; i < winners.rowCount; i++) {
            
            let user_tie_count = await get_user_tie_count(winners.rows[i].user_id);
            user_tie_count += 1;

            const response = await fetch(`${auth0_data.audience}users/${winners.rows[i].user_id}`, {
                method:'PATCH',
                headers:{authorization:'Bearer ' + token, 'content-type':'application/json'},
                body:JSON.stringify({app_metadata:{tie_count:user_tie_count}})
            });
        }
    }

    catch (error) {
        console.log(error);
    }
}

export const reset_users_vote_status = async () => {
    const users = await get_users();

    const token = await get_token();

    for (let i = 0; i < users.length; i++) {
        await reset_user_vote(users[i].user_id, token);
    }

}

/*******************************************************************************
 * Developer: JT Fleetwood
 * Module: This module will run weekly at Sun at 12:00 AM to maintain the current
 * state of the application via a scheduler, and bash script.
 * ****************************************************************************/

import {find_winner, set_posts_to_winner } from '../queries/win_queries.js';
import { reset_users_vote_status, set_users_to_winners } from '../Auth0/services.js';
import { inc_current_week } from '../queries/maintenance_queries.js';

// Handles all maintenance.
const handleEOW = async () => {
    try {

        // find winning post(s)
        const winners = await find_winner();

        // set post(s) to winner status
        const posts_response = await set_posts_to_winner(winners);

        // using winning post(s) user_ids (FK) to update user win/tie counts.
        const users_response = await set_users_to_winners(winners);

        // resetting user metadata to allow for voting.
        await reset_users_vote_status();

        // incrementing current contest week, (created var in DB).
        await inc_current_week();

    }

    catch(error) {
        console.log(error);
    }
}

// Weekly application maintenance... Occuring every Sunday at 11:59 PM EST.
await handleEOW();

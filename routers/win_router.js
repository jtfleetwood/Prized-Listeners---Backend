/*******************************************************************************
 * Developer: JT Fleetwood
 * Module: Router to handle all win-related endpoints.
 * ****************************************************************************/

import express from 'express';
import * as queries from '../queries/win_queries.js';
import * as user_queries from '../Auth0/services.js';

// Initialization of router.
export const win_router = express.Router();

// Endpoint to get all win records.
win_router.get('/', async (req, res) => {
    res.send(await queries.get_wins());
});

// Endpoint to get a win record by id.
win_router.get('/:id', async (req, res) => {
    res.send(await queries.get_win_by_id(req.params.id));
});

// Endpoint to get user tie count. Auth0 management API used.
win_router.get('/user/:user_id/tie_count', async (req, res) => {
    res.send(await user_queries.get_user_tie_count(req.params.user_id));
});

// Endpoint to get user win count. Auth0 management API used.
win_router.get('/user/:user_id', async (req, res) => {
    res.send(await user_queries.get_user_win_count(req.params.user_id));
})
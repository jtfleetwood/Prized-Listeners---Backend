/*******************************************************************************
 * Developer: JT Fleetwood
 * Module: Router to handle all user-related endpoints.
 * ****************************************************************************/

import express from 'express';
import * as auth0_services from '../Auth0/services.js';

// Router initialization
export const users_router = express.Router();

// Endpoint gets all users from Auth0.
users_router.get('/', async (req, res) => {
    res.send(await auth0_services.get_users())
});

// Endpoint gets a user by id from Auth0.
users_router.get('/:id', async (req, res) => {
    res.send(await auth0_services.get_user_by_id(req.params.id));
})

// Endpoint gets user's vote status from Auth0 metadata.
users_router.get('/:id/check_vote', async (req, res) => {
    res.send(await auth0_services.get_user_vote(req.params.id));
});

// Endpoint checks if user is new through user record.
users_router.patch('/:id/check_new_user', async (req, res) => {
    res.send(await auth0_services.check_new_user(req.params.id));
});

// Endpoint allows user to change display name on application.
users_router.patch('/:id/change_user_display_name', async (req, res) => {
    res.send(await auth0_services.change_user_display_name(req.params.id, req.body.name));
})
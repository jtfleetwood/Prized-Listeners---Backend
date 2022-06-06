import express from 'express';
import * as auth0_services from '../Auth0/services.js';


export const users_router = express.Router();

users_router.get('/', async (req, res) => {
    res.send(await auth0_services.get_users())
});

users_router.get('/:id/check_vote', async (req, res) => {
    res.send(await auth0_services.get_user_vote(req.params.id));
});

users_router.patch('/:id/check_new_user', async (req, res) => {
    res.send(await auth0_services.check_new_user(req.params.id));
});

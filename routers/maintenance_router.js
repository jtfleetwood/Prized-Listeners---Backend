import express from 'express';
import * as maintenance_queries from '../queries/maintenance_queries.js';


export const maintenance_router = express.Router();

maintenance_router.get('/current_week', async (req, res) => {
    res.send({current_week:await maintenance_queries.get_current_week()});
});





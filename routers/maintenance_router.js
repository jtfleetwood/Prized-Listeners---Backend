/*******************************************************************************
 * Developer: JT Fleetwood
 * Module: Router to handle all maintenance related endpoints.
 * ****************************************************************************/

import express from 'express';
import * as maintenance_queries from '../queries/maintenance_queries.js';

// Maintenance router initialization.
export const maintenance_router = express.Router();

// Only has one endpoint to get current week for frontend purposes.
maintenance_router.get('/current_week', async (req, res) => {
    res.send({current_week:await maintenance_queries.get_current_week()});
});





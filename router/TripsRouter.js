const express = require('express');
const TripsRouter = express.Router();
const TripsController = require('../controller/TripsController');
const { verifyAdmin } = require('../utils/verifyAdmin'); 

TripsRouter.get('/', TripsController.GetTrips);
TripsRouter.get('/:id', TripsController.GetTripByID);
TripsRouter.post('/budget', TripsController.CheckBudget);
TripsRouter.post('/compare', TripsController.CompareTrips);

TripsRouter.post('/', verifyAdmin, TripsController.PostTrip);
TripsRouter.put('/:id', verifyAdmin, TripsController.PutTrip);
TripsRouter.delete('/:id', verifyAdmin, TripsController.DeleteTrip);

module.exports = TripsRouter;

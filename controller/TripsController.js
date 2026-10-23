const trips = require('../model/TripsModel');

const GetTrips = (req, res) => {
    res.status(200).send(trips);
};

const GetTripByID = (req, res) => {
    const id = Number(req.params.id);
    for (let i = 0; i < trips.length; i++) {
        if (trips[i].id === id) {
            return res.status(200).send(trips[i]);
        }
    }
    return res.status(404).send({ message: "Trip not found" });
};

const PostTrip = (req, res) => {
    const destination = req.body.destination;
    const cost = req.body.cost;
    const newTrip = {
        id: trips.length + 1,
        destination: destination,
        cost: cost
    };
    trips.push(newTrip);
    res.status(201).send(newTrip);
};

const PutTrip = (req, res) => {
    const id = Number(req.params.id);
    for (let i = 0; i < trips.length; i++) {
        if (trips[i].id === id) {
            trips[i].destination = req.body.destination;
            trips[i].cost = req.body.cost;
            return res.status(200).send(trips[i]);
        }
    }
    return res.status(404).send({ message: "Trip not found" });
};

const DeleteTrip = (req, res) => {
    const id = Number(req.params.id);
    for (let i = 0; i < trips.length; i++) {
        if (trips[i].id === id) {
            const deletedTrip = trips.splice(i, 1);
            return res.status(200).send(deletedTrip[0]);
        }
    }
    return res.status(404).send({ message: "Trip not found" });
};

const CheckBudget = (req, res) => {
    const { budget } = req.body;
    const affordableTrips = [];
    for (let i = 0; i < trips.length; i++) {
        if (trips[i].cost <= budget) {
            affordableTrips.push(trips[i]);
        }
    }
    return res.status(200).json({
        message: "successfully received",
        data: affordableTrips
    });
};
const CompareTrips = (req, res) => {
    const { tripId1, tripId2 } = req.body;

    if (
        typeof tripId1 !== "number" || typeof tripId2 !== "number" ||
        !Number.isInteger(tripId1) || !Number.isInteger(tripId2) ||
        tripId1 <= 0 || tripId2 <= 0 ||
        tripId1 === tripId2
    ) {
        return res.status(400).json({
            message: "tripId1 and tripId2 must be two different positive integers"
        });
    }

    let trip1 = null;
    let trip2 = null;

    for (let i = 0; i < trips.length; i++) {
        if (trips[i].id === tripId1) {
            trip1 = trips[i];
        }
        if (trips[i].id === tripId2) {
            trip2 = trips[i];
        }
    }

    if (!trip1 || !trip2) {
        return res.status(404).json({
            message: "Trip not found"
        });
    }

    const costDifference = Math.abs(trip1.cost - trip2.cost);
    let cheaperDestination;

    if (trip1.cost < trip2.cost) {
        cheaperDestination = trip1.destination;
    } else if (trip2.cost < trip1.cost) {
        cheaperDestination = trip2.destination;
    } else {
        cheaperDestination = "Neither trip is cheaper";
    }

    return res.status(200).json({
        trip1Destination: trip1.destination,
        trip2Destination: trip2.destination,
        costDifference: costDifference,
        cheaperDestination: cheaperDestination
    });
};

module.exports = {
    GetTrips,
    GetTripByID,
    PostTrip,
    PutTrip,
    DeleteTrip,
    CheckBudget,
    CompareTrips
};
const express=require("express");
const app=express();
app.use(express.json());
const trips=[{id:1, destination:"cairo", cost: 300},
    {id:2, destination:"USA", cost:311},
    {id:3, destination:"dubai", cost:312}
];

app.get('/trips',(req,res) => {
    res.send(trips);
});

app.get("/trips/:id",(req,res) => {
    const id=Number(req.params.id)
    for(let i=0; i<trips.length; i++) 
        {
            if (trips[i].id===id)
            {
                return res.status(200).send(trips[i])
            }
        }
});

app.listen(3000,"127.0.0.1",() =>{
    console.log("server is running locally");
});

app.post("/trips",(req,res) =>{
    const destination123=req.body.destination;
    const cost=req.body.cost;


    const newTrip={
        id:trips.length + 1,
        destination: destination123,
        cost: cost 
    };
    trips.push(newTrip);

    res.status(201).send(newTrip);

});

app.put("/trips/:id", (req, res) => {
    const id = Number(req.params.id);
    for (let i = 0; i < trips.length; i++) {
        if (trips[i].id === id) {
            trips[i].destination = req.body.destination;
            trips[i].cost = req.body.cost;
            return res.status(200).send(trips[i]);
        }
    }
    res.status(404).send("Trip not found");
});

app.delete("/trips/:id", (req, res) => {
    const id = Number(req.params.id);
    for (let i = 0; i < trips.length; i++) {
        if (trips[i].id === id) {
            const deletedTrip = trips.splice(i, 1);
            return res.status(200).send(deletedTrip[0]);
        }
    }
    res.status(404).send("Trip not found");
});


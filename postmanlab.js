const express=require("express");
const app=express();
app.use(express.json());
const trips=[
    {id:1,destination:"cairo",cost:300},
    {id:2,destination:"berlin",cost:311},
    {id:3,destination:"madrid",cost:322},
];

app.get("/trips",(req,res)=>{
res.send(trips);
});


app.get("/trips/:id",(req,res)=>{
    const id=Number(req.params.id);
    for(let i=0;i<trips.length;i++)
        {
        if(trips[i].id===id)
        {
            return res.send(trips[i]);
        }
    }

});

app.listen(3000,"127.0.0.1",()=>{
    console.log("server is running locally :)");

});

app.post("/trips/",(req,res)=>{
    const destination123 = req.body.destination;
    const cost = req.body.cost;

    const newTrip={
    id:trips.length+1,
    destination:destination123,
    cost:cost
};
trips.push(newTrip);
res.status(201).send(newTrip);
});


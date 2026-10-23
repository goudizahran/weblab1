const users = require('../model/UserModel');

const GetUsers = (req, res) => {
    res.status(200).send(users);
};

const GetUserByID = (req, res) => {
    const id = Number(req.params.id);
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            return res.status(200).send(users[i]);
        }
    }
    return res.status(404).send({ message: "User not found" });
};

const PostUser = (req, res) => {
    const name = req.body.name;
    const newUser = {
        id: users.length + 1,
        name: name
    };
    users.push(newUser);
    res.status(201).send(newUser);
};

const PutUser = (req, res) => {
    const id = Number(req.params.id);
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            users[i].name = req.body.name;
            return res.status(200).send(users[i]);
        }
    }
    return res.status(404).send({ message: "User not found" });
};

const DeleteUser = (req, res) => {
    const id = Number(req.params.id);
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            const deletedUser = users.splice(i, 1);
            return res.status(200).send(deletedUser[0]);
        }
    }
    return res.status(404).send({ message: "User not found" });
};

module.exports = {
    GetUsers,
    GetUserByID,
    PostUser,
    PutUser,
    DeleteUser
};
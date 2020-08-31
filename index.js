const express = require('express')

const server = express()

const shortid = require('shortid')

server.use(express.json())

let users = []

server.get('/', (req, res) => {
    res.send('hello world')
})

// LIST USERS
server.get('/api/users', (req, res) => {
    if(!users){
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    }else{
    res.status(200).json({ data: users })
    }
})


// GET USER BY ID
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    let found = users.find(user => user.id === id)
    if(found) {
        res.status(201).json(found)
    }else{
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
})


// POST A NEW USER
server.post('/api/users', (req, res) => {
    const newUser = req.body;
    newUser.id = shortid.generate()
    users.push(newUser)
    res.status(201).json({ message: newUser })
    if(!newUser){
        res.status(404).json({ errorMessage: "Please provide name and bio for the user." })
    }else{
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database." })
    }
})


// DELETE A USER
server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const remove = users.find(user => user.id === id)

    if(!remove){
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }else if(remove){
        res.status(200).json(users = users.filter(user => user.id !== id))
    }else{
        res.status(500).json({ errorMessage: "The user could not be removed." })
    }
})

// EDIT A USER
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    let person = users.find(user => user.id === id)

    if(!person){
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }else if(!changes){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }else if(person){
        Object.assign(person, changes)
        res.status(200).json(person)
    }else{
        res.status(500).json({ errorMessage: "The user information could not be modified." })
    }
})





server.listen(8000, () => console.log('API running on port 8000'))

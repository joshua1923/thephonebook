const personRouter = require('express').Router();
const Person = require('../models/person');
const path = require('path');

// GET all
personRouter.get('/', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons);
    })
});

// GET one
personRouter.get('/:id', (req, res, next) => {
    Person.findById(req.params.id).then(person => {
        if (person) {
            res.json(person);
        } else {
            res.status(404).end();
        }
    }).catch(error => next(error));
});

// POST one
personRouter.post('/', (req, res, next) => {
    const body = req.body;

    const person = new Person({
        name: body.name,
        number: body.number
    });

    person.save()
        .then(savedPerson => {
            res.json(savedPerson)
        })
        .catch(error => next(error));
});

// DELETE one
personRouter.delete('/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id).then(() => {
        res.status(204).end();
    }).catch(error => next(error));
});

// PUT one
personRouter.put('/:id', (req, res, next) => {
    const body = req.body;

    const person = {
        name: body.name,
        number: body.number
    };

    Person.findByIdAndUpdate(req.params.id, person, { new:true })
        .then(updatedPerson => {
            res.json(updatedPerson);
        }).catch(error => next(error));
});

// GET overview
personRouter.get('/info', (req, res) => {

    Person.find({}).then(persons => {
        const personList = persons;
        const personCount = personList.length;
        res.send(`<div><p>Phonebook has info for ${personCount} people</p><p>${Date()}</p></div>`);
    });
});

// GET frontend
personRouter.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/Client/build/index.html'));
});

module.exports = personRouter;
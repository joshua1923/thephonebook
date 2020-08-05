const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
var morgan = require('morgan')

morgan.token('data', (req, res) => {return JSON.stringify(req.body)})

app.use(express.static(path.join(__dirname, '/Client/build')))
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))


let persons = [
    {
      name: "Arto Hellas",
      number: "040-123456",
      id: 1
    },
    {
      name: "Dan Abramov",
      number: "12-43-234345",
      id: 1
    },
    {
      name: "Mary Poppendieck",
      number: "39-23-6423122",
      id: 3
    },
    {
      name: "Josh Lindsay",
      number: "23213213123",
      id: 4
    }
  ]

const generateId = () => {
    const maxId = persons.length > 0 ? Math.max(...persons.map(n => n.id)) : 0

    return maxId + 1
}

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {

    const personCount = persons.length

    res.send(`<div><p>Phonebook has info for ${personCount} people</p><p>${Date()}</p></div>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    
    
    if (!body.name || !body.number) {
        return res.status(400).json({error: 'content missing'})
    }

    if (persons.includes(body.name)) {
        return res.status(400).json({error: 'name must be unique'})
    }

    console.log(body)

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)

    res.json(person)

})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/Client/build/index.html'))
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

// const http = require('http')
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

const Person = require('./models/person');

app.use(express.json());
app.use(express.static('dist'));
app.use(morgan('tiny'));
app.use(cors());

morgan.token('body', (request, response) => {
    return JSON.stringify(request.body);
});

const MAX = 100;

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

// map through an array if see if unique id exists in the array, if not add it to array, if yes, generate a new number
const generateId = () => {
    
    let exists = false;

    do {
        const randomNumber = Math.floor(Math.random() * MAX) + 1;

        // check if any persons with number randomNumber
        exists = persons.find(p => +p.id === randomNumber);
        
        // if does not exist, return the number
        if (!exists) {
            console.log(randomNumber); // remove later
            return randomNumber.toString();
        }

        if (persons.length == MAX) {
            return -1;
        }

    } while (exists);
}

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>');
});

app.get('/info', (request, response) => {
    response.send(`<h2>Phonebook has info for ${persons.length} people</h2>\n
        <p>${Date().toLocaleString()}</p>`);
});

app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
        response.json(person);
    })
});

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = persons.find(p => p.id === id);
    
    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    persons = persons.filter(p => p.id !== id);

    response.status(204).end();
});

app.post('/api/persons', (request, response) => {
    const body = request.body;
    
    if (!body) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    if (person.id === -1) {
        return response.status(404).json({
            error: 'Phonebook is full'
        })
    }

    let exists = persons.find(p => p.name === person.name);

    if (!person.name || !person.number) {
        return response.status(404).json({
            error: 'one or more properties missing'
        })
    }

    if (exists) {
        return response.status(404).json({
            error: `${person.name} already exists`
        })
    }

    persons = persons.concat(person);

    response.json(persons);
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// const http = require('http')
// middleware
const express = require('express');
const morgan = require('morgan');

const app = express();

require('dotenv').config();

const Person = require('./models/person');

app.use(express.json());
app.use(express.static('dist'));
app.use(morgan('tiny'));

morgan.token('body', (request, response) => {
    return JSON.stringify(request.body);
});

const MAX = 100;

let persons = [
    // { 
    //   "id": "1",
    //   "name": "Arto Hellas", 
    //   "number": "040-123456"
    // }
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
    Person.find({}).then(result => {
        response.send(`<h2>Phonebook has info for ${result.length} people</h2>\n
        <p>${Date().toLocaleString()}</p>`);
    }).catch(error => {
        console.log(error);
        response.status(400).end();
    })
});

app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
        response.json(person);
        console.log(person.id);
    }).catch(error => {
        console.log(error);
        response.status(400).end();
    });
});

app.get('/api/persons/:id', (request, response) => {
    // const id = request.params.id;
    // const person = persons.find(p => p.id === id);
    
    // if (person) {
    //     response.json(person);
    // } else {
    //     response.status(404).end();
    // }
    const id = request.params.id;
    Person.findById(id).then(person => {
        if (person) {
            response.json(person);
        } else {
            response.status(404).end();
        }
    }).catch(error => {
        console.log(error);
        response.status(400).send({error: 'malformatted id'});
    })
});

app.post('/api/persons', (request, response) => {
    const body = request.body;
    
    if (!body) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const person = new Person({
        // id: generateId(),
        name: body.name,
        number: body.number
    });

    // if (person.id === -1) {
    //     return response.status(404).json({
    //         error: 'Phonebook is full'
    //     })
    // }

    // check if person exists
    // let exists = persons.find(p => p.name === person.name);

    // check if properties are missing
    // if (!person.name || !person.number) {
    //     return response.status(404).json({
    //         error: 'one or more properties missing'
    //     })
    // }

    // if (exists) {
    //     return response.status(404).json({
    //         error: `${person.name} already exists`
    //     })
    // }

    // persons = persons.concat(person);

    person.save().then(savedPerson => {
        response.json(savedPerson)
    });
});

app.put('/api/persons/:id', (request, response, next) => {
    const {name, number} = request.body;
    const id = request.params.id;

    console.log(`id: ${id}`);

    Person.findById(id).then(person => {
        if (!person) {
            return response.status(404).end();
        }

        person.name = name;
        person.number = number;

        return person.save().then(updatedPerson => {
            response.json(updatedPerson);
        });
    }).catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;
    // persons = persons.filter(p => p.id !== id);

    // response.status(204).end();

    Person.findByIdAndDelete(id).then(result => {
        response.status(204).end();
    }).catch(error => next(error));
});

/*
    Error handlers
 */
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint'});
};

const errorHandler = (error, request, response, next) => {
    console.log(error.message);

    if (error.name === "CastError") {
        return response.status(400).send({error:'malformatted id'});
    }

    next(error);
}

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
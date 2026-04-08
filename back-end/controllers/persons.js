// middleware
const personsRouter = require('express').Router()
const morgan = require('morgan')

require('dotenv').config()

const Person = require('../models/person')

personsRouter.use(morgan('tiny'))

morgan.token('body', (request, response) => {
  return JSON.stringify(request.body)
})

personsRouter.get('/info', (request, response) => {
  Person.find({}).then(result => {
    response.send(`<h2>Phonebook has info for ${result.length} people</h2>\n
      <p>${Date().toLocaleString()}</p>`)
  }).catch(error => {
    console.log(error)
    response.status(400).end()
  })
})

personsRouter.get('/', (request, response) => {
  Person.find({}).then(person => {
    response.json(person)
  }).catch(error => {
    console.log(error)
    response.status(400).end()
  })
})

personsRouter.get('/:id', (request, response) => {

  const id = request.params.id
  Person.findById(id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  }).catch(error => {
    console.log(error)
    response.status(400).send({ error: 'malformatted id' })
  })
})

personsRouter.post('/', (request, response, next) => {
  const body = request.body

  if (!body) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch(error => next(error))
})

personsRouter.put('/:id', (request, response, next) => {
  const { name, number } = request.body
  const id = request.params.id

  console.log(`id: ${id}`)

  Person.findById(id).then(person => {
    if (!person) {
      return response.status(404).end()
    }

    person.name = name
    person.number = number

    return person.save().then(updatedPerson => {
      response.json(updatedPerson)
    })
  }).catch(error => next(error))
})

personsRouter.delete('/:id', (request, response, next) => {
  const id = request.params.id

  console.log(`${id} in app.delete`)

  Person.findByIdAndDelete(id).then(result => {
    response.status(204).end()
  }).catch(error => next(error))
})

/*
  Error handlers
*/
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error:'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

personsRouter.use(errorHandler)

module.exports = personsRouter
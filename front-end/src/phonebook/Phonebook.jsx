import { useState, useEffect } from "react";

import personService from '/src/services/persons.js';

// Components
import PersonForm from "./PersonForm";
import PersonList from "./PersonList";
import Filter from "./Filter";
import Notification from "./Notification";

const Phonebook = () => {
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        console.log('effect');
        personService.getAll().then(response => {
            console.log('promise fulfilled');
            setPersons(response.data);
        });
    }, [persons.length]);

    const [newName, setNewName] = useState('');
    const handleNameChange = event => setNewName(event.target.value);

    const [newNumber, setNewNumber] = useState('');
    const handleNumberChange = event => setNewNumber(event.target.value);

    const [filter, setFilter] = useState('');
    const handleFilter = event => setFilter(event.target.value);

    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(true);

    /*
        Function created for adding people
        - prevent the form from submitting on click
        - create a new 'person' object to add to the list
        - check if person's name already exists in the list
            - add and reset user input if not
            - alert, if is
     */
    const addNewPerson = event => {
        event.preventDefault();

        // create a new person object
        const newPerson = {
            name: newName,
            number: newNumber
        };

        // check if name exists in the list already
        let person = persons.find(p => p.name === newName);

        // Update if person exists already
        if (person) {
            updatePerson(person, newPerson);
        } else { // create if name does not exist
            personService.create(newPerson).then(response => {
                // update useState array of persons objects
                setPersons(persons.concat(newPerson));
                // persons.map(p => console.log(`${p.name}, ${p.number}`));
                // update error message
                setMessage(`${newPerson.name} has been added.`);
                setSuccess(true);
                // clean up input
                setNewName('');
                setNewNumber('');
            }).catch(error => {
                console.log(error.response.data.error);
                setMessage(error.response.data.error);
                setSuccess(false);
            })
        }

        // remove error message after 3 seconds
        setTimeout(() => {setMessage(null)}, 3000);
    }

    /*
        Function to update a person
     */
    const updatePerson = (person, newPerson) => {
        if (window.confirm(`Would you like to update ${person.name}, with a new number?`)) {
            console.log(person);
            personService.update(person.id, newPerson).then(response => {
                console.log(`Updated ${person.name}`);
                // update persons array
                setPersons(persons.map(p => p.id === person.id ? response.data : p));
                setSuccess(true);
                // clean up input
                setNewName('');
                setNewNumber('');
            }).catch(error => {
                setMessage(`${person.name} no longer exists in the phonebook.`);
                setSuccess(false);
            });
        } else {
            setMessage(`${person.name} already exists in the list!`);
        }
    }

    /* 
        Function to delete a person
     */
    const deletePerson = id => {
        const removePerson = persons.find(p => p.id === id);
        
        if (removePerson) {
            personService.remove(id).then(response => {
                console.log(`Removed ${id}: ${response}`);
                setPersons(persons.filter(p => p.id !== id));
                setMessage(`${removePerson.name} has been deleted.`);
                setSuccess(true);
            }).catch(error => {
                setMessage(`Something wrong with deleting`);
                setSuccess(false);
            });

            setTimeout(() => {setMessage(null)}, 5000);
        }
    }

    return (
        <>
            <div>
                <Filter handleFilter={handleFilter} />
                <PersonForm newName={newName} newNumber={newNumber} addNewPerson={addNewPerson} 
                            handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
                <PersonList persons={persons} filter={filter} remove={deletePerson} />
            </div>
            <Notification message={message} success={success}/>
        </>
    )
}

export default Phonebook;
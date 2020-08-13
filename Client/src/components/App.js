import React, {useState, useEffect} from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import personService from '../services/personService';
import Notification from './Notification';
import Styles from './Styles'

const App = () => {
    const [ persons, setPersons ] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newFilter, setNewFilter ] = useState('')
    const [ message, setMessage ] = useState(null)
    const [ style, setStyle ] = useState({})

    useEffect(() => {
        personService.getAll().then(initialData => {
            setPersons(initialData)
        })
    }, [])

    const addPerson = (event) => {
        event.preventDefault();

        const person = persons.find(item => item.name === newName)
        const checkDupes = person ? true : false
        const changedPerson = {...person, number: newNumber}

        if (checkDupes) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

                personService.update(person.id, changedPerson).then(returnedPerson => {
                    setPersons(persons.map(person => person.id !== changedPerson.id ? person : changedPerson))
                })
            }
            
        } else {
            const personObject = {
                name: newName,
                number: newNumber
            }

            personService.create(personObject).then(createdPerson => {
                setPersons(persons.concat(createdPerson))
                setNewName('')
                setMessage(`Added ${personObject.name}`)
                setStyle(Styles.StyleSuccess)
                setTimeout(() => {
                    setMessage(null)
                    setStyle(null)
                  }, 5000)
            }).catch(error => {
                setMessage(error.response.data)
                setTimeout(() => {
                    setMessage(null)
                    setStyle(Styles.StyleError)
                    setStyle(null)
                })
                console.log(error.response.data)
            })
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }
  
    return (
      <div>
        <h2>Phonebook</h2>
        <Notification message={message} classValue={style}/>
        <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
        <h2>Add a new contact</h2>
        <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
        <h2>Contacts</h2>
        <Persons persons={persons} newFilter={newFilter}/>
      </div>
    )
  }

export default App;
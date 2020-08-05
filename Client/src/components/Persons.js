import React from 'react';
import personService from '../services/personService';

const removePerson = (id, name) => {
    if (window.confirm(`delete ${name}`)) {
        personService.remove(id).then(confirmation => {
            let person = document.getElementById(`person-${id}`)
            person.parentNode.removeChild(person)
        })
    }
}

const Persons = ({persons, newFilter}) => {
    return (
        <ul>
        {persons.filter(item => {
            if(!newFilter.toLocaleLowerCase()) return true;
            if(item.name.toLocaleLowerCase().includes(newFilter.toLocaleLowerCase())) {return true};
            return false
        }).map((person) => <li id={"person-" + person.id} key={person.id}>{person.name} {person.number}<button onClick={() => removePerson(person.id, person.name)}>delete</button></li>)}
    </ul>
    )

}

export default Persons;
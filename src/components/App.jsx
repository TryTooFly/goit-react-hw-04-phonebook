import React from "react";
import shortid from "shortid";
import { StyledApp } from "./Container/Container.styled";
import { ContactsList } from "./ContactsList/ContactsList";
import { Filter } from "./Filter/Filter";
import { FormByFormik } from "./Form/Form";
import { Notify } from "notiflix";
import { useState ,useEffect} from "react";

export function App() {
  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem('contacts'))??[]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const parsedValue = JSON.parse(localStorage.getItem('contacts'))
    if (parsedValue) { return setContacts(parsedValue)}
 
  }, [])

  useEffect(() => {localStorage.setItem('contacts',JSON.stringify(contacts))})
      
 const addContact = ({ name, number }) => {
    const card = { id: shortid.generate(), name, number }
    const findSameNumber=contacts.find(contact=>contact.name.toLowerCase()===name.toLowerCase())
    if (findSameNumber) {
      Notify.failure("this name already in list")
      return
   }
const sorted = [card, ...contacts].sort((a, b) => a.name.localeCompare(b.name) )
setContacts(sorted)

  }
  
  const filterContacts = (e) =>setFilter(e.target.value)

  const filterHandleChange = () => {
    const filteredArray = contacts.filter(contact => contact.name.toLowerCase().trim().includes(filter.toLowerCase().trim()) || contact.number.includes(filter.trim()))
    return filteredArray
  }
  const filteredArray=filterHandleChange()
  
  const deleteContacts = id => setContacts(contacts.filter(contact=>contact.id!==id))

     return (
      <StyledApp>
        <h1>Phonebook</h1>
        <FormByFormik addContact={addContact} />
        <h2>Contacts</h2>
        <Filter onChange={filterContacts} value={filter}/>
        <ContactsList data={filteredArray} onClick={deleteContacts} />  
     
     </StyledApp>
    )
}



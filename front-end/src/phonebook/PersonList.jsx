import '../Phonebook.css'

const PersonList = ({persons, filter, remove}) => {

  return (
    <>
      <h3>Numbers</h3>
      {persons.map((p, i) => 
        p.name.toLowerCase().includes(filter.toLowerCase()) ? 
          <p key={i} className='contact-list'><span className='contact'>{p.name}: {p.number}</span><button onClick={() => 
                  remove(p.id)}>Delete</button></p> : '')}
    </>
  )
}

export default PersonList
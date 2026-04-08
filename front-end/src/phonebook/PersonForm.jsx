const PersonForm = ({newName, newNumber, addNewPerson, handleNameChange, handleNumberChange}) => {
  
  return (
    <>
    <h2>Add New</h2>
    <form onSubmit={addNewPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
    </>
  )
}

export default PersonForm;
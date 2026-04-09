const PersonForm = ({ newName, newNumber, addNewPerson, handleNameChange, handleNumberChange }) => {
  
  return (
    <>
      <h3>Add New</h3>
      <form onSubmit={addNewPerson} className='form'>
        <div className='bar'>
          <input value={newName} placeholder='name' onChange={handleNameChange} className='input'/>
          <input value={newNumber} placeholder='number' onChange={handleNumberChange} className='input'/>
          <div className='submit-button'>
            <button type="submit">+</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default PersonForm
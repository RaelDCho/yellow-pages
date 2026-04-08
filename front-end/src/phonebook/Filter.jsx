

const Filter = ({handleFilter}) => {
  
  return (
    <>
    <h2>Phonebook</h2>
    filter: <input onChange={handleFilter}/>
    </>
  )
}

export default Filter;
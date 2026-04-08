

const Filter = ({ handleFilter }) => {
  
  return (
    <div className='filter'>
      <input onChange={handleFilter} placeholder='search'/>
    </div>
  )
}

export default Filter;
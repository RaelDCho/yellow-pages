

const PersonList = ({persons, filter, remove}) => {

    return (
        <>
            <h2>Numbers</h2>
            {persons.map((p, i) => 
                p.name.toLowerCase().includes(filter.toLowerCase()) ? <p key={i}>{p.name}: {p.number}<button onClick={() => remove(p.id)}>Delete</button></p> : '')}
        </>
    )
}

export default PersonList;
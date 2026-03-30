import './App.css'

import Phonebook from './phonebook/Phonebook.jsx'

const Footer = () => {

  return(
    <>
      <div>
        App created by <a href='https://github.com/RaelDCho'>RaelDCho</a>
      </div>
    </>
  )
}

function App() {

  return (
    <>
      <Phonebook />
    </>
  )
}

export default App
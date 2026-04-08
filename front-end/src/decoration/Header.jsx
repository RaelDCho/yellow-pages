import '../Decoration.css'
import logo from "../assets/yellow-pages-icon.png"

const Header = () => {

  return (
    <div className='header'>
      <img className='logo' src={logo} alt="icon"/>
      <h2>Yellow Pages</h2>
    </div>
  )
}

export default Header
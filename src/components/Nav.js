import whiteLogo from '../images/tinder_logo_white.png'
import colorLogo from '../images/tinder_logo_color.png'

const Nav = ({ minimal, authToken, setShowModal, showModal }) => {

    const handleClick = () => {
        setShowModal(true)
    }

    return (
        <nav>
            <div className="logo-container">
                <img src={minimal ? colorLogo : whiteLogo} alt="" className="logo" />
            </div>
            {!authToken && !minimal && 
            <button 
                className="nav-button" 
                onClick={handleClick}
                disabled={showModal}
            >Log In</button>}
        </nav>
    )
}

export default Nav
import "./Popup.css"

const Popup = ({message, onClose}) => {
    if(!message) return null;
  return (
    <div className='popup-overlay'>
        <div className='popup-content'>
            <h2>{message}</h2>
            <button onClick={onClose} className='popup-close-btn'>Close</button>
        </div>
    </div>
  )
}

export default Popup
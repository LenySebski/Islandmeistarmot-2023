import CatIcon from '../Images/Caticon.png';
import Line from '../Images/Line 5.png';
import Paw from '../Images/Pawicon.png';

function LostPet () {
    return (
        <div className="container">
            <button className="Register">
                <img className='caticon' src={CatIcon}></img>
                <img className='line1' src={Line}></img>
                <p className='register-text'>Register Cat</p>
            </button>
            <button className="Database">
                <img className='pawicon' src={Paw}></img>
                <img className='line2' src={Line}></img>
                <p className='database-text'>Cat Database</p>
            </button>
        </div>
      );
}

export default LostPet;
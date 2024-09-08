import  { useState } from 'react';
import PropTypes from 'prop-types';

const Transport = ({ setModeOfTransport }) => {
    const [selectedMode, setSelectedMode] = useState('');

    const handleTransportChange = (event) => {
        const { value } = event.target;
        setSelectedMode(value);
        setModeOfTransport(value);
    };

    return (
        <div className='ml-5 mt-1'>
            <p>Mode of Transport:</p>
            <div className="transport d-flex flex-row">
                <div className="form-group justify-content-center align-items-center">
                    <input 
                        type="radio" 
                        className='mr-1' 
                        value="train" 
                        name='transport' 
                        checked={selectedMode === 'train'} 
                        onChange={handleTransportChange} 
                    /> 
                    <label htmlFor="train">Train</label>
                </div>
                <div className="form-group ml-2">
                    <input 
                        type="radio" 
                        className='ml-2 mr-1'  
                        value="car" 
                        checked={selectedMode === 'car'} 
                        onChange={handleTransportChange} 
                    /> 
                    <label htmlFor="car">Car</label>
                </div>
                <div className="form-group ml-2">
                    <input 
                        type="radio" 
                        className='ml-2 mr-1'  
                        value="flight" 
                        checked={selectedMode === 'flight'} 
                        onChange={handleTransportChange} 
                    /> 
                    <label htmlFor="flight">Flight</label>
                </div>
            </div>
        </div>
    );
};

// Define prop types for validation
Transport.propTypes = {
    setModeOfTransport: PropTypes.func.isRequired
};

export default Transport;

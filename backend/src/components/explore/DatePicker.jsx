import PropTypes from 'prop-types';

const DatePicker = ({ setDate, dateType }) => {
    return (
        <div>
            <input 
                type="date" 
                className='input-date' 
                onChange={(e) => setDate(e.target.value)} 
            />
        </div>
    );
};

// Define prop types for validation
DatePicker.propTypes = {
    setDate: PropTypes.func.isRequired,
    dateType: PropTypes.string.isRequired
};

export default DatePicker;

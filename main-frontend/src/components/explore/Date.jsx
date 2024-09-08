import  { useState } from 'react';
import PropTypes from 'prop-types';

const Date = ({ setStartDate }) => {
  const [date, setDate] = useState('');

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    setStartDate(selectedDate);  // Update the start date in the parent component
  };

  return (
    <div className='form-group'>
      <label htmlFor="startDate">Select Start Date:</label>
      <input
        type="date"
        id="startDate"
        className='form-control'
        value={date}
        onChange={handleDateChange}
      />
    </div>
  );
};

// Prop validation
Date.propTypes = {
  setStartDate: PropTypes.func.isRequired
};

export default Date;

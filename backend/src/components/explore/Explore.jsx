import  { useState } from 'react';
import axios from 'axios';
import City from './City';
import Transport from './Transport';
import DatePicker from './DatePicker';
import Hotel from './Hotel';
import { useNavigate } from 'react-router-dom';

const Explore = () => {

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3000/Destination", {
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem("token")
  //       }
  //     });
  //     console.log("Data fetched successfully");
  //     // Process response data if needed
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     navigate('/Login'); // Navigate to the login page on error
  //   }
  // };
  
  // fetchData();
  
  const navigate = useNavigate();
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [start, setStart] = useState("")
  const [modeOfTransport, setModeOfTransport] = useState('');
  const [hotelPreferences, setHotelPreferences] = useState({});
  const [loading, setLoading] = useState(false);
  const [userid , setUserid ] = useState("")
  const handleOnClick = async () => {
    setUserid(localStorage.getItem(""))
    setLoading(true);
    try {
      const data = {
        userid: "saran123@gmail.com",
        State: state,
        City: city,
        BusinessAcceptsCreditCards: hotelPreferences.creditcard,
        RestaurantsTakeOut: hotelPreferences.restaurantTakeOut,
        WiFi: hotelPreferences.wifi,
        GoodForKids: hotelPreferences.goodForKids,
        RestaurantsAttire: hotelPreferences.restaurantAffairs,
        RestaurantsGoodForGroups: hotelPreferences.goodforgroup,
        Garage: hotelPreferences.garage,
        Street: hotelPreferences.street,
        Lot: hotelPreferences.lot,
        Valet: hotelPreferences.valet,
        BikeParking: hotelPreferences.bikeParking,
        Start: start,
        modeOfTransport: modeOfTransport,
        num_days: Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))
      };
      console.log("Othaaaaaaaaaaaaaaa veraaaaaa mariiiiiiii",data)
      console.log("hello1")
      const response = await axios.post("http://localhost:5000/overall", data);
      console.log("Ooooooooooooooooooveeeeeeeeeeerrrrrrrrrallllllllllllllll data", response.data)
      navigate('/render', { state: { 
        shortItinerary: response.data.op_costplan, 
        hoteldetails: response.data.op_recommend 
      }});
    } catch (error) {
      console.error("There was an error fetching the itinerary!", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='explore-bg d-flex flex-row justify-content-center bg-padding'>
      <form className='plan-inputs'>
        <h1 className="text-center">Start Your Plan</h1>
        <City setState={setState} setCity={setCity} setStart={setStart} />
        <div className='d-flex flex-row'>
          <div className="form-group d-flex flex-column mr-5">
            <label htmlFor="startDate">From</label>
            <DatePicker setDate={setStartDate} dateType="start" />
          </div>
          <div className="form-group d-flex flex-column">
            <label htmlFor="endDate">To</label>
            <DatePicker setDate={setEndDate} dateType="end" />
          </div>
          <Transport setModeOfTransport={setModeOfTransport} />
        </div>
        <Hotel setHotelPreferences={setHotelPreferences} />
        <button type='button' className='btn submit-btn mb-4' onClick={handleOnClick}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Explore;

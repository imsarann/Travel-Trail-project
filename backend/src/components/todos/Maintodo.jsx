// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function Maintodo() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const [state, setState] = useState('');
//   const [city, setCity] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [modeOfTransport, setModeOfTransport] = useState('');
//   const [hotelPreferences, setHotelPreferences] = useState({});

//   const handleOnClick = async () => {
//     setLoading(true);
//     try {
//       const data = {
//         userid: "saran123@gmail.com",
//         State: state,
//         City: city,
//         BusinessAcceptsCreditCards: hotelPreferences.creditcard,
//         RestaurantsTakeOut: hotelPreferences.restaurantTakeOut,
//         WiFi: hotelPreferences.wifi,
//         GoodForKids: hotelPreferences.goodForKids,
//         RestaurantsAttire: hotelPreferences.restaurantAffairs,
//         RestaurantsGoodForGroups: hotelPreferences.goodforgroup,
//         Garage: hotelPreferences.garage,
//         Street: hotelPreferences.street,
//         Lot: hotelPreferences.lot,
//         Valet: hotelPreferences.valet,
//         BikeParking: hotelPreferences.bikeParking,
//         Start: startDate,
//         modeOfTransport: modeOfTransport,
//         num_days: Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))
//       };
//        console.log("Othaaaaaaaa Masssssssss" ,data) 
//       const response = await axios.post("http://localhost:5000/overall", data);
//       navigate('/render', { state: { 
//         shortItinerary: response.data.op_costplan, 
//         hoteldetails: response.data.op_recommend 
//       }});
//     } catch (error) {
//       console.error("There was an error fetching the itinerary!", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <button onClick={handleOnClick} className='btn submit-btn mb-4'>
//         Submit
//       </button>
//     </div>
//   );
// }

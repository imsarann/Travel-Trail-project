import { useState, useEffect } from 'react';
import axios from 'axios';

const Hotels = () => {
  const [recommendations, setRecommendations] = useState([]);
  const useremail = localStorage.getItem("userid")

  useEffect(() => {
    if (useremail) {
      // Fetch the recommendations from the backend using Axios
      axios.post('http://localhost:5000/recommendations/similar_city', { userid: useremail || "saransaran@gamil"})
        .then(response => {
          // Assuming the response data is already an array of recommendations
          const newdata = JSON.parse(response.data);
          setRecommendations(newdata);
        })
        .catch(error => {
          console.error('Error fetching recommendations:', error);
        });
    }
  }, [useremail]);

  return (
    <div className="container-fluid hotels-bg">
      <h1 className="text-white pt-5">Top Pick Hotels</h1>
      <div className="row">
        {recommendations.map((rec, index) => (
          <div key={index} className="col-md-6 col-lg-6 mb-4">
            <div className="hotels-card shadow p-2">
              <div className="d-flex flex-row">
                <img 
                  src={`../src/assets/${index % 11}.jpg`} 
                  width={"170"} 
                  height={"200"} 
                  className="hotel-img" 
                  alt={`${rec.name} hotel`} 
                />
                <div className="ml-3 p-3">
                  <h2 className="hotel-name">{rec.name}</h2>
                  <p className="hotel-address">{rec.address}</p>
                  <p>City: {rec.City}, State: {rec.State}</p>
                  <p>Categories: {rec.categories}</p>
                  <p className="hotel-rating">Rating: {'⭐'.repeat(rec.stars)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hotels;

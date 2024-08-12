import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

export default function Images() {
  const location = useLocation();
  const { hoteldetails } = location.state || {};
  console.log("Hooooooooooooooooooooooooooooooteeeeeeeeeeelllllllllll", hoteldetails[1])
  const hotelData = hoteldetails ? JSON.parse(hoteldetails) : [];

  return (
    <div className="todo-bg pt-5">
      <h1 className="text-white">Top Pick Hotels</h1>
      <div className="container">
        <div className="row">
          {hotelData.map((hotel, index) => (
            <div key={index} className="col-md-6 mb-4">
              <div className="hotels-card shadow p-2">
                <div className="d-flex flex-row">
                  <img
                    src={`../src/assets/${index % 11}.jpg`} // Add the image URL here if available
                    width={"170"}
                    height={"200"}
                    className="hotel-img"
                    alt={hotel.name}
                  />
                  <div className="ml-3">
                    <h3 className="hotel-name">{hotel.name}</h3>
                    <p className="hotel-address">
                      {hotel.address}, {hotel.City}, {hotel.State} {hotel.postal_code}
                    </p>
                    <p>Rating: {"⭐".repeat(hotel.stars)}</p>
                    <button className="btn book-now">Book Now</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Images.propTypes = {
  hoteldetails: PropTypes.string.isRequired,
};

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Destination() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);

  useEffect( () => {
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get("http://localhost:3000/Destination");
    //     console.log("Data fetched successfully");
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //     navigate('/Login'); // Use quotes for the string path
    //   }
    // };
    // fetchData();
  const destinationData = [
      { 
        name: 'California',
        img: "../src/assets/california.png",
        description: "California offers a diverse range of experiences, from the stunning beaches of the Pacific Coast to the rugged mountains and lush forests of the north. Visitors can explore iconic cities like Los Angeles and San Francisco, enjoy world-class wine in Napa Valley, or marvel at the natural beauty of Yosemite National Park.",
        region: 'west',
        rating: '4',
        type: 'Beach',
        favorite: false
    },
    { 
        name: 'Missouri',
        img: "../src/assets/missouri.jpg",
        description: "Missouri is known for its vibrant music scene, historic landmarks, and beautiful landscapes. From the bustling streets of St. Louis to the charming small towns nestled in the Ozarks, Missouri offers a unique blend of culture, history, and outdoor adventure. The state is also famous for its delicious barbecue and rich blues music heritage.",
        region: 'midwest',
        rating: '3',
        type: 'City',
        favorite: false
    },
    { 
        name: 'Arizona',
        img: "../src/assets/arizona.jpg",
        description: "Arizona is a land of contrasts, with its breathtaking deserts, towering canyons, and vibrant cities. Visitors can explore the awe-inspiring Grand Canyon, hike through the red rocks of Sedona, or immerse themselves in the cultural richness of Phoenix. Arizona's unique landscapes and sunny weather make it a perfect destination for outdoor enthusiasts.",
        region: 'west',
        rating: '4',
        type: 'Desert',
        favorite: false
    },
    { 
        name: 'Pennsylvania',
        img: "../src/assets/pennsylvania.jpg",
        description: "Pennsylvania is steeped in history, offering visitors a chance to explore significant landmarks such as Independence Hall and Gettysburg. The state is also home to picturesque countryside, charming Amish communities, and vibrant cities like Philadelphia and Pittsburgh. Whether you're interested in history, culture, or nature, Pennsylvania has something for everyone.",
        region: 'northeast',
        rating: '4',
        type: 'Historical',
        favorite: false
    },
    { 
        name: 'Tennessee',
        img: "../src/assets/tennessee.jpg",
        description: "Tennessee is a state with a rich musical heritage, known for its contributions to country, blues, and rock 'n' roll. Visitors can explore the vibrant music scene in Nashville, enjoy the scenic beauty of the Great Smoky Mountains, or experience the lively atmosphere of Memphis. Tennessee's diverse attractions make it a must-visit destination.",
        region: 'south',
        rating: '4',
        type: 'Music',
        favorite: false
    },
    { 
        name: 'Florida',
        img: "../src/assets/florida.jpg",
        description: "Florida is a paradise for sun-seekers and adventure enthusiasts alike. With its pristine beaches, thrilling theme parks, and vibrant nightlife, the Sunshine State offers endless opportunities for relaxation and excitement. Visitors can explore the unique ecosystems of the Everglades, enjoy the cultural diversity of Miami, or unwind in the tranquil Florida Keys.",
        region: 'south',
        rating: '5',
        type: 'Beach',
        favorite: false
    },
    { 
        name: 'Indiana',
        img: "../src/assets/indiana.jpg.webp",
        description: "Indiana offers a mix of urban and rural experiences, with its vibrant cities, charming small towns, and beautiful countryside. Visitors can explore the cultural attractions of Indianapolis, enjoy outdoor activities in the Indiana Dunes, or experience the warmth and hospitality of the Hoosier State. Indiana's rich history and diverse attractions make it a hidden gem in the Midwest.",
        region: 'midwest',
        rating: '3',
        type: 'City',
        favorite: false
    },
    { 
        name: 'Louisiana',
        img: "../src/assets/lousiana.jpg",
        description: "Louisiana is known for its vibrant culture, delicious cuisine, and lively music scene. Visitors can experience the unique blend of French, African, and Spanish influences in the state's architecture, food, and festivals. From the lively streets of New Orleans to the peaceful bayous of the Atchafalaya Basin, Louisiana offers a captivating and unforgettable experience.",
        region: 'south',
        rating: '4',
        type: 'Cultural',
        favorite: false
    },
    { 
        name: 'Nevada',
        img: "../src/assets/nevada.jpg",
        description: "Nevada is a state of contrasts, with its bustling cities and serene desert landscapes. Visitors can experience the excitement of Las Vegas, explore the natural beauty of the Sierra Nevada mountains, or discover the historic charm of Virginia City. Whether you're seeking adventure, entertainment, or relaxation, Nevada has something to offer.",
        region: 'west',
        rating: '4',
        type: 'Entertainment',
        favorite: false
    },
    { 
        name: 'Idaho',
        img: "../src/assets/idaho.jpg",
        description: "Idaho is a haven for outdoor enthusiasts, with its rugged mountains, pristine lakes, and expansive wilderness areas. Visitors can enjoy activities such as hiking, fishing, and skiing in the state's beautiful landscapes. Idaho is also known for its friendly communities and vibrant arts scene, making it a perfect destination for those seeking adventure and culture.",
        region: 'west',
        rating: '3',
        type: 'Nature',
        favorite: false
    },
    { 
        name: 'Delaware',
        img: "../src/assets/delaware.jpg",
        description: "Delaware may be small in size, but it offers a wealth of attractions and experiences. Visitors can explore historic sites, beautiful beaches, and charming small towns. The state's rich history, vibrant arts scene, and scenic landscapes make it a perfect destination for those seeking relaxation and adventure.",
        region: 'northeast',
        rating: '3',
        type: 'Coastal',
        favorite: false
    },
    { 
        name: 'Illinois',
        img: "../src/assets/illinois.jpg",
        description: "Illinois is a state of diverse experiences, from the bustling metropolis of Chicago to the serene landscapes of the countryside. Visitors can explore world-class museums, enjoy outdoor activities in the state's parks and lakes, or experience the rich cultural heritage of Illinois. The state's vibrant cities and charming small towns offer something for everyone.",
        region: 'midwest',
        rating: '4',
        type: 'City',
        favorite: false
    },
    { 
        name: 'New Jersey',
        img: "../src/assets/newjersey.jpg",
        description: "New Jersey is a state of contrasts, with its beautiful beaches, vibrant cities, and picturesque countryside. Visitors can explore the cultural attractions of Newark, relax on the sandy shores of the Jersey Shore, or discover the historic charm of Princeton. New Jersey's diverse landscapes and attractions make it a perfect destination for travelers seeking a unique experience.",
        region: 'northeast',
        rating: '4',
        type: 'Coastal',
        favorite: false
    },
    { 
        name: 'North Carolina',
        img: "../src/assets/north_carolina.jpg",
        description: "North Carolina offers a diverse range of experiences, from the majestic Blue Ridge Mountains to the sandy beaches of the Outer Banks. Visitors can explore the vibrant cities of Raleigh and Charlotte, enjoy outdoor activities in the state's parks and forests, or experience the rich cultural heritage of the region. North Carolina's natural beauty and vibrant communities make it a must-visit destination.",
        region: 'south',
        rating: '4',
        type: 'Mountain',
        favorite: false
    },
    { 
        name: 'Colorado',
        img: "../src/assets/colorado.jpg",
        description: "Colorado is a paradise for outdoor enthusiasts, with its majestic Rocky Mountains, stunning national parks, and vibrant cities. Visitors can enjoy activities such as skiing, hiking, and mountain biking in the state's beautiful landscapes. Colorado is also known for its friendly communities, rich history, and vibrant arts scene, making it a perfect destination for those seeking adventure and culture.",
        region: 'west',
        rating: '5',
        type: 'Mountain',
        favorite: false
    },
    { 
        name: 'Washington',
        img: "../src/assets/washington.jpeg.jpg",
        description: "Washington is a state of contrasts, with its vibrant cities, lush forests, and stunning coastlines. Visitors can explore the iconic landmarks of Seattle, enjoy outdoor activities in the state's national parks, or discover the charming small towns of the region. Washington's diverse landscapes and attractions make it a perfect destination for travelers seeking a unique experience.",
        region: 'west',
        rating: '5',
        type: 'Nature',
        favorite: false
    },
    { 
        name: 'Hawaii',
        img: "../src/assets/hawaii.jpg",
        description: "Hawaii is a tropical paradise, known for its stunning beaches, lush landscapes, and vibrant culture. Visitors can explore the unique ecosystems of the islands, enjoy activities such as surfing and snorkeling, or experience the rich cultural heritage of the Hawaiian people. Hawaii's natural beauty and welcoming communities make it a perfect destination for those seeking relaxation and adventure.",
        region: 'west',
        rating: '5',
        type: 'Beach',
        favorite: false
    },
    { 
        name: 'Utah',
        img: "../src/assets/utah.jpg",
        description: "Utah is a state of stunning natural beauty, with its iconic national parks, rugged mountains, and vibrant cities. Visitors can enjoy activities such as hiking, skiing, and rock climbing in the state's beautiful landscapes. Utah is also known for its friendly communities, rich history, and vibrant arts scene, making it a perfect destination for those seeking adventure and culture.",
        region: 'west',
        rating: '4',
        type: 'Mountain',
        favorite: false
    },
    { 
        name: 'Texas',
        img: "../src/assets/texas.png",
        description: "Texas is a state of vast landscapes and vibrant cities, known for its rich history, diverse culture, and friendly communities. Visitors can explore the bustling streets of Houston and Dallas, enjoy outdoor activities in the state's parks and lakes, or experience the unique charm of small towns like Fredericksburg. Texas offers a diverse range of experiences, making it a perfect destination for travelers seeking adventure and relaxation.",
        region: 'south',
        rating: '5',
        type: 'City',
        favorite: false
    },
    { 
        name: 'Montana',
        img: "../src/assets/montana.jpg",
        description: "Montana is a haven for outdoor enthusiasts, with its rugged mountains, expansive wilderness areas, and stunning national parks. Visitors can enjoy activities such as hiking, fishing, and wildlife viewing in the state's beautiful landscapes. Montana is also known for its friendly communities and rich cultural heritage, making it a perfect destination for those seeking adventure and culture.",
        region: 'west',
        rating: '3',
        type: 'Nature',
        favorite: false
    },
    { 
        name: 'Michigan',
        img: "../src/assets/michigan.jpg",
        description: "Michigan offers a diverse range of experiences, from the vibrant cities of Detroit and Grand Rapids to the serene landscapes of the Great Lakes. Visitors can explore world-class museums, enjoy outdoor activities in the state's parks and forests, or experience the rich cultural heritage of the region. Michigan's natural beauty and vibrant communities make it a must-visit destination.",
        region: 'midwest',
        rating: '4',
        type: 'Lake',
        favorite: false
    },
    { 
        name: 'South Dakota',
        img: "../src/assets/south_dakota.jpeg.jpg",
        description: "South Dakota is a state of iconic landmarks and stunning landscapes, known for its rich history, diverse culture, and friendly communities. Visitors can explore the iconic landmarks of Mount Rushmore and Badlands National Park, enjoy outdoor activities in the state's parks and lakes, or discover the unique charm of small towns like Deadwood. South Dakota offers a diverse range of experiences, making it a perfect destination for travelers seeking adventure and relaxation.",
        region: 'midwest',
        rating: '3',
        type: 'Nature',
        favorite: false
    },
    { 
        name: 'Massachusetts',
        img: "../src/assets/massaschusetts.jpg",
        description: "Massachusetts is a state of rich history, vibrant culture, and stunning landscapes. Visitors can explore the historic landmarks of Boston, enjoy outdoor activities in the state's parks and forests, or experience the unique charm of small towns like Salem. Massachusetts offers a diverse range of experiences, making it a perfect destination for travelers seeking adventure and culture.",
        region: 'northeast',
        rating: '4',
        type: 'Historical',
        favorite: false
    },
    { 
        name: 'Vermont',
        img: "../src/assets/vermont.jpg",
        description: "Vermont is a state of charming landscapes and vibrant communities, known for its rich history, diverse culture, and friendly communities. Visitors can explore the historic landmarks of Montpelier and Burlington, enjoy outdoor activities in the state's parks and forests, or experience the unique charm of small towns like Stowe. Vermont offers a diverse range of experiences, making it a perfect destination for travelers seeking adventure and relaxation.",
        region: 'northeast',
        rating: '3',
        type: 'Nature',
        favorite: false
    }
    ];

    setDestinations(destinationData);
  }, []);

  const handleSearchChange = (e) => setSearchQuery(e.target.value.toLowerCase());
  const handleRegionChange = (e) => setRegionFilter(e.target.value);
  const handleRatingChange = (e) => setRatingFilter(e.target.value);
  const handleTypeChange = (e) => setTypeFilter(e.target.value.toLowerCase());

  const toggleFavorite = (index) => {
    setDestinations((prevDestinations) => {
      const updatedDestinations = [...prevDestinations];
      updatedDestinations[index] = {
        ...updatedDestinations[index],
        favorite: !updatedDestinations[index].favorite,
      };
      return updatedDestinations;
    });
  };

  const filterDestinations = () => {
    return destinations.filter((destination) => {
      const matchesRegion = !regionFilter || destination.region === regionFilter;
      const matchesRating = !ratingFilter || destination.rating === ratingFilter;
      const matchesType = !typeFilter || destination.type.toLowerCase().includes(typeFilter);
      const matchesSearch = !searchQuery || destination.name.toLowerCase().includes(searchQuery);

      return matchesRegion && matchesRating && matchesType && matchesSearch;
    });
  };

  const filteredDestinations = filterDestinations();

  const handleShowModal = (index) => setSelectedDestination(index);
  const handleCloseModal = () => setSelectedDestination(null);

  const handleFavoriteModal = () => {
    if (selectedDestination !== null) {
      toggleFavorite(selectedDestination);
    }
  };

  return (
    <div className="destinations">
      <h2 className='text-white mt-4'>Explore Your Next Destinations</h2>
      <div className="search-filters d-flex flex-row justify-content-center">
        <input
          id="search-bar"
          type="search"
          className='searchbar w-50'
          placeholder="Search..."
          onChange={handleSearchChange}
        />
        <div className="filters">
          <select id="region-filter" className='option-style' onChange={handleRegionChange}>
            <option value="">All Regions</option>
            <option value="west">West</option>
            <option value="midwest">Midwest</option>
            <option value="northeast">Northeast</option>
            <option value="south">South</option>
          </select>
          <select id="rating-filter" className='option-style' onChange={handleRatingChange}>
            <option value="">All Ratings</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <select id="type-filter" className='option-style' onChange={handleTypeChange}>
            <option value="">All Types</option>
            <option value="Beach">Beach</option>
            <option value="City">City</option>
            <option value="Desert">Desert</option>
            <option value="Historical">Historical</option>
            <option value="Music">Music</option>
            <option value="Cultural">Cultural</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Nature">Nature</option>
            <option value="Coastal">Coastal</option>
            <option value="Mountain">Mountain</option>
            <option value="Lake">Lake</option>
          </select>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center">
          {filteredDestinations.length > 0 ? (
            filteredDestinations.map((destination, index) => (
              <div
                key={index}
                className="destination-item shadow"
                data-region={destination.region}
                data-rating={destination.rating}
                data-type={destination.type}
              >
                <img src={destination.img} alt={destination.name} className="travel-img" />
                <div className="destination-info">
                  <h3>{destination.name}</h3>
                  <p>{destination.type}</p>
                  <div className="rating">{'⭐'.repeat(destination.rating)}</div>
                  <button className='view-more mt-2' onClick={() => handleShowModal(index)}>View More</button>
                  <span className="favorite" onClick={() => toggleFavorite(index)}>
                    {destination.favorite ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                      </svg>
                    )}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white no-data">
              <p>No results found</p>
            </div>
          )}
        </div>
      </div>

      {selectedDestination !== null && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-body">
                <img src={filteredDestinations[selectedDestination].img} style={{borderRadius: '15px'}} width={"100%"} alt={filteredDestinations[selectedDestination].name} className='modal-image' />
                <div class="d-flex flex-row mt-3">
                  <h5 className="modal-title text-white" id="exampleModalLabel">
                    {filteredDestinations[selectedDestination].name}
                  </h5>
                  <span className="favorite" onClick={handleFavoriteModal}>
                      {filteredDestinations[selectedDestination].favorite ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                        </svg>
                      )}
                  </span>
                </div>
                <p className="modal-description mt-3">
                  {filteredDestinations[selectedDestination].description}
                </p>
                <div className="rating text-white">Rating: {'⭐'.repeat(filteredDestinations[selectedDestination].rating)}</div>
                  <h1 className="popular-locations text-left mt-3">Popular Locations</h1>
                  <ul className="text-left text-white ml-5">
                    <li>Location1</li>
                    <li>Location2</li>
                    <li>Location3</li>
                  </ul>
                  <h1 className="popular-locations text-left mt-3">Historical Attractions</h1>
                  <ul className="text-left text-white ml-5">
                    <li>Attraction1</li>
                    <li>Attraction2</li>
                    <li>Attraction3</li>
                  </ul>
                </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={handleCloseModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Destination;

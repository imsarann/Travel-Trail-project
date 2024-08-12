import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from "./TodosCreator.module.css";

function TodosCreator() {
  const location = useLocation();
  const { shortItinerary } = location.state || {};

  if (!shortItinerary) {
    return <div>No itinerary available</div>;
  }

  return (
  <div className='todo-bg'>
    <div className={styles["itinerary-container"]}>
      {Object.keys(shortItinerary).map(
        (dayKey) =>
          dayKey !== "cost" &&
          dayKey !== "estimation" && (
            <div key={dayKey} className={styles["day-container"]}>
              <h4>{dayKey.replace("-", " ").toUpperCase()}</h4>
              {Object.entries(shortItinerary[dayKey]).map(([key, activity]) => (
                <li key={key} className='activities'>
                  <p>{activity}</p>
                </li>
              ))}
            </div>
          )
      )}
      <div className={styles["summary-container"]}>
        <h4>Total Cost: {shortItinerary.cost}</h4>
        <ol className=''>
          {shortItinerary.estimation.map((item, index) => (
            <li key={index} className='ml-5'>{item}</li>
          ))}
        </ol>
      </div>
      </div>
  </div>
  );
}

TodosCreator.propTypes = {
  shortItinerary: PropTypes.shape({
    cost: PropTypes.string.isRequired,
    estimation: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default TodosCreator;

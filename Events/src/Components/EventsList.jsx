import { useState, useEffect } from "react";
import EventCard from "./EventCard";
import { getEvents } from "../api";

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    setLoading(true);
    setError(null); // Reset error on every fetch attempt
    getEvents()
      .then((eventsFromAPI) => {
        setEvents(eventsFromAPI);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setError(
          "Something went wrong while fetching events. Please try again later."
        ); // Set error message
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h2 id="Header">Check out all of the available events</h2>
      {loading ? (
        <div className="Spinner"></div>
      ) : error ? (
        <div className="ErrorMessage">{error}</div> // Display error message
      ) : events.length === 0 ? (
        <div className="NoEventsMessage">
          No events available at the moment.
        </div> // Handle empty state
      ) : (
        <div>
          <ul id="EventList">
            {events.map((event) => (
              <li key={event.id}>
                <EventCard event={event} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default EventsList;

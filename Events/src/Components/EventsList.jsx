import { useState } from "react";
import { useEffect } from "react";
import EventCard from "./EventCard";
import { getEvents } from "../api";

const EventsList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then((eventsFromAPI) => {
      setEvents(eventsFromAPI);
    });
  }, []);

  return (
    <>
      <h2 id="Header">Check out all of the available events</h2>
      {events ? (
        <div>
          <ul id="EventList">
            {events.map((event) => {
              return (
                <li>
                  <EventCard event={event} key={event.id} />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="Spinner"></div>
      )}
    </>
  );
};

export default EventsList;

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
      {
        <ul className="EventList">
          {events.map((event) => {
            return <EventCard event={event} key={event.id} />;
          })}
        </ul>
      }
    </>
  );
};

export default EventsList;

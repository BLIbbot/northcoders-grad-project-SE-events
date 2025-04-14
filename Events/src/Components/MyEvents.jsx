import { getStaffEvents } from "../api";
import { useEffect, useState, useContext } from "react";
import { LoggedInUserContext } from "../Contexts/LoggedInUser";
import EventCard from "./EventCard";

const MyEvents = () => {
  const [staffEvents, setStaffEvents] = useState([]);
  const { loggedInUser } = useContext(LoggedInUserContext);

  useEffect(() => {
    getStaffEvents(loggedInUser).then((eventsFromAPI) => {
      setStaffEvents(eventsFromAPI);
    });
  }, []);

  return (
    <>
      <>
        <h2 id="Header">Your Events</h2>
        {
          <ul className="EventList">
            {staffEvents.map((event) => {
              return <EventCard event={event} key={event.id} />;
            })}
          </ul>
        }
      </>
    </>
  );
};

export default MyEvents;

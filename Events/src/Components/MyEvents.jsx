import { addEvent, getStaffEvents } from "../api";
import { useEffect, useState, useContext } from "react";
import { LoggedInUserContext } from "../Contexts/LoggedInUser";
import { DeletingContext } from "../Contexts/DeletingHandler";
import { EditingContext } from "../Contexts/EditingHandler";
import EventCard from "./EventCard";

const MyEvents = () => {
  const [staffEvents, setStaffEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { loggedInUser } = useContext(LoggedInUserContext);
  const { deleting } = useContext(DeletingContext);
  const { editing } = useContext(EditingContext);
  const [addingEvent, setAddingEvent] = useState(null);
  const [msg, setMsg] = useState("");
  const [newEventDetails, setNewEventDetails] = useState({
    name: "",
    location: "",
    start_date: "",
    end_date: "",
    description: "",
    staff_id: loggedInUser,
  });

  useEffect(() => {
    setLoading(true);
    getStaffEvents(loggedInUser)
      .then((eventsFromAPI) => {
        setStaffEvents(eventsFromAPI);
      })
      .catch((err) => {
        console.error("Error fetching staff events", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [addingEvent, deleting, editing]);

  const addEventHandler = () => {
    setAddingEvent("Adding");
  };

  const submitAddEventHandler = () => {
    addEvent(newEventDetails)
      .then(() => {
        setMsg("Event added");
      })
      .catch((error) => {
        if (error.status === 403) {
          setMsg("You already have an event with these details");
        } else {
          setMsg("Something went wrong");
        }
      })
      .finally(() => {
        setAddingEvent(null);
        setTimeout(() => {
          setMsg("");
        }, 2000);
        setNewEventDetails({
          name: "",
          location: "",
          start_date: "",
          end_date: "",
          description: "",
          staff_id: loggedInUser,
        });
      });
  };

  const onChange = (e) => {
    setNewEventDetails({
      ...newEventDetails,
      [e.target.placeholder]: e.target.value,
    });
  };

  return (
    <>
      <h2 id="Header">Your Events</h2>
      <p id="ErrorMsg">{msg}</p>

      {!addingEvent ? (
        <div id="CenterEventButton">
          <button
            id="AddEventButton"
            className="Button"
            onClick={addEventHandler}
          >
            Add Event
          </button>
        </div>
      ) : (
        <li className="Eventinput">
          <input
            onChange={onChange}
            placeholder="name"
            value={newEventDetails.name}
          />
          <br />
          <input
            onChange={onChange}
            placeholder="location"
            value={newEventDetails.location}
          />
          <br />
          <input
            onChange={onChange}
            placeholder="start_date"
            value={newEventDetails.start_date}
          />
          <br />
          <input
            onChange={onChange}
            placeholder="end_date"
            value={newEventDetails.end_date}
          />
          <br />
          <input
            onChange={onChange}
            placeholder="description"
            value={newEventDetails.description}
          />
          <br />
          <button onClick={submitAddEventHandler}>Add Event</button>
        </li>
      )}

      {loading ? (
        <div className="Spinner"></div>
      ) : (
        <ul className="EventList">
          {staffEvents.map((event) => (
            <EventCard event={event} key={event.id} />
          ))}
        </ul>
      )}
    </>
  );
};

export default MyEvents;

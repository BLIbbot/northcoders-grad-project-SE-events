import { addEvent, getStaffEvents } from "../api";
import { useEffect, useState, useContext } from "react";
import { LoggedInUserContext } from "../Contexts/LoggedInUser";
import { DeletingContext } from "../Contexts/DeletingHandler";
import { EditingContext } from "../Contexts/EditingHandler";
import EventCard from "./EventCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    start_date: new Date(),
    end_date: new Date(),
    description: "",
    staff_id: loggedInUser,
  });

  // Handle event deletion
  const handleDeleteEvent = (eventId) => {
    setStaffEvents(staffEvents.filter((event) => event.event_id !== eventId));
  };

  // Handle event update
  const handleEditEvent = (updatedEvent) => {
    setStaffEvents(
      staffEvents.map((event) =>
        event.event_id === updatedEvent.event_id ? updatedEvent : event
      )
    );
  };

  const handleDateChange = (date, field) => {
    setNewEventDetails({
      ...newEventDetails,
      [field]: date,
    });
  };

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
    const formattedEvent = {
      ...newEventDetails,
      start_date: newEventDetails.start_date.toISOString().split("T")[0],
      end_date: newEventDetails.end_date.toISOString().split("T")[0],
    };

    addEvent(formattedEvent)
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
          start_date: new Date(),
          end_date: new Date(),
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
        <div className="EventFormContainer">
          <div className="EventInputForm">
            <input
              name="name"
              onChange={onChange}
              value={newEventDetails.name}
              placeholder="Name"
            />
            <br />
            <input
              name="location"
              onChange={onChange}
              value={newEventDetails.location}
              placeholder="Location"
            />
            <br />
            <DatePicker
              selected={newEventDetails.start_date}
              onChange={(date) => handleDateChange(date, "start_date")}
              placeholderText="Start Date"
            />
            <br />
            <DatePicker
              selected={newEventDetails.end_date}
              onChange={(date) => handleDateChange(date, "end_date")}
              placeholderText="End Date"
            />
            <br />
            <input
              name="description"
              onChange={onChange}
              value={newEventDetails.description}
              placeholder="Description"
            />
            <br />
            <button onClick={submitAddEventHandler}>Add Event</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="Spinner"></div>
      ) : (
        <ul className="EventList">
          {staffEvents.map((event) => (
            <EventCard
              event={event}
              key={event.id}
              onDelete={handleDeleteEvent}
              onEdit={handleEditEvent}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default MyEvents;

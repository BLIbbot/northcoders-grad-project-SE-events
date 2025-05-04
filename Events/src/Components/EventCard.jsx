import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { LoggedInUserContext } from "../Contexts/LoggedInUser";
import { DeletingContext } from "../Contexts/DeletingHandler";
import { EditingContext } from "../Contexts/EditingHandler";

import { deleteEvent, updateEvent } from "../api";
import GoogleCalendarButton from "./GoogleCalanderButton";
import SendEventEmail from "./SendEventEmail";

const EventCard = ({ event }) => {
  const { loggedInUser } = useContext(LoggedInUserContext);
  const { deleting, setDeleting } = useContext(DeletingContext);
  const { editing, setEditing } = useContext(EditingContext);

  const [loading, setLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [msg, setMsg] = useState("");

  const [eventDetails, setEventDetails] = useState({
    name: "",
    location: "",
    start_date: new Date(),
    end_date: new Date(),
    description: "",
    staff_id: loggedInUser,
  });

  useEffect(() => {
    if (editing === event.event_id) {
      setEventDetails({
        name: event.name || "",
        location: event.location || "",
        start_date: event.start_date ? new Date(event.start_date) : new Date(),
        end_date: event.end_date ? new Date(event.end_date) : new Date(),
        description: event.description || "",
        staff_id: loggedInUser,
      });
    }
  }, [editing, event, loggedInUser]);

  const handleDateChange = (date, field) => {
    setEventDetails((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const deleteEventHandler = () => {
    setDeleting("maybe");
  };

  const confirmDeleteEventHandler = (event_id) => {
    setLoading(true);
    deleteEvent(event_id)
      .then(() => {
        setDeleting(null);
        setMsg("Event deleted");
      })
      .catch(() => {
        setMsg("Error deleting event");
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => setMsg(""), 2000);
      });
  };

  const editEventHandler = (event_id) => {
    setEditing(event_id); // Triggers useEffect to populate form
  };

  const updateHandler = (eventDetails, event_id) => {
    const formattedEvent = {
      ...eventDetails,
      start_date: eventDetails.start_date.toISOString().split("T")[0],
      end_date: eventDetails.end_date.toISOString().split("T")[0],
    };
    setLoading(true);
    updateEvent(formattedEvent, event_id)
      .then(() => {
        setEditing(null);
        setMsg("Event details updated");
      })
      .catch((error) => {
        console.error(error);
        setMsg("Error updating event");
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => setMsg(""), 2000);
      });
  };

  return (
    <>
      <p id="ErrorMsg">{msg}</p>

      {/* Public View (not logged in) */}
      {!loggedInUser ? (
        <div className="EventCard">
          <h2 id="EventName">{event.name}</h2>
          <p id="StartDate">
            Starts:{" "}
            {new Date(event.start_date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          {event.end_date && !isNaN(new Date(event.end_date)) && (
            <p id="EndDate">
              Ends:{" "}
              {new Date(event.end_date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
          <p id="Location">Venue: {event.location}</p>
          <p id="Description">Description: {event.description}</p>

          {!showEmailForm ? (
            <div className="EmailButtonWrapper">
              <button className="Button" onClick={() => setShowEmailForm(true)}>
                📧 Get your tickets!
              </button>
            </div>
          ) : (
            <div className="AlignForm">
              <SendEventEmail
                event={event}
                onClose={() => setShowEmailForm(false)}
              />
            </div>
          )}

          <div className="CalendarButtonWrapper">
            <GoogleCalendarButton event={event} />
          </div>
        </div>
      ) : editing !== event.event_id ? (
        // Admin view, not editing
        <div className="EventCard">
          <h2 id="EventName">{event.name}</h2>
          <p id="StartDate">
            Starts:{" "}
            {new Date(event.start_date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          {event.end_date && !isNaN(new Date(event.end_date)) && (
            <p id="EndDate">
              Ends:{" "}
              {new Date(event.end_date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
          <p id="Location">Venue: {event.location}</p>
          <p id="Description">Description: {event.description}</p>

          <div className="CalendarButtonWrapper">
            <GoogleCalendarButton event={event} />
          </div>

          {deleting ? (
            <>
              <p id="msgbox">Are you sure?</p>
              <button
                id="YDel"
                className="Button"
                onClick={() => confirmDeleteEventHandler(event.event_id)}
              >
                Yes
              </button>
              <button
                id="NDel"
                className="Button"
                onClick={() => setDeleting(null)}
              >
                No
              </button>
            </>
          ) : loading ? (
            <div className="Spinner" />
          ) : (
            <>
              <button
                className="Button"
                id="DeleteButton"
                onClick={deleteEventHandler}
              >
                Delete
              </button>
              <button
                className="Button"
                id="EditButton"
                onClick={() => editEventHandler(event.event_id)}
              >
                Edit
              </button>
            </>
          )}
        </div>
      ) : loading ? (
        <div className="Spinner" />
      ) : (
        // Edit form view
        <div className="EventCard EditEventForm">
          <input
            name="name"
            value={eventDetails.name}
            onChange={onChange}
            placeholder="Event Name"
          />
          <input
            name="location"
            value={eventDetails.location}
            onChange={onChange}
            placeholder="Location"
          />
          <DatePicker
            selected={eventDetails.start_date}
            onChange={(date) => handleDateChange(date, "start_date")}
            placeholderText="Start Date"
          />
          <DatePicker
            selected={eventDetails.end_date}
            onChange={(date) => handleDateChange(date, "end_date")}
            placeholderText="End Date"
          />
          <input
            name="description"
            value={eventDetails.description}
            onChange={onChange}
            placeholder="Description"
          />
          <button onClick={() => updateHandler(eventDetails, event.event_id)}>
            Update
          </button>
          <button onClick={() => setEditing(null)}>Cancel</button>
        </div>
      )}
    </>
  );
};

export default EventCard;

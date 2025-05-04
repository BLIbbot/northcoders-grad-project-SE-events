import { LoggedInUserContext } from "../Contexts/LoggedInUser";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { deleteEvent, updateEvent } from "../api";
import GoogleCalendarButton from "./GoogleCalanderButton";
import SendEventEmail from "./SendEventEmail";
import { DeletingContext } from "../Contexts/DeletingHandler";
import { EditingContext } from "../Contexts/EditingHandler";

const EventCard = ({ event }) => {
  const { loggedInUser } = useContext(LoggedInUserContext);
  const { setDeleting } = useContext(DeletingContext);
  const { setEditing } = useContext(EditingContext);
  const [loading, setLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [msg, setMsg] = useState("");
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    name: "",
    location: "",
    start_date: new Date(),
    end_date: new Date(),
    description: "",
    staff_id: loggedInUser,
  });

  const handleDateChange = (date, field) => {
    setEventDetails((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  const deleteEventHandler = () => {
    setConfirmingDelete(true);
  };

  const confirmDeleteEventHandler = (event_id) => {
    setLoading(true);
    setDeleting(true);
    deleteEvent(event_id)
      .then(() => {
        setMsg("Event deleted");
      })
      .catch(() => {
        setMsg("Error deleting event");
      })
      .finally(() => {
        setLoading(false);
        setConfirmingDelete(false);
        setDeleting(null);
        setTimeout(() => setMsg(""), 2000);
      });
  };

  const editEventHandler = () => {
    setIsEditing(true);
    setEventDetails({
      name: event.name,
      location: event.location,
      start_date: new Date(event.start_date),
      end_date: new Date(event.end_date),
      description: event.description,
      staff_id: loggedInUser,
    });
  };

  const onChange = (e) => {
    setEventDetails((prev) => ({
      ...prev,
      [e.target.placeholder]: e.target.value,
    }));
  };

  const updateHandler = () => {
    const formattedEvent = {
      ...eventDetails,
      start_date: eventDetails.start_date.toISOString().split("T")[0],
      end_date: eventDetails.end_date.toISOString().split("T")[0],
    };
    setEditing(true);
    setLoading(true);
    updateEvent(formattedEvent, event.event_id)
      .then(() => {
        setMsg("Event details updated");
        setIsEditing(false);
        setEditing(null);
      })
      .catch(() => {
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
      ) : !isEditing ? (
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

          {loading ? (
            <div className="Spinner"></div>
          ) : confirmingDelete ? (
            <>
              <p id="msgbox">Are you sure?</p>
              <br />
              <button
                id="YDel"
                className="Button"
                onClick={() => confirmDeleteEventHandler(event.event_id)}
              >
                Yes
              </button>
              <br />
              <br />
              <button
                id="NDel"
                className="Button"
                onClick={() => setConfirmingDelete(false)}
              >
                No
              </button>
            </>
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
                onClick={editEventHandler}
              >
                Edit
              </button>
            </>
          )}
        </div>
      ) : loading ? (
        <div className="Spinner"></div>
      ) : (
        <li className="EventCard EditEventForm">
          <input
            onChange={onChange}
            placeholder="name"
            value={eventDetails.name}
          />
          <input
            onChange={onChange}
            placeholder="location"
            value={eventDetails.location}
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
            onChange={onChange}
            placeholder="description"
            value={eventDetails.description}
          />
          <button onClick={updateHandler}>Update</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </li>
      )}
    </>
  );
};

export default EventCard;

import { LoggedInUserContext } from "../Contexts/LoggedInUser";
import { DeletingContext } from "../Contexts/DeletingHandler";
import { EditingContext } from "../Contexts/EditingHandler";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { deleteEvent } from "../api";
import { updateEvent } from "../api";
import GoogleCalendarButton from "./GoogleCalanderButton";
import SendEventEmail from "./SendEventEmail";

const EventCard = (prop) => {
  const { event } = prop;
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

  const handleDateChange = (date, field) => {
    setEventDetails({
      ...eventDetails,
      [field]: date, // Update the specific date field (start_date or end_date)
    });
  };

  const deleteEventHandler = () => {
    setDeleting("maybe");
  };

  const confirmDeleteEventHandler = (event_id) => {
    setLoading(true);
    deleteEvent(event_id)
      .then(() => {
        setDeleting(null);
      })
      .then(() => {
        setMsg("Event deleted");
      })
      .catch((error) => {
        setMsg("Error deleting event");
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => {
          setMsg("");
        }, 2000);
      });
  };

  const editEventHandler = (event_id) => {
    setEditing(event_id);
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
    setEventDetails({
      ...eventDetails,
      [e.target.placeholder]: e.target.value,
    });
  };

  const updateHandler = (eventDetails, event_id) => {
    const formattedEvent = {
      ...eventDetails,
      start_date: eventDetails.start_date.toISOString().split("T")[0],
      end_date: eventDetails.end_date.toISOString().split("T")[0],
    };
    setLoading(true);
    updateEvent(formattedEvent, event_id)
      .then((response) => {
        setEditing(null);
      })
      .then(() => {
        setMsg("Event details updated");
      })
      .catch((error) => {
        console.log(error);
        setMsg("Error updating event");
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => {
          setMsg("");
        }, 2000);
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
          {event.end_date && !isNaN(new Date(event.end_date)) ? (
            <p id="EndDate">
              Ends:{" "}
              {new Date(event.end_date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          ) : null}
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
          {event.end_date && !isNaN(new Date(event.end_date)) ? (
            <p id="EndDate">
              Ends:{" "}
              {new Date(event.end_date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          ) : null}
          <p id="Location">Venue: {event.location}</p>
          <p id="Description">Description: {event.description}</p>
          <div className="CalendarButtonWrapper">
            <GoogleCalendarButton event={event} />
          </div>

          {!deleting ? (
            loading ? (
              <div className="Spinner"></div>
            ) : (
              <>
                <button
                  className="Button"
                  id="DeleteButton"
                  onClick={() => {
                    deleteEventHandler();
                  }}
                >
                  Delete
                </button>
                <button
                  className="Button"
                  id="EditButton"
                  onClick={() => {
                    editEventHandler(event.event_id);
                  }}
                >
                  Edit
                </button>
              </>
            )
          ) : (
            <>
              <p id="msgbox">Are you sure?</p>
              <br></br>
              <button
                id="YDel"
                className="Button"
                onClick={() => {
                  confirmDeleteEventHandler(event.event_id);
                }}
              >
                Yes
              </button>
              <br></br>
              <br></br>
              <button
                id="NDel"
                className="Button"
                onClick={() => setDeleting(null)}
              >
                no
              </button>
            </>
          )}
        </div>
      ) : loading ? (
        <div className="Spinner"></div>
      ) : (
        <>
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
            <button
              onClick={() => {
                updateHandler(eventDetails, event.event_id);
              }}
            >
              Update
            </button>
            <button
              onClick={() => {
                setEditing(null);
              }}
            >
              Cancel
            </button>
          </li>
        </>
      )}
    </>
  );
};

export default EventCard;

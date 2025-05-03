import { LoggedInUserContext } from "../Contexts/LoggedInUser";
import { DeletingContext } from "../Contexts/DeletingHandler";
import { EditingContext } from "../Contexts/EditingHandler";
import { useContext, useState, useEffect } from "react";
import { deleteEvent } from "../api";
import { updateEvent } from "../api";
import GoogleCalendarButton from "./GoogleCalanderButton";
import SendEventEmail from "./SendEventEmail";

const EventCard = (prop) => {
  const { event } = prop;
  const { loggedInUser } = useContext(LoggedInUserContext);
  const { deleting, setDeleting } = useContext(DeletingContext);
  const { editing, setEditing } = useContext(EditingContext);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [msg, setMsg] = useState("");

  const [eventDetails, setEventDetails] = useState({
    name: "",
    location: "",
    start_date: "",
    end_date: "",
    description: "",
    staff_id: loggedInUser,
  });

  const deleteEventHandler = () => {
    setDeleting("maybe");
  };

  const confirmDeleteEventHandler = (event_id) => {
    deleteEvent(event_id)
      .then(() => {
        setDeleting(null);
      })
      .then(() => {
        setMsg("Event deleted");
      })
      .then(() => {
        setTimeout(() => {
          setMsg("");
        }, 2000);
      });
  };

  const editEventHandler = () => {
    setEditing("editing");
  };

  const onChange = (e) => {
    setEventDetails({
      ...eventDetails,
      [e.target.placeholder]: e.target.value,
    });
  };

  const updateHandler = (eventDetails, event_id) => {
    updateEvent(eventDetails, event_id)
      .then((response) => {
        setEditing(null);
      })
      .then(() => {
        setMsg("Event details updated");
      })
      .then(() => {
        setTimeout(() => {
          setMsg("");
        }, 2000);
      });
  };

  return (
    <>
      <p id="ErrorMsg">{msg}</p>
      {!loggedInUser ? (
        <li className="EventCard">
          <h2 id="EventName">{event.name}</h2>
          <p id="StartDate">
            Starts:{" "}
            {new Date(event.start_date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p id="EndDate">
            Ends:{" "}
            {new Date(event.end_date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
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
        </li>
      ) : !editing ? (
        <li className="EventCard">
          <h2 id="EventName">{event.name}</h2>
          <p id="StartDate">
            Starts:{" "}
            {new Date(event.start_date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p id="EndDate">
            Ends:{" "}
            {new Date(event.end_date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p id="Location">Venue: {event.location}</p>
          <p id="Description">Description: {event.description}</p>
          <div className="CalendarButtonWrapper">
            <GoogleCalendarButton event={event} />
          </div>

          {!deleting ? (
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
        </li>
      ) : (
        <>
          <li id="EventInput">
            <input
              onChange={onChange}
              placeholder="name"
              value={eventDetails.name}
            />
            <br />
            <input
              onChange={onChange}
              placeholder="location"
              value={eventDetails.location}
            />
            <br />
            <input
              onChange={onChange}
              placeholder="start_date"
              value={eventDetails.start_date}
            />
            <br />
            <input
              onChange={onChange}
              placeholder="end_date"
              value={eventDetails.end_date}
            />
            <br />
            <input
              onChange={onChange}
              placeholder="description"
              value={eventDetails.description}
            />
            <br />
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

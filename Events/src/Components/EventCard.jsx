import { LoggedInUserContext } from "../Contexts/LoggedInUser";
import { DeletingContext } from "../Contexts/DeletingHandler";
import { EditingContext } from "../Contexts/EditingHandler";
import { useContext, useState, useEffect } from "react";
import { deleteEvent } from "../api";
import { updateEvent } from "../api";

const EventCard = (prop) => {
  const { event } = prop;
  const { loggedInUser } = useContext(LoggedInUserContext);
  const { deleting, setDeleting } = useContext(DeletingContext);
  const { editing, setEditing } = useContext(EditingContext);
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
          <p id="StartDate">Starts: {event.start_date}</p>
          <p id="EndDate">Ends: {event.end_date}</p>
          <p id="Location">Venue: {event.location}</p>
          <p id="Description">Description: {event.description}</p>
        </li>
      ) : !editing ? (
        <li className="EventCard">
          <h2 id="EventName">{event.name}</h2>
          <p id="StartDate">Starts: {event.start_date}</p>
          <p id="EndDate">Ends: {event.end_date}</p>
          <p id="Location">Venue: {event.location}</p>
          <p id="Description">Description: {event.description}</p>
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

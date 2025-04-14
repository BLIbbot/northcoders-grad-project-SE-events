const EventCard = (prop) => {
  const { event } = prop;
  /* console.log(event); */
  return (
    <>
      <li className="EventCard">
        <h2 id="EventName">{event.name}</h2>
        <p id="StartDate">Starts: {event.start_date}</p>
        <p id="EndDate">Ends: {event.end_date}</p>
        <p id="Location">Venue: {event.location}</p>
        <p id="Description">Description: {event.description}</p>
      </li>
    </>
  );
};

export default EventCard;

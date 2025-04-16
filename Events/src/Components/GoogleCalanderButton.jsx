import React from "react";
import toast from "react-hot-toast";
import CalendarToast from "./CalendarToast";

const GoogleCalendarButton = ({ event }) => {
  const getGoogleCalendarUrl = () => {
    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      return date.toISOString().replace(/-|:|\.\d\d\d/g, "");
    };

    const start = formatDate(event.start_date);
    const end = formatDate(event.end_date);

    const url = new URL("https://calendar.google.com/calendar/r/eventedit");
    url.searchParams.append("text", event.name);
    url.searchParams.append("dates", `${start}/${end}`);
    url.searchParams.append("details", event.description);
    url.searchParams.append("location", event.location);

    return url.toString();
  };

  const handleClick = () => {
    toast.custom(<CalendarToast />, { duration: 3000 });
  };

  return (
    <a
      href={getGoogleCalendarUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="GoogleCalendarButton"
      onClick={handleClick}
    >
      <img
        src="./google-calendar-icon.svg"
        alt="Google Calendar Icon"
        className="CalendarIcon"
      />
      Add to Google Calendar
    </a>
  );
};

export default GoogleCalendarButton;

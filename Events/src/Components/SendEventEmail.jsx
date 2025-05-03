import { useState } from "react";
import toast from "react-hot-toast";
import emailjs from "emailjs-com";

emailjs.init("vP1zdH9f4QWzEJnqx");

const SendEventEmail = ({ event, onClose }) => {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email.");
      return;
    }

    setSending(true);

    const templateParams = {
      to_email: email,
      event_name: event.name,
      start_date: event.start_date,
      end_date: event.end_date,
      location: event.location,
      description: event.description,
    };

    emailjs;
    emailjs
      .send("service_sve6oyu", "template_rfj44ct", templateParams)
      .then(() => {
        toast.success(`Event sent to ${email} 🎉`);
        setEmail("");
        setSending(false);
        if (onClose) onClose();
      })
      .catch((error) => {
        console.error("Email sending error:", error);
        toast.error("Failed to send email.");
        setSending(false);
      });
  };

  return (
    <form className="EmailForm FadeIn" onSubmit={handleSend}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={sending}
        required
      />
      <button type="submit" className="Button" disabled={sending}>
        {sending ? <div className="Spinner"></div> : "Apply"}
      </button>
      <button
        type="button"
        className="Button CancelButton"
        onClick={onClose}
        disabled={sending}
      >
        Cancel
      </button>
    </form>
  );
};

export default SendEventEmail;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import './App.css'


export default function ContactHR() {
  const [anonymous, setAnonymous] = useState(true);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const [form, setForm] = useState({
    category: "",
    subject: "",
    message: "",
    name: "",
    email: "",
    department: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      setSending(true);

      await axios.post("http://localhost:3000/api/hr-contact", {
        ...form,
        anonymous,
      });

      await new Promise((r) => setTimeout(r, 1200));

      setSending(false);
      setSent(true);

      setForm({
        category: "",
        subject: "",
        message: "",
        name: "",
        email: "",
        department: "",
      });

      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      setSending(false);
      alert("Error sending email.");
    }
  };

  return (
    
    <form onSubmit={sendEmail} className="contact-form">
      <h1>Contact Human Resources</h1>

      <p>
          Submit a complaint, suggestion, or question directly to Human Resources.
      </p>
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
      >
        <option value="" disabled hidden>Select an option</option>
        <option>Complaint</option>
        <option>Suggestion</option>
        <option>Question</option>
        <option>Payroll</option>
        <option>Benefits</option>
        <option>Other</option>
      </select>

      <input
        name="subject"
        placeholder="Subject"
        value={form.subject}
        onChange={handleChange}
      />

      <textarea
        name="message"
        placeholder="Write your message..."
        rows={7}
        value={form.message}
        onChange={handleChange}
      />

      <label>
        <div className="checkbox-row">
          <input
              type="checkbox"
              checked={anonymous}
              onChange={() => setAnonymous(!anonymous)}
          />

          <label>Submit anonymously</label>
      </div>

      <p className="checkbox-info">
          Anonymous submissions do not include your personal information.
      </p>
      </label>

      {!anonymous && (
        <div className="user-info">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
          />
        </div>
      )}

      <button disabled={sending}>
        {sending ? "Sending..." : "Send Message"}
      </button>

      <AnimatePresence>

        {sending && (

          <motion.div
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x: 350,
              y: -120,
              rotate: -15,
              opacity: 0
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="mail-animation"
          >
            <FaEnvelope size={70}/>
          </motion.div>

        )}

        {sent && (

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            <FaCheckCircle
              color="green"
              size={60}
            />

            <h3>Message Sent!</h3>

          </motion.div>

        )}

      </AnimatePresence>

    </form>
  );
}

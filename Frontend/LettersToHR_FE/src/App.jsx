import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaCheckCircle, FaHeart } from "react-icons/fa";
import axios from "axios";
import './App.css'

// --- Variants: entrada tipo "carta desplegándose" con rebote tierno ---
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, y: -18, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 18 },
  },
};

// --- Variant: la carta se "dobla" antes de enviar ---
const foldVariants = {
  idle: { scale: 1, rotate: 0, opacity: 1 },
  folding: {
    scale: 0.15,
    rotate: 10,
    opacity: 0,
    transition: { duration: 0.6, ease: "easeIn" },
  },
};

// pequeños corazones/destellos que salen disparados al enviar
const sparkles = ["💗", "✨", "💌", "✨", "💗", "🌸"];

export default function ContactHR() {
  const [anonymous, setAnonymous] = useState(true);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

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

      await axios.post(`${API_URL}/api/hr-contact`, {
        ...form,
        anonymous,
      });

      await new Promise((r) => setTimeout(r, 900));

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
    <div className="page-wrap">
      <motion.form
        onSubmit={sendEmail}
        className="contact-form"
        variants={foldVariants}
        animate={sending ? "folding" : "idle"}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={fieldVariants}>
            Contact Human Resources <FaHeart className="title-heart" />
          </motion.h1>

          <motion.p variants={fieldVariants}>
            Submit a complaint, suggestion, or question directly to Human Resources.
          </motion.p>

          <motion.select
            variants={fieldVariants}
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
          </motion.select>

          <motion.input
            variants={fieldVariants}
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
          />

          <motion.textarea
            variants={fieldVariants}
            name="message"
            placeholder="Write your message..."
            rows={7}
            value={form.message}
            onChange={handleChange}
          />

          <motion.label variants={fieldVariants} className="anon-label">
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
          </motion.label>

          <AnimatePresence>
            {!anonymous && (
              <motion.div
                className="user-info"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
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
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button variants={fieldVariants} disabled={sending}>
            {sending ? "Sending..." : "Send Message 💌"}
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {sending && (
            <>
              <motion.div
                initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
                animate={{
                  x: 350,
                  y: -120,
                  rotate: -18,
                  opacity: 0,
                  scale: 1.25,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, delay: 0.35 }}
                className="mail-animation"
              >
                <FaEnvelope size={64} />
                <FaHeart className="wax-seal" size={20} />
              </motion.div>

              {sparkles.map((emoji, i) => (
                <motion.span
                  key={i}
                  className="sparkle"
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                  animate={{
                    x: 250 + i * 20,
                    y: -140 + (i % 3) * -25,
                    opacity: [0, 1, 0],
                    scale: 1,
                    rotate: i % 2 === 0 ? 20 : -20,
                  }}
                  transition={{
                    duration: 1.1,
                    delay: 0.4 + i * 0.05,
                    ease: "easeOut",
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </>
          )}

          {sent && (
            <motion.div
              className="sent-confirmation"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <FaCheckCircle color="#ff6fa5" size={56} />
              <h3>Message Sent! 💕</h3>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </div>
  );
}

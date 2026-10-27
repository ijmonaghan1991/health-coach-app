import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [service, setService] =
    useState(null);

  const [appointmentDate, setAppointmentDate] =
    useState("");

  const [notes, setNotes] = useState("");

  const [loading, setLoading] =
    useState(true);

  const [booking, setBooking] =
    useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    const loadService = async () => {
      try {
        const { data } = await api.get(
          `/services/${id}`
        );

        setService(data);
      } catch (error) {
        setError("Service not found.");
      } finally {
        setLoading(false);
      }
    };

    loadService();
  }, [id]);

  const handleBooking = async (event) => {
    event.preventDefault();

    if (!user) {
      navigate("/login", {
        state: {
          from: `/services/${id}`,
        },
      });

      return;
    }

    try {
      setError("");
      setBooking(true);

      await api.post("/bookings", {
        serviceId: service._id,
        appointmentDate,
        notes,
      });

      navigate("/dashboard", {
        state: {
          bookingCreated: true,
        },
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to book your appointment."
      );
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <main className="section">
        <p>Loading service...</p>
      </main>
    );
  }

  if (!service) {
    return (
      <main className="section">
        <h1>Service not found</h1>

        <Link
          to="/services"
          className="textLink"
        >
          ← Back to services
        </Link>
      </main>
    );
  }

  return (
    <main className="detailsLayout">
      <section className="serviceDetails">
        <Link
          to="/services"
          className="textLink"
        >
          ← All services
        </Link>

        <p className="eyebrow">
          {service.category}
        </p>

        <h1>{service.title}</h1>

        <p className="lead">
          {service.description}
        </p>

        <div className="detailsMeta">
          <div>
            <small>DURATION</small>

            <strong>
              {service.duration} minutes
            </strong>
          </div>

          <div>
            <small>SESSION PRICE</small>

            <strong>
              ${service.price}
            </strong>
          </div>
        </div>

        <div className="includedBox">
          <h3>What to expect</h3>

          <p>
            Your session is designed around your
            individual wellness goals and current
            habits.
          </p>

          <ul>
            <li>
              One-on-one personalized coaching
            </li>

            <li>
              Goal and habit review
            </li>

            <li>
              Practical next steps
            </li>

            <li>
              Personalized action plan
            </li>
          </ul>
        </div>
      </section>

      <aside>
        <form
          className="formCard bookingCard"
          onSubmit={handleBooking}
        >
          <p className="eyebrow">
            BOOK YOUR SESSION
          </p>

          <h2>Choose a time</h2>

          <p>
            Select a date and time that works
            for you.
          </p>

          {error && (
            <p className="error">
              {error}
            </p>
          )}

          <label>
            Date & time

            <input
              type="datetime-local"
              value={appointmentDate}
              onChange={(event) =>
                setAppointmentDate(
                  event.target.value
                )
              }
              required
            />
          </label>

          <label>
            Anything you'd like your coach
            to know?

            <textarea
              value={notes}
              onChange={(event) =>
                setNotes(event.target.value)
              }
              rows="5"
              placeholder="Tell us about your goals or what you'd like to discuss..."
            />
          </label>

          <button
            className="button"
            disabled={booking}
          >
            {booking
              ? "Booking..."
              : user
                ? "Book appointment"
                : "Sign in to book"}
          </button>

          <small className="bookingNotice">
            You'll be able to manage your
            appointment from your dashboard.
          </small>
        </form>
      </aside>
    </main>
  );
}
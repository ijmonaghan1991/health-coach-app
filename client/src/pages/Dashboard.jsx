import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const location = useLocation();

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadBookings = async () => {
    try {
      const { data } = await api.get(
        "/bookings"
      );

      setBookings(data);
    } catch (error) {
      setError(
        "Unable to load your appointments."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const cancelBooking = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!confirmed) return;

    try {
      await api.patch(
        `/bookings/${id}/cancel`
      );

      await loadBookings();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to cancel appointment."
      );
    }
  };

  return (
    <main className="section">
      <p className="eyebrow">
        YOUR DASHBOARD
      </p>

      <h1>
        Welcome, {user?.name}.
      </h1>

      <p className="lead">
        Manage your coaching sessions and
        continue working toward your goals.
      </p>

      {location.state?.bookingCreated && (
        <div className="successMessage">
          ✓ Your appointment has been booked.
        </div>
      )}

      {error && (
        <p className="error">{error}</p>
      )}

      <div className="dashboardHeader">
        <h2>Your appointments</h2>

        <Link
          to="/services"
          className="button small"
        >
          + Book session
        </Link>
      </div>

      {loading ? (
        <p>Loading appointments...</p>
      ) : (
        <div className="bookingList">
          {bookings.map((booking) => (
            <article
              className="booking"
              key={booking._id}
            >
              <div>
                <span
                  className={`status ${booking.status}`}
                >
                  {booking.status}
                </span>

                <h3>
                  {booking.service?.title}
                </h3>

                <p>
                  {new Date(
                    booking.appointmentDate
                  ).toLocaleString([], {
                    dateStyle: "long",
                    timeStyle: "short",
                  })}
                </p>

                {booking.notes && (
                  <p>
                    <strong>Notes:</strong>{" "}
                    {booking.notes}
                  </p>
                )}
              </div>

              {booking.status !==
                "cancelled" && (
                <button
                  className="secondaryButton"
                  onClick={() =>
                    cancelBooking(
                      booking._id
                    )
                  }
                >
                  Cancel appointment
                </button>
              )}
            </article>
          ))}

          {bookings.length === 0 && (
            <div className="emptyState">
              <h3>
                No appointments yet
              </h3>

              <p>
                Choose a coaching service
                and schedule your first
                session.
              </p>

              <Link
                to="/services"
                className="textLink"
              >
                Explore services →
              </Link>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
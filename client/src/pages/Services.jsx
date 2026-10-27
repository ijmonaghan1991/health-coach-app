import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadServices = async () => {
      try {
        const { data } = await api.get("/services");
        setServices(data);
      } catch (error) {
        console.error("Services error:", error);

        setError(
          "Unable to load coaching services."
        );
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  if (loading) {
    return (
      <main className="section">
        <p>Loading services...</p>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="servicesHeader">
        <p className="eyebrow">
          COACHING SERVICES
        </p>

        <h1>
          Choose the support that's right for you.
        </h1>

        <p className="lead">
          Personalized coaching designed to help
          you build healthier, sustainable habits.
        </p>
      </div>

      {error && (
        <p className="error">{error}</p>
      )}

      <div className="servicesGrid">
        {services.map((service) => (
          <article
            className="serviceCard"
            key={service._id}
          >
            <div>
              <p className="eyebrow">
                {service.category}
              </p>

              <h2>
                {service.title}
              </h2>

              <p>
                {service.description}
              </p>
            </div>

            <div>
              <div className="serviceMeta">
                <span>
                  {service.duration} minutes
                </span>

                <strong>
                  ${service.price}
                </strong>
              </div>

              <Link
                to={`/services/${service._id}`}
                className="serviceButton"
              >
                View service →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {!error && services.length === 0 && (
        <div className="emptyState">
          <h2>
            No services available
          </h2>

          <p>
            Coaching services will appear here
            once they have been added.
          </p>
        </div>
      )}
    </main>
  );
}
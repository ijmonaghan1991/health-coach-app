import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div>
          <span className="eyebrow">
            PERSONAL HEALTH COACHING
          </span>

          <h1>
            Build healthier habits that actually last.
          </h1>

          <p>
            Personal coaching, simple progress tracking,
            convenient appointments and intelligent
            wellness support in one place.
          </p>

          <div className="heroActions">
            <Link
              to="/services"
              className="button"
            >
              Explore coaching
            </Link>

            <Link
              to="/register"
              className="button secondary"
            >
              Create account
            </Link>
          </div>
        </div>

        <div className="heroCard">
          <p className="eyebrow">YOUR JOURNEY</p>

          <h2>Small steps. Real progress.</h2>

          <div className="metric">
            <strong>1:1</strong>
            <span>Personal coaching</span>
          </div>

          <div className="metric">
            <strong>24/7</strong>
            <span>AI wellness support</span>
          </div>

          <div className="metric">
            <strong>100%</strong>
            <span>Focused on you</span>
          </div>
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">
          HOW IT WORKS
        </p>

        <h2>Health coaching made simple.</h2>

        <div className="grid">
          <article className="card">
            <span className="number">01</span>
            <h3>Choose your service</h3>
            <p>
              Find coaching that matches your goals
              and lifestyle.
            </p>
          </article>

          <article className="card">
            <span className="number">02</span>
            <h3>Book a session</h3>
            <p>
              Select an appointment time that works
              for you.
            </p>
          </article>

          <article className="card">
            <span className="number">03</span>
            <h3>Build momentum</h3>
            <p>
              Use coaching and intelligent support to
              keep moving forward.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
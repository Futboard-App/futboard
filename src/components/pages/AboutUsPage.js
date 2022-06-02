import React from 'react';
import { Link } from 'react-router-dom';
// import './AboutUs.css';

export default function AboutUsPage() {
  return (
    <div className="about-us-container">
      <span className="team">Fútboard Team</span>
      <div className="team">
        <div className="team-member">
          <p>Mia san Mia</p>
          <h3>Mohamed Amin</h3>
          <p>favorite soccer team: bayern munich</p>
        </div>
        <div className="icons">
          <a href="https://www.linkedin.com/in/mohaamin/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://github.com/taha-amin" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>

        <div className="team-member">
          <p>Nisi Dominus Frustra</p>
          <h3>Riley Hoffman</h3>
          <p>favorite soccer team: Chelsea FC</p>
        </div>
        <div className="icons">
          <a
            href="https://www.linkedin.com/in/riley-j-hoffman/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href="https://github.com/rileyjhoff" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>

        <div className="team-member">
          <p>{"Ici c'est Paris"}</p>
          <h3>Alonzo Anderson</h3>
          <p>favorite soccer team: Paris Saint-Germain </p>
        </div>
        <div className="icons">
          <a
            href="https://www.linkedin.com/in/alonzo-anderson-8a6a27172/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href="https://github.com/Anddy123" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </div>

      <div className="team-member">
        <p>No Pity In the Rose City</p>
        <h3>Kevin Roney</h3>
        <p>favorite soccer team: Portland Timbers</p>
      </div>
      <div className="icons">
        <a
          href="https://www.linkedin.com/in/kevin-roney/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a href="https://github.com/Kevin-Roney" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </div>
    </div>
  );
}

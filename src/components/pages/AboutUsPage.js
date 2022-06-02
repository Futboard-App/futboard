/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.scss';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import Header from '../Header';

export default function AboutUsPage() {
  return (
    <div className="about-us-container">
      <Header />
      <div className="team">
        <div className="team-member">
          <p>
            <em>"Mia san Mia"</em>
          </p>
          <img src="./ProfilePicture.png" alt="" />
          <h3>Mohamed Amin</h3>
          <div className="icons">
            <a
              href="https://www.linkedin.com/in/mohaamin/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
            </a>
            <a href="https://github.com/taha-amin" target="_blank" rel="noopener noreferrer">
              <GitHubIcon />
            </a>
          </div>
          <p>Mohamed is a full-stack developer based in Portland Oregon</p>
          <p> Mohamed enjoys vidyagames and big chillin'.</p>
          <p>Favorite soccer team: bayern munich</p>
        </div>

        <div className="team-member">
          <p>
            <em>"Nisi Dominus Frustra"</em>
          </p>
          <img src="./riley-headshot.jpeg" alt="" />
          <h3>Riley Hoffman</h3>
          <div className="icons">
            <a
              href="https://www.linkedin.com/in/riley-j-hoffman/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
            </a>
            <a href="https://github.com/rileyjhoff" target="_blank" rel="noopener noreferrer">
              <GitHubIcon />
            </a>
          </div>
          <p>Riley is a full stack software developer in training, hailing from Portland, OR. </p>
          <p>
            Outside of coding, he enjoys skiing, running, eating gyros, and watching any sport under
            the sun.
          </p>
          <p> Favorite soccer team: Chelsea FC</p>
        </div>

        <div className="team-member">
          <p>
            <em>"Ici c'est Paris"</em>
          </p>
          <img src="./alonzo.jpg" alt="" />
          <h3>
            <em>Alonzo Anderson</em>
          </h3>
          <div className="icons">
            <a
              href="https://www.linkedin.com/in/alonzo-anderson-8a6a27172/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
            </a>
            <a href="https://github.com/Anddy123" target="_blank" rel="noopener noreferrer">
              <GitHubIcon />
            </a>
          </div>
          <p>Alonzo is a full-stack developer based in Arizona</p>
          <p> Outside of coding, Alonzo enjoys watching Netflix and vidyagames. </p>
          <p>Favorite soccer team: Paris Saint-Germain</p>
        </div>

        <div className="team-member">
          <p>
            <em>"No Pity In the Rose City"</em>
          </p>
          <img src="./kevin.jpg" alt="" />
          <h3>Kevin Roney</h3>
          <div className="icons">
            <a
              href="https://www.linkedin.com/in/kevin-roney/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
            </a>
            <a href="https://github.com/Kevin-Roney" target="_blank" rel="noopener noreferrer">
              <GitHubIcon />
            </a>
          </div>
          <p>Kevin is a full stack developer based in Portland</p>
          <p> Kevin enjoys playing banjo and vidyagames.</p>
          <p>Favorite soccer team: Portland Timbers</p>
        </div>
      </div>
    </div>
  );
}

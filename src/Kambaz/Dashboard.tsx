import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home" className="wd-dashboard-course-link">
            <img src="/images/reactjs.jpg" width={200} />
            <div>
              <h5>CS1234 React JS</h5>
              <p className="wd-dashboard-course-title">Full Stack software developer</p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/2345/Home" className="wd-dashboard-course-link">
            <img src="/images/nodejs.jpg" width={200} />
            <div>
              <h5>CS2345 Node.js</h5>
              <p className="wd-dashboard-course-title">Backend development basics</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/3456/Home" className="wd-dashboard-course-link">
            <img src="/images/python.jpg" width={200} />
            <div>
              <h5>CS3456 Python for Data Science</h5>
              <p className="wd-dashboard-course-title">Data analysis and visualization</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/4567/Home" className="wd-dashboard-course-link">
            <img src="/images/machine_learning.jpg" width={200} />
            <div>
              <h5>CS4567 Machine Learning Basics</h5>
              <p className="wd-dashboard-course-title">Introduction to ML concepts</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/5678/Home" className="wd-dashboard-course-link">
            <img src="/images/sql_database.jpg" width={200} />
            <div>
              <h5>CS5678 Database Management</h5>
              <p className="wd-dashboard-course-title">Learn SQL and database design</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/6789/Home" className="wd-dashboard-course-link">
            <img src="/images/devops.jpg" width={200} />
            <div>
              <h5>CS6789 DevOps Fundamentals</h5>
              <p className="wd-dashboard-course-title">Introduction to CI/CD and cloud</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/7890/Home" className="wd-dashboard-course-link">
            <img src="/images/cybersecurity.jpg" width={200} />
            <div>
              <h5>CS7890 Cybersecurity Basics</h5>
              <p className="wd-dashboard-course-title">Learn essential security practices</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/8901/Home" className="wd-dashboard-course-link">
            <img src="/images/uiux_design.jpg" width={200} />
            <div>
              <h5>CS8901 UI/UX Design</h5>
              <p className="wd-dashboard-course-title">Designing intuitive user interfaces</p>
              <button>Go</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

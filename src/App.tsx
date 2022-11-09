import { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa"

const url = 'https://course-api.com/react-tabs-project'

const App = () => {

  const [loading, setLoading] = useState(true)
  const [jobs, setJobs] = useState([])
  const [value, setValue] = useState(0);

  const fetchJobs = async () => {
    const response = await fetch(url)
    const newJobs = await response.json()
    setJobs(newJobs)
    setLoading(false)
  }

  useEffect(() => {
    fetchJobs();
  }, [])

  if (loading) return <section className="section loading"><h1>Loading...</h1></section>

  // descrtucture here as jobs are available after loading
  const { company, dates, title, duties }: any = jobs[value]

  return (
    <section className="section">
      <div className="title">
        <h2>Experience</h2>
        <div className="underline"></div>
      </div>

      <div className="jobs-center">

        <div className="btn-container">
          {jobs.map((job: { id: string, company: string }, index: number) => (
            <button
              key={job.id}
              onClick={() => setValue(index)}
              className={`job-btn ${index === value && 'active-btn'}`}
            >{job.company}</button>
          ))}
        </div>

        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {duties.map((duty: string, index: number) => (
            <div key={index} className="job-desc">
              <FaAngleDoubleRight className="job-icon" />
              <p>{duty}</p>
            </div>
          ))}
        </article>

      </div>
    </section>
  );
}

export default App;

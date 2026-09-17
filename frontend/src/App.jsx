import { useState, useEffect } from 'react'
import './App.css'

const API = 'http://127.0.0.1:8000/api'

function App() {

  // ================= STUDENTS =================
  const [students, setStudents] = useState([])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [department, setDepartment] = useState('')
  const [cgpa, setCgpa] = useState('')


  // ================= COMPANIES =================
  const [companies, setCompanies] = useState([])

  const [companyName, setCompanyName] = useState('')
  const [location, setLocation] = useState('')
  const [website, setWebsite] = useState('')

  const [editingCompanyId, setEditingCompanyId] = useState(null)


  // ================= JOBS =================
  const [jobs, setJobs] = useState([])

  const [jobTitle, setJobTitle] = useState('')
  const [jobCompany, setJobCompany] = useState('')
  const [packageAmount, setPackageAmount] = useState('')
  const [eligibilityCgpa, setEligibilityCgpa] = useState('')

  const [editingJobId, setEditingJobId] = useState(null)


  // ================= APPLICATIONS =================
  const [applications, setApplications] = useState([])

  const [applicationStudent, setApplicationStudent] = useState('')
  const [applicationJob, setApplicationJob] = useState('')
  const [applicationStatus, setApplicationStatus] = useState('Applied')

  const [editingApplicationId, setEditingApplicationId] = useState(null)


  // ================= LOAD DATA =================
  useEffect(() => {
    fetch(`${API}/students/`)
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.log('Student error:', error))

    fetch(`${API}/companies/`)
      .then(response => response.json())
      .then(data => setCompanies(data))
      .catch(error => console.log('Company error:', error))

    fetch(`${API}/jobs/`)
      .then(response => response.json())
      .then(data => setJobs(data))
      .catch(error => console.log('Job error:', error))

    fetch(`${API}/applications/`)
      .then(response => response.json())
      .then(data => setApplications(data))
      .catch(error => console.log('Application error:', error))
  }, [])


  // ================= STUDENTS =================

  const addStudent = async (e) => {
    e.preventDefault()

    if (!name || !email || !phone || !department || !cgpa) {
      alert('Please fill all student details')
      return
    }

    const studentData = {
      name,
      email,
      phone,
      department,
      cgpa
    }

    try {
      const response = await fetch(`${API}/students/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentData)
      })

      if (!response.ok) {
        alert('Failed to add student')
        return
      }

      const newStudent = await response.json()

      setStudents([...students, newStudent])

      setName('')
      setEmail('')
      setPhone('')
      setDepartment('')
      setCgpa('')

      alert('Student added successfully')

    } catch (error) {
      console.log(error)
      alert('Backend connection error')
    }
  }


  const deleteStudent = async (id) => {

    try {
      const response = await fetch(`${API}/students/${id}/`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        alert('Failed to delete student')
        return
      }

      setStudents(
        students.filter(student => student.id !== id)
      )

    } catch (error) {
      console.log(error)
      alert('Backend connection error')
    }
  }


  // ================= COMPANIES =================

  const addCompany = async (e) => {
    e.preventDefault()

    if (!companyName || !location) {
      alert('Please fill company name and location')
      return
    }

    const companyData = {
      company_name: companyName,
      location,
      website
    }

    try {

      if (editingCompanyId) {

        const response = await fetch(
          `${API}/companies/${editingCompanyId}/`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(companyData)
          }
        )

        if (!response.ok) {
          alert('Failed to update company')
          return
        }

        const updatedCompany = await response.json()

        setCompanies(
          companies.map(company =>
            company.id === editingCompanyId
              ? updatedCompany
              : company
          )
        )

        setEditingCompanyId(null)

      } else {

        const response = await fetch(`${API}/companies/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(companyData)
        })

        if (!response.ok) {
          alert('Failed to add company')
          return
        }

        const newCompany = await response.json()

        setCompanies([...companies, newCompany])
      }

      setCompanyName('')
      setLocation('')
      setWebsite('')

    } catch (error) {
      console.log(error)
      alert('Backend connection error')
    }
  }


  const editCompany = (company) => {
    setCompanyName(company.company_name)
    setLocation(company.location)
    setWebsite(company.website || '')
    setEditingCompanyId(company.id)

    document
      .getElementById('companies')
      .scrollIntoView()
  }


  const deleteCompany = async (id) => {

    try {

      const response = await fetch(
        `${API}/companies/${id}/`,
        {
          method: 'DELETE'
        }
      )

      if (!response.ok) {
        alert('Failed to delete company')
        return
      }

      setCompanies(
        companies.filter(company => company.id !== id)
      )

    } catch (error) {
      console.log(error)
      alert('Backend connection error')
    }
  }


  // ================= JOBS =================

  const addJob = async (e) => {
    e.preventDefault()

    if (!jobTitle || !jobCompany || !packageAmount || !eligibilityCgpa) {
      alert('Please fill all job details')
      return
    }

    const jobData = {
      company: Number(jobCompany),
      job_title: jobTitle,
      package: packageAmount,
      eligibility_cgpa: eligibilityCgpa
    }

    try {

      if (editingJobId) {

        const response = await fetch(
          `${API}/jobs/${editingJobId}/`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(jobData)
          }
        )

        if (!response.ok) {
          alert('Failed to update job')
          return
        }

        const updatedJob = await response.json()

        setJobs(
          jobs.map(job =>
            job.id === editingJobId
              ? updatedJob
              : job
          )
        )

        setEditingJobId(null)

      } else {

        const response = await fetch(`${API}/jobs/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(jobData)
        })

        if (!response.ok) {
          alert('Failed to add job')
          return
        }

        const newJob = await response.json()

        setJobs([...jobs, newJob])
      }

      setJobTitle('')
      setJobCompany('')
      setPackageAmount('')
      setEligibilityCgpa('')

    } catch (error) {
      console.log(error)
      alert('Backend connection error')
    }
  }


  const editJob = (job) => {

    setJobTitle(job.job_title)
    setJobCompany(String(job.company))
    setPackageAmount(job.package)
    setEligibilityCgpa(job.eligibility_cgpa)

    setEditingJobId(job.id)

    document
      .getElementById('jobs')
      .scrollIntoView()
  }


  const deleteJob = async (id) => {

    try {

      const response = await fetch(
        `${API}/jobs/${id}/`,
        {
          method: 'DELETE'
        }
      )

      if (!response.ok) {
        alert('Failed to delete job')
        return
      }

      setJobs(
        jobs.filter(job => job.id !== id)
      )

    } catch (error) {
      console.log(error)
      alert('Backend connection error')
    }
  }


  // ================= APPLICATIONS =================

  const addApplication = async (e) => {
    e.preventDefault()

    if (!applicationStudent || !applicationJob) {
      alert('Please select student and job')
      return
    }

    const applicationData = {
      student: Number(applicationStudent),
      job: Number(applicationJob),
      status: applicationStatus
    }

    try {

      if (editingApplicationId) {

        const response = await fetch(
          `${API}/applications/${editingApplicationId}/`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(applicationData)
          }
        )

        if (!response.ok) {
          alert('Failed to update application')
          return
        }

        const updatedApplication = await response.json()

        setApplications(
          applications.map(application =>
            application.id === editingApplicationId
              ? updatedApplication
              : application
          )
        )

        setEditingApplicationId(null)

      } else {

        const response = await fetch(`${API}/applications/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(applicationData)
        })

        if (!response.ok) {
          alert('Failed to add application')
          return
        }

        const newApplication = await response.json()

        setApplications([...applications, newApplication])
      }

      setApplicationStudent('')
      setApplicationJob('')
      setApplicationStatus('Applied')

    } catch (error) {
      console.log(error)
      alert('Backend connection error')
    }
  }


  const editApplication = (application) => {

    setApplicationStudent(String(application.student))
    setApplicationJob(String(application.job))
    setApplicationStatus(application.status)

    setEditingApplicationId(application.id)

    document
      .getElementById('applications')
      .scrollIntoView()
  }


  const deleteApplication = async (id) => {

    try {

      const response = await fetch(
        `${API}/applications/${id}/`,
        {
          method: 'DELETE'
        }
      )

      if (!response.ok) {
        alert('Failed to delete application')
        return
      }

      setApplications(
        applications.filter(
          application => application.id !== id
        )
      )

    } catch (error) {
      console.log(error)
      alert('Backend connection error')
    }
  }


  // ================= HELPER FUNCTIONS =================

  const getCompanyName = (companyId) => {
    const company = companies.find(
      company => company.id === companyId
    )

    return company ? company.company_name : 'Unknown Company'
  }


  const getStudentName = (studentId) => {
    const student = students.find(
      student => student.id === studentId
    )

    return student ? student.name : 'Unknown Student'
  }


  const getJobTitle = (jobId) => {
    const job = jobs.find(
      job => job.id === jobId
    )

    return job ? job.job_title : 'Unknown Job'
  }


  return (
    <div className="app">

      {/* ================= NAVIGATION ================= */}

      <nav className="navbar">

        <h2>Placement Management System</h2>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#students">Students</a>
          <a href="#companies">Companies</a>
          <a href="#jobs">Jobs</a>
          <a href="#applications">Applications</a>
        </div>

      </nav>


      {/* ================= HOME ================= */}

      <section id="home" className="hero-section">

        <div className="hero-content">

          <h1>Placement Management System</h1>

          <p>
            Manage students, companies, job opportunities and
            placement applications in one place.
          </p>

          <div className="hero-buttons">

            <button
              onClick={() =>
                document
                  .getElementById('students')
                  .scrollIntoView()
              }
            >
              View Students
            </button>

            <button
              className="secondary-button"
              onClick={() =>
                document
                  .getElementById('jobs')
                  .scrollIntoView()
              }
            >
              View Jobs
            </button>

          </div>

        </div>

      </section>


      {/* ================= DASHBOARD ================= */}

      <section className="dashboard">

        <h2>Placement Dashboard</h2>

        <div className="cards">

          <div className="card">
            <h3>Students</h3>
            <p>Manage registered students</p>
            <strong>{students.length}</strong>
          </div>

          <div className="card">
            <h3>Companies</h3>
            <p>Manage recruiting companies</p>
            <strong>{companies.length}</strong>
          </div>

          <div className="card">
            <h3>Jobs</h3>
            <p>View available job opportunities</p>
            <strong>{jobs.length}</strong>
          </div>

          <div className="card">
            <h3>Applications</h3>
            <p>Track student applications</p>
            <strong>{applications.length}</strong>
          </div>

        </div>

      </section>


      {/* ================= STUDENTS ================= */}

      <section id="students" className="info-section">

        <h2>Student Management</h2>

        <p>Add and manage student details</p>

        <form
          className="student-form"
          onSubmit={addStudent}
        >

          <input
            type="text"
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />

          <input
            type="number"
            step="0.01"
            placeholder="CGPA"
            value={cgpa}
            onChange={(e) => setCgpa(e.target.value)}
          />

          <button type="submit">
            Add Student
          </button>

        </form>


        <div className="student-list">

          <h3>Registered Students</h3>

          {students.length === 0 ? (
            <p>No students registered yet.</p>
          ) : (

            students.map((student) => (

              <div
                className="student-card"
                key={student.id}
              >

                <h3>{student.name}</h3>

                <p>
                  <strong>Email:</strong> {student.email}
                </p>

                <p>
                  <strong>Phone:</strong> {student.phone}
                </p>

                <p>
                  <strong>Department:</strong> {student.department}
                </p>

                <p>
                  <strong>CGPA:</strong> {student.cgpa}
                </p>

                <button
                  onClick={() =>
                    deleteStudent(student.id)
                  }
                >
                  Delete
                </button>

              </div>

            ))
          )}

        </div>

      </section>


      {/* ================= COMPANIES ================= */}

      <section id="companies" className="info-section">

        <h2>Company Management</h2>

        <p>Add and manage recruiting company details</p>

        <form
          className="student-form"
          onSubmit={addCompany}
        >

          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) =>
              setCompanyName(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
          />

          <input
            type="url"
            placeholder="Website (optional)"
            value={website}
            onChange={(e) =>
              setWebsite(e.target.value)
            }
          />

          <button type="submit">
            {editingCompanyId
              ? 'Update Company'
              : 'Add Company'}
          </button>

        </form>


        <div className="student-list">

          <h3>Registered Companies</h3>

          {companies.length === 0 ? (
            <p>No companies registered yet.</p>
          ) : (

            companies.map((company) => (

              <div
                className="student-card"
                key={company.id}
              >

                <h3>{company.company_name}</h3>

                <p>
                  <strong>Location:</strong> {company.location}
                </p>

                <p>
                  <strong>Website:</strong>{' '}
                  {company.website || 'Not provided'}
                </p>

                <button
                  onClick={() =>
                    editCompany(company)
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteCompany(company.id)
                  }
                >
                  Delete
                </button>

              </div>

            ))
          )}

        </div>

      </section>


      {/* ================= JOBS ================= */}

      <section id="jobs" className="info-section">

        <h2>Job Management</h2>

        <p>Add and manage available job opportunities</p>

        <form
          className="student-form"
          onSubmit={addJob}
        >

          <input
            type="text"
            placeholder="Job Title"
            value={jobTitle}
            onChange={(e) =>
              setJobTitle(e.target.value)
            }
          />


          <select
            value={jobCompany}
            onChange={(e) =>
              setJobCompany(e.target.value)
            }
          >

            <option value="">
              Select Company
            </option>

            {companies.map((company) => (

              <option
                key={company.id}
                value={company.id}
              >
                {company.company_name}
              </option>

            ))}

          </select>


          <input
            type="number"
            step="0.01"
            placeholder="Package (LPA)"
            value={packageAmount}
            onChange={(e) =>
              setPackageAmount(e.target.value)
            }
          />

          <input
            type="number"
            step="0.01"
            placeholder="Eligibility CGPA"
            value={eligibilityCgpa}
            onChange={(e) =>
              setEligibilityCgpa(e.target.value)
            }
          />

          <button type="submit">
            {editingJobId
              ? 'Update Job'
              : 'Add Job'}
          </button>

        </form>


        <div className="student-list">

          <h3>Available Jobs</h3>

          {jobs.length === 0 ? (
            <p>No jobs added yet.</p>
          ) : (

            jobs.map((job) => (

              <div
                className="student-card"
                key={job.id}
              >

                <h3>{job.job_title}</h3>

                <p>
                  <strong>Company:</strong>{' '}
                  {getCompanyName(job.company)}
                </p>

                <p>
                  <strong>Package:</strong>{' '}
                  {job.package} LPA
                </p>

                <p>
                  <strong>Eligibility CGPA:</strong>{' '}
                  {job.eligibility_cgpa}
                </p>

                <button
                  onClick={() =>
                    editJob(job)
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteJob(job.id)
                  }
                >
                  Delete
                </button>

              </div>

            ))
          )}

        </div>

      </section>


      {/* ================= APPLICATIONS ================= */}

      <section
        id="applications"
        className="info-section"
      >

        <h2>Application Management</h2>

        <p>Apply for available job opportunities</p>

        <form
          className="student-form"
          onSubmit={addApplication}
        >

          <select
            value={applicationStudent}
            onChange={(e) =>
              setApplicationStudent(e.target.value)
            }
          >

            <option value="">
              Select Student
            </option>

            {students.map((student) => (

              <option
                key={student.id}
                value={student.id}
              >
                {student.name}
              </option>

            ))}

          </select>


          <select
            value={applicationJob}
            onChange={(e) =>
              setApplicationJob(e.target.value)
            }
          >

            <option value="">
              Select Job
            </option>

            {jobs.map((job) => (

              <option
                key={job.id}
                value={job.id}
              >
                {job.job_title}
              </option>

            ))}

          </select>


          <select
            value={applicationStatus}
            onChange={(e) =>
              setApplicationStatus(e.target.value)
            }
          >

            <option value="Applied">
              Applied
            </option>

            <option value="Shortlisted">
              Shortlisted
            </option>

            <option value="Selected">
              Selected
            </option>

            <option value="Rejected">
              Rejected
            </option>

          </select>


          <button type="submit">
            {editingApplicationId
              ? 'Update Application'
              : 'Apply Now'}
          </button>

        </form>


        <div className="student-list">

          <h3>Submitted Applications</h3>

          {applications.length === 0 ? (
            <p>No applications submitted yet.</p>
          ) : (

            applications.map((application) => (

              <div
                className="student-card"
                key={application.id}
              >

                <h3>
                  {getStudentName(application.student)}
                </h3>

                <p>
                  <strong>Job:</strong>{' '}
                  {getJobTitle(application.job)}
                </p>

                <p>
                  <strong>Company:</strong>{' '}
                  {(() => {
                    const job = jobs.find(
                      job => job.id === application.job
                    )

                    return job
                      ? getCompanyName(job.company)
                      : 'Unknown Company'
                  })()}
                </p>

                <p>
                  <strong>Status:</strong>{' '}
                  {application.status}
                </p>

                <p>
                  <strong>Applied Date:</strong>{' '}
                  {application.applied_date}
                </p>

                <button
                  onClick={() =>
                    editApplication(application)
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteApplication(application.id)
                  }
                >
                  Delete
                </button>

              </div>

            ))
          )}

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer>

        <p>© 2026 Placement Management System</p>

      </footer>

    </div>
  )
}

export default App
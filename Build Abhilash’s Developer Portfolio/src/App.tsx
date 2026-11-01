import { FormEvent, useEffect, useRef, useState } from "react"

type Project = {
  id: string
  number: string
  category: string
  title: string
  shortTitle: string
  description: string
  stack: string[]
  highlight: string
  detail: string
  type: "mail" | "video" | "solar"
  doi?: string
}

const projects: Project[] = [
  {
    id: "insightmail",
    number: "01",
    category: "AI / FULL STACK DEVELOPMENT",
    title: "InsightMail — Privacy-First Enterprise Email Intelligence",
    shortTitle: "InsightMail",
    description:
      "An AI-driven email intelligence platform that uses locally hosted language models and Retrieval-Augmented Generation to perform automated email intent detection and sentiment analysis.",
    stack: ["Python", "Ollama", "Gemma-2B", "FastAPI", "React.js", "RAG"],
    highlight: "Privacy-first architecture using locally hosted LLMs.",
    detail:
      "InsightMail keeps sensitive communication within the local environment while adding an intelligence layer to enterprise inboxes. The system combines intent classification, sentiment analysis, embeddings, and contextual retrieval to surface the meaning behind high-volume email.",
    type: "mail",
  },
  {
    id: "sky-connect",
    number: "02",
    category: "FULL STACK / REAL-TIME APPLICATION",
    title: "Sky Connect — Real-Time Video Conferencing Platform",
    shortTitle: "Sky Connect",
    description:
      "A full-stack application enabling real-time video conferencing and seamless drone service management.",
    stack: ["React.js", "JavaScript", "Node.js", "WebRTC", "Socket.IO"],
    highlight: "Real-time communication and WebRTC integration.",
    detail:
      "Sky Connect brings video collaboration and drone service workflows into a unified experience. WebRTC powers direct media exchange while Socket.IO coordinates live presence, rooms, and application events across connected participants.",
    type: "video",
  },
  {
    id: "solar-forecasting",
    number: "03",
    category: "MACHINE LEARNING / DEEP LEARNING",
    title: "Solar Irradiance Forecasting",
    shortTitle: "Hybrid CNN–LSTM",
    description:
      "A hybrid deep learning framework for short-term solar irradiance forecasting using infrared sky images and temporal weather patterns.",
    stack: ["Python", "TensorFlow", "OpenCV", "CNN", "LSTM", "Flask"],
    highlight:
      "Co-authored research on a hybrid EfficientNet-B0 and BiLSTM forecasting model.",
    detail:
      "This research framework pairs spatial features extracted from infrared sky imagery with temporal weather patterns. EfficientNet-B0 and BiLSTM components work together to model changing cloud conditions for short-term solar irradiance forecasting.",
    type: "solar",
    doi: "10.56726/IRJMETS86986",
  },
]

const skillGroups = [
  {
    index: "01",
    title: "Languages",
    items: ["Python", "C++", "Java", "JavaScript (ES6+)", "SQL"],
  },
  { index: "02", title: "Frontend", items: ["React.js", "HTML5", "CSS3"] },
  {
    index: "03",
    title: "Backend",
    items: ["Node.js", "Express.js", "FastAPI", "REST APIs"],
  },
  { index: "04", title: "Databases", items: ["MongoDB", "PostgreSQL"] },
  {
    index: "05",
    title: "Systems & DevOps",
    items: ["Docker", "CI/CD", "WebSockets"],
  },
  {
    index: "06",
    title: "Machine Learning",
    items: ["NumPy", "Pandas", "Scikit-learn", "TensorFlow"],
  },
]

const navItems = ["About", "Projects", "Skills", "Achievements", "Contact"]

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>
}

function SectionHeading({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <header className="section-heading reveal">
      <p className="eyebrow">{label}</p>
      <h2>{children}</h2>
    </header>
  )
}

function ProjectVisual({ type }: { type: Project["type"] }) {
  if (type === "mail") {
    return (
      <div
        className="project-visual mail-visual"
        aria-label="InsightMail email intelligence interface preview"
      >
        <div className="mock-window">
          <div className="mock-top">
            <i />
            <i />
            <i />
            <span>INSIGHTMAIL / LOCAL AI</span>
          </div>
          <div className="mail-layout">
            <div className="mail-nav">
              <b>IM</b>
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="mail-list">
              <small>PRIMARY · 12</small>
              {[
                "Quarterly brief",
                "Project feedback",
                "Team sync",
                "Invoice update",
              ].map((mail, i) => (
                <div
                  className={`mail-row ${i === 0 ? "active" : ""}`}
                  key={mail}
                >
                  <i>{["N", "AS", "MK", "R"][i]}</i>
                  <p>
                    <b>{mail}</b>
                    <span>
                      {i === 0 ? "High intent detected" : "Email conversation"}
                    </span>
                  </p>
                </div>
              ))}
            </div>
            <div className="mail-detail">
              <div className="signal-row">
                <span>INTENT · REQUEST</span>
                <span>POSITIVE 84%</span>
              </div>
              <h4>Quarterly product brief</h4>
              <p>
                Hi team, I’ve reviewed the latest direction and would like to
                align on the next steps...
              </p>
              <div className="ai-summary">
                <small>LOCAL AI SUMMARY</small>
                <b>Action requested: schedule product review</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  if (type === "video") {
    return (
      <div
        className="project-visual video-visual"
        aria-label="Sky Connect video conference interface preview"
      >
        <div className="mock-window">
          <div className="mock-top">
            <i />
            <i />
            <i />
            <span>SKY CONNECT / ROOM 04</span>
          </div>
          <div className="video-grid">
            <div className="participant main-person">
              <div className="avatar">AT</div>
              <span>Abhilash · Host</span>
            </div>
            <div className="participant">
              <div className="avatar">SK</div>
              <span>Sanjay</span>
            </div>
            <div className="participant">
              <div className="avatar">RM</div>
              <span>Riya</span>
            </div>
            <div className="participant data-feed">
              <small>DRONE FEED</small>
              <b>LIVE</b>
              <div className="radar" />
            </div>
          </div>
          <div className="call-controls">
            <i>—</i>
            <i>●</i>
            <i>⌁</i>
            <i className="hang">×</i>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div
      className="project-visual solar-visual"
      aria-label="Solar forecasting analytics dashboard preview"
    >
      <div className="mock-window">
        <div className="mock-top">
          <i />
          <i />
          <i />
          <span>SOLARCAST / FORECAST MODEL</span>
        </div>
        <div className="solar-grid">
          <div className="sky-image">
            <img
              src="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=900&q=80"
              alt="Dark cloud formations used as a visual for solar forecasting"
            />
            <span>IR SKY / T+15</span>
          </div>
          <div className="prediction">
            <small>PREDICTED IRRADIANCE</small>
            <b>
              642 <em>W/m²</em>
            </b>
            <div className="chart">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="legend">
              <span>Observed</span>
              <span>Predicted</span>
            </div>
          </div>
          <div className="model-flow">
            <span>EfficientNet-B0</span>
            <i>→</i>
            <span>BiLSTM</span>
            <i>→</i>
            <span>Forecast</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [formNote, setFormNote] = useState("")
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) =>
            entry.isIntersecting && entry.target.classList.add("in-view"),
        ),
      { threshold: 0.12 },
    )
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el))
    const onScroll = () => setScrolled(window.scrollY > 30)
    const onMove = (event: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("mousemove", onMove)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = activeProject || menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [activeProject, menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get("name") || "")
    const email = String(data.get("email") || "")
    const subject = String(data.get("subject") || "Portfolio enquiry")
    const message = String(data.get("message") || "")
    const body = `Hi Abhilash,\n\n${message}\n\nFrom: ${name} (${email})`
    setFormNote("Opening your email app — your message has not been sent yet.")
    window.location.href = `mailto:abhitilagar@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <>
      <div className="noise" aria-hidden="true" />
      <div className="custom-cursor" ref={cursorRef} aria-hidden="true" />
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <nav
        className={`navbar ${scrolled ? "scrolled" : ""}`}
        aria-label="Main navigation"
      >
        <a href="#home" className="logo" onClick={closeMenu}>
          ABHILASH<span>.</span>
        </a>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#home" onClick={closeMenu}>
            Home
          </a>
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}>
              {item}
            </a>
          ))}
          <a
            className="nav-cta"
            href="mailto:abhitilagar@gmail.com"
            onClick={closeMenu}
          >
            Let&apos;s Talk <Arrow diagonal />
          </a>
          <p className="menu-caption">BELAGAVI, INDIA · AVAILABLE FOR WORK</p>
        </div>
        <button
          className={`menu-button ${menuOpen ? "open" : ""}`}
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
      </nav>

      <main id="main">
        <section className="hero" id="home">
          <div className="hero-orb" aria-hidden="true" />
          <div className="hero-intro">
            <p>
              <span className="status-dot" /> HELLO, I&apos;M ABHILASH TILAGAR
            </p>
            <p className="hero-code">CS ENGINEER / FULL-STACK / AI·ML</p>
          </div>
          <h1 className="hero-title">
            <span>I BUILD DIGITAL</span>
            <span className="outlined">EXPERIENCES.</span>
            <span>AND EXPLORE</span>
            <span className="hero-last">
              INTELLIGENT SYSTEMS.
              <i className="monogram" aria-label="Profile image placeholder">
                AT<small>YOUR PHOTO</small>
              </i>
            </span>
          </h1>
          <div className="hero-bottom">
            <p className="hero-copy">
              Computer Science Engineer passionate about building scalable web
              applications, exploring artificial intelligence, and solving
              real-world problems through technology.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#projects">
                Explore My Work <Arrow />
              </a>
              <a className="button ghost" href="#contact">
                Let&apos;s Connect <Arrow diagonal />
              </a>
            </div>
            <p className="availability">
              <span className="status-dot" /> OPEN TO SOFTWARE ENGINEERING
              OPPORTUNITIES
            </p>
          </div>
          <a className="scroll-cue" href="#about">
            <span>SCROLL TO DISCOVER</span>
            <i>↓</i>
          </a>
        </section>

        <section className="section about" id="about">
          <SectionHeading label="01 / WHO I AM">
            CURIOUS BY NATURE.
            <br />
            <span>BUILDER BY CHOICE.</span>
          </SectionHeading>
          <div className="about-grid reveal">
            <div className="about-statement">
              <p>
                I&apos;m Abhilash Tilagar, a Computer Science Engineering
                graduate from Angadi Institute of Technology and Management.
              </p>
            </div>
            <div className="about-copy">
              <p>
                I enjoy building full-stack applications, exploring artificial
                intelligence, and understanding how software systems work under
                the hood.
              </p>
              <p>
                From developing real-time communication platforms to
                experimenting with locally hosted language models and deep
                learning architectures, I enjoy turning ideas into practical
                technology.
              </p>
              <p>
                I believe in continuous learning, solving meaningful problems,
                and building software that makes a difference.
              </p>
            </div>
          </div>
          <div className="principles">
            {[
              [
                "01",
                "SOFTWARE DEVELOPMENT",
                "Building interactive web applications and backend systems.",
              ],
              [
                "02",
                "ARTIFICIAL INTELLIGENCE",
                "Exploring machine learning, deep learning, and LLM-powered applications.",
              ],
              [
                "03",
                "PROBLEM SOLVING",
                "Enjoying algorithmic challenges and continuously improving engineering fundamentals.",
              ],
            ].map(([number, title, copy]) => (
              <article className="principle-card reveal" key={number}>
                <span>{number}</span>
                <div className="principle-mark">
                  {number === "01" ? "⌘" : number === "02" ? "✦" : "↗"}
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <div className="education reveal">
            <p className="eyebrow">EDUCATION / 2022—2026</p>
            <div>
              <h3>
                B.E. — COMPUTER SCIENCE
                <br />
                AND ENGINEERING
              </h3>
              <p>Angadi Institute of Technology and Management</p>
            </div>
            <strong>
              CGPA
              <br />
              <span>8.27/10</span>
            </strong>
          </div>
        </section>

        <section className="section projects" id="projects">
          <SectionHeading label="02 / SELECTED WORK">
            IDEAS TURNED
            <br />
            <span>INTO CODE.</span>
          </SectionHeading>
          <div className="project-list">
            {projects.map((project) => (
              <article className="project-card reveal" key={project.id}>
                <div className="project-meta">
                  <span>{project.number} / 03</span>
                  <p>{project.category}</p>
                </div>
                <div className="project-title-row">
                  <h3>{project.shortTitle}</h3>
                  <button
                    type="button"
                    onClick={() => setActiveProject(project)}
                    aria-label={`View ${project.shortTitle} details`}
                  >
                    ↗
                  </button>
                </div>
                <ProjectVisual type={project.type} />
                <div className="project-info">
                  <p>{project.description}</p>
                  <div>
                    <ul>
                      {project.stack.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                    <button
                      className="text-link"
                      type="button"
                      onClick={() => setActiveProject(project)}
                    >
                      VIEW PROJECT <Arrow diagonal />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section skills" id="skills">
          <SectionHeading label="03 / MY TOOLKIT">
            TOOLS I USE TO
            <br />
            <span>BUILD THINGS.</span>
          </SectionHeading>
          <div className="skill-grid">
            {skillGroups.map((group) => (
              <article className="skill-card reveal" key={group.title}>
                <div>
                  <span>{group.index}</span>
                  <i>+</i>
                </div>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="marquee" aria-hidden="true">
            <div>
              REACT · PYTHON · NODE · AI / ML · WEBRTC · TENSORFLOW ·{" "}
              <span>
                REACT · PYTHON · NODE · AI / ML · WEBRTC · TENSORFLOW ·
              </span>
            </div>
          </div>
        </section>

        <section className="section recognition" id="achievements">
          <SectionHeading label="04 / RECOGNITION">
            WORK THAT MADE
            <br />
            <span>AN IMPACT.</span>
          </SectionHeading>
          <div className="achievement-grid">
            <article className="achievement reveal">
              <span className="giant-number">02</span>
              <div>
                <p className="eyebrow">CODE BHARAT 2025 / IIIT DHARWAD</p>
                <h3>
                  SECOND
                  <br />
                  RUNNER-UP
                </h3>
                <p>
                  Secured Second Runner-Up among 130+ teams for building
                  InsightMail, an AI-driven email intelligence platform
                  featuring intent and emotion detection.
                </p>
              </div>
              <i>↗</i>
            </article>
            <article className="achievement reveal">
              <span className="giant-number">R</span>
              <div>
                <p className="eyebrow">RESEARCH / DEEP LEARNING</p>
                <h3>
                  RESEARCH
                  <br />
                  PUBLICATION
                </h3>
                <p>
                  Co-authored research on a hybrid EfficientNet-B0 and BiLSTM
                  deep learning model for solar irradiance forecasting.
                </p>
                <a
                  href="https://doi.org/10.56726/IRJMETS86986"
                  target="_blank"
                  rel="noreferrer"
                >
                  DOI: 10.56726/IRJMETS86986 <Arrow diagonal />
                </a>
              </div>
              <i>↗</i>
            </article>
          </div>
        </section>

        <section className="section experience" id="experience">
          <SectionHeading label="05 / EXPERIENCE">
            WHERE I&apos;VE
            <br />
            <span>CONTRIBUTED.</span>
          </SectionHeading>
          <div className="timeline reveal">
            <div className="timeline-line">
              <i />
            </div>
            <div className="timeline-date">
              <span>FEB 2026</span>
              <span>MAY 2026</span>
            </div>
            <article>
              <p className="eyebrow">ACADEMIC INTERNSHIP</p>
              <h3>
                WEB DEVELOPMENT
                <br />
                INTERN
              </h3>
              <h4>Vrishanksoft OPC Pvt. Ltd.</h4>
              <ul>
                <li>
                  Completed an academic internship focused on developing optimal
                  backend endpoints and reducing data retrieval latency across
                  user modules.
                </li>
                <li>
                  Designed and implemented responsive full-stack web interfaces
                  using React.js.
                </li>
              </ul>
            </article>
          </div>
        </section>

        <section className="section contact" id="contact">
          <SectionHeading label="06 / LET'S CONNECT">
            HAVE AN IDEA?
            <br />
            <span>LET&apos;S BUILD SOMETHING GREAT.</span>
          </SectionHeading>
          <div className="contact-grid">
            <div className="contact-left reveal">
              <p>
                I&apos;m always interested in connecting with developers,
                exploring opportunities, and working on exciting technology
                projects.
              </p>
              <div className="contact-links">
                <a href="mailto:abhitilagar@gmail.com">
                  <small>EMAIL</small>
                  <span>abhitilagar@gmail.com</span>
                  <i>↗</i>
                </a>
                <a
                  href="https://www.linkedin.com/in/abhilashtilagar"
                  target="_blank"
                  rel="noreferrer"
                >
                  <small>LINKEDIN</small>
                  <span>AbhilashTilagar</span>
                  <i>↗</i>
                </a>
                <span className="pending-link">
                  <small>GITHUB</small>
                  <span>Profile URL to be added</span>
                  <i>—</i>
                </span>
              </div>
            </div>
            <form className="contact-form reveal" onSubmit={submitContact}>
              <label>
                <span>01 / YOUR NAME</span>
                <input
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  required
                />
              </label>
              <label>
                <span>02 / EMAIL ADDRESS</span>
                <input
                  name="email"
                  type="email"
                  placeholder="you@email.com"
                  required
                />
              </label>
              <label>
                <span>03 / SUBJECT</span>
                <input
                  name="subject"
                  type="text"
                  placeholder="What would you like to discuss?"
                  required
                />
              </label>
              <label>
                <span>04 / MESSAGE</span>
                <textarea
                  name="message"
                  placeholder="Tell me about your idea or opportunity..."
                  rows={4}
                  required
                />
              </label>
              <button className="button primary submit-button" type="submit">
                OPEN IN EMAIL <Arrow diagonal />
              </button>
              {formNote && (
                <p className="form-note" role="status">
                  {formNote}
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-top">
          <a className="logo" href="#home">
            ABHILASH<span>.</span>
          </a>
          <p>BUILDING. LEARNING. EVOLVING.</p>
          <a className="top-button" href="#home" aria-label="Back to top">
            ↑
          </a>
        </div>
        <div className="footer-bottom">
          <p>© 2026 ABHILASH TILAGAR</p>
          <div>
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}>
                {item}
              </a>
            ))}
          </div>
          <p>BELAGAVI, INDIA</p>
        </div>
      </footer>

      {activeProject && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={() => setActiveProject(null)}
        >
          <article
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              aria-label="Close project details"
              onClick={() => setActiveProject(null)}
            >
              ×
            </button>
            <p className="eyebrow">
              {activeProject.number} / {activeProject.category}
            </p>
            <h2 id="modal-title">{activeProject.title}</h2>
            <ProjectVisual type={activeProject.type} />
            <div className="modal-content">
              <div>
                <small>PROJECT OVERVIEW</small>
                <p>{activeProject.detail}</p>
              </div>
              <div>
                <small>KEY FOCUS</small>
                <p>{activeProject.highlight}</p>
                <ul>
                  {activeProject.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
                {activeProject.doi && (
                  <a
                    href={`https://doi.org/${activeProject.doi}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    READ PUBLICATION <Arrow diagonal />
                  </a>
                )}
              </div>
            </div>
            <p className="placeholder-note">
              GitHub and live demo links will be added when available.
            </p>
          </article>
        </div>
      )}
    </>
  )
}

export default App

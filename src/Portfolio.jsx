import { useRef, useState, useEffect } from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  OrbitControls,
  Sphere,
  MeshDistortMaterial,
  Stars,
} from "@react-three/drei";

import { motion, useScroll, useTransform } from "framer-motion";

// ============================================
// DATA
// ============================================

const DATA = {
  name: "Nikky Kumar",
  title: "Full Stack Developer",
  location: "Noida, India",
  email: "knikki7505@gmail.com",
  phone: "+91-7505879078",

  github: "https://github.com/nikky-kumar7505",

  linkedin:
    "https://www.linkedin.com/in/nikky-kumar-30177a266/",

  leetcode:
    "https://leetcode.com/u/vKRL4hzzSq/",

  summary:
    "Full Stack Developer with strong hands-on experience in building scalable web applications using React.js, Node.js, Express.js, MongoDB, and MySQL. Skilled in frontend UI development, backend REST API design, authentication, and cloud deployment on AWS, Render, and Vercel.",

  stats: [
    { num: "50+", label: "REST APIs Built" },
    { num: "100+", label: "Users Served" },
    { num: "3", label: "Internships" },
    { num: "2+", label: "Production Apps" },
  ],

  experience: [
    {
      role: "Full Stack Developer Intern",
      company: "AP Mobility Pvt. Ltd.",
      location: "Noida",
      period: "Aug 2025 – May 2026",

      bullets: [
        "Developed and maintained 50+ REST APIs using Node.js and Express for production systems.",
        "Built scalable React.js dashboards used by 100+ field users.",
        "Fixed 40+ frontend and backend bugs improving system stability by 30%.",
        "Implemented JWT authentication and role-based access control.",
        "Optimized MySQL queries reducing API response time by 25%.",
        "Assisted in deployment using Render and Vercel.",
      ],
    },

    {
      role: "MERN Stack Developer Intern",
      company: "Lakshmi Industrial Corporation",
      location: "Meerut",
      period: "Apr 2025 – Jun 2025",

      bullets: [
        "Developed a railway automation system using React.js, Node.js, Express.js, and MySQL.",
        "Designed and implemented 10+ REST APIs for secure data submission.",
        "Fixed 25+ UI and functional bugs improving system reliability by 35%.",
        "Deployed a React-based dealership website on AWS S3 with admin panel and Google Maps integration.",
      ],
    },

    {
      role: "Frontend Developer Intern",
      company: "Figmanet Solutions Pvt. Ltd.",
      location: "New Delhi",
      period: "Dec 2024 – Mar 2025",

      bullets: [
        "Built and optimized 10+ responsive UI pages using React.js and Bootstrap.",
        "Integrated third-party APIs for domain availability search.",
        "Improved SEO and reduced page load time by 30%.",
      ],
    },
  ],

  skills: {
    Frontend: [
      "React.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Bootstrap",
      "JavaScript",
    ],

    Backend: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT Authentication",
    ],

    Database: ["MongoDB", "MySQL"],

    Cloud: ["AWS", "Render", "Vercel"],

    Tools: [
      "Git",
      "GitHub",
      "Postman",
      "VS Code",
      "Chrome DevTools",
    ],
  },

  projects: [
    {
      icon: "🛒",

      name: "CodeStore",

      tags: [
        "React.js",
        "Node.js",
        "MongoDB",
        "Express",
        "Razorpay",
      ],

      desc:
        "Full-stack MERN e-commerce platform with authentication, product management, cart system, and Razorpay payment integration.",

      links: [
        {
          label: "GitHub",

          href:
            "https://github.com/nikky-kumar7505/Code-Store---Ecommerce-App",
        },

        {
          label: "Live Demo",

          href: "https://nikkyofficial.vercel.app",
        },
      ],
    },

    {
      icon: "🚗",

      name: "RideBuddy – Carpooling App",

      tags: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT",
      ],

      desc:
        "Built 50+ REST APIs with JWT authentication, ride matching, referral system, discount engine and MongoDB schemas.",

      links: [
        {
          label: "Play Store",

          href:
            "https://play.google.com/store/apps/details?id=app.ridebuddy.carpool",
        },
      ],
    },
  ],

  certifications: [
    {
      icon: "🏅",
      name: "Cloud Computing",
      issuer: "IIT Kharagpur · NPTEL",
    },

    {
      icon: "🔌",
      name: "Internet of Things",
      issuer: "IIT Kharagpur · NPTEL",
    },

    {
      icon: "💼",
      name: "Career Essentials in Software Development",
      issuer: "Microsoft & LinkedIn",
    },

    {
      icon: "☁️",
      name: "Production Deployments",
      issuer: "AWS · Render · Vercel",
    },
  ],
};

// ============================================
// 3D SPHERE
// ============================================

function AnimatedSphere() {
  const ref = useRef();

  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * 0.15;
    ref.current.rotation.y = state.clock.elapsedTime * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={3}>
      <Sphere ref={ref} args={[1.5, 200, 200]}>
        <MeshDistortMaterial
          color="#38bdf8"
          distort={0.5}
          speed={2}
          roughness={0}
        />
      </Sphere>
    </Float>
  );
}

// ============================================
// FLOATING CUBES
// ============================================

function FloatingCube({ position }) {
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial
        color="#818cf8"
        wireframe
      />
    </mesh>
  );
}

// ============================================
// SECTION
// ============================================

function Section({ id, children, style = {} }) {
  return (
    <section
      id={id}
      style={{
        padding: "70px 7%",
        ...style,
      }}
    >
      <div
        style={{
          maxWidth: 1150,
          margin: "0 auto",
        }}
      >
        {children}
      </div>
    </section>
  );
}

// ============================================
// SECTION HEAD
// ============================================

function SectionHead({ label, title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      style={{ marginBottom: 30 }}
    >
      {/* Small top label */}
      <p
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#38bdf8",
          marginBottom: 10,
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        {label}
      </p>

      {/* Main heading */}
      <h2
        style={{
          fontSize: "clamp(2rem, 4vw, 3.2rem)",
          fontWeight: 700,
          lineHeight: 1.1,
          color: "#f8fafc",
          letterSpacing: "-1px",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        {title}
      </h2>

      {/* Gradient line */}
      <div
        style={{
          width: 80,
          height: 4,
          borderRadius: 999,
          marginTop: 14,
          background: "linear-gradient(90deg,#38bdf8,#818cf8)",
        }}
      />
    </motion.div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function Portfolio() {
  const [activeSection, setActiveSection] =
    useState("about");

  const { scrollY } = useScroll();

  const y1 = useTransform(
    scrollY,
    [0, 1000],
    [0, 200]
  );

  const y2 = useTransform(
    scrollY,
    [0, 1000],
    [0, -150]
  );

  useEffect(() => {
    const ids = [
      "about",
      "experience",
      "skills",
      "projects",
      "contact",
    ];

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            setActiveSection(en.target.id);
          }
        });
      },

      {
        rootMargin:
          "-40% 0px -55% 0px",
      }
    );

    ids.forEach((id) => {
      const el =
        document.getElementById(id);

      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  return (
    <div
      style={{
        background: "#040812",
        minHeight: "100vh",
        color: "#e2e8f0",
        overflowX: "hidden",
        fontFamily:
          "'DM Sans', sans-serif",
      }}
    >
      {/* ============================================ */}
      {/* GLOBAL STYLES */}
      {/* ============================================ */}

      <style>{`
      
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

      *{
        margin:0;
        padding:0;
        box-sizing:border-box;
      }

      html{
        scroll-behavior:smooth;
      }

      body{
        background:#040812;
      }

      ::-webkit-scrollbar{
        width:4px;
      }

      ::-webkit-scrollbar-thumb{
        background:linear-gradient(#38bdf8,#818cf8);
      }

      @keyframes gridMove{
        from{
          background-position:0 0;
        }

        to{
          background-position:60px 60px;
        }
      }

      .glass{
        background:rgba(255,255,255,0.05);
        backdrop-filter:blur(20px);
        border:1px solid rgba(255,255,255,0.08);
      }

      .nav-link{
        color:#64748b;
        text-decoration:none;
        font-size:14px;
        transition:.3s;
      }

      .nav-link:hover,
      .nav-link.active{
        color:#38bdf8;
      }

      .skill-pill{
        padding:10px 18px;
        border-radius:999px;
        background:rgba(255,255,255,0.04);
        border:1px solid rgba(255,255,255,0.07);
        font-size:14px;
        color:#94a3b8;
        transition:.3s;
      }

      .skill-pill:hover{
        transform:translateY(-4px);
        border-color:#38bdf8;
        color:#38bdf8;
      }

      .project-card{
        padding:32px;
        border-radius:24px;
        background:rgba(255,255,255,0.05);
        backdrop-filter:blur(20px);
        border:1px solid rgba(255,255,255,0.08);
        box-shadow:
          0 10px 40px rgba(0,0,0,0.3),
          inset 0 1px rgba(255,255,255,0.04);
        transition:.4s;
        transform-style:preserve-3d;
      }

      .project-card:hover{
        transform:
          perspective(1000px)
          rotateX(6deg)
          rotateY(-6deg)
          translateY(-8px);

        border-color:
          rgba(56,189,248,0.4);
      }

      .btn-primary{
        padding:13px 28px;
        border-radius:12px;
        text-decoration:none;
        font-weight:700;
        background:
          linear-gradient(
            90deg,
            #38bdf8,
            #818cf8
          );

        color:#040812;
        transition:.3s;
      }

      .btn-primary:hover{
        transform:translateY(-3px);
      }

      .btn-ghost{
        padding:13px 28px;
        border-radius:12px;
        border:1px solid rgba(255,255,255,0.1);
        color:#e2e8f0;
        text-decoration:none;
        transition:.3s;
      }

      .btn-ghost:hover{
        border-color:#38bdf8;
        transform:translateY(-3px);
      }

      .project-link{
        font-size:13px;
        color:#38bdf8;
        text-decoration:none;
      }

      .social-btn{
        padding:11px 20px;
        border-radius:12px;
        border:1px solid rgba(255,255,255,0.08);
        text-decoration:none;
        color:#94a3b8;
        transition:.3s;
      }

      .social-btn:hover{
        border-color:#38bdf8;
        color:#38bdf8;
      }

      @media(max-width:900px){

        .hero-grid{
          grid-template-columns:1fr !important;
          text-align:center;
        }

        .nav-items{
          display:none !important;
        }
      }

      `}</style>

      {/* ============================================ */}
      {/* NAVBAR */}
      {/* ============================================ */}

      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
          padding: "18px 7%",
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",

          background:
            "rgba(4,8,18,0.85)",

          backdropFilter:
            "blur(20px)",

          borderBottom:
            "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 800,
            background:
              "linear-gradient(90deg,#38bdf8,#818cf8)",

            WebkitBackgroundClip:
              "text",

            WebkitTextFillColor:
              "transparent",
          }}
        >
          NK
        </div>

        <div
          className="nav-items"
          style={{
            display: "flex",
            gap: 28,
          }}
        >
          {[
            "about",
            "experience",
            "skills",
            "projects",
            "contact",
          ].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={`nav-link ${
                activeSection === item
                  ? "active"
                  : ""
              }`}
            >
              {item
                .charAt(0)
                .toUpperCase() +
                item.slice(1)}
            </a>
          ))}
        </div>
      </nav>

      {/* ============================================ */}
      {/* HERO */}
      {/* ============================================ */}

      <section
        id="about"
        style={{
          minHeight: "100vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          padding:
            "110px 7% 40px",
          overflow: "hidden",
        }}
      >
        {/* Grid */}

        <div
          style={{
            position: "absolute",
            inset: 0,

            backgroundImage:
              "linear-gradient(rgba(56,189,248,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,0.04) 1px,transparent 1px)",

            backgroundSize:
              "60px 60px",

            animation:
              "gridMove 8s linear infinite",
          }}
        />

        {/* Glow */}

        <motion.div
          style={{
            y: y1,
            position: "absolute",
            width: 600,
            height: 600,
            background:
              "rgba(56,189,248,0.08)",

            borderRadius: "50%",
            filter: "blur(120px)",
            top: -100,
            right: -100,
          }}
        />

        <motion.div
          style={{
            y: y2,
            position: "absolute",
            width: 400,
            height: 400,
            background:
              "rgba(129,140,248,0.07)",

            borderRadius: "50%",
            filter: "blur(120px)",
            bottom: -100,
            left: "10%",
          }}
        />

        {/* Canvas */}

        <div
          style={{
            position: "absolute",
            inset: 0,
          }}
        >
          <Canvas
            camera={{
              position: [0, 0, 5],
            }}
          >
            <ambientLight intensity={1.5} />

            <directionalLight
              position={[2, 2, 5]}
              intensity={2}
            />

            <Stars
              radius={100}
              depth={50}
              count={5000}
              factor={4}
            />

            <AnimatedSphere />

            <FloatingCube
              position={[-4, 2, -2]}
            />

            <FloatingCube
              position={[4, -1, -1]}
            />

            <FloatingCube
              position={[2, 3, -3]}
            />

            <OrbitControls
              enableZoom={false}
              autoRotate
              autoRotateSpeed={1.2}
            />
          </Canvas>
        </div>

        {/* Content */}

        <div
          className="hero-grid"
          style={{
            position: "relative",
            zIndex: 10,
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr",

            gap: 60,
            alignItems: "center",
            maxWidth: 1200,
            margin: "0 auto",
            width: "100%",
          }}
        >
          {/* LEFT */}

          <div>
            {/* <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding:
                  "6px 16px",

                borderRadius: 999,

                background:
                  "rgba(56,189,248,0.1)",

                border:
                  "1px solid rgba(56,189,248,0.2)",

                color: "#38bdf8",
                fontSize: 13,
                marginBottom: 20,
              }}
            >
              ⚡ Open To Opportunities
            </div> */}

            <h1
              style={{
                fontSize:
                  "clamp(3rem,6vw,5rem)",

                fontWeight: 800,
                lineHeight: 1,
                marginBottom: 16,
              }}
            >
              Hi, I'm{" "}

              <span
                style={{
                  background:
                    "linear-gradient(90deg,#38bdf8,#818cf8)",

                  WebkitBackgroundClip:
                    "text",

                  WebkitTextFillColor:
                    "transparent",
                }}
              >
                Nikky Kumar
              </span>
            </h1>

            <p
              style={{
                fontSize: "1.2rem",
                color: "#818cf8",
                marginBottom: 18,
              }}
            >
              Full Stack Developer ·
              MERN Stack
            </p>

            <p
              style={{
                color: "#94a3b8",
                lineHeight: 1.8,
                maxWidth: 520,
                marginBottom: 30,
              }}
            >
              {DATA.summary}
            </p>

            <div
              style={{
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
              }}
            >
              <a
                href="#projects"
                className="btn-primary"
              >
                View Projects
              </a>

              <a
                href={DATA.github}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                GitHub
              </a>

              <a
                href={`mailto:${DATA.email}`}
                className="btn-ghost"
              >
                Email Me
              </a>
            </div>

            {/* STATS */}

            <div
              style={{
                display: "flex",
                gap: 32,
                marginTop: 40,
                flexWrap: "wrap",
              }}
            >
              {DATA.stats.map((s) => (
                <div key={s.label}>
                  <div
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: 800,
                      color: "#38bdf8",
                    }}
                  >
                    {s.num}
                  </div>

                  <div
                    style={{
                      fontSize: 12,
                      color: "#64748b",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}

          {/* <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              className="glass"
              style={{
                width: 320,
                height: 320,
                borderRadius: "50%",
                display: "flex",
                justifyContent:
                  "center",

                alignItems: "center",

                border:
                  "2px solid rgba(56,189,248,0.2)",

                fontSize: 90,
                fontWeight: 800,

                background:
                  "linear-gradient(135deg,#0f172a,#1e293b)",

                boxShadow:
                  "0 0 60px rgba(56,189,248,0.2)",
              }}
            >
              NK
            </div>
          </div> */}
        </div>
      </section>

      {/* EXPERIENCE */}

      <Section id="experience">
        <SectionHead
          label="Work History"
          title="Experience"
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {DATA.experience.map((exp) => (
            <div
              key={exp.company}
              className="glass"
              style={{
                padding: 30,
                borderRadius: 22,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",

                  flexWrap: "wrap",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: 20,
                    }}
                  >
                    {exp.role}
                  </h3>

                  <p
                    style={{
                      color: "#38bdf8",
                    }}
                  >
                    {exp.company} ·{" "}
                    {exp.location}
                  </p>
                </div>

                <div
                  style={{
                    color: "#818cf8",
                  }}
                >
                  {exp.period}
                </div>
              </div>

              <ul
                style={{
                  paddingLeft: 18,
                  color: "#94a3b8",
                  lineHeight: 1.8,
                }}
              >
                {exp.bullets.map(
                  (b, i) => (
                    <li key={i}>
                      {b}
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* SKILLS */}

      <Section
        id="skills"
        style={{
          background:
            "rgba(255,255,255,0.01)",
        }}
      >
        <SectionHead
          label="Technologies"
          title="Skills"
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 30,
          }}
        >
          {Object.entries(
            DATA.skills
          ).map(([cat, items]) => (
            <div key={cat}>
              <h4
                style={{
                  marginBottom: 14,
                  color: "#818cf8",
                }}
              >
                {cat}
              </h4>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                {items.map((skill) => (
                  <div
                    key={skill}
                    className="skill-pill"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}

      <Section id="projects">
        <SectionHead
          label="Portfolio"
          title="Projects"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",

            gap: 24,
          }}
        >
          {DATA.projects.map(
            (project) => (
              <div
                key={project.name}
                className="project-card"
              >
                <div
                  style={{
                    fontSize: 34,
                    marginBottom: 18,
                  }}
                >
                  {project.icon}
                </div>

                <h3
                  style={{
                    fontSize: 22,
                    marginBottom: 12,
                  }}
                >
                  {project.name}
                </h3>

                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                    marginBottom: 14,
                  }}
                >
                  {project.tags.map(
                    (tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 12,
                          color:
                            "#818cf8",

                          background:
                            "rgba(129,140,248,0.1)",

                          padding:
                            "4px 10px",

                          borderRadius: 999,
                        }}
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>

                <p
                  style={{
                    color: "#94a3b8",
                    lineHeight: 1.8,
                    marginBottom: 18,
                  }}
                >
                  {project.desc}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: 14,
                  }}
                >
                  {project.links.map(
                    (l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="project-link"
                      >
                        {l.label}
                      </a>
                    )
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </Section>

      {/* CONTACT */}

      <section
        id="contact"
        style={{
          padding: "80px 7%",
          textAlign: "center",
        }}
      >
        <SectionHead
          label="Contact"
          title="Get In Touch"
        />

        <div
          className="glass"
          style={{
            padding: 50,
            borderRadius: 28,
            maxWidth: 700,
            margin: "0 auto",
          }}
        >
          <h3
            style={{
              color: "#38bdf8",
              marginBottom: 10,
            }}
          >
            {DATA.email}
          </h3>

          <p
            style={{
              color: "#64748b",
              marginBottom: 28,
            }}
          >
            {DATA.phone} ·{" "}
            {DATA.location}
          </p>

          <a
            href={`mailto:${DATA.email}`}
            className="btn-primary"
          >
            Send Email
          </a>

          <div
            style={{
              display: "flex",
              justifyContent:
                "center",

              gap: 12,
              flexWrap: "wrap",
              marginTop: 30,
            }}
          >
            <a
              href={DATA.linkedin}
              target="_blank"
              rel="noreferrer"
              className="social-btn"
            >
              LinkedIn
            </a>

            <a
              href={DATA.github}
              target="_blank"
              rel="noreferrer"
              className="social-btn"
            >
              GitHub
            </a>

            <a
              href={DATA.leetcode}
              target="_blank"
              rel="noreferrer"
              className="social-btn"
            >
              LeetCode
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer
        style={{
          borderTop:
            "1px solid rgba(255,255,255,0.05)",

          padding: "24px 7%",
          textAlign: "center",
          color: "#475569",
          fontSize: 13,
        }}
      >
        © {new Date().getFullYear()} Nikky
        Kumar · Built with React &
        Three.js
      </footer>
    </div>
  );
}
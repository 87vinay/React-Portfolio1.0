import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import image1 from "../assets/images/image1.png";
import image2 from "../assets/images/image2.png";
import image3 from "../assets/images/image3.png";
import image4 from "../assets/images/image4.png";
import "../styles/ProjectSection.css";
gsap.registerPlugin(ScrollTrigger);

const ProjectSection = () => {
  const projects = [
    {
      image: image1,
      title: "E-commerce clone",
      description: "A clone of an e-commerce website.",
      link: "https://amazonclone-8yng.vercel.app/",
    },
    {
      image: image2,
      title: "RBAC Dashboard",
      description: "A dashboard for role-based access control.",
      link: "https://rbac-project-bieve8bsb-vinays-projects-99429e2f.vercel.app/",
    },
    {
      image: image3,
      title: "Nike Clone",
      description: "A clone of the Nike website.",
      link: "https://87vinay.github.io/NikeClone/",
    },
    {
      image: image4,
      title: "Pinterest Clone",
      description: "A clone of the Pinterest website.",
      link: "https://pinterest-clone-1qtsc562o-vinays-projects-99429e2f.vercel.app/",
    },
  ];

  const projectRefs = useRef([]);
  projectRefs.current = projects.map(
    (_, i) => projectRefs.current[i] || React.createRef()
  );

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      projectRefs.current.forEach((ref) => {
        if (ref.current) {
          ScrollTrigger.create({
            trigger: ref.current,
            start: "top 80%",
            end: "bottom 20%",
            markers: false,
            toggleActions: "play none none reverse",
            onEnter: () =>
              gsap
                .fromTo(
                  ref.current,
                  { opacity: 0 },
                  {
                    opacity: 1,
                    duration: 1.4,
                    ease: "power2.out",
                  }
                )
                .play(),
            onLeaveBack: () =>
              gsap
                .fromTo(
                  ref.current,
                  { opacity: 1 },
                  {
                    opacity: 0,
                    duration: 1,
                    ease: "power2.out",
                  }
                )
                .play(),
          });
        }
      });
    }
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile]);

  return (
    <div className="project-section-wrapper">
      <div className="app">
        <div className="section">
          <div className="section-header">
            <div className="section-header-list">
              <div className="section-header-list-item">Projects</div>
            </div>
          </div>
          {isMobile ? (
            <div className="mobile-project-cards">
              {projects.map((project, index) => (
                <div
                  className="mobile-project-card"
                  key={index}
                  ref={projectRefs.current[index]}
                >
                  <img
                    src={project.image}
                    alt={`Project ${index + 1}`}
                    className="mobile-project-image"
                  />
                  <div className="mobile-project-details">
                    <h2>{project.title}</h2>
                    <p>{project.description}</p>
                    <button
                      className="btn-23"
                      onClick={() => window.open(project.link, "_blank")}
                    >
                      <span className="text">Click Me</span>
                      <span aria-hidden="" className="marquee">
                        Project
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="section-container">
              {projects.map((project, index) => (
                <div className="section-col" key={index}>
                  <div className="section-col-media">
                    <img
                      src={project.image}
                      alt={`Project ${index + 1}`}
                      className="sec-col-img"
                    />
                  </div>
                  <div className="sec-col-title">
                    <h2>{project.title}</h2>
                  </div>
                  <button
                    className="btn-23"
                    onClick={() => window.open(project.link, "_blank")}
                  >
                    <span className="text">Click Me</span>
                    <span aria-hidden="" className="marquee">
                      Project
                    </span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProjectSection;

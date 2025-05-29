import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/FreelanceSection.css";

gsap.registerPlugin(ScrollTrigger);

const FreelanceSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const statusBadgeRef = useRef(null);
  const projectCardsRef = useRef([]);
  const ctaSectionRef = useRef(null);
  const techTagsRef = useRef([]);
  const floatingCirclesRef = useRef([]);
  const decorativeDotsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations
      gsap.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3,
      });

      gsap.to(statusBadgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 1,
      });

      // Project cards animation with ScrollTrigger
      projectCardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.2,
          });
        }
      });

      // CTA section animation
      gsap.to(ctaSectionRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Tech tags animation
      techTagsRef.current.forEach((tag, index) => {
        if (tag) {
          gsap.set(tag, { opacity: 0, scale: 0.8 });
          gsap.to(tag, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: tag.closest(".project-card"),
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.1,
          });
        }
      });

      // Parallax effect for floating elements
      floatingCirclesRef.current.forEach((circle, index) => {
        if (circle) {
          gsap.to(circle, {
            y: -30 * (index + 1),
            rotation: 180,
            duration: 8 + index * 2,
            repeat: -1,
            ease: "none",
            yoyo: true,
          });
        }
      });

      // Decorative dots animation
      decorativeDotsRef.current.forEach((dotGroup) => {
        if (dotGroup) {
          gsap.to(dotGroup, {
            rotation: 360,
            duration: 20,
            repeat: -1,
            ease: "none",
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardHover = (card, isEntering) => {
    const number = card.querySelector(".project-number-freelance");
    const title = card.querySelector(".project-title-freelance");

    if (isEntering) {
      gsap.to(number, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(title, {
        x: 10,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(number, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(title, {
        x: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleButtonHover = (btn, isEntering) => {
    gsap.to(btn, {
      scale: isEntering ? 1.05 : 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const projectsData = [
    {
      number: "01",
      title: "Fibrelastic Composites",
      description:
        "A modern website for Fibrelastic Composites, built to showcase the company’s products, innovations, and industry applications. The site emphasizes the brand's core offerings and facilitates easy user navigation. I also managed domain setup, hosting configuration, and implemented basic SEO optimizations to enhance visibility and performance.",
      techStack: [
        "HTML5",
        "CSS3",
        "JAVASCRIPT",
        "SEO",
        "GITHUB",
        "RESPONSIVE DESIGN",
        "STRUCTURED LAYOUT",
      ],
      link: "#",
    },
    {
      number: "02",
      title: "Tour&Travels Website",
      description:
        "Developed and deployed a responsive and well-structured Tour & Travels website using HTML, CSS, and JavaScript. The site offers a user-friendly layout, intuitive navigation, and seamless experience across all devices.I also managed domain setup, hosting configuration, and implemented basic SEO optimizations to enhance visibility and performance.",
      techStack: [
        "HTML5",
        "CSS3",
        "JAVASCRIPT",
        "SEO",
        "GITHUB",
        "RESPONSIVE DESIGN",
        "STRUCTURED LAYOUT",
      ],
      link: "#",
    },
  ];
  return (
    <section ref={sectionRef} className="freelance-section">
      <div className="floating-elements-freelance">
        <div
          ref={(el) => (floatingCirclesRef.current[0] = el)}
          className="floating-circle-freelance circle-1-freelance"
        />
        <div
          ref={(el) => (floatingCirclesRef.current[1] = el)}
          className="floating-circle-freelance circle-2-freelance"
        />
        <div
          ref={(el) => (floatingCirclesRef.current[2] = el)}
          className="floating-circle-freelance circle-3-freelance"
        />

        <div
          ref={(el) => (decorativeDotsRef.current[0] = el)}
          className="decorative-dots-freelance dots-1-freelance"
        >
          <div className="dot-freelance"></div>
          <div className="dot-freelance"></div>
          <div className="dot-freelance"></div>
          <div className="dot-freelance"></div>
          <div className="dot-freelance"></div>
        </div>

        <div
          ref={(el) => (decorativeDotsRef.current[1] = el)}
          className="decorative-dots-freelance dots-2-freelance"
        >
          <div className="dot-freelance"></div>
          <div className="dot-freelance"></div>
          <div className="dot-freelance"></div>
          <div className="dot-freelance"></div>
          <div className="dot-freelance"></div>
        </div>
      </div>

      <div className="container-freelance">
        <div ref={headerRef} className="section-header-freelance">
          <h2 className="section-title-freelance">Freelance Projects</h2>
          <p className="section-subtitle-freelance">
            Crafting exceptional digital experiences for clients worldwide. Each
            project tells a unique story of innovation and creativity.
          </p>
          <div ref={statusBadgeRef} className="status-badge-freelance">
            <div className="status-dot-freelance"></div>
            <span>Available for new projects</span>
          </div>
        </div>

        <div className="projects-grid-freelance">
          {projectsData.map((project, index) => (
            <div
              key={index}
              ref={(el) => (projectCardsRef.current[index] = el)}
              className="project-card-freelance"
              onMouseEnter={(e) => handleCardHover(e.currentTarget, true)}
              onMouseLeave={(e) => handleCardHover(e.currentTarget, false)}
            >
              <div className="project-number-freelance">{project.number}</div>
              <h3 className="project-title-freelance">{project.title}</h3>
              <p className="project-description-freelance">
                {project.description}
              </p>
              <div className="tech-stack-freelance">
                {project.techStack.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    ref={(el) => techTagsRef.current.push(el)}
                    className="tech-tag-freelance"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a href={project.link} className="project-link-freelance">
                View Project →
              </a>
            </div>
          ))}
        </div>

        <div ref={ctaSectionRef} className="cta-section-freelance">
          <h3 className="cta-title-freelance">Ready to Start Your Project?</h3>
          <p className="cta-description-freelance">
            Let's collaborate and create something extraordinary together. I'm
            passionate about bringing your vision to life with cutting-edge
            technology and creative design.
          </p>
          <div className="cta-buttons-freelance">
            <a
              href="#contact"
              className="btn-freelance btn-primary-freelance"
              onMouseEnter={(e) => handleButtonHover(e.currentTarget, true)}
              onMouseLeave={(e) => handleButtonHover(e.currentTarget, false)}
            >
              Start a Project
            </a>
            <a
              href="#portfolio"
              className="btn-freelance btn-secondary-freelance"
              onMouseEnter={(e) => handleButtonHover(e.currentTarget, true)}
              onMouseLeave={(e) => handleButtonHover(e.currentTarget, false)}
            >
              View All Work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreelanceSection;

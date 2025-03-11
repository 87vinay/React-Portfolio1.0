import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "../styles/SkillsSection.css";
import {
  FaHtml5,
  FaCss3Alt,
  FaJava,
  FaPython,
  FaReact,
  FaGithub,
  FaBootstrap,
} from "react-icons/fa";
import { SiJavascript, SiTailwindcss, SiGreensock } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const skillsRef = useRef([]);

  const skills = [
    { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
    { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "GSAP", icon: SiGreensock, color: "#88CE02" },
    { name: "Java", icon: FaJava, color: "#007396" },
    { name: "Python", icon: FaPython, color: "#3776AB" },
    { name: "React", icon: FaReact, color: "#61DAFB" },
    { name: "GitHub", icon: FaGithub, color: "#FFFFFF" },
    { name: "Bootstrap", icon: FaBootstrap, color: "#7952B3" },
    { name: "TailwindCSS", icon: SiTailwindcss, color: "#06B6D4" },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const skillElements = skillsRef.current;
    gsap.fromTo(
      title,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top center+=100",
          toggleActions: "play none none reverse",
        },
      }
    );
    skillElements.forEach((skill, index) => {
      gsap.fromTo(
        skill,
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
          rotateY: -180,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: section,
            start: "top center+=100",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
    const marqueeTimeline = gsap.timeline({
      repeat: -1,
      defaults: { ease: "none" },
    });

    const marqueeItems = document.querySelectorAll(".marquee-group");
    marqueeTimeline.to(marqueeItems, {
      xPercent: -100,
      duration: 20,
      ease: "none",
      repeat: -1,
    });
    const refreshScrollTrigger = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", refreshScrollTrigger);
    return () => {
      marqueeTimeline.kill();
      window.removeEventListener("resize", refreshScrollTrigger);
    };
  }, []);

  return (
    <div className="skills-section" ref={sectionRef}>
      <div className="title-container-skills">
        <h2 ref={titleRef} className="section-title">
          Skills <span className="symb">&</span> Expertise
        </h2>
      </div>
      <div className="skills-grid-container">
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              ref={(el) => (skillsRef.current[index] = el)}
              className="skill-card"
            >
              <skill.icon
                className="skill-icon"
                style={{ color: skill.color }}
              />
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="skills-marquee">
        <div className="marquee-group">
          {[...skills, ...skills].map((skill, index) => (
            <div key={index} className="marquee-item">
              <skill.icon
                className="marquee-icon"
                style={{ color: skill.color }}
              />
              <span className="marquee-text">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SkillsSection;

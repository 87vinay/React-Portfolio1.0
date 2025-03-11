import React, { useEffect, useRef, useState } from "react";
import bioimg from "../assets/images/bioimg.jpg";
import ScrollIndicator from "./ScrollIndicator";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import "../styles/AboutMe.css";

const AboutMe = () => {
  const aboutMeRef = useRef(null);
  const circleRef = useRef(null);
  const bioContainerRef = useRef(null);
  const newBioContainerRef = useRef(null);
  const qaSectionRef = useRef(null);
  const [isBioVisible, setIsBioVisible] = useState(false);
  const [isNewBioVisible, setIsNewBioVisible] = useState(false);
  const [isQASectionVisible, setIsQASectionVisible] = useState(false);
  const [expandedQuestions, setExpandedQuestions] = useState({});

  const qaItems = [
    {
      id: "why-frontend",
      question: "Why did you choose frontend development?",
      answer:
        "I was drawn to frontend development because it's the perfect blend of logic and creativity. I love the immediate visual feedback of my code and the satisfaction of crafting experiences that users directly interact with. There's something magical about transforming design concepts into responsive, interactive interfaces that solve real problems.",
    },
    {
      id: "biggest-challenge",
      question: "What's the biggest challenge you've overcome?",
      answer:
        "Learning to balance perfectionism with productivity was my biggest challenge. I used to get caught in endless optimization loops, but I've learned that shipping something good and iterating is more valuable than pursuing perfection indefinitely. This mindset shift has made me both a better developer and collaborator.",
    },
    {
      id: "work-philosophy",
      question: "What's your work philosophy?",
      answer:
        "I believe in writing maintainable code that solves real problems. I prioritize user experience over flashy features and strive to create interfaces that feel intuitive and responsive. I approach each project with curiosity and empathy, asking 'How will this help the user?' rather than just 'How can I make this work?'",
    },
    {
      id: "inspiration",
      question: "What inspires your designs?",
      answer:
        "My designs are inspired by a combination of minimal aesthetics, nature's organic patterns, and the principle that the best interfaces are those users don't even notice they're using. I'm particularly influenced by thoughtful micro-interactions that create delight and websites that tell stories through scrolling experiences.",
    },
  ];

  const toggleQuestion = (id) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    window.scrollTo(0, 0);

    const handleBioScroll = () => {
      if (bioContainerRef.current) {
        const rect = bioContainerRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          setIsBioVisible(true);
          window.removeEventListener("scroll", handleBioScroll);
        }
      }
    };

    const handleNewBioScroll = () => {
      if (newBioContainerRef.current) {
        const rect = newBioContainerRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          setIsNewBioVisible(true);
          window.removeEventListener("scroll", handleNewBioScroll);
        }
      }
    };

    const handleQASectionScroll = () => {
      if (qaSectionRef.current) {
        const rect = qaSectionRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          setIsQASectionVisible(true);
          window.removeEventListener("scroll", handleQASectionScroll);
        }
      }
    };

    window.addEventListener("scroll", handleBioScroll);
    window.addEventListener("scroll", handleNewBioScroll);
    window.addEventListener("scroll", handleQASectionScroll);

    const titleElement = aboutMeRef.current;
    if (titleElement) {
      titleElement.style.opacity = 0;
      setTimeout(() => {
        titleElement.style.transition = "opacity 1s ease";
        titleElement.style.opacity = 1;
      }, 300);
    }

    const circleElement = circleRef.current;
    if (circleElement) {
      circleElement.style.transform = "scale(0)";
      setTimeout(() => {
        circleElement.style.transition =
          "transform 1.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        circleElement.style.transform = "scale(1)";
      }, 600);
    }

    return () => {
      window.removeEventListener("scroll", handleBioScroll);
      window.removeEventListener("scroll", handleNewBioScroll);
      window.removeEventListener("scroll", handleQASectionScroll);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="me-container">
      <ScrollIndicator />
      <div className="me-header">
        <h1 className="name">Vinay Sharma</h1>
      </div>
      <div className="circle" ref={circleRef}></div>
      <h2 className="myself-title" ref={aboutMeRef}>
        <span>ABOUT</span> <span>MYSELF</span>
      </h2>
      <div
        className={`bio-container ${isBioVisible ? "visible" : ""}`}
        ref={bioContainerRef}
      >
        <div className="bio-text">
          <p>
            Frontend developer skilled in{" "}
            <span className="td">ReactJS, animations</span>, and{" "}
            <span className="td">UI/UX</span> design. Experienced in integrating{" "}
            <span className="td"> APIs</span>, optimizing performance, and
            creating modern,{" "}
            <span className="td">interactive web applications</span>. Turning
            ideas into pixel-perfect, interactive experiences!
          </p>
        </div>
        <div className="bio-image">
          <img src={bioimg} alt="Vinay Sharma" />
        </div>
      </div>
      <div className="expanded-bio-container" ref={newBioContainerRef}>
        <div className="bio-circle-container">
          <div
            className={`bio-circle ${isNewBioVisible ? "visible" : ""}`}
          ></div>
        </div>
        <div
          className={`bio-text-expanded ${isNewBioVisible ? "visible" : ""}`}
        >
          <p>
            I completed my B.Tech in{" "}
            <span className="td">Computer Science and Engineering</span> from RD
            Engineering College, where I discovered my passion for building
            websites. During my college years, I enjoyed experimenting with
            different web technologies, turning creative ideas into functional
            and interactive designs.
          </p>
          <p>
            Over time, I honed my skills in{" "}
            <span className="td">
              ReactJS, state management, API integration, and performance
              optimization
            </span>
            , building projects that reflect my love for modern, engaging user
            experiences.
          </p>
          <p>
            Now, I am actively looking for opportunities to join a company where
            I can contribute my skills, learn from industry experts, and grow as
            a <span className="td">Frontend Developer.</span>
          </p>
        </div>
      </div>
      <div
        className={`qa-section ${isQASectionVisible ? "visible" : ""}`}
        ref={qaSectionRef}
      >
        <h3 className="qa-title">Get to know me better</h3>
        <div className="qa-container">
          {qaItems.map((item) => (
            <div className="qa-item" key={item.id}>
              <div
                className={`question ${
                  expandedQuestions[item.id] ? "active" : ""
                }`}
                onClick={() => toggleQuestion(item.id)}
              >
                <h4>{item.question}</h4>
                <span className="toggle-icon">
                  {expandedQuestions[item.id] ? "−" : "+"}
                </span>
              </div>
              <div
                className={`answer ${
                  expandedQuestions[item.id] ? "expanded" : ""
                }`}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutMe;

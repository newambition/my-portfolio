import React, { useState } from 'react';
import ScrollAnimatedCard from './ScrollAnimatedCard';
import ProjectModal from './ProjectModal'; // ProjectModal is now themed
import { AnimatePresence } from 'framer-motion';

const projects = [
    // Your project data here... (assuming structure is unchanged)
  {
    title: "Python Scientific Calculator",
    description: "A simple GUI calculator built with Python handling complex scientific expressions.",
    technologies: ["Python", "Tkinter"],
    githubLink: "#", // Replace
    demoLink: "#", // Replace
    detailedOverview: "This project involved building a graphical user interface using Tkinter...",
    skillsAcquired: ["GUI Development (Tkinter)", "Expression Parsing",],
    images: ["https://via.placeholder.com/800x600?text=Calculator+Screenshot+1",],
  },
   {
    title: "Weather Data Desktop App",
    description: "Python desktop app fetching and visualizing weather data patterns over time.",
    technologies: ["Python", "PyQt6", "API Integration", "Data Visualization (Matplotlib)"],
    githubLink: "#", // Replace
    demoLink: "#", // Replace
    detailedOverview: "Developed a desktop application using PyQt6 to interact with weather APIs...",
    skillsAcquired: ["PyQt6 Framework", "API Consumption",],
    images: ["https://via.placeholder.com/800x600?text=Weather+App+UI",],
  },
    {
    title: "Desktop App Prompt Library",
    description: "A personal desktop library for storing and retrieving AI prompts or code snippets.",
    technologies: ["Python", "PyQt6", "Database (SQLite)"],
    githubLink: "#", // Replace
    demoLink: "#", // Replace
    detailedOverview: "A utility application built with PyQt6 allowing users to save...",
    skillsAcquired: ["Desktop App Development", "Database Management (SQLite)",],
    images: ["https://via.placeholder.com/800x600?text=Prompt+Library+Main",],
  },
  {
    title: "AI Rhetoric Analyst Webapp",
    description: "Web app using NLP/ML to analyze text for persuasive techniques and harmful rhetoric.",
    technologies: ["Python", "Flask", "React", "NLP (SpaCy)", "Machine Learning (Scikit-learn)"],
    githubLink: "#", // Replace
    demoLink: "#", // Replace
    detailedOverview: "This web application features a Python/Flask backend providing an API...",
    skillsAcquired: ["Full-Stack Development", "REST API Design (Flask)",],
    images: ["https://via.placeholder.com/800x600?text=Rhetoric+App+Input",],
  }
];


const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="container mx-auto px-4 relative">
      {/* section-title class handles its own theming */}
      <h2 className="section-title">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        {projects.map((project, index) => (
          <ScrollAnimatedCard key={project.title + index}>
            {/* Card container - Updated bg, border */}
            <div
                className="bg-card-bg h-full p-8 rounded-xl border border-border-color group flex flex-col card-hover"
            >
              {/* Card content - Updated text colors */}
              <h3 className="text-2xl font-semibold mb-4 text-text-primary">{project.title}</h3>
              <p className="text-text-secondary mb-5 flex-grow text-base leading-relaxed">{project.description}</p>

              <div className="mb-6">
                {/* Updated text colors */}
                <span className="font-semibold text-text-primary text-sm">Technologies:</span>
                <p className="text-sm italic text-text-muted mt-1">{project.technologies.join(", ")}</p>
              </div>

              {/* Footer section - Updated border, button styles */}
              <div className="mt-auto pt-6 border-t border-border-color/30">
                 <button
                    onClick={() => openModal(project)}
                     // Updated button styles: bg, text, hover, focus
                    className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-semibold rounded-md text-bg-main bg-interactive hover:bg-interactive/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card-bg focus:ring-interactive transition duration-300"
                    aria-label={`View details for ${project.title}`}
                 >
                    View Details
                 </button>
              </div>
            </div>
          </ScrollAnimatedCard>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={closeModal} />
        )}
      </AnimatePresence>

    </div>
  );
};

export default Projects;
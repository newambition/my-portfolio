import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiGithub, FiExternalLink } from 'react-icons/fi';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 25, duration: 0.4 }
  },
  exit: { opacity: 0, scale: 0.9, y: 50, transition: { duration: 0.3 } }
};


const ProjectModal = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const imagesLength = project?.images?.length ?? 0;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight' && imagesLength > 1) {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesLength);
      } else if (event.key === 'ArrowLeft' && imagesLength > 1) {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imagesLength) % imagesLength);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, project?.images?.length]);


  if (!project) return null;

  const images = project.images || [];
  const nextImage = () => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);

  return (
    // Updated backdrop color (semi-transparent black usually fine for both themes)
    <motion.div
      className="fixed inset-0 z-[60] backdrop-blur-sm flex items-center justify-center p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      {/* Modal Content - Updated bg, border */}
      <motion.div
        className="bg-section-bg-2 rounded-xl border border-color-interactive w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col hide-scrollbar"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Updated bg, border, title text, close button */}
        <div className="flex justify-between items-center p-6 border-b border-border-color/30 sticky top-0 z-10" style={{ background: '#1F1F1F' }}>
          <h2 className="text-2xl font-semibold text-text-primary">{project.title}</h2>
          <button
            onClick={onClose}
            aria-label="Close project details"
            className="text-text-muted hover:text-interactive transition-colors duration-300"
          >
            <FiX className="w-7 h-7" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 flex-grow">
          {/* Image Carousel Section */}
          {images.length > 0 && (
            <div className="mb-8 relative group">
               <AnimatePresence initial={false} mode="wait">
                 <motion.img
                    key={currentImageIndex}
                    src={images[currentImageIndex]}
                    alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                     // Updated image background color
                    className="w-full h-auto max-h-[50vh] object-contain rounded-lg mx-auto block bg-bg-main"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                 />
               </AnimatePresence>
              {images.length > 1 && (
                <>
                   {/* Buttons use black background for contrast, text-white */}
                  <button onClick={prevImage} aria-label="Previous image" className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 z-10">
                    <FiChevronLeft className="w-6 h-6" />
                  </button>
                  <button onClick={nextImage} aria-label="Next image" className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 z-10">
                    <FiChevronRight className="w-6 h-6" />
                  </button>
                   {/* Indicator uses black background */}
                   <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded z-10">
                        {currentImageIndex + 1} / {images.length}
                   </div>
                </>
              )}
            </div>
          )}

          {/* Details Sections - Updated heading and text colors */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Overview</h3>
              <p className="text-text-secondary leading-relaxed">{project.detailedOverview || project.description}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Technologies Used</h3>
              <ul className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                   // Updated tech tag styles: bg, text
                  <li key={index} className="bg-border-color/50 text-text-secondary text-sm px-3 py-1 rounded-full">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
            {project.skillsAcquired && project.skillsAcquired.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">Skills Acquired</h3>
                 {/* Updated list text color */}
                 <ul className="list-disc list-inside space-y-1 text-text-secondary">
                   {project.skillsAcquired.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                 </ul>
              </div>
            )}
          </div>
        </div>

         {/* Footer with Links - Updated bg, border, button styles */}
         <div className="flex justify-end items-center gap-4 p-6 border-t border-border-color/30 sticky bottom-0 bg-card-bg z-10">
            {project.githubLink && project.githubLink !== "#" && (
                 // Updated link button styles: bg, text, hover
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm bg-border-color/50 hover:bg-border-color/80 text-text-secondary hover:text-text-primary px-4 py-2 rounded-md transition-colors duration-300">
                  <FiGithub className="w-4 h-4" /> GitHub
                </a>
              )}
               {project.demoLink && project.demoLink !== "#" && (
                 // Updated link button styles: bg, text, hover
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm bg-border-color/50 hover:bg-border-color/80 text-text-secondary hover:text-text-primary px-4 py-2 rounded-md transition-colors duration-300">
                 <FiExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
         </div>

      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
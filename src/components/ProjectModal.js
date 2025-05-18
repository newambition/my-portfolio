import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiGithub, FiExternalLink } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

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

// Define custom components to style Markdown output with Tailwind classes
const markdownComponents = {
    // Explicitly use children for headings to satisfy eslint rule
    h1: ({node, children, ...props}) => <h2 className="text-3xl font-semibold text-text-primary mt-6 mb-4 border-b border-border-color/30 pb-2" {...props}>{children}</h2>,
    h2: ({node, children, ...props}) => <h3 className="text-2xl font-semibold text-text-primary mt-5 mb-3" {...props}>{children}</h3>,
    h3: ({node, children, ...props}) => <h4 className="text-xl font-semibold text-text-primary mt-4 mb-2" {...props}>{children}</h4>,
    p: ({node, ...props}) => <p className="text-text-secondary leading-relaxed mb-4" {...props} />,
    ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-1 text-text-secondary mb-4 pl-4" {...props} />,
    ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-1 text-text-secondary mb-4 pl-4" {...props} />,
    li: ({node, ...props}) => <li className="mb-1" {...props} />,
    strong: ({node, ...props}) => <strong className="font-semibold text-text-primary" {...props} />,
    em: ({node, ...props}) => <em className="italic text-text-muted" {...props} />,
    // Styling for code blocks and inline code
    code: ({node, inline, className, children, ...props}) => {
        const match = /language-(\w+)/.exec(className || '')
        // Inline code
        if (inline) {
            return (
                <code
                    className="bg-terminal-bg text-white px-1 rounded text-sm font-mono"
                    {...props}
                >
                    {children}
                </code>
            );
        }
        // Code block
        return (
            <pre className="bg-zinc-700 p-4 rounded-md border border-border-color overflow-x-auto mb-4">
                <code className={`language-${match ? match[1] : ''} text-white font-mono text-sm`} {...props}>
                    {children}
                </code>
            </pre>
        );
    },
    // Add more components as needed (e.g., table, blockquote, img)
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
    <motion.div
      className="fixed inset-0 z-[60] backdrop-blur-sm flex items-center justify-center p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <motion.div
        className="bg-section-bg-2 rounded-xl border border-color-interactive w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col hide-scrollbar"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-border-color/30 sticky top-0 z-10" style={{ background: 'rgb(var(--color-section-bg-2-rgb))' }}>
          <h2 className="text-2xl font-semibold text-text-primary">{project.title}</h2>
          <button
            onClick={onClose}
            aria-label="Close project details"
            className="text-text-muted hover:text-interactive transition-colors duration-300"
          >
            <FiX className="w-7 h-7" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 flex-grow">
          {/* Image Carousel Section */}
          {images.length > 0 && (
            <div className="mb-8 relative group">
               <AnimatePresence initial={false} mode="wait">
                 <motion.img
                    key={currentImageIndex}
                    src={images[currentImageIndex]}
                    alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                    className="w-full h-auto max-h-[50vh] object-contain rounded-lg mx-auto block bg-bg-main"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                 />
               </AnimatePresence>
              {images.length > 1 && (
                <>
                  <button onClick={prevImage} aria-label="Previous image" className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 z-10">
                    <FiChevronLeft className="w-6 h-6" />
                  </button>
                  <button onClick={nextImage} aria-label="Next image" className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 z-10">
                    <FiChevronRight className="w-6 h-6" />
                  </button>
                   <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded z-10">
                        {currentImageIndex + 1} / {images.length}
                   </div>
                </>
              )}
            </div>
          )}

          {/* Render the full description using ReactMarkdown */}
          {project.fullDescriptionMarkdown && (
              <ReactMarkdown
                  components={markdownComponents} // Apply custom components for styling
                  remarkPlugins={[remarkGfm]} // Enable GitHub Flavored Markdown
                  rehypePlugins={[rehypeRaw]} // Enable raw HTML rendering (use with caution)
              >
                  {project.fullDescriptionMarkdown}
              </ReactMarkdown>
          )}

           {/* Technologies Used Section - Keeping this separate for consistent look */}
            <div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Technologies Used</h3>
              <ul className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <li key={index} className="bg-border-color/50 text-text-secondary text-sm px-3 py-1 rounded-full">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>


        </div>

        {/* Footer with Links */}
         <div className="flex justify-end items-center gap-4 p-6 border-t border-border-color/30 sticky bottom-0 bg-card-bg z-10">
            {project.githubLink && project.githubLink !== "#" && (
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm bg-border-color/50 hover:bg-border-color/80 text-text-secondary hover:text-primary px-4 py-2 rounded-md transition-colors duration-300">
                  <FiGithub className="w-4 h-4" /> GitHub
                </a>
              )}
               {project.demoLink && project.demoLink !== "#" && (
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm bg-border-color/50 hover:bg-border-color/80 text-text-secondary hover:text-primary px-4 py-2 rounded-md transition-colors duration-300">
                 <FiExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
         </div>

      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
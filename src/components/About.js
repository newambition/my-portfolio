import React from 'react';
import { motion } from 'framer-motion';
import ScrollAnimatedCard from './ScrollAnimatedCard';
import { SiPython, SiOpenai } from 'react-icons/si';
import { RiCodeSSlashLine, RiLightbulbLine } from 'react-icons/ri';

const skills = [
  {
    category: "Python Development",
    description: "Building efficient, scalable solutions",
    // Updated icon color and hover state
    icon: <SiPython className="w-10 h-10 mb-5 text-text-muted group-hover:text-interactive-accent transition-colors duration-300" />
  },
  {
    category: "AI & Machine Learning",
    description: "Exploring neural networks and data analysis",
    // Updated icon color and hover state
    icon: <SiOpenai className="w-10 h-10 mb-5 text-text-muted group-hover:text-interactive-accent transition-colors duration-300" />
  },
  {
    category: "IT Support",
    description: "Troubleshooting and maintaining systems",
    // Updated icon color and hover state
    icon: <RiCodeSSlashLine className="w-10 h-10 mb-5 text-text-muted group-hover:text-interactive-accent transition-colors duration-300" />
  },
  {
    category: "Problem Solving",
    description: "Finding creative, practical solutions",
    // Updated icon color and hover state
    icon: <RiLightbulbLine className="w-10 h-10 mb-5 text-text-muted group-hover:text-interactive-accent transition-colors duration-300" />
  }
];

const About = () => {
  return (
    <div className="container mx-auto px-4">
      {/* section-title class handles its own theming */}
      <h2 className="section-title">About Me</h2>

      <motion.div
         className="max-w-3xl mx-auto mb-20 md:mb-32 text-center"
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         viewport={{ once: true, amount: 0.3 }}
         transition={{ duration: 0.8, delay: 0.1 }}
      >
          {/* Updated text colors */}
          <p className="text-xl md:text-2xl font-body leading-relaxed mb-8 text-text-primary">
            I'm a self-taught Python developer interested in AI, Data & Web development, with a knack for fresh approaches.
          </p>
          <p className="text-lg md:text-xl mb-8 font-body leading-relaxed text-text-secondary">
           My learning journey taught me to question assumptions, experiment boldly, and build practical solutions independently.
          </p>
          <p className="text-lg md:text-xl mb-12 font-body leading-relaxed text-text-secondary">
           I'm seeking to contribute my adaptability while growing with experienced mentors.
          </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          {skills.map((skill, index) => (
            <ScrollAnimatedCard key={index}>
               {/* Updated card background, border, heading, and text colors */}
              
              <div className="bg-card-bg h-full p-8 rounded-xl border border-border-color card-hover group flex flex-col items-start">
                {skill.icon} {/* Icon color handled within the skill object */}
                <h3 className="font-heading font-semibold text-2xl mb-3 text-text-primary">{skill.category}</h3>
                <p className="text-text-muted text-base">{skill.description}</p>
              </div>
            </ScrollAnimatedCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About
import React from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiGithub, FiLinkedin } from 'react-icons/fi';
import { HiOutlineMail } from 'react-icons/hi'; // Using a different mail icon
import { useForm, ValidationError } from '@formspree/react';

const blockVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      duration: 0.7
    }
  }
};

const Contact = () => {
  const [state, handleSubmit] = useForm("mgvkagdw"); // Your Formspree form ID

  return (
    <div className="container mx-auto px-4">
       {/* section-title class handles its own theming */}
      <h2 className="section-title">Get In Touch</h2>

      <div className="max-w-xl lg:max-w-2xl mx-auto">

        <motion.div
          variants={blockVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {state.succeeded ? (
            <p className="text-green-500 text-center text-lg font-semibold py-8">Thank you for your message!</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="block w-full px-4 py-3 rounded-md bg-card-bg border border-border-color focus:ring-1 focus:ring-interactive focus:border-interactive outline-none transition duration-300 text-text-primary placeholder-text-muted/60"
                  placeholder="John Doe"
                />
                <ValidationError prefix="Name" field="name" errors={state.errors} />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="block w-full px-4 py-3 rounded-md bg-card-bg border border-border-color focus:ring-1 focus:ring-interactive focus:border-interactive outline-none transition duration-300 text-text-primary placeholder-text-muted/60"
                  placeholder="john.doe@example.com"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  className="block w-full px-4 py-3 rounded-md bg-card-bg border border-border-color focus:ring-1 focus:ring-interactive focus:border-interactive outline-none transition duration-300 text-text-primary placeholder-text-muted/60"
                  placeholder="Your message here..."
                ></textarea>
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-base font-semibold rounded-md text-bg-main bg-interactive hover:bg-interactive/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-main focus:ring-interactive transition duration-300"
                >
                  {state.submitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Updated divider color */}
        <div className="my-16 md:my-20 h-px bg-border-color/30 w-1/2 mx-auto"></div>

        <motion.div
          className="text-center"
          variants={blockVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
           {/* Updated text color */}
           <p className="text-lg text-text-secondary leading-relaxed mb-8">
             Alternatively, find me here:
           </p>

          <div className="space-y-5 mb-10 flex flex-col items-center">
            <div className="flex items-center space-x-3">
               {/* Updated icon color */}
              <FiMapPin className="w-5 h-5 text-text-muted flex-shrink-0" />
               {/* Updated text color */}
              <span className="text-text-primary">Poole Dorset, UK</span>
            </div>
            <div className="flex items-center space-x-3">
               {/* Updated icon color */}
              <FiPhone className="w-5 h-5 text-text-muted flex-shrink-0" />
               {/* Updated link colors */}
              <a href="tel:+447955277795" className="text-text-primary hover:text-interactive transition-colors duration-300">
                07955 277795
              </a>
            </div>
             <div className="flex items-center space-x-3">
                  {/* Updated icon color */}
                 <HiOutlineMail className="w-5 h-5 text-text-muted flex-shrink-0" />
               {/* Updated link colors */}
              <a href="mailto:tomdgreen33@gmail.com" className="text-text-primary hover:text-interactive transition-colors duration-300">
                tomdgreen33@gmail.com
              </a>
            </div>
          </div>

           {/* Updated text color */}
           <p className="text-sm font-medium text-text-secondary mb-4">Connect with me:</p>
           <div className="flex justify-center space-x-6">
             {/* Updated icon link colors */}
             <a
               href="https://github.com/yourusername"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="GitHub Profile"
               className="text-text-muted hover:text-interactive transition-colors duration-300"
             >
               <FiGithub className="w-7 h-7" />
             </a>
             <a
               href="https://linkedin.com/in/tomgreen33"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="LinkedIn Profile"
               className="text-text-muted hover:text-interactive transition-colors duration-300"
             >
               <FiLinkedin className="w-7 h-7" />
             </a>
           </div>

        </motion.div>

      </div>
    </div>
  );
};

export default Contact;
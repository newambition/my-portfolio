import React, { useState, useEffect, useRef } from 'react';
import './TinyTerminal.css'; // Import the CSS for styling

// Simple text-based cowsay
const cowsay = (message) => {
  const cow = `
         \\   ^__^
          \\  (oo)\\_______
             (__)\\       )\\/\\
                 ||----w |
                 ||     ||
  `;
  // Basic bubble formatting
  const topBorder = ` ${'_'.repeat(message.length + 2)} `;
  const bottomBorder = ` ${'-'.repeat(message.length + 2)} `;
  const middle = `< ${message} >`;

  return `${topBorder}\n${middle}\n${bottomBorder}${cow}`;
};


const TinyTerminal = ({ isVisible, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome to Tiny Terminal! Type "help" for commands.' }
  ]);
  const inputRef = useRef(null);
  const historyEndRef = useRef(null);

  // Focus input when terminal becomes visible
  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVisible]);

  // Scroll to bottom when history changes
  useEffect(() => {
    if (historyEndRef.current) {
        historyEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
   }, [history]);


  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

   const processCommand = (command) => {
    const lowerCaseCommand = command.toLowerCase().trim();
    let outputText = '';
    let clearTerminal = false;
    let closeTerminal = false;
    let isCommandValid = true; // Flag to track if the command is recognized

    if (lowerCaseCommand === 'help') {
      outputText = `Available commands:
       help        : Show this help message
       skills      : List key technical skills
       contact     : Show contact information
       projects    : List project titles
       whoami      : Not you, me.  
       cowsay <msg>: Make cow go moo.
       clear       : Clear the terminal output
       exit / close: Close the terminal`;
    } else if (lowerCaseCommand === 'skills') {
      // Fetch skills dynamically or use hardcoded list
      outputText = `Skills:
      - Python
      - React
      - AI/ML
      - PyQt6
      - Flask
      - Tkinter
      - SQLite
      - TailwindCSS
      - HTML/CSS
      - Git`;
    } else if (lowerCaseCommand === 'contact') {
      // Replace with actual details
      outputText = `Email: tomdgreen33@gmail.com
      LinkedIn: https://linkedin.com/in/tomgreen33`;
    } else if (lowerCaseCommand === 'projects') {
      // Ideally, fetch this from a data source used by Projects.js
       outputText = `Projects:
      - Python Scientific Calculator
      - Weather Data Desktop App
      - Desktop App Prompt Library
      - AI Rhetoric Analyst Webapp`;
    } else if (lowerCaseCommand === 'konami') {
      outputText = "Use the Konami code to activate secret mode...";
    } else if (lowerCaseCommand === 'whoami') {
        outputText = "Tom Green, founder, creator, visionary of Tiny Terminal.";
    } else if (lowerCaseCommand.startsWith('cowsay ')) {
        const message = command.substring(8).trim(); // Get the message part
        if (message) {
          outputText = cowsay(message);
        } else {
          outputText = "Usage: cowsay <your message>";
        }
     } else if (lowerCaseCommand === 'clear') {
      clearTerminal = true;
    } else if (lowerCaseCommand === 'exit' || lowerCaseCommand === 'close') {
      closeTerminal = true;
    } else {
        // Only show 'command not found' if input wasn't empty
        if (command.trim() !== '') {
             outputText = `Command not found: ${command}`;
           }
       isCommandValid = false; // Mark as invalid/unrecognized
  }

    // Add command and output to history only if it was a valid command or non-empty invalid input
    if (isCommandValid || command.trim() !== '') {
        const newHistory = clearTerminal
          ? []
          : [...history, { type: 'input', text: command }];

        if (outputText) {
          // Split multiline output for better display
          const outputLines = outputText.split('\n');
          outputLines.forEach(line => newHistory.push({ type: 'output', text: line }));
        }
        setHistory(newHistory);
    }


    if (closeTerminal) {
      onClose();
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      processCommand(input);
    } else {
        // Add empty line output for visual spacing if user just hits enter
        setHistory([...history, { type: 'output', text: '' }]);
    }
    setInput(''); // Clear input after submit
  };

  // Handle clicks outside the terminal to close it
  const terminalRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (terminalRef.current && !terminalRef.current.contains(event.target)) {
         // Check if the click was on the toggle button itself (identified by an attribute)
         if (!event.target.closest('[data-terminal-toggle]')) {
            onClose();
         }
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onClose]);


  if (!isVisible) {
    return null; // Don't render if not visible
  }

  return (
    <div ref={terminalRef} className="tiny-terminal-overlay" onClick={() => inputRef.current?.focus()}>
      <div className="tiny-terminal-output">
        {history.map((item, index) => (
          <div key={index} className={`terminal-line ${item.type}`}>
            {item.type === 'input' && <span className="terminal-prompt">tom@portfolio:~$</span>}
            {/* Use pre-wrap to preserve whitespace, important for cowsay */}
            <span style={{ whiteSpace: 'pre-wrap' }}>{item.text}</span>
          </div>
        ))}
         {/* Invisible element to scroll to */}
         <div ref={historyEndRef} />
      </div>
      <form onSubmit={handleFormSubmit} className="tiny-terminal-input-form">
        <span className="terminal-prompt">tom@portfolio:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          className="tiny-terminal-input"
          autoComplete="off"
          spellCheck="false"
          aria-label="Terminal command input"
        />
      </form>
    </div>
  );
};

export default TinyTerminal;
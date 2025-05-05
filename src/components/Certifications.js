import React from 'react';
import ScrollAnimatedCard from './ScrollAnimatedCard';

const certifications = [
  {
    name: "Google IT Support Professional Certificate",
    issuingOrganization: "Google",
    credentialURL: "#", // Replace with the actual URL
    imageUrl: "https://via.placeholder.com/600x400?text=IT+Support+Cert"
  },
  {
    name: "Google Project Management Professional Certificate",
    issuingOrganization: "Google",
    credentialURL: "#", // Replace with the actual URL
    imageUrl: "https://via.placeholder.com/600x400?text=Project+Mgmt+Cert"
  }
];

const Certifications = () => {
  return (
    <div className="container mx-auto px-4">
       {/* section-title class handles its own theming */}
      <h2 className="section-title">Certifications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        {certifications.map((cert, index) => (
          <ScrollAnimatedCard key={index}>
             {/* Updated card background, border, heading, text, and link button styles */}
            <div className="bg-card-bg h-full p-8 rounded-xl border border-border-color card-hover group flex flex-col">
              {/* <img src={cert.imageUrl} alt={cert.name} className="mb-6 rounded-md" /> */}
              <h3 className="text-2xl font-semibold mb-3 text-text-primary">{cert.name}</h3>
              <p className="text-lg italic mb-6 text-text-muted">{cert.issuingOrganization}</p>
              <div className="mt-auto pt-6 border-t border-border-color/30"> {/* Border with opacity */}
                <a
                  href={cert.credentialURL}
                  target="_blank"
                  rel="noopener noreferrer"
                   // Updated button styles: bg, text, hover bg
                  className="inline-block text-sm bg-interactive hover:bg-interactive/80 text-bg-main px-6 py-3 rounded-md font-semibold transition-colors duration-300"
                >
                  View Credential
                </a>
              </div>
            </div>
          </ScrollAnimatedCard>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
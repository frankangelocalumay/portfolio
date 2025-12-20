import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const experience = [
    {
      company: "Allied Care Experts Medical Center Valenzuela",
      position: "OJT / IT Intern",
      period: "July 2025 - December 2025",
      description: "Completed an on-the-job training internship in a hospital environment, assisting in IT support, system-based record verification, hardware maintenance, and administrative data processing to support daily hospital operations.",
      activities: [
        {
          category: "IT Support",
          photos: [
            { 
              src: process.env.PUBLIC_URL + "/images/experience/it-support-1.jpg", 
              caption: "Tagging and inventory of computer peripherals per department using hospital records" 
            },
            { 
              src: process.env.PUBLIC_URL + "/images/experience/it-support-2.jpg", 
              caption: "Responding to department requests for printer repair, ink refill, and basic PC troubleshooting" 
            }
          ]
        },
        {
          category: "Data Encoding & System Verification",
          photos: [
            { 
              src: process.env.PUBLIC_URL + "/images/experience/data-encoding-1.jpg", 
              caption: "Verifying PhilHealth claims and encoding records using PhilHealth Information System and spreadsheets" 
            },
            { 
              src: process.env.PUBLIC_URL + "/images/experience/data-encoding-2.jpg", 
              caption: "Manual encoding of PhilHealth data when records are missing from the system database" 
            }
          ]
        },
        {
          category: "Hardware & Network Maintenance",
          photos: [
            { 
              src: process.env.PUBLIC_URL + "/images/experience/hardware-1.jpg", 
              caption: "Printer maintenance including ink refilling, cleaning, and functionality testing" 
            },
            { 
              src: process.env.PUBLIC_URL + "/images/experience/hardware-2.jpg", 
              caption: "LAN cable testing, re-crimping, and basic network cable organization" 
            }
          ]
        }
      ],
      technologies: [
        "Hospital Information System (HIS)",
        "PhilHealth Information System",
        "Microsoft Excel / Spreadsheets",
        "Printer & Peripheral Hardware",
        "LAN Cabling Tools"
      ]
    }
  ];
  

  return (
    <section id="experience" className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full"
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#F2F4CB] text-5xl font-light mb-12"
        >
          my <span className="font-bold">experience</span>
        </motion.h2>

        {experience.map((exp, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 * index }}
            className="bg-[#110B11]/50 rounded-xl p-6 mb-12 border border-[#B7990D]/20"
          >
            {/* Company and Position Header */}
            <div className="mb-6">
              <h3 className="text-[#F2F4CB] text-2xl font-bold mb-2">{exp.company}</h3>
              <p className="text-[#B7990D] text-lg font-semibold mb-1">{exp.position}</p>
              <p className="text-gray-400 text-sm">{exp.period}</p>
            </div>

            {/* Description */}
            <p className="text-gray-400 mb-8">{exp.description}</p>

            {/* Activities with Photo Gallery */}
            <div className="space-y-8">
              {exp.activities.map((activity, actIndex) => (
                <motion.div
                  key={actIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * actIndex }}
                  className="bg-[#110B11]/30 rounded-lg p-6 border border-[#B7990D]/10"
                >
                  <h4 className="text-[#F2F4CB] text-xl font-semibold mb-4">
                    {activity.category}
                  </h4>
                  
                  {/* Photo Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {activity.photos.map((photo, photoIndex) => (
                      <motion.div
                        key={photoIndex}
                        className="group relative overflow-hidden rounded-lg border-2 border-[#B7990D]/20 cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setSelectedImage(photo)}
                      >
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={photo.src}
                            alt={photo.caption}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            onError={(e) => {
                              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23110B11" width="400" height="400"/%3E%3Ctext fill="%23B7990D" font-family="Arial" font-size="18" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage Placeholder%3C/text%3E%3C/svg%3E';
                            }}
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#110B11]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-3">
                            <p className="text-[#F2F4CB] text-sm font-medium">{photo.caption}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Technologies Used */}
            {exp.technologies && exp.technologies.length > 0 && (
              <div className="mt-8">
                <h4 className="text-[#F2F4CB] text-lg font-semibold mb-3">Technologies & Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <div
                      key={techIndex}
                      className="bg-[#B7990D]/10 border border-[#B7990D]/20 rounded-full px-3 py-1"
                    >
                      <span className="text-[#F2F4CB] text-sm">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Image Modal/Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#110B11]/95 p-4 sm:p-6"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="relative w-full max-w-5xl max-h-[95vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-2 -right-2 sm:top-4 sm:right-4 bg-[#B7990D] text-[#110B11] rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:bg-[#B7990D]/90 transition-colors z-10 shadow-lg"
              aria-label="Close"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image Container */}
            <div className="w-full flex-1 flex items-center justify-center mb-4 overflow-hidden">
              <img
                src={selectedImage.src}
                alt={selectedImage.caption}
                className="max-w-full max-h-[75vh] sm:max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Caption */}
            <div className="w-full bg-[#110B11]/80 rounded-lg p-4 sm:p-6 border border-[#B7990D]/20">
              <p className="text-[#F2F4CB] text-center text-sm sm:text-base md:text-lg leading-relaxed">
                {selectedImage.caption}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Experience;


import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const experience = [
    {
      company: "Company Name",
      position: "OJT / Intern Position",
      period: "Start Date - End Date",
      description: "Brief description of the internship experience and responsibilities.",
      activities: [
        {
          category: "IT Support",
          photos: [
            { 
              src: process.env.PUBLIC_URL + "/images/experience/it-support-1.jpg", 
              caption: "IT Support activity description" 
            }
          ]
        },
        {
          category: "Data Encoding",
          photos: [
            { 
              src: process.env.PUBLIC_URL + "/images/experience/data-encoding-1.jpg", 
              caption: "Data encoding task description" 
            }
          ]
        },
        {
          category: "Hardware Debugging",
          photos: [
            { 
              src: process.env.PUBLIC_URL + "/images/experience/hardware-1.jpg", 
              caption: "Printer troubleshooting" 
            },
            { 
              src: process.env.PUBLIC_URL + "/images/experience/hardware-2.jpg", 
              caption: "PC problem diagnosis" 
            }
          ]
        }
      ],
      technologies: ["Technology 1", "Technology 2"]
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#110B11]/95 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="relative max-w-4xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.caption}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <p className="text-[#F2F4CB] text-center mt-4 text-lg">{selectedImage.caption}</p>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-[#B7990D] text-[#110B11] rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#B7990D]/90 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Experience;


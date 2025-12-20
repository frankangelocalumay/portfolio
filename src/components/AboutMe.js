import { motion } from 'framer-motion';

const AboutMe = () => {
  return (
    <section id="about" className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full"
      >
        {/* About Me Content */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 mb-16">
          {/* Content */}
          <div className="flex-1">
            <h2 className="text-[#F2F4CB] text-5xl font-light mb-8">
              about <span className="font-bold">me</span>
            </h2>
            
            <div className="text-gray-400 space-y-6">
              <p className="text-lg">
                Hi there, I'm Frank Calumay. I'm an IT student with hands-on experience from my internship 
                at Allied Care Experts Medical Center Valenzuela, where I worked as IT Support and Data Encoder. 
                During my internship, I handled technical troubleshooting, assisted with hardware and software issues, 
                and managed data encoding tasks. This experience gave me practical skills in problem-solving and 
                maintaining smooth operations in a professional healthcare environment.
              </p>
            </div>
          </div>

          {/* Image - Hidden on mobile, visible on desktop */}
          <div className="hidden md:block w-64 h-64 rounded-xl overflow-hidden flex-shrink-0">
            <img 
              src={process.env.PUBLIC_URL + "/images/profile.jpg"} 
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Education Timeline */}
        <div className="mt-12">
          <h3 className="text-[#F2F4CB] text-3xl font-light mb-8">
            my <span className="font-bold">education</span>
          </h3>

          <div className="space-y-8">            {/* Current Education */}
            <div className="relative pl-8 border-l-2 border-[#B7990D]">
              <div className="absolute w-4 h-4 bg-[#B7990D] rounded-full -left-[9px] top-0"></div>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-white/10 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={process.env.PUBLIC_URL + "/images/schools/plv-logo.png"} 
                    alt="PLV Logo"
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="text-[#F2F4CB]">
                  <h4 className="text-xl font-semibold">Pamantasan ng Lungsod ng Valenzuela</h4>
                  <p className="text-gray-400">2022 - Present</p>
                  <p className="text-gray-400 mt-1">Incoming 4th Year College</p>
                </div>
              </div>
            </div>

            {/* Senior High School */}
            <div className="relative pl-8 border-l-2 border-[#B7990D]">
              <div className="absolute w-4 h-4 bg-[#B7990D] rounded-full -left-[9px] top-0"></div>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-white/10 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={process.env.PUBLIC_URL + "/images/schools/plv-logo.png"} 
                    alt="PLV Logo"
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="text-[#F2F4CB]">
                  <h4 className="text-xl font-semibold">Pamantasan Ng Lungsod ng Valenzuela</h4>
                  <p className="text-gray-400">2020 - 2022</p>
                  <p className="text-gray-400 mt-1">Senior High School</p>
                
                </div>
              </div>
            </div>

            {/* Junior High School */}
            <div className="relative pl-8 border-l-2 border-[#B7990D]">
              <div className="absolute w-4 h-4 bg-[#B7990D] rounded-full -left-[9px] top-0"></div>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-white/10 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={process.env.PUBLIC_URL + "/images/schools/cenhs-logo.png"} 
                    alt="CENHS Logo"
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="text-[#F2F4CB]">
                  <h4 className="text-xl font-semibold">Canumay East National High School</h4>
                  <p className="text-gray-400">2016 - 2020</p>
                  <p className="text-gray-400 mt-1">Junior High School</p>
                </div>
              </div>
            </div>

            {/* Elementary School */}
            <div className="relative pl-8 border-l-2 border-[#B7990D]">
              <div className="absolute w-4 h-4 bg-[#B7990D] rounded-full -left-[9px] top-0"></div>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-white/10 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={process.env.PUBLIC_URL + "/images/schools/bes-logo.png"} 
                    alt="BES Logo"
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="text-[#F2F4CB]">
                  <h4 className="text-xl font-semibold">Bagbaguin Elementary School</h4>
                  <p className="text-gray-400">2010 - 2016</p>
                  <p className="text-gray-400 mt-1">Elementary School</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutMe;

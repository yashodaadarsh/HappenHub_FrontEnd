import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Clock, Cpu, Users, Shield, CheckCircle, ArrowRight } from "lucide-react"; // Updated to Lucide icons

const OneClickRegistration = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Clock className="text-purple-400 text-2xl" />,
      title: "Save 95% of registration time",
      desc: "What used to take 15 minutes now takes just seconds.",
    },
    {
      icon: <Cpu className="text-purple-400 text-2xl" />,
      title: "Smart Profile-Matching",
      desc: "Automatically fills required fields based on organizer requirements.",
    },
    {
      icon: <Users className="text-purple-400 text-2xl" />,
      title: "Team Formation Simplified",
      desc: "Invite teammates with a link - they can join with one click too.",
    },
  ];

  const profileStatus = [
    { name: "Skills Profile", completed: true },
    { name: "Educational Info", completed: true },
    { name: "Contact Details", completed: true },
  ];

  const handleNavigateToSignup = () => {
    navigate("/signup");
  };

  return (
    <section className="w-full bg-[#1F1F2E] text-white py-20 px-6 font-sans">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="mb-6">
            <span className="text-xs font-bold tracking-widest text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full">
              SIGNATURE FEATURE
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-100 mb-4">
            1-Click Registration System
          </h1>
          <p className="text-gray-400 mb-10 max-w-lg">
            Register for any hackathon or challenge with just one click. No more
            repetitive forms, no more unnecessary steps. Create your profile once,
            and you're all set to join any competition instantly.
          </p>

          <div className="flex flex-col gap-6 mb-10">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="mt-1">{feature.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-200">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleNavigateToSignup}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-300 shadow-lg shadow-purple-600/30"
          >
            Try it now <ArrowRight />
          </button>
        </motion.div>

        {/* RIGHT CARD */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="flex justify-center"
        >
          <div className="w-full max-w-sm bg-[#2C2C44]/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
            {/* Card Header */}
            <div className="flex justify-between items-start mb-5">
              <div className="flex items-center gap-3">
                <Shield className="text-purple-400 text-2xl" />
                <div>
                  <h4 className="font-bold text-gray-100">HappenHub Dev Meetup</h4>
                  <p className="text-xs text-gray-400">By The HappenHub Community</p>
                </div>
              </div>
              <span className="text-xs font-medium bg-green-500/20 text-green-300 px-3 py-1 rounded-full border border-green-400/30">
                Registration Open
              </span>
            </div>

            {/* Participants Info */}
            <div className="flex justify-between items-center text-sm text-gray-400 mb-6">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  <img className="inline-block h-6 w-6 rounded-full ring-2 ring-[#2C2C44]" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User 1"/>
                  <img className="inline-block h-6 w-6 rounded-full ring-2 ring-[#2C2C44]" src="https://i.pravatar.cc/150?u=a042581f4e29026704e" alt="User 2"/>
                  <img className="inline-block h-6 w-6 rounded-full ring-2 ring-[#2C2C44]" src="https://i.pravatar.cc/150?u=a042581f4e29026704f" alt="User 3"/>
                </div>
                <span className="ml-3">127 participants</span>
              </div>
              <span>5 days left</span>
            </div>

            {/* Profile Status */}
            <div className="mb-6">
              <h5 className="text-xs font-bold text-gray-500 tracking-wider mb-3">YOUR PROFILE STATUS</h5>
              <div className="flex flex-col gap-2">
                {profileStatus.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">{item.name}</span>
                    <span className="text-green-400 flex items-center gap-1">
                      <CheckCircle size={16} /> Complete
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleNavigateToSignup}
              className="w-full py-3 bg-purple-600 text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-purple-700 transition-all duration-300 shadow-lg shadow-purple-600/40 transform hover:scale-105"
            >
              Join with 1-Click <ArrowRight />
            </button>
            
            <div className="flex justify-center gap-2 mt-4">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                <div className="w-2 h-2 rounded-full bg-gray-600"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OneClickRegistration;
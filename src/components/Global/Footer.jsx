import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const socials = [
  { icon: FaGithub, link: "https://github.com/", label: "GitHub" },
  { icon: FaLinkedin, link: "https://linkedin.com/", label: "LinkedIn" },
  { icon: FaTwitter, link: "https://twitter.com/", label: "Twitter" },
  { icon: FaInstagram, link: "https://instagram.com/", label: "Instagram" },
];

const floatingAnimation = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative bg-gradient-to-b from-richblack-900 to-richblue-900 text-yellow-50 py-10 mt-10"
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center gap-6">
        {/* Brand */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-100 via-pink-200 to-blue-100 bg-clip-text text-transparent"
        >
          HappenHub
        </motion.h2>

        {/* Social Links */}
        <div className="flex gap-6 mt-4">
          {socials.map(({ icon: Icon, link, label }, i) => (
            <motion.a
              key={label}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              variants={floatingAnimation}
              animate="animate"
              style={{ animationDelay: `${i * 0.2}s` }}
              className="text-2xl text-yellow-100 hover:text-yellow-200 transition-colors"
              aria-label={label}
            >
              <Icon />
            </motion.a>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px w-3/4 bg-richblack-700 my-4" />

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-sm text-richblack-300"
        >
          © {new Date().getFullYear()} HappenHub — All Rights Reserved
        </motion.p>
      </div>
    </motion.footer>
  );
};

export default Footer;

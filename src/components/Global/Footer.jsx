import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

// Social media links configuration
const socials = [
  { icon: Github, href: "https://github.com/", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/", label: "Instagram" },
];

// Basic footer navigation links
const footerLinks = [
    { title: "About Us", href: "/about" },
    { title: "Contact", href: "/contact" },
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
]

const Footer = () => {
  return (
    <footer className="w-full bg-[#1F1F2E] text-gray-300 py-10 border-t border-white/10 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-6"
      >
        {/* Brand Name */}
        <h2 className="text-3xl font-bold text-gray-100">HappenHub</h2>
        <p className="text-gray-400 text-center max-w-md">
            Discover, Join & Never Miss an Event. Your central hub for all things happening.
        </p>
        
        {/* Footer Navigation */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-2">
            {footerLinks.map(link => (
                <Link key={link.title} to={link.href} className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                    {link.title}
                </Link>
            ))}
        </div>

        {/* Social Icons */}
        <div className="flex gap-6 mt-4">
          {socials.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-gray-400 hover:text-purple-400 hover:scale-110 transform transition-all duration-300"
            >
              <social.icon size={22} />
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px w-full max-w-xl bg-gray-700 my-4" />

        {/* Copyright */}
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} HappenHub. All Rights Reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
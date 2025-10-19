import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Check, Code, PenTool, Mic, Award, Briefcase, Users, Handshake, Presentation 
} from "lucide-react";

// Data for the preference bubbles
const initialPreferences = [
  { name: "Hackathon", icon: <Code size={20} /> },
  { name: "Workshop", icon: <PenTool size={20} /> },
  { name: "Webinar", icon: <Mic size={20} /> },
  { name: "Competition", icon: <Award size={20} /> },
  { name: "Internship", icon: <Briefcase size={20} /> },
  { name: "Job Fair", icon: <Users size={20} /> },
  { name: "Networking", icon: <Handshake size={20} /> },
  { name: "Conference", icon: <Presentation size={20} /> },
];

const Step3 = ({ formData, onPreferenceChange }) => {
  const [preferences, setPreferences] = useState(initialPreferences);
  const containerRef = useRef(null);
  const itemRefs = useRef(new Map());
  const [draggingIndex, setDraggingIndex] = useState(null);

  // --- Logic for Drag-to-Swap ---
  const handleDragEnd = (event, info) => {
    if (draggingIndex === null) return;
    const { x, y } = info.point;

    // Find which item the dragged item was dropped on
    let targetIndex = null;
    for (const [index, ref] of itemRefs.current.entries()) {
      if (index === draggingIndex || !ref) continue;
      const rect = ref.getBoundingClientRect();
      if (x > rect.left && x < rect.right && y > rect.top && y < rect.bottom) {
        targetIndex = index;
        break;
      }
    }

    // If dropped on a valid target, swap the items in the state
    if (targetIndex !== null) {
      const newPreferences = [...preferences];
      [newPreferences[draggingIndex], newPreferences[targetIndex]] = [newPreferences[targetIndex], newPreferences[draggingIndex]];
      setPreferences(newPreferences);
    }
    
    setDraggingIndex(null);
  };

  return (
    <div className="animate-fadeIn">
      <h4 className="text-lg font-bold text-purple-300 mb-1">Set Your Event Preferences</h4>
      <p className="text-sm text-gray-400 mb-4">Choose the types of events you want to see. You can drag them around!</p>
      
      <motion.div
        ref={containerRef}
        className="relative grid grid-cols-2 sm:grid-cols-3 gap-4 bg-[#1F1F2E] rounded-xl border border-white/10 p-4 h-[350px]"
      >
        {preferences.map((preference, index) => {
          const isSelected = formData.preferences.includes(preference.name);
          return (
            <motion.div
              key={preference.name}
              ref={(el) => itemRefs.current.set(index, el)}
              layout // This is the magic prop that animates layout changes (swapping)
              transition={{ type: "spring", stiffness: 350, damping: 35 }}
              drag
              dragConstraints={containerRef} // Restricts dragging to within the container
              dragElastic={0.2} // A little bit of "give" when hitting the edges
              onDragStart={() => setDraggingIndex(index)}
              onDragEnd={handleDragEnd}
              onTap={() => onPreferenceChange(preference.name)}
              whileDrag={{ scale: 1.1, zIndex: 10, boxShadow: "0px 10px 30px rgba(0,0,0,0.3)" }}
              className={`
                relative flex items-center justify-center gap-2 p-4 h-20 rounded-lg border 
                font-semibold text-center cursor-grab transition-colors duration-200
                ${isSelected
                    ? "bg-purple-600/30 border-purple-500 text-white"
                    : "bg-[#2C2C44] border-gray-700 text-gray-300 hover:border-purple-500"
                }
              `}
            >
              {preference.icon}
              <span className="hidden sm:inline">{preference.name}</span>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-purple-500"
                >
                  <Check size={12} className="text-white" />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Step3;
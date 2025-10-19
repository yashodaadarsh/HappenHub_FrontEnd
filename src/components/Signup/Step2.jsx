import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Check, Cpu, Code, Palette, Rocket, Mic, Gamepad, FlaskConical, BarChart3, Briefcase, HeartPulse, PenTool 
} from "lucide-react";

// Data for the interest bubbles
const initialInterests = [
  { name: "Technology", icon: <Cpu size={20} /> },
  { name: "Software", icon: <Code size={20} /> },
  { name: "AI & ML", icon: <Rocket size={20} /> },
  { name: "Web Dev", icon: <PenTool size={20} /> },
  { name: "Design", icon: <Palette size={20} /> },
  { name: "Startups", icon: <Mic size={20} /> },
  { name: "Marketing", icon: <BarChart3 size={20} /> },
  { name: "Business", icon: <Briefcase size={20} /> },
  { name: "Gaming", icon: <Gamepad size={20} /> },
  { name: "Science", icon: <FlaskConical size={20} /> },
  { name: "Finance", icon: <BarChart3 size={20} /> },
  { name: "Health", icon: <HeartPulse size={20} /> },
];

const Step2 = ({ formData, onInterestChange }) => {
  const [interests, setInterests] = useState(initialInterests);
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
      const newInterests = [...interests];
      [newInterests[draggingIndex], newInterests[targetIndex]] = [newInterests[targetIndex], newInterests[draggingIndex]];
      setInterests(newInterests);
    }
    
    setDraggingIndex(null);
  };

  return (
    <div className="animate-fadeIn">
      <h4 className="text-lg font-bold text-purple-300 mb-1">Tell Us Your Interests</h4>
      <p className="text-sm text-gray-400 mb-4">Select your interests below. You can also drag to reorder them!</p>
      
      <motion.div
        ref={containerRef}
        className="relative grid grid-cols-2 sm:grid-cols-3 gap-4 bg-[#1F1F2E] rounded-xl border border-white/10 p-4 h-[400px]"
      >
        {interests.map((interest, index) => {
          const isSelected = formData.interests.includes(interest.name);
          return (
            <motion.div
              key={interest.name}
              ref={(el) => itemRefs.current.set(index, el)}
              layout // This is the magic prop that animates layout changes (swapping)
              transition={{ type: "spring", stiffness: 350, damping: 35 }}
              drag
              dragConstraints={containerRef} // Restricts dragging to within the container
              dragElastic={0.2} // A little bit of "give" when hitting the edges
              onDragStart={() => setDraggingIndex(index)}
              onDragEnd={handleDragEnd}
              onTap={() => onInterestChange(interest.name)}
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
              {interest.icon}
              <span className="hidden sm:inline">{interest.name}</span>
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

export default Step2;
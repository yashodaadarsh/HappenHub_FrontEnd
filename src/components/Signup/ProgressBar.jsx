import React from "react";
import { UserCircle, Sparkles, LayoutGrid, CheckCircle2 } from "lucide-react";

// Configuration for the steps, aligned with RightPanel.jsx for consistency
const steps = [
  { icon: UserCircle, label: "Details" },
  { icon: Sparkles, label: "Interests" },
  { icon: LayoutGrid, label: "Preferences" },
  { icon: CheckCircle2, label: "Review" },
];

const ProgressBar = ({ currentStep }) => {
  return (
    <div className="w-full max-w-lg mx-auto mb-10">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <React.Fragment key={index}>
              {/* Step Icon and Label */}
              <div className="flex flex-col items-center text-center">
                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center border-2 
                    transition-all duration-300
                    ${
                      isCompleted
                        ? "bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-600/30"
                        : isCurrent
                        ? "bg-transparent border-purple-500 text-purple-400"
                        : "bg-[#2C2C44] border-gray-700 text-gray-500"
                    }
                  `}
                >
                  <step.icon size={24} strokeWidth={isCurrent ? 2.5 : 2} />
                </div>
                <p
                  className={`
                    mt-2 text-xs font-semibold transition-colors duration-300
                    ${isCompleted || isCurrent ? "text-gray-200" : "text-gray-500"}
                  `}
                >
                  {step.label}
                </p>
              </div>

              {/* Connector Line (not shown after the last step) */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 mx-2 bg-gray-700 rounded-full">
                  <div
                    className="h-1 bg-purple-600 rounded-full transition-all duration-500"
                    style={{ width: isCompleted ? "100%" : "0%" }}
                  ></div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
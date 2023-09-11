import React from "react";

const SemiCircleProgress = ({ progress }: any) => {
  // Calculate stroke-dashoffset to reveal the progress
  const strokeWidth = 10; // Adjust as needed
  const radius = 50 - strokeWidth / 2; // Radius minus half of stroke width
  const circumference = 1 * Math.PI * radius; // Calculate circumference
  const dashoffset = (1 - progress / 100) * circumference; // Reverse the progress

  return (
    <svg width="340" height="200" viewBox="0 0 100 40">
      <path
        d={`M${50 - radius},50 A${radius},${radius} 0 0 1 ${50 + radius},50`}
        fill="transparent"
        stroke="gray"
        strokeWidth={strokeWidth}
      />
      <path
        d={`M${50 - radius},50 A${radius},${radius} 0 ${
          progress > 50 ? 1 : 0
        } 1 ${50 + radius},50`}
        fill="transparent"
        stroke="green"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={dashoffset}
      />
    </svg>
  );
};

export default SemiCircleProgress;

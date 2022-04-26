import classNames from "classnames";
import React from "react";

interface StepItemProps {
  src: string;
  desc?: string;
  title: string;
}

const StepItem: React.FC<StepItemProps> = ({ src, desc, title }) => {
  return (
    <div className="step-item d-flex flex-row">
      <img src={src} alt={title} />
      <div className="d-flex px-4 flex-column justify-content-start align-items-start">
        <span className="event-step-title">{title}</span>
        <p className="text-left event-step-description mt-2">{desc}</p>
      </div>
    </div>
  );
};

export default StepItem;

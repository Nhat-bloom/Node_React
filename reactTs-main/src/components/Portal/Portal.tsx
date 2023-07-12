import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface IProp {
  children: React.ReactNode;
  target: string;
}
const Portal = ({ children, target }: IProp) => {
  const [root, setRoot] = useState<HTMLDivElement>();

  useEffect(() => {
    let container = document.querySelector<HTMLDivElement>(target);
    if (!container) {
      container = document.createElement("div");
      document.body.appendChild(container);
    }
    setRoot(container);
    return () => {
      document.body.removeChild(container!);
    };
  }, []);

  return createPortal(children, root!);
};

export default Portal;

import React, { useState, useEffect } from "react";
import './index.css'

const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      {showTopBtn && (
        <div onClick={goToTop} className="back-to-ceiling">
          <span>
            <title>Back to Top</title>
          </span>
        </div>
      )}
    </>
  );
};
export default ScrollToTop;

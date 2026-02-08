import "./ImageSlider.css";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { useState, useEffect } from "react";

import bg from "./../assets/bg.jpg";
import bg1 from "./../assets/bg1.jpg";
import bg2 from "./../assets/logo.jpg";
import bg3 from "./../assets/bg3.jpg";
import bg4 from "./../assets/bg4.jpg";
import bg5 from "./../assets/bg5.jpg";
import bg6 from "./../assets/bg6.jpg";
import bg7 from "./../assets/bg7.jpg";

const imageArray = [ bg2, bg, bg1,  bg3,  bg4,  bg5,  bg6];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🔁 AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === imageArray.length - 1 ? 0 : prev + 1
      );
    }, 3000); // change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // NEXT IMAGE
  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === imageArray.length - 1 ? 0 : prev + 1
    );
  };

  // PREVIOUS IMAGE
  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? imageArray.length - 1 : prev - 1
    );
  };

  return (
    <div className="ImageSlider">
      <div className="imageSliderContainer">
        <img
          src={imageArray[currentIndex]}
          alt="slider"
          className="slider-image"
        />
      </div>

      {/* ARROWS */}
      
      {/* DOTS */}
      <div className="dots-container">
        {imageArray.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

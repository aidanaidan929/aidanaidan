//index.js


// SVG Animation for Draw

document.addEventListener("DOMContentLoaded", () => {
  const drawLink = document.getElementById("draw-link");
  const svg = document.getElementById("graffiti");
  const paths = svg.querySelectorAll("path");

  // Set initial dash properties
  paths.forEach(path => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
  });

  // When hover starts
  drawLink.addEventListener("mouseenter", () => {
    svg.classList.add("visible");

    paths.forEach((path, i) => {
      const length = path.getTotalLength();
      path.style.transition = `stroke-dashoffset 1.5s ease ${i * 0.35}s`;
      path.style.strokeDashoffset = "0";
    });
  });

  // When hover ends
  drawLink.addEventListener("mouseleave", () => {
    paths.forEach(path => {
      path.style.transition = "none";
      const length = path.getTotalLength();
      path.style.strokeDashoffset = length;
    });
    svg.classList.remove("visible");
  });
});



// Video Animation
document.addEventListener("DOMContentLoaded", () => {
  const videoLink = document.getElementById("video-link");
  const wrapper = document.querySelector(".video-text-wrapper");
  const video = document.getElementById("hover-video");

  if (!videoLink || !wrapper || !video) return;

  videoLink.addEventListener("mouseenter", () => {
    wrapper.classList.add("video-active");
    video.currentTime = 0;
    video.play();
  });

  videoLink.addEventListener("mouseleave", () => {
    wrapper.classList.remove("video-active");
    video.pause();
    video.currentTime = 0;
  });
});
// index.js

// SVG Animation for Design
document.addEventListener("DOMContentLoaded", () => {
  const designLink = document.getElementById("design-link");
  const rect = document.getElementById("design-rect");
  const path = rect.querySelector(".rect-stroke");

  // Set initial dash properties
  const length = path.getTotalLength();
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;

  // When hover starts
  designLink.addEventListener("mouseenter", () => {
    rect.classList.add("visible");
    path.style.transition = `stroke-dashoffset 1.5s ease`;
    path.style.strokeDashoffset = "0";
  });

  // When hover ends
  designLink.addEventListener("mouseleave", () => {
    path.style.transition = "none";
    path.style.strokeDashoffset = length;
    rect.classList.remove("visible");
  });
});


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

// Mailbox Flag Animation for Contact
document.addEventListener("DOMContentLoaded", () => {
  const contactLink = document.getElementById("contact-link");
  const flag = document.getElementById("mailbox-flag");

  if (contactLink && flag) {
    contactLink.addEventListener("mouseenter", () => {
      flag.classList.add("visible");
    });

    contactLink.addEventListener("mouseleave", () => {
      flag.classList.remove("visible");
    });
  }
});
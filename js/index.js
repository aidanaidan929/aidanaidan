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

// index.js

// Color Change for Title
document.addEventListener("DOMContentLoaded", () => {
  const nameTitle = document.getElementById("name-title");

  function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

  nameTitle.addEventListener("mouseenter", () => {
    nameTitle.style.color = getRandomColor();
  });

  nameTitle.addEventListener("mouseleave", () => {
    nameTitle.style.color = "black";
  });
});


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

// Animation for Film

document.addEventListener("DOMContentLoaded", () => {
  const filmLink = document.getElementById("film-link");
  const camera = document.getElementById("film-camera");
  const flash = document.getElementById("film-flash");

  if (!filmLink || !camera || !flash) return;

  filmLink.addEventListener("mouseenter", () => {
    // Reset animations
    camera.classList.remove("visible");
    flash.classList.remove("visible");

    // Force reflow to restart animation
    void camera.offsetWidth;

    // Start both (keyframes handle the timing)
    camera.classList.add("visible");
    flash.classList.add("visible");
  });

  filmLink.addEventListener("mouseleave", () => {
    camera.classList.remove("visible");
    flash.classList.remove("visible");
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

// Typewriter Font Animation for Print (Help from Claude)
document.addEventListener("DOMContentLoaded", () => {
  const printLink = document.getElementById("print-link");
  const nameTitle = document.getElementById("name-title");
  const originalText = "AIDAN SMITH";
  const typewriterText = "Aidan Smith";
  let typewriterInterval;

  printLink.addEventListener("mouseenter", () => {
    let index = 0;
    
    clearInterval(typewriterInterval);
    
    nameTitle.innerHTML = '';
    
    for (let i = 0; i < originalText.length; i++) {
      const span = document.createElement('span');
      span.textContent = originalText[i];
      
      if (originalText[i] === ' ') {
        span.innerHTML = '&nbsp;';
      }
      
      span.style.fontFamily = '"franklin-gothic-atf", sans-serif';
      span.style.fontWeight = '800';
      span.style.display = 'inline-block';
      span.style.transition = 'font-family 0.1s ease, font-weight 0.1s ease';
      nameTitle.appendChild(span);
    }
    
    const letters = nameTitle.querySelectorAll('span');
    
    typewriterInterval = setInterval(() => {
      if (index < letters.length) {

        if (typewriterText[index] === ' ') {
          letters[index].innerHTML = '&nbsp;';
        } else {
          letters[index].textContent = typewriterText[index];
        }
        
        letters[index].style.fontFamily = '"Courier New", Courier, monospace';
        letters[index].style.fontWeight = 'bold';
        index++;
      } else {
        clearInterval(typewriterInterval);
      }
    }, 200);
  });

  printLink.addEventListener("mouseleave", () => {
    clearInterval(typewriterInterval);
    nameTitle.innerHTML = originalText;
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

// Disable animations on mobile
if (window.matchMedia("(max-width: 480px)").matches || 
    window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
  
  // Prevent all animation event listeners from firing
  document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = [
      'design-link',
      'film-link', 
      'video-link',
      'draw-link',
      'contact-link'
    ];
    
    animatedElements.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.style.pointerEvents = 'auto'; // Keep clickable
        // Remove all event listeners by cloning
        const clone = element.cloneNode(true);
        element.parentNode.replaceChild(clone, element);
      }
    });
    
    // Disable title hover
    const nameTitle = document.getElementById('name-title');
    if (nameTitle) {
      nameTitle.style.pointerEvents = 'none';
    }
  });
}
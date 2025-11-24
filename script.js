// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Custom Cursor
const cursor = document.getElementById("cursor");
const links = document.querySelectorAll("a, button, input, textarea");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

links.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    cursor.classList.add("hovered");
  });
  link.addEventListener("mouseleave", () => {
    cursor.classList.remove("hovered");
  });
});

// GitHub Projects Fetcher
const projectsContainer = document.getElementById("projects-container");
const username = "sirwagyashekhar";

async function fetchProjects() {
  // Keep the featured project static in HTML, append others
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=4`
    );
    if (!response.ok) throw new Error("GitHub API limit reached");
    const repos = await response.json();

    repos.forEach((repo) => {
      if (repo.fork) return;

      const item = document.createElement("div");
      item.className = "project-item";
      item.innerHTML = `
                <div class="project-img-block">
                     <img src="assets/placeholder.jpg" alt="${repo.name}">
                </div>
                <div class="project-meta">
                    <div>
                        <h3 class="project-title">${repo.name.toUpperCase()}</h3>
                        <div class="project-tags">${
                          repo.language || "CODE"
                        } • WEB</div>
                        <p class="project-desc">${
                          repo.description || "No description provided."
                        }</p>
                    </div>
                    <div class="project-links">
                        ${
                          repo.homepage
                            ? `<a href="${repo.homepage}" target="_blank">VIEW &rarr;</a>`
                            : ""
                        }
                        <a href="${
                          repo.html_url
                        }" target="_blank">GITHUB &rarr;</a>
                    </div>
                </div>
            `;
      projectsContainer.appendChild(item);
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    const errorMsg = document.createElement("div");
    errorMsg.style.marginTop = "4rem";
    errorMsg.style.fontFamily = "var(--font-heading)";
    errorMsg.style.fontSize = "1.5rem";
    errorMsg.innerHTML = `GitHub API said “nah.” Check the profile manually. <a href="https://github.com/${username}" target="_blank" style="text-decoration:underline">GITHUB &rarr;</a>`;
    projectsContainer.appendChild(errorMsg);
  }
}

fetchProjects();

// Contact Form
const contactForm = document.getElementById("contact-form");
const submitBtn = contactForm.querySelector("button");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const originalText = submitBtn.innerText;
  submitBtn.innerText = "SENDING...";
  submitBtn.disabled = true;

  setTimeout(() => {
    submitBtn.innerText = "SENT.";
    contactForm.reset();
    setTimeout(() => {
      submitBtn.innerText = originalText;
      submitBtn.disabled = false;
    }, 3000);
  }, 2000);
});

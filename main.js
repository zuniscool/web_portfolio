"use strict";

// If click toogle btn, switch 'jobs' or 'inputs'
const jobsBtn = document.querySelector('.tab_jobs-btn');
const inputsBtn = document.querySelector('.tab_input-btn');
const jobs = document.querySelector('.about__jobs');
const inputs = document.querySelector('.about__inputs');
jobsBtn.addEventListener('click', () => {
  jobs.classList.remove('display-none');
  jobsBtn.classList.add('clicked');
  inputsBtn.classList.remove('clicked');
  inputs.style.display = 'none';
});
inputsBtn.addEventListener('click', () => {
  jobs.classList.add('display-none');
  jobsBtn.classList.remove('clicked');
  inputsBtn.classList.add('clicked');
  inputs.style.display = 'block';
});


// Make navbar transparent when it is on the top
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
const navbarMenu = document.querySelector(".navbar__menu");
document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
  navbarMenu.classList.remove('open');  // (mobile) menu close when scrolling
});

// Handle scrolling when tapping on the navbar menu
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }

  scrollIntoView(link);
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
    navbar.classList.toggle('open');
});

// Handle home conact button
const homeContact = document.querySelector('.home__contact');
homeContact.addEventListener('click', () => {
    scrollIntoView('#contact');
});

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Show "arrow up" button when scrolling down
const arrowBtn = document.querySelector(".arrow-btn");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowBtn.classList.add("visible");
  } else {
    arrowBtn.classList.remove("visible");
  }
});

// Handle click on the "arrow up" button
arrowBtn.addEventListener("click", () => {
  setTimeout(() => {
    scrollIntoView("#home");
  }, 350);
});

// Project
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");
workBtnContainer.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

  // Remove selection from the previous item and select the new one
  const active = document.querySelector(".category__btn.selected");
  active.classList.remove("selected");
  const target =
    e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
  target.classList.add("selected");

  projectContainer.classList.add("anim-out");
  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectContainer.classList.remove("anim-out");
  }, 300);
});


// Menu tag
const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#work',
    // '#testimonials',
    '#contact'
];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) => 
    document.querySelector(`[data-link="${id}"]`)
);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
    selectedNavItem.classList.remove("active");
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    const top = scrollTo.offsetTop - navbarHeight;
    window.scrollTo({ top: top, behavior: "smooth" });
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOption = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
};

const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting && entry.intersectionRatio > 0) {
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            if (entry.boundingClientRect.y < 0) {
                selectedNavIndex = index + 1;
            } else {
                selectedNavIndex = index - 1;
            }
        }
    });
}

const observer = new IntersectionObserver(observerCallback, observerOption);
sections.forEach((section) => observer.observe(section));

window.addEventListener('wheel', () => {
    if (window.scrollY === 0) {
        selectedNavIndex = 0;
    } else if (
        Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight
    ) {
        selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
});
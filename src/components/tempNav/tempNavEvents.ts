export const tempNavEvents = () => {
  const tempTitle = document.querySelector(".temp-nav__title");
  const tempNav = document.querySelector(".temp-nav");
  if (tempTitle != null) {
    tempTitle.addEventListener("click", (e) => {
      if (tempNav != null) tempNav.remove();
    });
  }
};

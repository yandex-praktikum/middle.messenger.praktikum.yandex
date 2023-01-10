import { pageOpen } from "../../index";

export const linkEvents = () => {
  const links = document.querySelectorAll('a[rel="link"]');
  links.forEach((current) => {
    current.addEventListener("click", (e) => {
      e.preventDefault();
      const href = current.getAttribute("href");
      if (href != null) {
        pageOpen(href);
        window.history.pushState(null, "", href);
      }
    });
  });
};

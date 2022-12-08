const popup = (e: Event) => {
  const hoverMenu =
    e.currentTarget &&
    (e.currentTarget as HTMLElement)?.parentNode?.parentNode?.querySelector(
      ".modal-menu"
    );

  if (hoverMenu) {
    const className = hoverMenu.className.split(" ")[0];
    hoverMenu.classList.toggle(`${className}_hidden`);
  }
};

export { popup };

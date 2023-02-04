const setWindowToggle = (elemClass: string) => {
    const windowBox = document.querySelector(`.${elemClass}`) as HTMLElement;

    if (windowBox.classList.contains("close")) {
        windowBox.classList.toggle("close");
    } else {
        windowBox.classList.toggle("close");
    }
};

export default setWindowToggle;

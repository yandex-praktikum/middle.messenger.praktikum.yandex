const setTooltipToggle = () => {
    const tooltipBox = document.querySelector(".chat__tooltip-box") as HTMLElement;

    if (tooltipBox.classList.contains("close")) {
        tooltipBox.classList.toggle("close");
    } else {
        tooltipBox.classList.toggle("close");
    }
};

export default setTooltipToggle;

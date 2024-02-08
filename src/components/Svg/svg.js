import Handlebars from "handlebars";

export const svg_arrow_right = (width, height) => Handlebars.compile(`
<svg width="{{width}}" height="{{height}}" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 9L5 5L1 1" stroke="#999999"/>
</svg>
`)({width, height});


export const svg_send = (width, height) => Handlebars.compile(`
<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="14" cy="14" r="14" fill="#3369F3"/>
                        <rect x="8" y="13.2" width="11" height="1.6" fill="white"/>
                        <path d="M15 9L19 14L15 19" stroke="white" stroke-width="1.6"/>
                    </svg>
`)({width, height});

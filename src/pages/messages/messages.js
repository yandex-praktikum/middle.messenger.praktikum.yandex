import Handlebars from "handlebars";
import {template} from "./messages.tmpl.js";
import {simply_input} from "../../components/Input/input.js";
import {svg_arrow_right, svg_send} from "../../components/Svg/svg.js";

const input_search = simply_input({
    type: "text",
    placeholder: "Поиск",
    name: "search",
});


export const svg_search = (width, height) => Handlebars.compile(`
<svg width="{{width}}" height="{{height}}" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.5924 11.4138C10.1605 12.8457 7.83886 12.8457 6.40694 11.4138C4.97502 9.9819 4.97502 7.6603 6.40694 6.22837C7.83886 4.79645 10.1605 4.79645 11.5924 6.22837C13.0243 7.6603 13.0243 9.9819 11.5924 11.4138ZM12.0328 12.7968C10.0725 14.2962 7.25696 14.1495 5.46413 12.3566C3.51151 10.404 3.51151 7.23819 5.46413 5.28556C7.41675 3.33294 10.5826 3.33294 12.5352 5.28556C14.3279 7.07831 14.4747 9.89373 12.9755 11.8539L16.5423 15.4206L15.5994 16.3635L12.0328 12.7968Z" fill="#999999"/>
</svg>
`)({width, height});

export const more_svg = (width, height) => Handlebars.compile(`
<svg width="{{width}}" height="{{height}}" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="1.5" cy="2" r="1.5" fill="#1E1E1E"/>
                        <circle cx="1.5" cy="8" r="1.5" fill="#1E1E1E"/>
                        <circle cx="1.5" cy="14" r="1.5" fill="#1E1E1E"/>
                    </svg>
`)({width, height});

export const svg_file = (width, height) => Handlebars.compile(`
<svg width="{{width}}" height="{{height}}"  viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.18662 13.5L14.7628 5.92389L15.7056 6.8667L8.12943 14.4428L7.18662 13.5Z" fill="#999999"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.70067 16.0141L17.2768 8.43793L18.2196 9.38074L10.6435 16.9569L9.70067 16.0141Z" fill="#999999"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0433 21.3567L22.6195 13.7806L23.5623 14.7234L15.9861 22.2995L15.0433 21.3567Z" fill="#999999"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5574 23.8708L25.1335 16.2946L26.0763 17.2374L18.5002 24.8136L17.5574 23.8708Z" fill="#999999"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5574 23.8709C14.9423 26.486 10.7118 26.4954 8.10831 23.8919C5.50482 21.2884 5.51424 17.0579 8.12936 14.4428L7.18655 13.5C4.0484 16.6381 4.0371 21.7148 7.16129 24.839C10.2855 27.9632 15.3621 27.9518 18.5003 24.8137L17.5574 23.8709Z" fill="#999999"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.6195 13.7806L23.5623 14.7234C26.003 12.2826 26.0118 8.3341 23.5819 5.90417C21.152 3.47424 17.2035 3.48303 14.7627 5.92381L15.7055 6.86662C17.6233 4.94887 20.7257 4.94196 22.6349 6.85119C24.5441 8.76042 24.5372 11.8628 22.6195 13.7806Z" fill="#999999"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.70092 16.0144C7.95751 17.7578 7.95123 20.5782 9.68689 22.3138C11.4226 24.0495 14.2429 24.0432 15.9863 22.2998L15.0435 21.357C13.8231 22.5774 11.8489 22.5818 10.6339 21.3668C9.41894 20.1518 9.42334 18.1776 10.6437 16.9572L9.70092 16.0144Z" fill="#999999"/>
                    </svg>
`)({width, height});

export const chat_list = [];
chat_list.push(
    {
        name: "Andray",
        last_message: {
            text: "Значимость этих проблем настолько очевидна, что дальнейшее развитие различных форм деятельности позволяет оценить значение системы массового участия. " +
                "Идейные соображения высшего порядка, а также начало повседневной работы по формированию позиции позволяет выполнить важные задания по разработке вывода текущих активов.",
            date: "10:42", // Пока ток время, понятно что тут прокидывается timestamp и проверяем today, this week
            new_messages: 2,
            me: true,
        },
    },
    {
        active: true,
        name: "Admin",
        last_message: {
            text: "Привет, как твои дела, почему не отвечаешь????",
            date: "12:21", // Пока ток время, понятно что тут прокидывается timestamp и проверяем today, this week
            new_messages: 1,
        },
    },
    {
        name: "Научка",
        last_message: {
            text: "Внимание, в коментах заметили бредик, бредик не пишем! Пишем только хорошее!",
            date: "12:21", // Пока ток время, понятно что тут прокидывается timestamp и проверяем today, this week
        },
    }
)

export const chat_messages = [
    {
        text: "Привет, как твои дела, почему не отвечаешь????",
        date: "20:11",
        author: {
            user_id: 31,
            name: "Vevcor",
        }
    }
];

export const showMessages = () =>
    Handlebars.compile(template)({
        input_search,
        chat_list,
        chat_messages,
        svg_file: svg_file(32, 32),
        svg_search: svg_search(20, 20),
        svg_arrow_right: svg_arrow_right(6, 10),
        svg_send: svg_send(28, 28),
        more_svg: more_svg(3, 16),
    });

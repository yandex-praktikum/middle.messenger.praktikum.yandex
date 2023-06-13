import Handlebars from "handlebars";
import { template } from "./messages.tmpl.js";
import { buttonAwesome } from "../../components/Button/index.button-comp.js";
import { avatarContainerTemplate } from "../../components/User/index.user-comp.js";
import {
  messageLeft,
  messageRight,
} from "../../components/Chats/index.chats-comp.js";
import { findIndexByKeyValue, parseDate} from "../../utils/index.utils.js";

Handlebars.registerHelper("larger", function (v1, v2) {
  "use strict";
  if (v1 > v2) {
    return true;
  }
  return false;
});
Handlebars.registerHelper("smaller", function (v1, v2) {
  "use strict";
  if (v1 < v2) {
    return true;
  }
  return false;
});
Handlebars.registerHelper("equal", function (v1, v2) {
  if (v1 === v2) {
    return true;
  }
  return false;
});
Handlebars.registerHelper("notEqual", function (v1, v2) {
  if (v1 !== v2) {
    return true;
  }
  return false;
});

export const showMessages = (chats, profile, name) => {
  const buttons = {
    search: buttonAwesome({
      icon: "fas fa-search",
      title: "Search...",
      url: "",
      cl: "search-button",
    }),
    profile: buttonAwesome({
      icon: "fa-regular fa-user",
      title: "Profile",
      url: "/profile",
      cl: "profile-button",
    }),
    send: buttonAwesome({
      icon: "fa-regular fa-paper-plane",
      title: "Send",
      url: "",
      cl: "send-button",
    }),
    image: buttonAwesome({
      icon: "fa-regular fa-image",
      title: "Attach Image",
      url: "",
      cl: "image-button",
    }),
    attachment: buttonAwesome({
      icon: "fa-solid fa-paperclip",
      title: "Attach document",
      url: "",
      cl: "attach-button",
    }),
    settings: buttonAwesome({
      icon: "fa-solid fa-bars",
      title: "Settings",
      url: "",
      cl: "settings-button",
    }),
  };

  const leftPanelChat = ({
    avatarContainer,
    display_name,
    selected,
    avatar,
    author,
    message,
    date,
    n,
  }) =>
    Handlebars.compile(`
<div class="message-left-container" onclick="window.location.href ='/{{display_name}}'">
    <div class="message-left-content">
        {{{avatarContainer}}}
        <div class="message-text">
            <p><span>{{author}}: </span> <span> {{{message}}} </span></p>
        </div>
        <p class="date">{{date}}</p>
    </div>
</div>`)({
      avatarContainer,
      display_name,
      selected,
      avatar,
      author,
      message,
      date: parseDate(date),
      n,
    });

  const leftPaneChats = chats
    .map((chat) => {
      const { display_name, selected, avatar } = chat;
      const n = chat.new;
      const author = chat.messages[0].author;
      const date = chat.messages[0].date;
      const message = chat.messages[0].message;
      const avatarContainer = avatarContainerTemplate({
        avatar,
        display_name,
        selected,
        n,
      });
      return leftPanelChat({
        avatarContainer,
        display_name,
        selected,
        avatar,
        author,
        message,
        date,
        n,
      });
    })
    .join(" ");

  // setting message for the right panel

  if (name) {
    // name exists in the chats, so no extra check
    const selectedIndex = findIndexByKeyValue(chats, "display_name", name);
    const chatMessages = chats[selectedIndex];
    const myAvatar = profile ? profile.avatar : "";
    const { avatar, display_name } = chatMessages;

    const rightPanelMessagesData = chatMessages.messages.map((m) => {
      const thisAvatar = m.author === "You" ? myAvatar : avatar;
      return { ...m, avatar: thisAvatar };
    });

    const rightPanelMessages = rightPanelMessagesData
      .map((m, i) => {
        const { avatar, author, message, date } = m;
        let prevAuthor = author;
        let hideAvatar = false;
        if (i < rightPanelMessagesData.length - 1) {
          prevAuthor = rightPanelMessagesData[i + 1].author;
        }
        prevAuthor == author && hideAvatar;
        if (author === "You") {
          return messageRight({ author, avatar, hideAvatar, message, date: parseDate(date) });
        }
        return messageLeft({ author, avatar, hideAvatar, message, date: parseDate(date) });
      })
      .join(" ");

    const topAvatarContainer = avatarContainerTemplate({
      display_name,
      avatar,
      selected: true,
      n: 0,
    });

    return Handlebars.compile(template)({
      buttons,
      leftPaneChats,
      rightPanelMessages,
      topAvatarContainer,
    });
  }

  const noMessages = Handlebars.compile('<p>Select a chat to see the messages</p>')()
  return Handlebars.compile(template)({
    buttons,
    leftPaneChats,
    noMessages
  });
};

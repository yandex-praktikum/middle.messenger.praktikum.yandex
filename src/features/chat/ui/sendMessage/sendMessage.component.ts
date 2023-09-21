import { Component } from "@/shared/model";
import clipIcon from "@/assets/clip.svg";

class SendMessage extends Component {
  protected render() {
    return `
<img src=${clipIcon}/>

`;
  }
}

export { SendMessage };

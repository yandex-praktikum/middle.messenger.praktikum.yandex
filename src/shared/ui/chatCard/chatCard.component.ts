import { Component } from "@/shared/model";
import { ChatCardProps } from "./chatCard.types";

class ChatCard extends Component {
  constructor(props: ChatCardProps) {
    super(props);
  }

  protected render() {
    return `
<div>
  <div>
    
  </div>
  <div>
    <span></span>
    
  </div>
  <div>
  </div>
</div>


`;
  }
}

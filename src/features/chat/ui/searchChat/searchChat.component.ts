import { Component } from "@/shared/model";

class SearchChat extends Component {
  protected render() {
    return `
<div>
  {{{ Input type="text" placeholder="🔍 Поиск" }}}
</div>

`;
  }
}

export { SearchChat };

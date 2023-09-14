import { Component } from "@/shared/model";

interface ButtonProps {
  label: string;
}

class Button extends Component {
  constructor(props: ButtonProps) {
    super(props);
  }

  protected render(): string {
    const { label } = this.props;
    return;
  }
}

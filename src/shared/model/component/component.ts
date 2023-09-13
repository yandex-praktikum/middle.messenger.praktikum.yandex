export class Block {
  static EVENTS = {
    INIT: "INIT",
    FLOW_COMPONENT_DID_MOUNT: "flow:component_did_mount",
    FLOW_COMPONENT_RENDER: "flow:component_render",
    FLOW_COMPONENT_WILL_UNMOUNT: "flow:component_will_unmount",
  };

  private element: HTMLElement | null = null;
  private meta: object = null;

  constructor(props: any);
}

export class Node {
  parent?: Node;
  previous?: Node;
  next?: Node;
  readonly children: Node[] = [];

  constructor(readonly name: string) {}

  push(node: Node) {
    const last = this.children[this.children.length - 1];

    if (node instanceof TextNode && last instanceof TextNode) {
      last.text += node.text;
    } else {
      if (last) {
        last.next = node;
      }
      node.parent = this;
      node.previous = last;
      this.children.push(node);
    }
  }

  hasAncestor(ancestor: string) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let current: Node | undefined = this;

    while ((current = current.parent)) {
      if (current.name === ancestor) {
        return true;
      }
    }

    return false;
  }

  select(
    selector: (value: Node, index: number, array: Node[]) => value is Node
  ) {
    return this.children.filter(selector);
  }
}

export class TextNode extends Node {
  constructor(public text: string) {
    super("text");
  }
}

export class TagNode extends Node {
  constructor(
    tag: string,
    readonly attributes: { [key: string]: string } = {}
  ) {
    super(tag);
  }
}

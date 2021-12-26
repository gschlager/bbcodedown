export class Node {
  public parent?: Node;
  public previous?: Node;
  public next?: Node;
  public readonly children: Node[];
  public name: string;

  constructor(name: string) {
    this.name = name;
    this.children = [];
  }

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
  public text: string;

  constructor(text: string) {
    super("text");
    this.text = text;
  }
}

export class TagNode extends Node {
  public attributes: {};

  constructor(tag: string, attributes = {}) {
    super(tag);
    this.attributes = attributes;
  }
}

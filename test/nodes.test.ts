import { Node, TextNode } from "../src/nodes";

describe("node", () => {
  it("appends text", () => {
    const root = new Node("");
    root.push(new TextNode("Hello"));
    root.push(new TextNode(" world!"));

    expect(root.children).toHaveLength(1);

    const node = root.children[0];
    expect(node).toBeInstanceOf(TextNode);
    expect((<TextNode>node).text).toBe("Hello world!");
  });
});

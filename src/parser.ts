import { lex, TagStartToken, TagEndToken, TextToken } from "./lexer";
import { Node, TagNode, TextNode } from "./nodes";

export function parse(text: string): Node {
  const root = new Node("");
  let current = root;

  for (let token of lex(text)) {
    if (token instanceof TextToken) {
      current.push(new TextNode(token.text));
    } else if (token instanceof TagStartToken) {
      // if (
      //   ALLOWED_BBCODE_TAGS.has(token.tag) &&
      //   !PREFORMATTED_BBCODE_TAGS.has(current.name)
      // ) {
      //   let tag = new TagNode(token.tag!, token.attributes);
      //   if (SELF_CLOSING_BBCODE_TAGS.has(token.tag)) {
      //     current.push(tag);
      //   } else {
      //     if (
      //       LIST_ITEM_BBCODE_TAGS.has(token.tag) &&
      //       token.tag === current.name &&
      //       current.parent &&
      //       LIST_BBCODE_TAGS.has(current.parent.name)
      //     ) {
      //       current.parent.push(tag);
      //     } else {
      //       current.push(tag);
      //     }
      //     current = tag;
      //   }
      // } else {
      //   current.push(new TextNode(token.source));
      // }
    } else if (token instanceof TagEndToken) {
      // if (token.tag === current.name) {
      //   current = current.parent;
      // } else if (SELF_CLOSING_BBCODE_TAGS.has(token.tag)) {
      //   // ignore
      // } else if (
      //   LIST_BBCODE_TAGS.has(token.tag) &&
      //   LIST_ITEM_BBCODE_TAGS.has(current.name) &&
      //   current.hasAncestor(token.tag)
      // ) {
      //   current = current.parent.parent;
      // } else {
      //   current.push(new TextNode(token.source));
      // }
    } else {
      throw new Error(`Unknown token type: ${typeof token}`);
    }
  }

  return root;
}

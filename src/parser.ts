import { lex, TagStartToken, TagEndToken, TextToken } from "./lexer";
import { Node, TagNode, TextNode } from "./nodes";
import { BBCodes } from "./bbcodes";

export function parse(text: string): Node {
  const root = new Node("");
  let current = root;

  for (const token of lex(text)) {
    if (token instanceof TextToken) {
      current.push(new TextNode(token.text));
    } else if (token instanceof TagStartToken) {
      if (
        BBCodes.allowed.has(token.tag) &&
        !BBCodes.preformatted.has(current.name)
      ) {
        const tag = new TagNode(token.tag, token.attributes);

        if (BBCodes.self_closing.has(token.tag)) {
          current.push(tag);
        } else {
          handleStartTag(token, current, tag);
          current = tag;
        }
      } else {
        current.push(new TextNode(token.source));
      }
    } else if (token instanceof TagEndToken) {
      if (token.tag === current?.name) {
        if (current.parent) {
          current = current.parent;
        }
      } else {
        current = handleEndTag(token, current);
      }
    } else {
      throw new Error(`Unknown token type: ${typeof token}`);
    }
  }

  return root;
}

function handleStartTag(token: TagStartToken, current: Node, tag: TagNode) {
  // if (
  //   LIST_ITEM_BBCODE_TAGS.has(token.tag) &&
  //   token.tag === current.name &&
  //   current.parent &&
  //   LIST_BBCODE_TAGS.has(current.parent.name)
  // ) {
  //   current.parent.push(tag);
  // } else {
  current.push(tag);
  // }
}

function handleEndTag(token: TagEndToken, current: Node): Node {
  if (BBCodes.self_closing.has(token.tag)) {
    return current;
  }

  // if (
  //   LIST_BBCODE_TAGS.has(token.tag) &&
  //   LIST_ITEM_BBCODE_TAGS.has(current.name) &&
  //   current.hasAncestor(token.tag)
  // ) {
  //   return current.parent!.parent!;
  // }

  current.push(new TextNode(token.source));
  return current;
}

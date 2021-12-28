import { parse } from "./parser";
import { Node, TagNode, TextNode } from "./nodes";
import { BBCodes } from "./bbcodes";

let _depth = 0;
let _hoistedCode: string[] = [];

const MAX_DEPTH = 100;

export function convert(text: string): string {
  _depth = 0;
  _hoistedCode = [];

  const cleaned = text.replace(
    /<\/?\s*br\s*\/?>|\r\n?|[\u2028\u2029]+/gi,
    "\n"
  );
  const root = parse(cleaned);

  let converted = traverse(root)
    .replace(
      /^(\s+)/gm,
      (m: string) => `${m.includes("\n") ? "\n" : ""}${m.trimStart()}`
    )
    .replace(
      /[ \f\t\v\u00a0\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]+/g,
      " "
    )
    .replace(/\n{3,}/g, "\n\n");

  for (let i = 0; i < _hoistedCode.length; i++) {
    converted = converted.replace(hoistedCodeId(i), _hoistedCode[i]);
  }

  return converted.trim();
}

export function traverse(node: Node): string {
  if (_depth >= MAX_DEPTH) {
    return "";
  }

  _depth++;
  const text = node.children.map((n) => visit(n)).join("");
  _depth--;

  return text;
}

function visit(node: Node) {
  if (node instanceof TextNode) {
    return node.text;
  }

  const converter = BBCodes.converters.get(node.name);
  return converter ? converter(<TagNode>node) : traverse(node);
}

function hoistedCodeId(i: number) {
  return `§_DISCOURSE_HOISTED_CODE_${i}_§`;
}

export function hoistWhitespaces(line: string, prefix: string, suffix: string) {
  if (line.length === 0) {
    return line;
  }

  const result = line.match(/^( )*(.+?)( )*$/);

  if (!result) {
    return line;
  }

  const [, before, text, after] = result;
  return `${before || ""}${prefix || ""}${text}${suffix || ""}${after || ""}`;
}

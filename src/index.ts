import { parse } from "./parser";

export function toMarkdown(text: string) {
  parse(text);
}

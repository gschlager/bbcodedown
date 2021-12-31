import { convert } from "./convert";

import "./bbcodes/bold";
import "./bbcodes/code";

export function toMarkdown(text: string): string {
  return convert(text);
}

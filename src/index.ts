import { convert } from "./convert";

import "./bbcodes/bold";

export function toMarkdown(text: string): string {
  return convert(text);
}

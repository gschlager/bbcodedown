import { TagNode } from "../nodes";
import { hoistWhitespaces, traverse } from "../convert";
import { registerBBCode } from "../bbcodes";

registerBBCode({
  tags: ["b"],
  selfClosing: false,
  preformatted: false,

  converter: function (node: TagNode) {
    return traverse(node)
      .split(/\n+/)
      .map((line) => {
        if (!line || line.length === 0) {
          return "";
        } else if (/^\s+$/.test(line)) {
          return " ";
        } else if (line.includes("*") && line.includes("_")) {
          // TODO Escape special characters in text nodes instead of switching to HTML
          return hoistWhitespaces(line, `<strong>`, `</strong>`);
        } else {
          const delimiter = line.includes("*") ? "__" : "**";
          return hoistWhitespaces(line, delimiter, delimiter);
        }
      })
      .join("\n");
  },
});

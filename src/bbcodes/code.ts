// if (/[^`]`[^`]/.test(code))

import { Node, TagNode, TextNode } from "../nodes";
import { addHoistedCode, nextHoistedCodeId, traverse } from "../convert";
import { registerBBCode } from "../bbcodes";

const PROGRAMMING_LANGUAGE_TAGS = new Set([
  "apache",
  "bash",
  "c",
  "coffeescript",
  "cpp",
  "cs",
  "csharp",
  "css",
  "diff",
  "go",
  "html",
  "ini",
  "java",
  "javascript",
  "json",
  "lua",
  "makefile",
  "markdown",
  "nginx",
  "objectivec",
  "perl",
  "php",
  "python",
  "ruby",
  "sql",
  "xml",
  "yaml",
]);

registerBBCode({
  tags: ["code", "pre"],
  selfClosing: false,
  preformatted: true,

  converter: convertCodeBlock,
});

for (const language of PROGRAMMING_LANGUAGE_TAGS) {
  registerBBCode({
    tags: [language],
    selfClosing: false,
    preformatted: true,

    converter: function (node: TagNode) {
      convertCodeBlock(node, language);
    },
  });
}

function convertCodeBlock(node: TagNode, language: string | null = null) {
  let code = traverse(node);
  const id = nextHoistedCodeId();

  language = (language || getLanguage(node) || "").toLowerCase();

  if (isBlock(node, code)) {
    code = code.replace(/^(\s*\n)+/, "").trimEnd();
    addHoistedCode(code);
    if (code.includes("`") && code.includes("~")) {
      return `\n\n[code]\n${id}\n[/code]\n\n`;
    } else {
      const fence = code.includes("`") ? "~~~" : "```";
      return `\n\n${fence}${language}\n${id}\n${fence}\n\n`;
    }
  } else {
    addHoistedCode(code);
    return code.includes("`") ? `[code]${id}[/code]` : `\`${id}\``;
  }
}

function getLanguage(node: TagNode): string | null {
  const { option } = node.attributes;

  if (option && PROGRAMMING_LANGUAGE_TAGS.has(option.toLowerCase())) {
    return option;
  }

  return null;
}

function isBlock(node: TagNode, code: string): boolean {
  if (code.includes("\n")) {
    return true;
  }

  const previousText = getNodeText(node.previous);
  const nextText = getNodeText(node.next);

  return (
    (!previousText || previousText.endsWith("\n")) &&
    (!nextText || nextText.startsWith("\n"))
  );
}

function getNodeText(node: Node | undefined): string | null {
  return node && node instanceof TextNode ? node.text : null;
}

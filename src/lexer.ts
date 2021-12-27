const BBCODE_TAG_REGEXP =
  /\[(\/?)([a-z*.][a-z0-9]*(?::[0-9a-f]*)?)(?: *= *("[^"]*"|'[^']*'|[^\[\]]*?) *)?((?: +\w+ *= *(?:"[^"]*"|'[^']*'|[^ \[\]]*))*)\]/gi;

const BBCODE_ATTRIBUTE_REGEXP = /(\w+) *= *("[^"]*"|'[^']*'|[^ \[\]]*)/gi;

export function* lex(text: string) {
  let pos = 0;

  while (pos < text.length) {
    BBCODE_TAG_REGEXP.lastIndex = pos;
    const result = BBCODE_TAG_REGEXP.exec(text);

    if (result) {
      if (result.index > pos) {
        yield { type: "TEXT", text: text.slice(pos, result.index) };
      }
      pos = result.index + result[0].length;
      const tag = result[2].replace(/:[0-9a-f]*$/i, "").toLowerCase();
      if (result[1]) {
        yield { type: "TAG_END", tag, source: result[0] };
      } else {
        const attributes: { [key: string]: string } = {};
        if (result[3] && result[3].length > 0) {
          let option = unquote(result[3].trim());
          if (option.length > 0) {
            attributes["option"] = option;
          }
        }
        if (result[4] && result[4].length > 0) {
          for (let [, name, value] of result[4].matchAll(
            BBCODE_ATTRIBUTE_REGEXP
          )) {
            value = unquote(value.trim());
            if (value.length > 0) {
              attributes[name.toLowerCase()] = value;
            }
          }
        }
        yield { type: "TAG_START", tag, attributes, source: result[0] };
      }
    } else {
      yield { type: "TEXT", text: text.slice(pos) };
      return;
    }
  }
}

function unquote(text: string): string {
  return text[0] === text[text.length - 1] &&
    ("'" === text[0] || '"' === text[0])
    ? text.slice(1, -1)
    : text;
}

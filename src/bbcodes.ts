const SELF_CLOSING_BBCODE_TAGS = new Set(["br", "hr"]);
const PREFORMATTED_BBCODE_TAGS = new Set(["code", "pre"]);

export const BBCodes = {
  allowed: new Set(),
  self_closing: new Set(["br", "hr"]),
  preformatted: new Set(["code", "pre"]),
};

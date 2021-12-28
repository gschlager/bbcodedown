import { toMarkdown } from "../../src/index";

test("converts [b]", () => {
  const input = "[b]bold text[/b]";
  const expected = "**bold text**";
  expect(toMarkdown(input)).toBe(expected);
});

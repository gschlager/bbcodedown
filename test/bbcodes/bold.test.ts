import { toMarkdown } from "../../src/index";

describe("[b] BBCode", () => {
  it("converts to **", () => {
    expect.assertions(1);
    const input = "[b]bold text[/b]";
    const expected = "**bold text**";
    expect(toMarkdown(input)).toBe(expected);
  });
});

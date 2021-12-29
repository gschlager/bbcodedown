import { toMarkdown } from "../../src/index";

describe("[b] BBCode", () => {
  it("converts to **", () => {
    expect(toMarkdown("[b]bold text[/b]")).toBe("**bold text**");
  });
});

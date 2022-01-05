import { toMarkdown } from "../../src/index";

describe("bold", () => {
  it("converts to Markdown", () => {
    expect(toMarkdown("[b]bold text[/b]")).toBe("**bold text**");
  });

  it("ignores empty tag", () => {
    expect(toMarkdown("lorem [b][/b] ipsum")).toBe("lorem ipsum");
  });

  it("reduces whitespace", () => {
    expect(toMarkdown("lorem [b] \t [/b] ipsum")).toBe("lorem ipsum");
  });

  it("uses HTML when text contains * and _", () => {
    expect(toMarkdown("[b]* lorem_ipsum[/b]")).toBe("<strong>* lorem_ipsum</strong>");
  });

  it("uses __ if text contains *", () => {
    expect(toMarkdown("[b]lorem * ipsum[/b]")).toBe("__lorem * ipsum__");
  });
});

import { toMarkdown } from "../../src/index";

describe("code", () => {
  it("converts to Markdown", () => {
    expect(toMarkdown("lorem [code]foo[/code] ipsum")).toBe(
      "lorem `foo` ipsum"
    );
  });
});

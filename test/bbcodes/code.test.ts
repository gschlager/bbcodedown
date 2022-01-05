import { toMarkdown } from "../../src/index";
import { load_fixture } from "../test_helpers";

describe("code", () => {
  it("converts to Markdown", () => {
    expect(toMarkdown("lorem [code]foo[/code] ipsum")).toBe("lorem `foo` ipsum");
  });

  it("converts inline code that begins or ends with backticks", () => {
    expect(toMarkdown("code: [code]`a`[/code]")).toBe("code: `` `a` ``");
    expect(toMarkdown("code: [code]``a``[/code]")).toBe("code: ` ``a`` `");
    expect(toMarkdown("code: [code]```a```[/code]")).toBe("code: ` ```a``` `");

    expect(toMarkdown("code: [code]`a[/code]")).toBe("code: `` `a ``");
    expect(toMarkdown("code: [code]``a[/code]")).toBe("code: ` ``a `");
    expect(toMarkdown("code: [code]```a[/code]")).toBe("code: ` ```a `");

    expect(toMarkdown("code: [code]a`[/code]")).toBe("code: `` a` ``");
    expect(toMarkdown("code: [code]a``[/code]")).toBe("code: ` a`` `");
    expect(toMarkdown("code: [code]a```[/code]")).toBe("code: ` a``` `");
  });

  it("converts inline code that contains backticks", () => {
    expect(toMarkdown("code: [code]a`b[/code]")).toBe("code: ``a`b``");
    expect(toMarkdown("code: [code]a``b[/code]")).toBe("code: `a``b`");
    expect(toMarkdown("code: [code]a```b[/code]")).toBe("code: `a```b`");

    expect(toMarkdown("code: [code]a`b`c[/code]")).toBe("code: ``a`b`c``");
    expect(toMarkdown("code: [code]a`b``c[/code]")).toBe("code: ```a`b``c```");
    expect(toMarkdown("code: [code]a`b```c[/code]")).toBe("code: ````a`b```c````");
  });

  it("converts multi-line code blocks", () => {
    const { input, expected } = load_fixture("multiline_code");
    expect(toMarkdown(input)).toBe(expected);
  });
});

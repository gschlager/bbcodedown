import { toMarkdown } from "../../src/index";
import { load_fixture } from "../test_helpers";

describe("inline code", () => {
  it("converts to correct Markdown", () => {
    expect(toMarkdown("[code]foo[/code] ipsum")).toBe("`foo` ipsum");
    expect(toMarkdown("lorem [code]foo[/code] ipsum")).toBe("lorem `foo` ipsum");
    expect(toMarkdown("lorem [code]foo[/code]")).toBe("lorem `foo`");

    expect(toMarkdown("[code]foo[/code]")).not.toBe("`foo`");
  });

  it("converts code that begins or ends with backticks", () => {
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

  it("converts code that contains backticks", () => {
    expect(toMarkdown("code: [code]a`b[/code]")).toBe("code: ``a`b``");
    expect(toMarkdown("code: [code]a``b[/code]")).toBe("code: `a``b`");
    expect(toMarkdown("code: [code]a```b[/code]")).toBe("code: `a```b`");

    expect(toMarkdown("code: [code]a`b`c[/code]")).toBe("code: ``a`b`c``");
    expect(toMarkdown("code: [code]a`b``c[/code]")).toBe("code: ```a`b``c```");
    expect(toMarkdown("code: [code]a`b```c[/code]")).toBe("code: ````a`b```c````");
  });
});

describe("code block", () => {
  it("converts single-line code blocks to correct Markdown", () => {
    expect(toMarkdown("[code]foo[/code]")).toBe("```\nfoo\n```");
    expect(toMarkdown("lorem\n[code]foo[/code]\nipsum")).toBe("lorem\n\n```\nfoo\n```\n\nipsum");
    expect(toMarkdown("lorem\n[code]foo[/code]")).toBe("lorem\n\n```\nfoo\n```");
    expect(toMarkdown("[code]foo[/code]\nipsum")).toBe("```\nfoo\n```\n\nipsum");

    expect(toMarkdown("lorem\n[code]foo[/code] ipsum")).not.toContain("```");
    expect(toMarkdown("lorem [code]foo[/code]\nipsum")).not.toContain("```");
  });

  it("converts multi-line code blocks", () => {
    const { input, expected } = load_fixture("multiline_code");

    expect(toMarkdown(input)).toBe(expected);
    expect(toMarkdown(`lorem\n${input}\nipsum`)).toBe(`lorem\n\n${expected}\n\nipsum`);
    expect(toMarkdown(`lorem\n${input}`)).toBe(`lorem\n\n${expected}`);
    expect(toMarkdown(`${input}\nipsum`)).toBe(`${expected}\n\nipsum`);

    expect(toMarkdown(`lorem\n${input} ipsum`)).toBe(`lorem\n\n${expected}\n\nipsum`);
    expect(toMarkdown(`lorem ${input}\nipsum`)).toBe(`lorem \n\n${expected}\n\nipsum`);
    // TODO Remove trailing space after "lorem"                ^^^
  });
});

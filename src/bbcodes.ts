import { TagNode } from "./nodes";

interface ConverterFunction {
  (node: TagNode): void;
}

interface BBCode {
  tags: string[];
  selfClosing: boolean;
  preformatted: boolean;
  converter: ConverterFunction;
}

type BBCodesType = {
  readonly allowed: Set<string>;
  readonly selfClosing: Set<string>;
  readonly preformatted: Set<string>;
  readonly converters: Map<string, ConverterFunction>;
};

export const BBCodes: BBCodesType = {
  allowed: new Set<string>(),
  selfClosing: new Set<string>(),
  preformatted: new Set<string>(),
  converters: new Map<string, ConverterFunction>(),
};

export function registerBBCode(bbCode: BBCode) {
  for (const tag of bbCode.tags) {
    BBCodes.allowed.add(tag);
    BBCodes.converters.set(tag, bbCode.converter);

    if (bbCode.selfClosing) {
      BBCodes.selfClosing.add(tag);
    }

    if (bbCode.preformatted) {
      BBCodes.preformatted.add(tag);
    }
  }
}

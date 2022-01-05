import * as fs from "fs";
import * as path from "path";

export function load_fixture(name: string): { [key: string]: string } {
  const fixtures_path = path.join(__dirname, "fixtures");
  const input_path = path.join(fixtures_path, "input", `${name}.txt`);
  const expected_path = path.join(fixtures_path, "expected", `${name}.md`);

  return {
    input: fs.readFileSync(input_path, "utf8"),
    expected: fs.readFileSync(expected_path, "utf8"),
  };
}

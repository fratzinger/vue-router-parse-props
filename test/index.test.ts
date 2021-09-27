import assert from "assert";
import paramsToPropsCaster from "../src";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const index = require("../src");

describe("index.test.ts", function() {
  it("has exports", function() {
    assert.ok(paramsToPropsCaster);
  });

  it("has commonjs", function() {
    assert.ok(index);
  });
});
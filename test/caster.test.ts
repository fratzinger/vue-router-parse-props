import assert from "assert";
import { Route } from "vue-router";
import paramsToPropsCaster from "../src";

describe("caster.test.ts", function() {
  describe("as function", function() {
    it("casts string to integer", function() {
      const route = { params: { id: "1" } } as unknown as Route;
      const result = paramsToPropsCaster({
        id: Number
      })(route);
  
      assert.deepStrictEqual(result, { id: 1 }, "parses to integer");
    });

    it("casts integer to string", function() {
      const route = { params: { id: 1 } } as unknown as Route;
      const result = paramsToPropsCaster({
        id: String
      })(route);
  
      assert.deepStrictEqual(result, { id: "1" }, "parses to string");
    });

    it("doesn't use undefined Params by default", function() {
      const route = { params: { id: "1", day: "1" } } as unknown as Route;
      const result = paramsToPropsCaster({
        id: String
      })(route);
  
      assert.deepStrictEqual(result, { id: "1" }, "does not use params");
    });

    it("uses undefined Params with useUndefinedParams:true", function() {
      const route = { params: { id: "1", day: "1" } } as unknown as Route;
      const result = paramsToPropsCaster({
        id: String
      }, { useUndefinedParams: true })(route);
  
      assert.deepStrictEqual(result, { id: "1", day: "1" }, "uses undefined values");
    });
  });

  describe("as object", function() {
    it("casts string to integer", function() {
      const route = { params: { id: "1" } } as unknown as Route;
      const result = paramsToPropsCaster({
        id: { type: Number }
      })(route);
  
      assert.deepStrictEqual(result, { id: 1 }, "parses to integer");
    });

    it("casts integer to string", function() {
      const route = { params: { id: 1 } } as unknown as Route;
      const result = paramsToPropsCaster({
        id: { type: String }
      })(route);
  
      assert.deepStrictEqual(result, { id: "1" }, "parses to string");
    });

    it("doesn't use undefined Params by default", function() {
      const route = { params: { id: "1", day: "1" } } as unknown as Route;
      const result = paramsToPropsCaster({
        id: { type: String }
      })(route);
  
      assert.deepStrictEqual(result, { id: "1" }, "does not use params");
    });

    it("uses undefined Params with useUndefinedParams:true", function() {
      const route = { params: { id: "1", day: "1" } } as unknown as Route;
      const result = paramsToPropsCaster({
        id: { type: String }
      }, { useUndefinedParams: true })(route);
  
      assert.deepStrictEqual(result, { id: "1", day: "1" }, "uses undefined values");
    });
  });
});
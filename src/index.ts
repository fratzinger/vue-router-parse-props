import caster from "./caster";
export * from "./types";

export default caster;

if (typeof module !== "undefined") {
  module.exports = Object.assign(caster, module.exports);
}
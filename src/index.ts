import castProps from "./castProps";
export * from "./types";

export default castProps;

if (typeof module !== "undefined") {
  module.exports = Object.assign(castProps, module.exports);
}
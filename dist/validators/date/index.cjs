"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/validators/date/index.ts
var date_exports = {};
__export(date_exports, {
  maxDate: () => maxDate,
  minDate: () => minDate,
  rangeDate: () => rangeDate
});
module.exports = __toCommonJS(date_exports);

// src/validators/date/min-date.ts
var minDate = (minDate2, message) => {
  return (value) => {
    if (!value) return "";
    const date = new Date(value);
    const min = new Date(minDate2);
    if (isNaN(date.getTime()) || isNaN(min.getTime())) {
      return message || "Invalid date format";
    }
    if (date < min) {
      return message || `Date must be after ${min.toDateString()}`;
    }
    return "";
  };
};

// src/validators/date/max-date.ts
var maxDate = (maxDate2, message) => {
  return (value) => {
    if (!value) return "";
    const date = new Date(value);
    const max = new Date(maxDate2);
    if (isNaN(date.getTime()) || isNaN(max.getTime())) {
      return message || "Invalid date format";
    }
    if (date > max) {
      return message || `Date must be before ${max.toDateString()}`;
    }
    return "";
  };
};

// src/validators/date/range-date.ts
var rangeDate = (minDate2, maxDate2, message) => {
  return (value) => {
    if (!value) return "";
    const date = new Date(value);
    const min = new Date(minDate2);
    const max = new Date(maxDate2);
    if (isNaN(date.getTime()) || isNaN(min.getTime()) || isNaN(max.getTime())) {
      return message || "Invalid date format";
    }
    if (date < min || date > max) {
      return message || `Date must be between ${min.toDateString()} and ${max.toDateString()}`;
    }
    return "";
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  maxDate,
  minDate,
  rangeDate
});

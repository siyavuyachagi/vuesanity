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

// src/validators/file/index.ts
var file_exports = {};
__export(file_exports, {
  extensions: () => extensions,
  image: () => image,
  maxSize: () => maxSize,
  minSize: () => minSize,
  size: () => size
});
module.exports = __toCommonJS(file_exports);

// src/validators/file/extensions.ts
var extensions = (extensions2, message) => {
  const normalizedExtensions = (Array.isArray(extensions2) ? extensions2 : [extensions2]).map((ext) => ext.toLowerCase().replace(/^\./, ""));
  return (value) => {
    if (!value) return "";
    if (!(value instanceof File)) return "";
    const extension = value.name.substring(value.name.lastIndexOf(".") + 1);
    if (!normalizedExtensions.includes(extension)) {
      return message || `File ${value.name} not supported.`;
    }
    return "";
  };
};

// src/validators/file/max-size.ts
var maxSize = (sizeMB, message) => {
  return (value) => {
    if (!value) return "";
    if (!(value instanceof File)) return "";
    const sizeInMB = value.size / (1024 * 1024);
    if (sizeInMB > sizeMB) {
      return message || `Maximum file size of ${sizeMB} MB exceeded.`;
    }
    return "";
  };
};

// src/validators/file/min-size.ts
var minSize = (sizeMB, message) => {
  return (value) => {
    if (!value) return "";
    if (!(value instanceof File)) return "";
    const sizeInMB = value.size / (1024 * 1024);
    if (sizeInMB < sizeMB) {
      return message || `Minimum file size of ${sizeMB} MB required.`;
    }
    return "";
  };
};

// src/validators/file/size.ts
var size = (sizeMB, message) => {
  return (value) => {
    if (!value) return "";
    if (!(value instanceof File)) return "";
    const sizeInMB = value.size / (1024 * 1024);
    if (sizeInMB !== sizeMB) {
      return message || `File must be exactly ${sizeMB} MB in size.`;
    }
    return "";
  };
};

// src/validators/file/image.ts
var image = (message) => {
  return (value) => {
    if (!value) return "";
    if (!(value instanceof File)) return "";
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg"];
    const imageMimes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/bmp",
      "image/svg+xml"
    ];
    const extension = value.name.substring(value.name.lastIndexOf(".") + 1).toLowerCase();
    if (!imageExtensions.includes(extension) || !imageMimes.includes(value.type)) {
      return message || "File must be a valid image";
    }
    return "";
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  extensions,
  image,
  maxSize,
  minSize,
  size
});

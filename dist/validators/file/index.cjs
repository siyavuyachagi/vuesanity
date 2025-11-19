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
  fileExtension: () => fileExtension,
  fileSize: () => fileSize,
  fileType: () => fileType,
  maxFileSize: () => maxFileSize,
  minFileSize: () => minFileSize
});
module.exports = __toCommonJS(file_exports);

// src/validators/file/file-extension.ts
var fileExtension = (extensions, message) => {
  const normalizedExtensions = (Array.isArray(extensions) ? extensions : [extensions]).map((ext) => ext.toLowerCase().replace(/^\./, ""));
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

// src/validators/file/max-file-size.ts
var maxFileSize = (sizeMB, message) => {
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

// src/validators/file/min-file-size.ts
var minFileSize = (sizeMB, message) => {
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

// src/validators/file/file-size.ts
var fileSize = (sizeMB, message) => {
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

// src/validators/file/file-type.ts
var fileType = (allowedTypes, message) => {
  const types = Array.isArray(allowedTypes) ? allowedTypes : [allowedTypes];
  return (value) => {
    if (!value) return "";
    if (!(value instanceof File)) return "";
    if (!types.includes(value.type)) {
      return message || `Invalid file type. Allowed types: ${types.join(", ")}`;
    }
    return "";
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fileExtension,
  fileSize,
  fileType,
  maxFileSize,
  minFileSize
});

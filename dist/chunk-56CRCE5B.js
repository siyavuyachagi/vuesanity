// src/validators/file.ts
var extensions = (extensions2, message) => {
  const normalizedExtensions = (Array.isArray(extensions2) ? extensions2 : [extensions2]).map((ext) => ext.toLowerCase().replace(/^\./, ""));
  return (value) => {
    if (!value) return null;
    if (!(value instanceof File)) return null;
    const extension = value.name.substring(value.name.lastIndexOf(".") + 1);
    if (!normalizedExtensions.includes(extension)) {
      return message || `File ${value.name} not supported.`;
    }
    return null;
  };
};
var maxSize = (size2, message) => {
  return (value) => {
    if (!value) return null;
    if (!(value instanceof File)) return null;
    const sizeInMB = value.size / (1024 * 1024);
    if (sizeInMB > size2) {
      return message || `Maximum file size of ${size2} MB exceeded.`;
    }
    return null;
  };
};
var size = (length, message) => {
  return (value) => {
    if (!value) return null;
    if (!(value instanceof File)) return null;
    const sizeInMB = value.size / (1024 * 1024);
    if (sizeInMB !== length) {
      return message || `File must be exactly ${length} MB in size.`;
    }
    return null;
  };
};

export {
  extensions,
  maxSize,
  size
};

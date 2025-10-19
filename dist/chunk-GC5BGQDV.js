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

export {
  fileExtension
};

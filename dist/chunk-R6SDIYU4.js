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

export {
  fileType
};

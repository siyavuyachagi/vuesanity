// src/validators/file/file-type.ts
var fileType = (allowedTypes, message) => {
  return (value) => {
    if (!value) return "";
    if (!(value instanceof File)) return "";
    if (!allowedTypes.includes(value.type)) {
      return message || `Invalid file type. Allowed types: ${allowedTypes.join(", ")}`;
    }
    return "";
  };
};

export {
  fileType
};

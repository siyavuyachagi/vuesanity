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

export {
  fileSize
};

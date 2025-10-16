// src/validators/file/max-size.ts
var maxSize = (size, message) => {
  return (value) => {
    if (!value) return null;
    if (!(value instanceof File)) return null;
    const sizeInMB = value.size / (1024 * 1024);
    if (sizeInMB > size) {
      return message || `Maximum file size of ${size} MB exceeded.`;
    }
    return null;
  };
};
export {
  maxSize
};

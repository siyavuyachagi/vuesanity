// src/validators/file/size.ts
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
  size
};

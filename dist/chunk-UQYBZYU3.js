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

export {
  image
};

// src/validators/string/url.ts
var url = (message) => {
  return (value) => {
    if (!value) return null;
    try {
      new URL(value);
      return null;
    } catch {
      return message || "Invalid URL format";
    }
  };
};

export {
  url
};

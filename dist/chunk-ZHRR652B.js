// src/validators/string/url.ts
var url = (message) => {
  return (value) => {
    if (!value) return "";
    try {
      new URL(value);
      return "";
    } catch {
      return message || "Invalid URL format";
    }
  };
};

export {
  url
};

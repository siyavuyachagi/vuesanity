// src/validators/string/required.ts
/**
 * Required
 * @param {string} message Error message (Optional)
 * @returns Validation function that returns error message or empty string
 */
export const required = (message: string = "This field is required!") => {
  return (value: any): string => {
    if (value === null || value === undefined || value === "") {
      return message;
    }
    if (typeof value === "string" && value.trim() === "") {
      return message;
    }
    return "";
  };
};

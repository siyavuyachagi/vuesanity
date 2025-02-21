//validators/extension.ts

/**
 * Required
 * @param {string} message Error message (Optional)
 *
 */
export const extension = (message: string = "This field is required!") => {
  return (value: any): string | null => {
    if (value === null || value === undefined || value === "") {
      return message;
    }
    if (typeof value === "string" && value.trim() === "") {
      return message;
    }
    return null;
  };
};
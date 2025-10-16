// src/validators/file/image.ts
/**
 * Image file validation (checks extension and mime type)
 * @param {string} message Custom error message (Optional)
 * @example
 * ```ts
 * image("Please upload a valid image")
 * ```
 * @returns Validation function that returns error message or empty string
 */
export const image = (message?: string) => {
    return (value: any): string => {
        if (!value) return "";

        if (!(value instanceof File)) return "";

        const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg"];
        const imageMimes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
            "image/bmp",
            "image/svg+xml",
        ];

        const extension = value.name
            .substring(value.name.lastIndexOf(".") + 1)
            .toLowerCase();

        if (
            !imageExtensions.includes(extension) ||
            !imageMimes.includes(value.type)
        ) {
            return message || "File must be a valid image";
        }
        return "";
    };
};
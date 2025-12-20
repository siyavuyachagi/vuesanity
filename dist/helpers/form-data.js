/**
 * Converts a `TypeScript` | `JavaScript` object into FormData, handling various data types.
 *
 * Features:
 * - Supports primitive values (string, number, boolean).
 * - Handles nested objects and arrays with properly formatted keys.
 * - Supports File, Blob, and Date objects.
 * - Automatically unwraps reactive values (e.g., Vue's ref() objects).
 *
 * @param {Record<string, any>} object - The object to convert into FormData.
 * @returns {FormData} A `FormData` instance containing the object's data.
 */
export function getFormData(object) {
    const formData = new FormData();
    function processValue(value) {
        // Handle reactive values with .value property (refs)
        if (value && typeof value === "object" && "value" in value) {
            return value.value;
        }
        return value;
    }
    function appendToFormData(obj, prefix = "") {
        if (obj === null || obj === undefined) {
            return;
        }
        // Handle unwrapping of reactive values
        obj = processValue(obj);
        if (obj instanceof File) {
            formData.append(prefix, obj);
        }
        else if (Array.isArray(obj)) {
            // Handle arrays of files specifically
            if (obj.length > 0 && obj[0] instanceof File) {
                obj.forEach((file) => {
                    formData.append(`${prefix}`, file);
                });
            }
            else {
                // Handle other array types
                obj.forEach((item, index) => {
                    appendToFormData(item, `${prefix}[${index}]`);
                });
            }
        }
        else if (typeof obj === "object" &&
            !(obj instanceof File) &&
            !(obj instanceof Blob) &&
            !(obj instanceof Date)) {
            Object.keys(obj).forEach((key) => {
                const value = obj[key];
                const newPrefix = prefix ? `${prefix}[${key}]` : key;
                appendToFormData(value, newPrefix);
            });
        }
        else if (obj instanceof Date) {
            formData.append(prefix, obj.toISOString());
        }
        else if (obj !== undefined) {
            formData.append(prefix, String(obj));
        }
    }
    appendToFormData(object);
    return formData;
}

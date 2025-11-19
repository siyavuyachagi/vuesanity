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
declare function getFormData(object: Record<string, any>): FormData;

export { getFormData };

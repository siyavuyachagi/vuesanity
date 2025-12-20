import { reactive } from "vue";
/**
 * Creates a strongly-typed reactive form model
 *
 * @template T - The shape of your DTO/form data
 * @param fields - Partial field configurations
 * @returns Reactive ModelConfig
 *
 * @example
 * ```ts
 * interface LoginDto {
 *   email: string;
 *   password: string;
 * }
 *
 * const form = createModel<LoginDto>({
 *   email: {
 *     value: "",
 *     validations: [required(), email()]
 *   },
 *   password: {
 *     value: "",
 *     validations: [required(), minChars(8)]
 *   }
 * });
 * ```
 */
export function createModel(fields) {
    const model = {};
    for (const key in fields) {
        const fieldConfig = fields[key];
        model[key] = {
            value: fieldConfig?.value ?? (getDefaultValue()),
            validations: fieldConfig?.validations ?? [],
            errors: fieldConfig?.errors ?? []
        };
    }
    return reactive(model);
}
/**
 * Get default value based on type
 */
function getDefaultValue() {
    return "";
}

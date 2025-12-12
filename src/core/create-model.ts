import { reactive } from "vue";
import { FieldConfig, ModelConfig } from "../types";

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
export function createModel<T extends Record<string, any>>(
  fields: Partial<{ [P in keyof T]: Partial<FieldConfig<T[P]>> }>
): ModelConfig<T> {
  const model: any = {};

  for (const key in fields) {
    const fieldConfig = fields[key];
    model[key] = {
      value: fieldConfig?.value ?? (getDefaultValue<T[typeof key]>()),
      validations: fieldConfig?.validations ?? [],
      errors: fieldConfig?.errors ?? []
    };
  }

  return reactive(model) as ModelConfig<T>;
}

/**
 * Get default value based on type
 */
function getDefaultValue<T>(): T {
  return "" as T;
}
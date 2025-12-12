import { reactive } from "vue";
import { FieldConfig, ModelConfig } from "../types";


export function createModel<T extends Record<string, any>>(
  fields: Partial<{ [P in keyof T]: Partial<FieldConfig<T[P]>> }>
) {
  const model: any = {};

  for (const key in fields) {
    model[key] = {
      value: fields[key]?.value ?? ("" as any),
      validations: fields[key]?.validations ?? [],
      errors: fields[key]?.errors ?? []
    };
  }

  return reactive(model) as ModelConfig<T>;
}

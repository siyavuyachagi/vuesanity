// src/core/create-model.ts
import { reactive } from "vue";
function createModel(fields) {
  const model = {};
  for (const key in fields) {
    const fieldConfig = fields[key];
    model[key] = {
      value: fieldConfig?.value ?? getDefaultValue(),
      validations: fieldConfig?.validations ?? [],
      errors: fieldConfig?.errors ?? []
    };
  }
  return reactive(model);
}
function getDefaultValue() {
  return "";
}

export {
  createModel
};

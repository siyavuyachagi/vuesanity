// src/core/create-model.ts
import { reactive } from "vue";
function createModel(fields) {
  const model = {};
  for (const key in fields) {
    model[key] = {
      value: fields[key]?.value ?? "",
      validations: fields[key]?.validations ?? [],
      errors: fields[key]?.errors ?? []
    };
  }
  return reactive(model);
}

export {
  createModel
};

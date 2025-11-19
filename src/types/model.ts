import { FieldConfig } from "./field";

/**
 * ModelConfig is a dictionary of field configurations.
 * @implements
 * ```ts
 * const model: ModelConfig = reactive({
      propName: {
        value: 'example@email.com',
        validations: [
            required("Field required!"),
            email()
        ],
        errors
      },
    });
```
 */
export default interface ModelConfig {
  /**
   *Model field/property name
   */
  [key: string]: FieldConfig;
}
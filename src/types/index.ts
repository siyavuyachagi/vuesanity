//types/index.ts

/**
 * Validation types
 */
export interface ValidationRule {
  (value: any): string | null;
}

/**
 * FieldConfig is an object containing fields such as `value`, `validations`, and `errors`.
 */
export interface FieldConfig {
  type?: any | any[];
  validations?: ValidationRule[];
  value?: any | any[];
  errors?: string[];
}

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
export interface ModelConfig {
  /**
   *Model field/property name
   */
  [key: string]: FieldConfig;
}

//types/index.ts

/**
 * Validation types
 */
export interface ValidationRule {
  (value: any): string | null;
}
/**
 * FieldConfig is an object of fields i.e. ```value```, ```validations```, ```errors```.
 */
export interface FieldConfig {
  validations?: ValidationRule[];
  value?: any;
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
   *Some description
   */
  [key: string]: FieldConfig;
}

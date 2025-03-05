/**
 * Validation types
 */
interface ValidationRule {
    (value: any): string | null;
}
/**
 * FieldConfig is an object of fields i.e. ```value```, ```validations```, ```errors```.
 */
interface FieldConfig {
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
interface ModelConfig {
    /**
     *Some description
     */
    [key: string]: FieldConfig;
}

export type { FieldConfig, ModelConfig, ValidationRule };

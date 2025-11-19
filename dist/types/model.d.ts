import { FieldConfig } from './field.js';
import './rule.js';

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
     *Model field/property name
     */
    [key: string]: FieldConfig;
}

export type { ModelConfig as default };

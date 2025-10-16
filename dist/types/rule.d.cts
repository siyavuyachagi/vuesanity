/**
 * Validation types
 */
interface ValidationRule {
    (value: any): string;
}

export type { ValidationRule };

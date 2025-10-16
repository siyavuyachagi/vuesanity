/**
 * Validation types
 */
interface ValidationRule {
    (value: any): string | null;
}

export type { ValidationRule };

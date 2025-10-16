/**
 * Validation types
 */
export interface ValidationRule {
    (value: any): string | null;
}
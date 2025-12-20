/**
 * Validates that a value is true, but only if the value is present.
 *
 * Works for: true, "true", 1, "1"
 */
export const mustBeTrue = (message) => {
    return (value) => {
        if (value === null || value === undefined || value === "")
            return null;
        const normalized = value === true ? true :
            value === false ? false :
                value === "true" ? true :
                    value === "false" ? false :
                        value === 1 ? true :
                            value === 0 ? false :
                                Boolean(value);
        if (normalized === false) {
            return message || "Value must be true";
        }
        return null;
    };
};

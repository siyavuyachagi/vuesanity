"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  alpha: () => alpha,
  alphanumeric: () => alphanumeric,
  chars: () => chars,
  createModel: () => createModel,
  default: () => VueSanity,
  differentFrom: () => differentFrom,
  email: () => email,
  fileExtension: () => fileExtension,
  fileSize: () => fileSize,
  fileType: () => fileType,
  getFormData: () => getFormData,
  maxChars: () => maxChars,
  maxDate: () => maxDate,
  maxFileSize: () => maxFileSize,
  maxNumber: () => maxNumber,
  minChars: () => minChars,
  minDate: () => minDate,
  minFileSize: () => minFileSize,
  minNumber: () => minNumber,
  mustBeFalse: () => mustBeFalse,
  mustBeTrue: () => mustBeTrue,
  numeric: () => numeric,
  password: () => password,
  phone: () => phone,
  rangeDate: () => rangeDate,
  rangeNumber: () => rangeNumber,
  regex: () => regex,
  required: () => required,
  sameAs: () => sameAs,
  url: () => url
});
module.exports = __toCommonJS(index_exports);

// src/core/vuesanity.ts
var import_vue = require("vue");

// src/helpers/form-data.ts
function getFormData(object) {
  const formData = new FormData();
  function processValue(value) {
    if (value && typeof value === "object" && "value" in value) {
      return value.value;
    }
    return value;
  }
  function appendToFormData(obj, prefix = "") {
    if (obj === null || obj === void 0) {
      return;
    }
    obj = processValue(obj);
    if (obj instanceof File) {
      formData.append(prefix, obj);
    } else if (Array.isArray(obj)) {
      if (obj.length > 0 && obj[0] instanceof File) {
        obj.forEach((file) => {
          formData.append(`${prefix}`, file);
        });
      } else {
        obj.forEach((item, index) => {
          appendToFormData(item, `${prefix}[${index}]`);
        });
      }
    } else if (typeof obj === "object" && !(obj instanceof File) && !(obj instanceof Blob) && !(obj instanceof Date)) {
      Object.keys(obj).forEach((key) => {
        const value = obj[key];
        const newPrefix = prefix ? `${prefix}[${key}]` : key;
        appendToFormData(value, newPrefix);
      });
    } else if (obj instanceof Date) {
      formData.append(prefix, obj.toISOString());
    } else if (obj !== void 0) {
      formData.append(prefix, String(obj));
    }
  }
  appendToFormData(object);
  return formData;
}

// src/core/vuesanity.ts
var VueSanity = class {
  /** Reactive model configuration */
  _model;
  /** Should form values be cleared after successful validation */
  _cleanValues;
  /** Validation errors keyed by field */
  errors = {};
  /** Form validation status */
  isValid = false;
  /** Normalized, validated form payload */
  normalizedModel = {};
  /** FormData representation of the validated model */
  formData = new FormData();
  /** Static helper to convert object to FormData */
  static getFormData = getFormData;
  /**
   * Constructor
   * @param modelConfig - The strongly-typed form model configuration
   * @param cleanValues - Automatically clear values after successful validation (default: true)
   */
  constructor(modelConfig, cleanValues = true) {
    this._model = (0, import_vue.reactive)(modelConfig);
    this._cleanValues = cleanValues;
    this._validate();
  }
  /** Perform validations for all fields and update state */
  _validate() {
    let valid = true;
    this._clearModelErrors();
    for (const key in this._model) {
      const field = this._model[key];
      if (!field || !field.validations) continue;
      if (!field.errors) {
        field.errors = [];
      }
      const fieldErrors = [];
      if (Array.isArray(field.value)) {
        field.value.forEach((item) => {
          field.validations.forEach((validator) => {
            const error = validator(item);
            if (error) fieldErrors.push(error);
          });
        });
      } else {
        field.validations.forEach((validator) => {
          const error = validator(field.value);
          if (error) fieldErrors.push(error);
        });
      }
      if (fieldErrors.length > 0) {
        valid = false;
        field.errors.push(...fieldErrors);
        this.errors[key] = [...fieldErrors];
      }
    }
    this.isValid = valid;
    this._normalizeModel();
  }
  /**
   * Normalizes the data model
   */
  _normalizeModel() {
    if (!this.isValid) {
      this.normalizedModel = {};
    } else {
      const result = {};
      for (const key in this._model) {
        const field = this._model[key];
        if (field && (!field.errors || field.errors.length === 0) && field.value !== void 0) {
          result[key] = field.value;
        }
      }
      this.normalizedModel = result;
      this.formData = new FormData();
      for (const key in this._model) {
        const field = this._model[key];
        if (!field) continue;
        const values = this._toArray(field.value);
        for (const val of values) {
          if (val !== null && val !== void 0) {
            this.formData.append(key, val);
          }
        }
      }
      this._deconstructor();
    }
  }
  _toArray(val) {
    if (val === void 0 || val === null) return [];
    return Array.isArray(val) ? val : [val];
  }
  /** Reset all model field errors */
  _clearModelErrors() {
    for (const key in this._model) {
      const field = this._model[key];
      if (field) field.errors = [];
    }
    this.errors = {};
  }
  /** Optionally clear all model field values */
  _clearModelValues() {
    for (const key in this._model) {
      const field = this._model[key];
      if (!field) continue;
      if (field.value !== void 0) {
        if (Array.isArray(field.value)) {
          field.value.splice(0);
        } else {
          field.value = void 0;
        }
      }
    }
  }
  /** Clean-up method called after successful validation */
  _deconstructor() {
    if (!this._model) return;
    if (this._cleanValues && this.isValid) this._clearModelValues();
    this._clearModelErrors();
  }
};

// src/core/create-model.ts
var import_vue2 = require("vue");
function createModel(fields) {
  const model = {};
  for (const key in fields) {
    const fieldConfig = fields[key];
    model[key] = {
      value: fieldConfig?.value ?? getDefaultValue(),
      validations: fieldConfig?.validations ?? [],
      errors: fieldConfig?.errors ?? []
    };
  }
  return (0, import_vue2.reactive)(model);
}
function getDefaultValue() {
  return "";
}

// src/validators/boolean/must-be-false.ts
var mustBeFalse = (message) => {
  return (value) => {
    if (value === null || value === void 0 || value === "") return null;
    const normalized = value === true ? true : value === false ? false : value === "true" ? true : value === "false" ? false : value === 1 ? true : value === 0 ? false : Boolean(value);
    if (normalized === true) {
      return message || "Value must be false";
    }
    return null;
  };
};

// src/validators/boolean/must-be-true.ts
var mustBeTrue = (message) => {
  return (value) => {
    if (value === null || value === void 0 || value === "") return null;
    const normalized = value === true ? true : value === false ? false : value === "true" ? true : value === "false" ? false : value === 1 ? true : value === 0 ? false : Boolean(value);
    if (normalized === false) {
      return message || "Value must be true";
    }
    return null;
  };
};

// src/validators/date/min-date.ts
var minDate = (minDate2, message) => {
  return (value) => {
    if (!value) return "";
    const date = new Date(value);
    const min = new Date(minDate2);
    if (isNaN(date.getTime()) || isNaN(min.getTime())) {
      return message || "Invalid date format";
    }
    if (date < min) {
      return message || `Date must be after ${min.toDateString()}`;
    }
    return "";
  };
};

// src/validators/date/max-date.ts
var maxDate = (maxDate2, message) => {
  return (value) => {
    if (!value) return "";
    const date = new Date(value);
    const max = new Date(maxDate2);
    if (isNaN(date.getTime()) || isNaN(max.getTime())) {
      return message || "Invalid date format";
    }
    if (date > max) {
      return message || `Date must be before ${max.toDateString()}`;
    }
    return "";
  };
};

// src/validators/date/range-date.ts
var rangeDate = (minDate2, maxDate2, message) => {
  return (value) => {
    if (!value) return "";
    const date = new Date(value);
    const min = new Date(minDate2);
    const max = new Date(maxDate2);
    if (isNaN(date.getTime()) || isNaN(min.getTime()) || isNaN(max.getTime())) {
      return message || "Invalid date format";
    }
    if (date < min || date > max) {
      return message || `Date must be between ${min.toDateString()} and ${max.toDateString()}`;
    }
    return "";
  };
};

// src/validators/string/alpha.ts
var alpha = (allowSpaces = true, message) => {
  return (value) => {
    if (!value) return null;
    const pattern = allowSpaces ? /^[a-zA-Z\s]*$/ : /^[a-zA-Z]*$/;
    if (!pattern.test(value)) {
      return message || "Only alphabetic characters are allowed";
    }
    return null;
  };
};

// src/validators/string/alphanumeric.ts
var alphanumeric = (allowSpaces = false, message) => {
  return (value) => {
    if (!value) return null;
    const pattern = allowSpaces ? /^[a-zA-Z0-9\s]*$/ : /^[a-zA-Z0-9]*$/;
    if (!pattern.test(value)) {
      return message || "Only alphanumeric characters are allowed";
    }
    return null;
  };
};

// src/validators/string/chars.ts
var chars = (length, message) => {
  return (value) => {
    if (!value) return null;
    if (value.length !== length) {
      return message || `Number of characters required is ${length}`;
    }
    return null;
  };
};

// src/validators/string/different-from.ts
var differentFrom = (compareValue, message) => {
  return (value) => {
    if (!value) return "";
    const valueToCompare = typeof compareValue === "function" ? compareValue() : compareValue;
    if (value === valueToCompare) {
      return message || "Value must be different";
    }
    return "";
  };
};

// src/validators/string/email.ts
var email = (allowedDomains, message) => {
  const domains = Array.isArray(allowedDomains) ? allowedDomains : allowedDomains ? [allowedDomains] : [];
  return (value) => {
    if (!value) return null;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      return message || "Invalid email format";
    }
    const domain = value.split("@")[1].toLowerCase();
    if (domains.length > 0 && !domains.map((d) => d.toLowerCase()).includes(domain)) {
      return message || `Email domain must be one of: ${domains.join(", ")}`;
    }
    return null;
  };
};

// src/validators/string/max-chars.ts
var maxChars = (length, message) => {
  return (value) => {
    if (!value) return null;
    if (value.length > length) {
      return message || `Maximum length of ${length} characters required`;
    }
    return null;
  };
};

// src/validators/string/min-chars.ts
var minChars = (length, message) => {
  return (value) => {
    const str = String(value);
    if (str.length < length) {
      return message || `Minimum length of ${length} characters required`;
    }
    return null;
  };
};

// src/validators/string/numeric.ts
var numeric = (allowDecimals = false, allowNegative = false, message) => {
  return (value) => {
    if (!value) return "";
    let pattern;
    if (allowDecimals) {
      pattern = allowNegative ? /^-?\d+(\.\d+)?$/ : /^\d+(\.\d+)?$/;
    } else {
      pattern = allowNegative ? /^-?\d+$/ : /^\d+$/;
    }
    if (!pattern.test(String(value))) {
      return message || "Only numeric values are allowed";
    }
    return "";
  };
};

// src/validators/string/password.ts
var password = (message) => {
  return (value) => {
    if (!value || String(value).length === 0) {
      return message || "Password must have 6 characters or more";
    }
    const str = String(value);
    if (str.length < 6) {
      return message || "Password must have 6 characters or more";
    }
    const lower = str.toLowerCase();
    if ([...lower].every((c) => c === lower[0])) {
      return "Password cannot consist of the same repeated character";
    }
    const specialPattern = /[!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~]/;
    if (!specialPattern.test(str)) {
      return message || "Password must include at least one special character";
    }
    return null;
  };
};

// src/helpers/country-codes.ts
var countryPhoneData = [
  { iso: "AF", countryCode: "+93", country: "Afghanistan", minLength: 9, maxLength: 9, hasLeadingZero: false },
  { iso: "AL", countryCode: "+355", country: "Albania", minLength: 8, maxLength: 9, hasLeadingZero: true },
  { iso: "DZ", countryCode: "+213", country: "Algeria", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "AS", countryCode: "+1", country: "American Samoa", minLength: 10, maxLength: 10, hasLeadingZero: false },
  { iso: "AD", countryCode: "+376", country: "Andorra", minLength: 6, maxLength: 6, hasLeadingZero: false },
  { iso: "AO", countryCode: "+244", country: "Angola", minLength: 9, maxLength: 9, hasLeadingZero: false },
  { iso: "AI", countryCode: "+1", country: "Anguilla", minLength: 10, maxLength: 10, hasLeadingZero: false },
  { iso: "AG", countryCode: "+1", country: "Antigua and Barbuda", minLength: 10, maxLength: 10, hasLeadingZero: false },
  { iso: "AR", countryCode: "+54", country: "Argentina", minLength: 10, maxLength: 10, hasLeadingZero: true },
  { iso: "AM", countryCode: "+374", country: "Armenia", minLength: 8, maxLength: 8, hasLeadingZero: true },
  { iso: "AW", countryCode: "+297", country: "Aruba", minLength: 7, maxLength: 7, hasLeadingZero: false },
  { iso: "AU", countryCode: "+61", country: "Australia", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "AT", countryCode: "+43", country: "Austria", minLength: 10, maxLength: 11, hasLeadingZero: true },
  { iso: "AZ", countryCode: "+994", country: "Azerbaijan", minLength: 9, maxLength: 9, hasLeadingZero: false },
  { iso: "BS", countryCode: "+1", country: "Bahamas", minLength: 10, maxLength: 10, hasLeadingZero: false },
  { iso: "BH", countryCode: "+973", country: "Bahrain", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "BD", countryCode: "+880", country: "Bangladesh", minLength: 10, maxLength: 10, hasLeadingZero: true },
  { iso: "BB", countryCode: "+1", country: "Barbados", minLength: 10, maxLength: 10, hasLeadingZero: false },
  { iso: "BY", countryCode: "+375", country: "Belarus", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "BE", countryCode: "+32", country: "Belgium", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "BZ", countryCode: "+501", country: "Belize", minLength: 7, maxLength: 7, hasLeadingZero: false },
  { iso: "BJ", countryCode: "+229", country: "Benin", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "BM", countryCode: "+1", country: "Bermuda", minLength: 10, maxLength: 10, hasLeadingZero: false },
  { iso: "BT", countryCode: "+975", country: "Bhutan", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "BO", countryCode: "+591", country: "Bolivia", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "BA", countryCode: "+387", country: "Bosnia and Herzegovina", minLength: 8, maxLength: 8, hasLeadingZero: true },
  { iso: "BW", countryCode: "+267", country: "Botswana", minLength: 7, maxLength: 7, hasLeadingZero: false },
  { iso: "BR", countryCode: "+55", country: "Brazil", minLength: 10, maxLength: 11, hasLeadingZero: true },
  { iso: "IO", countryCode: "+246", country: "British Indian Ocean Territory", minLength: 7, maxLength: 7, hasLeadingZero: false },
  { iso: "VG", countryCode: "+1", country: "British Virgin Islands", minLength: 10, maxLength: 10, hasLeadingZero: false },
  { iso: "BN", countryCode: "+673", country: "Brunei", minLength: 7, maxLength: 7, hasLeadingZero: false },
  { iso: "BG", countryCode: "+359", country: "Bulgaria", minLength: 8, maxLength: 9, hasLeadingZero: true },
  { iso: "BF", countryCode: "+226", country: "Burkina Faso", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "MM", countryCode: "+95", country: "Myanmar", minLength: 8, maxLength: 8, hasLeadingZero: true },
  { iso: "BI", countryCode: "+257", country: "Burundi", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "KH", countryCode: "+855", country: "Cambodia", minLength: 8, maxLength: 8, hasLeadingZero: true },
  { iso: "CM", countryCode: "+237", country: "Cameroon", minLength: 8, maxLength: 9, hasLeadingZero: false },
  { iso: "CA", countryCode: "+1", country: "Canada", minLength: 10, maxLength: 10, hasLeadingZero: false },
  { iso: "CV", countryCode: "+238", country: "Cape Verde", minLength: 7, maxLength: 7, hasLeadingZero: false },
  { iso: "KY", countryCode: "+1", country: "Cayman Islands", minLength: 10, maxLength: 10, hasLeadingZero: false },
  { iso: "CF", countryCode: "+236", country: "Central African Republic", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "TD", countryCode: "+235", country: "Chad", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "CL", countryCode: "+56", country: "Chile", minLength: 9, maxLength: 9, hasLeadingZero: false },
  { iso: "CN", countryCode: "+86", country: "China", minLength: 11, maxLength: 13, hasLeadingZero: false },
  { iso: "CX", countryCode: "+61", country: "Christmas Island", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "CC", countryCode: "+61", country: "Cocos Islands", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "CO", countryCode: "+57", country: "Colombia", minLength: 10, maxLength: 10, hasLeadingZero: true },
  { iso: "KM", countryCode: "+269", country: "Comoros", minLength: 7, maxLength: 7, hasLeadingZero: false },
  { iso: "CG", countryCode: "+242", country: "Republic of Congo", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "CD", countryCode: "+243", country: "Democratic Republic of Congo", minLength: 9, maxLength: 9, hasLeadingZero: false },
  { iso: "CK", countryCode: "+682", country: "Cook Islands", minLength: 5, maxLength: 5, hasLeadingZero: false },
  { iso: "CR", countryCode: "+506", country: "Costa Rica", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "CI", countryCode: "+225", country: "Ivory Coast", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "HR", countryCode: "+385", country: "Croatia", minLength: 8, maxLength: 8, hasLeadingZero: true },
  { iso: "CU", countryCode: "+53", country: "Cuba", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "CY", countryCode: "+357", country: "Cyprus", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "CZ", countryCode: "+420", country: "Czech Republic", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "DK", countryCode: "+45", country: "Denmark", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "DJ", countryCode: "+253", country: "Djibouti", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "DM", countryCode: "+1", country: "Dominica", minLength: 10, maxLength: 10, hasLeadingZero: false },
  { iso: "DO", countryCode: "+1", country: "Dominican Republic", minLength: 10, maxLength: 10, hasLeadingZero: false },
  { iso: "EC", countryCode: "+593", country: "Ecuador", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "EG", countryCode: "+20", country: "Egypt", minLength: 10, maxLength: 10, hasLeadingZero: true },
  { iso: "SV", countryCode: "+503", country: "El Salvador", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "GQ", countryCode: "+240", country: "Equatorial Guinea", minLength: 9, maxLength: 9, hasLeadingZero: false },
  { iso: "ER", countryCode: "+291", country: "Eritrea", minLength: 7, maxLength: 7, hasLeadingZero: false },
  { iso: "EE", countryCode: "+372", country: "Estonia", minLength: 7, maxLength: 7, hasLeadingZero: false },
  { iso: "ET", countryCode: "+251", country: "Ethiopia", minLength: 9, maxLength: 9, hasLeadingZero: false },
  { iso: "FK", countryCode: "+500", country: "Falkland Islands", minLength: 5, maxLength: 5, hasLeadingZero: false },
  { iso: "FO", countryCode: "+298", country: "Faroe Islands", minLength: 6, maxLength: 6, hasLeadingZero: false },
  { iso: "FJ", countryCode: "+679", country: "Fiji", minLength: 7, maxLength: 7, hasLeadingZero: false },
  { iso: "FI", countryCode: "+358", country: "Finland", minLength: 7, maxLength: 7, hasLeadingZero: true },
  { iso: "FR", countryCode: "+33", country: "France", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "GF", countryCode: "+594", country: "French Guiana", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "PF", countryCode: "+689", country: "French Polynesia", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "TF", countryCode: "+262", country: "French Southern Territories", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "GA", countryCode: "+241", country: "Gabon", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "GM", countryCode: "+220", country: "Gambia", minLength: 7, maxLength: 7, hasLeadingZero: false },
  { iso: "GE", countryCode: "+995", country: "Georgia", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "DE", countryCode: "+49", country: "Germany", minLength: 10, maxLength: 11, hasLeadingZero: true },
  { iso: "GH", countryCode: "+233", country: "Ghana", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "GI", countryCode: "+350", country: "Gibraltar", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "GR", countryCode: "+30", country: "Greece", minLength: 10, maxLength: 10, hasLeadingZero: true },
  { iso: "GL", countryCode: "+299", country: "Greenland", minLength: 6, maxLength: 6, hasLeadingZero: false },
  { iso: "GD", countryCode: "+1", country: "Grenada", minLength: 10, maxLength: 10, hasLeadingZero: false },
  { iso: "GP", countryCode: "+590", country: "Guadeloupe", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "GU", countryCode: "+1", country: "Guam", minLength: 10, maxLength: 10, hasLeadingZero: false },
  { iso: "GT", countryCode: "+502", country: "Guatemala", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "GG", countryCode: "+44", country: "Guernsey", minLength: 10, maxLength: 10, hasLeadingZero: true },
  { iso: "GN", countryCode: "+224", country: "Guinea", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "GW", countryCode: "+245", country: "Guinea-Bissau", minLength: 7, maxLength: 7, hasLeadingZero: false },
  { iso: "GY", countryCode: "+592", country: "Guyana", minLength: 7, maxLength: 7, hasLeadingZero: false },
  { iso: "HT", countryCode: "+509", country: "Haiti", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "HN", countryCode: "+504", country: "Honduras", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "HK", countryCode: "+852", country: "Hong Kong", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "HU", countryCode: "+36", country: "Hungary", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "IS", countryCode: "+354", country: "Iceland", minLength: 7, maxLength: 7, hasLeadingZero: false },
  { iso: "IN", countryCode: "+91", country: "India", minLength: 10, maxLength: 10, hasLeadingZero: true },
  { iso: "ID", countryCode: "+62", country: "Indonesia", minLength: 9, maxLength: 11, hasLeadingZero: true },
  { iso: "IR", countryCode: "+98", country: "Iran", minLength: 10, maxLength: 11, hasLeadingZero: true },
  { iso: "IQ", countryCode: "+964", country: "Iraq", minLength: 10, maxLength: 10, hasLeadingZero: true },
  { iso: "IE", countryCode: "+353", country: "Ireland", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "IM", countryCode: "+44", country: "Isle of Man", minLength: 10, maxLength: 10, hasLeadingZero: true },
  { iso: "IL", countryCode: "+972", country: "Israel", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "IT", countryCode: "+39", country: "Italy", minLength: 10, maxLength: 10, hasLeadingZero: true },
  { iso: "JM", countryCode: "+1", country: "Jamaica", minLength: 10, maxLength: 10, hasLeadingZero: false },
  { iso: "JP", countryCode: "+81", country: "Japan", minLength: 10, maxLength: 10, hasLeadingZero: true },
  { iso: "JE", countryCode: "+44", country: "Jersey", minLength: 10, maxLength: 10, hasLeadingZero: true },
  { iso: "JO", countryCode: "+962", country: "Jordan", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "KZ", countryCode: "+7", country: "Kazakhstan", minLength: 10, maxLength: 10, hasLeadingZero: true },
  { iso: "KE", countryCode: "+254", country: "Kenya", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "KI", countryCode: "+686", country: "Kiribati", minLength: 5, maxLength: 5, hasLeadingZero: false },
  { iso: "KP", countryCode: "+850", country: "North Korea", minLength: 10, maxLength: 10, hasLeadingZero: false },
  { iso: "KR", countryCode: "+82", country: "South Korea", minLength: 10, maxLength: 10, hasLeadingZero: true },
  { iso: "KW", countryCode: "+965", country: "Kuwait", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "KG", countryCode: "+996", country: "Kyrgyzstan", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "LA", countryCode: "+856", country: "Laos", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "LV", countryCode: "+371", country: "Latvia", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "LB", countryCode: "+961", country: "Lebanon", minLength: 8, maxLength: 8, hasLeadingZero: true },
  { iso: "LS", countryCode: "+266", country: "Lesotho", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "LR", countryCode: "+231", country: "Liberia", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "LY", countryCode: "+218", country: "Libya", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "LI", countryCode: "+423", country: "Liechtenstein", minLength: 7, maxLength: 7, hasLeadingZero: false },
  { iso: "LT", countryCode: "+370", country: "Lithuania", minLength: 8, maxLength: 8, hasLeadingZero: true },
  { iso: "LU", countryCode: "+352", country: "Luxembourg", minLength: 9, maxLength: 9, hasLeadingZero: false },
  { iso: "MO", countryCode: "+853", country: "Macau", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "MK", countryCode: "+389", country: "Macedonia", minLength: 8, maxLength: 8, hasLeadingZero: true },
  { iso: "MG", countryCode: "+261", country: "Madagascar", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "MW", countryCode: "+265", country: "Malawi", minLength: 7, maxLength: 7, hasLeadingZero: false },
  { iso: "MY", countryCode: "+60", country: "Malaysia", minLength: 9, maxLength: 10, hasLeadingZero: true },
  { iso: "MV", countryCode: "+960", country: "Maldives", minLength: 7, maxLength: 7, hasLeadingZero: false },
  { iso: "ML", countryCode: "+223", country: "Mali", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "MT", countryCode: "+356", country: "Malta", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "MH", countryCode: "+692", country: "Marshall Islands", minLength: 7, maxLength: 7, hasLeadingZero: false },
  { iso: "MQ", countryCode: "+596", country: "Martinique", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "MR", countryCode: "+222", country: "Mauritania", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "MU", countryCode: "+230", country: "Mauritius", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "YT", countryCode: "+262", country: "Mayotte", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "MX", countryCode: "+52", country: "Mexico", minLength: 10, maxLength: 10, hasLeadingZero: true },
  { iso: "FM", countryCode: "+691", country: "Micronesia", minLength: 7, maxLength: 7, hasLeadingZero: false },
  { iso: "MD", countryCode: "+373", country: "Moldova", minLength: 8, maxLength: 8, hasLeadingZero: true },
  { iso: "MC", countryCode: "+377", country: "Monaco", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "MN", countryCode: "+976", country: "Mongolia", minLength: 8, maxLength: 8, hasLeadingZero: true },
  { iso: "ME", countryCode: "+382", country: "Montenegro", minLength: 8, maxLength: 8, hasLeadingZero: true },
  { iso: "MA", countryCode: "+212", country: "Morocco", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "MZ", countryCode: "+258", country: "Mozambique", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "NA", countryCode: "+264", country: "Namibia", minLength: 8, maxLength: 8, hasLeadingZero: true },
  { iso: "NR", countryCode: "+674", country: "Nauru", minLength: 5, maxLength: 5, hasLeadingZero: false },
  { iso: "NP", countryCode: "+977", country: "Nepal", minLength: 10, maxLength: 10, hasLeadingZero: true },
  { iso: "NL", countryCode: "+31", country: "Netherlands", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "AN", countryCode: "+599", country: "Netherlands Antilles", minLength: 7, maxLength: 7, hasLeadingZero: false },
  { iso: "NC", countryCode: "+687", country: "New Caledonia", minLength: 6, maxLength: 6, hasLeadingZero: false },
  { iso: "NZ", countryCode: "+64", country: "New Zealand", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "NI", countryCode: "+505", country: "Nicaragua", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "NE", countryCode: "+227", country: "Niger", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "NG", countryCode: "+234", country: "Nigeria", minLength: 10, maxLength: 10, hasLeadingZero: true },
  { iso: "NU", countryCode: "+683", country: "Niue", minLength: 4, maxLength: 4, hasLeadingZero: false },
  { iso: "NF", countryCode: "+672", country: "Norfolk Island", minLength: 6, maxLength: 6, hasLeadingZero: false },
  { iso: "MP", countryCode: "+1", country: "Northern Mariana Islands", minLength: 10, maxLength: 10, hasLeadingZero: false },
  { iso: "NO", countryCode: "+47", country: "Norway", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "OM", countryCode: "+968", country: "Oman", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "PK", countryCode: "+92", country: "Pakistan", minLength: 10, maxLength: 10, hasLeadingZero: true },
  { iso: "PW", countryCode: "+680", country: "Palau", minLength: 7, maxLength: 7, hasLeadingZero: false },
  { iso: "PA", countryCode: "+507", country: "Panama", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "PG", countryCode: "+675", country: "Papua New Guinea", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "PY", countryCode: "+595", country: "Paraguay", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "PE", countryCode: "+51", country: "Peru", minLength: 9, maxLength: 9, hasLeadingZero: false },
  { iso: "PH", countryCode: "+63", country: "Philippines", minLength: 10, maxLength: 10, hasLeadingZero: true },
  { iso: "PN", countryCode: "+64", country: "Pitcairn Islands", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "PL", countryCode: "+48", country: "Poland", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "PT", countryCode: "+351", country: "Portugal", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "PR", countryCode: "+1", country: "Puerto Rico", minLength: 10, maxLength: 10, hasLeadingZero: false },
  { iso: "QA", countryCode: "+974", country: "Qatar", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "RE", countryCode: "+262", country: "Reunion", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "RO", countryCode: "+40", country: "Romania", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "RU", countryCode: "+7", country: "Russia", minLength: 10, maxLength: 10, hasLeadingZero: true },
  { iso: "RW", countryCode: "+250", country: "Rwanda", minLength: 9, maxLength: 9, hasLeadingZero: false },
  { iso: "BL", countryCode: "+590", country: "Saint Barth\xE9lemy", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "KN", countryCode: "+1", country: "Saint Kitts and Nevis", minLength: 10, maxLength: 10, hasLeadingZero: false },
  { iso: "LC", countryCode: "+1", country: "Saint Lucia", minLength: 10, maxLength: 10, hasLeadingZero: false },
  { iso: "MF", countryCode: "+590", country: "Saint Martin", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "VC", countryCode: "+1", country: "Saint Vincent and the Grenadines", minLength: 10, maxLength: 10, hasLeadingZero: false },
  { iso: "WS", countryCode: "+685", country: "Samoa", minLength: 7, maxLength: 7, hasLeadingZero: false },
  { iso: "SM", countryCode: "+378", country: "San Marino", minLength: 10, maxLength: 10, hasLeadingZero: false },
  { iso: "ST", countryCode: "+239", country: "S\xE3o Tom\xE9 and Pr\xEDncipe", minLength: 7, maxLength: 7, hasLeadingZero: false },
  { iso: "SA", countryCode: "+966", country: "Saudi Arabia", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "SN", countryCode: "+221", country: "Senegal", minLength: 9, maxLength: 9, hasLeadingZero: false },
  { iso: "RS", countryCode: "+381", country: "Serbia", minLength: 9, maxLength: 10, hasLeadingZero: true },
  { iso: "SC", countryCode: "+248", country: "Seychelles", minLength: 7, maxLength: 7, hasLeadingZero: false },
  { iso: "SL", countryCode: "+232", country: "Sierra Leone", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "SG", countryCode: "+65", country: "Singapore", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "SK", countryCode: "+421", country: "Slovakia", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "SI", countryCode: "+386", country: "Slovenia", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "SB", countryCode: "+677", country: "Solomon Islands", minLength: 5, maxLength: 5, hasLeadingZero: false },
  { iso: "SO", countryCode: "+252", country: "Somalia", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "ZA", countryCode: "+27", country: "South Africa", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "SS", countryCode: "+211", country: "South Sudan", minLength: 9, maxLength: 9, hasLeadingZero: false },
  { iso: "ES", countryCode: "+34", country: "Spain", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "LK", countryCode: "+94", country: "Sri Lanka", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "PM", countryCode: "+508", country: "Saint Pierre and Miquelon", minLength: 6, maxLength: 6, hasLeadingZero: false },
  { iso: "SD", countryCode: "+249", country: "Sudan", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "SR", countryCode: "+597", country: "Suriname", minLength: 7, maxLength: 7, hasLeadingZero: false },
  { iso: "SE", countryCode: "+46", country: "Sweden", minLength: 8, maxLength: 9, hasLeadingZero: true },
  { iso: "CH", countryCode: "+41", country: "Switzerland", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "SY", countryCode: "+963", country: "Syria", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "TW", countryCode: "+886", country: "Taiwan", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "TJ", countryCode: "+992", country: "Tajikistan", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "TZ", countryCode: "+255", country: "Tanzania", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "TH", countryCode: "+66", country: "Thailand", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "TL", countryCode: "+670", country: "Timor-Leste", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "TG", countryCode: "+228", country: "Togo", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "TK", countryCode: "+690", country: "Tokelau", minLength: 4, maxLength: 4, hasLeadingZero: false },
  { iso: "TO", countryCode: "+676", country: "Tonga", minLength: 5, maxLength: 5, hasLeadingZero: false },
  { iso: "TT", countryCode: "+1", country: "Trinidad and Tobago", minLength: 10, maxLength: 10, hasLeadingZero: false },
  { iso: "TN", countryCode: "+216", country: "Tunisia", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "TR", countryCode: "+90", country: "Turkey", minLength: 10, maxLength: 10, hasLeadingZero: true },
  { iso: "TM", countryCode: "+993", country: "Turkmenistan", minLength: 8, maxLength: 8, hasLeadingZero: false },
  { iso: "TV", countryCode: "+688", country: "Tuvalu", minLength: 5, maxLength: 5, hasLeadingZero: false },
  { iso: "UG", countryCode: "+256", country: "Uganda", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "UA", countryCode: "+380", country: "Ukraine", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "AE", countryCode: "+971", country: "United Arab Emirates", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "GB", countryCode: "+44", country: "United Kingdom", minLength: 10, maxLength: 11, hasLeadingZero: true },
  { iso: "US", countryCode: "+1", country: "United States", minLength: 10, maxLength: 10, hasLeadingZero: false },
  { iso: "UY", countryCode: "+598", country: "Uruguay", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "UZ", countryCode: "+998", country: "Uzbekistan", minLength: 9, maxLength: 9, hasLeadingZero: false },
  { iso: "VU", countryCode: "+678", country: "Vanuatu", minLength: 5, maxLength: 5, hasLeadingZero: false },
  { iso: "VA", countryCode: "+39", country: "Vatican City", minLength: 10, maxLength: 10, hasLeadingZero: true },
  { iso: "VE", countryCode: "+58", country: "Venezuela", minLength: 10, maxLength: 10, hasLeadingZero: true },
  { iso: "VN", countryCode: "+84", country: "Vietnam", minLength: 9, maxLength: 10, hasLeadingZero: true },
  { iso: "VI", countryCode: "+1", country: "US Virgin Islands", minLength: 10, maxLength: 10, hasLeadingZero: false },
  { iso: "WF", countryCode: "+681", country: "Wallis and Futuna", minLength: 6, maxLength: 6, hasLeadingZero: false },
  { iso: "EH", countryCode: "+212", country: "Western Sahara", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "YE", countryCode: "+967", country: "Yemen", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "ZM", countryCode: "+260", country: "Zambia", minLength: 9, maxLength: 9, hasLeadingZero: true },
  { iso: "ZW", countryCode: "+263", country: "Zimbabwe", minLength: 9, maxLength: 9, hasLeadingZero: true }
];
var getCountryByISO = (iso) => {
  return countryPhoneData.find((c) => c.iso.toUpperCase() === iso.toUpperCase());
};
var getAllCountryCodes = () => {
  return countryPhoneData.map((c) => c.countryCode);
};

// src/validators/string/phone.ts
var phone = (locale, message) => {
  return (value) => {
    if (!value) return "";
    if (typeof value !== "string" && typeof value !== "number") {
      return message || "Invalid phone number!";
    }
    const phoneNumber = typeof value === "number" ? value.toString() : value;
    if (locale) {
      const countryData = getCountryByISO(locale);
      if (!countryData) {
        return "Invalid country code";
      }
      const digitsOnly = phoneNumber.replace(/\D/g, "");
      const countryCodeDigits = countryData.countryCode.replace(/\D/g, "");
      let nationalNumber = digitsOnly;
      if (digitsOnly.startsWith(countryCodeDigits)) {
        nationalNumber = digitsOnly.substring(countryCodeDigits.length);
      } else if (phoneNumber.startsWith("0") && countryData.hasLeadingZero) {
        nationalNumber = digitsOnly.substring(1);
      }
      if (nationalNumber.length < countryData.minLength) {
        return message || `Phone number too short for ${countryData.country}. Minimum: ${countryData.minLength} digits`;
      }
      if (nationalNumber.length > countryData.maxLength) {
        return message || `Phone number too long for ${countryData.country}. Maximum: ${countryData.maxLength} digits`;
      }
      return "";
    }
    const validCountryCodes = getAllCountryCodes();
    let isValidCountry = false;
    for (const code of validCountryCodes) {
      if (phoneNumber.startsWith(code)) {
        isValidCountry = true;
        break;
      }
    }
    const e164Pattern = /^\+?[1-9]\d{1,14}$/;
    if (!e164Pattern.test(phoneNumber)) {
      return message || "Invalid phone number format. Use E.164 format: +[country code][number]";
    }
    if (!isValidCountry && phoneNumber.startsWith("+")) {
      return message || "Invalid country code";
    }
    return "";
  };
};

// src/validators/string/regex.ts
var regex = (pattern, message) => {
  return (value) => {
    if (!value) return "";
    if (!pattern.test(value)) {
      return message || "Value does not match the required pattern";
    }
    return "";
  };
};

// src/validators/string/required.ts
var required = (message = "This field is required") => {
  return (value) => {
    if (value === null || value === void 0 || value === "") {
      return message;
    }
    if (typeof value === "string" && value.trim() === "") {
      return message;
    }
    return "";
  };
};

// src/validators/string/same-as.ts
var sameAs = (compareValue, message) => {
  return (value) => {
    if (!value) return "";
    const valueToCompare = typeof compareValue === "function" ? compareValue() : compareValue;
    if (value !== valueToCompare) {
      return message || "Values don't match";
    }
    return "";
  };
};

// src/validators/string/url.ts
var url = (message) => {
  return (value) => {
    if (!value) return null;
    try {
      new URL(value);
      return null;
    } catch {
      return message || "Invalid URL format";
    }
  };
};

// src/validators/file/file-extension.ts
var fileExtension = (extensions, message) => {
  const normalizedExtensions = (Array.isArray(extensions) ? extensions : [extensions]).map((ext) => ext.toLowerCase().replace(/^\./, ""));
  return (value) => {
    if (!value) return "";
    if (!(value instanceof File)) return "";
    const extension = value.name.substring(value.name.lastIndexOf(".") + 1);
    if (!normalizedExtensions.includes(extension)) {
      return message || `File ${value.name} not supported.`;
    }
    return "";
  };
};

// src/validators/file/max-file-size.ts
var maxFileSize = (sizeMB, message) => {
  return (value) => {
    if (!value) return "";
    if (!(value instanceof File)) return "";
    const sizeInMB = value.size / (1024 * 1024);
    if (sizeInMB > sizeMB) {
      return message || `Maximum file size of ${sizeMB} MB exceeded.`;
    }
    return "";
  };
};

// src/validators/file/min-file-size.ts
var minFileSize = (sizeMB, message) => {
  return (value) => {
    if (!value) return "";
    if (!(value instanceof File)) return "";
    const sizeInMB = value.size / (1024 * 1024);
    if (sizeInMB < sizeMB) {
      return message || `Minimum file size of ${sizeMB} MB required.`;
    }
    return "";
  };
};

// src/validators/file/file-size.ts
var fileSize = (sizeMB, message) => {
  return (value) => {
    if (!value) return "";
    if (!(value instanceof File)) return "";
    const sizeInMB = value.size / (1024 * 1024);
    if (sizeInMB !== sizeMB) {
      return message || `File must be exactly ${sizeMB} MB in size.`;
    }
    return "";
  };
};

// src/validators/file/file-type.ts
var fileType = (allowedTypes, message) => {
  const types = Array.isArray(allowedTypes) ? allowedTypes : [allowedTypes];
  return (value) => {
    if (!value) return "";
    if (!(value instanceof File)) return "";
    if (!types.includes(value.type)) {
      return message || `Invalid file type. Allowed types: ${types.join(", ")}`;
    }
    return "";
  };
};

// src/validators/number/min-number.ts
var minNumber = (min, message) => {
  return (value) => {
    if (value === null || value === void 0 || value === "") return "";
    const numValue = Number(value);
    if (isNaN(numValue) || numValue < min) {
      return message || `Value must be at least ${min}`;
    }
    return "";
  };
};

// src/validators/number/max-number.ts
var maxNumber = (max, message) => {
  return (value) => {
    if (value === null || value === void 0 || value === "") return "";
    const numValue = Number(value);
    if (isNaN(numValue) || numValue > max) {
      return message || `Value cannot exceed ${max}`;
    }
    return "";
  };
};

// src/validators/number/range-number.ts
var rangeNumber = (min, max, message) => {
  return (value) => {
    if (value === null || value === void 0 || value === "") return "";
    const numValue = Number(value);
    if (isNaN(numValue) || numValue < min || numValue > max) {
      return message || `Value must be between ${min} and ${max}`;
    }
    return "";
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  alpha,
  alphanumeric,
  chars,
  createModel,
  differentFrom,
  email,
  fileExtension,
  fileSize,
  fileType,
  getFormData,
  maxChars,
  maxDate,
  maxFileSize,
  maxNumber,
  minChars,
  minDate,
  minFileSize,
  minNumber,
  mustBeFalse,
  mustBeTrue,
  numeric,
  password,
  phone,
  rangeDate,
  rangeNumber,
  regex,
  required,
  sameAs,
  url
});

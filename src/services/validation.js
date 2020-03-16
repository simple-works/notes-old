//==============================================================================
// ■ Validation (validation.js)
//------------------------------------------------------------------------------
//     VeeValidate Rules.
//==============================================================================
import { extend } from "vee-validate";
import {
  required,
  alpha_num,
  email,
  confirmed,
  min,
  max
} from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "{_field_} field is required"
});

extend("alpha_num", {
  ...alpha_num,
  message: "{_field_} field contains invalid characters"
});

extend("email", {
  ...email,
  message: "{_field_} field format is invalid"
});

extend("confirmed", {
  ...confirmed,
  message: "{_field_} field confirmation is incorrect"
});

extend("min", {
  ...min,
  message: "{_field_} field must have at least {length} characters"
});

extend("max", {
  ...max,
  message: "{_field_} must have at most {length} characters"
});

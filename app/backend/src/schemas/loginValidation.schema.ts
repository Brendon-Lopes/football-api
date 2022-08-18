import * as Joi from 'joi';

const invalidFieldsError = 'All fields must be filled';
const invalidEmailError = 'Invalid email';
const passwordLengthError = 'Password must be at least 6 characters long';

const loginSchema = Joi.object({
  email: Joi.string().email().required()
    .messages({
      'string.email': invalidEmailError,
      'any.required': invalidFieldsError,
      'string.empty': invalidFieldsError,
    }),
  password: Joi.string().min(6).required().empty()
    .messages({
      'any.required': invalidFieldsError,
      'string.min': passwordLengthError,
      'string.empty': invalidFieldsError,
    }),
});

export default loginSchema;

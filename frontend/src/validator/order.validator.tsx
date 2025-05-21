import Joi from 'joi';

const valueCourse = ['FS', 'QACX', 'JCX', 'JSCX', 'FE', 'PCX'];
const valueCourseFormat = ['static', 'online'];
const valueCourse_type = ['pro', 'minimal', 'premium', 'incubator', 'vip'];
const valueStatus = ['In_work', 'New', 'Aggre', 'Disaggre', 'Dubbing'];

const orderValidator = Joi.object({
  name: Joi.string().optional().max(25).messages({
    "string.max": "max is 25"
  }),
  surname: Joi.string().optional().max(25).messages({
    "string.max": "max is 25"
  }),
  email: Joi.string().optional().max(100).pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/).messages({
    "string.max": "max is 100",
    "string.pattern.base": "Будь ласка, введіть дійсну електронну адресу"
  }),
  phone: Joi.string().optional().length(12).pattern(/^380\d{9}$/).messages({
    "string.length": "Номер телефону повинен містити рівно 12 символів",
    "string.pattern.base": "Номер телефону має бути у форматі: 380XXXXXXXXX"
  }),
  age: Joi.number().optional().min(18).max(100).messages({
    "number.min": "min is 18",
    "number.max": "max is 100"
  }),
  course: Joi.string().optional().min(2).max(10).custom((value, helpers) => {
    if (!valueCourse.includes(value)) {
      return helpers.error("string.custom");
    }
    return value;
  }).messages({
    "string.min": "min is 2",
    "string.max": "max is 10",
    "string.custom": "course повинен бути один з: FS, QACX, JCX, JSCX, FE, PCX"
  }),
  course_format: Joi.string().optional().min(5).max(15).custom((value, helpers) => {
    if (!valueCourseFormat.includes(value)) {
      return helpers.error("string.custom");
    }
    return value;
  }).messages({
    "string.min": "min is 5",
    "string.max": "max is 15",
    "string.custom": "course_format повинен бути один з: static, online"
  }),
  course_type: Joi.string().optional().min(3).max(100).custom((value, helpers) => {
    if (!valueCourse_type.includes(value)) {
      return helpers.error("string.custom");
    }
    return value;
  }).messages({
    "string.min": "min is 3",
    "string.max": "max is 100",
    "string.custom": "course_type повинен бути один з: pro, minimal, premium, incubator, vip"
  }),
  sum: Joi.number(),
  alreadyPaid: Joi.number(),
  status: Joi.string().optional().min(3).max(15).custom((value, helpers) => {
    if (!valueStatus.includes(value)) {
      return helpers.error("string.custom");
    }
    return value;
  }).messages({
    "string.min": "min is 3",
    "string.max": "max is 15",
    "string.custom": "status повинен бути один з: In_work, New, Aggre, Disaggre, Dubbing"
  }),
})


export default orderValidator;
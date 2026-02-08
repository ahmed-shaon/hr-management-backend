// POST /employees — re-exports shared employee body validation.

import { employeeBodyValidationRules, validateEmployeeBody } from './validateEmployeeBody';

export const createEmployeeValidationRules = employeeBodyValidationRules;
export const validateCreateEmployee = validateEmployeeBody;

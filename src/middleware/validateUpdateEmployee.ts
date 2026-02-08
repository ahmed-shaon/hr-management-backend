// PUT /employees/:id — re-exports shared employee body validation.

import { employeeBodyValidationRules, validateEmployeeBody } from './validateEmployeeBody';

export const updateEmployeeValidationRules = employeeBodyValidationRules;
export const validateUpdateEmployee = validateEmployeeBody;

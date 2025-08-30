export const MODULE_NAMES = {
  auth: "AUTH",
  user: "USER",
  course: "COURSE",
} as const;

export type ModuleNameType = (typeof MODULE_NAMES)[keyof typeof MODULE_NAMES];

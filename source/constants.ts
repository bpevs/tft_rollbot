export const ENVIRONMENT = {
  DISCORD: "DISCORD",
  TERMINAL: "TERMINAL",
  POWER_SHELL: "POWER_SHELL",
} as const;

export type Environment = typeof ENVIRONMENT[keyof typeof ENVIRONMENT];

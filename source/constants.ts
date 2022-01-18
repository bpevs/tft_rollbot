export namespace ENVIRONMENT {
  export const DISCORD = "DISCORD";
  export const TERMINAL = "TERMINAL";
  export const POWER_SHELL = "POWER_SHELL";
}

export type Environment = typeof ENVIRONMENT[keyof typeof ENVIRONMENT];

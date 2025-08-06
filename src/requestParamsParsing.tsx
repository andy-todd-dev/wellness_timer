import { parse as parseISODuration, toSeconds } from "iso8601-duration";

export const getParameter = <T,>(
  parse: (value: string) => T | undefined,
  name: string,
  defaultValue: T
): T => {
  try {
    const params = new URLSearchParams(window.location.search);
    const value = params.get(name);
    const parsedValue = value != null ? parse(value) : undefined;
    if (parsedValue !== undefined) {
      return parsedValue;
    }
  } catch (e) {
    console.error(`Error parsing ${name} parameter:`, e);
  }
  return defaultValue;
};

export const parseBoolean = (value: string): boolean =>
  value === "true" || value === "1";

export const parseDurationAsSeconds = (value: string): number => {
  return toSeconds(parseISODuration(value));
};

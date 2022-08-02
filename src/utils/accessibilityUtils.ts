import { v4 as uuidv4 } from "uuid";

/**
 * The source of truth for handling accessbility errors.
 * The logic within may change at some point in the future.
 *
 * @param message
 */
export function handleAccessbilityError(message: string) {
  throw new Error(message);
}

/**
 * Generates unique `id` for an HTMLElement for accessibility
 * reasons, as a fallback when developers do not provide an `id`.
 *
 * @example
 * const internalId = useMemo(() => props.id || genId(), [props.id]);
 *
 * @returns uuid
 */
export function genId() {
  // if this is _not_ run server side, use `uuidv4`
  if (typeof window !== "undefined") {
    return uuidv4();
  }

  // else, use a random number between zero and ten thousand
  return Math.floor(Math.random() * 10000).toString();
}

export function isAriaDisabled(target: HTMLElement): boolean {
  return target.getAttribute("aria-disabled") === "true";
}

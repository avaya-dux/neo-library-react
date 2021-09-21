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
  return uuidv4();
}

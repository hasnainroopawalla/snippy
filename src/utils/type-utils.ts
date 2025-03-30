/**
 * Converts a string enum to a string union.
 */
export type EnumToUnion<T extends Record<string, string>> = `${T[keyof T]}`;

/**
 * Returns a string union of all possible values of T.
 */
export type UnionOfValues<T> = T[keyof T];

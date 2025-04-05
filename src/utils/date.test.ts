import { describe, it, expect } from "vitest";
import { convertDateToString, convertUTCDateStringToLocalDate } from "./date";

describe("convertDateToString", () => {
  it("should format the date correctly", () => {
    const date = new Date("2025-12-31T23:59:00");
    const formattedDate = convertDateToString(date);

    expect(formattedDate).toBe("December 31 at 23:59");
  });

  it("should handle AM/PM correctly when hour12 is false", () => {
    const date = new Date("2025-01-01T08:15:00");
    const formattedDate = convertDateToString(date);

    expect(formattedDate).toBe("January 1 at 08:15");
  });

  it("should handle midnight correctly", () => {
    const date = new Date("2025-01-01T00:00:00");
    const formattedDate = convertDateToString(date);

    expect(formattedDate).toBe("January 1 at 24:00");
  });

  it("should work with a date from the past", () => {
    const date = new Date("1990-06-15T14:30:00");
    const formattedDate = convertDateToString(date);

    expect(formattedDate).toBe("June 15 at 14:30");
  });
});

describe("convertUTCDateStringToLocalDate", () => {
  it("should handle a UTC string with Z", () => {
    const utcDateString = "2025-04-05T15:24:16.499Z";
    const result = convertUTCDateStringToLocalDate(utcDateString);

    expect(result).toBeInstanceOf(Date);
    expect(result.toISOString()).toBe(utcDateString); // Remains the same in ISO string
  });

  it("should handle a UTC string without Z", () => {
    const utcDateString = "2025-04-05T15:24:16.499";
    const result = convertUTCDateStringToLocalDate(utcDateString);

    expect(result).toBeInstanceOf(Date);
    expect(result.toISOString()).toBe(`${utcDateString}Z`);
  });
});

import { describe, expect, it } from "vitest";
import { calculateTotal } from "../calculateTotal";

describe("calculateTotal", () => {
  it("should calculate the total of newline-delimited amounts", () => {
    expect(calculateTotal("100\n100\n100")).toBe(300);
  });

  it("should calculate the total of comma-delimited amounts", () => {
    expect(calculateTotal("200,200,200")).toBe(600);
  });

  it("should calculate the total of comma and newline-delimited amounts", () => {
    expect(calculateTotal("200,200\n200")).toBe(600);
  });

  it("should ignore empty values", () => {
    expect(calculateTotal("100\n\n200,,300")).toBe(600);
  });

  it("should ignore invalid numbers", () => {
    expect(calculateTotal("100\nhello\n200")).toBe(300);
  });

  it("should return 0 when there are no valid numbers", () => {
    expect(calculateTotal("hello\nworld")).toBe(0);
  });
});
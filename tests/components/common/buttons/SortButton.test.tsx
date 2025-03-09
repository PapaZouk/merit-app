import { render } from "npm:@testing-library/preact";
import { beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { beforeEachSetup } from "../../../config/beforeEachSetup.ts";
import SortButton from "../../../../components/common/buttons/SortButton.tsx";

describe("SortButton", () => {
  beforeEach(() => beforeEachSetup());

  it("should render SortButton component", () => {
    const { container } = render(
      <SortButton handleSort={() => {}} type="test" />,
    );

    const button = container.querySelector("button");

    expect(button).not.toBeNull();
    expect(container.innerHTML.includes("test")).toBe(true);
  });

    it("should render SortButton component with additional classes", () => {
        const { container } = render(
        <SortButton handleSort={() => {}} type="test" classes="test-class" />,
        );

        const button = container.querySelector("button");

        expect(button).not.toBeNull();
        expect(button?.classList.contains("test-class")).toBe(true);
    });
});

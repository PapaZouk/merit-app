import { render } from "npm:@testing-library/preact";
import { beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { h } from "preact";
import { beforeEachSetup } from "../../../config/beforeEachSetup.ts";
import NextButton from "../../../../components/common/buttons/NextButton.tsx";

const NextButtonIcon = (): h.JSX.Element => <div>Mocked Next Icon</div>;

describe("NextButton", () => {
  beforeEach(() => beforeEachSetup());

  it("should render NextButton component", () => {
    const { container } = render(
      <NextButton handleNext={() => {}} NextButtonIcon={NextButtonIcon} />,
    );

    const button = container.querySelector("button");

    expect(button).not.toBeNull();
    expect(button?.children).toHaveLength(1);
    expect(container.innerHTML.includes("Następne")).toBe(false);
    expect(container.innerHTML.includes("Mocked Next Icon")).toBe(true);
  });

  it("should render NextButton component with text", () => {
    const { container } = render(
      <NextButton
        handleNext={() => {}}
        isTextVisible
        NextButtonIcon={NextButtonIcon}
      />,
    );

    const button = container.querySelector("button");

    expect(button).not.toBeNull();
    expect(button?.children).toHaveLength(1);
    expect(container.innerHTML.includes("Następne")).toBe(true);
    expect(container.innerHTML.includes("Mocked Next Icon")).toBe(true);
  });

  it("should render disabled NextButton", () => {
    const { container } = render(
      <NextButton
        handleNext={() => {}}
        disabled
        NextButtonIcon={NextButtonIcon}
      />,
    );

    const button = container.querySelector("button");

    expect(button).not.toBeNull();
    expect(button?.hasAttribute("disabled")).toBe(true);
    expect(button?.classList.contains("disabled:opacity-50")).toBe(true);
  });
});

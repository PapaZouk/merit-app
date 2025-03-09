import { render } from "npm:@testing-library/preact";
import { beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { h } from "preact";
import { beforeEachSetup } from "../../../config/beforeEachSetup.ts";
import PreviousButton from "../../../../components/common/buttons/PreviousButton.tsx";

const PreviousButtonIcon = (): h.JSX.Element => <div>Mocked Previous Icon</div>;

describe("PreviousButton", () => {
  beforeEach(() => beforeEachSetup());

  it("should render PreviousButton component", () => {
    const { container } = render(
      <PreviousButton
        handlePrevious={() => {}}
        PreviousButtonIcon={PreviousButtonIcon}
      />,
    );

    const button = container.querySelector("button");

    expect(button).not.toBeNull();
    expect(button?.children).toHaveLength(1);
    expect(container.innerHTML.includes("Mocked Previous Icon")).toBe(true);
    expect(container.innerHTML.includes(" Poprzednie")).toBe(false);
  });

  it("should render PreviousButton component with text", () => {
    const { container } = render(
      <PreviousButton
        handlePrevious={() => {}}
        isTextVisible
        PreviousButtonIcon={PreviousButtonIcon}
      />,
    );

    const button = container.querySelector("button");

    expect(button).not.toBeNull();
    expect(button?.children).toHaveLength(1);
    expect(container.innerHTML.includes("Mocked Previous Icon")).toBe(true);
    expect(container.innerHTML.includes(" Poprzednie")).toBe(true);
  });

  it("should render disabled PreviousButton", () => {
    const { container } = render(
        <PreviousButton
            handlePrevious={() => {}}
            disabled
            PreviousButtonIcon={PreviousButtonIcon}
        />,
    );

    const button = container.querySelector("button");

    expect(button).not.toBeNull();
    expect(button?.hasAttribute("disabled")).toBe(true);
    expect(button?.classList.contains("disabled:opacity-50")).toBe(true);
  });
});

import { render } from "npm:@testing-library/preact";
import { beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { h } from "preact";
import { beforeEachSetup } from "../../../config/beforeEachSetup.ts";
import SaveButton from "../../../../components/common/buttons/SaveButton.tsx";

const SaveButtonIcon = (): h.JSX.Element => <div>Mocked Save Icon</div>;

describe("SaveButton", () => {
  beforeEach(() => beforeEachSetup());

  it("should render SaveButton component", () => {
    const { container } = render(
      <SaveButton onClick={() => {}} SaveButtonIcon={SaveButtonIcon} />,
    );

    const button = container.querySelector("button");

    expect(button).not.toBeNull();
    expect(button?.children).toHaveLength(1);
    expect(container.innerHTML.includes("Zapisz")).toBe(true);
    expect(container.innerHTML.includes("Mocked Save Icon")).toBe(true);
  });

  it("should render disabled SaveButton", () => {
    const { container } = render(
      <SaveButton
        onClick={() => {}}
        SaveButtonIcon={SaveButtonIcon}
      />,
    );

    const button = container.querySelector("button");

    expect(button).not.toBeNull();
    expect(button?.children).toHaveLength(1);
  });
});

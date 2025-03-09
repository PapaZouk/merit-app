import { render } from "npm:@testing-library/preact";
import { beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { h } from "preact";
import { beforeEachSetup } from "../../../config/beforeEachSetup.ts";
import BackButton from "../../../../components/common/buttons/BackButton.tsx";

const MockBackButtonIcon = (): h.JSX.Element => <div>Mocked Back Icon</div>;

describe("BackButton", () => {
  beforeEach(() => beforeEachSetup());

  it("should render BackButton component", () => {
    const { container } = render(
      <BackButton href="/home" BackButtonIcon={MockBackButtonIcon} />,
    );

    const anchor = container.querySelector("a");

    expect(container.innerHTML.includes("Powrót")).toBe(true);
    expect(container.innerHTML.includes("Mocked Back Icon")).toBe(true);
    expect(anchor).not.toBeNull();
    expect(anchor?.getAttribute("href")).toBe("/home");
  });
});

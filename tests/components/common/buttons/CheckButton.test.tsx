import { render } from "npm:@testing-library/preact";
import { beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { h } from "preact";
import { beforeEachSetup } from "../../../config/beforeEachSetup.ts";
import CheckButton from "../../../../components/common/buttons/CheckButton.tsx";

const CheckButonIcon = (): h.JSX.Element => <div>Mocked Check Icon</div>;

describe("CheckButton", () => {
  beforeEach(() => beforeEachSetup());

  it("should render CheckButton component", () => {
    const { container } = render(
      <CheckButton href="/test" CheckButtonIcon={CheckButonIcon} />,
    );

    const button = container.querySelector("button");

    expect(button).not.toBeNull();
    expect(button?.children).toHaveLength(2);
    expect(container.innerHTML.includes("Zobacz")).toBe(true);
    expect(container.innerHTML.includes("Mocked Check Icon")).toBe(true);
  });
});

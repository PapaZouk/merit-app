import { render } from "npm:@testing-library/preact";
import { beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { beforeEachSetup } from "../../../config/beforeEachSetup.ts";
import MenuButton from "../../../../components/common/buttons/MenuButton.tsx";

describe("MenuButton", () => {
  beforeEach(() => beforeEachSetup());

  it("should render MenuButton component", () => {
    const { container } = render(
      <MenuButton onClick={() => {}}>
        <p>Test</p>
      </MenuButton>,
    );

    const button = container.querySelector("button");
    expect(button).not.toBeNull();
    expect(button?.children).toHaveLength(1);
    expect(container.innerHTML.includes("Test")).toBe(true);
  });
});

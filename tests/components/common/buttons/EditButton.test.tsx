import { render } from "npm:@testing-library/preact";
import { beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { h } from "preact";
import { beforeEachSetup } from "../../../config/beforeEachSetup.ts";
import EditButton from "../../../../components/common/buttons/EditButton.tsx";

const EditButtonIcon = (): h.JSX.Element => <div>Mocked Edit Icon</div>;

describe("EditButton", () => {
  beforeEach(() => beforeEachSetup());

  it("should render EditButton component", () => {
    const { container } = render(
      <EditButton href="/test" EditButtonIcon={EditButtonIcon} />,
    );

    const button = container.querySelector("a");

    expect(button).not.toBeNull();
    expect(button?.children).toHaveLength(1);
    expect(container.innerHTML.includes("Edytuj")).toBe(true);
    expect(container.innerHTML.includes("Mocked Edit Icon")).toBe(true);
    expect(button?.getAttribute("href")).toBe("/test");
  });
});

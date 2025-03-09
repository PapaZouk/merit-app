import { render } from "npm:@testing-library/preact";
import { beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { beforeEachSetup } from "../../../config/beforeEachSetup.ts";
import ChooseButton from "../../../../components/common/buttons/ChooseButton.tsx";

describe("ChooseButton", () => {
    beforeEach(() => beforeEachSetup());

    it("should render ChooseButton component", () => {
        const { container } = render(
        <ChooseButton onClick={() => {}} />,
        );

        const button = container.querySelector("button");

        expect(button).not.toBeNull();
        expect(container.innerHTML.includes("Wybierz")).toBe(true);
    });
})
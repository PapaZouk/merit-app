import { render } from "npm:@testing-library/preact";
import { beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import {beforeEachSetup} from "../../../config/beforeEachSetup.ts";
import CloseButton from "../../../../components/common/buttons/CloseButton.tsx";

describe("CloseButton", () => {
   beforeEach(() => beforeEachSetup());

    it("should render CloseButton component", () => {
        const { container } = render(
            <CloseButton onClose={() => {}} />,
        );

        const button = container.querySelector("button");

        expect(button).not.toBeNull();
        expect(container.innerHTML.includes("Zamknij")).toBe(true);
    });
});
import { render } from "npm:@testing-library/preact";
import { beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { beforeEachSetup } from "../../../config/beforeEachSetup.ts";
import VerifyButton from "../../../../components/common/buttons/VerifyButton.tsx";

describe("VerifyButton", () => {
    beforeEach(() => beforeEachSetup());

    it("should render VerifyButton component", () => {
        const { container } = render(
        <VerifyButton />,
        );

        const button = container.querySelector("button");

        expect(button).not.toBeNull();
        expect(container.innerHTML.includes("Zweryfikuj")).toBe(true);
    });
});
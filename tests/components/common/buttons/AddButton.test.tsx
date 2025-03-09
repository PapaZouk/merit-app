import { render } from "npm:@testing-library/preact";
import { describe, beforeEach, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import AddButton from "../../../../components/common/buttons/AddButton.tsx";
import {beforeEachSetup} from "../../../config/beforeEachSetup.ts";

describe("AddButton", () => {
    beforeEach(() => beforeEachSetup());

    it("should render AddButton component", () => {
        const { container } = render(<AddButton onClick={() => {}}/>);
        expect(container.innerHTML.includes("Dodaj")).toBe(true);
    });
});

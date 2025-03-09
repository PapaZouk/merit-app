import { render } from "npm:@testing-library/preact";
import { beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { h } from "preact";
import { beforeEachSetup } from "../../../config/beforeEachSetup.ts";
import DeleteButton from "../../../../components/common/buttons/DeleteButton.tsx";

const DeleteButtonIcon = (): h.JSX.Element => <div>Mocked Delete Icon</div>;

describe("DeleteButton", () => {
    beforeEach(() => beforeEachSetup());

    it("should render DeleteButton component", () => {
        const { container } = render(
            <DeleteButton handleDelete={() => {}} DeleteButtonIcon={DeleteButtonIcon} />,
        );

        const button = container.querySelector("button");

        expect(button).not.toBeNull();
        expect(button?.children).toHaveLength(1);
        expect(container.innerHTML.includes("Usuń")).toBe(true);
        expect(container.innerHTML.includes("Mocked Delete Icon")).toBe(true);
    });
});

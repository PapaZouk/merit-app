import { render } from "npm:@testing-library/preact";
import { beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { beforeEachSetup } from "../../../config/beforeEachSetup.ts";
import ArchiveButton from "../../../../components/common/buttons/ArchiveButton.tsx";

const MockFolderArchive = () => <div>Mocked Folder Icon</div>;

describe("ArchiveButton", () => {
  beforeEach(() => {
    beforeEachSetup()
  });

  it("should render ArchiveButton component", () => {
    const { container } = render(
      <ArchiveButton
        handleArchive={() => {}}
        ArchiveIcon={MockFolderArchive}
      />,
    );
    expect(container.innerHTML.includes("Archiwizuj")).toBe(true);
    expect(container.innerHTML.includes("Mocked Folder Icon")).toBe(true);
  });

  it("should render ArchiveButton component with extra classes", () => {
    const { container } = render(
      <ArchiveButton
        handleArchive={() => {}}
        extraClasses="extra-class"
        ArchiveIcon={MockFolderArchive}
      />,
    );
    const button = container.querySelector("button");

    expect(button).not.toBeNull();
    expect(button?.className).toContain("extra-class");
  });

  it("should render ArchiveButton component with disabled state", () => {
    const { container } = render(
      <ArchiveButton
        handleArchive={() => {}}
        disabled
        ArchiveIcon={MockFolderArchive}
      />,
    );
    const button = container.querySelector("button");

    expect(button).not.toBeNull();
    expect(button?.getAttribute("disabled")).toBe("true");
  });
});

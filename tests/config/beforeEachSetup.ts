import { DOMParser } from "jsr:@b-fuze/deno-dom/native";

export const beforeEachSetup = () => {
  globalThis.document = new DOMParser().parseFromString(
    "<!DOCTYPE html>",
    "text/html",
  ) as any;
  globalThis.window = document.defaultView!;
};

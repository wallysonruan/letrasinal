import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import AlphabetDisplay from "./AlphabetDisplay.vue";

describe("AlphabetDisplay", () => {
  it("Should not render any <p> if text given is a valid FSW", () => {
    const wrapper = mount(AlphabetDisplay, {
      props: {
        word: "M527x552S31e00482x483S2fb04493x506S10120511x521S2e300482x525",
      },
    });

    expect(wrapper.findAll("p").length).toBe(0);
  });

  it("Should not render any <fsw-sign> or <fsw-symbol> if text given is not a valid FSW", () => {
    const wrapper = mount(AlphabetDisplay, {
      props: {
        word: "Hello",
      },
    });

    expect(wrapper.findAll("fsw-sign").length).toBe(0);
    expect(wrapper.findAll("fsw-symbol").length).toBe(0);
  });
});

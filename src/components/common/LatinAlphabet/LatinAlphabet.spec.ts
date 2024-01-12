import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import LatinAlphabet from "./LatinAlphabet.vue";

describe("LatinAlphabet", () => {
  it("Should generate a <p> for the word, and put the word inside", () => {
    const wrapper = mount(LatinAlphabet, {
      props: {
        word: "hello",
      },
    });

    expect(wrapper.findAll("p").length).toBe(1);
    expect(wrapper.find("p").text()).toBe(wrapper.props().word);
  });
});

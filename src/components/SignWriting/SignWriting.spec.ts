import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import SignWriting from "./SignWriting.vue";

describe("SignWriting", () => {
  describe("Quantity", () => {
    it("Should show only one sign", () => {
      const wrapper = mount(SignWriting, {
        props: {
          fsw: "M536x549S30c00482x483S14710521x504S28903490x521S22e04519x531",
        },
      });

      expect(wrapper.findAll("fsw-sign").length).toBe(1);
    });
  });
  describe("Child Component Generation", () => {
    it("Should return a fsw-sign for any fsw string that is not of punctuation type", () => {
      const wrapper = mount(SignWriting, {
        props: {
          fsw: "M536x549S30c00482x483S14710521x504S28903490x521S22e04519x531",
        },
      });

      expect(wrapper.find("fsw-sign").exists()).toBe(true);
      expect(wrapper.find("fsw-symbol").exists()).toBe(false);
    });

    it("Should return a fsw-symbol for any fsw string that is of punctuation type", () => {
      const wrapper = mount(SignWriting, {
        props: {
          fsw: "S38700",
        },
      });

      expect(wrapper.find("fsw-sign").exists()).toBe(false);
      expect(wrapper.find("fsw-symbol").exists()).toBe(true);
    });
  });
});

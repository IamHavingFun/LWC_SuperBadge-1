/**
 * Created by bjohnson on 10/28/2021.
 */

import { createElement } from "lwc";
import boatSearchForm from "c/boatSearchForm";
import getBoatTypes from "@salesforce/apex/BoatDataService.getBoatTypes";
import expect from "expect";

const mockDataList = require("./data/mockdata.json");
const noDataFound = require("./data/noData.json");

describe("c-boat-search-form test suite", () => {
  beforeEach(() => {
    const element = createElement("c-boat-search-form", {
      is: boatSearchForm
    });
    document.body.appendChild(element);
  });
  test("render boat types", () => {
    const component = document.querySelector("c-boat-search-form");
    getBoatTypes.emit(mockDataList);
    return Promise.resolve().then(() => {
      const combobox = component.shadowRoot.querySelector("lightning-combobox");
      expect(component.searchOptions.length).toBe(4);
      expect(component.searchOptions[0]).toStrictEqual({
        label: "All Types",
        value: ""
      });
    });
  });
  test("It should catch an error", () => {
    const component = document.querySelector("c-boat-search-form");
    getBoatTypes.error();
    return Promise.resolve().then(() => {
      expect(component.error).not.toBeUndefined();
    });
  });
  test('Search event  should be dispatched', ()=> {
    const component = document.querySelector("c-boat-search-form");
    const combobox = component.shadowRoot.querySelector("lightning-combobox");
    const handler = jest.fn();
    component.addEventListener('search', handler);
    component.selectedBoatTypeId = '1';
    combobox.dispatchEvent(new CustomEvent('change', {
      detail:{'value': '1'}
    } ));
    return Promise.resolve().then(() => {
      expect(handler).toHaveBeenCalled();
    })
  })
});

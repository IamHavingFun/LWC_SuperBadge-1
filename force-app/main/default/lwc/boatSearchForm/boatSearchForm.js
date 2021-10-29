/**
 * Created by bjohnson on 10/28/2021.
 */

import {LightningElement, wire, api} from 'lwc';
import getBoatTypes from "@salesforce/apex/BoatDataService.getBoatTypes"


export default class BoatSearchForm extends LightningElement {

    @api selectedBoatTypeId = '';

    // Private
    @api error = undefined;

    @api searchOptions;

    // Wire a custom Apex method
    @wire(getBoatTypes)
    boatTypes({ error, data }) {
        if (data) {

            this.searchOptions = data.map(type => {
               return {label: type.Name, value: type.Id}
            });
            this.searchOptions.unshift({ label: 'All Types', value: '' });
        } else if (error) {
            this.searchOptions = undefined;
            this.error = error;
        }
    }

    // Fires event that the search option has changed.
    // passes boatTypeId (value of this.selectedBoatTypeId) in the detail
    handleSearchOptionChange(event) {
        this.selectedBoatTypeId = event.detail.value;
        // Create the const searchEvent
        // searchEvent must be the new custom event search
        console.log(this.selectedBoatTypeId)
        const searchEvent = new CustomEvent('search', {
            detail: {
                boatTypeId: this.selectedBoatTypeId,
            }
        });
        this.dispatchEvent(searchEvent);
    }
}
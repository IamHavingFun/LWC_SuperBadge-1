/**
 * Created by bjohnson on 10/29/2021.
 */

import {createElement} from 'lwc';
import boatTile from 'c/boatTile'

const BOAT = {
    Id: '1',
    Picture__c: 'www.google.com',
    Name: "Cool Boat",
    Price__c: 1000.00,
    Length__c: 100,
    Contact__r:{
        Name: 'John Doe'
    },
    Boat_Type__r:{
        Name: 'Party Boat'
    }

}
describe('c-boat-tile suite', ()=> {
    test('It should render boat properties', ()=> {
        const element = createElement('c-boat-tile', {
            is:boatTile
        });
        element.boat = {Id: 1, Name: 'Cool Boat'};
        document.body.appendChild(element);
        return Promise.resolve().then(() => {

        })
    })
})

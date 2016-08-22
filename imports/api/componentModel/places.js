import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { placeModel } from './models.js';

/*
 * 1. We able to get collection module from here.
 */ 
export const Places = new Mongo.Collection('places');

/*
 * 2. Publication of collection will be declared overhere.
 */
if (Meteor.isServer) {
    Meteor.publish('places', function placesPublication() {
        return Places.find({});
    });
}

/*
 * 3. Create all database adapter (method) of this collection here.
 */ 
Meteor.methods({

    /* 
     * Method to find max id from collection. [basic operation]
     */
    'places.getMaxId' (){
        const data = Places.findOne({}, {sort: {price: -1}});
        if(data == undefined){
            return 0;
        }else{
            return data['id'];
        }
    },   

    /* 
     * Method to insert document into collection. [basic operation]
     * @param document BSON which need to insert into collection
     */ 
    'places.insert' (place) {
        if(placeModel.checkModel(place)){
            Places.insert(place);
        }
    },

    /* 
     * Method to remove document from collection. [basic operation]
     * @param id of document which need to remove from collection
     */ 
    'places.remove' (id) {
        check(id, String);
        Places.remove({id:id});
    },

    /* 
     * Method to edit document within collection. [basic operation]
     * @param document BSON which need to edit
     */
    'places.edit' (place) {
        if(placeModel.checkModel(place)){
            Places.update(
                { 'id' : place['id'] },
                { $set: { type: place['type'], 
                          createdAt: new Date(),
                        } 
                },
            );
        }
    },

    /* 
     * Method to check valid document within collection. [basic operation]
     * @param id of document which need to validate
     */
    'places.isValid' (id){
        check(id, String);
        if(Places.find({id:id}).count() > 0){
            return true;
        }else{
            return false;
        }
    },

    /* 
     * Method to bind item with place document. [custom operation]
     * @param id of item which need to append to place
     * @param id of place which need to append with item
     */
    'places.bindItem' (itemId, placeId){
        check(itemId, String);
        check(placeId, String);

        if(Places.find({id:placeId, items:{'$in':[itemId]}}).count() == 0){
            Places.update(
                { "id" : placeId },
                { $push: { items: itemId } }
            );
        }
    },

    /* 
     * Method to unbind item with place document. [custom operation]
     * @param id of item which need to remove from place
     * @param id of place which need to remove with item
     */
    'places.unbindItem' (itemId, placeId){
        check(itemId, String);
        check(placeId, String);

        if(Places.find({id:placeId, items:{'$in':[itemId]}}).count() == 1){
            Places.update(
                { "id" : placeId },
                { $pull: { items: itemId } }
            );
        }
    }

});
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { warehouseModel } from './models.js';

/*
 * 1. We able to get collection module from here.
 */ 
export const Warehouses = new Mongo.Collection('warehouses');

/*
 * 2. Publication of collection will be declared overhere.
 */
if (Meteor.isServer) {
    Meteor.publish('warehouses', function warehousesPublication() {
        return Warehouses.find({});
    });
}

/*
 * 3. Create all database adapter (method) of this collection here.
 */ 
Meteor.methods({

    /* 
     * Method to find max id from collection. [basic operation]
     */
    'warehouses.getMaxId' (){
        const data = Warehouses.findOne({}, {sort: {price: -1}});
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
    'warehouses.insert' (warehouse) {
        if(warehouseModel.checkModel(warehouse)){
            Warehouses.insert(warehouse);
        }
    },

    /* 
     * Method to remove document from collection. [basic operation]
     * @param id of document which need to remove from collection
     */ 
    'warehouses.remove' (id) {
        check(id, String);
        Warehouses.remove({id:id});
    },

    /* 
     * Method to edit document within collection. [basic operation]
     * @param document BSON which need to edit
     */
    'warehouses.edit' (warehouse) {
        if(warehouseModel.checkModel(warehouse)){
            Warehouses.update(
                { 'id' : warehouse['id'] },
                { $set: { createdAt: new Date() } 
                },
            );
        }
    },

    /* 
     * Method to check valid document within collection. [basic operation]
     * @param id of document which need to validate
     */
    'warehouses.isValid' (id){
        check(id, String);
        if(Warehouses.find({id:id}).count() > 0){
            return true;
        }else{
            return false;
        }
    },

     /* 
     * Method to bind item with place document. [custom operation]
     * @param id of place which need to append to warehouse
     * @param id of warehouse which need to append with place
     */
    'warehouses.bindPlace' (placeId, warehouseId){
        check(placeId, String);
        check(warehouseId, String);

        if(Warehouses.find({id:warehouseId, zones:{'$in':[placeId]}}).count() == 0){
            Warehouses.update(
                { "id" : warehouseId },
                { $push: { zones: placeId } }
            );
        }
    },

    /* 
     * Method to unbind item with place document. [custom operation]
     * @param id of place which need to remove from warehouse
     * @param id of place which need to remove with warehouse
     */
    'warehouses.unbindPlace' (placeId, warehouseId){
        check(placeId, String);
        check(warehouseId, String);

        if(Warehouses.find({id:warehouseId, zones:{'$in':[placeId]}}).count() == 1){
            Warehouses.update(
                { "id" : warehouseId },
                { $pull: { zones: placeId } }
            );
        }
    }

});

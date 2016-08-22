import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { deviceModel } from './models.js';

/*
 * 1. We able to get collection module from here.
 */ 
export const Devices = new Mongo.Collection('devices');

/*
 * 2. Publication of collection will be declared overhere.
 */
if (Meteor.isServer) {
    Meteor.publish('devices', function devicesPublication() {
        return Devices.find({});
    });
}

/*
 * 3. Create all database adapter (method) of this collection here.
 */ 
Meteor.methods({

    /* 
     * Method to find max id from collection. [basic operation]
     */
    'devices.getMaxId' (){
        const data = Devices.findOne({}, {sort: {price: -1}});
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
    'devices.insert' (device) {
        if(deviceModel.checkModel(device)){
            Devices.insert(device);
        }
    },

    /* 
     * Method to remove docu                                                                                                                                                                                                                                                                                                                                                                                                                                                                          ment from collection. [basic operation]
     * @param id of document which need to remove from collection
     */ 
    'devices.remove' (id) {
        check(id, String);
        Devices.remove({id:id});
    },

    /* 
     * Method to edit document within collection. [basic operation]
     * @param document BSON which need to edit
     */
    'devices.edit' (device) {
        if(deviceModel.checkModel(device)){
            Devices.update(
                { 'id' : device['id'] },
                { $set: { type: device['type'], 
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
  'devices.isValid' (id) {
    check(id, String);
    if(Devices.find({id:id}).count() > 0){
      return true;
    }else{
      return false;
    }
  },

});
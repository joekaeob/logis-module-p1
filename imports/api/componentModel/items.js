import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { itemModel } from './models.js';

/*
 * 1. We able to get collection module from here.
 */ 
export const Items = new Mongo.Collection('items');

/*
 * 2. Publication of collection will be declared overhere.
 */
if (Meteor.isServer) {
    Meteor.publish('items', function itemsPublication() {
        return Items.find({});
    });
}

/*
 * 3. Create all database adapter (method) of this collection here.
 */ 
Meteor.methods({
  
  /* 
   * Method to find max id from collection. [basic operation]
   */
  'items.getMaxId' (){
      const data = Items.findOne({}, {sort:{id:-1}});
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
  'items.insert' (item) {
    if(itemModel.checkModel(item)){
      Items.insert(item);
    }
  },

  /* 
   * Method to remove document from collection. [basic operation]
   * @param id of document which need to remove from collection
   */ 
  'items.remove' (id) {
    check(id, String);
    Items.remove({
      id:id,
    });
  },

  /* 
   * Method to edit document within collection. [basic operation]
   * @param document BSON which need to edit
   */ 
  'items.edit' (item) {
    if(itemModel.checkModel(item)){
      Items.update(
        { 'id' : item['id'] },
        { $set: { type: item['type'], 
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
  'items.isValid' (id) {
    check(id, String);
    if(Items.find({id:id}).count() > 0){
      return true;
    }else{
      return false;
    }
  },
  
  /* 
   * Method to add status into document within collection. [custom operation]
   * @param id of document which need insert
   * @param doc or document number that need to attach into document
   */
  'items.addStatus' (id, doc) {
    check(id, String);
    Items.update(
      { "id" : id },
      { $push: { docs: doc } }
    );
  },

});
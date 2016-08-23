import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

/*
 * 1. We able to get collection module from here.
 */ 
export const Rfids = new Mongo.Collection('rfids');

Meteor.methods({

  'rfids.reset' () {
    Rfids.remove({});
  },

  'rfids.updateStatus' (rfid) {
    Rfids.update({rfid : rfid},{$set:{status:false}});
  }

});

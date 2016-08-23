import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


/*
 * 1. We able to get collection module from here.
 */ 
export const RfidsDup = new Mongo.Collection('rfids_dup');

Meteor.methods({

  'rfids_dup.reset' () {
    RfidsDup.remove({});
  },

  'rfids_dup.remove' (id) {
    RfidsDup.remove({_id:id});
  }

});
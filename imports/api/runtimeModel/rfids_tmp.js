import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

/*
 * 1. We able to get collection module from here.
 */ 
export const RfidsTmp = new Mongo.Collection('rfids_tmp');


Meteor.methods({

  'rfids_tmp.remove' () {
    RfidsTmp.remove({});
  }

});
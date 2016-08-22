import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

RfidsDup = new Mongo.Collection('rfids_dup');
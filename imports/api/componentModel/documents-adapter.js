import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { documentModel } from './documents.js';

/*
 * 1. We able to get collection module from here.
 */ 
export const Documents = new Mongo.Collection('documents');

/*
 * 2. Publication of collection will be declared overhere.
 */
if (Meteor.isServer) {
    Meteor.publish('documents', function documentsPublication() {
        return Documents.find({});
    });
}

/*
 * 3. Create all database adapter (method) of this collection here.
 */ 
Meteor.methods({

    /* 
     * Method to find max id from collection. [basic operation]
     */
    'documents.getMaxId' (){
        const data = Documents.findOne({}, {sort:{id:-1}});
        if(data == undefined){
            return 0;
        }else{
            return data['id'];
        }
    },   
    
    'documents.regis' (docId, itemId, deviceId) {
        var doc = documentModel.getModel();
        doc['id'] = docId;
        doc['type'] = 'regis';
        doc['itemId'] = itemId;
        doc['deviceId'] = deviceId;
        doc['createAt'] = new Date();
        Documents.insert(doc);
    },

    'documents.enter' (docId, itemId, deviceId) {
        var doc = documentModel.getModel();
        doc['id'] = docId;
        doc['type'] = 'enter';
        doc['itemId'] = itemId;
        doc['deviceId'] = deviceId;
        doc['createAt'] = new Date();
        Documents.insert(doc);
    },

    'documents.on' (docId, itemId, deviceId, placeId) {
        var doc = documentModel.getModel();
        doc['id'] = docId;
        doc['type'] = 'on';
        doc['itemId'] = itemId;
        doc['deviceId'] = deviceId;
        doc['placeId'] = placeId;
        doc['createAt'] = new Date();
        Documents.insert(doc);
    },

    'documents.out' (docId, itemId, deviceId, placeId) {
        var doc = documentModel.getModel();
        doc['id'] = docId;
        doc['type'] = 'out';
        doc['itemId'] = itemId;
        doc['deviceId'] = deviceId;
        doc['placeId'] = placeId;
        doc['createAt'] = new Date();
        Documents.insert(doc);
    },

    'documents.exit' (docId, itemId, deviceId) {
        var doc = documentModel.getModel();
        doc['id'] = docId;
        doc['type'] = 'exit';
        doc['itemId'] = itemId;
        doc['deviceId'] = deviceId;
        doc['createAt'] = new Date();
        Documents.insert(doc);
    },

});
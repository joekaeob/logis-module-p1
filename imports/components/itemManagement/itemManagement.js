import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Items } from '../../api/componentModel/items.js';
import { Documents } from '../../api/componentModel/documents-adapter.js';
import { RfidsTmp } from '../../api/runtimeModel/rfids_tmp.js';

import template from './itemManagement.html';

class ItemManagementCrtl {
  constructor($scope) {
    $scope.viewModel(this);
    this.subscribe('items');
    this.subscribe('rfids_tmp');

    this.helpers({
      items() {
        return Items.find({}, {sort:{id:-1}});
      }, 

      rfids_tmp() {
        return RfidsTmp.findOne({});
      }
    })
  }

  addItem(newItem, rfidTmp) {
    /*
     * Need to execute getMaxId from database first. However this method is asynchronous method.
     * Then we need session pass newItem object across function. 
     */
    Session.set("newItem", newItem);
    Session.set("rfidTmp", rfidTmp);

    /*
     * Execute getMaxId method, we need to do this complex logic because Mocha need fake id as input.
     */
    Meteor.call('items.getMaxId', function(error, result){
      /*
       * Get item object which store in session
       */
      var item = Session.get("newItem");
      item.id = (parseInt(result) + 1) + '';
      item.createdAt = new Date();
      item.docs = [];
      item.info = [Session.get("rfidTmp"), newItem.info.expire];
      Session.set("itemId", item.id);

      /*
       * Execute insert method which will be a different scope again.
       */
      Meteor.call('items.insert', item);   

      /*
       * Execute remove rfids_tmp to reset rfids_tmp document
       */
      Meteor.call('rfids_tmp.remove');   

      /*
       * Execute getMaxId method to get current document ID
       */
      Meteor.call('documents.getMaxId', function(error, result){

        var docId = (parseInt(result) + 1);
        Session.set("docId", docId);

        Meteor.call('documents.regis', docId, Session.get("itemId"), "TEMP", function(error, result){
          Meteor.call('items.addStatus', Session.get("itemId"), Session.get("docId"), "TEMP");
        }); 
      });

    });

    this.newItem = '';
  }

}

export default angular.module('itemManagement', [
  angularMeteor
])
  .component('itemManagement', {
    templateUrl: 'imports/components/itemManagement/itemManagement.html',
    controller: ['$scope', ItemManagementCrtl]
  });

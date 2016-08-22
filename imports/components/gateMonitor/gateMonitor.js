import angular from 'angular';
import 'bootstrap/dist/css/bootstrap.css';
import angularMeteor from 'angular-meteor';

import { Items } from '../../api/componentModel/items.js';
import { Rfids } from '../../api/runtimeModel/rfids.js';
import { RfidsDup } from '../../api/runtimeModel/rfids_dup.js';

import template from './gateMonitor.html';

class GateMonitorCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.helpers({

      rfids() {
        return Rfids.find({timestamp:{ $gte: Session.get('sys_time')}}, {sort:{timestamp:-1}});
      },

      rfids_count() {
        return Rfids.find({timestamp:{ $gte: Session.get('sys_time')}}).count();
      },

      rfids_dup() {
        return RfidsDup.find({timestamp:{ $gte: Session.get('sys_time')}}, {sort:{timestamp:-1}});
      },

      rfids_dup_count() {
        return RfidsDup.find({timestamp:{ $gte: Session.get('sys_time')}}).count();
      },

    })

  }

  sys_time() {
    Session.setDefault('sys_time', new Date);
  }

  //Find different time between duplicate RFID: in case that the different time is less than 8 sec, it means that item sill struct in the  gate.
  rfids_dup_display (ref, rfid) {
    var diff = (ref.getTime() - Rfids.findOne({rfid:rfid}).timestamp.getTime())/1000;
    console.log(diff);
    if(diff < 8){
      var dup = RfidsDup.findOne({rfid:rfid})._id;
      if(dup != undefined){
        RfidsDup.remove(dup);
      }
      return false;
    }else{
      return true;
    }
  }
}
 
export default angular.module('gateMonitor', [
  angularMeteor
])
  .component('gateMonitor', {
    templateUrl: 'imports/components/gateMonitor/gateMonitor.html',
    controller: ['$scope', GateMonitorCtrl]
  });

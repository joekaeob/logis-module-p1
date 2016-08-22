import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Rfids } from '../../api/runtimeModel/rfids.js';

import template from './gateMonitor.html';

class GateMonitorCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.helpers({
      rfids() {
        return Rfids.find({});
      }
    })
  }
}
 
export default angular.module('gateMonitor', [
  angularMeteor
])
  .component('gateMonitor', {
    templateUrl: 'imports/components/gateMonitor/gateMonitor.html',
    controller: ['$scope', GateMonitorCtrl]
  });

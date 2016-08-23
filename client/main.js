import angular from 'angular';
import angularMeteor from 'angular-meteor';
import gateMonitor from '../imports/components/gateMonitor/gateMonitor';
import itemManagement from '../imports/components/itemManagement/itemManagement';

 
angular.module('main-module', [
  angularMeteor,
  //gateMonitor.name
  gateMonitor.name
]);
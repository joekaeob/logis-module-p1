import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { employeeModel } from './models.js'

/*
 * 1. We able to get collection module from here.
 */ 
export const Employees = new Mongo.Collection('employees');

/*
 * 2. Publication of collection will be declared overhere.
 */
if (Meteor.isServer) {
    Meteor.publish('employees', function employeesPublication() {
        return Employees.find({});
    });
}

/*
 * 3. Create all database adapter (method) of this collection here.
 */ 
Meteor.methods({
  
  
  /* 
   * Method to find max id from collection. [basic operation]
   */
  'employees.getMaxId' (){
      const data = Employees.findOne({}, {sort: {price: -1}});
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
  'employees.insert' (employee) {
    if(employeeModel.checkModel(employee)){
      Employees.insert(employee);
    }
  },

  /* 
   * Method to remove document from collection. [basic operation]
   * @param id of document which need to remove from collection
   */ 
  'employees.remove' (id) {
    check(id, String);
    Employees.remove({
      id:id,
    });
  },

  /* 
   * Method to edit document within collection. [basic operation]
   * @param document BSON which need to edit
   */ 
  'employees.edit' (employee) {
    if(employeeModel.checkModel(employee)){
        Employees.update(
          { 'id' : employee['id'] },
          { $set: { name: employee['name'], 
                    position: employee['position'],
                    authorize: employee['authorize'],
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
  'employees.isValid' (id) {
    check(id, String);
    if(Employees.find({id:id}).count() > 0){
      return true;
    }else{
      return false;
    }
  }

});


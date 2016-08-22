import { check } from 'meteor/check';

/*
 * DeviceModel module
 * @param getModel()
 * @param checkModel()
 */ 
export const deviceModel = (function(){
    var getModel = function(){
        var device = {
            id:"",
            name:"",
            type:"",
            info:[],
            createdAt: new Date(),
        };

        return device;
    };

    var checkModel = function(device){
        check(device, {
            id: String,
            name: String,
            type: String,
            info: [String],
            createdAt: Date,
        });

        return true;
    }

    return {
        getModel: getModel,
        checkModel: checkModel
    }
})();

/*
 * EmployeeModel module
 * @param getModel()
 * @param checkModel()
 */ 
export const employeeModel = (function(){
    var getModel = function(){
        var employee = {
            id:"",
            name:"",
            position:"",
            authorize:"",
            info:[],
            createdAt: new Date(),
        };

        return employee;
    };

    var checkModel = function(employee){
        check(employee, {
            id: String,
            name: String,
            position: String,
            authorize: String,
            info: [String],
            createdAt: Date,
        });

        return true;
    }

    return {
        getModel: getModel,
        checkModel: checkModel
    }
})();

/*
 * ItemModel module
 * @param getModel()
 * @param checkModel()
 */ 
export const itemModel = (function(){
    var getModel = function(){
        var item = {
            id:"",
            type:"",
            info:[],
            docs:[],
            createdAt: new Date(),
        };

        return item;
    };

    var checkModel = function(item){
        check(item, {
            id: String,
            type: String,
            info: [String],
            docs: [String],
            createdAt: Date,
        });

        return true;
    }

    return {
        getModel: getModel,
        checkModel: checkModel
    }
})();


/*
 * PlaceModel module
 * @param getModel()
 * @param checkModel()
 */ 
export const placeModel = (function(){
    var getModel = function(){
        var place = {
            id:"",
            type:"",
            info:[],
            items:[],
            createdAt: new Date(),
        };

        return place;
    };

    var checkModel = function(place){
        check(place, {
            id: String,
            type: String,
            info: [String],
            items: [String],
            createdAt: Date,
        });

        return true;
    }

    return {
        getModel: getModel,
        checkModel: checkModel
    }
})();


/*
 * WarehouseModel module
 * @param getModel()
 * @param checkModel()
 */ 
export const warehouseModel = (function(){
    var getModel = function(){
        var warehouse = {
            id:"",
            info:[],
            zones:[],
            createdAt: new Date(),
        };

        return warehouse;
    };

    var checkModel = function(warehouse){
        check(warehouse, {
            id: String,
            info: [String],
            zones: [String],
            createdAt: Date,
        });

        return true;
    }

    return {
        getModel: getModel,
        checkModel: checkModel
    }
})();

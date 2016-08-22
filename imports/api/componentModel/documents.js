import { check } from 'meteor/check';

/*
 * RegisDocument module
 * @param getModel()
 * @param checkModel()
 */ 
export const documentModel = (function(){
    var getModel = function(){
        var doc = {
            id:"",
            type:"",
            itemId: "",
            deviceId: "",
            employeeId: "",
            info:[],
            createdAt: new Date(),
        };

        return doc;
    };

    var checkModel = function(doc){
        check(doc, {
            id: String,
            type: String,
            itemId: String,
            deviceId: String,
            employeeId: String,
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

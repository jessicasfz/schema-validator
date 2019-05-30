//var ValidationUtils = require('../SchemaValidator');
//var expect = require("chai").expect;
var SchemaValidator = require('../SchemaValidator');
var schema = {
    'fields': [{
        'name': 'Currency',
        'title': 'currency abbreviation',
        'constraints': {
            'required': true,
            'type': 'string',
            'pattern': '[abc]+',
            'nullable': false,
            'minLength': 2,
            'maxLength': 3
        }
    }, {
        'name': 'Rate',
        'title': 'Rates of the particular currency',
        'constraints': {
            'required': true,
            'type': 'number',
            'pattern': '^(\\d{1,20}|(\\d{1,20}\\.{1}\\d{1,5}){1})',
            'nullable': false,
            'minLength': 1,
            'maxLength': 20
        }
    },
    {
        'name': 'Date',
        'title': 'Date of transaction',
        'constraints': {
            'required': true,
            'type': 'date',
            'pattern': 'MM/DD/YYYY',
            'nullable': false,
            'minLength': 1,
            'maxLength': 20
        }
    }
    ]
};


// let validtor = new SchemaValidator(schema);
// console.log("validator Generated ")
// var result = validtor.validate(["AEDe","ahsd","25:11:11"]);
// console.log("validation result = ",result)

// const moment = require("moment")
// var date = moment("01-13-10","YYYY-MM-DD");
// console.log(date.isValid())
// console.log(date.year())

describe('To verify if the correct schema',function(){
    it("To verify if currency and rates json  is as per the correct schema",function(){
       
        expect(schema).toHaveProperty('name');
    })
})

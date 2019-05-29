//var ValidationUtils = require('../SchemaValidator');
var SchemaValidator = require('../SchemaValidator');
var schema = {
    'fields': [{
        'name': 'Currency',
        'title': 'currency abbreviation',
        'constraints': {
            'required': true,
            'type': 'string',
            'pattern': '[a-zA-Z]*',
            'nullable': false,
            'minLength': 3,
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
// console.log(validtor.validate(["AED",6.7,"XYZ"]));
const moment = require("moment")
var date = moment("01-13-10","YYYY-MM-DD");
console.log(date.isValid())
console.log(date.year())
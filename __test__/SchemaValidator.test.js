//var ValidationUtils = require('../SchemaValidator');
var expect = require("chai").expect;
var chai = require('chai');
var schemaconfigjson =  require('../config/schema-config')
chai.use(require('chai-json-schema'));



var SchemaValidator = require('../SchemaValidator');
var schema = {
    'fields': [{
        "name": "Currency",
        'title': 'currency abbreviation',
        'constraints': {
            'required': true,
            'type': 'string',
            'pattern': '[a-z]+',
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
            'pattern': '10,3',
            'nullable': false,
            'minLength': 2,
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



describe('To verify if the correct schema',function(){
    it("To verify if currency and rates json  is as per the schema configuration json",function(){
        expect(schema).to.be.jsonSchema(schemaconfigjson);

    })
    it("not",function(){
        delete schema.fields[0].name;
        expect(schema).to.be.not.jsonSchema(schemaconfigjson);

    })
})

describe('To verify the test cases for Currency Object ',function(){
    it("Positive test case to check status is true when input json is correct",function(){
        let validtor = new SchemaValidator(schema);
        var result = validtor.validate(["abc",0.87,"01/01/2020"])
        var resultstatus = result.status 
        console.log(resultstatus)
        expect(resultstatus).to.be.true    
    })

    
    it(' Negative Test case to check for max length for Currency exceeded',function(){
         let validtor = new SchemaValidator(schema);
         var result = validtor.validate(["abci",0.87,"01/01/2020"])
         var resultstatus = result.status 
         console.log(resultstatus)
         expect(resultstatus).to.be.false
        

    })
    it('Negative Test case to check for min length for Currency object',function(){
        let validtor = new SchemaValidator(schema);
        var result = validtor.validate(['a',0.87,"01/01/2020"])
        var resultstatus = result.status 
        console.log(resultstatus)
        expect(resultstatus).to.be.false
        
       
   })

    it(' Test case to check for data type for Currency object',function(){
        let validtor = new SchemaValidator(schema);
        var result = validtor.validate([23,0.87,"01/01/2020"])
        var resultstatus = result.status 
        console.log(resultstatus)
        expect(resultstatus).to.be.false
        
       
   })
})

/**
 * For Rates
 */
describe('To verify the test cases for Rates Object ',function(){
    it("Negative  test case to check status is false when rates datatype is string",function(){
        let validtor = new SchemaValidator(schema);
        var result = validtor.validate(["abc","ahsd","01/01/2020"])
        var resultstatus = result.status 
        console.log('Datatype issue',+resultstatus)
        expect(resultstatus).to.be.false    
    })

    
    it(' Negative Test case to check for max length for Rates exceeded',function(){
         let validtor = new SchemaValidator(schema);
         var result = validtor.validate(["abc",1234565754756777676767767667777766676767,"11/11/2011"])
         var resultstatus = result.status 
         expect(resultstatus).to.be.false
        

    })
    it('Negative Test case to check for min length for Rates object',function(){
        let validtor = new SchemaValidator(schema);
        var result = validtor.validate(["abc",,"11/11/2011"])
        var resultstatus = result.status 
        console.log(resultstatus)
        expect(resultstatus).to.be.false
        
       
   })

    
})
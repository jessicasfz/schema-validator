/* eslint-disable no-sparse-arrays */
/* eslint-disable no-console */
/* eslint-disable no-undef */
//var ValidationUtils = require('../SchemaValidator');
var expect = require('chai').expect;
var chai = require('chai');
var schemaconfigjson = require('../config/schema-config');
chai.use(require('chai-json-schema'));
var SchemaValidator = require('../SchemaValidator');
var schema = {
	'body': {
		'fields': [{
			'name': 'Currency',
			'title': 'currency abbreviation',
			'constraints': {
				'required': true,
				'type': 'string',
				'pattern': '[a-z]+',
				'unique': false,
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
				'unique': false,
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
				'unique': false,
				'minLength': 1,
				'maxLength': 20
			}
		}
		]
	},
	'trailer' : {
		'fields': [{
			'name': 'Currency',
			'title': 'currency abbreviation',
			'constraints': {
				'required': true,
				'type': 'string',
				'pattern': '[a-z]+',
				'unique': false,
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
				'unique': false,
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
				'unique': false,
				'minLength': 1,
				'maxLength': 20
			}
		}
		]
	}
};

var unique_schema = {
	'body': {
		'fields': [{
			'name': 'Currency',
			'title': 'currency abbreviation',
			'constraints': {
				'required': true,
				'type': 'string',
				'pattern': '[a-z]+',
				'unique': false,
				'minLength': 3,
				'maxLength': 3
			}
		}, {
			'name': 'Rate',
			'title': 'Rates of the particular currency',
			'constraints': {
				'required': true,
				'type': 'string',
				'pattern': '',
				'unique': true,
				'minLength': 2,
				'maxLength': 20
			}
		}
		]
	}
};


describe('To verify if the correct schema', function () {
	it('To verify if currency and rates json  is as per the schema configuration json', function () {
		expect(schema).to.be.jsonSchema(schemaconfigjson);

	});
	it('not', function () {
		let newschema = JSON.parse(JSON.stringify(schema)); //creates a new instance of the schema
		delete newschema.body.fields[0].name;
     
		expect(newschema).to.be.not.jsonSchema(schemaconfigjson);

	});
});

describe('To verify the test cases for Currency Object ', function () {
	it('Positive test case to check status is true when input json is correct', function () {
		let validtor = new SchemaValidator(schema);
		var result = validtor.validate(['abc', 0.87, '01/01/2020']);
		var resultstatus = result.isValid;
    
		expect(resultstatus).to.be.true;
	});


	it(' Negative Test case to check for max length for Currency exceeded', function () {
		let validtor = new SchemaValidator(schema);
		var result = validtor.validate(['abci', 0.87, '01/01/2020']);
		var resultstatus = result.isValid;
        
		expect(resultstatus).to.be.false;


	});
	it('Negative Test case to check for min length for Currency object', function () {
		let validtor = new SchemaValidator(schema);
		var result = validtor.validate(['a', 0.87, '01/01/2020']);
		var resultstatus = result.isValid;
		expect(resultstatus).to.be.false;


	});

	it(' Test case to check for data type for Currency object', function () {
		let validtor = new SchemaValidator(schema);
		var result = validtor.validate([23, 0.87, '01/01/2020']);
		var resultstatus = result.isValid;
		expect(resultstatus).to.be.false;


	});

	it('To verify the value is unique for a particular record',function(){
		let validtor = new SchemaValidator(unique_schema);
		var result = validtor.validate(['abc','ced']);
		var resultstatus  = result.isValid;
		expect(resultstatus).to.be.true;  
	});

	it('To verify the value is unique for a particular record for Positive Flow',function(){
		let validtor = new SchemaValidator(unique_schema);

		var result = validtor.validate(['abc','abc']);
		var resultstatus  = result.isValid;
		expect(resultstatus).to.be.false;  
	});


});

/**
 * For Rates
 */
describe('To verify the test cases for Rates Object ', function () {
	it('Negative  test case to check status is false when rates datatype is string', function () {
		let validtor = new SchemaValidator(schema);
		var result = validtor.validate(['abc', 'ahsd', '01/01/2020']);
		var resultstatus = result.isValid;
		expect(resultstatus).to.be.false;
	});


	it(' Negative Test case to check for max length for Rates exceeded', function () {
		let validtor = new SchemaValidator(schema);
		var result = validtor.validate(['abc', 1234565754756777676767767667777766676767, '11/11/2011']);
		var resultstatus = result.isValid;
		expect(resultstatus).to.be.false;


	});
	it('Negative Test case to check for min length for Rates object', function () {
		let validtor = new SchemaValidator(schema);
		var result = validtor.validate(['abc', , '11/11/2011']);
		var resultstatus = result.isValid;
		expect(resultstatus).to.be.false;


	});


});


describe('To verify if the correct schema', function () {
	it('To verify if currency and rates json  is as per the schema configuration json', function () {
		expect(schema).to.be.jsonSchema(schemaconfigjson);

	});
	it('not', function () {
		let newschema = JSON.parse(JSON.stringify(schema)); //creates a new instance of the schema
		delete newschema.body.fields[0].name;
     
		expect(newschema).to.be.not.jsonSchema(schemaconfigjson);

	});
});

/**
 * For The Trailer Object
 * Passing Parameter as True
 */
describe('To verify the test cases for Currency Object ', function () {
	it('Positive test case to check status is true when input json is correct', function () {
		let validtor = new SchemaValidator(schema);
		var result = validtor.validate(['abc', 0.87, '01/01/2020'],true);
		var resultstatus = result.isValid;
    
		expect(resultstatus).to.be.true;
	});


	it(' Negative Test case to check for max length for Currency exceeded', function () {
		let validtor = new SchemaValidator(schema);
		var result = validtor.validate(['abci', 0.87, '01/01/2020'],true);
		var resultstatus = result.isValid;
        
		expect(resultstatus).to.be.false;


	});
	it('Negative Test case to check for min length for Currency object', function () {
		let validtor = new SchemaValidator(schema);
		var result = validtor.validate(['a', 0.87, '01/01/2020'],true);
		var resultstatus = result.isValid;
		expect(resultstatus).to.be.false;


	});

	it(' Test case to check for data type for Currency object', function () {
		let validtor = new SchemaValidator(schema);
		var result = validtor.validate([23, 0.87, '01/01/2020'],true);
		var resultstatus = result.isValid;
		expect(resultstatus).to.be.false;


	});
});

/**
 * For Rates
 */
describe('To verify the test cases for Rates Object ', function () {
	it('Negative  test case to check status is false when rates datatype is string', function () {
		let validtor = new SchemaValidator(schema);
		var result = validtor.validate(['abc', 'ahsd', '01/01/2020'],true);
		var resultstatus = result.isValid;
		expect(resultstatus).to.be.false;
	});


	it(' Negative Test case to check for max length for Rates exceeded', function () {
		let validtor = new SchemaValidator(schema);
		var result = validtor.validate(['abc', 1234565754756777676767767667777766676767, '11/11/2011'],true);
		var resultstatus = result.isValid;
		expect(resultstatus).to.be.false;


	});
	it('Negative Test case to check for min length for Rates object', function () {
		let validtor = new SchemaValidator(schema);
		var result = validtor.validate(['abc', , '11/11/2011'],true);
		var resultstatus = result.isValid;
		expect(resultstatus).to.be.false;


	});


});
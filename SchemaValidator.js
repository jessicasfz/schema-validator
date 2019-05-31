var ValidationUtils = require('./ValidationUtils');
let SingleError = require('./SingleError');
let _schema;
/**
 * adgasjhgjh
 */
class SchemaValidator {
	/**
	 * asdjkas
	 * @param {*} schema 
	 */
	constructor(schema) {
		const isValidSchema = ValidationUtils.validateSchema(schema);
		if (isValidSchema) {
			_schema = schema;
		}
	}

	get schema() {
		return _schema;
	}

	/**
     * 
     * @param {*} arr -- This will have array of values on which validations are to be perfomed 
     */
	validate(arr) {
		var response = {
			isValid: true,
			reasons: [],
			validJsonObject:{}
		};
		try {
			if (this.schema.fields.length != arr.length) {
				response.isValid = false;
				response.reasons.push({ message: 'Invalid Record Length with schema ' });
				return response;
				//throw new Error("Invalid Record Length with schema ")
			}
			for (var i = 0; i < arr.length; i++) {

				var singleValue = arr[i];
				var validationData = this.schema.fields[i];
				var result = ValidationUtils.valdiateData(singleValue, validationData);
				if( result instanceof SingleError){
					
					response.isValid = false;
					response.reasons.push(result.toJSON());
				}
				else{
					response.validJsonObject[validationData.name]= singleValue;	
				}
			}
			// Validating each record over here 
		}
		catch (err) {
			// 
		}
		if(!response.isValid)
		{
			response.validJsonObject = {};
		}
		return response;
		// This will return true or false 
	}

	/**
	 * This function will validate the JSD Schema and the json Object accordingly 
	 * @param {*} schema 
	 * @param {*} valueJSON 
	 */
	static validateRawSchema(schema, valueJSON) {
		return ValidationUtils.validateSchemaForJSD(schema,valueJSON);
	}

}

module.exports = SchemaValidator;
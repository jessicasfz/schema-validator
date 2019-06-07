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
	 * Function to validate array of params 
	 * @param {*} arr -- This will have array of values on which validations are to be perfomed 
	 * @param {*} isTrailer -- This param is specifies if the trailer schema is to be picked up body will be picked up by default 
	 */
	validate(arr,isTrailer) {
		var response = {
			isValid: true,
			reasons: []
			//validJsonObject:{}
		};
		try {
			let toCheckSchema = this.schema.body;
			if(isTrailer){
				toCheckSchema = this.schema.trailer;
			}
			if (toCheckSchema.fields.length != arr.length) {
				response.isValid = false;
				response.reasons.push({ message: 'Invalid Record Length with schema ' });
				return response;
				//throw new Error("Invalid Record Length with schema ")
			}
			for (var i = 0; i < arr.length; i++) {
				var singleValue = arr[i];
				var validationData = toCheckSchema.fields[i];
				var result = ValidationUtils.valdiateData(singleValue, validationData);
				if( result instanceof SingleError){
					response.isValid = false;
					response.reasons.push(result.toJSON());
				}
				// else{
				// 	response.validJsonObject[validationData.name]= singleValue;	
				// }
			}
			// Validating each record over here 
		}
		catch (err) {
			// 
		}
		// if(!response.isValid)
		// {
		// 	response.validJsonObject = {};
		// }
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
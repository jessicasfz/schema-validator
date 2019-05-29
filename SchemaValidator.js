var ValidationUtils = require('./ValidationUtils')
let SingleError = require('./SingleError')
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
			status: true,
			reasons: []
		};
		try {
			console.log("Data Length = " + arr.length)
			console.log("Fields  Length = " + this.schema.fields.length)
			if (this.schema.fields.length != arr.length) {
				response.status = false;
				response.reasons.push({ message: "Invalid Record Length with schema " });
				throw new Error("Invalid Record Length with schema ")
			}
			for (var i = 0; i < arr.length; i++) {

				var singleValue = arr[i];
				var validationData = this.schema.fields[i];
				var result = ValidationUtils.valdiateData(singleValue, validationData);
				if( result instanceof SingleError){
					console.log("Single error Found ")
					response.status = false;
					console.log(result.toJSON());
					//result.message
					response.reasons.push(result.toJSON());
				}
			}
			// Validating each record over here 
		}
		catch (err) {
			console.error("Error Found ", err)
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

	}

}

module.exports = SchemaValidator;
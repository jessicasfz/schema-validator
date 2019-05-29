const dataTypes = require('./Datatypes')
var Ajv = require('ajv');
var validSchema = require('./config/schema-config.json');
class ValidationUtils {
	/**
   * 
   * @param {*} schema  -- Schema that is recieved and to be validated -- Stored in libaray 
   * @param {*} data  -- Schema supplied by user 
   */
  static validateSchema(schema) {
    let schemaValidator = new Ajv();
    let result = schemaValidator.validate(validSchema, schema);
    if (!result) {
      if (schemaValidator.errors && schemaValidator.errors.length > 0) {
        if (schemaValidator.errors.length > 0) {
          throw new Error("Invalid Schema : Error Found :::" + JSON.stringify(schemaValidator.errors));
        }
      }
    }
    return true;
  }

  static valdiateData(data, fieldConstraint) {
    //console.log("Constraint = "+JSON.stringify(fieldConstraint));
    let singleValueValidator = new Ajv();
    var dataType = dataTypes[fieldConstraint.constraints.type];
    console.log(dataType)

    let singleValueSchema =  dataType ;
    let schemaValidator = new Ajv();
    let result = schemaValidator.validate(singleValueSchema, data);

    if (!result) {
      console.log(schemaValidator.errors);
    }


  }
}
module.exports = ValidationUtils;
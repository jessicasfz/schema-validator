let _message, _dataType, _value;
class SingleError {
    constructor(message, dataType, value ){
        _message = message;
        _dataType = dataType;
        _value = value;
    }
    get message(){
        return _message
    }

    get dataType(){
        return _dataType
    }

    get value(){
        return _value;
    }
    toJSON(){
        return{
            message:this.message,
            dataType:this.dataType,
            value:this.value
        };
    }
    toString(){
        return JSON.stringify(this.toJSON());
    }
}

module.exports = SingleError;
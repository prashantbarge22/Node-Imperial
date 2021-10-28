const BigInteger = require('big-integer');

import BufferExtended from "../utils/BufferExtended";
import IDLLCrypto from './IDLL-Crypto';
import Serialization from 'common/utils/Serialization';
import consts from 'consts/const_global'

class IDLLCryptoData {

    static isIDLLCryptoData(object){

        if (typeof object !== 'object' || object === null )
            return false;

        if (object instanceof IDLLCryptoData)
            return true;

        return false;
    }

    static createIDLLCryptoData(object, forceToCreate){

        //if it s IDLLCryptoData, then return it
        if (IDLLCryptoData.isIDLLCryptoData(object)){

            if (forceToCreate)
                return new IDLLCryptoData( Buffer.from(object.buffer), "buffer" );

            return object;
        }

        let cryptoData = new IDLLCryptoData(object);

        if (forceToCreate && cryptoData.buffer ) {
            cryptoData.buffer = Buffer.from(cryptoData.buffer);
        }

        return cryptoData;
    }

    constructor (data, type){

        this.buffer = null;

        if ((data && Buffer.isBuffer(data)) || (type==="buffer"))
            this.buffer = data;
        else
        if (type === "hex")
            this.buffer = Buffer.from(data, "hex");
        else
        if (type === "base")
            this.buffer = Buffer.from(BufferExtended.fromBase(data)); //if it is string, it must be a Base string
        else
        if (type === "utf-8")
            this.buffer = Buffer.from(data, "utf-8");
        else
        if (type === "ascii" || typeof data === "string")
            this.buffer = Buffer.from(data, "ascii");
        else
        if (type === "byte" || Array.isArray(data)) //if it is array
        {
            if (data.length > 0 && typeof data[0] === "object" )
                this.buffer = this.createBufferFromArray(data);
            else // byte array
                this.buffer = Buffer.from(data);
        }
        else
        if (type === "object" || typeof data === "object"){

            if (data instanceof BigInteger) {

                //converting number value into a buffer
                this.buffer = Serialization.serializeBigInteger(data);
                return;
            }

            if (typeof data === 'number'){
                this.buffer = Serialization.serializeNumber7Bytes(data);
                return;
            }

            if ( !data )
                this.buffer = Buffer.from ( [0] );
            else
                this.buffer = this.createBufferFromArray(data);

        }
        else
        if (typeof data === "number"){

            //converting number value into a buffer on 4 bytes
            this.buffer = Serialization.serializeNumber4Bytes(data)
        }

    }

    createBufferFromArray(data){

        let newValue = null;
        let i = 0;

        //console.log("Data", data);

        for (let property in data) {

            if (data.hasOwnProperty(property)) {

                if (i === 0)
                    newValue = IDLLCryptoData.createIDLLCryptoData( data[property], true);
                else {
                    if (Buffer.isBuffer(data[property]))
                        newValue.concat( data[property], false );
                    else
                        newValue.concat(IDLLCryptoData.createIDLLCryptoData(data[property], false));
                }

                //console.log("newValue", newValue);

                i++;
            }
        }

        if (newValue )
            return newValue.buffer;
        else
            return Buffer.from( [0] );
    }

    toHex(){
        return this.buffer.toString('hex');
    }

    toString(param){
        
        return this.buffer.toString(param);
    }

    toBytes(){

        let result = [];
        
        for (let i = 0; i < this.buffer.length; ++i) {
            result.push (this.buffer[i]);
        }
        
        return result;
    }

    toUint8Array(){
        
        let result = new Uint8Array(this.buffer.length);
        
        for (let i = 0; i < this.buffer.length; ++i) {
            result[i] = this.buffer[i];
        }
        
        return result;
    }

    toBase(){
        
        return BufferExtended.toBase(this.buffer);
    }

    substr(index, count){
        return BufferExtended.substr(this.buffer, index, count);
    }

    longestMatch(cryptoData2, startIndex){

        if (! IDLLCryptoData.isIDLLCryptoData(cryptoData2))
            return null;

        return BufferExtended.longestMatch(this.buffer, cryptoData2.buffer, startIndex );
    }

    concat(data){

        data = IDLLCryptoData.createIDLLCryptoData(data);

        this.buffer = Buffer.concat( [this.buffer, data.buffer] );

        return this;
    }



    compare(data){

        if (!Buffer.isBuffer(data))
            data = IDLLCryptoData.createIDLLCryptoData(data);

        return this.buffer.compare(data.buffer)
    }


}

export default IDLLCryptoData;
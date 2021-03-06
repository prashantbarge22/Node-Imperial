const bs58 = require('bs58');

import consts from "consts/const_global";
import IDLLCrypto from "common/crypto/IDLL-Crypto";
const safeCompare = require('safe-compare');

class BufferExtended {

    substr(buffer, index, count){

        if (count === undefined)
            count = buffer.length;

        let length = Math.min(index + count, buffer.length);

        if (length-index < 0)
            throw {message: "length-index <= 0...", buffer: buffer.toString("hex"), index:index, length:length, count: count};

        if (length-index === 0) return Buffer.alloc(0);

        let buf = Buffer.alloc(length-index);
        buffer.copy(buf, 0, index, length);
        
        return buf;

    }

    longestMatch(buffer, buffer2, startIndex = 0){

        let i = 0;
        while (i + startIndex < buffer.length && i < buffer2.length ) {

            if (buffer[i + startIndex] !== buffer2[i]) //no more match
                break;

            i++;
        }

        if (i > 0) //we have a match
            return this.substr(buffer, startIndex, i);

    }
    
    safeCompare(buffer1, buffer2, fastValidation){

        if (fastValidation)
            return buffer1.equals(buffer2);

        if (!buffer1.equals(buffer2)) return false; //optimization

        return safeCompare(buffer1, buffer2);

    }

    toBase(buffer){

        if (consts.ADDRESSES.ADDRESS.USE_BASE64)
            return IDLLCrypto.encodeBase64(buffer);
        else
            return bs58.encode(buffer);

    }

    fromBase(string){

        if (consts.ADDRESSES.ADDRESS.USE_BASE64)
            return IDLLCrypto.decodeBase64(string); //if it is string, it must be a Base string
        else
            return bs58.decode(string);
    }

}

export default new BufferExtended();
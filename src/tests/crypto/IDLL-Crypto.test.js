var assert = require('assert')

import IDLLCrypto from 'common/crypto/IDLL-Crypto'
import TestsHelper from 'tests/Tests.helper'

describe('IDLL crypt', ()=>{

    it('encodeBase64 - should return encoded', async ()=>{

        let bytes = IDLLCrypto.getBufferRandomValues(Math.floor(Math.random() * 100));
        let encoded = IDLLCrypto.encodeBase64(bytes);

        assert(typeof encoded === 'string', 'encodeBase64 is not STRING')

        let decoded = IDLLCrypto.decodeBase64(encoded);

        let match = true;

        assert(bytes.length === decoded.length, "encoded and decoded don't have same length");

        for (let i=0; i<bytes.length; i++)
            if ( bytes[i] !== decoded[i] )
                match = false;

        assert(match, "encoded and decoded don't match");

    })

    it('getBufferRandomValues', ()=>{

        const count = Math.floor(Math.random()*200);
        let bytes = IDLLCrypto.getBufferRandomValues(count)

        assert(bytes.length === count, 'getBufferRandomValues should return '+count+' elements')

    })

    it('hash Proof Of Work function ', async ()=>{

        //this.timeout(15000);


        const message1 =  Buffer.from ( TestsHelper.makeId(), "ascii");
        const message1_copy = Buffer.from (message1);

        const message2 =  Buffer.from( TestsHelper.makeId(), "ascii");

        let hash1 = await IDLLCrypto.hashPOW(message1)
        let hash1_copy = await IDLLCrypto.hashPOW(message1_copy)
        let hash2 = await IDLLCrypto.hashPOW(message2)

        // console.log("POW buffer ",hash1, typeof hash1, Buffer.isBuffer(hash1));
        // console.log("POW buffer ",hash1_copy, typeof hash1_copy, Buffer.isBuffer(hash1_copy));
        // console.log("POW buffer ",hash2, typeof hash2, Buffer.isBuffer(hash2));


        assert(typeof hash1 === 'object' && Buffer.isBuffer(hash1), "Hash1 is not Buffer");
        assert(typeof hash1_copy === 'object' && Buffer.isBuffer(hash1_copy), "Hash1_copy is not Buffer");
        assert(typeof hash2 === 'object' && Buffer.isBuffer(hash2), "Hash2 is not Buffer");

        assert(await IDLLCrypto.verifyHashPOW(hash1, message1), "Hash1 is not good");
        assert(await IDLLCrypto.verifyHashPOW(hash1_copy, message1_copy) , "Hash1_copy is not good");
        assert(await IDLLCrypto.verifyHashPOW(hash2, message2) , "Hash2 is not good");

        assert(! (await IDLLCrypto.verifyHashPOW(hash1, message2)), "Hash1 is not good because message2 "+message2);
        assert(! (await IDLLCrypto.verifyHashPOW(hash1_copy, message2)), "Hash1_copy is not good because message2 "+message2);
        assert(! (await IDLLCrypto.verifyHashPOW(hash2, message1)), "Hash2 is not good because message1 "+message1);


        // console.log("IDLLCrypto worked 3")
    })

    it('hash Proof Of Work function string TESTS ', async ()=>{

        const message1 = "IDLLOLAR TEST 555 @##%";
        let hash1 = await IDLLCrypto.hashPOW_String(message1)
        let hash2 = await IDLLCrypto.hashPOW(message1)

        //assert( hash1 === "SNXuaXZy04A03wIDyWb1XDWomhrRwsez1nHQ", "Hash1 "+message1+ " : "+hash1+" vs " +"SNXuaXZy04A03wIDyWb1XDWomhrRwsez1nHQ is not good");

    });

    it('hash Proof Of Work function string ', async ()=>{

        //this.timeout(15000);

        const message1 = TestsHelper.makeId();
        const message1_copy = message1;

        const message2 = TestsHelper.makeId();

        let hash1 = await IDLLCrypto.hashPOW_String(message1)
        let hash1_copy = await IDLLCrypto.hashPOW_String(message1_copy)
        let hash2 = await IDLLCrypto.hashPOW_String(message2)

        // console.log("hash1 string", hash1);
        // console.log("hash1_copy string", hash1_copy);
        // console.log("hash2 string", hash2);

        assert(typeof hash1 === 'string', "Hash1 is not String");
        assert(typeof hash1_copy === 'string', "Hash1_copy is not String");
        assert(typeof hash2 === 'string', "Hash2 is not String");

        assert(await IDLLCrypto.verifyHashPOW(hash1, message1), "Hash1 is not good");
        assert(await IDLLCrypto.verifyHashPOW(hash1_copy, message1_copy) , "Hash1_copy is not good");
        assert(await IDLLCrypto.verifyHashPOW(hash2, message2) , "Hash2 is not good");

        assert(! (await IDLLCrypto.verifyHashPOW(hash1, message2)), "Hash1 is not good because message2 "+message2);
        assert(! (await IDLLCrypto.verifyHashPOW(hash1_copy, message2)), "Hash1_copy is not good because message2 "+message2);
        assert(! (await IDLLCrypto.verifyHashPOW(hash2, message1)), "Hash2 is not good because message1 "+message1);


    })

})




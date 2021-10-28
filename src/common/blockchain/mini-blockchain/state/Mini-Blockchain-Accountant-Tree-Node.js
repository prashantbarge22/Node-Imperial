import BufferExtended from "common/utils/BufferExtended";
import Serialization from "common/utils/Serialization";
import consts from 'consts/const_global'
import InterfaceMerkleRadixTreeNode from "common/trees/radix-tree/merkle-tree/Interface-Merkle-Radix-Tree-Node"
import Blockchain from "main-blockchain/Blockchain"
import IDLLCoins from "common/utils/coins/IDLL-Coins"
import InterfaceBlockchainAddressHelper from 'common/blockchain/interface-blockchain/addresses/Interface-Blockchain-Address-Helper'
import BlockchainMiningReward from 'common/blockchain/global/Blockchain-Mining-Reward';

class MiniBlockchainAccountantTreeNode extends InterfaceMerkleRadixTreeNode{

    constructor (root, parent, edges, value){

        super(root, parent, edges);

        //console.log("value", value);
        this.hash = Buffer.alloc(32);
        this.total = 0;

        if ( value ) {

            value.balances = value.balances||[];

            this.balances = value.balances;
            this.nonce = 0;

            this.value = this.balances;

        } else {
            this.balances = undefined;
            this.nonce = 0;
            this.value = undefined;
        }

    }

    updateBalanceToken(value, tokenId){

        if ( !tokenId ) {
            tokenId = Buffer.alloc(consts.MINI_BLOCKCHAIN.TOKENS.IDLL_TOKEN.LENGTH);
            tokenId[0] = consts.MINI_BLOCKCHAIN.TOKENS.IDLL_TOKEN.VALUE;
        }

        if ( !this.balances )
            throw {message: 'balances is null', amount: value, tokenId: tokenId };

        if (!Buffer.isBuffer(tokenId))
            tokenId = BufferExtended.fromBase(tokenId);

        if (typeof value === 'string') value = parseInt(value);

        if (!IDLLCoins.validateCoinsNumber(value))
            throw {message: "Value is invalid for update", value: value};

        let result;

        for (let i = 0; i < this.balances.length; i++)
            if (BufferExtended.safeCompare(this.balances[i].id, tokenId )) {
                this.balances[i].amount += value;
                result = this.balances[i];
                break;
            }


        if ( !result && tokenId ){

            this.balances.push ({
                id: tokenId,
                amount: value,
            });

            result = this.balances[this.balances.length-1];
        }

        if ( !result )
            throw { message: 'token is empty',  amount: value, tokenId: tokenId };

        if ( result.amount < 0 )
            throw { message: 'balances became negative', amount: value, tokenId: tokenId };

        if (! IDLLCoins.validateCoinsNumber(result.amount))
            throw {message: "balance is no longer a valid number"};

        this._deleteBalancesEmpty();

        if (this.balances.length === 0)
            return null; //to be deleted

        return {
            tokenId: result.id,
            amount: result.amount,
        }

    }

    getBalance(tokenId){

        if ( !tokenId ) {
            tokenId = Buffer.alloc(consts.MINI_BLOCKCHAIN.TOKENS.IDLL_TOKEN.LENGTH);
            tokenId[0] = consts.MINI_BLOCKCHAIN.TOKENS.IDLL_TOKEN.VALUE;
        }

        if (!Buffer.isBuffer(tokenId))
            tokenId = BufferExtended.fromBase(tokenId);

        if (this.balances )
            for (let i = 0; i < this.balances.length; i++)
                if ( BufferExtended.safeCompare(this.balances[i].id, tokenId) )
                    return this.balances[i].amount;

        return 0;

    }

    getBalances(){

        if (!this.isLeaf())
            return null;

        let list = { };

        // Converting balances into Hex Object fo
        for (let i = 0; i < this.balances.length; i++)
            list[ "0x"+this.balances[i].id.toString("hex") ] = this.balances[i].amount;


        return list;
    }

    hasBalances(){

        let balances = this.getBalances();

        if ( !balances ) return false;

        if (Object.keys(balances).length === 0 && balances.constructor === Object)
            return false;

        return true;

    }

    _deleteBalancesEmpty(){

        let result = false;

        if (this.balances )
            for (let i = this.balances.length - 1; i >= 0; i--)
                if ( !this.balances[i] || this.balances[i].amount === 0) {
                    this.balances.splice(i, 1);
                    result = true;
                }

        return true;

    }

    _serializeBalance(balance){

        return Buffer.concat([
            Serialization.serializeToFixedBuffer(consts.MINI_BLOCKCHAIN.TOKENS.OTHER_TOKENS.LENGTH, balance.id),
            Serialization.serializeNumber7Bytes(balance.amount)
        ]);
    }

    _serializeBalanceIDLLToken(balance){
        return Buffer.concat([
            Serialization.serializeToFixedBuffer(consts.MINI_BLOCKCHAIN.TOKENS.IDLL_TOKEN.LENGTH, balance.id),
            Serialization.serializeNumber7Bytes(balance.amount)
        ]);
    }

    serializeNodeData( includeEdges, includeHashes ){

        try {

            let hash = InterfaceMerkleRadixTreeNode.prototype.serializeNodeDataHash.call(this, includeHashes);

            if ( !hash ) hash = Buffer.alloc(0);

            let dataBuffer = Buffer.alloc(0);

            if ( this.isLeaf() ) {

                let balancesBuffers = [];
                if (this.balances.length > 0) {

                    //let serialize IDLL Token
                    let IDLLTokenIndex = null;
                    for (let i = 0; i < this.balances.length; i++)
                        if ((this.balances[i].id.length === consts.MINI_BLOCKCHAIN.TOKENS.IDLL_TOKEN.LENGTH) && (this.balances[i].id[0] === consts.MINI_BLOCKCHAIN.TOKENS.IDLL_TOKEN.VALUE)) {
                            IDLLTokenIndex = i;
                            break;
                        }

                    // in case it was not serialize d and it is empty
                    if (IDLLTokenIndex === null) {

                        if (this.balances.length > 0) {
                            let idIDLL = Buffer.alloc(consts.MINI_BLOCKCHAIN.TOKENS.IDLL_TOKEN.LENGTH);
                            idIDLL[0] = consts.MINI_BLOCKCHAIN.TOKENS.IDLL_TOKEN.VALUE;

                            balancesBuffers.push(this._serializeBalanceIDLLToken({id: idIDLL, amount: 0}));
                        }

                    } else {
                        balancesBuffers.push(this._serializeBalanceIDLLToken(this.balances[IDLLTokenIndex]));
                    }

                    //let serialize everything else
                    for (let i = 0; i < this.balances.length; i++)
                        if (i !== IDLLTokenIndex)
                            balancesBuffers.push(this._serializeBalance(this.balances[i]));

                }
                let balancesBuffered = Buffer.concat(balancesBuffers);

                dataBuffer  = Buffer.concat([Serialization.serializeNumber2Bytes(this.nonce), Serialization.serializeNumber1Byte(balancesBuffers.length), balancesBuffered]);
            }


            return Buffer.concat( [ hash, dataBuffer ] );

        } catch (exception){
            console.log("Error Serializing MiniAccountantTree NodeData", exception);
            throw exception;
        }

    }

    deserializeNodeData(buffer, offset, includeEdges, includeHashes){

        offset = offset || 0;

        // deserializing this.value
        offset = InterfaceMerkleRadixTreeNode.prototype.deserializeNodeDataHash.call(this, buffer, offset, includeHashes);

        try {

            if (this.isLeafBasedOnParents()){

                this.nonce = Serialization.deserializeNumber2Bytes( buffer, offset ); //2 byte
                offset += 2;

                let balancesLength = Serialization.deserializeNumber1Bytes( buffer, offset ); //1 byte
                offset += 1;

                this.balances = []; // initialization
                if (balancesLength > 0){

                    // IDLL balance
                    let IDLLId =  BufferExtended.substr(buffer, offset, consts.MINI_BLOCKCHAIN.TOKENS.IDLL_TOKEN.LENGTH) ;
                    offset += consts.MINI_BLOCKCHAIN.TOKENS.IDLL_TOKEN.LENGTH;

                    //IDLL token
                    if (IDLLId[0] !== consts.MINI_BLOCKCHAIN.TOKENS.IDLL_TOKEN.VALUE)
                        throw {message: "IDLL token is incorrect", token: IDLLId };

                    let result = Serialization.deserializeNumber7Bytes(buffer, offset);
                    offset += 7;


                    this.updateBalanceToken(result, IDLLId);


                    if (balancesLength > 1) {

                        //rest of tokens , in case there are
                        for (let i = 1; i < balancesLength; i++) {

                            let tokenId = BufferExtended.substr(buffer, offset, consts.MINI_BLOCKCHAIN.TOKENS.OTHER_TOKENS.LENGTH);
                            offset += consts.MINI_BLOCKCHAIN.TOKENS.OTHER_TOKENS.LENGTH;

                            result = Serialization.deserializeNumber7Bytes(buffer, offset );
                            offset += 7;

                            this.updateBalanceToken(result, tokenId);
                        }
                    }

                }

                this._deleteBalancesEmpty();

            } else {
                this.balances = undefined;
                this.nonce = undefined;
            }


            return offset;

        } catch (exception){
            console.error("error deserializing tree node", exception);
            throw exception;
        }

    }


    validateTreeNode(validateMerkleTree){

        if (!InterfaceMerkleRadixTreeNode.prototype.validateTreeNode.apply(this, arguments)) return false;

        if (!this.isLeaf()) {

            if (this.balances !== undefined) throw {message: "balance is not undefined"};
            if (this.nonce !== undefined) throw {message: "nonce is not undefined"};

        } else {
            if (!Number.isInteger(this.nonce)) throw {message: "nonce is invalid"};

            if (this.nonce < 0) throw {message: "nonce is less than 0"};
            if (this.nonce > 0xFFFF) throw {message: "nonce is higher than 0xFFFF"};

            if (this.balances !== undefined)
                for (let i = 0; i < this.balances.length; i++) {

                    if (!IDLLCoins.validateCoinsNumber(this.balances[i].amount))
                        throw {message: "balance.amount is not a valid Coin Number"};

                    if (this.balances[i].amount < 0) throw {message: "balance.amount is invalid number"};

                    if (!Buffer.isBuffer(this.balances[i].id)) throw {message: "token is not a buffer"};

                    if (this.balances[i].id.length === consts.MINI_BLOCKCHAIN.TOKENS.IDLL_TOKEN.LENGTH) {
                        if (this.balances[i].id[0] !== consts.MINI_BLOCKCHAIN.TOKENS.IDLL_TOKEN.VALUE) throw {message: "IDLL Token is invalid"}
                    } else {

                        if (consts.MINI_BLOCKCHAIN.TOKENS.OTHER_TOKENS.ACTIVATED !== -1 && Blockchain.blockchain.blocks.length > consts.MINI_BLOCKCHAIN.TOKENS.OTHER_TOKENS.ACTIVATED) {

                            if (this.balances[i].id.length !== consts.MINI_BLOCKCHAIN.TOKENS.OTHER_TOKENS.LENGTH)
                                throw {message: "Token doesn't have the correct length"}
                            else {

                                //TODO Token Validation - based on the smart contract

                            }

                        } else throw {message: "Other Token is invalid"};

                    }


                }

            //TODO Window Transactions
            if (this.isLeaf() && this.balances.length === 0 && this.nonce === 0) throw {message: "Address should not exist"};
        }

        if (validateMerkleTree)
            return this._validateHash(this.root);

        return true;

    }

    isLeaf(){
        return this.balances !== undefined
        //return this.isLeafBasedOnParents();
    }

    isLeafBasedOnParents(){

        let node = this;
        let count = 0;
        while (node !== null){

            if (node.parent !== null)
                for (let i=0; i<node.parent.edges.length; i++)
                    if (node.parent.edges[i].targetNode === node){
                        count += node.parent.edges[i].label.length;
                        break;
                    }


            node = node.parent;
        }

        if (count === consts.ADDRESSES.ADDRESS.LENGTH)
            return true;
        else
        if (count > consts.ADDRESSES.ADDRESS.LENGTH)
            throw {message: "Label is longer than any address"};
        else
            return false;

    }

    getAddress(){

        let node = this;
        let buffers = [];

        while (node !== null){

            if (node.parent !== null)
                for (let i=0; i<node.parent.edges.length; i++)
                    if (node.parent.edges[i].targetNode === node){

                        buffers.unshift(node.parent.edges[i].label);
                        break;
                    }


            node = node.parent;

        }


        if (buffers.length === 0) return null;
        else return BufferExtended.toBase (  InterfaceBlockchainAddressHelper.generateAddressWIF( Buffer.concat( buffers ) ) );

    }


    getAccountantTreeList(list, bIncludeMiningReward = false, excludeEmpty = true, countOnly = undefined ){

        if (this.isLeaf()) {

            let balance = this.getBalance();

            if (excludeEmpty)
                if (balance === 0) return false;

            if (!bIncludeMiningReward) {
                for (let i = 1; i <= 40; i++)
                    if (balance === BlockchainMiningReward.getFinalReward(i))
                        return;
            }


            list.push({node: this, balance: balance });

        }

        for (let i = 0; i < this.edges.length; i++)
            this.edges[i].targetNode.getAccountantTreeList(list, bIncludeMiningReward, excludeEmpty, countOnly );


        if (this === this.root){ //root, let's process it

            list.sort( (a, b) => b.balance - a.balance );

            if ( countOnly  )
                list = list.splice(0, countOnly);

            for (let i=list.length-1; i>=0; i--) {

                list[i].address = list[i].node.getAddress();

                if (!bIncludeMiningReward)
                    if ( [ "IDLL$gDZwjjD7ZE5+AE+44ITr8yo5E2aXYT3mEH$", "IDLL$gDx8CjURuVS+LSI91ufs@LH2QpIdSzaAxT$", "IDLL$gD5@1VU3ZiJ1siQxib#wAb4xeQTUS2zscn$", "IDLL$gCP41xykgy6K$LyGHCVNDZ44@PTp1kGufP$", "IDLL$gAHF1r0FJjDxWvEAZe3MV8izwWKEXhNt03$", "IDLL$gCSiJ0yUAV#TPnoFDYJu+opGmKCHHXDw3z$", "IDLL$gD#Ws@o65Imk9DLWJTsPRd0oMxnUeU7S@r$", "IDLL$gAuP5uvvJo6c#hxTtor9n5GV5m1Ysd0zjT$", "IDLL$gAvnyWnGSVcrVu4ERMEK8PHm8WCZiwa2ET$", "IDLL$gDvYAPvIDAe+gnqByY$A2kMF21yiQiE#0j$", "IDLL$gAIhBLJi6yvx#+PZtxMg5piwIW0p1#4HU3$", "IDLL$gDH2IIR+DprpggngzC5Ssw5eMjgiPFM@sf$", "IDLL$gC9ri$@bfpHLhiDppCfcxDzRvnNLH79L2j$", "IDLL$gBwnT+PoK1sI9xyz1PI1t9ZqVK5htrwLWn$", "\n" +
                        "IDLL$gBAjU3JemoRXZ5KNEG$b45QE6aI+oDUggb$", "IDLL$gBcJMPpviZNU4PT8Y5p+ijtM@ohPc@5CGX$", "IDLL$gByeqrPHBGvZfwssFbLtFc64Tt6WQDknXP$" ].indexOf( list[i].address ) >= 0 ){
                        list.splice(i,1);
                        i++;
                    }

            }

            return list;

        }

    }

}

export default MiniBlockchainAccountantTreeNode
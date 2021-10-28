/* eslint-disable */
import IDLLCoins from "common/utils/coins/IDLL-Coins"
import MiniBlockchainTransaction from "./../../../mini-blockchain/transactions/trasanction/Mini-Blockchain-Transaction"
import NodesList from 'node/lists/Nodes-List';
import consts from 'consts/const_global'

class InterfaceBlockchainTransactionsWizard{

    constructor(transactions, blockchain, wallet, ){

        this.blockchain = blockchain;
        this.transactions = transactions;
        this.wallet = wallet;

    }

    async deserializeValidateTransaction(transaction){

        let myTransaction = new MiniBlockchainTransaction(this.blockchain,undefined,undefined,0,undefined,undefined,undefined,false,false,false,false,false,false);

        await myTransaction.deserializeTransaction(transaction.data,0,true);

        return myTransaction;

    }

    async createTransactionSimple(address, toAddress, toAmount, fee, currencyTokenId, password = undefined, timeLock){

        let process = await this.validateTransaction( address, toAddress, toAmount, fee, currencyTokenId, password, timeLock, undefined);

        if (process.result) {
            return this.propagateTransaction(process.signature, process.transaction);
        }
        else
            return process;

    }

    async validateTransaction(address, toAddress, toAmount, fee, currencyTokenId, password = undefined, timeLock, nonce, skipValidationNonce=false){

        try {

            if (typeof toAmount === 'string')
                toAmount = parseInt(toAmount);

        } catch (exception){

            if (typeof exception === "object" && exception.message !== undefined)
                exception = exception.message;

            return { result:false,  message: "Amount is not a valid number", reason: exception }
        }

        try {

            if (typeof fee ==='string')
                fee = parseInt(fee);

        } catch (exception){

            if (typeof exception === "object" && exception.message !== undefined)
                exception = exception.message;

            return { result:false,  message: "Fee is not a valid number", reason: exception }
        }

        try {

            address = this.wallet.getAddress(address);

        } catch (exception){

            console.error("Creating a new transaction raised an exception - Getting Address", exception);

            if (typeof exception === "object" && exception.message !== undefined)
                exception = exception.message;

            return { result:false,  message: "Get Address failed", reason: exception }

        }

        let transaction = undefined;

        try {

            let to;
            let toAmountTotal;

            if (toAddress !== undefined && typeof toAmount === "number"){

                toAmountTotal = toAmount;

                to = {
                    addresses: [{
                        unencodedAddress: toAddress,
                        amount: toAmount
                    },
                ]};

            } else if (Array.isArray(toAddress)) {

                toAmountTotal = 0;

                for (let i=0; i<toAddress.length; i++)
                    toAmountTotal += toAddress[i].amount;

                to = {
                    addresses: toAddress
                };


            }

            let from = {
                addresses: [
                    {
                        unencodedAddress: address,
                        publicKey: undefined,
                        amount: toAmountTotal + (fee||0)
                    }
                ],
                currencyTokenId: currencyTokenId
            };


            transaction = await this.transactions._createTransaction(

                from, //from
                to, //to
                nonce, //nonce
                timeLock, //timeLock
                undefined, //version @FIXME This is not calculated if validateVersion === false,
                undefined, //txId
                false, false, true, true, true, false,
            );

        } catch (exception) {
            console.error("Creating a new transaction raised an exception - Failed Creating a transaction", exception);

            if (typeof exception === "object" && exception.message !== undefined) exception = exception.message;

            return { result:false,  message: "Failed Creating a transaction", reason: exception }
        }


        if (fee === undefined) {
            fee = this.calculateFeeWizzard( transaction.serializeTransaction(true)) ;
            transaction.from.addresses[0].amount += fee;

            // This is needed because the fromAmount is changing
            transaction.serializeTransaction(true);
        }

        let signature;
        try{
            signature = await address.signTransaction(transaction, password);
        } catch (exception){
            console.error("Creating a new transaction raised an exception - Failed Signing the Transaction", exception);

            if (typeof exception === "object" && exception.message ) exception = exception.message;
            return { result:false,  message: "Wrong password", reason: exception }
        }

        try{

            if (!skipValidationNonce){

                let blockValidationType = {
                    "take-transactions-list-in-consideration": {
                        validation: true
                    }
                };

                if (!transaction.validateTransactionOnce( this.blockchain.blocks.length-1, blockValidationType ))
                    throw {message: "Transaction is invalid"};

            }

        } catch (exception){
            console.error("Creating a new transaction raised an exception - Failed Validating Transaction", exception);

            if (typeof exception === "object" && exception.message !== undefined) exception = exception.message;
            return { result:false,  message: "Failed Signing the transaction", reason: exception }
        }

        return {

            result: true,
            transaction: transaction,
            signature: signature

        };

    }

    async propagateTransaction(signature,transaction){

        try{

            await this.transactions.pendingQueue.includePendingTransaction(transaction);

        } catch (exception){
            console.error("Creating a new transaction raised an exception - Including Pending Transaction", exception);

            if (typeof exception === "object" && exception.message !== undefined) exception = exception.message;
            return { result:false,  message: "Including Pending Transaction", reason: exception }
        }

        return {
            result: true,
            message: "Your transaction is pending...",
            signature: signature,
            txId: transaction.txId,
            transaction: transaction,
        }

    }

    calculateFeeWizzard(serialization, IDLLPerByte){

        if (IDLLPerByte === undefined)
            IDLLPerByte = consts.MINING_POOL.MINING.FEE_PER_BYTE;

        // let factor = Math.trunc( serialization.length / 230 ) + 1;
        // IDLLPerByte = factor * IDLLPerByte;

        return serialization.length * IDLLPerByte;

    }

    calculateFeeSimple(){
        return this.calculateFeeWizzard( Buffer.alloc(141) );
    }

}

export default InterfaceBlockchainTransactionsWizard;

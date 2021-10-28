import InterfaceBlockchainTransactionTo from 'common/blockchain/interface-blockchain/transactions/transaction/Interface-Blockchain-Transaction-To'
import IDLLCoins from "common/utils/coins/IDLL-Coins"

class MiniBlockchainTransactionTo extends InterfaceBlockchainTransactionTo {

    processTransactionTo(multiplicationFactor = 1, revertActions, showUpdate){

        for (let i = 0; i < this.addresses.length; i++) {

            if (!IDLLCoins.validateCoinsNumber(this.addresses[i].amount))
                throw {message: "Amount is not a number", address: this.addresses[i]};

            this.transaction.blockchain.accountantTree.updateAccount( this.addresses[i].unencodedAddress, this.addresses[i].amount * multiplicationFactor, this.transaction.from.currencyTokenId, revertActions, showUpdate);

        }

        return true;

    }

}

export default MiniBlockchainTransactionTo
import consts from 'consts/const_global';
import BufferExtended from "common/utils/BufferExtended";

class BlockchainGenesis{

    constructor(){

        this.hashPrev = Buffer.from("731D46C131EB6DD4667A96BDC27BAF9223BEC72C3468DFB6BA52C460E76423A4", "hex"); //main net

        this.timeStamp = 0;

        if(!consts.DEBUG)
            this.timeStampOffset = 1524742312; //main net
        else
            this.timeStampOffset = 1529344475; //test net

        this.difficultyTarget = Buffer.from ( "00029112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb", "hex" ); //hard difficulty
        this.difficultyTargetPOS = Buffer.from ( "00000000000006ece3173c784c7d4871c061a1f20eca8f33aa76fb15846e0c13", "hex" ); //smallest difficulty

        this.address = BufferExtended.fromBase("IDLL$gBzsiV+$FARK8qSGqs09V6AEDBi#@fP6n7$"); // genesis address

        this.height = 0;
    }

    validateGenesis(block){

        if ( block.timeStamp.length !== this.timeStamp.length )
            throw {message: "Timestamp doesn't match", timestamp: block.timeStamp};

        if ( block.timeStamp > 0x000FFFFF)
            throw {message: "Timestamp is too old ", timestamp: block.timeStamp};

        if (block.timeStamp < 0)
            throw {message: "Timestamp is invalid", timeStamp: block.timeStamp}
    }

    get level(){
        return 0;
    }

    PoSModulo(height){
        if (typeof height === "string") height = Number.parseInt(height);

        // no pos activated
        if (height < consts.BLOCKCHAIN.HARD_FORKS.POS_ACTIVATION) return 0; // NO POS
        if (height < consts.BLOCKCHAIN.HARD_FORKS.POS90_ACTIVATION) return 30; // 66% POS
        if (height < consts.BLOCKCHAIN.HARD_FORKS.POS100_ACTIVATION) return 100; // 90% POS
        return 0; // 100% POS

    }

    isPoSActivated(height){

        if (typeof height === "string") height = Number.parseInt(height);

        // no pos activated
        if (height < consts.BLOCKCHAIN.HARD_FORKS.POS_ACTIVATION)
            return false;

        // pos 66% activated
        if (height < consts.BLOCKCHAIN.HARD_FORKS.POS90_ACTIVATION){

            //0..19  pos
            //20..29 pow
            return height % 30 < 20;

            //29,0..19  pos
            //20..29 pow

        } else  if (height < consts.BLOCKCHAIN.HARD_FORKS.POS100_ACTIVATION) { // pos 90% activated

            //0..9 pos          -10%
            //9..19 pos         -10%
            //19..29 pos        -10%
            //29..39 pos        -10%
            //39..49 pos        -10%
            //49..59 pos        -10%
            //59..69 pos        -10%
            //69..79 pos        -10%
            //79..89 pos        -10%

            //89..99 pow        -10%

            // total 90 + 10
            // pos = 90 / 100
            // pow = 10 / 100

            return height % 100 < 90;

        } else
            return true; // pos 100%

    }

}

export default new BlockchainGenesis();

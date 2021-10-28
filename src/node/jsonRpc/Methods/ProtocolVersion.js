import {RpcMethod} from './../../../jsonRpc';

/**
 * The current IDLL protocol version.
 */
class ProtocolVersion extends RpcMethod
{
    constructor(name, version) {
        super(name);

        this._sVersion = version;
    }

    getHandler(args) {
        return this._sVersion;
    }
}

export default ProtocolVersion;

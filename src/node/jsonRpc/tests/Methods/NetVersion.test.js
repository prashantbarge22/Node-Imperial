import { assert } from 'chai';

import RpcMethod  from '../../../../jsonRpc/RpcMethod';
import NetVersion from '../../Methods/NetVersion';

describe('NetVersionTest', () => {
    it ('should inherit from JsonRpc\\RpcMethod', () => {
        const oMethod = new NetVersion('name', 'IDLL MainNet');
        assert.instanceOf(oMethod, RpcMethod);
    });

    it ('should return the network version', () => {
        const oMethod = new NetVersion('name', {
            id: 1,
            name: 'IDLL MainNet'
        });
        assert.deepEqual(oMethod.getHandler(), {
            id: 1,
            name: 'IDLL MainNet'
        });
    });
});

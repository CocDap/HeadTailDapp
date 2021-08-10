import { scriptToHash } from '@nervosnetwork/ckb-sdk-utils';
import { Address, AddressType, getDefaultPrefix, } from './address';
import { generateAddress, LumosConfigs } from '../utils';
import { validators, transformers } from 'ckb-js-toolkit';
export class Script {
    constructor(codeHash, args, hashType) {
        this.codeHash = codeHash;
        this.args = args;
        this.hashType = hashType;
    }
    static fromRPC(data) {
        if (!data)
            return undefined;
        validators.ValidateScript(data);
        return new Script(data.code_hash, data.args, data.hash_type);
    }
    sameWith(script) {
        validators.ValidateScript(transformers.TransformScript(script));
        return (this.args === script.args &&
            this.codeHash === script.codeHash &&
            this.hashType === script.hashType);
    }
    validate() {
        validators.ValidateScript(transformers.TransformScript(this));
        return true;
    }
    serializeJson() {
        return {
            code_hash: this.codeHash,
            args: this.args,
            hash_type: this.hashType,
        };
    }
    toHash() {
        return scriptToHash(this);
    }
    toAddress(prefix = getDefaultPrefix()) {
        const address = generateAddress(this.serializeJson(), {
            config: LumosConfigs[prefix],
        });
        return new Address(address, AddressType.ckb);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZGVscy9zY3JpcHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzVELE9BQU8sRUFDTCxPQUFPLEVBQ1AsV0FBVyxFQUVYLGdCQUFnQixHQUNqQixNQUFNLFdBQVcsQ0FBQztBQUNuQixPQUFPLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTFELE1BQU0sT0FBTyxNQUFNO0lBT2pCLFlBQ1MsUUFBZ0IsRUFDaEIsSUFBWSxFQUNaLFFBQWtCO1FBRmxCLGFBQVEsR0FBUixRQUFRLENBQVE7UUFDaEIsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLGFBQVEsR0FBUixRQUFRLENBQVU7SUFDeEIsQ0FBQztJQVZKLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBUztRQUN0QixJQUFJLENBQUMsSUFBSTtZQUFFLE9BQU8sU0FBUyxDQUFDO1FBQzVCLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFRRCxRQUFRLENBQUMsTUFBYztRQUNyQixVQUFVLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNoRSxPQUFPLENBQ0wsSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsSUFBSTtZQUN6QixJQUFJLENBQUMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxRQUFRO1lBQ2pDLElBQUksQ0FBQyxRQUFRLEtBQUssTUFBTSxDQUFDLFFBQVEsQ0FDbEMsQ0FBQztJQUNKLENBQUM7SUFFRCxRQUFRO1FBQ04sVUFBVSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDOUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsYUFBYTtRQUNYLE9BQU87WUFDTCxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDeEIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRO1NBQ3pCLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTTtRQUNKLE9BQU8sWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxTQUFTLENBQUMsU0FBd0IsZ0JBQWdCLEVBQUU7UUFDbEQsTUFBTSxPQUFPLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUNwRCxNQUFNLEVBQUUsWUFBWSxDQUFDLE1BQU0sQ0FBQztTQUM3QixDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0MsQ0FBQztDQUNGIn0=
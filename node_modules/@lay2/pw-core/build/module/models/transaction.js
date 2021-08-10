import { ECDSA_WITNESS_LEN } from '../constants';
import { validators, normalizers, transformers, Reader } from 'ckb-js-toolkit';
import { SerializeTransaction, SerializeWitnessArgs, } from '@ckb-lumos/types/lib/core';
export class Transaction {
    constructor(raw, witnessArgs, witnessLengths = [ECDSA_WITNESS_LEN]) {
        this.raw = raw;
        this.witnessArgs = witnessArgs;
        this.witnesses = raw.inputs.map((_) => '0x');
        for (let i = 0; i < witnessLengths.length; i++) {
            this.witnesses[i] = '0x' + '0'.repeat(witnessLengths[i] - 2);
        }
        if (!Array.isArray(witnessArgs))
            throw new Error('[Transaction] - witnessArgs must be an Array!');
        for (let i = 0; i < witnessArgs.length; i++) {
            this.witnesses[i] = new Reader(SerializeWitnessArgs(normalizers.NormalizeWitnessArgs(this.witnessArgs[i]))).serializeJson();
        }
    }
    sameWith(tx) {
        validators.ValidateTransaction(transformers.TransformTransaction(tx));
        return (tx.raw.sameWith(this.raw) &&
            tx.witnesses.join('-') === this.witnesses.join('-'));
    }
    getSize() {
        const tx = transformers.TransformTransaction(this);
        validators.ValidateTransaction(tx);
        // TODO: find out why the size is always smaller than the correct value by exact '4'
        return (SerializeTransaction(normalizers.NormalizeTransaction(tx)).byteLength + 4);
    }
    validate() {
        validators.ValidateTransaction(transformers.TransformTransaction(this));
        return this;
    }
    transform() {
        return transformers.TransformTransaction(this.serializeJson());
    }
    serializeJson() {
        return {
            ...this.raw,
            witnesses: this.witnesses,
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kZWxzL3RyYW5zYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNqRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0UsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixvQkFBb0IsR0FDckIsTUFBTSwyQkFBMkIsQ0FBQztBQUduQyxNQUFNLE9BQU8sV0FBVztJQUd0QixZQUNTLEdBQW1CLEVBQ25CLFdBQTBCLEVBQ2pDLGlCQUEyQixDQUFDLGlCQUFpQixDQUFDO1FBRnZDLFFBQUcsR0FBSCxHQUFHLENBQWdCO1FBQ25CLGdCQUFXLEdBQVgsV0FBVyxDQUFlO1FBR2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQzlEO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO1lBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsK0NBQStDLENBQUMsQ0FBQztRQUNuRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMzQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksTUFBTSxDQUM1QixvQkFBb0IsQ0FDbEIsV0FBVyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDdEQsQ0FDRixDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ25CO0lBQ0gsQ0FBQztJQUVELFFBQVEsQ0FBQyxFQUFlO1FBQ3RCLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0RSxPQUFPLENBQ0wsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUN6QixFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FDcEQsQ0FBQztJQUNKLENBQUM7SUFFRCxPQUFPO1FBQ0wsTUFBTSxFQUFFLEdBQUcsWUFBWSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25ELFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVuQyxvRkFBb0Y7UUFDcEYsT0FBTyxDQUNMLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQzFFLENBQUM7SUFDSixDQUFDO0lBRUQsUUFBUTtRQUNOLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN4RSxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxTQUFTO1FBQ1AsT0FBTyxZQUFZLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELGFBQWE7UUFDWCxPQUFPO1lBQ0wsR0FBRyxJQUFJLENBQUMsR0FBRztZQUNYLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztTQUMxQixDQUFDO0lBQ0osQ0FBQztDQUNGIn0=
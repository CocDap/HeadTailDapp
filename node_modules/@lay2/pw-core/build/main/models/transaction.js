"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const constants_1 = require("../constants");
const ckb_js_toolkit_1 = require("ckb-js-toolkit");
const core_1 = require("@ckb-lumos/types/lib/core");
class Transaction {
    constructor(raw, witnessArgs, witnessLengths = [constants_1.ECDSA_WITNESS_LEN]) {
        this.raw = raw;
        this.witnessArgs = witnessArgs;
        this.witnesses = raw.inputs.map((_) => '0x');
        for (let i = 0; i < witnessLengths.length; i++) {
            this.witnesses[i] = '0x' + '0'.repeat(witnessLengths[i] - 2);
        }
        if (!Array.isArray(witnessArgs))
            throw new Error('[Transaction] - witnessArgs must be an Array!');
        for (let i = 0; i < witnessArgs.length; i++) {
            this.witnesses[i] = new ckb_js_toolkit_1.Reader(core_1.SerializeWitnessArgs(ckb_js_toolkit_1.normalizers.NormalizeWitnessArgs(this.witnessArgs[i]))).serializeJson();
        }
    }
    sameWith(tx) {
        ckb_js_toolkit_1.validators.ValidateTransaction(ckb_js_toolkit_1.transformers.TransformTransaction(tx));
        return (tx.raw.sameWith(this.raw) &&
            tx.witnesses.join('-') === this.witnesses.join('-'));
    }
    getSize() {
        const tx = ckb_js_toolkit_1.transformers.TransformTransaction(this);
        ckb_js_toolkit_1.validators.ValidateTransaction(tx);
        // TODO: find out why the size is always smaller than the correct value by exact '4'
        return (core_1.SerializeTransaction(ckb_js_toolkit_1.normalizers.NormalizeTransaction(tx)).byteLength + 4);
    }
    validate() {
        ckb_js_toolkit_1.validators.ValidateTransaction(ckb_js_toolkit_1.transformers.TransformTransaction(this));
        return this;
    }
    transform() {
        return ckb_js_toolkit_1.transformers.TransformTransaction(this.serializeJson());
    }
    serializeJson() {
        return Object.assign(Object.assign({}, this.raw), { witnesses: this.witnesses });
    }
}
exports.Transaction = Transaction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kZWxzL3RyYW5zYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDRDQUFpRDtBQUNqRCxtREFBK0U7QUFDL0Usb0RBR21DO0FBR25DLE1BQWEsV0FBVztJQUd0QixZQUNTLEdBQW1CLEVBQ25CLFdBQTBCLEVBQ2pDLGlCQUEyQixDQUFDLDZCQUFpQixDQUFDO1FBRnZDLFFBQUcsR0FBSCxHQUFHLENBQWdCO1FBQ25CLGdCQUFXLEdBQVgsV0FBVyxDQUFlO1FBR2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQzlEO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO1lBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsK0NBQStDLENBQUMsQ0FBQztRQUNuRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMzQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksdUJBQU0sQ0FDNUIsMkJBQW9CLENBQ2xCLDRCQUFXLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUN0RCxDQUNGLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDbkI7SUFDSCxDQUFDO0lBRUQsUUFBUSxDQUFDLEVBQWU7UUFDdEIsMkJBQVUsQ0FBQyxtQkFBbUIsQ0FBQyw2QkFBWSxDQUFDLG9CQUFvQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEUsT0FBTyxDQUNMLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDekIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQ3BELENBQUM7SUFDSixDQUFDO0lBRUQsT0FBTztRQUNMLE1BQU0sRUFBRSxHQUFHLDZCQUFZLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsMkJBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVuQyxvRkFBb0Y7UUFDcEYsT0FBTyxDQUNMLDJCQUFvQixDQUFDLDRCQUFXLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUMxRSxDQUFDO0lBQ0osQ0FBQztJQUVELFFBQVE7UUFDTiwyQkFBVSxDQUFDLG1CQUFtQixDQUFDLDZCQUFZLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN4RSxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxTQUFTO1FBQ1AsT0FBTyw2QkFBWSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCxhQUFhO1FBQ1gsdUNBQ0ssSUFBSSxDQUFDLEdBQUcsS0FDWCxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsSUFDekI7SUFDSixDQUFDO0NBQ0Y7QUF4REQsa0NBd0RDIn0=
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Script = void 0;
const ckb_sdk_utils_1 = require("@nervosnetwork/ckb-sdk-utils");
const address_1 = require("./address");
const utils_1 = require("../utils");
const ckb_js_toolkit_1 = require("ckb-js-toolkit");
class Script {
    constructor(codeHash, args, hashType) {
        this.codeHash = codeHash;
        this.args = args;
        this.hashType = hashType;
    }
    static fromRPC(data) {
        if (!data)
            return undefined;
        ckb_js_toolkit_1.validators.ValidateScript(data);
        return new Script(data.code_hash, data.args, data.hash_type);
    }
    sameWith(script) {
        ckb_js_toolkit_1.validators.ValidateScript(ckb_js_toolkit_1.transformers.TransformScript(script));
        return (this.args === script.args &&
            this.codeHash === script.codeHash &&
            this.hashType === script.hashType);
    }
    validate() {
        ckb_js_toolkit_1.validators.ValidateScript(ckb_js_toolkit_1.transformers.TransformScript(this));
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
        return ckb_sdk_utils_1.scriptToHash(this);
    }
    toAddress(prefix = address_1.getDefaultPrefix()) {
        const address = utils_1.generateAddress(this.serializeJson(), {
            config: utils_1.LumosConfigs[prefix],
        });
        return new address_1.Address(address, address_1.AddressType.ckb);
    }
}
exports.Script = Script;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZGVscy9zY3JpcHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsZ0VBQTREO0FBQzVELHVDQUttQjtBQUNuQixvQ0FBeUQ7QUFDekQsbURBQTBEO0FBRTFELE1BQWEsTUFBTTtJQU9qQixZQUNTLFFBQWdCLEVBQ2hCLElBQVksRUFDWixRQUFrQjtRQUZsQixhQUFRLEdBQVIsUUFBUSxDQUFRO1FBQ2hCLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQ3hCLENBQUM7SUFWSixNQUFNLENBQUMsT0FBTyxDQUFDLElBQVM7UUFDdEIsSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFPLFNBQVMsQ0FBQztRQUM1QiwyQkFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxPQUFPLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQVFELFFBQVEsQ0FBQyxNQUFjO1FBQ3JCLDJCQUFVLENBQUMsY0FBYyxDQUFDLDZCQUFZLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDaEUsT0FBTyxDQUNMLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLElBQUk7WUFDekIsSUFBSSxDQUFDLFFBQVEsS0FBSyxNQUFNLENBQUMsUUFBUTtZQUNqQyxJQUFJLENBQUMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxRQUFRLENBQ2xDLENBQUM7SUFDSixDQUFDO0lBRUQsUUFBUTtRQUNOLDJCQUFVLENBQUMsY0FBYyxDQUFDLDZCQUFZLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDOUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsYUFBYTtRQUNYLE9BQU87WUFDTCxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDeEIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRO1NBQ3pCLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTTtRQUNKLE9BQU8sNEJBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsU0FBUyxDQUFDLFNBQXdCLDBCQUFnQixFQUFFO1FBQ2xELE1BQU0sT0FBTyxHQUFHLHVCQUFlLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFO1lBQ3BELE1BQU0sRUFBRSxvQkFBWSxDQUFDLE1BQU0sQ0FBQztTQUM3QixDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksaUJBQU8sQ0FBQyxPQUFPLEVBQUUscUJBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQyxDQUFDO0NBQ0Y7QUE5Q0Qsd0JBOENDIn0=
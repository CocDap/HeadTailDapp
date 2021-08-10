"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentEthAddress = exports.getCurrentEthAccount = exports.getEthAccounts = exports.createChoiceSignaturePK = exports.createChoiceSignature = exports.domainSeparator = exports.useExistingHeadTailContract = exports.deployHeadTailContract = void 0;
/* eslint-disable @typescript-eslint/camelcase */
const web3_1 = __importDefault(require("web3"));
const ethereumjs_util_1 = require("ethereumjs-util");
const eth_sig_util_1 = require("eth-sig-util");
const HeadTailJSON = __importStar(require("../build/contracts/HeadTail.json"));
const EIP712Domain = [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'chainId', type: 'uint256' },
    { name: 'verifyingContract', type: 'address' }
];
async function deployHeadTailContract(web3, account) {
    const HeadTailContract = new web3.eth.Contract(HeadTailJSON.abi);
    return HeadTailContract.deploy({
        data: HeadTailJSON.bytecode,
        arguments: []
    }).send({
        from: account,
        gas: 6000000,
        gasPrice: '0'
    });
}
exports.deployHeadTailContract = deployHeadTailContract;
async function useExistingHeadTailContract(web3, address) {
    const HeadTailContract = new web3.eth.Contract(HeadTailJSON.abi, address);
    return HeadTailContract;
}
exports.useExistingHeadTailContract = useExistingHeadTailContract;
async function domainSeparator(name, version, chainId, verifyingContract) {
    return `0x${eth_sig_util_1.TypedDataUtils.hashStruct('EIP712Domain', { name, version, chainId, verifyingContract }, { EIP712Domain }).toString('hex')}`;
}
exports.domainSeparator = domainSeparator;
function getSigningData(choice, secret, chainId, verifyingContractAddress) {
    return {
        types: {
            EIP712Domain,
            Mail: [
                { name: 'choice', type: 'bool' },
                {
                    name: 'secret',
                    type: 'string'
                }
            ]
        },
        domain: {
            name: 'HeadTail',
            version: '1',
            chainId,
            verifyingContract: verifyingContractAddress
        },
        primaryType: 'Mail',
        message: {
            choice,
            secret
        }
    };
}
async function createChoiceSignature(accountAddress, choice, secret, chainId, verifyingContractAddress, web3, privateKey) {
    const IS_GANACHE = !web3.currentProvider.sendAsync;
    const signingData = getSigningData(choice, secret, chainId, verifyingContractAddress);
    const params = [accountAddress, IS_GANACHE ? signingData : JSON.stringify(signingData)];
    const method = IS_GANACHE ? 'eth_signTypedData' : 'eth_signTypedData_v4';
    if (privateKey) {
        const signedChoiceHash = eth_sig_util_1.signTypedData(ethereumjs_util_1.toBuffer(privateKey), { data: signingData });
        return {
            signedChoiceHash
        };
    }
    if (IS_GANACHE) {
        web3_1.default.providers.HttpProvider.prototype.sendAsync =
            web3_1.default.providers.HttpProvider.prototype.send;
    }
    return new Promise(resolve => {
        web3.currentProvider.sendAsync({
            method,
            params,
            accountAddress
        }, function sendAsyncCallback(err, result) {
            if (err)
                return console.dir(err);
            if (result.error) {
                console.error(result.error.message);
            }
            if (result.error)
                return console.error('ERROR', result);
            console.log(`TYPED SIGNED:${JSON.stringify(result.result)}`);
            const recovered = eth_sig_util_1.recoverTypedSignature_v4({
                data: signingData,
                sig: result.result
            });
            if (ethereumjs_util_1.toChecksumAddress(recovered) === ethereumjs_util_1.toChecksumAddress(accountAddress)) {
                console.log(`Successfully recovered signer as ${accountAddress}`);
            }
            else {
                console.log(`Failed to verify signer when comparing ${result} to ${accountAddress}`);
            }
            return resolve({
                signedChoiceHash: result.result
            });
        });
    });
}
exports.createChoiceSignature = createChoiceSignature;
async function createChoiceSignaturePK(choice, secret, chainId, verifyingContractAddress, privateKey) {
    if (!privateKey) {
        throw new Error('Private key is required for creating choice signature using "createChoiceSignaturePK" method.');
    }
    const signingData = getSigningData(choice, secret, chainId, verifyingContractAddress);
    const signedChoiceHash = eth_sig_util_1.signTypedData(ethereumjs_util_1.toBuffer(privateKey), { data: signingData });
    return {
        signedChoiceHash
    };
}
exports.createChoiceSignaturePK = createChoiceSignaturePK;
async function getEthAccounts() {
    const accounts = (await window.ethereum.send('eth_requestAccounts')).result;
    return accounts;
}
exports.getEthAccounts = getEthAccounts;
async function getCurrentEthAccount() {
    const accounts = await getEthAccounts();
    if (accounts.length === 0) {
        throw new Error('No metamask accounts found!');
    }
    return accounts[0];
}
exports.getCurrentEthAccount = getCurrentEthAccount;
let currentAddress;
async function currentEthAddress() {
    if (!currentAddress) {
        currentAddress = await getCurrentEthAccount();
    }
    return currentAddress;
}
exports.currentEthAddress = currentEthAddress;
//# sourceMappingURL=common.js.map
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
exports.App = void 0;
const react_1 = __importStar(require("react"));
const web3_1 = __importDefault(require("web3"));
const common_1 = require("../common");
require("./app.scss");
async function createWeb3() {
    // Modern dapp browsers...
    if (window.ethereum) {
        const web3 = new web3_1.default(window.ethereum);
        try {
            // Request account access if needed
            await window.ethereum.enable();
        }
        catch (error) {
            // User denied account access...
        }
        return web3;
    }
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    return null;
}
function App() {
    var _a;
    const [web3, setWeb3] = react_1.useState(null);
    const [contract, setContract] = react_1.useState();
    async function deployContract() {
        const accounts = await web3.eth.getAccounts();
        setContract(await common_1.deployHeadTailContract(web3, accounts[0]));
    }
    react_1.useEffect(() => {
        if (web3) {
            return;
        }
        (async () => {
            setWeb3(await createWeb3());
        })();
    });
    return (react_1.default.createElement("div", null,
        "Deployed contract address: ",
        react_1.default.createElement("b", null, (_a = contract === null || contract === void 0 ? void 0 : contract.options) === null || _a === void 0 ? void 0 : _a.address),
        react_1.default.createElement("br", null),
        react_1.default.createElement("br", null),
        react_1.default.createElement("button", { onClick: deployContract }, "Deploy contract")));
}
exports.App = App;
//# sourceMappingURL=app.js.map
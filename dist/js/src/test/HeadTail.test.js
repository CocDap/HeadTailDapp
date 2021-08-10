"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
mocha_1.describe('HeadTail', () => {
    // let web3: Web3;
    // let accounts: string[];
    // let contract: HeadTail;
    // before(async () => {
    //     web3 = new Web3(CONFIG.WEB3_PROVIDER_URL);
    //     accounts = await web3.eth.getAccounts();
    // });
    // beforeEach(async () => {
    //     contract = await deployHeadTailContract(web3, accounts[0]);
    // });
    // describe('Stage 1', () => {
    //     it('allows to deposit 1 ETH', async () => {
    //         const account = accounts[0];
    //         const startingBalance = BigInt(await web3.eth.getBalance(account));
    //         const oneEther = BigInt(1 * 10 ** 18);
    //         await contract.methods.deposit().send({
    //             value: Number(oneEther)
    //         });
    //         expect(BigInt(await web3.eth.getBalance(account))).to.be.equal(
    //             startingBalance - oneEther
    //         );
    //     });
    //     it('saves address of user', async () => {
    //         const account = accounts[0];
    //         const oneEther = BigInt(1 * 10 ** 18);
    //         await contract.methods.deposit().send({
    //             value: Number(oneEther)
    //         });
    //         expect(await contract.methods.userAddress().call()).to.be.equal(account);
    //     });
    // });
});
//# sourceMappingURL=HeadTail.test.js.map
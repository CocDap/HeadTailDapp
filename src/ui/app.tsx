import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { deployHeadTailContract } from '../common';
import { HeadTail } from '../types/HeadTail';
import './app.scss';
import { PolyjuiceHttpProvider } from '@polyjuice-provider/web3';
import { CONFIG } from '../config';

const godwokenRpcUrl = CONFIG.WEB3_PROVIDER_URL;
const providerConfig = {
    rollupTypeHash: CONFIG.ROLLUP_TYPE_HASH,
    ethAccountLockCodeHash: CONFIG.ETH_ACCOUNT_LOCK_CODE_HASH,
    web3Url: godwokenRpcUrl
};
const provider = new PolyjuiceHttpProvider(godwokenRpcUrl, providerConfig);

async function createWeb3() {
    // Modern dapp browsers...
    if ((window as any).ethereum) {
        //const web3 = new Web3((window as any).ethereum);
	const web3 = new Web3(provider);
        try {
            // Request account access if needed
            await (window as any).ethereum.enable();
        } catch (error) {
            // User denied account access...
        }

        return web3;
    }

    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    return null;
}

export function App() {
    const [web3, setWeb3] = useState<Web3>(null);
    const [contract, setContract] = useState<HeadTail>();

    async function deployContract() {
        const accounts = await web3.eth.getAccounts();

        setContract(await deployHeadTailContract(web3, accounts[0]));
    }

    useEffect(() => {
        if (web3) {
            return;
        }

        (async () => {
            setWeb3(await createWeb3());
        })();
    });

    return (
        <div>
            Deployed contract address: <b>{contract?.options?.address}</b>
            <br />
            <br />
            <button onClick={deployContract}>Deploy contract</button>
        </div>
    );
}

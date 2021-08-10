import Web3 from 'web3';
import { HeadTail } from './types/HeadTail';
export declare function deployHeadTailContract(web3: Web3, account: string): Promise<HeadTail>;
export declare function useExistingHeadTailContract(web3: Web3, address: string): Promise<HeadTail>;
export declare function domainSeparator(name: string, version: string, chainId: number, verifyingContract: string): Promise<string>;
export declare function createChoiceSignature(accountAddress: string, choice: boolean, secret: string, chainId: number, verifyingContractAddress: string, web3: Web3, privateKey?: string): Promise<any>;
export declare function createChoiceSignaturePK(choice: boolean, secret: string, chainId: number, verifyingContractAddress: string, privateKey?: string): Promise<{
    signedChoiceHash: string;
}>;
export declare function getEthAccounts(): Promise<string[]>;
export declare function getCurrentEthAccount(): Promise<string>;
export declare function currentEthAddress(): Promise<string>;

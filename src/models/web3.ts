// The internal common model
// Use as intermediate for other models and for tracking transaction state in the app

import {
  clusterApiUrl,
  Commitment,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
  TransactionConfirmationStatus,
  TransactionInstruction,
} from "@solana/web3.js";
import { v4 as uuid } from "uuid";
import { UIInstructionState } from "./state";

export const toSol = (x: number) => x / LAMPORTS_PER_SOL;

export type IID = string;
export type IPubKey = string;

export interface IAccount {
  id: IID;
  name?: string;
  pubkey: IPubKey;
  isWritable: boolean;
  isSigner: boolean;
}

export type IPlainText = string;

export interface IInstruction {
  id: IID;
  name?: string;
  programId: IPubKey;
  accountOrder: IID[];
  accounts: { [key: IID]: IAccount };
  data: IPlainText; // TODO anchor
}

export const emptyInstruction = (): IInstruction => ({
  id: uuid(),
  name: "New Instruction",
  programId: "",
  data: "",
  accounts: {},
  accountOrder: [],
});

export interface INetwork {
  id: "devnet" | "testnet" | "mainnet-beta";
  name: "Devnet" | "Testnet" | "Mainnet-beta" | "Custom";
  url: string;
}

export const DEFAULT_NETWORKS: INetwork[] = [
  { id: "devnet", name: "Devnet", url: clusterApiUrl("devnet") },
  { id: "testnet", name: "Testnet", url: clusterApiUrl("testnet") },
  {
    id: "mainnet-beta",
    name: "Mainnet-beta",
    url: clusterApiUrl("mainnet-beta"),
  },
];

export interface ITransaction {
  name?: string;
  instructionOrder: IID[];
  instructions: { [key: IID]: IInstruction };
}

export interface IBalance {
  address: string;
  names: string[];
  before: number;
  after: number;
}

export interface IResults {
  inProgress: boolean;
  signature: string; // not optional to work-around uncontrolled input issue
  startedAt?: number;
  slot?: number;
  confirmations?: number;
  confirmationStatus?: TransactionConfirmationStatus;
  fee?: number;
  balances?: IBalance[];
  error?: string;
  logs?: string[];
}

export interface ICommitment {
  id: Commitment;
  name: string;
}

export const COMMITMENT_LEVELS = [
  { id: "processed", name: "Processed" },
  { id: "confirmed", name: "Confirmed" },
  { id: "finalized", name: "Finalized" },
  { id: "recent", name: "Recent" },
  { id: "single", name: "Single" },
  { id: "singleGossip", name: "Single Gossip" },
  { id: "root", name: "Root" },
  { id: "max", name: "Max" },
];

export interface ITransactionOptions {
  network: INetwork;
  customNetworks: INetwork[];
  skipPreflight: boolean;
  commitment: Commitment;
  maxRetries: number;
  preflightCommitment?: Commitment;
  disableRetryOnRateLimit: boolean;
  confirmTransactionInitialTimeout: number;
  confirmTransactionTimeout: number;
  pollingPeriod: number; // used in our app, rather than passed to web3.js stuff
}

/**  Maps an internal transaction to the web3.js so it can be sent to the chain **/
export const mapTransaction = (
  transactionData: ITransaction,
  uiInstructions: Record<IID, UIInstructionState>
): Transaction => {
  // TODO filter out empty fields
  const transaction = new Transaction();
  transactionData.instructionOrder.forEach((id) => {
    const { programId, accountOrder, accounts, data } =
      transactionData.instructions[id];
    if (uiInstructions[id].disabled || !programId) return;
    transaction.add(
      new TransactionInstruction({
        programId: new PublicKey(programId),
        keys: accountOrder.map((id) => {
          const { pubkey, isWritable, isSigner } = accounts[id];
          return {
            pubkey: new PublicKey(pubkey),
            isWritable,
            isSigner,
          };
        }),
        data: Buffer.from(data),
      })
    );
  });
  return transaction;
};
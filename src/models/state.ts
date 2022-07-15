// Models for non-transaction app state

import { Draft } from "immer";
import { WritableDraft } from "immer/dist/internal";
import {
  DEFAULT_NETWORKS,
  IID,
  IResults,
  ITransaction,
  ITransactionOptions,
} from "./web3";

export type Explorer = "solscan" | "solana" | "none";

export interface AppOptions {
  explorer: Explorer;
  disableMainnet: boolean;
}

export interface UIInstructionState {
  disabled: boolean;
  expanded: boolean;
}

export interface UIState {
  instructions: Record<IID, UIInstructionState>;
  paletteOpen: boolean;
  optionsOpen: boolean;
}

export type AppState = {
  transactionOptions: ITransactionOptions;
  transaction: ITransaction;
  results: IResults;
  appOptions: AppOptions;
  uiState: UIState;
  set: (fn: (state: Draft<AppState>) => void) => void;
};

export const EXPLORERS: { id: Explorer; name: string }[] = [
  { id: "solscan", name: "Solscan" },
  { id: "solana", name: "Solana Explorer" },
  { id: "none", name: "None" },
];

export const DEFAULT_APP_OPTIONS: AppOptions = {
  explorer: "solscan",
  disableMainnet: false,
};

export const DEFAULT_UI_STATE: UIState = {
  instructions: {
    "ba928274-35b6-48c4-a16c-c4346f0ffaf2": {
      disabled: false,
      expanded: true,
    },
  },
  paletteOpen: false,
  optionsOpen: false,
};

export const DEFAUT_TRANSACTION_OPTIONS: ITransactionOptions = {
  network: DEFAULT_NETWORKS[0],
  customNetworks: [],
  skipPreflight: true,
  commitment: "processed",
  preflightCommitment: "processed",
  confirmTransactionInitialTimeout: 30_000,
  confirmTransactionTimeout: 30_000,
  maxRetries: 5,
  disableRetryOnRateLimit: true,
  pollingPeriod: 1_000,
};

// TODO just for testing
const DEFAULT_TRANSACTION: ITransaction = {
  name: "Baby's First Transaction",
  instructionOrder: ["ba928274-35b6-48c4-a16c-c4346f0ffaf2"],
  instructions: {
    "ba928274-35b6-48c4-a16c-c4346f0ffaf2": {
      id: "ba928274-35b6-48c4-a16c-c4346f0ffaf2",
      name: "Memo",
      programId: "Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo",
      accountOrder: ["111"],
      accounts: {
        "111": {
          id: "111",
          name: "Signer",
          pubkey: "EQPzCaaYtoCRqaeHkahZWHaX6kyC6K3ytu9t86WvR4Y3",
          isWritable: true,
          isSigner: true,
        },
      },
      data: "hello",
    },
  },
};

// const DEFAULT_TRANSACTION: ITransaction = {
//   name: "My Transcation",
//   instructionOrder: ["ba928274-35b6-48c4-a16c-c4346f0ffaf2"],
//   instructions: {
//     "ba928274-35b6-48c4-a16c-c4346f0ffaf2": {
//       id:"ba928274-35b6-48c4-a16c-c4346f0ffaf2",
//       name: "Instruction #1",
//       programId: "",
//       accountOrder: [],
//       accounts: {},
//       data: "",
//     },
//   }
// }

export const DEFAULT_STATE: AppState = {
  transaction: DEFAULT_TRANSACTION,
  results: {
    inProgress: false,
    signature: "",
    logs: ["Run a transaction to see logs"],
  },
  transactionOptions: DEFAUT_TRANSACTION_OPTIONS,
  appOptions: DEFAULT_APP_OPTIONS,
  uiState: DEFAULT_UI_STATE,
  set: () => {}, // set by the hook
};

export const instructionGetter =
  (id: IID) => (state: AppState | WritableDraft<AppState>) =>
    state.transaction.instructions[id];

export const accountGetter =
  (instructionId: IID, accountId: IID) =>
  (state: AppState | WritableDraft<AppState>) =>
    state.transaction.instructions[instructionId].accounts[accountId];
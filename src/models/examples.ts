import { Keypair } from "@solana/web3.js";
import { ITransactionExt } from "./external-types";

// TODO use export model instead and map across

export const EXAMPLES: Record<
  string,
  (walletPublicKey: string) => ITransactionExt
> = {
  systemProgramCreateAccount: (walletPublicKey: string) => ({
    name: "System Program: Create Account",
    instructions: [
      {
        name: "Create Account",
        programId: "11111111111111111111111111111111",
        accounts: [
          {
            name: "Payer",
            pubkey: walletPublicKey,
            isWritable: true,
            isSigner: true,
          },
          {
            name: "New Account",
            pubkey: Keypair.generate().publicKey.toBase58(),
            isWritable: true,
            isSigner: false,
          },
        ],
        data: {
          format: "bufferLayout",
          value: [
            {
              name: "Instruction",
              type: "u32",
              value: 0,
            },
            {
              name: "Lamport",
              type: "u64",
              value: 1400000,
            },
            {
              name: "Space",
              type: "u64",
              value: 100,
            },
            {
              name: "Program ID",
              type: "publicKey",
              value: "11111111111111111111111111111111",
            },
          ],
        },
      },
    ],
  }),

  systemProgramTransfer: (walletPublicKey: string) => ({
    name: "System Program: Transfer",
    instructions: [
      {
        name: "Transfer",
        programId: "11111111111111111111111111111111",
        accounts: [
          {
            name: "From",
            pubkey: walletPublicKey,
            isWritable: true,
            isSigner: true,
          },
          {
            name: "To",
            pubkey: "GoctE4EU5jZqbWg1Ffo5sjCqjrnzW1m76JmWwd84pwtV",
            isWritable: true,
            isSigner: false,
          },
        ],
        data: {
          format: "bufferLayout",
          value: [
            {
              name: "Instruction",
              type: "u32",
              value: 2,
            },
            {
              name: "Lamport",
              type: "u64",
              value: 1,
            },
          ],
        },
      },
    ],
  }),
};
import { ITransactionExt } from "../types/external";

// TODO use export model instead and map across

export const EXAMPLES: Record<
  string,
  {
    transaction: (walletPublicKey: string) => ITransactionExt;
    help: string;
  }
> = {
  systemProgramCreateAccount: {
    transaction: (walletPublicKey: string) => ({
      name: "System Program: Create Account",
      instructions: [
        {
          name: "Create Account",
          programId: "11111111111111111111111111111111",
          dynamic: true,
          accounts: [
            {
              name: "Payer",
              pubkey: walletPublicKey,
              isWritable: true,
              isSigner: true,
            },
            {
              name: "New Account",
              pubkey: "", // they need to generate a keypair
              isWritable: true,
              isSigner: true,
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
                value: 64,
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
    help: 'Generate a keypair for the "New Account" using the 🔑 button and then click the "Send" button.',
  },

  systemProgramTransfer: {
    transaction: (walletPublicKey: string) => ({
      name: "System Program: Transfer",
      instructions: [
        {
          name: "Transfer",
          dynamic: true,
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
    help: 'Click the "Send" button when you\'re ready.',
  },
};

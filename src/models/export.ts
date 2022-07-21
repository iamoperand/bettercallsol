// Models for the transaction to be exported

import { toSortedArray } from "./sortable";
import { IAccount, IPlainText, IPubKey, ITransaction } from "./web3";

export interface IInstructionExport {
  name?: string;
  programId: IPubKey;
  accounts: IAccount[];
  data: IPlainText;
}

export interface ITransactionExport {
  name?: string;
  instructions: IInstructionExport[];
}

const mapToTransactionExport = ({
  name,
  instructions,
}: ITransaction): ITransactionExport => ({
  name,
  instructions: toSortedArray(instructions).map(
    ({ name, programId, accounts, data }) => ({
      name,
      programId,
      accounts: toSortedArray(accounts),
      data,
    })
  ),
});

// const mapFromTransactionExport = (
//   transaction: ITransactionExport
// ): ITransaction => {
// };

// export const serialiseTransaction = (transaction: ITransaction): string => {};

// export const deserialiseTransaction = (serialised: string): ITransaction => {};
import { v4 as uuid } from "uuid";
import {
  IAccountExt,
  IInstrctionDataFieldExt,
  IInstructionExt,
  ITransactionExt,
} from "../types/external";
import { IAccount, IInstruction, ITransaction } from "../types/internal";
import { Identifiable, SortableCollection } from "../types/sortable";
import { toSortableCollection } from "../utils/sortable";

const mapToSortable = <T>(item: T): T & Identifiable => ({
  ...item,
  id: uuid(),
});

const mapToSortableCollection = <T>(
  items: T[]
): SortableCollection<T & Identifiable> =>
  toSortableCollection(items.map(mapToSortable));

const mpaIAccountExtToIAccount = ({
  name,
  pubkey,
  isWritable,
  isSigner,
}: IAccountExt): IAccount => ({
  id: uuid(),
  name,
  pubkey: pubkey || "",
  isWritable,
  isSigner,
});

export const mapIInstructionExtToIInstruction = ({
  name,
  programId,
  accounts,
  data,
  anchorMethod,
  anchorAccounts,
}: IInstructionExt): IInstruction =>
  mapToSortable({
    name,
    programId,
    accounts: mapToSortableCollection(accounts.map(mpaIAccountExtToIAccount)),
    data: {
      format: data.format,
      raw: {
        content: data.format === "raw" ? (data.value as string) : "",
        encoding: "bs58",
      },
      borsh: mapToSortableCollection(
        data.format === "borsh"
          ? (data.value as IInstrctionDataFieldExt[]).map((v) => ({
              id: uuid(),
              ...v,
            }))
          : []
      ),
      bufferLayout: mapToSortableCollection(
        data.format === "bufferLayout"
          ? (data.value as IInstrctionDataFieldExt[]).map((v) => ({
              id: uuid(),
              ...v,
            }))
          : []
      ),
    },
    anchorMethod,
    anchorAccounts: anchorAccounts?.map(mpaIAccountExtToIAccount),
    disabled: false,
    expanded: true,
  });

export const mapITransactionExtToITransaction = ({
  name,
  instructions,
}: ITransactionExt): ITransaction => ({
  name,
  instructions: mapToSortableCollection(
    instructions.map(mapIInstructionExtToIInstruction)
  ),
});

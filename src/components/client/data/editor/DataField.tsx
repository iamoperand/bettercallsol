import { CloseIcon } from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Switch,
  Tooltip,
  useBreakpointValue,
} from "@chakra-ui/react";
import { WritableDraft } from "immer/dist/internal";
import React from "react";
import { useInstruction } from "../../../../hooks/useInstruction";
import {
  DataFormat,
  IInstrctionDataField,
  InstructionDataFieldType,
} from "../../../../types/internal";
import { SortableCollection } from "../../../../types/sortable";
import { removeFrom } from "../../../../utils/sortable";
import {
  FORMAT_DATA_TYPES,
  NUMERICAL_DATA_TYPES,
} from "../../../../utils/ui-constants";
import { DragHandle } from "../../../common/DragHandle";
import { EditableName } from "../../../common/EditableName";
import { Numbering } from "../../../common/Numbering";

export const DataField: React.FC<{
  field: IInstrctionDataField;
  format: DataFormat;
  index: number;
}> = ({ field: { id, name, type, value }, format, index }) => {
  const { isAnchor, update } = useInstruction();

  const updateField = (
    fn: (state: WritableDraft<IInstrctionDataField>) => void
  ) => {
    update((state) => {
      fn(
        (state.data[format] as SortableCollection<IInstrctionDataField>).map[id]
      );
    });
  };

  return (
    <Flex mb="2" alignItems="center">
      <DragHandle
        unlockedProps={{ h: "2.5", w: "2.5" }}
        lockedProps={{ h: "3" }}
        locked={isAnchor}
      />

      <Numbering index={index} ml="2" minW="30px" fontSize="sm" />

      <EditableName
        ml="2"
        w={useBreakpointValue({
          base: "100px",
          lg: "150px",
          xl: "200px",
        })}
        textAlign="right"
        fontSize="sm"
        placeholder="Unnamed"
        tooltipProps={{ placement: "bottom-end" }}
        isDisabled={isAnchor}
        value={name}
        onChange={(value: string) => {
          updateField((state) => {
            state.name = value;
          });
        }}
      />

      <Select
        ml="2"
        w="120px"
        size="sm"
        fontFamily="mono"
        placeholder="Field Type"
        isDisabled={isAnchor}
        value={type}
        onChange={(e) => {
          updateField((state) => {
            state.type = e.target.value as InstructionDataFieldType;
          });
        }}
      >
        {FORMAT_DATA_TYPES[format].map((type) => (
          <option value={type} key={type}>
            {type}
          </option>
        ))}
      </Select>

      {NUMERICAL_DATA_TYPES.includes(type) ? (
        <NumberInput
          ml="2"
          size="sm"
          value={value}
          onChange={(_, value) => {
            updateField((state) => {
              state.value = value;
            });
          }}
        >
          <NumberInputField fontFamily="mono" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      ) : type === "bool" ? (
        <Switch
          ml="2"
          size="sm"
          value={value}
          onChange={() => {
            updateField((state) => {
              state.value = !value;
            });
          }}
        />
      ) : (
        <Input
          flex="1"
          ml="2"
          size="sm"
          fontFamily="mono"
          placeholder="Field Value"
          value={value}
          onChange={(e) => {
            updateField((state) => {
              state.value = e.target.value;
            });
          }}
        />
      )}

      {!isAnchor && (
        <Tooltip label="Remove">
          <IconButton
            ml="3"
            size="xs"
            aria-label="Remove"
            icon={<CloseIcon />}
            variant="ghost"
            onClick={() => {
              update((state) => {
                removeFrom(
                  state.data[
                    format
                  ] as SortableCollection<IInstrctionDataField>,
                  id
                );
              });
            }}
          />
        </Tooltip>
      )}
    </Flex>
  );
};

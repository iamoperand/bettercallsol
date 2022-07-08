import { ChevronDownIcon, DeleteIcon, DragHandleIcon } from "@chakra-ui/icons";
import {
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Grid,
  Heading,
  Icon,
  IconButton,
  Input,
  Spacer,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useContext } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { instructionGetter, useTransactionStore } from "../../store";
import { ToggleIconButton } from "../common/ToggleIconButton";
import { Accounts } from "./Accounts";
import { Data } from "./Data";
import { InstructionContext } from "./Instructions";

export const Instruction: React.FC = () => {
  const instructionId = useContext(InstructionContext);
  const getInstruction = instructionGetter(instructionId);
  const instruction = useTransactionStore(
    (state) => state.transaction.instructions[instructionId]
  );

  const set = useTransactionStore((state) => state.set);

  // TODO find a clean way to abstract this away into their own SortableItem
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: instructionId,
      animateLayoutChanges: (args) =>
        defaultAnimateLayoutChanges({ ...args, wasDragging: true }),
    });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const removeInstruction = () => {
    set((state) => {
      state.transaction.instructionOrder =
        state.transaction.instructionOrder.filter((x) => x !== instructionId);
      delete state.transaction.instructions[instructionId];
    });
  };

  return (
    <Grid
      ref={setNodeRef}
      style={style}
      mb="2"
      p="5"
      border="1px"
      rounded="md"
      borderColor={useColorModeValue("gray.200", "gray.600")}
      bg={useColorModeValue("", "whiteAlpha.50")}
      boxShadow={useColorModeValue("base", "")}
    >
      <Flex>
        <DragHandleIcon mt="1.5" mr="2" {...attributes} {...listeners} />
        {/* TODO change aria-label based on state */}
        <IconButton
          h="8"
          w="8"
          mr="2"
          aria-label="Collapse"
          icon={<ChevronDownIcon h="6" w="6" />}
          variant="ghost"
        />
        <Tooltip label="Click to edit" placement="top-start">
          <Editable
            mb="5"
            value={instruction.name}
            onChange={(value) => {
              set((state) => {
                getInstruction(state).name = value;
              });
            }}
          >
            <Heading size="md">
              <EditablePreview minW="20px" />
              <EditableInput />
            </Heading>
          </Editable>
        </Tooltip>
        <Spacer />
        <ToggleIconButton
          ml="2"
          label="Disable"
          icon={<Icon as={FaEyeSlash} />}
        />
        <Tooltip label="Remove">
          <IconButton
            ml="2"
            aria-label="Remove"
            icon={<DeleteIcon />}
            variant="ghost"
            onClick={removeInstruction}
          />
        </Tooltip>
      </Flex>
      <Input
        mb="5"
        placeholder="Program ID"
        value={instruction.programId}
        onChange={(e) => {
          set((state) => {
            getInstruction(state).programId = e.target.value;
          });
        }}
      />
      <Accounts />
      <Data />
    </Grid>
  );
};
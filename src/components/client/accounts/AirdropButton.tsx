import {
  CheckCircleIcon,
  ExternalLinkIcon,
  WarningIcon,
} from "@chakra-ui/icons";
import {
  Button,
  Heading,
  HStack,
  Icon,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import React, { useState } from "react";
import { FaParachuteBox } from "react-icons/fa";
import { useGetWeb3Transaction } from "../../../hooks/useGetWeb3Transaction";
import { usePersistentStore } from "../../../hooks/usePersistentStore";
import { IPubKey } from "../../../models/internal-types";
import { short, toLamports } from "../../../models/web3js-mappers";
import { ExplorerButton } from "../../common/ExplorerButton";

export const AirdropButton: React.FC<{ accountPubkey: IPubKey }> = ({
  accountPubkey,
}) => {
  const [value, setValue] = useState("1.000000000");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "running" | "success" | "fail" | "cancelled"
  >("idle");
  const rpcEndpoint = usePersistentStore(
    (state) => state.transactionOptions.rpcEndpoint
  );

  const { connection } = useConnection();
  const {
    signature,
    start: startConfirmation,
    cancel: cancelConfirmation,
  } = useGetWeb3Transaction({
    onStatus: (web3Status) => {
      // to avoid further message changes post-cancellation
      if (status !== "cancelled") {
        setMessage(`Confirmed by ${web3Status.confirmations || 0}`);
      }
    },
    onFinalised: () => {
      setMessage("Airdop has been successful");
      setStatus("success");
    },
    onError: (error) => {
      setMessage(`Error: ${error.message}`);
      setStatus("fail");
    },
    onTimeout: () => {
      setMessage("Error: Time out");
      setStatus("fail");
    },
  });

  const airdop = () => {
    setStatus("running");
    setMessage("Sending transcation...");
    connection
      .requestAirdrop(new PublicKey(accountPubkey), parseInt(value))
      .then((signature) => {
        startConfirmation(signature);
      });
  };

  const cancel = () => {
    cancelConfirmation();
    setStatus("cancelled");
    setMessage("Status unknown. Check transaction for status.");
  };

  return (
    <Popover placement="left">
      <PopoverTrigger>
        {/* TODO tooltips don't play nice with Popovers */}
        <IconButton
          size="xs"
          variant="ghost"
          aria-label="Airdrop SOL"
          icon={<FaParachuteBox />}
          isDisabled={rpcEndpoint.network === "mainnet-beta"}
        />
      </PopoverTrigger>

      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <Heading size="sm">Airdrop SOL</Heading>
        </PopoverHeader>
        <PopoverBody>
          <VStack p="2" spacing="2">
            <Text>
              Add more SOL to{" "}
              <ExplorerButton
                value={accountPubkey}
                valueType="account"
                rpcEndpoint={rpcEndpoint}
                variant="link"
              >
                <Button size="sm" variant="link" fontFamily="mono">
                  {short(accountPubkey)} <ExternalLinkIcon ml="1" />
                </Button>
              </ExplorerButton>
            </Text>

            <NumberInput
              size="sm"
              min={0}
              precision={9}
              allowMouseWheel
              value={value.toLocaleString()}
              onChange={setValue}
            >
              <NumberInputField fontFamily="mono" textAlign="center" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>

            <Text as="i">{`${(toLamports(value) || 0).toFormat(
              0
            )} Lamports`}</Text>
          </VStack>
        </PopoverBody>
        <PopoverFooter>
          <VStack p="2" spacing="1">
            {message && (
              <HStack mb="1" justifyContent="center">
                {status === "running" && <Spinner color="blue.400" size="sm" />}
                {status === "success" && <CheckCircleIcon color="green.400" />}
                {status === "cancelled" && <WarningIcon color="yellow.400" />}
                {status === "fail" && <WarningIcon color="red.400" />}
                <Text
                  textAlign="center"
                  textColor={
                    status === "running"
                      ? "blue.400"
                      : status === "success"
                      ? "green.400"
                      : status === "cancelled"
                      ? "yellow.400"
                      : status === "fail"
                      ? "red.400"
                      : undefined
                  }
                >
                  {message}
                </Text>
              </HStack>
            )}
            {signature && (
              <ExplorerButton
                value={signature}
                valueType="tx"
                rpcEndpoint={rpcEndpoint}
                variant="link"
              >
                <Button mb="4" size="sm" variant="link" fontFamily="mono">
                  {short(signature)} <ExternalLinkIcon ml="1" />
                </Button>
              </ExplorerButton>
            )}

            {status === "running" ? (
              <Button
                size="sm"
                colorScheme="red"
                leftIcon={<Icon as={FaParachuteBox} />}
                onClick={cancel}
              >
                Cancel
              </Button>
            ) : (
              <Button
                size="sm"
                colorScheme="teal"
                leftIcon={<Icon as={FaParachuteBox} />}
                onClick={airdop}
              >
                Airdop
              </Button>
            )}
          </VStack>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

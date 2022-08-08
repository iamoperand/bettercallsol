import { CheckIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuList,
  MenuListProps,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { usePersistentStore } from "../../hooks/usePersistentStore";
import { IRpcEndpoint } from "../../models/internal-types";
import { toSortedArray } from "../../models/sortable";

export const RpcEndpointMenu: React.FC<{
  endpoint: IRpcEndpoint;
  setEndpoint: (endpoint: IRpcEndpoint) => void;
  variant?: "long" | "short";
  menuButtonProps?: MenuButtonProps;
  menuListProps?: MenuListProps;
}> = ({
  endpoint,
  setEndpoint,
  variant = "long",
  menuButtonProps,
  menuListProps,
}) => {
  const rpcEndpoints = usePersistentStore(
    (state) => state.appOptions.rpcEndpoints
  );

  return (
    <Menu>
      <Tooltip label={endpoint.url}>
        <MenuButton
          as={Button}
          rightIcon={variant === "long" ? <ChevronDownIcon /> : undefined}
          {...menuButtonProps}
        >
          {variant === "long"
            ? `${endpoint.network}${
                endpoint.provider ? " (" + endpoint.provider + ")" : ""
              }`
            : endpoint.network[0].toUpperCase()}
        </MenuButton>
      </Tooltip>
      <MenuList {...menuListProps}>
        {toSortedArray(rpcEndpoints)
          .filter(({ enabled, url }) => enabled && url)
          .map((it, index) => (
            <MenuItem
              icon={endpoint.url === it.url ? <CheckIcon /> : undefined}
              key={index}
              command={it.provider}
              onClick={() => {
                setEndpoint(it);
              }}
            >
              {it.network}
            </MenuItem>
          ))}
      </MenuList>
    </Menu>
  );
};

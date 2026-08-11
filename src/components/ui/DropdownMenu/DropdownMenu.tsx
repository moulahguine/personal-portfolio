"use client";

import { Menu, MenuItem, MenuTrigger, Popover } from "react-aria-components";
import type { DropdownMenuItemProps, DropdownMenuProps } from "@/types";

import styles from "./DropdownMenu.module.scss";

export { MenuTrigger };

export default function DropdownMenu({
  children,
  orientation = "vertical",
  className = "",
  placement = "bottom end",
  offset = 8,
  ...menuProps
}: DropdownMenuProps) {
  const popoverClassName = [styles.popover, className]
    .filter(Boolean)
    .join(" ");

  const menuClassName = [styles.menu, styles[`menu--${orientation}`]].join(" ");

  return (
    <Popover className={popoverClassName} placement={placement} offset={offset}>
      <Menu {...menuProps} className={menuClassName}>
        {children}
      </Menu>
    </Popover>
  );
}

export function DropdownMenuItem({
  className = "",
  ...rest
}: DropdownMenuItemProps) {
  const classNames = [styles.item, className].filter(Boolean).join(" ");

  return <MenuItem className={classNames} {...rest} />;
}

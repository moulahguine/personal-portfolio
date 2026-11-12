import type { ReactNode } from "react";
import type {
  MenuItemProps,
  MenuProps,
  MenuTriggerProps,
  PopoverProps,
} from "react-aria-components";

export type DropdownMenuOrientation = "vertical" | "horizontal";

export interface DropdownMenuProps
  extends
    Omit<MenuProps<object>, "className" | "children">,
    Pick<PopoverProps, "placement" | "offset"> {
  children: ReactNode;
  orientation?: DropdownMenuOrientation;
  className?: string;
}

export interface DropdownMenuItemProps extends Omit<
  MenuItemProps,
  "children" | "className"
> {
  className?: string;
  isActive?: boolean;
  icon?: ReactNode;
  label?: ReactNode;
  children?: ReactNode;
}

export type { MenuTriggerProps as DropdownMenuTriggerProps };

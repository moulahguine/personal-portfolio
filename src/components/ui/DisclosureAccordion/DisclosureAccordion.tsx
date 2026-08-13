"use client";

import {
  Button,
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  Heading,
} from "react-aria-components";
import type {
  ButtonProps,
  DisclosureGroupProps,
  DisclosurePanelProps,
  DisclosureProps,
  HeadingProps,
} from "react-aria-components";

export function DisclosureAccordion(props: DisclosureGroupProps) {
  return <DisclosureGroup {...props} />;
}

export function DisclosureAccordionItem(props: DisclosureProps) {
  return <Disclosure {...props} />;
}

export function DisclosureAccordionPanel(props: DisclosurePanelProps) {
  return <DisclosurePanel {...props} />;
}

export function DisclosureAccordionHeading(props: HeadingProps) {
  return <Heading {...props} />;
}

export function DisclosureAccordionButton(props: ButtonProps) {
  return <Button slot="trigger" {...props} />;
}

export type {
  DisclosureGroupProps as DisclosureAccordionProps,
  DisclosureProps as DisclosureAccordionItemProps,
  DisclosurePanelProps as DisclosureAccordionPanelProps,
  HeadingProps as DisclosureAccordionHeadingProps,
  ButtonProps as DisclosureAccordionButtonProps,
};

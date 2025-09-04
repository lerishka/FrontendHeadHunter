import { Button as MantineButton } from "@mantine/core";
import type { ButtonProps as MantineButtonProps } from "@mantine/core";
import type { ComponentPropsWithoutRef } from "react";

export type ButtonProps = MantineButtonProps &
  ComponentPropsWithoutRef<"button">;

export default function Button(props: ButtonProps) {
  return <MantineButton variant="filled" color="indigo" {...props} />;
}

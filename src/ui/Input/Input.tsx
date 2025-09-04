import { TextInput as MantineInput } from "@mantine/core";
import type { TextInputProps } from "@mantine/core";

export default function Input({ onChange, ...props }: TextInputProps) {
  return <MantineInput placeholder="" onChange={onChange} {...props} />;
}

import { Meta } from "@storybook/react/types-6-0";

import { useState, useEffect, useCallback } from "react";

import { Form, Button } from "components";

import { Select } from "./Select";
import { SelectOption } from "./SelectOption";
import { SelectProps } from "./SelectTypes";

export default {
  title: "Components/Select/Combobox",
  component: Select,
} as Meta<SelectProps>;

const label = "Test label";

const values = ["Apples"];

export const DefaultCombobox = () => (
  <Select label={label} isCombobox>
    <SelectOption>Apples</SelectOption>
    <SelectOption>Bananas</SelectOption>
    <SelectOption>Oranges</SelectOption>
  </Select>
);

export const MultipleSelectCombobox = () => (
  <Select label={label} isMultipleSelect isCombobox values={values}>
    <SelectOption>Apples</SelectOption>
    <SelectOption disabled>Bananas</SelectOption>
    <SelectOption>Oranges</SelectOption>
  </Select>
);

export const DisabledCombobox = () => {
  return (
    <Select label={label} isCombobox disabled>
      <SelectOption>Option 1</SelectOption>
      <SelectOption disabled>Option 2</SelectOption>
      <SelectOption>Option 3</SelectOption>
      <SelectOption>Option 4</SelectOption>
    </Select>
  );
};

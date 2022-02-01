import { Meta } from "@storybook/react/types-6-0";

import { MultipleSelect, MultipleSelectOption } from "./MultipleSelect";
import { MultipleSelectItem, MultipleSelectProps } from "./SelectTypes";

export default {
  title: "Components/Select/Multiple Select",
  component: MultipleSelect,
} as Meta<MultipleSelectProps>;

const items: MultipleSelectItem[] = [
  { text: "Option 1" },
  { text: "Option 2", disabled: true },
  { text: "Option 3" },
];

export const TestMultipleSelect = () => {
  return (
    <MultipleSelect items={items} label="Test Label">
      {items.map((item, key) => {
        return <MultipleSelectOption item={item} key={key} />;
      })}
    </MultipleSelect>
  );
};

export const TestMultipleSelectWithoutChildren = () => {
  return <MultipleSelect items={items} label="Test Label" />;
};

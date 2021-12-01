import { Meta, Story } from "@storybook/react/types-6-0";

import { Table, TableProps } from "./";
import { FilledFields, IDataTableMockData } from "./mock-data";

export default {
  title: "Components/Table",
  component: Table,
} as Meta<TableProps<IDataTableMockData>>;

export const Default = () => (
  <Table {...FilledFields} caption="Storybook Default Table Example" />
);

export const EmptyDataSet = () => (
  <Table
    caption="Storybook Empty Date Set Table Example"
    columns={FilledFields.columns}
    data={[]}
    handleRefresh={() => {}}
  />
);

export const BareBones = () => (
  <Table columns={FilledFields.columns} data={FilledFields.data} />
);

const Template: Story<TableProps<IDataTableMockData>> = (
  props: TableProps<IDataTableMockData>
) => <Table {...props} />;

export const Templated = Template.bind({});
Templated.args = {
  id: "templated-table",

  columns: FilledFields.columns,
  data: FilledFields.data,
};

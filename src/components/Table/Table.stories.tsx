import { Meta } from "@storybook/react/types-6-0";

import { Table, TableProps } from "./";
import { FilledFields, IDataTableMockData } from "./mock-data";

export default {
  title: "Components/Table",
  component: Table,
} as Meta<TableProps<IDataTableMockData>>;

export const Default = () => <Table {...FilledFields} />;

export const EmptyDataSet = () => (
  <Table columns={FilledFields.columns} data={[]} handleRefresh={() => {}} />
);

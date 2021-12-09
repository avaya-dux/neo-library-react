import { Meta, Story } from "@storybook/react/types-6-0";
import { useState } from "react";

import { List } from "components/List";
import { ListItem } from "components/ListItem";

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

export const SelectableRows = () => {
  const [selectedRows, setSelectedRows] = useState<IDataTableMockData[]>([]);
  const [logItems, setLogItems] = useState<string[]>([]);

  const handleSelect = (row: IDataTableMockData, selectedRowIds: string[]) => {
    console.log(selectedRowIds);
    const rowExists = !!selectedRows.find((r) => r.id === row.id);
    setSelectedRows(
      rowExists
        ? selectedRows.filter((r) => r.id !== row.id)
        : [...selectedRows, row]
    );
    setLogItems([
      `Row '${row.name}' was ${rowExists ? "toggled off" : "toggled on"}`,
      ...logItems,
    ]);
  };

  return (
    <section>
      <section style={{ paddingBottom: 20 }}>
        <h3>selected rows:</h3>

        <code>{JSON.stringify(selectedRows)}</code>
      </section>

      <Table
        caption="Storybook Selectable Rows Table Example"
        columns={FilledFields.columns}
        data={FilledFields.data}
        handleRowSelected={handleSelect}
        selectableRows="multiple"
        // selectedRows={selectedRows} // TODO-567: implement
      />

      <section style={{ paddingTop: 20 }}>
        <h3>`onChange` logs:</h3>

        <List>
          {logItems.map((item, index) => (
            <ListItem key={`${item}-${index}`}>{item}</ListItem>
          ))}
        </List>
      </section>
    </section>
  );
};

const Template: Story<TableProps<IDataTableMockData>> = (
  props: TableProps<IDataTableMockData>
) => <Table {...props} />;

export const Templated = Template.bind({});
Templated.args = {
  id: "templated-table",

  columns: FilledFields.columns,
  data: FilledFields.data,
};

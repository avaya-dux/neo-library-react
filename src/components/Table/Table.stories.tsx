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
  const defaultSelectedRowIds = [
    FilledFields.data[1].id.toString(),
    FilledFields.data[3].id.toString(),
  ];
  const [selectedRows, setSelectedRows] = useState(defaultSelectedRowIds);
  const [logItems, setLogItems] = useState<string[]>([]);

  const handleToggle = (selectedRowIds: string[], row?: IDataTableMockData) => {
    setSelectedRows(selectedRowIds);

    if (row) {
      const rowExists = selectedRowIds.find((id) => id === row.id.toString());
      setLogItems([
        `Row '${row.name}' was toggled ${rowExists ? "ON" : "OFF"}`,
        ...logItems,
      ]);
    } else {
      setLogItems([
        `All rows were toggled ${selectedRowIds.length ? "ON" : "OFF"}`,
        ...logItems,
      ]);
    }
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
        handleRowToggled={handleToggle}
        selectableRows="multiple"
        defaultSelectedRowIds={defaultSelectedRowIds}
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

import { Meta, Story } from "@storybook/react/types-6-0";
import { useEffect, useState } from "react";

import { Button, List, ListItem } from "components";

import { Table, TableProps } from "./";
import { FilledFields, IDataTableMockData } from "./mock-data";

export default {
  title: "Components/Table",
  component: Table,
} as Meta<TableProps<IDataTableMockData>>;

export const Default = () => (
  <Table {...FilledFields} caption="Storybook Default Table Example" />
);

export const CustomActions = () => (
  <section>
    <Table
      {...FilledFields}
      caption="One Custom Action"
      customActionsNode={
        <Button onClick={() => alert("custom action")}>Example</Button>
      }
    />

    <hr />

    <Table
      {...FilledFields}
      caption="Two Custom Actions"
      customActionsNode={
        <section>
          <Button onClick={() => alert("custom action number one")}>
            Example One
          </Button>
          <Button onClick={() => alert("custom action number two")}>
            Example Two
          </Button>
        </section>
      }
    />

    <hr />

    <Table
      {...FilledFields}
      caption="A Custom Action and Create"
      handleCreate={() => alert("create")}
      customActionsNode={
        <Button onClick={() => alert("custom action number one")}>
          Example One
        </Button>
      }
    />
  </section>
);

export const EditableData = () => {
  const [data, setData] = useState(FilledFields.data);
  const [readonly, setReadonly] = useState(false);

  const [logItems, setLogItems] = useState<string[]>([]);

  useEffect(() => {
    setLogItems(["data modified, new length: " + data.length, ...logItems]);
  }, [data]);

  return (
    <section>
      <Table
        caption="Editable Rows Table Example"
        columns={FilledFields.columns}
        data={data}
        readonly={readonly}
        selectableRows="multiple"
        handleCreate={() => {
          const newRow: IDataTableMockData = {
            id: "new-row-" + Math.random(),
            name: "New Row",
            label: "New Row",
            other: "Lorem Ipsum",
          };
          setData([...data, newRow]);
        }}
        handleDelete={(rowIds: string[]) => {
          setData(data.filter((row) => !rowIds.includes(row.id)));
        }}
        handleEdit={(row: IDataTableMockData) => {
          const rowToEditIndex = data.findIndex((r) => r.id === row.id);
          const dataCopy = [...data];
          dataCopy[
            rowToEditIndex
          ].name = `${dataCopy[rowToEditIndex]?.name} (edited)`;

          setData(dataCopy);
        }}
        handleRefresh={() => {
          setReadonly(true);
          setData([]);
          setTimeout(() => {
            setData(FilledFields.data);
            setReadonly(false);
          }, 1000);
        }}
      />

      <section style={{ paddingTop: 20 }}>
        <h3>data modifications:</h3>

        <List>
          {logItems.map((item, index) => (
            <ListItem key={`${item}-${index}`}>{item}</ListItem>
          ))}
        </List>
      </section>
    </section>
  );
};

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
  selectableRows: "none",
};

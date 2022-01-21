import { useState } from "react";
import { TableInstance } from "react-table";

import { Button } from "components/Button";
import { Checkbox } from "components/Checkbox";
import { IconButton } from "components/IconButton";
import { Sheet } from "components/Sheet";

import { translations as defaultTranslations } from "../default-data";
import { ITableFilterTranslations } from "../types";

type TableFilterProps<T extends Record<string, any>> = {
  translations: ITableFilterTranslations;
  instance: TableInstance<T>;
};

export const TableFilter = <T extends Record<string, any>>({
  translations,
  instance,
}: TableFilterProps<T>) => {
  const { allColumns, getToggleHideAllColumnsProps, setHiddenColumns } =
    instance;

  const allCheckboxProps = { ...getToggleHideAllColumnsProps() };
  console.log("allCheckboxProps", allCheckboxProps);

  // translations
  const clear = translations.clear || defaultTranslations.toolbar.clear;
  const close =
    translations.close || (defaultTranslations.toolbar.close as string);
  const filter = translations.filter || defaultTranslations.toolbar.filter;
  const filterBy =
    translations.filterBy || defaultTranslations.toolbar.filterBy;

  const [sheetVisible, setSheetVisible] = useState(false);
  const toggleFilter = () => setSheetVisible((v) => !v);

  const buttons = [
    <IconButton
      aria-label={close}
      icon="close"
      shape="circle"
      style={{ color: "black" }}
      variant="tertiary"
      onClick={toggleFilter}
      key="table-filter-close-icon-button"
    />,
  ];

  return (
    <>
      <IconButton
        aria-label={filter || "Filter"}
        icon="filter"
        shape="square"
        onClick={toggleFilter}
      />

      {sheetVisible && (
        <Sheet
          className="neo-table__filters--sheet"
          style={{ width: 200 }}
          title={filterBy}
          buttons={buttons}
        >
          <section>
            {allColumns.map((column) => (
              <Checkbox
                key={column.id}
                {...column.getToggleHiddenProps()}
                label={column.Header}
              />
            ))}
          </section>

          <div
            className="neo-table__filters--sheet__footer"
            style={{ flexWrap: "wrap" }}
          >
            <Button
              onClick={() => setHiddenColumns([])}
              size="wide"
              status="alert"
              variant="tertiary"
            >
              {clear}
            </Button>

            <Button onClick={toggleFilter} size="wide" variant="tertiary">
              {close}
            </Button>
          </div>
        </Sheet>
      )}
    </>
  );
};

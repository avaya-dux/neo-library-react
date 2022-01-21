import { useState } from "react";
import { TableInstance } from "react-table";

import { Button } from "components/Button";
import { IconButton } from "components/IconButton";
import { Sheet } from "components/Sheet";

import { ITableFilterTranslations } from "../types";
import { translations as defaultTranslations } from "../default-data";
import { Checkbox, NeoInputWrapper } from "components";

type TableFilterProps<T extends Record<string, any>> = {
  translations: ITableFilterTranslations;
  instance: TableInstance<T>;
};

export const TableFilter = <T extends Record<string, any>>({
  translations,
  instance,
}: TableFilterProps<T>) => {
  const {
    state: { filters, globalFilter },
  } = instance;
  console.log("filters", filters);
  console.log("globalFilter", globalFilter);

  const close =
    translations.close || (defaultTranslations.toolbar.close as string);
  const clear = translations.clear || defaultTranslations.toolbar.clear;
  const filter = translations.filter || defaultTranslations.toolbar.filter;
  const filterBy =
    translations.filterBy || defaultTranslations.toolbar.filterBy;

  const [filtersVisible, setFiltersVisible] = useState(false);
  const toggleFilter = () => {
    setFiltersVisible(!filtersVisible);
  };

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

      {filtersVisible && (
        <Sheet
          className="neo-table__filters--sheet"
          style={{ width: 200 }}
          title={filterBy}
          buttons={buttons}
        >
          <section>
            <NeoInputWrapper>
              <Checkbox label="check one" value="1" onChange={() => {}} />
              <Checkbox label="check two" value="2" onChange={() => {}} />
            </NeoInputWrapper>
          </section>

          <div className="neo-table__filters--sheet__footer">
            <Button
              onClick={toggleFilter}
              size="wide"
              status="alert"
              variant="tertiary"
            >
              {clear}
            </Button>
          </div>
        </Sheet>
      )}
    </>
  );
};

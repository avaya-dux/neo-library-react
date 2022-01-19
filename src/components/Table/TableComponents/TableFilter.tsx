import { useCallback, useState } from "react";
import { TableInstance } from "react-table";

import { Button } from "components/Button";
import { IconButton } from "components/IconButton";
import { Sheet } from "components/Sheet";

type TableFilterProps<T extends Record<string, any>> = {
  filter?: string;
  title?: string;
  instance: TableInstance<T>;
};

export const TableFilter = <T extends Record<string, any>>({
  filter = "Filter",
  title = "Filter By",
  instance,
}: TableFilterProps<T>) => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const handleFilter = useCallback(() => {
    setFiltersVisible(!filtersVisible);
  }, []);

  const buttons = [
    <Button variant="secondary" onClick={handleFilter}>
      Cancel
    </Button>,
    <Button onClick={handleFilter}>Apply</Button>,
  ];

  return (
    <>
      <IconButton
        aria-label={filter || "Filter"}
        icon="filter"
        shape="square"
        onClick={handleFilter}
      />

      {filtersVisible && (
        <Sheet
          className="neo-table__filters--sheet"
          title={title}
          buttons={buttons}
        >
          <form className="neo-form">
            <div className="neo-form-control">
              <div className="neo-input-group">
                <label
                  htmlFor="checkGroupExample"
                  aria-label="Addon on the right"
                >
                  Category
                </label>
                <input
                  className="neo-check"
                  type="checkbox"
                  id="checkbox1"
                  value="Checkbox 1"
                  aria-checked="false"
                />
                <label htmlFor="checkbox1">Option</label>
                <input
                  className="neo-check"
                  type="checkbox"
                  id="checkbox2"
                  value="Checkbox 2"
                  aria-checked="false"
                />
                <label htmlFor="checkbox2">Option</label>
                <input
                  className="neo-check"
                  type="checkbox"
                  id="checkbox3"
                  value="Checkbox 3"
                  aria-checked="false"
                />
                <label htmlFor="checkbox3">Option</label>
                <input
                  className="neo-check"
                  type="checkbox"
                  id="checkbox4"
                  value="Checkbox 4"
                  aria-checked="false"
                />
                <label className="checked" htmlFor="checkbox4">
                  Option
                </label>
                <input
                  className="neo-check"
                  type="checkbox"
                  id="checkbox5"
                  value="Checkbox 5"
                  aria-checked="false"
                />
                <label className="checked" htmlFor="checkbox5">
                  Option
                </label>
              </div>
            </div>
            <div className="neo-form-control">
              <div className="neo-input-group">
                <label
                  htmlFor="checkGroupExample"
                  aria-label="Addon on the right"
                >
                  Category
                </label>
                <input
                  className="neo-check"
                  type="checkbox"
                  id="checkbox6"
                  value="Checkbox 6"
                  aria-checked="false"
                />
                <label htmlFor="checkbox6">Option</label>
                <input
                  className="neo-check"
                  type="checkbox"
                  id="checkbox7"
                  value="Checkbox 7"
                  aria-checked="false"
                />
                <label htmlFor="checkbox7">Option</label>
                <input
                  className="neo-check"
                  type="checkbox"
                  id="checkbox8"
                  value="Checkbox 8"
                  aria-checked="false"
                />
                <label htmlFor="checkbox8">Option</label>
                <input
                  className="neo-check"
                  type="checkbox"
                  id="checkbox9"
                  value="Checkbox 9"
                  aria-checked="false"
                />
                <label className="checked" htmlFor="checkbox  9">
                  Option
                </label>
                <input
                  className="neo-check"
                  type="checkbox"
                  id="checkbox10"
                  value="Checkbox 10"
                  aria-checked="false"
                />
                <label className="checked" htmlFor="checkbox10">
                  Option
                </label>
              </div>
            </div>
          </form>

          <div className="neo-table__filters--sheet__footer">
            <Button
              className="neo-btn--wide neo-btn-tertiary--alert"
              onClick={handleFilter}
              variant="tertiary"
            >
              Clear Filters
            </Button>
          </div>
        </Sheet>
      )}
    </>
  );
};

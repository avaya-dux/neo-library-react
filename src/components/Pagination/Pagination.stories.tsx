import { Meta, Story } from "@storybook/react/types-6-0";
import { useMemo, useState } from "react";

import { Form, List, ListItem, Sheet, TextInput } from "components";
import { genId } from "utils";

import { Pagination, PaginationProps } from "./";

export default {
  title: "Components/Layout/Pagination",
  component: Pagination,
} as Meta<PaginationProps>;

export const Default = () => {
  const paginationId = "default-pagination";
  const logsId = "default-pagination-logs";

  const [pageIndex, setPageIndex] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [numParagraphs, setNumParagraphs] = useState(100);
  const paragraphArray: JSX.Element[] = useMemo(() => {
    const paragraphs = Array(numParagraphs)
      .fill(0)
      .map((_v: any, i: number) => (
        <p key={`paragraph-${i}`}>This is paragraph number: {i}</p>
      ));

    const maxPageIndex = Math.ceil(paragraphs.length / itemsPerPage);
    if (pageIndex > maxPageIndex) {
      setPageIndex(maxPageIndex);
    }

    return paragraphs;
  }, [numParagraphs]);

  const displayedParagraphs = useMemo(() => {
    const startIndex = (pageIndex - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return paragraphArray.slice(startIndex, endIndex);
  }, [pageIndex, itemsPerPage]);

  const [logItems, setLogItems] = useState<JSX.Element[]>([]);

  return (
    <main>
      <section>
        <h3>Pagination example for paging through a "book" of pages</h3>

        <section>
          <Form inline>
            <TextInput
              label="Number of <p> to generate"
              value={numParagraphs}
              onChange={(e) => setNumParagraphs(Number(e.currentTarget.value))}
            />
          </Form>
        </section>

        <Sheet title="displayed <p>s">{displayedParagraphs}</Sheet>

        <Pagination
          id={paginationId}
          currentPageIndex={pageIndex}
          itemCount={paragraphArray.length}
          itemsPerPage={itemsPerPage}
          itemsPerPageOptions={[1, 2, 5, 10]}
          onPageChange={(e, newIndex) => {
            e?.preventDefault();
            setLogItems([
              <ListItem key={`${newIndex}-${genId()}`}>
                setting new page index: {newIndex}
              </ListItem>,
              ...logItems,
            ]);

            setPageIndex(newIndex);
          }}
          onItemsPerPageChange={(e, newItemsPerPage) => {
            e?.preventDefault();
            setLogItems([
              <ListItem key={`${newItemsPerPage}-${genId()}`}>
                setting new items per page: {newItemsPerPage}
              </ListItem>,
              ...logItems,
            ]);

            setItemsPerPage(newItemsPerPage);

            const maxPageIndex = Math.ceil(
              paragraphArray.length / newItemsPerPage
            );
            if (pageIndex > maxPageIndex) {
              setPageIndex(maxPageIndex);
            }
          }}
        />
      </section>

      <section>
        <h3>`onChange` logs:</h3>

        <List id={logsId}>{logItems}</List>
      </section>
    </main>
  );
};

const Template: Story<PaginationProps> = (props: PaginationProps) => (
  <Pagination {...props} />
);

export const Templated = Template.bind({});
Templated.args = {
  id: "templated-pagination",

  currentPageIndex: 1,
  itemCount: 5,
  itemsPerPage: 1,
  itemsPerPageOptions: [1, 2, 3, 4, 5],
  onPageChange: () => {},
  onItemsPerPageChange: () => {},
};

import { Meta, Story } from "@storybook/react/types-6-0";
import { Button } from "components/Button";
import { BasicModal, BasicModalProps } from "./BasicModal";
import useModal from "../useModal";

export default {
  title: "Components/Basic Modal",
  component: BasicModal,
} as Meta<BasicModalProps>;

export const BasicModalExample = () => {
  const { isOpen, toggle } = useModal(true);
  return (
    <>
      <Button
        data-testid="neo-button-show"
        id="btn-show"
        variant="primary"
        onClick={() => {
          toggle();
        }}
      >
        Show
      </Button>
      <BasicModal
        open={isOpen}
        onClose={toggle}
        title="Modal Example"
        actions={[
          <Button
            key="example1"
            onClick={() => console.log("Clicked on the action button.")}
          >
            action btn
          </Button>,
        ]}
      >
        <p>
          This is just some plain text inside a paragraph tag, let's try longer
          text to see how it <strong>wraps</strong> and aligns
        </p>
      </BasicModal>
    </>
  );
};

export const BasicModalExampleWithDiffContent = () => {
  const { isOpen, toggle } = useModal(false);
  return (
    <>
      <Button
        data-testid="neo-button-show"
        id="btn-show"
        variant="primary"
        onClick={() => {
          toggle();
        }}
      >
        Show
      </Button>
      <BasicModal
        open={isOpen}
        onClose={toggle}
        title="This is basic Modal Example"
        actions={[
          <Button
            key="example1"
            onClick={() => console.log("Clicked on the action1 button.")}
          >
            action1 btn
          </Button>,
          <Button
            key="example2"
            onClick={() => console.log("Clicked on the action2 button.")}
          >
            action2 btn
          </Button>,
        ]}
      >
        <p>
          This is just some plain text inside a paragraph tag, let's try longer
          text to see how it <strong>wraps</strong> and aligns
        </p>
        <br />
        <img src="https://placekitten.com/g/200/300" alt="A cat" />
      </BasicModal>
    </>
  );
};

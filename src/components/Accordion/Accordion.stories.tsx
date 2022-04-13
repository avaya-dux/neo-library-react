import { Meta, Story } from "@storybook/react/types-6-0";
import { Accordion, AccordionProps } from "./Accordion";

export default {
    title: "Components/Accordion",
    component: Accordion,
} as Meta;

export const Default = () => (
    <>
    <Accordion header="Accordion Header" body="Nothing in body"/>
    <Accordion header="Header with expanded true" body="Nothing in body" expand={true}/>
    <Accordion header="Header Disabled" body="Nothing in body" isDisabled={true}/>
    </>
)
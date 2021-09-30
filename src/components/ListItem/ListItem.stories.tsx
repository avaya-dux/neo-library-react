import { Meta, Story } from "@storybook/react/types-6-0";

import { Avatar, Icon, IconButton, Switch } from "components";

import { ListItem, ListItemProps } from ".";

export default {
  title: "Components/ListItem",
  component: ListItem,
} as Meta<ListItemProps>;

const avatarJB = <Avatar initials="JB" id="avtar-jb" />;
const avatarBD = <Avatar initials="BD" id="avtar-bd" />;

const iconBtnCall = (
  <IconButton
    aria-label="call"
    data-testid="neo-button-call"
    id="btn-call"
    icon="call"
    shape="circle"
    variant="tertiary"
  />
);

const iconBtnCall2 = (
  <IconButton
    aria-label="call"
    data-testid="neo-button-call2"
    id="btn-call2"
    icon="call"
    shape="circle"
    variant="tertiary"
  />
);

const iconBtnVideoOn = (
  <IconButton
    aria-label="video on"
    data-testid="neo-button-video-on"
    id="btn-video-on"
    icon="video-on"
    shape="circle"
    variant="tertiary"
  />
);

const iconBtnTransferCall = (
  <IconButton
    aria-label="transfer call"
    data-testid="neo-button-transfer"
    id="btn-transfer-call"
    icon="call-transfer"
    shape="circle"
    variant="tertiary"
  />
);

const iconBtnAddCall = (
  <IconButton
    aria-label="add call"
    data-testid="neo-button-add-call"
    id="btn-add-call"
    icon="call-add"
    shape="circle"
    variant="tertiary"
  />
);

const iconStar = (
  <Icon
    role="img"
    aria-label="star icon"
    data-testid="neo-icon-star"
    id="icon-star"
    icon="star"
  />
);
const iconChat = (
  <Icon
    role="img"
    aria-label="chat icon"
    data-testid="neo-icon-chat"
    id="icon-chat"
    icon="chat"
  />
);

const threeLineText = (
  <div className="vertical">
    <p className="neo-icon-star-filled star-color">Brent Davidson</p>
    <p className="neo-body-small neo-icon-call-outbound">2020-10-15 10:33 AM</p>
    <p className="neo-body-small">01:59:24</p>
  </div>
);

const verticalCounter = (
  <div className="vertical">
    <p className="neo-body-small">22:30</p>
    <p className="neo-body-small">30 min</p>
  </div>
);

const twoLineText = (
  <div className="vertical">
    Devices Design System Weekly
    <p className="neo-body-small">Devices Innovation</p>
  </div>
);

const timeAndBadge = (
  <div className="vertical">
    <p className="neo-body-small">6:02 PM</p>
    <div>
      <span className="neo-badge" data-badge="9"></span>
    </div>
  </div>
);

export const PortalSpacesUIExamples: Story<ListItemProps> = (
  props: ListItemProps
) => (
  <ul className="neo-group-list neo-group-list--hover">
    <ListItem
      variant="spaces_app"
      showDivider
      avatar={avatarJB}
      actions={[iconBtnCall]}
      {...props}
    >
      Joan Barnett
    </ListItem>
    <ListItem variant="spaces_app" showDivider {...props}>
      {verticalCounter}
      {twoLineText}
    </ListItem>
    <ListItem
      variant="spaces_app"
      actions={[iconBtnTransferCall, iconBtnAddCall]}
      {...props}
    >
      <div className="vertical">
        Roy George
        <p className="neo-body-small">1-555-555-5555</p>
      </div>
    </ListItem>
    <ListItem
      variant="spaces_app"
      showDivider
      avatar={avatarBD}
      actions={[iconBtnCall2, iconBtnVideoOn]}
      {...props}
    >
      {threeLineText}
      {twoLineText}
    </ListItem>
    <ListItem
      variant="spaces_app"
      icon={iconStar}
      actions={[timeAndBadge]}
      {...props}
    >
      <div className="vertical">
        Myron Hart
        <p className="neo-body-small">I sent an email to you regarding</p>
      </div>
    </ListItem>
  </ul>
);

const basicSwitch = <Switch label="Activate" defaultChecked />;

export const PortalDefaultNeoUIExamples: Story<ListItemProps> = (
  props: ListItemProps
) => (
  <ul className="neo-group-list--actions">
    <ListItem icon={iconChat} {...props}>
      Text
    </ListItem>

    <ListItem icon={iconChat} actions={[basicSwitch]} {...props}>
      Text
    </ListItem>

    <ListItem
      icon={iconChat}
      actions={[iconBtnTransferCall, iconBtnAddCall]}
      {...props}
    >
      Text
    </ListItem>

    <ListItem actions={[basicSwitch]} {...props}>
      Text
    </ListItem>
  </ul>
);

// Specific ListItem scenarios
export const TextOnly: Story<ListItemProps> = (props: ListItemProps) => (
  <ul className="neo-group-list--actions">
    <ListItem {...props}>First item</ListItem>

    <ListItem {...props}>Second item</ListItem>
  </ul>
);

export const TextOnlyWithHover: Story<ListItemProps> = (
  props: ListItemProps
) => (
  <ul className="neo-group-list--actions">
    <ListItem hover {...props}>
      First item
    </ListItem>

    <ListItem hover {...props}>
      Second item
    </ListItem>
  </ul>
);

export const TextWithIconAndHover: Story<ListItemProps> = (
  props: ListItemProps
) => (
  <ul className="neo-group-list--actions">
    <ListItem icon={iconChat} hover {...props}>
      First item
    </ListItem>

    <ListItem icon={iconStar} hover {...props}>
      Second item
    </ListItem>
  </ul>
);

export const TextWithIconAndHoverAndSwitch: Story<ListItemProps> = (
  props: ListItemProps
) => (
  <ul className="neo-group-list--actions">
    <ListItem icon={iconChat} actions={[basicSwitch]} hover {...props}>
      First item
    </ListItem>

    <ListItem icon={iconStar} hover {...props}>
      Second item
    </ListItem>
  </ul>
);

export const TextWithIconAndHoverAndIconButton: Story<ListItemProps> = (
  props: ListItemProps
) => (
  <ul className="neo-group-list--actions">
    <ListItem icon={iconChat} actions={[iconBtnTransferCall]} hover {...props}>
      First item
    </ListItem>

    <ListItem icon={iconStar} hover {...props}>
      Second item
    </ListItem>
  </ul>
);

import { IconNamesType } from "utils/icons";

import "@avaya/neo/neo/dist/css/neo/neo.min.css";

// TODO-564 Theme (NeoProvider): should not be adding this import in individual components

export interface NoContentProps {
  icon?: IconNamesType;
  text?: string;
}

export const NoContent = ({ icon, text = "No Content" }: NoContentProps) => (
  <div className="neo-empty-state" data-testid="NoContent-root">
    <p className={`neo-icon-${icon || "info"}`}>{text}</p>
  </div>
);

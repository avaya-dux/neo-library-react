export function getCheckboxClassName(isIndeterminate: boolean) {
  const classNames = ["neo-check"];

  if (isIndeterminate) {
    classNames.push("neo-check--indeterminate");
  }

  return { className: classNames.join(" ") };
}

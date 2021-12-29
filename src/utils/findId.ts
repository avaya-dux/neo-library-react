export const findId = (
  id: string,
  currentNode: HTMLDivElement
): string | false => {
  let i, currentChild, result;

  if (currentNode) {
    if (id === currentNode.id) {
      return id;
    } else {
      // Use a for loop instead of forEach to avoid nested functions
      // Otherwise "return" will not work properly

      for (i = 0; i < currentNode?.children.length; i += 1) {
        currentChild = currentNode?.children[i];

        // Search in the current child
        result = findId(id, currentChild as HTMLDivElement);

        // Return the result if the node has been found
        if (result !== false) {
          return result;
        }
      }
      return false;
    }
  } else {
    return false;
  }
};

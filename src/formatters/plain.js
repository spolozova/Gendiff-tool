import _ from 'lodash';

const formatValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return (typeof value === 'string') ? `'${value}'` : value;
};

const handlers = {
  root: (ancestor, node) => node.children
    .flatMap((child) => {
      const newAncestor = _.concat(ancestor, child.key);
      return handlers[child.status](newAncestor, child);
    })
    .join('\n'),
  node: (ancestor, node) => handlers.root(ancestor, node),
  unchanged: () => [],
  updated: (ancestor, node) => `Property '${ancestor.join('.')}' was updated. From ${formatValue(node.value2)} to ${formatValue(node.value)}`,
  added: (ancestor, node) => `Property '${ancestor.join('.')}' was added with value: ${formatValue(node.value)}`,
  deleted: (ancestor) => `Property '${ancestor.join('.')}' was removed`,
};

export default (difference) => {
  const getPlain = (tree, ancestor) => handlers[tree.status](ancestor, tree);
  return getPlain(difference, []);
};

import _ from 'lodash';

const formatValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return (typeof value === 'string') ? `'${value}'` : value;
};

const handlers = {
  root: (ancestor, { children }) => children.map((child) => {
      const newAncestor = _.concat(ancestor, child.key);
      return handlers[child.status](newAncestor, child);
    }).join('\n'),
  node: (ancestor, { children }) => children.flatMap((child) => {
    const newAncestor = _.concat(ancestor, child.key);
    return handlers[child.status](newAncestor, child);
  }).join('\n'),
  unchanged: () => [],
  changed: (ancestor, node) => `Property '${ancestor.join('.')}' was updated. From ${formatValue(node.value)} to ${formatValue(node.value2)}`,
  added: (ancestor, node) => `Property '${ancestor.join('.')}' was added with value: ${formatValue(node.value)}`,
  deleted: (ancestor) => `Property '${ancestor.join('.')}' was removed`,
};

export default (difference) => {
  const getPlain = (tree, ancestor) => handlers[tree.status](ancestor, tree);
  return getPlain(difference, []);
};

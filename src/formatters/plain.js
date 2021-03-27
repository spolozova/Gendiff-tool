import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return (typeof value === 'string') ? `'${value}'` : value;
};

const handlers = {
  unchanged: () => [],
  root: (ancestor, { children }, iter) => children
    .flatMap((node) => iter(node, [...ancestor, node.key])),
  node: (ancestor, { children }, iter) => children
    .flatMap((node) => iter(node, [...ancestor, node.key])),
  changed: (ancestor, node) => `Property '${ancestor.join('.')}' was updated. From ${stringify(node.value)} to ${stringify(node.value2)}`,
  added: (ancestor, node) => `Property '${ancestor.join('.')}' was added with value: ${stringify(node.value)}`,
  deleted: (ancestor) => `Property '${ancestor.join('.')}' was removed`,
};

export default (difference) => {
  const iter = (tree, ancestor) => handlers[tree.status](ancestor, tree, iter);
  return iter(difference, []).join('\n');
};

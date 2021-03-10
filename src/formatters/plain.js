import _ from 'lodash';

const formatValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return (typeof value === 'string') ? `'${value}'` : value;
};

const states = {
  unchanged: () => [],
  updated: (ancestor, node) => `Property '${ancestor.join('.')}' was updated. From ${formatValue(node.value2)} to ${formatValue(node.value)}`,
  added: (ancestor, node) => `Property '${ancestor.join('.')}' was added with value: ${formatValue(node.value)}`,
  deleted: (ancestor) => `Property '${ancestor.join('.')}' was removed`,
  node: (ancestor, node, iter) => node.children.flatMap((child) => iter(child, ancestor)),
};

const getPlain = (difference) => {
  const iter = (node, ancestor) => {
    const { key, status } = node;
    const newAncestor = _.concat(ancestor, key);
    return states[status](newAncestor, node, iter);
  };
  return difference.flatMap((node) => iter(node, [])).join('\n');
};

export default getPlain;

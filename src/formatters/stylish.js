import _ from 'lodash';

const makeIdent = (depth) => '    '.repeat(depth);

const stringify = (value, identCounter) => {
  const iter = (currentValue, depth) => {
    if (!_.isPlainObject(currentValue)) {
      return currentValue;
    }
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${makeIdent(depth + 1)}${key}: ${iter(val, depth + 1)}`);
    return [
      '{',
      ...lines,
      `${makeIdent(depth)}}`,
    ].join('\n');
  };
  return iter(value, identCounter);
};

const states = {
  unchanged: (node, depth) => `${makeIdent(depth)}    ${node.key}: ${stringify(node.value, depth + 1)}`,
  added: (node, depth) => `${makeIdent(depth)}  + ${node.key}: ${stringify(node.value, depth + 1)}`,
  deleted: (node, depth) => `${makeIdent(depth)}  - ${node.key}: ${stringify(node.value, depth + 1)}`,
  updated: (node, depth) => [
    `${makeIdent(depth)}  - ${node.key}: ${stringify(node.value2, depth + 1)}`,
    `${makeIdent(depth)}  + ${node.key}: ${stringify(node.value, depth + 1)}`,
  ],
  node: (node, depth, iter) => `${makeIdent(depth)}    ${node.key}: ${iter(node.children, depth + 1)}`,
};

const getStylish = (difference) => {
  const iter = (currentValue, depth) => {
    const stylizedDiff = currentValue
      .flatMap((node) => states[node.status](node, depth, iter));
    return ['{', ...stylizedDiff, `${makeIdent(depth)}}`].join('\n');
  };
  return iter(difference, 0);
};
export default getStylish;

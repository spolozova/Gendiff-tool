import _ from 'lodash';

const makeIdent = (depth) => '    '.repeat(depth);

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return value;
  }
  const lines = Object.entries(value)
    .map(([key, val]) => `${makeIdent(depth + 1)}${key}: ${stringify(val, depth + 1)}`);
  return [
    '{',
    ...lines,
    `${makeIdent(depth)}}`,
  ].join('\n');
};

const handlers = {
  root: (node, depth) => {
    const output = node.children
      .flatMap((child) => handlers[child.status](child, depth));
    return ['{', ...output, `${makeIdent(depth)}}`].join('\n');
  },
  node: (node, depth) => `${makeIdent(depth)}    ${node.key}: ${handlers.root(node, depth + 1)}`,
  unchanged: (node, depth) => `${makeIdent(depth)}    ${node.key}: ${stringify(node.value, depth + 1)}`,
  added: (node, depth) => `${makeIdent(depth)}  + ${node.key}: ${stringify(node.value, depth + 1)}`,
  deleted: (node, depth) => `${makeIdent(depth)}  - ${node.key}: ${stringify(node.value, depth + 1)}`,
  updated: (node, depth) => [
    `${makeIdent(depth)}  - ${node.key}: ${stringify(node.value2, depth + 1)}`,
    `${makeIdent(depth)}  + ${node.key}: ${stringify(node.value, depth + 1)}`,
  ],
};

export default (difference) => {
  const iter = (node, depth) => handlers[node.status](node, depth);
  return iter(difference, 0);
};

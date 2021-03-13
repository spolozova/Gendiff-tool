import _ from 'lodash';

const IDENT_SPACE = 4;
const NODE_TYPE_SPACE = 2;

const indent = (depth) => ' '.repeat(depth * IDENT_SPACE - NODE_TYPE_SPACE);

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return value;
  }
  const lines = Object.entries(value)
    .map(([key, val]) => `${indent(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`);
  return `{\n${lines.join('\n')}\n  ${indent(depth)}}`;
};

const handlers = {
  root: ({ children }, depth) => {
    const output = children
      .flatMap((child) => handlers[child.status](child, depth + 1));
    return `{\n${output.join('\n')}\n}`;
  },
  node: (node, depth) => {
    const output = node.children.flatMap((child) => handlers[child.status](child, depth + 1));
    const nodeOutput = `{\n${output.join('\n')}\n${indent(depth)}  }`;
    return `${indent(depth)}  ${node.key}: ${nodeOutput}`;
  },
  unchanged: (node, depth) => `${indent(depth)}  ${node.key}: ${stringify(node.value, depth)}`,
  added: (node, depth) => `${indent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`,
  deleted: (node, depth) => `${indent(depth)}- ${node.key}: ${stringify(node.value, depth)}`,
  changed: (node, depth) => [
    `${indent(depth)}- ${node.key}: ${stringify(node.value, depth)}`,
    `${indent(depth)}+ ${node.key}: ${stringify(node.value2, depth)}`,
  ],
};

export default (difference) => {
  const getStylish = (tree, depth) => handlers[tree.status](tree, depth);
  return getStylish(difference, 0);
};

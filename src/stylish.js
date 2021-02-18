import _ from 'lodash';

const states = {
  unchanged: '    ',
  added: '  + ',
  deleted: '  - ',
};

const stringfy = (value, spacesCount) => {
  const iter = (currentValue, depth) => {
    if (!_.isPlainObject(currentValue)) {
      return `${currentValue}`;
    }
    const currentIndent = states.unchanged.repeat(depth);
    const bracketIndent = states.unchanged.repeat(depth - 1);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(value, spacesCount);
};

const stylish = (difference) => {
  const iter = (currentValue, depth) => {
    if (!Array.isArray(currentValue)) {
      return stringfy(currentValue, depth);
    }
    const currentIndent = states.unchanged.repeat(depth - 1);
    const stylizedDiff = currentValue
      .flatMap(([key, value, status, oldValue]) => {
        if (status === 'changed') {
          const deletedValue = `${currentIndent}${states.deleted}${key}: ${iter(oldValue, depth + 1)}`;
          const addedValue = `${currentIndent}${states.added}${key}: ${iter(value, depth + 1)}`;
          return [deletedValue, addedValue];
        }
        if (status === 'node') {
          return `${currentIndent}${states.unchanged}${key}: ${iter(value, depth + 1)}`;
        }
        return `${currentIndent}${states[status]}${key}: ${iter(value, depth + 1)}`;
      });
    return [
      '{',
      ...stylizedDiff,
      `${currentIndent}}`,
    ].join('\n');
  };
  return iter(difference, 1);
};
export default stylish;

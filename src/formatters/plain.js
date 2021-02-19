import _ from 'lodash';

const states = {
  changed: 'was updated.',
  added: 'was added with value:',
  deleted: 'was removed',
  };

const formatValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return (typeof(value) === 'string') ? `'${value}'` : value;
};

const getPlainForm = (difference) => {
  const iter = (node, ancestry) => {
    const { key, value, status, oldValue } = node;
    const newAncesrty = _.concat(ancestry, key);
    const currentValue = formatValue(value);
    const previousValue = formatValue(oldValue);
    switch (status) {
      case 'unchanged':
        return [];
      case 'updated':
        return `Property '${newAncesrty.join('.')}' ${states.changed} From ${previousValue} to ${currentValue}`;
      case 'deleted':
        return `Property '${newAncesrty.join('.')}' ${states.deleted}`;
      case 'added':
        return `Property '${newAncesrty.join('.')}' ${states.added} ${currentValue}`;
      default:
        return value.flatMap((item) => iter(item, newAncesrty));
    }
  };
  return difference.flatMap((node) => iter(node, [])).join('\n');
};

export default getPlainForm;

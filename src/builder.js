import _ from 'lodash';

export const buildDiff = (fileBefore, fileAfter) => {
  const keysBefore = _.keys(fileBefore);
  const keysAfter = _.keys(fileAfter);
  const keys = _.sortBy(_.union(keysBefore, keysAfter));
  const difference = keys.map((key) => {
    const oldValue = fileBefore[key];
    const newValue = fileAfter[key];
    if (!_.has(fileBefore, key)) {
      return { key, value: newValue, status: 'added' };
    }
    if (!_.has(fileAfter, key)) {
      return { key, value: oldValue, status: 'deleted' };
    }
    if (_.isPlainObject(oldValue) && _.isPlainObject(newValue)) {
      return { key, children: buildDiff(oldValue, newValue), status: 'node' };
    } if (!_.isEqual(oldValue, newValue)) {
      return {
        key,
        value: newValue,
        status: 'updated',
        oldValue,
      };
    }
    return { key, value: oldValue, status: 'unchanged' };
  });
  return difference;
};

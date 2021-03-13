import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const sortedKeys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));
  return sortedKeys.map((key) => {
    if (!_.has(data1, key)) {
      return {
        key,
        value: data2[key],
        status: 'added',
      };
    }
    if (!_.has(data2, key)) {
      return {
        key,
        value: data1[key],
        status: 'deleted',
      };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        key,
        children: buildDiff(data1[key], data2[key]),
        status: 'node',
      };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key,
        value: data1[key],
        status: 'changed',
        value2: data2[key],
      };
    }
    return {
      key,
      value: data1[key],
      status: 'unchanged',
    };
  });
};

export default (data1, data2) => ({
  status: 'root',
  children: buildDiff(data1, data2),
});

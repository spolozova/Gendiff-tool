import _ from 'lodash';
import { getNomalizedPath, getFileData, getParsedData } from './utils.js';

const UNCHANGED = '    ';
const ADDED = '  + ';
const DELETED = '  - ';

export default (filepath1, filepath2) => {
  const fileBefore = getParsedData(getFileData(getNomalizedPath(filepath1)));
  const fileAfter = getParsedData(getFileData(getNomalizedPath(filepath2)));
  const keys = _.sortBy(_.union(_.keys(fileBefore), _.keys(fileAfter)));
  const difference = keys.reduce((acc, key) => {
    if (!_.has(fileBefore, key)) {
      acc.push([ADDED, key, fileAfter[key]]);
    } else if (!_.has(fileAfter, key)) {
      acc.push([DELETED, key, fileBefore[key]]);
    } else if (fileBefore[key] === fileAfter[key]) {
      acc.push([UNCHANGED, key, fileBefore[key]]);
    } else if (fileBefore[key] !== fileAfter[key]) {
      acc.push([DELETED, key, fileBefore[key]]);
      acc.push([ADDED, key, fileAfter[key]]);
    }
    return acc;
  }, [])
    .map(([state, key, value]) => `${state}${key}: ${value}`)
    .join('\n');
    return `{\n${difference}\n}`;
};

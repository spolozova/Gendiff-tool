import _ from 'lodash';
import { getNomalizedPath, getFileData, getParsedData } from './utils.js';

const UNCHANGED = '  ';
const ADDED = '+ ';
const DELETED = '- ';

export default (filepath1, filepath2) => {
  const fileBefore = getParsedData(getFileData(getNomalizedPath(filepath1)));
  const fileAfter = getParsedData(getFileData(getNomalizedPath(filepath2)));
  const keys = _.sortBy(_.union(_.keys(fileBefore), _.keys(fileAfter)));
  const difference = keys.reduce((acc, key) => {
    if (!_.has(fileBefore, key)) {
      return [...acc, [ADDED, key, fileAfter[key]]];
    } if (!_.has(fileAfter, key)) {
      return [...acc, [DELETED, key, fileBefore[key]]];
    } if (fileBefore[key] === fileAfter[key]) {
      return [...acc, [UNCHANGED, key, fileBefore[key]]];
    } if (fileBefore[key] !== fileAfter[key]) {
      return [...acc, [DELETED, key, fileBefore[key]], [ADDED, key, fileAfter[key]]];
    }
    return acc;
  }, [])
    .map(([state, key, value]) => `${state}${key}: ${value}`)
    .join('\n');
  console.log(`{\n${difference}\n}`);
};

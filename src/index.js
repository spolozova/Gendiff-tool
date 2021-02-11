import _ from 'lodash';
import { getNomalizedPath, getFileData, getExtname } from './utils.js';
import getParsedData from './parsers.js';

const UNCHANGED = '    ';
const ADDED = '  + ';
const DELETED = '  - ';

export default (filepath1, filepath2) => {
  const fullPathFile1 = getNomalizedPath(filepath1);
  const fullPathFile2 = getNomalizedPath(filepath2);
  const typeFile1 = getExtname(fullPathFile1);
  const typeFile2 = getExtname(fullPathFile2);
  const dataFile1 = getFileData(fullPathFile1);
  const dataFile2 = getFileData(fullPathFile2);
  const fileBefore = getParsedData(typeFile1, dataFile1);
  const fileAfter = getParsedData(typeFile2, dataFile2);
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

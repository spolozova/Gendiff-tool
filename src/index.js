import { getNormalizedPath, getFileData, getExtname, buildDiff } from './utils.js';
import getParsedData from './parsers.js';
import stylish from './stylish.js';

export default (filepath1, filepath2, format = stylish) => {
  const fullPathFile1 = getNormalizedPath(filepath1);
  const fullPathFile2 = getNormalizedPath(filepath2);
  const typeFile1 = getExtname(fullPathFile1);
  const typeFile2 = getExtname(fullPathFile2);
  const dataFile1 = getFileData(fullPathFile1);
  const dataFile2 = getFileData(fullPathFile2);
  const fileBefore = getParsedData(typeFile1, dataFile1);
  const fileAfter = getParsedData(typeFile2, dataFile2);
  const diff = buildDiff(fileBefore, fileAfter);
  const stylezedDiff = stylish(diff);
  return stylezedDiff;
};

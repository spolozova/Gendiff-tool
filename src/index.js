import * as path from 'path';
import fs from 'fs';

import buildDiff from './builder.js';
import parse from './parsers.js';
import format from './formatters/index.js';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const getExtension = (filepath) => path.extname(filepath).slice(1);
const getData = (filepath) => parse(fs.readFileSync(filepath, 'UTF-8'), getExtension(filepath));

export default (filepath1, filepath2, formatName) => {
  const data1 = getData(getFullPath(filepath1));
  const data2 = getData(getFullPath(filepath2));
  const diff = buildDiff(data1, data2);
  return format(diff, formatName);
};

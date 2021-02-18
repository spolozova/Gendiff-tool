import * as path from 'path';
import fs from 'fs';
import _ from 'lodash';

const getNormalizedPath = (filepath) => path.resolve(process.cwd(), filepath);

const getFileData = (filepath) => {
  const normalizedPath = getNormalizedPath(filepath);
  return fs.readFileSync(normalizedPath, 'UTF-8');
};

const getExtname = (filepath) => path.extname(filepath);

const buildDiff = (fileBefore, fileAfter) => {
  const keys = _.sortBy(_.union(_.keys(fileBefore), _.keys(fileAfter)));
  const difference = keys.map((key) => {
    const oldValue = fileBefore[key];
    const newValue = fileAfter[key];
    if (!_.has(fileBefore, key)) {
      return [key, newValue, 'added'];
    }
    if (!_.has(fileAfter, key)) {
      return [key, oldValue, 'deleted'];
    }
    if (_.isPlainObject(oldValue) && _.isPlainObject(newValue)) {
      return [key, buildDiff(oldValue, newValue), 'node'];
    } if (!_.isEqual(oldValue, newValue)) {
      return [key, newValue, 'changed', oldValue];
    }
    return [key, oldValue, 'unchanged'];
  });
  return difference;
};

export {
  getNormalizedPath,
  getFileData,
  getExtname,
  buildDiff,
};

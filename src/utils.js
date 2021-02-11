import * as path from 'path';
import fs from 'fs';

const getNomalizedPath = (filepath) => path.resolve(process.cwd(), filepath);

const getFileData = (filepath) => {
  const normalizedPath = getNomalizedPath(filepath);
  return fs.readFileSync(normalizedPath, 'UTF-8');
};

const getExtname = (filepath) => path.extname(filepath);

export { getNomalizedPath, getFileData, getExtname };

import getDiff from '../src/index';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename); //нужна для составления пути к файлам с фикстурами
const readFile = (filename) => fs.readFile(getFixturePath(filename), 'utf-8'); //нужна для чтения ожидаемых результатов
//const json = await readFile('expected.json');
  
const fileBefore = getFixturePath('json1.json');
const fileAfter = getFixturePath('json2.json');
test('getDiff JSON', () => {
  const difference = getDiff(fileBefore, fileAfter);
expect(difference).toEqual(`{
  - follow: false
    host: hexlet.io
    name: test
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});

// import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import getDiff from '../src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
// нужна для составления пути к файлам с фикстурами
// const readFile = (filename) => fs.readFile(getFixturePath(filename), 'utf-8');
// нужна для чтения ожидаемых результатов
// const json = await readFile('expected.json');


test('getDiff JSON', () => {
  const jsonBefore = getFixturePath('json1.json');
  const jasonAfter = getFixturePath('json2.json');
  const difference = getDiff(jsonBefore, jasonAfter);
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

test('getDiff YAML', () => {
  const yamlBefore = getFixturePath('yaml1.yml');
  const yamlAfter = getFixturePath('yaml2.yml');
  const difference = getDiff(yamlBefore, yamlAfter);
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

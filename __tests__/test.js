// import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const json1 = getFixturePath('json1.json');
const json2 = getFixturePath('json2.json');
const yaml1 = getFixturePath('yaml1.yml');
const yaml2 = getFixturePath('yaml2.yml');
const expectedStylish = fs.readFileSync(getFixturePath('expected/stylish.txt'), 'utf-8');
const expectedPlain = fs.readFileSync(getFixturePath('expected/plain.txt'), 'utf-8');
const expectedJson = fs.readFileSync(getFixturePath('expected/json.txt'), 'utf-8');

test('getDiff JSON stylish', () => {
  const expected = expectedStylish;
  expect(genDiff(json1, json2, 'stylish')).toEqual(expected);
});

test('genDiff YAML stylish', () => {
  const expected = expectedStylish;
  expect(genDiff(yaml1, yaml2, 'stylish')).toEqual(expected);
});

test('getDiff JSON plain', () => {
  const expected = expectedPlain;
  expect(genDiff(json1, json2, 'plain')).toEqual(expected);
});

test('genDiff YAML plain', () => {
  const expected = expectedPlain;
  expect(genDiff(yaml1, yaml2, 'plain')).toEqual(expected);
});

test('getDiff JSON json', () => {
  const expected = expectedJson;
  expect(genDiff(json1, json2, 'json')).toEqual(expected);
});

test('genDiff YAML json', () => {
  const expected = expectedJson;
  expect(genDiff(yaml1, yaml2, 'json')).toEqual(expected);
});

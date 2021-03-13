// import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expectedData = { stylish: [], plain: [], json: [] };
const json1 = getFixturePath('json1.json');
const json2 = getFixturePath('json2.json');
const yaml1 = getFixturePath('yaml1.yml');
const yaml2 = getFixturePath('yaml2.yml');
beforeAll(() => {
const stylishData = fs.readFileSync(getFixturePath('stylish.txt'), 'utf-8');
const plainData = fs.readFileSync(getFixturePath('plain.txt'), 'utf-8');
const jsonData = fs.readFileSync(getFixturePath('json.txt'), 'utf-8').trim();
expectedData.stylish = stylishData.split('\n\n\n');
expectedData.plain = plainData.split('\n\n\n');
expectedData.json = jsonData.trim().split('\n\n\n');
});

test('getDiff JSON stylish', () => {
  const expected = expectedData.stylish[0];
  expect(genDiff(json1, json2, 'stylish')).toEqual(expected);
});

test('genDiff YAML stylish', () => {
  const expected = expectedData.stylish[1];
  expect(genDiff(yaml1, yaml2, 'stylish')).toEqual(expected);
});

test('getDiff JSON plain', () => {
  const expected = expectedData.plain[0];
  expect(genDiff(json1, json2, 'plain')).toEqual(expected);
});

test('genDiff YAML plain', () => {
  const expected = expectedData.plain[1];
  expect(genDiff(yaml1, yaml2, 'plain')).toEqual(expected);
});

test('getDiff JSON json', () => {
  const expected = expectedData.json[0];
  expect(genDiff(json1, json2, 'json')).toEqual(expected);
});

test('genDiff YAML json', () => {
  const expected = expectedData.json[1];
  expect(genDiff(yaml1, yaml2, 'json')).toEqual(expected);
});

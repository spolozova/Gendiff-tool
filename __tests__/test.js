// import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const jsonBefore = getFixturePath('json1.json');
const jsonAfter = getFixturePath('json2.json');
const yamlBefore = getFixturePath('yaml1.yml');
const yamlAfter = getFixturePath('yaml2.yml');

test('getDiff JSON stylish', () => {
  expect(genDiff(jsonBefore, jsonAfter, 'stylish')).toEqual(`{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`);
});

test('genDiff YAML stylish', () => {
  expect(genDiff(yamlBefore, yamlAfter, 'stylish')).toEqual(`{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`);
});

test('getDiff JSON plain', () => {
  expect(genDiff(jsonBefore, jsonAfter, 'plain')).toEqual(`Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`);
});

test('genDiff YAML plain', () => {
  expect(genDiff(yamlBefore, yamlAfter, 'plain')).toEqual(`Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`);
});

test('getDiff JSON json', () => {
  expect(genDiff(jsonBefore, jsonAfter, 'json')).toEqual('{"status":"root","children":[{"key":"common","children":[{"key":"follow","value":false,"status":"added"},{"key":"setting1","value":"Value 1","status":"unchanged"},{"key":"setting2","value":200,"status":"deleted"},{"key":"setting3","value":null,"status":"updated","value2":true},{"key":"setting4","value":"blah blah","status":"added"},{"key":"setting5","value":{"key5":"value5"},"status":"added"},{"key":"setting6","children":[{"key":"doge","children":[{"key":"wow","value":"so much","status":"updated","value2":""}],"status":"node"},{"key":"key","value":"value","status":"unchanged"},{"key":"ops","value":"vops","status":"added"}],"status":"node"}],"status":"node"},{"key":"group1","children":[{"key":"baz","value":"bars","status":"updated","value2":"bas"},{"key":"foo","value":"bar","status":"unchanged"},{"key":"nest","value":"str","status":"updated","value2":{"key":"value"}}],"status":"node"},{"key":"group2","value":{"abc":12345,"deep":{"id":45}},"status":"deleted"},{"key":"group3","value":{"deep":{"id":{"number":45}},"fee":100500},"status":"added"}]}');
});

test('genDiff YAML json', () => {
  expect(genDiff(yamlBefore, yamlAfter, 'json')).toEqual('{"status":"root","children":[{"key":"common","children":[{"key":"follow","value":false,"status":"added"},{"key":"setting1","value":"Value 1","status":"unchanged"},{"key":"setting2","value":200,"status":"deleted"},{"key":"setting3","value":null,"status":"updated","value2":true},{"key":"setting4","value":"blah blah","status":"added"},{"key":"setting5","value":{"key5":"value5"},"status":"added"},{"key":"setting6","children":[{"key":"doge","children":[{"key":"wow","value":"so much","status":"updated","value2":""}],"status":"node"},{"key":"key","value":"value","status":"unchanged"},{"key":"ops","value":"vops","status":"added"}],"status":"node"}],"status":"node"},{"key":"group1","children":[{"key":"baz","value":"bars","status":"updated","value2":"bas"},{"key":"foo","value":"bar","status":"unchanged"},{"key":"nest","value":"str","status":"updated","value2":{"key":"value"}}],"status":"node"},{"key":"group2","value":{"abc":12345,"deep":{"id":45}},"status":"deleted"},{"key":"group3","value":{"deep":{"id":{"number":45}},"fee":100500},"status":"added"}]}');
});

import getStylish from './stylish.js';
import getPlain from './plain.js';
import getJson from './json.js';

const formatters = {
  stylish: getStylish,
  plain: getPlain,
  json: getJson,
};
export default (diff, formatName = 'stylish') => formatters[formatName](diff);

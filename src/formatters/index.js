import getStylishForm from './stylish.js';
import getPlainForm from './plain.js';
import getJsonForm from './json.js';

const formatters = {
  stylish: getStylishForm,
  plain: getPlainForm,
  json: getJsonForm,
};
export default (formatName = 'stylish') => formatters[formatName];

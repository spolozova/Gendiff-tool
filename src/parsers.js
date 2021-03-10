import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.load,
};

export default (data, type) => parsers[type](data);

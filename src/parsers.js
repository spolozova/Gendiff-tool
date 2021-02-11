import yaml from 'js-yaml';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.load,
  ' ': JSON.parse,
};

export default (type, data) => parsers[type](data);

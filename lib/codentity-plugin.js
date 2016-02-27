'use strict';

const _ = require('lodash');

class CodentityPlugin {
  constructor (idKey) {
    if (!_.isString(idKey)) throw new Error('Missing required argument: idKey');
    this._idKey = idKey;
  }
  static make () {
    throw new Error('Static method not implemented: make');
  }
  reinitialize (config) {
    return this;
  }
  filter (filePaths) {
    return filePaths;
  }
  find () {
    return [];
  }
  identify (pkg) {
    const idKey = this.idKey();
    const query = pkg[idKey];
    if (_.isUndefined(query)) return [];
    let queries = _.isArray(query) ? query : [query];
    return queries.reduce((matches, query) => {
      return matches.concat(this.find(query));
    }, []);
  }
  idKey () {
    return this._idKey;
  }
}

module.exports = CodentityPlugin;

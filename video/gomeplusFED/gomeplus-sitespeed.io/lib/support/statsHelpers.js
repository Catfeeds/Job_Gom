'use strict';

const Stats = require('fast-stats').Stats,
  get = require('lodash.get'),
  set = require('lodash.set');

function percentileName(percentile) {
  if (percentile === 0) {
    return 'min';
  } else if (percentile === 100) {
    return 'max';
  } else {
    return 'p' + String(percentile).replace('.', '_');
  }
}

module.exports = {

  /**
   * Create or update a fast-stats#Stats object in target at path.
   */
  pushStats(target, path, data) {
  if (typeof data !== 'number')
    throw new Error('Tried to add ' + data + ' to stats');

  // 不重复利用已存在的对象,每次生成一个新对象
  // const stats = get(target, path, new Stats());
  const stats = new Stats();
  stats.push(data);
  set(target, path, stats);
},

/**
 * Summarize stats and put result in target at path
 */
setStatsSummary(target, path, stats) {
  set(target, path, this.summarizeStats(stats));
},

summarizeStats(stats, options) {
  if (stats.length === 0) {
    return undefined;
  }

  options = options || {};
  let percentiles = options.percentiles || [0, 10, 90, 99, 100];
  let decimals = options.decimals || 0;
  let data = {
    median: Number(stats.median().toFixed(decimals)),
    mean: Number(stats.amean().toFixed(decimals))
  };
  percentiles.forEach((p) => {
    let name = percentileName(p);
  const percentile = stats.percentile(p);
  if (Number.isFinite(percentile)) {
    data[name] = Number(percentile.toFixed(decimals));
  } else {
    throw new Error('Failed to calculate ' + name + ' for stats: ' + JSON.stringify(stats, null, 2));
  }
});
  if (options.includeSum) {
    data.sum = stats.Σ().toFixed(decimals);
  }

  return data;
}
};

function flattenObj(obj, parent, res = {}) {
  for (let key in obj) {
    let propName = parent ? parent + '.' + key : key;
    if (typeof obj[key] == 'object' && !(obj[key] instanceof Array)) {
      flattenObj(obj[key], propName, res);
    } else {
      res[`${propName}`] = obj[key];
    }
  }
  return res;
}

function helmUpgradeCommand(values, release, chart, ns) {
  values = flattenObj(values)
  let command = "helm upgrade \\\n";
  for (k in values) {
    command += `--set ${k}=${values[k]} \\\n`
  }
  command += `--namespace ${ns} --install ${release} ${chart}`
  return command
}

module.exports = helmUpgradeCommand
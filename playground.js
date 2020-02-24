var obj = {
  api_key: "1234",
  node_env: "dev",
  image: {
    repo: "vishal:5000",
    tag: "latest",
  },
  ingress: {
    hosts: ["www.google.com", "www.m.google.com"]
  }
}

function flattenObj(obj, parent, res = {}) {
  for (let key in obj) {
    let propName = parent ? parent + '.' + key : key;
    if (typeof obj[key] == 'object' && !(obj[key] instanceof Array)) {
      flattenObj(obj[key], propName, res);
    } else {
      console.log(propName)
      res[`${propName}`] = obj[key];
    }
  }
  return res;
}

console.log(flattenObj(obj))
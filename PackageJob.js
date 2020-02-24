const { events, Job } = require("brigadier");
const BuildTask = require("./BuildTask");

class PackageJob {
  static pack(reg, name, file = 'Dockerfile') {
    var packageJob = new Job("package", "localhost:5000/docker");
    packageJob.docker.enabled = true; // to interact directly docker runtime of kubernetes node TODO: remove it when code is running cloud
    packageJob.storage.enabled = true;
    packageJob.tasks = [
      'ls -lart',
      `mkdir /app && cd /app`, // set /app as working dir
      BuildTask.restoreBuild(),
      BuildTask.exportTag(),
      "echo $APP_VER",
      `docker build -f ${file} . -t ${reg}/${name}:$APP_VER`,
      `docker push ${reg}/${name}:$APP_VER`,
    ];
    return packageJob;
  }
}

module.exports = PackageJob
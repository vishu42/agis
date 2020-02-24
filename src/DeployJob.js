const { events, Job } = require("brigadier");
const helmUpgradeCommand = require('./HelmUpgradeCommand');
const BuildTask = require('./BuildTask');

class DeployJob {

  constructor(e, p) {
    this.e = e;
    this.p = p;
  }

  deploy(deployEnvironment, values) {
    const deployEnvSuffix = deployEnvironment.split('-').pop()
    let deployJob = new Job(`deploy-to-${deployEnvSuffix}`, 'alpine/helm:2.16.1')
    deployJob.storage.enabled = true
    deployJob.tasks = [
      // TODO: there should be a cluster login function here - skipping this as of now
      "pwd",
      "ls -lart",
      "cd /src",
      new BuildTask(this.e, this.p).exportTag(),
      "helm version",
      helmUpgradeCommand(values, `${deployEnvironment}-${this.p.secrets.appName}`, `./helm/${this.p.secrets.appName}`, deployEnvironment)
    ]
    return deployJob;
  }
}

module.exports = DeployJob

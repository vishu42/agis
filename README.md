# agis
A collection of brigade helper functions

The module is divided into two types of files, ending with Task or Job suffix. 
Files with Task suffix contains shell script which can be injected into brigade tasks.
And files with Job suffix are brigade jobs which run be run as it is - with some custom params. 

## BuildTasks.js
This file contains shell script as js functions which can come handy while creating ci/cd pipelines using brigade.js

### Semantic versioning 
I have tried to implement semantic versioning from scratch. For that following functions can be used - 
fetchLatestGitTag() - Fetches latest git tag and stores in it brigade shared dir
exportTag() - Makes tag available as a Shell var
bumpTag(VERSION_INDEX) - This function assumes that exportTag() function is called before and in the same context. VERSION_INDEX is an integer which determines which version to increment ( that is major, minor or patch ). 
addAndPushExportedTag() - This would push exported tag

fetchTagBumpItAndPushIt() - It simply calls above function in seq. 

## PackageJob.js
As the name says it contains a brigade job which can be directly from brigade script.
like so - new PackageJob(e, p).pack(registry, name, dockerfile_path).run()

## Events.js
This class implements different events based on payload. Right now there are two events - push and deploy

## HelmUpgradeCommand.js
This file contains two functions flattenObj() which flattens values object and helmUpgradeCommand(values, release, chart, ns) which generates a helm upgrade command. 

## DeployJob.js
This class helps to deploy a project is a namespace using helm installation. 
Its deploy method looks like 
deploy(deployEnvironment, values)

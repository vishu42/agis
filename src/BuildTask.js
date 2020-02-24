const SHARED_DIR = '/mnt/brigade/share';

class BuildTask {

  constructor(e, p) {
    this.e = e;
    this.p = p;
  }

  tarSharedDir() {
    return `tar -cf sharedDir.tar ${SHARED_DIR}\n`
  }

  tarBuild(exclusion = ".git", tarName = 'build.tar') {
    return `tar --exclude="${exclusion}" -cf ${tarName} *\n`
  }

  moveTarsToSharedDir() {
    return `mv *.tar ${SHARED_DIR}`
  }

  restoreBuild(tarName = 'build.tar') {
    return `tar -xf ${SHARED_DIR}/${tarName}\n`
  }

  fetchLatestGitTag() {
    return [
      `git describe --tags --abbrev=0 > echo > ${SHARED_DIR}/APP_SEM_VER.txt`,
      `echo Current Tag is && cat ${SHARED_DIR}/APP_SEM_VER.txt`
    ].join('\n')
  }

  exportTag() {
    if (this.e.payload.app_ver) {
      return `export APP_VER=${this.e.payload.app_ver}\n`
    } else {
      return `export APP_VER=$(cat ${SHARED_DIR}/APP_SEM_VER.txt)\n`
    }
  }

  bumpTag(VERSION_INDEX = 2) {
    return [
      `IFS='.' read -ra APP_VER_TOKENIZED <<<"$APP_VER"`,
      `APP_VER_TOKENIZED[${VERSION_INDEX}]=$(( APP_VER_TOKENIZED[${VERSION_INDEX}] + 1))`,
      'APP_VER=${APP_VER_TOKENIZED[0]}.${APP_VER_TOKENIZED[1]}.${APP_VER_TOKENIZED[2]}',
      `echo $APP_VER > ${SHARED_DIR}/APP_SEM_VER.txt`,
      `echo Bumped Tag is && cat ${SHARED_DIR}/APP_SEM_VER.txt`
    ].join("\n")
  }

  addAndPushExportedTag() {
    return [
      `git tag $APP_VER`,
      `git push --tags`,
    ].join("\n")
  }

  fetchTagBumpItAndPushIt() {
    return [
      this.fetchLatestGitTag(),
      this.exportTag(),
      this.bumpTag(),
      this.addAndPushExportedTag()
    ].join("\n")
  }
}

module.exports = BuildTask
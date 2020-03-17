/* The object of this class can take array of commands as input and return those as brigade compatible tasks or as executable shell script
*/
const fs = require('fs')
const shell = require('shelljs')

class Scriptor {
  constructor(commands, usingShell = 'bash') {
    this.usingShell = usingShell
    this.commands = commands
  }

  async tasks() {
    return this.commands.join("\n")
  }

  async script() {
    const shebang = `#!/bin/${this.usingShell}`
    const data = [shebang, await this.tasks()].join("\n")
    fs.writeFileSync('script.sh', data)
  }

  async execute() {
    await this.script();
    fs.chmodSync('./script.sh', '0755')
    shell.exec('./script.sh')
  }
}

module.exports = Scriptor
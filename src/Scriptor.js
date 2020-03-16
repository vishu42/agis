/* The object of this class can take array of commands as input and return those as brigade compatible tasks or as executable shell script
*/
const fs = require('fs')

class Scriptor {
  constructor(commands) {
    this.commands = commands
  }

  tasks() {
    return this.commands.join("\n")
  }

  script() {
    fs.writeFile('script.sh', this.tasks(), (err) => {
      // In case of a error throw err. 
      if (err) {
        throw err
      } else {
        console.log("Saved!")
      }
    })
  }
}

module.exports = Scriptor
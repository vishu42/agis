const { events } = require("brigadier");

class Events {
  static async onPush(fn) {
    events.on("simpleevent", async (e, p) => {
      const payload = JSON.parse(e.payload)
      if (payload.event === 'push') {
        await fn(e, p);
      }
    })
  }
  static async onDeploy(fn) {
    events.on("simpleevent", async (e, p) => {
      const payload = JSON.parse(e.payload)
      e.payload = payload
      if (payload.event === 'deploy') {
        await fn(e, p);
      }
    })
  }
}

module.exports = Events

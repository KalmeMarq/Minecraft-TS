import DRP from 'discord-rich-presence'

export default class DiscordPresence {
  private static client = DRP('754683261703290950')
  private static START_TIME = 0

  public static start(): void {
    DiscordPresence.START_TIME = Date.now()

    DiscordPresence.client.updatePresence({
      startTimestamp: DiscordPresence.START_TIME,
      largeImageKey: 'icon',
      largeImageText:	'AppName',
      instance: true
    })
  }
}
const { GoatWrapper } = require("fca-liane-utils");

module.exports = {
  config: {
    name: "help2",
    aliases: ["h2"],
    version: "1.0",
    author: "Custom Bot",
    usePrefix: false,
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Displays a list of commands or details for a specific command"
    },
    longDescription: {
      en: "Provides a list of all available commands or detailed information about a specific command"
    },
    category: "info",
    guide: {
      en: "help [command_name]"
    }
  },

  onStart: async function ({ api, event, args, message }) {
    const { threadID, messageID } = event;
    const { commands, aliases } = global.GoatBot;

    const totalCommands = commands.size;

    if (args.length === 0) {
      const categories = {};
      let responseMessage = "✨ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 𝐋𝐢𝐬𝐭 ✨\n\n";

      for (const [name, cmd] of commands) {
        if (!categories[cmd.config.category]) {
          categories[cmd.config.category] = [];
        }
        categories[cmd.config.category].push(name);
      }

      for (const [category, cmds] of Object.entries(categories)) {
        responseMessage += `\n𝙲𝙰𝚃𝙴𝙶𝙾𝚁𝚈: ${category.toUpperCase()}\n`;
        responseMessage += cmds.map((cmd) => `│ ${cmd}`).join("\n") + "\n";
        
      }

      responseMessage += `\n`;

      return api.sendMessage(responseMessage, threadID, messageID);
    }

    const commandName = args[0].toLowerCase();
    const command = commands.get(commandName) || commands.get(aliases.get(commandName));

    if (!command) {
      return api.sendMessage(`❌ Command "${commandName}" not found.`, threadID, messageID);
    }

    const config = command.config;
    const guide = config.guide?.en || "No usage guide available.";
    const description = config.longDescription?.en || "No description available.";
    const response = `✿──────────────────✿ \n\nㅤㅤ🔍 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 𝐃𝐞𝐭𝐚𝐢𝐥𝐬 🔎\n\n` +
      `🌟 | 𝐍𝐚𝐦𝐞: ${config.name}\n` +
      `🔀 | 𝐀𝐥𝐢𝐚𝐬𝐞𝐬: ${config.aliases ? config.aliases.join(", ") : "None"}\n` +
      `📜 | 𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧: ${description}\n` +
      `🛠️ 𝐔𝐬𝐚𝐠𝐞: ${guide}\n` +
      `🗂️ | 𝐕𝐞𝐫𝐬𝐢𝐨𝐧: ${config.version || "1.0"}\n` +
      `✍️ | 𝐀𝐮𝐭𝐡𝐨𝐫: ${config.author || "Unknown"}\n` +
      `⏳ | 𝐂𝐨𝐨𝐥𝐝𝐨𝐰𝐧: ${config.countDown || 0}s\n` +
      `🔑 | 𝐑𝐞𝐪𝐮𝐢𝐫𝐞𝐝 𝐑𝐨𝐥𝐞: ${config.role || 0}\n\n✿──────────────────✿`;

    return api.sendMessage(response, threadID, messageID);
  }
};

const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
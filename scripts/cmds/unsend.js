
module.exports = {
  config: {
    name: "uns",
    version: "1.2",
    author: "NTKhang",
    usePrefix: false, // Command works without a prefix
    countDown: 5,
    role: 0,
    description: {
      vi: "Gỡ tin nhắn của bot",
      en: "Unsend bot's message"
    },
    category: "box chat",
    guide: {
      vi: "Reply tin nhắn muốn gỡ của bot và gọi lệnh",
      en: "Reply to the bot's message you want to unsend"
    }
  },

  langs: {
    vi: {
      syntaxError: "Vui lòng reply tin nhắn muốn gỡ của bot"
    },
    en: {
      syntaxError: "Please reply to the bot's message you want to unsend"
    }
  },

  onStart: async function ({ message, event, api, getLang }) {
    if (!event.messageReply || event.messageReply.senderID != api.getCurrentUserID()) {
      return message.reply(getLang("syntaxError"));
    }
    message.unsend(event.messageReply.messageID);
  }
};

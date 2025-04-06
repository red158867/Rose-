const axios = require("axios");
const fs = require("fs");
const { shortenURL } = global.utils;

const baseApiUrl = "https://developer-rasin420.onrender.com/api/rasin/alldl?url=";

module.exports = {
  config: {
    name: "autodl",
    version: "1.0",
    author: "Rasin",
    countDown: 0,
    role: 0,
    description: {
      en: "Auto download video from Tiktok, Facebook, Instagram or others!",
    },
    category: "downloader",
    guide: {
      en: "video link",
    },
  },

  onStart: async function () {},

  onChat: async function ({ api, event }) {
    let rasin = event.body ? event.body.trim() : "";

    try {
      if (
        rasin.startsWith("https://vt.tiktok.com") ||
        rasin.startsWith("https://www.tiktok.com/") ||
        rasin.startsWith("https://www.facebook.com") ||
        rasin.startsWith("https://www.instagram.com/") ||
        rasin.startsWith("https://youtu.be/") ||
        rasin.startsWith("https://youtube.com/") ||
        rasin.startsWith("https://x.com/") ||
        rasin.startsWith("https://twitter.com/") ||
        rasin.startsWith("https://vm.tiktok.com") ||
        rasin.startsWith("https://fb.watch")
      ) {
        api.setMessageReaction("🌚", event.messageID, (err) => {}, true);

        const path = __dirname + "/cache/video.mp4";
        
        const videoStream = await axios({
          url: `${baseApiUrl}${encodeURIComponent(rasin)}`,
          method: "GET",
          responseType: "stream",
        });
        
        const writer = fs.createWriteStream(path);
        videoStream.data.pipe(writer);
        
        writer.on("finish", async () => {
          api.sendMessage(
            {
              body: "🌟 𝐇𝐞𝐫𝐞'𝐬 𝐲𝐨𝐮𝐫 𝐯𝐢𝐝𝐞𝐨",
              attachment: fs.createReadStream(path),
            },
            event.threadID,
            () => fs.unlinkSync(path),
            event.messageID
          );
        });
      }
    } catch (e) {
      api.setMessageReaction("❎", event.messageID, (err) => {}, true);
      api.sendMessage(`Error: ${e.message}`, event.threadID, event.messageID);
    }
  },
};

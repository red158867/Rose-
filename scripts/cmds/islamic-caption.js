const { GoatWrapper } = require("fca-liane-utils");
const axios = require("axios");
const fs = require("fs");

module.exports = {
  config: {
    name: "caption",
    version: "1.0",
    author: "Tasbiul Islam Rasin",
    description: {
      en: "Send a random Islamic caption with a background image.",
    },
    guide: {
      en: "Type: !caption",
    },
    category: "Islamic",
    usePrefix: true,
  },

  onStart: async function ({ message }) {
    const captions = [
      "•—»✨「ɪsʟᴀᴍɪᴄ ᴄᴀᴘᴛɪᴏɴ」✨«—•\n༆-✿༊\n\n᭄࿐-ইচ্ছে!!!গুলো!!!যদি!!!পবিত্র!!হয়!✿᭄\n\n✿᭄তাহলে!!!স্বপ্ন!!! গুলো..🖤🥀\n\n✿᭄ ࿐- একদিন!!!পূরণ!!!হবেই!!! ✿᭄\n\n✿᭄࿐ইনশাআল্লাহ..🖤🥀\n\nDᴇᴠᴇʟᴏᴘᴇʀ: Rᴀꜱɪɴ",
"•—»✨「ɪsʟᴀᴍɪᴄ ᴄᴀᴘᴛɪᴏɴ」✨«—•\n ༆-✿ ༊࿐ \n\n_____✵♡︎\n\n___কি  হবে  এত  মানুষের প্রিয় হয়ে__🦋🌻\n\n__যদি আল্লাহ   প্রিয় না হতে পারি__🙂🦋\n\n_____✵♡︎\n\nDᴇᴠᴇʟᴏᴘᴇʀ: Rᴀꜱɪɴ",
"•—»✨「ɪsʟᴀᴍɪᴄ ᴄᴀᴘᴛɪᴏɴ」  ✨«—•\n ༆-✿༊\n\n┏╮/╱╰️❥☆••\n╱/╰┛🍁࿐চিরস্থায়ী কি \n\n༄আপনার সুন্দর ব্যবহার!!🍁!!\n\n🍁যেটা মৃত্যুর পরও সবার সৃতিতে থাকবে🥰ཻღ\n\n\nDᴇᴠᴇʟᴏᴘᴇʀ: Rᴀꜱɪɴ",
"•—»✨「ɪsʟᴀᴍɪᴄ ᴄᴀᴘᴛɪᴏɴ」  ✨«—•\n  ༆-✿ ༊࿐\n\n🦋\n\n-মক্কা তুমি ধন্য.༏༏😽🕋࿐\n\n-তোমার বুকে হয়েছিলো বিশ্ব নবীর জন্ম.༏༏࿐💛🙆\n\n\nDᴇᴠᴇʟᴏᴘᴇʀ: Rᴀꜱɪɴ",
"•—»✨「ɪsʟᴀᴍɪᴄ ᴄᴀᴘᴛɪᴏɴ」  ✨«—•\n  ༆-✿ ༊࿐\n\n●══❥𝄞⋆⃝🥰 ভাগ্যর ༅༎༅ উপর ༅༎༅ কারো ༅༎༅ হাত নেই !!💚🌺🥀\n\n────😕\n🦋🌺-༅༎༅ সব ༅ ༎༅ কিছু ༅༎༅ পরিবর্তন ლ🌼\n༅༎༅ করার  মালিক  🌻😽💖\n\n🕊༎༅ একমাত্র ༅༎༅ আল্লাহ \n\n\nDᴇᴠᴇʟᴏᴘᴇʀ: Rᴀꜱɪɴ",
"•—»✨「ɪsʟᴀᴍɪᴄ ᴄᴀᴘᴛɪᴏɴ」  ✨«—•\n  ༆-✿ ༊࿐\n\n>🐰✨𝑻𝒉𝒊𝒔 𝒍𝒊𝒏𝒆 𝒊𝒔 𝒇𝒐𝒓 𝒚𝒐𝒖🖤🌸\nwish 🤗\n\nমৃত্যুর কয়েক সেকেন্ড আগে যেন প্রত্যেকটা\nমুসলমানের মুখে\nউচ্চারিত হয় !\nলা ইলাহা ইল্লাল্লাহু\n মুহাম্মাদুর রাসূলুল্লাহ ( সঃ )\n\nআমিন🤲🤲🥰\n\n\nDᴇᴠᴇʟᴏᴘᴇʀ: Rᴀꜱɪɴ",
"•—»✨「ɪsʟᴀᴍɪᴄ ᴄᴀᴘᴛɪᴏɴ」  ✨«—•\n  ༆-✿ ༊࿐\n\n\n ༅༎❥~🦋\n\n༅༎❥━-কালি ছাড়া যেমন কলম 🖊️\nমূল্যহীন🗑️\n\nতেমনি নামাজ ছাড়া মুসলিম মূল্যহীন!!❥༅༎\n\n🖤~🦋\n\nDᴇᴠᴇʟᴏᴘᴇʀ: Rᴀꜱɪɴ",
"•—»✨「ɪsʟᴀᴍɪᴄ ᴄᴀᴘᴛɪᴏɴ」  ✨«—•\n  ༆-✿ ༊࿐\n\n°\n\n🥀😒কেউ পছন্দ না করলে,,,,\nকি যায় আসে,,🙂\n\n😇আল্লাহ তো,,\n\nপছন্দ করেই বানিয়েছে,,♥️🥀\n\n🥰𝐀𝐥𝐡𝐚𝐦𝐝𝐮𝐥𝐢𝐥𝐥𝐚𝐡🕋°\n\nDᴇᴠᴇʟᴏᴘᴇʀ: Rᴀꜱɪɴ",

"•—»✨「ɪsʟᴀᴍɪᴄ ᴄᴀᴘᴛɪᴏɴ」  ✨«—•\n  ༆-✿༊࿐🦋࿐\n\nহীরার চেয়েও দামি\nহযরত মুহাম্মদ (সাঃ) এর মুখের বাণী🫰🖤\n\n🦋࿐\nসুবহানাল্লাহ-🖤🥀\n\n\nDᴇᴠᴇʟᴏᴘᴇʀ: Rᴀꜱɪɴ",
"•—»✨「ɪsʟᴀᴍɪᴄ ᴄᴀᴘᴛɪᴏɴ」  ✨«—•\n  ༆-✿ ༊࿐\n\n🥀\n- প্রতিশোধ নয়.!🙂💌\n- হ্মমা করাই ইসলামের আদর্শ.!❤️🥰\n\n- হযরত মোহাম্মদ (সাঃ)😍🤎\n\n\nDᴇᴠᴇʟᴏᴘᴇʀ: Rᴀꜱɪɴ"
    ];
    const imageUrls = [
      "https://i.postimg.cc/ZR0SLZyy/received-104854222681538.jpg",
"https://i.postimg.cc/CM3RdrW4/received-1077131053254543.jpg",
"https://i.postimg.cc/mhWWRHpQ/received-1202913210365646.jpg",
"https://i.postimg.cc/yxZCwPj1/received-179416495132916.jpg",
"https://i.postimg.cc/8kJFpgn5/received-201956602842877.jpg",
"https://i.postimg.cc/8c2N53cf/received-2183981171798286.jpg",
"https://i.postimg.cc/6QWwyCWc/received-259795433354586.jpg",
"https://i.postimg.cc/JzWRC9S9/received-317063074088232.jpg",
"https://i.postimg.cc/5tsJvjjV/received-583147497311518.jpg",
"https://i.postimg.cc/7ZMwHKkb/received-598373762409967.jpg",
"https://i.postimg.cc/wTD7NczY/received-649778976784401.jpg",
"https://i.postimg.cc/DZDKjDqp/received-659497149400143.jpg",
"https://i.postimg.cc/WpC2XD8p/received-659559285696847.jpg",
"https://i.postimg.cc/4NcXMJ26/received-819496329472643.jpg"
    ];

    const randomCaption = captions[Math.floor(Math.random() * captions.length)];
    const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];

    try {
      
      const response = await axios.get(randomImageUrl, { responseType: "stream" });

      
      message.reply({
        body: randomCaption,
        attachment: response.data,
      });
    } catch (error) {
      console.error("Failed to fetch the image:", error.message);
      message.reply("Something went wrong while fetching the image. Please try again later.");
    }
  },
};

const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
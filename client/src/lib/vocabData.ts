/**
 * Themed Vocabulary Data
 * Each theme has subcategories, each word has hanzi, pinyin, pos, definition.
 * wordKey = hanzi (used as unique identifier for ignore/add state).
 */

export type PartOfSpeech =
  | "noun" | "verb" | "adj" | "adv" | "measure" | "particle"
  | "conj" | "prep" | "pron" | "num" | "phrase" | "idiom" | "intj";

export interface VocabWord {
  hanzi: string;
  pinyin: string;
  pos: PartOfSpeech;
  definition: string;
  otherDefs?: string[];
}

export interface VocabSubcategory {
  id: string;
  label: string;
  words: VocabWord[];
}

export interface VocabTheme {
  id: string;
  label: string;
  emoji: string;
  subcategories: VocabSubcategory[];
}

// ─── Food ─────────────────────────────────────────────────────────────────────
const food: VocabTheme = {
  id: "food",
  label: "Food & Drink",
  emoji: "🍜",
  subcategories: [
    {
      id: "food-ingredients",
      label: "Ingredients",
      words: [
        { hanzi: "大米", pinyin: "dà mǐ", pos: "noun", definition: "rice (uncooked)" },
        { hanzi: "面粉", pinyin: "miàn fěn", pos: "noun", definition: "flour; wheat flour" },
        { hanzi: "鸡蛋", pinyin: "jī dàn", pos: "noun", definition: "chicken egg; egg" },
        { hanzi: "猪肉", pinyin: "zhū ròu", pos: "noun", definition: "pork" },
        { hanzi: "牛肉", pinyin: "niú ròu", pos: "noun", definition: "beef" },
        { hanzi: "鸡肉", pinyin: "jī ròu", pos: "noun", definition: "chicken (meat)" },
        { hanzi: "鱼", pinyin: "yú", pos: "noun", definition: "fish" },
        { hanzi: "虾", pinyin: "xiā", pos: "noun", definition: "shrimp; prawn" },
        { hanzi: "豆腐", pinyin: "dòu fu", pos: "noun", definition: "tofu; bean curd" },
        { hanzi: "白菜", pinyin: "bái cài", pos: "noun", definition: "Chinese cabbage; bok choy" },
        { hanzi: "土豆", pinyin: "tǔ dòu", pos: "noun", definition: "potato" },
        { hanzi: "西红柿", pinyin: "xī hóng shì", pos: "noun", definition: "tomato" },
        { hanzi: "黄瓜", pinyin: "huáng guā", pos: "noun", definition: "cucumber" },
        { hanzi: "洋葱", pinyin: "yáng cōng", pos: "noun", definition: "onion" },
        { hanzi: "大蒜", pinyin: "dà suàn", pos: "noun", definition: "garlic" },
        { hanzi: "姜", pinyin: "jiāng", pos: "noun", definition: "ginger" },
      ],
    },
    {
      id: "food-dishes",
      label: "Dishes",
      words: [
        { hanzi: "炒饭", pinyin: "chǎo fàn", pos: "noun", definition: "fried rice" },
        { hanzi: "饺子", pinyin: "jiǎo zi", pos: "noun", definition: "dumplings; jiaozi" },
        { hanzi: "包子", pinyin: "bāo zi", pos: "noun", definition: "steamed stuffed bun" },
        { hanzi: "面条", pinyin: "miàn tiáo", pos: "noun", definition: "noodles" },
        { hanzi: "火锅", pinyin: "huǒ guō", pos: "noun", definition: "hot pot" },
        { hanzi: "烤鸭", pinyin: "kǎo yā", pos: "noun", definition: "roast duck; Peking duck" },
        { hanzi: "红烧肉", pinyin: "hóng shāo ròu", pos: "noun", definition: "red-braised pork belly" },
        { hanzi: "麻婆豆腐", pinyin: "má pó dòu fu", pos: "noun", definition: "mapo tofu (spicy bean curd dish)" },
        { hanzi: "宫保鸡丁", pinyin: "gōng bǎo jī dīng", pos: "noun", definition: "kung pao chicken" },
        { hanzi: "糖醋排骨", pinyin: "táng cù pái gǔ", pos: "noun", definition: "sweet and sour spare ribs" },
        { hanzi: "粥", pinyin: "zhōu", pos: "noun", definition: "congee; rice porridge" },
        { hanzi: "汤", pinyin: "tāng", pos: "noun", definition: "soup; broth" },
        { hanzi: "炸鸡", pinyin: "zhá jī", pos: "noun", definition: "fried chicken" },
        { hanzi: "春卷", pinyin: "chūn juǎn", pos: "noun", definition: "spring roll" },
        { hanzi: "馒头", pinyin: "mán tou", pos: "noun", definition: "steamed bun (plain, no filling)" },
      ],
    },
    {
      id: "food-drinks",
      label: "Drinks",
      words: [
        { hanzi: "水", pinyin: "shuǐ", pos: "noun", definition: "water" },
        { hanzi: "果汁", pinyin: "guǒ zhī", pos: "noun", definition: "fruit juice" },
        { hanzi: "牛奶", pinyin: "niú nǎi", pos: "noun", definition: "milk" },
        { hanzi: "咖啡", pinyin: "kā fēi", pos: "noun", definition: "coffee" },
        { hanzi: "啤酒", pinyin: "pí jiǔ", pos: "noun", definition: "beer" },
        { hanzi: "白酒", pinyin: "bái jiǔ", pos: "noun", definition: "baijiu; Chinese white liquor" },
        { hanzi: "红酒", pinyin: "hóng jiǔ", pos: "noun", definition: "red wine" },
        { hanzi: "豆浆", pinyin: "dòu jiāng", pos: "noun", definition: "soy milk" },
        { hanzi: "可乐", pinyin: "kě lè", pos: "noun", definition: "cola; Coca-Cola" },
        { hanzi: "矿泉水", pinyin: "kuàng quán shuǐ", pos: "noun", definition: "mineral water; spring water" },
      ],
    },
    {
      id: "food-seasonings",
      label: "Seasonings",
      words: [
        { hanzi: "盐", pinyin: "yán", pos: "noun", definition: "salt" },
        { hanzi: "糖", pinyin: "táng", pos: "noun", definition: "sugar; candy" },
        { hanzi: "醋", pinyin: "cù", pos: "noun", definition: "vinegar" },
        { hanzi: "酱油", pinyin: "jiàng yóu", pos: "noun", definition: "soy sauce" },
        { hanzi: "辣椒", pinyin: "là jiāo", pos: "noun", definition: "chili pepper; hot pepper" },
        { hanzi: "花椒", pinyin: "huā jiāo", pos: "noun", definition: "Sichuan pepper; prickly ash" },
        { hanzi: "芝麻油", pinyin: "zhī ma yóu", pos: "noun", definition: "sesame oil" },
        { hanzi: "豆瓣酱", pinyin: "dòu bàn jiàng", pos: "noun", definition: "doubanjiang; spicy bean paste" },
        { hanzi: "蚝油", pinyin: "háo yóu", pos: "noun", definition: "oyster sauce" },
        { hanzi: "味精", pinyin: "wèi jīng", pos: "noun", definition: "MSG; monosodium glutamate" },
      ],
    },
  ],
};

// ─── Travel ───────────────────────────────────────────────────────────────────
const travel: VocabTheme = {
  id: "travel",
  label: "Travel",
  emoji: "✈️",
  subcategories: [
    {
      id: "travel-transport",
      label: "Transport",
      words: [
        { hanzi: "飞机", pinyin: "fēi jī", pos: "noun", definition: "airplane; aircraft" },
        { hanzi: "火车", pinyin: "huǒ chē", pos: "noun", definition: "train" },
        { hanzi: "高铁", pinyin: "gāo tiě", pos: "noun", definition: "high-speed rail; bullet train" },
        { hanzi: "地铁", pinyin: "dì tiě", pos: "noun", definition: "subway; metro" },
        { hanzi: "公共汽车", pinyin: "gōng gòng qì chē", pos: "noun", definition: "public bus" },
        { hanzi: "出租车", pinyin: "chū zū chē", pos: "noun", definition: "taxi; cab" },
        { hanzi: "轮船", pinyin: "lún chuán", pos: "noun", definition: "steamship; ferry" },
        { hanzi: "自行车", pinyin: "zì xíng chē", pos: "noun", definition: "bicycle" },
        { hanzi: "摩托车", pinyin: "mó tuō chē", pos: "noun", definition: "motorcycle" },
        { hanzi: "汽车", pinyin: "qì chē", pos: "noun", definition: "car; automobile" },
      ],
    },
    {
      id: "travel-places",
      label: "Places",
      words: [
        { hanzi: "机场", pinyin: "jī chǎng", pos: "noun", definition: "airport" },
        { hanzi: "火车站", pinyin: "huǒ chē zhàn", pos: "noun", definition: "train station; railway station" },
        { hanzi: "地图", pinyin: "dì tú", pos: "noun", definition: "map" },
        { hanzi: "景点", pinyin: "jǐng diǎn", pos: "noun", definition: "tourist attraction; scenic spot" },
        { hanzi: "博物馆", pinyin: "bó wù guǎn", pos: "noun", definition: "museum" },
        { hanzi: "公园", pinyin: "gōng yuán", pos: "noun", definition: "park; public garden" },
        { hanzi: "海滩", pinyin: "hǎi tān", pos: "noun", definition: "beach; seashore" },
        { hanzi: "山", pinyin: "shān", pos: "noun", definition: "mountain; hill" },
        { hanzi: "寺庙", pinyin: "sì miào", pos: "noun", definition: "temple; Buddhist temple" },
        { hanzi: "广场", pinyin: "guǎng chǎng", pos: "noun", definition: "plaza; public square" },
      ],
    },
    {
      id: "travel-docs",
      label: "Documents & Customs",
      words: [
        { hanzi: "护照", pinyin: "hù zhào", pos: "noun", definition: "passport" },
        { hanzi: "签证", pinyin: "qiān zhèng", pos: "noun", definition: "visa" },
        { hanzi: "行李", pinyin: "xíng li", pos: "noun", definition: "luggage; baggage" },
        { hanzi: "海关", pinyin: "hǎi guān", pos: "noun", definition: "customs; customs office" },
        { hanzi: "入境", pinyin: "rù jìng", pos: "verb", definition: "to enter a country; immigration" },
        { hanzi: "出境", pinyin: "chū jìng", pos: "verb", definition: "to exit a country; emigration" },
        { hanzi: "登机牌", pinyin: "dēng jī pái", pos: "noun", definition: "boarding pass" },
        { hanzi: "订票", pinyin: "dìng piào", pos: "verb", definition: "to book a ticket; to reserve a ticket" },
        { hanzi: "退票", pinyin: "tuì piào", pos: "verb", definition: "to refund a ticket; to cancel a ticket" },
        { hanzi: "换乘", pinyin: "huàn chéng", pos: "verb", definition: "to transfer (transport); to change trains/buses" },
      ],
    },
    {
      id: "travel-phrases",
      label: "Useful Phrases",
      words: [
        { hanzi: "怎么走", pinyin: "zěn me zǒu", pos: "phrase", definition: "how do I get to…; which way is…" },
        { hanzi: "在哪里", pinyin: "zài nǎ lǐ", pos: "phrase", definition: "where is…; where is it located" },
        { hanzi: "多少钱", pinyin: "duō shao qián", pos: "phrase", definition: "how much does it cost; what is the price" },
        { hanzi: "打折", pinyin: "dǎ zhé", pos: "verb", definition: "to give a discount; to be on sale" },
        { hanzi: "迷路", pinyin: "mí lù", pos: "verb", definition: "to get lost; to lose one's way" },
        { hanzi: "问路", pinyin: "wèn lù", pos: "verb", definition: "to ask for directions" },
        { hanzi: "附近", pinyin: "fù jìn", pos: "noun", definition: "nearby; in the vicinity; close by" },
        { hanzi: "直走", pinyin: "zhí zǒu", pos: "phrase", definition: "go straight; walk straight ahead" },
        { hanzi: "左转", pinyin: "zuǒ zhuǎn", pos: "phrase", definition: "turn left" },
        { hanzi: "右转", pinyin: "yòu zhuǎn", pos: "phrase", definition: "turn right" },
      ],
    },
  ],
};

// ─── Hotel ────────────────────────────────────────────────────────────────────
const hotel: VocabTheme = {
  id: "hotel",
  label: "Hotel & Accommodation",
  emoji: "🏨",
  subcategories: [
    {
      id: "hotel-rooms",
      label: "Rooms & Facilities",
      words: [
        { hanzi: "酒店", pinyin: "jiǔ diàn", pos: "noun", definition: "hotel" },
        { hanzi: "宾馆", pinyin: "bīn guǎn", pos: "noun", definition: "guesthouse; hotel" },
        { hanzi: "民宿", pinyin: "mín sù", pos: "noun", definition: "homestay; B&B; Airbnb-style accommodation" },
        { hanzi: "单人间", pinyin: "dān rén jiān", pos: "noun", definition: "single room" },
        { hanzi: "双人间", pinyin: "shuāng rén jiān", pos: "noun", definition: "double room; twin room" },
        { hanzi: "套房", pinyin: "tào fáng", pos: "noun", definition: "suite; apartment suite" },
        { hanzi: "前台", pinyin: "qián tái", pos: "noun", definition: "front desk; reception" },
        { hanzi: "大堂", pinyin: "dà táng", pos: "noun", definition: "lobby; main hall" },
        { hanzi: "电梯", pinyin: "diàn tī", pos: "noun", definition: "elevator; lift" },
        { hanzi: "游泳池", pinyin: "yóu yǒng chí", pos: "noun", definition: "swimming pool" },
        { hanzi: "健身房", pinyin: "jiàn shēn fáng", pos: "noun", definition: "gym; fitness room" },
        { hanzi: "餐厅", pinyin: "cān tīng", pos: "noun", definition: "restaurant; dining room" },
      ],
    },
    {
      id: "hotel-checkin",
      label: "Check-in & Check-out",
      words: [
        { hanzi: "入住", pinyin: "rù zhù", pos: "verb", definition: "to check in; to move into (a hotel)" },
        { hanzi: "退房", pinyin: "tuì fáng", pos: "verb", definition: "to check out (of a hotel)" },
        { hanzi: "预订", pinyin: "yù dìng", pos: "verb", definition: "to reserve; to book in advance" },
        { hanzi: "房间号", pinyin: "fáng jiān hào", pos: "noun", definition: "room number" },
        { hanzi: "钥匙", pinyin: "yào shi", pos: "noun", definition: "key; room key" },
        { hanzi: "押金", pinyin: "yā jīn", pos: "noun", definition: "deposit; security deposit" },
        { hanzi: "发票", pinyin: "fā piào", pos: "noun", definition: "receipt; invoice; fapiao" },
        { hanzi: "叫醒服务", pinyin: "jiào xǐng fú wù", pos: "noun", definition: "wake-up call service" },
        { hanzi: "续住", pinyin: "xù zhù", pos: "verb", definition: "to extend one's stay" },
        { hanzi: "满房", pinyin: "mǎn fáng", pos: "adj", definition: "fully booked; no vacancy" },
      ],
    },
    {
      id: "hotel-amenities",
      label: "Amenities",
      words: [
        { hanzi: "毛巾", pinyin: "máo jīn", pos: "noun", definition: "towel" },
        { hanzi: "浴室", pinyin: "yù shì", pos: "noun", definition: "bathroom; shower room" },
        { hanzi: "空调", pinyin: "kōng tiáo", pos: "noun", definition: "air conditioning; AC" },
        { hanzi: "暖气", pinyin: "nuǎn qì", pos: "noun", definition: "heating; central heating" },
        { hanzi: "无线网络", pinyin: "wú xiàn wǎng luò", pos: "noun", definition: "Wi-Fi; wireless internet" },
        { hanzi: "早餐", pinyin: "zǎo cān", pos: "noun", definition: "breakfast" },
        { hanzi: "客房服务", pinyin: "kè fáng fú wù", pos: "noun", definition: "room service" },
        { hanzi: "洗衣服务", pinyin: "xǐ yī fú wù", pos: "noun", definition: "laundry service" },
        { hanzi: "停车场", pinyin: "tíng chē chǎng", pos: "noun", definition: "parking lot; car park" },
        { hanzi: "行李寄存", pinyin: "xíng li jì cún", pos: "noun", definition: "luggage storage; left-luggage" },
      ],
    },
  ],
};

// ─── Hobbies ──────────────────────────────────────────────────────────────────
const hobbies: VocabTheme = {
  id: "hobbies",
  label: "Hobbies & Leisure",
  emoji: "🎨",
  subcategories: [
    {
      id: "hobbies-arts",
      label: "Arts & Crafts",
      words: [
        { hanzi: "画画", pinyin: "huà huà", pos: "verb", definition: "to draw; to paint" },
        { hanzi: "书法", pinyin: "shū fǎ", pos: "noun", definition: "calligraphy; Chinese calligraphy" },
        { hanzi: "摄影", pinyin: "shè yǐng", pos: "noun", definition: "photography" },
        { hanzi: "雕刻", pinyin: "diāo kè", pos: "noun", definition: "carving; engraving; sculpture" },
        { hanzi: "剪纸", pinyin: "jiǎn zhǐ", pos: "noun", definition: "paper cutting; Chinese paper-cut art" },
        { hanzi: "刺绣", pinyin: "cì xiù", pos: "noun", definition: "embroidery" },
        { hanzi: "陶瓷", pinyin: "táo cí", pos: "noun", definition: "ceramics; pottery" },
        { hanzi: "素描", pinyin: "sù miáo", pos: "noun", definition: "sketch; pencil drawing" },
        { hanzi: "水彩画", pinyin: "shuǐ cǎi huà", pos: "noun", definition: "watercolour painting" },
        { hanzi: "油画", pinyin: "yóu huà", pos: "noun", definition: "oil painting" },
      ],
    },
    {
      id: "hobbies-music",
      label: "Music",
      words: [
        { hanzi: "唱歌", pinyin: "chàng gē", pos: "verb", definition: "to sing; to sing a song" },
        { hanzi: "弹钢琴", pinyin: "tán gāng qín", pos: "phrase", definition: "to play the piano" },
        { hanzi: "拉小提琴", pinyin: "lā xiǎo tí qín", pos: "phrase", definition: "to play the violin" },
        { hanzi: "吹笛子", pinyin: "chuī dí zi", pos: "phrase", definition: "to play the flute (dizi)" },
        { hanzi: "弹吉他", pinyin: "tán jí tā", pos: "phrase", definition: "to play the guitar" },
        { hanzi: "二胡", pinyin: "èr hú", pos: "noun", definition: "erhu; two-stringed Chinese fiddle" },
        { hanzi: "古筝", pinyin: "gǔ zhēng", pos: "noun", definition: "guzheng; Chinese zither" },
        { hanzi: "琵琶", pinyin: "pí pa", pos: "noun", definition: "pipa; Chinese lute" },
        { hanzi: "合唱", pinyin: "hé chàng", pos: "noun", definition: "chorus; choir singing" },
        { hanzi: "作曲", pinyin: "zuò qǔ", pos: "verb", definition: "to compose music; to write a song" },
      ],
    },
    {
      id: "hobbies-sports",
      label: "Sports & Outdoor",
      words: [
        { hanzi: "打篮球", pinyin: "dǎ lán qiú", pos: "phrase", definition: "to play basketball" },
        { hanzi: "踢足球", pinyin: "tī zú qiú", pos: "phrase", definition: "to play football/soccer" },
        { hanzi: "游泳", pinyin: "yóu yǒng", pos: "verb", definition: "to swim; swimming" },
        { hanzi: "跑步", pinyin: "pǎo bù", pos: "verb", definition: "to run; jogging" },
        { hanzi: "爬山", pinyin: "pá shān", pos: "verb", definition: "to climb a mountain; hiking" },
        { hanzi: "骑自行车", pinyin: "qí zì xíng chē", pos: "phrase", definition: "to ride a bicycle; cycling" },
        { hanzi: "打太极拳", pinyin: "dǎ tài jí quán", pos: "phrase", definition: "to practise tai chi" },
        { hanzi: "钓鱼", pinyin: "diào yú", pos: "verb", definition: "to fish; fishing" },
        { hanzi: "羽毛球", pinyin: "yǔ máo qiú", pos: "noun", definition: "badminton; shuttlecock" },
        { hanzi: "乒乓球", pinyin: "pīng pāng qiú", pos: "noun", definition: "table tennis; ping-pong" },
      ],
    },
    {
      id: "hobbies-reading",
      label: "Reading & Games",
      words: [
        { hanzi: "读书", pinyin: "dú shū", pos: "verb", definition: "to read; to study" },
        { hanzi: "下棋", pinyin: "xià qí", pos: "verb", definition: "to play chess; to play board games" },
        { hanzi: "围棋", pinyin: "wéi qí", pos: "noun", definition: "Go (board game)" },
        { hanzi: "象棋", pinyin: "xiàng qí", pos: "noun", definition: "Chinese chess; xiangqi" },
        { hanzi: "打牌", pinyin: "dǎ pái", pos: "verb", definition: "to play cards; to play mahjong" },
        { hanzi: "麻将", pinyin: "má jiàng", pos: "noun", definition: "mahjong" },
        { hanzi: "电子游戏", pinyin: "diàn zǐ yóu xì", pos: "noun", definition: "video game; electronic game" },
        { hanzi: "看电影", pinyin: "kàn diàn yǐng", pos: "phrase", definition: "to watch a movie; to go to the cinema" },
        { hanzi: "集邮", pinyin: "jí yóu", pos: "verb", definition: "to collect stamps; philately" },
        { hanzi: "旅游", pinyin: "lǚ yóu", pos: "verb", definition: "to travel; to go on a trip; tourism" },
      ],
    },
  ],
};

// ─── Tea ──────────────────────────────────────────────────────────────────────
const tea: VocabTheme = {
  id: "tea",
  label: "Tea Culture",
  emoji: "🍵",
  subcategories: [
    {
      id: "tea-types",
      label: "Types of Tea",
      words: [
        { hanzi: "绿茶", pinyin: "lǜ chá", pos: "noun", definition: "green tea" },
        { hanzi: "红茶", pinyin: "hóng chá", pos: "noun", definition: "black tea (red tea in Chinese)" },
        { hanzi: "乌龙茶", pinyin: "wū lóng chá", pos: "noun", definition: "oolong tea" },
        { hanzi: "白茶", pinyin: "bái chá", pos: "noun", definition: "white tea" },
        { hanzi: "普洱茶", pinyin: "pǔ ěr chá", pos: "noun", definition: "pu-erh tea; aged fermented tea" },
        { hanzi: "花茶", pinyin: "huā chá", pos: "noun", definition: "flower tea; scented tea; jasmine tea" },
        { hanzi: "黄茶", pinyin: "huáng chá", pos: "noun", definition: "yellow tea" },
        { hanzi: "龙井茶", pinyin: "lóng jǐng chá", pos: "noun", definition: "Longjing tea; Dragon Well tea" },
        { hanzi: "铁观音", pinyin: "tiě guān yīn", pos: "noun", definition: "Tieguanyin; Iron Goddess of Mercy oolong" },
        { hanzi: "碧螺春", pinyin: "bì luó chūn", pos: "noun", definition: "Biluochun; green tea from Jiangsu" },
      ],
    },
    {
      id: "tea-ceremony",
      label: "Tea Ceremony",
      words: [
        { hanzi: "茶道", pinyin: "chá dào", pos: "noun", definition: "tea ceremony; the way of tea" },
        { hanzi: "茶具", pinyin: "chá jù", pos: "noun", definition: "tea set; tea utensils" },
        { hanzi: "茶壶", pinyin: "chá hú", pos: "noun", definition: "teapot" },
        { hanzi: "茶杯", pinyin: "chá bēi", pos: "noun", definition: "teacup" },
        { hanzi: "茶叶", pinyin: "chá yè", pos: "noun", definition: "tea leaves" },
        { hanzi: "泡茶", pinyin: "pào chá", pos: "verb", definition: "to brew tea; to steep tea" },
        { hanzi: "倒茶", pinyin: "dào chá", pos: "verb", definition: "to pour tea" },
        { hanzi: "茶馆", pinyin: "chá guǎn", pos: "noun", definition: "teahouse; tea shop" },
        { hanzi: "功夫茶", pinyin: "gōng fu chá", pos: "noun", definition: "gongfu tea; Chinese tea ceremony style" },
        { hanzi: "回甘", pinyin: "huí gān", pos: "noun", definition: "sweet aftertaste (of tea); lingering sweetness" },
        { hanzi: "香气", pinyin: "xiāng qì", pos: "noun", definition: "aroma; fragrance; scent" },
        { hanzi: "茶汤", pinyin: "chá tāng", pos: "noun", definition: "tea liquor; brewed tea liquid" },
      ],
    },
  ],
};

// ─── Cooking ──────────────────────────────────────────────────────────────────
const cooking: VocabTheme = {
  id: "cooking",
  label: "Cooking",
  emoji: "🍳",
  subcategories: [
    {
      id: "cooking-methods",
      label: "Cooking Methods",
      words: [
        { hanzi: "炒", pinyin: "chǎo", pos: "verb", definition: "to stir-fry; to sauté" },
        { hanzi: "炸", pinyin: "zhá", pos: "verb", definition: "to deep-fry" },
        { hanzi: "蒸", pinyin: "zhēng", pos: "verb", definition: "to steam" },
        { hanzi: "煮", pinyin: "zhǔ", pos: "verb", definition: "to boil; to cook in water" },
        { hanzi: "烤", pinyin: "kǎo", pos: "verb", definition: "to roast; to bake; to grill" },
        { hanzi: "炖", pinyin: "dùn", pos: "verb", definition: "to braise; to stew slowly" },
        { hanzi: "红烧", pinyin: "hóng shāo", pos: "verb", definition: "to braise in soy sauce; red-cooked" },
        { hanzi: "凉拌", pinyin: "liáng bàn", pos: "verb", definition: "to toss cold; to make a cold dish" },
        { hanzi: "腌制", pinyin: "yān zhì", pos: "verb", definition: "to marinate; to pickle; to cure" },
        { hanzi: "熏", pinyin: "xūn", pos: "verb", definition: "to smoke (food)" },
      ],
    },
    {
      id: "cooking-tools",
      label: "Kitchen Tools",
      words: [
        { hanzi: "锅", pinyin: "guō", pos: "noun", definition: "wok; pot; pan" },
        { hanzi: "炒锅", pinyin: "chǎo guō", pos: "noun", definition: "wok; stir-fry pan" },
        { hanzi: "菜刀", pinyin: "cài dāo", pos: "noun", definition: "Chinese cleaver; vegetable knife" },
        { hanzi: "砧板", pinyin: "zhēn bǎn", pos: "noun", definition: "chopping board; cutting board" },
        { hanzi: "筷子", pinyin: "kuài zi", pos: "noun", definition: "chopsticks" },
        { hanzi: "勺子", pinyin: "sháo zi", pos: "noun", definition: "spoon; ladle" },
        { hanzi: "锅铲", pinyin: "guō chǎn", pos: "noun", definition: "wok spatula; cooking spatula" },
        { hanzi: "蒸锅", pinyin: "zhēng guō", pos: "noun", definition: "steamer; steaming pot" },
        { hanzi: "电饭锅", pinyin: "diàn fàn guō", pos: "noun", definition: "rice cooker; electric rice cooker" },
        { hanzi: "烤箱", pinyin: "kǎo xiāng", pos: "noun", definition: "oven; baking oven" },
        { hanzi: "微波炉", pinyin: "wēi bō lú", pos: "noun", definition: "microwave oven" },
        { hanzi: "碗", pinyin: "wǎn", pos: "noun", definition: "bowl" },
        { hanzi: "盘子", pinyin: "pán zi", pos: "noun", definition: "plate; dish" },
        { hanzi: "杯子", pinyin: "bēi zi", pos: "noun", definition: "cup; glass; mug" },
      ],
    },
    {
      id: "cooking-actions",
      label: "Cooking Actions",
      words: [
        { hanzi: "切", pinyin: "qiē", pos: "verb", definition: "to cut; to slice; to chop" },
        { hanzi: "剁", pinyin: "duò", pos: "verb", definition: "to chop (with a cleaver); to mince" },
        { hanzi: "搅拌", pinyin: "jiǎo bàn", pos: "verb", definition: "to stir; to mix; to blend" },
        { hanzi: "加热", pinyin: "jiā rè", pos: "verb", definition: "to heat up; to warm" },
        { hanzi: "调味", pinyin: "tiáo wèi", pos: "verb", definition: "to season; to add flavouring" },
        { hanzi: "放盐", pinyin: "fàng yán", pos: "phrase", definition: "to add salt" },
        { hanzi: "起锅", pinyin: "qǐ guō", pos: "verb", definition: "to remove from the wok; to finish cooking" },
        { hanzi: "出锅", pinyin: "chū guō", pos: "verb", definition: "to take out of the pot; dish is ready" },
        { hanzi: "翻炒", pinyin: "fān chǎo", pos: "verb", definition: "to toss and stir-fry; to stir continuously" },
        { hanzi: "焯水", pinyin: "chāo shuǐ", pos: "verb", definition: "to blanch (vegetables or meat in boiling water)" },
      ],
    },
  ],
};

// ─── Education ────────────────────────────────────────────────────────────────
const education: VocabTheme = {
  id: "education",
  label: "Education",
  emoji: "📚",
  subcategories: [
    {
      id: "education-school",
      label: "School & University",
      words: [
        { hanzi: "学校", pinyin: "xué xiào", pos: "noun", definition: "school" },
        { hanzi: "大学", pinyin: "dà xué", pos: "noun", definition: "university; college" },
        { hanzi: "中学", pinyin: "zhōng xué", pos: "noun", definition: "middle school; secondary school" },
        { hanzi: "小学", pinyin: "xiǎo xué", pos: "noun", definition: "primary school; elementary school" },
        { hanzi: "幼儿园", pinyin: "yòu ér yuán", pos: "noun", definition: "kindergarten; preschool" },
        { hanzi: "教室", pinyin: "jiào shì", pos: "noun", definition: "classroom" },
        { hanzi: "图书馆", pinyin: "tú shū guǎn", pos: "noun", definition: "library" },
        { hanzi: "操场", pinyin: "cāo chǎng", pos: "noun", definition: "playground; sports ground" },
        { hanzi: "宿舍", pinyin: "sù shè", pos: "noun", definition: "dormitory; student residence" },
        { hanzi: "食堂", pinyin: "shí táng", pos: "noun", definition: "canteen; school cafeteria" },
      ],
    },
    {
      id: "education-people",
      label: "People & Roles",
      words: [
        { hanzi: "老师", pinyin: "lǎo shī", pos: "noun", definition: "teacher; instructor" },
        { hanzi: "学生", pinyin: "xué shēng", pos: "noun", definition: "student; pupil" },
        { hanzi: "同学", pinyin: "tóng xué", pos: "noun", definition: "classmate; fellow student" },
        { hanzi: "校长", pinyin: "xiào zhǎng", pos: "noun", definition: "principal; headmaster; university president" },
        { hanzi: "教授", pinyin: "jiào shòu", pos: "noun", definition: "professor" },
        { hanzi: "班主任", pinyin: "bān zhǔ rèn", pos: "noun", definition: "homeroom teacher; form teacher" },
        { hanzi: "留学生", pinyin: "liú xué shēng", pos: "noun", definition: "international student; student studying abroad" },
        { hanzi: "研究生", pinyin: "yán jiū shēng", pos: "noun", definition: "graduate student; postgraduate" },
        { hanzi: "本科生", pinyin: "běn kē shēng", pos: "noun", definition: "undergraduate student" },
        { hanzi: "博士", pinyin: "bó shì", pos: "noun", definition: "PhD; doctor (academic)" },
      ],
    },
    {
      id: "education-subjects",
      label: "Subjects & Study",
      words: [
        { hanzi: "数学", pinyin: "shù xué", pos: "noun", definition: "mathematics; maths" },
        { hanzi: "语文", pinyin: "yǔ wén", pos: "noun", definition: "Chinese language and literature (school subject)" },
        { hanzi: "英语", pinyin: "yīng yǔ", pos: "noun", definition: "English (language)" },
        { hanzi: "历史", pinyin: "lì shǐ", pos: "noun", definition: "history" },
        { hanzi: "地理", pinyin: "dì lǐ", pos: "noun", definition: "geography" },
        { hanzi: "物理", pinyin: "wù lǐ", pos: "noun", definition: "physics" },
        { hanzi: "化学", pinyin: "huà xué", pos: "noun", definition: "chemistry" },
        { hanzi: "生物", pinyin: "shēng wù", pos: "noun", definition: "biology" },
        { hanzi: "作业", pinyin: "zuò yè", pos: "noun", definition: "homework; assignment" },
        { hanzi: "考试", pinyin: "kǎo shì", pos: "noun", definition: "exam; test; examination" },
        { hanzi: "成绩", pinyin: "chéng jì", pos: "noun", definition: "grade; academic result; score" },
        { hanzi: "毕业", pinyin: "bì yè", pos: "verb", definition: "to graduate; to finish school" },
      ],
    },
  ],
};

// ─── Shopping ─────────────────────────────────────────────────────────────────
const shopping: VocabTheme = {
  id: "shopping",
  label: "Shopping",
  emoji: "🛍️",
  subcategories: [
    {
      id: "shopping-places",
      label: "Places",
      words: [
        { hanzi: "商场", pinyin: "shāng chǎng", pos: "noun", definition: "shopping mall; department store" },
        { hanzi: "超市", pinyin: "chāo shì", pos: "noun", definition: "supermarket" },
        { hanzi: "便利店", pinyin: "biàn lì diàn", pos: "noun", definition: "convenience store" },
        { hanzi: "菜市场", pinyin: "cài shì chǎng", pos: "noun", definition: "wet market; fresh food market" },
        { hanzi: "网店", pinyin: "wǎng diàn", pos: "noun", definition: "online shop; e-commerce store" },
        { hanzi: "书店", pinyin: "shū diàn", pos: "noun", definition: "bookshop; bookstore" },
        { hanzi: "药店", pinyin: "yào diàn", pos: "noun", definition: "pharmacy; drugstore" },
        { hanzi: "花店", pinyin: "huā diàn", pos: "noun", definition: "flower shop; florist" },
      ],
    },
    {
      id: "shopping-actions",
      label: "Shopping Actions",
      words: [
        { hanzi: "买", pinyin: "mǎi", pos: "verb", definition: "to buy; to purchase" },
        { hanzi: "卖", pinyin: "mài", pos: "verb", definition: "to sell" },
        { hanzi: "讨价还价", pinyin: "tǎo jià huán jià", pos: "phrase", definition: "to bargain; to haggle over price" },
        { hanzi: "付款", pinyin: "fù kuǎn", pos: "verb", definition: "to pay; to make a payment" },
        { hanzi: "退货", pinyin: "tuì huò", pos: "verb", definition: "to return goods; to get a refund" },
        { hanzi: "换货", pinyin: "huàn huò", pos: "verb", definition: "to exchange goods; to swap items" },
        { hanzi: "试穿", pinyin: "shì chuān", pos: "verb", definition: "to try on (clothes)" },
        { hanzi: "扫码", pinyin: "sǎo mǎ", pos: "verb", definition: "to scan a QR code" },
        { hanzi: "网购", pinyin: "wǎng gòu", pos: "verb", definition: "to shop online; online shopping" },
        { hanzi: "砍价", pinyin: "kǎn jià", pos: "verb", definition: "to bargain down the price; to negotiate a lower price" },
      ],
    },
    {
      id: "shopping-items",
      label: "Common Items",
      words: [
        { hanzi: "衣服", pinyin: "yī fu", pos: "noun", definition: "clothes; clothing" },
        { hanzi: "鞋子", pinyin: "xié zi", pos: "noun", definition: "shoes" },
        { hanzi: "包", pinyin: "bāo", pos: "noun", definition: "bag; handbag; backpack" },
        { hanzi: "手机", pinyin: "shǒu jī", pos: "noun", definition: "mobile phone; smartphone" },
        { hanzi: "电脑", pinyin: "diàn nǎo", pos: "noun", definition: "computer; laptop" },
        { hanzi: "化妆品", pinyin: "huà zhuāng pǐn", pos: "noun", definition: "cosmetics; makeup products" },
        { hanzi: "礼物", pinyin: "lǐ wù", pos: "noun", definition: "gift; present" },
        { hanzi: "玩具", pinyin: "wán jù", pos: "noun", definition: "toy" },
        { hanzi: "家电", pinyin: "jiā diàn", pos: "noun", definition: "home appliances; household electronics" },
        { hanzi: "零食", pinyin: "líng shí", pos: "noun", definition: "snacks; nibbles" },
        { hanzi: "收据", pinyin: "shōu jù", pos: "noun", definition: "receipt" },
        { hanzi: "优惠券", pinyin: "yōu huì quàn", pos: "noun", definition: "coupon; discount voucher" },
      ],
    },
  ],
};

// ─── Day-to-Day ───────────────────────────────────────────────────────────────
const dayToDay: VocabTheme = {
  id: "day-to-day",
  label: "Day-to-Day Life",
  emoji: "🏠",
  subcategories: [
    {
      id: "daily-home",
      label: "Home & Chores",
      words: [
        { hanzi: "打扫", pinyin: "dǎ sǎo", pos: "verb", definition: "to clean; to sweep; to tidy up" },
        { hanzi: "洗碗", pinyin: "xǐ wǎn", pos: "verb", definition: "to wash dishes" },
        { hanzi: "洗衣服", pinyin: "xǐ yī fu", pos: "phrase", definition: "to do laundry; to wash clothes" },
        { hanzi: "做饭", pinyin: "zuò fàn", pos: "verb", definition: "to cook; to prepare a meal" },
        { hanzi: "倒垃圾", pinyin: "dào lā jī", pos: "phrase", definition: "to take out the trash; to empty the rubbish" },
        { hanzi: "浇花", pinyin: "jiāo huā", pos: "verb", definition: "to water plants/flowers" },
        { hanzi: "整理", pinyin: "zhěng lǐ", pos: "verb", definition: "to tidy up; to organise; to sort out" },
        { hanzi: "搬家", pinyin: "bān jiā", pos: "verb", definition: "to move house; to relocate" },
        { hanzi: "修理", pinyin: "xiū lǐ", pos: "verb", definition: "to repair; to fix" },
        { hanzi: "装修", pinyin: "zhuāng xiū", pos: "verb", definition: "to renovate; to decorate (a home)" },
      ],
    },
    {
      id: "daily-routine",
      label: "Daily Routine",
      words: [
        { hanzi: "起床", pinyin: "qǐ chuáng", pos: "verb", definition: "to get up; to get out of bed" },
        { hanzi: "刷牙", pinyin: "shuā yá", pos: "verb", definition: "to brush teeth" },
        { hanzi: "洗澡", pinyin: "xǐ zǎo", pos: "verb", definition: "to shower; to take a bath" },
        { hanzi: "吃早饭", pinyin: "chī zǎo fàn", pos: "phrase", definition: "to eat breakfast" },
        { hanzi: "上班", pinyin: "shàng bān", pos: "verb", definition: "to go to work; to start work" },
        { hanzi: "下班", pinyin: "xià bān", pos: "verb", definition: "to finish work; to get off work" },
        { hanzi: "睡觉", pinyin: "shuì jiào", pos: "verb", definition: "to sleep; to go to bed" },
        { hanzi: "散步", pinyin: "sàn bù", pos: "verb", definition: "to take a walk; to stroll" },
        { hanzi: "锻炼", pinyin: "duàn liàn", pos: "verb", definition: "to exercise; to work out" },
        { hanzi: "休息", pinyin: "xiū xi", pos: "verb", definition: "to rest; to take a break" },
      ],
    },
    {
      id: "daily-money",
      label: "Money & Banking",
      words: [
        { hanzi: "银行", pinyin: "yín háng", pos: "noun", definition: "bank" },
        { hanzi: "存钱", pinyin: "cún qián", pos: "verb", definition: "to deposit money; to save money" },
        { hanzi: "取钱", pinyin: "qǔ qián", pos: "verb", definition: "to withdraw money" },
        { hanzi: "转账", pinyin: "zhuǎn zhàng", pos: "verb", definition: "to transfer money; bank transfer" },
        { hanzi: "信用卡", pinyin: "xìn yòng kǎ", pos: "noun", definition: "credit card" },
        { hanzi: "现金", pinyin: "xiàn jīn", pos: "noun", definition: "cash" },
        { hanzi: "账单", pinyin: "zhàng dān", pos: "noun", definition: "bill; invoice; statement" },
        { hanzi: "利息", pinyin: "lì xi", pos: "noun", definition: "interest (on a loan or deposit)" },
        { hanzi: "贷款", pinyin: "dài kuǎn", pos: "noun", definition: "loan; bank loan" },
        { hanzi: "汇率", pinyin: "huì lǜ", pos: "noun", definition: "exchange rate" },
      ],
    },
  ],
};

// ─── Health & Body ────────────────────────────────────────────────────────────
const health: VocabTheme = {
  id: "health",
  label: "Health & Body",
  emoji: "🏥",
  subcategories: [
    {
      id: "health-body",
      label: "Body Parts",
      words: [
        { hanzi: "头", pinyin: "tóu", pos: "noun", definition: "head" },
        { hanzi: "脸", pinyin: "liǎn", pos: "noun", definition: "face" },
        { hanzi: "眼睛", pinyin: "yǎn jīng", pos: "noun", definition: "eye; eyes" },
        { hanzi: "耳朵", pinyin: "ěr duo", pos: "noun", definition: "ear; ears" },
        { hanzi: "鼻子", pinyin: "bí zi", pos: "noun", definition: "nose" },
        { hanzi: "嘴", pinyin: "zuǐ", pos: "noun", definition: "mouth" },
        { hanzi: "牙齿", pinyin: "yá chǐ", pos: "noun", definition: "tooth; teeth" },
        { hanzi: "脖子", pinyin: "bó zi", pos: "noun", definition: "neck" },
        { hanzi: "肩膀", pinyin: "jiān bǎng", pos: "noun", definition: "shoulder" },
        { hanzi: "手", pinyin: "shǒu", pos: "noun", definition: "hand" },
        { hanzi: "脚", pinyin: "jiǎo", pos: "noun", definition: "foot; feet" },
        { hanzi: "心脏", pinyin: "xīn zàng", pos: "noun", definition: "heart (organ)" },
      ],
    },
    {
      id: "health-illness",
      label: "Illness & Symptoms",
      words: [
        { hanzi: "发烧", pinyin: "fā shāo", pos: "verb", definition: "to have a fever; to run a temperature" },
        { hanzi: "咳嗽", pinyin: "ké sou", pos: "verb", definition: "to cough" },
        { hanzi: "头疼", pinyin: "tóu téng", pos: "verb", definition: "to have a headache; headache" },
        { hanzi: "肚子疼", pinyin: "dù zi téng", pos: "phrase", definition: "stomachache; to have a stomach ache" },
        { hanzi: "感冒", pinyin: "gǎn mào", pos: "noun", definition: "cold; flu; to catch a cold" },
        { hanzi: "过敏", pinyin: "guò mǐn", pos: "verb", definition: "to be allergic; allergy" },
        { hanzi: "受伤", pinyin: "shòu shāng", pos: "verb", definition: "to be injured; to get hurt" },
        { hanzi: "恶心", pinyin: "ě xīn", pos: "adj", definition: "nauseous; to feel sick; disgusting" },
        { hanzi: "失眠", pinyin: "shī mián", pos: "verb", definition: "to have insomnia; to be unable to sleep" },
        { hanzi: "骨折", pinyin: "gǔ zhé", pos: "noun", definition: "bone fracture; broken bone" },
      ],
    },
    {
      id: "health-medical",
      label: "Medical",
      words: [
        { hanzi: "医院", pinyin: "yī yuàn", pos: "noun", definition: "hospital" },
        { hanzi: "诊所", pinyin: "zhěn suǒ", pos: "noun", definition: "clinic; doctor's office" },
        { hanzi: "医生", pinyin: "yī shēng", pos: "noun", definition: "doctor; physician" },
        { hanzi: "护士", pinyin: "hù shi", pos: "noun", definition: "nurse" },
        { hanzi: "药", pinyin: "yào", pos: "noun", definition: "medicine; drug; medication" },
        { hanzi: "处方", pinyin: "chǔ fāng", pos: "noun", definition: "prescription" },
        { hanzi: "手术", pinyin: "shǒu shù", pos: "noun", definition: "surgery; operation" },
        { hanzi: "打针", pinyin: "dǎ zhēn", pos: "phrase", definition: "to give/receive an injection; to get a shot" },
        { hanzi: "挂号", pinyin: "guà hào", pos: "verb", definition: "to register (at a hospital); to make an appointment" },
        { hanzi: "体检", pinyin: "tǐ jiǎn", pos: "noun", definition: "physical examination; health check-up" },
      ],
    },
  ],
};

// ─── Weather & Nature ─────────────────────────────────────────────────────────
const weather: VocabTheme = {
  id: "weather",
  label: "Weather & Nature",
  emoji: "🌤️",
  subcategories: [
    {
      id: "weather-conditions",
      label: "Weather Conditions",
      words: [
        { hanzi: "晴天", pinyin: "qíng tiān", pos: "noun", definition: "sunny day; clear sky" },
        { hanzi: "阴天", pinyin: "yīn tiān", pos: "noun", definition: "cloudy day; overcast sky" },
        { hanzi: "下雨", pinyin: "xià yǔ", pos: "verb", definition: "to rain; it is raining" },
        { hanzi: "下雪", pinyin: "xià xuě", pos: "verb", definition: "to snow; it is snowing" },
        { hanzi: "刮风", pinyin: "guā fēng", pos: "verb", definition: "to be windy; the wind is blowing" },
        { hanzi: "雷阵雨", pinyin: "léi zhèn yǔ", pos: "noun", definition: "thunderstorm; thunder shower" },
        { hanzi: "台风", pinyin: "tái fēng", pos: "noun", definition: "typhoon" },
        { hanzi: "雾霾", pinyin: "wù mái", pos: "noun", definition: "smog; haze (air pollution)" },
        { hanzi: "温度", pinyin: "wēn dù", pos: "noun", definition: "temperature" },
        { hanzi: "湿度", pinyin: "shī dù", pos: "noun", definition: "humidity" },
        { hanzi: "天气预报", pinyin: "tiān qì yù bào", pos: "noun", definition: "weather forecast" },
        { hanzi: "气候", pinyin: "qì hòu", pos: "noun", definition: "climate" },
      ],
    },
    {
      id: "weather-nature",
      label: "Nature",
      words: [
        { hanzi: "山", pinyin: "shān", pos: "noun", definition: "mountain; hill" },
        { hanzi: "河", pinyin: "hé", pos: "noun", definition: "river" },
        { hanzi: "湖", pinyin: "hú", pos: "noun", definition: "lake" },
        { hanzi: "海", pinyin: "hǎi", pos: "noun", definition: "sea; ocean" },
        { hanzi: "森林", pinyin: "sēn lín", pos: "noun", definition: "forest; woods" },
        { hanzi: "沙漠", pinyin: "shā mò", pos: "noun", definition: "desert" },
        { hanzi: "草原", pinyin: "cǎo yuán", pos: "noun", definition: "grassland; prairie; steppe" },
        { hanzi: "瀑布", pinyin: "pù bù", pos: "noun", definition: "waterfall" },
        { hanzi: "花", pinyin: "huā", pos: "noun", definition: "flower; blossom" },
        { hanzi: "树", pinyin: "shù", pos: "noun", definition: "tree" },
        { hanzi: "动物", pinyin: "dòng wù", pos: "noun", definition: "animal" },
        { hanzi: "植物", pinyin: "zhí wù", pos: "noun", definition: "plant; vegetation" },
      ],
    },
  ],
};

// ─── Numbers, Time & Dates ────────────────────────────────────────────────────
const timeNumbers: VocabTheme = {
  id: "time-numbers",
  label: "Time & Numbers",
  emoji: "🕐",
  subcategories: [
    {
      id: "time-periods",
      label: "Time Expressions",
      words: [
        { hanzi: "现在", pinyin: "xiàn zài", pos: "adv", definition: "now; at present; currently" },
        { hanzi: "以前", pinyin: "yǐ qián", pos: "adv", definition: "before; previously; in the past" },
        { hanzi: "以后", pinyin: "yǐ hòu", pos: "adv", definition: "after; afterwards; in the future" },
        { hanzi: "刚才", pinyin: "gāng cái", pos: "adv", definition: "just now; a moment ago" },
        { hanzi: "马上", pinyin: "mǎ shàng", pos: "adv", definition: "immediately; right away; at once" },
        { hanzi: "早上", pinyin: "zǎo shàng", pos: "noun", definition: "morning; early morning" },
        { hanzi: "下午", pinyin: "xià wǔ", pos: "noun", definition: "afternoon" },
        { hanzi: "晚上", pinyin: "wǎn shàng", pos: "noun", definition: "evening; night" },
        { hanzi: "昨天", pinyin: "zuó tiān", pos: "noun", definition: "yesterday" },
        { hanzi: "今天", pinyin: "jīn tiān", pos: "noun", definition: "today" },
        { hanzi: "明天", pinyin: "míng tiān", pos: "noun", definition: "tomorrow" },
        { hanzi: "后天", pinyin: "hòu tiān", pos: "noun", definition: "the day after tomorrow" },
      ],
    },
    {
      id: "time-measure",
      label: "Measure Words",
      words: [
        { hanzi: "个", pinyin: "gè", pos: "measure", definition: "general measure word for people, objects" },
        { hanzi: "本", pinyin: "běn", pos: "measure", definition: "measure word for books, volumes" },
        { hanzi: "张", pinyin: "zhāng", pos: "measure", definition: "measure word for flat objects (paper, tables, faces)" },
        { hanzi: "条", pinyin: "tiáo", pos: "measure", definition: "measure word for long, flexible things (fish, roads, trousers)" },
        { hanzi: "块", pinyin: "kuài", pos: "measure", definition: "measure word for chunks, pieces; also yuan (currency)" },
        { hanzi: "杯", pinyin: "bēi", pos: "measure", definition: "measure word for cups/glasses of liquid" },
        { hanzi: "碗", pinyin: "wǎn", pos: "measure", definition: "measure word for bowls of food" },
        { hanzi: "次", pinyin: "cì", pos: "measure", definition: "measure word for times/occurrences" },
        { hanzi: "遍", pinyin: "biàn", pos: "measure", definition: "measure word for complete actions from start to finish" },
        { hanzi: "把", pinyin: "bǎ", pos: "measure", definition: "measure word for objects with handles; also a preposition" },
        { hanzi: "位", pinyin: "wèi", pos: "measure", definition: "polite measure word for people" },
        { hanzi: "双", pinyin: "shuāng", pos: "measure", definition: "measure word for pairs (shoes, chopsticks)" },
      ],
    },
  ],
};

// ─── Work & Business ──────────────────────────────────────────────────────────
const work: VocabTheme = {
  id: "work",
  label: "Work & Business",
  emoji: "💼",
  subcategories: [
    {
      id: "work-jobs",
      label: "Jobs & Professions",
      words: [
        { hanzi: "工作", pinyin: "gōng zuò", pos: "noun", definition: "work; job; to work" },
        { hanzi: "职业", pinyin: "zhí yè", pos: "noun", definition: "profession; occupation; career" },
        { hanzi: "公司", pinyin: "gōng sī", pos: "noun", definition: "company; corporation" },
        { hanzi: "老板", pinyin: "lǎo bǎn", pos: "noun", definition: "boss; employer; owner" },
        { hanzi: "员工", pinyin: "yuán gōng", pos: "noun", definition: "employee; staff member" },
        { hanzi: "同事", pinyin: "tóng shì", pos: "noun", definition: "colleague; coworker" },
        { hanzi: "经理", pinyin: "jīng lǐ", pos: "noun", definition: "manager; director" },
        { hanzi: "工程师", pinyin: "gōng chéng shī", pos: "noun", definition: "engineer" },
        { hanzi: "律师", pinyin: "lǜ shī", pos: "noun", definition: "lawyer; attorney" },
        { hanzi: "会计", pinyin: "kuài jì", pos: "noun", definition: "accountant; accounting" },
      ],
    },
    {
      id: "work-office",
      label: "Office & Meetings",
      words: [
        { hanzi: "会议", pinyin: "huì yì", pos: "noun", definition: "meeting; conference" },
        { hanzi: "报告", pinyin: "bào gào", pos: "noun", definition: "report; to report; presentation" },
        { hanzi: "合同", pinyin: "hé tong", pos: "noun", definition: "contract; agreement" },
        { hanzi: "项目", pinyin: "xiàng mù", pos: "noun", definition: "project; programme; item" },
        { hanzi: "截止日期", pinyin: "jié zhǐ rì qī", pos: "noun", definition: "deadline; due date" },
        { hanzi: "加班", pinyin: "jiā bān", pos: "verb", definition: "to work overtime; to do extra hours" },
        { hanzi: "出差", pinyin: "chū chāi", pos: "verb", definition: "to go on a business trip" },
        { hanzi: "谈判", pinyin: "tán pàn", pos: "verb", definition: "to negotiate; negotiation" },
        { hanzi: "签合同", pinyin: "qiān hé tong", pos: "phrase", definition: "to sign a contract" },
        { hanzi: "薪水", pinyin: "xīn shuǐ", pos: "noun", definition: "salary; wages; pay" },
        { hanzi: "奖金", pinyin: "jiǎng jīn", pos: "noun", definition: "bonus; award money" },
        { hanzi: "辞职", pinyin: "cí zhí", pos: "verb", definition: "to resign; to quit one's job" },
      ],
    },
  ],
};

// ─── Technology ───────────────────────────────────────────────────────────────
const technology: VocabTheme = {
  id: "technology",
  label: "Technology",
  emoji: "💻",
  subcategories: [
    {
      id: "tech-devices",
      label: "Devices",
      words: [
        { hanzi: "手机", pinyin: "shǒu jī", pos: "noun", definition: "mobile phone; smartphone" },
        { hanzi: "电脑", pinyin: "diàn nǎo", pos: "noun", definition: "computer; laptop" },
        { hanzi: "平板", pinyin: "píng bǎn", pos: "noun", definition: "tablet (device); iPad" },
        { hanzi: "耳机", pinyin: "ěr jī", pos: "noun", definition: "earphones; headphones" },
        { hanzi: "充电器", pinyin: "chōng diàn qì", pos: "noun", definition: "charger; charging cable" },
        { hanzi: "摄像头", pinyin: "shè xiàng tóu", pos: "noun", definition: "camera (on a device); webcam" },
        { hanzi: "打印机", pinyin: "dǎ yìn jī", pos: "noun", definition: "printer" },
        { hanzi: "路由器", pinyin: "lù yóu qì", pos: "noun", definition: "router (network)" },
      ],
    },
    {
      id: "tech-internet",
      label: "Internet & Apps",
      words: [
        { hanzi: "网络", pinyin: "wǎng luò", pos: "noun", definition: "internet; network; web" },
        { hanzi: "应用程序", pinyin: "yìng yòng chéng xù", pos: "noun", definition: "application; app; software" },
        { hanzi: "下载", pinyin: "xià zài", pos: "verb", definition: "to download" },
        { hanzi: "上传", pinyin: "shàng chuán", pos: "verb", definition: "to upload" },
        { hanzi: "搜索", pinyin: "sōu suǒ", pos: "verb", definition: "to search; to look up" },
        { hanzi: "密码", pinyin: "mì mǎ", pos: "noun", definition: "password; PIN; code" },
        { hanzi: "账号", pinyin: "zhàng hào", pos: "noun", definition: "account; username" },
        { hanzi: "社交媒体", pinyin: "shè jiāo méi tǐ", pos: "noun", definition: "social media" },
        { hanzi: "直播", pinyin: "zhí bō", pos: "noun", definition: "live stream; live broadcast" },
        { hanzi: "人工智能", pinyin: "rén gōng zhì néng", pos: "noun", definition: "artificial intelligence; AI" },
        { hanzi: "大数据", pinyin: "dà shù jù", pos: "noun", definition: "big data" },
        { hanzi: "云计算", pinyin: "yún jì suàn", pos: "noun", definition: "cloud computing" },
      ],
    },
  ],
};

//// ─── 15. Animals & Pets ───────────────────────────────────────────────────────
const animals: VocabTheme = {
  id: "animals",
  label: "Animals & Pets",
  emoji: "🐾",
  subcategories: [
    {
      id: "animals-pets",
      label: "Pets",
      words: [
        { hanzi: "狗", pinyin: "gǒu", pos: "noun", definition: "dog" },
        { hanzi: "猫", pinyin: "māo", pos: "noun", definition: "cat" },
        { hanzi: "兔子", pinyin: "tù zi", pos: "noun", definition: "rabbit; bunny" },
        { hanzi: "金鱼", pinyin: "jīn yú", pos: "noun", definition: "goldfish" },
        { hanzi: "鹦鹉", pinyin: "yīng wǔ", pos: "noun", definition: "parrot" },
        { hanzi: "仓鼠", pinyin: "cāng shǔ", pos: "noun", definition: "hamster" },
        { hanzi: "乌龟", pinyin: "wū guī", pos: "noun", definition: "tortoise; turtle" },
        { hanzi: "宠物", pinyin: "chǒng wù", pos: "noun", definition: "pet; domestic animal" },
        { hanzi: "喂食", pinyin: "wèi shí", pos: "verb", definition: "to feed (an animal)" },
        { hanzi: "遛狗", pinyin: "liù gǒu", pos: "phrase", definition: "to walk a dog; to take a dog for a walk" },
      ],
    },
    {
      id: "animals-wild",
      label: "Wild Animals",
      words: [
        { hanzi: "老虎", pinyin: "lǎo hǔ", pos: "noun", definition: "tiger" },
        { hanzi: "狮子", pinyin: "shī zi", pos: "noun", definition: "lion" },
        { hanzi: "大象", pinyin: "dà xiàng", pos: "noun", definition: "elephant" },
        { hanzi: "熊猫", pinyin: "xióng māo", pos: "noun", definition: "panda; giant panda" },
        { hanzi: "猴子", pinyin: "hóu zi", pos: "noun", definition: "monkey" },
        { hanzi: "长颈鹿", pinyin: "cháng jǐng lù", pos: "noun", definition: "giraffe" },
        { hanzi: "斑马", pinyin: "bān mǎ", pos: "noun", definition: "zebra" },
        { hanzi: "鳄鱼", pinyin: "è yú", pos: "noun", definition: "crocodile; alligator" },
        { hanzi: "蛇", pinyin: "shé", pos: "noun", definition: "snake" },
        { hanzi: "鹰", pinyin: "yīng", pos: "noun", definition: "eagle; hawk" },
        { hanzi: "狐狸", pinyin: "hú li", pos: "noun", definition: "fox" },
        { hanzi: "狼", pinyin: "láng", pos: "noun", definition: "wolf" },
        { hanzi: "熊", pinyin: "xióng", pos: "noun", definition: "bear" },
        { hanzi: "鹿", pinyin: "lù", pos: "noun", definition: "deer" },
        { hanzi: "马", pinyin: "mǎ", pos: "noun", definition: "horse" },
        { hanzi: "牛", pinyin: "niú", pos: "noun", definition: "cow; ox; cattle" },
        { hanzi: "羊", pinyin: "yáng", pos: "noun", definition: "sheep; goat" },
        { hanzi: "猪", pinyin: "zhū", pos: "noun", definition: "pig; swine" },
        { hanzi: "鸡", pinyin: "jī", pos: "noun", definition: "chicken; rooster" },
        { hanzi: "鸭", pinyin: "yā", pos: "noun", definition: "duck" },
      ],
    },
  ],
};

// ─── 16. Festivals & Holidays ─────────────────────────────────────────────────
const festivals: VocabTheme = {
  id: "festivals",
  label: "Festivals & Holidays",
  emoji: "🎉",
  subcategories: [
    {
      id: "festivals-chinese",
      label: "Chinese Festivals",
      words: [
        { hanzi: "春节", pinyin: "chūn jié", pos: "noun", definition: "Chinese New Year; Spring Festival" },
        { hanzi: "元宵节", pinyin: "yuán xiāo jié", pos: "noun", definition: "Lantern Festival (15th day of 1st lunar month)" },
        { hanzi: "清明节", pinyin: "qīng míng jié", pos: "noun", definition: "Qingming Festival; Tomb Sweeping Day" },
        { hanzi: "端午节", pinyin: "duān wǔ jié", pos: "noun", definition: "Dragon Boat Festival (5th day of 5th lunar month)" },
        { hanzi: "七夕节", pinyin: "qī xī jié", pos: "noun", definition: "Qixi Festival; Chinese Valentine's Day" },
        { hanzi: "中秋节", pinyin: "zhōng qiū jié", pos: "noun", definition: "Mid-Autumn Festival; Moon Festival" },
        { hanzi: "重阳节", pinyin: "chóng yáng jié", pos: "noun", definition: "Double Ninth Festival; Seniors' Day" },
        { hanzi: "冬至", pinyin: "dōng zhì", pos: "noun", definition: "Winter Solstice (traditional festival)" },
        { hanzi: "国庆节", pinyin: "guó qìng jié", pos: "noun", definition: "National Day (October 1st)" },
        { hanzi: "劳动节", pinyin: "láo dòng jié", pos: "noun", definition: "Labor Day (May 1st); International Workers' Day" },
      ],
    },
    {
      id: "festivals-customs",
      label: "Festival Customs",
      words: [
        { hanzi: "红包", pinyin: "hóng bāo", pos: "noun", definition: "red envelope (with money gift); hongbao" },
        { hanzi: "烟花", pinyin: "yān huā", pos: "noun", definition: "fireworks" },
        { hanzi: "鞭炮", pinyin: "biān pào", pos: "noun", definition: "firecrackers" },
        { hanzi: "春联", pinyin: "chūn lián", pos: "noun", definition: "Spring Festival couplets; door couplets" },
        { hanzi: "年糕", pinyin: "nián gāo", pos: "noun", definition: "New Year cake; rice cake" },
        { hanzi: "月饼", pinyin: "yuè bǐng", pos: "noun", definition: "mooncake (Mid-Autumn Festival)" },
        { hanzi: "粽子", pinyin: "zòng zi", pos: "noun", definition: "zongzi; sticky rice dumpling (Dragon Boat Festival)" },
        { hanzi: "汤圆", pinyin: "tāng yuán", pos: "noun", definition: "glutinous rice balls (Lantern Festival)" },
        { hanzi: "拜年", pinyin: "bài nián", pos: "verb", definition: "to pay a New Year visit; to wish sb a Happy New Year" },
        { hanzi: "团圆", pinyin: "tuán yuán", pos: "verb", definition: "to reunite (family gathering); family reunion" },
        { hanzi: "舞龙", pinyin: "wǔ lóng", pos: "noun", definition: "dragon dance" },
        { hanzi: "舞狮", pinyin: "wǔ shī", pos: "noun", definition: "lion dance" },
        { hanzi: "灯笼", pinyin: "dēng lóng", pos: "noun", definition: "lantern; paper lantern" },
        { hanzi: "祝福", pinyin: "zhù fú", pos: "noun", definition: "blessing; good wishes; to wish sb well" },
        { hanzi: "压岁钱", pinyin: "yā suì qián", pos: "noun", definition: "lucky money given to children at New Year" },
        { hanzi: "守岁", pinyin: "shǒu suì", pos: "verb", definition: "to stay up all night on New Year's Eve" },
        { hanzi: "祭祖", pinyin: "jì zǔ", pos: "verb", definition: "to pay respects to ancestors; ancestor worship" },
        { hanzi: "放假", pinyin: "fàng jià", pos: "verb", definition: "to have a holiday; to be on vacation" },
        { hanzi: "节日快乐", pinyin: "jié rì kuài lè", pos: "phrase", definition: "Happy Holiday! (festival greeting)" },
        { hanzi: "贴福字", pinyin: "tiē fú zì", pos: "phrase", definition: "to paste the character 福 (good fortune) on doors" },
      ],
    },
  ],
};

// ─── 17. Emotions & Relationships ─────────────────────────────────────────────
const emotions: VocabTheme = {
  id: "emotions",
  label: "Emotions & Relationships",
  emoji: "❤️",
  subcategories: [
    {
      id: "emotions-feelings",
      label: "Feelings",
      words: [
        { hanzi: "高兴", pinyin: "gāo xìng", pos: "adj", definition: "happy; pleased; glad" },
        { hanzi: "难过", pinyin: "nán guò", pos: "adj", definition: "sad; upset; feeling bad" },
        { hanzi: "生气", pinyin: "shēng qì", pos: "verb", definition: "to be angry; to get angry" },
        { hanzi: "害怕", pinyin: "hài pà", pos: "verb", definition: "to be afraid; to fear; scared" },
        { hanzi: "担心", pinyin: "dān xīn", pos: "verb", definition: "to worry; to be concerned" },
        { hanzi: "兴奋", pinyin: "xīng fèn", pos: "adj", definition: "excited; thrilled; stimulated" },
        { hanzi: "失望", pinyin: "shī wàng", pos: "adj", definition: "disappointed; let down" },
        { hanzi: "惊讶", pinyin: "jīng yà", pos: "adj", definition: "surprised; astonished; amazed" },
        { hanzi: "骄傲", pinyin: "jiāo ào", pos: "adj", definition: "proud; arrogant (context-dependent)" },
        { hanzi: "羞耻", pinyin: "xiū chǐ", pos: "noun", definition: "shame; embarrassment" },
        { hanzi: "嫉妒", pinyin: "jí dù", pos: "verb", definition: "to be jealous; to envy" },
        { hanzi: "感激", pinyin: "gǎn jī", pos: "verb", definition: "to be grateful; to feel thankful" },
        { hanzi: "孤独", pinyin: "gū dú", pos: "adj", definition: "lonely; solitary; isolated" },
        { hanzi: "平静", pinyin: "píng jìng", pos: "adj", definition: "calm; tranquil; peaceful" },
        { hanzi: "紧张", pinyin: "jǐn zhāng", pos: "adj", definition: "nervous; tense; stressed" },
        { hanzi: "委屈", pinyin: "wěi qu", pos: "adj", definition: "wronged; feeling aggrieved; hard done by" },
      ],
    },
    {
      id: "emotions-relationships",
      label: "Relationships",
      words: [
        { hanzi: "朋友", pinyin: "péng you", pos: "noun", definition: "friend" },
        { hanzi: "家人", pinyin: "jiā rén", pos: "noun", definition: "family member; family" },
        { hanzi: "父母", pinyin: "fù mǔ", pos: "noun", definition: "parents; father and mother" },
        { hanzi: "兄弟", pinyin: "xiōng dì", pos: "noun", definition: "brothers; siblings (male)" },
        { hanzi: "姐妹", pinyin: "jiě mèi", pos: "noun", definition: "sisters; siblings (female)" },
        { hanzi: "男朋友", pinyin: "nán péng you", pos: "noun", definition: "boyfriend" },
        { hanzi: "女朋友", pinyin: "nǚ péng you", pos: "noun", definition: "girlfriend" },
        { hanzi: "恋人", pinyin: "liàn rén", pos: "noun", definition: "lover; romantic partner" },
        { hanzi: "夫妻", pinyin: "fū qī", pos: "noun", definition: "husband and wife; married couple" },
        { hanzi: "邻居", pinyin: "lín jū", pos: "noun", definition: "neighbor" },
        { hanzi: "陌生人", pinyin: "mò shēng rén", pos: "noun", definition: "stranger; unknown person" },
        { hanzi: "相处", pinyin: "xiāng chǔ", pos: "verb", definition: "to get along with; to interact with" },
        { hanzi: "分手", pinyin: "fēn shǒu", pos: "verb", definition: "to break up; to part ways" },
        { hanzi: "结婚", pinyin: "jié hūn", pos: "verb", definition: "to get married; to marry" },
        { hanzi: "离婚", pinyin: "lí hūn", pos: "verb", definition: "to divorce; to get divorced" },
        { hanzi: "信任", pinyin: "xìn rèn", pos: "verb", definition: "to trust; to have confidence in" },
        { hanzi: "理解", pinyin: "lǐ jiě", pos: "verb", definition: "to understand; to comprehend" },
        { hanzi: "支持", pinyin: "zhī chí", pos: "verb", definition: "to support; to back up" },
      ],
    },
  ],
};

// ─── 18. Clothing & Fashion ───────────────────────────────────────────────────
const clothing: VocabTheme = {
  id: "clothing",
  label: "Clothing & Fashion",
  emoji: "👗",
  subcategories: [
    {
      id: "clothing-items",
      label: "Clothing Items",
      words: [
        { hanzi: "衣服", pinyin: "yī fu", pos: "noun", definition: "clothes; clothing; garment" },
        { hanzi: "上衣", pinyin: "shàng yī", pos: "noun", definition: "top; upper garment; shirt" },
        { hanzi: "裤子", pinyin: "kù zi", pos: "noun", definition: "trousers; pants" },
        { hanzi: "裙子", pinyin: "qún zi", pos: "noun", definition: "skirt; dress" },
        { hanzi: "外套", pinyin: "wài tào", pos: "noun", definition: "coat; jacket; outer garment" },
        { hanzi: "毛衣", pinyin: "máo yī", pos: "noun", definition: "sweater; woolen sweater" },
        { hanzi: "T恤", pinyin: "T xù", pos: "noun", definition: "T-shirt" },
        { hanzi: "牛仔裤", pinyin: "niú zǎi kù", pos: "noun", definition: "jeans; denim trousers" },
        { hanzi: "西装", pinyin: "xī zhuāng", pos: "noun", definition: "suit; Western-style suit" },
        { hanzi: "旗袍", pinyin: "qí páo", pos: "noun", definition: "qipao; cheongsam (traditional Chinese dress)" },
        { hanzi: "汉服", pinyin: "hàn fú", pos: "noun", definition: "Hanfu; traditional Han Chinese clothing" },
        { hanzi: "内衣", pinyin: "nèi yī", pos: "noun", definition: "underwear; lingerie" },
        { hanzi: "羽绒服", pinyin: "yǔ róng fú", pos: "noun", definition: "down jacket; puffer jacket" },
        { hanzi: "风衣", pinyin: "fēng yī", pos: "noun", definition: "trench coat; windbreaker" },
        { hanzi: "睡衣", pinyin: "shuì yī", pos: "noun", definition: "pajamas; sleepwear" },
      ],
    },
    {
      id: "clothing-accessories",
      label: "Accessories & Shoes",
      words: [
        { hanzi: "鞋子", pinyin: "xié zi", pos: "noun", definition: "shoes; footwear" },
        { hanzi: "运动鞋", pinyin: "yùn dòng xié", pos: "noun", definition: "sneakers; sports shoes" },
        { hanzi: "高跟鞋", pinyin: "gāo gēn xié", pos: "noun", definition: "high heels; high-heeled shoes" },
        { hanzi: "帽子", pinyin: "mào zi", pos: "noun", definition: "hat; cap" },
        { hanzi: "围巾", pinyin: "wéi jīn", pos: "noun", definition: "scarf; muffler" },
        { hanzi: "手套", pinyin: "shǒu tào", pos: "noun", definition: "gloves; mittens" },
        { hanzi: "袜子", pinyin: "wà zi", pos: "noun", definition: "socks; stockings" },
        { hanzi: "皮带", pinyin: "pí dài", pos: "noun", definition: "belt; leather belt" },
        { hanzi: "项链", pinyin: "xiàng liàn", pos: "noun", definition: "necklace" },
        { hanzi: "戒指", pinyin: "jiè zhi", pos: "noun", definition: "ring; finger ring" },
        { hanzi: "耳环", pinyin: "ěr huán", pos: "noun", definition: "earrings" },
        { hanzi: "手表", pinyin: "shǒu biǎo", pos: "noun", definition: "watch; wristwatch" },
        { hanzi: "眼镜", pinyin: "yǎn jìng", pos: "noun", definition: "glasses; spectacles; eyeglasses" },
        { hanzi: "背包", pinyin: "bèi bāo", pos: "noun", definition: "backpack; rucksack" },
        { hanzi: "钱包", pinyin: "qián bāo", pos: "noun", definition: "wallet; purse" },
        { hanzi: "雨伞", pinyin: "yǔ sǎn", pos: "noun", definition: "umbrella; rain umbrella" },
        { hanzi: "太阳镜", pinyin: "tài yáng jìng", pos: "noun", definition: "sunglasses" },
        { hanzi: "手提包", pinyin: "shǒu tí bāo", pos: "noun", definition: "handbag; purse; tote bag" },
      ],
    },
  ],
};

// ─── 19. Transportation & Directions ──────────────────────────────────────────
const transportation: VocabTheme = {
  id: "transportation",
  label: "Transportation & Directions",
  emoji: "🗺️",
  subcategories: [
    {
      id: "transport-vehicles",
      label: "Vehicles",
      words: [
        { hanzi: "卡车", pinyin: "kǎ chē", pos: "noun", definition: "truck; lorry" },
        { hanzi: "公交车", pinyin: "gōng jiāo chē", pos: "noun", definition: "city bus; public bus" },
        { hanzi: "电动车", pinyin: "diàn dòng chē", pos: "noun", definition: "electric scooter; e-bike" },
        { hanzi: "共享单车", pinyin: "gòng xiǎng dān chē", pos: "noun", definition: "shared bicycle; bike-share" },
        { hanzi: "救护车", pinyin: "jiù hù chē", pos: "noun", definition: "ambulance" },
        { hanzi: "消防车", pinyin: "xiāo fáng chē", pos: "noun", definition: "fire truck; fire engine" },
        { hanzi: "警车", pinyin: "jǐng chē", pos: "noun", definition: "police car; patrol car" },
        { hanzi: "直升机", pinyin: "zhí shēng jī", pos: "noun", definition: "helicopter" },
        { hanzi: "船", pinyin: "chuán", pos: "noun", definition: "boat; ship; vessel" },
        { hanzi: "拖拉机", pinyin: "tuō lā jī", pos: "noun", definition: "tractor" },
      ],
    },
    {
      id: "transport-directions",
      label: "Directions & Navigation",
      words: [
        { hanzi: "东", pinyin: "dōng", pos: "noun", definition: "east" },
        { hanzi: "西", pinyin: "xī", pos: "noun", definition: "west" },
        { hanzi: "南", pinyin: "nán", pos: "noun", definition: "south" },
        { hanzi: "北", pinyin: "běi", pos: "noun", definition: "north" },
        { hanzi: "前面", pinyin: "qián miàn", pos: "noun", definition: "front; ahead; in front" },
        { hanzi: "后面", pinyin: "hòu miàn", pos: "noun", definition: "behind; at the back; rear" },
        { hanzi: "左边", pinyin: "zuǒ biān", pos: "noun", definition: "left side; to the left" },
        { hanzi: "右边", pinyin: "yòu biān", pos: "noun", definition: "right side; to the right" },
        { hanzi: "路口", pinyin: "lù kǒu", pos: "noun", definition: "intersection; crossroads; junction" },
        { hanzi: "红绿灯", pinyin: "hóng lǜ dēng", pos: "noun", definition: "traffic light; stoplight" },
        { hanzi: "斑马线", pinyin: "bān mǎ xiàn", pos: "noun", definition: "crosswalk; zebra crossing" },
        { hanzi: "导航", pinyin: "dǎo háng", pos: "noun", definition: "navigation; GPS navigation" },
        { hanzi: "堵车", pinyin: "dǔ chē", pos: "verb", definition: "traffic jam; to be stuck in traffic" },
        { hanzi: "停车", pinyin: "tíng chē", pos: "verb", definition: "to park; to stop a vehicle" },
        { hanzi: "超速", pinyin: "chāo sù", pos: "verb", definition: "to speed; to exceed the speed limit" },
        { hanzi: "绕道", pinyin: "rào dào", pos: "verb", definition: "to detour; to take a roundabout route" },
        { hanzi: "换乘", pinyin: "huàn chéng", pos: "verb", definition: "to transfer (buses/trains); to change lines" },
        { hanzi: "终点站", pinyin: "zhōng diǎn zhàn", pos: "noun", definition: "terminal; last stop; end of the line" },
        { hanzi: "公里", pinyin: "gōng lǐ", pos: "noun", definition: "kilometer" },
        { hanzi: "路程", pinyin: "lù chéng", pos: "noun", definition: "distance; journey; route" },
      ],
    },
  ],
};

// ─── 20. Art & Music ──────────────────────────────────────────────────────────
const artMusic: VocabTheme = {
  id: "art-music",
  label: "Art & Music",
  emoji: "🎵",
  subcategories: [
    {
      id: "art-visual",
      label: "Visual Arts",
      words: [
        { hanzi: "画", pinyin: "huà", pos: "noun", definition: "painting; drawing; picture" },
        { hanzi: "水墨画", pinyin: "shuǐ mò huà", pos: "noun", definition: "ink wash painting; Chinese ink painting" },
        { hanzi: "雕塑", pinyin: "diāo sù", pos: "noun", definition: "sculpture; carving" },
        { hanzi: "展览", pinyin: "zhǎn lǎn", pos: "noun", definition: "exhibition; art show; display" },
        { hanzi: "艺术家", pinyin: "yì shù jiā", pos: "noun", definition: "artist" },
        { hanzi: "画廊", pinyin: "huà láng", pos: "noun", definition: "art gallery; picture gallery" },
        { hanzi: "作品", pinyin: "zuò pǐn", pos: "noun", definition: "work (of art/literature); creation; piece" },
        { hanzi: "风格", pinyin: "fēng gé", pos: "noun", definition: "style; artistic style" },
        { hanzi: "创作", pinyin: "chuàng zuò", pos: "verb", definition: "to create; to produce (art/literature)" },
        { hanzi: "灵感", pinyin: "líng gǎn", pos: "noun", definition: "inspiration; creative inspiration" },
      ],
    },
    {
      id: "art-music-terms",
      label: "Music Terms",
      words: [
        { hanzi: "歌曲", pinyin: "gē qǔ", pos: "noun", definition: "song; piece of music" },
        { hanzi: "旋律", pinyin: "xuán lǜ", pos: "noun", definition: "melody; tune" },
        { hanzi: "节奏", pinyin: "jié zòu", pos: "noun", definition: "rhythm; beat" },
        { hanzi: "乐器", pinyin: "yuè qì", pos: "noun", definition: "musical instrument" },
        { hanzi: "钢琴", pinyin: "gāng qín", pos: "noun", definition: "piano" },
        { hanzi: "小提琴", pinyin: "xiǎo tí qín", pos: "noun", definition: "violin" },
        { hanzi: "演唱会", pinyin: "yǎn chàng huì", pos: "noun", definition: "concert; live performance" },
        { hanzi: "乐队", pinyin: "yuè duì", pos: "noun", definition: "band; orchestra; music group" },
        { hanzi: "指挥", pinyin: "zhǐ huī", pos: "noun", definition: "conductor (music); to conduct" },
        { hanzi: "合唱团", pinyin: "hé chàng tuán", pos: "noun", definition: "choir; choral group" },
        { hanzi: "独奏", pinyin: "dú zòu", pos: "noun", definition: "solo performance (instrumental)" },
        { hanzi: "流行音乐", pinyin: "liú xíng yīn yuè", pos: "noun", definition: "pop music; popular music" },
        { hanzi: "古典音乐", pinyin: "gǔ diǎn yīn yuè", pos: "noun", definition: "classical music" },
        { hanzi: "民乐", pinyin: "mín yuè", pos: "noun", definition: "folk music; traditional Chinese music" },
        { hanzi: "歌词", pinyin: "gē cí", pos: "noun", definition: "lyrics; song words" },
        { hanzi: "音调", pinyin: "yīn diào", pos: "noun", definition: "pitch; tone; musical key" },
        { hanzi: "音量", pinyin: "yīn liàng", pos: "noun", definition: "volume; loudness" },
        { hanzi: "排练", pinyin: "pái liàn", pos: "verb", definition: "to rehearse; rehearsal" },
        { hanzi: "演奏", pinyin: "yǎn zòu", pos: "verb", definition: "to perform (music); to play an instrument" },
        { hanzi: "作曲家", pinyin: "zuò qǔ jiā", pos: "noun", definition: "composer; music composer" },
      ],
    },
  ],
};

// ─── 21. Sports & Games ───────────────────────────────────────────────────────
const sportsGames: VocabTheme = {
  id: "sports-games",
  label: "Sports & Games",
  emoji: "⚽",
  subcategories: [
    {
      id: "sports-team",
      label: "Team Sports",
      words: [
        { hanzi: "足球", pinyin: "zú qiú", pos: "noun", definition: "soccer; football" },
        { hanzi: "篮球", pinyin: "lán qiú", pos: "noun", definition: "basketball" },
        { hanzi: "排球", pinyin: "pái qiú", pos: "noun", definition: "volleyball" },
        { hanzi: "棒球", pinyin: "bàng qiú", pos: "noun", definition: "baseball" },
        { hanzi: "橄榄球", pinyin: "gǎn lǎn qiú", pos: "noun", definition: "rugby; American football" },
        { hanzi: "曲棍球", pinyin: "qū gùn qiú", pos: "noun", definition: "field hockey; ice hockey" },
        { hanzi: "水球", pinyin: "shuǐ qiú", pos: "noun", definition: "water polo" },
        { hanzi: "队伍", pinyin: "duì wu", pos: "noun", definition: "team; squad; group" },
        { hanzi: "教练", pinyin: "jiào liàn", pos: "noun", definition: "coach; trainer" },
        { hanzi: "裁判", pinyin: "cái pàn", pos: "noun", definition: "referee; judge; umpire" },
      ],
    },
    {
      id: "sports-individual",
      label: "Individual Sports",
      words: [
        { hanzi: "乒乓球", pinyin: "pīng pāng qiú", pos: "noun", definition: "table tennis; ping pong" },
        { hanzi: "羽毛球", pinyin: "yǔ máo qiú", pos: "noun", definition: "badminton" },
        { hanzi: "网球", pinyin: "wǎng qiú", pos: "noun", definition: "tennis" },
        { hanzi: "高尔夫", pinyin: "gāo ěr fū", pos: "noun", definition: "golf" },
        { hanzi: "跳高", pinyin: "tiào gāo", pos: "noun", definition: "high jump" },
        { hanzi: "跳远", pinyin: "tiào yuǎn", pos: "noun", definition: "long jump" },
        { hanzi: "举重", pinyin: "jǔ zhòng", pos: "noun", definition: "weightlifting" },
        { hanzi: "体操", pinyin: "tǐ cāo", pos: "noun", definition: "gymnastics" },
        { hanzi: "武术", pinyin: "wǔ shù", pos: "noun", definition: "martial arts; wushu" },
        { hanzi: "太极拳", pinyin: "tài jí quán", pos: "noun", definition: "tai chi; taijiquan" },
        { hanzi: "滑雪", pinyin: "huá xuě", pos: "noun", definition: "skiing; to ski" },
        { hanzi: "冲浪", pinyin: "chōng làng", pos: "noun", definition: "surfing; to surf" },
        { hanzi: "攀岩", pinyin: "pān yán", pos: "noun", definition: "rock climbing" },
        { hanzi: "骑马", pinyin: "qí mǎ", pos: "phrase", definition: "horse riding; equestrian" },
        { hanzi: "射箭", pinyin: "shè jiàn", pos: "noun", definition: "archery" },
        { hanzi: "击剑", pinyin: "jī jiàn", pos: "noun", definition: "fencing (sport)" },
        { hanzi: "拳击", pinyin: "quán jī", pos: "noun", definition: "boxing" },
        { hanzi: "柔道", pinyin: "róu dào", pos: "noun", definition: "judo" },
        { hanzi: "马拉松", pinyin: "mǎ lā sōng", pos: "noun", definition: "marathon" },
        { hanzi: "铁人三项", pinyin: "tiě rén sān xiàng", pos: "noun", definition: "triathlon" },
      ],
    },
    {
      id: "sports-games-board",
      label: "Games",
      words: [
        { hanzi: "围棋", pinyin: "wéi qí", pos: "noun", definition: "Go (board game); weiqi" },
        { hanzi: "象棋", pinyin: "xiàng qí", pos: "noun", definition: "Chinese chess; xiangqi" },
        { hanzi: "麻将", pinyin: "má jiàng", pos: "noun", definition: "mahjong" },
        { hanzi: "扑克牌", pinyin: "pū kè pái", pos: "noun", definition: "playing cards; poker" },
        { hanzi: "电子游戏", pinyin: "diàn zǐ yóu xì", pos: "noun", definition: "video game; electronic game" },
        { hanzi: "棋盘", pinyin: "qí pán", pos: "noun", definition: "chessboard; game board" },
        { hanzi: "骰子", pinyin: "tóu zi", pos: "noun", definition: "dice; die" },
        { hanzi: "猜谜", pinyin: "cāi mí", pos: "verb", definition: "to guess riddles; to solve puzzles" },
        { hanzi: "赢", pinyin: "yíng", pos: "verb", definition: "to win; to beat" },
        { hanzi: "输", pinyin: "shū", pos: "verb", definition: "to lose (a game/bet)" },
      ],
    },
  ],
};

// ─── 22. Food Idioms & Expressions ────────────────────────────────────────────
const foodIdioms: VocabTheme = {
  id: "food-idioms",
  label: "Food Idioms & Expressions",
  emoji: "🥢",
  subcategories: [
    {
      id: "food-idioms-chengyu",
      label: "Chengyu (4-character idioms)",
      words: [
        { hanzi: "饮水思源", pinyin: "yǐn shuǐ sī yuán", pos: "idiom", definition: "when drinking water, think of its source (remember where you came from; be grateful)" },
        { hanzi: "食不知味", pinyin: "shí bù zhī wèi", pos: "idiom", definition: "to eat without tasting (so worried or distracted one cannot enjoy food)" },
        { hanzi: "狼吞虎咽", pinyin: "láng tūn hǔ yàn", pos: "idiom", definition: "to wolf down food; to eat ravenously (like a wolf swallowing, tiger gulping)" },
        { hanzi: "细嚼慢咽", pinyin: "xì jiáo màn yàn", pos: "idiom", definition: "to chew carefully and swallow slowly; to eat slowly and thoroughly" },
        { hanzi: "酒肉朋友", pinyin: "jiǔ ròu péng you", pos: "idiom", definition: "fair-weather friend; drinking and eating companion (not a true friend)" },
        { hanzi: "民以食为天", pinyin: "mín yǐ shí wéi tiān", pos: "idiom", definition: "food is the paramount necessity of the people; food comes first" },
        { hanzi: "粗茶淡饭", pinyin: "cū chá dàn fàn", pos: "idiom", definition: "coarse tea and plain rice; simple, frugal food; a simple lifestyle" },
        { hanzi: "画饼充饥", pinyin: "huà bǐng chōng jī", pos: "idiom", definition: "to draw a cake to satisfy hunger; to comfort oneself with illusions" },
        { hanzi: "酸甜苦辣", pinyin: "suān tián kǔ là", pos: "idiom", definition: "sour, sweet, bitter, and spicy; the full range of life's experiences" },
        { hanzi: "五味杂陈", pinyin: "wǔ wèi zá chén", pos: "idiom", definition: "a mixture of feelings; complex emotions (lit. five flavors mixed together)" },
        { hanzi: "苦尽甘来", pinyin: "kǔ jìn gān lái", pos: "idiom", definition: "after bitterness comes sweetness; good times follow hard times" },
        { hanzi: "甜言蜜语", pinyin: "tián yán mì yǔ", pos: "idiom", definition: "sweet words and honeyed phrases; honeyed words; flattery" },
        { hanzi: "同甘共苦", pinyin: "tóng gān gòng kǔ", pos: "idiom", definition: "to share joys and sorrows; to stick together through thick and thin" },
        { hanzi: "趁热打铁", pinyin: "chèn rè dǎ tiě", pos: "idiom", definition: "strike while the iron is hot; act while conditions are favorable" },
        { hanzi: "火上浇油", pinyin: "huǒ shàng jiāo yóu", pos: "idiom", definition: "to pour oil on the fire; to make a bad situation worse" },
        { hanzi: "半斤八两", pinyin: "bàn jīn bā liǎng", pos: "idiom", definition: "six of one, half a dozen of the other; much the same" },
      ],
    },
    {
      id: "food-idioms-expressions",
      label: "Common Expressions",
      words: [
        { hanzi: "吃醋", pinyin: "chī cù", pos: "phrase", definition: "to be jealous (lit. to eat vinegar)" },
        { hanzi: "吃苦", pinyin: "chī kǔ", pos: "phrase", definition: "to endure hardship; to suffer (lit. to eat bitterness)" },
        { hanzi: "吃亏", pinyin: "chī kuī", pos: "phrase", definition: "to suffer a loss; to be at a disadvantage (lit. to eat a deficit)" },
        { hanzi: "吃惊", pinyin: "chī jīng", pos: "phrase", definition: "to be startled; to be shocked (lit. to eat a fright)" },
        { hanzi: "喝西北风", pinyin: "hē xī běi fēng", pos: "phrase", definition: "to go hungry; to have nothing to eat (lit. to drink the northwest wind)" },
        { hanzi: "饭碗", pinyin: "fàn wǎn", pos: "noun", definition: "rice bowl; job; livelihood (lit. rice bowl)" },
        { hanzi: "铁饭碗", pinyin: "tiě fàn wǎn", pos: "phrase", definition: "iron rice bowl; secure, permanent job (government position)" },
        { hanzi: "打牙祭", pinyin: "dǎ yá jì", pos: "phrase", definition: "to have a special meal; to treat oneself to good food" },
        { hanzi: "下馆子", pinyin: "xià guǎn zi", pos: "phrase", definition: "to eat out at a restaurant; to dine out" },
        { hanzi: "开小灶", pinyin: "kāi xiǎo zào", pos: "phrase", definition: "to give special treatment; to cook a separate meal for someone (to favor someone)" },
        { hanzi: "吃软饭", pinyin: "chī ruǎn fàn", pos: "phrase", definition: "to live off a woman; to be a kept man (lit. to eat soft rice)" },
        { hanzi: "一锅端", pinyin: "yī guō duān", pos: "phrase", definition: "to wipe out in one go; to deal with everything at once" },
      ],
    },
  ],
};

// ─── 23. Household & Furniture ────────────────────────────────────────────────
const household: VocabTheme = {
  id: "household",
  label: "Household & Furniture",
  emoji: "🛋️",
  subcategories: [
    {
      id: "household-rooms",
      label: "Rooms",
      words: [
        { hanzi: "客厅", pinyin: "kè tīng", pos: "noun", definition: "living room; sitting room" },
        { hanzi: "卧室", pinyin: "wò shì", pos: "noun", definition: "bedroom" },
        { hanzi: "厨房", pinyin: "chú fáng", pos: "noun", definition: "kitchen" },
        { hanzi: "卫生间", pinyin: "wèi shēng jiān", pos: "noun", definition: "bathroom; restroom; toilet" },
        { hanzi: "书房", pinyin: "shū fáng", pos: "noun", definition: "study; home office" },
        { hanzi: "阳台", pinyin: "yáng tái", pos: "noun", definition: "balcony; terrace" },
        { hanzi: "地下室", pinyin: "dì xià shì", pos: "noun", definition: "basement; cellar" },
        { hanzi: "走廊", pinyin: "zǒu láng", pos: "noun", definition: "corridor; hallway; passage" },
      ],
    },
    {
      id: "household-furniture",
      label: "Furniture & Appliances",
      words: [
        { hanzi: "床", pinyin: "chuáng", pos: "noun", definition: "bed" },
        { hanzi: "沙发", pinyin: "shā fā", pos: "noun", definition: "sofa; couch" },
        { hanzi: "桌子", pinyin: "zhuō zi", pos: "noun", definition: "table; desk" },
        { hanzi: "椅子", pinyin: "yǐ zi", pos: "noun", definition: "chair" },
        { hanzi: "书架", pinyin: "shū jià", pos: "noun", definition: "bookshelf; bookcase" },
        { hanzi: "衣柜", pinyin: "yī guì", pos: "noun", definition: "wardrobe; closet" },
        { hanzi: "冰箱", pinyin: "bīng xiāng", pos: "noun", definition: "refrigerator; fridge" },
        { hanzi: "洗衣机", pinyin: "xǐ yī jī", pos: "noun", definition: "washing machine" },
        { hanzi: "微波炉", pinyin: "wēi bō lú", pos: "noun", definition: "microwave oven" },
        { hanzi: "电视", pinyin: "diàn shì", pos: "noun", definition: "television; TV" },
        { hanzi: "热水器", pinyin: "rè shuǐ qì", pos: "noun", definition: "water heater; boiler" },
        { hanzi: "窗帘", pinyin: "chuāng lián", pos: "noun", definition: "curtains; window blinds" },
        { hanzi: "地毯", pinyin: "dì tǎn", pos: "noun", definition: "carpet; rug" },
        { hanzi: "台灯", pinyin: "tái dēng", pos: "noun", definition: "desk lamp; table lamp" },
        { hanzi: "镜子", pinyin: "jìng zi", pos: "noun", definition: "mirror" },
        { hanzi: "花瓶", pinyin: "huā píng", pos: "noun", definition: "vase; flower vase" },
        { hanzi: "垃圾桶", pinyin: "lā jī tǒng", pos: "noun", definition: "trash can; garbage bin; rubbish bin" },
        { hanzi: "马桶", pinyin: "mǎ tǒng", pos: "noun", definition: "toilet; flush toilet" },
        { hanzi: "浴缸", pinyin: "yù gāng", pos: "noun", definition: "bathtub" },
        { hanzi: "淋浴", pinyin: "lín yù", pos: "noun", definition: "shower; to take a shower" },
        { hanzi: "插座", pinyin: "chā zuò", pos: "noun", definition: "electrical outlet; power socket" },
        { hanzi: "窗户", pinyin: "chuāng hu", pos: "noun", definition: "window" },
      ],
    },
  ],
};

// ─── 24. Emergencies & Safety ─────────────────────────────────────────────────
const emergencies: VocabTheme = {
  id: "emergencies",
  label: "Emergencies & Safety",
  emoji: "🚨",
  subcategories: [
    {
      id: "emergency-calls",
      label: "Emergency Services",
      words: [
        { hanzi: "救命", pinyin: "jiù mìng", pos: "intj", definition: "Help! Save me! (emergency cry for help)" },
        { hanzi: "火警", pinyin: "huǒ jǐng", pos: "noun", definition: "fire alarm; fire emergency" },
        { hanzi: "报警", pinyin: "bào jǐng", pos: "verb", definition: "to call the police; to report an emergency" },
        { hanzi: "消防员", pinyin: "xiāo fáng yuán", pos: "noun", definition: "firefighter; fireman" },
        { hanzi: "警察", pinyin: "jǐng chá", pos: "noun", definition: "police; police officer" },
        { hanzi: "急诊室", pinyin: "jí zhěn shì", pos: "noun", definition: "emergency room; ER" },
        { hanzi: "灭火器", pinyin: "miè huǒ qì", pos: "noun", definition: "fire extinguisher" },
        { hanzi: "安全出口", pinyin: "ān quán chū kǒu", pos: "noun", definition: "emergency exit; fire exit" },
        { hanzi: "逃生", pinyin: "táo shēng", pos: "verb", definition: "to escape; to flee for one's life" },
        { hanzi: "紧急联系人", pinyin: "jǐn jí lián xì rén", pos: "noun", definition: "emergency contact person" },
      ],
    },
    {
      id: "emergency-safety",
      label: "Safety & Hazards",
      words: [
        { hanzi: "危险", pinyin: "wēi xiǎn", pos: "adj", definition: "dangerous; hazardous; risky" },
        { hanzi: "安全", pinyin: "ān quán", pos: "adj", definition: "safe; secure; safety" },
        { hanzi: "小心", pinyin: "xiǎo xīn", pos: "verb", definition: "be careful; watch out; take care" },
        { hanzi: "注意", pinyin: "zhù yì", pos: "verb", definition: "pay attention; be careful; notice" },
        { hanzi: "禁止", pinyin: "jìn zhǐ", pos: "verb", definition: "to prohibit; to forbid; no..." },
        { hanzi: "地震", pinyin: "dì zhèn", pos: "noun", definition: "earthquake" },
        { hanzi: "洪水", pinyin: "hóng shuǐ", pos: "noun", definition: "flood; floodwater" },
        { hanzi: "火灾", pinyin: "huǒ zāi", pos: "noun", definition: "fire (disaster); conflagration" },
        { hanzi: "事故", pinyin: "shì gù", pos: "noun", definition: "accident; incident; mishap" },
        { hanzi: "受伤", pinyin: "shòu shāng", pos: "verb", definition: "to be injured; to get hurt" },
        { hanzi: "骨折", pinyin: "gǔ zhé", pos: "noun", definition: "fracture; broken bone" },
        { hanzi: "出血", pinyin: "chū xuè", pos: "verb", definition: "to bleed; bleeding" },
        { hanzi: "中毒", pinyin: "zhòng dú", pos: "verb", definition: "to be poisoned; poisoning" },
        { hanzi: "溺水", pinyin: "nì shuǐ", pos: "verb", definition: "to drown; drowning" },
        { hanzi: "心肺复苏", pinyin: "xīn fèi fù sū", pos: "noun", definition: "CPR; cardiopulmonary resuscitation" },
        { hanzi: "绷带", pinyin: "bēng dài", pos: "noun", definition: "bandage; dressing" },
        { hanzi: "监控", pinyin: "jiān kòng", pos: "noun", definition: "surveillance; CCTV monitoring" },
        { hanzi: "防盗", pinyin: "fáng dào", pos: "verb", definition: "to prevent theft; anti-theft" },
        { hanzi: "保险箱", pinyin: "bǎo xiǎn xiāng", pos: "noun", definition: "safe; strongbox" },
        { hanzi: "急救包", pinyin: "jí jiù bāo", pos: "noun", definition: "first aid kit" },
      ],
    },
  ],
};

// ─── 25. Social Interactions & Greetings ──────────────────────────────────────
const socialGreetings: VocabTheme = {
  id: "social-greetings",
  label: "Social Interactions & Greetings",
  emoji: "👋",
  subcategories: [
    {
      id: "social-greetings-basic",
      label: "Basic Greetings",
      words: [
        { hanzi: "你好", pinyin: "nǐ hǎo", pos: "phrase", definition: "hello; hi (standard greeting)" },
        { hanzi: "您好", pinyin: "nín hǎo", pos: "phrase", definition: "hello (polite/formal form)" },
        { hanzi: "早上好", pinyin: "zǎo shàng hǎo", pos: "phrase", definition: "good morning" },
        { hanzi: "下午好", pinyin: "xià wǔ hǎo", pos: "phrase", definition: "good afternoon" },
        { hanzi: "晚上好", pinyin: "wǎn shàng hǎo", pos: "phrase", definition: "good evening" },
        { hanzi: "晚安", pinyin: "wǎn ān", pos: "phrase", definition: "good night" },
        { hanzi: "再见", pinyin: "zài jiàn", pos: "phrase", definition: "goodbye; see you again" },
        { hanzi: "拜拜", pinyin: "bāi bāi", pos: "phrase", definition: "bye-bye; goodbye (informal)" },
        { hanzi: "回头见", pinyin: "huí tóu jiàn", pos: "phrase", definition: "see you later; talk later" },
        { hanzi: "保重", pinyin: "bǎo zhòng", pos: "phrase", definition: "take care; look after yourself" },
        { hanzi: "好久不见", pinyin: "hǎo jiǔ bù jiàn", pos: "phrase", definition: "long time no see" },
        { hanzi: "最近怎么样", pinyin: "zuì jìn zěn me yàng", pos: "phrase", definition: "how have you been lately?" },
      ],
    },
    {
      id: "social-polite",
      label: "Polite Expressions",
      words: [
        { hanzi: "谢谢", pinyin: "xiè xie", pos: "phrase", definition: "thank you; thanks" },
        { hanzi: "非常感谢", pinyin: "fēi cháng gǎn xiè", pos: "phrase", definition: "thank you very much; many thanks" },
        { hanzi: "不客气", pinyin: "bù kè qi", pos: "phrase", definition: "you're welcome; don't mention it" },
        { hanzi: "对不起", pinyin: "duì bu qǐ", pos: "phrase", definition: "I'm sorry; excuse me; I apologize" },
        { hanzi: "没关系", pinyin: "méi guān xi", pos: "phrase", definition: "it doesn't matter; never mind; that's OK" },
        { hanzi: "请", pinyin: "qǐng", pos: "verb", definition: "please; to invite; to treat (to a meal)" },
        { hanzi: "麻烦你", pinyin: "má fan nǐ", pos: "phrase", definition: "sorry to trouble you; may I ask you to..." },
        { hanzi: "打扰一下", pinyin: "dǎ rǎo yī xià", pos: "phrase", definition: "excuse me (to get attention); sorry to interrupt" },
        { hanzi: "没问题", pinyin: "méi wèn tí", pos: "phrase", definition: "no problem; sure; that's fine" },
        { hanzi: "随便", pinyin: "suí biàn", pos: "phrase", definition: "as you like; whatever; it doesn't matter" },
        { hanzi: "当然", pinyin: "dāng rán", pos: "adv", definition: "of course; certainly; naturally" },
        { hanzi: "好的", pinyin: "hǎo de", pos: "phrase", definition: "OK; alright; sure" },
        { hanzi: "行", pinyin: "xíng", pos: "phrase", definition: "OK; alright; that works; capable" },
        { hanzi: "不行", pinyin: "bù xíng", pos: "phrase", definition: "no; not OK; that won't do" },
        { hanzi: "算了", pinyin: "suàn le", pos: "phrase", definition: "forget it; never mind; let it go" },
        { hanzi: "幸会", pinyin: "xìng huì", pos: "phrase", definition: "nice to meet you; it's an honor to meet you (formal)" },
        { hanzi: "久仰", pinyin: "jiǔ yǎng", pos: "phrase", definition: "I've long admired you; I've heard a lot about you (formal)" },
        { hanzi: "请多关照", pinyin: "qǐng duō guān zhào", pos: "phrase", definition: "please take care of me; I'm in your care (used when meeting someone new)" },
      ],
    },
  ],
};

// ─── Export ───────────────────────────────────────────────────────────────────
export const ALL_THEMES: VocabTheme[] = [
  food,
  travel,
  hotel,
  hobbies,
  tea,
  cooking,
  education,
  shopping,
  dayToDay,
  health,
  weather,
  timeNumbers,
  work,
  technology,
  animals,
  festivals,
  emotions,
  clothing,
  transportation,
  artMusic,
  sportsGames,
  foodIdioms,
  household,
  emergencies,
  socialGreetings,
];
/** Flat list of all words across all themes (for flashcard source) */
export function getAllVocabWords(): Array<VocabWord & { themeId: string; subcategoryId: string }> {
  const result: Array<VocabWord & { themeId: string; subcategoryId: string }> = [];
  for (const theme of ALL_THEMES) {
    for (const sub of theme.subcategories) {
      for (const word of sub.words) {
        result.push({ ...word, themeId: theme.id, subcategoryId: sub.id });
      }
    }
  }
  return result;
}
/** Total word count across all themes */
export const TOTAL_VOCAB_WORDS = getAllVocabWords().length;

// Auto-generated grammar lesson data — DO NOT EDIT MANUALLY
// 105 lessons across 6 HSK bands with 334+ exercises

export type GrammarBand = 'HSK3-I' | 'HSK3-II' | 'HSK4-I' | 'HSK4-II' | 'HSK5-I' | 'HSK5-II';

export type ExerciseType =
  | 'fill-blank'
  | 'reorder'
  | 'choose-connector'
  | 'rewrite'
  | 'translate'
  | 'error-correction';

export interface GrammarExercise {
  id: string;
  type: ExerciseType;
  prompt?: string;          // fill-blank / error-correction (older format)
  question?: string;        // fill-blank / translate (newer format)
  options?: string[];       // choose-connector
  words?: string[];         // reorder
  answer: string;
  explanation?: string;
  hint?: string;
  direction?: 'en-to-cn' | 'cn-to-en'; // translate
}

export interface GrammarExample {
  chinese: string;
  pinyin: string;
  english: string;
  highlight?: string;
}

export interface CommonMistake {
  description: string;
  wrongExample: string;
  correctExample: string;
  explanation: string;
}

export interface GrammarLesson {
  id: string;
  band: GrammarBand;
  order: number;
  title: string;
  subtitle: string;
  formula: string;
  explanation: string;
  usageRules: string[];
  examples: GrammarExample[];
  commonMistake: CommonMistake;
  comparison?: { structure: string; difference: string };
  appearsInTexts?: string[];
  exercises: GrammarExercise[];
}

export const GRAMMAR_BAND_META: Record<GrammarBand, { label: string; description: string; color: string }> = {
  'HSK3-I':  { label: 'HSK 3 – I',  description: 'Foundational grammar structures', color: 'amber' },
  'HSK3-II': { label: 'HSK 3 – II', description: 'Expanded sentence patterns',      color: 'orange' },
  'HSK4-I':  { label: 'HSK 4 – I',  description: 'Intermediate connectors',         color: 'teal' },
  'HSK4-II': { label: 'HSK 4 – II', description: 'Advanced intermediate patterns',  color: 'cyan' },
  'HSK5-I':  { label: 'HSK 5 – I',  description: 'Formal written structures',       color: 'indigo' },
  'HSK5-II': { label: 'HSK 5 – II', description: 'Rhetorical & literary patterns',  color: 'violet' },
};

export const ALL_GRAMMAR_LESSONS: GrammarLesson[] = 
[
  {
    "id": "hsk3i-le-01",
    "band": "HSK3-I",
    "order": 1,
    "title": "Completed Actions with 了 (le)",
    "subtitle": "Indicates the completion of an action.",
    "formula": "Subject + Verb + 了 + Object",
    "explanation": "The particle 了 (le) is commonly used after a verb to indicate that an action has been completed. It focuses on the result or completion of the action, rather than the duration or ongoing nature. This usage is fundamental for expressing past events or changes in state.",
    "usageRules": [
      "Placed immediately after the verb.",
      "Often used with specific time expressions (e.g., 昨天, 去年).",
      "Can be followed by an object, sometimes with a quantity or measure word.",
      "Not used for habitual or ongoing actions."
    ],
    "examples": [
      {
        "chinese": "我吃了饭。",
        "pinyin": "Wǒ chī le fàn.",
        "english": "I ate the meal.",
        "highlight": "吃了"
      },
      {
        "chinese": "他买了一本书。",
        "pinyin": "Tā mǎi le yī běn shū.",
        "english": "He bought a book.",
        "highlight": "买了一本"
      },
      {
        "chinese": "我们昨天看了电影。",
        "pinyin": "Wǒmen zuótiān kàn le diànyǐng.",
        "english": "We watched a movie yesterday.",
        "highlight": "看了"
      },
      {
        "chinese": "她学会了游泳。",
        "pinyin": "Tā xué huì le yóuyǒng.",
        "english": "She learned how to swim.",
        "highlight": "学会了"
      },
      {
        "chinese": "我喝了两杯咖啡。",
        "pinyin": "Wǒ hē le liǎng bēi kāfēi.",
        "english": "I drank two cups of coffee.",
        "highlight": "喝了两杯"
      },
      {
        "chinese": "老师讲了语法。",
        "pinyin": "Lǎoshī jiǎng le yǔfǎ.",
        "english": "The teacher explained the grammar.",
        "highlight": "讲了"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 了 (le) when the action is still ongoing or habitual. 了 (le) specifically marks completion, not continuous action. For ongoing actions, other structures like 在 (zài) are used.",
      "wrongExample": "我每天吃了早饭。",
      "correctExample": "我每天吃早饭。",
      "explanation": "The first sentence implies that eating breakfast is a completed action every day, which is grammatically incorrect for a habitual action. The second sentence correctly states a daily habit without implying completion for each instance."
    },
    "exercises":     [
        {
            "id": "hsk3i-le-01-ex1",
            "type": "fill-blank",
            "question": "我昨天___了一本书。",
            "answer": "买",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-le-01-ex2",
            "type": "fill-blank",
            "question": "他___了饭。",
            "answer": "吃",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-le-01-ex3",
            "type": "fill-blank",
            "question": "我们___了电影。",
            "answer": "看",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-le-01-ex4",
            "type": "fill-blank",
            "question": "她___了苹果。",
            "answer": "吃",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-le-01-ex5",
            "type": "fill-blank",
            "question": "我___了水。",
            "answer": "喝",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-le-01-ex6",
            "type": "reorder",
            "words": [
                "看完",
                "书",
                "了",
                "他",
                "把"
            ],
            "answer": "他把书看完了。",
            "hint": "把 structure: Subject + 把 + Object + Verb + Complement"
        },
        {
            "id": "hsk3i-le-01-ex7",
            "type": "reorder",
            "words": [
                "吃",
                "了",
                "我",
                "饭"
            ],
            "answer": "我吃饭了。",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-le-01-ex8",
            "type": "reorder",
            "words": [
                "她",
                "了",
                "昨天",
                "电影",
                "看"
            ],
            "answer": "她昨天看电影了。",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-le-01-ex9",
            "type": "reorder",
            "words": [
                "北京",
                "去",
                "你",
                "过",
                "吗"
            ],
            "answer": "你去过北京吗？",
            "hint": "Past Experience with 过"
        },
        {
            "id": "hsk3i-le-01-ex10",
            "type": "reorder",
            "words": [
                "正在",
                "呢",
                "电视",
                "他",
                "看"
            ],
            "answer": "他正在看电视呢。",
            "hint": "Actions in Progress with 在"
        },
        {
            "id": "hsk3i-le-01-ex11",
            "type": "translate",
            "question": "She has already eaten.",
            "answer": "她已经吃了。",
            "direction": "en-to-cn",
            "hint": "Use 了 for completed action"
        },
        {
            "id": "hsk3i-le-01-ex12",
            "type": "translate",
            "question": "I have eaten Chinese food.",
            "answer": "我吃过中国菜。",
            "direction": "en-to-cn",
            "hint": "Past Experience with 过"
        },
        {
            "id": "hsk3i-le-01-ex13",
            "type": "translate",
            "question": "He is watching TV.",
            "answer": "他正在看电视。",
            "direction": "en-to-cn",
            "hint": "Actions in Progress with 在"
        },
        {
            "id": "hsk3i-le-01-ex14",
            "type": "translate",
            "question": "今天比昨天冷。",
            "answer": "Today is colder than yesterday.",
            "direction": "cn-to-en",
            "hint": "Comparison with 比"
        },
        {
            "id": "hsk3i-le-01-ex15",
            "type": "translate",
            "question": "因为下雨了，所以我没去公园。",
            "answer": "Because it rained, I didn't go to the park.",
            "direction": "cn-to-en",
            "hint": "Cause and Effect with 因为…所以…"
        }
    ]
  },
  {
    "id": "hsk3i-guo-02",
    "band": "HSK3-I",
    "order": 2,
    "title": "Past Experience with 过 (guò)",
    "subtitle": "Indicates that an action has been experienced in the past.",
    "formula": "Subject + Verb + 过 + Object",
    "explanation": "The particle 过 (guò) is placed after a verb to indicate that an action has occurred at least once in the past, emphasizing the experience rather than the completion of a specific event. It often implies that the experience is no longer ongoing or relevant to the present, but rather a past occurrence.",
    "usageRules": [
      "Placed immediately after the verb.",
      "Often used with '没有' (méiyǒu) to negate past experience.",
      "Focuses on whether an action has ever happened.",
      "Cannot be followed by a specific time when the action occurred."
    ],
    "examples": [
      {
        "chinese": "我吃过中国菜。",
        "pinyin": "Wǒ chī guò Zhōngguó cài.",
        "english": "I have eaten Chinese food.",
        "highlight": "吃过"
      },
      {
        "chinese": "他去过北京。",
        "pinyin": "Tā qù guò Běijīng.",
        "english": "He has been to Beijing.",
        "highlight": "去过"
      },
      {
        "chinese": "你听过这首歌吗？",
        "pinyin": "Nǐ tīng guò zhè shǒu gē ma?",
        "english": "Have you heard this song before?",
        "highlight": "听过"
      },
      {
        "chinese": "我没看过这部电影。",
        "pinyin": "Wǒ méi kàn guò zhè bù diànyǐng.",
        "english": "I haven't seen this movie.",
        "highlight": "没看过"
      },
      {
        "chinese": "她学过法语。",
        "pinyin": "Tā xué guò Fǎyǔ.",
        "english": "She has studied French.",
        "highlight": "学过"
      },
      {
        "chinese": "我们以前见过面。",
        "pinyin": "Wǒmen yǐqián jiàn guò miàn.",
        "english": "We have met before.",
        "highlight": "见过"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to confuse 过 (guò) with 了 (le). While both relate to past actions, 过 (guò) emphasizes the experience of having done something at some point, without specifying completion or a result. 了 (le) indicates the completion of a specific action.",
      "wrongExample": "我昨天去过商店。",
      "correctExample": "我昨天去了商店。",
      "explanation": "过 (guò) is generally not used with specific past time expressions like '昨天' (zuótiān) because it focuses on an indefinite past experience. 了 (le) is appropriate for a completed action at a specific past time."
    },
    "comparison": {
      "structure": "了 (le) vs. 过 (guò)",
      "difference": "了 (le) indicates completion of an action at a specific time, often with a result. 过 (guò) indicates past experience, emphasizing that an action has occurred at some point in the past, without focusing on completion or result."
    },
    "exercises":     [
        {
            "id": "hsk3i-guo-02-ex1",
            "type": "fill-blank",
            "question": "我___过北京。",
            "answer": "去",
            "hint": "Use 过 for past experience"
        },
        {
            "id": "hsk3i-guo-02-ex2",
            "type": "fill-blank",
            "question": "他没有___过日本菜。",
            "answer": "吃",
            "hint": "Use 过 with negation 没有"
        },
        {
            "id": "hsk3i-guo-02-ex3",
            "type": "fill-blank",
            "question": "你___过这本书吗？",
            "answer": "看",
            "hint": "Use 过 in a question"
        },
        {
            "id": "hsk3i-guo-02-ex4",
            "type": "fill-blank",
            "question": "她___过很多国家。",
            "answer": "去",
            "hint": "Use 过 for past experience"
        },
        {
            "id": "hsk3i-guo-02-ex5",
            "type": "fill-blank",
            "question": "我们以前___过这首歌。",
            "answer": "唱",
            "hint": "Use 过 for past experience"
        },
        {
            "id": "hsk3i-guo-02-ex1",
            "type": "reorder",
            "words": [
                "北京",
                "去",
                "我",
                "过"
            ],
            "answer": "我去过北京。",
            "hint": "Subject + Verb + 过 + Object"
        },
        {
            "id": "hsk3i-guo-02-ex2",
            "type": "reorder",
            "words": [
                "日本菜",
                "没有",
                "他",
                "吃",
                "过"
            ],
            "answer": "他没有吃过日本菜。",
            "hint": "Subject + 没有 + Verb + 过 + Object"
        },
        {
            "id": "hsk3i-guo-02-ex3",
            "type": "reorder",
            "words": [
                "这",
                "你",
                "书",
                "过",
                "本",
                "吗",
                "看"
            ],
            "answer": "你看过这本书吗？",
            "hint": "Subject + Verb + 过 + Object + 吗"
        },
        {
            "id": "hsk3i-guo-02-ex4",
            "type": "reorder",
            "words": [
                "她",
                "很多",
                "过",
                "国家",
                "去"
            ],
            "answer": "她去过很多国家。",
            "hint": "Subject + Verb + 过 + Object"
        },
        {
            "id": "hsk3i-guo-02-ex5",
            "type": "reorder",
            "words": [
                "我们",
                "以前",
                "过",
                "这首歌",
                "唱"
            ],
            "answer": "我们以前唱过这首歌。",
            "hint": "Subject + 以前 + Verb + 过 + Object"
        },
        {
            "id": "hsk3i-guo-02-ex1",
            "type": "translate",
            "question": "I have eaten Chinese food.",
            "answer": "我吃过中国菜。",
            "direction": "en-to-cn",
            "hint": "Translate using 过 for past experience"
        },
        {
            "id": "hsk3i-guo-02-ex2",
            "type": "translate",
            "question": "He has been to Beijing.",
            "answer": "他去过北京。",
            "direction": "en-to-cn",
            "hint": "Translate using 过 for past experience"
        },
        {
            "id": "hsk3i-guo-02-ex3",
            "type": "translate",
            "question": "你看过这本书吗？",
            "answer": "Have you read this book before?",
            "direction": "cn-to-en",
            "hint": "Translate using 过 for past experience"
        },
        {
            "id": "hsk3i-guo-02-ex4",
            "type": "translate",
            "question": "She has visited many countries.",
            "answer": "她去过很多国家。",
            "direction": "en-to-cn",
            "hint": "Translate using 过 for past experience"
        },
        {
            "id": "hsk3i-guo-02-ex5",
            "type": "translate",
            "question": "我们以前唱过这首歌。",
            "answer": "We have sung this song before.",
            "direction": "cn-to-en",
            "hint": "Translate using 过 for past experience"
        }
    ]
  },
  {
    "id": "hsk3i-zai-03",
    "band": "HSK3-I",
    "order": 3,
    "title": "Actions in Progress with 在 (zài)",
    "subtitle": "Indicates an action is currently happening or in progress.",
    "formula": "Subject + 在 + Verb (+ Object)",
    "explanation": "The adverb 在 (zài) is placed before a verb to indicate that an action is currently ongoing or in progress. It is similar to the \"-ing\" form in English and emphasizes the continuous nature of the action. It can often be used with 呢 (ne) at the end of the sentence for added emphasis.",
    "usageRules": [
      "Placed before the verb.",
      "Can be used with 呢 (ne) at the end of the sentence.",
      "Often used with time expressions indicating the present moment (e.g., 现在, 正在).",
      "Cannot be used with stative verbs or verbs that express a state of being."
    ],
    "examples": [
      {
        "chinese": "我正在吃饭。",
        "pinyin": "Wǒ zhèngzài chī fàn.",
        "english": "I am eating.",
        "highlight": "正在吃"
      },
      {
        "chinese": "他正在看电视呢。",
        "pinyin": "Tā zhèngzài kàn diànshì ne.",
        "english": "He is watching TV.",
        "highlight": "正在看"
      },
      {
        "chinese": "他们在学习汉语。",
        "pinyin": "Tāmen zài xuéxí Hànyǔ.",
        "english": "They are studying Chinese.",
        "highlight": "在学习"
      },
      {
        "chinese": "你现在在做什么？",
        "pinyin": "Nǐ xiànzài zài zuò shénme?",
        "english": "What are you doing now?",
        "highlight": "在做什么"
      },
      {
        "chinese": "老师在讲课。",
        "pinyin": "Lǎoshī zài jiǎngkè.",
        "english": "The teacher is lecturing.",
        "highlight": "在讲课"
      },
      {
        "chinese": "她在家在看书。",
        "pinyin": "Tā zài jiā zài kàn shū.",
        "english": "She is reading at home.",
        "highlight": "在看书"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to confuse the progressive 在 (zài) with the prepositional 在 (zài) meaning \"at\" or \"in\". While both use the same character, their grammatical functions are different. The progressive 在 (zài) always precedes a verb, indicating an ongoing action.",
      "wrongExample": "我在家。",
      "correctExample": "我正在家看书。",
      "explanation": "The first sentence uses 在 (zài) as a preposition indicating location. To express an ongoing action at home, the progressive 在 (zài) should be used before the verb, as in the second sentence."
    },
    "comparison": {
      "structure": "在 (progressive) vs. 在 (preposition)",
      "difference": "The progressive 在 (zài) indicates an action in progress and precedes a verb. The prepositional 在 (zài) indicates location and precedes a noun or pronoun."
    },
    "exercises":     [
        {
            "id": "hsk3i-guo-ex1-ex1",
            "type": "fill-blank",
            "question": "我昨天___了一本书。",
            "answer": "买",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-guo-ex1-ex2",
            "type": "fill-blank",
            "question": "他___了饭。",
            "answer": "吃",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-guo-ex1-ex3",
            "type": "fill-blank",
            "question": "我们___了电影。",
            "answer": "看",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-guo-ex1-ex4",
            "type": "fill-blank",
            "question": "她___了苹果。",
            "answer": "吃",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-guo-ex1-ex5",
            "type": "fill-blank",
            "question": "我___了水。",
            "answer": "喝",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-guo-ex1-ex6",
            "type": "reorder",
            "words": [
                "了",
                "书",
                "看完",
                "把",
                "他"
            ],
            "answer": "他把书看完了。",
            "hint": "把 structure: Subject + 把 + Object + Verb + Complement"
        },
        {
            "id": "hsk3i-guo-ex1-ex7",
            "type": "reorder",
            "words": [
                "了",
                "饭",
                "吃",
                "我"
            ],
            "answer": "我吃饭了。",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-guo-ex1-ex8",
            "type": "reorder",
            "words": [
                "昨天",
                "了",
                "看",
                "电影",
                "她"
            ],
            "answer": "她昨天看电影了。",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-guo-ex1-ex9",
            "type": "reorder",
            "words": [
                "去",
                "北京",
                "吗",
                "你",
                "过"
            ],
            "answer": "你去过北京吗？",
            "hint": "Past Experience with 过"
        },
        {
            "id": "hsk3i-guo-ex1-ex10",
            "type": "reorder",
            "words": [
                "呢",
                "看",
                "他",
                "正在",
                "电视"
            ],
            "answer": "他正在看电视呢。",
            "hint": "Actions in Progress with 在"
        },
        {
            "id": "hsk3i-guo-ex1-ex11",
            "type": "translate",
            "question": "She has already eaten.",
            "answer": "她已经吃了。",
            "direction": "en-to-cn",
            "hint": "Use 了 for completed action"
        },
        {
            "id": "hsk3i-guo-ex1-ex12",
            "type": "translate",
            "question": "I have eaten Chinese food.",
            "answer": "我吃过中国菜。",
            "direction": "en-to-cn",
            "hint": "Past Experience with 过"
        },
        {
            "id": "hsk3i-guo-ex1-ex13",
            "type": "translate",
            "question": "He is watching TV.",
            "answer": "他正在看电视。",
            "direction": "en-to-cn",
            "hint": "Actions in Progress with 在"
        },
        {
            "id": "hsk3i-guo-ex1-ex14",
            "type": "translate",
            "question": "今天比昨天冷。",
            "answer": "Today is colder than yesterday.",
            "direction": "cn-to-en",
            "hint": "Comparison with 比"
        },
        {
            "id": "hsk3i-guo-ex1-ex15",
            "type": "translate",
            "question": "因为下雨了，所以我没去公园。",
            "answer": "Because it rained, I didn't go to the park.",
            "direction": "cn-to-en",
            "hint": "Cause and Effect with 因为…所以…"
        }
    ]
  },
  {
    "id": "hsk3i-bi-04",
    "band": "HSK3-I",
    "order": 4,
    "title": "Comparison with 比 (bǐ)",
    "subtitle": "Used to compare two entities based on an adjective or verb.",
    "formula": "A + 比 + B + Adjective / Verb Phrase",
    "explanation": "The character 比 (bǐ) is used to make comparisons between two subjects, indicating that one is more or less of a certain quality or action than the other. It's a fundamental structure for expressing differences and similarities in Chinese.",
    "usageRules": [
      "A and B are the two entities being compared.",
      "The adjective or verb phrase follows B.",
      "Adverbs like 更 (gèng) or 还 (hái) can be used before the adjective for stronger comparison.",
      "Negation uses 不比 (bù bǐ), meaning 'not as...as'.",
      "Cannot use 很 (hěn) or other degree adverbs directly before the adjective in a positive comparison."
    ],
    "examples": [
      {
        "chinese": "他比我高。",
        "pinyin": "Tā bǐ wǒ gāo.",
        "english": "He is taller than me.",
        "highlight": "比我高"
      },
      {
        "chinese": "今天比昨天冷。",
        "pinyin": "Jīntiān bǐ zuótiān lěng.",
        "english": "Today is colder than yesterday.",
        "highlight": "比昨天冷"
      },
      {
        "chinese": "她比我学习好。",
        "pinyin": "Tā bǐ wǒ xuéxí hǎo.",
        "english": "She studies better than me.",
        "highlight": "比我学习好"
      },
      {
        "chinese": "这件衣服比那件贵。",
        "pinyin": "Zhè jiàn yīfu bǐ nà jiàn guì.",
        "english": "This piece of clothing is more expensive than that one.",
        "highlight": "比那件贵"
      },
      {
        "chinese": "他比我早来。",
        "pinyin": "Tā bǐ wǒ zǎo lái.",
        "english": "He came earlier than me.",
        "highlight": "比我早来"
      },
      {
        "chinese": "我的中文比你好。",
        "pinyin": "Wǒ de Zhōngwén bǐ nǐ hǎo.",
        "english": "My Chinese is better than yours.",
        "highlight": "比你好"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use degree adverbs like 很 (hěn) or 非常 (fēicháng) directly before the adjective in a positive 比 (bǐ) comparison. These adverbs are generally omitted because 比 (bǐ) itself indicates a degree of difference. For negation, use 不比 (bù bǐ) instead of 不很比 (bù hěn bǐ).",
      "wrongExample": "他比我很高。",
      "correctExample": "他比我高。",
      "explanation": "In 比 (bǐ) comparisons, degree adverbs like 很 (hěn) are not used before the adjective. The comparison itself implies a degree."
    },
    "exercises":     [
    {
            "id": "hsk3i-bi-04-fb1",
            "type": "fill-blank",
            "question": "他___我高。",
            "answer": "比",
            "hint": "Use 比 for comparison"
        },
        {
            "id": "hsk3i-bi-04-fb2",
            "type": "fill-blank",
            "question": "今天___昨天冷。",
            "answer": "比",
            "hint": "A + 比 + B + Adjective"
        },
        {
            "id": "hsk3i-bi-04-fb3",
            "type": "fill-blank",
            "question": "这本书___那本贵。",
            "answer": "比",
            "hint": "Use 比 to compare two things"
        },
        {
            "id": "hsk3i-bi-04-fb4",
            "type": "fill-blank",
            "question": "她的汉语___我好。",
            "answer": "比",
            "hint": "A + 比 + B + Adjective"
        },
        {
            "id": "hsk3i-bi-04-fb5",
            "type": "fill-blank",
            "question": "北京___上海大。",
            "answer": "比",
            "hint": "Use 比 to compare cities"
        },
    
        {
            "id": "hsk3i-bi-04-ex1",
            "type": "reorder",
            "words": [
                "我",
                "他",
                "高",
                "比"
            ],
            "answer": "他比我高。",
            "hint": "A + 比 + B + Adjective"
        },
        {
            "id": "hsk3i-bi-04-ex2",
            "type": "reorder",
            "words": [
                "今天",
                "昨天",
                "冷",
                "比"
            ],
            "answer": "今天比昨天冷。",
            "hint": "A + 比 + B + Adjective"
        },
        {
            "id": "hsk3i-bi-04-ex3",
            "type": "reorder",
            "words": [
                "她",
                "我",
                "学习",
                "好",
                "比"
            ],
            "answer": "她比我学习好。",
            "hint": "A + 比 + B + Verb Phrase"
        },
        {
            "id": "hsk3i-bi-04-ex4",
            "type": "reorder",
            "words": [
                "这件",
                "那件",
                "衣服",
                "贵",
                "比"
            ],
            "answer": "这件衣服比那件贵。",
            "hint": "A + 比 + B + Adjective"
        },
        {
            "id": "hsk3i-bi-04-ex5",
            "type": "reorder",
            "words": [
                "我的",
                "他",
                "汉语",
                "流利",
                "比"
            ],
            "answer": "我的汉语比他流利。",
            "hint": "A + 比 + B + Adjective"
        },
        {
            "id": "hsk3i-bi-04-ex1",
            "type": "translate",
            "question": "He is taller than me.",
            "answer": "他比我高。",
            "direction": "en-to-cn",
            "hint": "Translate using 比 for comparison"
        },
        {
            "id": "hsk3i-bi-04-ex2",
            "type": "translate",
            "question": "今天比昨天冷。",
            "answer": "Today is colder than yesterday.",
            "direction": "cn-to-en",
            "hint": "Translate using 比 for comparison"
        },
        {
            "id": "hsk3i-bi-04-ex3",
            "type": "translate",
            "question": "She studies better than me.",
            "answer": "她比我学习好。",
            "direction": "en-to-cn",
            "hint": "Translate using 比 for comparison"
        },
        {
            "id": "hsk3i-bi-04-ex4",
            "type": "translate",
            "question": "这件衣服比那件贵。",
            "answer": "This dress is more expensive than that one.",
            "direction": "cn-to-en",
            "hint": "Translate using 比 for comparison"
        },
        {
            "id": "hsk3i-bi-04-ex5",
            "type": "translate",
            "question": "My Chinese is more fluent than his.",
            "answer": "我的汉语比他流利。",
            "direction": "en-to-cn",
            "hint": "Translate using 比 for comparison"
        }
    ]
  },
  {
    "id": "hsk3i-yinwei-suoyi-05",
    "band": "HSK3-I",
    "order": 5,
    "title": "Cause and Effect with 因为…所以… (yīnwèi…suǒyǐ…)",
    "subtitle": "Connects a reason with its resulting consequence.",
    "formula": "因为 + Cause, 所以 + Effect.",
    "explanation": "The conjunctions 因为 (yīnwèi) and 所以 (suǒyǐ) are used together to express a cause-and-effect relationship. 因为 introduces the reason or cause, and 所以 introduces the result or consequence. This structure is essential for explaining why something happened or why someone did something.",
    "usageRules": [
      "因为 (yīnwèi) always precedes the cause.",
      "所以 (suǒyǐ) always precedes the effect.",
      "Both can be used together, or sometimes one can be omitted if the context is clear.",
      "The cause usually comes before the effect in the sentence."
    ],
    "examples": [
      {
        "chinese": "因为下雨了，所以我没去公园。",
        "pinyin": "Yīnwèi xià yǔ le, suǒyǐ wǒ méi qù gōngyuán.",
        "english": "Because it rained, I didn't go to the park.",
        "highlight": "因为下雨了，所以我没去"
      },
      {
        "chinese": "因为他生病了，所以不能来上课。",
        "pinyin": "Yīnwèi tā shēng bìng le, suǒyǐ bù néng lái shàngkè.",
        "english": "Because he is sick, he cannot come to class.",
        "highlight": "因为他生病了，所以不能来"
      },
      {
        "chinese": "因为我很忙，所以没有时间休息。",
        "pinyin": "Yīnwèi wǒ hěn máng, suǒyǐ méiyǒu shíjiān xiūxi.",
        "english": "Because I am very busy, I don't have time to rest.",
        "highlight": "因为我很忙，所以没有时间"
      },
      {
        "chinese": "她喜欢中国菜，所以经常去中国饭馆。",
        "pinyin": "Tā xǐhuān Zhōngguó cài, suǒyǐ jīngcháng qù Zhōngguó fànguǎn.",
        "english": "She likes Chinese food, so she often goes to Chinese restaurants.",
        "highlight": "所以经常去"
      },
      {
        "chinese": "因为天气很好，所以我们出去玩了。",
        "pinyin": "Yīnwèi tiānqì hěn hǎo, suǒyǐ wǒmen chūqù wán le.",
        "english": "Because the weather was good, we went out to play.",
        "highlight": "因为天气很好，所以我们出去玩了"
      },
      {
        "chinese": "他很努力，所以成绩很好。",
        "pinyin": "Tā hěn nǔlì, suǒyǐ chéngjì hěn hǎo.",
        "english": "He works hard, so his grades are very good.",
        "highlight": "所以成绩很好"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use only 因为 (yīnwèi) or 所以 (suǒyǐ) when both are needed to clearly express the cause-and-effect relationship, especially in longer sentences. While sometimes one can be omitted, using both makes the relationship explicit.",
      "wrongExample": "因为我喜欢学习汉语，我想去中国。",
      "correctExample": "因为我喜欢学习汉语，所以我想去中国。",
      "explanation": "The first sentence is grammatically acceptable but less clear. Adding 所以 (suǒyǐ) makes the consequence of liking Chinese explicit and improves the flow of the sentence."
    },
    "exercises":     [
        {
            "id": "hsk3i-bi-ex1-ex1",
            "type": "fill-blank",
            "question": "我昨天___了一本书。",
            "answer": "买",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-bi-ex1-ex2",
            "type": "fill-blank",
            "question": "他___了饭。",
            "answer": "吃",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-bi-ex1-ex3",
            "type": "fill-blank",
            "question": "我们___了电影。",
            "answer": "看",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-bi-ex1-ex4",
            "type": "fill-blank",
            "question": "她___了苹果。",
            "answer": "吃",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-bi-ex1-ex5",
            "type": "fill-blank",
            "question": "我___了水。",
            "answer": "喝",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-bi-ex1-ex6",
            "type": "reorder",
            "words": [
                "书",
                "他",
                "看完",
                "把",
                "了"
            ],
            "answer": "他把书看完了。",
            "hint": "把 structure: Subject + 把 + Object + Verb + Complement"
        },
        {
            "id": "hsk3i-bi-ex1-ex7",
            "type": "reorder",
            "words": [
                "了",
                "饭",
                "吃",
                "我"
            ],
            "answer": "我吃饭了。",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-bi-ex1-ex8",
            "type": "reorder",
            "words": [
                "看",
                "电影",
                "她",
                "了",
                "昨天"
            ],
            "answer": "她昨天看电影了。",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-bi-ex1-ex9",
            "type": "reorder",
            "words": [
                "吗",
                "去",
                "过",
                "北京",
                "你"
            ],
            "answer": "你去过北京吗？",
            "hint": "Past Experience with 过"
        },
        {
            "id": "hsk3i-bi-ex1-ex10",
            "type": "reorder",
            "words": [
                "他",
                "电视",
                "呢",
                "看",
                "正在"
            ],
            "answer": "他正在看电视呢。",
            "hint": "Actions in Progress with 在"
        },
        {
            "id": "hsk3i-bi-ex1-ex11",
            "type": "translate",
            "question": "She has already eaten.",
            "answer": "她已经吃了。",
            "direction": "en-to-cn",
            "hint": "Use 了 for completed action"
        },
        {
            "id": "hsk3i-bi-ex1-ex12",
            "type": "translate",
            "question": "I have eaten Chinese food.",
            "answer": "我吃过中国菜。",
            "direction": "en-to-cn",
            "hint": "Past Experience with 过"
        },
        {
            "id": "hsk3i-bi-ex1-ex13",
            "type": "translate",
            "question": "He is watching TV.",
            "answer": "他正在看电视。",
            "direction": "en-to-cn",
            "hint": "Actions in Progress with 在"
        },
        {
            "id": "hsk3i-bi-ex1-ex14",
            "type": "translate",
            "question": "今天比昨天冷。",
            "answer": "Today is colder than yesterday.",
            "direction": "cn-to-en",
            "hint": "Comparison with 比"
        },
        {
            "id": "hsk3i-bi-ex1-ex15",
            "type": "translate",
            "question": "因为下雨了，所以我没去公园。",
            "answer": "Because it rained, I didn't go to the park.",
            "direction": "cn-to-en",
            "hint": "Cause and Effect with 因为…所以…"
        }
    ]
  },
  {
    "id": "hsk3i-suiran-danshi-06",
    "band": "HSK3-I",
    "order": 6,
    "title": "Concession with 虽然…但是… (suīrán…dànshì…)",
    "subtitle": "Expresses a concession or contrast between two clauses.",
    "formula": "虽然 + Clause 1 (concession), 但是 + Clause 2 (contrast).",
    "explanation": "The conjunctions 虽然 (suīrán) and 但是 (dànshì) are used to express a concessive relationship, similar to \"although...but...\" in English. 虽然 introduces a fact or situation, and 但是 introduces a contrasting or unexpected outcome. This structure is crucial for expressing complex ideas and nuances.",
    "usageRules": [
      "虽然 (suīrán) introduces the concession or premise.",
      "但是 (dànshì) introduces the contrasting or main clause.",
      "Both can be used together, or sometimes one can be omitted if the context is clear.",
      "The clause with 虽然 usually comes before the clause with 但是."
    ],
    "examples": [
      {
        "chinese": "虽然很累，但是他还是坚持工作。",
        "pinyin": "Suīrán hěn lèi, dànshì tā háishì jiānchí gōngzuò.",
        "english": "Although very tired, he still insisted on working.",
        "highlight": "虽然很累，但是他还是"
      },
      {
        "chinese": "虽然下雨了，但是我们还是要去。",
        "pinyin": "Suīrán xià yǔ le, dànshì wǒmen háishì yào qù.",
        "english": "Although it rained, we still want to go.",
        "highlight": "虽然下雨了，但是我们还是"
      },
      {
        "chinese": "虽然他很聪明，但是不努力。",
        "pinyin": "Suīrán tā hěn cōngmíng, dànshì bù nǔlì.",
        "english": "Although he is very smart, he doesn't work hard.",
        "highlight": "虽然他很聪明，但是不努力"
      },
      {
        "chinese": "这件衣服虽然贵，但是质量很好。",
        "pinyin": "Zhè jiàn yīfu suīrán guì, dànshì zhìliàng hěn hǎo.",
        "english": "Although this piece of clothing is expensive, its quality is very good.",
        "highlight": "虽然贵，但是质量很好"
      },
      {
        "chinese": "虽然她不会说中文，但是她很喜欢中国文化。",
        "pinyin": "Suīrán tā bù huì shuō Zhōngwén, dànshì tā hěn xǐhuān Zhōngguó wénhuà.",
        "english": "Although she can't speak Chinese, she likes Chinese culture very much.",
        "highlight": "虽然她不会说中文，但是她很喜欢"
      },
      {
        "chinese": "虽然天气不好，但是我们玩得很开心。",
        "pinyin": "Suīrán tiānqì bù hǎo, dànshì wǒmen wán de hěn kāixīn.",
        "english": "Although the weather was bad, we had a great time.",
        "highlight": "虽然天气不好，但是我们玩得很开心"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use only 虽然 (suīrán) or 但是 (dànshì) when both are needed to clearly express the concessive relationship. While sometimes one can be omitted, using both makes the relationship explicit and strengthens the contrast.",
      "wrongExample": "虽然他很忙，他还是来了。",
      "correctExample": "虽然他很忙，但是他还是来了。",
      "explanation": "Adding 但是 (dànshì) makes the contrast clearer and the sentence more grammatically complete, emphasizing the unexpected outcome despite the busy schedule."
    },
    "exercises":     [
    {
            "id": "hsk3i-suiran-danshi-06-fb1",
            "type": "fill-blank",
            "question": "___很贵，但是很好吃。",
            "answer": "虽然",
            "hint": "虽然...但是... concession structure"
        },
        {
            "id": "hsk3i-suiran-danshi-06-fb2",
            "type": "fill-blank",
            "question": "虽然他很忙，___还是来了。",
            "answer": "但是",
            "hint": "虽然...但是... contrast"
        },
        {
            "id": "hsk3i-suiran-danshi-06-fb3",
            "type": "fill-blank",
            "question": "___天气不好，但是我们还是出去了。",
            "answer": "虽然",
            "hint": "Use 虽然 to introduce a concession"
        },
        {
            "id": "hsk3i-suiran-danshi-06-fb4",
            "type": "fill-blank",
            "question": "虽然他不喜欢，___他还是吃了。",
            "answer": "但是",
            "hint": "虽然...但是... structure"
        },
        {
            "id": "hsk3i-suiran-danshi-06-fb5",
            "type": "fill-blank",
            "question": "___路很远，但是我想去。",
            "answer": "虽然",
            "hint": "Use 虽然 for concession"
        },
    
        {
            "id": "hsk3i-suiran-danshi-06-ex1",
            "type": "reorder",
            "words": [
                "很累",
                "但是",
                "他",
                "工作",
                "坚持",
                "虽然",
                "还是"
            ],
            "answer": "虽然很累，但是他还是坚持工作。",
            "hint": "虽然 + Clause 1, 但是 + Clause 2"
        },
        {
            "id": "hsk3i-suiran-danshi-06-ex2",
            "type": "reorder",
            "words": [
                "下雨了",
                "但是",
                "我们",
                "去",
                "还是",
                "虽然",
                "要"
            ],
            "answer": "虽然下雨了，但是我们还是要去。",
            "hint": "虽然 + Clause 1, 但是 + Clause 2"
        },
        {
            "id": "hsk3i-suiran-danshi-06-ex3",
            "type": "reorder",
            "words": [
                "他",
                "很聪明",
                "但是",
                "不",
                "努力",
                "虽然"
            ],
            "answer": "虽然他很聪明，但是不努力。",
            "hint": "虽然 + Clause 1, 但是 + Clause 2"
        },
        {
            "id": "hsk3i-suiran-danshi-06-ex4",
            "type": "reorder",
            "words": [
                "很忙",
                "但是",
                "她",
                "每天",
                "锻炼",
                "虽然",
                "都"
            ],
            "answer": "虽然很忙，但是她每天都锻炼。",
            "hint": "虽然 + Clause 1, 但是 + Clause 2"
        },
        {
            "id": "hsk3i-suiran-danshi-06-ex5",
            "type": "reorder",
            "words": [
                "这道菜",
                "很辣",
                "但是",
                "好吃",
                "虽然",
                "很"
            ],
            "answer": "虽然这道菜很辣，但是很好吃。",
            "hint": "虽然 + Clause 1, 但是 + Clause 2"
        },
        {
            "id": "hsk3i-suiran-danshi-06-ex1",
            "type": "translate",
            "question": "Although very tired, he still insisted on working.",
            "answer": "虽然很累，但是他还是坚持工作。",
            "direction": "en-to-cn",
            "hint": "Translate using 虽然…但是…"
        },
        {
            "id": "hsk3i-suiran-danshi-06-ex2",
            "type": "translate",
            "question": "虽然下雨了，但是我们还是要去。",
            "answer": "Although it rained, we still want to go.",
            "direction": "cn-to-en",
            "hint": "Translate using 虽然…但是…"
        },
        {
            "id": "hsk3i-suiran-danshi-06-ex3",
            "type": "translate",
            "question": "Although he is very smart, he doesn't work hard.",
            "answer": "虽然他很聪明，但是不努力。",
            "direction": "en-to-cn",
            "hint": "Translate using 虽然…但是…"
        },
        {
            "id": "hsk3i-suiran-danshi-06-ex4",
            "type": "translate",
            "question": "虽然很忙，但是她每天都锻炼。",
            "answer": "Although very busy, she exercises every day.",
            "direction": "cn-to-en",
            "hint": "Translate using 虽然…但是…"
        },
        {
            "id": "hsk3i-suiran-danshi-06-ex5",
            "type": "translate",
            "question": "Although this dish is spicy, it's very delicious.",
            "answer": "虽然这道菜很辣，但是很好吃。",
            "direction": "en-to-cn",
            "hint": "Translate using 虽然…但是…"
        }
    ]
  },
  {
    "id": "hsk3i-yibianyibian-08",
    "band": "HSK3-I",
    "order": 7,
    "title": "Simultaneous Actions with 一边…一边… (yībiān…yībiān…)",
    "subtitle": "Indicates two actions happening at the same time.",
    "formula": "Subject + 一边 + Verb 1 + (Object 1) + 一边 + Verb 2 + (Object 2)",
    "explanation": "The structure 一边…一边… (yībiān…yībiān…) is used to describe two actions that are happening simultaneously. It emphasizes that the two actions occur concurrently, often with one action being primary and the other secondary, or both being equally important.",
    "usageRules": [
      "Both 一边 (yībiān) phrases must be placed after the subject.",
      "The verbs following 一边 (yībiān) are usually short and simple.",
      "Often used when one action provides context or accompaniment to the other.",
      "The two actions should be performed by the same subject."
    ],
    "examples": [
      {
        "chinese": "他一边吃饭一边看电视。",
        "pinyin": "Tā yībiān chī fàn yībiān kàn diànshì.",
        "english": "He eats while watching TV.",
        "highlight": "一边吃饭一边看电视"
      },
      {
        "chinese": "我一边听音乐一边学习。",
        "pinyin": "Wǒ yībiān tīng yīnyuè yībiān xuéxí.",
        "english": "I listen to music while studying.",
        "highlight": "一边听音乐一边学习"
      },
      {
        "chinese": "她一边走路一边打电话。",
        "pinyin": "Tā yībiān zǒulù yībiān dǎ diànhuà.",
        "english": "She walks while talking on the phone.",
        "highlight": "一边走路一边打电话"
      },
      {
        "chinese": "孩子们一边唱歌一边跳舞。",
        "pinyin": "Háizimen yībiān chànggē yībiān tiàowǔ.",
        "english": "The children sing while dancing.",
        "highlight": "一边唱歌一边跳舞"
      },
      {
        "chinese": "老师一边讲课一边写字。",
        "pinyin": "Lǎoshī yībiān jiǎngkè yībiān xiězì.",
        "english": "The teacher lectures while writing.",
        "highlight": "一边讲课一边写字"
      },
      {
        "chinese": "我们一边聊天一边喝茶。",
        "pinyin": "Wǒmen yībiān liáotiān yībiān hē chá.",
        "english": "We chat while drinking tea.",
        "highlight": "一边聊天一边喝茶"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 一边 (yībiān) for actions that are not truly simultaneous or to use it with actions that are too complex to be done at the exact same time. It's best suited for relatively simple, concurrent actions.",
      "wrongExample": "我一边去商店一边买东西。",
      "correctExample": "我去了商店，然后买东西。",
      "explanation": "Going to the store and buying things are sequential actions, not simultaneous. The structure 一边…一边… is for actions happening at the exact same time."
    },
    "exercises":     [
        {
            "id": "hsk3i-suiran-danshi-ex1-ex1",
            "type": "fill-blank",
            "question": "我昨天___了一本书。",
            "answer": "买",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-suiran-danshi-ex1-ex2",
            "type": "fill-blank",
            "question": "他___了饭。",
            "answer": "吃",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-suiran-danshi-ex1-ex3",
            "type": "fill-blank",
            "question": "我们___了电影。",
            "answer": "看",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-suiran-danshi-ex1-ex4",
            "type": "fill-blank",
            "question": "她___了苹果。",
            "answer": "吃",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-suiran-danshi-ex1-ex5",
            "type": "fill-blank",
            "question": "我___了水。",
            "answer": "喝",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-suiran-danshi-ex1-ex6",
            "type": "reorder",
            "words": [
                "把",
                "了",
                "书",
                "他",
                "看完"
            ],
            "answer": "他把书看完了。",
            "hint": "把 structure: Subject + 把 + Object + Verb + Complement"
        },
        {
            "id": "hsk3i-suiran-danshi-ex1-ex7",
            "type": "reorder",
            "words": [
                "了",
                "饭",
                "吃",
                "我"
            ],
            "answer": "我吃饭了。",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-suiran-danshi-ex1-ex8",
            "type": "reorder",
            "words": [
                "她",
                "看",
                "昨天",
                "电影",
                "了"
            ],
            "answer": "她昨天看电影了。",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-suiran-danshi-ex1-ex9",
            "type": "reorder",
            "words": [
                "过",
                "去",
                "你",
                "吗",
                "北京"
            ],
            "answer": "你去过北京吗？",
            "hint": "Past Experience with 过"
        },
        {
            "id": "hsk3i-suiran-danshi-ex1-ex10",
            "type": "reorder",
            "words": [
                "呢",
                "正在",
                "他",
                "电视",
                "看"
            ],
            "answer": "他正在看电视呢。",
            "hint": "Actions in Progress with 在"
        },
        {
            "id": "hsk3i-suiran-danshi-ex1-ex11",
            "type": "translate",
            "question": "She has already eaten.",
            "answer": "她已经吃了。",
            "direction": "en-to-cn",
            "hint": "Use 了 for completed action"
        },
        {
            "id": "hsk3i-suiran-danshi-ex1-ex12",
            "type": "translate",
            "question": "I have eaten Chinese food.",
            "answer": "我吃过中国菜。",
            "direction": "en-to-cn",
            "hint": "Past Experience with 过"
        },
        {
            "id": "hsk3i-suiran-danshi-ex1-ex13",
            "type": "translate",
            "question": "He is watching TV.",
            "answer": "他正在看电视。",
            "direction": "en-to-cn",
            "hint": "Actions in Progress with 在"
        },
        {
            "id": "hsk3i-suiran-danshi-ex1-ex14",
            "type": "translate",
            "question": "今天比昨天冷。",
            "answer": "Today is colder than yesterday.",
            "direction": "cn-to-en",
            "hint": "Comparison with 比"
        },
        {
            "id": "hsk3i-suiran-danshi-ex1-ex15",
            "type": "translate",
            "question": "因为下雨了，所以我没去公园。",
            "answer": "Because it rained, I didn't go to the park.",
            "direction": "cn-to-en",
            "hint": "Cause and Effect with 因为…所以…"
        }
    ]
  },
  {
    "id": "hsk3i-yuelaiyue-09",
    "band": "HSK3-I",
    "order": 8,
    "title": "Increasing Degree with 越来越 (yuè lái yuè)",
    "subtitle": "Indicates a gradual increase in a quality or state.",
    "formula": "Subject + 越来越 + Adjective/Verb",
    "explanation": "The structure 越来越 (yuè lái yuè) is used to express that a quality or state is changing and increasing over time, meaning \"more and more\" or \"getting more and more\". It highlights a continuous progression or development.",
    "usageRules": [
      "Placed before an adjective or a psychological verb.",
      "Cannot be used with verbs that do not express a state or feeling.",
      "Often used to describe changes in weather, feelings, or abilities.",
      "The adjective or verb can be followed by a noun if applicable."
    ],
    "examples": [
      {
        "chinese": "天气越来越冷了。",
        "pinyin": "Tiānqì yuè lái yuè lěng le.",
        "english": "The weather is getting colder and colder.",
        "highlight": "越来越冷"
      },
      {
        "chinese": "我的中文越来越好。",
        "pinyin": "Wǒ de Zhōngwén yuè lái yuè hǎo.",
        "english": "My Chinese is getting better and better.",
        "highlight": "越来越好"
      },
      {
        "chinese": "他越来越喜欢中国菜。",
        "pinyin": "Tā yuè lái yuè xǐhuān Zhōngguó cài.",
        "english": "He likes Chinese food more and more.",
        "highlight": "越来越喜欢"
      },
      {
        "chinese": "工作越来越忙了。",
        "pinyin": "Gōngzuò yuè lái yuè máng le.",
        "english": "The work is getting busier and busier.",
        "highlight": "越来越忙"
      },
      {
        "chinese": "她唱歌越来越好听。",
        "pinyin": "Tā chànggē yuè lái yuè hǎotīng.",
        "english": "Her singing is getting better and better.",
        "highlight": "越来越好听"
      },
      {
        "chinese": "学生们对学习汉语越来越有兴趣。",
        "pinyin": "Xuéshengmen duì xuéxí Hànyǔ yuè lái yuè yǒu xìngqù.",
        "english": "Students are becoming more and more interested in learning Chinese.",
        "highlight": "越来越有兴趣"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 越来越 (yuè lái yuè) with verbs that do not express a state or feeling, or to place it incorrectly in the sentence. It should directly precede the adjective or psychological verb it modifies.",
      "wrongExample": "我越来越吃饭。",
      "correctExample": "我越来越喜欢吃饭。",
      "explanation": "吃饭 (chī fàn) is an action verb, not a state or feeling. You can say you like eating more and more, but not \"eat more and more\" in this structure."
    },
    "exercises":     [
    {
            "id": "hsk3i-yuelaiyue-09-fb1",
            "type": "fill-blank",
            "question": "天气越来越___了。",
            "answer": "冷",
            "hint": "越来越 + Adjective = getting more and more"
        },
        {
            "id": "hsk3i-yuelaiyue-09-fb2",
            "type": "fill-blank",
            "question": "他的汉语___来越好了。",
            "answer": "越",
            "hint": "越来越 structure"
        },
        {
            "id": "hsk3i-yuelaiyue-09-fb3",
            "type": "fill-blank",
            "question": "这个城市越来越___了。",
            "answer": "大",
            "hint": "Use an adjective after 越来越"
        },
        {
            "id": "hsk3i-yuelaiyue-09-fb4",
            "type": "fill-blank",
            "question": "学生们___来越努力了。",
            "answer": "越",
            "hint": "越来越 = more and more"
        },
        {
            "id": "hsk3i-yuelaiyue-09-fb5",
            "type": "fill-blank",
            "question": "物价越来越___了。",
            "answer": "高",
            "hint": "Use 越来越 + adjective"
        },
    
        {
            "id": "hsk3i-yuelaiyue-09-ex1",
            "type": "reorder",
            "words": [
                "天气",
                "冷了",
                "越来越"
            ],
            "answer": "天气越来越冷了。",
            "hint": "Subject + 越来越 + Adjective"
        },
        {
            "id": "hsk3i-yuelaiyue-09-ex2",
            "type": "reorder",
            "words": [
                "我的",
                "中文",
                "好",
                "越来越"
            ],
            "answer": "我的中文越来越好。",
            "hint": "Subject + 越来越 + Adjective"
        },
        {
            "id": "hsk3i-yuelaiyue-09-ex3",
            "type": "reorder",
            "words": [
                "他",
                "喜欢",
                "中国菜",
                "越来越"
            ],
            "answer": "他越来越喜欢中国菜。",
            "hint": "Subject + 越来越 + Verb"
        },
        {
            "id": "hsk3i-yuelaiyue-09-ex4",
            "type": "reorder",
            "words": [
                "她的",
                "身体",
                "健康",
                "越来越"
            ],
            "answer": "她的身体越来越健康。",
            "hint": "Subject + 越来越 + Adjective"
        },
        {
            "id": "hsk3i-yuelaiyue-09-ex5",
            "type": "reorder",
            "words": [
                "学习",
                "汉语",
                "有意思",
                "越来越"
            ],
            "answer": "学习汉语越来越有意思。",
            "hint": "Subject + 越来越 + Adjective"
        },
        {
            "id": "hsk3i-yuelaiyue-09-ex1",
            "type": "translate",
            "question": "The weather is getting colder and colder.",
            "answer": "天气越来越冷了。",
            "direction": "en-to-cn",
            "hint": "Translate using 越来越"
        },
        {
            "id": "hsk3i-yuelaiyue-09-ex2",
            "type": "translate",
            "question": "我的中文越来越好。",
            "answer": "My Chinese is getting better and better.",
            "direction": "cn-to-en",
            "hint": "Translate using 越来越"
        },
        {
            "id": "hsk3i-yuelaiyue-09-ex3",
            "type": "translate",
            "question": "He likes Chinese food more and more.",
            "answer": "他越来越喜欢中国菜。",
            "direction": "en-to-cn",
            "hint": "Translate using 越来越"
        },
        {
            "id": "hsk3i-yuelaiyue-09-ex4",
            "type": "translate",
            "question": "Her health is getting better and better.",
            "answer": "她的身体越来越健康。",
            "direction": "cn-to-en",
            "hint": "Translate using 越来越"
        },
        {
            "id": "hsk3i-yuelaiyue-09-ex5",
            "type": "translate",
            "question": "Learning Chinese is becoming more and more interesting.",
            "answer": "学习汉语越来越有意思。",
            "direction": "en-to-cn",
            "hint": "Translate using 越来越"
        }
    ]
  },
  {
    "id": "hsk3i-huinengkeyi-10",
    "band": "HSK3-I",
    "order": 9,
    "title": "Distinguishing 会 (huì), 能 (néng), and 可以 (kěyǐ)",
    "subtitle": "Expressing ability, possibility, and permission.",
    "formula": "Subject + 会/能/可以 + Verb Phrase",
    "explanation": "会 (huì), 能 (néng), and 可以 (kěyǐ) all translate to \"can\" or \"be able to\" in English, but they have distinct meanings in Chinese. 会 (huì) primarily indicates learned ability or future possibility. 能 (néng) denotes physical ability or objective possibility. 可以 (kěyǐ) expresses permission or subjective possibility.",
    "usageRules": [
      "会 (huì): Learned skill (e.g., speaking a language, playing an instrument); future possibility/likelihood.",
      "能 (néng): Physical capability (e.g., lifting heavy objects); objective possibility (e.g., a situation allows something to happen).",
      "可以 (kěyǐ): Permission (e.g., allowed to do something); subjective possibility (e.g., it's possible to do something, but not necessarily easy).",
      "Negation: 不会 (bù huì), 不能 (bù néng), 不可以 (bù kěyǐ)."
    ],
    "examples": [
      {
        "chinese": "我会说汉语。",
        "pinyin": "Wǒ huì shuō Hànyǔ.",
        "english": "I can speak Chinese (learned skill).",
        "highlight": "会说"
      },
      {
        "chinese": "他能举起很重的东西。",
        "pinyin": "Tā néng jǔ qǐ hěn zhòng de dōngxi.",
        "english": "He can lift very heavy things (physical ability).",
        "highlight": "能举起"
      },
      {
        "chinese": "你现在可以走了。",
        "pinyin": "Nǐ xiànzài kěyǐ zǒu le.",
        "english": "You can leave now (permission).",
        "highlight": "可以走"
      },
      {
        "chinese": "明天可能会下雨。",
        "pinyin": "Míngtiān kěnéng huì xià yǔ.",
        "english": "It might rain tomorrow (future possibility).",
        "highlight": "可能会"
      },
      {
        "chinese": "这里不能吸烟。",
        "pinyin": "Zhèlǐ bù néng xīyān.",
        "english": "Smoking is not allowed here (objective impossibility/rule).",
        "highlight": "不能吸烟"
      },
      {
        "chinese": "我今天可以完成这项工作。",
        "pinyin": "Wǒ jīntiān kěyǐ wánchéng zhè xiàng gōngzuò.",
        "english": "I can finish this work today (subjective possibility/ability).",
        "highlight": "可以完成"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use these three interchangeably. For instance, using 能 (néng) for a learned skill like speaking a language, instead of 会 (huì). While sometimes they can overlap, understanding their core distinctions is key to accurate expression.",
      "wrongExample": "我能说汉语。",
      "correctExample": "我会说汉语。",
      "explanation": "Speaking a language is a learned skill, which is best expressed with 会 (huì). 能 (néng) would imply a physical capability, which is not the primary meaning here."
    },
    "comparison": {
      "structure": "会 (huì) vs. 能 (néng) vs. 可以 (kěyǐ)",
      "difference": "会 (huì) for learned ability/future possibility; 能 (néng) for physical ability/objective possibility; 可以 (kěyǐ) for permission/subjective possibility."
    },
    "exercises":     [
        {
            "id": "hsk3i-yuelaiyue-ex1-ex1",
            "type": "fill-blank",
            "question": "我昨天___了一本书。",
            "answer": "买",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-yuelaiyue-ex1-ex2",
            "type": "fill-blank",
            "question": "他___了饭。",
            "answer": "吃",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-yuelaiyue-ex1-ex3",
            "type": "fill-blank",
            "question": "我们___了电影。",
            "answer": "看",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-yuelaiyue-ex1-ex4",
            "type": "fill-blank",
            "question": "她___了苹果。",
            "answer": "吃",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-yuelaiyue-ex1-ex5",
            "type": "fill-blank",
            "question": "我___了水。",
            "answer": "喝",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-yuelaiyue-ex1-ex6",
            "type": "reorder",
            "words": [
                "了",
                "看完",
                "把",
                "他",
                "书"
            ],
            "answer": "他把书看完了。",
            "hint": "把 structure: Subject + 把 + Object + Verb + Complement"
        },
        {
            "id": "hsk3i-yuelaiyue-ex1-ex7",
            "type": "reorder",
            "words": [
                "我",
                "吃",
                "饭",
                "了"
            ],
            "answer": "我吃饭了。",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-yuelaiyue-ex1-ex8",
            "type": "reorder",
            "words": [
                "看",
                "她",
                "了",
                "电影",
                "昨天"
            ],
            "answer": "她昨天看电影了。",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-yuelaiyue-ex1-ex9",
            "type": "reorder",
            "words": [
                "你",
                "过",
                "吗",
                "北京",
                "去"
            ],
            "answer": "你去过北京吗？",
            "hint": "Past Experience with 过"
        },
        {
            "id": "hsk3i-yuelaiyue-ex1-ex10",
            "type": "reorder",
            "words": [
                "正在",
                "电视",
                "看",
                "他",
                "呢"
            ],
            "answer": "他正在看电视呢。",
            "hint": "Actions in Progress with 在"
        },
        {
            "id": "hsk3i-yuelaiyue-ex1-ex11",
            "type": "translate",
            "question": "She has already eaten.",
            "answer": "她已经吃了。",
            "direction": "en-to-cn",
            "hint": "Use 了 for completed action"
        },
        {
            "id": "hsk3i-yuelaiyue-ex1-ex12",
            "type": "translate",
            "question": "I have eaten Chinese food.",
            "answer": "我吃过中国菜。",
            "direction": "en-to-cn",
            "hint": "Past Experience with 过"
        },
        {
            "id": "hsk3i-yuelaiyue-ex1-ex13",
            "type": "translate",
            "question": "He is watching TV.",
            "answer": "他正在看电视。",
            "direction": "en-to-cn",
            "hint": "Actions in Progress with 在"
        },
        {
            "id": "hsk3i-yuelaiyue-ex1-ex14",
            "type": "translate",
            "question": "今天比昨天冷。",
            "answer": "Today is colder than yesterday.",
            "direction": "cn-to-en",
            "hint": "Comparison with 比"
        },
        {
            "id": "hsk3i-yuelaiyue-ex1-ex15",
            "type": "translate",
            "question": "因为下雨了，所以我没去公园。",
            "answer": "Because it rained, I didn't go to the park.",
            "direction": "cn-to-en",
            "hint": "Cause and Effect with 因为…所以…"
        }
    ],
  },
  {
    "id": "hsk3i-yaoxiang-11",
    "band": "HSK3-I",
    "order": 10,
    "title": "Distinguishing 要 (yào) and 想 (xiǎng)",
    "subtitle": "Expressing desire, intention, and future actions.",
    "formula": "Subject + 要/想 + Verb Phrase",
    "explanation": "Both 要 (yào) and 想 (xiǎng) can express desire or intention, but they carry different nuances. 要 (yào) often implies a stronger intention, a need, or a future action that is more certain. 想 (xiǎng) expresses a desire, a wish, or a thought, which can be less definite or more about wanting to do something rather than needing to.",
    "usageRules": [
      "要 (yào): Strong intention, necessity, future action (often with a plan), or asking for something.",
      "想 (xiǎng): Desire, wish, thinking about doing something, or missing someone/something.",
      "When expressing 'want to eat/drink', 要 (yào) is often used for a direct request, while 想 (xiǎng) is more about a general desire.",
      "Negation: 不要 (bù yào) for 'don't want/don't need', 不想 (bù xiǎng) for 'don't feel like/don't miss'."
    ],
    "examples": [
      {
        "chinese": "我要去北京。",
        "pinyin": "Wǒ yào qù Běijīng.",
        "english": "I want to go to Beijing (strong intention/plan).",
        "highlight": "要去"
      },
      {
        "chinese": "我想吃面条。",
        "pinyin": "Wǒ xiǎng chī miàntiáo.",
        "english": "I want to eat noodles (desire).",
        "highlight": "想吃"
      },
      {
        "chinese": "你想要什么？",
        "pinyin": "Nǐ xiǎng yào shénme?",
        "english": "What do you want? (asking for a desire).",
        "highlight": "想要"
      },
      {
        "chinese": "我不要这个。",
        "pinyin": "Wǒ bù yào zhège.",
        "english": "I don't want this (refusal/no need).",
        "highlight": "不要"
      },
      {
        "chinese": "我不想回家。",
        "pinyin": "Wǒ bù xiǎng huí jiā.",
        "english": "I don't feel like going home (lack of desire).",
        "highlight": "不想"
      },
      {
        "chinese": "我想你了。",
        "pinyin": "Wǒ xiǎng nǐ le.",
        "english": "I miss you.",
        "highlight": "想你"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 要 (yào) when expressing a casual desire or missing someone, where 想 (xiǎng) would be more appropriate. Conversely, using 想 (xiǎng) for a firm intention or necessity can sound less decisive. The choice depends on the strength and nature of the desire/intention.",
      "wrongExample": "我要你。",
      "correctExample": "我想你。",
      "explanation": "'我要你' can sound demanding or possessive, whereas '我想你' correctly expresses 'I miss you' or 'I'm thinking of you'."
    },
    "comparison": {
      "structure": "要 (yào) vs. 想 (xiǎng)",
      "difference": "要 (yào) implies stronger intention, necessity, or a planned future action. 想 (xiǎng) expresses a desire, a wish, or thinking about something/someone, often less definite."
    },
    "exercises":     [
    {
            "id": "hsk3i-yaoxiang-11-fb1",
            "type": "fill-blank",
            "question": "我___去北京旅游。",
            "answer": "想",
            "hint": "想 = want to (desire)"
        },
        {
            "id": "hsk3i-yaoxiang-11-fb2",
            "type": "fill-blank",
            "question": "他___学好汉语。",
            "answer": "要",
            "hint": "要 = want to / need to"
        },
        {
            "id": "hsk3i-yaoxiang-11-fb3",
            "type": "fill-blank",
            "question": "你___做什么？",
            "answer": "想",
            "hint": "想 for expressing desire"
        },
        {
            "id": "hsk3i-yaoxiang-11-fb4",
            "type": "fill-blank",
            "question": "我___吃火锅。",
            "answer": "想",
            "hint": "想 + Verb = want to do"
        },
        {
            "id": "hsk3i-yaoxiang-11-fb5",
            "type": "fill-blank",
            "question": "她___买一件新衣服。",
            "answer": "想",
            "hint": "想 expresses a wish or desire"
        },
    
        {
            "id": "hsk3i-yaoxiang-11-ex1",
            "type": "reorder",
            "words": [
                "去",
                "我",
                "北京",
                "要"
            ],
            "answer": "我要去北京。",
            "hint": "Subject + 要 + Verb Phrase"
        },
        {
            "id": "hsk3i-yaoxiang-11-ex2",
            "type": "reorder",
            "words": [
                "吃",
                "我",
                "面条",
                "想"
            ],
            "answer": "我想吃面条。",
            "hint": "Subject + 想 + Verb Phrase"
        },
        {
            "id": "hsk3i-yaoxiang-11-ex3",
            "type": "reorder",
            "words": [
                "你",
                "什么",
                "要",
                "想"
            ],
            "answer": "你想要什么？",
            "hint": "Subject + 想/要 + Object"
        },
        {
            "id": "hsk3i-yaoxiang-11-ex4",
            "type": "reorder",
            "words": [
                "他",
                "买",
                "一辆",
                "新车",
                "要"
            ],
            "answer": "他要买一辆新车。",
            "hint": "Subject + 要 + Verb Phrase"
        },
        {
            "id": "hsk3i-yaoxiang-11-ex5",
            "type": "reorder",
            "words": [
                "我",
                "喝",
                "咖啡",
                "想"
            ],
            "answer": "我想喝咖啡。",
            "hint": "Subject + 想 + Verb Phrase"
        },
        {
            "id": "hsk3i-yaoxiang-11-ex1",
            "type": "translate",
            "question": "I want to go to Beijing (strong intention/plan).",
            "answer": "我要去北京。",
            "direction": "en-to-cn",
            "hint": "Translate using 要 for strong intention"
        },
        {
            "id": "hsk3i-yaoxiang-11-ex2",
            "type": "translate",
            "question": "我想吃面条。",
            "answer": "I want to eat noodles (desire).",
            "direction": "cn-to-en",
            "hint": "Translate using 想 for desire"
        },
        {
            "id": "hsk3i-yaoxiang-11-ex3",
            "type": "translate",
            "question": "What do you want? (asking for a desire).",
            "answer": "你想要什么？",
            "direction": "en-to-cn",
            "hint": "Translate using 想 for desire"
        },
        {
            "id": "hsk3i-yaoxiang-11-ex4",
            "type": "translate",
            "question": "He wants to buy a new car.",
            "answer": "他要买一辆新车。",
            "direction": "en-to-cn",
            "hint": "Translate using 要 for strong intention"
        },
        {
            "id": "hsk3i-yaoxiang-11-ex5",
            "type": "translate",
            "question": "我想喝咖啡。",
            "answer": "I want to drink coffee.",
            "direction": "cn-to-en",
            "hint": "Translate using 想 for desire"
        }
    ],
  },
  {
    "id": "hsk3i-haishihuozhe-12",
    "band": "HSK3-I",
    "order": 11,
    "title": "Distinguishing 还是 (háishì) and 或者 (huòzhě)",
    "subtitle": "Expressing choices and alternatives.",
    "formula": "Option A + 还是 + Option B (in questions) / Option A + 或者 + Option B (in statements)",
    "explanation": "Both 还是 (háishì) and 或者 (huòzhě) mean \"or\" in English, but they are used in different contexts. 还是 (háishì) is primarily used in interrogative sentences (questions) to present choices. 或者 (huòzhě) is used in declarative sentences (statements) to offer alternatives or possibilities.",
    "usageRules": [
      "还是 (háishì): Used in 'A or B?' questions, implying a choice needs to be made.",
      "或者 (huòzhě): Used in statements to list alternatives or possibilities, not requiring a choice.",
      "还是 can also mean 'still' or 'nevertheless' in other contexts, but here we focus on its 'or' usage.",
      "或者 can connect nouns, pronouns, verbs, adjectives, or clauses."
    ],
    "examples": [
      {
        "chinese": "你喝茶还是喝咖啡？",
        "pinyin": "Nǐ hē chá háishì hē kāfēi?",
        "english": "Do you drink tea or coffee? (question)",
        "highlight": "还是"
      },
      {
        "chinese": "我喜欢喝茶或者咖啡。",
        "pinyin": "Wǒ xǐhuān hē chá huòzhě kāfēi.",
        "english": "I like to drink tea or coffee. (statement)",
        "highlight": "或者"
      },
      {
        "chinese": "你坐公共汽车还是坐地铁？",
        "pinyin": "Nǐ zuò gōnggòng qìchē háishì zuò dìtiě?",
        "english": "Do you take the bus or the subway?",
        "highlight": "还是"
      },
      {
        "chinese": "周末我会在家看书或者看电影。",
        "pinyin": "Zhōumò wǒ huì zài jiā kàn shū huòzhě kàn diànyǐng.",
        "english": "This weekend I will read books or watch movies at home.",
        "highlight": "或者"
      },
      {
        "chinese": "你是中国人还是美国人？",
        "pinyin": "Nǐ shì Zhōngguó rén háishì Měiguó rén?",
        "english": "Are you Chinese or American?",
        "highlight": "还是"
      },
      {
        "chinese": "你可以给我打电话或者发邮件。",
        "pinyin": "Nǐ kěyǐ gěi wǒ dǎ diànhuà huòzhě fā yóujiàn.",
        "english": "You can call me or send an email.",
        "highlight": "或者"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 或者 (huòzhě) in questions or 还是 (háishì) in statements. While native speakers might occasionally mix them in very informal speech, it's grammatically incorrect and can sound unnatural. Always remember: 还是 for questions, 或者 for statements.",
      "wrongExample": "你喝茶或者喝咖啡？",
      "correctExample": "你喝茶还是喝咖啡？",
      "explanation": "The first sentence is a question, so 还是 (háishì) should be used to present choices. 或者 (huòzhě) is for statements."
    },
    "comparison": {
      "structure": "还是 (háishì) vs. 或者 (huòzhě)",
      "difference": "还是 (háishì) is used in questions to present choices. 或者 (huòzhě) is used in statements to list alternatives or possibilities."
    },
    "exercises":     [
        {
            "id": "hsk3i-yaoxiang-ex1-ex1",
            "type": "fill-blank",
            "question": "我昨天___了一本书。",
            "answer": "买",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-yaoxiang-ex1-ex2",
            "type": "fill-blank",
            "question": "他___了饭。",
            "answer": "吃",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-yaoxiang-ex1-ex3",
            "type": "fill-blank",
            "question": "我们___了电影。",
            "answer": "看",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-yaoxiang-ex1-ex4",
            "type": "fill-blank",
            "question": "她___了苹果。",
            "answer": "吃",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-yaoxiang-ex1-ex5",
            "type": "fill-blank",
            "question": "我___了水。",
            "answer": "喝",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-yaoxiang-ex1-ex6",
            "type": "reorder",
            "words": [
                "把",
                "了",
                "看完",
                "书",
                "他"
            ],
            "answer": "他把书看完了。",
            "hint": "把 structure: Subject + 把 + Object + Verb + Complement"
        },
        {
            "id": "hsk3i-yaoxiang-ex1-ex7",
            "type": "reorder",
            "words": [
                "饭",
                "吃",
                "我",
                "了"
            ],
            "answer": "我吃饭了。",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-yaoxiang-ex1-ex8",
            "type": "reorder",
            "words": [
                "了",
                "昨天",
                "她",
                "电影",
                "看"
            ],
            "answer": "她昨天看电影了。",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-yaoxiang-ex1-ex9",
            "type": "reorder",
            "words": [
                "北京",
                "去",
                "过",
                "你",
                "吗"
            ],
            "answer": "你去过北京吗？",
            "hint": "Past Experience with 过"
        },
        {
            "id": "hsk3i-yaoxiang-ex1-ex10",
            "type": "reorder",
            "words": [
                "正在",
                "电视",
                "他",
                "呢",
                "看"
            ],
            "answer": "他正在看电视呢。",
            "hint": "Actions in Progress with 在"
        },
        {
            "id": "hsk3i-yaoxiang-ex1-ex11",
            "type": "translate",
            "question": "She has already eaten.",
            "answer": "她已经吃了。",
            "direction": "en-to-cn",
            "hint": "Use 了 for completed action"
        },
        {
            "id": "hsk3i-yaoxiang-ex1-ex12",
            "type": "translate",
            "question": "I have eaten Chinese food.",
            "answer": "我吃过中国菜。",
            "direction": "en-to-cn",
            "hint": "Past Experience with 过"
        },
        {
            "id": "hsk3i-yaoxiang-ex1-ex13",
            "type": "translate",
            "question": "He is watching TV.",
            "answer": "他正在看电视。",
            "direction": "en-to-cn",
            "hint": "Actions in Progress with 在"
        },
        {
            "id": "hsk3i-yaoxiang-ex1-ex14",
            "type": "translate",
            "question": "今天比昨天冷。",
            "answer": "Today is colder than yesterday.",
            "direction": "cn-to-en",
            "hint": "Comparison with 比"
        },
        {
            "id": "hsk3i-yaoxiang-ex1-ex15",
            "type": "translate",
            "question": "因为下雨了，所以我没去公园。",
            "answer": "Because it rained, I didn't go to the park.",
            "direction": "cn-to-en",
            "hint": "Cause and Effect with 因为…所以…"
        }
    ]
  },
  {
    "id": "hsk3i-duoshaoverb-13",
    "band": "HSK3-I",
    "order": 12,
    "title": "Advising More or Less with 多/少 + Verb",
    "subtitle": "Suggests doing more or less of an action.",
    "formula": "多/少 + Verb",
    "explanation": "The structure 多 (duō) + Verb or 少 (shǎo) + Verb is used to advise or suggest doing more or less of a particular action. It's a common and polite way to give recommendations or express expectations regarding behavior or effort.",
    "usageRules": [
      "多 (duō) means \"more\" and 少 (shǎo) means \"less\".",
      "They are placed directly before the verb.",
      "Often used in advice, suggestions, or commands.",
      "Can be used with a wide range of verbs."
    ],
    "examples": [
      {
        "chinese": "多喝水。",
        "pinyin": "Duō hē shuǐ.",
        "english": "Drink more water.",
        "highlight": "多喝"
      },
      {
        "chinese": "少玩手机。",
        "pinyin": "Shǎo wán shǒujī.",
        "english": "Play less with your phone.",
        "highlight": "少玩"
      },
      {
        "chinese": "多休息。",
        "pinyin": "Duō xiūxi.",
        "english": "Rest more.",
        "highlight": "多休息"
      },
      {
        "chinese": "少吃甜食。",
        "pinyin": "Shǎo chī tiánshí.",
        "english": "Eat fewer sweets.",
        "highlight": "少吃"
      },
      {
        "chinese": "多练习汉语。",
        "pinyin": "Duō liànxí Hànyǔ.",
        "english": "Practice Chinese more.",
        "highlight": "多练习"
      },
      {
        "chinese": "少说话，多做事。",
        "pinyin": "Shǎo shuōhuà, duō zuòshì.",
        "english": "Talk less, do more.",
        "highlight": "少说话，多做事"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to confuse 多/少 + Verb with the adverbs 很 (hěn) or 不 (bù) modifying adjectives. 多/少 here are not degree adverbs but rather function as advice to increase or decrease the frequency or quantity of an action.",
      "wrongExample": "我很喝水。",
      "correctExample": "多喝水。",
      "explanation": "很 (hěn) is used to modify adjectives, not verbs in this context. To advise drinking more water, use 多 (duō) directly before the verb."
    },
    "exercises":     [
    {
            "id": "hsk3i-duoshaoverb-13-fb1",
            "type": "fill-blank",
            "question": "你___岁了？",
            "answer": "多少",
            "hint": "多少 for asking about quantity/age"
        },
        {
            "id": "hsk3i-duoshaoverb-13-fb2",
            "type": "fill-blank",
            "question": "这本书___钱？",
            "answer": "多少",
            "hint": "多少 for asking price"
        },
        {
            "id": "hsk3i-duoshaoverb-13-fb3",
            "type": "fill-blank",
            "question": "你有___个朋友？",
            "answer": "多少",
            "hint": "多少 + Measure word + Noun"
        },
        {
            "id": "hsk3i-duoshaoverb-13-fb4",
            "type": "fill-blank",
            "question": "班里有___个学生？",
            "answer": "多少",
            "hint": "Use 多少 to ask about number"
        },
        {
            "id": "hsk3i-duoshaoverb-13-fb5",
            "type": "fill-blank",
            "question": "你学了___年汉语了？",
            "answer": "多少",
            "hint": "多少 for asking duration"
        },
    
        {
            "id": "hsk3i-duoshaoverb-13-ex1",
            "type": "reorder",
            "words": [
                "喝水",
                "多"
            ],
            "answer": "多喝水。",
            "hint": "多 + Verb"
        },
        {
            "id": "hsk3i-duoshaoverb-13-ex2",
            "type": "reorder",
            "words": [
                "玩手机",
                "少"
            ],
            "answer": "少玩手机。",
            "hint": "少 + Verb"
        },
        {
            "id": "hsk3i-duoshaoverb-13-ex3",
            "type": "reorder",
            "words": [
                "休息",
                "多"
            ],
            "answer": "多休息。",
            "hint": "多 + Verb"
        },
        {
            "id": "hsk3i-duoshaoverb-13-ex4",
            "type": "reorder",
            "words": [
                "吃",
                "蔬菜",
                "多"
            ],
            "answer": "多吃蔬菜。",
            "hint": "多 + Verb"
        },
        {
            "id": "hsk3i-duoshaoverb-13-ex5",
            "type": "reorder",
            "words": [
                "看",
                "电视",
                "少"
            ],
            "answer": "少看电视。",
            "hint": "少 + Verb"
        },
        {
            "id": "hsk3i-duoshaoverb-13-ex1",
            "type": "translate",
            "question": "Drink more water.",
            "answer": "多喝水。",
            "direction": "en-to-cn",
            "hint": "Translate using 多 + Verb"
        },
        {
            "id": "hsk3i-duoshaoverb-13-ex2",
            "type": "translate",
            "question": "少玩手机。",
            "answer": "Play less with your phone.",
            "direction": "cn-to-en",
            "hint": "Translate using 少 + Verb"
        },
        {
            "id": "hsk3i-duoshaoverb-13-ex3",
            "type": "translate",
            "question": "Rest more.",
            "answer": "多休息。",
            "direction": "en-to-cn",
            "hint": "Translate using 多 + Verb"
        },
        {
            "id": "hsk3i-duoshaoverb-13-ex4",
            "type": "translate",
            "question": "多吃蔬菜。",
            "answer": "Eat more vegetables.",
            "direction": "cn-to-en",
            "hint": "Translate using 多 + Verb"
        },
        {
            "id": "hsk3i-duoshaoverb-13-ex5",
            "type": "translate",
            "question": "Play less with your phone.",
            "answer": "少看电视。",
            "direction": "en-to-cn",
            "hint": "Translate using 少 + Verb"
        }
    ]
  },
  {
    "id": "hsk3i-xianranhouzai-14",
    "band": "HSK3-I",
    "order": 13,
    "title": "Sequencing Actions with 先…然后…再… (xiān…ránhòu…zài…)",
    "subtitle": "Describes a sequence of actions: first, then, and then again.",
    "formula": "Subject + 先 + Action 1, 然后 + Action 2, 再 + Action 3.",
    "explanation": "The adverbs 先 (xiān), 然后 (ránhòu), and 再 (zài) are used to describe a sequence of actions in chronological order. 先 (xiān) means \"first\", 然后 (ránhòu) means \"then\" or \"afterwards\", and 再 (zài) means \"then\" or \"again\" for a subsequent action. This structure is crucial for narrating events or giving instructions.",
    "usageRules": [
      "先 (xiān) introduces the first action.",
      "然后 (ránhòu) introduces the second action.",
      "再 (zài) introduces a third or subsequent action.",
      "然后 and 再 can sometimes be used interchangeably for the second action, but 再 often implies a slightly longer pause or a more distinct next step.",
      "The sequence can be simplified to just 先…然后… or 先…再… if only two steps are involved."
    ],
    "examples": [
      {
        "chinese": "我先吃饭，然后看电视，再睡觉。",
        "pinyin": "Wǒ xiān chī fàn, ránhòu kàn diànshì, zài shuìjiào.",
        "english": "I first eat, then watch TV, and then sleep.",
        "highlight": "先吃饭，然后看电视，再睡觉"
      },
      {
        "chinese": "你先做作业，然后玩游戏。",
        "pinyin": "Nǐ xiān zuò zuoyè, ránhòu wán yóuxì.",
        "english": "You first do your homework, then play games.",
        "highlight": "先做作业，然后玩游戏"
      },
      {
        "chinese": "我们先去超市，再回家。",
        "pinyin": "Wǒmen xiān qù chāoshì, zài huí jiā.",
        "english": "We first go to the supermarket, then go home.",
        "highlight": "先去超市，再回家"
      },
      {
        "chinese": "他先洗澡，然后穿衣服。",
        "pinyin": "Tā xiān xǐzǎo, ránhòu chuān yīfu.",
        "english": "He first takes a shower, then gets dressed.",
        "highlight": "先洗澡，然后穿衣服"
      },
      {
        "chinese": "请你先听我说，然后再提问。",
        "pinyin": "Qǐng nǐ xiān tīng wǒ shuō, ránhòu zài tíwèn.",
        "english": "Please listen to me first, then ask questions.",
        "highlight": "先听我说，然后再提问"
      },
      {
        "chinese": "我先学习，然后休息一下，再继续学习。",
        "pinyin": "Wǒ xiān xuéxí, ránhòu xiūxi yīxià, zài jìxù xuéxí.",
        "english": "I first study, then take a break, and then continue studying.",
        "highlight": "先学习，然后休息一下，再继续学习"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to confuse the order or omit one of the adverbs when describing a clear sequence of actions. While sometimes 然后 or 再 can be omitted, using them correctly helps to clarify the flow of events, especially in more complex instructions or narratives.",
      "wrongExample": "我吃饭，然后看电视，睡觉。",
      "correctExample": "我先吃饭，然后看电视，再睡觉。",
      "explanation": "Adding 先 (xiān) and 再 (zài) makes the sequence of actions explicit and grammatically correct, clearly indicating the order of events."
    },
    "exercises":     [
        {
            "id": "hsk3i-duoshaoverb-ex1-ex1",
            "type": "fill-blank",
            "question": "我昨天___了一本书。",
            "answer": "买",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-duoshaoverb-ex1-ex2",
            "type": "fill-blank",
            "question": "他___了饭。",
            "answer": "吃",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-duoshaoverb-ex1-ex3",
            "type": "fill-blank",
            "question": "我们___了电影。",
            "answer": "看",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-duoshaoverb-ex1-ex4",
            "type": "fill-blank",
            "question": "她___了苹果。",
            "answer": "吃",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-duoshaoverb-ex1-ex5",
            "type": "fill-blank",
            "question": "我___了水。",
            "answer": "喝",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-duoshaoverb-ex1-ex6",
            "type": "reorder",
            "words": [
                "了",
                "书",
                "他",
                "看完",
                "把"
            ],
            "answer": "他把书看完了。",
            "hint": "把 structure: Subject + 把 + Object + Verb + Complement"
        },
        {
            "id": "hsk3i-duoshaoverb-ex1-ex7",
            "type": "reorder",
            "words": [
                "饭",
                "吃",
                "了",
                "我"
            ],
            "answer": "我吃饭了。",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-duoshaoverb-ex1-ex8",
            "type": "reorder",
            "words": [
                "昨天",
                "电影",
                "了",
                "她",
                "看"
            ],
            "answer": "她昨天看电影了。",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-duoshaoverb-ex1-ex9",
            "type": "reorder",
            "words": [
                "北京",
                "吗",
                "你",
                "去",
                "过"
            ],
            "answer": "你去过北京吗？",
            "hint": "Past Experience with 过"
        },
        {
            "id": "hsk3i-duoshaoverb-ex1-ex10",
            "type": "reorder",
            "words": [
                "看",
                "他",
                "呢",
                "正在",
                "电视"
            ],
            "answer": "他正在看电视呢。",
            "hint": "Actions in Progress with 在"
        },
        {
            "id": "hsk3i-duoshaoverb-ex1-ex11",
            "type": "translate",
            "question": "She has already eaten.",
            "answer": "她已经吃了。",
            "direction": "en-to-cn",
            "hint": "Use 了 for completed action"
        },
        {
            "id": "hsk3i-duoshaoverb-ex1-ex12",
            "type": "translate",
            "question": "I have eaten Chinese food.",
            "answer": "我吃过中国菜。",
            "direction": "en-to-cn",
            "hint": "Past Experience with 过"
        },
        {
            "id": "hsk3i-duoshaoverb-ex1-ex13",
            "type": "translate",
            "question": "He is watching TV.",
            "answer": "他正在看电视。",
            "direction": "en-to-cn",
            "hint": "Actions in Progress with 在"
        },
        {
            "id": "hsk3i-duoshaoverb-ex1-ex14",
            "type": "translate",
            "question": "今天比昨天冷。",
            "answer": "Today is colder than yesterday.",
            "direction": "cn-to-en",
            "hint": "Comparison with 比"
        },
        {
            "id": "hsk3i-duoshaoverb-ex1-ex15",
            "type": "translate",
            "question": "因为下雨了，所以我没去公园。",
            "answer": "Because it rained, I didn't go to the park.",
            "direction": "cn-to-en",
            "hint": "Cause and Effect with 因为…所以…"
        }
    ]
  },
  {
    "id": "hsk3i-yijinghaimei-15",
    "band": "HSK3-I",
    "order": 14,
    "title": "Expressing 'Already' and 'Not Yet' with 已经 (yǐjīng) and 还没 (hái méi)",
    "subtitle": "Indicates whether an action or state has occurred or not.",
    "formula": "Subject + 已经 + Verb + 了 / Subject + 还没(有) + Verb",
    "explanation": "已经 (yǐjīng) means 'already' and is used to indicate that an action or state has occurred or been completed. It is often followed by the particle 了 (le). 还没(有) (hái méi yǒu) means 'not yet' and indicates that an action or state has not occurred up to the present moment. 有 (yǒu) can be omitted.",
    "usageRules": [
      "已经 (yǐjīng) is placed before the verb and often used with 了 (le) at the end of the sentence or after the verb.",
      "还没(有) (hái méi yǒu) is placed before the verb. 有 (yǒu) is optional.",
      "已经 (yǐjīng) emphasizes completion or occurrence.",
      "还没(有) (hái méi yǒu) emphasizes non-completion or non-occurrence up to now."
    ],
    "examples": [
      {
        "chinese": "他已经走了。",
        "pinyin": "Tā yǐjīng zǒu le.",
        "english": "He has already left.",
        "highlight": "已经走了"
      },
      {
        "chinese": "我还没吃饭。",
        "pinyin": "Wǒ hái méi chī fàn.",
        "english": "I haven't eaten yet.",
        "highlight": "还没吃饭"
      },
      {
        "chinese": "电影已经开始了。",
        "pinyin": "Diànyǐng yǐjīng kāishǐ le.",
        "english": "The movie has already started.",
        "highlight": "已经开始了"
      },
      {
        "chinese": "作业还没做完。",
        "pinyin": "Zuòyè hái méi zuò wán.",
        "english": "The homework is not finished yet.",
        "highlight": "还没做完"
      },
      {
        "chinese": "她已经学会了游泳。",
        "pinyin": "Tā yǐjīng xué huì le yóuyǒng.",
        "english": "She has already learned to swim.",
        "highlight": "已经学会了"
      },
      {
        "chinese": "我还没决定。",
        "pinyin": "Wǒ hái méi juédìng.",
        "english": "I haven't decided yet.",
        "highlight": "还没决定"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to omit 了 (le) when using 已经 (yǐjīng) to indicate completion, or to forget 没 (méi) when using 还没 (hái méi) for negation. While 了 (le) is sometimes optional with 已经 (yǐjīng), its inclusion often makes the completion clearer. For 'not yet', 没 (méi) is essential.",
      "wrongExample": "他已经走。",
      "correctExample": "他已经走了。",
      "explanation": "The particle 了 (le) is commonly used with 已经 (yǐjīng) to emphasize the completion of the action."
    },
    "exercises":     [
    {
            "id": "hsk3i-yijinghaimei-15-fb1",
            "type": "fill-blank",
            "question": "他___经来了。",
            "answer": "已",
            "hint": "已经 = already"
        },
        {
            "id": "hsk3i-yijinghaimei-15-fb2",
            "type": "fill-blank",
            "question": "我还___吃饭呢。",
            "answer": "没",
            "hint": "还没 = not yet"
        },
        {
            "id": "hsk3i-yijinghaimei-15-fb3",
            "type": "fill-blank",
            "question": "她___经学完了。",
            "answer": "已",
            "hint": "已经 for completed actions"
        },
        {
            "id": "hsk3i-yijinghaimei-15-fb4",
            "type": "fill-blank",
            "question": "作业___经写好了。",
            "answer": "已",
            "hint": "已经 + Verb + 了"
        },
        {
            "id": "hsk3i-yijinghaimei-15-fb5",
            "type": "fill-blank",
            "question": "他还___睡觉呢。",
            "answer": "在",
            "hint": "还在 = still doing"
        },
    
        {
            "id": "hsk3i-yijinghaimei-15-ex1",
            "type": "reorder",
            "words": [
                "他",
                "走了",
                "已经"
            ],
            "answer": "他已经走了。",
            "hint": "Subject + 已经 + Verb + 了"
        },
        {
            "id": "hsk3i-yijinghaimei-15-ex2",
            "type": "reorder",
            "words": [
                "我",
                "吃饭",
                "还没"
            ],
            "answer": "我还没吃饭。",
            "hint": "Subject + 还没 + Verb"
        },
        {
            "id": "hsk3i-yijinghaimei-15-ex3",
            "type": "reorder",
            "words": [
                "电影",
                "开始了",
                "已经"
            ],
            "answer": "电影已经开始了。",
            "hint": "Subject + 已经 + Verb + 了"
        },
        {
            "id": "hsk3i-yijinghaimei-15-ex4",
            "type": "reorder",
            "words": [
                "她",
                "完成",
                "作业",
                "还没"
            ],
            "answer": "她还没完成作业。",
            "hint": "Subject + 还没 + Verb"
        },
        {
            "id": "hsk3i-yijinghaimei-15-ex5",
            "type": "reorder",
            "words": [
                "火车",
                "出发了",
                "已经"
            ],
            "answer": "火车已经出发了。",
            "hint": "Subject + 已经 + Verb + 了"
        },
        {
            "id": "hsk3i-yijinghaimei-15-ex1",
            "type": "translate",
            "question": "He has already left.",
            "answer": "他已经走了。",
            "direction": "en-to-cn",
            "hint": "Translate using 已经"
        },
        {
            "id": "hsk3i-yijinghaimei-15-ex2",
            "type": "translate",
            "question": "我还没吃饭。",
            "answer": "I haven't eaten yet.",
            "direction": "cn-to-en",
            "hint": "Translate using 还没"
        },
        {
            "id": "hsk3i-yijinghaimei-15-ex3",
            "type": "translate",
            "question": "The movie has already started.",
            "answer": "电影已经开始了。",
            "direction": "en-to-cn",
            "hint": "Translate using 已经"
        },
        {
            "id": "hsk3i-yijinghaimei-15-ex4",
            "type": "translate",
            "question": "她还没完成作业。",
            "answer": "She hasn't finished her homework yet.",
            "direction": "cn-to-en",
            "hint": "Translate using 还没"
        },
        {
            "id": "hsk3i-yijinghaimei-15-ex5",
            "type": "translate",
            "question": "The train has already departed.",
            "answer": "火车已经出发了。",
            "direction": "en-to-cn",
            "hint": "Translate using 已经"
        }
    ]
  },
  {
    "id": "hsk3i-duixianggenhe-16",
    "band": "HSK3-I",
    "order": 15,
    "title": "Prepositions: 对 (duì), 向 (xiàng), 跟 (gēn), 和 (hé)",
    "subtitle": "Expressing \"to\", \"with\", and \"towards\".",
    "formula": "Subject + 对/向/跟/和 + Object + Verb Phrase",
    "explanation": "These prepositions are used to indicate the recipient, target, or companion of an action. While they can sometimes be interchangeable, each has specific nuances. 对 (duì) often indicates a target or recipient of an action, or a relationship. 向 (xiàng) primarily indicates direction or orientation. 跟 (gēn) and 和 (hé) both mean \"with\" or \"and\", but 跟 is more commonly used as a preposition for \"with\" in spoken Chinese, while 和 is more often a conjunction for \"and\".",
    "usageRules": [
      "对 (duì): Indicates the target of an action (e.g., speaking to, being good to), or a relationship (e.g., important to me).",
      "向 (xiàng): Indicates direction or orientation (e.g., facing towards, walking towards).",
      "跟 (gēn): Means \"with\" (accompanying, together with) or \"to\" (speaking to, discussing with). More common in spoken Chinese.",
      "和 (hé): Primarily a conjunction meaning \"and\". Can also mean \"with\" in some contexts, especially formal ones, but 跟 is more common for \"with\" as a preposition."
    ],
    "examples": [
      {
        "chinese": "他对我很友好。",
        "pinyin": "Tā duì wǒ hěn yǒuhǎo.",
        "english": "He is very friendly to me.",
        "highlight": "对我"
      },
      {
        "chinese": "请向老师提问。",
        "pinyin": "Qǐng xiàng lǎoshī tíwèn.",
        "english": "Please ask the teacher a question.",
        "highlight": "向老师"
      },
      {
        "chinese": "我跟朋友一起去。",
        "pinyin": "Wǒ gēn péngyǒu yīqǐ qù.",
        "english": "I go with my friend.",
        "highlight": "跟朋友"
      },
      {
        "chinese": "我和他都是学生。",
        "pinyin": "Wǒ hé tā dōu shì xuéshēng.",
        "english": "Both he and I are students.",
        "highlight": "我和他"
      },
      {
        "chinese": "他向我笑了笑。",
        "pinyin": "Tā xiàng wǒ xiào le xiào.",
        "english": "He smiled at me.",
        "highlight": "向我"
      },
      {
        "chinese": "我跟妈妈打电话。",
        "pinyin": "Wǒ gēn māma dǎ diànhuà.",
        "english": "I called my mom (lit. I make a call with my mom).",
        "highlight": "跟妈妈"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 和 (hé) as a preposition for \"with\" in contexts where 跟 (gēn) is more natural, especially in spoken Chinese. While 和 can function as a preposition, 跟 is generally preferred for indicating accompaniment or interaction. Also, confusing 对 and 向 when indicating direction vs. target.",
      "wrongExample": "我和朋友说。",
      "correctExample": "我跟朋友说。",
      "explanation": "When meaning \"speak to someone\", 跟 (gēn) is more commonly used than 和 (hé) in spoken Chinese."
    },
    "comparison": {
      "structure": "对 (duì) vs. 向 (xiàng) vs. 跟 (gēn) vs. 和 (hé)",
      "difference": "对 (duì) for target/relationship; 向 (xiàng) for direction; 跟 (gēn) for \"with\" (preposition, spoken); 和 (hé) for \"and\" (conjunction) or \"with\" (preposition, more formal/written)."
    },
    "exercises":     [
        {
            "id": "hsk3i-yijinghaimei-ex1-ex1",
            "type": "fill-blank",
            "question": "我昨天___了一本书。",
            "answer": "买",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-yijinghaimei-ex1-ex2",
            "type": "fill-blank",
            "question": "他___了饭。",
            "answer": "吃",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-yijinghaimei-ex1-ex3",
            "type": "fill-blank",
            "question": "我们___了电影。",
            "answer": "看",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-yijinghaimei-ex1-ex4",
            "type": "fill-blank",
            "question": "她___了苹果。",
            "answer": "吃",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-yijinghaimei-ex1-ex5",
            "type": "fill-blank",
            "question": "我___了水。",
            "answer": "喝",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-yijinghaimei-ex1-ex6",
            "type": "reorder",
            "words": [
                "了",
                "把",
                "看完",
                "他",
                "书"
            ],
            "answer": "他把书看完了。",
            "hint": "把 structure: Subject + 把 + Object + Verb + Complement"
        },
        {
            "id": "hsk3i-yijinghaimei-ex1-ex7",
            "type": "reorder",
            "words": [
                "我",
                "饭",
                "了",
                "吃"
            ],
            "answer": "我吃饭了。",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-yijinghaimei-ex1-ex8",
            "type": "reorder",
            "words": [
                "了",
                "她",
                "看",
                "昨天",
                "电影"
            ],
            "answer": "她昨天看电影了。",
            "hint": "Use 了 to mark completed action"
        },
        {
            "id": "hsk3i-yijinghaimei-ex1-ex9",
            "type": "reorder",
            "words": [
                "过",
                "你",
                "吗",
                "去",
                "北京"
            ],
            "answer": "你去过北京吗？",
            "hint": "Past Experience with 过"
        },
        {
            "id": "hsk3i-yijinghaimei-ex1-ex10",
            "type": "reorder",
            "words": [
                "电视",
                "呢",
                "他",
                "看",
                "正在"
            ],
            "answer": "他正在看电视呢。",
            "hint": "Actions in Progress with 在"
        },
        {
            "id": "hsk3i-yijinghaimei-ex1-ex11",
            "type": "translate",
            "question": "She has already eaten.",
            "answer": "她已经吃了。",
            "direction": "en-to-cn",
            "hint": "Use 了 for completed action"
        },
        {
            "id": "hsk3i-yijinghaimei-ex1-ex12",
            "type": "translate",
            "question": "I have eaten Chinese food.",
            "answer": "我吃过中国菜。",
            "direction": "en-to-cn",
            "hint": "Past Experience with 过"
        },
        {
            "id": "hsk3i-yijinghaimei-ex1-ex13",
            "type": "translate",
            "question": "He is watching TV.",
            "answer": "他正在看电视。",
            "direction": "en-to-cn",
            "hint": "Actions in Progress with 在"
        },
        {
            "id": "hsk3i-yijinghaimei-ex1-ex14",
            "type": "translate",
            "question": "今天比昨天冷。",
            "answer": "Today is colder than yesterday.",
            "direction": "cn-to-en",
            "hint": "Comparison with 比"
        },
        {
            "id": "hsk3i-yijinghaimei-ex1-ex15",
            "type": "translate",
            "question": "因为下雨了，所以我没去公园。",
            "answer": "Because it rained, I didn't go to the park.",
            "direction": "cn-to-en",
            "hint": "Cause and Effect with 因为…所以…"
        }
    ]
  },
  {
    "id": "hsk3i-congdao-17",
    "band": "HSK3-I",
    "order": 16,
    "title": "From...To... with 从 (cóng) and 到 (dào)",
    "subtitle": "Expressing origin and destination in time or space.",
    "formula": "从 + Starting Point + 到 + Ending Point",
    "explanation": "The prepositions 从 (cóng) and 到 (dào) are used together to indicate a range, either in space (from one place to another) or in time (from one time to another). 从 marks the starting point, and 到 marks the ending point. This structure is fundamental for describing movement, duration, or scope.",
    "usageRules": [
      "从 (cóng) introduces the starting point (time or place).",
      "到 (dào) introduces the ending point (time or place).",
      "Can be used with verbs of motion (e.g., 走, 跑, 飞) or to describe a duration.",
      "The structure can also be used to indicate a range of numbers or topics."
    ],
    "examples": [
      {
        "chinese": "我从北京到上海。",
        "pinyin": "Wǒ cóng Běijīng dào Shànghǎi.",
        "english": "I go from Beijing to Shanghai.",
        "highlight": "从北京到上海"
      },
      {
        "chinese": "他从早上八点到下午五点都在工作。",
        "pinyin": "Tā cóng zǎoshang bā diǎn dào xiàwǔ wǔ diǎn dōu zài gōngzuò.",
        "english": "He works from 8 AM to 5 PM.",
        "highlight": "从早上八点到下午五点"
      },
      {
        "chinese": "我们从第一页看到最后一页。",
        "pinyin": "Wǒmen cóng dì yī yè kàn dào zuì hòu yī yè.",
        "english": "We read from the first page to the last page.",
        "highlight": "从第一页看到最后一页"
      },
      {
        "chinese": "从现在开始，我要努力学习。",
        "pinyin": "Cóng xiànzài kāishǐ, wǒ yào nǔlì xuéxí.",
        "english": "From now on, I will study hard.",
        "highlight": "从现在开始"
      },
      {
        "chinese": "这趟火车从广州到深圳。",
        "pinyin": "Zhè tàng huǒchē cóng Guǎngzhōu dào Shēnzhèn.",
        "english": "This train goes from Guangzhou to Shenzhen.",
        "highlight": "从广州到深圳"
      },
      {
        "chinese": "他从小学到大学都在这个学校读书。",
        "pinyin": "Tā cóng xiǎoxué dào dàxué dōu zài zhège xuéxiào dúshū.",
        "english": "He studied at this school from elementary school to university.",
        "highlight": "从小学到大学"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to omit either 从 (cóng) or 到 (dào) when both are needed to clearly define the range. While sometimes one can be implied, using both makes the starting and ending points explicit and avoids ambiguity.",
      "wrongExample": "我北京到上海。 (Missing 从)",
      "correctExample": "我从北京到上海。",
      "explanation": "A common mistake is to omit either 从 (cóng) or 到 (dào) when both are needed to clearly define the range. While sometimes one can be implied, using both makes the starting and ending points explicit and avoids ambiguity."
    },
    "exercises":     [
    {
            "id": "hsk3i-congdao-17-fb1",
            "type": "fill-blank",
            "question": "我___北京来。",
            "answer": "从",
            "hint": "从 = from (a place)"
        },
        {
            "id": "hsk3i-congdao-17-fb2",
            "type": "fill-blank",
            "question": "他从家___学校走路。",
            "answer": "到",
            "hint": "从...到... = from...to..."
        },
        {
            "id": "hsk3i-congdao-17-fb3",
            "type": "fill-blank",
            "question": "___早上到晚上，他都在工作。",
            "answer": "从",
            "hint": "从...到... for time range"
        },
        {
            "id": "hsk3i-congdao-17-fb4",
            "type": "fill-blank",
            "question": "从这里___那里要多久？",
            "answer": "到",
            "hint": "从...到... for distance"
        },
        {
            "id": "hsk3i-congdao-17-fb5",
            "type": "fill-blank",
            "question": "___周一到周五，我都上班。",
            "answer": "从",
            "hint": "从 to indicate starting point"
        },
    
        {
            "id": "hsk3i-congdao-17-ex1",
            "type": "reorder",
            "words": [
                "我",
                "北京",
                "上海",
                "从",
                "到"
            ],
            "answer": "我从北京到上海。",
            "hint": "从 + Start + 到 + End"
        },
        {
            "id": "hsk3i-congdao-17-ex2",
            "type": "reorder",
            "words": [
                "他",
                "早上八点",
                "下午五点",
                "都",
                "工作",
                "从",
                "到",
                "在"
            ],
            "answer": "他从早上八点到下午五点都在工作。",
            "hint": "从 + Start + 到 + End + 都 + Verb"
        },
        {
            "id": "hsk3i-congdao-17-ex3",
            "type": "reorder",
            "words": [
                "我们",
                "第一页",
                "最后",
                "一页",
                "看",
                "从",
                "到"
            ],
            "answer": "我们从第一页看到最后一页。",
            "hint": "从 + Start + 到 + End"
        },
        {
            "id": "hsk3i-congdao-17-ex4",
            "type": "reorder",
            "words": [
                "飞机",
                "上海",
                "广州",
                "从",
                "到"
            ],
            "answer": "飞机从上海到广州。",
            "hint": "从 + Start + 到 + End"
        },
        {
            "id": "hsk3i-congdao-17-ex5",
            "type": "reorder",
            "words": [
                "我",
                "家",
                "公司",
                "从",
                "到"
            ],
            "answer": "我从家到公司。",
            "hint": "从 + Start + 到 + End"
        },
        {
            "id": "hsk3i-congdao-17-ex1",
            "type": "translate",
            "question": "I go from Beijing to Shanghai.",
            "answer": "我从北京到上海。",
            "direction": "en-to-cn",
            "hint": "Translate using 从...到"
        },
        {
            "id": "hsk3i-congdao-17-ex2",
            "type": "translate",
            "question": "他从早上八点到下午五点都在工作。",
            "answer": "He works from 8 AM to 5 PM.",
            "direction": "cn-to-en",
            "hint": "Translate using 从...到"
        },
        {
            "id": "hsk3i-congdao-17-ex3",
            "type": "translate",
            "question": "We read from the first page to the last page.",
            "answer": "我们从第一页看到最后一页。",
            "direction": "en-to-cn",
            "hint": "Translate using 从...到"
        },
        {
            "id": "hsk3i-congdao-17-ex4",
            "type": "translate",
            "question": "飞机从上海到广州。",
            "answer": "The plane flies from Shanghai to Guangzhou.",
            "direction": "cn-to-en",
            "hint": "Translate using 从...到"
        },
        {
            "id": "hsk3i-congdao-17-ex5",
            "type": "translate",
            "question": "I go from home to company.",
            "answer": "我从家到公司。",
            "direction": "en-to-cn",
            "hint": "Translate using 从...到"
        }
    ]
  },
  {
    "id": "hsk3i-youdianeryidianer-18",
    "band": "HSK3-I",
    "order": 17,
    "title": "Expressing Slight Degree with 有点儿 (yǒudiǎnr) and 一点儿 (yīdiǎnr)",
    "subtitle": "Indicates a small amount or a slight degree, often with a negative connotation for 有点儿.",
    "formula": "有点儿 + Adjective/Verb (often negative) / Adjective/Verb + 一点儿 (often comparative)",
    "explanation": "Both 有点儿 (yǒudiǎnr) and 一点儿 (yīdiǎnr) express a small degree or amount, but they are used in different grammatical positions and often carry different connotations. 有点儿 (yǒudiǎnr) typically precedes an adjective or verb and often implies a slight dissatisfaction or a negative feeling. 一点儿 (yīdiǎnr) usually follows an adjective or verb and often suggests a small amount or a slight improvement/comparison.",
    "usageRules": [
      "有点儿 (yǒudiǎnr): Placed before adjectives or verbs, often expressing a negative or undesirable slight degree. Can also be used for a small amount of something.",
      "一点儿 (yīdiǎnr): Placed after adjectives or verbs, often in comparative sentences or to express a small amount of something. Can also be used after nouns.",
      "有点儿 + Adjective/Verb: The adjective or verb is usually negative or expresses a complaint.",
      "Adjective/Verb + 一点儿: The adjective or verb is often positive or neutral, and it can be used to soften a request or make a comparison."
    ],
    "examples": [
      {
        "chinese": "我有点儿累。",
        "pinyin": "Wǒ yǒudiǎnr lèi.",
        "english": "I'm a little tired (slight negative feeling).",
        "highlight": "有点儿累"
      },
      {
        "chinese": "这件衣服有点儿贵。",
        "pinyin": "Zhè jiàn yīfu yǒudiǎnr guì.",
        "english": "This piece of clothing is a little expensive (slight dissatisfaction).",
        "highlight": "有点儿贵"
      },
      {
        "chinese": "请你快一点儿。",
        "pinyin": "Qǐng nǐ kuài yīdiǎnr.",
        "english": "Please be a little faster (request for slight improvement).",
        "highlight": "快一点儿"
      },
      {
        "chinese": "他比我高一点儿。",
        "pinyin": "Tā bǐ wǒ gāo yīdiǎnr.",
        "english": "He is a little taller than me (comparison).",
        "highlight": "高一点儿"
      },
      {
        "chinese": "我有点儿不舒服。",
        "pinyin": "Wǒ yǒudiǎnr bù shūfu.",
        "english": "I'm a little uncomfortable.",
        "highlight": "有点儿不舒服"
      },
      {
        "chinese": "给我一点儿水。",
        "pinyin": "Gěi wǒ yīdiǎnr shuǐ.",
        "english": "Give me a little water (small amount).",
        "highlight": "一点儿水"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to interchange 有点儿 (yǒudiǎnr) and 一点儿 (yīdiǎnr) without considering their position and connotation. Remember that 有点儿 usually comes before the adjective/verb and often has a negative implication, while 一点儿 usually comes after and is often used for comparison or to soften a statement.",
      "wrongExample": "我累有点儿。",
      "correctExample": "我有点儿累。",
      "explanation": "有点儿 (yǒudiǎnr) should precede the adjective or verb it modifies."
    },
    "comparison": {
      "structure": "有点儿 (yǒudiǎnr) vs. 一点儿 (yīdiǎnr)",
      "difference": "有点儿 (yǒudiǎnr) precedes adjectives/verbs, often with a negative connotation. 一点儿 (yīdiǎnr) follows adjectives/verbs (often for comparison) or nouns (for small amount), usually neutral or positive."
    },
    "exercises":     [
        {
            "id": "hsk3i-congdao-ex1-ex1",
            "type": "fill-blank",
            "question": "___",
            "answer": "这件衣服有点儿贵",
            "hint": "有点儿 + Adjective/Verb (often negative) / Adjective/Verb + 一点儿 (often comparative)"
        },
        {
            "id": "hsk3i-congdao-ex1-ex2",
            "type": "fill-blank",
            "question": "___",
            "answer": "请你快一点儿",
            "hint": "有点儿 + Adjective/Verb (often negative) / Adjective/Verb + 一点儿 (often comparative)"
        },
        {
            "id": "hsk3i-congdao-ex1-ex3",
            "type": "fill-blank",
            "question": "___",
            "answer": "我有点儿累",
            "hint": "有点儿 + Adjective/Verb (often negative) / Adjective/Verb + 一点儿 (often comparative)"
        },
        {
            "id": "hsk3i-congdao-ex1-ex4",
            "type": "fill-blank",
            "question": "___",
            "answer": "这件衣服有点儿贵",
            "hint": "有点儿 + Adjective/Verb (often negative) / Adjective/Verb + 一点儿 (often comparative)"
        },
        {
            "id": "hsk3i-congdao-ex1-ex5",
            "type": "fill-blank",
            "question": "___",
            "answer": "请你快一点儿",
            "hint": "有点儿 + Adjective/Verb (often negative) / Adjective/Verb + 一点儿 (often comparative)"
        },
        {
            "id": "hsk3i-congdao-ex1-ex6",
            "type": "reorder",
            "words": [
                "我有点儿累"
            ],
            "answer": "我有点儿累。",
            "hint": "有点儿 + Adjective/Verb (often negative) / Adjective/Verb + 一点儿 (often comparative)"
        },
        {
            "id": "hsk3i-congdao-ex1-ex7",
            "type": "reorder",
            "words": [
                "这件衣服有点儿贵"
            ],
            "answer": "这件衣服有点儿贵。",
            "hint": "有点儿 + Adjective/Verb (often negative) / Adjective/Verb + 一点儿 (often comparative)"
        },
        {
            "id": "hsk3i-congdao-ex1-ex8",
            "type": "reorder",
            "words": [
                "请你快一点儿"
            ],
            "answer": "请你快一点儿。",
            "hint": "有点儿 + Adjective/Verb (often negative) / Adjective/Verb + 一点儿 (often comparative)"
        },
        {
            "id": "hsk3i-congdao-ex1-ex9",
            "type": "reorder",
            "words": [
                "我有点儿累"
            ],
            "answer": "我有点儿累。",
            "hint": "有点儿 + Adjective/Verb (often negative) / Adjective/Verb + 一点儿 (often comparative)"
        },
        {
            "id": "hsk3i-congdao-ex1-ex10",
            "type": "reorder",
            "words": [
                "这件衣服有点儿贵"
            ],
            "answer": "这件衣服有点儿贵。",
            "hint": "有点儿 + Adjective/Verb (often negative) / Adjective/Verb + 一点儿 (often comparative)"
        },
        {
            "id": "hsk3i-congdao-ex1-ex11",
            "type": "translate",
            "question": "Please be a little faster (request for slight improvement).",
            "answer": "请你快一点儿。",
            "direction": "en-to-cn",
            "hint": "有点儿 + Adjective/Verb (often negative) / Adjective/Verb + 一点儿 (often comparative)"
        },
        {
            "id": "hsk3i-congdao-ex1-ex12",
            "type": "translate",
            "question": "我有点儿累。",
            "answer": "I'm a little tired (slight negative feeling).",
            "direction": "cn-to-en",
            "hint": "有点儿 + Adjective/Verb (often negative) / Adjective/Verb + 一点儿 (often comparative)"
        },
        {
            "id": "hsk3i-congdao-ex1-ex13",
            "type": "translate",
            "question": "This piece of clothing is a little expensive (slight dissatisfaction).",
            "answer": "这件衣服有点儿贵。",
            "direction": "en-to-cn",
            "hint": "有点儿 + Adjective/Verb (often negative) / Adjective/Verb + 一点儿 (often comparative)"
        },
        {
            "id": "hsk3i-congdao-ex1-ex14",
            "type": "translate",
            "question": "请你快一点儿。",
            "answer": "Please be a little faster (request for slight improvement).",
            "direction": "cn-to-en",
            "hint": "有点儿 + Adjective/Verb (often negative) / Adjective/Verb + 一点儿 (often comparative)"
        },
        {
            "id": "hsk3i-congdao-ex1-ex15",
            "type": "translate",
            "question": "I'm a little tired (slight negative feeling).",
            "answer": "我有点儿累。",
            "direction": "en-to-cn",
            "hint": "有点儿 + Adjective/Verb (often negative) / Adjective/Verb + 一点儿 (often comparative)"
        }
    ]
  },
  {
    "id": "hsk3i-taile-19",
    "band": "HSK3-I",
    "order": 18,
    "title": "Expressing Exaggeration or High Degree with 太…了 (tài…le)",
    "subtitle": "Indicates an excessive or very high degree of a quality or state.",
    "formula": "太 + Adjective/Verb + 了",
    "explanation": "The structure 太…了 (tài…le) is used to express an excessive or very high degree of a quality or state. It can convey both positive and negative emotions, such as excitement, surprise, complaint, or admiration. 太 (tài) means \"too\" or \"very\", and 了 (le) here emphasizes the extent.",
    "usageRules": [
      "太 (tài) is placed before an adjective or a psychological verb.",
      "了 (le) is placed at the end of the sentence.",
      "Can express both positive (e.g., 太好了!) and negative (e.g., 太贵了!) feelings.",
      "Cannot be negated directly with 不 (bù) before 太 (tài). Instead, use 不太 (bù tài) for \"not too\" or other negation structures."
    ],
    "examples": [
      {
        "chinese": "这件衣服太漂亮了！",
        "pinyin": "Zhè jiàn yīfu tài piàoliang le!",
        "english": "This dress is too beautiful! (positive exaggeration)",
        "highlight": "太漂亮了"
      },
      {
        "chinese": "今天太热了。",
        "pinyin": "Jīntiān tài rè le.",
        "english": "It's too hot today. (negative complaint)",
        "highlight": "太热了"
      },
      {
        "chinese": "他跑得太快了。",
        "pinyin": "Tā pǎo de tài kuài le.",
        "english": "He runs too fast.",
        "highlight": "太快了"
      },
      {
        "chinese": "这个电影太有意思了。",
        "pinyin": "Zhège diànyǐng tài yǒu yìsi le.",
        "english": "This movie is too interesting.",
        "highlight": "太有意思了"
      },
      {
        "chinese": "你太客气了。",
        "pinyin": "Nǐ tài kèqi le.",
        "english": "You are too polite.",
        "highlight": "太客气了"
      },
      {
        "chinese": "这个问题太难了。",
        "pinyin": "Zhège wèntí tài nán le.",
        "english": "This question is too difficult.",
        "highlight": "太难了"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to try to negate 太…了 (tài…le) directly with 不 (bù) before 太 (tài). Instead of saying \"不太…了\" to mean \"not too…\", one should use 不太 (bù tài) followed by the adjective/verb without 了 (le) at the end, or use other expressions for lesser degree.",
      "wrongExample": "今天不太热了。",
      "correctExample": "今天不太热。",
      "explanation": "When expressing \"not too\", 了 (le) is usually omitted. The structure 不太 + Adjective/Verb indicates a moderate degree, not an excessive one."
    },
    "exercises":     [
    {
            "id": "hsk3i-taile-19-fb1",
            "type": "fill-blank",
            "question": "这个菜___好吃了！",
            "answer": "太",
            "hint": "太...了 = too/extremely"
        },
        {
            "id": "hsk3i-taile-19-fb2",
            "type": "fill-blank",
            "question": "今天天气太热___！",
            "answer": "了",
            "hint": "太...了 structure"
        },
        {
            "id": "hsk3i-taile-19-fb3",
            "type": "fill-blank",
            "question": "这件衣服___贵了！",
            "answer": "太",
            "hint": "太 + Adjective + 了"
        },
        {
            "id": "hsk3i-taile-19-fb4",
            "type": "fill-blank",
            "question": "他说话太快___！",
            "answer": "了",
            "hint": "太...了 for emphasis"
        },
        {
            "id": "hsk3i-taile-19-fb5",
            "type": "fill-blank",
            "question": "这个问题___难了！",
            "answer": "太",
            "hint": "Use 太...了 to express excess"
        },
    
        {
            "id": "hsk3i-taile-19-ex1",
            "type": "reorder",
            "words": [
                "这件",
                "衣服",
                "漂亮",
                "太",
                "了"
            ],
            "answer": "这件衣服太漂亮了！",
            "hint": "太 + Adj + 了"
        },
        {
            "id": "hsk3i-taile-19-ex2",
            "type": "reorder",
            "words": [
                "今天",
                "热",
                "太",
                "了"
            ],
            "answer": "今天太热了。",
            "hint": "太 + Adj + 了"
        },
        {
            "id": "hsk3i-taile-19-ex3",
            "type": "reorder",
            "words": [
                "他",
                "跑得",
                "快",
                "太",
                "了"
            ],
            "answer": "他跑得太快了。",
            "hint": "太 + Adj + 了"
        },
        {
            "id": "hsk3i-taile-19-ex4",
            "type": "reorder",
            "words": [
                "这个",
                "电影",
                "有意思",
                "太",
                "了"
            ],
            "answer": "这个电影太有意思了。",
            "hint": "太 + Adj + 了"
        },
        {
            "id": "hsk3i-taile-19-ex5",
            "type": "reorder",
            "words": [
                "这杯",
                "咖啡",
                "苦",
                "太",
                "了"
            ],
            "answer": "这杯咖啡太苦了。",
            "hint": "太 + Adj + 了"
        },
        {
            "id": "hsk3i-taile-19-ex1",
            "type": "translate",
            "question": "This dress is too beautiful!",
            "answer": "这件衣服太漂亮了！",
            "direction": "en-to-cn",
            "hint": "Translate using 太...了"
        },
        {
            "id": "hsk3i-taile-19-ex2",
            "type": "translate",
            "question": "今天太热了。",
            "answer": "It's too hot today.",
            "direction": "cn-to-en",
            "hint": "Translate using 太...了"
        },
        {
            "id": "hsk3i-taile-19-ex3",
            "type": "translate",
            "question": "He runs too fast.",
            "answer": "他跑得太快了。",
            "direction": "en-to-cn",
            "hint": "Translate using 太...了"
        },
        {
            "id": "hsk3i-taile-19-ex4",
            "type": "translate",
            "question": "这个电影太有意思了。",
            "answer": "This movie is too interesting.",
            "direction": "cn-to-en",
            "hint": "Translate using 太...了"
        },
        {
            "id": "hsk3i-taile-19-ex5",
            "type": "translate",
            "question": "This coffee is too bitter.",
            "answer": "这杯咖啡太苦了。",
            "direction": "en-to-cn",
            "hint": "Translate using 太...了"
        }
    ]
  },
  {
    "id": "hsk3i-zhenzhende-20",
    "band": "HSK3-I",
    "order": 19,
    "title": "Emphasizing with 真 (zhēn) and 真的 (zhēnde)",
    "subtitle": "Expresses truth, sincerity, or strong emphasis.",
    "formula": "真 + Adjective/Verb / 真的 + Adjective/Verb",
    "explanation": "真 (zhēn) and 真的 (zhēnde) are used to add emphasis, meaning \"really\", \"truly\", or \"indeed\". 真 (zhēn) is an adverb that directly precedes an adjective or verb to intensify its meaning. 真的 (zhēnde) can also function as an adverb for emphasis, but it can also be used to confirm truthfulness or express sincerity, and can sometimes stand alone as an interjection.",
    "usageRules": [
      "真 (zhēn): Placed directly before an adjective or a psychological verb to express strong emphasis or sincerity.",
      "真的 (zhēnde): Can also be placed before an adjective or verb for emphasis, similar to 真. It can also be used to confirm truthfulness or express genuine feeling, and can be used at the beginning or end of a sentence.",
      "真 is more common in formal or literary contexts, while 真的 is more common in spoken language.",
      "Both can be used to express surprise or admiration."
    ],
    "examples": [
      {
        "chinese": "这个苹果真好吃。",
        "pinyin": "Zhège píngguǒ zhēn hǎochī.",
        "english": "This apple is really delicious.",
        "highlight": "真好吃"
      },
      {
        "chinese": "你真的来了！",
        "pinyin": "Nǐ zhēnde lái le!",
        "english": "You really came! (expressing surprise/confirmation)",
        "highlight": "真的来了"
      },
      {
        "chinese": "他真聪明。",
        "pinyin": "Tā zhēn cōngmíng.",
        "english": "He is truly smart.",
        "highlight": "真聪明"
      },
      {
        "chinese": "我真的不知道。",
        "pinyin": "Wǒ zhēnde bù zhīdào.",
        "english": "I really don't know.",
        "highlight": "真的不知道"
      },
      {
        "chinese": "这幅画真漂亮。",
        "pinyin": "Zhè fú huà zhēn piàoliang.",
        "english": "This painting is really beautiful.",
        "highlight": "真漂亮"
      },
      {
        "chinese": "你真的想去吗？",
        "pinyin": "Nǐ zhēnde xiǎng qù ma?",
        "english": "Do you really want to go?",
        "highlight": "真的想去"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 真 (zhēn) when a more conversational or emphatic tone is desired, where 真的 (zhēnde) would be more appropriate. While often interchangeable for simple emphasis, 真的 (zhēnde) has a broader usage, including confirming truth or expressing genuine feeling, and can be used more flexibly.",
      "wrongExample": "你真想去吗？",
      "correctExample": "你真的想去吗？",
      "explanation": "While \"你真想去吗?\" is not strictly wrong, \"你真的想去吗?\" sounds more natural and emphasizes the sincerity of the question in spoken Chinese."
    },
    "comparison": {
      "structure": "真 (zhēn) vs. 真的 (zhēnde)",
      "difference": "真 (zhēn) is an adverb for strong emphasis before adjectives/verbs. 真的 (zhēnde) also emphasizes but can additionally confirm truthfulness or express sincerity, and is more common in spoken language."
    },
    "exercises":     [
        {
            "id": "hsk3i-taile-ex1-ex1",
            "type": "fill-blank",
            "question": "___",
            "answer": "你真的来了",
            "hint": "真 + Adjective/Verb / 真的 + Adjective/Verb"
        },
        {
            "id": "hsk3i-taile-ex1-ex2",
            "type": "fill-blank",
            "question": "___",
            "answer": "他真聪明",
            "hint": "真 + Adjective/Verb / 真的 + Adjective/Verb"
        },
        {
            "id": "hsk3i-taile-ex1-ex3",
            "type": "fill-blank",
            "question": "___",
            "answer": "这个苹果真好吃",
            "hint": "真 + Adjective/Verb / 真的 + Adjective/Verb"
        },
        {
            "id": "hsk3i-taile-ex1-ex4",
            "type": "fill-blank",
            "question": "___",
            "answer": "你真的来了",
            "hint": "真 + Adjective/Verb / 真的 + Adjective/Verb"
        },
        {
            "id": "hsk3i-taile-ex1-ex5",
            "type": "fill-blank",
            "question": "___",
            "answer": "他真聪明",
            "hint": "真 + Adjective/Verb / 真的 + Adjective/Verb"
        },
        {
            "id": "hsk3i-taile-ex1-ex6",
            "type": "reorder",
            "words": [
                "这个苹果真好吃"
            ],
            "answer": "这个苹果真好吃。",
            "hint": "真 + Adjective/Verb / 真的 + Adjective/Verb"
        },
        {
            "id": "hsk3i-taile-ex1-ex7",
            "type": "reorder",
            "words": [
                "你真的来了"
            ],
            "answer": "你真的来了！",
            "hint": "真 + Adjective/Verb / 真的 + Adjective/Verb"
        },
        {
            "id": "hsk3i-taile-ex1-ex8",
            "type": "reorder",
            "words": [
                "他真聪明"
            ],
            "answer": "他真聪明。",
            "hint": "真 + Adjective/Verb / 真的 + Adjective/Verb"
        },
        {
            "id": "hsk3i-taile-ex1-ex9",
            "type": "reorder",
            "words": [
                "这个苹果真好吃"
            ],
            "answer": "这个苹果真好吃。",
            "hint": "真 + Adjective/Verb / 真的 + Adjective/Verb"
        },
        {
            "id": "hsk3i-taile-ex1-ex10",
            "type": "reorder",
            "words": [
                "你真的来了"
            ],
            "answer": "你真的来了！",
            "hint": "真 + Adjective/Verb / 真的 + Adjective/Verb"
        },
        {
            "id": "hsk3i-taile-ex1-ex11",
            "type": "translate",
            "question": "He is truly smart.",
            "answer": "他真聪明。",
            "direction": "en-to-cn",
            "hint": "真 + Adjective/Verb / 真的 + Adjective/Verb"
        },
        {
            "id": "hsk3i-taile-ex1-ex12",
            "type": "translate",
            "question": "这个苹果真好吃。",
            "answer": "This apple is really delicious.",
            "direction": "cn-to-en",
            "hint": "真 + Adjective/Verb / 真的 + Adjective/Verb"
        },
        {
            "id": "hsk3i-taile-ex1-ex13",
            "type": "translate",
            "question": "You really came! (expressing surprise/confirmation)",
            "answer": "你真的来了！",
            "direction": "en-to-cn",
            "hint": "真 + Adjective/Verb / 真的 + Adjective/Verb"
        },
        {
            "id": "hsk3i-taile-ex1-ex14",
            "type": "translate",
            "question": "他真聪明。",
            "answer": "He is truly smart.",
            "direction": "cn-to-en",
            "hint": "真 + Adjective/Verb / 真的 + Adjective/Verb"
        },
        {
            "id": "hsk3i-taile-ex1-ex15",
            "type": "translate",
            "question": "This apple is really delicious.",
            "answer": "这个苹果真好吃。",
            "direction": "en-to-cn",
            "hint": "真 + Adjective/Verb / 真的 + Adjective/Verb"
        }
    ]
  },
  {
    "id": "hsk3ii-de-01",
    "band": "HSK3-II",
    "order": 1,
    "title": "得 (de) as a Degree Complement",
    "subtitle": "Describing the manner or result of an action",
    "formula": "Verb + 得 + Adjective/Adverb Phrase",
    "explanation": "The structural particle 得 (de) is used after a verb to introduce a complement that describes the manner, degree, or result of the action. It connects the verb to the descriptive phrase, indicating how well or to what extent an action is performed.",
    "usageRules": [
      "得 always follows a verb.",
      "The complement after 得 can be an adjective, an adverb, or a phrase.",
      "If the verb has an object, the verb is usually repeated before 得, or the object is moved to the beginning of the sentence.",
      "Negation is expressed by placing 不 (bù) before the adjective or adverb in the complement.",
      "Questions can be formed by adding 吗 (ma) at the end or by using an A-not-A question with the complement."
    ],
    "examples": [
      {
        "chinese": "他跑得很快。",
        "pinyin": "Tā pǎo de hěn kuài.",
        "english": "He runs very fast.",
        "highlight": "得"
      },
      {
        "chinese": "她唱歌唱得很好听。",
        "pinyin": "Tā chànggē chàng de hěn hǎotīng.",
        "english": "She sings very beautifully.",
        "highlight": "得"
      },
      {
        "chinese": "他说汉语说得很流利。",
        "pinyin": "Tā shuō Hànyǔ shuō de hěn liúlì.",
        "english": "He speaks Chinese very fluently.",
        "highlight": "得"
      },
      {
        "chinese": "你做得对。",
        "pinyin": "Nǐ zuò de duì.",
        "english": "You did it correctly.",
        "highlight": "得"
      },
      {
        "chinese": "他高兴得跳了起来。",
        "pinyin": "Tā gāoxìng de tiào le qǐlái.",
        "english": "He was so happy that he jumped up.",
        "highlight": "得"
      },
      {
        "chinese": "饭做得怎么样？",
        "pinyin": "Fàn zuò de zěnmeyàng?",
        "english": "How is the food cooked?",
        "highlight": "得"
      },
      {
        "chinese": "他气得说不出话来。",
        "pinyin": "Tā qì de shuō bu chū huà lái.",
        "english": "He was so angry that he couldn't speak.",
        "highlight": "得"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is omitting 得 when describing the manner or result of an action, or confusing it with the possessive particle 的. Remember that 得 specifically connects a verb to its complement, while 的 connects a modifier to a noun.",
      "wrongExample": "他跑很快。",
      "correctExample": "他跑得很快。",
      "explanation": "To describe how he runs, 得 is necessary to link the verb 跑 (pǎo) with the descriptive complement 很快 (hěn kuài)."
    },
    "exercises":     [
    {
            "id": "hsk3ii-de-01-fb1",
            "type": "fill-blank",
            "question": "他跑___很快。",
            "answer": "得",
            "hint": "Verb + 得 + Complement (degree)"
        },
        {
            "id": "hsk3ii-de-01-fb2",
            "type": "fill-blank",
            "question": "她说汉语说___很好。",
            "answer": "得",
            "hint": "得 introduces a result complement"
        },
        {
            "id": "hsk3ii-de-01-fb3",
            "type": "fill-blank",
            "question": "他写字写___很漂亮。",
            "answer": "得",
            "hint": "Verb + 得 + Adjective"
        },
        {
            "id": "hsk3ii-de-01-fb4",
            "type": "fill-blank",
            "question": "你唱歌唱___怎么样？",
            "answer": "得",
            "hint": "得 for asking about quality"
        },
        {
            "id": "hsk3ii-de-01-fb5",
            "type": "fill-blank",
            "question": "她做饭做___很好吃。",
            "answer": "得",
            "hint": "Verb + 得 + Complement"
        },
    
        {
            "id": "hsk3ii-de-01-ex1",
            "type": "reorder",
            "words": [
                "他",
                "跑",
                "得",
                "很快"
            ],
            "answer": "他跑得很快。",
            "hint": "Verb + 得 + Adj"
        },
        {
            "id": "hsk3ii-de-01-ex2",
            "type": "reorder",
            "words": [
                "她",
                "唱歌",
                "唱",
                "得",
                "很好听"
            ],
            "answer": "她唱歌唱得很好听。",
            "hint": "Verb + 得 + Adj"
        },
        {
            "id": "hsk3ii-de-01-ex3",
            "type": "reorder",
            "words": [
                "他",
                "说",
                "汉语",
                "说",
                "得",
                "很流利"
            ],
            "answer": "他说汉语说得很流利。",
            "hint": "Verb + 得 + Adj"
        },
        {
            "id": "hsk3ii-de-01-ex4",
            "type": "reorder",
            "words": [
                "他",
                "写字",
                "写",
                "得",
                "很漂亮"
            ],
            "answer": "他写字写得很漂亮。",
            "hint": "Verb + 得 + Adj"
        },
        {
            "id": "hsk3ii-de-01-ex5",
            "type": "reorder",
            "words": [
                "她",
                "做饭",
                "做",
                "得",
                "很好吃"
            ],
            "answer": "她做饭做得很好吃。",
            "hint": "Verb + 得 + Adj"
        },
        {
            "id": "hsk3ii-de-01-ex1",
            "type": "translate",
            "question": "He runs very fast.",
            "answer": "他跑得很快。",
            "direction": "en-to-cn",
            "hint": "Translate using 得 as a degree complement"
        },
        {
            "id": "hsk3ii-de-01-ex2",
            "type": "translate",
            "question": "她唱歌唱得很好听。",
            "answer": "She sings very beautifully.",
            "direction": "cn-to-en",
            "hint": "Translate using 得 as a degree complement"
        },
        {
            "id": "hsk3ii-de-01-ex3",
            "type": "translate",
            "question": "He speaks Chinese very fluently.",
            "answer": "他说汉语说得很流利。",
            "direction": "en-to-cn",
            "hint": "Translate using 得 as a degree complement"
        },
        {
            "id": "hsk3ii-de-01-ex4",
            "type": "translate",
            "question": "他写字写得很漂亮。",
            "answer": "He writes characters very beautifully.",
            "direction": "cn-to-en",
            "hint": "Translate using 得 as a degree complement"
        },
        {
            "id": "hsk3ii-de-01-ex5",
            "type": "translate",
            "question": "She cooks very deliciously.",
            "answer": "她做饭做很好吃。",
            "direction": "en-to-cn",
            "hint": "Translate using 得 as a degree complement"
        }
    ]
  },
  {
    "id": "hsk3ii-ba-03",
    "band": "HSK3-II",
    "order": 2,
    "title": "把 (bǎ) Structure (Basic Disposal)",
    "subtitle": "Using 把 to indicate disposal or impact on an object",
    "formula": "Subject + 把 + Object + Verb + Other Element",
    "explanation": "The 把 (bǎ) structure is used to bring the object of a verb forward, placing it before the verb. This emphasizes the disposal or impact of the action on the object, often implying a change in its state or location. It's commonly used when the action results in the object being moved, changed, or dealt with in some way.",
    "usageRules": [
      "The object of the verb must be definite or specific.",
      "The verb must be transitive and typically followed by another element (e.g., a complement, 了, or another verb).",
      "Verbs that cannot be used with 把 include verbs of perception (看, 听), verbs of existence (有, 在), and verbs expressing mental activities (喜欢, 知道).",
      "The 把 structure cannot be used with potential complements.",
      "Negation (不, 没) and adverbs (很, 都) are placed before 把."
    ],
    "examples": [
      {
        "chinese": "我把书放在桌子上了。",
        "pinyin": "Wǒ bǎ shū fàng zài zhuōzi shàng le.",
        "english": "I put the book on the table.",
        "highlight": "把"
      },
      {
        "chinese": "请你把门关上。",
        "pinyin": "Qǐng nǐ bǎ mén guānshàng.",
        "english": "Please close the door.",
        "highlight": "把"
      },
      {
        "chinese": "他把作业做完了。",
        "pinyin": "Tā bǎ zuòyè zuò wán le.",
        "english": "He finished his homework.",
        "highlight": "把"
      },
      {
        "chinese": "我把钱花光了。",
        "pinyin": "Wǒ bǎ qián huā guāng le.",
        "english": "I spent all the money.",
        "highlight": "把"
      },
      {
        "chinese": "老师把问题解释得很清楚。",
        "pinyin": "Lǎoshī bǎ wèntí jiěshì de hěn qīngchu.",
        "english": "The teacher explained the problem very clearly.",
        "highlight": "把"
      },
      {
        "chinese": "你把窗户打开吧。",
        "pinyin": "Nǐ bǎ chuānghu dǎkāi ba.",
        "english": "You open the window.",
        "highlight": "把"
      },
      {
        "chinese": "我把手机弄丢了。",
        "pinyin": "Wǒ bǎ shǒujī nòng diū le.",
        "english": "I lost my phone.",
        "highlight": "把"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is using the 把 structure with verbs that do not involve disposal or impact on the object, or when the object is indefinite. The object must be specific and the verb must be followed by another element indicating the result or direction of the action.",
      "wrongExample": "我把一本书看。",
      "correctExample": "我看了一本书。 / 我把这本书看完了。",
      "explanation": "The first example is wrong because '一本书' (a book) is indefinite and there is no other element after the verb. The second example is correct because '这本书' (this book) is definite and '完了' (finished) indicates the result of the action."
    },
    "exercises":     [
        {
            "id": "hsk3ii-de-ex1-ex1",
            "type": "fill-blank",
            "question": "___",
            "answer": "请你把门关上",
            "hint": "Subject + 把 + Object + Verb + Other Element"
        },
        {
            "id": "hsk3ii-de-ex1-ex2",
            "type": "fill-blank",
            "question": "___",
            "answer": "他把作业做完了",
            "hint": "Subject + 把 + Object + Verb + Other Element"
        },
        {
            "id": "hsk3ii-de-ex1-ex3",
            "type": "fill-blank",
            "question": "___",
            "answer": "我把书放在桌子上了",
            "hint": "Subject + 把 + Object + Verb + Other Element"
        },
        {
            "id": "hsk3ii-de-ex1-ex4",
            "type": "fill-blank",
            "question": "___",
            "answer": "请你把门关上",
            "hint": "Subject + 把 + Object + Verb + Other Element"
        },
        {
            "id": "hsk3ii-de-ex1-ex5",
            "type": "fill-blank",
            "question": "___",
            "answer": "他把作业做完了",
            "hint": "Subject + 把 + Object + Verb + Other Element"
        },
        {
            "id": "hsk3ii-de-ex1-ex6",
            "type": "reorder",
            "words": [
                "我把书放在桌子上了"
            ],
            "answer": "我把书放在桌子上了。",
            "hint": "Subject + 把 + Object + Verb + Other Element"
        },
        {
            "id": "hsk3ii-de-ex1-ex7",
            "type": "reorder",
            "words": [
                "请你把门关上"
            ],
            "answer": "请你把门关上。",
            "hint": "Subject + 把 + Object + Verb + Other Element"
        },
        {
            "id": "hsk3ii-de-ex1-ex8",
            "type": "reorder",
            "words": [
                "他把作业做完了"
            ],
            "answer": "他把作业做完了。",
            "hint": "Subject + 把 + Object + Verb + Other Element"
        },
        {
            "id": "hsk3ii-de-ex1-ex9",
            "type": "reorder",
            "words": [
                "我把书放在桌子上了"
            ],
            "answer": "我把书放在桌子上了。",
            "hint": "Subject + 把 + Object + Verb + Other Element"
        },
        {
            "id": "hsk3ii-de-ex1-ex10",
            "type": "reorder",
            "words": [
                "请你把门关上"
            ],
            "answer": "请你把门关上。",
            "hint": "Subject + 把 + Object + Verb + Other Element"
        },
        {
            "id": "hsk3ii-de-ex1-ex11",
            "type": "translate",
            "question": "He finished his homework.",
            "answer": "他把作业做完了。",
            "direction": "en-to-cn",
            "hint": "Subject + 把 + Object + Verb + Other Element"
        },
        {
            "id": "hsk3ii-de-ex1-ex12",
            "type": "translate",
            "question": "我把书放在桌子上了。",
            "answer": "I put the book on the table.",
            "direction": "cn-to-en",
            "hint": "Subject + 把 + Object + Verb + Other Element"
        },
        {
            "id": "hsk3ii-de-ex1-ex13",
            "type": "translate",
            "question": "Please close the door.",
            "answer": "请你把门关上。",
            "direction": "en-to-cn",
            "hint": "Subject + 把 + Object + Verb + Other Element"
        },
        {
            "id": "hsk3ii-de-ex1-ex14",
            "type": "translate",
            "question": "他把作业做完了。",
            "answer": "He finished his homework.",
            "direction": "cn-to-en",
            "hint": "Subject + 把 + Object + Verb + Other Element"
        },
        {
            "id": "hsk3ii-de-ex1-ex15",
            "type": "translate",
            "question": "I put the book on the table.",
            "answer": "我把书放在桌子上了。",
            "direction": "en-to-cn",
            "hint": "Subject + 把 + Object + Verb + Other Element"
        }
    ]
  },
  {
    "id": "hsk3ii-budan-erqie-05",
    "band": "HSK3-II",
    "order": 3,
    "title": "不但…而且… (bùdàn… érqiě…) - Not only… but also…",
    "subtitle": "Expressing two related situations or characteristics, with the second being an addition or further emphasis",
    "formula": "Subject + 不但 + Clause 1 + 而且 + Clause 2",
    "explanation": "The structure 不但…而且… is used to connect two clauses, indicating that not only is the first situation true, but the second one is also true, often implying an additional or more significant point. It highlights a progressive relationship between the two parts.",
    "usageRules": [
      "Both clauses usually share the same subject, which is placed before 不但.",
      "If the subjects are different, the first subject comes before 不但, and the second subject comes after 而且.",
      "The second clause often expresses a deeper level, a more important aspect, or an unexpected result.",
      "Sometimes, 还 (hái) or 也 (yě) can be used after 而且 for added emphasis.",
      "The two clauses should be logically related and often show an increasing degree of intensity or importance."
    ],
    "examples": [
      {
        "chinese": "他不但会说汉语，而且会写汉字。",
        "pinyin": "Tā bùdàn huì shuō Hànyǔ, érqiě huì xiě Hànzì.",
        "english": "Not only can he speak Chinese, but he can also write Chinese characters.",
        "highlight": "不但...而且"
      },
      {
        "chinese": "这个饭馆不但菜好吃，而且服务也很好。",
        "pinyin": "Zhège fànguǎn bùdàn cài hǎochī, érqiě fúwù yě hěn hǎo.",
        "english": "Not only is the food in this restaurant delicious, but the service is also very good.",
        "highlight": "不但...而且"
      },
      {
        "chinese": "她不但学习好，而且唱歌也很好听。",
        "pinyin": "Tā bùdàn xuéxí hǎo, érqiě chànggē yě hěn hǎotīng.",
        "english": "Not only is she good at studying, but she also sings very well.",
        "highlight": "不但...而且"
      },
      {
        "chinese": "学汉语不但很有趣，而且很有用。",
        "pinyin": "Xué Hànyǔ bùdàn hěn yǒuqù, érqiě hěn yǒuyòng.",
        "english": "Learning Chinese is not only interesting, but also very useful.",
        "highlight": "不但...而且"
      },
      {
        "chinese": "他不但没生气，反而笑了。",
        "pinyin": "Tā bùdàn méi shēngqì, fǎn'ér xiàole.",
        "english": "Not only was he not angry, but he even smiled.",
        "highlight": "不但...反而"
      },
      {
        "chinese": "这本书不但内容丰富，而且价格便宜。",
        "pinyin": "Zhè běn shū bùdàn nèiróng fēngfù, érqiě jiàgé piányi.",
        "english": "This book is not only rich in content, but also cheap in price.",
        "highlight": "不但...而且"
      },
      {
        "chinese": "她不但会弹钢琴，而且还会拉小提琴。",
        "pinyin": "Tā bùdàn huì tán gāngqín, érqiě hái huì lā xiǎotíqín.",
        "english": "Not only can she play the piano, but she can also play the violin.",
        "highlight": "不但...而且"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 不但…而且… when the two clauses are not logically progressive or when the second clause does not add further emphasis. Ensure that the second clause builds upon or provides a stronger point than the first.",
      "wrongExample": "他不但吃饭，而且睡觉。",
      "correctExample": "他不但吃饭，而且还看电视。",
      "explanation": "The first example is wrong because eating and sleeping are two separate actions without a progressive relationship. The second example is correct because watching TV is an additional activity while eating."
    },
    "exercises":     [
    {
            "id": "hsk3ii-budan-erqie-05-fb1",
            "type": "fill-blank",
            "question": "他不但会说汉语，___会写汉字。",
            "answer": "而且",
            "hint": "不但...而且... = not only...but also..."
        },
        {
            "id": "hsk3ii-budan-erqie-05-fb2",
            "type": "fill-blank",
            "question": "___她漂亮，而且很聪明。",
            "answer": "不但",
            "hint": "不但 introduces the first point"
        },
        {
            "id": "hsk3ii-budan-erqie-05-fb3",
            "type": "fill-blank",
            "question": "这道菜不但好吃，___便宜。",
            "answer": "而且",
            "hint": "不但...而且... structure"
        },
        {
            "id": "hsk3ii-budan-erqie-05-fb4",
            "type": "fill-blank",
            "question": "他___会唱歌，而且会跳舞。",
            "answer": "不但",
            "hint": "Use 不但 to introduce first quality"
        },
        {
            "id": "hsk3ii-budan-erqie-05-fb5",
            "type": "fill-blank",
            "question": "不但我去，___他也去。",
            "answer": "而且",
            "hint": "而且 adds another point"
        },
    
        {
            "id": "hsk3ii-budan-erqie-05-ex1",
            "type": "reorder",
            "words": [
                "他",
                "会说",
                "汉语",
                "不但",
                "而且",
                "会写",
                "汉字"
            ],
            "answer": "他不但会说汉语，而且会写汉字。",
            "hint": "不但 + Clause 1 + 而且 + Clause 2"
        },
        {
            "id": "hsk3ii-budan-erqie-05-ex2",
            "type": "reorder",
            "words": [
                "这个",
                "饭馆",
                "菜",
                "好吃",
                "不但",
                "而且",
                "服务",
                "也",
                "很好"
            ],
            "answer": "这个饭馆不但菜好吃，而且服务也很好。",
            "hint": "不但 + Clause 1 + 而且 + Clause 2"
        },
        {
            "id": "hsk3ii-budan-erqie-05-ex3",
            "type": "reorder",
            "words": [
                "她",
                "学习",
                "好",
                "不但",
                "而且",
                "唱歌",
                "也",
                "很好听"
            ],
            "answer": "她不但学习好，而且唱歌也很好听。",
            "hint": "不但 + Clause 1 + 而且 + Clause 2"
        },
        {
            "id": "hsk3ii-budan-erqie-05-ex4",
            "type": "reorder",
            "words": [
                "这个",
                "手机",
                "便宜",
                "不但",
                "而且",
                "功能",
                "也",
                "很多"
            ],
            "answer": "这个手机不但便宜，而且功能也很多。",
            "hint": "不但 + Clause 1 + 而且 + Clause 2"
        },
        {
            "id": "hsk3ii-budan-erqie-05-ex5",
            "type": "reorder",
            "words": [
                "他",
                "聪明",
                "不但",
                "而且",
                "很",
                "努力"
            ],
            "answer": "他不但聪明，而且很努力。",
            "hint": "不但 + Clause 1 + 而且 + Clause 2"
        },
        {
            "id": "hsk3ii-budan-erqie-05-ex1",
            "type": "translate",
            "question": "Not only can he speak Chinese, but he can also write Chinese characters.",
            "answer": "他不但会说汉语，而且会写汉字。",
            "direction": "en-to-cn",
            "hint": "Translate using 不但...而且"
        },
        {
            "id": "hsk3ii-budan-erqie-05-ex2",
            "type": "translate",
            "question": "这个饭馆不但菜好吃，而且服务也很好。",
            "answer": "Not only is the food in this restaurant delicious, but the service is also very good.",
            "direction": "cn-to-en",
            "hint": "Translate using 不但...而且"
        },
        {
            "id": "hsk3ii-budan-erqie-05-ex3",
            "type": "translate",
            "question": "Not only is she good at studying, but she also sings very well.",
            "answer": "她不但学习好，而且唱歌也很好听。",
            "direction": "en-to-cn",
            "hint": "Translate using 不但...而且"
        },
        {
            "id": "hsk3ii-budan-erqie-05-ex4",
            "type": "translate",
            "question": "这个手机不但便宜，而且功能也很多。",
            "answer": "Not only is this phone cheap, but it also has many functions.",
            "direction": "cn-to-en",
            "hint": "Translate using 不但...而且"
        },
        {
            "id": "hsk3ii-budan-erqie-05-ex5",
            "type": "translate",
            "question": "Not only is he smart, but he is also very hardworking.",
            "answer": "他不但聪明，而且很努力。",
            "direction": "en-to-cn",
            "hint": "Translate using 不但...而且"
        }
    ]
  },
  {
    "id": "hsk3ii-yijiu-06",
    "band": "HSK3-II",
    "order": 4,
    "title": "一…就… (yī… jiù…) - As soon as… then…",
    "subtitle": "Expressing that one action immediately follows another",
    "formula": "Subject + 一 + Action 1 + 就 + Action 2",
    "explanation": "The structure 一…就… is used to indicate that the second action or event happens immediately after the first one. It emphasizes the close temporal relationship between two consecutive actions, often implying a cause-and-effect or sequential relationship.",
    "usageRules": [
      "The subject of both actions is usually the same. If different, the second subject comes after 就.",
      "The actions described are typically short and completed.",
      "It can be used to express a habitual action or a specific instance.",
      "Negation (不, 没) is usually placed before 一.",
      "The actions should be logically connected, with the first action triggering the second."
    ],
    "examples": [
      {
        "chinese": "我一回家就吃饭。",
        "pinyin": "Wǒ yī huí jiā jiù chīfàn.",
        "english": "As soon as I get home, I eat.",
        "highlight": "一...就"
      },
      {
        "chinese": "他一看到我就笑了。",
        "pinyin": "Tā yī kàndào wǒ jiù xiàole.",
        "english": "As soon as he saw me, he smiled.",
        "highlight": "一...就"
      },
      {
        "chinese": "我一听音乐就想跳舞。",
        "pinyin": "Wǒ yī tīng yīnyuè jiù xiǎng tiàowǔ.",
        "english": "As soon as I hear music, I want to dance.",
        "highlight": "一...就"
      },
      {
        "chinese": "她一到北京就给我打电话。",
        "pinyin": "Tā yī dào Běijīng jiù gěi wǒ dǎ diànhuà.",
        "english": "As soon as she arrived in Beijing, she called me.",
        "highlight": "一...就"
      },
      {
        "chinese": "老师一讲完，学生们就明白了。",
        "pinyin": "Lǎoshī yī jiǎng wán, xuéshēngmen jiù míngbái le.",
        "english": "As soon as the teacher finished speaking, the students understood.",
        "highlight": "一...就"
      },
      {
        "chinese": "他一累就睡觉。",
        "pinyin": "Tā yī lèi jiù shuìjiào.",
        "english": "As soon as he gets tired, he sleeps.",
        "highlight": "一...就"
      },
      {
        "chinese": "我一打开电脑就工作。",
        "pinyin": "Wǒ yī dǎkāi diànnǎo jiù gōngzuò.",
        "english": "As soon as I open the computer, I start working.",
        "highlight": "一...就"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 一…就… when the two actions are not closely related in time or when the second action is not a direct consequence of the first. The structure implies immediacy and a strong connection.",
      "wrongExample": "我一吃饭就看电视。",
      "correctExample": "我一边吃饭一边看电视。",
      "explanation": "The first example is wrong because eating and watching TV are often simultaneous, not sequential. The correct structure for simultaneous actions is 一边…一边…."
    },
    "exercises":     [
        {
            "id": "hsk3ii-budan-erqie-ex1-ex1",
            "type": "fill-blank",
            "question": "___",
            "answer": "他一看到我就笑了",
            "hint": "Subject + 一 + Action 1 + 就 + Action 2"
        },
        {
            "id": "hsk3ii-budan-erqie-ex1-ex2",
            "type": "fill-blank",
            "question": "___",
            "answer": "我一听音乐就想跳舞",
            "hint": "Subject + 一 + Action 1 + 就 + Action 2"
        },
        {
            "id": "hsk3ii-budan-erqie-ex1-ex3",
            "type": "fill-blank",
            "question": "___",
            "answer": "我一回家就吃饭",
            "hint": "Subject + 一 + Action 1 + 就 + Action 2"
        },
        {
            "id": "hsk3ii-budan-erqie-ex1-ex4",
            "type": "fill-blank",
            "question": "___",
            "answer": "他一看到我就笑了",
            "hint": "Subject + 一 + Action 1 + 就 + Action 2"
        },
        {
            "id": "hsk3ii-budan-erqie-ex1-ex5",
            "type": "fill-blank",
            "question": "___",
            "answer": "我一听音乐就想跳舞",
            "hint": "Subject + 一 + Action 1 + 就 + Action 2"
        },
        {
            "id": "hsk3ii-budan-erqie-ex1-ex6",
            "type": "reorder",
            "words": [
                "我一回家就吃饭"
            ],
            "answer": "我一回家就吃饭。",
            "hint": "Subject + 一 + Action 1 + 就 + Action 2"
        },
        {
            "id": "hsk3ii-budan-erqie-ex1-ex7",
            "type": "reorder",
            "words": [
                "他一看到我就笑了"
            ],
            "answer": "他一看到我就笑了。",
            "hint": "Subject + 一 + Action 1 + 就 + Action 2"
        },
        {
            "id": "hsk3ii-budan-erqie-ex1-ex8",
            "type": "reorder",
            "words": [
                "我一听音乐就想跳舞"
            ],
            "answer": "我一听音乐就想跳舞。",
            "hint": "Subject + 一 + Action 1 + 就 + Action 2"
        },
        {
            "id": "hsk3ii-budan-erqie-ex1-ex9",
            "type": "reorder",
            "words": [
                "我一回家就吃饭"
            ],
            "answer": "我一回家就吃饭。",
            "hint": "Subject + 一 + Action 1 + 就 + Action 2"
        },
        {
            "id": "hsk3ii-budan-erqie-ex1-ex10",
            "type": "reorder",
            "words": [
                "他一看到我就笑了"
            ],
            "answer": "他一看到我就笑了。",
            "hint": "Subject + 一 + Action 1 + 就 + Action 2"
        },
        {
            "id": "hsk3ii-budan-erqie-ex1-ex11",
            "type": "translate",
            "question": "As soon as I hear music, I want to dance.",
            "answer": "我一听音乐就想跳舞。",
            "direction": "en-to-cn",
            "hint": "Subject + 一 + Action 1 + 就 + Action 2"
        },
        {
            "id": "hsk3ii-budan-erqie-ex1-ex12",
            "type": "translate",
            "question": "我一回家就吃饭。",
            "answer": "As soon as I get home, I eat.",
            "direction": "cn-to-en",
            "hint": "Subject + 一 + Action 1 + 就 + Action 2"
        },
        {
            "id": "hsk3ii-budan-erqie-ex1-ex13",
            "type": "translate",
            "question": "As soon as he saw me, he smiled.",
            "answer": "他一看到我就笑了。",
            "direction": "en-to-cn",
            "hint": "Subject + 一 + Action 1 + 就 + Action 2"
        },
        {
            "id": "hsk3ii-budan-erqie-ex1-ex14",
            "type": "translate",
            "question": "我一听音乐就想跳舞。",
            "answer": "As soon as I hear music, I want to dance.",
            "direction": "cn-to-en",
            "hint": "Subject + 一 + Action 1 + 就 + Action 2"
        },
        {
            "id": "hsk3ii-budan-erqie-ex1-ex15",
            "type": "translate",
            "question": "As soon as I get home, I eat.",
            "answer": "我一回家就吃饭。",
            "direction": "en-to-cn",
            "hint": "Subject + 一 + Action 1 + 就 + Action 2"
        }
    ]
  },
  {
    "id": "hsk3ii-youyou-07",
    "band": "HSK3-II",
    "order": 5,
    "title": "又…又… (yòu… yòu…) - Both… and…",
    "subtitle": "Expressing the simultaneous existence of two states or actions",
    "formula": "Subject + 又 + Adjective/Verb + 又 + Adjective/Verb",
    "explanation": "The structure 又…又… is used to connect two adjectives or verbs, indicating that the subject possesses both qualities or performs both actions simultaneously. It is often used to describe a person, object, or situation with two parallel characteristics.",
    "usageRules": [
      "The two elements connected by 又…又… must be of the same grammatical category (e.g., both adjectives or both verbs).",
      "The two elements should be positive or negative in meaning, but not mixed (e.g., not '又好又坏').",
      "The subject is usually the same for both parts.",
      "It can be used to express a strong feeling or emphasis on the combination of the two characteristics.",
      "Adverbs like 很 (hěn) are generally not used before the adjectives in this structure."
    ],
    "examples": [
      {
        "chinese": "她又聪明又漂亮。",
        "pinyin": "Tā yòu cōngmíng yòu piàoliang.",
        "english": "She is both smart and beautiful.",
        "highlight": "又...又"
      },
      {
        "chinese": "这件衣服又便宜又好看。",
        "pinyin": "Zhè jiàn yīfu yòu piányi yòu hǎokàn.",
        "english": "This piece of clothing is both cheap and good-looking.",
        "highlight": "又...又"
      },
      {
        "chinese": "他走路又快又稳。",
        "pinyin": "Tā zǒulù yòu kuài yòu wěn.",
        "english": "He walks both fast and steady.",
        "highlight": "又...又"
      },
      {
        "chinese": "这个地方又安静又安全。",
        "pinyin": "Zhège dìfang yòu ānjìng yòu ānquán.",
        "english": "This place is both quiet and safe.",
        "highlight": "又...又"
      },
      {
        "chinese": "他周末又看书又听音乐。",
        "pinyin": "Tā zhōumò yòu kànshū yòu tīng yīnyuè.",
        "english": "He reads books and listens to music on the weekend.",
        "highlight": "又...又"
      },
      {
        "chinese": "这道菜又辣又咸。",
        "pinyin": "Zhè dào cài yòu là yòu xián.",
        "english": "This dish is both spicy and salty.",
        "highlight": "又...又"
      },
      {
        "chinese": "他说话又清楚又流利。",
        "pinyin": "Tā shuōhuà yòu qīngchu yòu liúlì.",
        "english": "He speaks both clearly and fluently.",
        "highlight": "又...又"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is mixing positive and negative qualities with 又…又…. While it is grammatically possible, it often sounds unnatural. It is best used to emphasize two parallel qualities, which are usually both positive or both negative. Also, avoid using adverbs like 很 (hěn) before the adjectives.",
      "wrongExample": "她又高又矮。",
      "correctExample": "她很高，但是有点矮。",
      "explanation": "The first example is contradictory. 又…又… should connect two compatible qualities. The second example uses a more natural way to express contrasting ideas."
    },
    "exercises":     [
    {
            "id": "hsk3ii-youyou-07-fb1",
            "type": "fill-blank",
            "question": "他___聪明___努力。",
            "answer": "又",
            "hint": "又...又... = both...and..."
        },
        {
            "id": "hsk3ii-youyou-07-fb2",
            "type": "fill-blank",
            "question": "这道菜又好吃___便宜。",
            "answer": "又",
            "hint": "又...又... for two qualities"
        },
        {
            "id": "hsk3ii-youyou-07-fb3",
            "type": "fill-blank",
            "question": "她___会唱歌又会跳舞。",
            "answer": "又",
            "hint": "又...又... structure"
        },
        {
            "id": "hsk3ii-youyou-07-fb4",
            "type": "fill-blank",
            "question": "今天___冷又下雨。",
            "answer": "又",
            "hint": "Use 又...又... for two conditions"
        },
        {
            "id": "hsk3ii-youyou-07-fb5",
            "type": "fill-blank",
            "question": "他___高___帅。",
            "answer": "又",
            "hint": "又...又... = both...and..."
        },
    
        {
            "id": "hsk3ii-youyou-07-ex1",
            "type": "reorder",
            "words": [
                "她",
                "聪明",
                "又",
                "漂亮",
                "又"
            ],
            "answer": "她又聪明又漂亮。",
            "hint": "又 + Adj + 又 + Adj"
        },
        {
            "id": "hsk3ii-youyou-07-ex2",
            "type": "reorder",
            "words": [
                "这件",
                "衣服",
                "便宜",
                "又",
                "好看",
                "又"
            ],
            "answer": "这件衣服又便宜又好看。",
            "hint": "又 + Adj + 又 + Adj"
        },
        {
            "id": "hsk3ii-youyou-07-ex3",
            "type": "reorder",
            "words": [
                "他",
                "走路",
                "快",
                "又",
                "稳",
                "又"
            ],
            "answer": "他走路又快又稳。",
            "hint": "又 + Adj + 又 + Adj"
        },
        {
            "id": "hsk3ii-youyou-07-ex4",
            "type": "reorder",
            "words": [
                "这个",
                "地方",
                "安静",
                "又",
                "美丽",
                "又"
            ],
            "answer": "这个地方又安静又美丽。",
            "hint": "又 + Adj + 又 + Adj"
        },
        {
            "id": "hsk3ii-youyou-07-ex5",
            "type": "reorder",
            "words": [
                "他",
                "高",
                "又",
                "帅",
                "又"
            ],
            "answer": "他又高又帅。",
            "hint": "又 + Adj + 又 + Adj"
        },
        {
            "id": "hsk3ii-youyou-07-ex1",
            "type": "translate",
            "question": "She is both smart and beautiful.",
            "answer": "她又聪明又漂亮。",
            "direction": "en-to-cn",
            "hint": "Translate using 又...又"
        },
        {
            "id": "hsk3ii-youyou-07-ex2",
            "type": "translate",
            "question": "这件衣服又便宜又好看。",
            "answer": "This piece of clothing is both cheap and good-looking.",
            "direction": "cn-to-en",
            "hint": "Translate using 又...又"
        },
        {
            "id": "hsk3ii-youyou-07-ex3",
            "type": "translate",
            "question": "He walks both fast and steady.",
            "answer": "他走路又快又稳。",
            "direction": "en-to-cn",
            "hint": "Translate using 又...又"
        },
        {
            "id": "hsk3ii-youyou-07-ex4",
            "type": "translate",
            "question": "这个地方又安静又美丽。",
            "answer": "This place is both quiet and beautiful.",
            "direction": "cn-to-en",
            "hint": "Translate using 又...又"
        },
        {
            "id": "hsk3ii-youyou-07-ex5",
            "type": "translate",
            "question": "He is both tall and handsome.",
            "answer": "他又高又帅。",
            "direction": "en-to-cn",
            "hint": "Translate using 又...又"
        }
    ]
  },
  {
    "id": "hsk3ii-jiranjiu-08",
    "band": "HSK3-II",
    "order": 6,
    "title": "既然…就… (jìrán… jiù…) - Since… then…",
    "subtitle": "Expressing a logical consequence based on a known premise",
    "formula": "既然 + Premise, (那么/就) + Consequence",
    "explanation": "The structure 既然…就… is used to introduce a premise or a known fact, followed by a logical conclusion or suggestion. 既然 (jìrán) means 'since' or 'as', and 就 (jiù) means 'then' or 'therefore'. It implies that given the premise, the consequence is natural or inevitable.",
    "usageRules": [
      "既然 introduces a known fact or a premise that is accepted by both speaker and listener.",
      "就 introduces the logical consequence, suggestion, or conclusion based on the premise.",
      "那么 (nàme) can sometimes be used instead of or in addition to 就, especially when the consequence is a suggestion or a decision.",
      "The subject of the two clauses can be the same or different.",
      "The consequence clause often contains modal verbs like 要 (yào), 应该 (yīnggāi), or 必须 (bìxū)."
    ],
    "examples": [
      {
        "chinese": "既然你来了，就多玩一会儿吧。",
        "pinyin": "Jìrán nǐ lái le, jiù duō wán yīhuìr ba.",
        "english": "Since you're here, then stay and play for a while.",
        "highlight": "既然...就"
      },
      {
        "chinese": "既然决定了，就不要后悔。",
        "pinyin": "Jìrán juédìng le, jiù bùyào hòuhuǐ.",
        "english": "Since you've decided, then don't regret it.",
        "highlight": "既然...就"
      },
      {
        "chinese": "既然下雨了，我们就别出去了。",
        "pinyin": "Jìrán xiàyǔ le, wǒmen jiù bié chūqù le.",
        "english": "Since it's raining, then let's not go out.",
        "highlight": "既然...就"
      },
      {
        "chinese": "既然他知道，就让他说吧。",
        "pinyin": "Jìrán tā zhīdào, jiù ràng tā shuō ba.",
        "english": "Since he knows, then let him speak.",
        "highlight": "既然...就"
      },
      {
        "chinese": "既然你答应了，就应该做到。",
        "pinyin": "Jìrán nǐ dāyìng le, jiù yīnggāi zuòdào.",
        "english": "Since you promised, then you should do it.",
        "highlight": "既然...就"
      },
      {
        "chinese": "既然没时间，就下次再来。",
        "pinyin": "Jìrán méi shíjiān, jiù xiàcì zàilái.",
        "english": "Since there's no time, then come again next time.",
        "highlight": "既然...就"
      },
      {
        "chinese": "既然是朋友，就互相帮助。",
        "pinyin": "Jìrán shì péngyǒu, jiù hùxiāng bāngzhù.",
        "english": "Since we are friends, then let's help each other.",
        "highlight": "既然...就"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 既然…就… when the premise is not a known fact or when the consequence is not a logical outcome. The structure implies a strong logical connection between the two clauses. Also, avoid using it for simple conditional statements where 如果…就… would be more appropriate.",
      "wrongExample": "既然明天不下雨，我就去公园。",
      "correctExample": "如果明天不下雨，我就去公园。",
      "explanation": "The first example is wrong because '明天不下雨' (it won't rain tomorrow) is not a known fact, but a hypothetical situation. For hypothetical situations, 如果…就… (if…then…) is more suitable."
    },
    "exercises":     [
        {
            "id": "hsk3ii-youyou-ex1-ex1",
            "type": "fill-blank",
            "question": "___",
            "answer": "既然决定了就不要后悔",
            "hint": "既然 + Premise, (那么/就) + Consequence"
        },
        {
            "id": "hsk3ii-youyou-ex1-ex2",
            "type": "fill-blank",
            "question": "___",
            "answer": "既然下雨了我们就别出去了",
            "hint": "既然 + Premise, (那么/就) + Consequence"
        },
        {
            "id": "hsk3ii-youyou-ex1-ex3",
            "type": "fill-blank",
            "question": "___",
            "answer": "既然你来了就多玩一会儿吧",
            "hint": "既然 + Premise, (那么/就) + Consequence"
        },
        {
            "id": "hsk3ii-youyou-ex1-ex4",
            "type": "fill-blank",
            "question": "___",
            "answer": "既然决定了就不要后悔",
            "hint": "既然 + Premise, (那么/就) + Consequence"
        },
        {
            "id": "hsk3ii-youyou-ex1-ex5",
            "type": "fill-blank",
            "question": "___",
            "answer": "既然下雨了我们就别出去了",
            "hint": "既然 + Premise, (那么/就) + Consequence"
        },
        {
            "id": "hsk3ii-youyou-ex1-ex6",
            "type": "reorder",
            "words": [
                "既然你来了就多玩一会儿吧"
            ],
            "answer": "既然你来了，就多玩一会儿吧。",
            "hint": "既然 + Premise, (那么/就) + Consequence"
        },
        {
            "id": "hsk3ii-youyou-ex1-ex7",
            "type": "reorder",
            "words": [
                "既然决定了就不要后悔"
            ],
            "answer": "既然决定了，就不要后悔。",
            "hint": "既然 + Premise, (那么/就) + Consequence"
        },
        {
            "id": "hsk3ii-youyou-ex1-ex8",
            "type": "reorder",
            "words": [
                "既然下雨了我们就别出去了"
            ],
            "answer": "既然下雨了，我们就别出去了。",
            "hint": "既然 + Premise, (那么/就) + Consequence"
        },
        {
            "id": "hsk3ii-youyou-ex1-ex9",
            "type": "reorder",
            "words": [
                "既然你来了就多玩一会儿吧"
            ],
            "answer": "既然你来了，就多玩一会儿吧。",
            "hint": "既然 + Premise, (那么/就) + Consequence"
        },
        {
            "id": "hsk3ii-youyou-ex1-ex10",
            "type": "reorder",
            "words": [
                "既然决定了就不要后悔"
            ],
            "answer": "既然决定了，就不要后悔。",
            "hint": "既然 + Premise, (那么/就) + Consequence"
        },
        {
            "id": "hsk3ii-youyou-ex1-ex11",
            "type": "translate",
            "question": "Since it's raining, then let's not go out.",
            "answer": "既然下雨了，我们就别出去了。",
            "direction": "en-to-cn",
            "hint": "既然 + Premise, (那么/就) + Consequence"
        },
        {
            "id": "hsk3ii-youyou-ex1-ex12",
            "type": "translate",
            "question": "既然你来了，就多玩一会儿吧。",
            "answer": "Since you're here, then stay and play for a while.",
            "direction": "cn-to-en",
            "hint": "既然 + Premise, (那么/就) + Consequence"
        },
        {
            "id": "hsk3ii-youyou-ex1-ex13",
            "type": "translate",
            "question": "Since you've decided, then don't regret it.",
            "answer": "既然决定了，就不要后悔。",
            "direction": "en-to-cn",
            "hint": "既然 + Premise, (那么/就) + Consequence"
        },
        {
            "id": "hsk3ii-youyou-ex1-ex14",
            "type": "translate",
            "question": "既然下雨了，我们就别出去了。",
            "answer": "Since it's raining, then let's not go out.",
            "direction": "cn-to-en",
            "hint": "既然 + Premise, (那么/就) + Consequence"
        },
        {
            "id": "hsk3ii-youyou-ex1-ex15",
            "type": "translate",
            "question": "Since you're here, then stay and play for a while.",
            "answer": "既然你来了，就多玩一会儿吧。",
            "direction": "en-to-cn",
            "hint": "既然 + Premise, (那么/就) + Consequence"
        }
    ]
  },
  {
    "id": "hsk3ii-chuleyiwai-09",
    "band": "HSK3-II",
    "order": 7,
    "title": "除了…以外 (chúle… yǐwài) - Besides / Except",
    "subtitle": "Expressing inclusion or exclusion of items or situations",
    "formula": "除了 + Noun/Clause + 以外, 都/也/还 + Verb/Clause",
    "explanation": "The structure 除了…以外 (chúle… yǐwài) is used to express either inclusion or exclusion, depending on the context and the adverb used in the second clause. When followed by 都 (dōu) or 也 (yě), it means 'besides' or 'in addition to'. When followed by 不 (bù) or 没 (méi), it means 'except for'.",
    "usageRules": [
      "When expressing 'besides' or 'in addition to', the second clause often uses 都 (dōu), 也 (yě), or 还 (hái).",
      "When expressing 'except for', the second clause often uses 不 (bù) or 没 (méi).",
      "以外 can sometimes be omitted, especially in informal speech, but it's good practice to include it.",
      "The subject of the second clause can be the same or different from the subject of the first clause.",
      "This structure is versatile and can be used with nouns, pronouns, or even clauses."
    ],
    "examples": [
      {
        "chinese": "除了汉语以外，我还会说英语。",
        "pinyin": "Chúle Hànyǔ yǐwài, wǒ hái huì shuō Yīngyǔ.",
        "english": "Besides Chinese, I can also speak English.",
        "highlight": "除了...以外"
      },
      {
        "chinese": "除了小王以外，其他人都来了。",
        "pinyin": "Chúle Xiǎo Wáng yǐwài, qítā rén dōu lái le.",
        "english": "Except for Xiao Wang, everyone else came.",
        "highlight": "除了...以外"
      },
      {
        "chinese": "除了周末，我每天都上班。",
        "pinyin": "Chúle zhōumò, wǒ měitiān dōu shàngbān.",
        "english": "Except for weekends, I go to work every day.",
        "highlight": "除了...以外"
      },
      {
        "chinese": "除了苹果，我还喜欢吃香蕉。",
        "pinyin": "Chúle píngguǒ, wǒ hái xǐhuān chī xiāngjiāo.",
        "english": "Besides apples, I also like to eat bananas.",
        "highlight": "除了...以外"
      },
      {
        "chinese": "除了他，没有人知道这件事。",
        "pinyin": "Chúle tā, méiyǒu rén zhīdào zhè jiàn shì.",
        "english": "Except for him, no one knows about this matter.",
        "highlight": "除了...以外"
      },
      {
        "chinese": "除了看电影，我们还可以去逛街。",
        "pinyin": "Chúle kàn diànyǐng, wǒmen hái kěyǐ qù guàngjiē.",
        "english": "Besides watching movies, we can also go shopping.",
        "highlight": "除了...以外"
      },
      {
        "chinese": "除了这本词典，其他的书我都不需要。",
        "pinyin": "Chúle zhè běn cídiǎn, qítā de shū wǒ dōu bù xūyào.",
        "english": "Except for this dictionary, I don't need any other books.",
        "highlight": "除了...以外"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is confusing the inclusive and exclusive meanings of 除了…以外. Remember to pay attention to the adverb (都/也/还 for inclusion, 不/没 for exclusion) in the second clause to correctly interpret the meaning. Misusing these adverbs can lead to misunderstanding.",
      "wrongExample": "除了他，大家也来了。 (Intended: Everyone came except him.)",
      "correctExample": "除了他，大家都没来。 (Everyone came except him.) / 除了他，大家也都来了。 (Everyone came, including him.)",
      "explanation": "The wrong example uses 也 (yě) which implies inclusion, contradicting the intended meaning of exclusion. To express exclusion, use 不 (bù) or 没 (méi) in the second clause."
    },
    "exercises":     [
    {
            "id": "hsk3ii-chuleyiwai-09-fb1",
            "type": "fill-blank",
            "question": "除了苹果___外，我还买了香蕉。",
            "answer": "以",
            "hint": "除了...以外 = besides/except"
        },
        {
            "id": "hsk3ii-chuleyiwai-09-fb2",
            "type": "fill-blank",
            "question": "___了他以外，大家都来了。",
            "answer": "除",
            "hint": "除了 = except for"
        },
        {
            "id": "hsk3ii-chuleyiwai-09-fb3",
            "type": "fill-blank",
            "question": "除了汉语以外，她___会说英语。",
            "answer": "还",
            "hint": "除了...以外，还 = besides...also"
        },
        {
            "id": "hsk3ii-chuleyiwai-09-fb4",
            "type": "fill-blank",
            "question": "除了周末___外，我每天上班。",
            "answer": "以",
            "hint": "除了...以外 structure"
        },
        {
            "id": "hsk3ii-chuleyiwai-09-fb5",
            "type": "fill-blank",
            "question": "___了这个，我还想要那个。",
            "answer": "除",
            "hint": "除了 = in addition to"
        },
    
        {
            "id": "hsk3ii-chuleyiwai-09-ex1",
            "type": "reorder",
            "words": [
                "汉语",
                "以外",
                "我",
                "会说",
                "英语",
                "除了",
                "还"
            ],
            "answer": "除了汉语以外，我还会说英语。",
            "hint": "除了 + Noun + 以外, 还 + Verb"
        },
        {
            "id": "hsk3ii-chuleyiwai-09-ex2",
            "type": "reorder",
            "words": [
                "小王",
                "以外",
                "其他",
                "人",
                "都",
                "来了",
                "除了"
            ],
            "answer": "除了小王以外，其他人都来了。",
            "hint": "除了 + Noun + 以外, 都 + Verb"
        },
        {
            "id": "hsk3ii-chuleyiwai-09-ex3",
            "type": "reorder",
            "words": [
                "周末",
                "以外",
                "我",
                "每天",
                "都",
                "上班",
                "除了"
            ],
            "answer": "除了周末以外，我每天都上班。",
            "hint": "除了 + Noun + 以外, 都 + Verb"
        },
        {
            "id": "hsk3ii-chuleyiwai-09-ex4",
            "type": "reorder",
            "words": [
                "苹果",
                "以外",
                "我",
                "喜欢",
                "吃",
                "香蕉",
                "除了",
                "还"
            ],
            "answer": "除了苹果以外，我还喜欢吃香蕉。",
            "hint": "除了 + Noun + 以外, 还 + Verb"
        },
        {
            "id": "hsk3ii-chuleyiwai-09-ex5",
            "type": "reorder",
            "words": [
                "他",
                "以外",
                "没有",
                "人",
                "知道",
                "这件事",
                "除了"
            ],
            "answer": "除了他以外，没有人知道这件事。",
            "hint": "除了 + Noun + 以外, 没有 + Verb"
        },
        {
            "id": "hsk3ii-chuleyiwai-09-ex1",
            "type": "translate",
            "question": "Besides Chinese, I can also speak English.",
            "answer": "除了汉语以外，我还会说英语。",
            "direction": "en-to-cn",
            "hint": "Translate using 除了...以外"
        },
        {
            "id": "hsk3ii-chuleyiwai-09-ex2",
            "type": "translate",
            "question": "除了小王以外，其他人都来了。",
            "answer": "Except for Xiao Wang, everyone else came.",
            "direction": "cn-to-en",
            "hint": "Translate using 除了...以外"
        },
        {
            "id": "hsk3ii-chuleyiwai-09-ex3",
            "type": "translate",
            "question": "Except for weekends, I go to work every day.",
            "answer": "除了周末以外，我每天都上班。",
            "direction": "en-to-cn",
            "hint": "Translate using 除了...以外"
        },
        {
            "id": "hsk3ii-chuleyiwai-09-ex4",
            "type": "translate",
            "question": "除了苹果以外，我还喜欢吃香蕉。",
            "answer": "Besides apples, I also like to eat bananas.",
            "direction": "cn-to-en",
            "hint": "Translate using 除了...以外"
        },
        {
            "id": "hsk3ii-chuleyiwai-09-ex5",
            "type": "translate",
            "question": "Except for him, no one knows about this matter.",
            "answer": "除了他以外，没有人知道这件事。",
            "direction": "en-to-cn",
            "hint": "Translate using 除了...以外"
        }
    ]
  },
  {
    "id": "hsk3ii-zhiyoucai-10",
    "band": "HSK3-II",
    "order": 8,
    "title": "只有…才… (zhǐyǒu… cái…) - Only if… then…",
    "subtitle": "Expressing a necessary condition for a certain outcome",
    "formula": "只有 + Condition, 才 + Result",
    "explanation": "The structure 只有…才… is used to emphasize that a certain result or action can only be achieved if a specific condition is met. 只有 (zhǐyǒu) introduces the unique or necessary condition, and 才 (cái) introduces the consequence that follows only from that condition.",
    "usageRules": [
      "只有 introduces the sole or indispensable condition.",
      "才 introduces the result or action that will occur only when the condition is fulfilled.",
      "The condition introduced by 只有 is often a prerequisite.",
      "The subject of the two clauses can be the same or different.",
      "This structure highlights the exclusivity of the condition."
    ],
    "examples": [
      {
        "chinese": "只有努力学习，才能取得好成绩。",
        "pinyin": "Zhǐyǒu nǔlì xuéxí, cái néng qǔdé hǎo chéngjī.",
        "english": "Only by studying hard can one achieve good grades.",
        "highlight": "只有...才"
      },
      {
        "chinese": "只有你来，我才去。",
        "pinyin": "Zhǐyǒu nǐ lái, wǒ cái qù.",
        "english": "Only if you come, will I go.",
        "highlight": "只有...才"
      },
      {
        "chinese": "只有多练习，才能说好汉语。",
        "pinyin": "Zhǐyǒu duō liànxí, cái néng shuō hǎo Hànyǔ.",
        "english": "Only by practicing more can one speak Chinese well.",
        "highlight": "只有...才"
      },
      {
        "chinese": "只有通过考试，才能拿到证书。",
        "pinyin": "Zhǐyǒu tōngguò kǎoshì, cái néng ná dào zhèngshū.",
        "english": "Only by passing the exam can one get the certificate.",
        "highlight": "只有...才"
      },
      {
        "chinese": "只有坚持不懈，才能成功。",
        "pinyin": "Zhǐyǒu jiānchí bùxiè, cái néng chénggōng.",
        "english": "Only by persevering can one succeed.",
        "highlight": "只有...才"
      },
      {
        "chinese": "只有亲自体验，才能真正了解。",
        "pinyin": "Zhǐyǒu qīnzì tǐyàn, cái néng zhēnzhèng liǎojiě.",
        "english": "Only by experiencing it oneself can one truly understand.",
        "highlight": "只有...才"
      },
      {
        "chinese": "只有付出，才会有回报。",
        "pinyin": "Zhǐyǒu fùchū, cái huì yǒu huíbào.",
        "english": "Only by giving will there be a return.",
        "highlight": "只有...才"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is confusing 只有…才… with 如果…就…. While both express conditional relationships, 只有…才… emphasizes a necessary and often exclusive condition, meaning the result will *only* happen if that condition is met. 如果…就… expresses a general or sufficient condition.",
      "wrongExample": "如果努力学习，才能取得好成绩。",
      "correctExample": "只有努力学习，才能取得好成绩。 / 如果努力学习，就能取得好成绩。",
      "explanation": "The first example is wrong because 如果 (if) implies a sufficient condition, but 才 (cái) implies a necessary condition. To express a necessary condition, 只有 (zhǐyǒu) should be used. If using 如果, then 就 (jiù) is more appropriate."
    },
    "exercises":     [
        {
            "id": "hsk3ii-chuleyiwai-ex1-ex1",
            "type": "fill-blank",
            "question": "___",
            "answer": "只有你来我才去",
            "hint": "只有 + Condition, 才 + Result"
        },
        {
            "id": "hsk3ii-chuleyiwai-ex1-ex2",
            "type": "fill-blank",
            "question": "___",
            "answer": "只有多练习才能说好汉语",
            "hint": "只有 + Condition, 才 + Result"
        },
        {
            "id": "hsk3ii-chuleyiwai-ex1-ex3",
            "type": "fill-blank",
            "question": "___",
            "answer": "只有努力学习才能取得好成绩",
            "hint": "只有 + Condition, 才 + Result"
        },
        {
            "id": "hsk3ii-chuleyiwai-ex1-ex4",
            "type": "fill-blank",
            "question": "___",
            "answer": "只有你来我才去",
            "hint": "只有 + Condition, 才 + Result"
        },
        {
            "id": "hsk3ii-chuleyiwai-ex1-ex5",
            "type": "fill-blank",
            "question": "___",
            "answer": "只有多练习才能说好汉语",
            "hint": "只有 + Condition, 才 + Result"
        },
        {
            "id": "hsk3ii-chuleyiwai-ex1-ex6",
            "type": "reorder",
            "words": [
                "只有努力学习才能取得好成绩"
            ],
            "answer": "只有努力学习，才能取得好成绩。",
            "hint": "只有 + Condition, 才 + Result"
        },
        {
            "id": "hsk3ii-chuleyiwai-ex1-ex7",
            "type": "reorder",
            "words": [
                "只有你来我才去"
            ],
            "answer": "只有你来，我才去。",
            "hint": "只有 + Condition, 才 + Result"
        },
        {
            "id": "hsk3ii-chuleyiwai-ex1-ex8",
            "type": "reorder",
            "words": [
                "只有多练习才能说好汉语"
            ],
            "answer": "只有多练习，才能说好汉语。",
            "hint": "只有 + Condition, 才 + Result"
        },
        {
            "id": "hsk3ii-chuleyiwai-ex1-ex9",
            "type": "reorder",
            "words": [
                "只有努力学习才能取得好成绩"
            ],
            "answer": "只有努力学习，才能取得好成绩。",
            "hint": "只有 + Condition, 才 + Result"
        },
        {
            "id": "hsk3ii-chuleyiwai-ex1-ex10",
            "type": "reorder",
            "words": [
                "只有你来我才去"
            ],
            "answer": "只有你来，我才去。",
            "hint": "只有 + Condition, 才 + Result"
        },
        {
            "id": "hsk3ii-chuleyiwai-ex1-ex11",
            "type": "translate",
            "question": "Only by practicing more can one speak Chinese well.",
            "answer": "只有多练习，才能说好汉语。",
            "direction": "en-to-cn",
            "hint": "只有 + Condition, 才 + Result"
        },
        {
            "id": "hsk3ii-chuleyiwai-ex1-ex12",
            "type": "translate",
            "question": "只有努力学习，才能取得好成绩。",
            "answer": "Only by studying hard can one achieve good grades.",
            "direction": "cn-to-en",
            "hint": "只有 + Condition, 才 + Result"
        },
        {
            "id": "hsk3ii-chuleyiwai-ex1-ex13",
            "type": "translate",
            "question": "Only if you come, will I go.",
            "answer": "只有你来，我才去。",
            "direction": "en-to-cn",
            "hint": "只有 + Condition, 才 + Result"
        },
        {
            "id": "hsk3ii-chuleyiwai-ex1-ex14",
            "type": "translate",
            "question": "只有多练习，才能说好汉语。",
            "answer": "Only by practicing more can one speak Chinese well.",
            "direction": "cn-to-en",
            "hint": "只有 + Condition, 才 + Result"
        },
        {
            "id": "hsk3ii-chuleyiwai-ex1-ex15",
            "type": "translate",
            "question": "Only by studying hard can one achieve good grades.",
            "answer": "只有努力学习，才能取得好成绩。",
            "direction": "en-to-cn",
            "hint": "只有 + Condition, 才 + Result"
        }
    ]
  },
  {
    "id": "hsk3ii-liandou-11",
    "band": "HSK3-II",
    "order": 9,
    "title": "连…都/也… (lián… dōu/yě…) - Even…",
    "subtitle": "Emphasizing an extreme or unexpected case",
    "formula": "连 + Noun/Pronoun + 都/也 + Verb/Adjective",
    "explanation": "The structure 连…都/也… is used to emphasize an extreme or unexpected situation, often implying that if even this extreme case is true, then other less extreme cases are also true. 连 (lián) means ‘even’, and 都 (dōu) or 也 (yě) reinforce the emphasis.",
    "usageRules": [
      "连 is placed before the emphasized noun or pronoun.",
      "都 or 也 is placed before the verb or adjective.",
      "This structure is often used to express surprise, unexpectedness, or to highlight an extreme example.",
      "It can be used in both affirmative and negative sentences.",
      "When used in negative sentences, it emphasizes that not even the most basic or expected thing is true."
    ],
    "examples": [
      {
        "chinese": "他连饭都没吃。",
        "pinyin": "Tā lián fàn dōu méi chī.",
        "english": "He didn't even eat.",
        "highlight": "连...都"
      },
      {
        "chinese": "我连他叫什么名字都不知道。",
        "pinyin": "Wǒ lián tā jiào shénme míngzi dōu bù zhīdào.",
        "english": "I don't even know what his name is.",
        "highlight": "连...都"
      },
      {
        "chinese": "这么简单的问题，连小孩子都知道。",
        "pinyin": "Zhème jiǎndān de wèntí, lián xiǎoháizi dōu zhīdào.",
        "english": "Such a simple question, even a child knows.",
        "highlight": "连...都"
      },
      {
        "chinese": "他病得很重，连水也喝不下。",
        "pinyin": "Tā bìng de hěn zhòng, lián shuǐ yě hē bù xià.",
        "english": "He is very sick, he can't even drink water.",
        "highlight": "连...也"
      },
      {
        "chinese": "连老师都觉得这个题目很难。",
        "pinyin": "Lián lǎoshī dōu juéde zhège tímù hěn nán.",
        "english": "Even the teacher thinks this question is very difficult.",
        "highlight": "连...都"
      },
      {
        "chinese": "他连中文歌都会唱。",
        "pinyin": "Tā lián Zhōngwén gē dōu huì chàng.",
        "english": "He can even sing Chinese songs.",
        "highlight": "连...都"
      },
      {
        "chinese": "我太累了，连走路都觉得困难。",
        "pinyin": "Wǒ tài lèi le, lián zǒulù dōu juéde kùnnan.",
        "english": "I'm too tired, even walking feels difficult.",
        "highlight": "连...都"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to omit 都 or 也 after 连, or to place them incorrectly. Both 连 and 都/也 are essential for the emphasis. Also, ensure that the emphasized element is placed directly after 连.",
      "wrongExample": "他连没吃饭。",
      "correctExample": "他连饭都没吃。",
      "explanation": "The negative adverb 没 should be placed after 都/也, not directly after 连. The emphasized noun (饭) should be between 连 and 都/也."
    },
    "exercises":     [
    {
            "id": "hsk3ii-liandou-11-fb1",
            "type": "fill-blank",
            "question": "他___这么简单的题都不会。",
            "answer": "连",
            "hint": "连...都... = even..."
        },
        {
            "id": "hsk3ii-liandou-11-fb2",
            "type": "fill-blank",
            "question": "连她___不知道。",
            "answer": "都",
            "hint": "连...都... structure"
        },
        {
            "id": "hsk3ii-liandou-11-fb3",
            "type": "fill-blank",
            "question": "___一点钱都没有。",
            "answer": "连",
            "hint": "连 introduces the extreme case"
        },
        {
            "id": "hsk3ii-liandou-11-fb4",
            "type": "fill-blank",
            "question": "连小孩___会做这道题。",
            "answer": "都",
            "hint": "连...都... = even a child..."
        },
        {
            "id": "hsk3ii-liandou-11-fb5",
            "type": "fill-blank",
            "question": "他___名字都忘了。",
            "answer": "连",
            "hint": "连...都... for emphasis"
        },
    
        {
            "id": "hsk3ii-liandou-11-ex1",
            "type": "reorder",
            "words": [
                "他",
                "饭",
                "没",
                "吃",
                "连",
                "都"
            ],
            "answer": "他连饭都没吃。",
            "hint": "连 + Noun + 都 + Negation + Verb"
        },
        {
            "id": "hsk3ii-liandou-11-ex2",
            "type": "reorder",
            "words": [
                "我",
                "他",
                "叫",
                "什么",
                "名字",
                "都",
                "不",
                "知道",
                "连"
            ],
            "answer": "我连他叫什么名字都不知道。",
            "hint": "连 + Clause + 都 + Negation + Verb"
        },
        {
            "id": "hsk3ii-liandou-11-ex3",
            "type": "reorder",
            "words": [
                "这么",
                "简单",
                "的",
                "问题",
                "小孩子",
                "都",
                "知道",
                "连"
            ],
            "answer": "这么简单的问题，连小孩子都知道。",
            "hint": "连 + Noun + 都 + Verb"
        },
        {
            "id": "hsk3ii-liandou-11-ex4",
            "type": "reorder",
            "words": [
                "她",
                "一个",
                "字",
                "不",
                "认识",
                "连",
                "都"
            ],
            "answer": "她连一个字都不认识。",
            "hint": "连 + Noun + 都 + Negation + Verb"
        },
        {
            "id": "hsk3ii-liandou-11-ex5",
            "type": "reorder",
            "words": [
                "我",
                "手机",
                "丢了",
                "连",
                "都"
            ],
            "answer": "我连手机都丢了。",
            "hint": "连 + Noun + 都 + Verb"
        },
        {
            "id": "hsk3ii-liandou-11-ex1",
            "type": "translate",
            "question": "He didn't even eat.",
            "answer": "他连饭都没吃。",
            "direction": "en-to-cn",
            "hint": "Translate using 连...都"
        },
        {
            "id": "hsk3ii-liandou-11-ex2",
            "type": "translate",
            "question": "我连他叫什么名字都不知道。",
            "answer": "I don't even know what his name is.",
            "direction": "cn-to-en",
            "hint": "Translate using 连...都"
        },
        {
            "id": "hsk3ii-liandou-11-ex3",
            "type": "translate",
            "question": "Such a simple question, even a child knows.",
            "answer": "这么简单的问题，连小孩子都知道。",
            "direction": "en-to-cn",
            "hint": "Translate using 连...都"
        },
        {
            "id": "hsk3ii-liandou-11-ex4",
            "type": "translate",
            "question": "她连一个字都不认识。",
            "answer": "She doesn't even recognize a single character.",
            "direction": "cn-to-en",
            "hint": "Translate using 连...都"
        },
        {
            "id": "hsk3ii-liandou-11-ex5",
            "type": "translate",
            "question": "I even lost my phone.",
            "answer": "我连手机都丢了。",
            "direction": "en-to-cn",
            "hint": "Translate using 连...都"
        }
    ]
  },
  {
    "id": "hsk3ii-yueyue-12",
    "band": "HSK3-II",
    "order": 10,
    "title": "越…越… (yuè… yuè…) - The more… the more…",
    "subtitle": "Expressing a proportional relationship between two changing situations",
    "formula": "越 + Adjective/Verb + 越 + Adjective/Verb",
    "explanation": "The structure 越…越… is used to indicate that as one situation or quality changes, another situation or quality changes proportionally. It shows a direct correlation between two progressive states or actions, often implying an increasing or decreasing trend.",
    "usageRules": [
      "The elements connected by 越…越… can be adjectives, verbs, or short phrases.",
      "The subject can be placed before the first 越 or between the two 越s if it's the same for both clauses.",
      "If the subjects are different, each 越 clause will have its own subject.",
      "It often describes a continuous change or development.",
      "Adverbs like 很 (hěn) are not used before the adjectives in this structure."
    ],
    "examples": [
      {
        "chinese": "你越说我越不明白。",
        "pinyin": "Nǐ yuè shuō wǒ yuè bù míngbái.",
        "english": "The more you speak, the less I understand.",
        "highlight": "越...越"
      },
      {
        "chinese": "天气越冷，我越喜欢吃火锅。",
        "pinyin": "Tiānqì yuè lěng, wǒ yuè xǐhuān chī huǒguō.",
        "english": "The colder the weather gets, the more I like to eat hotpot.",
        "highlight": "越...越"
      },
      {
        "chinese": "他越学越觉得汉语有意思。",
        "pinyin": "Tā yuè xué yuè juéde Hànyǔ yǒuyìsi.",
        "english": "The more he studies, the more he finds Chinese interesting.",
        "highlight": "越...越"
      },
      {
        "chinese": "路越走越远。",
        "pinyin": "Lù yuè zǒu yuè yuǎn",
        "english": "The further you walk, the further the road gets (or the road gets further and further).",
        "highlight": "越...越"
      },
      {
        "chinese": "孩子越长大越懂事。",
        "pinyin": "Háizi yuè zhǎng dà yuè dǒngshì.",
        "english": "The older the child gets, the more sensible he becomes.",
        "highlight": "越...越"
      },
      {
        "chinese": "这首歌我越听越喜欢。",
        "pinyin": "Zhè shǒu gē wǒ yuè tīng yuè xǐhuān.",
        "english": "The more I listen to this song, the more I like it.",
        "highlight": "越...越"
      },
      {
        "chinese": "问题越复杂，他越冷静。",
        "pinyin": "Wèntí yuè fùzá, tā yuè lěngjìng.",
        "english": "The more complex the problem, the calmer he becomes.",
        "highlight": "越...越"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use adverbs of degree like 很 (hěn) before the adjectives in the 越…越… structure. The structure itself implies a progressive change, so additional adverbs of degree are redundant and incorrect. Also, ensure the two clauses show a clear proportional relationship.",
      "wrongExample": "他越很努力越成功。",
      "correctExample": "他越努力越成功。",
      "explanation": "The adverb 很 (hěn) is not needed before 努力 (nǔlì) because 越…越… already expresses the increasing degree."
    },
    "exercises":     [
        {
            "id": "hsk3ii-liandou-ex1-ex1",
            "type": "fill-blank",
            "question": "___",
            "answer": "天气越冷我越喜欢吃火锅",
            "hint": "越 + Adjective/Verb + 越 + Adjective/Verb"
        },
        {
            "id": "hsk3ii-liandou-ex1-ex2",
            "type": "fill-blank",
            "question": "___",
            "answer": "他越学越觉得汉语有意思",
            "hint": "越 + Adjective/Verb + 越 + Adjective/Verb"
        },
        {
            "id": "hsk3ii-liandou-ex1-ex3",
            "type": "fill-blank",
            "question": "___",
            "answer": "你越说我越不明白",
            "hint": "越 + Adjective/Verb + 越 + Adjective/Verb"
        },
        {
            "id": "hsk3ii-liandou-ex1-ex4",
            "type": "fill-blank",
            "question": "___",
            "answer": "天气越冷我越喜欢吃火锅",
            "hint": "越 + Adjective/Verb + 越 + Adjective/Verb"
        },
        {
            "id": "hsk3ii-liandou-ex1-ex5",
            "type": "fill-blank",
            "question": "___",
            "answer": "他越学越觉得汉语有意思",
            "hint": "越 + Adjective/Verb + 越 + Adjective/Verb"
        },
        {
            "id": "hsk3ii-liandou-ex1-ex6",
            "type": "reorder",
            "words": [
                "你越说我越不明白"
            ],
            "answer": "你越说我越不明白。",
            "hint": "越 + Adjective/Verb + 越 + Adjective/Verb"
        },
        {
            "id": "hsk3ii-liandou-ex1-ex7",
            "type": "reorder",
            "words": [
                "天气越冷我越喜欢吃火锅"
            ],
            "answer": "天气越冷，我越喜欢吃火锅。",
            "hint": "越 + Adjective/Verb + 越 + Adjective/Verb"
        },
        {
            "id": "hsk3ii-liandou-ex1-ex8",
            "type": "reorder",
            "words": [
                "他越学越觉得汉语有意思"
            ],
            "answer": "他越学越觉得汉语有意思。",
            "hint": "越 + Adjective/Verb + 越 + Adjective/Verb"
        },
        {
            "id": "hsk3ii-liandou-ex1-ex9",
            "type": "reorder",
            "words": [
                "你越说我越不明白"
            ],
            "answer": "你越说我越不明白。",
            "hint": "越 + Adjective/Verb + 越 + Adjective/Verb"
        },
        {
            "id": "hsk3ii-liandou-ex1-ex10",
            "type": "reorder",
            "words": [
                "天气越冷我越喜欢吃火锅"
            ],
            "answer": "天气越冷，我越喜欢吃火锅。",
            "hint": "越 + Adjective/Verb + 越 + Adjective/Verb"
        },
        {
            "id": "hsk3ii-liandou-ex1-ex11",
            "type": "translate",
            "question": "The more he studies, the more he finds Chinese interesting.",
            "answer": "他越学越觉得汉语有意思。",
            "direction": "en-to-cn",
            "hint": "越 + Adjective/Verb + 越 + Adjective/Verb"
        },
        {
            "id": "hsk3ii-liandou-ex1-ex12",
            "type": "translate",
            "question": "你越说我越不明白。",
            "answer": "The more you speak, the less I understand.",
            "direction": "cn-to-en",
            "hint": "越 + Adjective/Verb + 越 + Adjective/Verb"
        },
        {
            "id": "hsk3ii-liandou-ex1-ex13",
            "type": "translate",
            "question": "The colder the weather gets, the more I like to eat hotpot.",
            "answer": "天气越冷，我越喜欢吃火锅。",
            "direction": "en-to-cn",
            "hint": "越 + Adjective/Verb + 越 + Adjective/Verb"
        },
        {
            "id": "hsk3ii-liandou-ex1-ex14",
            "type": "translate",
            "question": "他越学越觉得汉语有意思。",
            "answer": "The more he studies, the more he finds Chinese interesting.",
            "direction": "cn-to-en",
            "hint": "越 + Adjective/Verb + 越 + Adjective/Verb"
        },
        {
            "id": "hsk3ii-liandou-ex1-ex15",
            "type": "translate",
            "question": "The more you speak, the less I understand.",
            "answer": "你越说我越不明白。",
            "direction": "en-to-cn",
            "hint": "越 + Adjective/Verb + 越 + Adjective/Verb"
        }
    ]
  },
  {
    "id": "hsk3ii-xialaiqilai-14",
    "band": "HSK3-II",
    "order": 11,
    "title": "下去/下来/起来 (xiàqù/xiàlái/qǐlái) - Directional Complements",
    "subtitle": "Indicating continuation, completion, or initiation of an action",
    "formula": "Verb + 下去/下来/起来",
    "explanation": "下去 (xiàqù), 下来 (xiàlái), and 起来 (qǐlái) are directional complements that can also have abstract meanings. 下去 indicates the continuation of an action, 下来 indicates the completion or settling of an action, and 起来 indicates the beginning of an action or a change from a static to a dynamic state.",
    "usageRules": [
      "下去 (xiàqù) is used to express the continuation of an action or state, often implying 'to go on' or 'to continue'.",
      "下来 (xiàlái) can indicate the completion of an action, a movement from a higher to a lower position, or a state becoming stable or fixed.",
      "起来 (qǐlái) signifies the beginning of an action or state, or a movement from a lower to a higher position. It can also mean 'to seem' or 'to look' when used with adjectives.",
      "When used with an object, the object is placed between the verb and the complement (e.g., Verb + Object + Complement).",
      "These complements can also be used in a literal sense to indicate direction."
    ],
    "examples": [
      {
        "chinese": "请你继续说下去。",
        "pinyin": "Qǐng nǐ jìxù shuō xiàqù.",
        "english": "Please continue speaking.",
        "highlight": "下去"
      },
      {
        "chinese": "雨停下来了。",
        "pinyin": "Yǔ tíng xiàlái le.",
        "english": "The rain has stopped.",
        "highlight": "下来"
      },
      {
        "chinese": "他突然笑起来了。",
        "pinyin": "Tā túrán xiào qǐlái le.",
        "english": "He suddenly started laughing.",
        "highlight": "起来"
      },
      {
        "chinese": "这个计划要坚持下去。",
        "pinyin": "Zhège jìhuà yào jiānchí xiàqù.",
        "english": "This plan must be carried on.",
        "highlight": "下去"
      },
      {
        "chinese": "他把车停下来了。",
        "pinyin": "Tā bǎ chē tíng xiàlái le.",
        "english": "He stopped the car.",
        "highlight": "下来"
      },
      {
        "chinese": "天气暖和起来了。",
        "pinyin": "Tiānqì nuǎnhuo qǐlái le.",
        "english": "The weather is getting warmer.",
        "highlight": "起来"
      },
      {
        "chinese": "这个故事听起来很有趣。",
        "pinyin": "Zhège gùshì tīng qǐlái hěn yǒuqù.",
        "english": "This story sounds very interesting.",
        "highlight": "起来"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to confuse the abstract meanings of these complements. Remember that 下去 implies continuation, 下来 implies completion or stabilization, and 起来 implies initiation or an upward trend. The choice of complement depends on the specific context and the intended meaning.",
      "wrongExample": "他哭下去了。",
      "correctExample": "他哭起来了。",
      "explanation": "To express the beginning of crying, 起来 (qǐlái) is the correct complement. 下去 (xiàqù) would imply continuing to cry, which is not the intended meaning in this context."
    },
    "exercises":     [
    {
            "id": "hsk3ii-xialaiqilai-14-fb1",
            "type": "fill-blank",
            "question": "他慢慢地坐___来了。",
            "answer": "下",
            "hint": "下来 = movement downward/completion"
        },
        {
            "id": "hsk3ii-xialaiqilai-14-fb2",
            "type": "fill-blank",
            "question": "请把书拿___来。",
            "answer": "过",
            "hint": "过来 = movement toward speaker"
        },
        {
            "id": "hsk3ii-xialaiqilai-14-fb3",
            "type": "fill-blank",
            "question": "他站___来了。",
            "answer": "起",
            "hint": "起来 = start of action / upward movement"
        },
        {
            "id": "hsk3ii-xialaiqilai-14-fb4",
            "type": "fill-blank",
            "question": "天气暖和___来了。",
            "answer": "起",
            "hint": "起来 = beginning of a change"
        },
        {
            "id": "hsk3ii-xialaiqilai-14-fb5",
            "type": "fill-blank",
            "question": "他把书放___去了。",
            "answer": "下",
            "hint": "下去 = movement away/downward"
        },
    
        {
            "id": "hsk3ii-xialaiqilai-14-ex1",
            "type": "reorder",
            "words": [
                "请",
                "你",
                "继续",
                "说",
                "下去"
            ],
            "answer": "请你继续说下去。",
            "hint": "Verb + 下去"
        },
        {
            "id": "hsk3ii-xialaiqilai-14-ex2",
            "type": "reorder",
            "words": [
                "雨",
                "停",
                "下来",
                "了"
            ],
            "answer": "雨停下来了。",
            "hint": "Verb + 下来"
        },
        {
            "id": "hsk3ii-xialaiqilai-14-ex3",
            "type": "reorder",
            "words": [
                "他",
                "突然",
                "笑",
                "起来",
                "了"
            ],
            "answer": "他突然笑起来了。",
            "hint": "Verb + 起来"
        },
        {
            "id": "hsk3ii-xialaiqilai-14-ex4",
            "type": "reorder",
            "words": [
                "请",
                "你",
                "坐",
                "下来"
            ],
            "answer": "请你坐下来。",
            "hint": "Verb + 下来"
        },
        {
            "id": "hsk3ii-xialaiqilai-14-ex5",
            "type": "reorder",
            "words": [
                "他",
                "站",
                "起来",
                "了"
            ],
            "answer": "他站起来了。",
            "hint": "Verb + 起来"
        },
        {
            "id": "hsk3ii-xialaiqilai-14-ex1",
            "type": "translate",
            "question": "Please continue speaking.",
            "answer": "请你继续说下去。",
            "direction": "en-to-cn",
            "hint": "Translate using directional complements"
        },
        {
            "id": "hsk3ii-xialaiqilai-14-ex2",
            "type": "translate",
            "question": "雨停下来了。",
            "answer": "The rain has stopped.",
            "direction": "cn-to-en",
            "hint": "Translate using directional complements"
        },
        {
            "id": "hsk3ii-xialaiqilai-14-ex3",
            "type": "translate",
            "question": "He suddenly started laughing.",
            "answer": "他突然笑起来了。",
            "direction": "en-to-cn",
            "hint": "Translate using directional complements"
        },
        {
            "id": "hsk3ii-xialaiqilai-14-ex4",
            "type": "translate",
            "question": "请你坐下来。",
            "answer": "Please sit down.",
            "direction": "cn-to-en",
            "hint": "Translate using directional complements"
        },
        {
            "id": "hsk3ii-xialaiqilai-14-ex5",
            "type": "translate",
            "question": "He stood up.",
            "answer": "他站起来了。",
            "direction": "en-to-cn",
            "hint": "Translate using directional complements"
        }
    ]
  },
  {
    "id": "hsk3ii-haoxiangsihu-15",
    "band": "HSK3-II",
    "order": 12,
    "title": "好像/似乎 (hǎoxiàng/sìhū) - As if / Seem",
    "subtitle": "Expressing similarity, resemblance, or a subjective judgment",
    "formula": "好像/似乎 + Clause/Noun Phrase",
    "explanation": "好像 (hǎoxiàng) and 似乎 (sìhū) both mean ‘as if’, ‘seem’, or ‘it seems that’. They are used to express a subjective judgment, a guess, or to describe something that resembles another. 好像 is more colloquial and commonly used, while 似乎 is more formal and literary.",
    "usageRules": [
      "好像 (hǎoxiàng) is more commonly used in spoken Chinese and can be followed by a clause, a noun phrase, or a verb phrase.",
      "似乎 (sìhū) is more formal and literary, often used in written Chinese, and can also be followed by a clause or a phrase.",
      "Both can be used to express a guess or an impression.",
      "好像 can also be used to mean ‘to be like’ or ‘to resemble’.",
      "When expressing a negative, 不 (bù) is placed before 好像/似乎."
    ],
    "examples": [
      {
        "chinese": "他好像生病了。",
        "pinyin": "Tā hǎoxiàng shēngbìng le.",
        "english": "He seems to be sick.",
        "highlight": "好像"
      },
      {
        "chinese": "天空中似乎有星星。",
        "pinyin": "Tiānkōng zhōng sìhū yǒu xīngxīng.",
        "english": "There seem to be stars in the sky.",
        "highlight": "似乎"
      },
      {
        "chinese": "你好像见过他。",
        "pinyin": "Nǐ hǎoxiàng jiànguò tā.",
        "english": "You seem to have met him before.",
        "highlight": "好像"
      },
      {
        "chinese": "这个问题似乎很简单。",
        "pinyin": "Zhège wèntí sìhū hěn jiǎndān.",
        "english": "This problem seems very simple.",
        "highlight": "似乎"
      },
      {
        "chinese": "他好像在想什么。",
        "pinyin": "Tā hǎoxiàng zài xiǎng shénme.",
        "english": "He seems to be thinking about something.",
        "highlight": "好像"
      },
      {
        "chinese": "这个消息似乎是真的。",
        "pinyin": "Zhège xiāoxī sìhū shì zhēn de.",
        "english": "This news seems to be true.",
        "highlight": "似乎"
      },
      {
        "chinese": "她好像不高兴。",
        "pinyin": "Tā hǎoxiàng bù gāoxìng.",
        "english": "She seems unhappy.",
        "highlight": "好像"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is using 似乎 in casual conversation, where 好像 would be more natural. While both convey similar meanings, 似乎 carries a more formal and literary tone. Also, ensure that the context truly implies a subjective judgment or resemblance, rather than a definite statement.",
      "wrongExample": "你似乎很累。 (In casual conversation)",
      "correctExample": "你好像很累。",
      "explanation": "In everyday conversation, 好像 is preferred over 似乎 for expressing a casual observation or guess."
    },
    "exercises":     [
        {
            "id": "hsk3ii-xialaiqilai-ex1-ex1",
            "type": "fill-blank",
            "question": "你___像见过他。",
            "answer": "好",
            "hint": "Practice the '好像/似乎 + Clause/Noun Phrase' structure."
        },
        {
            "id": "hsk3ii-xialaiqilai-ex1-ex2",
            "type": "fill-blank",
            "question": "你好像见___他。",
            "answer": "过",
            "hint": "Practice the '好像/似乎 + Clause/Noun Phrase' structure."
        },
        {
            "id": "hsk3ii-xialaiqilai-ex1-ex3",
            "type": "fill-blank",
            "question": "天空中似___有星星。",
            "answer": "乎",
            "hint": "Practice the '好像/似乎 + Clause/Noun Phrase' structure."
        },
        {
            "id": "hsk3ii-xialaiqilai-ex1-ex4",
            "type": "fill-blank",
            "question": "天___中似乎有星星。",
            "answer": "空",
            "hint": "Practice the '好像/似乎 + Clause/Noun Phrase' structure."
        },
        {
            "id": "hsk3ii-xialaiqilai-ex1-ex5",
            "type": "fill-blank",
            "question": "你好像___过他。",
            "answer": "见",
            "hint": "Practice the '好像/似乎 + Clause/Noun Phrase' structure."
        },
        {
            "id": "hsk3ii-xialaiqilai-ex1-ex6",
            "type": "reorder",
            "words": [
                "星",
                "中",
                "有",
                "乎",
                "天",
                "空",
                "星",
                "似"
            ],
            "answer": "天空中似乎有星星。",
            "hint": "Reorder to form a sentence using the '好像/似乎 + Clause/Noun Phrase' structure."
        },
        {
            "id": "hsk3ii-xialaiqilai-ex1-ex7",
            "type": "reorder",
            "words": [
                "像",
                "见",
                "好",
                "你",
                "他",
                "过"
            ],
            "answer": "你好像见过他。",
            "hint": "Reorder to form a sentence using the '好像/似乎 + Clause/Noun Phrase' structure."
        },
        {
            "id": "hsk3ii-xialaiqilai-ex1-ex8",
            "type": "reorder",
            "words": [
                "星",
                "空",
                "星",
                "似",
                "天",
                "中",
                "有",
                "乎"
            ],
            "answer": "天空中似乎有星星。",
            "hint": "Reorder to form a sentence using the '好像/似乎 + Clause/Noun Phrase' structure."
        },
        {
            "id": "hsk3ii-xialaiqilai-ex1-ex9",
            "type": "reorder",
            "words": [
                "像",
                "好",
                "生",
                "了",
                "病",
                "他"
            ],
            "answer": "他好像生病了。",
            "hint": "Reorder to form a sentence using the '好像/似乎 + Clause/Noun Phrase' structure."
        },
        {
            "id": "hsk3ii-xialaiqilai-ex1-ex10",
            "type": "reorder",
            "words": [
                "生",
                "了",
                "他",
                "好",
                "病",
                "像"
            ],
            "answer": "他好像生病了。",
            "hint": "Reorder to form a sentence using the '好像/似乎 + Clause/Noun Phrase' structure."
        },
        {
            "id": "hsk3ii-xialaiqilai-ex1-ex11",
            "type": "translate",
            "question": "There seem to be stars in the sky.",
            "answer": "天空中似乎有星星。",
            "direction": "en-to-cn",
            "hint": "Translate using the '好像/似乎 + Clause/Noun Phrase' structure."
        },
        {
            "id": "hsk3ii-xialaiqilai-ex1-ex12",
            "type": "translate",
            "question": "他好像生病了。",
            "answer": "He seems to be sick.",
            "direction": "cn-to-en",
            "hint": "Translate using the '好像/似乎 + Clause/Noun Phrase' structure."
        },
        {
            "id": "hsk3ii-xialaiqilai-ex1-ex13",
            "type": "translate",
            "question": "You seem to have met him before.",
            "answer": "你好像见过他。",
            "direction": "en-to-cn",
            "hint": "Translate using the '好像/似乎 + Clause/Noun Phrase' structure."
        },
        {
            "id": "hsk3ii-xialaiqilai-ex1-ex14",
            "type": "translate",
            "question": "他好像生病了。",
            "answer": "He seems to be sick.",
            "direction": "cn-to-en",
            "hint": "Translate using the '好像/似乎 + Clause/Noun Phrase' structure."
        },
        {
            "id": "hsk3ii-xialaiqilai-ex1-ex15",
            "type": "translate",
            "question": "There seem to be stars in the sky.",
            "answer": "天空中似乎有星星。",
            "direction": "en-to-cn",
            "hint": "Translate using the '好像/似乎 + Clause/Noun Phrase' structure."
        }
    ]
  },
  {
    "id": "hsk3ii-rangjiaoshi-16",
    "band": "HSK3-II",
    "order": 13,
    "title": "让/叫/使 (ràng/jiào/shǐ) - Causative Verbs",
    "subtitle": "Expressing causation or permission",
    "formula": "Subject + 让/叫/使 + Object + Verb/Adjective Phrase",
    "explanation": "让 (ràng), 叫 (jiào), and 使 (shǐ) are causative verbs used to indicate that someone or something causes, allows, or makes another person or thing do something or be in a certain state. While they share similar meanings, their usage can vary in formality and nuance.",
    "usageRules": [
      "让 (ràng) is the most common and versatile, used for both permission (‘let’) and causation (‘make’, ‘cause’). It is suitable for both spoken and written Chinese.",
      "叫 (jiào) is similar to 让 but is generally more colloquial and often implies a stronger sense of command or instruction.",
      "使 (shǐ) is more formal and literary, often used in written contexts to express ‘cause’ or ‘enable’. It is less common in daily conversation.",
      "The object of 让/叫/使 is typically a person or an animate being.",
      "The verb or adjective phrase following the object describes the action or state that the object is caused to do or be in."
    ],
    "examples": [
      {
        "chinese": "老师让我回答问题。",
        "pinyin": "Lǎoshī ràng wǒ huídá wèntí.",
        "english": "The teacher asked me to answer the question.",
        "highlight": "让"
      },
      {
        "chinese": "妈妈叫我回家吃饭。",
        "pinyin": "Māma jiào wǒ huí jiā chīfàn.",
        "english": "Mom told me to go home and eat.",
        "highlight": "叫"
      },
      {
        "chinese": "他的话使我很感动。",
        "pinyin": "Tā de huà shǐ wǒ hěn gǎndòng.",
        "english": "His words moved me greatly.",
        "highlight": "使"
      },
      {
        "chinese": "请让我进去。",
        "pinyin": "Qǐng ràng wǒ jìnqù.",
        "english": "Please let me in.",
        "highlight": "让"
      },
      {
        "chinese": "别叫我等太久。",
        "pinyin": "Bié jiào wǒ děng tài jiǔ.",
        "english": "Don't make me wait too long.",
        "highlight": "叫"
      },
      {
        "chinese": "这次经历使他成长了很多。",
        "pinyin": "Zhè cì jīnglì shǐ tā chéngzhǎng le hěn duō.",
        "english": "This experience made him grow a lot.",
        "highlight": "使"
      },
      {
        "chinese": "他让我想起了我的家乡。",
        "pinyin": "Tā ràng wǒ xiǎngqǐ le wǒ de jiāxiāng.",
        "english": "He reminded me of my hometown.",
        "highlight": "让"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is using 使 in casual conversation, where 让 or 叫 would be more appropriate. While all three convey causation, 使 is reserved for more formal or written contexts. Also, ensure the object of the causative verb is clear and that the following phrase describes the caused action or state.",
      "wrongExample": "他使我吃惊。 (In casual conversation)",
      "correctExample": "他让我吃惊。",
      "explanation": "让 is more natural for expressing 'make me surprised' in everyday speech than 使."
    },
    "exercises":     [
        {
            "id": "hsk3ii-rangjiaoshi-16-ex1",
            "type": "fill-blank",
            "question": "老师___我回答问题。",
            "answer": "让",
            "hint": "Fill in the blank with '让'"
        },
        {
            "id": "hsk3ii-rangjiaoshi-16-ex2",
            "type": "fill-blank",
            "question": "老师___我回答问题。",
            "answer": "让",
            "hint": "Fill in the blank with '让'"
        },
        {
            "id": "hsk3ii-rangjiaoshi-16-ex3",
            "type": "fill-blank",
            "question": "老师___我回答问题。",
            "answer": "让",
            "hint": "Fill in the blank with '让'"
        },
        {
            "id": "hsk3ii-rangjiaoshi-16-ex4",
            "type": "fill-blank",
            "question": "妈妈___我回家吃饭。",
            "answer": "叫",
            "hint": "Fill in the blank with '叫'"
        },
        {
            "id": "hsk3ii-rangjiaoshi-16-ex5",
            "type": "fill-blank",
            "question": "老师___我回答问题。",
            "answer": "让",
            "hint": "Fill in the blank with '让'"
        },
        {
            "id": "hsk3ii-rangjiaoshi-16-ex1",
            "type": "fill-blank",
            "question": "老师___我回答问题。",
            "answer": "让",
            "hint": "Fill in the blank with '让'"
        },
        {
            "id": "hsk3ii-rangjiaoshi-16-ex2",
            "type": "fill-blank",
            "question": "老师___我回答问题。",
            "answer": "让",
            "hint": "Fill in the blank with '让'"
        },
        {
            "id": "hsk3ii-rangjiaoshi-16-ex3",
            "type": "fill-blank",
            "question": "老师___我回答问题。",
            "answer": "让",
            "hint": "Fill in the blank with '让'"
        },
        {
            "id": "hsk3ii-rangjiaoshi-16-ex4",
            "type": "fill-blank",
            "question": "妈妈___我回家吃饭。",
            "answer": "叫",
            "hint": "Fill in the blank with '叫'"
        },
        {
            "id": "hsk3ii-rangjiaoshi-16-ex5",
            "type": "fill-blank",
            "question": "老师___我回答问题。",
            "answer": "让",
            "hint": "Fill in the blank with '让'"
        },
        {
            "id": "hsk3ii-rangjiaoshi-16-ex6",
            "type": "reorder",
            "words": [
                "老师让我回答问题",
                "."
            ],
            "answer": "老师让我回答问题。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '让/叫/使 (ràng/jiào/shǐ) - Causative Verbs'"
        },
        {
            "id": "hsk3ii-rangjiaoshi-16-ex7",
            "type": "reorder",
            "words": [
                ".",
                "他的话使我很感动"
            ],
            "answer": "他的话使我很感动。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '让/叫/使 (ràng/jiào/shǐ) - Causative Verbs'"
        },
        {
            "id": "hsk3ii-rangjiaoshi-16-ex8",
            "type": "reorder",
            "words": [
                "老师让我回答问题",
                "."
            ],
            "answer": "老师让我回答问题。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '让/叫/使 (ràng/jiào/shǐ) - Causative Verbs'"
        },
        {
            "id": "hsk3ii-rangjiaoshi-16-ex9",
            "type": "reorder",
            "words": [
                ".",
                "他的话使我很感动"
            ],
            "answer": "他的话使我很感动。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '让/叫/使 (ràng/jiào/shǐ) - Causative Verbs'"
        },
        {
            "id": "hsk3ii-rangjiaoshi-16-ex10",
            "type": "reorder",
            "words": [
                "他的话使我很感动",
                "."
            ],
            "answer": "他的话使我很感动。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '让/叫/使 (ràng/jiào/shǐ) - Causative Verbs'"
        },
        {
            "id": "hsk3ii-rangjiaoshi-16-ex1",
            "type": "fill-blank",
            "question": "老师___我回答问题。",
            "answer": "让",
            "hint": "Fill in the blank with '让'"
        },
        {
            "id": "hsk3ii-rangjiaoshi-16-ex2",
            "type": "fill-blank",
            "question": "老师___我回答问题。",
            "answer": "让",
            "hint": "Fill in the blank with '让'"
        },
        {
            "id": "hsk3ii-rangjiaoshi-16-ex3",
            "type": "fill-blank",
            "question": "老师___我回答问题。",
            "answer": "让",
            "hint": "Fill in the blank with '让'"
        },
        {
            "id": "hsk3ii-rangjiaoshi-16-ex4",
            "type": "fill-blank",
            "question": "妈妈___我回家吃饭。",
            "answer": "叫",
            "hint": "Fill in the blank with '叫'"
        },
        {
            "id": "hsk3ii-rangjiaoshi-16-ex5",
            "type": "fill-blank",
            "question": "老师___我回答问题。",
            "answer": "让",
            "hint": "Fill in the blank with '让'"
        },
        {
            "id": "hsk3ii-rangjiaoshi-16-ex6",
            "type": "reorder",
            "words": [
                "老师让我回答问题",
                "."
            ],
            "answer": "老师让我回答问题。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '让/叫/使 (ràng/jiào/shǐ) - Causative Verbs'"
        },
        {
            "id": "hsk3ii-rangjiaoshi-16-ex7",
            "type": "reorder",
            "words": [
                ".",
                "他的话使我很感动"
            ],
            "answer": "他的话使我很感动。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '让/叫/使 (ràng/jiào/shǐ) - Causative Verbs'"
        },
        {
            "id": "hsk3ii-rangjiaoshi-16-ex8",
            "type": "reorder",
            "words": [
                "老师让我回答问题",
                "."
            ],
            "answer": "老师让我回答问题。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '让/叫/使 (ràng/jiào/shǐ) - Causative Verbs'"
        },
        {
            "id": "hsk3ii-rangjiaoshi-16-ex9",
            "type": "reorder",
            "words": [
                ".",
                "他的话使我很感动"
            ],
            "answer": "他的话使我很感动。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '让/叫/使 (ràng/jiào/shǐ) - Causative Verbs'"
        },
        {
            "id": "hsk3ii-rangjiaoshi-16-ex10",
            "type": "reorder",
            "words": [
                "他的话使我很感动",
                "."
            ],
            "answer": "他的话使我很感动。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '让/叫/使 (ràng/jiào/shǐ) - Causative Verbs'"
        },
        {
            "id": "hsk3ii-rangjiaoshi-16-ex11",
            "type": "translate",
            "question": "His words moved me greatly.",
            "answer": "他的话使我很感动。",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of '让/叫/使 (ràng/jiào/shǐ) - Causative Verbs'"
        },
        {
            "id": "hsk3ii-rangjiaoshi-16-ex12",
            "type": "translate",
            "question": "他的话使我很感动。",
            "answer": "His words moved me greatly.",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of '让/叫/使 (ràng/jiào/shǐ) - Causative Verbs'"
        },
        {
            "id": "hsk3ii-rangjiaoshi-16-ex13",
            "type": "translate",
            "question": "老师让我回答问题。",
            "answer": "The teacher asked me to answer the question.",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of '让/叫/使 (ràng/jiào/shǐ) - Causative Verbs'"
        },
        {
            "id": "hsk3ii-rangjiaoshi-16-ex14",
            "type": "translate",
            "question": "The teacher asked me to answer the question.",
            "answer": "老师让我回答问题。",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of '让/叫/使 (ràng/jiào/shǐ) - Causative Verbs'"
        },
        {
            "id": "hsk3ii-rangjiaoshi-16-ex15",
            "type": "translate",
            "question": "The teacher asked me to answer the question.",
            "answer": "老师让我回答问题。",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of '让/叫/使 (ràng/jiào/shǐ) - Causative Verbs'"
        }
    ]
  },
  {
    "id": "hsk3ii-bei-17",
    "band": "HSK3-II",
    "order": 14,
    "title": "被 (bèi) Structure (Basic Passive)",
    "subtitle": "Using 被 to indicate a passive voice construction",
    "formula": "Subject + 被 (+ Agent) + Verb + Other Element",
    "explanation": "The 被 (bèi) structure is used to form passive sentences in Chinese, indicating that the subject of the sentence is the recipient of an action, rather than the performer. It often implies an undesirable or negative outcome, but can also be neutral. The agent (performer of the action) can be omitted if it is unknown or unimportant.",
    "usageRules": [
      "被 is placed before the verb.",
      "The agent (performer of the action) can be included between 被 and the verb, often preceded by 给 (gěi).",
      "The verb in a 被 sentence must be transitive and usually followed by another element (e.g., a complement, 了, or another verb) indicating the result or completion of the action.",
      "Verbs that cannot be used with 被 include verbs of perception (看, 听), verbs of existence (有, 在), and verbs expressing mental activities (喜欢, 知道).",
      "Negation (没, 不) is placed before 被."
    ],
    "examples": [
      {
        "chinese": "我的钱包被偷了。",
        "pinyin": "Wǒ de qiánbāo bèi tōu le.",
        "english": "My wallet was stolen.",
        "highlight": "被"
      },
      {
        "chinese": "他被老师批评了。",
        "pinyin": "Tā bèi lǎoshī pīpíng le.",
        "english": "He was criticized by the teacher.",
        "highlight": "被"
      },
      {
        "chinese": "作业被风吹走了。",
        "pinyin": "Zuòyè bèi fēng chuī zǒu le.",
        "english": "The homework was blown away by the wind.",
        "highlight": "被"
      },
      {
        "chinese": "房间被打扫干净了。",
        "pinyin": "Fángjiān bèi dǎsǎo gānjìng le.",
        "english": "The room was cleaned.",
        "highlight": "被"
      },
      {
        "chinese": "我的手机被他拿走了。",
        "pinyin": "Wǒ de shǒujī bèi tā ná zǒu le.",
        "english": "My phone was taken by him.",
        "highlight": "被"
      },
      {
        "chinese": "那本书被我看完了。",
        "pinyin": "Nà běn shū bèi wǒ kàn wán le.",
        "english": "That book was finished by me.",
        "highlight": "被"
      },
      {
        "chinese": "他被雨淋湿了。",
        "pinyin": "Tā bèi yǔ lín shī le.",
        "english": "He was soaked by the rain.",
        "highlight": "被"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is using 被 with verbs that do not imply a passive action or when the outcome is clearly positive and the agent is not emphasized. While 被 can be neutral, it often carries a negative connotation. Also, ensure the verb is followed by another element indicating the result or completion.",
      "wrongExample": "我被吃饭了。",
      "correctExample": "我吃饭了。",
      "explanation": "吃饭 (chīfàn) is an active action, not a passive one. The 被 structure is not appropriate here."
    },
    "exercises":     [
        {
            "id": "hsk3ii-rangjiaoshi-ex1-ex1",
            "type": "fill-blank",
            "question": "他被老师批___了。",
            "answer": "评",
            "hint": "Practice the 'Subject + 被 (+ Agent) + Verb + Other Element' structure."
        },
        {
            "id": "hsk3ii-rangjiaoshi-ex1-ex2",
            "type": "fill-blank",
            "question": "他___老师批评了。",
            "answer": "被",
            "hint": "Practice the 'Subject + 被 (+ Agent) + Verb + Other Element' structure."
        },
        {
            "id": "hsk3ii-rangjiaoshi-ex1-ex3",
            "type": "fill-blank",
            "question": "我的钱包被偷___。",
            "answer": "了",
            "hint": "Practice the 'Subject + 被 (+ Agent) + Verb + Other Element' structure."
        },
        {
            "id": "hsk3ii-rangjiaoshi-ex1-ex4",
            "type": "fill-blank",
            "question": "我的___包被偷了。",
            "answer": "钱",
            "hint": "Practice the 'Subject + 被 (+ Agent) + Verb + Other Element' structure."
        },
        {
            "id": "hsk3ii-rangjiaoshi-ex1-ex5",
            "type": "fill-blank",
            "question": "我的钱包被偷___。",
            "answer": "了",
            "hint": "Practice the 'Subject + 被 (+ Agent) + Verb + Other Element' structure."
        },
        {
            "id": "hsk3ii-rangjiaoshi-ex1-ex6",
            "type": "reorder",
            "words": [
                "老",
                "了",
                "他",
                "被",
                "评",
                "师",
                "批"
            ],
            "answer": "他被老师批评了。",
            "hint": "Reorder to form a sentence using the 'Subject + 被 (+ Agent) + Verb + Other Element' structure."
        },
        {
            "id": "hsk3ii-rangjiaoshi-ex1-ex7",
            "type": "reorder",
            "words": [
                "钱",
                "偷",
                "包",
                "被",
                "的",
                "我",
                "了"
            ],
            "answer": "我的钱包被偷了。",
            "hint": "Reorder to form a sentence using the 'Subject + 被 (+ Agent) + Verb + Other Element' structure."
        },
        {
            "id": "hsk3ii-rangjiaoshi-ex1-ex8",
            "type": "reorder",
            "words": [
                "的",
                "钱",
                "被",
                "了",
                "偷",
                "包",
                "我"
            ],
            "answer": "我的钱包被偷了。",
            "hint": "Reorder to form a sentence using the 'Subject + 被 (+ Agent) + Verb + Other Element' structure."
        },
        {
            "id": "hsk3ii-rangjiaoshi-ex1-ex9",
            "type": "reorder",
            "words": [
                "风",
                "吹",
                "被",
                "走",
                "作",
                "了",
                "业"
            ],
            "answer": "作业被风吹走了。",
            "hint": "Reorder to form a sentence using the 'Subject + 被 (+ Agent) + Verb + Other Element' structure."
        },
        {
            "id": "hsk3ii-rangjiaoshi-ex1-ex10",
            "type": "reorder",
            "words": [
                "包",
                "偷",
                "我",
                "被",
                "钱",
                "了",
                "的"
            ],
            "answer": "我的钱包被偷了。",
            "hint": "Reorder to form a sentence using the 'Subject + 被 (+ Agent) + Verb + Other Element' structure."
        },
        {
            "id": "hsk3ii-rangjiaoshi-ex1-ex11",
            "type": "translate",
            "question": "My wallet was stolen.",
            "answer": "我的钱包被偷了。",
            "direction": "en-to-cn",
            "hint": "Translate using the 'Subject + 被 (+ Agent) + Verb + Other Element' structure."
        },
        {
            "id": "hsk3ii-rangjiaoshi-ex1-ex12",
            "type": "translate",
            "question": "作业被风吹走了。",
            "answer": "The homework was blown away by the wind.",
            "direction": "cn-to-en",
            "hint": "Translate using the 'Subject + 被 (+ Agent) + Verb + Other Element' structure."
        },
        {
            "id": "hsk3ii-rangjiaoshi-ex1-ex13",
            "type": "translate",
            "question": "My wallet was stolen.",
            "answer": "我的钱包被偷了。",
            "direction": "en-to-cn",
            "hint": "Translate using the 'Subject + 被 (+ Agent) + Verb + Other Element' structure."
        },
        {
            "id": "hsk3ii-rangjiaoshi-ex1-ex14",
            "type": "translate",
            "question": "我的钱包被偷了。",
            "answer": "My wallet was stolen.",
            "direction": "cn-to-en",
            "hint": "Translate using the 'Subject + 被 (+ Agent) + Verb + Other Element' structure."
        },
        {
            "id": "hsk3ii-rangjiaoshi-ex1-ex15",
            "type": "translate",
            "question": "The homework was blown away by the wind.",
            "answer": "作业被风吹走了。",
            "direction": "en-to-cn",
            "hint": "Translate using the 'Subject + 被 (+ Agent) + Verb + Other Element' structure."
        }
    ]
  },
  {
    "id": "hsk3ii-youxiedian-18",
    "band": "HSK3-II",
    "order": 15,
    "title": "有些/有点 (yǒuxiē/yǒudiǎnr) - Somewhat / A little bit",
    "subtitle": "Expressing a slight degree or a negative feeling",
    "formula": "有点儿 + Adjective/Verb (often negative) OR 有些 + Adjective/Noun/Verb",
    "explanation": "有些 (yǒuxiē) and 有点儿 (yǒudiǎnr) both mean ‘a little’ or ‘somewhat’, but they have different nuances and grammatical uses. 有点儿 often implies a negative or undesirable feeling, while 有些 is more neutral and can modify a wider range of words.",
    "usageRules": [
      "有点儿 (yǒudiǎnr) is typically used before adjectives or verbs, often to express a slight degree of something undesirable or a feeling of dissatisfaction.",
      "有些 (yǒuxiē) can be used before adjectives, nouns, or verbs. It is more neutral and can express a slight quantity or degree.",
      "有点儿 cannot be followed by a noun directly.",
      "有些 can be followed by a noun, meaning ‘some’ or ‘a few’.",
      "When expressing a positive feeling, it is more common to use 比较 (bǐjiào) or 挺 (tǐng) instead of 有点儿."
    ],
    "examples": [
      {
        "chinese": "我有点儿累。",
        "pinyin": "Wǒ yǒudiǎnr lèi.",
        "english": "I'm a little tired.",
        "highlight": "有点儿"
      },
      {
        "chinese": "这个问题有些难。",
        "pinyin": "Zhège wèntí yǒuxiē nán.",
        "english": "This problem is somewhat difficult.",
        "highlight": "有些"
      },
      {
        "chinese": "他有点儿不高兴。",
        "pinyin": "Tā yǒudiǎnr bù gāoxìng.",
        "english": "He's a little unhappy.",
        "highlight": "有点儿"
      },
      {
        "chinese": "有些学生喜欢运动。",
        "pinyin": "Yǒuxiē xuéshēng xǐhuān yùndòng.",
        "english": "Some students like sports.",
        "highlight": "有些"
      },
      {
        "chinese": "今天有点儿冷。",
        "pinyin": "Jīntiān yǒudiǎnr lěng.",
        "english": "It's a little cold today.",
        "highlight": "有点儿"
      },
      {
        "chinese": "我有些事情要处理。",
        "pinyin": "Wǒ yǒuxiē shìqíng yào chǔlǐ.",
        "english": "I have some matters to deal with.",
        "highlight": "有些"
      },
      {
        "chinese": "他有点儿胖。",
        "pinyin": "Tā yǒudiǎnr pàng.",
        "english": "He's a little fat.",
        "highlight": "有点儿"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is using 有点儿 with positive adjectives or when referring to a quantity of nouns. 有点儿 usually carries a negative or undesirable connotation, while 有些 is more neutral and can be used to mean 'some' when followed by a noun.",
      "wrongExample": "我有点儿高兴。",
      "correctExample": "我很高兴。 / 我有些高兴。",
      "explanation": "有点儿 is generally not used with positive emotions like '高兴' (happy). Use 很高兴 or 有些高兴 instead."
    },
    "exercises":     [
        {
            "id": "hsk3ii-youxiedian-18-ex1",
            "type": "fill-blank",
            "question": "我___儿累。",
            "answer": "有点",
            "hint": "Fill in the blank with '有点'"
        },
        {
            "id": "hsk3ii-youxiedian-18-ex2",
            "type": "fill-blank",
            "question": "他___儿不高兴。",
            "answer": "有点",
            "hint": "Fill in the blank with '有点'"
        },
        {
            "id": "hsk3ii-youxiedian-18-ex3",
            "type": "fill-blank",
            "question": "这个问题___难。",
            "answer": "有些",
            "hint": "Fill in the blank with '有些'"
        },
        {
            "id": "hsk3ii-youxiedian-18-ex4",
            "type": "fill-blank",
            "question": "他___儿不高兴。",
            "answer": "有点",
            "hint": "Fill in the blank with '有点'"
        },
        {
            "id": "hsk3ii-youxiedian-18-ex5",
            "type": "fill-blank",
            "question": "他___儿不高兴。",
            "answer": "有点",
            "hint": "Fill in the blank with '有点'"
        },
        {
            "id": "hsk3ii-youxiedian-18-ex1",
            "type": "fill-blank",
            "question": "我___儿累。",
            "answer": "有点",
            "hint": "Fill in the blank with '有点'"
        },
        {
            "id": "hsk3ii-youxiedian-18-ex2",
            "type": "fill-blank",
            "question": "他___儿不高兴。",
            "answer": "有点",
            "hint": "Fill in the blank with '有点'"
        },
        {
            "id": "hsk3ii-youxiedian-18-ex3",
            "type": "fill-blank",
            "question": "这个问题___难。",
            "answer": "有些",
            "hint": "Fill in the blank with '有些'"
        },
        {
            "id": "hsk3ii-youxiedian-18-ex4",
            "type": "fill-blank",
            "question": "他___儿不高兴。",
            "answer": "有点",
            "hint": "Fill in the blank with '有点'"
        },
        {
            "id": "hsk3ii-youxiedian-18-ex5",
            "type": "fill-blank",
            "question": "他___儿不高兴。",
            "answer": "有点",
            "hint": "Fill in the blank with '有点'"
        },
        {
            "id": "hsk3ii-youxiedian-18-ex6",
            "type": "reorder",
            "words": [
                "他有点儿不高兴",
                "."
            ],
            "answer": "他有点儿不高兴。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '有些/有点 (yǒuxiē/yǒudiǎnr) - Somewhat / A little bit'"
        },
        {
            "id": "hsk3ii-youxiedian-18-ex7",
            "type": "reorder",
            "words": [
                "他有点儿不高兴",
                "."
            ],
            "answer": "他有点儿不高兴。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '有些/有点 (yǒuxiē/yǒudiǎnr) - Somewhat / A little bit'"
        },
        {
            "id": "hsk3ii-youxiedian-18-ex8",
            "type": "reorder",
            "words": [
                "我有点儿累",
                "."
            ],
            "answer": "我有点儿累。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '有些/有点 (yǒuxiē/yǒudiǎnr) - Somewhat / A little bit'"
        },
        {
            "id": "hsk3ii-youxiedian-18-ex9",
            "type": "reorder",
            "words": [
                ".",
                "我有点儿累"
            ],
            "answer": "我有点儿累。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '有些/有点 (yǒuxiē/yǒudiǎnr) - Somewhat / A little bit'"
        },
        {
            "id": "hsk3ii-youxiedian-18-ex10",
            "type": "reorder",
            "words": [
                "他有点儿不高兴",
                "."
            ],
            "answer": "他有点儿不高兴。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '有些/有点 (yǒuxiē/yǒudiǎnr) - Somewhat / A little bit'"
        },
        {
            "id": "hsk3ii-youxiedian-18-ex1",
            "type": "fill-blank",
            "question": "我___儿累。",
            "answer": "有点",
            "hint": "Fill in the blank with '有点'"
        },
        {
            "id": "hsk3ii-youxiedian-18-ex2",
            "type": "fill-blank",
            "question": "他___儿不高兴。",
            "answer": "有点",
            "hint": "Fill in the blank with '有点'"
        },
        {
            "id": "hsk3ii-youxiedian-18-ex3",
            "type": "fill-blank",
            "question": "这个问题___难。",
            "answer": "有些",
            "hint": "Fill in the blank with '有些'"
        },
        {
            "id": "hsk3ii-youxiedian-18-ex4",
            "type": "fill-blank",
            "question": "他___儿不高兴。",
            "answer": "有点",
            "hint": "Fill in the blank with '有点'"
        },
        {
            "id": "hsk3ii-youxiedian-18-ex5",
            "type": "fill-blank",
            "question": "他___儿不高兴。",
            "answer": "有点",
            "hint": "Fill in the blank with '有点'"
        },
        {
            "id": "hsk3ii-youxiedian-18-ex6",
            "type": "reorder",
            "words": [
                "他有点儿不高兴",
                "."
            ],
            "answer": "他有点儿不高兴。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '有些/有点 (yǒuxiē/yǒudiǎnr) - Somewhat / A little bit'"
        },
        {
            "id": "hsk3ii-youxiedian-18-ex7",
            "type": "reorder",
            "words": [
                "他有点儿不高兴",
                "."
            ],
            "answer": "他有点儿不高兴。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '有些/有点 (yǒuxiē/yǒudiǎnr) - Somewhat / A little bit'"
        },
        {
            "id": "hsk3ii-youxiedian-18-ex8",
            "type": "reorder",
            "words": [
                "我有点儿累",
                "."
            ],
            "answer": "我有点儿累。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '有些/有点 (yǒuxiē/yǒudiǎnr) - Somewhat / A little bit'"
        },
        {
            "id": "hsk3ii-youxiedian-18-ex9",
            "type": "reorder",
            "words": [
                ".",
                "我有点儿累"
            ],
            "answer": "我有点儿累。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '有些/有点 (yǒuxiē/yǒudiǎnr) - Somewhat / A little bit'"
        },
        {
            "id": "hsk3ii-youxiedian-18-ex10",
            "type": "reorder",
            "words": [
                "他有点儿不高兴",
                "."
            ],
            "answer": "他有点儿不高兴。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '有些/有点 (yǒuxiē/yǒudiǎnr) - Somewhat / A little bit'"
        },
        {
            "id": "hsk3ii-youxiedian-18-ex11",
            "type": "translate",
            "question": "He's a little unhappy.",
            "answer": "他有点儿不高兴。",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of '有些/有点 (yǒuxiē/yǒudiǎnr) - Somewhat / A little bit'"
        },
        {
            "id": "hsk3ii-youxiedian-18-ex12",
            "type": "translate",
            "question": "我有点儿累。",
            "answer": "I'm a little tired.",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of '有些/有点 (yǒuxiē/yǒudiǎnr) - Somewhat / A little bit'"
        },
        {
            "id": "hsk3ii-youxiedian-18-ex13",
            "type": "translate",
            "question": "This problem is somewhat difficult.",
            "answer": "这个问题有些难。",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of '有些/有点 (yǒuxiē/yǒudiǎnr) - Somewhat / A little bit'"
        },
        {
            "id": "hsk3ii-youxiedian-18-ex14",
            "type": "translate",
            "question": "I'm a little tired.",
            "answer": "我有点儿累。",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of '有些/有点 (yǒuxiē/yǒudiǎnr) - Somewhat / A little bit'"
        },
        {
            "id": "hsk3ii-youxiedian-18-ex15",
            "type": "translate",
            "question": "This problem is somewhat difficult.",
            "answer": "这个问题有些难。",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of '有些/有点 (yǒuxiē/yǒudiǎnr) - Somewhat / A little bit'"
        }
    ]
  },
  {
    "id": "hsk3ii-shenmenna-19",
    "band": "HSK3-II",
    "order": 16,
    "title": "什么 (shénme) / 哪 (nǎ) - What / Which",
    "subtitle": "Distinguishing between general and specific interrogative pronouns",
    "formula": "什么 + Noun (general question) OR 哪 + Measure Word + Noun (specific choice)",
    "explanation": "什么 (shénme) and 哪 (nǎ) are both interrogative pronouns used to ask questions, but they differ in their scope. 什么 is used for general questions about 'what' or 'what kind of', while 哪 is used when asking 'which' among a limited or specified set of options, and it must be followed by a measure word.",
    "usageRules": [
      "什么 (shénme) is used to ask about an unknown thing, quality, or type. It can be followed by a noun or used alone.",
      "哪 (nǎ) is used to ask for a specific choice from a group. It must be followed by a measure word and then a noun.",
      "什么 can also be used to express 'anything' or 'nothing' in certain contexts, often with a negative verb.",
      "哪 can also be used in phrases like 哪里 (nǎlǐ - where) or 哪个 (nǎge - which one).",
      "When asking about a person's name, both 你叫什么名字？ (Nǐ jiào shénme míngzi?) and 你是哪国人？ (Nǐ shì nǎ guórén?) are common."
    ],
    "examples": [
      {
        "chinese": "你喜欢吃什么？",
        "pinyin": "Nǐ xǐhuān chī shénme?",
        "english": "What do you like to eat?",
        "highlight": "什么"
      },
      {
        "chinese": "这是什么书？",
        "pinyin": "Zhè shì shénme shū?",
        "english": "What kind of book is this?",
        "highlight": "什么"
      },
      {
        "chinese": "你要买哪件衣服？",
        "pinyin": "Nǐ yào mǎi nǎ jiàn yīfu?",
        "english": "Which piece of clothing do you want to buy?",
        "highlight": "哪件"
      },
      {
        "chinese": "哪个是你的？",
        "pinyin": "Nǎge shì nǐ de?",
        "english": "Which one is yours?",
        "highlight": "哪个"
      },
      {
        "chinese": "你学什么专业？",
        "pinyin": "Nǐ xué shénme zhuānyè?",
        "english": "What major are you studying?",
        "highlight": "什么"
      },
      {
        "chinese": "你住在哪个城市？",
        "pinyin": "Nǐ zhù zài nǎge chéngshì?",
        "english": "Which city do you live in?",
        "highlight": "哪个"
      },
      {
        "chinese": "他什么都没说。",
        "pinyin": "Tā shénme dōu méi shuō.",
        "english": "He didn't say anything.",
        "highlight": "什么都"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is using 哪 without a measure word, or using 什么 when a specific choice from a limited set is implied. Remember that 哪 almost always requires a measure word (or is part of a fixed phrase like 哪里), while 什么 is more general.",
      "wrongExample": "你要买哪衣服？",
      "correctExample": "你要买哪件衣服？",
      "explanation": "衣服 (yīfu) is a noun and requires a measure word (件 jiàn) when used with 哪 (nǎ)."
    },
    "exercises":     [
        {
            "id": "hsk3ii-youxiedian-ex1-ex1",
            "type": "fill-blank",
            "question": "你喜___吃什么？",
            "answer": "欢",
            "hint": "Practice the '什么 + Noun (general question) OR 哪 + Measure Word + Noun (specific choice)' structure."
        },
        {
            "id": "hsk3ii-youxiedian-ex1-ex2",
            "type": "fill-blank",
            "question": "这是什么___？",
            "answer": "书",
            "hint": "Practice the '什么 + Noun (general question) OR 哪 + Measure Word + Noun (specific choice)' structure."
        },
        {
            "id": "hsk3ii-youxiedian-ex1-ex3",
            "type": "fill-blank",
            "question": "你___欢吃什么？",
            "answer": "喜",
            "hint": "Practice the '什么 + Noun (general question) OR 哪 + Measure Word + Noun (specific choice)' structure."
        },
        {
            "id": "hsk3ii-youxiedian-ex1-ex4",
            "type": "fill-blank",
            "question": "___喜欢吃什么？",
            "answer": "你",
            "hint": "Practice the '什么 + Noun (general question) OR 哪 + Measure Word + Noun (specific choice)' structure."
        },
        {
            "id": "hsk3ii-youxiedian-ex1-ex5",
            "type": "fill-blank",
            "question": "这___什么书？",
            "answer": "是",
            "hint": "Practice the '什么 + Noun (general question) OR 哪 + Measure Word + Noun (specific choice)' structure."
        },
        {
            "id": "hsk3ii-youxiedian-ex1-ex6",
            "type": "reorder",
            "words": [
                "是",
                "什",
                "么",
                "书",
                "这"
            ],
            "answer": "这是什么书？",
            "hint": "Reorder to form a sentence using the '什么 + Noun (general question) OR 哪 + Measure Word + Noun (specific choice)' structure."
        },
        {
            "id": "hsk3ii-youxiedian-ex1-ex7",
            "type": "reorder",
            "words": [
                "喜",
                "什",
                "你",
                "么",
                "欢",
                "吃"
            ],
            "answer": "你喜欢吃什么？",
            "hint": "Reorder to form a sentence using the '什么 + Noun (general question) OR 哪 + Measure Word + Noun (specific choice)' structure."
        },
        {
            "id": "hsk3ii-youxiedian-ex1-ex8",
            "type": "reorder",
            "words": [
                "衣",
                "哪",
                "服",
                "要",
                "你",
                "件",
                "买"
            ],
            "answer": "你要买哪件衣服？",
            "hint": "Reorder to form a sentence using the '什么 + Noun (general question) OR 哪 + Measure Word + Noun (specific choice)' structure."
        },
        {
            "id": "hsk3ii-youxiedian-ex1-ex9",
            "type": "reorder",
            "words": [
                "是",
                "么",
                "什",
                "书",
                "这"
            ],
            "answer": "这是什么书？",
            "hint": "Reorder to form a sentence using the '什么 + Noun (general question) OR 哪 + Measure Word + Noun (specific choice)' structure."
        },
        {
            "id": "hsk3ii-youxiedian-ex1-ex10",
            "type": "reorder",
            "words": [
                "这",
                "是",
                "什",
                "书",
                "么"
            ],
            "answer": "这是什么书？",
            "hint": "Reorder to form a sentence using the '什么 + Noun (general question) OR 哪 + Measure Word + Noun (specific choice)' structure."
        },
        {
            "id": "hsk3ii-youxiedian-ex1-ex11",
            "type": "translate",
            "question": "What do you like to eat?",
            "answer": "你喜欢吃什么？",
            "direction": "en-to-cn",
            "hint": "Translate using the '什么 + Noun (general question) OR 哪 + Measure Word + Noun (specific choice)' structure."
        },
        {
            "id": "hsk3ii-youxiedian-ex1-ex12",
            "type": "translate",
            "question": "你喜欢吃什么？",
            "answer": "What do you like to eat?",
            "direction": "cn-to-en",
            "hint": "Translate using the '什么 + Noun (general question) OR 哪 + Measure Word + Noun (specific choice)' structure."
        },
        {
            "id": "hsk3ii-youxiedian-ex1-ex13",
            "type": "translate",
            "question": "What do you like to eat?",
            "answer": "你喜欢吃什么？",
            "direction": "en-to-cn",
            "hint": "Translate using the '什么 + Noun (general question) OR 哪 + Measure Word + Noun (specific choice)' structure."
        },
        {
            "id": "hsk3ii-youxiedian-ex1-ex14",
            "type": "translate",
            "question": "这是什么书？",
            "answer": "What kind of book is this?",
            "direction": "cn-to-en",
            "hint": "Translate using the '什么 + Noun (general question) OR 哪 + Measure Word + Noun (specific choice)' structure."
        },
        {
            "id": "hsk3ii-youxiedian-ex1-ex15",
            "type": "translate",
            "question": "What kind of book is this?",
            "answer": "这是什么书？",
            "direction": "en-to-cn",
            "hint": "Translate using the '什么 + Noun (general question) OR 哪 + Measure Word + Noun (specific choice)' structure."
        }
    ]
  },
  {
    "id": "hsk3ii-duome-20",
    "band": "HSK3-II",
    "order": 17,
    "title": "多么 (duōme) - How / What a",
    "subtitle": "Expressing exclamation or emphasis on degree",
    "formula": "多么 + Adjective/Verb + 啊/呀 (exclamatory) OR 多么 + Adjective/Verb (emphatic)",
    "explanation": "多么 (duōme) is an adverb used to express exclamation or to emphasize the high degree of a quality or action. It can be translated as ‘how’ or ‘what a’ in English, often conveying strong emotions like admiration, surprise, or even dissatisfaction.",
    "usageRules": [
      "多么 is typically placed before an adjective or a verb.",
      "It is often used in exclamatory sentences, sometimes followed by particles like 啊 (a) or 呀 (ya) to enhance the exclamatory tone.",
      "It can also be used in rhetorical questions to emphasize a point.",
      "Unlike 很 (hěn) or 非常 (fēicháng), 多么 is specifically for expressing a strong emotional emphasis rather than just stating a degree.",
      "It can be used with both positive and negative adjectives/verbs."
    ],
    "examples": [
      {
        "chinese": "多么漂亮的衣服啊！",
        "pinyin": "Duōme piàoliang de yīfu a!",
        "english": "What beautiful clothes!",
        "highlight": "多么"
      },
      {
        "chinese": "他多么努力啊！",
        "pinyin": "Tā duōme nǔlì a!",
        "english": "How hardworking he is!",
        "highlight": "多么"
      },
      {
        "chinese": "多么好的天气！",
        "pinyin": "Duōme hǎo de tiānqì!",
        "english": "What nice weather!",
        "highlight": "多么"
      },
      {
        "chinese": "你多么幸运啊！",
        "pinyin": "Nǐ duōme xìngyùn a!",
        "english": "How lucky you are!",
        "highlight": "多么"
      },
      {
        "chinese": "这幅画多么生动啊！",
        "pinyin": "Zhè fú huà duōme shēngdòng a!",
        "english": "How vivid this painting is!",
        "highlight": "多么"
      },
      {
        "chinese": "多么不容易啊！",
        "pinyin": "Duōme bù róngyì a!",
        "english": "How difficult it is!",
        "highlight": "多么"
      },
      {
        "chinese": "他多么希望成功啊！",
        "pinyin": "Tā duōme xīwàng chénggōng a!",
        "english": "How much he hopes to succeed!",
        "highlight": "多么"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 多么 as a simple intensifier like 很 or 非常. 多么 carries a strong exclamatory or emphatic tone and is usually used in contexts where the speaker wants to express strong feelings. It is not typically used in neutral descriptive sentences.",
      "wrongExample": "他多么高。",
      "correctExample": "他很高。 / 他多么高啊！",
      "explanation": "The first example is grammatically correct but sounds unnatural without an exclamatory particle or context. For a simple statement of height, 很 (hěn) is sufficient. 多么 is used for emphasis."
    },
    "exercises":     [
        {
            "id": "hsk3ii-duome-20-ex1",
            "type": "fill-blank",
            "question": "他___努力啊！",
            "answer": "多么",
            "hint": "Fill in the blank with '多么'"
        },
        {
            "id": "hsk3ii-duome-20-ex2",
            "type": "fill-blank",
            "question": "他___努力啊！",
            "answer": "多么",
            "hint": "Fill in the blank with '多么'"
        },
        {
            "id": "hsk3ii-duome-20-ex3",
            "type": "fill-blank",
            "question": "他___努力啊！",
            "answer": "多么",
            "hint": "Fill in the blank with '多么'"
        },
        {
            "id": "hsk3ii-duome-20-ex4",
            "type": "fill-blank",
            "question": "___漂亮的衣服啊！",
            "answer": "多么",
            "hint": "Fill in the blank with '多么'"
        },
        {
            "id": "hsk3ii-duome-20-ex5",
            "type": "fill-blank",
            "question": "___好的天气！",
            "answer": "多么",
            "hint": "Fill in the blank with '多么'"
        },
        {
            "id": "hsk3ii-duome-20-ex1",
            "type": "fill-blank",
            "question": "他___努力啊！",
            "answer": "多么",
            "hint": "Fill in the blank with '多么'"
        },
        {
            "id": "hsk3ii-duome-20-ex2",
            "type": "fill-blank",
            "question": "他___努力啊！",
            "answer": "多么",
            "hint": "Fill in the blank with '多么'"
        },
        {
            "id": "hsk3ii-duome-20-ex3",
            "type": "fill-blank",
            "question": "他___努力啊！",
            "answer": "多么",
            "hint": "Fill in the blank with '多么'"
        },
        {
            "id": "hsk3ii-duome-20-ex4",
            "type": "fill-blank",
            "question": "___漂亮的衣服啊！",
            "answer": "多么",
            "hint": "Fill in the blank with '多么'"
        },
        {
            "id": "hsk3ii-duome-20-ex5",
            "type": "fill-blank",
            "question": "___好的天气！",
            "answer": "多么",
            "hint": "Fill in the blank with '多么'"
        },
        {
            "id": "hsk3ii-duome-20-ex6",
            "type": "reorder",
            "words": [
                "!",
                "多么漂亮的衣服啊"
            ],
            "answer": "多么漂亮的衣服啊！",
            "hint": "Reorder the words to form a correct sentence using the grammar of '多么 (duōme) - How / What a'"
        },
        {
            "id": "hsk3ii-duome-20-ex7",
            "type": "reorder",
            "words": [
                "!",
                "多么好的天气"
            ],
            "answer": "多么好的天气！",
            "hint": "Reorder the words to form a correct sentence using the grammar of '多么 (duōme) - How / What a'"
        },
        {
            "id": "hsk3ii-duome-20-ex8",
            "type": "reorder",
            "words": [
                "!",
                "多么好的天气"
            ],
            "answer": "多么好的天气！",
            "hint": "Reorder the words to form a correct sentence using the grammar of '多么 (duōme) - How / What a'"
        },
        {
            "id": "hsk3ii-duome-20-ex9",
            "type": "reorder",
            "words": [
                "多么漂亮的衣服啊",
                "!"
            ],
            "answer": "多么漂亮的衣服啊！",
            "hint": "Reorder the words to form a correct sentence using the grammar of '多么 (duōme) - How / What a'"
        },
        {
            "id": "hsk3ii-duome-20-ex10",
            "type": "reorder",
            "words": [
                "!",
                "多么漂亮的衣服啊"
            ],
            "answer": "多么漂亮的衣服啊！",
            "hint": "Reorder the words to form a correct sentence using the grammar of '多么 (duōme) - How / What a'"
        },
        {
            "id": "hsk3ii-duome-20-ex1",
            "type": "fill-blank",
            "question": "他___努力啊！",
            "answer": "多么",
            "hint": "Fill in the blank with '多么'"
        },
        {
            "id": "hsk3ii-duome-20-ex2",
            "type": "fill-blank",
            "question": "他___努力啊！",
            "answer": "多么",
            "hint": "Fill in the blank with '多么'"
        },
        {
            "id": "hsk3ii-duome-20-ex3",
            "type": "fill-blank",
            "question": "他___努力啊！",
            "answer": "多么",
            "hint": "Fill in the blank with '多么'"
        },
        {
            "id": "hsk3ii-duome-20-ex4",
            "type": "fill-blank",
            "question": "___漂亮的衣服啊！",
            "answer": "多么",
            "hint": "Fill in the blank with '多么'"
        },
        {
            "id": "hsk3ii-duome-20-ex5",
            "type": "fill-blank",
            "question": "___好的天气！",
            "answer": "多么",
            "hint": "Fill in the blank with '多么'"
        },
        {
            "id": "hsk3ii-duome-20-ex6",
            "type": "reorder",
            "words": [
                "!",
                "多么漂亮的衣服啊"
            ],
            "answer": "多么漂亮的衣服啊！",
            "hint": "Reorder the words to form a correct sentence using the grammar of '多么 (duōme) - How / What a'"
        },
        {
            "id": "hsk3ii-duome-20-ex7",
            "type": "reorder",
            "words": [
                "!",
                "多么好的天气"
            ],
            "answer": "多么好的天气！",
            "hint": "Reorder the words to form a correct sentence using the grammar of '多么 (duōme) - How / What a'"
        },
        {
            "id": "hsk3ii-duome-20-ex8",
            "type": "reorder",
            "words": [
                "!",
                "多么好的天气"
            ],
            "answer": "多么好的天气！",
            "hint": "Reorder the words to form a correct sentence using the grammar of '多么 (duōme) - How / What a'"
        },
        {
            "id": "hsk3ii-duome-20-ex9",
            "type": "reorder",
            "words": [
                "多么漂亮的衣服啊",
                "!"
            ],
            "answer": "多么漂亮的衣服啊！",
            "hint": "Reorder the words to form a correct sentence using the grammar of '多么 (duōme) - How / What a'"
        },
        {
            "id": "hsk3ii-duome-20-ex10",
            "type": "reorder",
            "words": [
                "!",
                "多么漂亮的衣服啊"
            ],
            "answer": "多么漂亮的衣服啊！",
            "hint": "Reorder the words to form a correct sentence using the grammar of '多么 (duōme) - How / What a'"
        },
        {
            "id": "hsk3ii-duome-20-ex11",
            "type": "translate",
            "question": "多么漂亮的衣服啊！",
            "answer": "What beautiful clothes!",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of '多么 (duōme) - How / What a'"
        },
        {
            "id": "hsk3ii-duome-20-ex12",
            "type": "translate",
            "question": "How hardworking he is!",
            "answer": "他多么努力啊！",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of '多么 (duōme) - How / What a'"
        },
        {
            "id": "hsk3ii-duome-20-ex13",
            "type": "translate",
            "question": "他多么努力啊！",
            "answer": "How hardworking he is!",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of '多么 (duōme) - How / What a'"
        },
        {
            "id": "hsk3ii-duome-20-ex14",
            "type": "translate",
            "question": "多么漂亮的衣服啊！",
            "answer": "What beautiful clothes!",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of '多么 (duōme) - How / What a'"
        },
        {
            "id": "hsk3ii-duome-20-ex15",
            "type": "translate",
            "question": "多么漂亮的衣服啊！",
            "answer": "What beautiful clothes!",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of '多么 (duōme) - How / What a'"
        }
    ]
  },
  {
    "id": "hsk4i-ba-advanced-02",
    "band": "HSK4-I",
    "order": 1,
    "title": "Advanced Disposal with 把 (bǎ)",
    "subtitle": "Using 把 to emphasize the disposal or handling of an object, often resulting in a change of state or location.",
    "formula": "Subject + 把 (bǎ) + Object + Verb + Other elements",
    "explanation": "The advanced use of 把 goes beyond simple object placement. It highlights how an object is handled, disposed of, or affected by an action, often leading to a change in its state, location, or status. The focus is on the outcome of the action on the object.",
    "usageRules": [
      "The verb in a 把 sentence must be followed by other elements, such as a complement, aspect particle (e.g., 了, 过), or reduplication, indicating the result or extent of the action.",
      "The object of 把 must be definite and known to both the speaker and listener.",
      "Verbs that cannot take an object directly, or verbs expressing mental activities, possession, or simple existence, generally cannot be used in 把 sentences.",
      "Often used to give commands or make suggestions, especially when the action involves manipulating an object."
    ],
    "examples": [
      {
        "chinese": "请你把窗户打开。",
        "pinyin": "Qǐng nǐ bǎ chuānghù dǎkāi.",
        "english": "Please open the window.",
        "highlight": "把窗户打开"
      },
      {
        "chinese": "他把那本书看完了。",
        "pinyin": "Tā bǎ nà běn shū kànwánle.",
        "english": "He finished reading that book.",
        "highlight": "把那本书看完了"
      },
      {
        "chinese": "我把作业写好了。",
        "pinyin": "Wǒ bǎ zuòyè xiěhǎole.",
        "english": "I have finished writing my homework.",
        "highlight": "把作业写好了"
      },
      {
        "chinese": "妈妈把饭做好了。",
        "pinyin": "Māmā bǎ fàn zuòhǎole.",
        "english": "Mom has finished cooking the meal.",
        "highlight": "把饭做好了"
      },
      {
        "chinese": "你把灯关了吧。",
        "pinyin": "Nǐ bǎ dēng guānle ba.",
        "english": "You turn off the light.",
        "highlight": "把灯关了"
      },
      {
        "chinese": "他把钱都花光了。",
        "pinyin": "Tā bǎ qián dōu huāguāngle.",
        "english": "He spent all the money.",
        "highlight": "把钱都花光了"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 把 with verbs that do not have a clear result or change of state, or when the object is indefinite. Remember that the action must affect the object in some way, and the object should be specific.",
      "wrongExample": "我把书看。",
      "correctExample": "我把书看完了。",
      "explanation": "The verb '看' (to read) needs a complement like '完' (finished) to show the result of the action on the book."
    },
    "comparison": {
      "structure": "Subject + Verb + Object vs. Subject + 把 + Object + Verb",
      "difference": "While 'Subject + Verb + Object' simply states an action, the '把' structure emphasizes the object's disposal or how it is affected, often implying a change of state or location. The '把' structure is more active and often used for commands or when the object is already known."
    },
    "appearsInTexts": [
      "hsk4-1-02",
      "hsk4-2-05"
    ],
    "exercises":     [
        {
            "id": "hsk3ii-duome-ex1-ex1",
            "type": "fill-blank",
            "question": "请你把窗___打开。",
            "answer": "户",
            "hint": "Practice the 'Subject + 把 (bǎ) + Object + Verb + Other elements' structure."
        },
        {
            "id": "hsk3ii-duome-ex1-ex2",
            "type": "fill-blank",
            "question": "___把那本书看完了。",
            "answer": "他",
            "hint": "Practice the 'Subject + 把 (bǎ) + Object + Verb + Other elements' structure."
        },
        {
            "id": "hsk3ii-duome-ex1-ex3",
            "type": "fill-blank",
            "question": "我___作业写好了。",
            "answer": "把",
            "hint": "Practice the 'Subject + 把 (bǎ) + Object + Verb + Other elements' structure."
        },
        {
            "id": "hsk3ii-duome-ex1-ex4",
            "type": "fill-blank",
            "question": "他把那本书看完___。",
            "answer": "了",
            "hint": "Practice the 'Subject + 把 (bǎ) + Object + Verb + Other elements' structure."
        },
        {
            "id": "hsk3ii-duome-ex1-ex5",
            "type": "fill-blank",
            "question": "请你把窗___打开。",
            "answer": "户",
            "hint": "Practice the 'Subject + 把 (bǎ) + Object + Verb + Other elements' structure."
        },
        {
            "id": "hsk3ii-duome-ex1-ex6",
            "type": "reorder",
            "words": [
                "本",
                "把",
                "书",
                "完",
                "看",
                "了",
                "他",
                "那"
            ],
            "answer": "他把那本书看完了。",
            "hint": "Reorder to form a sentence using the 'Subject + 把 (bǎ) + Object + Verb + Other elements' structure."
        },
        {
            "id": "hsk3ii-duome-ex1-ex7",
            "type": "reorder",
            "words": [
                "本",
                "了",
                "那",
                "书",
                "他",
                "把",
                "完",
                "看"
            ],
            "answer": "他把那本书看完了。",
            "hint": "Reorder to form a sentence using the 'Subject + 把 (bǎ) + Object + Verb + Other elements' structure."
        },
        {
            "id": "hsk3ii-duome-ex1-ex8",
            "type": "reorder",
            "words": [
                "开",
                "你",
                "把",
                "打",
                "户",
                "窗",
                "请"
            ],
            "answer": "请你把窗户打开。",
            "hint": "Reorder to form a sentence using the 'Subject + 把 (bǎ) + Object + Verb + Other elements' structure."
        },
        {
            "id": "hsk3ii-duome-ex1-ex9",
            "type": "reorder",
            "words": [
                "写",
                "业",
                "作",
                "我",
                "了",
                "好",
                "把"
            ],
            "answer": "我把作业写好了。",
            "hint": "Reorder to form a sentence using the 'Subject + 把 (bǎ) + Object + Verb + Other elements' structure."
        },
        {
            "id": "hsk3ii-duome-ex1-ex10",
            "type": "reorder",
            "words": [
                "作",
                "好",
                "我",
                "写",
                "了",
                "业",
                "把"
            ],
            "answer": "我把作业写好了。",
            "hint": "Reorder to form a sentence using the 'Subject + 把 (bǎ) + Object + Verb + Other elements' structure."
        },
        {
            "id": "hsk3ii-duome-ex1-ex11",
            "type": "translate",
            "question": "Please open the window.",
            "answer": "请你把窗户打开。",
            "direction": "en-to-cn",
            "hint": "Translate using the 'Subject + 把 (bǎ) + Object + Verb + Other elements' structure."
        },
        {
            "id": "hsk3ii-duome-ex1-ex12",
            "type": "translate",
            "question": "他把那本书看完了。",
            "answer": "He finished reading that book.",
            "direction": "cn-to-en",
            "hint": "Translate using the 'Subject + 把 (bǎ) + Object + Verb + Other elements' structure."
        },
        {
            "id": "hsk3ii-duome-ex1-ex13",
            "type": "translate",
            "question": "I have finished writing my homework.",
            "answer": "我把作业写好了。",
            "direction": "en-to-cn",
            "hint": "Translate using the 'Subject + 把 (bǎ) + Object + Verb + Other elements' structure."
        },
        {
            "id": "hsk3ii-duome-ex1-ex14",
            "type": "translate",
            "question": "请你把窗户打开。",
            "answer": "Please open the window.",
            "direction": "cn-to-en",
            "hint": "Translate using the 'Subject + 把 (bǎ) + Object + Verb + Other elements' structure."
        },
        {
            "id": "hsk3ii-duome-ex1-ex15",
            "type": "translate",
            "question": "Please open the window.",
            "answer": "请你把窗户打开。",
            "direction": "en-to-cn",
            "hint": "Translate using the 'Subject + 把 (bǎ) + Object + Verb + Other elements' structure."
        }
    ]
  },
  {
    "id": "hsk4i-lian-dou-ye-03",
    "band": "HSK4-I",
    "order": 2,
    "title": "Even... with 连...都/也... (lián...dōu/yě...)",
    "subtitle": "Emphasizing an extreme case or unexpected situation, meaning 'even... (not)'.",
    "formula": "连 (lián) + Noun/Pronoun + 都/也 (dōu/yě) + Verb/Adjective Phrase",
    "explanation": "The structure 连...都/也... is used to highlight an extreme or unexpected situation, often implying that if even this extreme case is true, then other less extreme cases are also true (or not true). It adds emphasis to the element placed after 连.",
    "usageRules": [
      "连 (lián) introduces the emphasized element, which can be a noun, pronoun, or even a short phrase.",
      "都 (dōu) or 也 (yě) follows the emphasized element and precedes the verb or adjective phrase.",
      "If the sentence is negative, it often implies that even the most basic or expected action/situation is not happening.",
      "It can be used to express surprise, disbelief, or to strengthen an argument."
    ],
    "examples": [
      {
        "chinese": "他连饭都没吃。",
        "pinyin": "Tā lián fàn dōu méi chī.",
        "english": "He didn't even eat his meal.",
        "highlight": "连饭都没吃"
      },
      {
        "chinese": "这么简单的问题，连小孩子也知道。",
        "pinyin": "Zhème jiǎndān de wèntí, lián xiǎoháizi yě zhīdào.",
        "english": "Such a simple question, even a child knows.",
        "highlight": "连小孩子也知道"
      },
      {
        "chinese": "我连他的名字都忘了。",
        "pinyin": "Wǒ lián tā de míngzi dōu wàngle.",
        "english": "I even forgot his name.",
        "highlight": "连他的名字都忘了"
      },
      {
        "chinese": "他病得很重，连水都喝不下。",
        "pinyin": "Tā bìng de hěn zhòng, lián shuǐ dōu hē bù xià.",
        "english": "He is very sick, he can't even drink water.",
        "highlight": "连水都喝不下"
      },
      {
        "chinese": "她连一个字都不认识。",
        "pinyin": "Tā lián yī ge zì dōu bù rènshi.",
        "english": "She doesn't even recognize a single character.",
        "highlight": "连一个字都不认识"
      },
      {
        "chinese": "连老师都觉得这个题目很难。",
        "pinyin": "Lián lǎoshī dōu juéde zhège tímù hěn nán.",
        "english": "Even the teacher thinks this question is very difficult.",
        "highlight": "连老师都觉得"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to omit 都/也 after the emphasized element, or to use it in situations where no emphasis on an extreme case is intended. Remember that 连...都/也... specifically highlights an unexpected or extreme scenario.",
      "wrongExample": "他连饭没吃。",
      "correctExample": "他连饭都没吃。",
      "explanation": "都/也 is essential after the emphasized element '饭' to complete the structure and convey the meaning of 'even'."
    },
    "appearsInTexts": [
      "hsk4-1-03",
      "hsk4-2-01"
    ],
    "exercises":     [
        {
            "id": "hsk4i-lian-dou-ye-03-ex1",
            "type": "fill-blank",
            "question": "他连饭都没___。",
            "answer": "吃",
            "hint": "Practice the '连 (lián) + Noun/Pronoun + 都/也 (dōu/yě) + Verb/Adjective Phrase' structure."
        },
        {
            "id": "hsk4i-lian-dou-ye-03-ex2",
            "type": "fill-blank",
            "question": "我连___的名字都忘了。",
            "answer": "他",
            "hint": "Practice the '连 (lián) + Noun/Pronoun + 都/也 (dōu/yě) + Verb/Adjective Phrase' structure."
        },
        {
            "id": "hsk4i-lian-dou-ye-03-ex3",
            "type": "fill-blank",
            "question": "这么简单的问题，连小孩子也___道。",
            "answer": "知",
            "hint": "Practice the '连 (lián) + Noun/Pronoun + 都/也 (dōu/yě) + Verb/Adjective Phrase' structure."
        },
        {
            "id": "hsk4i-lian-dou-ye-03-ex4",
            "type": "fill-blank",
            "question": "他连___都没吃。",
            "answer": "饭",
            "hint": "Practice the '连 (lián) + Noun/Pronoun + 都/也 (dōu/yě) + Verb/Adjective Phrase' structure."
        },
        {
            "id": "hsk4i-lian-dou-ye-03-ex5",
            "type": "fill-blank",
            "question": "这么简单的___题，连小孩子也知道。",
            "answer": "问",
            "hint": "Practice the '连 (lián) + Noun/Pronoun + 都/也 (dōu/yě) + Verb/Adjective Phrase' structure."
        },
        {
            "id": "hsk4i-lian-dou-ye-03-ex6",
            "type": "reorder",
            "words": [
                "名",
                "忘",
                "连",
                "他",
                "了",
                "的",
                "都",
                "字",
                "我"
            ],
            "answer": "我连他的名字都忘了。",
            "hint": "Reorder to form a sentence using the '连 (lián) + Noun/Pronoun + 都/也 (dōu/yě) + Verb/Adjective Phrase' structure."
        },
        {
            "id": "hsk4i-lian-dou-ye-03-ex7",
            "type": "reorder",
            "words": [
                "没",
                "连",
                "他",
                "都",
                "吃",
                "饭"
            ],
            "answer": "他连饭都没吃。",
            "hint": "Reorder to form a sentence using the '连 (lián) + Noun/Pronoun + 都/也 (dōu/yě) + Verb/Adjective Phrase' structure."
        },
        {
            "id": "hsk4i-lian-dou-ye-03-ex8",
            "type": "reorder",
            "words": [
                "连",
                "他",
                "都",
                "没",
                "吃",
                "饭"
            ],
            "answer": "他连饭都没吃。",
            "hint": "Reorder to form a sentence using the '连 (lián) + Noun/Pronoun + 都/也 (dōu/yě) + Verb/Adjective Phrase' structure."
        },
        {
            "id": "hsk4i-lian-dou-ye-03-ex9",
            "type": "reorder",
            "words": [
                "问",
                "知",
                "小",
                "题",
                "的",
                "子",
                "简",
                "这",
                "道",
                "么",
                "连",
                "单",
                "孩",
                "也"
            ],
            "answer": "这么简单的问题，连小孩子也知道。",
            "hint": "Reorder to form a sentence using the '连 (lián) + Noun/Pronoun + 都/也 (dōu/yě) + Verb/Adjective Phrase' structure."
        },
        {
            "id": "hsk4i-lian-dou-ye-03-ex10",
            "type": "reorder",
            "words": [
                "知",
                "么",
                "这",
                "问",
                "孩",
                "也",
                "连",
                "的",
                "子",
                "简",
                "单",
                "题",
                "道",
                "小"
            ],
            "answer": "这么简单的问题，连小孩子也知道。",
            "hint": "Reorder to form a sentence using the '连 (lián) + Noun/Pronoun + 都/也 (dōu/yě) + Verb/Adjective Phrase' structure."
        },
        {
            "id": "hsk4i-lian-dou-ye-03-ex11",
            "type": "translate",
            "question": "Such a simple question, even a child knows.",
            "answer": "这么简单的问题，连小孩子也知道。",
            "direction": "en-to-cn",
            "hint": "Translate using the '连 (lián) + Noun/Pronoun + 都/也 (dōu/yě) + Verb/Adjective Phrase' structure."
        },
        {
            "id": "hsk4i-lian-dou-ye-03-ex12",
            "type": "translate",
            "question": "他连饭都没吃。",
            "answer": "He didn't even eat his meal.",
            "direction": "cn-to-en",
            "hint": "Translate using the '连 (lián) + Noun/Pronoun + 都/也 (dōu/yě) + Verb/Adjective Phrase' structure."
        },
        {
            "id": "hsk4i-lian-dou-ye-03-ex13",
            "type": "translate",
            "question": "I even forgot his name.",
            "answer": "我连他的名字都忘了。",
            "direction": "en-to-cn",
            "hint": "Translate using the '连 (lián) + Noun/Pronoun + 都/也 (dōu/yě) + Verb/Adjective Phrase' structure."
        },
        {
            "id": "hsk4i-lian-dou-ye-03-ex14",
            "type": "translate",
            "question": "他连饭都没吃。",
            "answer": "He didn't even eat his meal.",
            "direction": "cn-to-en",
            "hint": "Translate using the '连 (lián) + Noun/Pronoun + 都/也 (dōu/yě) + Verb/Adjective Phrase' structure."
        },
        {
            "id": "hsk4i-lian-dou-ye-03-ex15",
            "type": "translate",
            "question": "I even forgot his name.",
            "answer": "我连他的名字都忘了。",
            "direction": "en-to-cn",
            "hint": "Translate using the '连 (lián) + Noun/Pronoun + 都/也 (dōu/yě) + Verb/Adjective Phrase' structure."
        }
    ]
  },
  {
    "id": "hsk4i-jishi-ye-04",
    "band": "HSK4-I",
    "order": 3,
    "title": "Even if... still... with 即使...也... (jíshǐ...yě...)",
    "subtitle": "Expressing a concession, meaning 'even if... still/also...'.",
    "formula": "即使 (jíshǐ) + Clause 1 (concession) + 也 (yě) + Clause 2 (result)",
    "explanation": "The structure 即使...也... is used to express a concession, indicating that even if a certain condition or situation exists (often an unfavorable one), the result or consequence in the second clause will still hold true. It implies a strong determination or an unavoidable outcome.",
    "usageRules": [
      "即使 (jíshǐ) introduces the concessive clause, which describes a hypothetical or actual situation.",
      "也 (yě) introduces the main clause, stating the result that occurs despite the condition in the first clause.",
      "The two clauses are often contradictory or present a strong contrast.",
      "It can be used to express determination, inevitability, or to emphasize a point."
    ],
    "examples": [
      {
        "chinese": "即使下雨，我也要去。",
        "pinyin": "Jíshǐ xiàyǔ, wǒ yě yào qù.",
        "english": "Even if it rains, I will still go.",
        "highlight": "即使下雨，我也"
      },
      {
        "chinese": "即使很忙，他也会抽出时间学习。",
        "pinyin": "Jíshǐ hěn máng, tā yě huì chōuchū shíjiān xuéxí.",
        "english": "Even if he is very busy, he will still make time to study.",
        "highlight": "即使很忙，他也会"
      },
      {
        "chinese": "即使失败了，我们也不能放弃。",
        "pinyin": "Jíshǐ shībàile, wǒmen yě bù néng fàngqì.",
        "english": "Even if we fail, we cannot give up.",
        "highlight": "即使失败了，我们也不能"
      },
      {
        "chinese": "即使遇到困难，他也能坚持下去。",
        "pinyin": "Jíshǐ yùdào kùnnan, tā yě néng jiānchí xiàqù.",
        "english": "Even if he encounters difficulties, he can still persevere.",
        "highlight": "即使遇到困难，他也能"
      },
      {
        "chinese": "即使你不同意，我也要这样做。",
        "pinyin": "Jíshǐ nǐ bù tóngyì, wǒ yě yào zhèyàng zuò.",
        "english": "Even if you don't agree, I will still do it this way.",
        "highlight": "即使你不同意，我也要"
      },
      {
        "chinese": "即使天气不好，我们也要按时出发。",
        "pinyin": "Jíshǐ tiānqì bù hǎo, wǒmen yě yào ànshí chūfā.",
        "english": "Even if the weather is bad, we will still depart on time.",
        "highlight": "即使天气不好，我们也要"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to confuse 即使...也... with 如果...就... (if... then...). While both involve conditions, 即使...也... implies that the result will happen regardless of the condition, emphasizing concession, whereas 如果...就... states a direct cause-and-effect relationship.",
      "wrongExample": "如果下雨，我也要去。",
      "correctExample": "即使下雨，我也要去。",
      "explanation": "Using 即使...也... better conveys the meaning of 'even if' and the determination to go despite the rain, rather than a simple conditional statement."
    },
    "appearsInTexts": [
      "hsk4-1-04",
      "hsk4-2-02"
    ],
    "exercises":     [
        {
            "id": "hsk4i-jishi-ye-04-ex1",
            "type": "fill-blank",
            "question": "即使___雨，我也要去。",
            "answer": "下",
            "hint": "Practice the '即使 (jíshǐ) + Clause 1 (concession) + 也 (yě) + Clause 2 (result)' structure."
        },
        {
            "id": "hsk4i-jishi-ye-04-ex2",
            "type": "fill-blank",
            "question": "即使下___，我也要去。",
            "answer": "雨",
            "hint": "Practice the '即使 (jíshǐ) + Clause 1 (concession) + 也 (yě) + Clause 2 (result)' structure."
        },
        {
            "id": "hsk4i-jishi-ye-04-ex3",
            "type": "fill-blank",
            "question": "___使下雨，我也要去。",
            "answer": "即",
            "hint": "Practice the '即使 (jíshǐ) + Clause 1 (concession) + 也 (yě) + Clause 2 (result)' structure."
        },
        {
            "id": "hsk4i-jishi-ye-04-ex4",
            "type": "fill-blank",
            "question": "即使很忙，他也会抽出时间___习。",
            "answer": "学",
            "hint": "Practice the '即使 (jíshǐ) + Clause 1 (concession) + 也 (yě) + Clause 2 (result)' structure."
        },
        {
            "id": "hsk4i-jishi-ye-04-ex5",
            "type": "fill-blank",
            "question": "即使失___了，我们也不能放弃。",
            "answer": "败",
            "hint": "Practice the '即使 (jíshǐ) + Clause 1 (concession) + 也 (yě) + Clause 2 (result)' structure."
        },
        {
            "id": "hsk4i-jishi-ye-04-ex6",
            "type": "reorder",
            "words": [
                "下",
                "去",
                "也",
                "使",
                "要",
                "即",
                "我",
                "雨"
            ],
            "answer": "即使下雨，我也要去。",
            "hint": "Reorder to form a sentence using the '即使 (jíshǐ) + Clause 1 (concession) + 也 (yě) + Clause 2 (result)' structure."
        },
        {
            "id": "hsk4i-jishi-ye-04-ex7",
            "type": "reorder",
            "words": [
                "弃",
                "不",
                "失",
                "即",
                "了",
                "放",
                "使",
                "们",
                "败",
                "也",
                "我",
                "能"
            ],
            "answer": "即使失败了，我们也不能放弃。",
            "hint": "Reorder to form a sentence using the '即使 (jíshǐ) + Clause 1 (concession) + 也 (yě) + Clause 2 (result)' structure."
        },
        {
            "id": "hsk4i-jishi-ye-04-ex8",
            "type": "reorder",
            "words": [
                "败",
                "能",
                "我",
                "放",
                "不",
                "们",
                "使",
                "即",
                "失",
                "也",
                "弃",
                "了"
            ],
            "answer": "即使失败了，我们也不能放弃。",
            "hint": "Reorder to form a sentence using the '即使 (jíshǐ) + Clause 1 (concession) + 也 (yě) + Clause 2 (result)' structure."
        },
        {
            "id": "hsk4i-jishi-ye-04-ex9",
            "type": "reorder",
            "words": [
                "即",
                "下",
                "要",
                "我",
                "使",
                "也",
                "雨",
                "去"
            ],
            "answer": "即使下雨，我也要去。",
            "hint": "Reorder to form a sentence using the '即使 (jíshǐ) + Clause 1 (concession) + 也 (yě) + Clause 2 (result)' structure."
        },
        {
            "id": "hsk4i-jishi-ye-04-ex10",
            "type": "reorder",
            "words": [
                "即",
                "放",
                "我",
                "能",
                "们",
                "了",
                "不",
                "败",
                "弃",
                "也",
                "失",
                "使"
            ],
            "answer": "即使失败了，我们也不能放弃。",
            "hint": "Reorder to form a sentence using the '即使 (jíshǐ) + Clause 1 (concession) + 也 (yě) + Clause 2 (result)' structure."
        },
        {
            "id": "hsk4i-jishi-ye-04-ex11",
            "type": "translate",
            "question": "Even if it rains, I will still go.",
            "answer": "即使下雨，我也要去。",
            "direction": "en-to-cn",
            "hint": "Translate using the '即使 (jíshǐ) + Clause 1 (concession) + 也 (yě) + Clause 2 (result)' structure."
        },
        {
            "id": "hsk4i-jishi-ye-04-ex12",
            "type": "translate",
            "question": "即使下雨，我也要去。",
            "answer": "Even if it rains, I will still go.",
            "direction": "cn-to-en",
            "hint": "Translate using the '即使 (jíshǐ) + Clause 1 (concession) + 也 (yě) + Clause 2 (result)' structure."
        },
        {
            "id": "hsk4i-jishi-ye-04-ex13",
            "type": "translate",
            "question": "Even if he is very busy, he will still make time to study.",
            "answer": "即使很忙，他也会抽出时间学习。",
            "direction": "en-to-cn",
            "hint": "Translate using the '即使 (jíshǐ) + Clause 1 (concession) + 也 (yě) + Clause 2 (result)' structure."
        },
        {
            "id": "hsk4i-jishi-ye-04-ex14",
            "type": "translate",
            "question": "即使很忙，他也会抽出时间学习。",
            "answer": "Even if he is very busy, he will still make time to study.",
            "direction": "cn-to-en",
            "hint": "Translate using the '即使 (jíshǐ) + Clause 1 (concession) + 也 (yě) + Clause 2 (result)' structure."
        },
        {
            "id": "hsk4i-jishi-ye-04-ex15",
            "type": "translate",
            "question": "Even if it rains, I will still go.",
            "answer": "即使下雨，我也要去。",
            "direction": "en-to-cn",
            "hint": "Translate using the '即使 (jíshǐ) + Clause 1 (concession) + 也 (yě) + Clause 2 (result)' structure."
        }
    ]
  },
  {
    "id": "hsk4i-zhiyao-jiu-05",
    "band": "HSK4-I",
    "order": 4,
    "title": "As long as... then... with 只要...就... (zhǐyào...jiù...)",
    "subtitle": "Expressing a sufficient condition, meaning 'as long as... then...'.",
    "formula": "只要 (zhǐyào) + Condition + 就 (jiù) + Result",
    "explanation": "The structure 只要...就... indicates that as long as a certain condition is met, a specific result will definitely occur. It highlights a sufficient condition, meaning the condition is enough to bring about the result.",
    "usageRules": [
      "只要 (zhǐyào) introduces the condition, which is usually a simple clause.",
      "就 (jiù) introduces the result clause, which is the consequence of the condition being met.",
      "The condition presented by 只要 is the minimum requirement for the result to happen.",
      "It implies a strong certainty that the result will follow the condition."
    ],
    "examples": [
      {
        "chinese": "只要努力，就一定会成功。",
        "pinyin": "Zhǐyào nǔlì, jiù yīdìng huì chénggōng.",
        "english": "As long as you work hard, you will definitely succeed.",
        "highlight": "只要努力，就一定会"
      },
      {
        "chinese": "只要有时间，我就会去图书馆。",
        "pinyin": "Zhǐyào yǒu shíjiān, wǒ jiù huì qù túshūguǎn.",
        "english": "As long as I have time, I will go to the library.",
        "highlight": "只要有时间，我就会"
      },
      {
        "chinese": "只要你来，我就很高兴。",
        "pinyin": "Zhǐyào nǐ lái, wǒ jiù hěn gāoxìng.",
        "english": "As long as you come, I will be very happy.",
        "highlight": "只要你来，我就很"
      },
      {
        "chinese": "只要不下雨，我们就去公园。",
        "pinyin": "Zhǐyào bù xiàyǔ, wǒmen jiù qù gōngyuán.",
        "english": "As long as it doesn't rain, we will go to the park.",
        "highlight": "只要不下雨，我们就"
      },
      {
        "chinese": "只要你告诉我，我就帮你。",
        "pinyin": "Zhǐyào nǐ gàosù wǒ, wǒ jiù bāng nǐ.",
        "english": "As long as you tell me, I will help you.",
        "highlight": "只要你告诉我，我就"
      },
      {
        "chinese": "只要认真听讲，就能学好。",
        "pinyin": "Zhǐyào rènzhēn tīngjiǎng, jiù néng xuéhǎo.",
        "english": "As long as you listen carefully, you can learn well.",
        "highlight": "只要认真听讲，就能"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to confuse 只要...就... with 如果...就... (if... then...). While both express conditions, 只要...就... emphasizes that the condition is sufficient and the result is certain, whereas 如果...就... implies a more general conditional relationship, where the result might not be as certain.",
      "wrongExample": "如果努力，就一定会成功。",
      "correctExample": "只要努力，就一定会成功。",
      "explanation": "'只要...就...' better conveys the strong causal link and certainty that hard work *alone* is sufficient for success."
    },
    "appearsInTexts": [
      "hsk4-1-05",
      "hsk4-2-04"
    ],
    "exercises":     [
        {
            "id": "hsk4i-zhiyao-jiu-05-ex1",
            "type": "fill-blank",
            "question": "___要有时间，我就会去图书馆。",
            "answer": "只",
            "hint": "Practice the '只要 (zhǐyào) + Condition + 就 (jiù) + Result' structure."
        },
        {
            "id": "hsk4i-zhiyao-jiu-05-ex2",
            "type": "fill-blank",
            "question": "___要你来，我就很高兴。",
            "answer": "只",
            "hint": "Practice the '只要 (zhǐyào) + Condition + 就 (jiù) + Result' structure."
        },
        {
            "id": "hsk4i-zhiyao-jiu-05-ex3",
            "type": "fill-blank",
            "question": "只要你来，我就___高兴。",
            "answer": "很",
            "hint": "Practice the '只要 (zhǐyào) + Condition + 就 (jiù) + Result' structure."
        },
        {
            "id": "hsk4i-zhiyao-jiu-05-ex4",
            "type": "fill-blank",
            "question": "只要你来，我就___高兴。",
            "answer": "很",
            "hint": "Practice the '只要 (zhǐyào) + Condition + 就 (jiù) + Result' structure."
        },
        {
            "id": "hsk4i-zhiyao-jiu-05-ex5",
            "type": "fill-blank",
            "question": "只要你来，___就很高兴。",
            "answer": "我",
            "hint": "Practice the '只要 (zhǐyào) + Condition + 就 (jiù) + Result' structure."
        },
        {
            "id": "hsk4i-zhiyao-jiu-05-ex6",
            "type": "reorder",
            "words": [
                "我",
                "高",
                "很",
                "来",
                "兴",
                "就",
                "要",
                "你",
                "只"
            ],
            "answer": "只要你来，我就很高兴。",
            "hint": "Reorder to form a sentence using the '只要 (zhǐyào) + Condition + 就 (jiù) + Result' structure."
        },
        {
            "id": "hsk4i-zhiyao-jiu-05-ex7",
            "type": "reorder",
            "words": [
                "功",
                "就",
                "力",
                "一",
                "只",
                "成",
                "努",
                "定",
                "会",
                "要"
            ],
            "answer": "只要努力，就一定会成功。",
            "hint": "Reorder to form a sentence using the '只要 (zhǐyào) + Condition + 就 (jiù) + Result' structure."
        },
        {
            "id": "hsk4i-zhiyao-jiu-05-ex8",
            "type": "reorder",
            "words": [
                "要",
                "图",
                "我",
                "间",
                "馆",
                "有",
                "书",
                "时",
                "会",
                "去",
                "只",
                "就"
            ],
            "answer": "只要有时间，我就会去图书馆。",
            "hint": "Reorder to form a sentence using the '只要 (zhǐyào) + Condition + 就 (jiù) + Result' structure."
        },
        {
            "id": "hsk4i-zhiyao-jiu-05-ex9",
            "type": "reorder",
            "words": [
                "就",
                "要",
                "我",
                "高",
                "只",
                "来",
                "很",
                "你",
                "兴"
            ],
            "answer": "只要你来，我就很高兴。",
            "hint": "Reorder to form a sentence using the '只要 (zhǐyào) + Condition + 就 (jiù) + Result' structure."
        },
        {
            "id": "hsk4i-zhiyao-jiu-05-ex10",
            "type": "reorder",
            "words": [
                "定",
                "会",
                "功",
                "就",
                "只",
                "努",
                "一",
                "要",
                "力",
                "成"
            ],
            "answer": "只要努力，就一定会成功。",
            "hint": "Reorder to form a sentence using the '只要 (zhǐyào) + Condition + 就 (jiù) + Result' structure."
        },
        {
            "id": "hsk4i-zhiyao-jiu-05-ex11",
            "type": "translate",
            "question": "As long as you come, I will be very happy.",
            "answer": "只要你来，我就很高兴。",
            "direction": "en-to-cn",
            "hint": "Translate using the '只要 (zhǐyào) + Condition + 就 (jiù) + Result' structure."
        },
        {
            "id": "hsk4i-zhiyao-jiu-05-ex12",
            "type": "translate",
            "question": "只要你来，我就很高兴。",
            "answer": "As long as you come, I will be very happy.",
            "direction": "cn-to-en",
            "hint": "Translate using the '只要 (zhǐyào) + Condition + 就 (jiù) + Result' structure."
        },
        {
            "id": "hsk4i-zhiyao-jiu-05-ex13",
            "type": "translate",
            "question": "As long as I have time, I will go to the library.",
            "answer": "只要有时间，我就会去图书馆。",
            "direction": "en-to-cn",
            "hint": "Translate using the '只要 (zhǐyào) + Condition + 就 (jiù) + Result' structure."
        },
        {
            "id": "hsk4i-zhiyao-jiu-05-ex14",
            "type": "translate",
            "question": "只要你来，我就很高兴。",
            "answer": "As long as you come, I will be very happy.",
            "direction": "cn-to-en",
            "hint": "Translate using the '只要 (zhǐyào) + Condition + 就 (jiù) + Result' structure."
        },
        {
            "id": "hsk4i-zhiyao-jiu-05-ex15",
            "type": "translate",
            "question": "As long as you come, I will be very happy.",
            "answer": "只要你来，我就很高兴。",
            "direction": "en-to-cn",
            "hint": "Translate using the '只要 (zhǐyào) + Condition + 就 (jiù) + Result' structure."
        }
    ]
  },
  {
    "id": "hsk4i-zhiyou-cai-06",
    "band": "HSK4-I",
    "order": 5,
    "title": "Only if... then... with 只有...才... (zhǐyǒu...cái...)",
    "subtitle": "Expressing a necessary condition, meaning 'only if... then...'.",
    "formula": "只有 (zhǐyǒu) + Condition + 才 (cái) + Result",
    "explanation": "The structure 只有...才... is used to express a necessary condition, indicating that a certain result will *only* occur if a specific condition is met. It implies that the condition is indispensable for the result to happen.",
    "usageRules": [
      "只有 (zhǐyǒu) introduces the necessary condition, which is often a unique or exclusive requirement.",
      "才 (cái) introduces the result clause, emphasizing that the result is contingent upon that specific condition.",
      "The condition presented by 只有 is the sole or primary way to achieve the result.",
      "It often implies a sense of difficulty or exclusivity in achieving the result."
    ],
    "examples": [
      {
        "chinese": "只有努力学习，才能取得好成绩。",
        "pinyin": "Zhǐyǒu nǔlì xuéxí, cái néng qǔdé hǎo chéngjī.",
        "english": "Only by studying hard can one achieve good grades.",
        "highlight": "只有努力学习，才能"
      },
      {
        "chinese": "只有多练习，才能说好汉语。",
        "pinyin": "Zhǐyǒu duō liànxí, cái néng shuō hǎo Hànyǔ.",
        "english": "Only by practicing more can one speak Chinese well.",
        "highlight": "只有多练习，才能"
      },
      {
        "chinese": "只有亲自去看看，才能了解真实情况。",
        "pinyin": "Zhǐyǒu qīnzì qù kànkan, cái néng liǎojiě zhēnshí qíngkuàng.",
        "english": "Only by seeing it in person can one understand the real situation.",
        "highlight": "只有亲自去看看，才能"
      },
      {
        "chinese": "只有你同意，我才能去。",
        "pinyin": "Zhǐyǒu nǐ tóngyì, wǒ cái néng qù.",
        "english": "Only if you agree can I go.",
        "highlight": "只有你同意，我才能"
      },
      {
        "chinese": "只有坚持不懈，才能实现梦想。",
        "pinyin": "Zhǐyǒu jiānchí bùxiè, cái néng shíxiàn mèngxiǎng.",
        "english": "Only by persevering can one realize their dreams.",
        "highlight": "只有坚持不懈，才能"
      },
      {
        "chinese": "只有解决了这个问题，我们才能继续。",
        "pinyin": "Zhǐyǒu jiějuéle zhège wèntí, wǒmen cái néng jìxù.",
        "english": "Only after solving this problem can we continue.",
        "highlight": "只有解决了这个问题，我们才能"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to confuse 只有...才... with 只要...就... (as long as... then...). While both express conditions, 只有...才... emphasizes that the condition is *necessary* and often exclusive, meaning no other condition will suffice. 只要...就... implies the condition is *sufficient* but not necessarily exclusive.",
      "wrongExample": "只要努力学习，才取得好成绩。",
      "correctExample": "只有努力学习，才能取得好成绩。",
      "explanation": "'才' must be paired with '只有' to convey the meaning of 'only if' or 'only by', emphasizing the necessity of the condition."
    },
    "comparison": {
      "structure": "只要...就... vs. 只有...才...",
      "difference": "'只要...就...' indicates a sufficient condition (as long as X, then Y will happen), while '只有...才...' indicates a necessary condition (only if X, then Y will happen). The latter implies exclusivity and indispensability of the condition."
    },
    "appearsInTexts": [
      "hsk4-1-06",
      "hsk4-2-06"
    ],
    "exercises":     [
        {
            "id": "hsk4i-zhiyou-cai-06-ex1",
            "type": "fill-blank",
            "question": "只有亲自去看看，才能了解真___情况。",
            "answer": "实",
            "hint": "Practice the '只有 (zhǐyǒu) + Condition + 才 (cái) + Result' structure."
        },
        {
            "id": "hsk4i-zhiyou-cai-06-ex2",
            "type": "fill-blank",
            "question": "只有亲自去看___，才能了解真实情况。",
            "answer": "看",
            "hint": "Practice the '只有 (zhǐyǒu) + Condition + 才 (cái) + Result' structure."
        },
        {
            "id": "hsk4i-zhiyou-cai-06-ex3",
            "type": "fill-blank",
            "question": "只有亲自去看看，才能了解真实___况。",
            "answer": "情",
            "hint": "Practice the '只有 (zhǐyǒu) + Condition + 才 (cái) + Result' structure."
        },
        {
            "id": "hsk4i-zhiyou-cai-06-ex4",
            "type": "fill-blank",
            "question": "只有努力___习，才能取得好成绩。",
            "answer": "学",
            "hint": "Practice the '只有 (zhǐyǒu) + Condition + 才 (cái) + Result' structure."
        },
        {
            "id": "hsk4i-zhiyou-cai-06-ex5",
            "type": "fill-blank",
            "question": "只___努力学习，才能取得好成绩。",
            "answer": "有",
            "hint": "Practice the '只有 (zhǐyǒu) + Condition + 才 (cái) + Result' structure."
        },
        {
            "id": "hsk4i-zhiyou-cai-06-ex6",
            "type": "reorder",
            "words": [
                "绩",
                "学",
                "成",
                "得",
                "有",
                "只",
                "好",
                "能",
                "取",
                "力",
                "习",
                "努",
                "才"
            ],
            "answer": "只有努力学习，才能取得好成绩。",
            "hint": "Reorder to form a sentence using the '只有 (zhǐyǒu) + Condition + 才 (cái) + Result' structure."
        },
        {
            "id": "hsk4i-zhiyou-cai-06-ex7",
            "type": "reorder",
            "words": [
                "只",
                "取",
                "有",
                "好",
                "努",
                "习",
                "绩",
                "成",
                "力",
                "能",
                "才",
                "得",
                "学"
            ],
            "answer": "只有努力学习，才能取得好成绩。",
            "hint": "Reorder to form a sentence using the '只有 (zhǐyǒu) + Condition + 才 (cái) + Result' structure."
        },
        {
            "id": "hsk4i-zhiyou-cai-06-ex8",
            "type": "reorder",
            "words": [
                "能",
                "有",
                "真",
                "只",
                "才",
                "看",
                "况",
                "了",
                "亲",
                "解",
                "看",
                "实",
                "情",
                "自",
                "去"
            ],
            "answer": "只有亲自去看看，才能了解真实情况。",
            "hint": "Reorder to form a sentence using the '只有 (zhǐyǒu) + Condition + 才 (cái) + Result' structure."
        },
        {
            "id": "hsk4i-zhiyou-cai-06-ex9",
            "type": "reorder",
            "words": [
                "有",
                "解",
                "看",
                "自",
                "只",
                "真",
                "情",
                "去",
                "能",
                "才",
                "实",
                "况",
                "了",
                "亲",
                "看"
            ],
            "answer": "只有亲自去看看，才能了解真实情况。",
            "hint": "Reorder to form a sentence using the '只有 (zhǐyǒu) + Condition + 才 (cái) + Result' structure."
        },
        {
            "id": "hsk4i-zhiyou-cai-06-ex10",
            "type": "reorder",
            "words": [
                "自",
                "看",
                "去",
                "解",
                "况",
                "能",
                "有",
                "只",
                "才",
                "情",
                "实",
                "了",
                "亲",
                "真",
                "看"
            ],
            "answer": "只有亲自去看看，才能了解真实情况。",
            "hint": "Reorder to form a sentence using the '只有 (zhǐyǒu) + Condition + 才 (cái) + Result' structure."
        },
        {
            "id": "hsk4i-zhiyou-cai-06-ex11",
            "type": "translate",
            "question": "Only by studying hard can one achieve good grades.",
            "answer": "只有努力学习，才能取得好成绩。",
            "direction": "en-to-cn",
            "hint": "Translate using the '只有 (zhǐyǒu) + Condition + 才 (cái) + Result' structure."
        },
        {
            "id": "hsk4i-zhiyou-cai-06-ex12",
            "type": "translate",
            "question": "只有努力学习，才能取得好成绩。",
            "answer": "Only by studying hard can one achieve good grades.",
            "direction": "cn-to-en",
            "hint": "Translate using the '只有 (zhǐyǒu) + Condition + 才 (cái) + Result' structure."
        },
        {
            "id": "hsk4i-zhiyou-cai-06-ex13",
            "type": "translate",
            "question": "Only by practicing more can one speak Chinese well.",
            "answer": "只有多练习，才能说好汉语。",
            "direction": "en-to-cn",
            "hint": "Translate using the '只有 (zhǐyǒu) + Condition + 才 (cái) + Result' structure."
        },
        {
            "id": "hsk4i-zhiyou-cai-06-ex14",
            "type": "translate",
            "question": "只有努力学习，才能取得好成绩。",
            "answer": "Only by studying hard can one achieve good grades.",
            "direction": "cn-to-en",
            "hint": "Translate using the '只有 (zhǐyǒu) + Condition + 才 (cái) + Result' structure."
        },
        {
            "id": "hsk4i-zhiyou-cai-06-ex15",
            "type": "translate",
            "question": "Only by studying hard can one achieve good grades.",
            "answer": "只有努力学习，才能取得好成绩。",
            "direction": "en-to-cn",
            "hint": "Translate using the '只有 (zhǐyǒu) + Condition + 才 (cái) + Result' structure."
        }
    ]
  },
  {
    "id": "hsk4i-buguan-dou-07",
    "band": "HSK4-I",
    "order": 6,
    "title": "No matter... still... with 不管...都... (bùguǎn...dōu...)",
    "subtitle": "Expressing concession regardless of circumstances, meaning 'no matter what/how/who... still...'.",
    "formula": "不管 (bùguǎn) + Question word/Clause + 都 (dōu) + Result",
    "explanation": "The structure 不管...都... is used to express that a certain result will remain true or an action will be taken, regardless of the conditions or circumstances mentioned in the first clause. It emphasizes the unchanging nature of the outcome.",
    "usageRules": [
      "不管 (bùguǎn) introduces a clause that lists various possibilities or conditions, often using question words like 谁 (who), 什么 (what), 怎么 (how), 哪里 (where), 多少 (how much/many), or a conditional clause.",
      "都 (dōu) introduces the main clause, stating the consistent result or action.",
      "It implies that the outcome is fixed and not influenced by the preceding conditions.",
      "Can be used interchangeably with 无论...都... in many contexts."
    ],
    "examples": [
      {
        "chinese": "不管多忙，他都会按时吃饭。",
        "pinyin": "Bùguǎn duō máng, tā dōu huì ànshí chīfàn.",
        "english": "No matter how busy he is, he will eat on time.",
        "highlight": "不管多忙，他都会"
      },
      {
        "chinese": "不管天气怎么样，我们都去。",
        "pinyin": "Bùguǎn tiānqì zěnmeyàng, wǒmen dōu qù.",
        "english": "No matter what the weather is like, we will go.",
        "highlight": "不管天气怎么样，我们都"
      },
      {
        "chinese": "不管发生什么事，我都会支持你。",
        "pinyin": "Bùguǎn fāshēng shénme shì, wǒ dōu huì zhīchí nǐ.",
        "english": "No matter what happens, I will support you.",
        "highlight": "不管发生什么事，我都会"
      },
      {
        "chinese": "不管去哪里，他都带着这本书。",
        "pinyin": "Bùguǎn qù nǎlǐ, tā dōu dàizhe zhè běn shū.",
        "english": "No matter where he goes, he takes this book with him.",
        "highlight": "不管去哪里，他都"
      },
      {
        "chinese": "不管是谁，都不能违反规定。",
        "pinyin": "Bùguǎn shì shuí, dōu bù néng wéifǎn guīdìng.",
        "english": "No matter who it is, no one can violate the rules.",
        "highlight": "不管是谁，都不能"
      },
      {
        "chinese": "不管遇到什么困难，我们都要坚持。",
        "pinyin": "Bùguǎn yùdào shénme kùnnan, wǒmen dōu yào jiānchí.",
        "english": "No matter what difficulties we encounter, we must persevere.",
        "highlight": "不管遇到什么困难，我们都要"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to omit 都 in the second clause, which is crucial for completing the structure and conveying the meaning of 'still' or 'all'. Also, ensure the first clause lists possibilities or uses a question word.",
      "wrongExample": "不管多忙，他会按时吃饭。",
      "correctExample": "不管多忙，他都会按时吃饭。",
      "explanation": "The presence of '都' is necessary to emphasize that the action in the second clause will happen regardless of the condition in the first clause."
    },
    "comparison": {
      "structure": "不管...都... vs. 无论...都...",
      "difference": "Both structures are largely interchangeable and express concession. '无论' is generally considered slightly more formal than '不管'. '不管' can sometimes be followed by a single alternative, while '无论' usually implies a broader range of possibilities."
    },
    "appearsInTexts": [
      "hsk4-1-07",
      "hsk4-2-07"
    ],
    "exercises":     [
        {
            "id": "hsk4i-buguan-dou-07-ex1",
            "type": "fill-blank",
            "question": "不管多忙，他都会按___吃饭。",
            "answer": "时",
            "hint": "Practice the '不管 (bùguǎn) + Question word/Clause + 都 (dōu) + Result' structure."
        },
        {
            "id": "hsk4i-buguan-dou-07-ex2",
            "type": "fill-blank",
            "question": "不管天气___么样，我们都去。",
            "answer": "怎",
            "hint": "Practice the '不管 (bùguǎn) + Question word/Clause + 都 (dōu) + Result' structure."
        },
        {
            "id": "hsk4i-buguan-dou-07-ex3",
            "type": "fill-blank",
            "question": "不管天___怎么样，我们都去。",
            "answer": "气",
            "hint": "Practice the '不管 (bùguǎn) + Question word/Clause + 都 (dōu) + Result' structure."
        },
        {
            "id": "hsk4i-buguan-dou-07-ex4",
            "type": "fill-blank",
            "question": "不管多忙，___都会按时吃饭。",
            "answer": "他",
            "hint": "Practice the '不管 (bùguǎn) + Question word/Clause + 都 (dōu) + Result' structure."
        },
        {
            "id": "hsk4i-buguan-dou-07-ex5",
            "type": "fill-blank",
            "question": "不管多___，他都会按时吃饭。",
            "answer": "忙",
            "hint": "Practice the '不管 (bùguǎn) + Question word/Clause + 都 (dōu) + Result' structure."
        },
        {
            "id": "hsk4i-buguan-dou-07-ex6",
            "type": "reorder",
            "words": [
                "气",
                "去",
                "我",
                "天",
                "管",
                "不",
                "们",
                "怎",
                "都",
                "样",
                "么"
            ],
            "answer": "不管天气怎么样，我们都去。",
            "hint": "Reorder to form a sentence using the '不管 (bùguǎn) + Question word/Clause + 都 (dōu) + Result' structure."
        },
        {
            "id": "hsk4i-buguan-dou-07-ex7",
            "type": "reorder",
            "words": [
                "他",
                "时",
                "管",
                "饭",
                "按",
                "都",
                "忙",
                "不",
                "吃",
                "会",
                "多"
            ],
            "answer": "不管多忙，他都会按时吃饭。",
            "hint": "Reorder to form a sentence using the '不管 (bùguǎn) + Question word/Clause + 都 (dōu) + Result' structure."
        },
        {
            "id": "hsk4i-buguan-dou-07-ex8",
            "type": "reorder",
            "words": [
                "管",
                "气",
                "们",
                "么",
                "怎",
                "去",
                "样",
                "不",
                "都",
                "天",
                "我"
            ],
            "answer": "不管天气怎么样，我们都去。",
            "hint": "Reorder to form a sentence using the '不管 (bùguǎn) + Question word/Clause + 都 (dōu) + Result' structure."
        },
        {
            "id": "hsk4i-buguan-dou-07-ex9",
            "type": "reorder",
            "words": [
                "气",
                "样",
                "我",
                "么",
                "天",
                "都",
                "们",
                "不",
                "去",
                "管",
                "怎"
            ],
            "answer": "不管天气怎么样，我们都去。",
            "hint": "Reorder to form a sentence using the '不管 (bùguǎn) + Question word/Clause + 都 (dōu) + Result' structure."
        },
        {
            "id": "hsk4i-buguan-dou-07-ex10",
            "type": "reorder",
            "words": [
                "多",
                "按",
                "都",
                "饭",
                "管",
                "会",
                "他",
                "时",
                "吃",
                "不",
                "忙"
            ],
            "answer": "不管多忙，他都会按时吃饭。",
            "hint": "Reorder to form a sentence using the '不管 (bùguǎn) + Question word/Clause + 都 (dōu) + Result' structure."
        },
        {
            "id": "hsk4i-buguan-dou-07-ex11",
            "type": "translate",
            "question": "No matter how busy he is, he will eat on time.",
            "answer": "不管多忙，他都会按时吃饭。",
            "direction": "en-to-cn",
            "hint": "Translate using the '不管 (bùguǎn) + Question word/Clause + 都 (dōu) + Result' structure."
        },
        {
            "id": "hsk4i-buguan-dou-07-ex12",
            "type": "translate",
            "question": "不管多忙，他都会按时吃饭。",
            "answer": "No matter how busy he is, he will eat on time.",
            "direction": "cn-to-en",
            "hint": "Translate using the '不管 (bùguǎn) + Question word/Clause + 都 (dōu) + Result' structure."
        },
        {
            "id": "hsk4i-buguan-dou-07-ex13",
            "type": "translate",
            "question": "No matter what the weather is like, we will go.",
            "answer": "不管天气怎么样，我们都去。",
            "direction": "en-to-cn",
            "hint": "Translate using the '不管 (bùguǎn) + Question word/Clause + 都 (dōu) + Result' structure."
        },
        {
            "id": "hsk4i-buguan-dou-07-ex14",
            "type": "translate",
            "question": "不管多忙，他都会按时吃饭。",
            "answer": "No matter how busy he is, he will eat on time.",
            "direction": "cn-to-en",
            "hint": "Translate using the '不管 (bùguǎn) + Question word/Clause + 都 (dōu) + Result' structure."
        },
        {
            "id": "hsk4i-buguan-dou-07-ex15",
            "type": "translate",
            "question": "No matter what the weather is like, we will go.",
            "answer": "不管天气怎么样，我们都去。",
            "direction": "en-to-cn",
            "hint": "Translate using the '不管 (bùguǎn) + Question word/Clause + 都 (dōu) + Result' structure."
        }
    ]
  },
  {
    "id": "hsk4i-wulun-dou-08",
    "band": "HSK4-I",
    "order": 7,
    "title": "No matter... still... with 无论...都... (wúlùn...dōu...)",
    "subtitle": "Expressing concession regardless of conditions, meaning 'no matter what/how/who... still...'.",
    "formula": "无论 (wúlùn) + Question word/Clause + 都 (dōu) + Result",
    "explanation": "The structure 无论...都... is used to convey that a certain outcome or action will occur consistently, irrespective of the conditions or choices presented. It emphasizes the universality or inevitability of the result.",
    "usageRules": [
      "无论 (wúlùn) introduces a clause that lists various possibilities, often using question words (谁, 什么, 怎么, 哪里, 多少) or a series of alternatives.",
      "都 (dōu) introduces the main clause, stating the consistent result or action.",
      "It implies that the outcome is fixed and not influenced by the preceding conditions.",
      "Can be used interchangeably with 不管...都... in many contexts, but 无论 is often considered more formal."
    ],
    "examples": [
      {
        "chinese": "无论发生什么，我都会在你身边。",
        "pinyin": "Wúlùn fāshēng shénme, wǒ dōu huì zài nǐ shēnbiān.",
        "english": "No matter what happens, I will be by your side.",
        "highlight": "无论发生什么，我都会"
      },
      {
        "chinese": "无论多远，我都要去。",
        "pinyin": "Wúlùn duō yuǎn, wǒ dōu yào qù.",
        "english": "No matter how far it is, I will go.",
        "highlight": "无论多远，我都要"
      },
      {
        "chinese": "无论成功还是失败，我们都应该努力。",
        "pinyin": "Wúlùn chénggōng háishì shībài, wǒmen dōu yīnggāi nǔlì.",
        "english": "No matter success or failure, we should all work hard.",
        "highlight": "无论成功还是失败，我们都"
      },
      {
        "chinese": "无论他怎么说，我都不相信。",
        "pinyin": "Wúlùn tā zěnme shuō, wǒ dōu bù xiāngxìn.",
        "english": "No matter what he says, I don't believe him.",
        "highlight": "无论他怎么说，我都不"
      },
      {
        "chinese": "无论什么时候，你都可以来找我。",
        "pinyin": "Wúlùn shénme shíhou, nǐ dōu kěyǐ lái zhǎo wǒ.",
        "english": "No matter when, you can come to find me.",
        "highlight": "无论什么时候，你都可以"
      },
      {
        "chinese": "无论谁问，你都不要告诉他。",
        "pinyin": "Wúlùn shuí wèn, nǐ dōu bù yào gàosù tā.",
        "english": "No matter who asks, you must not tell him.",
        "highlight": "无论谁问，你都不要"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 无论 without a question word or a clear set of alternatives in the first clause, or to omit 都 in the second clause. The structure requires a sense of 'all possibilities' or 'any case' in the first part.",
      "wrongExample": "无论下雨，我都要去。",
      "correctExample": "无论下雨还是晴天，我都要去。",
      "explanation": "'无论' typically needs to present a range of possibilities (e.g., '下雨还是晴天') or use a question word (e.g., '无论什么') to convey the meaning of 'no matter what'."
    },
    "comparison": {
      "structure": "无论...都... vs. 不管...都...",
      "difference": "Both are largely interchangeable. '无论' is often preferred in more formal contexts or when presenting a comprehensive list of possibilities. '不管' can sometimes be more colloquial."
    },
    "appearsInTexts": [
      "hsk4-1-08",
      "hsk4-2-08"
    ],
    "exercises":     [
        {
            "id": "hsk4i-wulun-dou-08-ex1",
            "type": "fill-blank",
            "question": "___论发生什么，我都会在你身边。",
            "answer": "无",
            "hint": "Practice the '无论 (wúlùn) + Question word/Clause + 都 (dōu) + Result' structure."
        },
        {
            "id": "hsk4i-wulun-dou-08-ex2",
            "type": "fill-blank",
            "question": "无论多远，___都要去。",
            "answer": "我",
            "hint": "Practice the '无论 (wúlùn) + Question word/Clause + 都 (dōu) + Result' structure."
        },
        {
            "id": "hsk4i-wulun-dou-08-ex3",
            "type": "fill-blank",
            "question": "无论___远，我都要去。",
            "answer": "多",
            "hint": "Practice the '无论 (wúlùn) + Question word/Clause + 都 (dōu) + Result' structure."
        },
        {
            "id": "hsk4i-wulun-dou-08-ex4",
            "type": "fill-blank",
            "question": "无论成功还是失败，___们都应该努力。",
            "answer": "我",
            "hint": "Practice the '无论 (wúlùn) + Question word/Clause + 都 (dōu) + Result' structure."
        },
        {
            "id": "hsk4i-wulun-dou-08-ex5",
            "type": "fill-blank",
            "question": "无论成功还是失败，我们___应该努力。",
            "answer": "都",
            "hint": "Practice the '无论 (wúlùn) + Question word/Clause + 都 (dōu) + Result' structure."
        },
        {
            "id": "hsk4i-wulun-dou-08-ex6",
            "type": "reorder",
            "words": [
                "我",
                "去",
                "论",
                "要",
                "都",
                "远",
                "无",
                "多"
            ],
            "answer": "无论多远，我都要去。",
            "hint": "Reorder to form a sentence using the '无论 (wúlùn) + Question word/Clause + 都 (dōu) + Result' structure."
        },
        {
            "id": "hsk4i-wulun-dou-08-ex7",
            "type": "reorder",
            "words": [
                "力",
                "我",
                "失",
                "还",
                "都",
                "论",
                "无",
                "是",
                "该",
                "应",
                "成",
                "功",
                "败",
                "们",
                "努"
            ],
            "answer": "无论成功还是失败，我们都应该努力。",
            "hint": "Reorder to form a sentence using the '无论 (wúlùn) + Question word/Clause + 都 (dōu) + Result' structure."
        },
        {
            "id": "hsk4i-wulun-dou-08-ex8",
            "type": "reorder",
            "words": [
                "论",
                "都",
                "无",
                "多",
                "远",
                "要",
                "我",
                "去"
            ],
            "answer": "无论多远，我都要去。",
            "hint": "Reorder to form a sentence using the '无论 (wúlùn) + Question word/Clause + 都 (dōu) + Result' structure."
        },
        {
            "id": "hsk4i-wulun-dou-08-ex9",
            "type": "reorder",
            "words": [
                "败",
                "该",
                "努",
                "我",
                "论",
                "应",
                "成",
                "们",
                "力",
                "失",
                "是",
                "功",
                "无",
                "都",
                "还"
            ],
            "answer": "无论成功还是失败，我们都应该努力。",
            "hint": "Reorder to form a sentence using the '无论 (wúlùn) + Question word/Clause + 都 (dōu) + Result' structure."
        },
        {
            "id": "hsk4i-wulun-dou-08-ex10",
            "type": "reorder",
            "words": [
                "无",
                "要",
                "多",
                "我",
                "论",
                "远",
                "去",
                "都"
            ],
            "answer": "无论多远，我都要去。",
            "hint": "Reorder to form a sentence using the '无论 (wúlùn) + Question word/Clause + 都 (dōu) + Result' structure."
        },
        {
            "id": "hsk4i-wulun-dou-08-ex11",
            "type": "translate",
            "question": "No matter what happens, I will be by your side.",
            "answer": "无论发生什么，我都会在你身边。",
            "direction": "en-to-cn",
            "hint": "Translate using the '无论 (wúlùn) + Question word/Clause + 都 (dōu) + Result' structure."
        },
        {
            "id": "hsk4i-wulun-dou-08-ex12",
            "type": "translate",
            "question": "无论成功还是失败，我们都应该努力。",
            "answer": "No matter success or failure, we should all work hard.",
            "direction": "cn-to-en",
            "hint": "Translate using the '无论 (wúlùn) + Question word/Clause + 都 (dōu) + Result' structure."
        },
        {
            "id": "hsk4i-wulun-dou-08-ex13",
            "type": "translate",
            "question": "No matter what happens, I will be by your side.",
            "answer": "无论发生什么，我都会在你身边。",
            "direction": "en-to-cn",
            "hint": "Translate using the '无论 (wúlùn) + Question word/Clause + 都 (dōu) + Result' structure."
        },
        {
            "id": "hsk4i-wulun-dou-08-ex14",
            "type": "translate",
            "question": "无论发生什么，我都会在你身边。",
            "answer": "No matter what happens, I will be by your side.",
            "direction": "cn-to-en",
            "hint": "Translate using the '无论 (wúlùn) + Question word/Clause + 都 (dōu) + Result' structure."
        },
        {
            "id": "hsk4i-wulun-dou-08-ex15",
            "type": "translate",
            "question": "No matter how far it is, I will go.",
            "answer": "无论多远，我都要去。",
            "direction": "en-to-cn",
            "hint": "Translate using the '无论 (wúlùn) + Question word/Clause + 都 (dōu) + Result' structure."
        }
    ]
  },
  {
    "id": "hsk4i-ningke-yebu-09",
    "band": "HSK4-I",
    "order": 8,
    "title": "Would rather... than... with 宁可...也不... (nìngkě...yěbù...)",
    "subtitle": "Expressing a preference for one undesirable option over another, meaning 'would rather A than B'.",
    "formula": "宁可 (nìngkě) + Option A (less undesirable) + 也 (yě) + 不 (bù) + Option B (more undesirable)",
    "explanation": "The structure 宁可...也不... is used to express a choice between two undesirable options, indicating a preference for the first option (宁可) even though it's not ideal, over the second, more undesirable option (也不). It highlights a firm decision or principle.",
    "usageRules": [
      "宁可 (nìngkě) introduces the preferred (though still undesirable) choice.",
      "也 (yě) 不 (bù) introduces the rejected, more undesirable choice.",
      "Both options are typically negative or involve some sacrifice.",
      "It emphasizes a strong resolve or a lesser of two evils decision."
    ],
    "examples": [
      {
        "chinese": "我宁可站着，也不想坐他的车。",
        "pinyin": "Wǒ nìngkě zhànzhe, yě bù xiǎng zuò tā de chē.",
        "english": "I'd rather stand than sit in his car.",
        "highlight": "宁可站着，也不想坐"
      },
      {
        "chinese": "宁可错杀一千，也不放过一个。",
        "pinyin": "Nìngkě cuò shā yī qiān, yě bù fàngguò yī ge.",
        "english": "Better to kill a thousand innocent people by mistake than to let one guilty person go.",
        "highlight": "宁可错杀一千，也不放过一个"
      },
      {
        "chinese": "我宁可在家休息，也不想出去玩。",
        "pinyin": "Wǒ nìngkě zàijiā xiūxi, yě bù xiǎng chūqù wán.",
        "english": "I'd rather rest at home than go out to play.",
        "highlight": "宁可在家休息，也不想出去"
      },
      {
        "chinese": "宁可食无肉，不可居无竹。",
        "pinyin": "Nìngkě shí wú ròu, bù kě jū wú zhú.",
        "english": "Better to eat no meat than to live without bamboo (a metaphor for spiritual sustenance).",
        "highlight": "宁可食无肉，不可居无竹"
      },
      {
        "chinese": "他宁可加班，也不愿意把工作留到明天。",
        "pinyin": "Tā nìngkě jiābān, yě bù yuànyì bǎ gōngzuò liú dào míngtiān.",
        "english": "He'd rather work overtime than leave the work until tomorrow.",
        "highlight": "宁可加班，也不愿意"
      },
      {
        "chinese": "宁可自己吃亏，也不让别人受损失。",
        "pinyin": "Nìngkě zìjǐ chīkuī, yě bù ràng biérén shòu sǔnshī.",
        "english": "I'd rather suffer a loss myself than let others suffer losses.",
        "highlight": "宁可自己吃亏，也不让别人"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 宁可...也不... when both options are desirable, or when the preference is not between two undesirable things. This structure specifically implies choosing the 'lesser of two evils'.",
      "wrongExample": "我宁可看电影，也不想看书。",
      "correctExample": "我宁可在家休息，也不想出去玩。",
      "explanation": "'看电影' and '看书' are both generally desirable activities. The structure is best used when both options have a negative connotation, and one is chosen as a compromise."
    },
    "appearsInTexts": [
      "hsk4-1-09",
      "hsk4-2-09"
    ],
    "exercises":     [
        {
            "id": "hsk4i-ningke-yebu-09-ex1",
            "type": "fill-blank",
            "question": "我宁___站着，也不想坐他的车。",
            "answer": "可",
            "hint": "Practice the '宁可 (nìngkě) + Option A (less undesirable) + 也 (yě) + 不 (bù) + Option B (more undesirable)' structure."
        },
        {
            "id": "hsk4i-ningke-yebu-09-ex2",
            "type": "fill-blank",
            "question": "我___可站着，也不想坐他的车。",
            "answer": "宁",
            "hint": "Practice the '宁可 (nìngkě) + Option A (less undesirable) + 也 (yě) + 不 (bù) + Option B (more undesirable)' structure."
        },
        {
            "id": "hsk4i-ningke-yebu-09-ex3",
            "type": "fill-blank",
            "question": "我宁可在家休息，___不想出去玩。",
            "answer": "也",
            "hint": "Practice the '宁可 (nìngkě) + Option A (less undesirable) + 也 (yě) + 不 (bù) + Option B (more undesirable)' structure."
        },
        {
            "id": "hsk4i-ningke-yebu-09-ex4",
            "type": "fill-blank",
            "question": "我宁可在家休息，也不想___去玩。",
            "answer": "出",
            "hint": "Practice the '宁可 (nìngkě) + Option A (less undesirable) + 也 (yě) + 不 (bù) + Option B (more undesirable)' structure."
        },
        {
            "id": "hsk4i-ningke-yebu-09-ex5",
            "type": "fill-blank",
            "question": "宁可错___一千，也不放过一个。",
            "answer": "杀",
            "hint": "Practice the '宁可 (nìngkě) + Option A (less undesirable) + 也 (yě) + 不 (bù) + Option B (more undesirable)' structure."
        },
        {
            "id": "hsk4i-ningke-yebu-09-ex6",
            "type": "reorder",
            "words": [
                "我",
                "家",
                "去",
                "息",
                "可",
                "宁",
                "在",
                "出",
                "休",
                "玩",
                "不",
                "想",
                "也"
            ],
            "answer": "我宁可在家休息，也不想出去玩。",
            "hint": "Reorder to form a sentence using the '宁可 (nìngkě) + Option A (less undesirable) + 也 (yě) + 不 (bù) + Option B (more undesirable)' structure."
        },
        {
            "id": "hsk4i-ningke-yebu-09-ex7",
            "type": "reorder",
            "words": [
                "的",
                "可",
                "我",
                "不",
                "站",
                "想",
                "也",
                "宁",
                "着",
                "车",
                "他",
                "坐"
            ],
            "answer": "我宁可站着，也不想坐他的车。",
            "hint": "Reorder to form a sentence using the '宁可 (nìngkě) + Option A (less undesirable) + 也 (yě) + 不 (bù) + Option B (more undesirable)' structure."
        },
        {
            "id": "hsk4i-ningke-yebu-09-ex8",
            "type": "reorder",
            "words": [
                "千",
                "宁",
                "不",
                "一",
                "过",
                "可",
                "杀",
                "错",
                "个",
                "放",
                "一",
                "也"
            ],
            "answer": "宁可错杀一千，也不放过一个。",
            "hint": "Reorder to form a sentence using the '宁可 (nìngkě) + Option A (less undesirable) + 也 (yě) + 不 (bù) + Option B (more undesirable)' structure."
        },
        {
            "id": "hsk4i-ningke-yebu-09-ex9",
            "type": "reorder",
            "words": [
                "出",
                "可",
                "想",
                "息",
                "玩",
                "去",
                "宁",
                "家",
                "不",
                "也",
                "我",
                "休",
                "在"
            ],
            "answer": "我宁可在家休息，也不想出去玩。",
            "hint": "Reorder to form a sentence using the '宁可 (nìngkě) + Option A (less undesirable) + 也 (yě) + 不 (bù) + Option B (more undesirable)' structure."
        },
        {
            "id": "hsk4i-ningke-yebu-09-ex10",
            "type": "reorder",
            "words": [
                "杀",
                "也",
                "宁",
                "个",
                "过",
                "一",
                "错",
                "千",
                "不",
                "可",
                "一",
                "放"
            ],
            "answer": "宁可错杀一千，也不放过一个。",
            "hint": "Reorder to form a sentence using the '宁可 (nìngkě) + Option A (less undesirable) + 也 (yě) + 不 (bù) + Option B (more undesirable)' structure."
        },
        {
            "id": "hsk4i-ningke-yebu-09-ex11",
            "type": "translate",
            "question": "I'd rather rest at home than go out to play.",
            "answer": "我宁可在家休息，也不想出去玩。",
            "direction": "en-to-cn",
            "hint": "Translate using the '宁可 (nìngkě) + Option A (less undesirable) + 也 (yě) + 不 (bù) + Option B (more undesirable)' structure."
        },
        {
            "id": "hsk4i-ningke-yebu-09-ex12",
            "type": "translate",
            "question": "我宁可在家休息，也不想出去玩。",
            "answer": "I'd rather rest at home than go out to play.",
            "direction": "cn-to-en",
            "hint": "Translate using the '宁可 (nìngkě) + Option A (less undesirable) + 也 (yě) + 不 (bù) + Option B (more undesirable)' structure."
        },
        {
            "id": "hsk4i-ningke-yebu-09-ex13",
            "type": "translate",
            "question": "I'd rather rest at home than go out to play.",
            "answer": "我宁可在家休息，也不想出去玩。",
            "direction": "en-to-cn",
            "hint": "Translate using the '宁可 (nìngkě) + Option A (less undesirable) + 也 (yě) + 不 (bù) + Option B (more undesirable)' structure."
        },
        {
            "id": "hsk4i-ningke-yebu-09-ex14",
            "type": "translate",
            "question": "我宁可站着，也不想坐他的车。",
            "answer": "I'd rather stand than sit in his car.",
            "direction": "cn-to-en",
            "hint": "Translate using the '宁可 (nìngkě) + Option A (less undesirable) + 也 (yě) + 不 (bù) + Option B (more undesirable)' structure."
        },
        {
            "id": "hsk4i-ningke-yebu-09-ex15",
            "type": "translate",
            "question": "I'd rather stand than sit in his car.",
            "answer": "我宁可站着，也不想坐他的车。",
            "direction": "en-to-cn",
            "hint": "Translate using the '宁可 (nìngkě) + Option A (less undesirable) + 也 (yě) + 不 (bù) + Option B (more undesirable)' structure."
        }
    ]
  },
  {
    "id": "hsk4i-yuqi-buru-10",
    "band": "HSK4-I",
    "order": 9,
    "title": "Rather than... better to... with 与其...不如... (yǔqí...bùrú...)",
    "subtitle": "Expressing a preference, meaning 'rather than A, it's better to B'.",
    "formula": "与其 (yǔqí) + Option A + 不如 (bùrú) + Option B",
    "explanation": "The structure 与其...不如... is used to express a comparison and preference, indicating that rather than doing or choosing the first option (与其), it is better or more advisable to do or choose the second option (不如). It suggests a more optimal alternative.",
    "usageRules": [
      "与其 (yǔqí) introduces the less preferred or less advisable option.",
      "不如 (bùrú) introduces the preferred or more advisable option.",
      "Both options are usually actions or situations.",
      "It is often used to give advice or make a suggestion."
    ],
    "examples": [
      {
        "chinese": "与其浪费时间，不如做些有意义的事。",
        "pinyin": "Yǔqí làngfèi shíjiān, bùrú zuò xiē yǒu yìyì de shì.",
        "english": "Rather than wasting time, it's better to do something meaningful.",
        "highlight": "与其浪费时间，不如做些"
      },
      {
        "chinese": "与其在家看电视，不如出去走走。",
        "pinyin": "Yǔqí zàijiā kàn diànshì, bùrú chūqù zǒuzǒu.",
        "english": "Rather than watching TV at home, it's better to go out for a walk.",
        "highlight": "与其在家看电视，不如出去"
      },
      {
        "chinese": "与其抱怨，不如改变。",
        "pinyin": "Yǔqí bàoyuàn, bùrú gǎibiàn.",
        "english": "Rather than complaining, it's better to change.",
        "highlight": "与其抱怨，不如改变"
      },
      {
        "chinese": "与其一个人去，不如大家一起去。",
        "pinyin": "Yǔqí yī ge rén qù, bùrú dàjiā yīqǐ qù.",
        "english": "Rather than going alone, it's better for everyone to go together.",
        "highlight": "与其一个人去，不如大家一起"
      },
      {
        "chinese": "与其现在放弃，不如再坚持一下。",
        "pinyin": "Yǔqí xiànzài fàngqì, bùrú zài jiānchí yīxià.",
        "english": "Rather than giving up now, it's better to persevere a bit longer.",
        "highlight": "与其现在放弃，不如再坚持"
      },
      {
        "chinese": "与其说他聪明，不如说他努力。",
        "pinyin": "Yǔqí shuō tā cōngmíng, bùrú shuō tā nǔlì.",
        "english": "Rather than saying he is smart, it's better to say he is hardworking.",
        "highlight": "与其说他聪明，不如说他努力"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 与其...不如... when the two options are not comparable or when there isn't a clear preference for one over the other. Ensure that '不如' introduces a genuinely better alternative.",
      "wrongExample": "与其吃饭，不如睡觉。",
      "correctExample": "与其在家看电视，不如出去走走。",
      "explanation": "'吃饭' and '睡觉' are both basic needs and not typically presented as alternatives where one is 'better' than the other in a general sense. The structure works best with comparable actions or situations."
    },
    "comparison": {
      "structure": "宁可...也不... vs. 与其...不如...",
      "difference": "'宁可...也不...' is used when both options are undesirable, and you choose the 'lesser of two evils'. '与其...不如...' is used when you compare two options and suggest one is clearly better or more advisable than the other, even if the first option isn't necessarily 'bad'."
    },
    "appearsInTexts": [
      "hsk4-1-10",
      "hsk4-2-10"
    ],
    "exercises":     [
        {
            "id": "hsk4i-yuqi-buru-10-ex1",
            "type": "fill-blank",
            "question": "与其浪费时间，___如做些有意义的事。",
            "answer": "不",
            "hint": "Practice the '与其 (yǔqí) + Option A + 不如 (bùrú) + Option B' structure."
        },
        {
            "id": "hsk4i-yuqi-buru-10-ex2",
            "type": "fill-blank",
            "question": "与其浪费时间，不如做些有意义的___。",
            "answer": "事",
            "hint": "Practice the '与其 (yǔqí) + Option A + 不如 (bùrú) + Option B' structure."
        },
        {
            "id": "hsk4i-yuqi-buru-10-ex3",
            "type": "fill-blank",
            "question": "与其抱怨，不如改___。",
            "answer": "变",
            "hint": "Practice the '与其 (yǔqí) + Option A + 不如 (bùrú) + Option B' structure."
        },
        {
            "id": "hsk4i-yuqi-buru-10-ex4",
            "type": "fill-blank",
            "question": "与其___费时间，不如做些有意义的事。",
            "answer": "浪",
            "hint": "Practice the '与其 (yǔqí) + Option A + 不如 (bùrú) + Option B' structure."
        },
        {
            "id": "hsk4i-yuqi-buru-10-ex5",
            "type": "fill-blank",
            "question": "与其抱怨，不如___变。",
            "answer": "改",
            "hint": "Practice the '与其 (yǔqí) + Option A + 不如 (bùrú) + Option B' structure."
        },
        {
            "id": "hsk4i-yuqi-buru-10-ex6",
            "type": "reorder",
            "words": [
                "不",
                "如",
                "改",
                "与",
                "怨",
                "抱",
                "变",
                "其"
            ],
            "answer": "与其抱怨，不如改变。",
            "hint": "Reorder to form a sentence using the '与其 (yǔqí) + Option A + 不如 (bùrú) + Option B' structure."
        },
        {
            "id": "hsk4i-yuqi-buru-10-ex7",
            "type": "reorder",
            "words": [
                "如",
                "改",
                "与",
                "怨",
                "其",
                "不",
                "抱",
                "变"
            ],
            "answer": "与其抱怨，不如改变。",
            "hint": "Reorder to form a sentence using the '与其 (yǔqí) + Option A + 不如 (bùrú) + Option B' structure."
        },
        {
            "id": "hsk4i-yuqi-buru-10-ex8",
            "type": "reorder",
            "words": [
                "怨",
                "与",
                "如",
                "其",
                "变",
                "抱",
                "不",
                "改"
            ],
            "answer": "与其抱怨，不如改变。",
            "hint": "Reorder to form a sentence using the '与其 (yǔqí) + Option A + 不如 (bùrú) + Option B' structure."
        },
        {
            "id": "hsk4i-yuqi-buru-10-ex9",
            "type": "reorder",
            "words": [
                "其",
                "意",
                "如",
                "事",
                "义",
                "的",
                "与",
                "做",
                "些",
                "时",
                "间",
                "不",
                "有",
                "费",
                "浪"
            ],
            "answer": "与其浪费时间，不如做些有意义的事。",
            "hint": "Reorder to form a sentence using the '与其 (yǔqí) + Option A + 不如 (bùrú) + Option B' structure."
        },
        {
            "id": "hsk4i-yuqi-buru-10-ex10",
            "type": "reorder",
            "words": [
                "如",
                "不",
                "时",
                "与",
                "的",
                "其",
                "意",
                "有",
                "做",
                "间",
                "事",
                "浪",
                "费",
                "些",
                "义"
            ],
            "answer": "与其浪费时间，不如做些有意义的事。",
            "hint": "Reorder to form a sentence using the '与其 (yǔqí) + Option A + 不如 (bùrú) + Option B' structure."
        },
        {
            "id": "hsk4i-yuqi-buru-10-ex11",
            "type": "translate",
            "question": "Rather than wasting time, it's better to do something meaningful.",
            "answer": "与其浪费时间，不如做些有意义的事。",
            "direction": "en-to-cn",
            "hint": "Translate using the '与其 (yǔqí) + Option A + 不如 (bùrú) + Option B' structure."
        },
        {
            "id": "hsk4i-yuqi-buru-10-ex12",
            "type": "translate",
            "question": "与其抱怨，不如改变。",
            "answer": "Rather than complaining, it's better to change.",
            "direction": "cn-to-en",
            "hint": "Translate using the '与其 (yǔqí) + Option A + 不如 (bùrú) + Option B' structure."
        },
        {
            "id": "hsk4i-yuqi-buru-10-ex13",
            "type": "translate",
            "question": "Rather than complaining, it's better to change.",
            "answer": "与其抱怨，不如改变。",
            "direction": "en-to-cn",
            "hint": "Translate using the '与其 (yǔqí) + Option A + 不如 (bùrú) + Option B' structure."
        },
        {
            "id": "hsk4i-yuqi-buru-10-ex14",
            "type": "translate",
            "question": "与其在家看电视，不如出去走走。",
            "answer": "Rather than watching TV at home, it's better to go out for a walk.",
            "direction": "cn-to-en",
            "hint": "Translate using the '与其 (yǔqí) + Option A + 不如 (bùrú) + Option B' structure."
        },
        {
            "id": "hsk4i-yuqi-buru-10-ex15",
            "type": "translate",
            "question": "Rather than wasting time, it's better to do something meaningful.",
            "answer": "与其浪费时间，不如做些有意义的事。",
            "direction": "en-to-cn",
            "hint": "Translate using the '与其 (yǔqí) + Option A + 不如 (bùrú) + Option B' structure."
        }
    ]
  },
  {
    "id": "hsk4i-jinguan-haishi-11",
    "band": "HSK4-I",
    "order": 10,
    "title": "Although... still... with 尽管...还是... (jǐnguǎn...háishì...)",
    "subtitle": "Expressing a strong concession, meaning 'although/even though... still...'.",
    "formula": "尽管 (jǐnguǎn) + Clause 1 (concession) + 还是 (háishì) + Clause 2 (result)",
    "explanation": "The structure 尽管...还是... is used to express a strong concession, indicating that despite a certain situation or fact in the first clause, the result or action in the second clause still occurs or holds true. It emphasizes the persistence of the outcome against expectations.",
    "usageRules": [
      "尽管 (jǐnguǎn) introduces the concessive clause, which states a fact or situation that might lead to a different expectation.",
      "还是 (háishì) introduces the main clause, stating the actual result that happens despite the concession.",
      "It highlights a contrast between the expected outcome and the actual outcome.",
      "Can be used to express surprise, inevitability, or to emphasize a point."
    ],
    "examples": [
      {
        "chinese": "尽管很累，他还是坚持工作。",
        "pinyin": "Jǐnguǎn hěn lèi, tā háishì jiānchí gōngzuò.",
        "english": "Although very tired, he still insisted on working.",
        "highlight": "尽管很累，他还是"
      },
      {
        "chinese": "尽管天气不好，我们还是出门了。",
        "pinyin": "Jǐnguǎn tiānqì bù hǎo, wǒmen háishì chūménle.",
        "english": "Although the weather was bad, we still went out.",
        "highlight": "尽管天气不好，我们还是"
      },
      {
        "chinese": "尽管他很努力，但还是失败了。",
        "pinyin": "Jǐnguǎn tā hěn nǔlì, dàn háishì shībàile.",
        "english": "Although he worked very hard, he still failed.",
        "highlight": "尽管他很努力，但还是"
      },
      {
        "chinese": "尽管时间很紧，我们还是完成了任务。",
        "pinyin": "Jǐnguǎn shíjiān hěn jǐn, wǒmen háishì wánchéngle rènwu.",
        "english": "Although time was tight, we still completed the task.",
        "highlight": "尽管时间很紧，我们还是"
      },
      {
        "chinese": "尽管大家都反对，他还是决定这样做。",
        "pinyin": "Jǐnguǎn dàjiā dōu fǎnduì, tā háishì juédìng zhèyàng zuò.",
        "english": "Although everyone objected, he still decided to do it this way.",
        "highlight": "尽管大家都反对，他还是"
      },
      {
        "chinese": "尽管他不懂中文，他还是想去中国。",
        "pinyin": "Jǐnguǎn tā bù dǒng Zhōngwén, tā háishì xiǎng qù Zhōngguó.",
        "english": "Although he doesn't understand Chinese, he still wants to go to China.",
        "highlight": "尽管他不懂中文，他还是"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to confuse 尽管...还是... with 虽然...但是... (although... but...). While both express concession, 尽管...还是... implies a stronger contrast and emphasizes the persistence of the outcome despite the concession, often with a sense of inevitability or determination. 虽然...但是... is a more general concession.",
      "wrongExample": "虽然很累，他还是坚持工作。",
      "correctExample": "尽管很累，他还是坚持工作。",
      "explanation": "'尽管...还是...' provides a stronger emphasis on the 'despite' aspect, highlighting the determination or unexpected persistence of the action against the tiredness."
    },
    "comparison": {
      "structure": "尽管...还是... vs. 虽然...但是...",
      "difference": "'尽管...还是...' conveys a stronger sense of concession and emphasizes the persistence of the outcome despite the condition. '虽然...但是...' is a more general way to express 'although... but...' and the contrast might not be as strong."
    },
    "appearsInTexts": [
      "hsk4-1-11",
      "hsk4-2-11"
    ],
    "exercises":     [
        {
            "id": "hsk4i-jinguan-haishi-11-ex1",
            "type": "fill-blank",
            "question": "___他很努力，但还是失败了。",
            "answer": "尽管",
            "hint": "尽管 (jǐnguǎn) + Clause 1 (concession) + 还是 (háishì) + Clause 2 (result)"
        },
        {
            "id": "hsk4i-jinguan-haishi-11-ex2",
            "type": "fill-blank",
            "question": "___天气不好，我们还是出门了。",
            "answer": "尽管",
            "hint": "尽管 (jǐnguǎn) + Clause 1 (concession) + 还是 (háishì) + Clause 2 (result)"
        },
        {
            "id": "hsk4i-jinguan-haishi-11-ex3",
            "type": "fill-blank",
            "question": "___他很努力，但还是失败了。",
            "answer": "尽管",
            "hint": "尽管 (jǐnguǎn) + Clause 1 (concession) + 还是 (háishì) + Clause 2 (result)"
        },
        {
            "id": "hsk4i-jinguan-haishi-11-ex4",
            "type": "fill-blank",
            "question": "___天气不好，我们还是出门了。",
            "answer": "尽管",
            "hint": "尽管 (jǐnguǎn) + Clause 1 (concession) + 还是 (háishì) + Clause 2 (result)"
        },
        {
            "id": "hsk4i-jinguan-haishi-11-ex5",
            "type": "fill-blank",
            "question": "___很累，他还是坚持工作。",
            "answer": "尽管",
            "hint": "尽管 (jǐnguǎn) + Clause 1 (concession) + 还是 (háishì) + Clause 2 (result)"
        },
        {
            "id": "hsk4i-jinguan-haishi-11-ex6",
            "type": "reorder",
            "words": [
                "他还是坚持工作",
                "。",
                "尽管很累",
                "，"
            ],
            "answer": "尽管很累，他还是坚持工作。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 尽管 (jǐnguǎn) + Clause 1 (concession) + 还是 (háishì) + Clause 2 (result)"
        },
        {
            "id": "hsk4i-jinguan-haishi-11-ex7",
            "type": "reorder",
            "words": [
                "，",
                "。",
                "尽管很累",
                "他还是坚持工作"
            ],
            "answer": "尽管很累，他还是坚持工作。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 尽管 (jǐnguǎn) + Clause 1 (concession) + 还是 (háishì) + Clause 2 (result)"
        },
        {
            "id": "hsk4i-jinguan-haishi-11-ex8",
            "type": "reorder",
            "words": [
                "我们还是出门了",
                "尽管天气不好",
                "，",
                "。"
            ],
            "answer": "尽管天气不好，我们还是出门了。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 尽管 (jǐnguǎn) + Clause 1 (concession) + 还是 (háishì) + Clause 2 (result)"
        },
        {
            "id": "hsk4i-jinguan-haishi-11-ex9",
            "type": "reorder",
            "words": [
                "。",
                "，",
                "尽管很累",
                "他还是坚持工作"
            ],
            "answer": "尽管很累，他还是坚持工作。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 尽管 (jǐnguǎn) + Clause 1 (concession) + 还是 (háishì) + Clause 2 (result)"
        },
        {
            "id": "hsk4i-jinguan-haishi-11-ex10",
            "type": "reorder",
            "words": [
                "他还是坚持工作",
                "尽管很累",
                "，",
                "。"
            ],
            "answer": "尽管很累，他还是坚持工作。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 尽管 (jǐnguǎn) + Clause 1 (concession) + 还是 (háishì) + Clause 2 (result)"
        },
        {
            "id": "hsk4i-jinguan-haishi-11-ex11",
            "type": "translate",
            "question": "尽管很累，他还是坚持工作。",
            "answer": "Although very tired, he still insisted on working.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: 尽管 (jǐnguǎn) + Clause 1 (concession) + 还是 (háishì) + Clause 2 (result)"
        },
        {
            "id": "hsk4i-jinguan-haishi-11-ex12",
            "type": "translate",
            "question": "Although the weather was bad, we still went out.",
            "answer": "尽管天气不好，我们还是出门了。",
            "direction": "en-to-cn",
            "hint": "Translate to Chinese using the grammar structure: 尽管 (jǐnguǎn) + Clause 1 (concession) + 还是 (háishì) + Clause 2 (result)"
        },
        {
            "id": "hsk4i-jinguan-haishi-11-ex13",
            "type": "translate",
            "question": "尽管天气不好，我们还是出门了。",
            "answer": "Although the weather was bad, we still went out.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: 尽管 (jǐnguǎn) + Clause 1 (concession) + 还是 (háishì) + Clause 2 (result)"
        },
        {
            "id": "hsk4i-jinguan-haishi-11-ex14",
            "type": "translate",
            "question": "Although the weather was bad, we still went out.",
            "answer": "尽管天气不好，我们还是出门了。",
            "direction": "en-to-cn",
            "hint": "Translate to Chinese using the grammar structure: 尽管 (jǐnguǎn) + Clause 1 (concession) + 还是 (háishì) + Clause 2 (result)"
        },
        {
            "id": "hsk4i-jinguan-haishi-11-ex15",
            "type": "translate",
            "question": "尽管他很努力，但还是失败了。",
            "answer": "Although he worked very hard, he still failed.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: 尽管 (jǐnguǎn) + Clause 1 (concession) + 还是 (háishì) + Clause 2 (result)"
        }
    ]
  },
  {
    "id": "hsk4i-jiran-jiu-12",
    "band": "HSK4-I",
    "order": 11,
    "title": "Since... then... with 既然...就... (jìrán...jiù...)",
    "subtitle": "Expressing a logical consequence based on a known fact, meaning 'since/now that... then...'.",
    "formula": "既然 (jìrán) + Clause 1 (known fact) + 就 (jiù) + Clause 2 (logical consequence)",
    "explanation": "The structure 既然...就... is used to introduce a known fact or premise in the first clause, and then draw a logical conclusion or suggest a course of action in the second clause. It implies that given the established fact, the consequence is natural or necessary.",
    "usageRules": [
      "既然 (jìrán) introduces a premise that is already known or accepted.",
      "就 (jiù) introduces the logical consequence, suggestion, or conclusion that follows from the premise.",
      "The second clause often contains advice, a decision, or an inevitable outcome.",
      "It is commonly used in arguments, explanations, or when making decisions."
    ],
    "examples": [
      {
        "chinese": "既然你来了，就多玩一会儿吧。",
        "pinyin": "Jìrán nǐ láile, jiù duō wán yīhuìr ba.",
        "english": "Since you've come, stay and play for a while longer.",
        "highlight": "既然你来了，就多玩"
      },
      {
        "chinese": "既然决定了，就不要后悔。",
        "pinyin": "Jìrán juédìngle, jiù bù yào hòuhuǐ.",
        "english": "Since you've decided, don't regret it.",
        "highlight": "既然决定了，就不要"
      },
      {
        "chinese": "既然他不愿意说，我们就不要问了。",
        "pinyin": "Jìrán tā bù yuànyì shuō, wǒmen jiù bù yào wènle.",
        "english": "Since he doesn't want to say, we shouldn't ask.",
        "highlight": "既然他不愿意说，我们就不要"
      },
      {
        "chinese": "既然开始了，就应该坚持下去。",
        "pinyin": "Jìrán kāishǐle, jiù yīnggāi jiānchí xiàqù.",
        "english": "Since it has started, we should persevere.",
        "highlight": "既然开始了，就应该"
      },
      {
        "chinese": "既然有问题，我们就应该解决。",
        "pinyin": "Jìrán yǒu wèntí, wǒmen jiù yīnggāi jiějué.",
        "english": "Since there's a problem, we should solve it.",
        "highlight": "既然有问题，我们就应该"
      },
      {
        "chinese": "既然你答应了，就一定要做到。",
        "pinyin": "Jìrán nǐ dāyìngle, jiù yīdìng yào zuòdào.",
        "english": "Since you promised, you must do it.",
        "highlight": "既然你答应了，就一定要"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 既然...就... when the first clause is not a known or accepted fact, or when the second clause is not a logical consequence. The structure relies on the premise being established.",
      "wrongExample": "如果下雨，就不要出门。",
      "correctExample": "既然下雨了，就不要出门。",
      "explanation": "'既然' implies that 'it's raining' is a known fact, leading to the logical consequence of 'not going out'. '如果' (if) implies a hypothetical situation."
    },
    "comparison": {
      "structure": "既然...就... vs. 因为...所以...",
      "difference": "'既然...就...' focuses on drawing a logical conclusion or making a suggestion based on an *already known* fact. '因为...所以...' states a direct cause-and-effect relationship, where the cause might not necessarily be a pre-established fact."
    },
    "appearsInTexts": [
      "hsk4-1-12",
      "hsk4-2-12"
    ],
    "exercises":     [
        {
            "id": "hsk4i-jiran-jiu-12-ex1",
            "type": "fill-blank",
            "question": "___决定了，就不要后悔。",
            "answer": "既然",
            "hint": "既然 (jìrán) + Clause 1 (known fact) + 就 (jiù) + Clause 2 (logical consequence)"
        },
        {
            "id": "hsk4i-jiran-jiu-12-ex2",
            "type": "fill-blank",
            "question": "___你来了，就多玩一会儿吧。",
            "answer": "既然",
            "hint": "既然 (jìrán) + Clause 1 (known fact) + 就 (jiù) + Clause 2 (logical consequence)"
        },
        {
            "id": "hsk4i-jiran-jiu-12-ex3",
            "type": "fill-blank",
            "question": "___决定了，就不要后悔。",
            "answer": "既然",
            "hint": "既然 (jìrán) + Clause 1 (known fact) + 就 (jiù) + Clause 2 (logical consequence)"
        },
        {
            "id": "hsk4i-jiran-jiu-12-ex4",
            "type": "fill-blank",
            "question": "___决定了，就不要后悔。",
            "answer": "既然",
            "hint": "既然 (jìrán) + Clause 1 (known fact) + 就 (jiù) + Clause 2 (logical consequence)"
        },
        {
            "id": "hsk4i-jiran-jiu-12-ex5",
            "type": "fill-blank",
            "question": "___决定了，就不要后悔。",
            "answer": "既然",
            "hint": "既然 (jìrán) + Clause 1 (known fact) + 就 (jiù) + Clause 2 (logical consequence)"
        },
        {
            "id": "hsk4i-jiran-jiu-12-ex6",
            "type": "reorder",
            "words": [
                "，",
                "。",
                "既然你来了",
                "就多玩一会儿吧"
            ],
            "answer": "既然你来了，就多玩一会儿吧。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 既然 (jìrán) + Clause 1 (known fact) + 就 (jiù) + Clause 2 (logical consequence)"
        },
        {
            "id": "hsk4i-jiran-jiu-12-ex7",
            "type": "reorder",
            "words": [
                "就不要后悔",
                "既然决定了",
                "，",
                "。"
            ],
            "answer": "既然决定了，就不要后悔。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 既然 (jìrán) + Clause 1 (known fact) + 就 (jiù) + Clause 2 (logical consequence)"
        },
        {
            "id": "hsk4i-jiran-jiu-12-ex8",
            "type": "reorder",
            "words": [
                "，",
                "。",
                "就多玩一会儿吧",
                "既然你来了"
            ],
            "answer": "既然你来了，就多玩一会儿吧。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 既然 (jìrán) + Clause 1 (known fact) + 就 (jiù) + Clause 2 (logical consequence)"
        },
        {
            "id": "hsk4i-jiran-jiu-12-ex9",
            "type": "reorder",
            "words": [
                "，",
                "既然你来了",
                "就多玩一会儿吧",
                "。"
            ],
            "answer": "既然你来了，就多玩一会儿吧。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 既然 (jìrán) + Clause 1 (known fact) + 就 (jiù) + Clause 2 (logical consequence)"
        },
        {
            "id": "hsk4i-jiran-jiu-12-ex10",
            "type": "reorder",
            "words": [
                "，",
                "既然你来了",
                "就多玩一会儿吧",
                "。"
            ],
            "answer": "既然你来了，就多玩一会儿吧。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 既然 (jìrán) + Clause 1 (known fact) + 就 (jiù) + Clause 2 (logical consequence)"
        },
        {
            "id": "hsk4i-jiran-jiu-12-ex11",
            "type": "translate",
            "question": "既然你来了，就多玩一会儿吧。",
            "answer": "Since you've come, stay and play for a while longer.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: 既然 (jìrán) + Clause 1 (known fact) + 就 (jiù) + Clause 2 (logical consequence)"
        },
        {
            "id": "hsk4i-jiran-jiu-12-ex12",
            "type": "translate",
            "question": "Since you've come, stay and play for a while longer.",
            "answer": "既然你来了，就多玩一会儿吧。",
            "direction": "en-to-cn",
            "hint": "Translate to Chinese using the grammar structure: 既然 (jìrán) + Clause 1 (known fact) + 就 (jiù) + Clause 2 (logical consequence)"
        },
        {
            "id": "hsk4i-jiran-jiu-12-ex13",
            "type": "translate",
            "question": "既然决定了，就不要后悔。",
            "answer": "Since you've decided, don't regret it.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: 既然 (jìrán) + Clause 1 (known fact) + 就 (jiù) + Clause 2 (logical consequence)"
        },
        {
            "id": "hsk4i-jiran-jiu-12-ex14",
            "type": "translate",
            "question": "Since you've come, stay and play for a while longer.",
            "answer": "既然你来了，就多玩一会儿吧。",
            "direction": "en-to-cn",
            "hint": "Translate to Chinese using the grammar structure: 既然 (jìrán) + Clause 1 (known fact) + 就 (jiù) + Clause 2 (logical consequence)"
        },
        {
            "id": "hsk4i-jiran-jiu-12-ex15",
            "type": "translate",
            "question": "既然他不愿意说，我们就不要问了。",
            "answer": "Since he doesn't want to say, we shouldn't ask.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: 既然 (jìrán) + Clause 1 (known fact) + 就 (jiù) + Clause 2 (logical consequence)"
        }
    ]
  },
  {
    "id": "hsk4i-bushi-jiushi-13",
    "band": "HSK4-I",
    "order": 12,
    "title": "Either... or... with 不是...就是... (bùshì...jiùshì...)",
    "subtitle": "Expressing two mutually exclusive possibilities, meaning 'either A or B'.",
    "formula": "不是 (bùshì) + Option A + 就是 (jiùshì) + Option B",
    "explanation": "The structure 不是...就是... is used to present two mutually exclusive possibilities, implying that if one is not true, then the other must be true. It often suggests a limited set of choices or a strong inference.",
    "usageRules": [
      "不是 (bùshì) introduces the first possibility.",
      "就是 (jiùshì) introduces the second possibility.",
      "The two options are typically exhaustive, meaning there are no other alternatives.",
      "It can be used to make a strong guess or to describe a situation with limited outcomes."
    ],
    "examples": [
      {
        "chinese": "他不是学生，就是老师。",
        "pinyin": "Tā bùshì xuéshēng, jiùshì lǎoshī.",
        "english": "He is either a student or a teacher.",
        "highlight": "不是学生，就是老师"
      },
      {
        "chinese": "周末他不是在家，就是在图书馆。",
        "pinyin": "Zhōumò tā bùshì zàijiā, jiùshì zài túshūguǎn.",
        "english": "On weekends, he is either at home or in the library.",
        "highlight": "不是在家，就是在图书馆"
      },
      {
        "chinese": "这道题不是我做错了，就是你看错了。",
        "pinyin": "Zhè dào tí bùshì wǒ zuòcuòle, jiùshì nǐ kàncuòle.",
        "english": "Either I made a mistake on this question, or you read it wrong.",
        "highlight": "不是我做错了，就是你看错了"
      },
      {
        "chinese": "他不是在学习，就是在玩游戏。",
        "pinyin": "Tā bùshì zài xuéxí, jiùshì zài wán yóuxì.",
        "english": "He is either studying or playing games.",
        "highlight": "不是在学习，就是在玩游戏"
      },
      {
        "chinese": "他不是忘了，就是故意的。",
        "pinyin": "Tā bùshì wàngle, jiùshì gùyì de.",
        "english": "He either forgot, or he did it on purpose.",
        "highlight": "不是忘了，就是故意的"
      },
      {
        "chinese": "这辆车不是他的，就是他朋友的。",
        "pinyin": "Zhè liàng chē bùshì tā de, jiùshì tā péngyǒu de.",
        "english": "This car is either his or his friend's.",
        "highlight": "不是他的，就是他朋友的"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to confuse 不是...就是... with 还是 (háishì) or 或者 (huòzhě) for 'or'. 不是...就是... implies a strong certainty that one of the two options must be true and they are mutually exclusive, often used for inference. 还是 and 或者 are for general choices or possibilities.",
      "wrongExample": "他想喝茶还是咖啡？",
      "correctExample": "他不是想喝茶，就是想喝咖啡。",
      "explanation": "'不是...就是...' is used when you are making an inference about a situation where only two possibilities exist and one must be true. For questions or general choices, 还是 or 或者 are more appropriate."
    },
    "comparison": {
      "structure": "不是...就是... vs. 还是/或者",
      "difference": "'不是...就是...' indicates two mutually exclusive possibilities, one of which must be true, often used for inference or strong assertion. '还是' is used in questions for choices, and '或者' is used in statements for general alternatives."
    },
    "appearsInTexts": [
      "hsk4-1-13",
      "hsk4-2-13"
    ],
    "exercises":     [
        {
            "id": "hsk4i-bushi-jiushi-13-ex1",
            "type": "fill-blank",
            "question": "___，就是你看错了。",
            "answer": "这道题不是我做错了",
            "hint": "不是 (bùshì) + Option A + 就是 (jiùshì) + Option B"
        },
        {
            "id": "hsk4i-bushi-jiushi-13-ex2",
            "type": "fill-blank",
            "question": "___，就是你看错了。",
            "answer": "这道题不是我做错了",
            "hint": "不是 (bùshì) + Option A + 就是 (jiùshì) + Option B"
        },
        {
            "id": "hsk4i-bushi-jiushi-13-ex3",
            "type": "fill-blank",
            "question": "___，就是在图书馆。",
            "answer": "周末他不是在家",
            "hint": "不是 (bùshì) + Option A + 就是 (jiùshì) + Option B"
        },
        {
            "id": "hsk4i-bushi-jiushi-13-ex4",
            "type": "fill-blank",
            "question": "___，就是在图书馆。",
            "answer": "周末他不是在家",
            "hint": "不是 (bùshì) + Option A + 就是 (jiùshì) + Option B"
        },
        {
            "id": "hsk4i-bushi-jiushi-13-ex5",
            "type": "fill-blank",
            "question": "他不是学生，___。",
            "answer": "就是老师",
            "hint": "不是 (bùshì) + Option A + 就是 (jiùshì) + Option B"
        },
        {
            "id": "hsk4i-bushi-jiushi-13-ex6",
            "type": "reorder",
            "words": [
                "，",
                "他不是学生",
                "。",
                "就是老师"
            ],
            "answer": "他不是学生，就是老师。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 不是 (bùshì) + Option A + 就是 (jiùshì) + Option B"
        },
        {
            "id": "hsk4i-bushi-jiushi-13-ex7",
            "type": "reorder",
            "words": [
                "。",
                "这道题不是我做错了",
                "，",
                "就是你看错了"
            ],
            "answer": "这道题不是我做错了，就是你看错了。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 不是 (bùshì) + Option A + 就是 (jiùshì) + Option B"
        },
        {
            "id": "hsk4i-bushi-jiushi-13-ex8",
            "type": "reorder",
            "words": [
                "这道题不是我做错了",
                "，",
                "。",
                "就是你看错了"
            ],
            "answer": "这道题不是我做错了，就是你看错了。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 不是 (bùshì) + Option A + 就是 (jiùshì) + Option B"
        },
        {
            "id": "hsk4i-bushi-jiushi-13-ex9",
            "type": "reorder",
            "words": [
                "就是老师",
                "他不是学生",
                "，",
                "。"
            ],
            "answer": "他不是学生，就是老师。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 不是 (bùshì) + Option A + 就是 (jiùshì) + Option B"
        },
        {
            "id": "hsk4i-bushi-jiushi-13-ex10",
            "type": "reorder",
            "words": [
                "就是你看错了",
                "。",
                "这道题不是我做错了",
                "，"
            ],
            "answer": "这道题不是我做错了，就是你看错了。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 不是 (bùshì) + Option A + 就是 (jiùshì) + Option B"
        },
        {
            "id": "hsk4i-bushi-jiushi-13-ex11",
            "type": "translate",
            "question": "这道题不是我做错了，就是你看错了。",
            "answer": "Either I made a mistake on this question, or you read it wrong.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: 不是 (bùshì) + Option A + 就是 (jiùshì) + Option B"
        },
        {
            "id": "hsk4i-bushi-jiushi-13-ex12",
            "type": "translate",
            "question": "Either I made a mistake on this question, or you read it wrong.",
            "answer": "这道题不是我做错了，就是你看错了。",
            "direction": "en-to-cn",
            "hint": "Translate to Chinese using the grammar structure: 不是 (bùshì) + Option A + 就是 (jiùshì) + Option B"
        },
        {
            "id": "hsk4i-bushi-jiushi-13-ex13",
            "type": "translate",
            "question": "周末他不是在家，就是在图书馆。",
            "answer": "On weekends, he is either at home or in the library.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: 不是 (bùshì) + Option A + 就是 (jiùshì) + Option B"
        },
        {
            "id": "hsk4i-bushi-jiushi-13-ex14",
            "type": "translate",
            "question": "Either I made a mistake on this question, or you read it wrong.",
            "answer": "这道题不是我做错了，就是你看错了。",
            "direction": "en-to-cn",
            "hint": "Translate to Chinese using the grammar structure: 不是 (bùshì) + Option A + 就是 (jiùshì) + Option B"
        },
        {
            "id": "hsk4i-bushi-jiushi-13-ex15",
            "type": "translate",
            "question": "这道题不是我做错了，就是你看错了。",
            "answer": "Either I made a mistake on this question, or you read it wrong.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: 不是 (bùshì) + Option A + 就是 (jiùshì) + Option B"
        }
    ]
  },
  {
    "id": "hsk4i-yaome-yaome-14",
    "band": "HSK4-I",
    "order": 13,
    "title": "Either... or... with 要么...要么... (yàome...yàome...)",
    "subtitle": "Presenting two or more alternative choices, meaning 'either A or B'.",
    "formula": "要么 (yàome) + Option A + 要么 (yàome) + Option B",
    "explanation": "The structure 要么...要么... is used to present two or more alternative choices, implying that one of the options must be selected or will occur. It gives a clear set of possibilities from which to choose.",
    "usageRules": [
      "要么 (yàome) introduces each alternative choice.",
      "It can connect clauses, phrases, or single words.",
      "The options are usually actions or situations that are mutually exclusive in terms of selection.",
      "Often used when making plans, suggestions, or describing situations with limited options."
    ],
    "examples": [
      {
        "chinese": "周末要么看电影，要么去逛街。",
        "pinyin": "Zhōumò yàome kàn diànyǐng, yàome qù guàngjiē.",
        "english": "On the weekend, I'll either watch a movie or go shopping.",
        "highlight": "要么看电影，要么去逛街"
      },
      {
        "chinese": "你要么道歉，要么离开。",
        "pinyin": "Nǐ yàome dàoqiàn, yàome líkāi.",
        "english": "You either apologize or leave.",
        "highlight": "要么道歉，要么离开"
      },
      {
        "chinese": "他要么在家，要么在公司。",
        "pinyin": "Tā yàome zàijiā, yàome zài gōngsī.",
        "english": "He is either at home or at the company.",
        "highlight": "要么在家，要么在公司"
      },
      {
        "chinese": "我们要么坐火车，要么坐飞机。",
        "pinyin": "Wǒmen yàome zuò huǒchē, yàome zuò fēijī.",
        "english": "We will either take the train or take the plane.",
        "highlight": "要么坐火车，要么坐飞机"
      },
      {
        "chinese": "要么你来，要么我去。",
        "pinyin": "Yàome nǐ lái, yàome wǒ qù.",
        "english": "Either you come, or I go.",
        "highlight": "要么你来，要么我去"
      },
      {
        "chinese": "他要么学习，要么睡觉。",
        "pinyin": "Tā yàome xuéxí, yàome shuìjiào.",
        "english": "He either studies or sleeps.",
        "highlight": "要么学习，要么睡觉"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to confuse 要么...要么... with 或者 (huòzhě). While both mean 'or', 要么...要么... presents a more definitive set of alternatives, often implying a choice must be made from these options. 或者 is more general and can simply list possibilities without the same emphasis on choosing one.",
      "wrongExample": "周末看电影或者去逛街。",
      "correctExample": "周末要么看电影，要么去逛街。",
      "explanation": "'要么...要么...' explicitly states that one of the two actions will be chosen or will happen, emphasizing the alternative nature of the choices. '或者' can just list possibilities."
    },
    "comparison": {
      "structure": "要么...要么... vs. 或者",
      "difference": "'要么...要么...' presents a set of mutually exclusive alternatives from which a choice must be made or one will occur. '或者' is a more general 'or' that can simply list possibilities without the same emphasis on selection."
    },
    "appearsInTexts": [
      "hsk4-1-14",
      "hsk4-2-14"
    ],
    "exercises":     [
        {
            "id": "hsk4i-yaome-yaome-14-ex1",
            "type": "fill-blank",
            "question": "___，要么在公司。",
            "answer": "他要么在家",
            "hint": "要么 (yàome) + Option A + 要么 (yàome) + Option B"
        },
        {
            "id": "hsk4i-yaome-yaome-14-ex2",
            "type": "fill-blank",
            "question": "他要么在家，___。",
            "answer": "要么在公司",
            "hint": "要么 (yàome) + Option A + 要么 (yàome) + Option B"
        },
        {
            "id": "hsk4i-yaome-yaome-14-ex3",
            "type": "fill-blank",
            "question": "___，要么离开。",
            "answer": "你要么道歉",
            "hint": "要么 (yàome) + Option A + 要么 (yàome) + Option B"
        },
        {
            "id": "hsk4i-yaome-yaome-14-ex4",
            "type": "fill-blank",
            "question": "周末要么看电影，___。",
            "answer": "要么去逛街",
            "hint": "要么 (yàome) + Option A + 要么 (yàome) + Option B"
        },
        {
            "id": "hsk4i-yaome-yaome-14-ex5",
            "type": "fill-blank",
            "question": "___，要么去逛街。",
            "answer": "周末要么看电影",
            "hint": "要么 (yàome) + Option A + 要么 (yàome) + Option B"
        },
        {
            "id": "hsk4i-yaome-yaome-14-ex6",
            "type": "reorder",
            "words": [
                "，",
                "你要么道歉",
                "要么离开",
                "。"
            ],
            "answer": "你要么道歉，要么离开。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 要么 (yàome) + Option A + 要么 (yàome) + Option B"
        },
        {
            "id": "hsk4i-yaome-yaome-14-ex7",
            "type": "reorder",
            "words": [
                "，",
                "。",
                "你要么道歉",
                "要么离开"
            ],
            "answer": "你要么道歉，要么离开。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 要么 (yàome) + Option A + 要么 (yàome) + Option B"
        },
        {
            "id": "hsk4i-yaome-yaome-14-ex8",
            "type": "reorder",
            "words": [
                "要么离开",
                "你要么道歉",
                "，",
                "。"
            ],
            "answer": "你要么道歉，要么离开。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 要么 (yàome) + Option A + 要么 (yàome) + Option B"
        },
        {
            "id": "hsk4i-yaome-yaome-14-ex9",
            "type": "reorder",
            "words": [
                "要么在公司",
                "他要么在家",
                "。",
                "，"
            ],
            "answer": "他要么在家，要么在公司。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 要么 (yàome) + Option A + 要么 (yàome) + Option B"
        },
        {
            "id": "hsk4i-yaome-yaome-14-ex10",
            "type": "reorder",
            "words": [
                "周末要么看电影",
                "，",
                "。",
                "要么去逛街"
            ],
            "answer": "周末要么看电影，要么去逛街。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 要么 (yàome) + Option A + 要么 (yàome) + Option B"
        },
        {
            "id": "hsk4i-yaome-yaome-14-ex11",
            "type": "translate",
            "question": "你要么道歉，要么离开。",
            "answer": "You either apologize or leave.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: 要么 (yàome) + Option A + 要么 (yàome) + Option B"
        },
        {
            "id": "hsk4i-yaome-yaome-14-ex12",
            "type": "translate",
            "question": "You either apologize or leave.",
            "answer": "你要么道歉，要么离开。",
            "direction": "en-to-cn",
            "hint": "Translate to Chinese using the grammar structure: 要么 (yàome) + Option A + 要么 (yàome) + Option B"
        },
        {
            "id": "hsk4i-yaome-yaome-14-ex13",
            "type": "translate",
            "question": "你要么道歉，要么离开。",
            "answer": "You either apologize or leave.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: 要么 (yàome) + Option A + 要么 (yàome) + Option B"
        },
        {
            "id": "hsk4i-yaome-yaome-14-ex14",
            "type": "translate",
            "question": "You either apologize or leave.",
            "answer": "你要么道歉，要么离开。",
            "direction": "en-to-cn",
            "hint": "Translate to Chinese using the grammar structure: 要么 (yàome) + Option A + 要么 (yàome) + Option B"
        },
        {
            "id": "hsk4i-yaome-yaome-14-ex15",
            "type": "translate",
            "question": "周末要么看电影，要么去逛街。",
            "answer": "On the weekend, I'll either watch a movie or go shopping.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: 要么 (yàome) + Option A + 要么 (yàome) + Option B"
        }
    ]
  },
  {
    "id": "hsk4i-yifangmian-lingyifangmian-15",
    "band": "HSK4-I",
    "order": 14,
    "title": "On one hand... on the other hand... with 一方面...另一方面... (yī fāngmiàn...lìng yī fāngmiàn...)",
    "subtitle": "Presenting two different aspects or perspectives of a situation, meaning 'on one hand... on the other hand...'.",
    "formula": "一方面 (yī fāngmiàn) + Aspect 1 + 另一方面 (lìng yī fāngmiàn) + Aspect 2",
    "explanation": "The structure 一方面...另一方面... is used to present two different aspects, perspectives, or reasons related to the same subject or situation. These aspects can be complementary, contrasting, or simply different facets of a whole.",
    "usageRules": [
      "一方面 (yī fāngmiàn) introduces the first aspect or reason.",
      "另一方面 (lìng yī fāngmiàn) introduces the second aspect or reason.",
      "The two clauses usually describe different but related points.",
      "It is commonly used when analyzing a situation, explaining a decision, or describing a person's characteristics."
    ],
    "examples": [
      {
        "chinese": "他一方面要工作，另一方面还要照顾家庭。",
        "pinyin": "Tā yī fāngmiàn yào gōngzuò, lìng yī fāngmiàn hái yào zhàogù jiātíng.",
        "english": "On one hand, he has to work; on the other hand, he also has to take care of his family.",
        "highlight": "一方面要工作，另一方面还要照顾家庭"
      },
      {
        "chinese": "学中文一方面很有趣，另一方面也很有挑战性。",
        "pinyin": "Xué Zhōngwén yī fāngmiàn hěn yǒuqù, lìng yī fāngmiàn yě hěn yǒu tiǎozhànxìng.",
        "english": "Learning Chinese is interesting on one hand, and challenging on the other hand.",
        "highlight": "一方面很有趣，另一方面也很有挑战性"
      },
      {
        "chinese": "这个城市一方面很现代化，另一方面也保留了许多传统文化。",
        "pinyin": "Zhège chéngshì yī fāngmiàn hěn xiàndàihuà, lìng yī fāngmiàn yě bǎoliúle xǔduō chuántǒng wénhuà.",
        "english": "This city is very modern on one hand, and on the other hand, it also retains a lot of traditional culture.",
        "highlight": "一方面很现代化，另一方面也保留了许多传统文化"
      },
      {
        "chinese": "他一方面很聪明，另一方面也很努力。",
        "pinyin": "Tā yī fāngmiàn hěn cōngmíng, lìng yī fāngmiàn yě hěn nǔlì.",
        "english": "On one hand, he is very smart; on the other hand, he is also very hardworking.",
        "highlight": "一方面很聪明，另一方面也很努力"
      },
      {
        "chinese": "一方面是经济发展，另一方面是环境保护。",
        "pinyin": "Yī fāngmiàn shì jīngjì fāzhǎn, lìng yī fāngmiàn shì huánjìng bǎohù.",
        "english": "On one hand, there is economic development; on the other hand, there is environmental protection.",
        "highlight": "一方面是经济发展，另一方面是环境保护"
      },
      {
        "chinese": "我一方面想去，另一方面又担心。",
        "pinyin": "Wǒ yī fāngmiàn xiǎng qù, lìng yī fāngmiàn yòu dānxīn.",
        "english": "On one hand, I want to go; on the other hand, I'm worried.",
        "highlight": "一方面想去，另一方面又担心"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use this structure for simple conjunctions or when the two aspects are not clearly related to the same subject or situation. Ensure that the two 'sides' are indeed different facets of the same thing.",
      "wrongExample": "我喜欢吃苹果，另一方面也喜欢吃香蕉。",
      "correctExample": "我一方面喜欢吃苹果，另一方面也喜欢吃香蕉。",
      "explanation": "While the corrected sentence is grammatically fine, '一方面...另一方面...' is usually used for more complex situations or contrasting aspects, rather than just listing two separate preferences. For simple lists, '也' or '和' might be more natural."
    },
    "appearsInTexts": [
      "hsk4-1-15",
      "hsk4-2-15"
    ],
    "exercises":     [
        {
            "id": "hsk4i-yifangmian-lingyifangmian-15-ex1",
            "type": "fill-blank",
            "question": "___，另一方面也很有挑战性。",
            "answer": "学中文一方面很有趣",
            "hint": "一方面 (yī fāngmiàn) + Aspect 1 + 另一方面 (lìng yī fāngmiàn) + Aspect 2"
        },
        {
            "id": "hsk4i-yifangmian-lingyifangmian-15-ex2",
            "type": "fill-blank",
            "question": "这个城市一方面很现代化，___。",
            "answer": "另一方面也保留了许多传统文化",
            "hint": "一方面 (yī fāngmiàn) + Aspect 1 + 另一方面 (lìng yī fāngmiàn) + Aspect 2"
        },
        {
            "id": "hsk4i-yifangmian-lingyifangmian-15-ex3",
            "type": "fill-blank",
            "question": "他一方面要工作，___。",
            "answer": "另一方面还要照顾家庭",
            "hint": "一方面 (yī fāngmiàn) + Aspect 1 + 另一方面 (lìng yī fāngmiàn) + Aspect 2"
        },
        {
            "id": "hsk4i-yifangmian-lingyifangmian-15-ex4",
            "type": "fill-blank",
            "question": "他一方面要工作，___。",
            "answer": "另一方面还要照顾家庭",
            "hint": "一方面 (yī fāngmiàn) + Aspect 1 + 另一方面 (lìng yī fāngmiàn) + Aspect 2"
        },
        {
            "id": "hsk4i-yifangmian-lingyifangmian-15-ex5",
            "type": "fill-blank",
            "question": "___，另一方面也很有挑战性。",
            "answer": "学中文一方面很有趣",
            "hint": "一方面 (yī fāngmiàn) + Aspect 1 + 另一方面 (lìng yī fāngmiàn) + Aspect 2"
        },
        {
            "id": "hsk4i-yifangmian-lingyifangmian-15-ex6",
            "type": "reorder",
            "words": [
                "另一方面也很有挑战性",
                "。",
                "，",
                "学中文一方面很有趣"
            ],
            "answer": "学中文一方面很有趣，另一方面也很有挑战性。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 一方面 (yī fāngmiàn) + Aspect 1 + 另一方面 (lìng yī fāngmiàn) + Aspect 2"
        },
        {
            "id": "hsk4i-yifangmian-lingyifangmian-15-ex7",
            "type": "reorder",
            "words": [
                "另一方面也保留了许多传统文化",
                "这个城市一方面很现代化",
                "，",
                "。"
            ],
            "answer": "这个城市一方面很现代化，另一方面也保留了许多传统文化。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 一方面 (yī fāngmiàn) + Aspect 1 + 另一方面 (lìng yī fāngmiàn) + Aspect 2"
        },
        {
            "id": "hsk4i-yifangmian-lingyifangmian-15-ex8",
            "type": "reorder",
            "words": [
                "，",
                "另一方面也保留了许多传统文化",
                "。",
                "这个城市一方面很现代化"
            ],
            "answer": "这个城市一方面很现代化，另一方面也保留了许多传统文化。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 一方面 (yī fāngmiàn) + Aspect 1 + 另一方面 (lìng yī fāngmiàn) + Aspect 2"
        },
        {
            "id": "hsk4i-yifangmian-lingyifangmian-15-ex9",
            "type": "reorder",
            "words": [
                "。",
                "，",
                "这个城市一方面很现代化",
                "另一方面也保留了许多传统文化"
            ],
            "answer": "这个城市一方面很现代化，另一方面也保留了许多传统文化。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 一方面 (yī fāngmiàn) + Aspect 1 + 另一方面 (lìng yī fāngmiàn) + Aspect 2"
        },
        {
            "id": "hsk4i-yifangmian-lingyifangmian-15-ex10",
            "type": "reorder",
            "words": [
                "。",
                "另一方面还要照顾家庭",
                "他一方面要工作",
                "，"
            ],
            "answer": "他一方面要工作，另一方面还要照顾家庭。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 一方面 (yī fāngmiàn) + Aspect 1 + 另一方面 (lìng yī fāngmiàn) + Aspect 2"
        },
        {
            "id": "hsk4i-yifangmian-lingyifangmian-15-ex11",
            "type": "translate",
            "question": "这个城市一方面很现代化，另一方面也保留了许多传统文化。",
            "answer": "This city is very modern on one hand, and on the other hand, it also retains a lot of traditional culture.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: 一方面 (yī fāngmiàn) + Aspect 1 + 另一方面 (lìng yī fāngmiàn) + Aspect 2"
        },
        {
            "id": "hsk4i-yifangmian-lingyifangmian-15-ex12",
            "type": "translate",
            "question": "This city is very modern on one hand, and on the other hand, it also retains a lot of traditional culture.",
            "answer": "这个城市一方面很现代化，另一方面也保留了许多传统文化。",
            "direction": "en-to-cn",
            "hint": "Translate to Chinese using the grammar structure: 一方面 (yī fāngmiàn) + Aspect 1 + 另一方面 (lìng yī fāngmiàn) + Aspect 2"
        },
        {
            "id": "hsk4i-yifangmian-lingyifangmian-15-ex13",
            "type": "translate",
            "question": "这个城市一方面很现代化，另一方面也保留了许多传统文化。",
            "answer": "This city is very modern on one hand, and on the other hand, it also retains a lot of traditional culture.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: 一方面 (yī fāngmiàn) + Aspect 1 + 另一方面 (lìng yī fāngmiàn) + Aspect 2"
        },
        {
            "id": "hsk4i-yifangmian-lingyifangmian-15-ex14",
            "type": "translate",
            "question": "This city is very modern on one hand, and on the other hand, it also retains a lot of traditional culture.",
            "answer": "这个城市一方面很现代化，另一方面也保留了许多传统文化。",
            "direction": "en-to-cn",
            "hint": "Translate to Chinese using the grammar structure: 一方面 (yī fāngmiàn) + Aspect 1 + 另一方面 (lìng yī fāngmiàn) + Aspect 2"
        },
        {
            "id": "hsk4i-yifangmian-lingyifangmian-15-ex15",
            "type": "translate",
            "question": "学中文一方面很有趣，另一方面也很有挑战性。",
            "answer": "Learning Chinese is interesting on one hand, and challenging on the other hand.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: 一方面 (yī fāngmiàn) + Aspect 1 + 另一方面 (lìng yī fāngmiàn) + Aspect 2"
        }
    ]
  },
  {
    "id": "hsk4i-zhisuoyi-shiyinwei-16",
    "band": "HSK4-I",
    "order": 15,
    "title": "The reason why... is because... with 之所以...是因为... (zhīsuǒyǐ...shì yīnwèi...)",
    "subtitle": "Explaining the reason for a particular phenomenon or situation, meaning 'the reason why A is because B'.",
    "formula": "之所以 (zhīsuǒyǐ) + Phenomenon/Situation + 是因为 (shì yīnwèi) + Reason",
    "explanation": "The structure 之所以...是因为... is used to explicitly state the reason behind a particular phenomenon, situation, or action. It clearly links an outcome to its cause, providing a formal and direct explanation.",
    "usageRules": [
      "之所以 (zhīsuǒyǐ) introduces the phenomenon or situation that needs explanation.",
      "是因为 (shì yīnwèi) introduces the specific reason or cause.",
      "This structure is often used in formal writing or when providing a detailed explanation.",
      "The first clause states the 'why' and the second clause states the 'because'."
    ],
    "examples": [
      {
        "chinese": "他之所以成功，是因为他很努力。",
        "pinyin": "Tā zhīsuǒyǐ chénggōng, shì yīnwèi tā hěn nǔlì.",
        "english": "The reason why he succeeded is because he worked very hard.",
        "highlight": "之所以成功，是因为他很努力"
      },
      {
        "chinese": "我之所以选择这里，是因为这里环境很好。",
        "pinyin": "Wǒ zhīsuǒyǐ xuǎnzé zhèlǐ, shì yīnwèi zhèlǐ huánjìng hěn hǎo.",
        "english": "The reason why I chose here is because the environment here is very good.",
        "highlight": "之所以选择这里，是因为这里环境很好"
      },
      {
        "chinese": "他之所以迟到，是因为路上堵车了。",
        "pinyin": "Tā zhīsuǒyǐ chídào, shì yīnwèi lùshàng dǔchēle.",
        "english": "The reason why he was late is because there was a traffic jam on the road.",
        "highlight": "之所以迟到，是因为路上堵车了"
      },
      {
        "chinese": "之所以会这样，是因为我们没有提前准备。",
        "pinyin": "Zhīsuǒyǐ huì zhèyàng, shì yīnwèi wǒmen méiyǒu tíqián zhǔnbèi.",
        "english": "The reason why this happened is because we didn't prepare in advance.",
        "highlight": "之所以会这样，是因为我们没有提前准备"
      },
      {
        "chinese": "他之所以生气，是因为你说了不该说的话。",
        "pinyin": "Tā zhīsuǒyǐ shēngqì, shì yīnwèi nǐ shuōle bù gāi shuō de huà.",
        "english": "The reason why he is angry is because you said something you shouldn't have.",
        "highlight": "之所以生气，是因为你说了不该说的话"
      },
      {
        "chinese": "之所以选择这份工作，是因为它有挑战性。",
        "pinyin": "Zhīsuǒyǐ xuǎnzé zhè fèn gōngzuò, shì yīnwèi tā yǒu tiǎozhànxìng.",
        "english": "The reason why I chose this job is because it is challenging.",
        "highlight": "之所以选择这份工作，是因为它有挑战性"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 之所以...是因为... interchangeably with 因为...所以... (because... therefore...). While both express cause and effect, 之所以...是因为... is more formal and emphasizes explaining *why* a known outcome occurred, with the 'why' clause coming first. 因为...所以... is a more general cause-and-effect statement.",
      "wrongExample": "因为他很努力，所以他成功了。",
      "correctExample": "他之所以成功，是因为他很努力。",
      "explanation": "While the wrong example is grammatically correct, the structure '之所以...是因为...' specifically answers the question 'Why did he succeed?' by stating the reason, making it more suitable for explaining a known outcome."
    },
    "comparison": {
      "structure": "之所以...是因为... vs. 因为...所以...",
      "difference": "'之所以...是因为...' is used to explain the reason *why* a particular phenomenon or situation exists, with the outcome stated first. '因为...所以...' is a more general conjunction for cause and effect, where the cause is stated first."
    },
    "appearsInTexts": [
      "hsk4-1-16",
      "hsk4-2-16"
    ],
    "exercises":     [
        {
            "id": "hsk4i-zhisuoyi-shiyinwei-16-ex1",
            "type": "fill-blank",
            "question": "他之所以迟到，___。",
            "answer": "是因为路上堵车了",
            "hint": "之所以 (zhīsuǒyǐ) + Phenomenon/Situation + 是因为 (shì yīnwèi) + Reason"
        },
        {
            "id": "hsk4i-zhisuoyi-shiyinwei-16-ex2",
            "type": "fill-blank",
            "question": "___，是因为这里环境很好。",
            "answer": "我之所以选择这里",
            "hint": "之所以 (zhīsuǒyǐ) + Phenomenon/Situation + 是因为 (shì yīnwèi) + Reason"
        },
        {
            "id": "hsk4i-zhisuoyi-shiyinwei-16-ex3",
            "type": "fill-blank",
            "question": "___，是因为路上堵车了。",
            "answer": "他之所以迟到",
            "hint": "之所以 (zhīsuǒyǐ) + Phenomenon/Situation + 是因为 (shì yīnwèi) + Reason"
        },
        {
            "id": "hsk4i-zhisuoyi-shiyinwei-16-ex4",
            "type": "fill-blank",
            "question": "我之所以选择这里，___。",
            "answer": "是因为这里环境很好",
            "hint": "之所以 (zhīsuǒyǐ) + Phenomenon/Situation + 是因为 (shì yīnwèi) + Reason"
        },
        {
            "id": "hsk4i-zhisuoyi-shiyinwei-16-ex5",
            "type": "fill-blank",
            "question": "___，是因为他很努力。",
            "answer": "他之所以成功",
            "hint": "之所以 (zhīsuǒyǐ) + Phenomenon/Situation + 是因为 (shì yīnwèi) + Reason"
        },
        {
            "id": "hsk4i-zhisuoyi-shiyinwei-16-ex6",
            "type": "reorder",
            "words": [
                "他之所以成功",
                "。",
                "，",
                "是因为他很努力"
            ],
            "answer": "他之所以成功，是因为他很努力。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 之所以 (zhīsuǒyǐ) + Phenomenon/Situation + 是因为 (shì yīnwèi) + Reason"
        },
        {
            "id": "hsk4i-zhisuoyi-shiyinwei-16-ex7",
            "type": "reorder",
            "words": [
                "他之所以迟到",
                "。",
                "是因为路上堵车了",
                "，"
            ],
            "answer": "他之所以迟到，是因为路上堵车了。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 之所以 (zhīsuǒyǐ) + Phenomenon/Situation + 是因为 (shì yīnwèi) + Reason"
        },
        {
            "id": "hsk4i-zhisuoyi-shiyinwei-16-ex8",
            "type": "reorder",
            "words": [
                "，",
                "他之所以成功",
                "。",
                "是因为他很努力"
            ],
            "answer": "他之所以成功，是因为他很努力。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 之所以 (zhīsuǒyǐ) + Phenomenon/Situation + 是因为 (shì yīnwèi) + Reason"
        },
        {
            "id": "hsk4i-zhisuoyi-shiyinwei-16-ex9",
            "type": "reorder",
            "words": [
                "，",
                "他之所以成功",
                "是因为他很努力",
                "。"
            ],
            "answer": "他之所以成功，是因为他很努力。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 之所以 (zhīsuǒyǐ) + Phenomenon/Situation + 是因为 (shì yīnwèi) + Reason"
        },
        {
            "id": "hsk4i-zhisuoyi-shiyinwei-16-ex10",
            "type": "reorder",
            "words": [
                "我之所以选择这里",
                "，",
                "是因为这里环境很好",
                "。"
            ],
            "answer": "我之所以选择这里，是因为这里环境很好。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 之所以 (zhīsuǒyǐ) + Phenomenon/Situation + 是因为 (shì yīnwèi) + Reason"
        },
        {
            "id": "hsk4i-zhisuoyi-shiyinwei-16-ex11",
            "type": "translate",
            "question": "他之所以成功，是因为他很努力。",
            "answer": "The reason why he succeeded is because he worked very hard.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: 之所以 (zhīsuǒyǐ) + Phenomenon/Situation + 是因为 (shì yīnwèi) + Reason"
        },
        {
            "id": "hsk4i-zhisuoyi-shiyinwei-16-ex12",
            "type": "translate",
            "question": "The reason why I chose here is because the environment here is very good.",
            "answer": "我之所以选择这里，是因为这里环境很好。",
            "direction": "en-to-cn",
            "hint": "Translate to Chinese using the grammar structure: 之所以 (zhīsuǒyǐ) + Phenomenon/Situation + 是因为 (shì yīnwèi) + Reason"
        },
        {
            "id": "hsk4i-zhisuoyi-shiyinwei-16-ex13",
            "type": "translate",
            "question": "我之所以选择这里，是因为这里环境很好。",
            "answer": "The reason why I chose here is because the environment here is very good.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: 之所以 (zhīsuǒyǐ) + Phenomenon/Situation + 是因为 (shì yīnwèi) + Reason"
        },
        {
            "id": "hsk4i-zhisuoyi-shiyinwei-16-ex14",
            "type": "translate",
            "question": "The reason why I chose here is because the environment here is very good.",
            "answer": "我之所以选择这里，是因为这里环境很好。",
            "direction": "en-to-cn",
            "hint": "Translate to Chinese using the grammar structure: 之所以 (zhīsuǒyǐ) + Phenomenon/Situation + 是因为 (shì yīnwèi) + Reason"
        },
        {
            "id": "hsk4i-zhisuoyi-shiyinwei-16-ex15",
            "type": "translate",
            "question": "他之所以成功，是因为他很努力。",
            "answer": "The reason why he succeeded is because he worked very hard.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: 之所以 (zhīsuǒyǐ) + Phenomenon/Situation + 是因为 (shì yīnwèi) + Reason"
        }
    ]
  },
  {
    "id": "hsk4i-bujin-erqie-17",
    "band": "HSK4-I",
    "order": 16,
    "title": "Not only... but also... with 不仅...而且... (bùjǐn...érqiě...)",
    "subtitle": "Expressing addition and emphasis, meaning 'not only A, but also B'.",
    "formula": "不仅 (bùjǐn) + Clause/Phrase A + 而且 (érqiě) + Clause/Phrase B",
    "explanation": "The structure 不仅...而且... is used to connect two clauses or phrases, indicating that the second part adds further information or emphasizes the first part. It highlights that something is true not only in one aspect but also in another, often stronger, aspect.",
    "usageRules": [
      "不仅 (bùjǐn) introduces the first piece of information.",
      "而且 (érqiě) introduces the second, often more significant or additional, piece of information.",
      "The subjects of the two clauses can be the same or different.",
      "It is used to express accumulation, progression, or emphasis."
    ],
    "examples": [
      {
        "chinese": "他不仅会说汉语，而且还会写汉字。",
        "pinyin": "Tā bùjǐn huì shuō Hànyǔ, érqiě hái huì xiě Hànzì.",
        "english": "He can not only speak Chinese, but also write Chinese characters.",
        "highlight": "不仅会说汉语，而且还会写汉字"
      },
      {
        "chinese": "这家餐厅不仅菜好吃，而且服务也很好。",
        "pinyin": "Zhè jiā cāntīng bùjǐn cài hǎochī, érqiě fúwù yě hěn hǎo.",
        "english": "This restaurant's dishes are not only delicious, but the service is also very good.",
        "highlight": "不仅菜好吃，而且服务也很好"
      },
      {
        "chinese": "他不仅学习好，而且人也很好。",
        "pinyin": "Tā bùjǐn xuéxí hǎo, érqiě rén yě hěn hǎo.",
        "english": "He not only studies well, but he is also a good person.",
        "highlight": "不仅学习好，而且人也很好"
      },
      {
        "chinese": "这本书不仅内容丰富，而且语言也很优美。",
        "pinyin": "Zhè běn shū bùjǐn nèiróng fēngfù, érqiě yǔyán yě hěn yōuměi.",
        "english": "This book is not only rich in content, but also beautiful in language.",
        "highlight": "不仅内容丰富，而且语言也很优美"
      },
      {
        "chinese": "他不仅唱歌好听，而且跳舞也很好。",
        "pinyin": "Tā bùjǐn chànggē hǎotīng, érqiě tiàowǔ yě hěn hǎo.",
        "english": "He not only sings well, but also dances well.",
        "highlight": "不仅唱歌好听，而且跳舞也很好"
      },
      {
        "chinese": "这项工作不仅需要耐心，而且需要细心。",
        "pinyin": "Zhè xiàng gōngzuò bùjǐn xūyào nàixīn, érqiě xūyào xìxīn.",
        "english": "This job not only requires patience, but also meticulousness.",
        "highlight": "不仅需要耐心，而且需要细心"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to omit 而且 or to use it incorrectly. Ensure that the second clause or phrase truly adds to or emphasizes the first, and that the structure is complete. Sometimes, people might use '和' (and) instead, but '不仅...而且...' provides a stronger emphasis on the additive nature.",
      "wrongExample": "他不仅会说汉语，还会写汉字。",
      "correctExample": "他不仅会说汉语，而且还会写汉字。",
      "explanation": "The '而且' is crucial for completing the 'not only... but also...' structure and providing the intended emphasis on the additional skill."
    },
    "comparison": {
      "structure": "不仅...而且... vs. 不但...而且...",
      "difference": "Both structures are very similar and often interchangeable, meaning 'not only... but also...'. '不仅' is generally considered slightly more formal than '不但'. In some contexts, '不但' might imply a stronger sense of unexpectedness or a turning point."
    },
    "appearsInTexts": [
      "hsk4-1-17",
      "hsk4-2-17"
    ],
    "exercises":     [
        {
            "id": "hsk4i-bujin-erqie-17-ex1",
            "type": "fill-blank",
            "question": "___，而且还会写汉字。",
            "answer": "他不仅会说汉语",
            "hint": "不仅 (bùjǐn) + Clause/Phrase A + 而且 (érqiě) + Clause/Phrase B"
        },
        {
            "id": "hsk4i-bujin-erqie-17-ex2",
            "type": "fill-blank",
            "question": "他不仅会说汉语，___。",
            "answer": "而且还会写汉字",
            "hint": "不仅 (bùjǐn) + Clause/Phrase A + 而且 (érqiě) + Clause/Phrase B"
        },
        {
            "id": "hsk4i-bujin-erqie-17-ex3",
            "type": "fill-blank",
            "question": "他不仅会说汉语，___。",
            "answer": "而且还会写汉字",
            "hint": "不仅 (bùjǐn) + Clause/Phrase A + 而且 (érqiě) + Clause/Phrase B"
        },
        {
            "id": "hsk4i-bujin-erqie-17-ex4",
            "type": "fill-blank",
            "question": "___，而且服务也很好。",
            "answer": "这家餐厅不仅菜好吃",
            "hint": "不仅 (bùjǐn) + Clause/Phrase A + 而且 (érqiě) + Clause/Phrase B"
        },
        {
            "id": "hsk4i-bujin-erqie-17-ex5",
            "type": "fill-blank",
            "question": "___，而且还会写汉字。",
            "answer": "他不仅会说汉语",
            "hint": "不仅 (bùjǐn) + Clause/Phrase A + 而且 (érqiě) + Clause/Phrase B"
        },
        {
            "id": "hsk4i-bujin-erqie-17-ex6",
            "type": "reorder",
            "words": [
                "，",
                "而且服务也很好",
                "这家餐厅不仅菜好吃",
                "。"
            ],
            "answer": "这家餐厅不仅菜好吃，而且服务也很好。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 不仅 (bùjǐn) + Clause/Phrase A + 而且 (érqiě) + Clause/Phrase B"
        },
        {
            "id": "hsk4i-bujin-erqie-17-ex7",
            "type": "reorder",
            "words": [
                "而且还会写汉字",
                "他不仅会说汉语",
                "。",
                "，"
            ],
            "answer": "他不仅会说汉语，而且还会写汉字。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 不仅 (bùjǐn) + Clause/Phrase A + 而且 (érqiě) + Clause/Phrase B"
        },
        {
            "id": "hsk4i-bujin-erqie-17-ex8",
            "type": "reorder",
            "words": [
                "他不仅学习好",
                "而且人也很好",
                "，",
                "。"
            ],
            "answer": "他不仅学习好，而且人也很好。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 不仅 (bùjǐn) + Clause/Phrase A + 而且 (érqiě) + Clause/Phrase B"
        },
        {
            "id": "hsk4i-bujin-erqie-17-ex9",
            "type": "reorder",
            "words": [
                "。",
                "，",
                "他不仅会说汉语",
                "而且还会写汉字"
            ],
            "answer": "他不仅会说汉语，而且还会写汉字。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 不仅 (bùjǐn) + Clause/Phrase A + 而且 (érqiě) + Clause/Phrase B"
        },
        {
            "id": "hsk4i-bujin-erqie-17-ex10",
            "type": "reorder",
            "words": [
                "他不仅学习好",
                "而且人也很好",
                "，",
                "。"
            ],
            "answer": "他不仅学习好，而且人也很好。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 不仅 (bùjǐn) + Clause/Phrase A + 而且 (érqiě) + Clause/Phrase B"
        },
        {
            "id": "hsk4i-bujin-erqie-17-ex11",
            "type": "translate",
            "question": "这家餐厅不仅菜好吃，而且服务也很好。",
            "answer": "This restaurant's dishes are not only delicious, but the service is also very good.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: 不仅 (bùjǐn) + Clause/Phrase A + 而且 (érqiě) + Clause/Phrase B"
        },
        {
            "id": "hsk4i-bujin-erqie-17-ex12",
            "type": "translate",
            "question": "He not only studies well, but he is also a good person.",
            "answer": "他不仅学习好，而且人也很好。",
            "direction": "en-to-cn",
            "hint": "Translate to Chinese using the grammar structure: 不仅 (bùjǐn) + Clause/Phrase A + 而且 (érqiě) + Clause/Phrase B"
        },
        {
            "id": "hsk4i-bujin-erqie-17-ex13",
            "type": "translate",
            "question": "他不仅学习好，而且人也很好。",
            "answer": "He not only studies well, but he is also a good person.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: 不仅 (bùjǐn) + Clause/Phrase A + 而且 (érqiě) + Clause/Phrase B"
        },
        {
            "id": "hsk4i-bujin-erqie-17-ex14",
            "type": "translate",
            "question": "This restaurant's dishes are not only delicious, but the service is also very good.",
            "answer": "这家餐厅不仅菜好吃，而且服务也很好。",
            "direction": "en-to-cn",
            "hint": "Translate to Chinese using the grammar structure: 不仅 (bùjǐn) + Clause/Phrase A + 而且 (érqiě) + Clause/Phrase B"
        },
        {
            "id": "hsk4i-bujin-erqie-17-ex15",
            "type": "translate",
            "question": "这家餐厅不仅菜好吃，而且服务也很好。",
            "answer": "This restaurant's dishes are not only delicious, but the service is also very good.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: 不仅 (bùjǐn) + Clause/Phrase A + 而且 (érqiě) + Clause/Phrase B"
        }
    ]
  },
  {
    "id": "hsk4i-budan-faner-18",
    "band": "HSK4-I",
    "order": 17,
    "title": "Not only not... but on the contrary... with 不但...反而... (bùdàn...fǎn'ér...)",
    "subtitle": "Expressing an unexpected or contrary outcome, meaning 'not only not A, but on the contrary B'.",
    "formula": "不但 (bùdàn) + Clause/Phrase A (expected negative) + 反而 (fǎn'ér) + Clause/Phrase B (contrary outcome)",
    "explanation": "The structure 不但...反而... is used to express an outcome that is contrary to what was expected, often implying that not only did the expected negative not happen, but the opposite or an even worse situation occurred. It highlights a surprising and often undesirable turn of events.",
    "usageRules": [
      "不但 (bùdàn) introduces the expected (often negative) situation or outcome that did not occur.",
      "反而 (fǎn'ér) introduces the actual, contrary, or unexpected outcome.",
      "The second clause often presents a result that is the opposite of what one would logically anticipate.",
      "It is used to express surprise, disappointment, or to emphasize a paradoxical situation."
    ],
    "examples": [
      {
        "chinese": "他不但没有进步，反而退步了。",
        "pinyin": "Tā bùdàn méiyǒu jìnbù, fǎn'ér tuìbùle.",
        "english": "Not only did he not make progress, but on the contrary, he regressed.",
        "highlight": "不但没有进步，反而退步了"
      },
      {
        "chinese": "我不但没有瘦，反而胖了。",
        "pinyin": "Wǒ bùdàn méiyǒu shòu, fǎn'ér pàngle.",
        "english": "Not only did I not lose weight, but on the contrary, I gained weight.",
        "highlight": "不但没有瘦，反而胖了"
      },
      {
        "chinese": "他不但没有帮我，反而给我添了麻烦。",
        "pinyin": "Tā bùdàn méiyǒu bāng wǒ, fǎn'ér gěi wǒ tiānle máfan.",
        "english": "Not only did he not help me, but on the contrary, he caused me trouble.",
        "highlight": "不但没有帮我，反而给我添了麻烦"
      },
      {
        "chinese": "这种药不但没有效果，反而有副作用。",
        "pinyin": "Zhè zhǒng yào bùdàn méiyǒu xiàoguǒ, fǎn'ér yǒu fùzuòyòng.",
        "english": "This medicine not only has no effect, but on the contrary, it has side effects.",
        "highlight": "不但没有效果，反而有副作用"
      },
      {
        "chinese": "他不但没有生气，反而笑了。",
        "pinyin": "Tā bùdàn méiyǒu shēngqì, fǎn'ér xiàole.",
        "english": "Not only was he not angry, but on the contrary, he smiled.",
        "highlight": "不但没有生气，反而笑了"
      },
      {
        "chinese": "我不但没听懂，反而更糊涂了。",
        "pinyin": "Wǒ bùdàn méi tīngdǒng, fǎn'ér gèng hútule.",
        "english": "Not only did I not understand, but on the contrary, I became more confused.",
        "highlight": "不但没听懂，反而更糊涂了"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to confuse 不但...反而... with 不仅...而且... (not only... but also...). While both use '不但' or '不仅', '反而' specifically indicates a contrary or unexpected outcome, often a negative one, whereas '而且' simply adds more information or emphasizes a positive addition.",
      "wrongExample": "他不但会说汉语，反而还会写汉字。",
      "correctExample": "他不但没有进步，反而退步了。",
      "explanation": "'反而' is used when the outcome is contrary to expectation. In the wrong example, '会写汉字' is an additional skill, not a contrary outcome, so '而且' would be appropriate."
    },
    "comparison": {
      "structure": "不但...反而... vs. 不仅...而且...",
      "difference": "'不但...反而...' expresses an unexpected or contrary outcome, often implying a negative or paradoxical result. '不仅...而且...' expresses an additive relationship, where the second part adds to or emphasizes the first, usually in a positive or neutral way."
    },
    "appearsInTexts": [
      "hsk4-1-18",
      "hsk4-2-18"
    ],
    "exercises":     [
        {
            "id": "hsk4i-budan-faner-18-ex1",
            "type": "fill-blank",
            "question": "他不但没有进步，___。",
            "answer": "反而退步了",
            "hint": "不但 (bùdàn) + Clause/Phrase A (expected negative) + 反而 (fǎn'ér) + Clause/Phrase B (contrary outcome)"
        },
        {
            "id": "hsk4i-budan-faner-18-ex2",
            "type": "fill-blank",
            "question": "我不但没有瘦，___。",
            "answer": "反而胖了",
            "hint": "不但 (bùdàn) + Clause/Phrase A (expected negative) + 反而 (fǎn'ér) + Clause/Phrase B (contrary outcome)"
        },
        {
            "id": "hsk4i-budan-faner-18-ex3",
            "type": "fill-blank",
            "question": "他不但没有帮我，___。",
            "answer": "反而给我添了麻烦",
            "hint": "不但 (bùdàn) + Clause/Phrase A (expected negative) + 反而 (fǎn'ér) + Clause/Phrase B (contrary outcome)"
        },
        {
            "id": "hsk4i-budan-faner-18-ex4",
            "type": "fill-blank",
            "question": "___，反而给我添了麻烦。",
            "answer": "他不但没有帮我",
            "hint": "不但 (bùdàn) + Clause/Phrase A (expected negative) + 反而 (fǎn'ér) + Clause/Phrase B (contrary outcome)"
        },
        {
            "id": "hsk4i-budan-faner-18-ex5",
            "type": "fill-blank",
            "question": "他不但没有进步，___。",
            "answer": "反而退步了",
            "hint": "不但 (bùdàn) + Clause/Phrase A (expected negative) + 反而 (fǎn'ér) + Clause/Phrase B (contrary outcome)"
        },
        {
            "id": "hsk4i-budan-faner-18-ex6",
            "type": "reorder",
            "words": [
                "我不但没有瘦",
                "。",
                "反而胖了",
                "，"
            ],
            "answer": "我不但没有瘦，反而胖了。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 不但 (bùdàn) + Clause/Phrase A (expected negative) + 反而 (fǎn'ér) + Clause/Phrase B (contrary outcome)"
        },
        {
            "id": "hsk4i-budan-faner-18-ex7",
            "type": "reorder",
            "words": [
                "。",
                "反而给我添了麻烦",
                "他不但没有帮我",
                "，"
            ],
            "answer": "他不但没有帮我，反而给我添了麻烦。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 不但 (bùdàn) + Clause/Phrase A (expected negative) + 反而 (fǎn'ér) + Clause/Phrase B (contrary outcome)"
        },
        {
            "id": "hsk4i-budan-faner-18-ex8",
            "type": "reorder",
            "words": [
                "，",
                "。",
                "反而给我添了麻烦",
                "他不但没有帮我"
            ],
            "answer": "他不但没有帮我，反而给我添了麻烦。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 不但 (bùdàn) + Clause/Phrase A (expected negative) + 反而 (fǎn'ér) + Clause/Phrase B (contrary outcome)"
        },
        {
            "id": "hsk4i-budan-faner-18-ex9",
            "type": "reorder",
            "words": [
                "。",
                "我不但没有瘦",
                "反而胖了",
                "，"
            ],
            "answer": "我不但没有瘦，反而胖了。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 不但 (bùdàn) + Clause/Phrase A (expected negative) + 反而 (fǎn'ér) + Clause/Phrase B (contrary outcome)"
        },
        {
            "id": "hsk4i-budan-faner-18-ex10",
            "type": "reorder",
            "words": [
                "。",
                "，",
                "反而给我添了麻烦",
                "他不但没有帮我"
            ],
            "answer": "他不但没有帮我，反而给我添了麻烦。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 不但 (bùdàn) + Clause/Phrase A (expected negative) + 反而 (fǎn'ér) + Clause/Phrase B (contrary outcome)"
        },
        {
            "id": "hsk4i-budan-faner-18-ex11",
            "type": "translate",
            "question": "我不但没有瘦，反而胖了。",
            "answer": "Not only did I not lose weight, but on the contrary, I gained weight.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: 不但 (bùdàn) + Clause/Phrase A (expected negative) + 反而 (fǎn'ér) + Clause/Phrase B (contrary outcome)"
        },
        {
            "id": "hsk4i-budan-faner-18-ex12",
            "type": "translate",
            "question": "Not only did he not help me, but on the contrary, he caused me trouble.",
            "answer": "他不但没有帮我，反而给我添了麻烦。",
            "direction": "en-to-cn",
            "hint": "Translate to Chinese using the grammar structure: 不但 (bùdàn) + Clause/Phrase A (expected negative) + 反而 (fǎn'ér) + Clause/Phrase B (contrary outcome)"
        },
        {
            "id": "hsk4i-budan-faner-18-ex13",
            "type": "translate",
            "question": "我不但没有瘦，反而胖了。",
            "answer": "Not only did I not lose weight, but on the contrary, I gained weight.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: 不但 (bùdàn) + Clause/Phrase A (expected negative) + 反而 (fǎn'ér) + Clause/Phrase B (contrary outcome)"
        },
        {
            "id": "hsk4i-budan-faner-18-ex14",
            "type": "translate",
            "question": "Not only did I not lose weight, but on the contrary, I gained weight.",
            "answer": "我不但没有瘦，反而胖了。",
            "direction": "en-to-cn",
            "hint": "Translate to Chinese using the grammar structure: 不但 (bùdàn) + Clause/Phrase A (expected negative) + 反而 (fǎn'ér) + Clause/Phrase B (contrary outcome)"
        },
        {
            "id": "hsk4i-budan-faner-18-ex15",
            "type": "translate",
            "question": "我不但没有瘦，反而胖了。",
            "answer": "Not only did I not lose weight, but on the contrary, I gained weight.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: 不但 (bùdàn) + Clause/Phrase A (expected negative) + 反而 (fǎn'ér) + Clause/Phrase B (contrary outcome)"
        }
    ]
  },
  {
    "id": "hsk4i-hekuang-19",
    "band": "HSK4-I",
    "order": 18,
    "title": "Let alone/Moreover with 何况 (hékuàng)",
    "subtitle": "Introducing a stronger argument or an even more obvious situation, meaning 'let alone' or 'moreover'.",
    "formula": "... (situation 1), 何况 (hékuàng) + Situation 2 (stronger argument)",
    "explanation": "何况 is used to introduce a stronger argument or an even more obvious situation, often to reinforce a previous statement. It implies that if the first situation is true, then the second, more extreme or relevant situation, is even more certainly true (or untrue). It can mean 'let alone', 'much less', 'not to mention', or 'moreover'.",
    "usageRules": [
      "何况 usually follows a statement, introducing a further point that strengthens the argument.",
      "It can be used to emphasize that something is true for a more extreme case if it's true for a less extreme one.",
      "Often implies a rhetorical question or a self-evident truth.",
      "Can be used to express a negative implication as well, meaning 'much less' or 'not to mention'."
    ],
    "examples": [
      {
        "chinese": "他连简单的题都不会做，何况是难题呢？",
        "pinyin": "Tā lián jiǎndān de tí dōu bù huì zuò, hékuàng shì nántí ne?",
        "english": "He can't even do simple problems, let alone difficult ones.",
        "highlight": "何况是难题呢"
      },
      {
        "chinese": "我一个大人都觉得冷，何况是小孩子呢？",
        "pinyin": "Wǒ yī ge dàrén dōu juéde lěng, hékuàng shì xiǎoháizi ne?",
        "english": "Even I, an adult, feel cold, let alone a child.",
        "highlight": "何况是小孩子呢"
      },
      {
        "chinese": "他连自己的事情都管不好，何况是别人的事。",
        "pinyin": "Tā lián zìjǐ de shìqing dōu guǎn bù hǎo, hékuàng shì biérén de shì.",
        "english": "He can't even manage his own affairs well, let alone others'.",
        "highlight": "何况是别人的事"
      },
      {
        "chinese": "这么晚了，商店都关门了，何况是银行。",
        "pinyin": "Zhème wǎnle, shāngdiàn dōu guānménle, hékuàng shì yínháng.",
        "english": "It's so late, all the shops are closed, let alone the bank.",
        "highlight": "何况是银行"
      },
      {
        "chinese": "他身体不好，何况最近又生病了。",
        "pinyin": "Tā shēntǐ bù hǎo, hékuàng zuìjìn yòu shēngbìngle.",
        "english": "He is not in good health, moreover, he has been sick recently.",
        "highlight": "何况最近又生病了"
      },
      {
        "chinese": "我都不怕，何况是你呢？",
        "pinyin": "Wǒ dōu bù pà, hékuàng shì nǐ ne?",
        "english": "I'm not even afraid, let alone you.",
        "highlight": "何况是你呢"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 何况 without a clear preceding statement that sets up the context for the stronger argument. The strength of 何况 comes from building upon an already established point.",
      "wrongExample": "何况是难题呢？",
      "correctExample": "他连简单的题都不会做，何况是难题呢？",
      "explanation": "'何况' needs a preceding clause to establish the context. Simply saying '何况是难题呢？' out of context doesn't convey the full meaning."
    },
    "appearsInTexts": [
      "hsk4-1-19",
      "hsk4-2-19"
    ],
    "exercises":     [
        {
            "id": "hsk4i-hekuang-19-ex1",
            "type": "fill-blank",
            "question": "他连自己的事情都管不好，___是别人的事。",
            "answer": "何况",
            "hint": "... (situation 1), 何况 (hékuàng) + Situation 2 (stronger argument)"
        },
        {
            "id": "hsk4i-hekuang-19-ex2",
            "type": "fill-blank",
            "question": "我一个大人都觉得冷，___是小孩子呢？",
            "answer": "何况",
            "hint": "... (situation 1), 何况 (hékuàng) + Situation 2 (stronger argument)"
        },
        {
            "id": "hsk4i-hekuang-19-ex3",
            "type": "fill-blank",
            "question": "他连自己的事情都管不好，___是别人的事。",
            "answer": "何况",
            "hint": "... (situation 1), 何况 (hékuàng) + Situation 2 (stronger argument)"
        },
        {
            "id": "hsk4i-hekuang-19-ex4",
            "type": "fill-blank",
            "question": "他连自己的事情都管不好，___是别人的事。",
            "answer": "何况",
            "hint": "... (situation 1), 何况 (hékuàng) + Situation 2 (stronger argument)"
        },
        {
            "id": "hsk4i-hekuang-19-ex5",
            "type": "fill-blank",
            "question": "我一个大人都觉得冷，___是小孩子呢？",
            "answer": "何况",
            "hint": "... (situation 1), 何况 (hékuàng) + Situation 2 (stronger argument)"
        },
        {
            "id": "hsk4i-hekuang-19-ex6",
            "type": "reorder",
            "words": [
                "何况是别人的事",
                "。",
                "，",
                "他连自己的事情都管不好"
            ],
            "answer": "他连自己的事情都管不好，何况是别人的事。",
            "hint": "Reorder the words to form a sentence using the grammar structure: ... (situation 1), 何况 (hékuàng) + Situation 2 (stronger argument)"
        },
        {
            "id": "hsk4i-hekuang-19-ex7",
            "type": "reorder",
            "words": [
                "他连简单的题都不会做",
                "？",
                "何况是难题呢",
                "，"
            ],
            "answer": "他连简单的题都不会做，何况是难题呢？",
            "hint": "Reorder the words to form a sentence using the grammar structure: ... (situation 1), 何况 (hékuàng) + Situation 2 (stronger argument)"
        },
        {
            "id": "hsk4i-hekuang-19-ex8",
            "type": "reorder",
            "words": [
                "，",
                "？",
                "何况是小孩子呢",
                "我一个大人都觉得冷"
            ],
            "answer": "我一个大人都觉得冷，何况是小孩子呢？",
            "hint": "Reorder the words to form a sentence using the grammar structure: ... (situation 1), 何况 (hékuàng) + Situation 2 (stronger argument)"
        },
        {
            "id": "hsk4i-hekuang-19-ex9",
            "type": "reorder",
            "words": [
                "何况是小孩子呢",
                "，",
                "？",
                "我一个大人都觉得冷"
            ],
            "answer": "我一个大人都觉得冷，何况是小孩子呢？",
            "hint": "Reorder the words to form a sentence using the grammar structure: ... (situation 1), 何况 (hékuàng) + Situation 2 (stronger argument)"
        },
        {
            "id": "hsk4i-hekuang-19-ex10",
            "type": "reorder",
            "words": [
                "何况是别人的事",
                "他连自己的事情都管不好",
                "，",
                "。"
            ],
            "answer": "他连自己的事情都管不好，何况是别人的事。",
            "hint": "Reorder the words to form a sentence using the grammar structure: ... (situation 1), 何况 (hékuàng) + Situation 2 (stronger argument)"
        },
        {
            "id": "hsk4i-hekuang-19-ex11",
            "type": "translate",
            "question": "他连简单的题都不会做，何况是难题呢？",
            "answer": "He can't even do simple problems, let alone difficult ones.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: ... (situation 1), 何况 (hékuàng) + Situation 2 (stronger argument)"
        },
        {
            "id": "hsk4i-hekuang-19-ex12",
            "type": "translate",
            "question": "Even I, an adult, feel cold, let alone a child.",
            "answer": "我一个大人都觉得冷，何况是小孩子呢？",
            "direction": "en-to-cn",
            "hint": "Translate to Chinese using the grammar structure: ... (situation 1), 何况 (hékuàng) + Situation 2 (stronger argument)"
        },
        {
            "id": "hsk4i-hekuang-19-ex13",
            "type": "translate",
            "question": "他连自己的事情都管不好，何况是别人的事。",
            "answer": "He can't even manage his own affairs well, let alone others'.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: ... (situation 1), 何况 (hékuàng) + Situation 2 (stronger argument)"
        },
        {
            "id": "hsk4i-hekuang-19-ex14",
            "type": "translate",
            "question": "Even I, an adult, feel cold, let alone a child.",
            "answer": "我一个大人都觉得冷，何况是小孩子呢？",
            "direction": "en-to-cn",
            "hint": "Translate to Chinese using the grammar structure: ... (situation 1), 何况 (hékuàng) + Situation 2 (stronger argument)"
        },
        {
            "id": "hsk4i-hekuang-19-ex15",
            "type": "translate",
            "question": "他连简单的题都不会做，何况是难题呢？",
            "answer": "He can't even do simple problems, let alone difficult ones.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: ... (situation 1), 何况 (hékuàng) + Situation 2 (stronger argument)"
        }
    ]
  },
  {
    "id": "hsk4i-kuangqie-20",
    "band": "HSK4-I",
    "order": 19,
    "title": "Moreover/Furthermore with 况且 (kuàngqiě)",
    "subtitle": "Adding a further reason or argument to support a previous statement, meaning 'moreover' or 'furthermore'.",
    "formula": "... (statement/reason 1), 况且 (kuàngqiě) + Reason 2 (additional support)",
    "explanation": "况且 is used to introduce an additional reason or argument that further supports or strengthens a previous statement or decision. It functions similarly to 'moreover' or 'furthermore' in English, adding weight to the preceding point.",
    "usageRules": [
      "况且 usually follows a statement, introducing a supplementary reason or argument.",
      "It connects two clauses, where the second clause provides additional justification or explanation for the first.",
      "The reasons presented by 况且 often build upon each other to form a stronger overall argument.",
      "It is commonly used in persuasive writing or speech."
    ],
    "examples": [
      {
        "chinese": "我不想去，况且外面还在下雨。",
        "pinyin": "Wǒ bù xiǎng qù, kuàngqiě wàimiàn hái zài xiàyǔ.",
        "english": "I don't want to go, moreover, it's still raining outside.",
        "highlight": "况且外面还在下雨"
      },
      {
        "chinese": "这件衣服太贵了，况且我也不喜欢它的颜色。",
        "pinyin": "Zhè jiàn yīfu tài guìle, kuàngqiě wǒ yě bù xǐhuan tā de yánsè.",
        "english": "This dress is too expensive, furthermore, I don't like its color.",
        "highlight": "况且我也不喜欢它的颜色"
      },
      {
        "chinese": "他已经很累了，况且明天还要早起。",
        "pinyin": "Tā yǐjīng hěn lèile, kuàngqiě míngtiān hái yào zǎoqǐ.",
        "english": "He is already very tired, moreover, he has to get up early tomorrow.",
        "highlight": "况且明天还要早起"
      },
      {
        "chinese": "我们应该节约用水，况且水资源也很宝贵。",
        "pinyin": "Wǒmen yīnggāi jiéyuē yòngshuǐ, kuàngqiě shuǐ zīyuán yě hěn bǎoguì.",
        "english": "We should conserve water, furthermore, water resources are also very precious.",
        "highlight": "况且水资源也很宝贵"
      },
      {
        "chinese": "这个计划不可行，况且我们也没有足够的人手。",
        "pinyin": "Zhège jìhuà bù kěxíng, kuàngqiě wǒmen yě méiyǒu zúgòu de rénshǒu.",
        "english": "This plan is not feasible, moreover, we don't have enough manpower.",
        "highlight": "况且我们也没有足够的人手"
      },
      {
        "chinese": "我不能帮你，况且我自己的事情还没做完。",
        "pinyin": "Wǒ bù néng bāng nǐ, kuàngqiě wǒ zìjǐ de shìqing hái méi zuò wán.",
        "english": "I can't help you, moreover, I haven't finished my own work.",
        "highlight": "况且我自己的事情还没做完"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 况且 when the second clause is not an additional reason or argument, but rather a consequence or a contrasting idea. 况且 specifically adds supporting information.",
      "wrongExample": "我不想去，所以外面还在下雨。",
      "correctExample": "我不想去，况且外面还在下雨。",
      "explanation": "'所以' (therefore) indicates a consequence, not an additional reason. '况且' correctly introduces the additional reason for not wanting to go."
    },
    "comparison": {
      "structure": "况且 vs. 何况",
      "difference": "Both '况且' and '何况' can mean 'moreover' or 'furthermore'. However, '何况' often introduces a stronger, more extreme, or rhetorical argument (let alone), while '况且' typically adds a supplementary reason or justification to an existing statement."
    },
    "appearsInTexts": [
      "hsk4-1-20",
      "hsk4-2-20"
    ],
    "exercises":     [
        {
            "id": "hsk4i-kuangqie-20-ex1",
            "type": "fill-blank",
            "question": "我不想去，___外面还在下雨。",
            "answer": "况且",
            "hint": "... (statement/reason 1), 况且 (kuàngqiě) + Reason 2 (additional support)"
        },
        {
            "id": "hsk4i-kuangqie-20-ex2",
            "type": "fill-blank",
            "question": "这件衣服太贵了，___我也不喜欢它的颜色。",
            "answer": "况且",
            "hint": "... (statement/reason 1), 况且 (kuàngqiě) + Reason 2 (additional support)"
        },
        {
            "id": "hsk4i-kuangqie-20-ex3",
            "type": "fill-blank",
            "question": "这件衣服太贵了，___我也不喜欢它的颜色。",
            "answer": "况且",
            "hint": "... (statement/reason 1), 况且 (kuàngqiě) + Reason 2 (additional support)"
        },
        {
            "id": "hsk4i-kuangqie-20-ex4",
            "type": "fill-blank",
            "question": "他已经很累了，___明天还要早起。",
            "answer": "况且",
            "hint": "... (statement/reason 1), 况且 (kuàngqiě) + Reason 2 (additional support)"
        },
        {
            "id": "hsk4i-kuangqie-20-ex5",
            "type": "fill-blank",
            "question": "我不想去，___外面还在下雨。",
            "answer": "况且",
            "hint": "... (statement/reason 1), 况且 (kuàngqiě) + Reason 2 (additional support)"
        },
        {
            "id": "hsk4i-kuangqie-20-ex6",
            "type": "reorder",
            "words": [
                "他已经很累了",
                "况且明天还要早起",
                "，",
                "。"
            ],
            "answer": "他已经很累了，况且明天还要早起。",
            "hint": "Reorder the words to form a sentence using the grammar structure: ... (statement/reason 1), 况且 (kuàngqiě) + Reason 2 (additional support)"
        },
        {
            "id": "hsk4i-kuangqie-20-ex7",
            "type": "reorder",
            "words": [
                "，",
                "况且外面还在下雨",
                "。",
                "我不想去"
            ],
            "answer": "我不想去，况且外面还在下雨。",
            "hint": "Reorder the words to form a sentence using the grammar structure: ... (statement/reason 1), 况且 (kuàngqiě) + Reason 2 (additional support)"
        },
        {
            "id": "hsk4i-kuangqie-20-ex8",
            "type": "reorder",
            "words": [
                "，",
                "这件衣服太贵了",
                "。",
                "况且我也不喜欢它的颜色"
            ],
            "answer": "这件衣服太贵了，况且我也不喜欢它的颜色。",
            "hint": "Reorder the words to form a sentence using the grammar structure: ... (statement/reason 1), 况且 (kuàngqiě) + Reason 2 (additional support)"
        },
        {
            "id": "hsk4i-kuangqie-20-ex9",
            "type": "reorder",
            "words": [
                "况且外面还在下雨",
                "。",
                "，",
                "我不想去"
            ],
            "answer": "我不想去，况且外面还在下雨。",
            "hint": "Reorder the words to form a sentence using the grammar structure: ... (statement/reason 1), 况且 (kuàngqiě) + Reason 2 (additional support)"
        },
        {
            "id": "hsk4i-kuangqie-20-ex10",
            "type": "reorder",
            "words": [
                "我不想去",
                "。",
                "，",
                "况且外面还在下雨"
            ],
            "answer": "我不想去，况且外面还在下雨。",
            "hint": "Reorder the words to form a sentence using the grammar structure: ... (statement/reason 1), 况且 (kuàngqiě) + Reason 2 (additional support)"
        },
        {
            "id": "hsk4i-kuangqie-20-ex11",
            "type": "translate",
            "question": "他已经很累了，况且明天还要早起。",
            "answer": "He is already very tired, moreover, he has to get up early tomorrow.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: ... (statement/reason 1), 况且 (kuàngqiě) + Reason 2 (additional support)"
        },
        {
            "id": "hsk4i-kuangqie-20-ex12",
            "type": "translate",
            "question": "This dress is too expensive, furthermore, I don't like its color.",
            "answer": "这件衣服太贵了，况且我也不喜欢它的颜色。",
            "direction": "en-to-cn",
            "hint": "Translate to Chinese using the grammar structure: ... (statement/reason 1), 况且 (kuàngqiě) + Reason 2 (additional support)"
        },
        {
            "id": "hsk4i-kuangqie-20-ex13",
            "type": "translate",
            "question": "这件衣服太贵了，况且我也不喜欢它的颜色。",
            "answer": "This dress is too expensive, furthermore, I don't like its color.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: ... (statement/reason 1), 况且 (kuàngqiě) + Reason 2 (additional support)"
        },
        {
            "id": "hsk4i-kuangqie-20-ex14",
            "type": "translate",
            "question": "He is already very tired, moreover, he has to get up early tomorrow.",
            "answer": "他已经很累了，况且明天还要早起。",
            "direction": "en-to-cn",
            "hint": "Translate to Chinese using the grammar structure: ... (statement/reason 1), 况且 (kuàngqiě) + Reason 2 (additional support)"
        },
        {
            "id": "hsk4i-kuangqie-20-ex15",
            "type": "translate",
            "question": "我不想去，况且外面还在下雨。",
            "answer": "I don't want to go, moreover, it's still raining outside.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: ... (statement/reason 1), 况且 (kuàngqiě) + Reason 2 (additional support)"
        }
    ]
  },
  {
    "id": "hsk4ii-nandao-01",
    "band": "HSK4-II",
    "order": 1,
    "title": "Rhetorical Questions with 难道 (nándào)",
    "subtitle": "Expressing surprise, doubt, or challenging an assumption",
    "formula": "难道 + Subject + Verb/Adjective + ?",
    "explanation": "难道 is used to form rhetorical questions, often to express surprise, doubt, or to challenge an assumption. The speaker usually expects a negative answer or wants to emphasize a point. It makes the question more forceful than a simple interrogative sentence.",
    "usageRules": [
      "Placed at the beginning of a sentence or after the subject.",
      "Often implies the speaker believes the opposite of what the question literally asks.",
      "Can be used to express dissatisfaction or to urge someone to realize something.",
      "The tone is usually one of disbelief or strong emphasis.",
      "Cannot be used with other question words like 谁, 什么, 哪儿, etc., in the same clause.",
      "Often followed by 吗 or 呢, but can also stand alone."
    ],
    "examples": [
      {
        "chinese": "你难道不知道吗？",
        "pinyin": "Nǐ nándào bù zhīdao ma?",
        "english": "Don't you know?",
        "highlight": "难道"
      },
      {
        "chinese": "难道你不想去吗？",
        "pinyin": "Nándào nǐ bù xiǎng qù ma?",
        "english": "Could it be that you don't want to go?",
        "highlight": "难道"
      },
      {
        "chinese": "这么简单的问题，难道你都不会？",
        "pinyin": "Zhème jiǎndān de wèntí, nándào nǐ dōu bù huì?",
        "english": "Such a simple question, don't tell me you can't even do it?",
        "highlight": "难道"
      },
      {
        "chinese": "他都道歉了，难道你还不原谅他吗？",
        "pinyin": "Tā dōu dàoqiàn le, nándào nǐ hái bù yuánliàng tā ma?",
        "english": "He has already apologized, are you still not going to forgive him?",
        "highlight": "难道"
      },
      {
        "chinese": "难道你认为这是对的吗？",
        "pinyin": "Nándào nǐ rènwéi zhè shì duì de ma?",
        "english": "Do you really think this is right?",
        "highlight": "难道"
      },
      {
        "chinese": "外面下雨了，难道你还要出去吗？",
        "pinyin": "Wàimiàn xià yǔ le, nándào nǐ hái yào chūqù ma?",
        "english": "It's raining outside, are you still going out?",
        "highlight": "难道"
      },
      {
        "chinese": "难道我们不应该保护环境吗？",
        "pinyin": "Nándào wǒmen bù yìnggāi bǎohù huánjìng ma?",
        "english": "Shouldn't we protect the environment?",
        "highlight": "难道"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 难道 in a direct question where no rhetorical effect is intended. 难道 adds a strong rhetorical tone, implying surprise or disbelief. For simple questions, use 吗 or other interrogative particles.",
      "wrongExample": "你难道去图书馆吗？ (Incorrect, implies disbelief about going to the library)",
      "correctExample": "你去图书馆吗？ (Correct, a simple question)",
      "explanation": "Use 难道 only when you want to express surprise, doubt, or challenge an assumption, not for neutral information-seeking questions."
    },
    "exercises":     [
        {
            "id": "hsk4ii-nandao-01-ex1",
            "type": "fill-blank",
            "question": "这么简单的问题，___你都不会？",
            "answer": "难道",
            "hint": "难道 + Subject + Verb/Adjective + ?"
        },
        {
            "id": "hsk4ii-nandao-01-ex2",
            "type": "fill-blank",
            "question": "___你不想去吗？",
            "answer": "难道",
            "hint": "难道 + Subject + Verb/Adjective + ?"
        },
        {
            "id": "hsk4ii-nandao-01-ex3",
            "type": "fill-blank",
            "question": "这么简单的问题，___你都不会？",
            "answer": "难道",
            "hint": "难道 + Subject + Verb/Adjective + ?"
        },
        {
            "id": "hsk4ii-nandao-01-ex4",
            "type": "fill-blank",
            "question": "___你不想去吗？",
            "answer": "难道",
            "hint": "难道 + Subject + Verb/Adjective + ?"
        },
        {
            "id": "hsk4ii-nandao-01-ex5",
            "type": "fill-blank",
            "question": "这么简单的问题，___你都不会？",
            "answer": "难道",
            "hint": "难道 + Subject + Verb/Adjective + ?"
        },
        {
            "id": "hsk4ii-nandao-01-ex6",
            "type": "reorder",
            "words": [
                "？",
                "难道你不想去吗"
            ],
            "answer": "难道你不想去吗？",
            "hint": "Reorder the words to form a sentence using the grammar structure: 难道 + Subject + Verb/Adjective + ?"
        },
        {
            "id": "hsk4ii-nandao-01-ex7",
            "type": "reorder",
            "words": [
                "？",
                "你难道不知道吗"
            ],
            "answer": "你难道不知道吗？",
            "hint": "Reorder the words to form a sentence using the grammar structure: 难道 + Subject + Verb/Adjective + ?"
        },
        {
            "id": "hsk4ii-nandao-01-ex8",
            "type": "reorder",
            "words": [
                "？",
                "，",
                "这么简单的问题",
                "难道你都不会"
            ],
            "answer": "这么简单的问题，难道你都不会？",
            "hint": "Reorder the words to form a sentence using the grammar structure: 难道 + Subject + Verb/Adjective + ?"
        },
        {
            "id": "hsk4ii-nandao-01-ex9",
            "type": "reorder",
            "words": [
                "难道你都不会",
                "这么简单的问题",
                "？",
                "，"
            ],
            "answer": "这么简单的问题，难道你都不会？",
            "hint": "Reorder the words to form a sentence using the grammar structure: 难道 + Subject + Verb/Adjective + ?"
        },
        {
            "id": "hsk4ii-nandao-01-ex10",
            "type": "reorder",
            "words": [
                "？",
                "你难道不知道吗"
            ],
            "answer": "你难道不知道吗？",
            "hint": "Reorder the words to form a sentence using the grammar structure: 难道 + Subject + Verb/Adjective + ?"
        },
        {
            "id": "hsk4ii-nandao-01-ex11",
            "type": "translate",
            "question": "难道你不想去吗？",
            "answer": "Could it be that you don't want to go?",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: 难道 + Subject + Verb/Adjective + ?"
        },
        {
            "id": "hsk4ii-nandao-01-ex12",
            "type": "translate",
            "question": "Don't you know?",
            "answer": "你难道不知道吗？",
            "direction": "en-to-cn",
            "hint": "Translate to Chinese using the grammar structure: 难道 + Subject + Verb/Adjective + ?"
        },
        {
            "id": "hsk4ii-nandao-01-ex13",
            "type": "translate",
            "question": "你难道不知道吗？",
            "answer": "Don't you know?",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: 难道 + Subject + Verb/Adjective + ?"
        },
        {
            "id": "hsk4ii-nandao-01-ex14",
            "type": "translate",
            "question": "Such a simple question, don't tell me you can't even do it?",
            "answer": "这么简单的问题，难道你都不会？",
            "direction": "en-to-cn",
            "hint": "Translate to Chinese using the grammar structure: 难道 + Subject + Verb/Adjective + ?"
        },
        {
            "id": "hsk4ii-nandao-01-ex15",
            "type": "translate",
            "question": "难道你不想去吗？",
            "answer": "Could it be that you don't want to go?",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: 难道 + Subject + Verb/Adjective + ?"
        }
    ]
  },
  {
    "id": "hsk4ii-nanmian-02",
    "band": "HSK4-II",
    "order": 2,
    "title": "Expressing Inevitability with 难免 (nánmiǎn)",
    "subtitle": "Indicating that something is difficult to avoid",
    "formula": "Subject + 难免 + Verb/Adjective",
    "explanation": "难免 is an adverb that means 'hard to avoid' or 'inevitable'. It is used to indicate that a certain outcome, often an undesirable one, is unavoidable in a particular situation.",
    "usageRules": [
      "Usually placed before a verb or adjective.",
      "Often used to talk about negative but expected outcomes.",
      "Can be followed by 会 (huì) or 要 (yào) to emphasize the future inevitability.",
      "The subject can be a person, an event, or a situation."
    ],
    "examples": [
      {
        "chinese": "刚开始学习，难免会犯错。",
        "pinyin": "Gāng kāishǐ xuéxí, nánmiǎn huì fàn cuò.",
        "english": "When you first start learning, it's inevitable that you'll make mistakes.",
        "highlight": "难免"
      },
      {
        "chinese": "年轻人经验少，难免有些想法太天真。",
        "pinyin": "Niánqīng rén jīngyàn shǎo, nánmiǎn yǒuxiē xiǎngfǎ tài tiānzhēn.",
        "english": "Young people lack experience, so it's hard to avoid having some naive ideas.",
        "highlight": "难免"
      },
      {
        "chinese": "两个人在一起，难免会发生矛盾。",
        "pinyin": "Liǎng gè rén zài yīqǐ, nánmiǎn huì fāshēng máodùn.",
        "english": "When two people are together, conflicts are bound to happen.",
        "highlight": "难免"
      },
      {
        "chinese": "第一次做饭，难免会手忙脚乱。",
        "pinyin": "Dì yī cì zuò fàn, nánmiǎn huì shǒu máng jiǎo luàn.",
        "english": "It's inevitable to be flustered the first time cooking.",
        "highlight": "难免"
      },
      {
        "chinese": "工作压力大，难免会感到疲惫。",
        "pinyin": "Gōngzuò yālì dà, nánmiǎn huì gǎndào píbeì.",
        "english": "With high work pressure, it's inevitable to feel tired.",
        "highlight": "难免"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 难免 for situations that are not inevitable or are easily avoidable. 难免 implies a high degree of certainty that something will happen due to the circumstances.",
      "wrongExample": "今天天气很好，难免会下雨。 (Incorrect, good weather doesn't make rain inevitable)",
      "correctExample": "天气预报说今天有雨，出门最好带伞。 (Correct, expresses a possibility, not inevitability)",
      "explanation": "Use 难免 only for outcomes that are a natural and unavoidable consequence of the situation described."
    },
    "exercises":     [
        {
            "id": "hsk4ii-nanmian-02-ex1",
            "type": "fill-blank",
            "question": "年轻人经验少，___有些想法太天真。",
            "answer": "难免",
            "hint": "Fill in the blank with '难免'"
        },
        {
            "id": "hsk4ii-nanmian-02-ex2",
            "type": "fill-blank",
            "question": "刚开始学习，___会犯错。",
            "answer": "难免",
            "hint": "Fill in the blank with '难免'"
        },
        {
            "id": "hsk4ii-nanmian-02-ex3",
            "type": "fill-blank",
            "question": "年轻人经验少，___有些想法太天真。",
            "answer": "难免",
            "hint": "Fill in the blank with '难免'"
        },
        {
            "id": "hsk4ii-nanmian-02-ex4",
            "type": "fill-blank",
            "question": "刚开始学习，___会犯错。",
            "answer": "难免",
            "hint": "Fill in the blank with '难免'"
        },
        {
            "id": "hsk4ii-nanmian-02-ex5",
            "type": "fill-blank",
            "question": "刚开始学习，___会犯错。",
            "answer": "难免",
            "hint": "Fill in the blank with '难免'"
        },
        {
            "id": "hsk4ii-nanmian-02-ex1",
            "type": "fill-blank",
            "question": "年轻人经验少，___有些想法太天真。",
            "answer": "难免",
            "hint": "Fill in the blank with '难免'"
        },
        {
            "id": "hsk4ii-nanmian-02-ex2",
            "type": "fill-blank",
            "question": "刚开始学习，___会犯错。",
            "answer": "难免",
            "hint": "Fill in the blank with '难免'"
        },
        {
            "id": "hsk4ii-nanmian-02-ex3",
            "type": "fill-blank",
            "question": "年轻人经验少，___有些想法太天真。",
            "answer": "难免",
            "hint": "Fill in the blank with '难免'"
        },
        {
            "id": "hsk4ii-nanmian-02-ex4",
            "type": "fill-blank",
            "question": "刚开始学习，___会犯错。",
            "answer": "难免",
            "hint": "Fill in the blank with '难免'"
        },
        {
            "id": "hsk4ii-nanmian-02-ex5",
            "type": "fill-blank",
            "question": "刚开始学习，___会犯错。",
            "answer": "难免",
            "hint": "Fill in the blank with '难免'"
        },
        {
            "id": "hsk4ii-nanmian-02-ex6",
            "type": "reorder",
            "words": [
                ".",
                "两个人在一起",
                ",",
                "难免会发生矛盾"
            ],
            "answer": "两个人在一起，难免会发生矛盾。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Expressing Inevitability with 难免 (nánmiǎn)'"
        },
        {
            "id": "hsk4ii-nanmian-02-ex7",
            "type": "reorder",
            "words": [
                "难免会发生矛盾",
                ",",
                "两个人在一起",
                "."
            ],
            "answer": "两个人在一起，难免会发生矛盾。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Expressing Inevitability with 难免 (nánmiǎn)'"
        },
        {
            "id": "hsk4ii-nanmian-02-ex8",
            "type": "reorder",
            "words": [
                ".",
                "难免会发生矛盾",
                ",",
                "两个人在一起"
            ],
            "answer": "两个人在一起，难免会发生矛盾。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Expressing Inevitability with 难免 (nánmiǎn)'"
        },
        {
            "id": "hsk4ii-nanmian-02-ex9",
            "type": "reorder",
            "words": [
                "年轻人经验少",
                ",",
                ".",
                "难免有些想法太天真"
            ],
            "answer": "年轻人经验少，难免有些想法太天真。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Expressing Inevitability with 难免 (nánmiǎn)'"
        },
        {
            "id": "hsk4ii-nanmian-02-ex10",
            "type": "reorder",
            "words": [
                "年轻人经验少",
                ",",
                ".",
                "难免有些想法太天真"
            ],
            "answer": "年轻人经验少，难免有些想法太天真。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Expressing Inevitability with 难免 (nánmiǎn)'"
        },
        {
            "id": "hsk4ii-nanmian-02-ex1",
            "type": "fill-blank",
            "question": "年轻人经验少，___有些想法太天真。",
            "answer": "难免",
            "hint": "Fill in the blank with '难免'"
        },
        {
            "id": "hsk4ii-nanmian-02-ex2",
            "type": "fill-blank",
            "question": "刚开始学习，___会犯错。",
            "answer": "难免",
            "hint": "Fill in the blank with '难免'"
        },
        {
            "id": "hsk4ii-nanmian-02-ex3",
            "type": "fill-blank",
            "question": "年轻人经验少，___有些想法太天真。",
            "answer": "难免",
            "hint": "Fill in the blank with '难免'"
        },
        {
            "id": "hsk4ii-nanmian-02-ex4",
            "type": "fill-blank",
            "question": "刚开始学习，___会犯错。",
            "answer": "难免",
            "hint": "Fill in the blank with '难免'"
        },
        {
            "id": "hsk4ii-nanmian-02-ex5",
            "type": "fill-blank",
            "question": "刚开始学习，___会犯错。",
            "answer": "难免",
            "hint": "Fill in the blank with '难免'"
        },
        {
            "id": "hsk4ii-nanmian-02-ex6",
            "type": "reorder",
            "words": [
                ".",
                "两个人在一起",
                ",",
                "难免会发生矛盾"
            ],
            "answer": "两个人在一起，难免会发生矛盾。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Expressing Inevitability with 难免 (nánmiǎn)'"
        },
        {
            "id": "hsk4ii-nanmian-02-ex7",
            "type": "reorder",
            "words": [
                "难免会发生矛盾",
                ",",
                "两个人在一起",
                "."
            ],
            "answer": "两个人在一起，难免会发生矛盾。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Expressing Inevitability with 难免 (nánmiǎn)'"
        },
        {
            "id": "hsk4ii-nanmian-02-ex8",
            "type": "reorder",
            "words": [
                ".",
                "难免会发生矛盾",
                ",",
                "两个人在一起"
            ],
            "answer": "两个人在一起，难免会发生矛盾。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Expressing Inevitability with 难免 (nánmiǎn)'"
        },
        {
            "id": "hsk4ii-nanmian-02-ex9",
            "type": "reorder",
            "words": [
                "年轻人经验少",
                ",",
                ".",
                "难免有些想法太天真"
            ],
            "answer": "年轻人经验少，难免有些想法太天真。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Expressing Inevitability with 难免 (nánmiǎn)'"
        },
        {
            "id": "hsk4ii-nanmian-02-ex10",
            "type": "reorder",
            "words": [
                "年轻人经验少",
                ",",
                ".",
                "难免有些想法太天真"
            ],
            "answer": "年轻人经验少，难免有些想法太天真。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Expressing Inevitability with 难免 (nánmiǎn)'"
        },
        {
            "id": "hsk4ii-nanmian-02-ex11",
            "type": "translate",
            "question": "两个人在一起，难免会发生矛盾。",
            "answer": "When two people are together, conflicts are bound to happen.",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of 'Expressing Inevitability with 难免 (nánmiǎn)'"
        },
        {
            "id": "hsk4ii-nanmian-02-ex12",
            "type": "translate",
            "question": "When two people are together, conflicts are bound to happen.",
            "answer": "两个人在一起，难免会发生矛盾。",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of 'Expressing Inevitability with 难免 (nánmiǎn)'"
        },
        {
            "id": "hsk4ii-nanmian-02-ex13",
            "type": "translate",
            "question": "两个人在一起，难免会发生矛盾。",
            "answer": "When two people are together, conflicts are bound to happen.",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of 'Expressing Inevitability with 难免 (nánmiǎn)'"
        },
        {
            "id": "hsk4ii-nanmian-02-ex14",
            "type": "translate",
            "question": "When you first start learning, it's inevitable that you'll make mistakes.",
            "answer": "刚开始学习，难免会犯错。",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of 'Expressing Inevitability with 难免 (nánmiǎn)'"
        },
        {
            "id": "hsk4ii-nanmian-02-ex15",
            "type": "translate",
            "question": "When two people are together, conflicts are bound to happen.",
            "answer": "两个人在一起，难免会发生矛盾。",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of 'Expressing Inevitability with 难免 (nánmiǎn)'"
        }
    ]
  },
  {
    "id": "hsk4ii-bingfei-03",
    "band": "HSK4-II",
    "order": 3,
    "title": "Emphatic Negation with 并非/并不 (bìngfēi/bìngbù)",
    "subtitle": "Strongly refuting a common belief or assumption",
    "formula": "并非/并不 + Verb/Adjective/Noun Phrase",
    "explanation": "并非 and 并不 are used for emphatic negation, often to correct a misunderstanding or to refute a common belief. 并非 is more formal and stronger than 并不. They both mean 'it's not that...' or 'it's not true that...'.",
    "usageRules": [
      "Placed before the verb, adjective, or noun phrase being negated.",
      "Used to clarify a situation or correct a misconception.",
      "并非 is generally used in more formal contexts.",
      "并不 can be used in both formal and informal contexts.",
      "Often followed by 而是 (érshì) 'but rather' to introduce the correct situation."
    ],
    "examples": [
      {
        "chinese": "他并非不喜欢你，只是不善于表达。",
        "pinyin": "Tā bìngfēi bù xǐhuān nǐ, zhǐshì bù shànyú biǎodá.",
        "english": "It's not that he doesn't like you, he's just not good at expressing himself.",
        "highlight": "并非"
      },
      {
        "chinese": "成功并非偶然，而是努力的结果。",
        "pinyin": "Chénggōng bìngfēi ǒurán, érshì nǔlì de jiéguǒ.",
        "english": "Success is not accidental, but the result of hard work.",
        "highlight": "并非"
      },
      {
        "chinese": "我并不反对你的意见，只是觉得需要再考虑。",
        "pinyin": "Wǒ bìngbù fǎnduì nǐ de yìjiàn, zhǐshì juéde xūyào zài kǎolǜ.",
        "english": "I don't oppose your opinion, I just think it needs further consideration.",
        "highlight": "并不"
      },
      {
        "chinese": "幸福并非拥有得多，而是计较得少。",
        "pinyin": "Xìngfú bìngfēi yǒngyǒu de duō, érshì jìjiào de shǎo.",
        "english": "Happiness is not about having a lot, but about caring less.",
        "highlight": "并非"
      },
      {
        "chinese": "他看起来很开心，但内心却并不快乐。",
        "pinyin": "Tā kàn qǐlái hěn kāixīn, dàn nèixīn què bìngbù kuàilè.",
        "english": "He looks happy, but he's not happy inside.",
        "highlight": "并不"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 并非/并不 for simple negation where there is no underlying assumption to refute. These terms carry a strong tone of correction or clarification.",
      "wrongExample": "我并非去商店。 (Incorrect, unless someone assumed you were going somewhere else)",
      "correctExample": "我没去商店。 (Correct, simple negation)",
      "explanation": "Reserve 并非/并不 for situations where you need to emphatically deny or correct a perceived notion."
    },
    "exercises":     [
        {
            "id": "hsk4ii-nanmian-ex1-ex1",
            "type": "fill-blank",
            "question": "他___不喜欢你，只是不善于表达。",
            "answer": "并非",
            "hint": "并非/并不 + Verb/Adjective/Noun Phrase"
        },
        {
            "id": "hsk4ii-nanmian-ex1-ex2",
            "type": "fill-blank",
            "question": "他___不喜欢你，只是不善于表达。",
            "answer": "并非",
            "hint": "并非/并不 + Verb/Adjective/Noun Phrase"
        },
        {
            "id": "hsk4ii-nanmian-ex1-ex3",
            "type": "fill-blank",
            "question": "成功___偶然，而是努力的结果。",
            "answer": "并非",
            "hint": "并非/并不 + Verb/Adjective/Noun Phrase"
        },
        {
            "id": "hsk4ii-nanmian-ex1-ex4",
            "type": "fill-blank",
            "question": "我___反对你的意见，只是觉得需要再考虑。",
            "answer": "并不",
            "hint": "并非/并不 + Verb/Adjective/Noun Phrase"
        },
        {
            "id": "hsk4ii-nanmian-ex1-ex5",
            "type": "fill-blank",
            "question": "他___不喜欢你，只是不善于表达。",
            "answer": "并非",
            "hint": "并非/并不 + Verb/Adjective/Noun Phrase"
        },
        {
            "id": "hsk4ii-nanmian-ex1-ex6",
            "type": "reorder",
            "words": [
                "只是不善于表达",
                "。",
                "，",
                "他并非不喜欢你"
            ],
            "answer": "他并非不喜欢你，只是不善于表达。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 并非/并不 + Verb/Adjective/Noun Phrase"
        },
        {
            "id": "hsk4ii-nanmian-ex1-ex7",
            "type": "reorder",
            "words": [
                "。",
                "而是努力的结果",
                "，",
                "成功并非偶然"
            ],
            "answer": "成功并非偶然，而是努力的结果。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 并非/并不 + Verb/Adjective/Noun Phrase"
        },
        {
            "id": "hsk4ii-nanmian-ex1-ex8",
            "type": "reorder",
            "words": [
                "成功并非偶然",
                "而是努力的结果",
                "。",
                "，"
            ],
            "answer": "成功并非偶然，而是努力的结果。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 并非/并不 + Verb/Adjective/Noun Phrase"
        },
        {
            "id": "hsk4ii-nanmian-ex1-ex9",
            "type": "reorder",
            "words": [
                "，",
                "。",
                "他并非不喜欢你",
                "只是不善于表达"
            ],
            "answer": "他并非不喜欢你，只是不善于表达。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 并非/并不 + Verb/Adjective/Noun Phrase"
        },
        {
            "id": "hsk4ii-nanmian-ex1-ex10",
            "type": "reorder",
            "words": [
                "而是努力的结果",
                "。",
                "成功并非偶然",
                "，"
            ],
            "answer": "成功并非偶然，而是努力的结果。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 并非/并不 + Verb/Adjective/Noun Phrase"
        },
        {
            "id": "hsk4ii-nanmian-ex1-ex11",
            "type": "translate",
            "question": "他并非不喜欢你，只是不善于表达。",
            "answer": "It's not that he doesn't like you, he's just not good at expressing himself.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: 并非/并不 + Verb/Adjective/Noun Phrase"
        },
        {
            "id": "hsk4ii-nanmian-ex1-ex12",
            "type": "translate",
            "question": "It's not that he doesn't like you, he's just not good at expressing himself.",
            "answer": "他并非不喜欢你，只是不善于表达。",
            "direction": "en-to-cn",
            "hint": "Translate to Chinese using the grammar structure: 并非/并不 + Verb/Adjective/Noun Phrase"
        },
        {
            "id": "hsk4ii-nanmian-ex1-ex13",
            "type": "translate",
            "question": "成功并非偶然，而是努力的结果。",
            "answer": "Success is not accidental, but the result of hard work.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: 并非/并不 + Verb/Adjective/Noun Phrase"
        },
        {
            "id": "hsk4ii-nanmian-ex1-ex14",
            "type": "translate",
            "question": "I don't oppose your opinion, I just think it needs further consideration.",
            "answer": "我并不反对你的意见，只是觉得需要再考虑。",
            "direction": "en-to-cn",
            "hint": "Translate to Chinese using the grammar structure: 并非/并不 + Verb/Adjective/Noun Phrase"
        },
        {
            "id": "hsk4ii-nanmian-ex1-ex15",
            "type": "translate",
            "question": "成功并非偶然，而是努力的结果。",
            "answer": "Success is not accidental, but the result of hard work.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: 并非/并不 + Verb/Adjective/Noun Phrase"
        }
    ]
  },
  {
    "id": "hsk4ii-daoshi-04",
    "band": "HSK4-II",
    "order": 4,
    "title": "Expressing Contrast or Concession with 倒是/倒 (dàoshì/dào)",
    "subtitle": "Indicating a turn, contrast, or unexpected situation",
    "formula": "...，倒是/倒 + Clause",
    "explanation": "倒是 and 倒 are adverbs used to indicate a contrast, concession, or an unexpected turn of events. They often imply 'on the contrary,' 'however,' or 'surprisingly.' 倒是 is slightly more emphatic than 倒.",
    "usageRules": [
      "Placed before the verb or adjective in the second clause.",
      "Used to introduce a situation that is different from what might be expected.",
      "Can express a slight complaint or dissatisfaction.",
      "Can also be used to make a concession, meaning 'it's true that... but...'."
    ],
    "examples": [
      {
        "chinese": "他嘴上说不帮忙，倒也帮了不少忙。",
        "pinyin": "Tā zuǐ shàng shuō bù bāngmáng, dào yě bāngle bù shǎo máng.",
        "english": "He said he wouldn't help, but he actually helped a lot.",
        "highlight": "倒"
      },
      {
        "chinese": "你倒是说说看，这事该怎么办？",
        "pinyin": "Nǐ dàoshì shuōshuō kàn, zhè shì gāi zěnme bàn?",
        "english": "Why don't you tell me, what should be done about this?",
        "highlight": "倒是"
      },
      {
        "chinese": "这件衣服虽然旧了点，倒是很舒服。",
        "pinyin": "Zhè jiàn yīfu suīrán jiùle diǎn, dàoshì hěn shūfu.",
        "english": "Although this dress is a bit old, it's quite comfortable.",
        "highlight": "倒是"
      },
      {
        "chinese": "别人都说他不好，我倒觉得他挺善良的。",
        "pinyin": "Biérén dōu shuō tā bù hǎo, wǒ dào juéde tā tǐng shànliáng de.",
        "english": "Everyone says he's not good, but I actually think he's quite kind.",
        "highlight": "倒"
      },
      {
        "chinese": "你倒是快点啊，我们都要迟到了！",
        "pinyin": "Nǐ dàoshì kuài diǎn a, wǒmen dōu yào chídào le!",
        "english": "You'd better hurry up, we're all going to be late!",
        "highlight": "倒是"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 倒是/倒 as a simple 'but' or 'however' without the nuance of contrast, concession, or unexpectedness. It's not a direct substitute for 但是 or 不过.",
      "wrongExample": "我喜欢苹果，倒不喜欢香蕉。 (Incorrect, simple contrast)",
      "correctExample": "我喜欢苹果，但是不喜欢香蕉。 (Correct, simple contrast)",
      "explanation": "Use 倒是/倒 when there's an element of surprise, a slight complaint, or a concession that goes against an expectation."
    },
    "exercises":     [
        {
            "id": "hsk4ii-daoshi-04-ex1",
            "type": "fill-blank",
            "question": "他嘴上说不帮忙，___也帮了不少忙。",
            "answer": "倒",
            "hint": "Fill in the blank with '倒'"
        },
        {
            "id": "hsk4ii-daoshi-04-ex2",
            "type": "fill-blank",
            "question": "他嘴上说不帮忙，___也帮了不少忙。",
            "answer": "倒",
            "hint": "Fill in the blank with '倒'"
        },
        {
            "id": "hsk4ii-daoshi-04-ex3",
            "type": "fill-blank",
            "question": "你___说说看，这事该怎么办？",
            "answer": "倒是",
            "hint": "Fill in the blank with '倒是'"
        },
        {
            "id": "hsk4ii-daoshi-04-ex4",
            "type": "fill-blank",
            "question": "这件衣服虽然旧了点，___很舒服。",
            "answer": "倒是",
            "hint": "Fill in the blank with '倒是'"
        },
        {
            "id": "hsk4ii-daoshi-04-ex5",
            "type": "fill-blank",
            "question": "这件衣服虽然旧了点，___很舒服。",
            "answer": "倒是",
            "hint": "Fill in the blank with '倒是'"
        },
        {
            "id": "hsk4ii-daoshi-04-ex1",
            "type": "fill-blank",
            "question": "他嘴上说不帮忙，___也帮了不少忙。",
            "answer": "倒",
            "hint": "Fill in the blank with '倒'"
        },
        {
            "id": "hsk4ii-daoshi-04-ex2",
            "type": "fill-blank",
            "question": "他嘴上说不帮忙，___也帮了不少忙。",
            "answer": "倒",
            "hint": "Fill in the blank with '倒'"
        },
        {
            "id": "hsk4ii-daoshi-04-ex3",
            "type": "fill-blank",
            "question": "你___说说看，这事该怎么办？",
            "answer": "倒是",
            "hint": "Fill in the blank with '倒是'"
        },
        {
            "id": "hsk4ii-daoshi-04-ex4",
            "type": "fill-blank",
            "question": "这件衣服虽然旧了点，___很舒服。",
            "answer": "倒是",
            "hint": "Fill in the blank with '倒是'"
        },
        {
            "id": "hsk4ii-daoshi-04-ex5",
            "type": "fill-blank",
            "question": "这件衣服虽然旧了点，___很舒服。",
            "answer": "倒是",
            "hint": "Fill in the blank with '倒是'"
        },
        {
            "id": "hsk4ii-daoshi-04-ex6",
            "type": "reorder",
            "words": [
                "?",
                "你倒是说说看",
                "这事该怎么办",
                ","
            ],
            "answer": "你倒是说说看，这事该怎么办？",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Expressing Contrast or Concession with 倒是/倒 (dàoshì/dào)'"
        },
        {
            "id": "hsk4ii-daoshi-04-ex7",
            "type": "reorder",
            "words": [
                ",",
                ".",
                "倒也帮了不少忙",
                "他嘴上说不帮忙"
            ],
            "answer": "他嘴上说不帮忙，倒也帮了不少忙。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Expressing Contrast or Concession with 倒是/倒 (dàoshì/dào)'"
        },
        {
            "id": "hsk4ii-daoshi-04-ex8",
            "type": "reorder",
            "words": [
                ",",
                "这事该怎么办",
                "?",
                "你倒是说说看"
            ],
            "answer": "你倒是说说看，这事该怎么办？",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Expressing Contrast or Concession with 倒是/倒 (dàoshì/dào)'"
        },
        {
            "id": "hsk4ii-daoshi-04-ex9",
            "type": "reorder",
            "words": [
                ".",
                ",",
                "他嘴上说不帮忙",
                "倒也帮了不少忙"
            ],
            "answer": "他嘴上说不帮忙，倒也帮了不少忙。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Expressing Contrast or Concession with 倒是/倒 (dàoshì/dào)'"
        },
        {
            "id": "hsk4ii-daoshi-04-ex10",
            "type": "reorder",
            "words": [
                ",",
                "他嘴上说不帮忙",
                ".",
                "倒也帮了不少忙"
            ],
            "answer": "他嘴上说不帮忙，倒也帮了不少忙。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Expressing Contrast or Concession with 倒是/倒 (dàoshì/dào)'"
        },
        {
            "id": "hsk4ii-daoshi-04-ex1",
            "type": "fill-blank",
            "question": "他嘴上说不帮忙，___也帮了不少忙。",
            "answer": "倒",
            "hint": "Fill in the blank with '倒'"
        },
        {
            "id": "hsk4ii-daoshi-04-ex2",
            "type": "fill-blank",
            "question": "他嘴上说不帮忙，___也帮了不少忙。",
            "answer": "倒",
            "hint": "Fill in the blank with '倒'"
        },
        {
            "id": "hsk4ii-daoshi-04-ex3",
            "type": "fill-blank",
            "question": "你___说说看，这事该怎么办？",
            "answer": "倒是",
            "hint": "Fill in the blank with '倒是'"
        },
        {
            "id": "hsk4ii-daoshi-04-ex4",
            "type": "fill-blank",
            "question": "这件衣服虽然旧了点，___很舒服。",
            "answer": "倒是",
            "hint": "Fill in the blank with '倒是'"
        },
        {
            "id": "hsk4ii-daoshi-04-ex5",
            "type": "fill-blank",
            "question": "这件衣服虽然旧了点，___很舒服。",
            "answer": "倒是",
            "hint": "Fill in the blank with '倒是'"
        },
        {
            "id": "hsk4ii-daoshi-04-ex6",
            "type": "reorder",
            "words": [
                "?",
                "你倒是说说看",
                "这事该怎么办",
                ","
            ],
            "answer": "你倒是说说看，这事该怎么办？",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Expressing Contrast or Concession with 倒是/倒 (dàoshì/dào)'"
        },
        {
            "id": "hsk4ii-daoshi-04-ex7",
            "type": "reorder",
            "words": [
                ",",
                ".",
                "倒也帮了不少忙",
                "他嘴上说不帮忙"
            ],
            "answer": "他嘴上说不帮忙，倒也帮了不少忙。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Expressing Contrast or Concession with 倒是/倒 (dàoshì/dào)'"
        },
        {
            "id": "hsk4ii-daoshi-04-ex8",
            "type": "reorder",
            "words": [
                ",",
                "这事该怎么办",
                "?",
                "你倒是说说看"
            ],
            "answer": "你倒是说说看，这事该怎么办？",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Expressing Contrast or Concession with 倒是/倒 (dàoshì/dào)'"
        },
        {
            "id": "hsk4ii-daoshi-04-ex9",
            "type": "reorder",
            "words": [
                ".",
                ",",
                "他嘴上说不帮忙",
                "倒也帮了不少忙"
            ],
            "answer": "他嘴上说不帮忙，倒也帮了不少忙。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Expressing Contrast or Concession with 倒是/倒 (dàoshì/dào)'"
        },
        {
            "id": "hsk4ii-daoshi-04-ex10",
            "type": "reorder",
            "words": [
                ",",
                "他嘴上说不帮忙",
                ".",
                "倒也帮了不少忙"
            ],
            "answer": "他嘴上说不帮忙，倒也帮了不少忙。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Expressing Contrast or Concession with 倒是/倒 (dàoshì/dào)'"
        },
        {
            "id": "hsk4ii-daoshi-04-ex11",
            "type": "translate",
            "question": "Although this dress is a bit old, it's quite comfortable.",
            "answer": "这件衣服虽然旧了点，倒是很舒服。",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of 'Expressing Contrast or Concession with 倒是/倒 (dàoshì/dào)'"
        },
        {
            "id": "hsk4ii-daoshi-04-ex12",
            "type": "translate",
            "question": "他嘴上说不帮忙，倒也帮了不少忙。",
            "answer": "He said he wouldn't help, but he actually helped a lot.",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of 'Expressing Contrast or Concession with 倒是/倒 (dàoshì/dào)'"
        },
        {
            "id": "hsk4ii-daoshi-04-ex13",
            "type": "translate",
            "question": "He said he wouldn't help, but he actually helped a lot.",
            "answer": "他嘴上说不帮忙，倒也帮了不少忙。",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of 'Expressing Contrast or Concession with 倒是/倒 (dàoshì/dào)'"
        },
        {
            "id": "hsk4ii-daoshi-04-ex14",
            "type": "translate",
            "question": "他嘴上说不帮忙，倒也帮了不少忙。",
            "answer": "He said he wouldn't help, but he actually helped a lot.",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of 'Expressing Contrast or Concession with 倒是/倒 (dàoshì/dào)'"
        },
        {
            "id": "hsk4ii-daoshi-04-ex15",
            "type": "translate",
            "question": "这件衣服虽然旧了点，倒是很舒服。",
            "answer": "Although this dress is a bit old, it's quite comfortable.",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of 'Expressing Contrast or Concession with 倒是/倒 (dàoshì/dào)'"
        }
    ]
  },
  {
    "id": "hsk4ii-bijing-05",
    "band": "HSK4-II",
    "order": 5,
    "title": "After All with 毕竟 (bìjìng)",
    "subtitle": "Indicating a conclusion based on facts or circumstances",
    "formula": "毕竟 + Clause",
    "explanation": "毕竟 is an adverb meaning 'after all,' 'in the final analysis,' or 'when all is said and done.' It is used to draw a conclusion or make a judgment based on existing facts or circumstances, often to explain or justify a situation.",
    "usageRules": [
      "Placed at the beginning of a clause or before the verb/adjective.",
      "Used to emphasize the true nature or essential quality of something.",
      "Often used to provide a reason or justification for a previous statement.",
      "Can imply a sense of understanding or resignation."
    ],
    "examples": [
      {
        "chinese": "他毕竟是个孩子，犯错是难免的。",
        "pinyin": "Tā bìjìng shì ge háizi, fàncuò shì nánmiǎn de.",
        "english": "He is a child after all, making mistakes is inevitable.",
        "highlight": "毕竟"
      },
      {
        "chinese": "虽然很累，但毕竟完成了任务。",
        "pinyin": "Suīrán hěn lèi, dàn bìjìng wánchéngle rènwu.",
        "english": "Although very tired, after all, the task was completed.",
        "highlight": "毕竟"
      },
      {
        "chinese": "这件事毕竟关系到公司的未来，我们不能马虎。",
        "pinyin": "Zhè jiàn shì bìjìng guānxì dào gōngsī de wèilái, wǒmen bù néng mǎhu.",
        "english": "This matter, after all, concerns the company's future, we cannot be careless.",
        "highlight": "毕竟"
      },
      {
        "chinese": "他毕竟是你的哥哥，你应该多关心他。",
        "pinyin": "Tā bìjìng shì nǐ de gēge, nǐ yīnggāi duō guānxīn tā.",
        "english": "He is your elder brother after all, you should care more about him.",
        "highlight": "毕竟"
      },
      {
        "chinese": "生活毕竟不是电影，没有那么多巧合。",
        "pinyin": "Shēnghuó bìjìng bù shì diànyǐng, méiyǒu nàme duō qiǎohé.",
        "english": "Life is not a movie after all, there aren't so many coincidences.",
        "highlight": "毕竟"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 毕竟 when simply stating a fact without drawing a conclusion or offering a justification. 毕竟 implies a summary or a final thought based on prior understanding.",
      "wrongExample": "今天毕竟是星期一。 (Incorrect, unless it's used to explain why something is happening on Monday)",
      "correctExample": "今天毕竟是星期一，所以大家都很忙。 (Correct, uses 毕竟 to justify why everyone is busy)",
      "explanation": "Use 毕竟 to emphasize the underlying truth or essential nature of a situation, often as a concluding remark."
    },
    "exercises":     [
        {
            "id": "hsk4ii-daoshi-ex1-ex1",
            "type": "fill-blank",
            "question": "虽然很累，但___完成了任务。",
            "answer": "毕竟",
            "hint": "毕竟 + Clause"
        },
        {
            "id": "hsk4ii-daoshi-ex1-ex2",
            "type": "fill-blank",
            "question": "他___是个孩子，犯错是难免的。",
            "answer": "毕竟",
            "hint": "毕竟 + Clause"
        },
        {
            "id": "hsk4ii-daoshi-ex1-ex3",
            "type": "fill-blank",
            "question": "虽然很累，但___完成了任务。",
            "answer": "毕竟",
            "hint": "毕竟 + Clause"
        },
        {
            "id": "hsk4ii-daoshi-ex1-ex4",
            "type": "fill-blank",
            "question": "这件事___关系到公司的未来，我们不能马虎。",
            "answer": "毕竟",
            "hint": "毕竟 + Clause"
        },
        {
            "id": "hsk4ii-daoshi-ex1-ex5",
            "type": "fill-blank",
            "question": "他___是个孩子，犯错是难免的。",
            "answer": "毕竟",
            "hint": "毕竟 + Clause"
        },
        {
            "id": "hsk4ii-daoshi-ex1-ex6",
            "type": "reorder",
            "words": [
                "，",
                "。",
                "我们不能马虎",
                "这件事毕竟关系到公司的未来"
            ],
            "answer": "这件事毕竟关系到公司的未来，我们不能马虎。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 毕竟 + Clause"
        },
        {
            "id": "hsk4ii-daoshi-ex1-ex7",
            "type": "reorder",
            "words": [
                "犯错是难免的",
                "他毕竟是个孩子",
                "。",
                "，"
            ],
            "answer": "他毕竟是个孩子，犯错是难免的。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 毕竟 + Clause"
        },
        {
            "id": "hsk4ii-daoshi-ex1-ex8",
            "type": "reorder",
            "words": [
                "。",
                "我们不能马虎",
                "这件事毕竟关系到公司的未来",
                "，"
            ],
            "answer": "这件事毕竟关系到公司的未来，我们不能马虎。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 毕竟 + Clause"
        },
        {
            "id": "hsk4ii-daoshi-ex1-ex9",
            "type": "reorder",
            "words": [
                "。",
                "这件事毕竟关系到公司的未来",
                "，",
                "我们不能马虎"
            ],
            "answer": "这件事毕竟关系到公司的未来，我们不能马虎。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 毕竟 + Clause"
        },
        {
            "id": "hsk4ii-daoshi-ex1-ex10",
            "type": "reorder",
            "words": [
                "我们不能马虎",
                "这件事毕竟关系到公司的未来",
                "。",
                "，"
            ],
            "answer": "这件事毕竟关系到公司的未来，我们不能马虎。",
            "hint": "Reorder the words to form a sentence using the grammar structure: 毕竟 + Clause"
        },
        {
            "id": "hsk4ii-daoshi-ex1-ex11",
            "type": "translate",
            "question": "虽然很累，但毕竟完成了任务。",
            "answer": "Although very tired, after all, the task was completed.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: 毕竟 + Clause"
        },
        {
            "id": "hsk4ii-daoshi-ex1-ex12",
            "type": "translate",
            "question": "Although very tired, after all, the task was completed.",
            "answer": "虽然很累，但毕竟完成了任务。",
            "direction": "en-to-cn",
            "hint": "Translate to Chinese using the grammar structure: 毕竟 + Clause"
        },
        {
            "id": "hsk4ii-daoshi-ex1-ex13",
            "type": "translate",
            "question": "虽然很累，但毕竟完成了任务。",
            "answer": "Although very tired, after all, the task was completed.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: 毕竟 + Clause"
        },
        {
            "id": "hsk4ii-daoshi-ex1-ex14",
            "type": "translate",
            "question": "Although very tired, after all, the task was completed.",
            "answer": "虽然很累，但毕竟完成了任务。",
            "direction": "en-to-cn",
            "hint": "Translate to Chinese using the grammar structure: 毕竟 + Clause"
        },
        {
            "id": "hsk4ii-daoshi-ex1-ex15",
            "type": "translate",
            "question": "虽然很累，但毕竟完成了任务。",
            "answer": "Although very tired, after all, the task was completed.",
            "direction": "cn-to-en",
            "hint": "Translate to English using the grammar structure: 毕竟 + Clause"
        }
    ]
  },
  {
    "id": "hsk4ii-jiujing-06",
    "band": "HSK4-II",
    "order": 6,
    "title": "Probing for the Truth with 究竟 (jiūjìng)",
    "subtitle": "Asking for the ultimate truth or outcome",
    "formula": "究竟 + Interrogative Pronoun/Question + ?",
    "explanation": "究竟 is an adverb used in questions to get to the bottom of a matter, asking for the ultimate truth, reason, or outcome. It adds emphasis to the question, implying a desire for a definitive answer after much speculation or confusion. It can be translated as 'exactly,' 'after all,' or 'what on earth.'",
    "usageRules": [
      "Placed before an interrogative pronoun (谁, 什么, 怎么, 哪儿) or a question clause.",
      "Used to ask for specific details or the real situation.",
      "Often implies impatience or a strong desire to know.",
      "Can also be used in declarative sentences to mean 'ultimately' or 'in the end'."
    ],
    "examples": [
      {
        "chinese": "你究竟想说什么？",
        "pinyin": "Nǐ jiūjìng xiǎng shuō shénme?",
        "english": "What exactly do you want to say?",
        "highlight": "究竟"
      },
      {
        "chinese": "这件事究竟是谁做的？",
        "pinyin": "Zhè jiàn shì jiūjìng shì shéi zuò de?",
        "english": "Who on earth did this?",
        "highlight": "究竟"
      },
      {
        "chinese": "他究竟去了哪里，没有人知道。",
        "pinyin": "Tā jiūjìng qùle nǎlǐ, méiyǒu rén zhīdao.",
        "english": "No one knows where he ultimately went.",
        "highlight": "究竟"
      },
      {
        "chinese": "这个问题究竟该怎么解决？",
        "pinyin": "Zhège wèntí jiūjìng gāi zěnme jiějué?",
        "english": "How exactly should this problem be solved?",
        "highlight": "究竟"
      },
      {
        "chinese": "你究竟是同意还是不同意？",
        "pinyin": "Nǐ jiūjìng shì tóngyì háishì bù tóngyì?",
        "english": "Do you agree or disagree, after all?",
        "highlight": "究竟"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 究竟 in simple, straightforward questions where no emphasis on finding the ultimate truth is needed. It adds a strong interrogative tone, so use it when you genuinely want to get to the bottom of something.",
      "wrongExample": "你究竟吃饭了吗？ (Incorrect, unless there's a strong reason to doubt if they ate)",
      "correctExample": "你吃饭了吗？ (Correct, simple question)",
      "explanation": "Use 究竟 when you want to express a strong desire for a definitive answer, often after confusion or uncertainty."
    },
    "exercises":     [
        {
            "id": "hsk4ii-jiujing-06-ex1",
            "type": "fill-blank",
            "question": "他___去了哪里，没有人知道。",
            "answer": "究竟",
            "hint": "Fill in the blank with '究竟'"
        },
        {
            "id": "hsk4ii-jiujing-06-ex2",
            "type": "fill-blank",
            "question": "他___去了哪里，没有人知道。",
            "answer": "究竟",
            "hint": "Fill in the blank with '究竟'"
        },
        {
            "id": "hsk4ii-jiujing-06-ex3",
            "type": "fill-blank",
            "question": "你___想说什么？",
            "answer": "究竟",
            "hint": "Fill in the blank with '究竟'"
        },
        {
            "id": "hsk4ii-jiujing-06-ex4",
            "type": "fill-blank",
            "question": "这件事___是谁做的？",
            "answer": "究竟",
            "hint": "Fill in the blank with '究竟'"
        },
        {
            "id": "hsk4ii-jiujing-06-ex5",
            "type": "fill-blank",
            "question": "他___去了哪里，没有人知道。",
            "answer": "究竟",
            "hint": "Fill in the blank with '究竟'"
        },
        {
            "id": "hsk4ii-jiujing-06-ex1",
            "type": "fill-blank",
            "question": "他___去了哪里，没有人知道。",
            "answer": "究竟",
            "hint": "Fill in the blank with '究竟'"
        },
        {
            "id": "hsk4ii-jiujing-06-ex2",
            "type": "fill-blank",
            "question": "他___去了哪里，没有人知道。",
            "answer": "究竟",
            "hint": "Fill in the blank with '究竟'"
        },
        {
            "id": "hsk4ii-jiujing-06-ex3",
            "type": "fill-blank",
            "question": "你___想说什么？",
            "answer": "究竟",
            "hint": "Fill in the blank with '究竟'"
        },
        {
            "id": "hsk4ii-jiujing-06-ex4",
            "type": "fill-blank",
            "question": "这件事___是谁做的？",
            "answer": "究竟",
            "hint": "Fill in the blank with '究竟'"
        },
        {
            "id": "hsk4ii-jiujing-06-ex5",
            "type": "fill-blank",
            "question": "他___去了哪里，没有人知道。",
            "answer": "究竟",
            "hint": "Fill in the blank with '究竟'"
        },
        {
            "id": "hsk4ii-jiujing-06-ex6",
            "type": "reorder",
            "words": [
                "?",
                "这件事究竟是谁做的"
            ],
            "answer": "这件事究竟是谁做的？",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Probing for the Truth with 究竟 (jiūjìng)'"
        },
        {
            "id": "hsk4ii-jiujing-06-ex7",
            "type": "reorder",
            "words": [
                "?",
                "这件事究竟是谁做的"
            ],
            "answer": "这件事究竟是谁做的？",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Probing for the Truth with 究竟 (jiūjìng)'"
        },
        {
            "id": "hsk4ii-jiujing-06-ex8",
            "type": "reorder",
            "words": [
                "你究竟想说什么",
                "?"
            ],
            "answer": "你究竟想说什么？",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Probing for the Truth with 究竟 (jiūjìng)'"
        },
        {
            "id": "hsk4ii-jiujing-06-ex9",
            "type": "reorder",
            "words": [
                ",",
                ".",
                "他究竟去了哪里",
                "没有人知道"
            ],
            "answer": "他究竟去了哪里，没有人知道。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Probing for the Truth with 究竟 (jiūjìng)'"
        },
        {
            "id": "hsk4ii-jiujing-06-ex10",
            "type": "reorder",
            "words": [
                "?",
                "这件事究竟是谁做的"
            ],
            "answer": "这件事究竟是谁做的？",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Probing for the Truth with 究竟 (jiūjìng)'"
        },
        {
            "id": "hsk4ii-jiujing-06-ex1",
            "type": "fill-blank",
            "question": "他___去了哪里，没有人知道。",
            "answer": "究竟",
            "hint": "Fill in the blank with '究竟'"
        },
        {
            "id": "hsk4ii-jiujing-06-ex2",
            "type": "fill-blank",
            "question": "他___去了哪里，没有人知道。",
            "answer": "究竟",
            "hint": "Fill in the blank with '究竟'"
        },
        {
            "id": "hsk4ii-jiujing-06-ex3",
            "type": "fill-blank",
            "question": "你___想说什么？",
            "answer": "究竟",
            "hint": "Fill in the blank with '究竟'"
        },
        {
            "id": "hsk4ii-jiujing-06-ex4",
            "type": "fill-blank",
            "question": "这件事___是谁做的？",
            "answer": "究竟",
            "hint": "Fill in the blank with '究竟'"
        },
        {
            "id": "hsk4ii-jiujing-06-ex5",
            "type": "fill-blank",
            "question": "他___去了哪里，没有人知道。",
            "answer": "究竟",
            "hint": "Fill in the blank with '究竟'"
        },
        {
            "id": "hsk4ii-jiujing-06-ex6",
            "type": "reorder",
            "words": [
                "?",
                "这件事究竟是谁做的"
            ],
            "answer": "这件事究竟是谁做的？",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Probing for the Truth with 究竟 (jiūjìng)'"
        },
        {
            "id": "hsk4ii-jiujing-06-ex7",
            "type": "reorder",
            "words": [
                "?",
                "这件事究竟是谁做的"
            ],
            "answer": "这件事究竟是谁做的？",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Probing for the Truth with 究竟 (jiūjìng)'"
        },
        {
            "id": "hsk4ii-jiujing-06-ex8",
            "type": "reorder",
            "words": [
                "你究竟想说什么",
                "?"
            ],
            "answer": "你究竟想说什么？",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Probing for the Truth with 究竟 (jiūjìng)'"
        },
        {
            "id": "hsk4ii-jiujing-06-ex9",
            "type": "reorder",
            "words": [
                ",",
                ".",
                "他究竟去了哪里",
                "没有人知道"
            ],
            "answer": "他究竟去了哪里，没有人知道。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Probing for the Truth with 究竟 (jiūjìng)'"
        },
        {
            "id": "hsk4ii-jiujing-06-ex10",
            "type": "reorder",
            "words": [
                "?",
                "这件事究竟是谁做的"
            ],
            "answer": "这件事究竟是谁做的？",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Probing for the Truth with 究竟 (jiūjìng)'"
        },
        {
            "id": "hsk4ii-jiujing-06-ex11",
            "type": "translate",
            "question": "What exactly do you want to say?",
            "answer": "你究竟想说什么？",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of 'Probing for the Truth with 究竟 (jiūjìng)'"
        },
        {
            "id": "hsk4ii-jiujing-06-ex12",
            "type": "translate",
            "question": "你究竟想说什么？",
            "answer": "What exactly do you want to say?",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of 'Probing for the Truth with 究竟 (jiūjìng)'"
        },
        {
            "id": "hsk4ii-jiujing-06-ex13",
            "type": "translate",
            "question": "你究竟想说什么？",
            "answer": "What exactly do you want to say?",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of 'Probing for the Truth with 究竟 (jiūjìng)'"
        },
        {
            "id": "hsk4ii-jiujing-06-ex14",
            "type": "translate",
            "question": "What exactly do you want to say?",
            "answer": "你究竟想说什么？",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of 'Probing for the Truth with 究竟 (jiūjìng)'"
        },
        {
            "id": "hsk4ii-jiujing-06-ex15",
            "type": "translate",
            "question": "What exactly do you want to say?",
            "answer": "你究竟想说什么？",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of 'Probing for the Truth with 究竟 (jiūjìng)'"
        }
    ]
  },
  {
    "id": "hsk4ii-daodi-07",
    "band": "HSK4-II",
    "order": 7,
    "title": "Getting to the Bottom with 到底 (dàodǐ)",
    "subtitle": "Similar to 究竟, but also for emphasis in statements",
    "formula": "到底 + Interrogative Pronoun/Question / 到底 + Clause (for emphasis)",
    "explanation": "到底 is similar to 究竟 in questions, meaning 'exactly,' 'after all,' or 'what on earth.' However, 到底 can also be used in declarative sentences to emphasize a conclusion or the result of a long process, meaning 'in the end' or 'finally.'",
    "usageRules": [
      "In questions, placed before an interrogative pronoun or a question clause, similar to 究竟.",
      "In declarative sentences, placed before the verb or adjective to emphasize a conclusion.",
      "Can express a tone of impatience or frustration in questions.",
      "In statements, it often summarizes a situation or expresses a firm belief."
    ],
    "examples": [
      {
        "chinese": "你到底去不去？",
        "pinyin": "Nǐ dàodǐ qù bù qù?",
        "english": "Are you going or not, after all?",
        "highlight": "到底"
      },
      {
        "chinese": "这个问题到底怎么解决？",
        "pinyin": "Zhège wèntí dàodǐ zěnme jiějué?",
        "english": "How exactly should this problem be solved?",
        "highlight": "到底"
      },
      {
        "chinese": "经过一番努力，他到底成功了。",
        "pinyin": "Jīngguò yī fān nǔlì, tā dàodǐ chénggōng le.",
        "english": "After a lot of effort, he finally succeeded.",
        "highlight": "到底"
      },
      {
        "chinese": "你到底有没有听我说话？",
        "pinyin": "Nǐ dàodǐ yǒu méiyǒu tīng wǒ shuōhuà?",
        "english": "Did you listen to me or not, after all?",
        "highlight": "到底"
      },
      {
        "chinese": "不管怎么说，他到底还是我的朋友。",
        "pinyin": "Bùguǎn zěnme shuō, tā dàodǐ háishì wǒ de péngyǒu.",
        "english": "No matter what, he is still my friend after all.",
        "highlight": "到底"
      }
    ],
    "commonMistake": {
      "description": "While 到底 and 究竟 are often interchangeable in questions, 到底 has the additional usage in declarative sentences to emphasize a conclusion. Do not use 究竟 in declarative sentences in this manner.",
      "wrongExample": "经过一番努力，他究竟成功了。 (Incorrect, 究竟 is not typically used this way in statements)",
      "correctExample": "经过一番努力，他到底成功了。 (Correct, emphasizes the final success)",
      "explanation": "Remember that 到底 can emphasize a final outcome or conclusion in statements, a function that 究竟 does not share."
    },
    "exercises":     [
        {
            "id": "hsk4ii-jiujing-ex1-ex1",
            "type": "fill-blank",
            "question": "你___去不去？",
            "answer": "到底",
            "hint": "到底 + Interrogative Pronoun/Question / 到底 + Clause (for emphasis)"
        },
        {
            "id": "hsk4ii-jiujing-ex1-ex2",
            "type": "fill-blank",
            "question": "这个问题___怎么解决？",
            "answer": "到底",
            "hint": "到底 + Interrogative Pronoun/Question / 到底 + Clause (for emphasis)"
        },
        {
            "id": "hsk4ii-jiujing-ex1-ex3",
            "type": "fill-blank",
            "question": "这个问题___怎么解决？",
            "answer": "到底",
            "hint": "到底 + Interrogative Pronoun/Question / 到底 + Clause (for emphasis)"
        },
        {
            "id": "hsk4ii-jiujing-ex1-ex4",
            "type": "fill-blank",
            "question": "你___去不去？",
            "answer": "到底",
            "hint": "到底 + Interrogative Pronoun/Question / 到底 + Clause (for emphasis)"
        },
        {
            "id": "hsk4ii-jiujing-ex1-ex5",
            "type": "fill-blank",
            "question": "经过一番努力，他___成功了。",
            "answer": "到底",
            "hint": "到底 + Interrogative Pronoun/Question / 到底 + Clause (for emphasis)"
        },
        {
            "id": "hsk4ii-jiujing-ex1-ex6",
            "type": "reorder",
            "words": [
                "怎",
                "个",
                "问",
                "到",
                "底",
                "决",
                "解",
                "题",
                "么",
                "这"
            ],
            "answer": "这个问题到底怎么解决？",
            "hint": "到底 + Interrogative Pronoun/Question / 到底 + Clause (for emphasis)"
        },
        {
            "id": "hsk4ii-jiujing-ex1-ex7",
            "type": "reorder",
            "words": [
                "成",
                "番",
                "到",
                "一",
                "经",
                "努",
                "底",
                "了",
                "他",
                "力",
                "功",
                "过"
            ],
            "answer": "经过一番努力，他到底成功了。",
            "hint": "到底 + Interrogative Pronoun/Question / 到底 + Clause (for emphasis)"
        },
        {
            "id": "hsk4ii-jiujing-ex1-ex8",
            "type": "reorder",
            "words": [
                "功",
                "了",
                "一",
                "过",
                "力",
                "经",
                "底",
                "番",
                "努",
                "成",
                "他",
                "到"
            ],
            "answer": "经过一番努力，他到底成功了。",
            "hint": "到底 + Interrogative Pronoun/Question / 到底 + Clause (for emphasis)"
        },
        {
            "id": "hsk4ii-jiujing-ex1-ex9",
            "type": "reorder",
            "words": [
                "底",
                "你",
                "去",
                "到",
                "不",
                "去"
            ],
            "answer": "你到底去不去？",
            "hint": "到底 + Interrogative Pronoun/Question / 到底 + Clause (for emphasis)"
        },
        {
            "id": "hsk4ii-jiujing-ex1-ex10",
            "type": "reorder",
            "words": [
                "不",
                "底",
                "去",
                "你",
                "到",
                "去"
            ],
            "answer": "你到底去不去？",
            "hint": "到底 + Interrogative Pronoun/Question / 到底 + Clause (for emphasis)"
        },
        {
            "id": "hsk4ii-jiujing-ex1-ex11",
            "type": "translate",
            "question": "How exactly should this problem be solved?",
            "answer": "这个问题到底怎么解决？",
            "direction": "en-to-cn",
            "hint": "到底 + Interrogative Pronoun/Question / 到底 + Clause (for emphasis)"
        },
        {
            "id": "hsk4ii-jiujing-ex1-ex12",
            "type": "translate",
            "question": "经过一番努力，他到底成功了。",
            "answer": "After a lot of effort, he finally succeeded.",
            "direction": "cn-to-en",
            "hint": "到底 + Interrogative Pronoun/Question / 到底 + Clause (for emphasis)"
        },
        {
            "id": "hsk4ii-jiujing-ex1-ex13",
            "type": "translate",
            "question": "Are you going or not, after all?",
            "answer": "你到底去不去？",
            "direction": "en-to-cn",
            "hint": "到底 + Interrogative Pronoun/Question / 到底 + Clause (for emphasis)"
        },
        {
            "id": "hsk4ii-jiujing-ex1-ex14",
            "type": "translate",
            "question": "经过一番努力，他到底成功了。",
            "answer": "After a lot of effort, he finally succeeded.",
            "direction": "cn-to-en",
            "hint": "到底 + Interrogative Pronoun/Question / 到底 + Clause (for emphasis)"
        },
        {
            "id": "hsk4ii-jiujing-ex1-ex15",
            "type": "translate",
            "question": "How exactly should this problem be solved?",
            "answer": "这个问题到底怎么解决？",
            "direction": "en-to-cn",
            "hint": "到底 + Interrogative Pronoun/Question / 到底 + Clause (for emphasis)"
        }
    ]
  },
  {
    "id": "hsk4ii-fanzheng-08",
    "band": "HSK4-II",
    "order": 8,
    "title": "Anyway/In Any Case with 反正 (fǎnzhèng)",
    "subtitle": "Indicating that a situation won't change regardless of other factors",
    "formula": "反正 + Clause",
    "explanation": "反正 is an adverb meaning 'anyway,' 'in any case,' 'in any event,' or 'no matter what.' It is used to indicate that a certain outcome or situation will remain unchanged regardless of other factors or efforts. It often implies a sense of resignation or determination.",
    "usageRules": [
      "Placed at the beginning of a clause or before the verb/adjective.",
      "The clause following 反正 often expresses a conclusion or a decision.",
      "Can be used to dismiss previous arguments or considerations.",
      "Often implies that the speaker doesn't care about other options or consequences."
    ],
    "examples": [
      {
        "chinese": "反正我也没事，就陪你去吧。",
        "pinyin": "Fǎnzhèng wǒ yě méishì, jiù péi nǐ qù ba.",
        "english": "Anyway, I have nothing to do, so I'll go with you.",
        "highlight": "反正"
      },
      {
        "chinese": "你爱去不去，反正我都要去。",
        "pinyin": "Nǐ ài qù bù qù, fǎnzhèng wǒ dōu yào qù.",
        "english": "Go or not, I'm going anyway.",
        "highlight": "反正"
      },
      {
        "chinese": "反正结果都一样，何必那么纠结？",
        "pinyin": "Fǎnzhèng jiéguǒ dōu yīyàng, hébì nàme jiūjié?",
        "english": "The result is the same anyway, why bother struggling so much?",
        "highlight": "反正"
      },
      {
        "chinese": "反正时间还早，我们再玩一会儿吧。",
        "pinyin": "Fǎnzhèng shíjiān hái zǎo, wǒmen zài wán yīhuǐr ba.",
        "english": "Anyway, it's still early, let's play for a while longer.",
        "highlight": "反正"
      },
      {
        "chinese": "反正我已经决定了，你不用再劝我了。",
        "pinyin": "Fǎnzhèng wǒ yǐjīng juédìng le, nǐ bù yòng zài quàn wǒ le.",
        "english": "Anyway, I've already decided, you don't need to persuade me anymore.",
        "highlight": "反正"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 反正 when the outcome is not fixed or when there are still variables that could change the situation. 反正 implies a sense of certainty about the outcome.",
      "wrongExample": "我还没决定，反正明天再说吧。 (Incorrect, implies a decision has been made)",
      "correctExample": "我还没决定，明天再说吧。 (Correct, simply postpones the decision)",
      "explanation": "Use 反正 when you want to convey that a certain outcome is inevitable or that other factors are irrelevant to the final decision."
    },
    "exercises":     [
        {
            "id": "hsk4ii-fanzheng-08-ex1",
            "type": "fill-blank",
            "question": "___我也没事，就陪你去吧。",
            "answer": "反正",
            "hint": "Fill in the blank with '反正'"
        },
        {
            "id": "hsk4ii-fanzheng-08-ex2",
            "type": "fill-blank",
            "question": "你爱去不去，___我都要去。",
            "answer": "反正",
            "hint": "Fill in the blank with '反正'"
        },
        {
            "id": "hsk4ii-fanzheng-08-ex3",
            "type": "fill-blank",
            "question": "___我也没事，就陪你去吧。",
            "answer": "反正",
            "hint": "Fill in the blank with '反正'"
        },
        {
            "id": "hsk4ii-fanzheng-08-ex4",
            "type": "fill-blank",
            "question": "___结果都一样，何必那么纠结？",
            "answer": "反正",
            "hint": "Fill in the blank with '反正'"
        },
        {
            "id": "hsk4ii-fanzheng-08-ex5",
            "type": "fill-blank",
            "question": "___结果都一样，何必那么纠结？",
            "answer": "反正",
            "hint": "Fill in the blank with '反正'"
        },
        {
            "id": "hsk4ii-fanzheng-08-ex1",
            "type": "fill-blank",
            "question": "___我也没事，就陪你去吧。",
            "answer": "反正",
            "hint": "Fill in the blank with '反正'"
        },
        {
            "id": "hsk4ii-fanzheng-08-ex2",
            "type": "fill-blank",
            "question": "你爱去不去，___我都要去。",
            "answer": "反正",
            "hint": "Fill in the blank with '反正'"
        },
        {
            "id": "hsk4ii-fanzheng-08-ex3",
            "type": "fill-blank",
            "question": "___我也没事，就陪你去吧。",
            "answer": "反正",
            "hint": "Fill in the blank with '反正'"
        },
        {
            "id": "hsk4ii-fanzheng-08-ex4",
            "type": "fill-blank",
            "question": "___结果都一样，何必那么纠结？",
            "answer": "反正",
            "hint": "Fill in the blank with '反正'"
        },
        {
            "id": "hsk4ii-fanzheng-08-ex5",
            "type": "fill-blank",
            "question": "___结果都一样，何必那么纠结？",
            "answer": "反正",
            "hint": "Fill in the blank with '反正'"
        },
        {
            "id": "hsk4ii-fanzheng-08-ex6",
            "type": "reorder",
            "words": [
                "就陪你去吧",
                ",",
                "反正我也没事",
                "."
            ],
            "answer": "反正我也没事，就陪你去吧。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Anyway/In Any Case with 反正 (fǎnzhèng)'"
        },
        {
            "id": "hsk4ii-fanzheng-08-ex7",
            "type": "reorder",
            "words": [
                "就陪你去吧",
                ",",
                "反正我也没事",
                "."
            ],
            "answer": "反正我也没事，就陪你去吧。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Anyway/In Any Case with 反正 (fǎnzhèng)'"
        },
        {
            "id": "hsk4ii-fanzheng-08-ex8",
            "type": "reorder",
            "words": [
                "反正我都要去",
                ".",
                "你爱去不去",
                ","
            ],
            "answer": "你爱去不去，反正我都要去。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Anyway/In Any Case with 反正 (fǎnzhèng)'"
        },
        {
            "id": "hsk4ii-fanzheng-08-ex9",
            "type": "reorder",
            "words": [
                ".",
                "反正我都要去",
                "你爱去不去",
                ","
            ],
            "answer": "你爱去不去，反正我都要去。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Anyway/In Any Case with 反正 (fǎnzhèng)'"
        },
        {
            "id": "hsk4ii-fanzheng-08-ex10",
            "type": "reorder",
            "words": [
                "?",
                "反正结果都一样",
                ",",
                "何必那么纠结"
            ],
            "answer": "反正结果都一样，何必那么纠结？",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Anyway/In Any Case with 反正 (fǎnzhèng)'"
        },
        {
            "id": "hsk4ii-fanzheng-08-ex1",
            "type": "fill-blank",
            "question": "___我也没事，就陪你去吧。",
            "answer": "反正",
            "hint": "Fill in the blank with '反正'"
        },
        {
            "id": "hsk4ii-fanzheng-08-ex2",
            "type": "fill-blank",
            "question": "你爱去不去，___我都要去。",
            "answer": "反正",
            "hint": "Fill in the blank with '反正'"
        },
        {
            "id": "hsk4ii-fanzheng-08-ex3",
            "type": "fill-blank",
            "question": "___我也没事，就陪你去吧。",
            "answer": "反正",
            "hint": "Fill in the blank with '反正'"
        },
        {
            "id": "hsk4ii-fanzheng-08-ex4",
            "type": "fill-blank",
            "question": "___结果都一样，何必那么纠结？",
            "answer": "反正",
            "hint": "Fill in the blank with '反正'"
        },
        {
            "id": "hsk4ii-fanzheng-08-ex5",
            "type": "fill-blank",
            "question": "___结果都一样，何必那么纠结？",
            "answer": "反正",
            "hint": "Fill in the blank with '反正'"
        },
        {
            "id": "hsk4ii-fanzheng-08-ex6",
            "type": "reorder",
            "words": [
                "就陪你去吧",
                ",",
                "反正我也没事",
                "."
            ],
            "answer": "反正我也没事，就陪你去吧。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Anyway/In Any Case with 反正 (fǎnzhèng)'"
        },
        {
            "id": "hsk4ii-fanzheng-08-ex7",
            "type": "reorder",
            "words": [
                "就陪你去吧",
                ",",
                "反正我也没事",
                "."
            ],
            "answer": "反正我也没事，就陪你去吧。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Anyway/In Any Case with 反正 (fǎnzhèng)'"
        },
        {
            "id": "hsk4ii-fanzheng-08-ex8",
            "type": "reorder",
            "words": [
                "反正我都要去",
                ".",
                "你爱去不去",
                ","
            ],
            "answer": "你爱去不去，反正我都要去。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Anyway/In Any Case with 反正 (fǎnzhèng)'"
        },
        {
            "id": "hsk4ii-fanzheng-08-ex9",
            "type": "reorder",
            "words": [
                ".",
                "反正我都要去",
                "你爱去不去",
                ","
            ],
            "answer": "你爱去不去，反正我都要去。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Anyway/In Any Case with 反正 (fǎnzhèng)'"
        },
        {
            "id": "hsk4ii-fanzheng-08-ex10",
            "type": "reorder",
            "words": [
                "?",
                "反正结果都一样",
                ",",
                "何必那么纠结"
            ],
            "answer": "反正结果都一样，何必那么纠结？",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Anyway/In Any Case with 反正 (fǎnzhèng)'"
        },
        {
            "id": "hsk4ii-fanzheng-08-ex11",
            "type": "translate",
            "question": "反正我也没事，就陪你去吧。",
            "answer": "Anyway, I have nothing to do, so I'll go with you.",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of 'Anyway/In Any Case with 反正 (fǎnzhèng)'"
        },
        {
            "id": "hsk4ii-fanzheng-08-ex12",
            "type": "translate",
            "question": "Anyway, I have nothing to do, so I'll go with you.",
            "answer": "反正我也没事，就陪你去吧。",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of 'Anyway/In Any Case with 反正 (fǎnzhèng)'"
        },
        {
            "id": "hsk4ii-fanzheng-08-ex13",
            "type": "translate",
            "question": "Anyway, I have nothing to do, so I'll go with you.",
            "answer": "反正我也没事，就陪你去吧。",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of 'Anyway/In Any Case with 反正 (fǎnzhèng)'"
        },
        {
            "id": "hsk4ii-fanzheng-08-ex14",
            "type": "translate",
            "question": "反正我也没事，就陪你去吧。",
            "answer": "Anyway, I have nothing to do, so I'll go with you.",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of 'Anyway/In Any Case with 反正 (fǎnzhèng)'"
        },
        {
            "id": "hsk4ii-fanzheng-08-ex15",
            "type": "translate",
            "question": "Anyway, I have nothing to do, so I'll go with you.",
            "answer": "反正我也没事，就陪你去吧。",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of 'Anyway/In Any Case with 反正 (fǎnzhèng)'"
        }
    ]
  },
  {
    "id": "hsk4ii-suoxing-09",
    "band": "HSK4-II",
    "order": 9,
    "title": "Simply/Might as Well with 索性 (suǒxìng)",
    "subtitle": "Deciding to do something straightforwardly or to an extreme",
    "formula": "索性 + Verb Phrase",
    "explanation": "索性 is an adverb meaning 'simply,' 'might as well,' or 'just.' It indicates a decision to do something straightforwardly, often because other options are difficult or undesirable, or to do something to an extreme. It implies a decisive and sometimes impulsive action.",
    "usageRules": [
      "Placed before the verb phrase.",
      "Often used when one decides to do something completely or without hesitation.",
      "Can imply giving up on other options and choosing the simplest or most extreme one.",
      "Similar to 干脆, but 索性 often implies a more complete or thorough action."
    ],
    "examples": [
      {
        "chinese": "既然等不到他，索性我们先走吧。",
        "pinyin": "Jìrán děng bù dào tā, suǒxìng wǒmen xiān zǒu ba.",
        "english": "Since we can't wait for him, we might as well leave first.",
        "highlight": "索性"
      },
      {
        "chinese": "既然已经迟到了，索性就慢慢走吧。",
        "pinyin": "Jìrán yǐjīng chídào le, suǒxìng jiù mànmàn zǒu ba.",
        "english": "Since we're already late, we might as well just walk slowly.",
        "highlight": "索性"
      },
      {
        "chinese": "他索性辞职不干了。",
        "pinyin": "Tā suǒxìng cízhí bù gàn le.",
        "english": "He simply resigned and quit.",
        "highlight": "索性"
      },
      {
        "chinese": "既然雨下这么大，索性今天就不出门了。",
        "pinyin": "Jìrán yǔ xià zhème dà, suǒxìng jīntiān jiù bù chūmén le.",
        "english": "Since it's raining so heavily, we might as well not go out today.",
        "highlight": "索性"
      },
      {
        "chinese": "与其这样拖着，索性一次性解决。",
        "pinyin": "Yǔqí zhèyàng tuōzhe, suǒxìng yīcìxìng jiějué.",
        "english": "Rather than dragging it on like this, we might as well solve it once and for all.",
        "highlight": "索性"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 索性 for actions that are not decisive or do not involve a sense of 'might as well' or 'simply do it completely.' It implies a certain level of resolution or giving up on other options.",
      "wrongExample": "我索性去买菜。 (Incorrect, unless there's a reason to just go buy groceries decisively)",
      "correctExample": "我没事做，索性去买菜吧。 (Correct, implies 'might as well' go buy groceries since there's nothing else to do)",
      "explanation": "Use 索性 when you decide to take a direct, often extreme, action because other alternatives are not feasible or desirable."
    },
    "exercises":     [
        {
            "id": "hsk4ii-fanzheng-ex1-ex1",
            "type": "fill-blank",
            "question": "他___辞职不干了。",
            "answer": "索性",
            "hint": "索性 + Verb Phrase"
        },
        {
            "id": "hsk4ii-fanzheng-ex1-ex2",
            "type": "fill-blank",
            "question": "他___辞职不干了。",
            "answer": "索性",
            "hint": "索性 + Verb Phrase"
        },
        {
            "id": "hsk4ii-fanzheng-ex1-ex3",
            "type": "fill-blank",
            "question": "既然等不到他，___我们先走吧。",
            "answer": "索性",
            "hint": "索性 + Verb Phrase"
        },
        {
            "id": "hsk4ii-fanzheng-ex1-ex4",
            "type": "fill-blank",
            "question": "既然已经迟到了，___就慢慢走吧。",
            "answer": "索性",
            "hint": "索性 + Verb Phrase"
        },
        {
            "id": "hsk4ii-fanzheng-ex1-ex5",
            "type": "fill-blank",
            "question": "既然等不到他，___我们先走吧。",
            "answer": "索性",
            "hint": "索性 + Verb Phrase"
        },
        {
            "id": "hsk4ii-fanzheng-ex1-ex6",
            "type": "reorder",
            "words": [
                "们",
                "然",
                "等",
                "吧",
                "到",
                "先",
                "索",
                "不",
                "走",
                "既",
                "他",
                "我",
                "性"
            ],
            "answer": "既然等不到他，索性我们先走吧。",
            "hint": "索性 + Verb Phrase"
        },
        {
            "id": "hsk4ii-fanzheng-ex1-ex7",
            "type": "reorder",
            "words": [
                "不",
                "到",
                "性",
                "然",
                "索",
                "等",
                "走",
                "先",
                "们",
                "吧",
                "既",
                "我",
                "他"
            ],
            "answer": "既然等不到他，索性我们先走吧。",
            "hint": "索性 + Verb Phrase"
        },
        {
            "id": "hsk4ii-fanzheng-ex1-ex8",
            "type": "reorder",
            "words": [
                "性",
                "不",
                "索",
                "了",
                "他",
                "辞",
                "干",
                "职"
            ],
            "answer": "他索性辞职不干了。",
            "hint": "索性 + Verb Phrase"
        },
        {
            "id": "hsk4ii-fanzheng-ex1-ex9",
            "type": "reorder",
            "words": [
                "性",
                "他",
                "辞",
                "索",
                "了",
                "干",
                "不",
                "职"
            ],
            "answer": "他索性辞职不干了。",
            "hint": "索性 + Verb Phrase"
        },
        {
            "id": "hsk4ii-fanzheng-ex1-ex10",
            "type": "reorder",
            "words": [
                "吧",
                "性",
                "既",
                "等",
                "索",
                "我",
                "走",
                "到",
                "不",
                "们",
                "然",
                "先",
                "他"
            ],
            "answer": "既然等不到他，索性我们先走吧。",
            "hint": "索性 + Verb Phrase"
        },
        {
            "id": "hsk4ii-fanzheng-ex1-ex11",
            "type": "translate",
            "question": "He simply resigned and quit.",
            "answer": "他索性辞职不干了。",
            "direction": "en-to-cn",
            "hint": "索性 + Verb Phrase"
        },
        {
            "id": "hsk4ii-fanzheng-ex1-ex12",
            "type": "translate",
            "question": "他索性辞职不干了。",
            "answer": "He simply resigned and quit.",
            "direction": "cn-to-en",
            "hint": "索性 + Verb Phrase"
        },
        {
            "id": "hsk4ii-fanzheng-ex1-ex13",
            "type": "translate",
            "question": "Since we're already late, we might as well just walk slowly.",
            "answer": "既然已经迟到了，索性就慢慢走吧。",
            "direction": "en-to-cn",
            "hint": "索性 + Verb Phrase"
        },
        {
            "id": "hsk4ii-fanzheng-ex1-ex14",
            "type": "translate",
            "question": "既然已经迟到了，索性就慢慢走吧。",
            "answer": "Since we're already late, we might as well just walk slowly.",
            "direction": "cn-to-en",
            "hint": "索性 + Verb Phrase"
        },
        {
            "id": "hsk4ii-fanzheng-ex1-ex15",
            "type": "translate",
            "question": "Since we can't wait for him, we might as well leave first.",
            "answer": "既然等不到他，索性我们先走吧。",
            "direction": "en-to-cn",
            "hint": "索性 + Verb Phrase"
        }
    ]
  },
  {
    "id": "hsk4ii-gancui-10",
    "band": "HSK4-II",
    "order": 10,
    "title": "Simply/Just with 干脆 (gāncuì)",
    "subtitle": "Suggesting a straightforward and decisive action",
    "formula": "干脆 + Verb Phrase",
    "explanation": "干脆 is an adverb meaning 'simply,' 'just,' 'straightforwardly,' or 'frankly.' It suggests taking a direct, decisive, and often quick action, especially when faced with hesitation or complications. It can also describe someone's straightforward character.",
    "usageRules": [
      "Placed before the verb phrase.",
      "Often used to suggest a solution or a course of action.",
      "Can imply a sense of impatience with indecision.",
      "Similar to 索性, but 干脆 often emphasizes the directness and simplicity of the action."
    ],
    "examples": [
      {
        "chinese": "既然你不喜欢，干脆就别去了。",
        "pinyin": "Jìrán nǐ bù xǐhuān, gāncuì jiù bié qù le.",
        "english": "Since you don't like it, just don't go.",
        "highlight": "干脆"
      },
      {
        "chinese": "与其浪费时间，干脆早点睡觉。",
        "pinyin": "Yǔqí làngfèi shíjiān, gāncuì zǎo diǎn shuìjiào.",
        "english": "Rather than wasting time, just go to bed early.",
        "highlight": "干脆"
      },
      {
        "chinese": "他说话很干脆，从不拖泥带水。",
        "pinyin": "Tā shuōhuà hěn gāncuì, cóng bù tuō ní dài shuǐ.",
        "english": "He speaks very straightforwardly, never beating around the bush.",
        "highlight": "干脆"
      },
      {
        "chinese": "如果觉得不合适，干脆换一个。",
        "pinyin": "Rúguǒ juéde bù héshì, gāncuì huàn yī ge.",
        "english": "If you feel it's not suitable, just change it.",
        "highlight": "干脆"
      },
      {
        "chinese": "与其在这里等，干脆我们自己去找。",
        "pinyin": "Yǔqí zài zhèlǐ děng, gāncuì wǒmen zìjǐ qù zhǎo.",
        "english": "Rather than waiting here, we might as well go find it ourselves.",
        "highlight": "干脆"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 干脆 for actions that are not direct, decisive, or straightforward. It implies a clear-cut choice or suggestion.",
      "wrongExample": "我干脆考虑一下。 (Incorrect, 'consider' is not a decisive action)",
      "correctExample": "我干脆就这么决定了。 (Correct, 'decide' is a decisive action)",
      "explanation": "Use 干脆 when you want to suggest or describe an action that is simple, direct, and without hesitation."
    },
    "exercises":     [
        {
            "id": "hsk4ii-gancui-10-ex1",
            "type": "fill-blank",
            "question": "他说话很___，从不拖泥带水。",
            "answer": "干脆",
            "hint": "Fill in the blank with '干脆'"
        },
        {
            "id": "hsk4ii-gancui-10-ex2",
            "type": "fill-blank",
            "question": "既然你不喜欢，___就别去了。",
            "answer": "干脆",
            "hint": "Fill in the blank with '干脆'"
        },
        {
            "id": "hsk4ii-gancui-10-ex3",
            "type": "fill-blank",
            "question": "与其浪费时间，___早点睡觉。",
            "answer": "干脆",
            "hint": "Fill in the blank with '干脆'"
        },
        {
            "id": "hsk4ii-gancui-10-ex4",
            "type": "fill-blank",
            "question": "既然你不喜欢，___就别去了。",
            "answer": "干脆",
            "hint": "Fill in the blank with '干脆'"
        },
        {
            "id": "hsk4ii-gancui-10-ex5",
            "type": "fill-blank",
            "question": "他说话很___，从不拖泥带水。",
            "answer": "干脆",
            "hint": "Fill in the blank with '干脆'"
        },
        {
            "id": "hsk4ii-gancui-10-ex1",
            "type": "fill-blank",
            "question": "他说话很___，从不拖泥带水。",
            "answer": "干脆",
            "hint": "Fill in the blank with '干脆'"
        },
        {
            "id": "hsk4ii-gancui-10-ex2",
            "type": "fill-blank",
            "question": "既然你不喜欢，___就别去了。",
            "answer": "干脆",
            "hint": "Fill in the blank with '干脆'"
        },
        {
            "id": "hsk4ii-gancui-10-ex3",
            "type": "fill-blank",
            "question": "与其浪费时间，___早点睡觉。",
            "answer": "干脆",
            "hint": "Fill in the blank with '干脆'"
        },
        {
            "id": "hsk4ii-gancui-10-ex4",
            "type": "fill-blank",
            "question": "既然你不喜欢，___就别去了。",
            "answer": "干脆",
            "hint": "Fill in the blank with '干脆'"
        },
        {
            "id": "hsk4ii-gancui-10-ex5",
            "type": "fill-blank",
            "question": "他说话很___，从不拖泥带水。",
            "answer": "干脆",
            "hint": "Fill in the blank with '干脆'"
        },
        {
            "id": "hsk4ii-gancui-10-ex6",
            "type": "reorder",
            "words": [
                "干脆就别去了",
                ",",
                ".",
                "既然你不喜欢"
            ],
            "answer": "既然你不喜欢，干脆就别去了。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Simply/Just with 干脆 (gāncuì)'"
        },
        {
            "id": "hsk4ii-gancui-10-ex7",
            "type": "reorder",
            "words": [
                "干脆就别去了",
                "既然你不喜欢",
                ",",
                "."
            ],
            "answer": "既然你不喜欢，干脆就别去了。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Simply/Just with 干脆 (gāncuì)'"
        },
        {
            "id": "hsk4ii-gancui-10-ex8",
            "type": "reorder",
            "words": [
                "他说话很干脆",
                ",",
                ".",
                "从不拖泥带水"
            ],
            "answer": "他说话很干脆，从不拖泥带水。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Simply/Just with 干脆 (gāncuì)'"
        },
        {
            "id": "hsk4ii-gancui-10-ex9",
            "type": "reorder",
            "words": [
                "既然你不喜欢",
                ",",
                "干脆就别去了",
                "."
            ],
            "answer": "既然你不喜欢，干脆就别去了。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Simply/Just with 干脆 (gāncuì)'"
        },
        {
            "id": "hsk4ii-gancui-10-ex10",
            "type": "reorder",
            "words": [
                ",",
                "与其浪费时间",
                "干脆早点睡觉",
                "."
            ],
            "answer": "与其浪费时间，干脆早点睡觉。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Simply/Just with 干脆 (gāncuì)'"
        },
        {
            "id": "hsk4ii-gancui-10-ex1",
            "type": "fill-blank",
            "question": "他说话很___，从不拖泥带水。",
            "answer": "干脆",
            "hint": "Fill in the blank with '干脆'"
        },
        {
            "id": "hsk4ii-gancui-10-ex2",
            "type": "fill-blank",
            "question": "既然你不喜欢，___就别去了。",
            "answer": "干脆",
            "hint": "Fill in the blank with '干脆'"
        },
        {
            "id": "hsk4ii-gancui-10-ex3",
            "type": "fill-blank",
            "question": "与其浪费时间，___早点睡觉。",
            "answer": "干脆",
            "hint": "Fill in the blank with '干脆'"
        },
        {
            "id": "hsk4ii-gancui-10-ex4",
            "type": "fill-blank",
            "question": "既然你不喜欢，___就别去了。",
            "answer": "干脆",
            "hint": "Fill in the blank with '干脆'"
        },
        {
            "id": "hsk4ii-gancui-10-ex5",
            "type": "fill-blank",
            "question": "他说话很___，从不拖泥带水。",
            "answer": "干脆",
            "hint": "Fill in the blank with '干脆'"
        },
        {
            "id": "hsk4ii-gancui-10-ex6",
            "type": "reorder",
            "words": [
                "干脆就别去了",
                ",",
                ".",
                "既然你不喜欢"
            ],
            "answer": "既然你不喜欢，干脆就别去了。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Simply/Just with 干脆 (gāncuì)'"
        },
        {
            "id": "hsk4ii-gancui-10-ex7",
            "type": "reorder",
            "words": [
                "干脆就别去了",
                "既然你不喜欢",
                ",",
                "."
            ],
            "answer": "既然你不喜欢，干脆就别去了。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Simply/Just with 干脆 (gāncuì)'"
        },
        {
            "id": "hsk4ii-gancui-10-ex8",
            "type": "reorder",
            "words": [
                "他说话很干脆",
                ",",
                ".",
                "从不拖泥带水"
            ],
            "answer": "他说话很干脆，从不拖泥带水。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Simply/Just with 干脆 (gāncuì)'"
        },
        {
            "id": "hsk4ii-gancui-10-ex9",
            "type": "reorder",
            "words": [
                "既然你不喜欢",
                ",",
                "干脆就别去了",
                "."
            ],
            "answer": "既然你不喜欢，干脆就别去了。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Simply/Just with 干脆 (gāncuì)'"
        },
        {
            "id": "hsk4ii-gancui-10-ex10",
            "type": "reorder",
            "words": [
                ",",
                "与其浪费时间",
                "干脆早点睡觉",
                "."
            ],
            "answer": "与其浪费时间，干脆早点睡觉。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Simply/Just with 干脆 (gāncuì)'"
        },
        {
            "id": "hsk4ii-gancui-10-ex11",
            "type": "translate",
            "question": "既然你不喜欢，干脆就别去了。",
            "answer": "Since you don't like it, just don't go.",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of 'Simply/Just with 干脆 (gāncuì)'"
        },
        {
            "id": "hsk4ii-gancui-10-ex12",
            "type": "translate",
            "question": "He speaks very straightforwardly, never beating around the bush.",
            "answer": "他说话很干脆，从不拖泥带水。",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of 'Simply/Just with 干脆 (gāncuì)'"
        },
        {
            "id": "hsk4ii-gancui-10-ex13",
            "type": "translate",
            "question": "他说话很干脆，从不拖泥带水。",
            "answer": "He speaks very straightforwardly, never beating around the bush.",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of 'Simply/Just with 干脆 (gāncuì)'"
        },
        {
            "id": "hsk4ii-gancui-10-ex14",
            "type": "translate",
            "question": "He speaks very straightforwardly, never beating around the bush.",
            "answer": "他说话很干脆，从不拖泥带水。",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of 'Simply/Just with 干脆 (gāncuì)'"
        },
        {
            "id": "hsk4ii-gancui-10-ex15",
            "type": "translate",
            "question": "Since you don't like it, just don't go.",
            "answer": "既然你不喜欢，干脆就别去了。",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of 'Simply/Just with 干脆 (gāncuì)'"
        }
    ]
  },
  {
    "id": "hsk4ii-juran-11",
    "band": "HSK4-II",
    "order": 11,
    "title": "Expressing Surprise with 居然/竟然 (jūrán/jìngrán)",
    "subtitle": "Indicating an unexpected or surprising outcome",
    "formula": "Subject + 居然/竟然 + Verb Phrase",
    "explanation": "居然 and 竟然 are adverbs used to express surprise or astonishment at an unexpected outcome or situation. They both mean 'unexpectedly,' 'to one's surprise,' or 'actually.' 竟然 is slightly stronger and more formal than 居然.",
    "usageRules": [
      "Placed before the verb or adjective.",
      "Used when the outcome is contrary to expectations or common sense.",
      "Can express both positive and negative surprise.",
      "竟然 is often used for more significant or shocking surprises."
    ],
    "examples": [
      {
        "chinese": "他居然通过了考试！",
        "pinyin": "Tā jūrán tōngguò le kǎoshì!",
        "english": "He actually passed the exam! (Surprise)",
        "highlight": "居然"
      },
      {
        "chinese": "这么简单的问题，他竟然不会。",
        "pinyin": "Zhème jiǎndān de wèntí, tā jìngrán bù huì.",
        "english": "Such a simple question, he surprisingly doesn't know how to do it.",
        "highlight": "竟然"
      },
      {
        "chinese": "我等了他一个小时，他居然没来。",
        "pinyin": "Wǒ děngle tā yī ge xiǎoshí, tā jūrán méi lái.",
        "english": "I waited for him for an hour, and he actually didn't come.",
        "highlight": "居然"
      },
      {
        "chinese": "他竟然敢对老师说谎。",
        "pinyin": "Tā jìngrán gǎn duì lǎoshī shuōhuǎng.",
        "english": "He actually dared to lie to the teacher.",
        "highlight": "竟然"
      },
      {
        "chinese": "这么小的孩子，居然会说这么多语言。",
        "pinyin": "Zhème xiǎo de háizi, jūrán huì shuō zhème duō yǔyán.",
        "english": "Such a young child can actually speak so many languages.",
        "highlight": "居然"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 居然/竟然 for expected outcomes or simple statements of fact. These adverbs are specifically for expressing surprise or disbelief.",
      "wrongExample": "他今天居然来上班了。 (Incorrect, unless it's surprising he came to work)",
      "correctExample": "他生病了，居然还来上班。 (Correct, expresses surprise that he came despite being sick)",
      "explanation": "Use 居然/竟然 only when you want to convey a sense of surprise or astonishment at an unexpected event."
    },
    "exercises":     [
        {
            "id": "hsk4ii-gancui-ex1-ex1",
            "type": "fill-blank",
            "question": "他___通过了考试！",
            "answer": "居然",
            "hint": "Subject + 居然/竟然 + Verb Phrase"
        },
        {
            "id": "hsk4ii-gancui-ex1-ex2",
            "type": "fill-blank",
            "question": "这么简单的问题，他___不会。",
            "answer": "竟然",
            "hint": "Subject + 居然/竟然 + Verb Phrase"
        },
        {
            "id": "hsk4ii-gancui-ex1-ex3",
            "type": "fill-blank",
            "question": "我等了他一个小时，他居然没来。",
            "answer": "竟然",
            "hint": "Subject + 居然/竟然 + Verb Phrase"
        },
        {
            "id": "hsk4ii-gancui-ex1-ex4",
            "type": "fill-blank",
            "question": "这么简单的问题，他___不会。",
            "answer": "竟然",
            "hint": "Subject + 居然/竟然 + Verb Phrase"
        },
        {
            "id": "hsk4ii-gancui-ex1-ex5",
            "type": "fill-blank",
            "question": "我等了他一个小时，他居然没来。",
            "answer": "竟然",
            "hint": "Subject + 居然/竟然 + Verb Phrase"
        },
        {
            "id": "hsk4ii-gancui-ex1-ex6",
            "type": "reorder",
            "words": [
                "然",
                "他",
                "来",
                "等",
                "小",
                "居",
                "一",
                "个",
                "他",
                "了",
                "我",
                "时",
                "没"
            ],
            "answer": "我等了他一个小时，他居然没来。",
            "hint": "Subject + 居然/竟然 + Verb Phrase"
        },
        {
            "id": "hsk4ii-gancui-ex1-ex7",
            "type": "reorder",
            "words": [
                "居",
                "考",
                "了",
                "然",
                "通",
                "他",
                "试",
                "过"
            ],
            "answer": "他居然通过了考试！",
            "hint": "Subject + 居然/竟然 + Verb Phrase"
        },
        {
            "id": "hsk4ii-gancui-ex1-ex8",
            "type": "reorder",
            "words": [
                "他",
                "会",
                "简",
                "的",
                "单",
                "么",
                "题",
                "这",
                "不",
                "然",
                "问",
                "竟"
            ],
            "answer": "这么简单的问题，他竟然不会。",
            "hint": "Subject + 居然/竟然 + Verb Phrase"
        },
        {
            "id": "hsk4ii-gancui-ex1-ex9",
            "type": "reorder",
            "words": [
                "的",
                "然",
                "会",
                "不",
                "这",
                "题",
                "竟",
                "么",
                "他",
                "单",
                "问",
                "简"
            ],
            "answer": "这么简单的问题，他竟然不会。",
            "hint": "Subject + 居然/竟然 + Verb Phrase"
        },
        {
            "id": "hsk4ii-gancui-ex1-ex10",
            "type": "reorder",
            "words": [
                "居",
                "通",
                "了",
                "然",
                "考",
                "试",
                "过",
                "他"
            ],
            "answer": "他居然通过了考试！",
            "hint": "Subject + 居然/竟然 + Verb Phrase"
        },
        {
            "id": "hsk4ii-gancui-ex1-ex11",
            "type": "translate",
            "question": "Such a simple question, he surprisingly doesn't know how to do it.",
            "answer": "这么简单的问题，他竟然不会。",
            "direction": "en-to-cn",
            "hint": "Subject + 居然/竟然 + Verb Phrase"
        },
        {
            "id": "hsk4ii-gancui-ex1-ex12",
            "type": "translate",
            "question": "他居然通过了考试！",
            "answer": "He actually passed the exam! (Surprise)",
            "direction": "cn-to-en",
            "hint": "Subject + 居然/竟然 + Verb Phrase"
        },
        {
            "id": "hsk4ii-gancui-ex1-ex13",
            "type": "translate",
            "question": "Such a simple question, he surprisingly doesn't know how to do it.",
            "answer": "这么简单的问题，他竟然不会。",
            "direction": "en-to-cn",
            "hint": "Subject + 居然/竟然 + Verb Phrase"
        },
        {
            "id": "hsk4ii-gancui-ex1-ex14",
            "type": "translate",
            "question": "这么简单的问题，他竟然不会。",
            "answer": "Such a simple question, he surprisingly doesn't know how to do it.",
            "direction": "cn-to-en",
            "hint": "Subject + 居然/竟然 + Verb Phrase"
        },
        {
            "id": "hsk4ii-gancui-ex1-ex15",
            "type": "translate",
            "question": "I waited for him for an hour, and he actually didn't come.",
            "answer": "我等了他一个小时，他居然没来。",
            "direction": "en-to-cn",
            "hint": "Subject + 居然/竟然 + Verb Phrase"
        }
    ]
  },
  {
    "id": "hsk4ii-guoran-12",
    "band": "HSK4-II",
    "order": 12,
    "title": "As Expected with 果然 (guǒrán)",
    "subtitle": "Confirming a prediction or expectation",
    "formula": "果然 + Clause",
    "explanation": "果然 is an adverb meaning 'as expected,' 'sure enough,' or 'indeed.' It is used to confirm that a prediction, expectation, or previous statement has turned out to be true. It expresses a sense of 'I knew it' or 'it happened just as I thought.'",
    "usageRules": [
      "Placed at the beginning of a clause or before the verb/adjective.",
      "Used when an outcome matches a prior judgment or prediction.",
      "Can express a sense of satisfaction or validation.",
      "Often used in conjunction with 没想到 (méi xiǎngdào) 'didn't expect' to highlight the contrast."
    ],
    "examples": [
      {
        "chinese": "我猜他会来，果然他来了。",
        "pinyin": "Wǒ cāi tā huì lái, guǒrán tā lái le.",
        "english": "I guessed he would come, and sure enough, he came.",
        "highlight": "果然"
      },
      {
        "chinese": "天气预报说今天有雨，果然下雨了。",
        "pinyin": "Tiānqì yùbào shuō jīntiān yǒu yǔ, guǒrán xià yǔ le.",
        "english": "The weather forecast said it would rain today, and indeed it rained.",
        "highlight": "果然"
      },
      {
        "chinese": "他果然是个说到做到的人。",
        "pinyin": "Tā guǒrán shì ge shuō dào zuò dào de rén.",
        "english": "He is indeed a person who keeps his word.",
        "highlight": "果然"
      },
      {
        "chinese": "老师说他很聪明，果然这次考试得了第一名。",
        "pinyin": "Lǎoshī shuō tā hěn cōngmíng, guǒrán zhè cì kǎoshì déle dì yī míng.",
        "english": "The teacher said he was smart, and sure enough, he got first place in this exam.",
        "highlight": "果然"
      },
      {
        "chinese": "他果然没有让我失望。",
        "pinyin": "Tā guǒrán méiyǒu ràng wǒ shīwàng.",
        "english": "He really didn't disappoint me, as expected.",
        "highlight": "果然"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 果然 when there was no prior expectation or prediction. 果然 specifically confirms a previous thought or forecast.",
      "wrongExample": "今天果然是晴天。 (Incorrect, unless you predicted it would be sunny)",
      "correctExample": "我希望下雨，果然是晴天。 (Correct, confirms a hope/prediction)",
      "explanation": "Use 果然 to express that something happened just as you or someone else expected or predicted."
    },
    "exercises":     [
        {
            "id": "hsk4ii-guoran-12-ex1",
            "type": "fill-blank",
            "question": "我猜他会来，___他来了。",
            "answer": "果然",
            "hint": "Fill in the blank with '果然'"
        },
        {
            "id": "hsk4ii-guoran-12-ex2",
            "type": "fill-blank",
            "question": "我猜他会来，___他来了。",
            "answer": "果然",
            "hint": "Fill in the blank with '果然'"
        },
        {
            "id": "hsk4ii-guoran-12-ex3",
            "type": "fill-blank",
            "question": "他___是个说到做到的人。",
            "answer": "果然",
            "hint": "Fill in the blank with '果然'"
        },
        {
            "id": "hsk4ii-guoran-12-ex4",
            "type": "fill-blank",
            "question": "他___是个说到做到的人。",
            "answer": "果然",
            "hint": "Fill in the blank with '果然'"
        },
        {
            "id": "hsk4ii-guoran-12-ex5",
            "type": "fill-blank",
            "question": "他___是个说到做到的人。",
            "answer": "果然",
            "hint": "Fill in the blank with '果然'"
        },
        {
            "id": "hsk4ii-guoran-12-ex1",
            "type": "fill-blank",
            "question": "我猜他会来，___他来了。",
            "answer": "果然",
            "hint": "Fill in the blank with '果然'"
        },
        {
            "id": "hsk4ii-guoran-12-ex2",
            "type": "fill-blank",
            "question": "我猜他会来，___他来了。",
            "answer": "果然",
            "hint": "Fill in the blank with '果然'"
        },
        {
            "id": "hsk4ii-guoran-12-ex3",
            "type": "fill-blank",
            "question": "他___是个说到做到的人。",
            "answer": "果然",
            "hint": "Fill in the blank with '果然'"
        },
        {
            "id": "hsk4ii-guoran-12-ex4",
            "type": "fill-blank",
            "question": "他___是个说到做到的人。",
            "answer": "果然",
            "hint": "Fill in the blank with '果然'"
        },
        {
            "id": "hsk4ii-guoran-12-ex5",
            "type": "fill-blank",
            "question": "他___是个说到做到的人。",
            "answer": "果然",
            "hint": "Fill in the blank with '果然'"
        },
        {
            "id": "hsk4ii-guoran-12-ex6",
            "type": "reorder",
            "words": [
                "他果然是个说到做到的人",
                "."
            ],
            "answer": "他果然是个说到做到的人。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'As Expected with 果然 (guǒrán)'"
        },
        {
            "id": "hsk4ii-guoran-12-ex7",
            "type": "reorder",
            "words": [
                "我猜他会来",
                "果然他来了",
                ".",
                ","
            ],
            "answer": "我猜他会来，果然他来了。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'As Expected with 果然 (guǒrán)'"
        },
        {
            "id": "hsk4ii-guoran-12-ex8",
            "type": "reorder",
            "words": [
                "果然他来了",
                ",",
                ".",
                "我猜他会来"
            ],
            "answer": "我猜他会来，果然他来了。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'As Expected with 果然 (guǒrán)'"
        },
        {
            "id": "hsk4ii-guoran-12-ex9",
            "type": "reorder",
            "words": [
                "他果然是个说到做到的人",
                "."
            ],
            "answer": "他果然是个说到做到的人。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'As Expected with 果然 (guǒrán)'"
        },
        {
            "id": "hsk4ii-guoran-12-ex10",
            "type": "reorder",
            "words": [
                "他果然是个说到做到的人",
                "."
            ],
            "answer": "他果然是个说到做到的人。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'As Expected with 果然 (guǒrán)'"
        },
        {
            "id": "hsk4ii-guoran-12-ex1",
            "type": "fill-blank",
            "question": "我猜他会来，___他来了。",
            "answer": "果然",
            "hint": "Fill in the blank with '果然'"
        },
        {
            "id": "hsk4ii-guoran-12-ex2",
            "type": "fill-blank",
            "question": "我猜他会来，___他来了。",
            "answer": "果然",
            "hint": "Fill in the blank with '果然'"
        },
        {
            "id": "hsk4ii-guoran-12-ex3",
            "type": "fill-blank",
            "question": "他___是个说到做到的人。",
            "answer": "果然",
            "hint": "Fill in the blank with '果然'"
        },
        {
            "id": "hsk4ii-guoran-12-ex4",
            "type": "fill-blank",
            "question": "他___是个说到做到的人。",
            "answer": "果然",
            "hint": "Fill in the blank with '果然'"
        },
        {
            "id": "hsk4ii-guoran-12-ex5",
            "type": "fill-blank",
            "question": "他___是个说到做到的人。",
            "answer": "果然",
            "hint": "Fill in the blank with '果然'"
        },
        {
            "id": "hsk4ii-guoran-12-ex6",
            "type": "reorder",
            "words": [
                "他果然是个说到做到的人",
                "."
            ],
            "answer": "他果然是个说到做到的人。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'As Expected with 果然 (guǒrán)'"
        },
        {
            "id": "hsk4ii-guoran-12-ex7",
            "type": "reorder",
            "words": [
                "我猜他会来",
                "果然他来了",
                ".",
                ","
            ],
            "answer": "我猜他会来，果然他来了。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'As Expected with 果然 (guǒrán)'"
        },
        {
            "id": "hsk4ii-guoran-12-ex8",
            "type": "reorder",
            "words": [
                "果然他来了",
                ",",
                ".",
                "我猜他会来"
            ],
            "answer": "我猜他会来，果然他来了。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'As Expected with 果然 (guǒrán)'"
        },
        {
            "id": "hsk4ii-guoran-12-ex9",
            "type": "reorder",
            "words": [
                "他果然是个说到做到的人",
                "."
            ],
            "answer": "他果然是个说到做到的人。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'As Expected with 果然 (guǒrán)'"
        },
        {
            "id": "hsk4ii-guoran-12-ex10",
            "type": "reorder",
            "words": [
                "他果然是个说到做到的人",
                "."
            ],
            "answer": "他果然是个说到做到的人。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'As Expected with 果然 (guǒrán)'"
        },
        {
            "id": "hsk4ii-guoran-12-ex11",
            "type": "translate",
            "question": "天气预报说今天有雨，果然下雨了。",
            "answer": "The weather forecast said it would rain today, and indeed it rained.",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of 'As Expected with 果然 (guǒrán)'"
        },
        {
            "id": "hsk4ii-guoran-12-ex12",
            "type": "translate",
            "question": "我猜他会来，果然他来了。",
            "answer": "I guessed he would come, and sure enough, he came.",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of 'As Expected with 果然 (guǒrán)'"
        },
        {
            "id": "hsk4ii-guoran-12-ex13",
            "type": "translate",
            "question": "He is indeed a person who keeps his word.",
            "answer": "他果然是个说到做到的人。",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of 'As Expected with 果然 (guǒrán)'"
        },
        {
            "id": "hsk4ii-guoran-12-ex14",
            "type": "translate",
            "question": "I guessed he would come, and sure enough, he came.",
            "answer": "我猜他会来，果然他来了。",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of 'As Expected with 果然 (guǒrán)'"
        },
        {
            "id": "hsk4ii-guoran-12-ex15",
            "type": "translate",
            "question": "The weather forecast said it would rain today, and indeed it rained.",
            "answer": "天气预报说今天有雨，果然下雨了。",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of 'As Expected with 果然 (guǒrán)'"
        }
    ]
  },
  {
    "id": "hsk4ii-xingkui-13",
    "band": "HSK4-II",
    "order": 13,
    "title": "Fortunately/Luckily with 幸亏/幸好 (xìngkuī/xìnghǎo)",
    "subtitle": "Expressing gratitude for a fortunate outcome",
    "formula": "幸亏/幸好 + Clause, 否则/不然 + Clause",
    "explanation": "幸亏 and 幸好 both mean 'fortunately' or 'luckily.' They are used to express gratitude or relief that a bad situation was avoided or that a good outcome occurred, often implying that things could have been worse. 幸亏 is slightly more common in spoken Chinese.",
    "usageRules": [
      "Placed at the beginning of a clause, often followed by 否则 (fǒuzé) or 不然 (bùrán) to state the negative consequence that was avoided.",
      "Used to highlight a fortunate turn of events.",
      "Can express a sense of relief."
    ],
    "examples": [
      {
        "chinese": "幸亏你提醒我，否则我就忘了。",
        "pinyin": "Xìngkuī nǐ tíxǐng wǒ, fǒuzé wǒ jiù wàngle.",
        "english": "Luckily you reminded me, otherwise I would have forgotten.",
        "highlight": "幸亏"
      },
      {
        "chinese": "幸好我带了伞，不然就淋湿了。",
        "pinyin": "Xìnghǎo wǒ dàile sǎn, bùrán jiù lín shī le.",
        "english": "Fortunately I brought an umbrella, otherwise I would have gotten wet.",
        "highlight": "幸好"
      },
      {
        "chinese": "幸亏他及时赶到，才避免了一场事故。",
        "pinyin": "Xìngkuī tā jíshí gǎndào, cái bìmiǎnle yī chǎng shìgù.",
        "english": "Fortunately he arrived in time, which avoided an accident.",
        "highlight": "幸亏"
      },
      {
        "chinese": "幸好你没去，那里发生了意外。",
        "pinyin": "Xìnghǎo nǐ méi qù, nàlǐ fāshēngle yìwài.",
        "english": "Luckily you didn't go, an accident happened there.",
        "highlight": "幸好"
      },
      {
        "chinese": "幸亏有你的帮助，我才能顺利完成。",
        "pinyin": "Xìngkuī yǒu nǐ de bāngzhù, wǒ cáinéng shùnlì wánchéng.",
        "english": "Fortunately with your help, I was able to complete it smoothly.",
        "highlight": "幸亏"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 幸亏/幸好 when there was no potential negative outcome to be avoided. These terms specifically highlight a fortunate escape or a positive turn from a potentially bad situation.",
      "wrongExample": "幸亏今天天气很好。 (Incorrect, unless you expected bad weather)",
      "correctExample": "幸亏今天天气很好，我们才能出去玩。 (Correct, implies that bad weather would have prevented going out)",
      "explanation": "Use 幸亏/幸好 to express relief or gratitude for a fortunate event that prevented a worse outcome."
    },
    "exercises":     [
        {
            "id": "hsk4ii-guoran-ex1-ex1",
            "type": "fill-blank",
            "question": "___你提醒我，否则我就忘了。",
            "answer": "幸亏",
            "hint": "幸亏/幸好 + Clause, 否则/不然 + Clause"
        },
        {
            "id": "hsk4ii-guoran-ex1-ex2",
            "type": "fill-blank",
            "question": "幸亏他及时赶到，才避免了一场事故。",
            "answer": "幸好",
            "hint": "幸亏/幸好 + Clause, 否则/不然 + Clause"
        },
        {
            "id": "hsk4ii-guoran-ex1-ex3",
            "type": "fill-blank",
            "question": "___我带了伞，不然就淋湿了。",
            "answer": "幸好",
            "hint": "幸亏/幸好 + Clause, 否则/不然 + Clause"
        },
        {
            "id": "hsk4ii-guoran-ex1-ex4",
            "type": "fill-blank",
            "question": "幸亏他及时赶到，才避免了一场事故。",
            "answer": "幸好",
            "hint": "幸亏/幸好 + Clause, 否则/不然 + Clause"
        },
        {
            "id": "hsk4ii-guoran-ex1-ex5",
            "type": "fill-blank",
            "question": "___我带了伞，不然就淋湿了。",
            "answer": "幸好",
            "hint": "幸亏/幸好 + Clause, 否则/不然 + Clause"
        },
        {
            "id": "hsk4ii-guoran-ex1-ex6",
            "type": "reorder",
            "words": [
                "幸",
                "到",
                "时",
                "亏",
                "避",
                "赶",
                "故",
                "了",
                "免",
                "事",
                "才",
                "及",
                "场",
                "他",
                "一"
            ],
            "answer": "幸亏他及时赶到，才避免了一场事故。",
            "hint": "幸亏/幸好 + Clause, 否则/不然 + Clause"
        },
        {
            "id": "hsk4ii-guoran-ex1-ex7",
            "type": "reorder",
            "words": [
                "事",
                "亏",
                "故",
                "才",
                "幸",
                "到",
                "及",
                "了",
                "他",
                "避",
                "免",
                "时",
                "一",
                "赶",
                "场"
            ],
            "answer": "幸亏他及时赶到，才避免了一场事故。",
            "hint": "幸亏/幸好 + Clause, 否则/不然 + Clause"
        },
        {
            "id": "hsk4ii-guoran-ex1-ex8",
            "type": "reorder",
            "words": [
                "伞",
                "不",
                "淋",
                "了",
                "带",
                "了",
                "我",
                "就",
                "然",
                "好",
                "幸",
                "湿"
            ],
            "answer": "幸好我带了伞，不然就淋湿了。",
            "hint": "幸亏/幸好 + Clause, 否则/不然 + Clause"
        },
        {
            "id": "hsk4ii-guoran-ex1-ex9",
            "type": "reorder",
            "words": [
                "幸",
                "我",
                "伞",
                "带",
                "就",
                "湿",
                "了",
                "淋",
                "然",
                "了",
                "好",
                "不"
            ],
            "answer": "幸好我带了伞，不然就淋湿了。",
            "hint": "幸亏/幸好 + Clause, 否则/不然 + Clause"
        },
        {
            "id": "hsk4ii-guoran-ex1-ex10",
            "type": "reorder",
            "words": [
                "湿",
                "好",
                "伞",
                "了",
                "然",
                "幸",
                "了",
                "不",
                "带",
                "就",
                "淋",
                "我"
            ],
            "answer": "幸好我带了伞，不然就淋湿了。",
            "hint": "幸亏/幸好 + Clause, 否则/不然 + Clause"
        },
        {
            "id": "hsk4ii-guoran-ex1-ex11",
            "type": "translate",
            "question": "Fortunately I brought an umbrella, otherwise I would have gotten wet.",
            "answer": "幸好我带了伞，不然就淋湿了。",
            "direction": "en-to-cn",
            "hint": "幸亏/幸好 + Clause, 否则/不然 + Clause"
        },
        {
            "id": "hsk4ii-guoran-ex1-ex12",
            "type": "translate",
            "question": "幸亏你提醒我，否则我就忘了。",
            "answer": "Luckily you reminded me, otherwise I would have forgotten.",
            "direction": "cn-to-en",
            "hint": "幸亏/幸好 + Clause, 否则/不然 + Clause"
        },
        {
            "id": "hsk4ii-guoran-ex1-ex13",
            "type": "translate",
            "question": "Fortunately I brought an umbrella, otherwise I would have gotten wet.",
            "answer": "幸好我带了伞，不然就淋湿了。",
            "direction": "en-to-cn",
            "hint": "幸亏/幸好 + Clause, 否则/不然 + Clause"
        },
        {
            "id": "hsk4ii-guoran-ex1-ex14",
            "type": "translate",
            "question": "幸亏你提醒我，否则我就忘了。",
            "answer": "Luckily you reminded me, otherwise I would have forgotten.",
            "direction": "cn-to-en",
            "hint": "幸亏/幸好 + Clause, 否则/不然 + Clause"
        },
        {
            "id": "hsk4ii-guoran-ex1-ex15",
            "type": "translate",
            "question": "Luckily you reminded me, otherwise I would have forgotten.",
            "answer": "幸亏你提醒我，否则我就忘了。",
            "direction": "en-to-cn",
            "hint": "幸亏/幸好 + Clause, 否则/不然 + Clause"
        }
    ]
  },
  {
    "id": "hsk4ii-haozai-14",
    "band": "HSK4-II",
    "order": 14,
    "title": "Fortunately/Luckily with 好在 (hǎozài)",
    "subtitle": "Similar to 幸亏/幸好, emphasizing a redeeming factor",
    "formula": "..., 好在 + Clause",
    "explanation": "好在 is an adverb meaning 'fortunately' or 'luckily.' It is similar to 幸亏/幸好, but often emphasizes a redeeming factor or a positive aspect within an otherwise difficult or negative situation. It highlights that despite some problems, there's a saving grace.",
    "usageRules": [
      "Placed at the beginning of a clause, often after describing a negative situation.",
      "Used to introduce a fortunate circumstance that mitigates a problem.",
      "Can express a sense of relief or comfort."
    ],
    "examples": [
      {
        "chinese": "虽然迷路了，好在手机还有电。",
        "pinyin": "Suīrán mílù le, hǎozài shǒujī hái yǒu diàn.",
        "english": "Although we got lost, luckily the phone still has power.",
        "highlight": "好在"
      },
      {
        "chinese": "工作很辛苦，好在同事们都很友善。",
        "pinyin": "Gōngzuò hěn xīnkǔ, hǎozài tóngshìmen dōu hěn yǒushàn.",
        "english": "The work is very hard, but fortunately, the colleagues are all very friendly.",
        "highlight": "好在"
      },
      {
        "chinese": "考试没考好，好在还有下次机会。",
        "pinyin": "Kǎoshì méi kǎo hǎo, hǎozài hái yǒu xià cì jīhuì.",
        "english": "I didn't do well on the exam, but luckily there's still a next chance.",
        "highlight": "好在"
      },
      {
        "chinese": "虽然下雨了，好在雨不大。",
        "pinyin": "Suīrán xià yǔ le, hǎozài yǔ bù dà.",
        "english": "Although it rained, luckily the rain wasn't heavy.",
        "highlight": "好在"
      },
      {
        "chinese": "他虽然迟到了，好在会议还没开始。",
        "pinyin": "Tā suīrán chídào le, hǎozài huìyì hái méi kāishǐ.",
        "english": "Although he was late, fortunately the meeting hadn't started yet.",
        "highlight": "好在"
      }
    ],
    "commonMistake": {
      "description": "好在 is often used to introduce a positive aspect that alleviates a negative situation. A common mistake is to use it without a preceding negative context. It implies a 'saving grace' or a 'silver lining.'",
      "wrongExample": "好在今天天气很好。 (Incorrect, no negative situation to alleviate)",
      "correctExample": "本来担心下雨，好在今天天气很好。 (Correct, the good weather alleviates the worry of rain)",
      "explanation": "Ensure there's a preceding negative or potentially negative situation that '好在' then mitigates with a fortunate circumstance."
    },
    "exercises":     [
        {
            "id": "hsk4ii-haozai-14-ex1",
            "type": "fill-blank",
            "question": "虽然迷路了，___手机还有电。",
            "answer": "好在",
            "hint": "Fill in the blank with '好在'"
        },
        {
            "id": "hsk4ii-haozai-14-ex2",
            "type": "fill-blank",
            "question": "工作很辛苦，___同事们都很友善。",
            "answer": "好在",
            "hint": "Fill in the blank with '好在'"
        },
        {
            "id": "hsk4ii-haozai-14-ex3",
            "type": "fill-blank",
            "question": "虽然迷路了，___手机还有电。",
            "answer": "好在",
            "hint": "Fill in the blank with '好在'"
        },
        {
            "id": "hsk4ii-haozai-14-ex4",
            "type": "fill-blank",
            "question": "考试没考好，___还有下次机会。",
            "answer": "好在",
            "hint": "Fill in the blank with '好在'"
        },
        {
            "id": "hsk4ii-haozai-14-ex5",
            "type": "fill-blank",
            "question": "工作很辛苦，___同事们都很友善。",
            "answer": "好在",
            "hint": "Fill in the blank with '好在'"
        },
        {
            "id": "hsk4ii-haozai-14-ex1",
            "type": "fill-blank",
            "question": "虽然迷路了，___手机还有电。",
            "answer": "好在",
            "hint": "Fill in the blank with '好在'"
        },
        {
            "id": "hsk4ii-haozai-14-ex2",
            "type": "fill-blank",
            "question": "工作很辛苦，___同事们都很友善。",
            "answer": "好在",
            "hint": "Fill in the blank with '好在'"
        },
        {
            "id": "hsk4ii-haozai-14-ex3",
            "type": "fill-blank",
            "question": "虽然迷路了，___手机还有电。",
            "answer": "好在",
            "hint": "Fill in the blank with '好在'"
        },
        {
            "id": "hsk4ii-haozai-14-ex4",
            "type": "fill-blank",
            "question": "考试没考好，___还有下次机会。",
            "answer": "好在",
            "hint": "Fill in the blank with '好在'"
        },
        {
            "id": "hsk4ii-haozai-14-ex5",
            "type": "fill-blank",
            "question": "工作很辛苦，___同事们都很友善。",
            "answer": "好在",
            "hint": "Fill in the blank with '好在'"
        },
        {
            "id": "hsk4ii-haozai-14-ex6",
            "type": "reorder",
            "words": [
                ".",
                ",",
                "工作很辛苦",
                "好在同事们都很友善"
            ],
            "answer": "工作很辛苦，好在同事们都很友善。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Fortunately/Luckily with 好在 (hǎozài)'"
        },
        {
            "id": "hsk4ii-haozai-14-ex7",
            "type": "reorder",
            "words": [
                "好在还有下次机会",
                ".",
                ",",
                "考试没考好"
            ],
            "answer": "考试没考好，好在还有下次机会。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Fortunately/Luckily with 好在 (hǎozài)'"
        },
        {
            "id": "hsk4ii-haozai-14-ex8",
            "type": "reorder",
            "words": [
                "工作很辛苦",
                ",",
                "好在同事们都很友善",
                "."
            ],
            "answer": "工作很辛苦，好在同事们都很友善。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Fortunately/Luckily with 好在 (hǎozài)'"
        },
        {
            "id": "hsk4ii-haozai-14-ex9",
            "type": "reorder",
            "words": [
                "好在同事们都很友善",
                "工作很辛苦",
                ".",
                ","
            ],
            "answer": "工作很辛苦，好在同事们都很友善。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Fortunately/Luckily with 好在 (hǎozài)'"
        },
        {
            "id": "hsk4ii-haozai-14-ex10",
            "type": "reorder",
            "words": [
                "考试没考好",
                ",",
                "好在还有下次机会",
                "."
            ],
            "answer": "考试没考好，好在还有下次机会。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Fortunately/Luckily with 好在 (hǎozài)'"
        },
        {
            "id": "hsk4ii-haozai-14-ex1",
            "type": "fill-blank",
            "question": "虽然迷路了，___手机还有电。",
            "answer": "好在",
            "hint": "Fill in the blank with '好在'"
        },
        {
            "id": "hsk4ii-haozai-14-ex2",
            "type": "fill-blank",
            "question": "工作很辛苦，___同事们都很友善。",
            "answer": "好在",
            "hint": "Fill in the blank with '好在'"
        },
        {
            "id": "hsk4ii-haozai-14-ex3",
            "type": "fill-blank",
            "question": "虽然迷路了，___手机还有电。",
            "answer": "好在",
            "hint": "Fill in the blank with '好在'"
        },
        {
            "id": "hsk4ii-haozai-14-ex4",
            "type": "fill-blank",
            "question": "考试没考好，___还有下次机会。",
            "answer": "好在",
            "hint": "Fill in the blank with '好在'"
        },
        {
            "id": "hsk4ii-haozai-14-ex5",
            "type": "fill-blank",
            "question": "工作很辛苦，___同事们都很友善。",
            "answer": "好在",
            "hint": "Fill in the blank with '好在'"
        },
        {
            "id": "hsk4ii-haozai-14-ex6",
            "type": "reorder",
            "words": [
                ".",
                ",",
                "工作很辛苦",
                "好在同事们都很友善"
            ],
            "answer": "工作很辛苦，好在同事们都很友善。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Fortunately/Luckily with 好在 (hǎozài)'"
        },
        {
            "id": "hsk4ii-haozai-14-ex7",
            "type": "reorder",
            "words": [
                "好在还有下次机会",
                ".",
                ",",
                "考试没考好"
            ],
            "answer": "考试没考好，好在还有下次机会。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Fortunately/Luckily with 好在 (hǎozài)'"
        },
        {
            "id": "hsk4ii-haozai-14-ex8",
            "type": "reorder",
            "words": [
                "工作很辛苦",
                ",",
                "好在同事们都很友善",
                "."
            ],
            "answer": "工作很辛苦，好在同事们都很友善。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Fortunately/Luckily with 好在 (hǎozài)'"
        },
        {
            "id": "hsk4ii-haozai-14-ex9",
            "type": "reorder",
            "words": [
                "好在同事们都很友善",
                "工作很辛苦",
                ".",
                ","
            ],
            "answer": "工作很辛苦，好在同事们都很友善。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Fortunately/Luckily with 好在 (hǎozài)'"
        },
        {
            "id": "hsk4ii-haozai-14-ex10",
            "type": "reorder",
            "words": [
                "考试没考好",
                ",",
                "好在还有下次机会",
                "."
            ],
            "answer": "考试没考好，好在还有下次机会。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Fortunately/Luckily with 好在 (hǎozài)'"
        },
        {
            "id": "hsk4ii-haozai-14-ex11",
            "type": "translate",
            "question": "The work is very hard, but fortunately, the colleagues are all very friendly.",
            "answer": "工作很辛苦，好在同事们都很友善。",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of 'Fortunately/Luckily with 好在 (hǎozài)'"
        },
        {
            "id": "hsk4ii-haozai-14-ex12",
            "type": "translate",
            "question": "虽然迷路了，好在手机还有电。",
            "answer": "Although we got lost, luckily the phone still has power.",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of 'Fortunately/Luckily with 好在 (hǎozài)'"
        },
        {
            "id": "hsk4ii-haozai-14-ex13",
            "type": "translate",
            "question": "工作很辛苦，好在同事们都很友善。",
            "answer": "The work is very hard, but fortunately, the colleagues are all very friendly.",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of 'Fortunately/Luckily with 好在 (hǎozài)'"
        },
        {
            "id": "hsk4ii-haozai-14-ex14",
            "type": "translate",
            "question": "考试没考好，好在还有下次机会。",
            "answer": "I didn't do well on the exam, but luckily there's still a next chance.",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of 'Fortunately/Luckily with 好在 (hǎozài)'"
        },
        {
            "id": "hsk4ii-haozai-14-ex15",
            "type": "translate",
            "question": "I didn't do well on the exam, but luckily there's still a next chance.",
            "answer": "考试没考好，好在还有下次机会。",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of 'Fortunately/Luckily with 好在 (hǎozài)'"
        }
    ]
  },
  {
    "id": "hsk4ii-qishi-15",
    "band": "HSK4-II",
    "order": 15,
    "title": "Actually/In Fact with 其实 (qíshí)",
    "subtitle": "Revealing the truth or a different perspective",
    "formula": "其实 + Clause",
    "explanation": "其实 is an adverb meaning 'actually,' 'in fact,' or 'as a matter of fact.' It is used to introduce a statement that reveals the truth, a different perspective, or something contrary to what was previously thought or said. It often clarifies a misunderstanding.",
    "usageRules": [
      "Placed at the beginning of a clause.",
      "Used to correct a misconception or provide additional information.",
      "Can introduce a contrast between appearance and reality.",
      "Often implies that the speaker knows more than others or is revealing a hidden truth."
    ],
    "examples": [
      {
        "chinese": "他看起来很严肃，其实人很好。",
        "pinyin": "Tā kàn qǐlái hěn yánsù, qíshí rén hěn hǎo.",
        "english": "He looks serious, but actually he's a very nice person.",
        "highlight": "其实"
      },
      {
        "chinese": "我以为很难，其实很简单。",
        "pinyin": "Wǒ yǐwéi hěn nán, qíshí hěn jiǎndān.",
        "english": "I thought it was difficult, but actually it's very simple.",
        "highlight": "其实"
      },
      {
        "chinese": "他嘴上说不在乎，其实心里很在意。",
        "pinyin": "Tā zuǐ shàng shuō bù zàihu, qíshí xīnli hěn zàiyì.",
        "english": "He says he doesn't care, but actually he cares a lot inside.",
        "highlight": "其实"
      },
      {
        "chinese": "很多人都误解了他，其实他是个好人。",
        "pinyin": "Hěn duō rén dōu wùjiěle tā, qíshí tā shì ge hǎorén.",
        "english": "Many people misunderstood him, but actually he is a good person.",
        "highlight": "其实"
      },
      {
        "chinese": "你不用担心，其实没什么大不了的。",
        "pinyin": "Nǐ bù yòng dānxīn, qíshí méishénme dàbùliǎo de.",
        "english": "You don't need to worry, actually it's nothing serious.",
        "highlight": "其实"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 其实 when simply stating a fact without any preceding assumption or appearance to contrast with. 其实 implies a revelation or correction.",
      "wrongExample": "其实我喜欢吃苹果。 (Incorrect, unless someone thought you didn't like apples)",
      "correctExample": "你以为我不喜欢苹果，其实我喜欢吃苹果。 (Correct, corrects a misconception)",
      "explanation": "Use 其实 to introduce a truth that contrasts with a previous assumption, appearance, or common belief."
    },
    "exercises":     [
        {
            "id": "hsk4ii-haozai-ex1-ex1",
            "type": "fill-blank",
            "question": "他嘴上说不在乎，___心里很在意。",
            "answer": "其实",
            "hint": "其实 + Clause"
        },
        {
            "id": "hsk4ii-haozai-ex1-ex2",
            "type": "fill-blank",
            "question": "我以为很难，___很简单。",
            "answer": "其实",
            "hint": "其实 + Clause"
        },
        {
            "id": "hsk4ii-haozai-ex1-ex3",
            "type": "fill-blank",
            "question": "他嘴上说不在乎，___心里很在意。",
            "answer": "其实",
            "hint": "其实 + Clause"
        },
        {
            "id": "hsk4ii-haozai-ex1-ex4",
            "type": "fill-blank",
            "question": "我以为很难，___很简单。",
            "answer": "其实",
            "hint": "其实 + Clause"
        },
        {
            "id": "hsk4ii-haozai-ex1-ex5",
            "type": "fill-blank",
            "question": "我以为很难，___很简单。",
            "answer": "其实",
            "hint": "其实 + Clause"
        },
        {
            "id": "hsk4ii-haozai-ex1-ex6",
            "type": "reorder",
            "words": [
                "他",
                "起",
                "肃",
                "很",
                "好",
                "严",
                "看",
                "很",
                "其",
                "实",
                "来",
                "人"
            ],
            "answer": "他看起来很严肃，其实人很好。",
            "hint": "其实 + Clause"
        },
        {
            "id": "hsk4ii-haozai-ex1-ex7",
            "type": "reorder",
            "words": [
                "很",
                "简",
                "为",
                "实",
                "难",
                "单",
                "以",
                "很",
                "我",
                "其"
            ],
            "answer": "我以为很难，其实很简单。",
            "hint": "其实 + Clause"
        },
        {
            "id": "hsk4ii-haozai-ex1-ex8",
            "type": "reorder",
            "words": [
                "不",
                "在",
                "他",
                "很",
                "乎",
                "在",
                "心",
                "说",
                "意",
                "里",
                "实",
                "上",
                "其",
                "嘴"
            ],
            "answer": "他嘴上说不在乎，其实心里很在意。",
            "hint": "其实 + Clause"
        },
        {
            "id": "hsk4ii-haozai-ex1-ex9",
            "type": "reorder",
            "words": [
                "严",
                "很",
                "起",
                "人",
                "实",
                "他",
                "好",
                "肃",
                "其",
                "来",
                "很",
                "看"
            ],
            "answer": "他看起来很严肃，其实人很好。",
            "hint": "其实 + Clause"
        },
        {
            "id": "hsk4ii-haozai-ex1-ex10",
            "type": "reorder",
            "words": [
                "实",
                "里",
                "乎",
                "嘴",
                "在",
                "在",
                "心",
                "其",
                "说",
                "不",
                "意",
                "他",
                "很",
                "上"
            ],
            "answer": "他嘴上说不在乎，其实心里很在意。",
            "hint": "其实 + Clause"
        },
        {
            "id": "hsk4ii-haozai-ex1-ex11",
            "type": "translate",
            "question": "I thought it was difficult, but actually it's very simple.",
            "answer": "我以为很难，其实很简单。",
            "direction": "en-to-cn",
            "hint": "其实 + Clause"
        },
        {
            "id": "hsk4ii-haozai-ex1-ex12",
            "type": "translate",
            "question": "我以为很难，其实很简单。",
            "answer": "I thought it was difficult, but actually it's very simple.",
            "direction": "cn-to-en",
            "hint": "其实 + Clause"
        },
        {
            "id": "hsk4ii-haozai-ex1-ex13",
            "type": "translate",
            "question": "I thought it was difficult, but actually it's very simple.",
            "answer": "我以为很难，其实很简单。",
            "direction": "en-to-cn",
            "hint": "其实 + Clause"
        },
        {
            "id": "hsk4ii-haozai-ex1-ex14",
            "type": "translate",
            "question": "我以为很难，其实很简单。",
            "answer": "I thought it was difficult, but actually it's very simple.",
            "direction": "cn-to-en",
            "hint": "其实 + Clause"
        },
        {
            "id": "hsk4ii-haozai-ex1-ex15",
            "type": "translate",
            "question": "I thought it was difficult, but actually it's very simple.",
            "answer": "我以为很难，其实很简单。",
            "direction": "en-to-cn",
            "hint": "其实 + Clause"
        }
    ]
  },
  {
    "id": "hsk4ii-mingming-16",
    "band": "HSK4-II",
    "order": 16,
    "title": "Clearly/Obviously with 明明 (míngmíng)",
    "subtitle": "Emphasizing that something is obvious but ignored or denied",
    "formula": "明明 + Clause, 却/但是 + Clause",
    "explanation": "明明 is an adverb meaning 'clearly,' 'obviously,' or 'plainly.' It is used to emphasize that a situation or fact is very clear and undeniable, but someone is ignoring it, denying it, or acting contrary to it. It often carries a tone of complaint, dissatisfaction, or bewilderment.",
    "usageRules": [
      "Placed before the verb or adjective.",
      "Used to highlight a contradiction between an obvious fact and someone's actions or statements.",
      "Often followed by 却 (què) or 但是 (dànshì) to introduce the contradictory action.",
      "Implies that the speaker feels the other person is being unreasonable or deliberately misleading."
    ],
    "examples": [
      {
        "chinese": "你明明知道，为什么不说？",
        "pinyin": "Nǐ míngmíng zhīdao, wèishénme bù shuō?",
        "english": "You clearly know, why don't you say it?",
        "highlight": "明明"
      },
      {
        "chinese": "明明是他的错，他却不承认。",
        "pinyin": "Míngmíng shì tā de cuò, tā què bù chéngrèn.",
        "english": "It was clearly his fault, but he wouldn't admit it.",
        "highlight": "明明"
      },
      {
        "chinese": "明明很喜欢，却假装不喜欢。",
        "pinyin": "Míngmíng hěn xǐhuān, què jiǎzhuāng bù xǐhuān.",
        "english": "Clearly likes it, but pretends not to.",
        "highlight": "明明"
      },
      {
        "chinese": "明明说好了要来，结果却没来。",
        "pinyin": "Míngmíng shuō hǎo le yào lái, jiéguǒ què méi lái.",
        "english": "It was clearly agreed that he would come, but he didn't.",
        "highlight": "明明"
      },
      {
        "chinese": "明明是晴天，你为什么要带伞？",
        "pinyin": "Míngmíng shì qíngtiān, nǐ wèishénme yào dài sǎn?",
        "english": "It's clearly a sunny day, why do you want to bring an umbrella?",
        "highlight": "明明"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 明明 for simple statements of fact without an implied contradiction or a sense of bewilderment/complaint. 明明 highlights a discrepancy between what is obvious and what is happening.",
      "wrongExample": "明明是早上。 (Incorrect, unless someone is denying it's morning)",
      "correctExample": "明明是早上，你为什么还在睡觉？ (Correct, expresses bewilderment at someone sleeping when it's clearly morning)",
      "explanation": "Use 明明 when you want to emphasize an obvious fact that is being ignored, denied, or contradicted by someone's actions or words."
    },
    "exercises":     [
        {
            "id": "hsk4ii-mingming-16-ex1",
            "type": "fill-blank",
            "question": "___很喜欢，却假装不喜欢。",
            "answer": "明明",
            "hint": "Fill in the blank with '明明'"
        },
        {
            "id": "hsk4ii-mingming-16-ex2",
            "type": "fill-blank",
            "question": "___是他的错，他却不承认。",
            "answer": "明明",
            "hint": "Fill in the blank with '明明'"
        },
        {
            "id": "hsk4ii-mingming-16-ex3",
            "type": "fill-blank",
            "question": "___是他的错，他却不承认。",
            "answer": "明明",
            "hint": "Fill in the blank with '明明'"
        },
        {
            "id": "hsk4ii-mingming-16-ex4",
            "type": "fill-blank",
            "question": "___很喜欢，却假装不喜欢。",
            "answer": "明明",
            "hint": "Fill in the blank with '明明'"
        },
        {
            "id": "hsk4ii-mingming-16-ex5",
            "type": "fill-blank",
            "question": "___是他的错，他却不承认。",
            "answer": "明明",
            "hint": "Fill in the blank with '明明'"
        },
        {
            "id": "hsk4ii-mingming-16-ex1",
            "type": "fill-blank",
            "question": "___很喜欢，却假装不喜欢。",
            "answer": "明明",
            "hint": "Fill in the blank with '明明'"
        },
        {
            "id": "hsk4ii-mingming-16-ex2",
            "type": "fill-blank",
            "question": "___是他的错，他却不承认。",
            "answer": "明明",
            "hint": "Fill in the blank with '明明'"
        },
        {
            "id": "hsk4ii-mingming-16-ex3",
            "type": "fill-blank",
            "question": "___是他的错，他却不承认。",
            "answer": "明明",
            "hint": "Fill in the blank with '明明'"
        },
        {
            "id": "hsk4ii-mingming-16-ex4",
            "type": "fill-blank",
            "question": "___很喜欢，却假装不喜欢。",
            "answer": "明明",
            "hint": "Fill in the blank with '明明'"
        },
        {
            "id": "hsk4ii-mingming-16-ex5",
            "type": "fill-blank",
            "question": "___是他的错，他却不承认。",
            "answer": "明明",
            "hint": "Fill in the blank with '明明'"
        },
        {
            "id": "hsk4ii-mingming-16-ex6",
            "type": "reorder",
            "words": [
                "明明很喜欢",
                ",",
                ".",
                "却假装不喜欢"
            ],
            "answer": "明明很喜欢，却假装不喜欢。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Clearly/Obviously with 明明 (míngmíng)'"
        },
        {
            "id": "hsk4ii-mingming-16-ex7",
            "type": "reorder",
            "words": [
                ".",
                "明明很喜欢",
                "却假装不喜欢",
                ","
            ],
            "answer": "明明很喜欢，却假装不喜欢。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Clearly/Obviously with 明明 (míngmíng)'"
        },
        {
            "id": "hsk4ii-mingming-16-ex8",
            "type": "reorder",
            "words": [
                "为什么不说",
                "你明明知道",
                ",",
                "?"
            ],
            "answer": "你明明知道，为什么不说？",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Clearly/Obviously with 明明 (míngmíng)'"
        },
        {
            "id": "hsk4ii-mingming-16-ex9",
            "type": "reorder",
            "words": [
                "明明很喜欢",
                ".",
                "却假装不喜欢",
                ","
            ],
            "answer": "明明很喜欢，却假装不喜欢。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Clearly/Obviously with 明明 (míngmíng)'"
        },
        {
            "id": "hsk4ii-mingming-16-ex10",
            "type": "reorder",
            "words": [
                ",",
                "?",
                "为什么不说",
                "你明明知道"
            ],
            "answer": "你明明知道，为什么不说？",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Clearly/Obviously with 明明 (míngmíng)'"
        },
        {
            "id": "hsk4ii-mingming-16-ex1",
            "type": "fill-blank",
            "question": "___很喜欢，却假装不喜欢。",
            "answer": "明明",
            "hint": "Fill in the blank with '明明'"
        },
        {
            "id": "hsk4ii-mingming-16-ex2",
            "type": "fill-blank",
            "question": "___是他的错，他却不承认。",
            "answer": "明明",
            "hint": "Fill in the blank with '明明'"
        },
        {
            "id": "hsk4ii-mingming-16-ex3",
            "type": "fill-blank",
            "question": "___是他的错，他却不承认。",
            "answer": "明明",
            "hint": "Fill in the blank with '明明'"
        },
        {
            "id": "hsk4ii-mingming-16-ex4",
            "type": "fill-blank",
            "question": "___很喜欢，却假装不喜欢。",
            "answer": "明明",
            "hint": "Fill in the blank with '明明'"
        },
        {
            "id": "hsk4ii-mingming-16-ex5",
            "type": "fill-blank",
            "question": "___是他的错，他却不承认。",
            "answer": "明明",
            "hint": "Fill in the blank with '明明'"
        },
        {
            "id": "hsk4ii-mingming-16-ex6",
            "type": "reorder",
            "words": [
                "明明很喜欢",
                ",",
                ".",
                "却假装不喜欢"
            ],
            "answer": "明明很喜欢，却假装不喜欢。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Clearly/Obviously with 明明 (míngmíng)'"
        },
        {
            "id": "hsk4ii-mingming-16-ex7",
            "type": "reorder",
            "words": [
                ".",
                "明明很喜欢",
                "却假装不喜欢",
                ","
            ],
            "answer": "明明很喜欢，却假装不喜欢。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Clearly/Obviously with 明明 (míngmíng)'"
        },
        {
            "id": "hsk4ii-mingming-16-ex8",
            "type": "reorder",
            "words": [
                "为什么不说",
                "你明明知道",
                ",",
                "?"
            ],
            "answer": "你明明知道，为什么不说？",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Clearly/Obviously with 明明 (míngmíng)'"
        },
        {
            "id": "hsk4ii-mingming-16-ex9",
            "type": "reorder",
            "words": [
                "明明很喜欢",
                ".",
                "却假装不喜欢",
                ","
            ],
            "answer": "明明很喜欢，却假装不喜欢。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Clearly/Obviously with 明明 (míngmíng)'"
        },
        {
            "id": "hsk4ii-mingming-16-ex10",
            "type": "reorder",
            "words": [
                ",",
                "?",
                "为什么不说",
                "你明明知道"
            ],
            "answer": "你明明知道，为什么不说？",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Clearly/Obviously with 明明 (míngmíng)'"
        },
        {
            "id": "hsk4ii-mingming-16-ex11",
            "type": "translate",
            "question": "Clearly likes it, but pretends not to.",
            "answer": "明明很喜欢，却假装不喜欢。",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of 'Clearly/Obviously with 明明 (míngmíng)'"
        },
        {
            "id": "hsk4ii-mingming-16-ex12",
            "type": "translate",
            "question": "你明明知道，为什么不说？",
            "answer": "You clearly know, why don't you say it?",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of 'Clearly/Obviously with 明明 (míngmíng)'"
        },
        {
            "id": "hsk4ii-mingming-16-ex13",
            "type": "translate",
            "question": "明明很喜欢，却假装不喜欢。",
            "answer": "Clearly likes it, but pretends not to.",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of 'Clearly/Obviously with 明明 (míngmíng)'"
        },
        {
            "id": "hsk4ii-mingming-16-ex14",
            "type": "translate",
            "question": "明明很喜欢，却假装不喜欢。",
            "answer": "Clearly likes it, but pretends not to.",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of 'Clearly/Obviously with 明明 (míngmíng)'"
        },
        {
            "id": "hsk4ii-mingming-16-ex15",
            "type": "translate",
            "question": "You clearly know, why don't you say it?",
            "answer": "你明明知道，为什么不说？",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of 'Clearly/Obviously with 明明 (míngmíng)'"
        }
    ]
  },
  {
    "id": "hsk4ii-pianpian-17",
    "band": "HSK4-II",
    "order": 17,
    "title": "Against Expectations with 偏偏 (piānpiān)",
    "subtitle": "Indicating something happens contrary to desire or expectation",
    "formula": "偏偏 + Clause",
    "explanation": "偏偏 is an adverb meaning 'contrary to expectation,' 'unfortunately,' or 'just.' It is used to indicate that something happens precisely when it is not desired, or that someone deliberately does something against advice or expectation. It often carries a tone of annoyance, helplessness, or irony.",
    "usageRules": [
      "Placed before the verb or adjective.",
      "Used to highlight an undesirable or uncooperative outcome.",
      "Can express a sense of 'just my luck' or 'why does it have to be like this?'.",
      "Implies a strong contrast between what was hoped for/expected and what actually happened."
    ],
    "examples": [
      {
        "chinese": "我越不想让他知道，他偏偏知道了。",
        "pinyin": "Wǒ yuè bù xiǎng ràng tā zhīdao, tā piānpiān zhīdao le.",
        "english": "The more I didn't want him to know, the more he just happened to find out.",
        "highlight": "偏偏"
      },
      {
        "chinese": "我赶时间，偏偏公交车迟到了。",
        "pinyin": "Wǒ gǎn shíjiān, piānpiān gōngjiāochē chídào le.",
        "english": "I was in a hurry, but unfortunately the bus was late.",
        "highlight": "偏偏"
      },
      {
        "chinese": "大家都劝他别去，他偏偏要去。",
        "pinyin": "Dàjiā dōu quàn tā bié qù, tā piānpiān yào qù.",
        "english": "Everyone advised him not to go, but he insisted on going.",
        "highlight": "偏偏"
      },
      {
        "chinese": "我刚出门，偏偏下雨了。",
        "pinyin": "Wǒ gāng chūmén, piānpiān xià yǔ le.",
        "english": "Just as I went out, it started to rain (unfortunately).",
        "highlight": "偏偏"
      },
      {
        "chinese": "我最不喜欢吃辣，偏偏他点的菜都很辣。",
        "pinyin": "Wǒ zuì bù xǐhuān chī là, piānpiān tā diǎn de cài dōu hěn là.",
        "english": "I dislike spicy food the most, but he just happened to order all spicy dishes.",
        "highlight": "偏偏"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 偏偏 for simple unexpected events without the nuance of something happening contrary to desire, expectation, or advice. It implies a sense of 'just my luck' or deliberate contrariness.",
      "wrongExample": "今天偏偏是晴天。 (Incorrect, unless you specifically didn't want it to be sunny)",
      "correctExample": "我希望下雨，偏偏是晴天。 (Correct, expresses disappointment that it's sunny when rain was desired)",
      "explanation": "Use 偏偏 when something happens against your wishes, expectations, or when someone acts contrary to advice."
    },
    "exercises":     [
        {
            "id": "hsk4ii-mingming-ex1-ex1",
            "type": "fill-blank",
            "question": "我赶时间，___公交车迟到了。",
            "answer": "偏偏",
            "hint": "偏偏 + Clause"
        },
        {
            "id": "hsk4ii-mingming-ex1-ex2",
            "type": "fill-blank",
            "question": "我赶时间，___公交车迟到了。",
            "answer": "偏偏",
            "hint": "偏偏 + Clause"
        },
        {
            "id": "hsk4ii-mingming-ex1-ex3",
            "type": "fill-blank",
            "question": "大家都劝他别去，他___要去。",
            "answer": "偏偏",
            "hint": "偏偏 + Clause"
        },
        {
            "id": "hsk4ii-mingming-ex1-ex4",
            "type": "fill-blank",
            "question": "大家都劝他别去，他___要去。",
            "answer": "偏偏",
            "hint": "偏偏 + Clause"
        },
        {
            "id": "hsk4ii-mingming-ex1-ex5",
            "type": "fill-blank",
            "question": "大家都劝他别去，他___要去。",
            "answer": "偏偏",
            "hint": "偏偏 + Clause"
        },
        {
            "id": "hsk4ii-mingming-ex1-ex6",
            "type": "reorder",
            "words": [
                "大",
                "去",
                "劝",
                "他",
                "别",
                "要",
                "去",
                "家",
                "都",
                "他",
                "偏",
                "偏"
            ],
            "answer": "大家都劝他别去，他偏偏要去。",
            "hint": "偏偏 + Clause"
        },
        {
            "id": "hsk4ii-mingming-ex1-ex7",
            "type": "reorder",
            "words": [
                "想",
                "他",
                "知",
                "偏",
                "偏",
                "道",
                "我",
                "不",
                "他",
                "越",
                "了",
                "让",
                "知",
                "道"
            ],
            "answer": "我越不想让他知道，他偏偏知道了。",
            "hint": "偏偏 + Clause"
        },
        {
            "id": "hsk4ii-mingming-ex1-ex8",
            "type": "reorder",
            "words": [
                "他",
                "想",
                "偏",
                "知",
                "知",
                "越",
                "他",
                "我",
                "了",
                "偏",
                "不",
                "让",
                "道",
                "道"
            ],
            "answer": "我越不想让他知道，他偏偏知道了。",
            "hint": "偏偏 + Clause"
        },
        {
            "id": "hsk4ii-mingming-ex1-ex9",
            "type": "reorder",
            "words": [
                "公",
                "迟",
                "时",
                "到",
                "了",
                "间",
                "赶",
                "偏",
                "我",
                "偏",
                "交",
                "车"
            ],
            "answer": "我赶时间，偏偏公交车迟到了。",
            "hint": "偏偏 + Clause"
        },
        {
            "id": "hsk4ii-mingming-ex1-ex10",
            "type": "reorder",
            "words": [
                "偏",
                "他",
                "去",
                "他",
                "偏",
                "要",
                "家",
                "别",
                "都",
                "去",
                "大",
                "劝"
            ],
            "answer": "大家都劝他别去，他偏偏要去。",
            "hint": "偏偏 + Clause"
        },
        {
            "id": "hsk4ii-mingming-ex1-ex11",
            "type": "translate",
            "question": "The more I didn't want him to know, the more he just happened to find out.",
            "answer": "我越不想让他知道，他偏偏知道了。",
            "direction": "en-to-cn",
            "hint": "偏偏 + Clause"
        },
        {
            "id": "hsk4ii-mingming-ex1-ex12",
            "type": "translate",
            "question": "大家都劝他别去，他偏偏要去。",
            "answer": "Everyone advised him not to go, but he insisted on going.",
            "direction": "cn-to-en",
            "hint": "偏偏 + Clause"
        },
        {
            "id": "hsk4ii-mingming-ex1-ex13",
            "type": "translate",
            "question": "Everyone advised him not to go, but he insisted on going.",
            "answer": "大家都劝他别去，他偏偏要去。",
            "direction": "en-to-cn",
            "hint": "偏偏 + Clause"
        },
        {
            "id": "hsk4ii-mingming-ex1-ex14",
            "type": "translate",
            "question": "我赶时间，偏偏公交车迟到了。",
            "answer": "I was in a hurry, but unfortunately the bus was late.",
            "direction": "cn-to-en",
            "hint": "偏偏 + Clause"
        },
        {
            "id": "hsk4ii-mingming-ex1-ex15",
            "type": "translate",
            "question": "I was in a hurry, but unfortunately the bus was late.",
            "answer": "我赶时间，偏偏公交车迟到了。",
            "direction": "en-to-cn",
            "hint": "偏偏 + Clause"
        }
    ]
  },
  {
    "id": "hsk4ii-qiahao-18",
    "band": "HSK4-II",
    "order": 18,
    "title": "Just Right/Precisely with 恰好/恰恰 (qiàhǎo/qiàqià)",
    "subtitle": "Indicating something happens at the right time or is exactly as expected/needed",
    "formula": "恰好/恰恰 + Verb/Adjective/Clause",
    "explanation": "恰好 and 恰恰 both mean 'just right,' 'precisely,' 'exactly,' or 'opportunely.' They are used to indicate that something happens at a very opportune moment, or that a situation is exactly as described or needed. 恰恰 is slightly stronger and more emphatic than 恰好.",
    "usageRules": [
      "Placed before the verb, adjective, or a clause.",
      "Used to highlight a perfect timing or an exact match.",
      "Can express a sense of coincidence or good fortune.",
      "恰恰 can also be used to emphasize a contrast or contradiction, meaning 'precisely the opposite.'"
    ],
    "examples": [
      {
        "chinese": "我正需要帮助，你恰好来了。",
        "pinyin": "Wǒ zhèng xūyào bāngzhù, nǐ qiàhǎo lái le.",
        "english": "I just needed help, and you happened to come at the right time.",
        "highlight": "恰好"
      },
      {
        "chinese": "这个尺寸恰恰合适。",
        "pinyin": "Zhège chǐcùn qiàqià héshì.",
        "english": "This size is precisely right.",
        "highlight": "恰恰"
      },
      {
        "chinese": "他说的恰好是我心里想的。",
        "pinyin": "Tā shuō de qiàhǎo shì wǒ xīnli xiǎng de.",
        "english": "What he said was exactly what I was thinking.",
        "highlight": "恰好"
      },
      {
        "chinese": "这恰恰说明了问题所在。",
        "pinyin": "Zhè qiàqià shuōmíngle wèntí suǒzài.",
        "english": "This precisely illustrates where the problem lies.",
        "highlight": "恰恰"
      },
      {
        "chinese": "我正在找你，你恰好打电话来了。",
        "pinyin": "Wǒ zhèngzài zhǎo nǐ, nǐ qiàhǎo dǎ diànhuà lái le.",
        "english": "I was looking for you, and you just happened to call.",
        "highlight": "恰好"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 恰好/恰恰 for general statements of 'good' or 'suitable' without the emphasis on precision, timeliness, or exactness. They highlight a perfect fit or opportune moment.",
      "wrongExample": "今天天气恰好。 (Incorrect, unless it's precisely the weather you needed)",
      "correctExample": "今天的天气恰好适合郊游。 (Correct, the weather is precisely suitable for an outing)",
      "explanation": "Use 恰好/恰恰 when something aligns perfectly with a need, expectation, or timing."
    },
    "exercises":     [
        {
            "id": "hsk4ii-qiahao-18-ex1",
            "type": "fill-blank",
            "question": "我正需要帮助，你___来了。",
            "answer": "恰好",
            "hint": "Fill in the blank with '恰好'"
        },
        {
            "id": "hsk4ii-qiahao-18-ex2",
            "type": "fill-blank",
            "question": "这个尺寸___合适。",
            "answer": "恰恰",
            "hint": "Fill in the blank with '恰恰'"
        },
        {
            "id": "hsk4ii-qiahao-18-ex3",
            "type": "fill-blank",
            "question": "他说的___是我心里想的。",
            "answer": "恰好",
            "hint": "Fill in the blank with '恰好'"
        },
        {
            "id": "hsk4ii-qiahao-18-ex4",
            "type": "fill-blank",
            "question": "这个尺寸___合适。",
            "answer": "恰恰",
            "hint": "Fill in the blank with '恰恰'"
        },
        {
            "id": "hsk4ii-qiahao-18-ex5",
            "type": "fill-blank",
            "question": "这个尺寸___合适。",
            "answer": "恰恰",
            "hint": "Fill in the blank with '恰恰'"
        },
        {
            "id": "hsk4ii-qiahao-18-ex1",
            "type": "fill-blank",
            "question": "我正需要帮助，你___来了。",
            "answer": "恰好",
            "hint": "Fill in the blank with '恰好'"
        },
        {
            "id": "hsk4ii-qiahao-18-ex2",
            "type": "fill-blank",
            "question": "这个尺寸___合适。",
            "answer": "恰恰",
            "hint": "Fill in the blank with '恰恰'"
        },
        {
            "id": "hsk4ii-qiahao-18-ex3",
            "type": "fill-blank",
            "question": "他说的___是我心里想的。",
            "answer": "恰好",
            "hint": "Fill in the blank with '恰好'"
        },
        {
            "id": "hsk4ii-qiahao-18-ex4",
            "type": "fill-blank",
            "question": "这个尺寸___合适。",
            "answer": "恰恰",
            "hint": "Fill in the blank with '恰恰'"
        },
        {
            "id": "hsk4ii-qiahao-18-ex5",
            "type": "fill-blank",
            "question": "这个尺寸___合适。",
            "answer": "恰恰",
            "hint": "Fill in the blank with '恰恰'"
        },
        {
            "id": "hsk4ii-qiahao-18-ex6",
            "type": "reorder",
            "words": [
                "他说的恰好是我心里想的",
                "."
            ],
            "answer": "他说的恰好是我心里想的。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Just Right/Precisely with 恰好/恰恰 (qiàhǎo/qiàqià)'"
        },
        {
            "id": "hsk4ii-qiahao-18-ex7",
            "type": "reorder",
            "words": [
                ",",
                ".",
                "你恰好来了",
                "我正需要帮助"
            ],
            "answer": "我正需要帮助，你恰好来了。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Just Right/Precisely with 恰好/恰恰 (qiàhǎo/qiàqià)'"
        },
        {
            "id": "hsk4ii-qiahao-18-ex8",
            "type": "reorder",
            "words": [
                "我正需要帮助",
                ".",
                ",",
                "你恰好来了"
            ],
            "answer": "我正需要帮助，你恰好来了。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Just Right/Precisely with 恰好/恰恰 (qiàhǎo/qiàqià)'"
        },
        {
            "id": "hsk4ii-qiahao-18-ex9",
            "type": "reorder",
            "words": [
                ".",
                "他说的恰好是我心里想的"
            ],
            "answer": "他说的恰好是我心里想的。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Just Right/Precisely with 恰好/恰恰 (qiàhǎo/qiàqià)'"
        },
        {
            "id": "hsk4ii-qiahao-18-ex10",
            "type": "reorder",
            "words": [
                ".",
                "他说的恰好是我心里想的"
            ],
            "answer": "他说的恰好是我心里想的。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Just Right/Precisely with 恰好/恰恰 (qiàhǎo/qiàqià)'"
        },
        {
            "id": "hsk4ii-qiahao-18-ex1",
            "type": "fill-blank",
            "question": "我正需要帮助，你___来了。",
            "answer": "恰好",
            "hint": "Fill in the blank with '恰好'"
        },
        {
            "id": "hsk4ii-qiahao-18-ex2",
            "type": "fill-blank",
            "question": "这个尺寸___合适。",
            "answer": "恰恰",
            "hint": "Fill in the blank with '恰恰'"
        },
        {
            "id": "hsk4ii-qiahao-18-ex3",
            "type": "fill-blank",
            "question": "他说的___是我心里想的。",
            "answer": "恰好",
            "hint": "Fill in the blank with '恰好'"
        },
        {
            "id": "hsk4ii-qiahao-18-ex4",
            "type": "fill-blank",
            "question": "这个尺寸___合适。",
            "answer": "恰恰",
            "hint": "Fill in the blank with '恰恰'"
        },
        {
            "id": "hsk4ii-qiahao-18-ex5",
            "type": "fill-blank",
            "question": "这个尺寸___合适。",
            "answer": "恰恰",
            "hint": "Fill in the blank with '恰恰'"
        },
        {
            "id": "hsk4ii-qiahao-18-ex6",
            "type": "reorder",
            "words": [
                "他说的恰好是我心里想的",
                "."
            ],
            "answer": "他说的恰好是我心里想的。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Just Right/Precisely with 恰好/恰恰 (qiàhǎo/qiàqià)'"
        },
        {
            "id": "hsk4ii-qiahao-18-ex7",
            "type": "reorder",
            "words": [
                ",",
                ".",
                "你恰好来了",
                "我正需要帮助"
            ],
            "answer": "我正需要帮助，你恰好来了。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Just Right/Precisely with 恰好/恰恰 (qiàhǎo/qiàqià)'"
        },
        {
            "id": "hsk4ii-qiahao-18-ex8",
            "type": "reorder",
            "words": [
                "我正需要帮助",
                ".",
                ",",
                "你恰好来了"
            ],
            "answer": "我正需要帮助，你恰好来了。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Just Right/Precisely with 恰好/恰恰 (qiàhǎo/qiàqià)'"
        },
        {
            "id": "hsk4ii-qiahao-18-ex9",
            "type": "reorder",
            "words": [
                ".",
                "他说的恰好是我心里想的"
            ],
            "answer": "他说的恰好是我心里想的。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Just Right/Precisely with 恰好/恰恰 (qiàhǎo/qiàqià)'"
        },
        {
            "id": "hsk4ii-qiahao-18-ex10",
            "type": "reorder",
            "words": [
                ".",
                "他说的恰好是我心里想的"
            ],
            "answer": "他说的恰好是我心里想的。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Just Right/Precisely with 恰好/恰恰 (qiàhǎo/qiàqià)'"
        },
        {
            "id": "hsk4ii-qiahao-18-ex11",
            "type": "translate",
            "question": "What he said was exactly what I was thinking.",
            "answer": "他说的恰好是我心里想的。",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of 'Just Right/Precisely with 恰好/恰恰 (qiàhǎo/qiàqià)'"
        },
        {
            "id": "hsk4ii-qiahao-18-ex12",
            "type": "translate",
            "question": "我正需要帮助，你恰好来了。",
            "answer": "I just needed help, and you happened to come at the right time.",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of 'Just Right/Precisely with 恰好/恰恰 (qiàhǎo/qiàqià)'"
        },
        {
            "id": "hsk4ii-qiahao-18-ex13",
            "type": "translate",
            "question": "I just needed help, and you happened to come at the right time.",
            "answer": "我正需要帮助，你恰好来了。",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of 'Just Right/Precisely with 恰好/恰恰 (qiàhǎo/qiàqià)'"
        },
        {
            "id": "hsk4ii-qiahao-18-ex14",
            "type": "translate",
            "question": "这个尺寸恰恰合适。",
            "answer": "This size is precisely right.",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of 'Just Right/Precisely with 恰好/恰恰 (qiàhǎo/qiàqià)'"
        },
        {
            "id": "hsk4ii-qiahao-18-ex15",
            "type": "translate",
            "question": "I just needed help, and you happened to come at the right time.",
            "answer": "我正需要帮助，你恰好来了。",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of 'Just Right/Precisely with 恰好/恰恰 (qiàhǎo/qiàqià)'"
        }
    ]
  },
  {
    "id": "hsk4ii-jianzhi-19",
    "band": "HSK4-II",
    "order": 19,
    "title": "Simply/Virtually with 简直 (jiǎnzhí)",
    "subtitle": "Expressing an extreme degree or exaggeration",
    "formula": "简直 + Adjective/Verb Phrase",
    "explanation": "简直 is an adverb meaning 'simply,' 'virtually,' 'practically,' or 'almost.' It is used to emphasize an extreme degree of a quality or action, often with a sense of exaggeration or strong emotion (positive or negative). It implies that something is so extreme that it's almost like something else.",
    "usageRules": [
      "Placed before an adjective or verb phrase.",
      "Used to express a strong feeling or to make a vivid comparison.",
      "Can be used for both praise and criticism.",
      "Often implies that the situation is so extreme it's hard to believe."
    ],
    "examples": [
      {
        "chinese": "这个地方简直太美了！",
        "pinyin": "Zhège dìfang jiǎnzhí tài měi le!",
        "english": "This place is simply too beautiful!",
        "highlight": "简直"
      },
      {
        "chinese": "他简直是个天才。",
        "pinyin": "Tā jiǎnzhí shì ge tiāncái.",
        "english": "He is simply a genius.",
        "highlight": "简直"
      },
      {
        "chinese": "今天的任务简直不可能完成。",
        "pinyin": "Jīntiān de rènwu jiǎnzhí bù kěnéng wánchéng.",
        "english": "Today's task is virtually impossible to complete.",
        "highlight": "简直"
      },
      {
        "chinese": "他被气得简直说不出话来。",
        "pinyin": "Tā bèi qì de jiǎnzhí shuō bu chū huà lái.",
        "english": "He was so angry he was practically speechless.",
        "highlight": "简直"
      },
      {
        "chinese": "这简直是浪费时间。",
        "pinyin": "Zhè jiǎnzhí shì làngfèi shíjiān.",
        "english": "This is simply a waste of time.",
        "highlight": "简直"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 简直 for mild emphasis or ordinary descriptions. 简直 is reserved for situations that are truly extreme, surprising, or almost unbelievable, conveying a strong emotional tone.",
      "wrongExample": "我简直有点累。 (Incorrect, 'a little tired' is not extreme)",
      "correctExample": "我简直累死了。 (Correct, 'dead tired' is an extreme exaggeration)",
      "explanation": "Use 简直 to emphasize an extreme degree, often implying that something is almost equivalent to another, more intense state."
    },
    "exercises":     [
        {
            "id": "hsk4ii-qiahao-ex1-ex1",
            "type": "fill-blank",
            "question": "今天的任务___不可能完成。",
            "answer": "简直",
            "hint": "简直 + Adjective/Verb Phrase"
        },
        {
            "id": "hsk4ii-qiahao-ex1-ex2",
            "type": "fill-blank",
            "question": "今天的任务___不可能完成。",
            "answer": "简直",
            "hint": "简直 + Adjective/Verb Phrase"
        },
        {
            "id": "hsk4ii-qiahao-ex1-ex3",
            "type": "fill-blank",
            "question": "这个地方___太美了！",
            "answer": "简直",
            "hint": "简直 + Adjective/Verb Phrase"
        },
        {
            "id": "hsk4ii-qiahao-ex1-ex4",
            "type": "fill-blank",
            "question": "这个地方___太美了！",
            "answer": "简直",
            "hint": "简直 + Adjective/Verb Phrase"
        },
        {
            "id": "hsk4ii-qiahao-ex1-ex5",
            "type": "fill-blank",
            "question": "他___是个天才。",
            "answer": "简直",
            "hint": "简直 + Adjective/Verb Phrase"
        },
        {
            "id": "hsk4ii-qiahao-ex1-ex6",
            "type": "reorder",
            "words": [
                "天",
                "才",
                "他",
                "个",
                "是",
                "简",
                "直"
            ],
            "answer": "他简直是个天才。",
            "hint": "简直 + Adjective/Verb Phrase"
        },
        {
            "id": "hsk4ii-qiahao-ex1-ex7",
            "type": "reorder",
            "words": [
                "直",
                "方",
                "简",
                "地",
                "美",
                "太",
                "个",
                "了",
                "这"
            ],
            "answer": "这个地方简直太美了！",
            "hint": "简直 + Adjective/Verb Phrase"
        },
        {
            "id": "hsk4ii-qiahao-ex1-ex8",
            "type": "reorder",
            "words": [
                "成",
                "完",
                "今",
                "直",
                "可",
                "任",
                "能",
                "务",
                "不",
                "简",
                "天",
                "的"
            ],
            "answer": "今天的任务简直不可能完成。",
            "hint": "简直 + Adjective/Verb Phrase"
        },
        {
            "id": "hsk4ii-qiahao-ex1-ex9",
            "type": "reorder",
            "words": [
                "个",
                "才",
                "是",
                "天",
                "直",
                "简",
                "他"
            ],
            "answer": "他简直是个天才。",
            "hint": "简直 + Adjective/Verb Phrase"
        },
        {
            "id": "hsk4ii-qiahao-ex1-ex10",
            "type": "reorder",
            "words": [
                "可",
                "直",
                "简",
                "完",
                "不",
                "能",
                "今",
                "务",
                "成",
                "任",
                "天",
                "的"
            ],
            "answer": "今天的任务简直不可能完成。",
            "hint": "简直 + Adjective/Verb Phrase"
        },
        {
            "id": "hsk4ii-qiahao-ex1-ex11",
            "type": "translate",
            "question": "This place is simply too beautiful!",
            "answer": "这个地方简直太美了！",
            "direction": "en-to-cn",
            "hint": "简直 + Adjective/Verb Phrase"
        },
        {
            "id": "hsk4ii-qiahao-ex1-ex12",
            "type": "translate",
            "question": "今天的任务简直不可能完成。",
            "answer": "Today's task is virtually impossible to complete.",
            "direction": "cn-to-en",
            "hint": "简直 + Adjective/Verb Phrase"
        },
        {
            "id": "hsk4ii-qiahao-ex1-ex13",
            "type": "translate",
            "question": "Today's task is virtually impossible to complete.",
            "answer": "今天的任务简直不可能完成。",
            "direction": "en-to-cn",
            "hint": "简直 + Adjective/Verb Phrase"
        },
        {
            "id": "hsk4ii-qiahao-ex1-ex14",
            "type": "translate",
            "question": "今天的任务简直不可能完成。",
            "answer": "Today's task is virtually impossible to complete.",
            "direction": "cn-to-en",
            "hint": "简直 + Adjective/Verb Phrase"
        },
        {
            "id": "hsk4ii-qiahao-ex1-ex15",
            "type": "translate",
            "question": "This place is simply too beautiful!",
            "answer": "这个地方简直太美了！",
            "direction": "en-to-cn",
            "hint": "简直 + Adjective/Verb Phrase"
        }
    ]
  },
  {
    "id": "hsk4ii-shenzhi-20",
    "band": "HSK4-II",
    "order": 20,
    "title": "Expressing 'Even' with 甚至 (shènzhì)",
    "subtitle": "Introducing an extreme or unexpected example",
    "formula": "..., 甚至 + Verb/Noun Phrase",
    "explanation": "甚至 is used to introduce a further, often surprising or extreme, example or consequence. It emphasizes that something goes beyond what was previously mentioned, highlighting the extent of a situation.",
    "usageRules": [
      "Used to connect two clauses, where the second clause presents a more extreme case.",
      "Often used in written language but also common in formal speech.",
      "Can be used with 都 (dōu) or 也 (yě) for emphasis.",
      "The subject of the second clause can be the same as or different from the first."
    ],
    "examples": [
      {
        "chinese": "他很喜欢运动，每天都跑步，甚至下雨天也不例外。",
        "pinyin": "Tā hěn xǐhuān yùndòng, měitiān dōu pǎobù, shènzhì xià yǔ tiān yě bù lìwài.",
        "english": "He really likes sports; he jogs every day, and even rainy days are no exception.",
        "highlight": "甚至"
      },
      {
        "chinese": "他忙得没时间吃饭，甚至连水都没喝一口。",
        "pinyin": "Tā máng de méi shíjiān chī fàn, shènzhì lián shuǐ dōu méi hē yī kǒu.",
        "english": "He was so busy he didn't have time to eat, and he didn't even drink a sip of water.",
        "highlight": "甚至"
      },
      {
        "chinese": "这个问题很复杂，很多专家都不懂，甚至教授也解决不了。",
        "pinyin": "Zhège wèntí hěn fùzá, hěn duō zhuānjiā dōu bù dǒng, shènzhì jiàoshòu yě jiějué bùliǎo.",
        "english": "This problem is very complex; many experts don't understand it, and even professors can't solve it.",
        "highlight": "甚至"
      },
      {
        "chinese": "他可以连续工作十几个小时，甚至不睡觉。",
        "pinyin": "Tā kěyǐ liánxù gōngzuò shí jǐ ge xiǎoshí, shènzhì bù shuìjiào.",
        "english": "He can work for more than ten hours continuously, even without sleeping.",
        "highlight": "甚至"
      },
      {
        "chinese": "这个消息太令人震惊了，甚至连我都感到难以置信。",
        "pinyin": "Zhège xiāoxi tài lìng rén zhènjīng le, shènzhì lián wǒ dōu gǎndào nányǐ zhìxìn.",
        "english": "This news is too shocking, even I find it hard to believe.",
        "highlight": "甚至"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use 甚至 to connect unrelated ideas. The second clause introduced by 甚至 must be a more extreme or surprising example related to the first clause.",
      "wrongExample": "他喜欢运动，甚至他喜欢看电影。 (Incorrect, liking sports and liking movies are not related in a way that one is an extreme of the other)",
      "correctExample": "他喜欢运动，甚至冬天也坚持冬泳。 (Correct, winter swimming is an extreme example of liking sports)",
      "explanation": "Ensure the clause following 甚至 is a more extreme or surprising instance of the idea presented in the first clause."
    },
    "exercises":     [
        {
            "id": "hsk4ii-shenzhi-20-ex1",
            "type": "fill-blank",
            "question": "他忙得没时间吃饭，___连水都没喝一口。",
            "answer": "甚至",
            "hint": "Fill in the blank with '甚至'"
        },
        {
            "id": "hsk4ii-shenzhi-20-ex2",
            "type": "fill-blank",
            "question": "他很喜欢运动，每天都跑步，___下雨天也不例外。",
            "answer": "甚至",
            "hint": "Fill in the blank with '甚至'"
        },
        {
            "id": "hsk4ii-shenzhi-20-ex3",
            "type": "fill-blank",
            "question": "这个问题很复杂，很多专家都不懂，___教授也解决不了。",
            "answer": "甚至",
            "hint": "Fill in the blank with '甚至'"
        },
        {
            "id": "hsk4ii-shenzhi-20-ex4",
            "type": "fill-blank",
            "question": "这个问题很复杂，很多专家都不懂，___教授也解决不了。",
            "answer": "甚至",
            "hint": "Fill in the blank with '甚至'"
        },
        {
            "id": "hsk4ii-shenzhi-20-ex5",
            "type": "fill-blank",
            "question": "这个问题很复杂，很多专家都不懂，___教授也解决不了。",
            "answer": "甚至",
            "hint": "Fill in the blank with '甚至'"
        },
        {
            "id": "hsk4ii-shenzhi-20-ex1",
            "type": "fill-blank",
            "question": "他忙得没时间吃饭，___连水都没喝一口。",
            "answer": "甚至",
            "hint": "Fill in the blank with '甚至'"
        },
        {
            "id": "hsk4ii-shenzhi-20-ex2",
            "type": "fill-blank",
            "question": "他很喜欢运动，每天都跑步，___下雨天也不例外。",
            "answer": "甚至",
            "hint": "Fill in the blank with '甚至'"
        },
        {
            "id": "hsk4ii-shenzhi-20-ex3",
            "type": "fill-blank",
            "question": "这个问题很复杂，很多专家都不懂，___教授也解决不了。",
            "answer": "甚至",
            "hint": "Fill in the blank with '甚至'"
        },
        {
            "id": "hsk4ii-shenzhi-20-ex4",
            "type": "fill-blank",
            "question": "这个问题很复杂，很多专家都不懂，___教授也解决不了。",
            "answer": "甚至",
            "hint": "Fill in the blank with '甚至'"
        },
        {
            "id": "hsk4ii-shenzhi-20-ex5",
            "type": "fill-blank",
            "question": "这个问题很复杂，很多专家都不懂，___教授也解决不了。",
            "answer": "甚至",
            "hint": "Fill in the blank with '甚至'"
        },
        {
            "id": "hsk4ii-shenzhi-20-ex6",
            "type": "reorder",
            "words": [
                ",",
                ".",
                "他很喜欢运动",
                "甚至下雨天也不例外",
                "每天都跑步",
                ","
            ],
            "answer": "他很喜欢运动，每天都跑步，甚至下雨天也不例外。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Expressing 'Even' with 甚至 (shènzhì)'"
        },
        {
            "id": "hsk4ii-shenzhi-20-ex7",
            "type": "reorder",
            "words": [
                ",",
                ".",
                "他忙得没时间吃饭",
                "甚至连水都没喝一口"
            ],
            "answer": "他忙得没时间吃饭，甚至连水都没喝一口。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Expressing 'Even' with 甚至 (shènzhì)'"
        },
        {
            "id": "hsk4ii-shenzhi-20-ex8",
            "type": "reorder",
            "words": [
                ",",
                ",",
                "甚至下雨天也不例外",
                "他很喜欢运动",
                ".",
                "每天都跑步"
            ],
            "answer": "他很喜欢运动，每天都跑步，甚至下雨天也不例外。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Expressing 'Even' with 甚至 (shènzhì)'"
        },
        {
            "id": "hsk4ii-shenzhi-20-ex9",
            "type": "reorder",
            "words": [
                "他忙得没时间吃饭",
                "甚至连水都没喝一口",
                ",",
                "."
            ],
            "answer": "他忙得没时间吃饭，甚至连水都没喝一口。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Expressing 'Even' with 甚至 (shènzhì)'"
        },
        {
            "id": "hsk4ii-shenzhi-20-ex10",
            "type": "reorder",
            "words": [
                ",",
                "这个问题很复杂",
                "很多专家都不懂",
                "甚至教授也解决不了",
                ".",
                ","
            ],
            "answer": "这个问题很复杂，很多专家都不懂，甚至教授也解决不了。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Expressing 'Even' with 甚至 (shènzhì)'"
        },
        {
            "id": "hsk4ii-shenzhi-20-ex1",
            "type": "fill-blank",
            "question": "他忙得没时间吃饭，___连水都没喝一口。",
            "answer": "甚至",
            "hint": "Fill in the blank with '甚至'"
        },
        {
            "id": "hsk4ii-shenzhi-20-ex2",
            "type": "fill-blank",
            "question": "他很喜欢运动，每天都跑步，___下雨天也不例外。",
            "answer": "甚至",
            "hint": "Fill in the blank with '甚至'"
        },
        {
            "id": "hsk4ii-shenzhi-20-ex3",
            "type": "fill-blank",
            "question": "这个问题很复杂，很多专家都不懂，___教授也解决不了。",
            "answer": "甚至",
            "hint": "Fill in the blank with '甚至'"
        },
        {
            "id": "hsk4ii-shenzhi-20-ex4",
            "type": "fill-blank",
            "question": "这个问题很复杂，很多专家都不懂，___教授也解决不了。",
            "answer": "甚至",
            "hint": "Fill in the blank with '甚至'"
        },
        {
            "id": "hsk4ii-shenzhi-20-ex5",
            "type": "fill-blank",
            "question": "这个问题很复杂，很多专家都不懂，___教授也解决不了。",
            "answer": "甚至",
            "hint": "Fill in the blank with '甚至'"
        },
        {
            "id": "hsk4ii-shenzhi-20-ex6",
            "type": "reorder",
            "words": [
                ",",
                ".",
                "他很喜欢运动",
                "甚至下雨天也不例外",
                "每天都跑步",
                ","
            ],
            "answer": "他很喜欢运动，每天都跑步，甚至下雨天也不例外。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Expressing 'Even' with 甚至 (shènzhì)'"
        },
        {
            "id": "hsk4ii-shenzhi-20-ex7",
            "type": "reorder",
            "words": [
                ",",
                ".",
                "他忙得没时间吃饭",
                "甚至连水都没喝一口"
            ],
            "answer": "他忙得没时间吃饭，甚至连水都没喝一口。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Expressing 'Even' with 甚至 (shènzhì)'"
        },
        {
            "id": "hsk4ii-shenzhi-20-ex8",
            "type": "reorder",
            "words": [
                ",",
                ",",
                "甚至下雨天也不例外",
                "他很喜欢运动",
                ".",
                "每天都跑步"
            ],
            "answer": "他很喜欢运动，每天都跑步，甚至下雨天也不例外。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Expressing 'Even' with 甚至 (shènzhì)'"
        },
        {
            "id": "hsk4ii-shenzhi-20-ex9",
            "type": "reorder",
            "words": [
                "他忙得没时间吃饭",
                "甚至连水都没喝一口",
                ",",
                "."
            ],
            "answer": "他忙得没时间吃饭，甚至连水都没喝一口。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Expressing 'Even' with 甚至 (shènzhì)'"
        },
        {
            "id": "hsk4ii-shenzhi-20-ex10",
            "type": "reorder",
            "words": [
                ",",
                "这个问题很复杂",
                "很多专家都不懂",
                "甚至教授也解决不了",
                ".",
                ","
            ],
            "answer": "这个问题很复杂，很多专家都不懂，甚至教授也解决不了。",
            "hint": "Reorder the words to form a correct sentence using the grammar of 'Expressing 'Even' with 甚至 (shènzhì)'"
        },
        {
            "id": "hsk4ii-shenzhi-20-ex11",
            "type": "translate",
            "question": "这个问题很复杂，很多专家都不懂，甚至教授也解决不了。",
            "answer": "This problem is very complex; many experts don't understand it, and even professors can't solve it.",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of 'Expressing 'Even' with 甚至 (shènzhì)'"
        },
        {
            "id": "hsk4ii-shenzhi-20-ex12",
            "type": "translate",
            "question": "He was so busy he didn't have time to eat, and he didn't even drink a sip of water.",
            "answer": "他忙得没时间吃饭，甚至连水都没喝一口。",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of 'Expressing 'Even' with 甚至 (shènzhì)'"
        },
        {
            "id": "hsk4ii-shenzhi-20-ex13",
            "type": "translate",
            "question": "他很喜欢运动，每天都跑步，甚至下雨天也不例外。",
            "answer": "He really likes sports; he jogs every day, and even rainy days are no exception.",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of 'Expressing 'Even' with 甚至 (shènzhì)'"
        },
        {
            "id": "hsk4ii-shenzhi-20-ex14",
            "type": "translate",
            "question": "He was so busy he didn't have time to eat, and he didn't even drink a sip of water.",
            "answer": "他忙得没时间吃饭，甚至连水都没喝一口。",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of 'Expressing 'Even' with 甚至 (shènzhì)'"
        },
        {
            "id": "hsk4ii-shenzhi-20-ex15",
            "type": "translate",
            "question": "这个问题很复杂，很多专家都不懂，甚至教授也解决不了。",
            "answer": "This problem is very complex; many experts don't understand it, and even professors can't solve it.",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of 'Expressing 'Even' with 甚至 (shènzhì)'"
        }
    ]
  },
  {
    "id": "hsk5i-grammar-01",
    "band": "HSK5-I",
    "order": 1,
    "title": "以…为… (yǐ…wéi…)",
    "subtitle": "To take something as something else, or to regard something as something else.",
    "formula": "以 + A + 为 + B",
    "explanation": "This structure is used to express that one takes A as B, or regards A as B. It often appears in formal contexts and indicates a standard, purpose, or basis.",
    "usageRules": [
      "A and B can be nouns, pronouns, or noun phrases.",
      "It emphasizes the subjective judgment or decision of the speaker.",
      "Often used in written language or formal speech.",
      "Can be used to express a method or means."
    ],
    "examples": [
      {
        "chinese": "我们以学校为家，努力学习。",
        "pinyin": "Wǒmen yǐ xuéxiào wéi jiā, nǔlì xuéxí.",
        "english": "We take the school as our home and study hard.",
        "highlight": "以学校为家"
      },
      {
        "chinese": "他以诚实为做人原则。",
        "pinyin": "Tā yǐ chéngshí wéi zuòrén yuánzé.",
        "english": "He takes honesty as his principle of conduct.",
        "highlight": "以诚实为"
      },
      {
        "chinese": "这部电影以真实事件为背景。",
        "pinyin": "Zhè bù diànyǐng yǐ zhēnshí shìjiàn wéi bèijǐng.",
        "english": "This movie takes a real event as its background.",
        "highlight": "以真实事件为背景"
      },
      {
        "chinese": "我们以实际行动支持环保。",
        "pinyin": "Wǒmen yǐ shí jì xíngdòng zhīchí huánbǎo.",
        "english": "We support environmental protection with practical actions.",
        "highlight": "以实际行动"
      },
      {
        "chinese": "请以小组为单位进行讨论。",
        "pinyin": "Qǐng yǐ xiǎozǔ wéi dānwèi jìnxíng tǎolùn.",
        "english": "Please discuss in groups.",
        "highlight": "以小组为单位"
      },
      {
        "chinese": "他以自己的经验为例，说明了问题。",
        "pinyin": "Tā yǐ zìjǐ de jīngyàn wéi lì, shuōmíng le wèntí.",
        "english": "He used his own experience as an example to explain the problem.",
        "highlight": "以自己的经验为例"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to confuse '以...为...' with '把...当作...'. While both can mean 'to regard as', '以...为...' is more formal and often implies a more established or principled view, whereas '把...当作...' is more colloquial and can refer to a temporary or casual treatment.",
      "wrongExample": "他把学习为最重要的事。",
      "correctExample": "他以学习为最重要的事。",
      "explanation": "'以...为...' is a fixed structure. '把...当作...' is also correct but carries a slightly different nuance. The wrong example mixes '把' with '为' incorrectly."
    },
    "exercises":     [
        {
            "id": "hsk4ii-shenzhi-ex1-ex1",
            "type": "fill-blank",
            "question": "他以诚实___做人原则。",
            "answer": "为",
            "hint": "以 + A + 为 + B"
        },
        {
            "id": "hsk4ii-shenzhi-ex1-ex2",
            "type": "fill-blank",
            "question": "他以诚实___做人原则。",
            "answer": "为",
            "hint": "以 + A + 为 + B"
        },
        {
            "id": "hsk4ii-shenzhi-ex1-ex3",
            "type": "fill-blank",
            "question": "这部电影___真实事件为背景。",
            "answer": "以",
            "hint": "以 + A + 为 + B"
        },
        {
            "id": "hsk4ii-shenzhi-ex1-ex4",
            "type": "fill-blank",
            "question": "我们___学校为家，努力学习。",
            "answer": "以",
            "hint": "以 + A + 为 + B"
        },
        {
            "id": "hsk4ii-shenzhi-ex1-ex5",
            "type": "fill-blank",
            "question": "我们___学校为家，努力学习。",
            "answer": "以",
            "hint": "以 + A + 为 + B"
        },
        {
            "id": "hsk4ii-shenzhi-ex1-ex6",
            "type": "reorder",
            "words": [
                "我们以学校为家，努力学习"
            ],
            "answer": "我们以学校为家，努力学习。",
            "hint": "以 + A + 为 + B"
        },
        {
            "id": "hsk4ii-shenzhi-ex1-ex7",
            "type": "reorder",
            "words": [
                "他以诚实为做人原则"
            ],
            "answer": "他以诚实为做人原则。",
            "hint": "以 + A + 为 + B"
        },
        {
            "id": "hsk4ii-shenzhi-ex1-ex8",
            "type": "reorder",
            "words": [
                "这部电影以真实事件为背景"
            ],
            "answer": "这部电影以真实事件为背景。",
            "hint": "以 + A + 为 + B"
        },
        {
            "id": "hsk4ii-shenzhi-ex1-ex9",
            "type": "reorder",
            "words": [
                "我们以学校为家，努力学习"
            ],
            "answer": "我们以学校为家，努力学习。",
            "hint": "以 + A + 为 + B"
        },
        {
            "id": "hsk4ii-shenzhi-ex1-ex10",
            "type": "reorder",
            "words": [
                "我们以学校为家，努力学习"
            ],
            "answer": "我们以学校为家，努力学习。",
            "hint": "以 + A + 为 + B"
        },
        {
            "id": "hsk4ii-shenzhi-ex1-ex11",
            "type": "translate",
            "question": "This movie takes a real event as its background.",
            "answer": "这部电影以真实事件为背景。",
            "direction": "en-to-cn",
            "hint": "以 + A + 为 + B"
        },
        {
            "id": "hsk4ii-shenzhi-ex1-ex12",
            "type": "translate",
            "question": "这部电影以真实事件为背景。",
            "answer": "This movie takes a real event as its background.",
            "direction": "cn-to-en",
            "hint": "以 + A + 为 + B"
        },
        {
            "id": "hsk4ii-shenzhi-ex1-ex13",
            "type": "translate",
            "question": "This movie takes a real event as its background.",
            "answer": "这部电影以真实事件为背景。",
            "direction": "en-to-cn",
            "hint": "以 + A + 为 + B"
        },
        {
            "id": "hsk4ii-shenzhi-ex1-ex14",
            "type": "translate",
            "question": "他以诚实为做人原则。",
            "answer": "He takes honesty as his principle of conduct.",
            "direction": "cn-to-en",
            "hint": "以 + A + 为 + B"
        },
        {
            "id": "hsk4ii-shenzhi-ex1-ex15",
            "type": "translate",
            "question": "This movie takes a real event as its background.",
            "answer": "这部电影以真实事件为背景。",
            "direction": "en-to-cn",
            "hint": "以 + A + 为 + B"
        }
    ]
  },
  {
    "id": "hsk5i-grammar-02",
    "band": "HSK5-I",
    "order": 2,
    "title": "对…来说 (duì…láishuō)",
    "subtitle": "From someone's perspective; as far as someone is concerned.",
    "formula": "对 + (Person/Thing) + 来说",
    "explanation": "This structure is used to introduce a perspective or point of view. It indicates that the statement following it is true or relevant from the perspective of the person or thing mentioned.",
    "usageRules": [
      "It can be used with people, groups, or even abstract concepts.",
      "The phrase usually appears at the beginning of a sentence or clause.",
      "It highlights the subjectivity of the statement.",
      "Often followed by an adjective, a judgment, or an opinion."
    ],
    "examples": [
      {
        "chinese": "对我来说，学习汉语很有趣。",
        "pinyin": "Duì wǒ láishuō, xuéxí Hànyǔ hěn yǒuqù.",
        "english": "For me, learning Chinese is very interesting.",
        "highlight": "对我来说"
      },
      {
        "chinese": "对学生来说，考试很重要。",
        "pinyin": "Duì xuéshēng láishuō, kǎoshì hěn zhòngyào.",
        "english": "For students, exams are very important.",
        "highlight": "对学生来说"
      },
      {
        "chinese": "对公司来说，信誉是生命。",
        "pinyin": "Duì gōngsī láishuō, xìnyù shì shēngmìng.",
        "english": "For a company, reputation is life.",
        "highlight": "对公司来说"
      },
      {
        "chinese": "对我们国家来说，和平发展是首要任务。",
        "pinyin": "Duì wǒmen guójiā láishuō, hépíng fāzhǎn shì shǒuyào rènwù.",
        "english": "For our country, peaceful development is the top priority.",
        "highlight": "对我们国家来说"
      },
      {
        "chinese": "对一个作家来说，灵感是创作的源泉。",
        "pinyin": "Duì yīgè zuòjiā láishuō, línggǎn shì chuàngzuò de yuánquán.",
        "english": "For a writer, inspiration is the source of creation.",
        "highlight": "对一个作家来说"
      },
      {
        "chinese": "对健康来说，均衡饮食和适量运动都不可缺少。",
        "pinyin": "Duì jiànkāng láishuō, jūnhéng yǐnshí hé shìliàng yùndòng dōu bùkě quēshǎo.",
        "english": "For health, balanced diet and moderate exercise are indispensable.",
        "highlight": "对健康来说"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to omit ‘来说’ and just use ‘对…’. While ‘对…’ can sometimes convey a similar meaning, ‘对…来说’ explicitly emphasizes the perspective or standpoint, making the sentence more complete and formal. For example, ‘对我，这很难’ is less formal than ‘对我来说，这很难’.",
      "wrongExample": "对她，这不公平。",
      "correctExample": "对她来说，这不公平。",
      "explanation": "Adding ‘来说’ clarifies that the statement is a judgment from her perspective, making the expression more complete and natural."
    },
    "exercises":     [
        {
            "id": "hsk5i-grammar-02-ex1",
            "type": "fill-blank",
            "question": "对学生___，考试很重要。",
            "answer": "来说",
            "hint": "Fill in the blank with '来说'"
        },
        {
            "id": "hsk5i-grammar-02-ex2",
            "type": "fill-blank",
            "question": "对学生___，考试很重要。",
            "answer": "来说",
            "hint": "Fill in the blank with '来说'"
        },
        {
            "id": "hsk5i-grammar-02-ex3",
            "type": "fill-blank",
            "question": "对公司___，信誉是生命。",
            "answer": "来说",
            "hint": "Fill in the blank with '来说'"
        },
        {
            "id": "hsk5i-grammar-02-ex4",
            "type": "fill-blank",
            "question": "对公司___，信誉是生命。",
            "answer": "来说",
            "hint": "Fill in the blank with '来说'"
        },
        {
            "id": "hsk5i-grammar-02-ex5",
            "type": "fill-blank",
            "question": "对学生___，考试很重要。",
            "answer": "来说",
            "hint": "Fill in the blank with '来说'"
        },
        {
            "id": "hsk5i-grammar-02-ex1",
            "type": "fill-blank",
            "question": "对学生___，考试很重要。",
            "answer": "来说",
            "hint": "Fill in the blank with '来说'"
        },
        {
            "id": "hsk5i-grammar-02-ex2",
            "type": "fill-blank",
            "question": "对学生___，考试很重要。",
            "answer": "来说",
            "hint": "Fill in the blank with '来说'"
        },
        {
            "id": "hsk5i-grammar-02-ex3",
            "type": "fill-blank",
            "question": "对公司___，信誉是生命。",
            "answer": "来说",
            "hint": "Fill in the blank with '来说'"
        },
        {
            "id": "hsk5i-grammar-02-ex4",
            "type": "fill-blank",
            "question": "对公司___，信誉是生命。",
            "answer": "来说",
            "hint": "Fill in the blank with '来说'"
        },
        {
            "id": "hsk5i-grammar-02-ex5",
            "type": "fill-blank",
            "question": "对学生___，考试很重要。",
            "answer": "来说",
            "hint": "Fill in the blank with '来说'"
        },
        {
            "id": "hsk5i-grammar-02-ex6",
            "type": "reorder",
            "words": [
                ".",
                ",",
                "考试很重要",
                "对学生来说"
            ],
            "answer": "对学生来说，考试很重要。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '对…来说 (duì…láishuō)'"
        },
        {
            "id": "hsk5i-grammar-02-ex7",
            "type": "reorder",
            "words": [
                ".",
                "对公司来说",
                "信誉是生命",
                ","
            ],
            "answer": "对公司来说，信誉是生命。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '对…来说 (duì…láishuō)'"
        },
        {
            "id": "hsk5i-grammar-02-ex8",
            "type": "reorder",
            "words": [
                "考试很重要",
                ",",
                ".",
                "对学生来说"
            ],
            "answer": "对学生来说，考试很重要。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '对…来说 (duì…láishuō)'"
        },
        {
            "id": "hsk5i-grammar-02-ex9",
            "type": "reorder",
            "words": [
                "信誉是生命",
                ".",
                "对公司来说",
                ","
            ],
            "answer": "对公司来说，信誉是生命。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '对…来说 (duì…láishuō)'"
        },
        {
            "id": "hsk5i-grammar-02-ex10",
            "type": "reorder",
            "words": [
                "对学生来说",
                ".",
                ",",
                "考试很重要"
            ],
            "answer": "对学生来说，考试很重要。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '对…来说 (duì…láishuō)'"
        },
        {
            "id": "hsk5i-grammar-02-ex1",
            "type": "fill-blank",
            "question": "对学生___，考试很重要。",
            "answer": "来说",
            "hint": "Fill in the blank with '来说'"
        },
        {
            "id": "hsk5i-grammar-02-ex2",
            "type": "fill-blank",
            "question": "对学生___，考试很重要。",
            "answer": "来说",
            "hint": "Fill in the blank with '来说'"
        },
        {
            "id": "hsk5i-grammar-02-ex3",
            "type": "fill-blank",
            "question": "对公司___，信誉是生命。",
            "answer": "来说",
            "hint": "Fill in the blank with '来说'"
        },
        {
            "id": "hsk5i-grammar-02-ex4",
            "type": "fill-blank",
            "question": "对公司___，信誉是生命。",
            "answer": "来说",
            "hint": "Fill in the blank with '来说'"
        },
        {
            "id": "hsk5i-grammar-02-ex5",
            "type": "fill-blank",
            "question": "对学生___，考试很重要。",
            "answer": "来说",
            "hint": "Fill in the blank with '来说'"
        },
        {
            "id": "hsk5i-grammar-02-ex6",
            "type": "reorder",
            "words": [
                ".",
                ",",
                "考试很重要",
                "对学生来说"
            ],
            "answer": "对学生来说，考试很重要。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '对…来说 (duì…láishuō)'"
        },
        {
            "id": "hsk5i-grammar-02-ex7",
            "type": "reorder",
            "words": [
                ".",
                "对公司来说",
                "信誉是生命",
                ","
            ],
            "answer": "对公司来说，信誉是生命。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '对…来说 (duì…láishuō)'"
        },
        {
            "id": "hsk5i-grammar-02-ex8",
            "type": "reorder",
            "words": [
                "考试很重要",
                ",",
                ".",
                "对学生来说"
            ],
            "answer": "对学生来说，考试很重要。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '对…来说 (duì…láishuō)'"
        },
        {
            "id": "hsk5i-grammar-02-ex9",
            "type": "reorder",
            "words": [
                "信誉是生命",
                ".",
                "对公司来说",
                ","
            ],
            "answer": "对公司来说，信誉是生命。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '对…来说 (duì…láishuō)'"
        },
        {
            "id": "hsk5i-grammar-02-ex10",
            "type": "reorder",
            "words": [
                "对学生来说",
                ".",
                ",",
                "考试很重要"
            ],
            "answer": "对学生来说，考试很重要。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '对…来说 (duì…láishuō)'"
        },
        {
            "id": "hsk5i-grammar-02-ex11",
            "type": "translate",
            "question": "For me, learning Chinese is very interesting.",
            "answer": "对我来说，学习汉语很有趣。",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of '对…来说 (duì…láishuō)'"
        },
        {
            "id": "hsk5i-grammar-02-ex12",
            "type": "translate",
            "question": "对学生来说，考试很重要。",
            "answer": "For students, exams are very important.",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of '对…来说 (duì…láishuō)'"
        },
        {
            "id": "hsk5i-grammar-02-ex13",
            "type": "translate",
            "question": "对学生来说，考试很重要。",
            "answer": "For students, exams are very important.",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of '对…来说 (duì…láishuō)'"
        },
        {
            "id": "hsk5i-grammar-02-ex14",
            "type": "translate",
            "question": "对公司来说，信誉是生命。",
            "answer": "For a company, reputation is life.",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of '对…来说 (duì…láishuō)'"
        },
        {
            "id": "hsk5i-grammar-02-ex15",
            "type": "translate",
            "question": "对公司来说，信誉是生命。",
            "answer": "For a company, reputation is life.",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of '对…来说 (duì…láishuō)'"
        }
    ]
  },
  {
    "id": "hsk5i-grammar-07",
    "band": "HSK5-I",
    "order": 3,
    "title": "有助于 (yǒuzhùyú)",
    "subtitle": "Conducive to; contribute to; be beneficial to.",
    "formula": "A + 有助于 + B",
    "explanation": "This structure indicates that action or condition A is beneficial or helpful for outcome B. It suggests a positive contribution or influence.",
    "usageRules": [
      "A is usually an action, behavior, or condition.",
      "B is typically a positive outcome, development, or goal.",
      "Often used in formal or written contexts.",
      "Emphasizes the positive impact of one thing on another."
    ],
    "examples": [
      {
        "chinese": "多读书有助于提高个人修养。",
        "pinyin": "Duō dúshū yǒuzhùyú tígāo gèrén xiūyǎng.",
        "english": "Reading more helps improve personal cultivation.",
        "highlight": "有助于提高"
      },
      {
        "chinese": "适度运动有助于身体健康。",
        "pinyin": "Shìdù yùndòng yǒuzhùyú shēntǐ jiànkāng.",
        "english": "Moderate exercise is beneficial to physical health.",
        "highlight": "有助于身体健康"
      },
      {
        "chinese": "团队合作有助于项目的顺利完成。",
        "pinyin": "Tuánduì hézuò yǒuzhùyú xiàngmù de shùnlì wánchéng.",
        "english": "Teamwork contributes to the smooth completion of the project.",
        "highlight": "有助于项目的顺利完成"
      },
      {
        "chinese": "学习新知识有助于开阔视野。",
        "pinyin": "Xuéxí xīn zhīshì yǒuzhùyú kāikuò shìyě.",
        "english": "Learning new knowledge helps broaden one's horizons.",
        "highlight": "有助于开阔视野"
      },
      {
        "chinese": "保持积极心态有助于应对挑战。",
        "pinyin": "Bǎochí jíjí xīntài yǒuzhùyú yìngduì tiǎozhàn.",
        "english": "Maintaining a positive mindset helps in facing challenges.",
        "highlight": "有助于应对挑战"
      },
      {
        "chinese": "政府的这项政策有助于改善民生。",
        "pinyin": "Zhèngfǔ de zhè xiàng zhèngcè yǒuzhùyú gǎishàn mínshēng.",
        "english": "This government policy is conducive to improving people's livelihood.",
        "highlight": "有助于改善民生"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use ‘对…有帮助’ (duì…yǒu bāngzhù) interchangeably with ‘有助于’. While both express helpfulness, ‘有助于’ is more formal and emphasizes a direct contribution or benefit, often leading to a specific positive outcome. ‘对…有帮助’ is more general and can refer to any kind of help or assistance.",
      "wrongExample": "多吃蔬菜对健康有帮助身体。",
      "correctExample": "多吃蔬菜有助于身体健康。",
      "explanation": "‘有助于’ is more concise and formal, directly linking eating vegetables to the benefit of health. ‘对…有帮助身体’ is grammatically awkward and less natural."
    },
    "exercises":     [
        {
            "id": "hsk5i-grammar-02-ex1-ex1",
            "type": "fill-blank",
            "question": "团队合作___项目的顺利完成。",
            "answer": "有助于",
            "hint": "A + 有助于 + B"
        },
        {
            "id": "hsk5i-grammar-02-ex1-ex2",
            "type": "fill-blank",
            "question": "多读书___提高个人修养。",
            "answer": "有助于",
            "hint": "A + 有助于 + B"
        },
        {
            "id": "hsk5i-grammar-02-ex1-ex3",
            "type": "fill-blank",
            "question": "多读书___提高个人修养。",
            "answer": "有助于",
            "hint": "A + 有助于 + B"
        },
        {
            "id": "hsk5i-grammar-02-ex1-ex4",
            "type": "fill-blank",
            "question": "适度运动___身体健康。",
            "answer": "有助于",
            "hint": "A + 有助于 + B"
        },
        {
            "id": "hsk5i-grammar-02-ex1-ex5",
            "type": "fill-blank",
            "question": "适度运动___身体健康。",
            "answer": "有助于",
            "hint": "A + 有助于 + B"
        },
        {
            "id": "hsk5i-grammar-02-ex1-ex6",
            "type": "reorder",
            "words": [
                "团队合作有助于项目的顺利完成"
            ],
            "answer": "团队合作有助于项目的顺利完成。",
            "hint": "A + 有助于 + B"
        },
        {
            "id": "hsk5i-grammar-02-ex1-ex7",
            "type": "reorder",
            "words": [
                "多读书有助于提高个人修养"
            ],
            "answer": "多读书有助于提高个人修养。",
            "hint": "A + 有助于 + B"
        },
        {
            "id": "hsk5i-grammar-02-ex1-ex8",
            "type": "reorder",
            "words": [
                "适度运动有助于身体健康"
            ],
            "answer": "适度运动有助于身体健康。",
            "hint": "A + 有助于 + B"
        },
        {
            "id": "hsk5i-grammar-02-ex1-ex9",
            "type": "reorder",
            "words": [
                "适度运动有助于身体健康"
            ],
            "answer": "适度运动有助于身体健康。",
            "hint": "A + 有助于 + B"
        },
        {
            "id": "hsk5i-grammar-02-ex1-ex10",
            "type": "reorder",
            "words": [
                "适度运动有助于身体健康"
            ],
            "answer": "适度运动有助于身体健康。",
            "hint": "A + 有助于 + B"
        },
        {
            "id": "hsk5i-grammar-02-ex1-ex11",
            "type": "translate",
            "question": "Teamwork contributes to the smooth completion of the project.",
            "answer": "团队合作有助于项目的顺利完成。",
            "direction": "en-to-cn",
            "hint": "A + 有助于 + B"
        },
        {
            "id": "hsk5i-grammar-02-ex1-ex12",
            "type": "translate",
            "question": "多读书有助于提高个人修养。",
            "answer": "Reading more helps improve personal cultivation.",
            "direction": "cn-to-en",
            "hint": "A + 有助于 + B"
        },
        {
            "id": "hsk5i-grammar-02-ex1-ex13",
            "type": "translate",
            "question": "Reading more helps improve personal cultivation.",
            "answer": "多读书有助于提高个人修养。",
            "direction": "en-to-cn",
            "hint": "A + 有助于 + B"
        },
        {
            "id": "hsk5i-grammar-02-ex1-ex14",
            "type": "translate",
            "question": "多读书有助于提高个人修养。",
            "answer": "Reading more helps improve personal cultivation.",
            "direction": "cn-to-en",
            "hint": "A + 有助于 + B"
        },
        {
            "id": "hsk5i-grammar-02-ex1-ex15",
            "type": "translate",
            "question": "Reading more helps improve personal cultivation.",
            "answer": "多读书有助于提高个人修养。",
            "direction": "en-to-cn",
            "hint": "A + 有助于 + B"
        }
    ]
  },
  {
    "id": "hsk5i-grammar-08",
    "band": "HSK5-I",
    "order": 4,
    "title": "有利于/有害于 (yǒulìyú/yǒuhàiyú)",
    "subtitle": "Be beneficial to / be harmful to.",
    "formula": "A + 有利于/有害于 + B",
    "explanation": "These structures are used to express whether something is advantageous or disadvantageous to a person, thing, or situation. They are often used in formal contexts to discuss impacts.",
    "usageRules": [
      "A is usually an action, policy, or condition.",
      "B is typically a person, group, or abstract concept that is affected.",
      "‘有利于’ indicates a positive impact, while ‘有害于’ indicates a negative impact.",
      "Often used in discussions about social issues, health, or policy."
    ],
    "examples": [
      {
        "chinese": "这项政策有利于经济发展。",
        "pinyin": "Zhè xiàng zhèngcè yǒulìyú jīngjì fāzhǎn.",
        "english": "This policy is beneficial to economic development.",
        "highlight": "有利于经济发展"
      },
      {
        "chinese": "吸烟有害于身体健康。",
        "pinyin": "Xīyān yǒuhàiyú shēntǐ jiànkāng.",
        "english": "Smoking is harmful to physical health.",
        "highlight": "有害于身体健康"
      },
      {
        "chinese": "多吃蔬菜水果有利于保持健康。",
        "pinyin": "Duō chī shūcài shuǐguǒ yǒulìyú bǎochí jiànkāng.",
        "english": "Eating more vegetables and fruits is beneficial for maintaining health.",
        "highlight": "有利于保持健康"
      },
      {
        "chinese": "过度使用手机有害于视力。",
        "pinyin": "Guòdù shǐyòng shǒujī yǒuhàiyú shìlì.",
        "english": "Excessive use of mobile phones is harmful to eyesight.",
        "highlight": "有害于视力"
      },
      {
        "chinese": "公平竞争有利于市场繁荣。",
        "pinyin": "Gōngpíng jìngzhēng yǒulìyú shìchǎng fánróng.",
        "english": "Fair competition is beneficial to market prosperity.",
        "highlight": "有利于市场繁荣"
      },
      {
        "chinese": "环境污染有害于人类生存。",
        "pinyin": "Huánjìng wūrǎn yǒuhàiyú rénlèi shēngcún.",
        "english": "Environmental pollution is harmful to human survival.",
        "highlight": "有害于人类生存"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to confuse ‘有利于/有害于’ with ‘对…有好处/坏处’ (duì…yǒu hǎochù/huàichù). While both convey benefit or harm, ‘有利于/有害于’ are more formal and often used in a broader, more objective sense, discussing the impact on a system, society, or general well-being. ‘对…有好处/坏处’ is more colloquial and can refer to personal benefits or harms.",
      "wrongExample": "熬夜有害于我的身体。",
      "correctExample": "熬夜有害于健康。",
      "explanation": "‘有害于健康’ is more general and formal, referring to health in general. While ‘有害于我的身体’ is understandable, ‘有害于’ is typically used in a broader context."
    },
    "comparison": {
      "structure": "有助于",
      "difference": "‘有助于’ focuses on contribution or help towards a positive outcome, while ‘有利于’ specifically means 'beneficial to' and can be contrasted with '有害于' (harmful to). ‘有利于’ is often used when discussing advantages or disadvantages, whereas ‘有助于’ emphasizes the process of helping or facilitating."
    },
    "exercises":     [
        {
            "id": "hsk5i-grammar-08-ex1",
            "type": "fill-blank",
            "question": "吸烟___身体健康。",
            "answer": "有害于",
            "hint": "Fill in the blank with '有害于'"
        },
        {
            "id": "hsk5i-grammar-08-ex2",
            "type": "fill-blank",
            "question": "吸烟___身体健康。",
            "answer": "有害于",
            "hint": "Fill in the blank with '有害于'"
        },
        {
            "id": "hsk5i-grammar-08-ex3",
            "type": "fill-blank",
            "question": "多吃蔬菜水果___保持健康。",
            "answer": "有利于",
            "hint": "Fill in the blank with '有利于'"
        },
        {
            "id": "hsk5i-grammar-08-ex4",
            "type": "fill-blank",
            "question": "吸烟___身体健康。",
            "answer": "有害于",
            "hint": "Fill in the blank with '有害于'"
        },
        {
            "id": "hsk5i-grammar-08-ex5",
            "type": "fill-blank",
            "question": "这项政策___经济发展。",
            "answer": "有利于",
            "hint": "Fill in the blank with '有利于'"
        },
        {
            "id": "hsk5i-grammar-08-ex1",
            "type": "fill-blank",
            "question": "吸烟___身体健康。",
            "answer": "有害于",
            "hint": "Fill in the blank with '有害于'"
        },
        {
            "id": "hsk5i-grammar-08-ex2",
            "type": "fill-blank",
            "question": "吸烟___身体健康。",
            "answer": "有害于",
            "hint": "Fill in the blank with '有害于'"
        },
        {
            "id": "hsk5i-grammar-08-ex3",
            "type": "fill-blank",
            "question": "多吃蔬菜水果___保持健康。",
            "answer": "有利于",
            "hint": "Fill in the blank with '有利于'"
        },
        {
            "id": "hsk5i-grammar-08-ex4",
            "type": "fill-blank",
            "question": "吸烟___身体健康。",
            "answer": "有害于",
            "hint": "Fill in the blank with '有害于'"
        },
        {
            "id": "hsk5i-grammar-08-ex5",
            "type": "fill-blank",
            "question": "这项政策___经济发展。",
            "answer": "有利于",
            "hint": "Fill in the blank with '有利于'"
        },
        {
            "id": "hsk5i-grammar-08-ex6",
            "type": "reorder",
            "words": [
                ".",
                "吸烟有害于身体健康"
            ],
            "answer": "吸烟有害于身体健康。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '有利于/有害于 (yǒulìyú/yǒuhàiyú)'"
        },
        {
            "id": "hsk5i-grammar-08-ex7",
            "type": "reorder",
            "words": [
                ".",
                "多吃蔬菜水果有利于保持健康"
            ],
            "answer": "多吃蔬菜水果有利于保持健康。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '有利于/有害于 (yǒulìyú/yǒuhàiyú)'"
        },
        {
            "id": "hsk5i-grammar-08-ex8",
            "type": "reorder",
            "words": [
                ".",
                "这项政策有利于经济发展"
            ],
            "answer": "这项政策有利于经济发展。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '有利于/有害于 (yǒulìyú/yǒuhàiyú)'"
        },
        {
            "id": "hsk5i-grammar-08-ex9",
            "type": "reorder",
            "words": [
                ".",
                "这项政策有利于经济发展"
            ],
            "answer": "这项政策有利于经济发展。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '有利于/有害于 (yǒulìyú/yǒuhàiyú)'"
        },
        {
            "id": "hsk5i-grammar-08-ex10",
            "type": "reorder",
            "words": [
                "吸烟有害于身体健康",
                "."
            ],
            "answer": "吸烟有害于身体健康。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '有利于/有害于 (yǒulìyú/yǒuhàiyú)'"
        },
        {
            "id": "hsk5i-grammar-08-ex1",
            "type": "fill-blank",
            "question": "吸烟___身体健康。",
            "answer": "有害于",
            "hint": "Fill in the blank with '有害于'"
        },
        {
            "id": "hsk5i-grammar-08-ex2",
            "type": "fill-blank",
            "question": "吸烟___身体健康。",
            "answer": "有害于",
            "hint": "Fill in the blank with '有害于'"
        },
        {
            "id": "hsk5i-grammar-08-ex3",
            "type": "fill-blank",
            "question": "多吃蔬菜水果___保持健康。",
            "answer": "有利于",
            "hint": "Fill in the blank with '有利于'"
        },
        {
            "id": "hsk5i-grammar-08-ex4",
            "type": "fill-blank",
            "question": "吸烟___身体健康。",
            "answer": "有害于",
            "hint": "Fill in the blank with '有害于'"
        },
        {
            "id": "hsk5i-grammar-08-ex5",
            "type": "fill-blank",
            "question": "这项政策___经济发展。",
            "answer": "有利于",
            "hint": "Fill in the blank with '有利于'"
        },
        {
            "id": "hsk5i-grammar-08-ex6",
            "type": "reorder",
            "words": [
                ".",
                "吸烟有害于身体健康"
            ],
            "answer": "吸烟有害于身体健康。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '有利于/有害于 (yǒulìyú/yǒuhàiyú)'"
        },
        {
            "id": "hsk5i-grammar-08-ex7",
            "type": "reorder",
            "words": [
                ".",
                "多吃蔬菜水果有利于保持健康"
            ],
            "answer": "多吃蔬菜水果有利于保持健康。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '有利于/有害于 (yǒulìyú/yǒuhàiyú)'"
        },
        {
            "id": "hsk5i-grammar-08-ex8",
            "type": "reorder",
            "words": [
                ".",
                "这项政策有利于经济发展"
            ],
            "answer": "这项政策有利于经济发展。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '有利于/有害于 (yǒulìyú/yǒuhàiyú)'"
        },
        {
            "id": "hsk5i-grammar-08-ex9",
            "type": "reorder",
            "words": [
                ".",
                "这项政策有利于经济发展"
            ],
            "answer": "这项政策有利于经济发展。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '有利于/有害于 (yǒulìyú/yǒuhàiyú)'"
        },
        {
            "id": "hsk5i-grammar-08-ex10",
            "type": "reorder",
            "words": [
                "吸烟有害于身体健康",
                "."
            ],
            "answer": "吸烟有害于身体健康。",
            "hint": "Reorder the words to form a correct sentence using the grammar of '有利于/有害于 (yǒulìyú/yǒuhàiyú)'"
        },
        {
            "id": "hsk5i-grammar-08-ex11",
            "type": "translate",
            "question": "Eating more vegetables and fruits is beneficial for maintaining health.",
            "answer": "多吃蔬菜水果有利于保持健康。",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of '有利于/有害于 (yǒulìyú/yǒuhàiyú)'"
        },
        {
            "id": "hsk5i-grammar-08-ex12",
            "type": "translate",
            "question": "吸烟有害于身体健康。",
            "answer": "Smoking is harmful to physical health.",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of '有利于/有害于 (yǒulìyú/yǒuhàiyú)'"
        },
        {
            "id": "hsk5i-grammar-08-ex13",
            "type": "translate",
            "question": "这项政策有利于经济发展。",
            "answer": "This policy is beneficial to economic development.",
            "direction": "cn-to-en",
            "hint": "Translate the sentence, focusing on the grammar of '有利于/有害于 (yǒulìyú/yǒuhàiyú)'"
        },
        {
            "id": "hsk5i-grammar-08-ex14",
            "type": "translate",
            "question": "Eating more vegetables and fruits is beneficial for maintaining health.",
            "answer": "多吃蔬菜水果有利于保持健康。",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of '有利于/有害于 (yǒulìyú/yǒuhàiyú)'"
        },
        {
            "id": "hsk5i-grammar-08-ex15",
            "type": "translate",
            "question": "Smoking is harmful to physical health.",
            "answer": "吸烟有害于身体健康。",
            "direction": "en-to-cn",
            "hint": "Translate the sentence, focusing on the grammar of '有利于/有害于 (yǒulìyú/yǒuhàiyú)'"
        }
    ]
  },
  {
    "id": "hsk5i-grammar-09",
    "band": "HSK5-I",
    "order": 5,
    "title": "基于 (jīyú)",
    "subtitle": "Based on; in view of; on the basis of.",
    "formula": "基于 + (Reason/Foundation) + , + Statement",
    "explanation": "This structure is used to indicate the foundation, reason, or premise upon which a judgment, decision, or action is made. It is often used in formal contexts.",
    "usageRules": [
      "It introduces the basis or premise for the following statement.",
      "Often used in academic, legal, or formal discussions.",
      "Can be followed by a noun, noun phrase, or a clause.",
      "Emphasizes the objective or logical foundation."
    ],
    "examples": [
      {
        "chinese": "基于事实，我们做出了这个决定。",
        "pinyin": "Jīyú shìshí, wǒmen zuòchū le zhège juédìng.",
        "english": "Based on the facts, we made this decision.",
        "highlight": "基于事实"
      },
      {
        "chinese": "基于市场需求，公司开发了新产品。",
        "pinyin": "Jīyú shìchǎng xūqiú, gōngsī kāifā le xīn chǎnpǐn.",
        "english": "Based on market demand, the company developed new products.",
        "highlight": "基于市场需求"
      },
      {
        "chinese": "基于多年的研究，他提出了新的理论。",
        "pinyin": "Jīyú duōnián de yánjiū, tā tíchū le xīn de lǐlùn.",
        "english": "Based on years of research, he proposed a new theory.",
        "highlight": "基于多年的研究"
      },
      {
        "chinese": "基于公平原则，我们应该一视同仁。",
        "pinyin": "Jīyú gōngpíng yuánzé, wǒmen yīnggāi yīshìtóngrén.",
        "english": "Based on the principle of fairness, we should treat everyone equally.",
        "highlight": "基于公平原则"
      },
      {
        "chinese": "基于这些数据，我们可以得出结论。",
        "pinyin": "Jīyú zhèxiē shùjù, wǒmen kěyǐ déchū jiélùn.",
        "english": "Based on these data, we can draw a conclusion.",
        "highlight": "基于这些数据"
      },
      {
        "chinese": "基于对未来的预测，公司调整了发展战略。",
        "pinyin": "Jīyú duì wèilái de yùcè, gōngsī tiáozhěng le fāzhǎn zhànlüè.",
        "english": "Based on the predictions for the future, the company adjusted its development strategy.",
        "highlight": "基于对未来的预测"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to confuse ‘基于’ with ‘因为’ (yīnwèi). While both introduce a reason, ‘基于’ emphasizes the foundation or premise, often implying a more objective or formal basis for a conclusion or action. ‘因为’ is a more general conjunction for cause and effect, often used in more casual contexts.",
      "wrongExample": "因为事实，我们做出了这个决定。",
      "correctExample": "基于事实，我们做出了这个决定。",
      "explanation": "‘基于’ is more appropriate here as it emphasizes that the decision is founded upon facts, giving a more formal and logical tone than a simple ‘because’."
    },
    "exercises":     [
        {
            "id": "hsk5i-grammar-08-ex1-ex1",
            "type": "fill-blank",
            "question": "___市场需求，公司开发了新产品。",
            "answer": "基于",
            "hint": "基于 + (Reason/Foundation) + , + Statement"
        },
        {
            "id": "hsk5i-grammar-08-ex1-ex2",
            "type": "fill-blank",
            "question": "___多年的研究，他提出了新的理论。",
            "answer": "基于",
            "hint": "基于 + (Reason/Foundation) + , + Statement"
        },
        {
            "id": "hsk5i-grammar-08-ex1-ex3",
            "type": "fill-blank",
            "question": "___市场需求，公司开发了新产品。",
            "answer": "基于",
            "hint": "基于 + (Reason/Foundation) + , + Statement"
        },
        {
            "id": "hsk5i-grammar-08-ex1-ex4",
            "type": "fill-blank",
            "question": "___事实，我们做出了这个决定。",
            "answer": "基于",
            "hint": "基于 + (Reason/Foundation) + , + Statement"
        },
        {
            "id": "hsk5i-grammar-08-ex1-ex5",
            "type": "fill-blank",
            "question": "___事实，我们做出了这个决定。",
            "answer": "基于",
            "hint": "基于 + (Reason/Foundation) + , + Statement"
        },
        {
            "id": "hsk5i-grammar-08-ex1-ex6",
            "type": "reorder",
            "words": [
                "基于市场需求，公司开发了新产品"
            ],
            "answer": "基于市场需求，公司开发了新产品。",
            "hint": "基于 + (Reason/Foundation) + , + Statement"
        },
        {
            "id": "hsk5i-grammar-08-ex1-ex7",
            "type": "reorder",
            "words": [
                "基于市场需求，公司开发了新产品"
            ],
            "answer": "基于市场需求，公司开发了新产品。",
            "hint": "基于 + (Reason/Foundation) + , + Statement"
        },
        {
            "id": "hsk5i-grammar-08-ex1-ex8",
            "type": "reorder",
            "words": [
                "基于事实，我们做出了这个决定"
            ],
            "answer": "基于事实，我们做出了这个决定。",
            "hint": "基于 + (Reason/Foundation) + , + Statement"
        },
        {
            "id": "hsk5i-grammar-08-ex1-ex9",
            "type": "reorder",
            "words": [
                "基于多年的研究，他提出了新的理论"
            ],
            "answer": "基于多年的研究，他提出了新的理论。",
            "hint": "基于 + (Reason/Foundation) + , + Statement"
        },
        {
            "id": "hsk5i-grammar-08-ex1-ex10",
            "type": "reorder",
            "words": [
                "基于事实，我们做出了这个决定"
            ],
            "answer": "基于事实，我们做出了这个决定。",
            "hint": "基于 + (Reason/Foundation) + , + Statement"
        },
        {
            "id": "hsk5i-grammar-08-ex1-ex11",
            "type": "translate",
            "question": "Based on market demand, the company developed new products.",
            "answer": "基于市场需求，公司开发了新产品。",
            "direction": "en-to-cn",
            "hint": "基于 + (Reason/Foundation) + , + Statement"
        },
        {
            "id": "hsk5i-grammar-08-ex1-ex12",
            "type": "translate",
            "question": "基于事实，我们做出了这个决定。",
            "answer": "Based on the facts, we made this decision.",
            "direction": "cn-to-en",
            "hint": "基于 + (Reason/Foundation) + , + Statement"
        },
        {
            "id": "hsk5i-grammar-08-ex1-ex13",
            "type": "translate",
            "question": "Based on the facts, we made this decision.",
            "answer": "基于事实，我们做出了这个决定。",
            "direction": "en-to-cn",
            "hint": "基于 + (Reason/Foundation) + , + Statement"
        },
        {
            "id": "hsk5i-grammar-08-ex1-ex14",
            "type": "translate",
            "question": "基于多年的研究，他提出了新的理论。",
            "answer": "Based on years of research, he proposed a new theory.",
            "direction": "cn-to-en",
            "hint": "基于 + (Reason/Foundation) + , + Statement"
        },
        {
            "id": "hsk5i-grammar-08-ex1-ex15",
            "type": "translate",
            "question": "Based on the facts, we made this decision.",
            "answer": "基于事实，我们做出了这个决定。",
            "direction": "en-to-cn",
            "hint": "基于 + (Reason/Foundation) + , + Statement"
        }
    ]
  },
  {
    "id": "hsk5i-grammar-10",
    "band": "HSK5-I",
    "order": 6,
    "title": "鉴于 (jiànyú)",
    "subtitle": "In view of; seeing that; considering.",
    "formula": "鉴于 + (Situation/Fact) + , + Statement",
    "explanation": "This structure is used to introduce a specific situation or fact that serves as a premise or consideration for the following statement or action. It is often used in formal or official contexts.",
    "usageRules": [
      "It typically appears at the beginning of a sentence or clause.",
      "It introduces a situation that has already occurred or is currently existing.",
      "Often used in official documents, reports, or formal speeches.",
      "Emphasizes that the following action or decision is made in light of the preceding situation."
    ],
    "examples": [
      {
        "chinese": "鉴于目前的情况，我们决定推迟会议。",
        "pinyin": "Jiànyú mùqián de qíngkuàng, wǒmen juédìng tuīchí huìyì.",
        "english": "In view of the current situation, we decided to postpone the meeting.",
        "highlight": "鉴于目前的情况"
      },
      {
        "chinese": "鉴于他的突出贡献，公司决定给予他奖励。",
        "pinyin": "Jiànyú tā de túchū gòngxiàn, gōngsī juédìng jǐyǔ tā jiǎnglì.",
        "english": "Considering his outstanding contributions, the company decided to give him an award.",
        "highlight": "鉴于他的突出贡献"
      },
      {
        "chinese": "鉴于天气原因，航班被取消了。",
        "pinyin": "Jiànyú tiānqì yuányīn, hángbān bèi qǔxiāo le.",
        "english": "Due to weather reasons, the flight was canceled.",
        "highlight": "鉴于天气原因"
      },
      {
        "chinese": "鉴于双方的友好关系，我们希望达成共识。",
        "pinyin": "Jiànyú shuāngfāng de yǒuhǎo guānxì, wǒmen xīwàng dáchéng gòngshí.",
        "english": "In view of the friendly relations between both sides, we hope to reach a consensus.",
        "highlight": "鉴于双方的友好关系"
      },
      {
        "chinese": "鉴于时间有限，我们必须加快进度。",
        "pinyin": "Jiànyú shíjiān yǒuxiàn, wǒmen bìxū jiākuài jìndù.",
        "english": "Given the limited time, we must speed up the progress.",
        "highlight": "鉴于时间有限"
      },
      {
        "chinese": "鉴于这些证据，法官做出了判决。",
        "pinyin": "Jiànyú zhèxiē zhèngjù, fǎguān zuòchū le pànjué.",
        "english": "In light of this evidence, the judge made a ruling.",
        "highlight": "鉴于这些证据"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to confuse ‘鉴于’ with ‘因为’ (yīnwèi). While both can introduce a reason, ‘鉴于’ is more formal and implies that the following statement or action is a direct consequence or consideration of the preceding situation or fact. ‘因为’ is a more general causal conjunction. ‘鉴于’ often suggests a more deliberate and official response to a given circumstance.",
      "wrongExample": "因为情况，我们决定推迟会议。",
      "correctExample": "鉴于目前的情况，我们决定推迟会议。",
      "explanation": "‘鉴于’ is more appropriate here as it implies that the decision to postpone the meeting is made in consideration of the current situation, giving a more formal and official tone."
    },
    "comparison": {
      "structure": "基于",
      "difference": "‘鉴于’ emphasizes considering an existing situation or fact as a premise for a decision or action, often implying a reactive or responsive measure. ‘基于’ emphasizes the foundation or basis upon which something is built or derived, often implying a more proactive or foundational aspect."
    },
    "exercises":     [
        {
            "id": "hsk5i-grammar-10-ex1",
            "type": "fill-blank",
            "question": "___目前的情况，我们决定推迟会议。",
            "answer": "鉴于",
            "hint": "Use the grammar structure '鉴于'"
        },
        {
            "id": "hsk5i-grammar-10-ex2",
            "type": "fill-blank",
            "question": "___他的突出贡献，公司决定给予他奖励。",
            "answer": "鉴于",
            "hint": "Use the grammar structure '鉴于'"
        },
        {
            "id": "hsk5i-grammar-10-ex3",
            "type": "fill-blank",
            "question": "___天气原因，航班被取消了。",
            "answer": "鉴于",
            "hint": "Use the grammar structure '鉴于'"
        },
        {
            "id": "hsk5i-grammar-10-ex4",
            "type": "fill-blank",
            "question": "___目前的情况，我们决定推迟会议。",
            "answer": "鉴于",
            "hint": "Use the grammar structure '鉴于'"
        },
        {
            "id": "hsk5i-grammar-10-ex5",
            "type": "fill-blank",
            "question": "___他的突出贡献，公司决定给予他奖励。",
            "answer": "鉴于",
            "hint": "Use the grammar structure '鉴于'"
        },
        {
            "id": "hsk5i-grammar-10-ex6",
            "type": "reorder",
            "words": [
                "鉴于目前的情况我们决定推迟会议"
            ],
            "answer": "鉴于目前的情况，我们决定推迟会议。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5i-grammar-10-ex7",
            "type": "reorder",
            "words": [
                "鉴于他的突出贡献公司决定给予他奖励"
            ],
            "answer": "鉴于他的突出贡献，公司决定给予他奖励。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5i-grammar-10-ex8",
            "type": "reorder",
            "words": [
                "鉴于天气原因航班被取消了"
            ],
            "answer": "鉴于天气原因，航班被取消了。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5i-grammar-10-ex9",
            "type": "reorder",
            "words": [
                "鉴于目前的情况我们决定推迟会议"
            ],
            "answer": "鉴于目前的情况，我们决定推迟会议。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5i-grammar-10-ex10",
            "type": "reorder",
            "words": [
                "鉴于他的突出贡献公司决定给予他奖励"
            ],
            "answer": "鉴于他的突出贡献，公司决定给予他奖励。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5i-grammar-10-ex11",
            "type": "translate",
            "question": "In view of the current situation, we decided to postpone the meeting.",
            "answer": "鉴于目前的情况，我们决定推迟会议。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        },
        {
            "id": "hsk5i-grammar-10-ex12",
            "type": "translate",
            "question": "鉴于他的突出贡献，公司决定给予他奖励。",
            "answer": "Considering his outstanding contributions, the company decided to give him an award.",
            "direction": "cn-to-en",
            "hint": "Translate the Chinese sentence to English."
        },
        {
            "id": "hsk5i-grammar-10-ex13",
            "type": "translate",
            "question": "Due to weather reasons, the flight was canceled.",
            "answer": "鉴于天气原因，航班被取消了。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        },
        {
            "id": "hsk5i-grammar-10-ex14",
            "type": "translate",
            "question": "鉴于目前的情况，我们决定推迟会议。",
            "answer": "In view of the current situation, we decided to postpone the meeting.",
            "direction": "cn-to-en",
            "hint": "Translate the Chinese sentence to English."
        },
        {
            "id": "hsk5i-grammar-10-ex15",
            "type": "translate",
            "question": "Considering his outstanding contributions, the company decided to give him an award.",
            "answer": "鉴于他的突出贡献，公司决定给予他奖励。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        }
    ]
  },
  {
    "id": "hsk5i-grammar-17",
    "band": "HSK5-I",
    "order": 7,
    "title": "不妨 (bùfáng)",
    "subtitle": "Might as well; there is no harm in; it wouldn't hurt to.",
    "formula": "不妨 + Verb Phrase",
    "explanation": "This adverb is used to suggest that an action would be a good idea, or at least would do no harm. It often implies a gentle suggestion or a mild recommendation.",
    "usageRules": [
      "It is typically followed by a verb or a verb phrase.",
      "Used to offer advice or a suggestion in a polite and indirect way.",
      "Implies that the suggested action is worth trying or considering.",
      "Can be used in both positive and negative contexts, but the overall tone is usually encouraging."
    ],
    "examples": [
      {
        "chinese": "你不妨试试这个新方法。",
        "pinyin": "Nǐ bùfáng shìshì zhège xīn fāngfǎ.",
        "english": "You might as well try this new method.",
        "highlight": "不妨试试"
      },
      {
        "chinese": "遇到问题时，不妨和朋友聊聊。",
        "pinyin": "Yùdào wèntí shí, bùfáng hé péngyǒu liáoliáo.",
        "english": "When encountering problems, you might as well talk to friends.",
        "highlight": "不妨和朋友聊聊"
      },
      {
        "chinese": "周末没事，我们不妨去公园走走。",
        "pinyin": "Zhōumò méishì, wǒmen bùfáng qù gōngyuán zǒuzǒu.",
        "english": "Nothing to do on the weekend, we might as well go for a walk in the park.",
        "highlight": "不妨去公园走走"
      },
      {
        "chinese": "如果你对中国文化感兴趣，不妨学学汉语。",
        "pinyin": "Rúguǒ nǐ duì Zhōngguó wénhuà gǎnxìngqù, bùfáng xuéxué Hànyǔ.",
        "english": "If you are interested in Chinese culture, you might as well learn Chinese.",
        "highlight": "不妨学学汉语"
      },
      {
        "chinese": "与其在家无聊，我们不妨出去散散步。",
        "pinyin": "Yǔqí zàijiā wúliáo, wǒmen bùfáng chūqù sànsànbù.",
        "english": "Instead of being bored at home, we might as well go for a walk.",
        "highlight": "不妨出去散散步"
      },
      {
        "chinese": "对不了解的事情，不妨多问问。",
        "pinyin": "Duì bù liǎojiě de shìqíng, bùfáng duō wènwèn.",
        "english": "For things you don't understand, you might as well ask more questions.",
        "highlight": "不妨多问问"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use ‘不妨’ as a direct command or a strong suggestion. ‘不妨’ is a gentle suggestion, implying ‘it wouldn’t hurt to try’ or ‘why not’. It is not as strong as ‘应该’ (yīnggāi - should) or ‘必须’ (bìxū - must).",
      "wrongExample": "你必须不妨试试这个方法。",
      "correctExample": "你不妨试试这个方法。",
      "explanation": "‘必须’ and ‘不妨’ contradict each other in terms of strength of suggestion. ‘不妨’ is a softer recommendation."
    },
    "exercises":     [
        {
            "id": "hsk5i-grammar-10-ex1-ex1",
            "type": "fill-blank",
            "question": "你___试试这个新方法。",
            "answer": "不妨",
            "hint": "不妨 + Verb Phrase"
        },
        {
            "id": "hsk5i-grammar-10-ex1-ex2",
            "type": "fill-blank",
            "question": "周末没事，我们___去公园走走。",
            "answer": "不妨",
            "hint": "不妨 + Verb Phrase"
        },
        {
            "id": "hsk5i-grammar-10-ex1-ex3",
            "type": "fill-blank",
            "question": "遇到问题时，___和朋友聊聊。",
            "answer": "不妨",
            "hint": "不妨 + Verb Phrase"
        },
        {
            "id": "hsk5i-grammar-10-ex1-ex4",
            "type": "fill-blank",
            "question": "你___试试这个新方法。",
            "answer": "不妨",
            "hint": "不妨 + Verb Phrase"
        },
        {
            "id": "hsk5i-grammar-10-ex1-ex5",
            "type": "fill-blank",
            "question": "遇到问题时，___和朋友聊聊。",
            "answer": "不妨",
            "hint": "不妨 + Verb Phrase"
        },
        {
            "id": "hsk5i-grammar-10-ex1-ex6",
            "type": "reorder",
            "words": [
                "遇到问题时，不妨和朋友聊聊"
            ],
            "answer": "遇到问题时，不妨和朋友聊聊。",
            "hint": "不妨 + Verb Phrase"
        },
        {
            "id": "hsk5i-grammar-10-ex1-ex7",
            "type": "reorder",
            "words": [
                "你不妨试试这个新方法"
            ],
            "answer": "你不妨试试这个新方法。",
            "hint": "不妨 + Verb Phrase"
        },
        {
            "id": "hsk5i-grammar-10-ex1-ex8",
            "type": "reorder",
            "words": [
                "你不妨试试这个新方法"
            ],
            "answer": "你不妨试试这个新方法。",
            "hint": "不妨 + Verb Phrase"
        },
        {
            "id": "hsk5i-grammar-10-ex1-ex9",
            "type": "reorder",
            "words": [
                "周末没事，我们不妨去公园走走"
            ],
            "answer": "周末没事，我们不妨去公园走走。",
            "hint": "不妨 + Verb Phrase"
        },
        {
            "id": "hsk5i-grammar-10-ex1-ex10",
            "type": "reorder",
            "words": [
                "周末没事，我们不妨去公园走走"
            ],
            "answer": "周末没事，我们不妨去公园走走。",
            "hint": "不妨 + Verb Phrase"
        },
        {
            "id": "hsk5i-grammar-10-ex1-ex11",
            "type": "translate",
            "question": "When encountering problems, you might as well talk to friends.",
            "answer": "遇到问题时，不妨和朋友聊聊。",
            "direction": "en-to-cn",
            "hint": "不妨 + Verb Phrase"
        },
        {
            "id": "hsk5i-grammar-10-ex1-ex12",
            "type": "translate",
            "question": "遇到问题时，不妨和朋友聊聊。",
            "answer": "When encountering problems, you might as well talk to friends.",
            "direction": "cn-to-en",
            "hint": "不妨 + Verb Phrase"
        },
        {
            "id": "hsk5i-grammar-10-ex1-ex13",
            "type": "translate",
            "question": "When encountering problems, you might as well talk to friends.",
            "answer": "遇到问题时，不妨和朋友聊聊。",
            "direction": "en-to-cn",
            "hint": "不妨 + Verb Phrase"
        },
        {
            "id": "hsk5i-grammar-10-ex1-ex14",
            "type": "translate",
            "question": "你不妨试试这个新方法。",
            "answer": "You might as well try this new method.",
            "direction": "cn-to-en",
            "hint": "不妨 + Verb Phrase"
        },
        {
            "id": "hsk5i-grammar-10-ex1-ex15",
            "type": "translate",
            "question": "You might as well try this new method.",
            "answer": "你不妨试试这个新方法。",
            "direction": "en-to-cn",
            "hint": "不妨 + Verb Phrase"
        }
    ]
  },
  {
    "id": "hsk5i-grammar-18",
    "band": "HSK5-I",
    "order": 8,
    "title": "未必 (wèibì)",
    "subtitle": "Not necessarily; not likely.",
    "formula": "未必 + Verb/Adjective/Clause",
    "explanation": "‘未必’ is used to express that something is not necessarily true or not likely to happen. It indicates a degree of uncertainty or a denial of absolute certainty.",
    "usageRules": [
      "It is an adverb, usually placed before a verb, adjective, or a clause.",
      "Used to express that something is not always the case or not absolutely certain.",
      "Often used to challenge a common assumption or a seemingly obvious conclusion.",
      "Implies that there might be other possibilities or exceptions."
    ],
    "examples": [
      {
        "chinese": "有钱人未必快乐。",
        "pinyin": "Yǒuqián rén wèibì kuàilè.",
        "english": "Rich people are not necessarily happy.",
        "highlight": "未必快乐"
      },
      {
        "chinese": "努力了未必成功，但不努力一定不会成功。",
        "pinyin": "Nǔlì le wèibì chénggōng, dàn bù nǔlì yīdìng bù huì chénggōng.",
        "english": "Working hard doesn't necessarily guarantee success, but not working hard definitely won't lead to success.",
        "highlight": "未必成功"
      },
      {
        "chinese": "价格高的东西未必质量就好。",
        "pinyin": "Jiàgé gāo de dōngxī wèibì zhìliàng jiù hǎo.",
        "english": "Expensive things are not necessarily of good quality.",
        "highlight": "未必质量就好"
      },
      {
        "chinese": "他今天没来，未必是生病了。",
        "pinyin": "Tā jīntiān méi lái, wèibì shì shēngbìng le.",
        "english": "He didn't come today, it's not necessarily because he's sick.",
        "highlight": "未必是生病了"
      },
      {
        "chinese": "经验丰富的人未必能解决所有问题。",
        "pinyin": "Jīngyàn fēngfù de rén wèibì néng jiějué suǒyǒu wèntí.",
        "english": "Experienced people may not necessarily be able to solve all problems.",
        "highlight": "未必能解决"
      },
      {
        "chinese": "听起来容易的事情，做起来未必容易。",
        "pinyin": "Tīng qǐlái róngyì de shìqíng, zuò qǐlái wèibì róngyì.",
        "english": "Things that sound easy may not necessarily be easy to do.",
        "highlight": "未必容易"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to confuse ‘未必’ with ‘不一定’ (bù yīdìng). While both mean ‘not necessarily’, ‘未必’ is generally more formal and often implies a stronger denial of certainty or a more definitive statement that something is not always the case. ‘不一定’ is more colloquial and can simply mean ‘it depends’ or ‘it's not fixed’.",
      "wrongExample": "有钱人不一定快乐。",
      "correctExample": "有钱人未必快乐。",
      "explanation": "While ‘不一定’ is also correct, ‘未必’ provides a more formal and emphatic denial of the absolute certainty that rich people are happy."
    },
    "comparison": {
      "structure": "不一定",
      "difference": "‘未必’ is more formal and often implies a stronger denial of absolute certainty or a more definitive statement that something is not always the case. ‘不一定’ is more colloquial and can simply mean ‘it depends’ or ‘it's not fixed’."
    },
    "exercises":     [
        {
            "id": "hsk5i-grammar-18-ex1",
            "type": "fill-blank",
            "question": "有钱人___快乐。",
            "answer": "未必",
            "hint": "Use the grammar structure '未必'"
        },
        {
            "id": "hsk5i-grammar-18-ex2",
            "type": "fill-blank",
            "question": "努力了___成功，但不努力一定不会成功。",
            "answer": "未必",
            "hint": "Use the grammar structure '未必'"
        },
        {
            "id": "hsk5i-grammar-18-ex3",
            "type": "fill-blank",
            "question": "价格高的东西___质量就好。",
            "answer": "未必",
            "hint": "Use the grammar structure '未必'"
        },
        {
            "id": "hsk5i-grammar-18-ex4",
            "type": "fill-blank",
            "question": "有钱人___快乐。",
            "answer": "未必",
            "hint": "Use the grammar structure '未必'"
        },
        {
            "id": "hsk5i-grammar-18-ex5",
            "type": "fill-blank",
            "question": "努力了___成功，但不努力一定不会成功。",
            "answer": "未必",
            "hint": "Use the grammar structure '未必'"
        },
        {
            "id": "hsk5i-grammar-18-ex6",
            "type": "reorder",
            "words": [
                "有钱人未必快乐"
            ],
            "answer": "有钱人未必快乐。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5i-grammar-18-ex7",
            "type": "reorder",
            "words": [
                "努力了未必成功但不努力一定不会成功"
            ],
            "answer": "努力了未必成功，但不努力一定不会成功。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5i-grammar-18-ex8",
            "type": "reorder",
            "words": [
                "价格高的东西未必质量就好"
            ],
            "answer": "价格高的东西未必质量就好。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5i-grammar-18-ex9",
            "type": "reorder",
            "words": [
                "有钱人未必快乐"
            ],
            "answer": "有钱人未必快乐。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5i-grammar-18-ex10",
            "type": "reorder",
            "words": [
                "努力了未必成功但不努力一定不会成功"
            ],
            "answer": "努力了未必成功，但不努力一定不会成功。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5i-grammar-18-ex11",
            "type": "translate",
            "question": "Rich people are not necessarily happy.",
            "answer": "有钱人未必快乐。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        },
        {
            "id": "hsk5i-grammar-18-ex12",
            "type": "translate",
            "question": "努力了未必成功，但不努力一定不会成功。",
            "answer": "Working hard doesn't necessarily guarantee success, but not working hard definitely won't lead to success.",
            "direction": "cn-to-en",
            "hint": "Translate the Chinese sentence to English."
        },
        {
            "id": "hsk5i-grammar-18-ex13",
            "type": "translate",
            "question": "Expensive things are not necessarily of good quality.",
            "answer": "价格高的东西未必质量就好。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        },
        {
            "id": "hsk5i-grammar-18-ex14",
            "type": "translate",
            "question": "有钱人未必快乐。",
            "answer": "Rich people are not necessarily happy.",
            "direction": "cn-to-en",
            "hint": "Translate the Chinese sentence to English."
        },
        {
            "id": "hsk5i-grammar-18-ex15",
            "type": "translate",
            "question": "Working hard doesn't necessarily guarantee success, but not working hard definitely won't lead to success.",
            "answer": "努力了未必成功，但不努力一定不会成功。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        }
    ]
  },
  {
    "id": "hsk5i-grammar-19",
    "band": "HSK5-I",
    "order": 9,
    "title": "不见得 (bù jiàndé)",
    "subtitle": "Not necessarily; not likely.",
    "formula": "不见得 + Verb/Adjective/Clause",
    "explanation": "‘不见得’ is used to express that something is not necessarily true or not likely to happen. It is similar to ‘未必’ but often carries a slightly more colloquial tone, implying that the speaker doesn't fully agree with a common assumption.",
    "usageRules": [
      "It is an adverb, usually placed before a verb, adjective, or a clause.",
      "Used to express that something is not always the case or not absolutely certain.",
      "Often used to challenge a common assumption or a seemingly obvious conclusion.",
      "Implies that there might be other possibilities or exceptions."
    ],
    "examples": [
      {
        "chinese": "有钱就一定幸福吗？不见得。",
        "pinyin": "Yǒuqián jiù yīdìng xìngfú ma? Bù jiàndé.",
        "english": "Are rich people necessarily happy? Not necessarily.",
        "highlight": "不见得"
      },
      {
        "chinese": "他看起来很年轻，但年龄不见得小。",
        "pinyin": "Tā kàn qǐlái hěn niánqīng, dàn niánlíng bù jiàndé xiǎo.",
        "english": "He looks very young, but his age is not necessarily small.",
        "highlight": "不见得小"
      },
      {
        "chinese": "学外语不见得非要出国。",
        "pinyin": "Xué wàiyǔ bù jiàndé fēiyào chūguó.",
        "english": "Learning a foreign language doesn't necessarily require going abroad.",
        "highlight": "不见得非要"
      },
      {
        "chinese": "他说的话不见得都是真的。",
        "pinyin": "Tā shuō de huà bù jiàndé dōu shì zhēn de.",
        "english": "What he said is not necessarily all true.",
        "highlight": "不见得都是真的"
      },
      {
        "chinese": "便宜的东西不见得质量就差。",
        "pinyin": "Piányi de dōngxī bù jiàndé zhìliàng jiù chà.",
        "english": "Cheap things are not necessarily of poor quality.",
        "highlight": "不见得质量就差"
      },
      {
        "chinese": "这次考试很难，但我不见得会考不好。",
        "pinyin": "Zhè cì kǎoshì hěn nán, dàn wǒ bù jiàndé huì kǎo bù hǎo.",
        "english": "This exam is difficult, but I won't necessarily do badly.",
        "highlight": "不见得会考不好"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to confuse ‘不见得’ with ‘不一定’ (bù yīdìng) or ‘未必’ (wèibì). While all three express ‘not necessarily’, ‘不见得’ often carries a slightly more subjective or colloquial tone, implying the speaker's personal disagreement with a general assumption. ‘未必’ is more formal, and ‘不一定’ is the most neutral and common.",
      "wrongExample": "他今天不一定来。",
      "correctExample": "他今天不见得会来。",
      "explanation": "While ‘不一定’ is grammatically correct, ‘不见得’ adds a nuance of the speaker's opinion that it's unlikely he will come, rather than just stating uncertainty."
    },
    "comparison": {
      "structure": "未必",
      "difference": "‘不见得’ and ‘未必’ are very similar and often interchangeable, both meaning ‘not necessarily’. However, ‘不见得’ tends to be slightly more colloquial and subjective, often used to express a personal opinion that something is not as certain as it might seem. ‘未必’ is generally more formal."
    },
    "exercises":     [
        {
            "id": "hsk5i-grammar-18-ex1-ex1",
            "type": "fill-blank",
            "question": "学外语___非要出国。",
            "answer": "不见得",
            "hint": "不见得 + Verb/Adjective/Clause"
        },
        {
            "id": "hsk5i-grammar-18-ex1-ex2",
            "type": "fill-blank",
            "question": "有钱就一定幸福吗？___。",
            "answer": "不见得",
            "hint": "不见得 + Verb/Adjective/Clause"
        },
        {
            "id": "hsk5i-grammar-18-ex1-ex3",
            "type": "fill-blank",
            "question": "有钱就一定幸福吗？___。",
            "answer": "不见得",
            "hint": "不见得 + Verb/Adjective/Clause"
        },
        {
            "id": "hsk5i-grammar-18-ex1-ex4",
            "type": "fill-blank",
            "question": "有钱就一定幸福吗？___。",
            "answer": "不见得",
            "hint": "不见得 + Verb/Adjective/Clause"
        },
        {
            "id": "hsk5i-grammar-18-ex1-ex5",
            "type": "fill-blank",
            "question": "学外语___非要出国。",
            "answer": "不见得",
            "hint": "不见得 + Verb/Adjective/Clause"
        },
        {
            "id": "hsk5i-grammar-18-ex1-ex6",
            "type": "reorder",
            "words": [
                "学外语不见得非要出国"
            ],
            "answer": "学外语不见得非要出国。",
            "hint": "不见得 + Verb/Adjective/Clause"
        },
        {
            "id": "hsk5i-grammar-18-ex1-ex7",
            "type": "reorder",
            "words": [
                "学外语不见得非要出国"
            ],
            "answer": "学外语不见得非要出国。",
            "hint": "不见得 + Verb/Adjective/Clause"
        },
        {
            "id": "hsk5i-grammar-18-ex1-ex8",
            "type": "reorder",
            "words": [
                "学外语不见得非要出国"
            ],
            "answer": "学外语不见得非要出国。",
            "hint": "不见得 + Verb/Adjective/Clause"
        },
        {
            "id": "hsk5i-grammar-18-ex1-ex9",
            "type": "reorder",
            "words": [
                "他看起来很年轻，但年龄不见得小"
            ],
            "answer": "他看起来很年轻，但年龄不见得小。",
            "hint": "不见得 + Verb/Adjective/Clause"
        },
        {
            "id": "hsk5i-grammar-18-ex1-ex10",
            "type": "reorder",
            "words": [
                "有钱就一定幸福吗不见得"
            ],
            "answer": "有钱就一定幸福吗？不见得。",
            "hint": "不见得 + Verb/Adjective/Clause"
        },
        {
            "id": "hsk5i-grammar-18-ex1-ex11",
            "type": "translate",
            "question": "Learning a foreign language doesn't necessarily require going abroad.",
            "answer": "学外语不见得非要出国。",
            "direction": "en-to-cn",
            "hint": "不见得 + Verb/Adjective/Clause"
        },
        {
            "id": "hsk5i-grammar-18-ex1-ex12",
            "type": "translate",
            "question": "学外语不见得非要出国。",
            "answer": "Learning a foreign language doesn't necessarily require going abroad.",
            "direction": "cn-to-en",
            "hint": "不见得 + Verb/Adjective/Clause"
        },
        {
            "id": "hsk5i-grammar-18-ex1-ex13",
            "type": "translate",
            "question": "Learning a foreign language doesn't necessarily require going abroad.",
            "answer": "学外语不见得非要出国。",
            "direction": "en-to-cn",
            "hint": "不见得 + Verb/Adjective/Clause"
        },
        {
            "id": "hsk5i-grammar-18-ex1-ex14",
            "type": "translate",
            "question": "有钱就一定幸福吗？不见得。",
            "answer": "Are rich people necessarily happy? Not necessarily.",
            "direction": "cn-to-en",
            "hint": "不见得 + Verb/Adjective/Clause"
        },
        {
            "id": "hsk5i-grammar-18-ex1-ex15",
            "type": "translate",
            "question": "He looks very young, but his age is not necessarily small.",
            "answer": "他看起来很年轻，但年龄不见得小。",
            "direction": "en-to-cn",
            "hint": "不见得 + Verb/Adjective/Clause"
        }
    ]
  },
  {
    "id": "hsk5i-grammar-20",
    "band": "HSK5-I",
    "order": 10,
    "title": "何必 (hébì)",
    "subtitle": "There is no need; why bother; why must.",
    "formula": "何必 + Verb Phrase",
    "explanation": "‘何必’ is used to ask a rhetorical question, implying that there is no need or no good reason to do something. It expresses a sense of mild disapproval, suggestion, or persuasion against an unnecessary action.",
    "usageRules": [
      "It is typically followed by a verb or a verb phrase.",
      "Used to express that an action is unnecessary, unreasonable, or not worth the effort.",
      "Often used in informal conversations to offer advice or express disagreement.",
      "Can sometimes carry a tone of gentle reproach."
    ],
    "examples": [
      {
        "chinese": "何必这么着急呢？慢慢来。",
        "pinyin": "Hébì zhème zháojí ne? Mànman lái.",
        "english": "Why be so anxious? Take your time.",
        "highlight": "何必这么着急"
      },
      {
        "chinese": "既然已经决定了，何必再犹豫？",
        "pinyin": "Jìrán yǐjīng juédìng le, hébì zài yóuyù?",
        "english": "Since it's already decided, why bother hesitating again?",
        "highlight": "何必再犹豫"
      },
      {
        "chinese": "为了一点小事，何必生气呢？",
        "pinyin": "Wèi le yīdiǎn xiǎoshì, hébì shēngqì ne?",
        "english": "Why get angry over such a small matter?",
        "highlight": "何必生气"
      },
      {
        "chinese": "何必为了别人的看法而改变自己？",
        "pinyin": "Hébì wèi le biérén de kànfǎ ér gǎibiàn zìjǐ?",
        "english": "Why must you change yourself for others' opinions?",
        "highlight": "何必为了别人的看法而改变自己"
      },
      {
        "chinese": "何必去那么远的地方，附近也有很多好玩的地方。",
        "pinyin": "Hébì qù nàme yuǎn de dìfāng, fùjìn yě yǒu hěn duō hǎowán de dìfāng.",
        "english": "Why bother going so far? There are many fun places nearby too.",
        "highlight": "何必去那么远的地方"
      },
      {
        "chinese": "事情已经发生了，何必再去追究呢？",
        "pinyin": "Shìqíng yǐjīng fāshēng le, hébì zài qù zhuījiū ne?",
        "english": "The matter has already happened, why bother pursuing it further?",
        "highlight": "何必再去追究"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use ‘为什么’ (wèishénme) interchangeably with ‘何必’. While both ask ‘why’, ‘为什么’ is a direct question seeking a reason, whereas ‘何必’ is a rhetorical question implying that the action is unnecessary or ill-advised. ‘何必’ carries a stronger tone of suggestion or mild disapproval.",
      "wrongExample": "为什么这么着急呢？",
      "correctExample": "何必这么着急呢？",
      "explanation": "‘何必’ is more appropriate here as it implies that there is no need to be anxious, rather than simply asking for the reason."
    },
    "comparison": {
      "structure": "为什么",
      "difference": "‘何必’ is a rhetorical question implying that an action is unnecessary or ill-advised, often carrying a tone of suggestion or mild disapproval. ‘为什么’ is a direct question seeking a reason or explanation."
    },
    "exercises":     [
        {
            "id": "hsk5i-grammar-20-ex1",
            "type": "fill-blank",
            "question": "___这么着急呢？慢慢来。",
            "answer": "何必",
            "hint": "Use the grammar structure '何必'"
        },
        {
            "id": "hsk5i-grammar-20-ex2",
            "type": "fill-blank",
            "question": "既然已经决定了，___再犹豫？",
            "answer": "何必",
            "hint": "Use the grammar structure '何必'"
        },
        {
            "id": "hsk5i-grammar-20-ex3",
            "type": "fill-blank",
            "question": "为了一点小事，___生气呢？",
            "answer": "何必",
            "hint": "Use the grammar structure '何必'"
        },
        {
            "id": "hsk5i-grammar-20-ex4",
            "type": "fill-blank",
            "question": "___这么着急呢？慢慢来。",
            "answer": "何必",
            "hint": "Use the grammar structure '何必'"
        },
        {
            "id": "hsk5i-grammar-20-ex5",
            "type": "fill-blank",
            "question": "既然已经决定了，___再犹豫？",
            "answer": "何必",
            "hint": "Use the grammar structure '何必'"
        },
        {
            "id": "hsk5i-grammar-20-ex6",
            "type": "reorder",
            "words": [
                "何必这么着急呢慢慢来"
            ],
            "answer": "何必这么着急呢？慢慢来。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5i-grammar-20-ex7",
            "type": "reorder",
            "words": [
                "既然已经决定了何必再犹豫"
            ],
            "answer": "既然已经决定了，何必再犹豫？",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5i-grammar-20-ex8",
            "type": "reorder",
            "words": [
                "为了一点小事何必生气呢"
            ],
            "answer": "为了一点小事，何必生气呢？",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5i-grammar-20-ex9",
            "type": "reorder",
            "words": [
                "何必这么着急呢慢慢来"
            ],
            "answer": "何必这么着急呢？慢慢来。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5i-grammar-20-ex10",
            "type": "reorder",
            "words": [
                "既然已经决定了何必再犹豫"
            ],
            "answer": "既然已经决定了，何必再犹豫？",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5i-grammar-20-ex11",
            "type": "translate",
            "question": "Why be so anxious? Take your time.",
            "answer": "何必这么着急呢？慢慢来。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        },
        {
            "id": "hsk5i-grammar-20-ex12",
            "type": "translate",
            "question": "既然已经决定了，何必再犹豫？",
            "answer": "Since it's already decided, why bother hesitating again?",
            "direction": "cn-to-en",
            "hint": "Translate the Chinese sentence to English."
        },
        {
            "id": "hsk5i-grammar-20-ex13",
            "type": "translate",
            "question": "Why get angry over such a small matter?",
            "answer": "为了一点小事，何必生气呢？",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        },
        {
            "id": "hsk5i-grammar-20-ex14",
            "type": "translate",
            "question": "何必这么着急呢？慢慢来。",
            "answer": "Why be so anxious? Take your time.",
            "direction": "cn-to-en",
            "hint": "Translate the Chinese sentence to English."
        },
        {
            "id": "hsk5i-grammar-20-ex15",
            "type": "translate",
            "question": "Since it's already decided, why bother hesitating again?",
            "answer": "既然已经决定了，何必再犹豫？",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        }
    ]
  },
  {
    "id": "hsk5ii-01",
    "band": "HSK5-II",
    "order": 1,
    "title": "非…不可 (fēi…bù kě) - Must; have to",
    "subtitle": "Expressing necessity or inevitability",
    "formula": "非 + Verb/Adj + 不可",
    "explanation": "This structure emphasizes that something must be done or is absolutely necessary. It conveys a strong sense of obligation or certainty.",
    "usageRules": [
      "Used to express strong necessity or inevitability.",
      "Often implies that there is no other choice or alternative.",
      "Can be used with verbs or adjectives.",
      "The negative form is usually '非…不可', not '不非…不可'."
    ],
    "examples": [
      {
        "chinese": "你非去不可吗？",
        "pinyin": "Nǐ fēi qù bù kě ma?",
        "english": "Must you go?",
        "highlight": "非去不可"
      },
      {
        "chinese": "这件事非他不可。",
        "pinyin": "Zhè jiàn shì fēi tā bù kě.",
        "english": "This matter must be done by him.",
        "highlight": "非他不可"
      },
      {
        "chinese": "要想学好中文，非努力不可。",
        "pinyin": "Yào xiǎng xuéhǎo Zhōngwén, fēi nǔlì bù kě.",
        "english": "If you want to learn Chinese well, you must work hard.",
        "highlight": "非努力不可"
      },
      {
        "chinese": "成功非偶然不可。",
        "pinyin": "Chénggōng fēi ǒurán bù kě.",
        "english": "Success is not accidental.",
        "highlight": "非偶然不可"
      },
      {
        "chinese": "我们非赢不可。",
        "pinyin": "Wǒmen fēi yíng bù kě.",
        "english": "We must win.",
        "highlight": "非赢不可"
      },
      {
        "chinese": "他非要买这件衣服不可。",
        "pinyin": "Tā fēi yào mǎi zhè jiàn yīfu bù kě.",
        "english": "He insists on buying this piece of clothing.",
        "highlight": "非要买…不可"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use '不' before '非', which is incorrect. The '不' in '不可' already negates the possibility of not doing something.",
      "wrongExample": "他不去不可。",
      "correctExample": "他非去不可。",
      "explanation": "The correct structure is '非…不可', where '非' means 'not' and '不可' means 'cannot'. So it literally means 'not…cannot', which translates to 'must'."
    },
    "exercises":     [
        {
            "id": "hsk5i-grammar-20-ex1-ex1",
            "type": "fill-blank",
            "question": "你非去___吗？",
            "answer": "不可",
            "hint": "非 + Verb/Adj + 不可"
        },
        {
            "id": "hsk5i-grammar-20-ex1-ex2",
            "type": "fill-blank",
            "question": "这件事非他___。",
            "answer": "不可",
            "hint": "非 + Verb/Adj + 不可"
        },
        {
            "id": "hsk5i-grammar-20-ex1-ex3",
            "type": "fill-blank",
            "question": "要想学好中文，非努力___。",
            "answer": "不可",
            "hint": "非 + Verb/Adj + 不可"
        },
        {
            "id": "hsk5i-grammar-20-ex1-ex4",
            "type": "fill-blank",
            "question": "要想学好中文，___努力不可。",
            "answer": "非",
            "hint": "非 + Verb/Adj + 不可"
        },
        {
            "id": "hsk5i-grammar-20-ex1-ex5",
            "type": "fill-blank",
            "question": "要想学好中文，___努力不可。",
            "answer": "非",
            "hint": "非 + Verb/Adj + 不可"
        },
        {
            "id": "hsk5i-grammar-20-ex1-ex6",
            "type": "reorder",
            "words": [
                "你非去不可吗"
            ],
            "answer": "你非去不可吗？",
            "hint": "非 + Verb/Adj + 不可"
        },
        {
            "id": "hsk5i-grammar-20-ex1-ex7",
            "type": "reorder",
            "words": [
                "你非去不可吗"
            ],
            "answer": "你非去不可吗？",
            "hint": "非 + Verb/Adj + 不可"
        },
        {
            "id": "hsk5i-grammar-20-ex1-ex8",
            "type": "reorder",
            "words": [
                "这件事非他不可"
            ],
            "answer": "这件事非他不可。",
            "hint": "非 + Verb/Adj + 不可"
        },
        {
            "id": "hsk5i-grammar-20-ex1-ex9",
            "type": "reorder",
            "words": [
                "这件事非他不可"
            ],
            "answer": "这件事非他不可。",
            "hint": "非 + Verb/Adj + 不可"
        },
        {
            "id": "hsk5i-grammar-20-ex1-ex10",
            "type": "reorder",
            "words": [
                "你非去不可吗"
            ],
            "answer": "你非去不可吗？",
            "hint": "非 + Verb/Adj + 不可"
        },
        {
            "id": "hsk5i-grammar-20-ex1-ex11",
            "type": "translate",
            "question": "This matter must be done by him.",
            "answer": "这件事非他不可。",
            "direction": "en-to-cn",
            "hint": "非 + Verb/Adj + 不可"
        },
        {
            "id": "hsk5i-grammar-20-ex1-ex12",
            "type": "translate",
            "question": "你非去不可吗？",
            "answer": "Must you go?",
            "direction": "cn-to-en",
            "hint": "非 + Verb/Adj + 不可"
        },
        {
            "id": "hsk5i-grammar-20-ex1-ex13",
            "type": "translate",
            "question": "Must you go?",
            "answer": "你非去不可吗？",
            "direction": "en-to-cn",
            "hint": "非 + Verb/Adj + 不可"
        },
        {
            "id": "hsk5i-grammar-20-ex1-ex14",
            "type": "translate",
            "question": "要想学好中文，非努力不可。",
            "answer": "If you want to learn Chinese well, you must work hard.",
            "direction": "cn-to-en",
            "hint": "非 + Verb/Adj + 不可"
        },
        {
            "id": "hsk5i-grammar-20-ex1-ex15",
            "type": "translate",
            "question": "If you want to learn Chinese well, you must work hard.",
            "answer": "要想学好中文，非努力不可。",
            "direction": "en-to-cn",
            "hint": "非 + Verb/Adj + 不可"
        }
    ]
  },
  {
    "id": "hsk5ii-02",
    "band": "HSK5-II",
    "order": 2,
    "title": "无非是 (wúfēi shì) - Nothing but; simply; only",
    "subtitle": "Indicating that something is merely or nothing more than something else",
    "formula": "无非是 + Noun/Verb Phrase",
    "explanation": "'无非是' is used to state that something is merely or nothing more than a certain thing or situation. It often implies a simplification or a slight dismissal of complexity.",
    "usageRules": [
      "Used to indicate that something is merely or nothing more than.",
      "Often used to simplify a complex situation or to express a mild sense of disdain.",
      "Can be followed by a noun, verb phrase, or a clause.",
      "Similar to '只不过是' or '不外乎是'."
    ],
    "examples": [
      {
        "chinese": "他说的无非是些客套话。",
        "pinyin": "Tā shuō de wúfēi shì xiē kètào huà.",
        "english": "What he said was nothing but polite remarks.",
        "highlight": "无非是"
      },
      {
        "chinese": "他这么做无非是想引起注意。",
        "pinyin": "Tā zhème zuò wúfēi shì xiǎng yǐnqǐ zhùyì.",
        "english": "He did this simply to attract attention.",
        "highlight": "无非是"
      },
      {
        "chinese": "这些问题无非是时间问题。",
        "pinyin": "Zhè xiē wèntí wúfēi shì shíjiān wèntí.",
        "english": "These problems are simply a matter of time.",
        "highlight": "无非是"
      },
      {
        "chinese": "他的目的无非是钱。",
        "pinyin": "Tā de mùdì wúfēi shì qián.",
        "english": "His goal is nothing but money.",
        "highlight": "无非是"
      },
      {
        "chinese": "生活无非是柴米油盐。",
        "pinyin": "Shēnghuó wúfēi shì cháimǐyóuyán.",
        "english": "Life is nothing but daily necessities.",
        "highlight": "无非是"
      },
      {
        "chinese": "他迟到无非是睡过头了。",
        "pinyin": "Tā chídào wúfēi shì shuìguòtóu le.",
        "english": "He was late simply because he overslept.",
        "highlight": "无非是"
      }
    ],
    "commonMistake": {
      "description": "Sometimes '无非' is used without '是', which can be acceptable in very informal contexts but '无非是' is more complete and standard. Another mistake is to use it in situations where a stronger emphasis on 'only' is needed, where '仅仅是' or '只是' might be more appropriate.",
      "wrongExample": "他无非想引起注意。",
      "correctExample": "他无非是想引起注意。",
      "explanation": "Adding '是' after '无非' makes the sentence more grammatically complete and natural in formal and informal contexts."
    },
    "exercises":     [
        {
            "id": "hsk5ii-02-ex1",
            "type": "fill-blank",
            "question": "他说的___些客套话。",
            "answer": "无非是",
            "hint": "Use the grammar structure '无非是'"
        },
        {
            "id": "hsk5ii-02-ex2",
            "type": "fill-blank",
            "question": "他这么做___想引起注意。",
            "answer": "无非是",
            "hint": "Use the grammar structure '无非是'"
        },
        {
            "id": "hsk5ii-02-ex3",
            "type": "fill-blank",
            "question": "这些问题___时间问题。",
            "answer": "无非是",
            "hint": "Use the grammar structure '无非是'"
        },
        {
            "id": "hsk5ii-02-ex4",
            "type": "fill-blank",
            "question": "他说的___些客套话。",
            "answer": "无非是",
            "hint": "Use the grammar structure '无非是'"
        },
        {
            "id": "hsk5ii-02-ex5",
            "type": "fill-blank",
            "question": "他这么做___想引起注意。",
            "answer": "无非是",
            "hint": "Use the grammar structure '无非是'"
        },
        {
            "id": "hsk5ii-02-ex6",
            "type": "reorder",
            "words": [
                "他说的无非是些客套话"
            ],
            "answer": "他说的无非是些客套话。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-02-ex7",
            "type": "reorder",
            "words": [
                "他这么做无非是想引起注意"
            ],
            "answer": "他这么做无非是想引起注意。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-02-ex8",
            "type": "reorder",
            "words": [
                "这些问题无非是时间问题"
            ],
            "answer": "这些问题无非是时间问题。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-02-ex9",
            "type": "reorder",
            "words": [
                "他说的无非是些客套话"
            ],
            "answer": "他说的无非是些客套话。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-02-ex10",
            "type": "reorder",
            "words": [
                "他这么做无非是想引起注意"
            ],
            "answer": "他这么做无非是想引起注意。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-02-ex11",
            "type": "translate",
            "question": "What he said was nothing but polite remarks.",
            "answer": "他说的无非是些客套话。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        },
        {
            "id": "hsk5ii-02-ex12",
            "type": "translate",
            "question": "他这么做无非是想引起注意。",
            "answer": "He did this simply to attract attention.",
            "direction": "cn-to-en",
            "hint": "Translate the Chinese sentence to English."
        },
        {
            "id": "hsk5ii-02-ex13",
            "type": "translate",
            "question": "These problems are simply a matter of time.",
            "answer": "这些问题无非是时间问题。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        },
        {
            "id": "hsk5ii-02-ex14",
            "type": "translate",
            "question": "他说的无非是些客套话。",
            "answer": "What he said was nothing but polite remarks.",
            "direction": "cn-to-en",
            "hint": "Translate the Chinese sentence to English."
        },
        {
            "id": "hsk5ii-02-ex15",
            "type": "translate",
            "question": "He did this simply to attract attention.",
            "answer": "他这么做无非是想引起注意。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        }
    ]
  },
  {
    "id": "hsk5ii-03",
    "band": "HSK5-II",
    "order": 3,
    "title": "不过是 (bùguò shì) - Merely; only; nothing more than",
    "subtitle": "Expressing something is not as significant as it seems",
    "formula": "不过是 + Noun/Verb Phrase",
    "explanation": "'不过是' is used to downplay the significance of something, indicating that it is merely or nothing more than what is stated. It often carries a tone of understatement or slight dismissal.",
    "usageRules": [
      "Used to indicate that something is trivial or not as important as it might appear.",
      "Similar in meaning to '仅仅是' or '无非是', but can sometimes be softer in tone.",
      "Can be followed by a noun, verb phrase, or a clause.",
      "Often used to reassure or to express a mild critique."
    ],
    "examples": [
      {
        "chinese": "这不过是个小问题。",
        "pinyin": "Zhè bùguò shì ge xiǎo wèntí.",
        "english": "This is merely a small problem.",
        "highlight": "不过是"
      },
      {
        "chinese": "他不过是开个玩笑。",
        "pinyin": "Tā bùguò shì kāi ge wánxiào.",
        "english": "He was just joking.",
        "highlight": "不过是"
      },
      {
        "chinese": "我们不过是普通朋友。",
        "pinyin": "Wǒmen bùguò shì pǔtōng péngyǒu.",
        "english": "We are just ordinary friends.",
        "highlight": "不过是"
      },
      {
        "chinese": "这不过是我的个人看法。",
        "pinyin": "Zhè bùguò shì wǒ de gèrén kànfǎ.",
        "english": "This is just my personal opinion.",
        "highlight": "不过是"
      },
      {
        "chinese": "他不过是比我早来了一会儿。",
        "pinyin": "Tā bùguò shì bǐ wǒ zǎo lái le yīhuìr.",
        "english": "He just arrived a little earlier than me.",
        "highlight": "不过是"
      },
      {
        "chinese": "成功不过是努力的结果。",
        "pinyin": "Chénggōng bùguò shì nǔlì de jiéguǒ.",
        "english": "Success is nothing but the result of effort.",
        "highlight": "不过是"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to overuse '不过是' when a stronger emphasis on 'only' is needed, or when a more direct statement would be more appropriate. It's best used when there's an implicit or explicit idea that something might be perceived as more significant than it actually is.",
      "wrongExample": "我不过是喜欢他。 (If you want to strongly express 'I only like him')",
      "correctExample": "我只是喜欢他。 / 我不过是喜欢他而已。",
      "explanation": "While '我不过是喜欢他' is not strictly wrong, '我只是喜欢他' or adding '而已' makes the nuance clearer. '不过是' often implies a slight dismissal or downplaying."
    },
    "exercises":     [
        {
            "id": "hsk5ii-02-ex1-ex1",
            "type": "fill-blank",
            "question": "这___个小问题。",
            "answer": "不过是",
            "hint": "不过是 + Noun/Verb Phrase"
        },
        {
            "id": "hsk5ii-02-ex1-ex2",
            "type": "fill-blank",
            "question": "我们___普通朋友。",
            "answer": "不过是",
            "hint": "不过是 + Noun/Verb Phrase"
        },
        {
            "id": "hsk5ii-02-ex1-ex3",
            "type": "fill-blank",
            "question": "这___个小问题。",
            "answer": "不过是",
            "hint": "不过是 + Noun/Verb Phrase"
        },
        {
            "id": "hsk5ii-02-ex1-ex4",
            "type": "fill-blank",
            "question": "这___个小问题。",
            "answer": "不过是",
            "hint": "不过是 + Noun/Verb Phrase"
        },
        {
            "id": "hsk5ii-02-ex1-ex5",
            "type": "fill-blank",
            "question": "我们___普通朋友。",
            "answer": "不过是",
            "hint": "不过是 + Noun/Verb Phrase"
        },
        {
            "id": "hsk5ii-02-ex1-ex6",
            "type": "reorder",
            "words": [
                "他不过是开个玩笑"
            ],
            "answer": "他不过是开个玩笑。",
            "hint": "不过是 + Noun/Verb Phrase"
        },
        {
            "id": "hsk5ii-02-ex1-ex7",
            "type": "reorder",
            "words": [
                "他不过是开个玩笑"
            ],
            "answer": "他不过是开个玩笑。",
            "hint": "不过是 + Noun/Verb Phrase"
        },
        {
            "id": "hsk5ii-02-ex1-ex8",
            "type": "reorder",
            "words": [
                "这不过是个小问题"
            ],
            "answer": "这不过是个小问题。",
            "hint": "不过是 + Noun/Verb Phrase"
        },
        {
            "id": "hsk5ii-02-ex1-ex9",
            "type": "reorder",
            "words": [
                "我们不过是普通朋友"
            ],
            "answer": "我们不过是普通朋友。",
            "hint": "不过是 + Noun/Verb Phrase"
        },
        {
            "id": "hsk5ii-02-ex1-ex10",
            "type": "reorder",
            "words": [
                "我们不过是普通朋友"
            ],
            "answer": "我们不过是普通朋友。",
            "hint": "不过是 + Noun/Verb Phrase"
        },
        {
            "id": "hsk5ii-02-ex1-ex11",
            "type": "translate",
            "question": "We are just ordinary friends.",
            "answer": "我们不过是普通朋友。",
            "direction": "en-to-cn",
            "hint": "不过是 + Noun/Verb Phrase"
        },
        {
            "id": "hsk5ii-02-ex1-ex12",
            "type": "translate",
            "question": "这不过是个小问题。",
            "answer": "This is merely a small problem.",
            "direction": "cn-to-en",
            "hint": "不过是 + Noun/Verb Phrase"
        },
        {
            "id": "hsk5ii-02-ex1-ex13",
            "type": "translate",
            "question": "He was just joking.",
            "answer": "他不过是开个玩笑。",
            "direction": "en-to-cn",
            "hint": "不过是 + Noun/Verb Phrase"
        },
        {
            "id": "hsk5ii-02-ex1-ex14",
            "type": "translate",
            "question": "这不过是个小问题。",
            "answer": "This is merely a small problem.",
            "direction": "cn-to-en",
            "hint": "不过是 + Noun/Verb Phrase"
        },
        {
            "id": "hsk5ii-02-ex1-ex15",
            "type": "translate",
            "question": "We are just ordinary friends.",
            "answer": "我们不过是普通朋友。",
            "direction": "en-to-cn",
            "hint": "不过是 + Noun/Verb Phrase"
        }
    ]
  },
  {
    "id": "hsk5ii-04",
    "band": "HSK5-II",
    "order": 4,
    "title": "无论如何 (wúlùn rúhé) - In any case; anyhow; no matter what",
    "subtitle": "Emphasizing determination or certainty regardless of circumstances",
    "formula": "无论如何 + Clause",
    "explanation": "'无论如何' is used to emphasize that something will happen or must be done regardless of any circumstances or conditions. It conveys a strong sense of determination or certainty.",
    "usageRules": [
      "Used to express that something will happen or must be done no matter what.",
      "Can be placed at the beginning of a sentence or before the main verb.",
      "Often followed by '都', '也', or '总'.",
      "Similar to '不管怎样' or '不管发生什么'."
    ],
    "examples": [
      {
        "chinese": "无论如何，我都会支持你。",
        "pinyin": "Wúlùn rúhé, wǒ dōu huì zhīchí nǐ.",
        "english": "In any case, I will support you.",
        "highlight": "无论如何"
      },
      {
        "chinese": "无论如何，你都不能放弃。",
        "pinyin": "Wúlùn rúhé, nǐ dōu bù néng fàngqì.",
        "english": "No matter what, you cannot give up.",
        "highlight": "无论如何"
      },
      {
        "chinese": "无论如何，我们都要找到解决办法。",
        "pinyin": "Wúlùn rúhé, wǒmen dōu yào zhǎodào jiějué bànfǎ.",
        "english": "In any case, we must find a solution.",
        "highlight": "无论如何"
      },
      {
        "chinese": "无论如何，他都不会改变主意。",
        "pinyin": "Wúlùn rúhé, tā dōu bù huì gǎibiàn zhǔyì.",
        "english": "No matter what, he won't change his mind.",
        "highlight": "无论如何"
      },
      {
        "chinese": "无论如何，我都要去。",
        "pinyin": "Wúlùn rúhé, wǒ dōu yào qù.",
        "english": "In any case, I have to go.",
        "highlight": "无论如何"
      },
      {
        "chinese": "无论如何，我们都不能迟到。",
        "pinyin": "Wúlùn rúhé, wǒmen dōu bù néng chídào.",
        "english": "No matter what, we cannot be late.",
        "highlight": "无论如何"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to omit '都' or '也' after '无论如何' when it's followed by a clause, which can make the sentence sound less natural. While not always strictly required, including them strengthens the emphasis.",
      "wrongExample": "无论如何，我支持你。",
      "correctExample": "无论如何，我都会支持你。",
      "explanation": "Adding '都' or '也' after '无论如何' reinforces the idea of 'no matter what' and makes the sentence flow more naturally."
    },
    "exercises":     [
        {
            "id": "hsk5ii-04-ex1",
            "type": "fill-blank",
            "question": "___，我都会支持你。",
            "answer": "无论如何",
            "hint": "Use the grammar structure '无论如何'"
        },
        {
            "id": "hsk5ii-04-ex2",
            "type": "fill-blank",
            "question": "___，你都不能放弃。",
            "answer": "无论如何",
            "hint": "Use the grammar structure '无论如何'"
        },
        {
            "id": "hsk5ii-04-ex3",
            "type": "fill-blank",
            "question": "___，我们都要找到解决办法。",
            "answer": "无论如何",
            "hint": "Use the grammar structure '无论如何'"
        },
        {
            "id": "hsk5ii-04-ex4",
            "type": "fill-blank",
            "question": "___，我都会支持你。",
            "answer": "无论如何",
            "hint": "Use the grammar structure '无论如何'"
        },
        {
            "id": "hsk5ii-04-ex5",
            "type": "fill-blank",
            "question": "___，你都不能放弃。",
            "answer": "无论如何",
            "hint": "Use the grammar structure '无论如何'"
        },
        {
            "id": "hsk5ii-04-ex6",
            "type": "reorder",
            "words": [
                "无论如何我都会支持你"
            ],
            "answer": "无论如何，我都会支持你。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-04-ex7",
            "type": "reorder",
            "words": [
                "无论如何你都不能放弃"
            ],
            "answer": "无论如何，你都不能放弃。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-04-ex8",
            "type": "reorder",
            "words": [
                "无论如何我们都要找到解决办法"
            ],
            "answer": "无论如何，我们都要找到解决办法。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-04-ex9",
            "type": "reorder",
            "words": [
                "无论如何我都会支持你"
            ],
            "answer": "无论如何，我都会支持你。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-04-ex10",
            "type": "reorder",
            "words": [
                "无论如何你都不能放弃"
            ],
            "answer": "无论如何，你都不能放弃。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-04-ex11",
            "type": "translate",
            "question": "In any case, I will support you.",
            "answer": "无论如何，我都会支持你。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        },
        {
            "id": "hsk5ii-04-ex12",
            "type": "translate",
            "question": "无论如何，你都不能放弃。",
            "answer": "No matter what, you cannot give up.",
            "direction": "cn-to-en",
            "hint": "Translate the Chinese sentence to English."
        },
        {
            "id": "hsk5ii-04-ex13",
            "type": "translate",
            "question": "In any case, we must find a solution.",
            "answer": "无论如何，我们都要找到解决办法。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        },
        {
            "id": "hsk5ii-04-ex14",
            "type": "translate",
            "question": "无论如何，我都会支持你。",
            "answer": "In any case, I will support you.",
            "direction": "cn-to-en",
            "hint": "Translate the Chinese sentence to English."
        },
        {
            "id": "hsk5ii-04-ex15",
            "type": "translate",
            "question": "No matter what, you cannot give up.",
            "answer": "无论如何，你都不能放弃。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        }
    ]
  },
  {
    "id": "hsk5ii-05",
    "band": "HSK5-II",
    "order": 5,
    "title": "归根结底 (guīgēnjiédǐ) - In the final analysis; fundamentally; after all",
    "subtitle": "Getting to the root cause or essential nature of something",
    "formula": "归根结底，Clause",
    "explanation": "'归根结底' is used to express the fundamental or ultimate reason for something, or to summarize the essential nature of a situation after considering various factors. It means 'in the final analysis' or 'at bottom'.",
    "usageRules": [
      "Used to introduce a conclusion about the fundamental cause or nature of something.",
      "Often appears at the beginning of a sentence or a clause.",
      "Implies a deeper understanding or a summary of complex issues.",
      "Can be followed by a statement of fact or an opinion."
    ],
    "examples": [
      {
        "chinese": "归根结底，还是经验不足。",
        "pinyin": "Guīgēnjiédǐ, háishì jīngyàn bùzú.",
        "english": "In the final analysis, it's still due to lack of experience.",
        "highlight": "归根结底"
      },
      {
        "chinese": "归根结底，教育才是最重要的。",
        "pinyin": "Guīgēnjiédǐ, jiàoyù cái shì zuì zhòngyào de.",
        "english": "Fundamentally, education is the most important.",
        "highlight": "归根结底"
      },
      {
        "chinese": "归根结底，问题出在沟通上。",
        "pinyin": "Guīgēnjiédǐ, wèntí chū zài gōutōng shàng.",
        "english": "After all, the problem lies in communication.",
        "highlight": "归根结底"
      },
      {
        "chinese": "归根结底，他还是为了自己的利益。",
        "pinyin": "Guīgēnjiédǐ, tā háishì wèile zìjǐ de lìyì.",
        "english": "Ultimately, he is still for his own benefit.",
        "highlight": "归根结底"
      },
      {
        "chinese": "归根结底，幸福是一种选择。",
        "pinyin": "Guīgēnjiédǐ, xìngfú shì yī zhǒng xuǎnzé.",
        "english": "In the final analysis, happiness is a choice.",
        "highlight": "归根结底"
      },
      {
        "chinese": "归根结底，所有的成功都离不开努力。",
        "pinyin": "Guīgēnjiédǐ, suǒyǒu de chénggōng dōu lí bù kāi nǔlì.",
        "english": "Fundamentally, all success is inseparable from effort.",
        "highlight": "归根结底"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use '归根结底' in situations where a simple '最后' (finally) or '总之' (in short) would suffice, without truly delving into the fundamental aspect. '归根结底' implies a deeper analysis.",
      "wrongExample": "最后，我们决定去北京。 (If you mean 'finally' not 'fundamentally')",
      "correctExample": "归根结底，我们决定去北京是因为那里机会更多。",
      "explanation": "'归根结底' should be used when explaining the underlying reason or essential truth, not just the final outcome."
    },
    "exercises":     [
        {
            "id": "hsk5ii-04-ex1-ex1",
            "type": "fill-blank",
            "question": "___，还是经验不足。",
            "answer": "归根结底",
            "hint": "归根结底，Clause"
        },
        {
            "id": "hsk5ii-04-ex1-ex2",
            "type": "fill-blank",
            "question": "___，教育才是最重要的。",
            "answer": "归根结底",
            "hint": "归根结底，Clause"
        },
        {
            "id": "hsk5ii-04-ex1-ex3",
            "type": "fill-blank",
            "question": "___，还是经验不足。",
            "answer": "归根结底",
            "hint": "归根结底，Clause"
        },
        {
            "id": "hsk5ii-04-ex1-ex4",
            "type": "fill-blank",
            "question": "___，教育才是最重要的。",
            "answer": "归根结底",
            "hint": "归根结底，Clause"
        },
        {
            "id": "hsk5ii-04-ex1-ex5",
            "type": "fill-blank",
            "question": "___，教育才是最重要的。",
            "answer": "归根结底",
            "hint": "归根结底，Clause"
        },
        {
            "id": "hsk5ii-04-ex1-ex6",
            "type": "reorder",
            "words": [
                "归根结底，还是经验不足"
            ],
            "answer": "归根结底，还是经验不足。",
            "hint": "归根结底，Clause"
        },
        {
            "id": "hsk5ii-04-ex1-ex7",
            "type": "reorder",
            "words": [
                "归根结底，还是经验不足"
            ],
            "answer": "归根结底，还是经验不足。",
            "hint": "归根结底，Clause"
        },
        {
            "id": "hsk5ii-04-ex1-ex8",
            "type": "reorder",
            "words": [
                "归根结底，还是经验不足"
            ],
            "answer": "归根结底，还是经验不足。",
            "hint": "归根结底，Clause"
        },
        {
            "id": "hsk5ii-04-ex1-ex9",
            "type": "reorder",
            "words": [
                "归根结底，教育才是最重要的"
            ],
            "answer": "归根结底，教育才是最重要的。",
            "hint": "归根结底，Clause"
        },
        {
            "id": "hsk5ii-04-ex1-ex10",
            "type": "reorder",
            "words": [
                "归根结底，教育才是最重要的"
            ],
            "answer": "归根结底，教育才是最重要的。",
            "hint": "归根结底，Clause"
        },
        {
            "id": "hsk5ii-04-ex1-ex11",
            "type": "translate",
            "question": "Fundamentally, education is the most important.",
            "answer": "归根结底，教育才是最重要的。",
            "direction": "en-to-cn",
            "hint": "归根结底，Clause"
        },
        {
            "id": "hsk5ii-04-ex1-ex12",
            "type": "translate",
            "question": "归根结底，教育才是最重要的。",
            "answer": "Fundamentally, education is the most important.",
            "direction": "cn-to-en",
            "hint": "归根结底，Clause"
        },
        {
            "id": "hsk5ii-04-ex1-ex13",
            "type": "translate",
            "question": "In the final analysis, it's still due to lack of experience.",
            "answer": "归根结底，还是经验不足。",
            "direction": "en-to-cn",
            "hint": "归根结底，Clause"
        },
        {
            "id": "hsk5ii-04-ex1-ex14",
            "type": "translate",
            "question": "归根结底，教育才是最重要的。",
            "answer": "Fundamentally, education is the most important.",
            "direction": "cn-to-en",
            "hint": "归根结底，Clause"
        },
        {
            "id": "hsk5ii-04-ex1-ex15",
            "type": "translate",
            "question": "In the final analysis, it's still due to lack of experience.",
            "answer": "归根结底，还是经验不足。",
            "direction": "en-to-cn",
            "hint": "归根结底，Clause"
        }
    ]
  },
  {
    "id": "hsk5ii-06",
    "band": "HSK5-II",
    "order": 6,
    "title": "总而言之 (zǒngéryánzhī) - In short; in a word; in brief",
    "subtitle": "Summarizing previous statements or arguments",
    "formula": "总而言之，Clause",
    "explanation": "'总而言之' is used to summarize what has been said, providing a concise conclusion or a general statement. It's similar to 'in short' or 'to sum up'.",
    "usageRules": [
      "Used to introduce a summary or conclusion of previous statements.",
      "Typically appears at the beginning of a sentence or a clause.",
      "Helps to condense information and provide a clear takeaway.",
      "Can be followed by a statement that encapsulates the main idea."
    ],
    "examples": [
      {
        "chinese": "总而言之，这次会议非常成功。",
        "pinyin": "Zǒngéryánzhī, zhè cì huìyì fēicháng chénggōng.",
        "english": "In short, this meeting was very successful.",
        "highlight": "总而言之"
      },
      {
        "chinese": "总而言之，我们必须更加努力。",
        "pinyin": "Zǒngéryánzhī, wǒmen bìxū gèngjiā nǔlì.",
        "english": "In a word, we must work harder.",
        "highlight": "总而言之"
      },
      {
        "chinese": "总而言之，他是个值得信赖的人。",
        "pinyin": "Zǒngéryánzhī, tā shì ge zhídé xìnlài de rén.",
        "english": "In brief, he is a trustworthy person.",
        "highlight": "总而言之"
      },
      {
        "chinese": "总而言之，情况比我们想象的要好。",
        "pinyin": "Zǒngéryánzhī, qíngkuàng bǐ wǒmen xiǎngxiàng de yào hǎo.",
        "english": "To sum up, the situation is better than we imagined.",
        "highlight": "总而言之"
      },
      {
        "chinese": "总而言之，健康最重要。",
        "pinyin": "Zǒngéryánzhī, jiànkāng zuì zhòngyào.",
        "english": "In short, health is the most important.",
        "highlight": "总而言之"
      },
      {
        "chinese": "总而言之，这次旅行非常愉快。",
        "pinyin": "Zǒngéryánzhī, zhè cì lǚxíng fēicháng yúkuài.",
        "english": "All in all, this trip was very pleasant.",
        "highlight": "总而言之"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use '总而言之' to introduce new information rather than summarizing existing points. It should always serve as a concluding or summarizing remark.",
      "wrongExample": "总而言之，我们明天要去公园。 (If this is new information)",
      "correctExample": "我们讨论了很久，总而言之，我们明天要去公园。",
      "explanation": "'总而言之' is for summarizing, not for introducing new topics or decisions without prior context."
    },
    "exercises":     [
        {
            "id": "hsk5ii-06-ex1",
            "type": "fill-blank",
            "question": "___，这次会议非常成功。",
            "answer": "总而言之",
            "hint": "Use the grammar structure '总而言之'"
        },
        {
            "id": "hsk5ii-06-ex2",
            "type": "fill-blank",
            "question": "___，我们必须更加努力。",
            "answer": "总而言之",
            "hint": "Use the grammar structure '总而言之'"
        },
        {
            "id": "hsk5ii-06-ex3",
            "type": "fill-blank",
            "question": "___，他是个值得信赖的人。",
            "answer": "总而言之",
            "hint": "Use the grammar structure '总而言之'"
        },
        {
            "id": "hsk5ii-06-ex4",
            "type": "fill-blank",
            "question": "___，这次会议非常成功。",
            "answer": "总而言之",
            "hint": "Use the grammar structure '总而言之'"
        },
        {
            "id": "hsk5ii-06-ex5",
            "type": "fill-blank",
            "question": "___，我们必须更加努力。",
            "answer": "总而言之",
            "hint": "Use the grammar structure '总而言之'"
        },
        {
            "id": "hsk5ii-06-ex6",
            "type": "reorder",
            "words": [
                "总而言之这次会议非常成功"
            ],
            "answer": "总而言之，这次会议非常成功。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-06-ex7",
            "type": "reorder",
            "words": [
                "总而言之我们必须更加努力"
            ],
            "answer": "总而言之，我们必须更加努力。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-06-ex8",
            "type": "reorder",
            "words": [
                "总而言之他是个值得信赖的人"
            ],
            "answer": "总而言之，他是个值得信赖的人。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-06-ex9",
            "type": "reorder",
            "words": [
                "总而言之这次会议非常成功"
            ],
            "answer": "总而言之，这次会议非常成功。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-06-ex10",
            "type": "reorder",
            "words": [
                "总而言之我们必须更加努力"
            ],
            "answer": "总而言之，我们必须更加努力。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-06-ex11",
            "type": "translate",
            "question": "In short, this meeting was very successful.",
            "answer": "总而言之，这次会议非常成功。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        },
        {
            "id": "hsk5ii-06-ex12",
            "type": "translate",
            "question": "总而言之，我们必须更加努力。",
            "answer": "In a word, we must work harder.",
            "direction": "cn-to-en",
            "hint": "Translate the Chinese sentence to English."
        },
        {
            "id": "hsk5ii-06-ex13",
            "type": "translate",
            "question": "In brief, he is a trustworthy person.",
            "answer": "总而言之，他是个值得信赖的人。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        },
        {
            "id": "hsk5ii-06-ex14",
            "type": "translate",
            "question": "总而言之，这次会议非常成功。",
            "answer": "In short, this meeting was very successful.",
            "direction": "cn-to-en",
            "hint": "Translate the Chinese sentence to English."
        },
        {
            "id": "hsk5ii-06-ex15",
            "type": "translate",
            "question": "In a word, we must work harder.",
            "answer": "总而言之，我们必须更加努力。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        }
    ]
  },
  {
    "id": "hsk5ii-07",
    "band": "HSK5-II",
    "order": 7,
    "title": "换言之 (huànyánzhī) - In other words",
    "subtitle": "Rephrasing or clarifying a previous statement",
    "formula": "换言之，Clause",
    "explanation": "'换言之' is used to rephrase or clarify a previous statement, often making it simpler, more direct, or explaining it from a different perspective. It means 'in other words'.",
    "usageRules": [
      "Used to introduce an alternative way of saying something that has just been stated.",
      "Helps to clarify or simplify complex ideas.",
      "Often appears at the beginning of a sentence or a clause.",
      "Can be followed by a statement that rephrases the preceding idea."
    ],
    "examples": [
      {
        "chinese": "他没有通过考试，换言之，他失败了。",
        "pinyin": "Tā méiyǒu tōngguò kǎoshì, huànyánzhī, tā shībài le.",
        "english": "He didn't pass the exam; in other words, he failed.",
        "highlight": "换言之"
      },
      {
        "chinese": "我们必须节约用水，换言之，保护环境。",
        "pinyin": "Wǒmen bìxū jiéyuē yòngshuǐ, huànyánzhī, bǎohù huánjìng.",
        "english": "We must conserve water; in other words, protect the environment.",
        "highlight": "换言之"
      },
      {
        "chinese": "他是个工作狂，换言之，他把所有时间都花在工作上。",
        "pinyin": "Tā shì ge gōngzuòkuáng, huànyánzhī, tā bǎ suǒyǒu shíjiān dōu huā zài gōngzuò shàng.",
        "english": "He's a workaholic; in other words, he spends all his time on work.",
        "highlight": "换言之"
      },
      {
        "chinese": "这项任务非常艰巨，换言之，我们需要更多帮助。",
        "pinyin": "Zhè xiàng rènwù fēicháng jiānjù, huànyánzhī, wǒmen xūyào gèng duō bāngzhù.",
        "english": "This task is very arduous; in other words, we need more help.",
        "highlight": "换言之"
      },
      {
        "chinese": "他很内向，换言之，不善于交际。",
        "pinyin": "Tā hěn nèixiàng, huànyánzhī, bù shànyú jiāojì.",
        "english": "He is introverted; in other words, not good at socializing.",
        "highlight": "换言之"
      },
      {
        "chinese": "这个项目资金不足，换言之，可能无法启动。",
        "pinyin": "Zhè ge xiàngmù zījīn bùzú, huànyánzhī, kěnéng wúfǎ qǐdòng.",
        "english": "This project lacks funding; in other words, it might not be able to start.",
        "highlight": "换言之"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use '换言之' when simply adding more information, rather than rephrasing or clarifying. It should always offer an alternative way of expressing the same idea.",
      "wrongExample": "我很忙，换言之，我有很多工作。 (This is more of an elaboration than a rephrasing)",
      "correctExample": "我很忙，换言之，我没有时间休息。",
      "explanation": "'换言之' is for restating the same idea in different words, not for adding new, related information."
    },
    "exercises":     [
        {
            "id": "hsk5ii-06-ex1-ex1",
            "type": "fill-blank",
            "question": "他没有通过考试，___，他失败了。",
            "answer": "换言之",
            "hint": "Fill in the blank using the structure: 换言之"
        },
        {
            "id": "hsk5ii-06-ex1-ex2",
            "type": "fill-blank",
            "question": "我们必须节约用水，___，保护环境。",
            "answer": "换言之",
            "hint": "Fill in the blank using the structure: 换言之"
        },
        {
            "id": "hsk5ii-06-ex1-ex3",
            "type": "fill-blank",
            "question": "他是个工作狂，___，他把所有时间都花在工作上。",
            "answer": "换言之",
            "hint": "Fill in the blank using the structure: 换言之"
        },
        {
            "id": "hsk5ii-06-ex1-ex4",
            "type": "fill-blank",
            "question": "他没有通过考试，___，他失败了。",
            "answer": "换言之",
            "hint": "Fill in the blank using the structure: 换言之"
        },
        {
            "id": "hsk5ii-06-ex1-ex5",
            "type": "fill-blank",
            "question": "我们必须节约用水，___，保护环境。",
            "answer": "换言之",
            "hint": "Fill in the blank using the structure: 换言之"
        },
        {
            "id": "hsk5ii-06-ex1-ex6",
            "type": "reorder",
            "words": [
                "他没有通过考试",
                "，",
                "他失败了",
                "，",
                "换言之",
                "。"
            ],
            "answer": "他没有通过考试，换言之，他失败了。",
            "hint": "Reorder the words to form a correct sentence using 换言之"
        },
        {
            "id": "hsk5ii-06-ex1-ex7",
            "type": "reorder",
            "words": [
                "，",
                "。",
                "我们必须节约用水",
                "换言之",
                "保护环境",
                "，"
            ],
            "answer": "我们必须节约用水，换言之，保护环境。",
            "hint": "Reorder the words to form a correct sentence using 换言之"
        },
        {
            "id": "hsk5ii-06-ex1-ex8",
            "type": "reorder",
            "words": [
                "他是个工作狂",
                "换言之",
                "。",
                "，",
                "他把所有时间都花在工作上",
                "，"
            ],
            "answer": "他是个工作狂，换言之，他把所有时间都花在工作上。",
            "hint": "Reorder the words to form a correct sentence using 换言之"
        },
        {
            "id": "hsk5ii-06-ex1-ex9",
            "type": "reorder",
            "words": [
                "他没有通过考试",
                "他失败了",
                "。",
                "，",
                "换言之",
                "，"
            ],
            "answer": "他没有通过考试，换言之，他失败了。",
            "hint": "Reorder the words to form a correct sentence using 换言之"
        },
        {
            "id": "hsk5ii-06-ex1-ex10",
            "type": "reorder",
            "words": [
                "换言之",
                "。",
                "，",
                "保护环境",
                "，",
                "我们必须节约用水"
            ],
            "answer": "我们必须节约用水，换言之，保护环境。",
            "hint": "Reorder the words to form a correct sentence using 换言之"
        },
        {
            "id": "hsk5ii-06-ex1-ex11",
            "type": "translate",
            "question": "He didn't pass the exam; in other words, he failed.",
            "answer": "他没有通过考试，换言之，他失败了。",
            "direction": "en-to-cn",
            "hint": "Translate using the grammar point: 换言之"
        },
        {
            "id": "hsk5ii-06-ex1-ex12",
            "type": "translate",
            "question": "我们必须节约用水，换言之，保护环境。",
            "answer": "We must conserve water; in other words, protect the environment.",
            "direction": "cn-to-en",
            "hint": "Translate using the grammar point: 换言之"
        },
        {
            "id": "hsk5ii-06-ex1-ex13",
            "type": "translate",
            "question": "He's a workaholic; in other words, he spends all his time on work.",
            "answer": "他是个工作狂，换言之，他把所有时间都花在工作上。",
            "direction": "en-to-cn",
            "hint": "Translate using the grammar point: 换言之"
        },
        {
            "id": "hsk5ii-06-ex1-ex14",
            "type": "translate",
            "question": "他没有通过考试，换言之，他失败了。",
            "answer": "He didn't pass the exam; in other words, he failed.",
            "direction": "cn-to-en",
            "hint": "Translate using the grammar point: 换言之"
        },
        {
            "id": "hsk5ii-06-ex1-ex15",
            "type": "translate",
            "question": "We must conserve water; in other words, protect the environment.",
            "answer": "我们必须节约用水，换言之，保护环境。",
            "direction": "en-to-cn",
            "hint": "Translate using the grammar point: 换言之"
        }
    ]
  },
  {
    "id": "hsk5ii-08",
    "band": "HSK5-II",
    "order": 8,
    "title": "与此同时 (yǔcǐ tóngshí) - At the same time; meanwhile",
    "subtitle": "Indicating simultaneous occurrence of events",
    "formula": "Clause 1，与此同时，Clause 2",
    "explanation": "'与此同时' is used to indicate that two or more events are happening concurrently. It connects two clauses, showing a temporal relationship of simultaneity.",
    "usageRules": [
      "Used to connect two events that occur at the same time.",
      "Can be placed at the beginning of the second clause.",
      "Often used in formal writing or reporting.",
      "Similar to '同时' but more formal and emphasizes the parallel nature of events."
    ],
    "examples": [
      {
        "chinese": "他正在学习中文，与此同时，他还在准备考研。",
        "pinyin": "Tā zhèngzài xuéxí Zhōngwén, yǔcǐ tóngshí, tā hái zài zhǔnbèi kǎoyán.",
        "english": "He is studying Chinese; at the same time, he is also preparing for the postgraduate entrance exam.",
        "highlight": "与此同时"
      },
      {
        "chinese": "经济快速发展，与此同时，环境问题也日益突出。",
        "pinyin": "Jīngjì kuàisù fāzhǎn, yǔcǐ tóngshí, huánjìng wèntí yě rìyì tūchū.",
        "english": "The economy is developing rapidly; meanwhile, environmental problems are also becoming increasingly prominent.",
        "highlight": "与此同时"
      },
      {
        "chinese": "政府出台了新政策，与此同时，民众反响热烈。",
        "pinyin": "Zhèngfǔ chūtái le xīn zhèngcè, yǔcǐ tóngshí, mínzhòng fǎnxiǎng rèliè.",
        "english": "The government introduced new policies; at the same time, the public responded enthusiastically.",
        "highlight": "与此同时"
      },
      {
        "chinese": "他在公司担任经理，与此同时，他还在大学兼职教书。",
        "pinyin": "Tā zài gōngsī dānrèn jīnglǐ, yǔcǐ tóngshí, tā hái zài dàxué jiānzhí jiāoshū.",
        "english": "He works as a manager in the company; meanwhile, he also teaches part-time at the university.",
        "highlight": "与此同时"
      },
      {
        "chinese": "科技进步带来了便利，与此同时，也带来了一些新的挑战。",
        "pinyin": "Kējì jìnbù dài lái le biànlì, yǔcǐ tóngshí, yě dài lái le yī xiē xīn de tiǎozhàn.",
        "english": "Technological progress brings convenience; at the same time, it also brings some new challenges.",
        "highlight": "与此同时"
      },
      {
        "chinese": "他努力工作，与此同时，也注重家庭生活。",
        "pinyin": "Tā nǔlì gōngzuò, yǔcǐ tóngshí, yě zhùzhòng jiātíng shēnghuó.",
        "english": "He works hard; at the same time, he also pays attention to family life.",
        "highlight": "与此同时"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to confuse '与此同时' with '然后' (then). '与此同时' indicates simultaneous actions, while '然后' indicates sequential actions. Ensure the events are truly happening at the same time.",
      "wrongExample": "我吃完饭，与此同时，我洗碗。 (Unless you eat and wash dishes simultaneously)",
      "correctExample": "我吃完饭，然后洗碗。 / 我在吃饭，与此同时，我听音乐。",
      "explanation": "'与此同时' is for parallel actions, '然后' for consecutive actions."
    },
    "exercises":     [
        {
            "id": "hsk5ii-08-ex1",
            "type": "fill-blank",
            "question": "他正在学习中文，___，他还在准备考研。",
            "answer": "与此同时",
            "hint": "Use the grammar structure '与此同时'"
        },
        {
            "id": "hsk5ii-08-ex2",
            "type": "fill-blank",
            "question": "经济快速发展，___，环境问题也日益突出。",
            "answer": "与此同时",
            "hint": "Use the grammar structure '与此同时'"
        },
        {
            "id": "hsk5ii-08-ex3",
            "type": "fill-blank",
            "question": "政府出台了新政策，___，民众反响热烈。",
            "answer": "与此同时",
            "hint": "Use the grammar structure '与此同时'"
        },
        {
            "id": "hsk5ii-08-ex4",
            "type": "fill-blank",
            "question": "他正在学习中文，___，他还在准备考研。",
            "answer": "与此同时",
            "hint": "Use the grammar structure '与此同时'"
        },
        {
            "id": "hsk5ii-08-ex5",
            "type": "fill-blank",
            "question": "经济快速发展，___，环境问题也日益突出。",
            "answer": "与此同时",
            "hint": "Use the grammar structure '与此同时'"
        },
        {
            "id": "hsk5ii-08-ex6",
            "type": "reorder",
            "words": [
                "他正在学习中文与此同时他还在准备考研"
            ],
            "answer": "他正在学习中文，与此同时，他还在准备考研。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-08-ex7",
            "type": "reorder",
            "words": [
                "经济快速发展与此同时环境问题也日益突出"
            ],
            "answer": "经济快速发展，与此同时，环境问题也日益突出。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-08-ex8",
            "type": "reorder",
            "words": [
                "政府出台了新政策与此同时民众反响热烈"
            ],
            "answer": "政府出台了新政策，与此同时，民众反响热烈。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-08-ex9",
            "type": "reorder",
            "words": [
                "他正在学习中文与此同时他还在准备考研"
            ],
            "answer": "他正在学习中文，与此同时，他还在准备考研。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-08-ex10",
            "type": "reorder",
            "words": [
                "经济快速发展与此同时环境问题也日益突出"
            ],
            "answer": "经济快速发展，与此同时，环境问题也日益突出。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-08-ex11",
            "type": "translate",
            "question": "He is studying Chinese; at the same time, he is also preparing for the postgraduate entrance exam.",
            "answer": "他正在学习中文，与此同时，他还在准备考研。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        },
        {
            "id": "hsk5ii-08-ex12",
            "type": "translate",
            "question": "经济快速发展，与此同时，环境问题也日益突出。",
            "answer": "The economy is developing rapidly; meanwhile, environmental problems are also becoming increasingly prominent.",
            "direction": "cn-to-en",
            "hint": "Translate the Chinese sentence to English."
        },
        {
            "id": "hsk5ii-08-ex13",
            "type": "translate",
            "question": "The government introduced new policies; at the same time, the public responded enthusiastically.",
            "answer": "政府出台了新政策，与此同时，民众反响热烈。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        },
        {
            "id": "hsk5ii-08-ex14",
            "type": "translate",
            "question": "他正在学习中文，与此同时，他还在准备考研。",
            "answer": "He is studying Chinese; at the same time, he is also preparing for the postgraduate entrance exam.",
            "direction": "cn-to-en",
            "hint": "Translate the Chinese sentence to English."
        },
        {
            "id": "hsk5ii-08-ex15",
            "type": "translate",
            "question": "The economy is developing rapidly; meanwhile, environmental problems are also becoming increasingly prominent.",
            "answer": "经济快速发展，与此同时，环境问题也日益突出。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        }
    ]
  },
  {
    "id": "hsk5ii-09",
    "band": "HSK5-II",
    "order": 9,
    "title": "在此基础上 (zàicǐ jīchǔ shàng) - On this basis; building on this",
    "subtitle": "Indicating progression or development from a previous point",
    "formula": "[Previous statement]，在此基础上，Clause",
    "explanation": "'在此基础上' is used to indicate that a new action or development is built upon a previously mentioned foundation or condition. It signifies progression or further development.",
    "usageRules": [
      "Used to show that something new is developed from a previous foundation.",
      "Often connects two sentences or clauses, with the first providing the basis.",
      "Common in formal and academic writing.",
      "Similar to '在此之上' or '以此为基础'."
    ],
    "examples": [
      {
        "chinese": "我们已经完成了第一阶段的任务，在此基础上，我们将开始第二阶段。",
        "pinyin": "Wǒmen yǐjīng wánchéng le dì yī jiēduàn de rènwù, zàicǐ jīchǔ shàng, wǒmen jiāng kāishǐ dì èr jiēduàn.",
        "english": "We have completed the first phase of the task; on this basis, we will start the second phase.",
        "highlight": "在此基础上"
      },
      {
        "chinese": "他掌握了基本理论，在此基础上，他进行了深入研究。",
        "pinyin": "Tā zhǎngwò le jīběn lǐlùn, zàicǐ jīchǔ shàng, tā jìnxíng le shēnrù yánjiū.",
        "english": "He mastered the basic theories; building on this, he conducted in-depth research.",
        "highlight": "在此基础上"
      },
      {
        "chinese": "公司取得了初步成功，在此基础上，决定扩大生产。",
        "pinyin": "Gōngsī qǔdé le chūbù chénggōng, zàicǐ jīchǔ shàng, juédìng kuòdà shēngchǎn.",
        "english": "The company achieved initial success; on this basis, it decided to expand production.",
        "highlight": "在此基础上"
      },
      {
        "chinese": "我们收集了大量数据，在此基础上，可以进行分析。",
        "pinyin": "Wǒmen shōují le dàliàng shùjù, zàicǐ jīchǔ shàng, kěyǐ jìnxíng fēnxī.",
        "english": "We collected a large amount of data; on this basis, we can conduct analysis.",
        "highlight": "在此基础上"
      },
      {
        "chinese": "他学习了编程基础，在此基础上，开发了一个小程序。",
        "pinyin": "Tā xuéxí le biānchéng jīchǔ, zàicǐ jīchǔ shàng, kāifā le yī ge xiǎochéngxù.",
        "english": "He learned programming basics; building on this, he developed a small program.",
        "highlight": "在此基础上"
      },
      {
        "chinese": "我们已经达成共识，在此基础上，可以进一步合作。",
        "pinyin": "Wǒmen yǐjīng dáchéng gòngshí, zàicǐ jīchǔ shàng, kěyǐ jìnyībù hézuò.",
        "english": "We have reached a consensus; on this basis, we can further cooperate.",
        "highlight": "在此基础上"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use '在此基础上' when there isn't a clear, established 'basis' or foundation. It implies a logical or sequential development, so ensure the preceding statement truly serves as a foundation.",
      "wrongExample": "我吃了早饭，在此基础上，我出门了。 (Eating breakfast is not a 'basis' for going out in this context)",
      "correctExample": "我完成了准备工作，在此基础上，我出门了。",
      "explanation": "'在此基础上' requires a preceding statement that acts as a prerequisite or foundation for the subsequent action."
    },
    "exercises":     [
        {
            "id": "hsk5ii-08-ex1-ex1",
            "type": "fill-blank",
            "question": "我们已经完成了第一阶段的任务，___，我们将开始第二阶段。",
            "answer": "在此基础上",
            "hint": "Fill in the blank using the structure: 在此基础上"
        },
        {
            "id": "hsk5ii-08-ex1-ex2",
            "type": "fill-blank",
            "question": "他掌握了基本理论，___，他进行了深入研究。",
            "answer": "在此基础上",
            "hint": "Fill in the blank using the structure: 在此基础上"
        },
        {
            "id": "hsk5ii-08-ex1-ex3",
            "type": "fill-blank",
            "question": "公司取得了初步成功，___，决定扩大生产。",
            "answer": "在此基础上",
            "hint": "Fill in the blank using the structure: 在此基础上"
        },
        {
            "id": "hsk5ii-08-ex1-ex4",
            "type": "fill-blank",
            "question": "我们已经完成了第一阶段的任务，___，我们将开始第二阶段。",
            "answer": "在此基础上",
            "hint": "Fill in the blank using the structure: 在此基础上"
        },
        {
            "id": "hsk5ii-08-ex1-ex5",
            "type": "fill-blank",
            "question": "他掌握了基本理论，___，他进行了深入研究。",
            "answer": "在此基础上",
            "hint": "Fill in the blank using the structure: 在此基础上"
        },
        {
            "id": "hsk5ii-08-ex1-ex6",
            "type": "reorder",
            "words": [
                "。",
                "我们已经完成了第一阶段的任务",
                "，",
                "，",
                "在此基础上",
                "我们将开始第二阶段"
            ],
            "answer": "我们已经完成了第一阶段的任务，在此基础上，我们将开始第二阶段。",
            "hint": "Reorder the words to form a correct sentence using 在此基础上"
        },
        {
            "id": "hsk5ii-08-ex1-ex7",
            "type": "reorder",
            "words": [
                "在此基础上",
                "他掌握了基本理论",
                "，",
                "。",
                "，",
                "他进行了深入研究"
            ],
            "answer": "他掌握了基本理论，在此基础上，他进行了深入研究。",
            "hint": "Reorder the words to form a correct sentence using 在此基础上"
        },
        {
            "id": "hsk5ii-08-ex1-ex8",
            "type": "reorder",
            "words": [
                "，",
                "决定扩大生产",
                "在此基础上",
                "公司取得了初步成功",
                "，",
                "。"
            ],
            "answer": "公司取得了初步成功，在此基础上，决定扩大生产。",
            "hint": "Reorder the words to form a correct sentence using 在此基础上"
        },
        {
            "id": "hsk5ii-08-ex1-ex9",
            "type": "reorder",
            "words": [
                "。",
                "我们将开始第二阶段",
                "，",
                "在此基础上",
                "我们已经完成了第一阶段的任务",
                "，"
            ],
            "answer": "我们已经完成了第一阶段的任务，在此基础上，我们将开始第二阶段。",
            "hint": "Reorder the words to form a correct sentence using 在此基础上"
        },
        {
            "id": "hsk5ii-08-ex1-ex10",
            "type": "reorder",
            "words": [
                "。",
                "在此基础上",
                "，",
                "，",
                "他进行了深入研究",
                "他掌握了基本理论"
            ],
            "answer": "他掌握了基本理论，在此基础上，他进行了深入研究。",
            "hint": "Reorder the words to form a correct sentence using 在此基础上"
        },
        {
            "id": "hsk5ii-08-ex1-ex11",
            "type": "translate",
            "question": "We have completed the first phase of the task; on this basis, we will start the second phase.",
            "answer": "我们已经完成了第一阶段的任务，在此基础上，我们将开始第二阶段。",
            "direction": "en-to-cn",
            "hint": "Translate using the grammar point: 在此基础上"
        },
        {
            "id": "hsk5ii-08-ex1-ex12",
            "type": "translate",
            "question": "他掌握了基本理论，在此基础上，他进行了深入研究。",
            "answer": "He mastered the basic theories; building on this, he conducted in-depth research.",
            "direction": "cn-to-en",
            "hint": "Translate using the grammar point: 在此基础上"
        },
        {
            "id": "hsk5ii-08-ex1-ex13",
            "type": "translate",
            "question": "The company achieved initial success; on this basis, it decided to expand production.",
            "answer": "公司取得了初步成功，在此基础上，决定扩大生产。",
            "direction": "en-to-cn",
            "hint": "Translate using the grammar point: 在此基础上"
        },
        {
            "id": "hsk5ii-08-ex1-ex14",
            "type": "translate",
            "question": "我们已经完成了第一阶段的任务，在此基础上，我们将开始第二阶段。",
            "answer": "We have completed the first phase of the task; on this basis, we will start the second phase.",
            "direction": "cn-to-en",
            "hint": "Translate using the grammar point: 在此基础上"
        },
        {
            "id": "hsk5ii-08-ex1-ex15",
            "type": "translate",
            "question": "He mastered the basic theories; building on this, he conducted in-depth research.",
            "answer": "他掌握了基本理论，在此基础上，他进行了深入研究。",
            "direction": "en-to-cn",
            "hint": "Translate using the grammar point: 在此基础上"
        }
    ]
  },
  {
    "id": "hsk5ii-10",
    "band": "HSK5-II",
    "order": 10,
    "title": "就此而言 (jiùcǐ éryán) - In this regard; concerning this",
    "subtitle": "Focusing on a specific aspect or point",
    "formula": "就此而言，Clause",
    "explanation": "'就此而言' is used to narrow the scope of discussion to a specific point or aspect that has just been mentioned. It means 'in this regard' or 'concerning this'.",
    "usageRules": [
      "Used to specify that the following statement applies to a particular point or aspect.",
      "Often follows a statement that introduces a topic or issue.",
      "Common in formal discussions, debates, or academic writing.",
      "Helps to maintain clarity and focus in communication."
    ],
    "examples": [
      {
        "chinese": "他在这方面很有经验，就此而言，他是我们的专家。",
        "pinyin": "Tā zài zhè fāngmiàn hěn yǒu jīngyàn, jiùcǐ éryán, tā shì wǒmen de zhuānjiā.",
        "english": "He is very experienced in this area; in this regard, he is our expert.",
        "highlight": "就此而言"
      },
      {
        "chinese": "这个计划有很多优点，就此而言，值得我们考虑。",
        "pinyin": "Zhè ge jìhuà yǒu hěn duō yōudiǎn, jiùcǐ éryán, zhídé wǒmen kǎolǜ.",
        "english": "This plan has many advantages; concerning this, it is worth our consideration.",
        "highlight": "就此而言"
      },
      {
        "chinese": "他的表现一直很好，就此而言，他应该得到奖励。",
        "pinyin": "Tā de biǎoxiàn yīzhí hěn hǎo, jiùcǐ éryán, tā yīnggāi dédào jiǎnglì.",
        "english": "His performance has always been good; in this regard, he should be rewarded.",
        "highlight": "就此而言"
      },
      {
        "chinese": "这项技术是全新的，就此而言，它具有巨大的潜力。",
        "pinyin": "Zhè xiàng jìshù shì quánxīn de, jiùcǐ éryán, tā jùyǒu jùdà de qiánlì.",
        "english": "This technology is brand new; in this regard, it has huge potential.",
        "highlight": "就此而言"
      },
      {
        "chinese": "这个问题很复杂，就此而言，我们需要更多时间。",
        "pinyin": "Zhè ge wèntí hěn fùzá, jiùcǐ éryán, wǒmen xūyào gèng duō shíjiān.",
        "english": "This problem is very complex; concerning this, we need more time.",
        "highlight": "就此而言"
      },
      {
        "chinese": "他对中国文化很了解，就此而言，他可以帮助你。",
        "pinyin": "Tā duì Zhōngguó wénhuà hěn liǎojiě, jiùcǐ éryán, tā kěyǐ bāngzhù nǐ.",
        "english": "He knows a lot about Chinese culture; in this regard, he can help you.",
        "highlight": "就此而言"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use '就此而言' when the following statement is not directly related to the specific point just mentioned, or when it's a general statement. It should always refer back to a specific aspect.",
      "wrongExample": "天气很好，就此而言，我们去公园。 (The weather is not a specific 'point' to refer back to in this way)",
      "correctExample": "天气很好，适合户外活动，就此而言，去公园是个不错的选择。",
      "explanation": "'就此而言' requires a clear, specific preceding point to which the subsequent statement refers."
    },
    "exercises":     [
        {
            "id": "hsk5ii-10-ex1",
            "type": "fill-blank",
            "question": "他在这方面很有经验，___，他是我们的专家。",
            "answer": "就此而言",
            "hint": "Use the grammar structure '就此而言'"
        },
        {
            "id": "hsk5ii-10-ex2",
            "type": "fill-blank",
            "question": "这个计划有很多优点，___，值得我们考虑。",
            "answer": "就此而言",
            "hint": "Use the grammar structure '就此而言'"
        },
        {
            "id": "hsk5ii-10-ex3",
            "type": "fill-blank",
            "question": "他的表现一直很好，___，他应该得到奖励。",
            "answer": "就此而言",
            "hint": "Use the grammar structure '就此而言'"
        },
        {
            "id": "hsk5ii-10-ex4",
            "type": "fill-blank",
            "question": "他在这方面很有经验，___，他是我们的专家。",
            "answer": "就此而言",
            "hint": "Use the grammar structure '就此而言'"
        },
        {
            "id": "hsk5ii-10-ex5",
            "type": "fill-blank",
            "question": "这个计划有很多优点，___，值得我们考虑。",
            "answer": "就此而言",
            "hint": "Use the grammar structure '就此而言'"
        },
        {
            "id": "hsk5ii-10-ex6",
            "type": "reorder",
            "words": [
                "他在这方面很有经验就此而言他是我们的专家"
            ],
            "answer": "他在这方面很有经验，就此而言，他是我们的专家。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-10-ex7",
            "type": "reorder",
            "words": [
                "这个计划有很多优点就此而言值得我们考虑"
            ],
            "answer": "这个计划有很多优点，就此而言，值得我们考虑。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-10-ex8",
            "type": "reorder",
            "words": [
                "他的表现一直很好就此而言他应该得到奖励"
            ],
            "answer": "他的表现一直很好，就此而言，他应该得到奖励。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-10-ex9",
            "type": "reorder",
            "words": [
                "他在这方面很有经验就此而言他是我们的专家"
            ],
            "answer": "他在这方面很有经验，就此而言，他是我们的专家。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-10-ex10",
            "type": "reorder",
            "words": [
                "这个计划有很多优点就此而言值得我们考虑"
            ],
            "answer": "这个计划有很多优点，就此而言，值得我们考虑。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-10-ex11",
            "type": "translate",
            "question": "He is very experienced in this area; in this regard, he is our expert.",
            "answer": "他在这方面很有经验，就此而言，他是我们的专家。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        },
        {
            "id": "hsk5ii-10-ex12",
            "type": "translate",
            "question": "这个计划有很多优点，就此而言，值得我们考虑。",
            "answer": "This plan has many advantages; concerning this, it is worth our consideration.",
            "direction": "cn-to-en",
            "hint": "Translate the Chinese sentence to English."
        },
        {
            "id": "hsk5ii-10-ex13",
            "type": "translate",
            "question": "His performance has always been good; in this regard, he should be rewarded.",
            "answer": "他的表现一直很好，就此而言，他应该得到奖励。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        },
        {
            "id": "hsk5ii-10-ex14",
            "type": "translate",
            "question": "他在这方面很有经验，就此而言，他是我们的专家。",
            "answer": "He is very experienced in this area; in this regard, he is our expert.",
            "direction": "cn-to-en",
            "hint": "Translate the Chinese sentence to English."
        },
        {
            "id": "hsk5ii-10-ex15",
            "type": "translate",
            "question": "This plan has many advantages; concerning this, it is worth our consideration.",
            "answer": "这个计划有很多优点，就此而言，值得我们考虑。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        }
    ]
  },
  {
    "id": "hsk5ii-11",
    "band": "HSK5-II",
    "order": 11,
    "title": "从某种意义上说 (cóng mǒuzhǒng yìyì shàng shuō) - In a sense; in some sense",
    "subtitle": "Qualifying a statement or offering a particular perspective",
    "formula": "从某种意义上说，Clause",
    "explanation": "This phrase is used to qualify a statement, suggesting that it is true or valid only from a particular perspective or in a certain way. It introduces a nuanced viewpoint.",
    "usageRules": [
      "Used to introduce a statement that is true in a specific sense or from a certain perspective.",
      "Often softens a statement or acknowledges its limitations.",
      "Typically appears at the beginning of a sentence or a clause.",
      "Can be followed by a statement that offers a qualified truth."
    ],
    "examples": [
      {
        "chinese": "从某种意义上说，他成功了。",
        "pinyin": "Cóng mǒuzhǒng yìyì shàng shuō, tā chénggōng le.",
        "english": "In a sense, he succeeded.",
        "highlight": "从某种意义上说"
      },
      {
        "chinese": "从某种意义上说，我们都是时间的过客。",
        "pinyin": "Cóng mǒuzhǒng yìyì shàng shuō, wǒmen dōu shì shíjiān de guòkè.",
        "english": "In some sense, we are all passers-by of time.",
        "highlight": "从某种意义上说"
      },
      {
        "chinese": "从某种意义上说，失败是成功之母。",
        "pinyin": "Cóng mǒuzhǒng yìyì shàng shuō, shībài shì chénggōng zhī mǔ.",
        "english": "In a sense, failure is the mother of success.",
        "highlight": "从某种意义上说"
      },
      {
        "chinese": "从某种意义上说，他说的没错。",
        "pinyin": "Cóng mǒuzhǒng yìyì shàng shuō, tā shuō de méi cuò.",
        "english": "In a sense, what he said is not wrong.",
        "highlight": "从某种意义上说"
      },
      {
        "chinese": "从某种意义上说，我们已经完成了任务。",
        "pinyin": "Cóng mǒuzhǒng yìyì shàng shuō, wǒmen yǐjīng wánchéng le rènwù.",
        "english": "In a sense, we have completed the task.",
        "highlight": "从某种意义上说"
      },
      {
        "chinese": "从某种意义上说，生活就是一场旅行。",
        "pinyin": "Cóng mǒuzhǒng yìyì shàng shuō, shēnghuó jiùshì yī chǎng lǚxíng.",
        "english": "In a sense, life is a journey.",
        "highlight": "从某种意义上说"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use '从某种意义上说' when a statement is universally true or when no qualification is needed. It should only be used when there's a specific, limited, or metaphorical sense in which the statement holds true.",
      "wrongExample": "从某种意义上说，太阳从东边升起。 (This is a universal truth, no qualification needed)",
      "correctExample": "从某种意义上说，他是一个孤独的人，尽管他有很多朋友。",
      "explanation": "This phrase is for introducing a specific perspective or a qualified truth, not for stating obvious facts."
    },
    "exercises":     [
        {
            "id": "hsk5ii-10-ex1-ex1",
            "type": "fill-blank",
            "question": "___，他成功了。",
            "answer": "从某种意义上说",
            "hint": "Fill in the blank using the structure: 从某种意义上说"
        },
        {
            "id": "hsk5ii-10-ex1-ex2",
            "type": "fill-blank",
            "question": "___，我们都是时间的过客。",
            "answer": "从某种意义上说",
            "hint": "Fill in the blank using the structure: 从某种意义上说"
        },
        {
            "id": "hsk5ii-10-ex1-ex3",
            "type": "fill-blank",
            "question": "___，失败是成功之母。",
            "answer": "从某种意义上说",
            "hint": "Fill in the blank using the structure: 从某种意义上说"
        },
        {
            "id": "hsk5ii-10-ex1-ex4",
            "type": "fill-blank",
            "question": "___，他成功了。",
            "answer": "从某种意义上说",
            "hint": "Fill in the blank using the structure: 从某种意义上说"
        },
        {
            "id": "hsk5ii-10-ex1-ex5",
            "type": "fill-blank",
            "question": "___，我们都是时间的过客。",
            "answer": "从某种意义上说",
            "hint": "Fill in the blank using the structure: 从某种意义上说"
        },
        {
            "id": "hsk5ii-10-ex1-ex6",
            "type": "reorder",
            "words": [
                "。",
                "他成功了",
                "从某种意义上说",
                "，"
            ],
            "answer": "从某种意义上说，他成功了。",
            "hint": "Reorder the words to form a correct sentence using 从某种意义上说"
        },
        {
            "id": "hsk5ii-10-ex1-ex7",
            "type": "reorder",
            "words": [
                "我们都是时间的过客",
                "。",
                "，",
                "从某种意义上说"
            ],
            "answer": "从某种意义上说，我们都是时间的过客。",
            "hint": "Reorder the words to form a correct sentence using 从某种意义上说"
        },
        {
            "id": "hsk5ii-10-ex1-ex8",
            "type": "reorder",
            "words": [
                "从某种意义上说",
                "失败是成功之母",
                "，",
                "。"
            ],
            "answer": "从某种意义上说，失败是成功之母。",
            "hint": "Reorder the words to form a correct sentence using 从某种意义上说"
        },
        {
            "id": "hsk5ii-10-ex1-ex9",
            "type": "reorder",
            "words": [
                "，",
                "。",
                "从某种意义上说",
                "他成功了"
            ],
            "answer": "从某种意义上说，他成功了。",
            "hint": "Reorder the words to form a correct sentence using 从某种意义上说"
        },
        {
            "id": "hsk5ii-10-ex1-ex10",
            "type": "reorder",
            "words": [
                "。",
                "，",
                "从某种意义上说",
                "我们都是时间的过客"
            ],
            "answer": "从某种意义上说，我们都是时间的过客。",
            "hint": "Reorder the words to form a correct sentence using 从某种意义上说"
        },
        {
            "id": "hsk5ii-10-ex1-ex11",
            "type": "translate",
            "question": "In a sense, he succeeded.",
            "answer": "从某种意义上说，他成功了。",
            "direction": "en-to-cn",
            "hint": "Translate using the grammar point: 从某种意义上说"
        },
        {
            "id": "hsk5ii-10-ex1-ex12",
            "type": "translate",
            "question": "从某种意义上说，我们都是时间的过客。",
            "answer": "In some sense, we are all passers-by of time.",
            "direction": "cn-to-en",
            "hint": "Translate using the grammar point: 从某种意义上说"
        },
        {
            "id": "hsk5ii-10-ex1-ex13",
            "type": "translate",
            "question": "In a sense, failure is the mother of success.",
            "answer": "从某种意义上说，失败是成功之母。",
            "direction": "en-to-cn",
            "hint": "Translate using the grammar point: 从某种意义上说"
        },
        {
            "id": "hsk5ii-10-ex1-ex14",
            "type": "translate",
            "question": "从某种意义上说，他成功了。",
            "answer": "In a sense, he succeeded.",
            "direction": "cn-to-en",
            "hint": "Translate using the grammar point: 从某种意义上说"
        },
        {
            "id": "hsk5ii-10-ex1-ex15",
            "type": "translate",
            "question": "In some sense, we are all passers-by of time.",
            "answer": "从某种意义上说，我们都是时间的过客。",
            "direction": "en-to-cn",
            "hint": "Translate using the grammar point: 从某种意义上说"
        }
    ]
  },
  {
    "id": "hsk5ii-12",
    "band": "HSK5-II",
    "order": 12,
    "title": "可见 (kějiàn) - It is thus clear that; it can be seen that",
    "subtitle": "Drawing a conclusion from preceding information",
    "formula": "[Statement]，可见，Clause",
    "explanation": "'可见' is used to introduce a conclusion or inference that can be drawn from the preceding statement or evidence. It means 'it is thus clear that' or 'it can be seen that'.",
    "usageRules": [
      "Used to introduce a conclusion or inference based on what has just been stated.",
      "Often connects two sentences or clauses, with the first providing the evidence.",
      "Common in formal writing, reports, or arguments.",
      "Similar to '由此可知' or '由此可见'."
    ],
    "examples": [
      {
        "chinese": "他每天都学习到深夜，可见他非常努力。",
        "pinyin": "Tā měitiān dōu xuéxí dào shēnyè, kějiàn tā fēicháng nǔlì.",
        "english": "He studies until late every night; it is thus clear that he is very diligent.",
        "highlight": "可见"
      },
      {
        "chinese": "这个项目提前完成了，可见团队效率很高。",
        "pinyin": "Zhè ge xiàngmù tíqián wánchéng le, kějiàn tuánduì xiàolǜ hěn gāo.",
        "english": "This project was completed ahead of schedule; it can be seen that the team's efficiency is very high.",
        "highlight": "可见"
      },
      {
        "chinese": "他从不迟到，可见他很守时。",
        "pinyin": "Tā cóng bù chídào, kějiàn tā hěn shǒushí.",
        "english": "He is never late; it is thus clear that he is very punctual.",
        "highlight": "可见"
      },
      {
        "chinese": "这些数据表明，市场需求正在增长，可见我们的决策是正确的。",
        "pinyin": "Zhè xiē shùjù biǎomíng, shìchǎng xūqiú zhèngzài zēngzhǎng, kějiàn wǒmen de juécè shì zhèngquè de.",
        "english": "These data show that market demand is growing; it is thus clear that our decision is correct.",
        "highlight": "可见"
      },
      {
        "chinese": "他能说流利的中文，可见他付出了很多努力。",
        "pinyin": "Tā néng shuō liúlì de Zhōngwén, kějiàn tā fùchū le hěn duō nǔlì.",
        "english": "He can speak fluent Chinese; it can be seen that he put in a lot of effort.",
        "highlight": "可见"
      },
      {
        "chinese": "他每次考试都得满分，可见他学习很好。",
        "pinyin": "Tā měi cì kǎoshì dōu dé mǎnfēn, kějiàn tā xuéxí hěn hǎo.",
        "english": "He gets full marks in every exam; it is thus clear that he studies very well.",
        "highlight": "可见"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use '可见' to introduce a statement that is not a direct or logical conclusion from the preceding information. The conclusion should be clearly inferable from the evidence provided.",
      "wrongExample": "我今天很开心，可见天气很好。 (Happiness doesn't directly imply good weather, though they can be related)",
      "correctExample": "外面阳光明媚，可见天气很好。",
      "explanation": "'可见' is for drawing clear conclusions from evidence, not for loosely related observations."
    },
    "exercises":     [
        {
            "id": "hsk5ii-12-ex1",
            "type": "fill-blank",
            "question": "他每天都学习到深夜，___他非常努力。",
            "answer": "可见",
            "hint": "Use the grammar structure '可见'"
        },
        {
            "id": "hsk5ii-12-ex2",
            "type": "fill-blank",
            "question": "这个项目提前完成了，___团队效率很高。",
            "answer": "可见",
            "hint": "Use the grammar structure '可见'"
        },
        {
            "id": "hsk5ii-12-ex3",
            "type": "fill-blank",
            "question": "他从不迟到，___他很守时。",
            "answer": "可见",
            "hint": "Use the grammar structure '可见'"
        },
        {
            "id": "hsk5ii-12-ex4",
            "type": "fill-blank",
            "question": "他每天都学习到深夜，___他非常努力。",
            "answer": "可见",
            "hint": "Use the grammar structure '可见'"
        },
        {
            "id": "hsk5ii-12-ex5",
            "type": "fill-blank",
            "question": "这个项目提前完成了，___团队效率很高。",
            "answer": "可见",
            "hint": "Use the grammar structure '可见'"
        },
        {
            "id": "hsk5ii-12-ex6",
            "type": "reorder",
            "words": [
                "他每天都学习到深夜可见他非常努力"
            ],
            "answer": "他每天都学习到深夜，可见他非常努力。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-12-ex7",
            "type": "reorder",
            "words": [
                "这个项目提前完成了可见团队效率很高"
            ],
            "answer": "这个项目提前完成了，可见团队效率很高。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-12-ex8",
            "type": "reorder",
            "words": [
                "他从不迟到可见他很守时"
            ],
            "answer": "他从不迟到，可见他很守时。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-12-ex9",
            "type": "reorder",
            "words": [
                "他每天都学习到深夜可见他非常努力"
            ],
            "answer": "他每天都学习到深夜，可见他非常努力。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-12-ex10",
            "type": "reorder",
            "words": [
                "这个项目提前完成了可见团队效率很高"
            ],
            "answer": "这个项目提前完成了，可见团队效率很高。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-12-ex11",
            "type": "translate",
            "question": "He studies until late every night; it is thus clear that he is very diligent.",
            "answer": "他每天都学习到深夜，可见他非常努力。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        },
        {
            "id": "hsk5ii-12-ex12",
            "type": "translate",
            "question": "这个项目提前完成了，可见团队效率很高。",
            "answer": "This project was completed ahead of schedule; it can be seen that the team's efficiency is very high.",
            "direction": "cn-to-en",
            "hint": "Translate the Chinese sentence to English."
        },
        {
            "id": "hsk5ii-12-ex13",
            "type": "translate",
            "question": "He is never late; it is thus clear that he is very punctual.",
            "answer": "他从不迟到，可见他很守时。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        },
        {
            "id": "hsk5ii-12-ex14",
            "type": "translate",
            "question": "他每天都学习到深夜，可见他非常努力。",
            "answer": "He studies until late every night; it is thus clear that he is very diligent.",
            "direction": "cn-to-en",
            "hint": "Translate the Chinese sentence to English."
        },
        {
            "id": "hsk5ii-12-ex15",
            "type": "translate",
            "question": "This project was completed ahead of schedule; it can be seen that the team's efficiency is very high.",
            "answer": "这个项目提前完成了，可见团队效率很高。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        }
    ]
  },
  {
    "id": "hsk5ii-13",
    "band": "HSK5-II",
    "order": 13,
    "title": "由此可见 (yóucǐ kějiàn) - From this, it can be seen; it is thus clear",
    "subtitle": "Drawing a formal conclusion from preceding facts or arguments",
    "formula": "[Statement]，由此可见，Clause",
    "explanation": "'由此可见' is a more formal and emphatic version of '可见', used to draw a clear and logical conclusion from previously stated facts, evidence, or arguments. It means 'from this, it can be seen' or 'it is thus clear'.",
    "usageRules": [
      "Used to introduce a formal conclusion or inference based on preceding information.",
      "Stronger and more formal than '可见'.",
      "Often used in academic papers, reports, or speeches.",
      "The preceding statement should provide clear and sufficient evidence for the conclusion."
    ],
    "examples": [
      {
        "chinese": "数据显示，全球气温正在上升，由此可见，气候变化是一个严峻的问题。",
        "pinyin": "Shùjù xiǎnshì, quánqiú qìwēn zhèngzài shàngshēng, yóucǐ kějiàn, qìhòu biànhuà shì yī ge yánjùn de wèntí.",
        "english": "Data shows that global temperatures are rising; from this, it can be seen that climate change is a severe problem.",
        "highlight": "由此可见"
      },
      {
        "chinese": "他连续三年获得优秀员工奖，由此可见，他的工作能力非常出色。",
        "pinyin": "Tā liánxù sān nián huòdé yōuxiù yuángōng jiǎng, yóucǐ kějiàn, tā de gōngzuò nénglì fēicháng chūsè.",
        "english": "He has won the outstanding employee award for three consecutive years; it is thus clear that his work ability is excellent.",
        "highlight": "由此可见"
      },
      {
        "chinese": "这项技术填补了国内空白，由此可见，其重要性不言而喻。",
        "pinyin": "Zhè xiàng jìshù tiánbǔ le guónèi kòngbái, yóucǐ kějiàn, qí zhòngyàoxìng bù yán ér yù.",
        "english": "This technology fills a domestic gap; from this, it can be seen that its importance is self-evident.",
        "highlight": "由此可见"
      },
      {
        "chinese": "市场对新产品的反响热烈，由此可见，我们的策略是成功的。",
        "pinyin": "Shìchǎng duì xīn chǎnpǐn de fǎnxiǎng rèliè, yóucǐ kějiàn, wǒmen de cèlüè shì chénggōng de.",
        "highlight": "由此可见",
        "english": "The market response to the new product is enthusiastic; from this, it can be seen that our strategy is successful."
      },
      {
        "chinese": "他能同时处理多项任务，由此可见，他的效率很高。",
        "pinyin": "Tā néng tóngshí chǔlǐ duō xiàng rènwù, yóucǐ kějiàn, tā de xiàolǜ hěn gāo.",
        "english": "He can handle multiple tasks simultaneously; from this, it can be seen that his efficiency is very high.",
        "highlight": "由此可见"
      },
      {
        "chinese": "许多国家都面临人口老龄化问题，由此可见，这是一个全球性挑战。",
        "pinyin": "Xǔduō guójiā dōu miànlín rénkǒu lǎolínghuà wèntí, yóucǐ kějiàn, zhè shì yī ge quánqiúxìng tiǎozhàn.",
        "english": "Many countries are facing the problem of an aging population; from this, it can be seen that this is a global challenge.",
        "highlight": "由此可见"
      }
    ],
    "commonMistake": {
      "description": "Similar to '可见', avoid using '由此可见' when the conclusion is not strongly supported by the preceding information or when the tone is too informal. It's best reserved for significant and clear inferences.",
      "wrongExample": "我今天吃了苹果，由此可见，我喜欢水果。 (While true, the conclusion is too trivial for '由此可见')",
      "correctExample": "他每天坚持锻炼，饮食健康，由此可见，他非常注重养生。",
      "explanation": "'由此可见' is for drawing substantial and logical conclusions from significant evidence."
    },
    "exercises":     [
        {
            "id": "hsk5ii-12-ex1-ex1",
            "type": "fill-blank",
            "question": "数据显示，全球气温正在上升，___，气候变化是一个严峻的问题。",
            "answer": "由此可见",
            "hint": "Fill in the blank using the structure: 由此可见"
        },
        {
            "id": "hsk5ii-12-ex1-ex2",
            "type": "fill-blank",
            "question": "他连续三年获得优秀员工奖，___，他的工作能力非常出色。",
            "answer": "由此可见",
            "hint": "Fill in the blank using the structure: 由此可见"
        },
        {
            "id": "hsk5ii-12-ex1-ex3",
            "type": "fill-blank",
            "question": "这项技术填补了国内空白，___，其重要性不言而喻。",
            "answer": "由此可见",
            "hint": "Fill in the blank using the structure: 由此可见"
        },
        {
            "id": "hsk5ii-12-ex1-ex4",
            "type": "fill-blank",
            "question": "数据显示，全球气温正在上升，___，气候变化是一个严峻的问题。",
            "answer": "由此可见",
            "hint": "Fill in the blank using the structure: 由此可见"
        },
        {
            "id": "hsk5ii-12-ex1-ex5",
            "type": "fill-blank",
            "question": "他连续三年获得优秀员工奖，___，他的工作能力非常出色。",
            "answer": "由此可见",
            "hint": "Fill in the blank using the structure: 由此可见"
        },
        {
            "id": "hsk5ii-12-ex1-ex6",
            "type": "reorder",
            "words": [
                "。",
                "，",
                "，",
                "全球气温正在上升",
                "，",
                "气候变化是一个严峻的问题",
                "数据显示",
                "由此可见"
            ],
            "answer": "数据显示，全球气温正在上升，由此可见，气候变化是一个严峻的问题。",
            "hint": "Reorder the words to form a correct sentence using 由此可见"
        },
        {
            "id": "hsk5ii-12-ex1-ex7",
            "type": "reorder",
            "words": [
                "由此可见",
                "。",
                "他连续三年获得优秀员工奖",
                "，",
                "，",
                "他的工作能力非常出色"
            ],
            "answer": "他连续三年获得优秀员工奖，由此可见，他的工作能力非常出色。",
            "hint": "Reorder the words to form a correct sentence using 由此可见"
        },
        {
            "id": "hsk5ii-12-ex1-ex8",
            "type": "reorder",
            "words": [
                "。",
                "其重要性不言而喻",
                "，",
                "这项技术填补了国内空白",
                "由此可见",
                "，"
            ],
            "answer": "这项技术填补了国内空白，由此可见，其重要性不言而喻。",
            "hint": "Reorder the words to form a correct sentence using 由此可见"
        },
        {
            "id": "hsk5ii-12-ex1-ex9",
            "type": "reorder",
            "words": [
                "全球气温正在上升",
                "，",
                "，",
                "由此可见",
                "，",
                "数据显示",
                "气候变化是一个严峻的问题",
                "。"
            ],
            "answer": "数据显示，全球气温正在上升，由此可见，气候变化是一个严峻的问题。",
            "hint": "Reorder the words to form a correct sentence using 由此可见"
        },
        {
            "id": "hsk5ii-12-ex1-ex10",
            "type": "reorder",
            "words": [
                "。",
                "，",
                "，",
                "他连续三年获得优秀员工奖",
                "他的工作能力非常出色",
                "由此可见"
            ],
            "answer": "他连续三年获得优秀员工奖，由此可见，他的工作能力非常出色。",
            "hint": "Reorder the words to form a correct sentence using 由此可见"
        },
        {
            "id": "hsk5ii-12-ex1-ex11",
            "type": "translate",
            "question": "Data shows that global temperatures are rising; from this, it can be seen that climate change is a severe problem.",
            "answer": "数据显示，全球气温正在上升，由此可见，气候变化是一个严峻的问题。",
            "direction": "en-to-cn",
            "hint": "Translate using the grammar point: 由此可见"
        },
        {
            "id": "hsk5ii-12-ex1-ex12",
            "type": "translate",
            "question": "他连续三年获得优秀员工奖，由此可见，他的工作能力非常出色。",
            "answer": "He has won the outstanding employee award for three consecutive years; it is thus clear that his work ability is excellent.",
            "direction": "cn-to-en",
            "hint": "Translate using the grammar point: 由此可见"
        },
        {
            "id": "hsk5ii-12-ex1-ex13",
            "type": "translate",
            "question": "This technology fills a domestic gap; from this, it can be seen that its importance is self-evident.",
            "answer": "这项技术填补了国内空白，由此可见，其重要性不言而喻。",
            "direction": "en-to-cn",
            "hint": "Translate using the grammar point: 由此可见"
        },
        {
            "id": "hsk5ii-12-ex1-ex14",
            "type": "translate",
            "question": "数据显示，全球气温正在上升，由此可见，气候变化是一个严峻的问题。",
            "answer": "Data shows that global temperatures are rising; from this, it can be seen that climate change is a severe problem.",
            "direction": "cn-to-en",
            "hint": "Translate using the grammar point: 由此可见"
        },
        {
            "id": "hsk5ii-12-ex1-ex15",
            "type": "translate",
            "question": "He has won the outstanding employee award for three consecutive years; it is thus clear that his work ability is excellent.",
            "answer": "他连续三年获得优秀员工奖，由此可见，他的工作能力非常出色。",
            "direction": "en-to-cn",
            "hint": "Translate using the grammar point: 由此可见"
        }
    ]
  },
  {
    "id": "hsk5ii-14",
    "band": "HSK5-II",
    "order": 14,
    "title": "足以 (zúyǐ) - Enough to; sufficient to",
    "subtitle": "Indicating that something is adequate for a certain purpose or outcome",
    "formula": "[Condition] + 足以 + [Result/Purpose]",
    "explanation": "'足以' indicates that a certain condition or amount is sufficient to achieve a particular result or purpose. It emphasizes adequacy.",
    "usageRules": [
      "Used to express that something is enough or sufficient for a certain outcome.",
      "Can be followed by a verb phrase or a clause.",
      "Often used to highlight the capability or extent of something.",
      "Similar to '足够' but often used in more formal or literary contexts."
    ],
    "examples": [
      {
        "chinese": "他的能力足以胜任这份工作。",
        "pinyin": "Tā de nénglì zúyǐ shèngrèn zhè fèn gōngzuò.",
        "english": "His ability is sufficient to be competent for this job.",
        "highlight": "足以胜任"
      },
      {
        "chinese": "这些证据足以证明他的清白。",
        "pinyin": "Zhè xiē zhèngjù zúyǐ zhèngmíng tā de qīngbái.",
        "english": "This evidence is enough to prove his innocence.",
        "highlight": "足以证明"
      },
      {
        "chinese": "一点小小的帮助，足以改变一个人的命运。",
        "pinyin": "Yī diǎn xiǎoxiǎo de bāngzhù, zúyǐ gǎibiàn yī ge rén de mìngyùn.",
        "english": "A little help is enough to change a person's destiny.",
        "highlight": "足以改变"
      },
      {
        "chinese": "他的话足以让人深思。",
        "pinyin": "Tā de huà zúyǐ ràng rén shēnsī.",
        "english": "His words are enough to make people ponder deeply.",
        "highlight": "足以让人"
      },
      {
        "chinese": "这点钱足以支付你的学费。",
        "pinyin": "Zhè diǎn qián zúyǐ zhīfù nǐ de xuéfèi.",
        "english": "This amount of money is enough to cover your tuition fees.",
        "highlight": "足以支付"
      },
      {
        "chinese": "他的经验足以应对各种挑战。",
        "pinyin": "Tā de jīngyàn zúyǐ yìngduì gè zhǒng tiǎozhàn.",
        "english": "His experience is sufficient to cope with various challenges.",
        "highlight": "足以应对"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to confuse '足以' with '可以' (can) or '能够' (be able to). While there's overlap, '足以' specifically emphasizes sufficiency or adequacy, not just general ability.",
      "wrongExample": "他足以唱歌。 (If you mean 'he can sing')",
      "correctExample": "他的歌声足以打动人心。",
      "explanation": "'足以' implies 'enough to cause a certain effect', not just 'can do something'."
    },
    "exercises":     [
        {
            "id": "hsk5ii-14-ex1",
            "type": "fill-blank",
            "question": "他的能力___胜任这份工作。",
            "answer": "足以",
            "hint": "Use the grammar structure '足以'"
        },
        {
            "id": "hsk5ii-14-ex2",
            "type": "fill-blank",
            "question": "这些证据___证明他的清白。",
            "answer": "足以",
            "hint": "Use the grammar structure '足以'"
        },
        {
            "id": "hsk5ii-14-ex3",
            "type": "fill-blank",
            "question": "一点小小的帮助，___改变一个人的命运。",
            "answer": "足以",
            "hint": "Use the grammar structure '足以'"
        },
        {
            "id": "hsk5ii-14-ex4",
            "type": "fill-blank",
            "question": "他的能力___胜任这份工作。",
            "answer": "足以",
            "hint": "Use the grammar structure '足以'"
        },
        {
            "id": "hsk5ii-14-ex5",
            "type": "fill-blank",
            "question": "这些证据___证明他的清白。",
            "answer": "足以",
            "hint": "Use the grammar structure '足以'"
        },
        {
            "id": "hsk5ii-14-ex6",
            "type": "reorder",
            "words": [
                "他的能力足以胜任这份工作"
            ],
            "answer": "他的能力足以胜任这份工作。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-14-ex7",
            "type": "reorder",
            "words": [
                "这些证据足以证明他的清白"
            ],
            "answer": "这些证据足以证明他的清白。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-14-ex8",
            "type": "reorder",
            "words": [
                "一点小小的帮助足以改变一个人的命运"
            ],
            "answer": "一点小小的帮助，足以改变一个人的命运。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-14-ex9",
            "type": "reorder",
            "words": [
                "他的能力足以胜任这份工作"
            ],
            "answer": "他的能力足以胜任这份工作。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-14-ex10",
            "type": "reorder",
            "words": [
                "这些证据足以证明他的清白"
            ],
            "answer": "这些证据足以证明他的清白。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-14-ex11",
            "type": "translate",
            "question": "His ability is sufficient to be competent for this job.",
            "answer": "他的能力足以胜任这份工作。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        },
        {
            "id": "hsk5ii-14-ex12",
            "type": "translate",
            "question": "这些证据足以证明他的清白。",
            "answer": "This evidence is enough to prove his innocence.",
            "direction": "cn-to-en",
            "hint": "Translate the Chinese sentence to English."
        },
        {
            "id": "hsk5ii-14-ex13",
            "type": "translate",
            "question": "A little help is enough to change a person's destiny.",
            "answer": "一点小小的帮助，足以改变一个人的命运。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        },
        {
            "id": "hsk5ii-14-ex14",
            "type": "translate",
            "question": "他的能力足以胜任这份工作。",
            "answer": "His ability is sufficient to be competent for this job.",
            "direction": "cn-to-en",
            "hint": "Translate the Chinese sentence to English."
        },
        {
            "id": "hsk5ii-14-ex15",
            "type": "translate",
            "question": "This evidence is enough to prove his innocence.",
            "answer": "这些证据足以证明他的清白。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        }
    ]
  },
  {
    "id": "hsk5ii-15",
    "band": "HSK5-II",
    "order": 15,
    "title": "难以 (nányǐ) - Difficult to; hard to",
    "subtitle": "Expressing the difficulty of an action or state",
    "formula": "难以 + Verb",
    "explanation": "'难以' is used to express that an action or a state is difficult to achieve, understand, or accept. It emphasizes the inherent difficulty.",
    "usageRules": [
      "Used before a verb to indicate difficulty in performing that action.",
      "Often implies a high degree of difficulty or impossibility.",
      "Common in formal and literary contexts.",
      "Similar to '很难' but often carries a stronger or more inherent sense of difficulty."
    ],
    "examples": [
      {
        "chinese": "这个问题难以解决。",
        "pinyin": "Zhè ge wèntí nányǐ jiějué.",
        "english": "This problem is difficult to solve.",
        "highlight": "难以解决"
      },
      {
        "chinese": "他的心情难以平静。",
        "pinyin": "Tā de xīnqíng nányǐ píngjìng.",
        "english": "His mood is hard to calm down.",
        "highlight": "难以平静"
      },
      {
        "chinese": "这种现象难以解释。",
        "pinyin": "Zhè zhǒng xiànxiàng nányǐ jiěshì.",
        "english": "This phenomenon is difficult to explain.",
        "highlight": "难以解释"
      },
      {
        "chinese": "他的行为令人难以理解。",
        "pinyin": "Tā de xíngwéi lìng rén nányǐ lǐjiě.",
        "english": "His behavior is hard to understand.",
        "highlight": "难以理解"
      },
      {
        "chinese": "这个任务难以完成。",
        "pinyin": "Zhè ge rènwù nányǐ wánchéng.",
        "english": "This task is difficult to complete.",
        "highlight": "难以完成"
      },
      {
        "chinese": "他的故事令人难以置信。",
        "pinyin": "Tā de gùshì lìng rén nányǐ zhìxìn.",
        "english": "His story is hard to believe.",
        "highlight": "难以置信"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use '难以' interchangeably with '不方便' (inconvenient) or '不容易' (not easy) when the meaning is simply 'not easy' rather than 'inherently difficult' or 'almost impossible'. '难以' implies a greater degree of difficulty.",
      "wrongExample": "这道菜难以做。 (If it's just 'not easy' for a beginner)",
      "correctExample": "这道菜做法复杂，难以掌握。",
      "explanation": "'难以' is for inherent or significant difficulty, not just minor inconvenience or lack of skill."
    },
    "exercises":     [
        {
            "id": "hsk5ii-14-ex1-ex1",
            "type": "fill-blank",
            "question": "这个问题___解决。",
            "answer": "难以",
            "hint": "Fill in the blank using the structure: 难以"
        },
        {
            "id": "hsk5ii-14-ex1-ex2",
            "type": "fill-blank",
            "question": "他的心情___平静。",
            "answer": "难以",
            "hint": "Fill in the blank using the structure: 难以"
        },
        {
            "id": "hsk5ii-14-ex1-ex3",
            "type": "fill-blank",
            "question": "这种现象___解释。",
            "answer": "难以",
            "hint": "Fill in the blank using the structure: 难以"
        },
        {
            "id": "hsk5ii-14-ex1-ex4",
            "type": "fill-blank",
            "question": "这个问题___解决。",
            "answer": "难以",
            "hint": "Fill in the blank using the structure: 难以"
        },
        {
            "id": "hsk5ii-14-ex1-ex5",
            "type": "fill-blank",
            "question": "他的心情___平静。",
            "answer": "难以",
            "hint": "Fill in the blank using the structure: 难以"
        },
        {
            "id": "hsk5ii-14-ex1-ex6",
            "type": "reorder",
            "words": [
                "。",
                "这个问题难以解决"
            ],
            "answer": "这个问题难以解决。",
            "hint": "Reorder the words to form a correct sentence using 难以"
        },
        {
            "id": "hsk5ii-14-ex1-ex7",
            "type": "reorder",
            "words": [
                "。",
                "他的心情难以平静"
            ],
            "answer": "他的心情难以平静。",
            "hint": "Reorder the words to form a correct sentence using 难以"
        },
        {
            "id": "hsk5ii-14-ex1-ex8",
            "type": "reorder",
            "words": [
                "。",
                "这种现象难以解释"
            ],
            "answer": "这种现象难以解释。",
            "hint": "Reorder the words to form a correct sentence using 难以"
        },
        {
            "id": "hsk5ii-14-ex1-ex9",
            "type": "reorder",
            "words": [
                "这个问题难以解决",
                "。"
            ],
            "answer": "这个问题难以解决。",
            "hint": "Reorder the words to form a correct sentence using 难以"
        },
        {
            "id": "hsk5ii-14-ex1-ex10",
            "type": "reorder",
            "words": [
                "他的心情难以平静",
                "。"
            ],
            "answer": "他的心情难以平静。",
            "hint": "Reorder the words to form a correct sentence using 难以"
        },
        {
            "id": "hsk5ii-14-ex1-ex11",
            "type": "translate",
            "question": "This problem is difficult to solve.",
            "answer": "这个问题难以解决。",
            "direction": "en-to-cn",
            "hint": "Translate using the grammar point: 难以"
        },
        {
            "id": "hsk5ii-14-ex1-ex12",
            "type": "translate",
            "question": "他的心情难以平静。",
            "answer": "His mood is hard to calm down.",
            "direction": "cn-to-en",
            "hint": "Translate using the grammar point: 难以"
        },
        {
            "id": "hsk5ii-14-ex1-ex13",
            "type": "translate",
            "question": "This phenomenon is difficult to explain.",
            "answer": "这种现象难以解释。",
            "direction": "en-to-cn",
            "hint": "Translate using the grammar point: 难以"
        },
        {
            "id": "hsk5ii-14-ex1-ex14",
            "type": "translate",
            "question": "这个问题难以解决。",
            "answer": "This problem is difficult to solve.",
            "direction": "cn-to-en",
            "hint": "Translate using the grammar point: 难以"
        },
        {
            "id": "hsk5ii-14-ex1-ex15",
            "type": "translate",
            "question": "His mood is hard to calm down.",
            "answer": "他的心情难以平静。",
            "direction": "en-to-cn",
            "hint": "Translate using the grammar point: 难以"
        }
    ]
  },
  {
    "id": "hsk5ii-16",
    "band": "HSK5-II",
    "order": 16,
    "title": "加以 (jiāyǐ) - To apply; to exert; to give (attention, etc.)",
    "subtitle": "Indicating the application of an action or treatment",
    "formula": "对/对…进行 + 名词 + 加以 + 动词",
    "explanation": "'加以' is a formal verb used to indicate that an action or treatment is applied to something. It often appears with a two-character verb and implies a formal or official action.",
    "usageRules": [
      "Used before a two-character verb to indicate the application of an action.",
      "Often used in formal or official contexts, such as government documents or academic papers.",
      "The object of the action usually precedes '加以'.",
      "Similar to '进行' + Verb, but '加以' is more concise and formal."
    ],
    "examples": [
      {
        "chinese": "对这些问题，我们必须加以重视。",
        "pinyin": "Duì zhè xiē wèntí, wǒmen bìxū jiāyǐ zhòngshì.",
        "english": "We must give attention to these issues.",
        "highlight": "加以重视"
      },
      {
        "chinese": "对他的建议，我们应该加以考虑。",
        "pinyin": "Duì tā de jiànyì, wǒmen yīnggāi jiāyǐ kǎolǜ.",
        "english": "We should give consideration to his suggestion.",
        "highlight": "加以考虑"
      },
      {
        "chinese": "对损坏的设备，需要加以修理。",
        "pinyin": "Duì sǔnhuài de shèbèi, xūyào jiāyǐ xiūlǐ.",
        "english": "Damaged equipment needs to be repaired.",
        "highlight": "加以修理"
      },
      {
        "chinese": "对新政策，我们要加以宣传。",
        "pinyin": "Duì xīn zhèngcè, wǒmen yào jiāyǐ xuānchuán.",
        "english": "We need to publicize the new policy.",
        "highlight": "加以宣传"
      },
      {
        "chinese": "对这些错误，必须加以纠正。",
        "pinyin": "Duì zhè xiē cuòwù, bìxū jiāyǐ jiūzhèng.",
        "english": "These errors must be corrected.",
        "highlight": "加以纠正"
      },
      {
        "chinese": "对他的行为，社会各界应加以谴责。",
        "pinyin": "Duì tā de xíngwéi, shèhuì gèjiè yīng jiāyǐ qiǎnzé.",
        "english": "His behavior should be condemned by all sectors of society.",
        "highlight": "加以谴责"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use '加以' with single-character verbs or in informal contexts where a simpler verb would suffice. It's best used with two-character verbs and in formal settings.",
      "wrongExample": "加以看。 (Instead of '看')",
      "correctExample": "加以研究。 / 进行研究。",
      "explanation": "'加以' is typically used with disyllabic verbs and adds a formal tone, often implying a deliberate or systematic application of the action."
    },
    "exercises":     [
        {
            "id": "hsk5ii-16-ex1",
            "type": "fill-blank",
            "question": "对这些问题，我们必须___重视。",
            "answer": "加以",
            "hint": "Use the grammar structure '加以'"
        },
        {
            "id": "hsk5ii-16-ex2",
            "type": "fill-blank",
            "question": "对他的建议，我们应该___考虑。",
            "answer": "加以",
            "hint": "Use the grammar structure '加以'"
        },
        {
            "id": "hsk5ii-16-ex3",
            "type": "fill-blank",
            "question": "对损坏的设备，需要___修理。",
            "answer": "加以",
            "hint": "Use the grammar structure '加以'"
        },
        {
            "id": "hsk5ii-16-ex4",
            "type": "fill-blank",
            "question": "对这些问题，我们必须___重视。",
            "answer": "加以",
            "hint": "Use the grammar structure '加以'"
        },
        {
            "id": "hsk5ii-16-ex5",
            "type": "fill-blank",
            "question": "对他的建议，我们应该___考虑。",
            "answer": "加以",
            "hint": "Use the grammar structure '加以'"
        },
        {
            "id": "hsk5ii-16-ex6",
            "type": "reorder",
            "words": [
                "对这些问题我们必须加以重视"
            ],
            "answer": "对这些问题，我们必须加以重视。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-16-ex7",
            "type": "reorder",
            "words": [
                "对他的建议我们应该加以考虑"
            ],
            "answer": "对他的建议，我们应该加以考虑。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-16-ex8",
            "type": "reorder",
            "words": [
                "对损坏的设备需要加以修理"
            ],
            "answer": "对损坏的设备，需要加以修理。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-16-ex9",
            "type": "reorder",
            "words": [
                "对这些问题我们必须加以重视"
            ],
            "answer": "对这些问题，我们必须加以重视。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-16-ex10",
            "type": "reorder",
            "words": [
                "对他的建议我们应该加以考虑"
            ],
            "answer": "对他的建议，我们应该加以考虑。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-16-ex11",
            "type": "translate",
            "question": "We must give attention to these issues.",
            "answer": "对这些问题，我们必须加以重视。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        },
        {
            "id": "hsk5ii-16-ex12",
            "type": "translate",
            "question": "对他的建议，我们应该加以考虑。",
            "answer": "We should give consideration to his suggestion.",
            "direction": "cn-to-en",
            "hint": "Translate the Chinese sentence to English."
        },
        {
            "id": "hsk5ii-16-ex13",
            "type": "translate",
            "question": "Damaged equipment needs to be repaired.",
            "answer": "对损坏的设备，需要加以修理。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        },
        {
            "id": "hsk5ii-16-ex14",
            "type": "translate",
            "question": "对这些问题，我们必须加以重视。",
            "answer": "We must give attention to these issues.",
            "direction": "cn-to-en",
            "hint": "Translate the Chinese sentence to English."
        },
        {
            "id": "hsk5ii-16-ex15",
            "type": "translate",
            "question": "We should give consideration to his suggestion.",
            "answer": "对他的建议，我们应该加以考虑。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        }
    ]
  },
  {
    "id": "hsk5ii-17",
    "band": "HSK5-II",
    "order": 17,
    "title": "予以 (yǔyǐ) - To give; to grant; to render",
    "subtitle": "Formal expression for giving or rendering something",
    "formula": "予以 + Noun (often abstract) / Verb",
    "explanation": "'予以' is a formal verb used to mean 'to give', 'to grant', or 'to render'. It is typically followed by a two-character noun or verb, often abstract, and is common in official or written language.",
    "usageRules": [
      "Used in formal contexts to express giving or granting something.",
      "Often followed by abstract nouns like '支持' (support), '批准' (approval), '谴责' (condemnation), or two-character verbs.",
      "Similar to '给予' but often more concise and formal.",
      "The object of '予以' is usually the thing being given."
    ],
    "examples": [
      {
        "chinese": "我们对他的工作予以肯定。",
        "pinyin": "Wǒmen duì tā de gōngzuò yǔyǐ kěndìng.",
        "english": "We affirm his work.",
        "highlight": "予以肯定"
      },
      {
        "chinese": "政府对灾区人民予以援助。",
        "pinyin": "Zhèngfǔ duì zāiqū rénmín yǔyǐ yuánzhù.",
        "english": "The government provides aid to the people in the disaster area.",
        "highlight": "予以援助"
      },
      {
        "chinese": "他的请求得到了领导的予以批准。",
        "pinyin": "Tā de qǐngqiú dédào le lǐngdǎo de yǔyǐ pīzhǔn.",
        "english": "His request received approval from the leadership.",
        "highlight": "予以批准"
      },
      {
        "chinese": "对这种行为，我们必须予以谴责。",
        "pinyin": "Duì zhè zhǒng xíngwéi, wǒmen bìxū yǔyǐ qiǎnzé.",
        "english": "We must condemn this kind of behavior.",
        "highlight": "予以谴责"
      },
      {
        "chinese": "对优秀员工，公司将予以奖励。",
        "pinyin": "Duì yōuxiù yuángōng, gōngsī jiāng yǔyǐ jiǎnglì.",
        "english": "The company will give awards to outstanding employees.",
        "highlight": "予以奖励"
      },
      {
        "chinese": "他的努力应该予以肯定。",
        "pinyin": "Tā de nǔlì yīnggāi yǔyǐ kěndìng.",
        "english": "His efforts should be affirmed.",
        "highlight": "予以肯定"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use '予以' in informal conversations or with concrete objects. It's reserved for formal contexts and usually with abstract nouns or verbs that denote a formal action of 'giving' or 'rendering'.",
      "wrongExample": "予以一本书。 (Instead of '给一本书')",
      "correctExample": "予以支持。 / 给予支持。",
      "explanation": "'予以' is for formal, often abstract 'giving', not for physical objects or casual interactions."
    },
    "exercises":     [
        {
            "id": "hsk5ii-16-ex1-ex1",
            "type": "fill-blank",
            "question": "我们对他的工作___肯定。",
            "answer": "予以",
            "hint": "Fill in the blank using the structure: 予以"
        },
        {
            "id": "hsk5ii-16-ex1-ex2",
            "type": "fill-blank",
            "question": "政府对灾区人民___援助。",
            "answer": "予以",
            "hint": "Fill in the blank using the structure: 予以"
        },
        {
            "id": "hsk5ii-16-ex1-ex3",
            "type": "fill-blank",
            "question": "他的请求得到了领导的___批准。",
            "answer": "予以",
            "hint": "Fill in the blank using the structure: 予以"
        },
        {
            "id": "hsk5ii-16-ex1-ex4",
            "type": "fill-blank",
            "question": "我们对他的工作___肯定。",
            "answer": "予以",
            "hint": "Fill in the blank using the structure: 予以"
        },
        {
            "id": "hsk5ii-16-ex1-ex5",
            "type": "fill-blank",
            "question": "政府对灾区人民___援助。",
            "answer": "予以",
            "hint": "Fill in the blank using the structure: 予以"
        },
        {
            "id": "hsk5ii-16-ex1-ex6",
            "type": "reorder",
            "words": [
                "我们对他的工作予以肯定",
                "。"
            ],
            "answer": "我们对他的工作予以肯定。",
            "hint": "Reorder the words to form a correct sentence using 予以"
        },
        {
            "id": "hsk5ii-16-ex1-ex7",
            "type": "reorder",
            "words": [
                "。",
                "政府对灾区人民予以援助"
            ],
            "answer": "政府对灾区人民予以援助。",
            "hint": "Reorder the words to form a correct sentence using 予以"
        },
        {
            "id": "hsk5ii-16-ex1-ex8",
            "type": "reorder",
            "words": [
                "他的请求得到了领导的予以批准",
                "。"
            ],
            "answer": "他的请求得到了领导的予以批准。",
            "hint": "Reorder the words to form a correct sentence using 予以"
        },
        {
            "id": "hsk5ii-16-ex1-ex9",
            "type": "reorder",
            "words": [
                "我们对他的工作予以肯定",
                "。"
            ],
            "answer": "我们对他的工作予以肯定。",
            "hint": "Reorder the words to form a correct sentence using 予以"
        },
        {
            "id": "hsk5ii-16-ex1-ex10",
            "type": "reorder",
            "words": [
                "。",
                "政府对灾区人民予以援助"
            ],
            "answer": "政府对灾区人民予以援助。",
            "hint": "Reorder the words to form a correct sentence using 予以"
        },
        {
            "id": "hsk5ii-16-ex1-ex11",
            "type": "translate",
            "question": "We affirm his work.",
            "answer": "我们对他的工作予以肯定。",
            "direction": "en-to-cn",
            "hint": "Translate using the grammar point: 予以"
        },
        {
            "id": "hsk5ii-16-ex1-ex12",
            "type": "translate",
            "question": "政府对灾区人民予以援助。",
            "answer": "The government provides aid to the people in the disaster area.",
            "direction": "cn-to-en",
            "hint": "Translate using the grammar point: 予以"
        },
        {
            "id": "hsk5ii-16-ex1-ex13",
            "type": "translate",
            "question": "His request received approval from the leadership.",
            "answer": "他的请求得到了领导的予以批准。",
            "direction": "en-to-cn",
            "hint": "Translate using the grammar point: 予以"
        },
        {
            "id": "hsk5ii-16-ex1-ex14",
            "type": "translate",
            "question": "我们对他的工作予以肯定。",
            "answer": "We affirm his work.",
            "direction": "cn-to-en",
            "hint": "Translate using the grammar point: 予以"
        },
        {
            "id": "hsk5ii-16-ex1-ex15",
            "type": "translate",
            "question": "The government provides aid to the people in the disaster area.",
            "answer": "政府对灾区人民予以援助。",
            "direction": "en-to-cn",
            "hint": "Translate using the grammar point: 予以"
        }
    ]
  },
  {
    "id": "hsk5ii-18",
    "band": "HSK5-II",
    "order": 18,
    "title": "对此 (duìcǐ) - In response to this; regarding this",
    "subtitle": "Referring back to a previously mentioned matter or situation",
    "formula": "对此，Clause",
    "explanation": "'对此' is used to refer back to a previously mentioned matter or situation, indicating that the following statement is a response, reaction, or comment regarding it. It means 'in response to this' or 'regarding this'.",
    "usageRules": [
      "Used to refer back to a specific issue or situation that has just been discussed.",
      "Often appears at the beginning of a sentence or a clause.",
      "Common in formal discussions, news reports, or academic writing.",
      "Helps to maintain coherence and clarity by linking ideas."
    ],
    "examples": [
      {
        "chinese": "公司发布了新的规定，对此，员工们反响不一。",
        "pinyin": "Gōngsī fābù le xīn de guīdìng, duìcǐ, yuángōngmen fǎnxiǎng bù yī.",
        "english": "The company issued new regulations; in response to this, employees had mixed reactions.",
        "highlight": "对此"
      },
      {
        "chinese": "他提出了一个大胆的计划，对此，领导表示支持。",
        "pinyin": "Tā tíchū le yī ge dàdǎn de jìhuà, duìcǐ, lǐngdǎo biǎoshì zhīchí.",
        "english": "He proposed a bold plan; regarding this, the leadership expressed support.",
        "highlight": "对此"
      },
      {
        "chinese": "最近物价上涨，对此，政府正在采取措施。",
        "pinyin": "Zuìjìn wùjià shàngzhǎng, duìcǐ, zhèngfǔ zhèngzài cǎiqǔ cuòshī.",
        "english": "Recently, prices have risen; in response to this, the government is taking measures.",
        "highlight": "对此"
      },
      {
        "chinese": "有专家指出，人工智能将改变未来，对此，我们应该做好准备。",
        "pinyin": "Yǒu zhuānjiā zhǐchū, réngōng zhìnéng jiāng gǎibiàn wèilái, duìcǐ, wǒmen yīnggāi zuò hǎo zhǔnbèi.",
        "english": "Experts point out that AI will change the future; regarding this, we should be prepared.",
        "highlight": "对此"
      },
      {
        "chinese": "他犯了一个错误，对此，他深感抱歉。",
        "pinyin": "Tā fàn le yī ge cuòwù, duìcǐ, tā shēngǎn bàoqiàn.",
        "english": "He made a mistake; in response to this, he felt deeply sorry.",
        "highlight": "对此"
      },
      {
        "chinese": "社会上出现了新的问题，对此，我们需要深入思考。",
        "pinyin": "Shèhuì shàng chūxiàn le xīn de wèntí, duìcǐ, wǒmen xūyào shēnrù sīkǎo.",
        "english": "New problems have emerged in society; regarding this, we need to think deeply.",
        "highlight": "对此"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use '对此' when the reference is unclear or too far removed from the current statement. Ensure that '此' clearly refers to the immediately preceding context.",
      "wrongExample": "我昨天去看了电影。对此，我觉得很有趣。 (The connection is weak if '对此' refers to the movie-watching event itself, rather than a specific aspect of it)",
      "correctExample": "我昨天去看了电影，那部电影的剧情很复杂。对此，我有很多想法。",
      "explanation": "'对此' should refer to a specific point or situation, not a general event, to maintain clarity."
    },
    "exercises":     [
        {
            "id": "hsk5ii-18-ex1",
            "type": "fill-blank",
            "question": "公司发布了新的规定，___，员工们反响不一。",
            "answer": "对此",
            "hint": "Use the grammar structure '对此'"
        },
        {
            "id": "hsk5ii-18-ex2",
            "type": "fill-blank",
            "question": "他提出了一个大胆的计划，___，领导表示支持。",
            "answer": "对此",
            "hint": "Use the grammar structure '对此'"
        },
        {
            "id": "hsk5ii-18-ex3",
            "type": "fill-blank",
            "question": "最近物价上涨，___，政府正在采取措施。",
            "answer": "对此",
            "hint": "Use the grammar structure '对此'"
        },
        {
            "id": "hsk5ii-18-ex4",
            "type": "fill-blank",
            "question": "公司发布了新的规定，___，员工们反响不一。",
            "answer": "对此",
            "hint": "Use the grammar structure '对此'"
        },
        {
            "id": "hsk5ii-18-ex5",
            "type": "fill-blank",
            "question": "他提出了一个大胆的计划，___，领导表示支持。",
            "answer": "对此",
            "hint": "Use the grammar structure '对此'"
        },
        {
            "id": "hsk5ii-18-ex6",
            "type": "reorder",
            "words": [
                "公司发布了新的规定对此员工们反响不一"
            ],
            "answer": "公司发布了新的规定，对此，员工们反响不一。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-18-ex7",
            "type": "reorder",
            "words": [
                "他提出了一个大胆的计划对此领导表示支持"
            ],
            "answer": "他提出了一个大胆的计划，对此，领导表示支持。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-18-ex8",
            "type": "reorder",
            "words": [
                "最近物价上涨对此政府正在采取措施"
            ],
            "answer": "最近物价上涨，对此，政府正在采取措施。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-18-ex9",
            "type": "reorder",
            "words": [
                "公司发布了新的规定对此员工们反响不一"
            ],
            "answer": "公司发布了新的规定，对此，员工们反响不一。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-18-ex10",
            "type": "reorder",
            "words": [
                "他提出了一个大胆的计划对此领导表示支持"
            ],
            "answer": "他提出了一个大胆的计划，对此，领导表示支持。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-18-ex11",
            "type": "translate",
            "question": "The company issued new regulations; in response to this, employees had mixed reactions.",
            "answer": "公司发布了新的规定，对此，员工们反响不一。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        },
        {
            "id": "hsk5ii-18-ex12",
            "type": "translate",
            "question": "他提出了一个大胆的计划，对此，领导表示支持。",
            "answer": "He proposed a bold plan; regarding this, the leadership expressed support.",
            "direction": "cn-to-en",
            "hint": "Translate the Chinese sentence to English."
        },
        {
            "id": "hsk5ii-18-ex13",
            "type": "translate",
            "question": "Recently, prices have risen; in response to this, the government is taking measures.",
            "answer": "最近物价上涨，对此，政府正在采取措施。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        },
        {
            "id": "hsk5ii-18-ex14",
            "type": "translate",
            "question": "公司发布了新的规定，对此，员工们反响不一。",
            "answer": "The company issued new regulations; in response to this, employees had mixed reactions.",
            "direction": "cn-to-en",
            "hint": "Translate the Chinese sentence to English."
        },
        {
            "id": "hsk5ii-18-ex15",
            "type": "translate",
            "question": "He proposed a bold plan; regarding this, the leadership expressed support.",
            "answer": "他提出了一个大胆的计划，对此，领导表示支持。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        }
    ]
  },
  {
    "id": "hsk5ii-19",
    "band": "HSK5-II",
    "order": 19,
    "title": "为此 (wèicǐ) - For this reason; to this end",
    "subtitle": "Indicating the purpose or reason for an action",
    "formula": "[Reason/Purpose]，为此，Clause",
    "explanation": "'为此' is used to indicate the reason or purpose for a subsequent action. It means 'for this reason' or 'to this end', linking an action to its motivation.",
    "usageRules": [
      "Used to introduce the reason or purpose for the action that follows.",
      "Often appears at the beginning of a sentence or a clause.",
      "Common in formal writing, reports, or speeches.",
      "The preceding statement provides the cause or goal."
    ],
    "examples": [
      {
        "chinese": "为了提高工作效率，为此，我们引进了新设备。",
        "pinyin": "Wèile tígāo gōngzuò xiàolǜ, wèicǐ, wǒmen yǐnjìn le xīn shèbèi.",
        "english": "To improve work efficiency, for this reason, we introduced new equipment.",
        "highlight": "为此"
      },
      {
        "chinese": "他想学好中文，为此，他每天都努力学习。",
        "pinyin": "Tā xiǎng xuéhǎo Zhōngwén, wèicǐ, tā měitiān dōu nǔlì xuéxí.",
        "english": "He wants to learn Chinese well; to this end, he studies hard every day.",
        "highlight": "为此"
      },
      {
        "chinese": "公司面临资金困难，为此，我们不得不削减开支。",
        "pinyin": "Gōngsī miànlín zījīn kùnnán, wèicǐ, wǒmen bù dé bù xuējiǎn kāizhī.",
        "english": "The company is facing financial difficulties; for this reason, we had to cut expenses.",
        "highlight": "为此"
      },
      {
        "chinese": "为了保护环境，为此，政府出台了多项政策。",
        "pinyin": "Wèile bǎohù huánjìng, wèicǐ, zhèngfǔ chūtái le duō xiàng zhèngcè.",
        "english": "To protect the environment, to this end, the government introduced many policies.",
        "highlight": "为此"
      },
      {
        "chinese": "他渴望成功，为此，他付出了巨大的努力。",
        "pinyin": "Tā kěwàng chénggōng, wèicǐ, tā fùchū le jùdà de nǔlì.",
        "english": "He yearns for success; for this reason, he made great efforts.",
        "highlight": "为此"
      },
      {
        "chinese": "为了确保项目顺利进行，为此，我们制定了详细的计划。",
        "pinyin": "Wèile quèbǎo xiàngmù shùnlì jìnxíng, wèicǐ, wǒmen zhìdìng le xiángxì de jìhuà.",
        "english": "To ensure the smooth progress of the project, to this end, we formulated a detailed plan.",
        "highlight": "为此"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to confuse '为此' with '对此'. '为此' indicates a reason or purpose for an action, while '对此' indicates a response or comment regarding a situation. Ensure the relationship is one of cause/effect or purpose.",
      "wrongExample": "他生病了，为此，我去看他。 (This implies his sickness is the *purpose* of your visit, rather than the *reason*)",
      "correctExample": "他生病了，我很担心，为此，我去看他。",
      "explanation": "'为此' links an action to its preceding reason or purpose. '对此' links a reaction/comment to a preceding situation."
    },
    "exercises":     [
        {
            "id": "hsk5ii-18-ex1-ex1",
            "type": "fill-blank",
            "question": "为了提高工作效率，___，我们引进了新设备。",
            "answer": "为此",
            "hint": "Fill in the blank using the structure: 为此"
        },
        {
            "id": "hsk5ii-18-ex1-ex2",
            "type": "fill-blank",
            "question": "他想学好中文，___，他每天都努力学习。",
            "answer": "为此",
            "hint": "Fill in the blank using the structure: 为此"
        },
        {
            "id": "hsk5ii-18-ex1-ex3",
            "type": "fill-blank",
            "question": "公司面临资金困难，___，我们不得不削减开支。",
            "answer": "为此",
            "hint": "Fill in the blank using the structure: 为此"
        },
        {
            "id": "hsk5ii-18-ex1-ex4",
            "type": "fill-blank",
            "question": "为了提高工作效率，___，我们引进了新设备。",
            "answer": "为此",
            "hint": "Fill in the blank using the structure: 为此"
        },
        {
            "id": "hsk5ii-18-ex1-ex5",
            "type": "fill-blank",
            "question": "他想学好中文，___，他每天都努力学习。",
            "answer": "为此",
            "hint": "Fill in the blank using the structure: 为此"
        },
        {
            "id": "hsk5ii-18-ex1-ex6",
            "type": "reorder",
            "words": [
                "。",
                "，",
                "，",
                "为了提高工作效率",
                "我们引进了新设备",
                "为此"
            ],
            "answer": "为了提高工作效率，为此，我们引进了新设备。",
            "hint": "Reorder the words to form a correct sentence using 为此"
        },
        {
            "id": "hsk5ii-18-ex1-ex7",
            "type": "reorder",
            "words": [
                "，",
                "他想学好中文",
                "，",
                "。",
                "为此",
                "他每天都努力学习"
            ],
            "answer": "他想学好中文，为此，他每天都努力学习。",
            "hint": "Reorder the words to form a correct sentence using 为此"
        },
        {
            "id": "hsk5ii-18-ex1-ex8",
            "type": "reorder",
            "words": [
                "为此",
                "。",
                "，",
                "，",
                "我们不得不削减开支",
                "公司面临资金困难"
            ],
            "answer": "公司面临资金困难，为此，我们不得不削减开支。",
            "hint": "Reorder the words to form a correct sentence using 为此"
        },
        {
            "id": "hsk5ii-18-ex1-ex9",
            "type": "reorder",
            "words": [
                "，",
                "，",
                "为此",
                "为了提高工作效率",
                "我们引进了新设备",
                "。"
            ],
            "answer": "为了提高工作效率，为此，我们引进了新设备。",
            "hint": "Reorder the words to form a correct sentence using 为此"
        },
        {
            "id": "hsk5ii-18-ex1-ex10",
            "type": "reorder",
            "words": [
                "。",
                "他想学好中文",
                "为此",
                "，",
                "他每天都努力学习",
                "，"
            ],
            "answer": "他想学好中文，为此，他每天都努力学习。",
            "hint": "Reorder the words to form a correct sentence using 为此"
        },
        {
            "id": "hsk5ii-18-ex1-ex11",
            "type": "translate",
            "question": "To improve work efficiency, for this reason, we introduced new equipment.",
            "answer": "为了提高工作效率，为此，我们引进了新设备。",
            "direction": "en-to-cn",
            "hint": "Translate using the grammar point: 为此"
        },
        {
            "id": "hsk5ii-18-ex1-ex12",
            "type": "translate",
            "question": "他想学好中文，为此，他每天都努力学习。",
            "answer": "He wants to learn Chinese well; to this end, he studies hard every day.",
            "direction": "cn-to-en",
            "hint": "Translate using the grammar point: 为此"
        },
        {
            "id": "hsk5ii-18-ex1-ex13",
            "type": "translate",
            "question": "The company is facing financial difficulties; for this reason, we had to cut expenses.",
            "answer": "公司面临资金困难，为此，我们不得不削减开支。",
            "direction": "en-to-cn",
            "hint": "Translate using the grammar point: 为此"
        },
        {
            "id": "hsk5ii-18-ex1-ex14",
            "type": "translate",
            "question": "为了提高工作效率，为此，我们引进了新设备。",
            "answer": "To improve work efficiency, for this reason, we introduced new equipment.",
            "direction": "cn-to-en",
            "hint": "Translate using the grammar point: 为此"
        },
        {
            "id": "hsk5ii-18-ex1-ex15",
            "type": "translate",
            "question": "He wants to learn Chinese well; to this end, he studies hard every day.",
            "answer": "他想学好中文，为此，他每天都努力学习。",
            "direction": "en-to-cn",
            "hint": "Translate using the grammar point: 为此"
        }
    ]
  },
  {
    "id": "hsk5ii-20",
    "band": "HSK5-II",
    "order": 20,
    "title": "有鉴于此 (yǒujiànyúcǐ) - In view of this; in light of this",
    "subtitle": "Introducing a decision or action based on a preceding situation",
    "formula": "[Situation]，有鉴于此，Clause",
    "explanation": "'有鉴于此' is a formal phrase used to introduce a decision, action, or conclusion that is made in consideration of a previously mentioned situation or fact. It means 'in view of this' or 'in light of this'.",
    "usageRules": [
      "Used to introduce a decision or action based on a preceding situation or fact.",
      "Highly formal and often used in official statements, reports, or academic contexts.",
      "The preceding statement provides the background or context for the subsequent action.",
      "Similar to '考虑到这一点' or '鉴于此'."
    ],
    "examples": [
      {
        "chinese": "市场需求发生了变化，有鉴于此，公司决定调整战略。",
        "pinyin": "Shìchǎng xūqiú fāshēng le biànhuà, yǒujiànyúcǐ, gōngsī juédìng tiáozhěng zhànlüè.",
        "english": "Market demand has changed; in view of this, the company decided to adjust its strategy.",
        "highlight": "有鉴于此"
      },
      {
        "chinese": "最近天气异常，有鉴于此，请大家注意防范。",
        "pinyin": "Zuìjìn tiānqì yìcháng, yǒujiànyúcǐ, qǐng dàjiā zhùyì fángfàn.",
        "english": "The weather has been abnormal recently; in light of this, everyone please take precautions.",
        "highlight": "有鉴于此"
      },
      {
        "chinese": "他的表现非常出色，有鉴于此，我们决定提拔他。",
        "pinyin": "Tā de biǎoxiàn fēicháng chūsè, yǒujiànyúcǐ, wǒmen juédìng tíbá tā.",
        "english": "His performance has been outstanding; in view of this, we decided to promote him.",
        "highlight": "有鉴于此"
      },
      {
        "chinese": "考虑到目前的经济形势，有鉴于此，我们应该谨慎投资。",
        "pinyin": "Kǎolǜ dào mùqián de jīngjì xíngshì, yǒujiànyúcǐ, wǒmen yīnggāi jǐnshèn tóuzī.",
        "english": "Considering the current economic situation; in light of this, we should invest cautiously.",
        "highlight": "有鉴于此"
      },
      {
        "chinese": "许多学生反映课程难度大，有鉴于此，学校将调整教学计划。",
        "pinyin": "Xǔduō xuéshēng fǎnyìng kèchéng nándù dà, yǒujiànyúcǐ, xuéxiào jiāng tiáozhěng jiàoxué jìhuà.",
        "english": "Many students reported that the course difficulty is high; in view of this, the school will adjust the teaching plan.",
        "highlight": "有鉴于此"
      },
      {
        "chinese": "为了确保安全，有鉴于此，我们加强了安保措施。",
        "pinyin": "Wèile quèbǎo ānxuán, yǒujiànyúcǐ, wǒmen jiāqiáng le ānbǎo cuòshī.",
        "english": "To ensure safety; in view of this, we strengthened security measures.",
        "highlight": "有鉴于此"
      }
    ],
    "commonMistake": {
      "description": "A common mistake is to use '有鉴于此' in informal contexts or when the preceding situation is not significant enough to warrant such a formal introduction. It's best used for important decisions or actions based on serious considerations.",
      "wrongExample": "我饿了，有鉴于此，我决定吃饭。 (Too formal for a simple action)",
      "correctExample": "鉴于时间紧迫，有鉴于此，我们必须加快进度。",
      "explanation": "'有鉴于此' is for formal, weighty decisions based on significant preceding circumstances."
    },
    "exercises":     [
        {
            "id": "hsk5ii-20-ex1",
            "type": "fill-blank",
            "question": "市场需求发生了变化，___，公司决定调整战略。",
            "answer": "有鉴于此",
            "hint": "Use the grammar structure '有鉴于此'"
        },
        {
            "id": "hsk5ii-20-ex2",
            "type": "fill-blank",
            "question": "最近天气异常，___，请大家注意防范。",
            "answer": "有鉴于此",
            "hint": "Use the grammar structure '有鉴于此'"
        },
        {
            "id": "hsk5ii-20-ex3",
            "type": "fill-blank",
            "question": "他的表现非常出色，___，我们决定提拔他。",
            "answer": "有鉴于此",
            "hint": "Use the grammar structure '有鉴于此'"
        },
        {
            "id": "hsk5ii-20-ex4",
            "type": "fill-blank",
            "question": "市场需求发生了变化，___，公司决定调整战略。",
            "answer": "有鉴于此",
            "hint": "Use the grammar structure '有鉴于此'"
        },
        {
            "id": "hsk5ii-20-ex5",
            "type": "fill-blank",
            "question": "最近天气异常，___，请大家注意防范。",
            "answer": "有鉴于此",
            "hint": "Use the grammar structure '有鉴于此'"
        },
        {
            "id": "hsk5ii-20-ex6",
            "type": "reorder",
            "words": [
                "市场需求发生了变化有鉴于此公司决定调整战略"
            ],
            "answer": "市场需求发生了变化，有鉴于此，公司决定调整战略。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-20-ex7",
            "type": "reorder",
            "words": [
                "最近天气异常有鉴于此请大家注意防范"
            ],
            "answer": "最近天气异常，有鉴于此，请大家注意防范。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-20-ex8",
            "type": "reorder",
            "words": [
                "他的表现非常出色有鉴于此我们决定提拔他"
            ],
            "answer": "他的表现非常出色，有鉴于此，我们决定提拔他。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-20-ex9",
            "type": "reorder",
            "words": [
                "市场需求发生了变化有鉴于此公司决定调整战略"
            ],
            "answer": "市场需求发生了变化，有鉴于此，公司决定调整战略。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-20-ex10",
            "type": "reorder",
            "words": [
                "最近天气异常有鉴于此请大家注意防范"
            ],
            "answer": "最近天气异常，有鉴于此，请大家注意防范。",
            "hint": "Reorder the words to form a correct sentence."
        },
        {
            "id": "hsk5ii-20-ex11",
            "type": "translate",
            "question": "Market demand has changed; in view of this, the company decided to adjust its strategy.",
            "answer": "市场需求发生了变化，有鉴于此，公司决定调整战略。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        },
        {
            "id": "hsk5ii-20-ex12",
            "type": "translate",
            "question": "最近天气异常，有鉴于此，请大家注意防范。",
            "answer": "The weather has been abnormal recently; in light of this, everyone please take precautions.",
            "direction": "cn-to-en",
            "hint": "Translate the Chinese sentence to English."
        },
        {
            "id": "hsk5ii-20-ex13",
            "type": "translate",
            "question": "His performance has been outstanding; in view of this, we decided to promote him.",
            "answer": "他的表现非常出色，有鉴于此，我们决定提拔他。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        },
        {
            "id": "hsk5ii-20-ex14",
            "type": "translate",
            "question": "市场需求发生了变化，有鉴于此，公司决定调整战略。",
            "answer": "Market demand has changed; in view of this, the company decided to adjust its strategy.",
            "direction": "cn-to-en",
            "hint": "Translate the Chinese sentence to English."
        },
        {
            "id": "hsk5ii-20-ex15",
            "type": "translate",
            "question": "The weather has been abnormal recently; in light of this, everyone please take precautions.",
            "answer": "最近天气异常，有鉴于此，请大家注意防范。",
            "direction": "en-to-cn",
            "hint": "Translate the English sentence to Chinese."
        }
    ]
  }
]
;

export const GRAMMAR_LESSONS_BY_BAND: Record<GrammarBand, GrammarLesson[]> = {
  'HSK3-I':  ALL_GRAMMAR_LESSONS.filter(l => l.band === 'HSK3-I'),
  'HSK3-II': ALL_GRAMMAR_LESSONS.filter(l => l.band === 'HSK3-II'),
  'HSK4-I':  ALL_GRAMMAR_LESSONS.filter(l => l.band === 'HSK4-I'),
  'HSK4-II': ALL_GRAMMAR_LESSONS.filter(l => l.band === 'HSK4-II'),
  'HSK5-I':  ALL_GRAMMAR_LESSONS.filter(l => l.band === 'HSK5-I'),
  'HSK5-II': ALL_GRAMMAR_LESSONS.filter(l => l.band === 'HSK5-II'),
};
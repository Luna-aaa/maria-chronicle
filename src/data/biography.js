// 美依礼芽（MARiA）生平时间线
// 字段：
//   { era: '...' }                              — 时期分隔
//   { date, title, body?, tags?, highlight? }   — 事件
//     highlight: true 标记为首页亮点轮播条目
//
// 资料来源：用户提供的微博粉丝长文人物志（info.txt）
// + 公开访谈、维基百科、官方资料。
// 当前覆盖至 2018 年；2019 之后逐步补充。

// 从 biography 数组提取 era 列表（供导航使用）
// 返回 [{ id, label, eventCount, firstEventDate }]
export function extractEras(events) {
  const eras = []
  let current = null
  events.forEach((ev, i) => {
    if (ev.era) {
      current = { id: `era-${eras.length}`, label: ev.era, eventCount: 0, firstEventDate: null, sourceIndex: i }
      eras.push(current)
    } else if (current) {
      current.eventCount += 1
      if (!current.firstEventDate) current.firstEventDate = ev.date
    }
  })
  return eras
}

// 为每个 era 事件项预先打上 eraId，避免渲染时再算
export function enrichBiography(events) {
  let eraIdx = -1
  return events.map(ev => {
    if (ev.era) {
      eraIdx += 1
      return { ...ev, eraId: `era-${eraIdx}` }
    }
    return ev
  })
}

export const biography = [
  { era: '少女时代 · 茨城' },
  {
    date: '1992 年 1 月 31 日',
    title: '出生于日本茨城县土浦市',
    body: '本名水桥舞（みずはし まい），日本女歌手，身高 152cm，血型 O 型。',
    tags: ['出生', '茨城']
  },
  {
    date: '小学四年级 起',
    title: '进入演艺私塾学习演技、舞蹈、歌唱',
    body: '从小学四年级开始就在一所综合培养表演、舞蹈与歌唱的私塾学习，为日后的全能型舞台表现打下基础。',
    tags: ['童年', '训练']
  },
  {
    date: '2003 年',
    title: '11 岁童星出道 · 4 人组合 New man co., Ltd.',
    body: '以 11 岁的年纪担任组合主唱，演唱动画《おもいっきり科学アドベンチャー そーなんだ!》的片头曲《Birthday Heart》。同期还演唱了《真夏のスクーター》，成为茨城地区节目《发现！茨城大陆》的片尾曲。',
    tags: ['童星出道', 'New man co., Ltd.']
  },
  {
    date: '2005 年',
    title: '加入 6 人爵士声乐组合「原宿 BJ Girls」',
    body: '13 岁起以组合最年少成员身份活动，后组合改名为「CHIX CHICKS」，在制作人松尾潔的带领下翻唱爵士乐与 70-80 年代西洋流行曲。',
    tags: ['Chix Chicks', '爵士']
  },
  {
    date: 'BJ Girls / CHIX CHICKS 时期',
    title: '个人名义动画歌与首张专辑',
    body: '以「水桥舞 from 原宿BJ Girls」名义独唱动画《神様家族》OP；同期以个人名义演唱《宝可梦 钻石&珍珠》ED《风的信息》、《ひとひら》ED《微笑》、《同人ワーク》ED《夢みる乙女》等。发布个人翻唱专辑《夢見るシャンソン人形》，仅在演出现场销售。',
    tags: ['动画歌', '个人活动']
  },

  { era: 'MARiA 诞生 · niconico 时代' },
  {
    date: '2010 年 4 月 29 日',
    title: '首次以「MARiA」名义投稿 niconico',
    body: '上传翻唱 toku（とくP）原创 VOCALOID 曲《ARiA》的版本，标题为「★.｡･「ARiA」歌ってみた ver.MARiA ☆」。投稿即登热门，迅速走红。艺名 MARiA = 本名首字母 M + 首支投稿曲 ARiA。',
    tags: ['MARiA', 'niconico', 'ARiA'],
    highlight: true
  },
  {
    date: '2010 年 7 月 27 日',
    title: 'CHIX CHICKS 解散 · 与「水桥舞」身份告别',
    body: '组合宣告解散，成员各自独立。她也结束了「水桥舞」名义的演艺活动。',
    tags: ['解散']
  },
  {
    date: '2010 年 9 月 11 日',
    title: '与 toku 组成「GARNiDELiA」',
    body: '经共同认识的制作人引荐，与编曲家 toku（阿部尚徳）成立音乐组合 GARNiDELiA（ガルニデリア）。同人迷你专辑《ONE》与单曲《PRAYER》发布。组合名意为「美依礼芽歌唱的地方」。',
    tags: ['GARNiDELiA', '组建']
  },

  { era: 'GARNiDELiA · 同人/独立时代' },
  {
    date: '2011 年 2 月 23 日',
    title: '动画《Freezing（冻结）》OP《COLOR》',
    body: 'GARNiDELiA 首次承担电视动画 OP 主唱。曲由 toku 作曲编曲，美依礼芽演唱，在主流出道前打开通往动画歌领域的大门。',
    tags: ['动画歌']
  },
  {
    date: '2011 年 秋',
    title: '开始定期举办演唱会',
    body: '从 2011 年秋开始，他们坚持举办现场演出，正是这些 LIVE 让 Defstar Records（索尼旗下）的工作人员发掘到他们。',
    tags: ['LIVE', '生涯转折']
  },
  {
    date: '2012 年 7 月 25 日',
    title: '首张完整专辑《aMazing MusiQue PaRK》',
    body: 'niconico 时代代表作集成的独立专辑发行。',
    tags: ['独立专辑']
  },
  {
    date: '2012 年 8 月 7 日',
    title: '与みうめ・仮面ライアー217 上传「踊ってみた」',
    body: '为庆祝《aMazing MusiQue PaRK》发行而拍摄的舞蹈视频投稿后人气爆棚，三人组就此开启 GARNiDELiA「踊ってみた」舞见系列，陆续推出《Lamb.》《PiNK CAT》《極楽浄土》《桃源恋歌》等经典舞见。',
    tags: ['舞见', 'みうめ', '217']
  },
  {
    date: '2013 年 8 月 12 日',
    title: '翻唱专辑《MaBLE SYNDROMe》与 JIN 结缘',
    body: '通过翻唱《夜咄ディセイブ》开始与 JIN（自然之敌P）合作，常以特邀主唱参与 JIN 的演唱会与作品。',
    tags: ['翻唱', 'JIN']
  },

  { era: '主流出道 · 一年三连发（2014）' },
  {
    date: '2014 年 3 月 5 日',
    title: '主流出道单曲《ambiguous》',
    body: '在索尼 Defstar Records 旗下正式出道。主打曲为电视动画《Kill la Kill（斩服少女）》第二期片头曲，凭借激烈的吉他摇滚与小美强大的歌声打入主流动画歌市场。Oricon 周榜最高第 15 位。',
    tags: ['主流出道', 'Kill la Kill', '动画歌'],
    highlight: true
  },
  {
    date: '2014 年 7 月 30 日',
    title: '第二张单曲专辑《grilletto》',
    body: '动画《魔法科高校的劣等生》后期开场曲，更具数字感的酷炫摇滚。iTunes 动画榜首位，总榜第 2，mora 总榜第 1。在仙台、东京、名古屋、大阪、福冈 5 城 Animate 巡回签售。',
    tags: ['魔法科', 'animate']
  },
  {
    date: '2014 年 8 月',
    title: '海外首演 + JIN 大结局活动',
    body: '8 月 14、15 日以 JIN 特邀嘉宾身份参演动画《机巧少女不会受伤》大结局活动（涩谷公会堂）；8 月 17 日在印尼参加 AFA14 - Anime Festival Asia Indonesia 2014，海外人气抬头。',
    tags: ['海外', 'AFA']
  },
  {
    date: '2014 年 10 月 2 日',
    title: '首次个人演唱会《stellacage》',
    body: '在涩谷 TSUTAYA O-WEST 举行原汁原味的第一场 stellacage，开启日后延续至今的「stellacage」系列演唱会品牌。',
    tags: ['stellacage', '首场']
  },
  {
    date: '2014 年 10 月 29 日',
    title: '第三张单曲专辑《BLAZING》',
    body: '富野由悠季亲自指名的合作——动画《高达 G 复国运动》开场曲。Oricon 日榜首次进入前十（第 8 位），iTunes 与 mora 综合榜双榜首。富野导演为副歌一小段歌词与小美来回打磨了整整一个多月。',
    tags: ['BLAZING', '高达', '富野由悠季']
  },

  { era: '全面活跃期（2015）' },
  {
    date: '2015 年 1 月 21 日',
    title: '第一张原创合辑《Linkage Ring》',
    body: '13 首歌，其中 7 首全新。代表「这，才是 GARNiDELiA」。Oricon 周榜最高第 11 位，上榜 6 周。',
    tags: ['合辑', 'Linkage Ring']
  },
  {
    date: '2015 年 2 月 11 日',
    title: 'stellacage vol.II（东京 LIQUIDROOM）',
    body: '在《Linkage Ring》发布后的现场公开下一张专辑将是「首张民谣」，粉丝热烈呼应。',
    tags: ['stellacage']
  },
  {
    date: '2015 年 5 月 13 日',
    title: '第四张单曲专辑《MIRAI》',
    body: '动画《ガンスリンガー ストラトス》片尾曲，G 团首次正式尝试民谣编曲。32bit/96kHz 高分辨率录音，弦乐由前辈中西亮輔担当。后来这首歌成为 MARiA 与粉丝双向奔赴的象征曲。',
    tags: ['MIRAI', '民谣']
  },
  {
    date: '2015 年 6 月 1 日',
    title: '唱片公司从 Defstar Records 转至 SME Records',
    body: '随 Defstar Records 厂牌废止，GARNiDELiA 转至索尼旗下 SME Records 继续主流活动。',
    tags: ['唱片公司']
  },
  {
    date: '2015 年 7 月 起',
    title: '免费迷你巡演开始（茨城/广岛/兵库/福冈）',
    body: '为庆祝《BiRTHiA》发售开启的小规模路演，是其首次走向多城的尝试。',
    tags: ['巡演']
  },
  {
    date: '2015 年 8 月 18 日',
    title: '开设官方粉丝俱乐部「galaxia」',
    body: '官方爱好者俱乐部成立（现已废止）。',
    tags: ['粉丝俱乐部']
  },
  {
    date: '2015 年 8 月 26 日',
    title: '精选辑《BiRTHiA》',
    body: '收录独立音乐时代 15 首歌，全曲重录。包含从未发表的新曲《Birth》，附 ARiA 全新实景 MV 与小说。',
    tags: ['精选辑', '独立时期']
  },
  {
    date: '2015 年 8 月 29 日',
    title: 'Animelo Summer Live 2015 -THE GATE-',
    body: '在埼玉超级竞技场首登日本年度最大动画音乐节 anisama 的舞台。',
    tags: ['anisama']
  },
  {
    date: '2015 年 11 月 7 日',
    title: 'stellacage vol.III（东京 ToyosuPIT）',
    body: '本年 stellacage 系列首场万人级场地演出。',
    tags: ['stellacage']
  },
  {
    date: '2015 海外巡演',
    title: '美国 / 香港 / 澳洲 / 印尼 / 新加坡',
    body: '4/4 SakuraCon（美国）、7/26 Anison Dream Stage 2015（香港）、8/9 SMASH! 2015（澳洲）、9/25 AFAID 2015（印尼）、11/29 AFA 2015（新加坡）。开启横跨全球的海外活动节奏。',
    tags: ['海外巡演']
  },

  { era: '国际化 · 极乐净土走红（2016）' },
  {
    date: '2016 年 4 月 13 日',
    title: '数字单曲《Burning Soul》',
    body: 'PC 游戏《SoulWorker》主题曲，G 团首次为游戏作品制作主题曲。',
    tags: ['游戏', '单曲']
  },
  {
    date: '2016 年 4 月 25 日',
    title: '舞见系列第四弹《極楽浄土》上传 niconico',
    body: 'みうめ・メイリア・217 三人和服舞蹈版投稿，配合精心编排的「净土舞」，MV 在中国 B 站等平台疯传，引爆华人圈出圈热潮，「極楽浄土」自此成为 MARiA 海外人气的最大引擎。',
    tags: ['極楽浄土', '舞见', '出圈'],
    highlight: true
  },
  {
    date: '2016 年 5 月 3 日',
    title: 'stellacage vol.IV（东京 赤坂 BLITZ）',
    body: '现场首演《極楽浄土》，全场齐跳「净土舞」气氛达到顶点。',
    tags: ['stellacage', '極楽浄土']
  },
  {
    date: '2016 年 8 月 17 日',
    title: '第五张单曲专辑《约束 -Promise code-》',
    body: '动画《Qualidea Code》神奈川篇片尾曲。专辑首次大量启用和风元素，主唱与键盘也挑战和服造型，配套曲收录《極楽浄土》正式 CD 化，并加入全新和风民谣《紫苑》。',
    tags: ['約束', '和风', 'Qualidea Code']
  },
  {
    date: '2016 年海外活动密集',
    title: '台湾 / 马来西亚 / 美国 / 德国 / 泰国 / 香港',
    body: '全年至少 11 场海外活动（台北、马来西亚、Kawaii-Kon 美国、J-POP SUMMIT、德国 AnimagiC、AFA Thailand、Anime Weekend Atlanta 等），「極楽浄土」效应让海外邀约持续涌入。',
    tags: ['海外']
  },
  {
    date: '2016 年 9 月 14 日',
    title: '与 ClariS 合作专辑《Clever》',
    body: '《Qualidea Code》第三片尾曲，由 GARNiDELiA 与 ClariS 共同演绎（计入 ClariS 第 15 张专辑）。',
    tags: ['合作', 'ClariS']
  },
  {
    date: '2016 年 12 月 14 日',
    title: '第二张原创合辑《Violet Cry》',
    body: '13 首歌（含 9 首新曲），主题为「释放各种情感」——红色 + 蓝色混合为紫色。主打曲《Cry》是 G 团首次抒情伤感民谣。与洛杉矶 DJ 团队 Heavygrinder、大阪爵士乐队カルメラ均有合作曲。',
    tags: ['合辑', 'Violet Cry']
  },
  {
    date: '2016 年 12 月 10 / 17 日',
    title: 'stellacage vol.V（大阪 + 东京双场）',
    body: '系列首次跨城双场，标志着粉丝群体逐渐向地方扩散。',
    tags: ['stellacage']
  },

  { era: '巅峰 · 首次巡演 · 武道馆梦（2017）' },
  {
    date: '2017 年 1 月 28 日',
    title: 'リスアニ！LIVE 2017 武道馆登台',
    body: '在动画音乐界标志性的武道馆舞台上演出（拼盘形式），距离自办武道馆专场又近了一步。',
    tags: ['武道馆', 'リスアニ']
  },
  {
    date: '2017 年 3 月 起',
    title: '香港 / 新加坡 Anisong Fantasy Live 2017',
    body: 'Anisong Fantasy Live 香港（3/10）与新加坡（3/18）专场，亚洲粉丝持续扩张。',
    tags: ['亚洲']
  },
  {
    date: '2017 年 4 月 16 日 起',
    title: '首次正式巡演「stellacage TOUR 2017 ~Cry Out~」',
    body: '六场：东京 / 名古屋 / 大阪 / 福冈 / 仙台 + 上海。是 GARNiDELiA 真正意义上的第一次巡回演唱会，上海场是 5 月 20 日（BANDAINAMCO 上海梦想剧场），首次海外独立专场。',
    tags: ['巡演', '上海'],
    highlight: true
  },
  {
    date: '2017 年 6 月 14 日',
    title: '第六张单曲专辑《SPEED STAR》',
    body: '动画电影《劇場版 魔法科高校の劣等生 星を呼ぶ少女》主题曲，时隔 3 年再度与「魔法科」合作。从 SME Records 转至动漫向厂牌「SACRA MUSIC」后的首张专辑。同碟另收《Diamond》《Angel\'s ladder》。',
    tags: ['SPEED STAR', '魔法科', 'SACRA MUSIC']
  },
  {
    date: '2017 年 5—6 月',
    title: '舞见系列第五弹《桃源恋歌》上传',
    body: '小美亲自表态：这是写给中国粉丝的歌。中华风格的舞曲与编舞，是对《極楽浄土》在中国走红后接收到的爱的回应。',
    tags: ['桃源恋歌', '中国粉丝']
  },
  {
    date: '2017 年 7 月 23 日',
    title: '上海 BILIBILI MACRO LINK / WORLD 2017',
    body: '现场粉丝一句「赛高！」让她瞬间「赛高」回应粉丝，从此「赛高」成为最经典的咩文化符号之一。',
    tags: ['赛高', 'bilibili']
  },
  {
    date: '2017 年 7 月 30 日',
    title: 'Fate/Grand Order Fes 2017（幕张）',
    body: '作为《Fate/Apocrypha》片尾曲歌手登台 FGO 大型粉丝活动。',
    tags: ['Fate']
  },
  {
    date: '2017 年 8 月 23 日',
    title: '第七张单曲专辑《Désir》',
    body: '动画《Fate/Apocrypha》片尾曲。突出歌声本身、减弱数字感的「转折期」之作，「愿望」主题贯穿全曲，对 25 个角色的情感用谐音化的「愿望」串联。同碟收录 5 年前就有的《ワスレナグサ》与黑人舞曲风《Special Girl》。',
    tags: ['Désir', 'Fate']
  },
  {
    date: '2017 年 10 月 1 日',
    title: 'Zepp Tokyo 单独演唱会',
    body: '继首次巡演之后回归东京 Zepp Tokyo，舞台规格再上一档。',
    tags: ['Zepp']
  },
  {
    date: '2017 年 10 月 起',
    title: '亚洲巡演「stellacage Asia Tour 2017」',
    body: '4 场亚洲巡演：北京（10/5 第五回惠民文化消费季）、成都（10/6 AGM 独角兽音乐会）、台湾（10/14 花漾 Hana 展演空间）、深圳（11/11 Shenzhen A8 Livehouse）。全年合计 10 场巡演。',
    tags: ['亚洲巡演', '中国大陆']
  },
  {
    date: '2017 年 11 月 1 日',
    title: '第八张单曲专辑《アイコトバ》',
    body: '动画《アニメガタリズ》开场曲——首次尝试明亮大调流行舞曲。配套曲《Hysteric Bullet》是腾讯网络动画《枪娘》的主题曲（舞见系列第六弹「枪娘」中国玩家熟知）。',
    tags: ['アイコトバ', '枪娘']
  },

  { era: '集大成 · G.R.N.D.（2018）' },
  {
    date: '2018 年 1 月 27 日',
    title: '再登武道馆「リスアニ！LIVE 2018」',
    body: '武道馆再次回归。',
    tags: ['武道馆']
  },
  {
    date: '2018 年 1 月 31 日',
    title: '第九张单曲专辑《Error》（生日发行）',
    body: '动画《BEATLESS》开场曲。完全 EDM 化的「不像动画歌的动画歌」，连导演水岛精二都鼓励他们「更大胆一点」。同碟收录的《君が生まれた日》是 12—18 重小美和声叠出的生日歌。CD 与高分辨率版采用不同母带。',
    tags: ['Error', 'BEATLESS', '生日']
  },
  {
    date: '2018 年 3 月 28 日',
    title: '第三张原创合辑《G.R.N.D.》',
    body: 'GARNiDELiA 自身的缩写，13 首歌。主打曲《G.R.N.D.》成为日本电视台《ウチのガヤがすみません!》3 月片尾曲。同收录《红叶爱唄》（《王者荣耀》公孙离主题曲，舞见系列第七弹）等鹅厂合作作品。',
    tags: ['G.R.N.D.', '合辑', '王者荣耀'],
    highlight: true
  },
  {
    date: '2018 年 4 月 7—29 日 / 5 月 5 日',
    title: '巡演「stellacage Tour 2018」 大阪 / 爱知 / 东京 + 香港',
    body: '第二次年度巡演，4 场。东京站为 中野サンプラザホール。',
    tags: ['巡演']
  },
  {
    date: '2018 年 4 月 21 日',
    title: 'ANIMAX MUSIX 2018 Guangzhou',
    body: '广州登台。',
    tags: ['中国', '广州']
  },

  { era: '厂牌动荡 · 个人活动期（2019—2021）' },
  {
    date: '2019 年 1 月 12 日 / 3 月 13 日',
    title: '第十张单曲《REBEL FLAG》',
    body: '动画《魔法少女特殊战明日香》片尾曲。数字版 1 月 12 日先行，实体版 3 月 13 日发行。这也是 GARNiDELiA 至今为止的最后一张正式单曲专辑。',
    tags: ['REBEL FLAG', '动画歌']
  },
  {
    date: '2019 年 8 月 28 日',
    title: '与 SACRA MUSIC 合约月底到期',
    body: '索尼旗下动漫向厂牌 SACRA MUSIC 的合约结束，GARNiDELiA 进入厂牌动荡期。',
    tags: ['厂牌']
  },
  {
    date: '2019 年 12 月 4 日',
    title: '第二张精选集《GARNiDELiA BEST》',
    body: '正式厂牌时期作品的精选集发行（SACRA MUSIC 时代收尾）。',
    tags: ['精选集']
  },
  {
    date: '2020 年 6 月 29 日',
    title: '移籍日本环球音乐 · 数字单曲《Star Trail》',
    body: '正式签约日本环球音乐（Universal Music Japan），发行新厂牌首支数字单曲《Star Trail》。',
    tags: ['环球音乐', 'Star Trail']
  },
  {
    date: '2020 年 11 月 25 日',
    title: '第四张原创专辑《起死回生》',
    body: '签约环球音乐后的首张原创专辑，亦是组合时隔约两年的全新作品。',
    tags: ['起死回生', '专辑']
  },
  {
    date: '2021 年 3 月 22 日',
    title: '环球音乐合约终止 · 转籍波丽佳音',
    body: 'GARNiDELiA 组合与二人 SOLO 活动一同移籍 Pony Canyon（波丽佳音）。',
    tags: ['波丽佳音']
  },
  {
    date: '2021 年 5 月 26 日',
    title: 'MARiA 个人首张专辑《うたものがたり》',
    body: '出道以来首张个人名义专辑，收录 10 首情歌，词曲提供阵容豪华：山下穂尊（生物股长）、橋口洋平（wacci）、じん、草野華余子、TAKUYA（JUDY AND MARY）、山崎将义、本间昭光等。',
    tags: ['うたものがたり', '个人专辑', 'SOLO'],
    highlight: true
  },
  {
    date: '2021 年 11 月 17 日',
    title: '第五张原创专辑《Duality Code》',
    body: '收录《オトメの心得》（动画《大正处女御伽话》OP）等曲。',
    tags: ['Duality Code', '专辑']
  },

  { era: '婚姻 · 进入新阶段（2022）' },
  {
    date: '2022 年 6 月 22 日',
    title: 'MARiA 第二张个人专辑《Moments》',
    body: '继《うたものがたり》后的第二张个人名义专辑。',
    tags: ['Moments', '个人专辑', 'SOLO']
  },
  {
    date: '2022 年 11 月 1 日',
    title: '公开与摇滚乐手「ぽにきんぐだむ」结婚',
    body: 'MARiA 通过 Twitter 公开与乐队「オメでたい頭でなにより」吉他手 ぽにきんぐだむ（PONIKINGDOM）的婚讯，受到中日歌迷广泛祝福。',
    tags: ['婚讯', '私生活']
  },

  { era: '《乘风 2023》· 现象级出圈' },
  {
    date: '2023 年 4 月',
    title: '加入芒果 TV《乘风 2023》',
    body: '作为节目首位日本籍参赛者亮相。凭借真挚的中文学习态度、可爱的「小美」形象与舞台爆发力，迅速成为节目的最大流量担当。',
    tags: ['乘风2023', '出圈']
  },
  {
    date: '2023 年 5 — 7 月',
    title: '节目期间人气一度断层第一 · 总决赛获第三名',
    body: '节目期间人气与得票数一度领跑全员，单人票数超过其余 32 位「姐姐」的总和，成为罕见的「断层第一」级流量；总决赛最终获得第三名，并由此获得大量在中国的演出机会。',
    tags: ['断层第一', '总决赛第三名'],
    highlight: true
  },
  {
    date: '2023 年 5 月 — 6 月',
    title: '第二次 / 第三次公演接连登顶',
    body: '《归途有风》舞台获胜后自动获得「乘风创始人」身份；第三次公演排名再次位列第一，吴优、李莎旻子等淘汰。',
    tags: ['公演冠军']
  },
  {
    date: '2023 年 7 月 21 日',
    title: '乘风之夜 · 登上年度席位',
    body: '在节目「乘风之夜」与 Ella 陈嘉桦、Amber 刘逸云、谢娜、朱珠、Chipu 芝芙、刘惜君、A-Lin 黄丽玲、卢靖姗、龚琳娜、贾静雯共 11 人同登「乘风年度席位」。',
    tags: ['乘风之夜', '年度席位']
  },
  {
    date: '2023 年 7 月 26 日',
    title: '与周深合唱《夏日妄想》',
    body: '《王者荣耀》2023 夏日主题曲，与中国歌手周深合作。此后她持续承接中国影视、游戏的主题曲，成为中日音乐交流的代表面孔之一。',
    tags: ['周深', '夏日妄想', '中国合作']
  },
  {
    date: '2023 年 7 月 29 日',
    title: '《MIRAI》发布 8 年后首登 MORA 榜首',
    body: '《乘风 2023》带来的流量令 2015 年的旧作《MIRAI》在日本 mora 数字音乐平台首次登上榜首。',
    tags: ['MIRAI', 'mora']
  },
  {
    date: '2023 年 8 月 14 日',
    title: '迄今最大演唱会 · 粉丝齐唱《MIRAI》',
    body: '在迄今为止最大规模的演唱会现场，全场粉丝合唱《MIRAI》献给她，「双向奔赴」成为这一年她最常提及的关键词。',
    tags: ['演唱会', 'MIRAI']
  },
  {
    date: '2023 年 9 月 28 日',
    title: '北京《GARNiDELiA stellacage 2023 -stella ship- Re:CoNNeCT》',
    body: '中国巡演开启，全年含 OP/ED 共约 25 场，覆盖 3000 人主场、1000 人、500 人、200 人多种规模，分布在中国多座城市。中国 FC（Fan Club）同期开放。',
    tags: ['中国巡演', 'stellacage']
  },

  { era: '再出发 · 十周年与新章（2024—2025）' },
  {
    date: '2024 年 1 月 17 日',
    title: '第六张原创专辑《TEN》',
    body: '号称耗时约两年打磨的原创专辑，收录《幻爱游戏》（动画《我家师傅没有尾巴》OP）等曲。',
    tags: ['TEN', '专辑']
  },
  {
    date: '2024 年 8 月 11 日',
    title: '出道十周年巡演首站 · 澳门',
    body: '「GARNiDELiA 10th anniversary stellacage tour 2024 -Link The World-」十周年巡演由澳门站开启，串联中日及海外多地。',
    tags: ['十周年', '巡演', '澳门'],
    highlight: true
  },
  {
    date: '2025 年 2 月 26 日',
    title: '全时期精选《GRND THE BEST PROGRESS》',
    body: '横跨全时期的精选专辑，并收录《极乐净土》《桃源恋歌》《响喜乱舞》等代表作的 [PROGRESS] 重制版。',
    tags: ['精选集', 'PROGRESS']
  },
  {
    date: '2025 年 3 月 12 日',
    title: 'MARiA 首部自传随笔《I am MARiA》',
    body: '讲述自己的成长与在中国爆红的历程，并收录宫原梦画拍摄的照片。',
    tags: ['I am MARiA', '自传']
  },

  { era: '事务所纠纷 · 组合停摆（2025）' },
  {
    date: '2025 年 9 月 2 日',
    title: 'GARNiDELiA 宣布无限期停止活动',
    body: '官方网站突然发布无限期停止所有活动的公告，年内已确定的巡演（含台北场等）全数取消。公告仅由 toku（阿部尚德）一人署名，主唱 MARiA 并未参与。',
    tags: ['停止活动', '官网公告'],
    highlight: true
  },
  {
    date: '2025 年 9 月 2 日 · 同日',
    title: 'MARiA 公开表态：「诶！？」',
    body: '在转发停止活动消息时，MARiA 仅回复一句「诶！？」表明事先并不知情，并向引起混乱的粉丝致歉。',
    tags: ['诶！？']
  },
  {
    date: '2025 年 9 月（随后）',
    title: '长文公开事务所欠薪与霸凌',
    body: 'MARiA 发布长文，公开所属事务所 SUPER DIRECTION INC. 长期欠付演出报酬、部分工作完全未结算、并多次遭受社长言语霸凌的经历。她同时表示，今后不再以个人身份演唱 GARNiDELiA 时期的任何曲目。',
    tags: ['事务所纠纷', '欠薪', '霸凌']
  },
  {
    date: '— 进行中 —',
    title: '后续：解约与未来',
    body: '事件后续仍在发展。MARiA 解除事务所合约、开启全新阶段的活动方向是中日两地粉丝关注的焦点。',
    tags: ['进行中']
  }
]

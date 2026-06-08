// 美依礼芽（MARiA）统一数据源 —— 生平 & 作品共用
//
// 「一年一对象」：{ year, title?, summary?, highlight?, events:[...] }
//   title    该年代表事件（年份轴上展示；为空则该年淡化为「待补充」）
//   highlight 重要一年（轴上 ★ 特效 + 首页轮播）
//
// 每个 event 既是生平节点，也是作品条目（统一单源，避免双录）：
//   {
//     id,                       // 全站唯一，作详情页路由 /item/:id
//     date,                     // 'MM-DD' 或文字（如 '秋'、'全年'）
//     cat,                      // 大类：见 MAJORS
//     sub?,                     // 小类：见 MAJORS[cat].subs
//     title, body?,
//     tags?,                    // 标签（卡片左下角；体系待逐步补充）
//     highlight?,               // 该年的标志性条目
//     media?                    // 预留：{ links?, video?, audio?, photos? }，详情页后续填充
//   }
// events 按时间顺序手写，详情页/年份页按数组顺序渲染。

// 大类 + 小类
export const MAJORS = {
  music:   { label: '音乐', subs: { album: '专辑', single: '单曲', collab: '合作曲' } },
  dance:   { label: '舞见', subs: {} },
  live:    { label: '演出', subs: { concert: '演唱会', festival: '音乐节' } },
  variety: { label: '综艺', subs: {} },
  life:    { label: '经历', subs: {} }
}

// 兼容旧引用：仅保留 label
export const CATEGORIES = {
  music:   { label: '音乐' },
  dance:   { label: '舞见' },
  live:    { label: '演出' },
  variety: { label: '综艺' },
  life:    { label: '经历' }
}

export const years = [
  {
    year: 1992,
    title: '美依礼芽诞生',
    summary: '出生于茨城县土浦市，自幼习乐习舞、浸染二次元文化。',
    events: [
      { id: '1992-1', date: '01-31', cat: 'life', title: '出生于日本茨城县土浦市', body: '本名水桥舞（みずはし まい），和族，B 型血，水瓶座。1992 年 1 月 31 日出生于日本茨城县土浦市，身高 152cm。', tags: ['出生', '茨城', '和族', '水瓶座'] },
      { id: '1992-2', date: '幼年 起', cat: 'life', title: '自幼学习音乐与舞蹈 · 受二次元文化熏陶', body: '自幼学习音乐和舞蹈，受到日本二次元（ACG）文化熏陶，从此长期围绕 ACG 圈进行创作。', tags: ['童年', 'ACG'] }
    ],
    photos: ['/photos/1992/1.jpg', '/photos/1992/4.jpg']
  },
  {
    year: 2003,
    title: '11 岁童星出道',
    summary: '以本名水桥舞加入 New man co., Ltd.，演唱《神秘智慧石》主题曲《Birthday Heart》出道。',
    events: [
      { id: '2003-1', date: '2003 年', cat: ['life', 'music'], sub: 'single', title: '以本名「水桥舞」加入 New man co., Ltd. 出道', body: '以本名「水桥舞」加入 4 人音乐组合「New man co., Ltd.」，演唱电视动画《神秘智慧石》（そーなんだ!）的主题曲《Birthday Heart》出道，时年 11 岁。', tags: ['童星出道', 'New man co.', '神秘智慧石', '出道曲'], media: { photos: [{ src: '/photos/2003/3.jpg', caption: '组合照片' }] } }
    ]
  },
  {
    year: 2005,
    title: '加入「原宿 BJ Girls」再出道',
    summary: '以最年少成员身份加入爵士声乐组合，并为动画《神様家族》献唱片头曲。',
    events: [
      { id: '2005-1', date: '2005 年', cat: 'life', title: '加入 6 人爵士声乐组合「原宿 BJ Girls」', body: '以 6 人爵士声乐组合「原宿 BJ Girls」（原宿BJガールズ）再出道，是组合中年纪最小的一员；之后组合改名为「CHIX CHICKS」。', tags: ['Chix Chicks', '再出道'], media: { photos: [{ src: '/photos/2005/31.jpg', caption: '组合照片' }, { src: '/photos/2005/8.png', caption: '组合照片' }] } },
      { id: '2005-2', date: '2005 年', cat: 'music', sub: 'single', title: '动画《神様家族》片头曲《Brand New Morning》', body: '为电视动画《神様家族》演唱片头曲《Brand New Morning》。', tags: ['动画歌', '神様家族', 'Brand New Morning'], media: { photos: [{ src: '/photos/2005/11.jpg', caption: '神様家族' }, { src: '/photos/2005/7.jpg', caption: '演唱现场' }] } }
    ]
  },
  {
    year: 2006,
    title: '个人名义动画歌起步',
    summary: '个人名义发行首张翻唱专辑，并密集推出动画相关单曲与专辑。',
    events: [
      { id: '2006-1', date: '01-25', cat: 'music', sub: 'album', title: '首张翻唱专辑《夢見るシャンソン人形》发售', body: '以个人名义发售动画歌，并发行首张翻唱专辑《夢見るシャンソン人形》。', tags: ['翻唱专辑', '个人名义'] },
      { id: '2006-2', date: '09-03', cat: 'music', sub: 'single', title: '《Brand New Morning》《不能在图书馆说的天使的秘密》发售', body: '《Brand New Morning》《不能在图书馆说的天使的秘密》发售。', tags: ['发售', 'Brand New Morning'], media: { photos: [{ src: '/photos/2006/9.png', caption: '《不能在图书馆说的天使的秘密》演唱照片' }] } },
      { id: '2006-3', date: '12-29', cat: 'music', sub: 'album', title: '动画《神様家族》原声迷你专辑《Kamisama Kazoku Mini Album》发行', body: '为动画《神様家族》演唱，原声迷你专辑《Kamisama Kazoku Mini Album》发行。', tags: ['神様家族', '原声专辑'] }
    ]
  },
  {
    year: 2007,
    title: '动画《初瓣》片尾曲《スマイル》',
    summary: '为电视动画《初瓣》演唱片尾曲《スマイル》。',
    events: [
      { id: '2007-1', date: '06-13', cat: 'music', sub: 'single', title: '动画《初瓣》片尾曲《スマイル》', body: '为电视动画《初瓣》演唱片尾曲《スマイル》。', tags: ['动画歌', '初瓣', 'スマイル'], media: { photos: [{ src: '/photos/2007/10.jpg', caption: '单曲封面' }] } }
    ],
    photos: [
      { src: '/photos/2007/16.jpg', caption: 'CHIX CHICKS 2007 年第一次原宿 street live' },
      { src: '/photos/2007/17.jpg', caption: 'CHIX CHICKS 2007 年第一次原宿 street live' }
    ]
  },
  {
    year: 2008,
    title: '舞台剧首演 · 宝可梦动画片尾曲',
    summary: '参演舞台剧《心は孤独なアトム》首演，并献唱宝可梦动画片尾曲《风的信息》。',
    events: [
      { id: '2008-1', date: '03-20', cat: 'live', title: '舞台剧《心は孤独なアトム》首演', body: '参演的舞台剧《心は孤独なアトム》首演。', tags: ['舞台剧', '心は孤独なアトム'], media: { photos: [{ src: '/photos/2008/12.png', caption: '演出照片' }] } },
      { id: '2008-2', date: '05-28', cat: 'music', sub: 'single', title: '动画《精灵宝可梦：钻石与珍珠》片尾曲《风的信息》', body: '演唱电视动画《精灵宝可梦：钻石与珍珠》片尾曲《风的信息》。', tags: ['动画歌', '宝可梦', '风的信息'], media: { photos: [{ src: '/photos/2008/21.jpg', caption: '《风的信息》单曲封面' }, { src: '/photos/2008/30.png', caption: '弹奏照片' }] } }
    ],
    photos: [
      { src: '/photos/2008/18.jpg', caption: 'CHIX CHICKS「音符と昆布」开幕表演' },
      { src: '/photos/2008/19.jpg', caption: 'CHIX CHICKS「音符と昆布」开幕表演' },
      { src: '/photos/2008/20.jpg', caption: 'CHIX CHICKS「音符と昆布」开幕表演' },
      '/photos/2008/13.jpg',
      '/photos/2008/14.jpg',
      '/photos/2008/15.jpg'
    ]
  },
  {
    year: 2009,
    label: '2007–2009',
    title: '早期影像合辑',
    summary: '原宿 BJ Girls / CHIX CHICKS 时期的零散影像合集。',
    events: [],
    photos: [
      '/photos/2007-2009/22.jpg',
      '/photos/2007-2009/23.jpg',
      '/photos/2007-2009/24.jpg',
      '/photos/2007-2009/25.jpg',
      '/photos/2007-2009/26.jpg',
      '/photos/2007-2009/27.jpg',
      '/photos/2007-2009/28.jpg',
      '/photos/2007-2009/29.jpg'
    ]
  },
  {
    year: 2010,
    title: 'MARiA 诞生 · niconico 时代',
    summary: '以「MARiA」名义在 niconico 走红，并组成 GARNiDELiA。',
    events: [
      { id: '2010-1', date: '04 月', cat: 'life', title: '开始以「MARiA」名义活动 · 登陆 niconico', body: '开始以「MARiA」的名义活动，正式登陆视频网站 niconico。MARiA 之名源自旧艺名 Meiria 的首字母「M」，与在 niconico 上初投稿的歌名「ARiA」组合而成。第一个以 MARiA 名义发行的作品是《COLOR》；她在 niconico 动画发布了翻唱 toku（とく，阿部尚徳）的《ARiA》——《ARiA》是 toku-P 于 4 月 29 日投稿至 niconico 与 YouTube 的 VOCALOID 日文原创歌曲，MARiA 同日投稿了真人翻唱版。', tags: ['MARiA', 'niconico', 'ARiA'] },
      { id: '2010-2', date: '07-27', cat: 'life', title: 'CHIX CHICKS 解散 · 开始个人 SOLO', body: '组合 CHIX CHICKS 解散；之后她开始个人 SOLO 活动。', tags: ['解散', 'SOLO'] },
      { id: '2010-3', date: '09-11', cat: 'life', title: '与 toku 组成「GARNiDELiA」', body: 'MARiA 正式与 toku 组成 GARNiDELiA 组合（组合名意为「MARiA 歌唱的地方」，简称「G 团」），并在 2010—2011 年的 niconico 大会日本全国巡演 FINAL 中亮相。', tags: ['GARNiDELiA', '组建'], media: { photos: [{ src: '/photos/2010/32.jpg', caption: 'GARNiDELiA 合照' }] } },
      { id: '2010-4', date: '12-31', cat: 'music', sub: 'album', title: '首张同人专辑《One》', body: '随 GARNiDELiA 发行首张同人专辑《One》。', tags: ['同人', 'One'], media: { photos: [{ src: '/photos/2010/33.jpg', caption: '《One》' }] } }
    ]
  },
  {
    year: 2011,
    title: 'GARNiDELiA 动画歌起步',
    summary: '登台 niconico 大会议 FINAL，发行第二张同人专辑《Prayer》，并以动画《Freezing》OP《COLOR》踏入动画歌领域。',
    events: [
      { id: '2011-4', date: '02-04 / 05', cat: 'live', sub: 'concert', title: 'niconico 大会议 2010-2011 全国巡演 FINAL', body: '举行「niconico 大会议 2010-2011 全国巡回演出 〜谢谢 100 万人〜 FINAL」。', tags: ['niconico大会议', 'LIVE'], media: { photos: [{ src: '/photos/2011/36.png', caption: '演出现场' }] } },
      { id: '2011-1', date: '02-23', cat: 'music', sub: 'single', title: '动画《Freezing（冻结）》OP《COLOR》', body: '演唱电视动画《Freezing（冻结）》片头曲《COLOR》。', tags: ['动画歌', 'Freezing', 'COLOR'], media: { photos: [{ src: '/photos/2011/35.jpg', caption: '《Freezing》' }] } },
      { id: '2011-2', date: '05-01', cat: 'music', sub: 'album', title: '第二张同人专辑《Prayer》', body: '随 GARNiDELiA 发行第二张同人专辑《Prayer》。', tags: ['同人', 'Prayer'], media: { photos: [{ src: '/photos/2011/34.jpg', caption: '《Prayer》封面' }] } }
    ]
  },
  {
    slug: '2010-2011',
    label: '2010–2011',
    title: 'GARNiDELiA 初期影像合辑',
    summary: 'GARNiDELiA 成立前后、niconico 时代的零散影像合集。',
    events: [],
    photos: [
      '/photos/2010-2011/37.jpg',
      '/photos/2010-2011/38.jpg',
      '/photos/2010-2011/39.jpg',
      '/photos/2010-2011/40.jpg',
      '/photos/2010-2011/41.jpg',
      '/photos/2010-2011/42.jpg'
    ]
  },
  {
    year: 2012,
    title: '首次海外公演 · 个人首张同人专辑',
    summary: '随 GARNiDELiA 首次海外公演登台上海，发行个人首张同人专辑《aMazing MusiQue PaRK》并与みうめ・仮面ライアー217 共创舞蹈《Girls》，年内 G 团再发第三张同人专辑。',
    events: [
      { id: '2012-1', date: '05-13', cat: 'live', sub: 'festival', title: '首次海外公演 · 上海舞动漫音楽祭 ANIME ROCK CONVENTION', body: '随 GARNiDELiA 首次海外公演，于上海举行的舞动漫音楽祭 ~ANIME ROCK CONVENTION~ 演出。', tags: ['首次海外公演', '上海', 'ANIME ROCK CONVENTION'], media: { photos: [{ src: '/photos/2012/43.png', caption: '音楽祭采访' }, { src: '/photos/2012/44.png', caption: '音楽祭采访' }] } },
      { id: '2012-2', date: '07-25', cat: ['music', 'dance'], sub: 'album', title: '个人首张同人专辑《aMazing MusiQue PaRK》 · 舞蹈《Girls》', body: '发布首张个人同人专辑《aMazing MusiQue PaRK》；为此与好友 Miume（みうめ）、仮面ライアー217（妮娜）共同创作了名为《Girls》的舞蹈。', tags: ['同人专辑', 'aMazing MusiQue PaRK', 'Girls', 'みうめ', '217'], media: { photos: [{ src: '/photos/2012/45.jpg', caption: '《aMazing MusiQue PaRK》' }, { src: '/photos/2012/46.png', caption: '《Girls》' }] } },
      { id: '2012-3', date: '08-11', cat: 'music', sub: 'album', title: '第三张同人专辑《Pluslights-21248931-》', body: '随 GARNiDELiA 发行第三张同人专辑《Pluslights-21248931-》。', tags: ['同人', 'Pluslights'], media: { photos: [{ src: '/photos/2012/47.jpg', caption: '《Pluslights-21248931-》' }] } }
    ]
  },
  {
    year: 2013,
    title: '密集演出 · 主流出道前奏',
    summary: '全年密集出演各类 LIVE 与音乐节，推出第二张个人同人专辑《MabLE SYNDROMe》，并以收录于「リスアニ!」Vol.15 的《True High》为主流出道预热。',
    events: [
      { id: '2013-1', date: '04-23', cat: 'live', title: '「STARTING OVER」出演', body: '随 GARNiDELiA 出演「STARTING OVER」。', tags: ['LIVE', 'GARNiDELiA'] },
      { id: '2013-2', date: '06-09', cat: 'live', sub: 'festival', title: '音乐节「SAKAE SP-RING 2013」出演', body: '随 GARNiDELiA 出演音乐节「SAKAE SP-RING 2013」。', tags: ['音乐节', 'SAKAE SP-RING'] },
      { id: '2013-3', date: '08-12', cat: 'music', sub: 'album', title: '第二张个人同人专辑《MabLE SYNDROMe》', body: '推出第二张个人同人专辑《MabLE SYNDROMe》。', tags: ['同人专辑', 'MabLE SYNDROMe'], media: { photos: [{ src: '/photos/2013/48.jpg', caption: '《MabLE SYNDROMe》' }] } },
      { id: '2013-4', date: '10-30', cat: 'music', sub: 'single', title: '《True High》预备出道（リスアニ! Vol.15 附录）', body: 'GARNiDELiA 以「リスアニ!」Vol.15 附录曲《True High》预备出道。', tags: ['True High', 'リスアニ', '预备出道'], media: { photos: ['/photos/2013/49.jpg'] } },
      { id: '2013-5', date: '11-03', cat: 'live', sub: 'festival', title: '「超流APPEND FES.2013」出演', body: '随 GARNiDELiA 出演「超流APPEND FES.2013」。', tags: ['LIVE', '超流APPEND'] }
    ],
    photos: [
      { src: '/photos/2013/59.png', caption: '《Girls》现场' },
      '/photos/2013/50.jpg',
      '/photos/2013/51.jpg',
      '/photos/2013/52.jpg',
      '/photos/2013/53.jpg',
      '/photos/2013/54.jpg',
      '/photos/2013/55.jpg',
      '/photos/2013/56.jpg',
      '/photos/2013/57.jpg',
      '/photos/2013/58.jpg'
    ]
  },
  {
    year: 2014,
    title: '主流出道 · 一年三连发',
    summary: '索尼旗下正式出道，一年内三张单曲三部动画。',
    events: [
      { id: '2014-1', date: '03-05', cat: 'music', sub: 'single', title: '主流出道单曲《ambiguous》', body: '在索尼 Defstar Records 旗下正式出道。主打曲为电视动画《Kill la Kill（斩服少女）》第二期片头曲。Oricon 周榜最高第 15 位。', tags: ['主流出道', 'Kill la Kill'] },
      { id: '2014-2', date: '07-30', cat: 'music', sub: 'single', title: '第二张单曲《grilletto》', body: '动画《魔法科高校的劣等生》后期开场曲，更具数字感的酷炫摇滚。iTunes 动画榜首位。', tags: ['魔法科'] },
      { id: '2014-3', date: '08 月', cat: 'live', sub: 'festival', title: '海外首演 + JIN 大结局活动', body: '8 月以 JIN 特邀嘉宾身份参演《机巧少女不会受伤》大结局活动（涩谷公会堂）；并在印尼参加 AFA14。', tags: ['海外', 'AFA'] },
      { id: '2014-4', date: '10-02', cat: 'live', sub: 'concert', title: '首次个人演唱会《stellacage》', body: '在涩谷 TSUTAYA O-WEST 举行第一场 stellacage，开启日后延续至今的「stellacage」系列演唱会品牌。', tags: ['stellacage', '首场'] },
      { id: '2014-5', date: '10-29', cat: 'music', sub: 'single', title: '第三张单曲《BLAZING》', body: '富野由悠季亲自指名的合作——动画《高达 G 复国运动》开场曲。Oricon 日榜首次进入前十。', tags: ['BLAZING', '高达'] }
    ]
  },
  {
    year: 2015,
    title: '全面活跃期',
    summary: '原创合辑、首张民谣单曲、anisama 首登与全球海外巡演。',
    events: [
      { id: '2015-1', date: '01-21', cat: 'music', sub: 'album', title: '第一张原创合辑《Linkage Ring》', body: '13 首歌，其中 7 首全新。Oricon 周榜最高第 11 位。', tags: ['Linkage Ring'] },
      { id: '2015-2', date: '02-11', cat: 'live', sub: 'concert', title: 'stellacage vol.II（东京 LIQUIDROOM）', body: '现场公开下一张专辑将是「首张民谣」。', tags: ['stellacage'] },
      { id: '2015-3', date: '05-13', cat: 'music', sub: 'single', title: '第四张单曲《MIRAI》', body: '动画《ガンスリンガー ストラトス》片尾曲，G 团首次正式尝试民谣编曲。后成为 MARiA 与粉丝双向奔赴的象征曲。', tags: ['MIRAI', '民谣'] },
      { id: '2015-4', date: '06-01', cat: 'life', title: '唱片公司从 Defstar Records 转至 SME Records', body: '随 Defstar Records 厂牌废止，转至索尼旗下 SME Records 继续主流活动。', tags: ['唱片公司'] },
      { id: '2015-5', date: '07 月 起', cat: 'live', sub: 'concert', title: '免费迷你巡演（茨城/广岛/兵库/福冈）', body: '为庆祝《BiRTHiA》发售开启的小规模路演。', tags: ['巡演'] },
      { id: '2015-6', date: '08-18', cat: 'life', title: '开设官方粉丝俱乐部「galaxia」', body: '官方爱好者俱乐部成立（现已废止）。', tags: ['粉丝俱乐部'] },
      { id: '2015-7', date: '08-26', cat: 'music', sub: 'album', title: '精选辑《BiRTHiA》', body: '收录独立音乐时代 15 首歌，全曲重录，含新曲《Birth》。', tags: ['精选辑'] },
      { id: '2015-8', date: '08-29', cat: 'live', sub: 'festival', title: 'Animelo Summer Live 2015 -THE GATE-', body: '在埼玉超级竞技场首登日本年度最大动画音乐节 anisama 舞台。', tags: ['anisama'] },
      { id: '2015-9', date: '11-07', cat: 'live', sub: 'concert', title: 'stellacage vol.III（东京 ToyosuPIT）', body: '本年 stellacage 系列首场万人级场地演出。', tags: ['stellacage'] },
      { id: '2015-10', date: '全年', cat: 'live', sub: 'festival', title: '海外巡演 · 美国 / 香港 / 澳洲 / 印尼 / 新加坡', body: 'SakuraCon（美国）、Anison Dream Stage（香港）、SMASH!（澳洲）、AFAID（印尼）、AFA（新加坡）。开启横跨全球的海外活动节奏。', tags: ['海外巡演'] }
    ]
  },
  {
    year: 2016,
    title: '极乐净土 · 中国出圈',
    summary: '一支和服舞蹈视频让她在中国一夜爆红。',
    events: [
      { id: '2016-1', date: '04-13', cat: 'music', sub: 'single', title: '数字单曲《Burning Soul》', body: 'PC 游戏《SoulWorker》主题曲，G 团首次为游戏作品制作主题曲。', tags: ['游戏'] },
      { id: '2016-2', date: '04-25', cat: 'dance', title: '舞见系列第四弹《極楽浄土》上传 niconico', body: 'みうめ・メイリア・217 三人和服舞蹈版投稿，MV 在中国 B 站等平台疯传，引爆华人圈出圈热潮，自此成为 MARiA 海外人气的最大引擎。', tags: ['極楽浄土', '舞见', '出圈'] },
      { id: '2016-3', date: '05-03', cat: 'live', sub: 'concert', title: 'stellacage vol.IV（东京 赤坂 BLITZ）', body: '现场首演《極楽浄土》，全场齐跳「净土舞」。', tags: ['stellacage'] },
      { id: '2016-4', date: '08-17', cat: 'music', sub: 'single', title: '第五张单曲《约束 -Promise code-》', body: '动画《Qualidea Code》片尾曲。专辑首次大量启用和风元素，配套曲收录《極楽浄土》正式 CD 化与和风民谣《紫苑》。', tags: ['約束', '和风'] },
      { id: '2016-5', date: '全年', cat: 'live', sub: 'festival', title: '海外活动密集 · 台湾 / 马来西亚 / 美国 / 德国 / 泰国 / 香港', body: '全年至少 11 场海外活动，「極楽浄土」效应让海外邀约持续涌入。', tags: ['海外'] },
      { id: '2016-6', date: '09-14', cat: 'music', sub: 'collab', title: '与 ClariS 合作曲《Clever》', body: '《Qualidea Code》第三片尾曲，由 GARNiDELiA 与 ClariS 共同演绎。', tags: ['ClariS', '合作'] },
      { id: '2016-7', date: '12-14', cat: 'music', sub: 'album', title: '第二张原创合辑《Violet Cry》', body: '13 首歌（含 9 首新曲），主题为「释放各种情感」。与 Heavygrinder、カルメラ 均有合作曲。', tags: ['Violet Cry'] },
      { id: '2016-8', date: '12-10 / 17', cat: 'live', sub: 'concert', title: 'stellacage vol.V（大阪 + 东京双场）', body: '系列首次跨城双场。', tags: ['stellacage'] }
    ]
  },
  {
    year: 2017,
    title: '首次巡演 · 武道馆梦',
    summary: '第一次正式巡回演唱会，并踏上武道馆舞台。',
    events: [
      { id: '2017-1', date: '01-28', cat: 'live', sub: 'festival', title: 'リスアニ！LIVE 2017 武道馆登台', body: '在动画音乐界标志性的武道馆舞台上演出（拼盘形式）。', tags: ['武道馆', 'リスアニ'] },
      { id: '2017-2', date: '03 月', cat: 'live', sub: 'concert', title: '香港 / 新加坡 Anisong Fantasy Live 2017', body: 'Anisong Fantasy Live 香港（3/10）与新加坡（3/18）专场。', tags: ['亚洲'] },
      { id: '2017-3', date: '04-16 起', cat: 'live', sub: 'concert', title: '首次正式巡演「stellacage TOUR 2017 ~Cry Out~」', body: '六场：东京 / 名古屋 / 大阪 / 福冈 / 仙台 + 上海。真正意义上的第一次巡回演唱会，上海场（5/20）为首次海外独立专场。', tags: ['巡演', '上海'] },
      { id: '2017-4', date: '05—06 月', cat: 'dance', title: '舞见系列第五弹《桃源恋歌》上传', body: '小美亲自表态：这是写给中国粉丝的歌。中华风格的舞曲与编舞，是对《極楽浄土》在中国走红后的回应。', tags: ['桃源恋歌', '中国粉丝'] },
      { id: '2017-5', date: '06-14', cat: 'music', sub: 'single', title: '第六张单曲《SPEED STAR》', body: '动画电影《劇場版 魔法科高校の劣等生 星を呼ぶ少女》主题曲。转至动漫向厂牌「SACRA MUSIC」后的首张专辑。', tags: ['SPEED STAR', 'SACRA MUSIC'] },
      { id: '2017-6', date: '07-23', cat: 'live', sub: 'festival', title: '上海 BILIBILI MACRO LINK / WORLD 2017', body: '现场粉丝一句「赛高！」让她瞬间回应，从此「赛高」成为最经典的咩文化符号之一。', tags: ['赛高', 'bilibili'] },
      { id: '2017-7', date: '07-30', cat: 'live', sub: 'festival', title: 'Fate/Grand Order Fes 2017（幕张）', body: '作为《Fate/Apocrypha》片尾曲歌手登台 FGO 大型粉丝活动。', tags: ['Fate'] },
      { id: '2017-8', date: '08-23', cat: 'music', sub: 'single', title: '第七张单曲《Désir》', body: '动画《Fate/Apocrypha》片尾曲。突出歌声本身、减弱数字感的「转折期」之作。', tags: ['Désir', 'Fate'] },
      { id: '2017-9', date: '10-01', cat: 'live', sub: 'concert', title: 'Zepp Tokyo 单独演唱会', body: '舞台规格再上一档。', tags: ['Zepp'] },
      { id: '2017-10', date: '10 月 起', cat: 'live', sub: 'concert', title: '亚洲巡演「stellacage Asia Tour 2017」', body: '北京 / 成都 / 台湾 / 深圳 4 场，全年合计 10 场巡演。', tags: ['亚洲巡演', '中国大陆'] },
      { id: '2017-11', date: '11-01', cat: 'music', sub: 'single', title: '第八张单曲《アイコトバ》', body: '动画《アニメガタリズ》开场曲——首次尝试明亮大调流行舞曲。', tags: ['アイコトバ'] },
      { id: '2017-12', date: '11 月', cat: 'dance', title: '舞见系列第六弹《Hysteric Bullet（枪娘）》', body: '腾讯网络动画《枪娘》主题曲，《アイコトバ》配套曲，中国玩家熟知的舞见之一。', tags: ['枪娘', '舞见'] }
    ]
  },
  {
    year: 2018,
    title: '集大成 · G.R.N.D.',
    summary: '第三张原创合辑发行，再登武道馆。',
    events: [
      { id: '2018-1', date: '01-27', cat: 'live', sub: 'festival', title: '再登武道馆「リスアニ！LIVE 2018」', body: '武道馆再次回归。', tags: ['武道馆'] },
      { id: '2018-2', date: '01-31', cat: 'music', sub: 'single', title: '第九张单曲《Error》（生日发行）', body: '动画《BEATLESS》开场曲。完全 EDM 化的「不像动画歌的动画歌」。同碟收录生日歌《君が生まれた日》。', tags: ['Error', 'BEATLESS', '生日'] },
      { id: '2018-3', date: '03-28', cat: 'music', sub: 'album', title: '第三张原创合辑《G.R.N.D.》', body: 'GARNiDELiA 自身的缩写，13 首歌。主打曲成为日本电视台节目片尾曲。', tags: ['G.R.N.D.', '合辑'] },
      { id: '2018-4', date: '03 月', cat: 'dance', title: '舞见系列第七弹《红叶爱唄》', body: '《王者荣耀》公孙离主题曲，收录于《G.R.N.D.》，鹅厂合作的中华风舞见。', tags: ['王者荣耀', '舞见'] },
      { id: '2018-5', date: '04 月', cat: 'live', sub: 'concert', title: '巡演「stellacage Tour 2018」 大阪 / 爱知 / 东京 + 香港', body: '第二次年度巡演，4 场。东京站为中野サンプラザホール。', tags: ['巡演'] },
      { id: '2018-6', date: '04-21', cat: 'live', sub: 'festival', title: 'ANIMAX MUSIX 2018 Guangzhou', body: '广州登台。', tags: ['中国', '广州'] }
    ]
  },
  {
    year: 2019,
    title: '厂牌动荡 · 个人活动期',
    summary: '最后一张正式单曲，年底约满离开 SACRA MUSIC。',
    events: [
      { id: '2019-1', date: '01-12 / 03-13', cat: 'music', sub: 'single', title: '第十张单曲《REBEL FLAG》', body: '动画《魔法少女特殊战明日香》片尾曲。这也是 GARNiDELiA 至今为止的最后一张正式单曲专辑。', tags: ['REBEL FLAG'] },
      { id: '2019-2', date: '08-28', cat: 'life', title: '与 SACRA MUSIC 合约月底到期', body: '索尼旗下动漫向厂牌 SACRA MUSIC 的合约结束，进入厂牌动荡期。', tags: ['厂牌'] },
      { id: '2019-3', date: '12-04', cat: 'music', sub: 'album', title: '第二张精选集《GARNiDELiA BEST》', body: 'SACRA MUSIC 时代的收尾精选集。', tags: ['精选集'] }
    ]
  },
  {
    year: 2020,
    title: '签约环球音乐',
    summary: '移籍环球，发行第四张原创专辑《起死回生》。',
    events: [
      { id: '2020-1', date: '06-29', cat: 'music', sub: 'single', title: '移籍日本环球音乐 · 数字单曲《Star Trail》', body: '正式签约日本环球音乐（Universal Music Japan），发行新厂牌首支数字单曲。', tags: ['环球音乐', 'Star Trail'] },
      { id: '2020-2', date: '11-25', cat: 'music', sub: 'album', title: '第四张原创专辑《起死回生》', body: '签约环球音乐后的首张原创专辑，组合时隔约两年的全新作品。', tags: ['起死回生'] }
    ]
  },
  {
    year: 2021,
    title: '转籍波丽佳音 · 个人首专',
    summary: 'MARiA 发行出道后首张个人专辑《うたものがたり》。',
    events: [
      { id: '2021-1', date: '03-22', cat: 'life', title: '环球音乐合约终止 · 转籍波丽佳音', body: 'GARNiDELiA 组合与二人 SOLO 活动一同移籍 Pony Canyon（波丽佳音）。', tags: ['波丽佳音'] },
      { id: '2021-2', date: '05-26', cat: 'music', sub: 'album', title: 'MARiA 个人首张专辑《うたものがたり》', body: '出道以来首张个人名义专辑，收录 10 首情歌，词曲提供阵容含 山下穂尊、橋口洋平、じん、草野華余子、TAKUYA、山崎将义 等。', tags: ['うたものがたり', 'SOLO'] },
      { id: '2021-3', date: '09-17', cat: 'music', sub: 'single', title: '数字单曲《春がきたよ》', body: '日剧《反正你也逃不掉》片头曲。', tags: ['日剧'] },
      { id: '2021-4', date: '11-17', cat: 'music', sub: 'album', title: '第五张原创专辑《Duality Code》', body: '收录《オトメの心得》（动画《大正处女御伽话》OP）等曲。', tags: ['Duality Code'] }
    ]
  },
  {
    year: 2022,
    title: '结婚 · 进入新阶段',
    summary: '与摇滚乐手 ぽにきんぐだむ 结婚。',
    events: [
      { id: '2022-1', date: '03-04', cat: 'music', sub: 'single', title: '数字单曲《オトメの心得》', body: '动画《大正处女御伽话》片头曲。', tags: ['动画歌'] },
      { id: '2022-2', date: '06-22', cat: 'music', sub: 'album', title: 'MARiA 第二张个人专辑《Moments》', body: '继《うたものがたり》后的第二张个人名义专辑。', tags: ['Moments', 'SOLO'] },
      { id: '2022-3', date: '09 月', cat: 'music', sub: 'single', title: '数字单曲《蒼天》', body: 'Switch 游戏主题曲。', tags: ['游戏'] },
      { id: '2022-4', date: '10-16', cat: 'music', sub: 'single', title: 'MARiA《Trust On Me -Theme of E.T.E-》', body: '手游《代号：艾塔（艾塔纪元）》主题歌，MARiA 个人名义。', tags: ['游戏', 'SOLO'] },
      { id: '2022-5', date: '11-01', cat: 'life', title: '公开与摇滚乐手「ぽにきんぐだむ」结婚', body: 'MARiA 通过 Twitter 公开与乐队「オメでたい頭でなにより」吉他手 ぽにきんぐだむ 的婚讯，受到中日歌迷广泛祝福。', tags: ['婚讯', '私生活'] }
    ]
  },
  {
    year: 2023,
    title: '乘风2023 · 现象级出圈',
    summary: '参加芒果 TV《乘风2023》，人气一度断层第一。',
    events: [
      { id: '2023-1', date: '03-22', cat: 'music', sub: 'album', title: '翻唱集《GARNiDELiA COVER COLLECTiON》', body: '收录翻唱歌曲与 LIVE 影像。', tags: ['翻唱'] },
      { id: '2023-2', date: '04 月', cat: 'variety', title: '加入芒果 TV《乘风 2023》', body: '作为节目首位日本籍参赛者亮相。凭借真挚的中文学习态度、可爱的「小美」形象与舞台爆发力，迅速成为节目的最大流量担当。', tags: ['乘风2023', '出圈'] },
      { id: '2023-3', date: '04-20', cat: 'music', sub: 'single', title: '数字单曲《ONLY》', body: '动画《献祭公主与兽王》片尾曲。', tags: ['动画歌'] },
      { id: '2023-4', date: '05—07 月', cat: 'variety', title: '节目期间人气一度断层第一 · 总决赛获第三名', body: '节目期间人气与得票数一度领跑全员，单人票数超过其余 32 位「姐姐」的总和；总决赛最终获得第三名，并由此获得大量在中国的演出机会。', tags: ['断层第一', '总决赛第三名'] },
      { id: '2023-5', date: '07-21', cat: 'variety', title: '乘风之夜 · 登上年度席位', body: '在节目「乘风之夜」与 Ella、谢娜、刘惜君、A-Lin、龚琳娜、贾静雯等共 11 人同登「乘风年度席位」。', tags: ['乘风之夜'] },
      { id: '2023-6', date: '07-26', cat: 'music', sub: 'collab', title: '与周深合唱《夏日妄想》', body: '《王者荣耀》2023 夏日主题曲。此后她持续承接中国影视、游戏主题曲，成为中日音乐交流的代表面孔之一。', tags: ['周深', '中国合作'] },
      { id: '2023-7', date: '07-29', cat: 'music', sub: 'single', title: '《MIRAI》发布 8 年后首登 MORA 榜首', body: '《乘风 2023》带来的流量令 2015 年的旧作《MIRAI》在日本 mora 平台首次登上榜首。', tags: ['MIRAI', 'mora'] },
      { id: '2023-8', date: '08-14', cat: 'live', sub: 'concert', title: '迄今最大演唱会 · 粉丝齐唱《MIRAI》', body: '全场粉丝合唱《MIRAI》献给她，「双向奔赴」成为这一年最常提及的关键词。', tags: ['演唱会'] },
      { id: '2023-9', date: '09-28', cat: 'live', sub: 'concert', title: '北京《stellacage 2023 -stella ship- Re:CoNNeCT》', body: '中国巡演开启，全年含 OP/ED 共约 25 场，分布在中国多座城市。', tags: ['中国巡演'] },
      { id: '2023-10', date: '10-02', cat: 'music', sub: 'single', title: '数字单曲《Future Wing》', body: '《原神》三周年应援曲。', tags: ['原神', '游戏'] },
      { id: '2023-11', date: '10-19', cat: 'music', sub: 'single', title: '数字单曲《暁桜》', body: '《阴阳师》七周年纪念曲。', tags: ['阴阳师', '游戏'] }
    ]
  },
  {
    year: 2024,
    title: '出道十周年',
    summary: '第六张专辑《TEN》，十周年巡演由澳门启程。',
    events: [
      { id: '2024-1', date: '01-17', cat: 'music', sub: 'album', title: '第六张原创专辑《TEN》', body: '号称耗时约两年打磨的原创专辑，收录《幻爱游戏》（动画《我家师傅没有尾巴》OP）等曲。', tags: ['TEN'] },
      { id: '2024-2', date: '08-02', cat: 'music', sub: 'single', title: '《只若初见》', body: '电视剧《四海重明》宿命曲。', tags: ['影视', '中国合作'] },
      { id: '2024-3', date: '08-11', cat: 'live', sub: 'concert', title: '出道十周年巡演首站 · 澳门', body: '「GARNiDELiA 10th anniversary stellacage tour 2024 -Link The World-」十周年巡演由澳门站开启，串联中日及海外多地。', tags: ['十周年', '巡演', '澳门'] },
      { id: '2024-4', date: '12-16', cat: 'music', sub: 'single', title: '《智子》', body: '收录于太合音乐发行的《三体》音乐专辑。', tags: ['三体', '中国合作'] },
      { id: '2024-5', date: '本年', cat: 'music', sub: 'single', title: '手游合作曲《猫の城》《スズラン》', body: '《猫之城》主题曲与《铃兰之剑》合作曲。', tags: ['游戏'] }
    ]
  },
  {
    year: 2025,
    title: '事务所纠纷 · 组合停摆',
    summary: '自传出版后，GARNiDELiA 宣布无限期停止活动。',
    events: [
      { id: '2025-1', date: '01-11', cat: 'music', sub: 'single', title: '数字单曲《罪人》', body: '动画《魔域英雄传说》片头曲。', tags: ['动画歌'] },
      { id: '2025-2', date: '02-20', cat: 'music', sub: 'single', title: '《命运之风》', body: '《晶核》一周年主题曲日语翻唱版。', tags: ['游戏', '中国合作'] },
      { id: '2025-3', date: '02-26', cat: 'music', sub: 'album', title: '全时期精选《GRND THE BEST PROGRESS》', body: '横跨全时期的精选专辑，收录《极乐净土》《桃源恋歌》《响喜乱舞》等代表作的 [PROGRESS] 重制版。', tags: ['精选集', 'PROGRESS'] },
      { id: '2025-4', date: '03-12', cat: 'life', title: 'MARiA 首部自传随笔《I am MARiA》', body: '讲述自己的成长与在中国爆红的历程，并收录宫原梦画拍摄的照片。', tags: ['I am MARiA', '自传'] },
      { id: '2025-5', date: '08-12', cat: 'music', sub: 'single', title: '《爆爆派对》', body: '《冒险岛：枫之传说》2 周年主题曲。', tags: ['游戏', '中国合作'] },
      { id: '2025-6', date: '09-02', cat: 'life', title: 'GARNiDELiA 宣布无限期停止活动', body: '官方网站突然发布无限期停止所有活动的公告，年内已确定的巡演全数取消。公告仅由 toku 一人署名，主唱 MARiA 并未参与。', tags: ['停止活动', '官网公告'] },
      { id: '2025-7', date: '09-02 · 同日', cat: 'life', title: 'MARiA 公开表态：「诶！？」', body: '在转发停止活动消息时，MARiA 仅回复一句「诶！？」表明事先并不知情，并向引起混乱的粉丝致歉。', tags: ['诶！？'] },
      { id: '2025-8', date: '09 月（随后）', cat: 'life', title: '长文公开事务所欠薪与霸凌', body: 'MARiA 发布长文，公开所属事务所 SUPER DIRECTION INC. 长期欠付演出报酬、部分工作完全未结算、并多次遭受社长言语霸凌的经历。她同时表示，今后不再以个人身份演唱 GARNiDELiA 时期的任何曲目。', tags: ['事务所纠纷', '欠薪'] },
      { id: '2025-9', date: '— 进行中 —', cat: 'life', title: '后续：解约与未来', body: '事件后续仍在发展。MARiA 解除事务所合约、开启全新阶段的活动方向是中日两地粉丝关注的焦点。', tags: ['进行中'] }
    ]
  }
]

// ===== 辅助函数 =====

// 照片归一：字符串路径 → { src }，对象（带 caption）原样返回。
// media.photos 与 year.photos 的每个元素都可为 '/x.jpg' 或 { src:'/x.jpg', caption:'描述' }。
export function normPhoto(p) { return typeof p === 'string' ? { src: p } : p }

// 分类可为单个字符串或数组（一条同时属于多个大类，如出道=经历+音乐）
export function catList(e) { return Array.isArray(e.cat) ? e.cat : [e.cat] }
// 生平场景的主分类（取第一个，决定颜色/主色）
export function primaryCat(e) { return catList(e)[0] }
// 作品场景的分类（取第一个非「经历」的大类）
export function worksCat(e) { return catList(e).find(c => c !== 'life') || catList(e)[0] }

// 重要年份（首页轮播）
export function highlightYears() {
  return years.filter(y => y.highlight && y.title)
}

// 拍平为条目列表（每条附带所属 year）
export function getAllItems() {
  const list = []
  years.forEach(y => {
    (y.events || []).forEach(e => list.push({ ...e, year: y.year }))
  })
  return list
}

// 按 id 查单条（含 year）
export function getItemById(id) {
  for (const y of years) {
    const hit = (y.events || []).find(e => e.id === id)
    if (hit) return { ...hit, year: y.year }
  }
  return null
}

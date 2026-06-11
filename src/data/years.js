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
      { id: '2012-2', date: '07-25', cat: ['music', 'dance'], sub: 'album', title: '个人首张同人专辑《aMazing MusiQue PaRK》 · 舞蹈《Girls》', body: '发布首张个人同人专辑《aMazing MusiQue PaRK》，收录《相対性モノローグ》《気まぐれケットシー》等共 10 首歌曲；为此与好友 Miume（みうめ）、仮面ライアー217（妮娜）共同创作了名为《Girls》的舞蹈。', tags: ['同人专辑', 'aMazing MusiQue PaRK', 'Girls', 'みうめ', '217'], media: { photos: [{ src: '/photos/2012/45.jpg', caption: '《aMazing MusiQue PaRK》' }, { src: '/photos/2012/46.png', caption: '《Girls》' }] } },
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
      { id: '2013-3', date: '08-12', cat: 'music', sub: 'album', title: '第二张个人同人专辑《MabLE SYNDROMe》', body: '推出第二张个人同人专辑《MabLE SYNDROMe》，收录《夜咄ディセイブ》《脳漿炸裂ガール》等共 10 首歌曲。', tags: ['同人专辑', 'MabLE SYNDROMe'], media: { photos: [{ src: '/photos/2013/48.jpg', caption: '《MabLE SYNDROMe》' }] } },
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
    title: '组合主流出道 · 一年三连单',
    summary: 'GARNiDELiA 以《ambiguous》开启组合单曲发行，一年内连发《ambiguous》《grilletto》《BLAZING》三张动画片头曲单曲，并献声じん的《daze》。',
    events: [
      { id: '2014-1', date: '03-01 / 02', cat: 'live', title: '「1st PLACE 10-11th CELEBRATION LIVE」出演', body: '随 GARNiDELiA 出演「1st PLACE 10-11th CELEBRATION LIVE」。', tags: ['LIVE', '1st PLACE', 'GARNiDELiA'] },
      { id: '2014-2', date: '03-05', cat: 'music', sub: 'single', title: 'GARNiDELiA 首张单曲《ambiguous》', body: '随 GARNiDELiA 发行组合首张单曲《ambiguous》，担任 TV 动画《KILL la KILL（斩服少女）》片头曲。', tags: ['ambiguous', 'KILL la KILL', '动画歌', '组合首张单曲'], media: { photos: [{ src: '/photos/2014/60.jpg', caption: '《ambiguous》' }, { src: '/photos/2014/63.jpg', caption: '《ambiguous》' }] } },
      { id: '2014-3', date: '06-18', cat: 'music', sub: 'collab', title: '演唱作品《daze》发行', body: '演唱作品《daze》发行。', tags: ['daze', '合作曲'] },
      { id: '2014-4', date: '07-30', cat: 'music', sub: 'single', title: 'GARNiDELiA 第二张单曲《grilletto》', body: '随 GARNiDELiA 发行组合第二张单曲《grilletto》，为 TV 动画《魔法科高校的劣等生》片头曲。', tags: ['grilletto', '魔法科高校的劣等生', '动画歌', '单曲'], media: { photos: [{ src: '/photos/2014/61.jpg', caption: '《grilletto》' }, { src: '/photos/2014/64.jpg', caption: '《grilletto》' }] } },
      { id: '2014-5', date: '10-29', cat: 'music', sub: 'single', title: 'GARNiDELiA 第三张单曲《BLAZING》', body: '随 GARNiDELiA 发行组合第三张单曲《BLAZING》，为动画《高达 G 复国运动》片头曲。', tags: ['BLAZING', '高达G复国运动', '动画歌', '单曲'], media: { photos: [{ src: '/photos/2014/62.jpg', caption: '《BLAZING》' }] } }
    ],
    photos: [
      { src: '/photos/2014/65.png', caption: '2014 ANIMAX 演唱《only my railgun》' },
      { src: '/photos/2014/66.png', caption: '2014 ANIMAX 演唱《only my railgun》' },
      { src: '/photos/2014/67.png', caption: '2014【Lamb】现场' }
    ]
  },
  {
    year: 2015,
    title: '首张原创专辑《Linkage Ring》',
    summary: '组合接连发行首张专辑、首张原创专辑《Linkage Ring》、第四张单曲《MIRAI》与首张精选辑《BiRTHiA》。',
    events: [
      { id: '2015-1', date: '01-21', cat: 'music', sub: 'album', title: 'GARNiDELiA 首张专辑', body: '随 GARNiDELiA 发行组合第一张专辑，收录《ambiguous》《grilletto》《BLAZING》。', tags: ['专辑', 'ambiguous', 'grilletto', 'BLAZING'], media: { photos: ['/photos/2015/68.jpg'] } },
      { id: '2015-2', date: '01-25', cat: 'music', sub: 'album', title: 'GARNiDELiA 首张原创专辑《Linkage Ring》', body: '随 GARNiDELiA 发布组合首张原创专辑《Linkage Ring》，收录《BLAZING》《オオカミ少女》等共 13 首歌曲。', tags: ['Linkage Ring', '原创专辑'], media: { photos: [{ src: '/photos/2015/69.jpg', caption: '《BLAZING》' }] } },
      { id: '2015-3', date: '05-13', cat: 'music', sub: 'single', title: 'GARNiDELiA 第四张单曲《MIRAI》', body: '随 GARNiDELiA 发行组合第四张单曲《MIRAI》，为《双枪激斗（ガンスリンガー ストラトス）》片尾曲。', tags: ['MIRAI', '双枪激斗', '动画歌', '单曲'], media: { photos: [{ src: '/photos/2015/70.jpg', caption: '《MIRAI》' }] } },
      { id: '2015-4', date: '08-26', cat: 'music', sub: 'album', title: 'GARNiDELiA 首张精选辑《BiRTHiA》', body: '随 GARNiDELiA 发布组合首张精选辑《BiRTHiA》。', tags: ['精选辑', 'BiRTHiA'], media: { photos: [{ src: '/photos/2015/71.jpg', caption: '《BiRTHiA》' }] } }
    ]
  },
  {
    year: 2016,
    title: '《极乐净土》中国出圈',
    summary: '投稿舞蹈《极乐净土》在 B 站爆红出圈，连发《约束 -Promise code-》《clever》等单曲、加入乐队 GOUACHE，并发行第二张原创专辑《Violet Cry》。',
    events: [
      { id: '2016-1', date: '01-30', cat: 'live', sub: 'concert', title: '台湾「GARNiDELiA & 八王子P LIVE 2016 in TAIPEI」', body: '到台湾参与「GARNiDELiA & 八王子P LIVE 2016 in TAIPEI」，在「ATT SHOW BOX 立方文创」举办。', tags: ['台湾', '八王子P', 'LIVE'] },
      { id: '2016-2', date: '03-11', cat: 'music', sub: 'single', title: '游戏主题曲《Burning Soul》', body: '为 PC 游戏《灵魂行者（ソウルワーカー）》创作主题曲《Burning Soul》。', tags: ['Burning Soul', '游戏', '主题曲'], media: { photos: [{ src: '/photos/2016/72.jpg', caption: '《Burning Soul》' }] } },
      { id: '2016-3', date: '04-25', cat: 'dance', title: '投稿舞蹈作品《极乐净土》', body: '投稿舞蹈作品《极乐净土》，B 站搬运视频点击破 600 万，中国国内有大量舞蹈翻跳和 MMD 视频，她也因此在 B 站受到更多关注。', tags: ['极乐净土', '舞见', '出圈', 'B站'], media: { photos: [{ src: '/photos/2016/73.png', caption: '《极乐净土》' }] } },
      { id: '2016-4', date: '08-17', cat: 'music', sub: 'single', title: 'GARNiDELiA 第五张单曲《约束 -Promise code-》', body: '随 GARNiDELiA 发行组合第五张单曲《约束 -Promise code-》。', tags: ['约束', 'Promise code', '单曲'], media: { photos: [{ src: '/photos/2016/74.jpg', caption: '《约束 -Promise code-》' }] } },
      { id: '2016-5', date: '09-14', cat: 'music', sub: 'collab', title: '与 ClariS 合作第六张单曲《clever》', body: '随 GARNiDELiA 与 ClariS 合作发行第六张单曲《clever》。', tags: ['clever', 'ClariS', '合作'], media: { photos: [{ src: '/photos/2016/75.jpg', caption: '《clever》' }] } },
      { id: '2016-6', date: '11-03', cat: ['live', 'life'], sub: 'festival', title: 'Niconico 2016 超 Party 演唱 · 加入乐队 GOUACHE', body: '在 Niconico 2016 超 Party 参与演唱《吉原哀歌》；之后，宣布以主唱身份加入由 Jin 组建的乐队 GOUACHE。', tags: ['超Party', 'GOUACHE', '吉原哀歌'], media: { photos: [{ src: '/photos/2016/90.png', caption: '演唱现场' }] } },
      { id: '2016-7', date: '11-04', cat: 'music', sub: 'single', title: 'GOUACHE 首张单曲《RED》', body: '随 GOUACHE 发行首张单曲《RED》，该曲亦是剧场版《阳炎 Daze》的主题曲。', tags: ['RED', 'GOUACHE', '阳炎Daze'], media: { photos: [{ src: '/photos/2016/76.jpg', caption: '《RED》' }] } },
      { id: '2016-8', date: '12-03', cat: 'live', sub: 'festival', title: '台湾「LisAni! LIVE TAIWAN」', body: '随 GARNiDELiA 到台湾参与「LisAni! LIVE TAIWAN Supported by 战斗女子学园」，在「台北国际会议中心」举办。', tags: ['LisAni', '台湾'] },
      { id: '2016-9', date: '12-14', cat: 'music', sub: 'album', title: 'GARNiDELiA 第二张原创专辑《Violet Cry》', body: '随 GARNiDELiA 发布第二张原创专辑《Violet Cry》，收录《极乐净土》《约束 -Promise code-》等共 13 首歌曲。', tags: ['Violet Cry', '原创专辑'], media: { photos: [{ src: '/photos/2016/77.jpg', caption: '《Violet Cry》' }] } }
    ],
    photos: [
      { src: '/photos/2016/79.jpg', caption: 'GARNiDELiA 在美国旧金山 J-POP SUMMIT 表演及采访' },
      { src: '/photos/2016/86.png', caption: 'GARNiDELiA 在美国旧金山 J-POP SUMMIT 表演及采访' },
      { src: '/photos/2016/87.jpg', caption: 'GARNiDELiA 在美国旧金山 J-POP SUMMIT 表演及采访' },
      { src: '/photos/2016/88.jpg', caption: 'GARNiDELiA 在美国旧金山 J-POP SUMMIT 表演及采访' },
      { src: '/photos/2016/89.jpg', caption: 'GARNiDELiA 在美国旧金山 J-POP SUMMIT 表演及采访' },
      '/photos/2016/80.jpg',
      '/photos/2016/81.jpg',
      '/photos/2016/82.jpg',
      '/photos/2016/83.jpg',
      '/photos/2016/84.jpg',
      '/photos/2016/85.jpg'
    ]
  },
  {
    year: 2017,
    title: '移籍 SACRA MUSIC · 首登中国专场',
    summary: '由 SME Records 移籍至索尼动漫向新厂牌 SACRA MUSIC；在上海举办中国首次 Live 见面会与演唱会，连发《SPEED STAR》《Désir》《Aikotoba》三张动画单曲，并赴台北举办亚洲巡演专场。',
    events: [
      { id: '2017-1', date: '04 月', cat: 'life', title: '移籍 SACRA MUSIC', body: '由原先 SME Records 移转至同为索尼旗下、为动漫歌手开设的新品牌 SACRA MUSIC。', tags: ['SACRA MUSIC', '厂牌', '移籍'] },
      { id: '2017-2', date: '05-20', cat: 'live', sub: 'concert', title: '上海·中国首次 Live 见面会与演唱会', body: '随 GARNiDELiA 在上海市举办了中国第一次 Live 见面会和演唱会。', tags: ['上海', '中国', '见面会'] },
      { id: '2017-3', date: '06-14', cat: 'music', sub: 'single', title: 'GARNiDELiA 第六张单曲《SPEED STAR》', body: '随 GARNiDELiA 发行组合第六张单曲《SPEED STAR》，为剧场版《魔法科高中的劣等生 呼唤繁星的少女》主题曲。', tags: ['SPEED STAR', '魔法科高中', '动画歌', '单曲'], media: { photos: [{ src: '/photos/2017/96.jpg', caption: '《SPEED STAR》' }] } },
      { id: '2017-4', date: '07-23', cat: 'live', sub: 'festival', title: '上海 Bilibili Macro Link（BML）', body: '参加上海 Bilibili Macro Link（BML）。', tags: ['BML', 'bilibili', '上海'], media: { photos: ['/photos/2017/91.jpg', '/photos/2017/92.jpg'] } },
      { id: '2017-5', date: '08-23', cat: 'music', sub: 'single', title: 'GARNiDELiA 第七张单曲《Désir》', body: '随 GARNiDELiA 发行组合第七张单曲《Désir》，为《Fate/Apocrypha》片尾曲。', tags: ['Désir', 'Fate/Apocrypha', '动画歌', '单曲'], media: { photos: [{ src: '/photos/2017/97.jpg', caption: '《Désir》' }] } },
      { id: '2017-6', date: '10-14', cat: 'live', sub: 'concert', title: '台湾「GARNiDELiA stellacage Asia Tour 2017 in Taipei」', body: '到台湾举办个人团体演唱会「-GARNiDELiA stellacage Asia Tour 2017 in Taipei-」，在「花漾 HANA 展演空间」举办。', tags: ['台湾', 'stellacage', 'Asia Tour'], media: { photos: ['/photos/2017/93.jpg', '/photos/2017/94.png', '/photos/2017/95.png'] } },
      { id: '2017-7', date: '11-01', cat: 'music', sub: 'single', title: 'GARNiDELiA 第八张单曲《Aikotoba》', body: '随 GARNiDELiA 发行组合第八张单曲《Aikotoba》，为动画《同好会》片头曲。', tags: ['Aikotoba', '同好会', '动画歌', '单曲'], media: { photos: [{ src: '/photos/2017/98.jpg', caption: '《Aikotoba》' }, { src: '/photos/2017/99.jpg', caption: '《Aikotoba》' }] } }
    ]
  },
  {
    year: 2018,
    title: '《G.R.N.D.》· 精选辑《响喜乱舞》',
    summary: '随 GARNiDELiA 发行第九张单曲《Error》、第三张原创专辑《G.R.N.D.》与汇集舞见作品的第二张精选辑《响喜乱舞》，并赴广州、新加坡等地参演。',
    events: [
      { id: '2018-1', date: '01-31', cat: 'music', sub: 'single', title: 'GARNiDELiA 第九张单曲《Error》', body: '随 GARNiDELiA 发行组合第九张单曲《Error》，为 TV 动画《BEATLESS（没有心跳的少女）》片头曲。', tags: ['Error', 'BEATLESS', '动画歌', '单曲'], media: { photos: [{ src: '/photos/2018/102.jpg', caption: '《Error》' }, { src: '/photos/2018/103.jpg', caption: '《Error》' }] } },
      { id: '2018-2', date: '03-28', cat: 'music', sub: 'album', title: 'GARNiDELiA 第三张原创专辑《G.R.N.D.》', body: '随 GARNiDELiA 发布第三张原创专辑《G.R.N.D.》。', tags: ['G.R.N.D.', '原创专辑'], media: { photos: [{ src: '/photos/2018/104.jpg', caption: '《G.R.N.D.》' }] } },
      { id: '2018-3', date: '04-21', cat: 'live', sub: 'festival', title: 'ANIMAX MUSIX 2018（广州）', body: '参加 ANIMAX MUSIX 2018（广州）。', tags: ['ANIMAX MUSIX', '广州', '中国'] },
      { id: '2018-4', date: '07-22', cat: 'live', sub: 'festival', title: '上海「BILIBILI MACRO LINK 2018」', body: '参加「BILIBILI MACRO LINK 2018」。', tags: ['BML', 'bilibili'] },
      { id: '2018-5', date: '09-26', cat: 'music', sub: 'album', title: 'GARNiDELiA 第二张精选辑《响喜乱舞》', body: '随 GARNiDELiA 发布组合第二张精选辑《响喜乱舞》，收录《极乐净土》《桃源恋歌》等共 10 首歌曲，分别对应 8 个舞见作品和 2 个合作舞见作品。', tags: ['响喜乱舞', '精选辑', '舞见'], media: { photos: [{ src: '/photos/2018/105.jpg', caption: '《响喜乱舞》' }] } },
      { id: '2018-6', date: '12-04', cat: 'live', sub: 'festival', title: '新加坡 RED CARPET C3AFASG 2018', body: '随 GARNiDELiA 参加新加坡 RED CARPET C3AFASG 2018。', tags: ['新加坡', 'C3AFA'], media: { photos: ['/photos/2018/100.jpg', '/photos/2018/101.jpg'] } }
    ],
    photos: [
      '/photos/2018/106.jpg',
      '/photos/2018/107.jpg',
      '/photos/2018/108.jpg',
      '/photos/2018/109.jpg',
      '/photos/2018/110.jpg',
      '/photos/2018/111.jpg',
      '/photos/2018/112.jpg',
      '/photos/2018/113.jpg',
      '/photos/2018/114.jpg'
    ]
  },
  {
    year: 2019,
    title: '《REBEL FLAG》· 约满离开 SACRA MUSIC',
    summary: '随 GARNiDELiA 发行第十张单曲《REBEL FLAG》，赴台举办「响喜乱舞」亚洲巡演专场；8 月与 SACRA MUSIC 契约期满解约，年底发行第三张精选辑《GARNiDELiA BEST》。',
    events: [
      { id: '2019-1', date: '03-13', cat: 'music', sub: 'single', title: 'GARNiDELiA 第十张单曲《REBEL FLAG》', body: '随 GARNiDELiA 发行组合第十张单曲《REBEL FLAG》，为《魔法少女特殊战明日香》片尾曲。', tags: ['REBEL FLAG', '魔法少女特殊战明日香', '动画歌', '单曲'], media: { photos: [{ src: '/photos/2019/115.jpg', caption: '《REBEL FLAG》' }, { src: '/photos/2019/116.jpg', caption: '《REBEL FLAG》' }] } },
      { id: '2019-2', date: '06-01', cat: 'live', sub: 'concert', title: '台湾「stellacage Asia Tour 2019 "响喜乱舞" in Taipei」', body: '亚巡到台湾举办个人团体演唱会「stellacage Asia Tour 2019 "响喜乱舞" in Taipei」，在「永丰 Legacy Taipei 音乐展演空间」举办。', tags: ['台湾', 'stellacage', '响喜乱舞'] },
      { id: '2019-3', date: '07-20', cat: 'live', sub: 'festival', title: '上海「BILIBILI MACRO LINK 2019」', body: '参加「BILIBILI MACRO LINK 2019」（上海·梅赛德斯-奔驰文化中心）。', tags: ['BML', 'bilibili', '上海'] },
      { id: '2019-4', date: '08-31', cat: 'life', title: '契约期满·解除与 SACRA MUSIC 合作关系', body: '契约已满，解除与 SACRA MUSIC 的合作关系。', tags: ['SACRA MUSIC', '厂牌', '解约'] },
      { id: '2019-5', date: '12-04', cat: 'music', sub: 'album', title: 'GARNiDELiA 第三张精选辑《GARNiDELiA BEST》', body: '随 GARNiDELiA 发布组合第三张精选辑《GARNiDELiA BEST》。', tags: ['GARNiDELiA BEST', '精选辑'], media: { photos: [{ src: '/photos/2019/117.jpg', caption: '《GARNiDELiA BEST》' }] } }
    ],
    photos: [
      { src: '/photos/2019/118.jpg', caption: '万圣节 PARTY 2019' },
      { src: '/photos/2019/119.jpg', caption: '万圣节 PARTY 2019' },
      { src: '/photos/2019/120.jpg', caption: '万圣节 PARTY 2019' },
      { src: '/photos/2019/121.jpg', caption: 'stellacage Asia Tour 2019「響喜乱舞」' },
      { src: '/photos/2019/122.jpg', caption: 'stellacage Asia Tour 2019「響喜乱舞」' },
      { src: '/photos/2019/123.jpg', caption: 'SACRA MUSIC 2019 现场' },
      { src: '/photos/2019/124.jpg', caption: 'SACRA MUSIC 2019 现场' }
    ]
  },
  {
    year: 2020,
    title: '原创专辑《起死回生》',
    summary: '签约环球音乐集团后，随 GARNiDELiA 发行第四张原创专辑《起死回生》，并参加 HALLOWEEN MiRACLE WONDER PARTY 2020。',
    events: [
      { id: '2020-1', date: '10-30~31', cat: 'live', sub: 'festival', title: 'HALLOWEEN MiRACLE WONDER PARTY 2020', body: '参加 Presents HALLOWEEN MiRACLE WONDER PARTY 2020。', tags: ['万圣节', 'PARTY'], media: { photos: ['/photos/2020/127.jpg', '/photos/2020/128.jpg', '/photos/2020/129.jpg', '/photos/2020/130.jpg', '/photos/2020/131.jpg', '/photos/2020/132.jpg', '/photos/2020/133.jpg'] } },
      { id: '2020-2', date: '11-25', cat: 'music', sub: 'album', title: 'GARNiDELiA 第四张原创专辑《起死回生》', body: '随 GARNiDELiA 发布第四张原创专辑《起死回生》，是签约「环球音乐集团」后发行的第一张唱片，收录《宵闇胡蝶》《怪物の夢》等共 11 首歌曲。', tags: ['起死回生', '原创专辑', '环球音乐'], media: { photos: [{ src: '/photos/2020/125.jpg', caption: '《起死回生》' }, { src: '/photos/2020/126.jpg', caption: '《起死回生》' }] } }
    ]
  },
  {
    year: 2021,
    title: '移籍 PONY CANYON · 个人专辑《うたものがたり》',
    summary: '3 月宣布 MARiA／toku／GARNiDELiA 移籍「PONY CANYON」（波丽佳音）；5 月发行个人专辑《うたものがたり》；9 月随 GARNiDELiA 发行数字单曲《春がきたよ》；11 月发行第五张原创专辑《Duality Code》。',
    events: [
      { id: '2021-1', date: '03-21', cat: 'life', title: '宣布个人专辑《うたものがたり》· 移籍 PONY CANYON', body: '宣布将推出个人专辑《うたものがたり》，同时 MARiA／toku／GARNiDELiA 都将移籍至「PONY CANYON」。', tags: ['移籍', 'PONY CANYON', 'うたものがたり'] },
      { id: '2021-2', date: '05-26', cat: 'music', sub: 'album', title: '第 3 张个人音乐专辑《うたものがたり》', body: '发行第 3 张个人音乐专辑《うたものがたり》，收录了包括《憐哀感情》《ガラスの鐘》等在内的 10 首歌曲。', tags: ['うたものがたり', '个人专辑'], media: { photos: [{ src: '/photos/2021/134.jpg', caption: '《うたものがたり》' }] } },
      { id: '2021-3', date: '09-17', cat: 'music', sub: 'single', title: 'GARNiDELiA 数字单曲《春がきたよ》', body: '随 GARNiDELiA 发行数字单曲《春がきたよ》，为日本电视剧《反正你也逃不掉》的片头曲。', tags: ['春がきたよ', '反正你也逃不掉', '日剧', '单曲'], media: { photos: [{ src: '/photos/2021/135.jpg', caption: '《春がきたよ》' }] } },
      { id: '2021-4', date: '11-17', cat: 'music', sub: 'album', title: 'GARNiDELiA 第五张原创专辑《Duality Code》', body: '随 GARNiDELiA 发布第五张原创专辑《Duality Code》，收录曲《オトメの心得》为动画《大正处女御伽话》片头曲，「きゃにめ限定盘」收录 Live 演唱会。', tags: ['Duality Code', '原创专辑', '大正处女御伽话'], media: { photos: [{ src: '/photos/2021/136.jpg', caption: '《Duality Code》' }, { src: '/photos/2021/137.jpg', caption: '《大正处女御伽话》' }] } }
    ],
    photos: [
      { src: '/photos/2021/138.jpg', caption: 'GARNiDELiA stellacage 2021 steps&claps DAYS2' },
      { src: '/photos/2021/139.jpg', caption: 'GARNiDELiA stellacage 2021 steps&claps DAYS2' },
      { src: '/photos/2021/140.jpg', caption: 'GARNiDELiA stellacage 2021 steps&claps DAYS2' },
      { src: '/photos/2021/141.jpg', caption: 'GARNiDELiA stellacage 2021 steps&claps DAYS2' },
      { src: '/photos/2021/142.jpg', caption: 'GARNiDELiA stellacage 2021 steps&claps DAYS2' },
      { src: '/photos/2021/143.jpg', caption: 'GARNiDELiA stellacage 2021 steps&claps DAYS2' },
      { src: '/photos/2021/144.jpg', caption: 'GARNiDELiA stellacage 2021 steps&claps DAYS2' },
      { src: '/photos/2021/145.jpg', caption: 'GARNiDELiA stellacage 2021 steps&claps DAYS2' },
      { src: '/photos/2021/146.jpg', caption: 'GARNiDELiA stellacage 2021 steps&claps DAYS2' },
      '/photos/2021/147.jpg'
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

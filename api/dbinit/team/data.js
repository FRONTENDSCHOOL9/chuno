import moment from 'moment';

function getDay(day = 0) {
  return moment().add(day, 'days').format('YYYY.MM.DD');
}
function getTime(day = 0, second = 0) {
  return moment()
    .add(day, 'days')
    .add(second, 'seconds')
    .format('YYYY.MM.DD HH:mm:ss');
}

export const initData = async nextSeq => {
  return {
    // 회원
    user: [
      {
        _id: await nextSeq('user'),
        email: 'dragon@test.com',
        password:
          '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '관리자 용용',
        type: 'seller',
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
      },
    ],
    // 상품
    product: [
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 0,
        show: true,
        active: true,
        name: '[playlist] 우울할 땐 울면...',
        quantity: 99999,
        mainImages: ['sad.jpg'],
        content: `테스트용 플레이리스트입니다. 유저는 해당 공간에 이 플레이리스트의 설명이나 추억을 적게 됩니다.`,
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          music: [
            { id: 'Vq-mGphIR9g', title: 'Happy to Die' },
            { id: 'loJAU3J_pdQ', title: '시든 꽃 (flower-ed)' },
            { id: 'P4z1O3miesI', title: 'listen before i go' },
            { id: 'Xp4tEiHE5ak', title: 'What We Had' },
            { id: 'YSQTiqmFZdU', title: 'You Said Youd Grow Old With Me' },
            { id: 'olGSAVOkkTI', title: 'Harry Styles - Falling' },
            { id: 'RxiTWxP9Xf4', title: 'wave to earth - homesick' },
            { id: 'SJtB46INrAk', title: 'clide - broken parts' },
          ],
          keyword: ['이별', '우울'],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 0,
        show: true,
        active: true,
        name: '🔥빡세게 운동 가즈아아!🔥',
        quantity: 99999,
        content: `유저가 썸네일을 설정하지 않았을 경우, 해당 썸네일으로 자동 설정됩니다.`,
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          music: [
            { id: 'AO2hvlrCBwA', title: 'VANNER(배너) - 폼(FORM)' },
            { id: '0pwBFTUJBzQ', title: '온앤오프 (ONF)_Beautiful Beautiful' },
            { id: 'F9CrRG6j2SM', title: 'SEVENTEEN(세븐틴) - HIT' },
            { id: 'cPwzLzy97L8', title: 'Stray Kids "Back Door"' },
            { id: 'BQ7vyR7SEso', title: '블락비 (Block B) - 난리나' },
            { id: 'zndvqTc4P9I', title: 'ITZY(있지) "ICY"' },
            { id: 'YGXiVHTy0JE', title: '부석순(SEVENTEEN) - 거침없이(Just do it)' },
            { id: '2gmFazEazfY', title: 'ZONE' },
            { id: 'uscarNXlesc', title: 'Fallin (폭우)' },
            { id: '_v2J_stvHes', title: 'Volbeat - Seal The Deal' },
          ],
          keyword: ['운동', '집중', '분노'],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 0,
        show: true,
        active: true,
        name: 'ZONE나 달달한 노래 모음🩷',
        quantity: 99999,
        mainImages: ['cp.jpg'],
        content: `테스트용 플레이리스트입니다. 유저는 해당 공간에 이 플레이리스트의 설명이나 추억을 적게 됩니다.`,
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          music: [
            { id: 'aShjZO9sue0', title: '이무진 - 잠깐 시간 될까(Ordinary Confession)' },
            { id: 'xwesXZPRadg', title: 'My Ultimate First Love (부동의 첫사랑)' },
            { id: 'hLZiUVGbO-E', title: 'CHEEZE(치즈) - 이렇게 좋아해 본 적이 없어요' },
            { id: 'd2ytH5mymWY', title: '산들 - 취기를 빌려' },
            { id: '7Zi26EWmUEw', title: 'On The Rocks (Feat. h3hyeon, BE′O)' },
            { id: 'zIfKmOqLkkU', title: '7942 (Friend Zone) (Feat. VVON, Skinny Brown)' },
            { id: 'ErByM91VC2M', title: 'BEBE' },
            { id: '6d-ygS1tKuU', title: 'Jasmine' },
            { id: 'oCSOBGleDLM', title: 'I Do Love U (널하다)' },
            { id: '3qtrJHLjfEI', title: 'LUCY _ Unbelievable(아니 근데 진짜)' },
            { id: 'Kt2T0G76cAs', title: 'Good Day (My love X LEESEOKHOON)' },
          ],
          keyword: ['행복', '사랑'],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 0,
        show: true,
        active: true,
        name: '🧑‍💻코딩할 때 듣는 가사 없는 노래🧑‍💻',
        quantity: 99999,
        mainImages: ['coding.jpg'],
        content: `테스트용 플레이리스트입니다. 유저는 해당 공간에 이 플레이리스트의 설명이나 추억을 적게 됩니다.`,
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          music: [
            { id: 'lV9DePcyEpU', title: 'L′autre Valse D′amélie' },
            { id: 'ZejidNt1kvQ', title: 'April In Winter' },
            { id: 'Gjtfj5DLNfs', title: 'Paniyolo - カラー' },
            { id: 'ca8_OCai5Mw', title: 'Bloom' },
            { id: 'NWOHfwNVFrY', title: 'Breathing in May' },
            { id: 'Z4RzNNgaKTE', title: 'Waltz of the Wind' },
            { id: 'c0T9iQlcs3U', title: 'Saryuni Forest' },
            { id: 'BrVLF9Ozlco', title: 'Interlude for Piano' },
            { id: 'hBJqyYUwRxQ', title: '사랑하는 이들에게' },
            { id: 'dg3fZwnu6xI', title: 'Missed The Last Dance With You' },
            { id: 'yP-wyfyxSdE', title: 'Wallflower' },
            { id: 'DKZLtwqqHPs', title: 'Thank God It′s Friday' },
          ],
          keyword: ['우울', '집중'],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 0,
        show: true,
        active: true,
        name: '추억보정 청춘 밴드 노래 모음🫧 이게 청춘이야~',
        quantity: 99999,
        mainImages: ['blue.jpg'],
        content: `테스트용 플레이리스트입니다. 유저는 해당 공간에 이 플레이리스트의 설명이나 추억을 적게 됩니다.`,
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          music: [
            { id: 'wfCcs0vLysk', title: 'Mrs. GREEN APPLE - インフェルノ(Inferno)' },
            { id: 'sQGYqRHSflk', title: 'Peppertones(페퍼톤스) - YOUTH (청춘 (For 영화 족구왕))' },
            { id: '2-P-NIiLiQc', title: 'LUCY - 개화(Flowering)' },
            { id: 'S-yABpcMaQs', title: '나상현씨밴드 (Band Nah) - 찬란 (Shine)' },
            { id: 'U6dTSMCqlp4', title: 'Peppertones(페퍼톤스) - Good Luck to You(행운을 빌어요)' },
            { id: 'vnS_jn2uibs', title: 'DAY6(데이식스) "한 페이지가 될 수 있게"' },
            { id: 'fg8xDzOWllQ', title: 'Imagination' },
            { id: 'gqsMJ1wezOY', title: 'SPYAIR - Some Like It Hot!!' },
          ],
          keyword: ['행복', '사랑'],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 0,
        show: true,
        active: true,
        name: '신나는 샤워 팝송 30분🛁',
        quantity: 99999,
        content: `유저가 썸네일을 설정하지 않았을 경우, 해당 썸네일으로 자동 설정됩니다.`,
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          music: [
            { id: 'wdcy-U01l3Q', title: 'John K - parachute' },
            { id: 'gIMlT5tCAww', title: 'Reiley - Let It Ring' },
            { id: 'U6dag1Yzv6U', title: 'Honeypie' },
            { id: 'D1v3_8xVha8', title: 'Clay and Friends - Going Up The Coast' },
            { id: 'g5WaJyEPP5g', title: 'MAX - Checklist (feat. Chromeo)' },
            { id: 'JaIMSzE5yLA', title: '실리카겔 (Silica Gel) - NO PAIN' },
            { id: 'jNDY_BxpdYo', title: 'Johnny Stimson - Gimme Gimme' },
            { id: '7-x3uD5z1bQ', title: 'Harry Styles - Watermelon Sugar' },
            { id: '7pzCcMhhIjg', title: 'Claire Rosinkranz - "Hotel"' },
            { id: '3iycK4F8iv4', title: 'New Hippie Generation' },
          ],
          keyword: ['행복', '집중', '사랑'],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 0,
        show: true,
        active: true,
        name: '🏢진심 회사 관두고 싶다',
        quantity: 99999,
        mainImages: ['sad.jpg'],
        content: `유저가 썸네일을 설정하지 않았을 경우, 해당 썸네일으로 자동 설정됩니다.`,
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          music: [
            { id: 'xn0-IZZ6YO4', title: 'abcdefu' },
            { id: '3K0RzZGpyds', title: 'Taylor Swift - Look What You Made Me Do' },
            { id: 'ru0K8uYEZWw', title: 'CAN′T STOP THE FEELING!' },
            { id: '0OWj0CiM8WU', title: 'OneRepublic - Love Runs Out' },
            { id: 'TM-NfwUJEkw', title: 'UPSAHL - Thriving' },
            { id: 'IPXIgEAGe4U', title: 'Panic! At The Disco - High Hopes' },
            { id: 'W8md8E5bOmg', title: 'Anne-Marie - x2' },
            { id: 'fhKjGiktZSc', title: 'Avril Lavigne - F.U.' },
          ],
          keyword: ['우울', '분노'],
        },
      },
    ],
    // 주문
    order: [],
    // 후기
    reply: [],
    // 장바구니
    cart: [],
    // 즐겨찾기/북마크
    bookmark: [],
    // QnA, 공지사항, 게시판
    post: [],
    // 코드
    code: [],
    // 설정
    config: [],
  };
};

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

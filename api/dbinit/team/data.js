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
        name: '용용이',
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
          keyword: ['이별', '우울', '사랑'],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 0,
        show: true,
        active: true,
        name: '빡세게 운동 가보자고...',
        quantity: 99999,
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
          keyword: ['이별', '우울', '사랑'],
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

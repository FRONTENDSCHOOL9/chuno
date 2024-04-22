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
        name: 'test데이터용',
        quantity: 99999,
        mainImages: [
          {
            path: `/files/09-chuno/yongyong.png`,
            name: 'yongyong.png',
            originalname: '플레이리스트 썸네일.png',
          },
        ],
        content: `플레이리스트 설명이 담기는 공간입니다. 테스트용 데이터입니다.`,
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          music: [
            { id: 'Vq-mGphIR9g', title: 'Happy to Die (Happy to Die)' },
            { id: 'yY13X0BKaUw', title: 'MONSTA X 몬스타엑스 &#39;GAMBLER&' },
            {
              id: 'wH3JmLBOnMU',
              title: 'Ashes - Stellar (Official Lyric Video)',
            },
          ],
          keyword: ['우울', '사랑', '집중'],
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

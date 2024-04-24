import { useNavigate } from 'react-router-dom';
import { memberState } from '@recoil/user/atoms.mjs';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Button from '@components/Button';
import styles from './header.module.css';
function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const [user, setUser] = useRecoilState(memberState);
  //NOTE - user 이미지 등록 관련 코드입니다. user가 로그인되어있다면 user의 profile를 불러옵니다.
  //NOTE - 만약 유저가 등록한 이미지가 있다면 그 이미지를 연결하고, 없다면 서버에 저장되어있는 기본 이미지를 보여줍니다.
  let profileImage = user?.profile;
  if (profileImage && !profileImage.startsWith('http')) {
    profileImage = `${import.meta.env.VITE_API_SERVER}/files/${
      import.meta.env.VITE_CLIENT_ID
    }/${profileImage}`;
  } else if (!profileImage) {
    profileImage = `${import.meta.env.VITE_API_SERVER}/files/${
      import.meta.env.VITE_CLIENT_ID
    }/yongyong.png`;
  }

  return (
    <header className={styles.header}>
      <nav className={styles.navWrap}>
        <div className={styles.mainHeaderLeft}>
          <Link to="/main" className={styles.mainHeaderLogo}>
            <svg
              className={styles.mainlogo}
              width="50"
              height="50"
              viewBox="0 0 89 89"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.125 44.7114C11.125 46.1409 12.3877 47.2812 13.9062 47.2812C15.4248 47.2812 16.6597 46.1159 16.6875 44.7114V38.7261C16.6875 37.2966 15.4248 36.1562 13.9062 36.1562C12.3571 36.1562 11.125 37.3216 11.125 38.7261V44.7114ZM38.9375 38.9375C38.9375 38.1999 39.2305 37.4924 39.7521 36.9709C40.2737 36.4493 40.9811 36.1562 41.7188 36.1562C42.4564 36.1562 43.1638 36.4493 43.6854 36.9709C44.207 37.4924 44.5 38.1999 44.5 38.9375V44.5C44.5 45.2376 44.207 45.9451 43.6854 46.4666C43.1638 46.9882 42.4564 47.2812 41.7188 47.2812C40.9811 47.2812 40.2737 46.9882 39.7521 46.4666C39.2305 45.9451 38.9375 45.2376 38.9375 44.5V38.9375Z"
                fill="#619AE0"
              />
              <path
                d="M23.2234 6.50813C23.3219 6.16802 23.4865 5.85065 23.7077 5.57417C23.9289 5.29768 24.2024 5.0675 24.5126 4.89677C24.8228 4.72604 25.1636 4.61811 25.5156 4.57915C25.8675 4.54019 26.2237 4.57097 26.5637 4.66972C29.192 5.43178 31.214 6.675 32.4933 8.38547C33.0932 9.17274 33.5216 10.0769 33.7511 11.0396C33.9805 12.0024 34.0059 13.0026 33.8256 13.9758C33.2026 17.3856 30.107 20.47 26.3357 20.47C23.788 20.47 21.5714 19.4632 20.0222 18.7595C19.6801 18.6066 19.3714 18.4647 19.0988 18.3535C17.5191 17.7082 16.1285 17.38 13.9341 18.2422C12.0011 18.9987 11.1194 20.9345 11.3558 24.2386C11.4448 25.4568 11.684 26.6861 11.9955 27.8264C12.1652 27.8181 12.3404 27.8125 12.5156 27.8125H14.4542C15.5529 27.8123 16.6272 28.1374 17.5413 28.747L20.3115 30.5938H27.1533C27.6702 30.594 28.1769 30.4502 28.6166 30.1785C29.0562 29.9069 29.4115 29.5181 29.6426 29.0557L36.3037 15.7363C36.9967 14.3507 38.0619 13.1854 39.3798 12.3709C40.6978 11.5565 42.2165 11.1251 43.7658 11.125H48.6719C49.9632 11.125 51.2289 11.4846 52.3273 12.1634C53.4258 12.8423 54.3135 13.8136 54.8909 14.9686C55.4684 16.1236 55.7129 17.4165 55.5969 18.7026C55.4809 19.9886 55.0091 21.217 54.2344 22.25H56.5845L59.6578 14.8519C61.2988 10.9025 65.034 8.34375 69.1391 8.34375H82.1665C82.7505 8.34375 83.1733 8.98344 82.9341 9.53969L82.3 11.125C80.9761 14.4903 77.85 16.6875 74.3818 16.6875H69.1363C68.7644 16.6968 68.4028 16.8115 68.0936 17.0183C67.7844 17.2251 67.5403 17.5155 67.3897 17.8556L65.4984 22.25H75.7056C76.5508 22.2501 77.3849 22.4429 78.1445 22.8136C78.9041 23.1843 79.5692 23.7233 80.0894 24.3895C80.6095 25.0558 80.971 25.8318 81.1463 26.6586C81.3216 27.4855 81.3062 28.3414 81.1012 29.1614L80.7619 30.5103C80.4894 31.6033 80.0611 32.6241 79.502 33.5474H82.5253C84.1384 33.5474 84.9588 35.066 84.9588 36.6791V40.3281C84.9588 46.75 80.0444 52.0233 72.7213 52.7575H81.5657C83.596 52.7575 85.2648 53.8979 85.2648 55.9282V66.0853C85.2648 76.5289 79.3101 83.2178 72.8326 83.2178H66.6777C66.2083 84.1225 65.4994 84.8809 64.6283 85.4102C63.7572 85.9394 62.7574 86.2191 61.7382 86.2188H23.8631C22.8188 86.219 21.8085 85.8477 21.013 85.1711C20.2175 84.4944 19.6888 83.5568 19.5215 82.526C19.3542 81.4952 19.5593 80.4384 20.1 79.545C20.6407 78.6516 21.4817 77.9797 22.4725 77.6497L31.7007 74.5737C32.8903 74.1777 33.9754 73.5188 34.8754 72.6458C35.7753 71.7729 36.4669 70.7083 36.8988 69.5313H19.8581C17.5688 69.531 15.3149 68.9655 13.2965 67.885C11.2782 66.8045 9.55781 65.2424 8.28813 63.3374L5.11472 58.5815C3.59177 56.2957 2.77981 53.6102 2.78125 50.8635V37.5469C2.78125 34.265 4.4055 31.3642 6.89194 29.6008C6.41839 27.9779 6.11271 26.3106 5.97969 24.6252C5.68766 20.5701 6.63885 15.3108 11.9649 13.2221C15.8587 11.6952 18.7484 12.3877 21.1347 13.3611C21.7549 13.617 22.2834 13.8506 22.7562 14.0592C24.1552 14.6794 25.0535 15.0799 26.3357 15.0799C27.1617 15.0799 28.302 14.2094 28.5217 13.0107C28.5694 12.7675 28.5635 12.5169 28.5044 12.2762C28.4453 12.0356 28.3345 11.8107 28.1796 11.6173C27.7986 11.1083 26.9336 10.388 25.0646 9.84563C24.3784 9.64667 23.7992 9.18333 23.4545 8.55748C23.1097 7.93163 23.0248 7.19449 23.2234 6.50813ZM43.7685 16.6875C43.2522 16.6878 42.7461 16.8318 42.3069 17.1034C41.8678 17.3751 41.5129 17.7636 41.2821 18.2255L34.468 31.8481H34.4513L33.7004 33.2387C33.2232 34.1216 32.5159 34.859 31.6537 35.3726C30.7914 35.8863 29.8063 36.157 28.8026 36.1563H20.3115C19.2127 36.1565 18.1385 35.8313 17.2243 35.2218L14.4542 33.375H12.5156C11.4092 33.375 10.348 33.8145 9.56567 34.5969C8.78329 35.3793 8.34375 36.4404 8.34375 37.5469V50.8663C8.34423 51.5326 8.42453 52.1965 8.58294 52.8438H36.1563L33.0385 55.9615C32.2635 56.7367 31.3434 57.3516 30.3308 57.7711C29.3181 58.1906 28.2328 58.4064 27.1367 58.4063H11.6868L12.9189 60.253C13.6805 61.3955 14.7123 62.3324 15.9228 62.9806C17.1333 63.6288 18.485 63.9682 19.8581 63.9688H38.6844C38.9292 63.9688 39.1711 63.991 39.402 64.0299L39.4993 63.9688H45.3232C46.8585 64.0856 49.5368 65.2871 47.9738 69.1447C46.3134 73.2387 43.1344 78.4758 41.0207 80.6563H61.7354L63.8325 71.2139C63.9215 70.8162 63.966 70.4129 63.966 70.0069V42.6394C63.966 41.6312 63.692 40.642 63.1733 39.7774L62.6198 38.8568C61.9542 37.7472 60.9225 36.9043 59.7023 36.4733C58.9875 36.223 58.4035 35.6056 58.4035 34.8491C58.4035 34.4581 58.5588 34.0832 58.8352 33.8067C59.1117 33.5303 59.4866 33.375 59.8775 33.375H69.9679C71.2083 33.3748 72.4131 32.96 73.3907 32.1966C74.3683 31.4331 75.0627 30.3648 75.3635 29.1614L75.7001 27.8125H42.5142C42.3957 27.8123 42.2793 27.7818 42.1759 27.7239C42.0726 27.666 41.9857 27.5827 41.9236 27.4819C41.8615 27.381 41.8261 27.266 41.821 27.1476C41.8158 27.0293 41.8409 26.9116 41.894 26.8057L44.4611 21.6715C44.7922 21.0094 45.3012 20.4527 45.9309 20.0636C46.5607 19.6746 47.2864 19.4686 48.0266 19.4688H48.6719C49.0407 19.4688 49.3944 19.3222 49.6552 19.0615C49.916 18.8007 50.0625 18.4469 50.0625 18.0781C50.0625 17.7093 49.916 17.3556 49.6552 17.0948C49.3944 16.834 49.0407 16.6875 48.6719 16.6875H43.7658H43.7685Z"
                fill="#619AE0"
              />
            </svg>
            <div>
              <span>함께들어龍</span>
            </div>
          </Link>
        </div>
        <div className={styles.mainHeaderRight}>
          {user ? (
            <div>
              <Link to={`/users/${user._id}`} className={styles.mainHeaderUser}>
                <div>
                  <img
                    className={`${styles.w8} ${styles.roundedFull} ${styles.mr2}`}
                    src={profileImage}
                  ></img>
                </div>
                <span>{user.name}님 :)</span>
              </Link>
              <Button size="sm" onClick={handleLogout}>
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_666_7328)">
                    <path
                      d="M7.11837 20H3.84108C1.72437 20 0 18.2756 0 16.1556V3.84438C0 1.72437 1.72437 0 3.84438 0H7.12166C7.9756 0 8.67128 0.692384 8.67128 1.54962C8.67128 2.40356 7.9789 3.09924 7.12166 3.09924H3.84438C3.43225 3.09924 3.09924 3.43554 3.09924 3.84768V16.1556C3.09924 16.5678 3.43225 16.9008 3.84438 16.9008H7.12166C7.9756 16.9008 8.67128 17.5931 8.67128 18.4504C8.66799 19.3076 7.9756 20 7.11837 20Z"
                      fill="#545050"
                    />
                    <path
                      d="M19.7128 10.9792C19.7391 10.9495 19.7655 10.9198 19.7886 10.8869C19.8282 10.8275 19.8611 10.7649 19.8941 10.7022C19.9073 10.6726 19.9271 10.6462 19.9403 10.6165C19.9732 10.5407 19.9963 10.4616 20.0161 10.3791C20.0227 10.3593 20.0293 10.3396 20.0359 10.3198C20.059 10.2176 20.0688 10.1088 20.0688 9.99996C20.0688 9.89116 20.0557 9.78236 20.0359 9.68015C20.0326 9.66036 20.0227 9.64058 20.0161 9.6208C19.9963 9.53837 19.9732 9.45924 19.937 9.38341C19.9238 9.35374 19.9073 9.32736 19.8908 9.29769C19.8578 9.23504 19.8249 9.1724 19.7853 9.11305C19.7622 9.08008 19.7358 9.0537 19.7095 9.02403C19.6666 8.97457 19.627 8.92512 19.5809 8.87896C19.571 8.86907 19.5644 8.85918 19.5578 8.85258L14.6781 4.4477C14.0418 3.87401 13.0626 3.92347 12.4889 4.5598C11.9152 5.19614 11.9647 6.17537 12.601 6.74905L14.4902 8.45364H7.47736C6.62342 8.45364 5.92773 9.14602 5.92773 10.0033C5.92773 10.8605 6.62012 11.5529 7.47736 11.5529H14.4935L12.6043 13.2575C11.968 13.8312 11.9185 14.8104 12.4922 15.4467C12.7988 15.7863 13.2208 15.9578 13.6429 15.9578C14.0121 15.9578 14.3847 15.8259 14.6814 15.5588L19.5611 11.1539C19.571 11.144 19.5776 11.1342 19.5875 11.1276C19.6303 11.0781 19.6732 11.0286 19.7128 10.9792Z"
                      fill="#545050"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_666_7328">
                      <rect width="20.0725" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className={styles.userText}>로그아웃</span>
              </Button>
            </div>
          ) : (
            <div className={`${styles.flex} ${styles.justifyEnd}`}>
              <Button size="sm" onClick={() => navigate('/users/login')}>
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_666_7341)">
                    <path
                      d="M7.11837 20H3.84108C1.72437 20 0 18.2756 0 16.1556V3.84438C0 1.72437 1.72437 0 3.84438 0H7.12166C7.9756 0 8.67128 0.692384 8.67128 1.54962C8.67128 2.40356 7.9789 3.09924 7.12166 3.09924H3.84438C3.43225 3.09924 3.09924 3.43554 3.09924 3.84768V16.1556C3.09924 16.5678 3.43225 16.9008 3.84438 16.9008H7.12166C7.9756 16.9008 8.67128 17.5931 8.67128 18.4504C8.66799 19.3076 7.9756 20 7.11837 20Z"
                      fill="#545050"
                    />
                    <path
                      d="M6.28333 9.02655C6.25695 9.05622 6.23058 9.08589 6.2075 9.11886C6.16793 9.17821 6.13496 9.24086 6.10199 9.3035C6.0888 9.33317 6.06902 9.35955 6.05583 9.38922C6.02286 9.46506 5.99978 9.54419 5.98 9.62661C5.97341 9.64639 5.96681 9.66618 5.96022 9.68596C5.93714 9.78817 5.92725 9.89697 5.92725 10.0058C5.92725 10.1146 5.94043 10.2234 5.96022 10.3256C5.96351 10.3454 5.97341 10.3652 5.98 10.3849C5.99978 10.4674 6.02286 10.5465 6.05913 10.6223C6.07232 10.652 6.0888 10.6784 6.10529 10.708C6.13826 10.7707 6.17123 10.8333 6.21079 10.8927C6.23387 10.9257 6.26025 10.952 6.28663 10.9817C6.32949 11.0312 6.36905 11.0806 6.41521 11.1268C6.4251 11.1367 6.4317 11.1466 6.43829 11.1532L11.3179 15.558C11.9543 16.1317 12.9335 16.0823 13.5072 15.4459C14.0809 14.8096 14.0314 13.8304 13.3951 13.2567L11.5059 11.5521L18.5187 11.5521C19.3727 11.5521 20.0684 10.8597 20.0684 10.0025C20.0684 9.14524 19.376 8.45286 18.5187 8.45286L11.5026 8.45286L13.3918 6.74827C14.0281 6.17459 14.0776 5.19536 13.5039 4.55902C13.1973 4.21943 12.7753 4.04798 12.3532 4.04798C11.984 4.04798 11.6114 4.17986 11.3147 4.44692L6.43499 8.8518C6.4251 8.86169 6.41851 8.87158 6.40862 8.87818C6.36576 8.92763 6.32289 8.97709 6.28333 9.02655Z"
                      fill="#545050"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_666_7341">
                      <rect width="20.0725" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className={styles.userText}>로그인</span>
              </Button>
              <Button
                size="sm"
                bgColor="gray"
                onClick={() => navigate('/users/signup')}
              >
                <svg
                  width="28"
                  height="20"
                  viewBox="0 0 28 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.2086 8.92176H17.1524L19.9805 6.39678C20.6488 5.80085 20.7039 4.77777 20.108 4.11294C19.5121 3.44811 18.489 3.38955 17.8241 3.98548L11.8338 9.33512C11.4893 9.6417 11.293 10.0826 11.293 10.5408C11.293 11.0024 11.4893 11.4398 11.8338 11.7464L17.8241 17.0961C18.1342 17.3716 18.5165 17.506 18.9023 17.506C19.3467 17.506 19.7911 17.3234 20.1114 16.9652C20.7074 16.3003 20.6488 15.2738 19.984 14.6813L17.1559 12.1563H26.212C27.1042 12.1563 27.831 11.433 27.831 10.5373C27.8276 9.64859 27.1008 8.92176 26.2086 8.92176Z"
                    fill="#545050"
                  />
                  <path
                    d="M14.578 17.0996L8.58767 11.7465C8.2432 11.4399 8.04685 10.999 8.04685 10.5408C8.04685 10.0827 8.2432 9.64175 8.58767 9.33517L13.176 5.23596C13.0313 2.32174 10.6269 0 7.67826 0C4.63314 0 2.16328 2.46986 2.16328 5.51498C2.16328 7.48191 3.19669 9.20083 4.74337 10.1791C1.96004 11.3297 0 14.0716 0 17.2718V18.5877C0 19.3662 0.633827 20 1.41233 20H13.9408C14.7193 20 15.3531 19.3662 15.3531 18.5877V17.4819C15.0741 17.4268 14.8054 17.3028 14.578 17.0996Z"
                    fill="#545050"
                  />
                </svg>
                <span className={styles.userText}>회원가입</span>
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;

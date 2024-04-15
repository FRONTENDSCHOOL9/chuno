import styles from './boardnew.module.css';

function BoardNew() {
  return (
    <div className={styles.wrap}>
      <a href="/">
        <svg
          width="11"
          height="20"
          viewBox="0 0 11 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.6078 17.6212C11.1252 18.1383 11.1252 19.0347 10.6401 19.5863C10.3814 19.8621 10.058 20 9.70223 20C9.37882 20 9.0554 19.8621 8.79667 19.6208L0.388073 11.002C0.129347 10.7262 0 10.3814 0 10.0022C0 9.62298 0.129347 9.27823 0.388073 9.00243L8.79667 0.383642C9.31412 -0.133485 10.1227 -0.133483 10.6401 0.41812C11.1252 0.969722 11.1252 1.83159 10.6078 2.3832L3.16941 10.0022L10.6078 17.6212Z"
            fill="#7E96E8"
          />
        </svg>
      </a>
      <form>
        <div className={styles.inputsection}>
          <label className={styles} htmlFor="file">
            썸네일을 지정해주세요
          </label>
          {/* NOTE - 플레이리스트 추가영역입니다. */}
          <input type="file" id="file" className={styles} />
        </div>
        <div className={styles.inputsection}>
          <label className={styles} htmlFor="title">
            제목
          </label>
          <input
            type="text"
            id="title"
            placeholder="제목을 입력하세요."
            className={styles}
          />
        </div>
        <div className={styles.inputsection}>
          <label className={styles} htmlFor="content">
            내용
          </label>
          <textarea
            id="content"
            rows="15"
            placeholder="내용을 입력하세요."
            className={styles}
          />
        </div>
        <div className={styles.inputsection}>
          <button type="submit">등록 완료</button>
        </div>
      </form>
    </div>
  );
}

export default BoardNew;

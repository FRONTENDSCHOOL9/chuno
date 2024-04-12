
function BoardNew(){
  return (
    <div className="">
      <div className="">
        <h2 className="">게시물 등록</h2>
      </div>
      <section className="">
        <form>
          <div className="">
            <label className="" htmlFor="title">제목</label>
            <input             
              type="text"
              id="title" 
              placeholder="제목을 입력하세요." 
              className=""
            />
          </div>
          <div className="">
            <label className="" htmlFor="content">내용</label>
            <textarea 
              id="content" 
              rows="15" 
              placeholder="내용을 입력하세요."
              className=""
            />
          </div>
          <hr />
          <div className="">
            <a>취소</a>
            <button type="submit">등록</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default BoardNew;
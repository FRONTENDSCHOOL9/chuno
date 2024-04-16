import './board.css';


function Boardlistitem(){
    return (
        <>
        <ul className='wrap_list'>            
            <li className='listitem'>
                <div className='thumbnail'>
                    <img src="" alt="" />
                </div>
                <div className='desc'>
                    <h3>반려동물도 함께 듣는 곡</h3>
                    <span>by doglike</span>
                </div>
                <span className='count'>15곡</span>
            </li>
        </ul>
        </>
    )
}

export default Boardlistitem;
import '../App.css';

export const ButtonNumber = ({number, numberFunction}) =>{
    return(
        <button className='buttonNumber' onClick={numberFunction}>{number}</button>
    )
}
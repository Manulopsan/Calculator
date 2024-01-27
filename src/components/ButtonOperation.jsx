import '../App.css';

export const ButtonOperation = ({sign, operation}) =>{
    return(
        <button className='buttonOperation' onClick={operation}>{sign}</button>
    )
}
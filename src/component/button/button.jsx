import './style.css'
export default function Button({type , text, className, onClick}) {

    return<>
    <div className='paddingButton'>
        <button onClick={onClick} type={type} className={className?className:'btn'} role="button">{text}</button>
    </div>
            
    </>
}
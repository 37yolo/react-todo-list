import './style.css'
export default function Button({type , text, className, onClick}) {

    return<>
            <button onClick={onClick} type={type} className={className?className:'btn'} role="button">{text}</button>
    </>
}
interface ButtonProps {
    text: string,
    title: string,
    action?: () => void,
    buttonType: "submit" | "button",
    bgColor: string,
    hoverBgColor: string
}

const Button = ({text, title, action, buttonType, bgColor, hoverBgColor} : ButtonProps) => {
    return (
        <button type={buttonType} title={title} className={`text-white px-4 py-1 rounded-full transition-all ${hoverBgColor} hover:-rotate-3 cursor-pointer ${bgColor}`} onClick={action}>
            {text}
        </button>
    );
}

export default Button;
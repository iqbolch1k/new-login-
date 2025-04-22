interface ButtonUiProps {
    text: string;
    width?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    className?: string;
    isLoading?: boolean;
    loadingText?: string;
}

function Button({
    text,
    width = "full",
    onClick,
    type = "button",
    disabled = false,
    className = "",
    isLoading = false,
    loadingText = "Yuklanmoqda..."
}: ButtonUiProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`w-${width} mt-5 h-12 bg-[#607AFB] text-white rounded-xl font-semibold hover:bg-[#455dd3c0] transition-all disabled:opacity-50 ${className}`}
        >
            {isLoading ? loadingText : text}
        </button>
    );
}

export default Button;

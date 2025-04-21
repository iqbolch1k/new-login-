function FormInput({
    title,
    type,
    placeholder,
    name,
    onChangle,
    defaultValue,
    className,
    classNameLable
}: {
    type: string,
    placeholder?: string,
    title?: string,
    name?: string,
    onChangle?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    defaultValue?: string
    className?: string
    classNameLable?: string
}) {
    return (
        <div>
            <div className="flex flex-col gap-3">
                <label className={`${classNameLable}`} >{title}</label>
                <input className={`${className} border border-[#E4E4E4] rounded-xl h-14 text-[16px] font-medium px-4 placeholder:text-[#BBBBBB]`} value={defaultValue} type={type} placeholder={placeholder} name={name} onChange={onChangle} />
            </div>
        </div>
    )
}

export default FormInput
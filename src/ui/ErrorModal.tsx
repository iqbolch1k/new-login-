function ErrorModal({ title, className }: { title: string, className?: string }) {
    return (
        <div>
            <div
                className={`
                    modal ${className}
                    absolute top-10 left-1/2 z-40 -translate-x-1/2
                    transition-all duration-500 ease-in-out
                `}
            >
                <h4 className="text-center text-2xl font-medium bg-white py-5 px-10 rounded-xl shadow-md">
                    {title}!
                </h4>
            </div>
        </div>
    );
}
export default ErrorModal

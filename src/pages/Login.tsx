import { useState } from "react"
import ErrorModal from "../ui/ErrorModal"
import FormInput from "../ui/FormInput";
import male from '../assets/male.svg'
import Button from './../ui/Button';
import { login } from "../api/services/AuthServices";
interface errorProps {
    Text: string;
    color?: string
}
function Login() {
    const [error, setError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<errorProps>({ Text: '', color: "" });
    const [InputText, setInputText] = useState<boolean>(false)

    const [formData, setFormData] = useState(
        {
            username: '',
            password: ''
        }
    )
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (value.trim() !== '') {
            setInputText(false);
        }
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }
    setTimeout(() => setInputText(false), 10000);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.username || !formData.password) {
            setInputText(true);
            setError(false);
            return;
        }
        setIsLoading(true);
        try {
            await login(formData.username, formData.password);
            setError(true);
            setErrorText({ Text: "Tizimga muvaffaqiyatli kirdingiz!", color: 'text-green-600' });
            setTimeout(() => setError(false), 3000);
        } catch (err) {
            setError(true);
            setErrorText({ Text: "Xato login parol kiritdingiz.", color: 'text-red-600' });
            setTimeout(() => setError(false), 3000);
        }
        setFormData({ username: '', password: '' });
        setIsLoading(false);
    };


    return (
        <div className="md:px-5 sm:px-5 continer max-[640px]:px-3 relative">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-10 items-center justify-center w-full px-4  py-10">
                    <div className="w-full md:w-1/2 max-w-xl flex flex-col justify-center">
                        <ErrorModal
                            title={errorText.Text}
                            className={`${errorText.color} ${error ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}
                        />

                        <div>
                            <h1 className="text-4xl md:text-6xl text-center font-bold text-[#252525]">Xush kelibsiz!</h1>
                            <p className="text-[#4B4B4B] text-center text-base md:text-xl font-normal pt-2">
                                Login parolingizni kiritib o‘z kabinetingizga kiring.
                            </p>
                            <form className="pt-10 md:pt-16 flex flex-col gap-5" onSubmit={handleSubmit}>
                                <FormInput
                                    title="Login"
                                    type="text"
                                    placeholder="Loginingizni kiriting"
                                    name="username"
                                    className="w-full"
                                    classNameLable="text-base md:text-xl font-medium text-[#252525]"
                                    onChangle={handleChange}
                                    defaultValue={formData.username}
                                />
                                <p className={`text-red-600 text-[16px] font-medium ${InputText ? 'block' : 'hidden'}`}>Inputlar bo'sh</p>
                                <FormInput
                                    title="Parol"
                                    type="password"
                                    placeholder="Parolingizni kiriting"
                                    name="password"
                                    className="w-full"
                                    classNameLable="text-base md:text-xl font-medium text-[#252525]"
                                    onChangle={handleChange}
                                    defaultValue={formData.password}
                                />
                                <p className={`text-red-600 text-[16px] font-medium ${InputText ? 'block' : 'hidden'}`}>Inputlar bo'sh</p>
                                <Button
                                    type="submit"
                                    text="Kirish"
                                    isLoading={isLoading}
                                    loadingText="Yuklanmoqda..."
                                />
                            </form>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0 max-[934px]:hidden">
                        <img className="w-full max-w-[450px] md:max-w-[850px] h-auto object-cover" src={male} alt="Login illustration" />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login
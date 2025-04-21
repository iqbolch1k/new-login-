import { useState } from "react"
import ErrorModal from "../ui/ErrorModal"
import FormInput from "../ui/FormInput";
import male from '../assets/male.svg'
import Button from './../ui/Button';
import { login } from "../services/AuthServices";
import Navbar from "../components/Navbar";
interface errorProps {
    Text: string;
    color?: string
}
function Login() {
    const [error, setError] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<errorProps>({ Text: '', color: "" });

    const [formData, setFormData] = useState(
        {
            username: '',
            password: ''
        }
    )
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }
    setTimeout(() => {
        setError(false);
    }, 3000);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.username || !formData.password) {
            setErrorText({ Text: "Inputlar bo'sh bo'lmasligi kerak", color: 'text-red-600' });
            setError(true);
            setTimeout(() => setError(false), 4000);
            return;
        }

        try {
            await login(formData.username, formData.password);
            setError(true);
            setTimeout(() => setError(false), 25000);
            setErrorText({ Text: "Tizimga muvaffaqiyatli kirdingiz!", color: 'text-green-600' });
        } catch (err) {
            setError(true);
            setErrorText({ Text: "Xato login parol kiritdingiz.", color: 'text-red-600' });
            setTimeout(() => setError(false), 15000);
        }
        setFormData(
            {
                username: '',
                password: ''
            }
        )
    };

    return (
        <div className="md:px-5 sm:px-5 continer max-[640px]:px-3 relative">
            <Navbar />
            <div className="flex items-center justify-between">
                <div>
                    <ErrorModal
                        title={errorText.Text}
                        className={`${errorText.color} ${error ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}
                    />

                    <div>
                        <h1 className="text-6xl text-center font-bold text-[#252525]">Xush kelibsiz!</h1>
                        <p className="text-[#4B4B4B] text-center text-xl font-normal pt-[4px]">Login parolingizni kiritib o‘z kabinetingizga kiring.</p>
                        <form className="pt-16 flex flex-col gap-5" onSubmit={handleSubmit}>
                            <FormInput
                                title="Login"
                                type="text"
                                placeholder="Loginingizni kiriting"
                                name="username" className="w-full"
                                classNameLable="text-xl font-medium text-[#252525]"
                                onChangle={handleChange}
                                defaultValue={formData.username}
                            />
                            <FormInput
                                title="Parol"
                                type="password"
                                placeholder="Parolingizni kiriting"
                                name="password" className="w-full"
                                classNameLable="text-xl font-medium text-[#252525]"
                                onChangle={handleChange}
                                defaultValue={formData.password}
                            />
                            <Button type="submit" text="Kirish" />
                        </form>
                    </div>
                </div>
                <img className="w-[850px] h-[760px] object-cover" src={male} alt="" />
            </div>
        </div>
    )
}

export default Login
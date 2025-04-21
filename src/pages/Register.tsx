import { useState } from "react"
import ErrorModal from "../ui/ErrorModal"
import FormInput from "../ui/FormInput";
import male from '../assets/male.svg'
import Button from './../ui/Button';
import { register } from "../services/AuthServices";
import Navbar from "../components/Navbar";
interface errorProps {
  Text: string;
  color?: string
}
function Register() {
  const [error, setError] = useState<boolean>(false)
  const [errorText, setErrorText] = useState<errorProps>({ Text: '', color: "" });
  const [formData, setFormData] = useState(
    {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.password || !formData.first_name || !formData.last_name || !formData.email) {
      setErrorText({ Text: "Inputlar bo'sh bo'lmasligi kerak", color: 'text-red-600' });
      setError(true);
      setTimeout(() => setError(false), 4000);
      return;
    }
    setError(false);
    console.log("Foydalanuvchi ma'lumotlari:", formData);
    try {
      await register(formData.username, formData.password, formData.email, formData.first_name, formData.last_name);
      setError(true);
      setErrorText({ Text: "Muvaffaqiyatli ro'yxatdan o'tdingiz!", color: 'text-green-600' });
      setTimeout(() => setError(false), 10000);
    } catch (error) {
      setError(true);
      setErrorText({ Text: "Ma'lumotlaringiz talabga javob bermaydi!", color: 'text-red-600' });
      setTimeout(() => setError(false), 8000);
    }
    setFormData({
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: ''
    });

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
            <h1 className="text-[40px] text-center font-bold text-[#252525]">Ro‘yxatdan o‘tish</h1>
            <p className="text-[#4B4B4B] text-center text-xl font-normal pt-[4px]">Kerakli ma’lumotlarni kiritib ro‘yxatdan o‘ting</p>
            <form className="pt-16 flex flex-col gap-5" onSubmit={handleSubmit}>
              <FormInput
                title="Ismingiz"
                type="text"
                placeholder="Ismingizni kiriting"
                name="first_name" className="w-full"
                classNameLable="text-xl font-medium text-[#252525]"
                onChangle={handleChange}
                defaultValue={formData.first_name}
              />
              <FormInput
                title="Familiyangiz"
                type="text"
                placeholder="Familiyangizni kiriting"
                name="last_name" className="w-full"
                classNameLable="text-xl font-medium text-[#252525]"
                onChangle={handleChange}
                defaultValue={formData.last_name}
              />
              <div className="flex items-center justify-between gap-5">
                <FormInput
                  title="Username"
                  type="username"
                  placeholder="Username kiriting"
                  name="username" className="w-full"
                  classNameLable="text-xl font-medium text-[#252525]"
                  onChangle={handleChange}
                  defaultValue={formData.username}
                />
                <FormInput
                  title="Email"
                  type="email"
                  placeholder="Email kiriting"
                  name="email" className="w-full"
                  classNameLable="text-xl font-medium text-[#252525]"
                  onChangle={handleChange}
                  defaultValue={formData.email}
                />
              </div>
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

export default Register
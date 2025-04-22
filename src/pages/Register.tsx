import { useState } from "react"
import ErrorModal from "../ui/ErrorModal"
import FormInput from "../ui/FormInput";
import male from '../assets/male.svg'
import Button from './../ui/Button';
import { register } from "../api/services/AuthServices";

interface errorProps {
  Text: string;
  color?: string
}
interface FormDataProps {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
}
function Register() {
  const [error, setError] = useState<boolean>(false)
  const [errorText, setErrorText] = useState<errorProps>({ Text: '', color: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputError, setInputError] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormDataProps>({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (value.trim() !== '') {
      setInputError(false);
    }
  }
  setTimeout(() => setInputError(false), 3000);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.password || !formData.first_name || !formData.last_name || !formData.email) {
      setInputError(true);
      return;
    }

    setError(false);
    setIsLoading(true);

    try {
      await register(
        formData.username,
        formData.password,
        formData.email,
        formData.first_name,
        formData.last_name
      );
      setErrorText({ Text: "Muvaffaqiyatli ro'yxatdan o'tdingiz!", color: 'text-green-600' });
      setError(true);
      setTimeout(() => setError(false), 10000);
    } catch (error) {
      setErrorText({ Text: "Ma'lumotlaringiz talabga javob bermaydi!", color: 'text-red-600' });
      setError(true);
      setTimeout(() => setError(false), 8000);
    }

    setIsLoading(false);
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
      <div className="flex flex-col gap-10 md:flex-row items-center justify-center w-full px-4  py-10">
        <div className="w-full md:w-1/2 max-w-xl flex flex-col justify-center">
          <ErrorModal
            title={errorText.Text}
            className={`${errorText.color} ${error ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}
          />

          <div className="flex flex-col justify-center">
            <h1 className="text-3xl md:text-[40px] text-center font-bold text-[#252525]">Ro‘yxatdan o‘tish</h1>
            <p className="text-[#4B4B4B] text-center text-base md:text-xl font-normal pt-2">
              Kerakli ma’lumotlarni kiritib ro‘yxatdan o‘ting
            </p>
            <form className="pt-10 md:pt-16 flex flex-col gap-5" onSubmit={handleSubmit}>
              <FormInput
                title="Ismingiz"
                type="text"
                placeholder="Ismingizni kiriting"
                name="first_name"
                className="w-full"
                classNameLable="text-base md:text-xl font-medium text-[#252525]"
                onChangle={handleChange}
                defaultValue={formData.first_name}
              />
              <FormInput
                title="Familiyangiz"
                type="text"
                placeholder="Familiyangizni kiriting"
                name="last_name"
                className="w-full"
                classNameLable="text-base md:text-xl font-medium text-[#252525]"
                onChangle={handleChange}
                defaultValue={formData.last_name}
              />
              <div className="flex items-center justify-between gap-5">
                <FormInput
                  title="Username"
                  type="text"
                  placeholder="Username kiriting"
                  name="username"
                  className="w-full"
                  classNameLable="text-base md:text-xl font-medium text-[#252525]"
                  onChangle={handleChange}
                  defaultValue={formData.username}
                />
                <FormInput
                  title="Email"
                  type="email"
                  placeholder="Email kiriting"
                  name="email"
                  className="w-full"
                  classNameLable="text-base md:text-xl font-medium text-[#252525]"
                  onChangle={handleChange}
                  defaultValue={formData.email}
                />
              </div>
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
              {inputError && (
                <p className="text-red-600 text-[16px] text-center font-medium">Barcha maydonlar to‘ldirilishi shart!</p>
              )}
              <Button
                type="submit"
                text={isLoading ? "Yuklanmoqda..." : "Kirish"}
                disabled={isLoading}
              />
            </form>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:mb-0 max-[934px]:hidden">
          <img className="w-full max-w-[450px] md:max-w-[850px] h-auto object-cover" src={male} alt="Ro‘yxatdan o‘tish rasmi" />
        </div>
      </div>
    </div>
  )
}

export default Register;

import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { registerSchema } from '@/commonFC/formSchema';
import { paths } from '@/routes';

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerSchema),
    });

    const formSubmitHandler = (data) => {
        console.log(data);
    };
    return (
        <div className="bg-white">
            <div className="">
                <main className="flex items-center justify-center px-8 py-8 sm:px-12  lg:px-16 lg:py-12 ">
                    <div className="max-w-xl lg:max-w-3xl">
                        <div className="mx-auto max-w-lg text-center">
                            <div className="flex justify-center">
                                <Link to={paths.home}>
                                    <img src="/logo.png" alt="logo" className="w-56 h-20 object-cover" />
                                </Link>
                            </div>
                            <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

                            <p className="mt-4 text-gray-500">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla eaque error
                                neque ipsa culpa autem, at itaque nostrum
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(formSubmitHandler)} className="mt-8 grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Tên
                                </label>

                                <input
                                    {...register('name')}
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="py-2 border px-1 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                />
                                {errors.name ? <span className="text-red-900">{errors.name.message}</span> : <></>}
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                                    Số điện thoại
                                </label>

                                <input
                                    {...register('phoneNumber')}
                                    type="number"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    className="py-2 border px-1 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                />
                                {errors.phoneNumber ? (
                                    <span className="text-red-900">{errors.phoneNumber.message}</span>
                                ) : (
                                    <></>
                                )}
                            </div>

                            <div className="col-span-6">
                                <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>

                                <input
                                    {...register('email')}
                                    type="email"
                                    id="Email"
                                    name="email"
                                    className="py-2 border px-1 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                />
                                {errors.email ? <span className="text-red-900">{errors.email.message}</span> : <></>}
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
                                    Mật khẩu
                                </label>

                                <input
                                    {...register('password')}
                                    type="password"
                                    id="Password"
                                    name="password"
                                    className="py-2 border px-1 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                />
                                {errors.password ? (
                                    <span className="text-red-900">{errors.password.message}</span>
                                ) : (
                                    <></>
                                )}
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="PasswordConfirmation"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Xác thực mật khẩu
                                </label>

                                <input
                                    {...register('passwordConfirm')}
                                    type="password"
                                    id="PasswordConfirmation"
                                    name="passwordConfirm"
                                    className="py-2 border px-1 mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                />
                                {errors.passwordConfirm ? (
                                    <span className="text-red-900">{errors.passwordConfirm.message}</span>
                                ) : (
                                    <></>
                                )}
                            </div>

                            <div className="col-span-6">
                                <label htmlFor="MarketingAccept" className="flex gap-4">
                                    <input
                                        {...register('checkbox')}
                                        type="checkbox"
                                        id="MarketingAccept"
                                        name="checkbox"
                                        value=""
                                        className="py-2 border px-1 h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
                                    />

                                    <span className="text-sm text-gray-700">
                                        I want to receive emails about events, product updates and company
                                        announcements.
                                    </span>
                                </label>
                                {errors.checkbox ? (
                                    <span className="text-red-900">{errors.checkbox.message}</span>
                                ) : (
                                    <></>
                                )}
                            </div>

                            <div className="col-span-6">
                                {/* <p className="text-sm text-gray-500">
                                    By creating an account, you agree to our
                                    <a href="#" className="text-gray-700 underline">
                                        terms and conditions
                                    </a>
                                    and
                                    <a href="#" className="text-gray-700 underline">
                                        privacy policy
                                    </a>
                                    .
                                </p> */}
                            </div>

                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:opacity-80 hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                                    Create an account
                                </button>

                                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                    Already have an account?
                                    <Link to={paths.login} className="text-gray-700 underline">
                                        Log in
                                    </Link>
                                    .
                                </p>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Register;

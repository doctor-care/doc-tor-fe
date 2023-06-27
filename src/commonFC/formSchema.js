import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup.string().required('Vui lòng nhập email').email('Vui lòng nhập đúng định dạng email'),
    password: yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự'),
});

export const registerSchema = yup.object().shape({
    name: yup.string().required('Vui lòng nhập tên'),
    phoneNumber: yup
        .string()
        .required('Vui lòng nhập số điện thoại')
        .matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ. Vui lòng nhập 10 chữ số.'),
    email: yup.string().required('Vui lòng nhập email').email('Vui lòng nhập đúng định dạng email'),
    password: yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự'),
    passwordConfirm: yup
        .string()
        .required('Vui lòng xác thực mật khẩu')
        .oneOf([yup.ref('password')], 'Mật khẩu xác thực không khớp'),
    checkbox: yup.boolean().oneOf([true], 'check box mess'),
});

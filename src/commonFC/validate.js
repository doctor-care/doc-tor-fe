const messages = {
    email: 'Sai định dạng Email',
    password: 'Mật khẩu phải chứa ít nhất 6 ký tự',
    confirmPassword: 'Không khớp với mật khẩu đã sử dụng',
};

//check email
function validateEmail(email) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (emailRegex.test(email)) {
        return { valid: true };
    } else {
        return { valid: false, message: messages.email };
    }
}

//check pass
function validatePassword(password) {
    if (password.length >= 6) {
        return { valid: true };
    } else {
        return { valid: false, message: messages.password };
    }
}

export { validateEmail, validatePassword };

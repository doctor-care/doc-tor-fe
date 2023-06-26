const randomOTP = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomCode = "";
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomCode += characters.charAt(randomIndex);
    }
    return randomCode;
}

export default randomOTP;
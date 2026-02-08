
interface ValidateInputsProps {
    setEmailError: (bool: boolean) => void;
    setEmailErrorMessage: (msg: string) => void;
    setPasswordError: (bool: boolean) => void;
    setPasswordErrorMessage: (msg: string) => void;
}

export const validateInputs = ({ setEmailError, setEmailErrorMessage, setPasswordError, setPasswordErrorMessage }: ValidateInputsProps) => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value) {
        setEmailError(true);
        setEmailErrorMessage('Please enter an email address.');
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email.value)) {
        setEmailError(true);
        setEmailErrorMessage('Please enter a valid email address.');
        isValid = false;
    } else {
        setEmailError(false);
        setEmailErrorMessage('');
    }

    if (!password.value) {
        setPasswordError(true);
        setPasswordErrorMessage('Please Enter the password.');
        isValid = false;
    } else if (!/\w{8,16}/.test(password.value)) {
        setPasswordError(true);
        setPasswordErrorMessage('Password length must be between 8 to 16 characters or numbers.')
        isValid = false;
    } else {
        setPasswordError(false);
        setPasswordErrorMessage('');
    }

    return isValid;
};
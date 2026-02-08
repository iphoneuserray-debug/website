'use client';

import * as React from 'react';
import Notification from '../shared-components/notification.tsx';
import { validateInputs } from '../utils/validateInputs.ts';
import { useRouter } from 'next/navigation';
import { Container } from '../shared-components/container';
import AuthCard from '../shared-components/authCard';
import request from '../utils/request';

export default function SignIn() {
    const router = useRouter();
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [alertopen, setAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (emailError || passwordError) {
            return;
        }
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });

        try {
            await request(`/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: String(data.get('email') || ''),
                    password: String(data.get('password') || ''),
                }),
            });
            router.push(`/dashboard`);
        } catch (error) {
            if (error instanceof Error) {
                setAlertMessage(error.message);
            } else {
                setAlertMessage(typeof error === 'string' ? error : 'Unknown error occurred');
            }
            setAlert(true);
        }
    };



    return (
        <Container direction="column" justifyContent="space-between">
            <Notification open={alertopen} message={alertMessage} setAlert={setAlert} />
            <AuthCard
                title="Sign in"
                submitLabel="Sign in"
                emailError={emailError}
                emailErrorMessage={emailErrorMessage}
                passwordError={passwordError}
                passwordErrorMessage={passwordErrorMessage}
                onSubmit={handleSubmit}
                onValidateClick={() => validateInputs({ setEmailError, setEmailErrorMessage, setPasswordError, setPasswordErrorMessage })}
                footerPrompt="Don't have an account?"
                footerLinkHref="/sign-up"
                footerLinkText="Sign up"
            />
        </Container>);
}


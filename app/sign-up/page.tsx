'use client';

import * as React from 'react';
import { Container } from '../shared-components/container.tsx';
import { validateInputs } from '../utils/validateInputs.ts';
import Notification from '../shared-components/notification.tsx';
import { useRouter } from 'next/navigation';
import AuthCard from '../shared-components/authCard.tsx';
import request from '../utils/request';

export default function SignUp() {
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
            event.preventDefault();
            return;
        }
        const data = new FormData(event.currentTarget);

        const account = { email: String(data.get('email') || ''), password: String(data.get('password') || '') };
        // Sign up
        try {
            await request(`/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(account),
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
    }

    return (
        <Container direction="column" justifyContent="space-between">
            <Notification open={alertopen} message={alertMessage} setAlert={setAlert} />
            <AuthCard
                title="Sign up"
                submitLabel="Sign up"
                emailError={emailError}
                emailErrorMessage={emailErrorMessage}
                passwordError={passwordError}
                passwordErrorMessage={passwordErrorMessage}
                onSubmit={handleSubmit}
                onValidateClick={() => validateInputs({ setEmailError, setEmailErrorMessage, setPasswordError, setPasswordErrorMessage })}
                footerPrompt="Already have an account?"
                footerLinkHref="/sign-in"
                footerLinkText="Sign in"
            />
        </Container>
    )
}
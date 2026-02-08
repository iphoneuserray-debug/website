'use client';

import * as React from 'react';
import { Card } from './card';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

interface Props {
    title: string;
    submitLabel: string;
    emailError: boolean;
    emailErrorMessage: string;
    passwordError: boolean;
    passwordErrorMessage: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onValidateClick?: () => void;
    footerPrompt?: string;
    footerLinkHref?: string;
    footerLinkText?: string;
}

export default function AuthCard({
    title,
    submitLabel,
    emailError,
    emailErrorMessage,
    passwordError,
    passwordErrorMessage,
    onSubmit,
    onValidateClick,
    footerPrompt,
    footerLinkHref,
    footerLinkText,
}: Props) {
    return (
        <Card variant="outlined">
            <Typography
                component="h1"
                variant="h4"
                sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
                {title}
            </Typography>
            <Box
                component="form"
                onSubmit={onSubmit}
                noValidate
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: 2,
                }}
            >
                <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <TextField
                        error={emailError}
                        helperText={emailErrorMessage}
                        id="email"
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        autoComplete="email"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        color={emailError ? 'error' : 'primary'}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <TextField
                        error={passwordError}
                        helperText={passwordErrorMessage}
                        name="password"
                        placeholder="••••••••"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        color={passwordError ? 'error' : 'primary'}
                    />
                </FormControl>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={() => onValidateClick?.()}
                >
                    {submitLabel}
                </Button>
            </Box>
            <Divider>or</Divider>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} />
            {footerPrompt && (
                <Typography sx={{ textAlign: 'center' }}>
                    {footerPrompt}{' '}
                    {footerLinkHref && (
                        <Link href={footerLinkHref} variant="body2" sx={{ alignSelf: 'center' }}>
                            {footerLinkText}
                        </Link>
                    )}
                </Typography>
            )}
        </Card>
    );
}

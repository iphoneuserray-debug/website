'use client';
import { Button, Grid2, Paper, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import request from "@/app/utils/request";

export default function InfoCard({ email }: { email: string }) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        country: '',
        state: '',
        city: '',
        postcode: '',
        about: '',
        email: email
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const accountInfo = {
            phone: formData.phone,
            address: formData.address,
            country: formData.country,
            state: formData.state,
            city: formData.city,
            postcode: formData.postcode,
            about: formData.about,
        };

        try {
            const accountData = await request(`/accounts/${email}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(accountInfo),
            });

            await request(`/users/${email}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: formData.name }),
            });

            setFormData({
                ...accountData,
                name: formData.name,
                email: email,
            });
            window.alert('Profile updated successfully');
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const accountData = await request(`/accounts/${email}`, {
                    method: "GET",
                });
                setFormData((prev) => ({
                    ...accountData,
                    name: prev.name,
                    email: email,
                }));

                const userBody = await request(`/users/by-email/${email}`, {
                    method: "GET",
                });
                if (userBody?.name) {
                    setFormData((prev) => ({
                        ...prev,
                        name: userBody.name,
                    }));
                }
            } catch (err) {
                console.log((err as Error).message);
            }
        })();
    }, [email]);

    return (
        <Paper
            sx={{
                spacing: "2px",
                padding: 3,
            }}
        >
            <form onSubmit={handleSubmit}>
                <Grid2
                    container
                    spacing={2}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                    <Grid2 size={6}>
                        <TextField
                            id="name"
                            label="name"
                            value={formData.name || ''}
                            fullWidth
                            required
                            onChange={handleInputChange}
                        />
                    </Grid2>
                    <Grid2 size={6}>
                        <TextField
                            id="email"
                            label="email"
                            value={formData.email || ''}
                            fullWidth
                            slotProps={{
                                input: {
                                    readOnly: true,
                                },
                            }}
                            onChange={handleInputChange}
                        />
                    </Grid2>
                    <Grid2 size={6}>
                        <TextField
                            id="phone"
                            label="phone"
                            value={formData.phone || ''}
                            fullWidth
                            onChange={handleInputChange}
                        />
                    </Grid2>
                    <Grid2 size={6}>
                        <TextField
                            id="address"
                            label="address"
                            value={formData.address || ''}
                            fullWidth
                            onChange={handleInputChange}
                        />
                    </Grid2>
                    <Grid2 size={6}>
                        <TextField
                            id="country"
                            label="country"
                            value={formData.country || ''}
                            fullWidth
                            onChange={handleInputChange}
                        />
                    </Grid2>
                    <Grid2 size={6}>
                        <TextField
                            id="state"
                            label="state"
                            value={formData.state || ''}
                            fullWidth
                            onChange={handleInputChange}
                        />
                    </Grid2>
                    <Grid2 size={6}>
                        <TextField
                            id="city"
                            label="city"
                            value={formData.city || ''}
                            fullWidth
                            onChange={handleInputChange}
                        />
                    </Grid2>
                    <Grid2 size={6}>
                        <TextField
                            id="postcode"
                            label="postcode"
                            value={formData.postcode || ''}
                            fullWidth
                            onChange={handleInputChange}
                        />
                    </Grid2>
                    <TextField
                        id="about"
                        label="about"
                        value={formData.about || ''}
                        fullWidth
                        multiline
                        rows={4}
                        onChange={handleInputChange}
                    />
                    <Button variant="contained" size="large" type="submit">
                        Save
                    </Button>
                </Grid2>
            </form>
        </Paper>
    );
}
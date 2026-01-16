import { Account } from "@/app/api/account";
import { Button, Grid2, Paper, TextField } from "@mui/material";
import { useState } from "react";

export default function InfoCard() {
    const [userInfo, setUserInfo] = useState<Account>({
        id: "1",
        name: "Peter Griffin",
        email: "peter_griffin@gmail.com",
        phone: "05984859",
        address: "",
        country: "",
        state: "",
        city: "",
        postcode: "",
        about: "",
        role: "User",
    });
    const [name, setName] = useState(userInfo.name);
    const [phone, setPhone] = useState(userInfo.phone);
    const [address, setAddress] = useState(userInfo.address);
    const [country, setCountry] = useState(userInfo.country);
    const [state, setState] = useState(userInfo.state);
    const [city, setCity] = useState(userInfo.city);
    const [postcode, setPostcode] = useState(userInfo.postcode);
    const [about, setAbout] = useState(userInfo.about);

    function handleClick(): void {
        const newInfo: Account = {
            ...userInfo,
            name,
            phone,
            address,
            country,
            state,
            city,
            postcode,
            about,
        };
        setUserInfo(newInfo);
    }

    return (
        <Paper
            sx={{
                spacing: "2px",
                padding: 3,
            }}
        >
            <Grid2
                container
                spacing={2}
                sx={{ display: "flex", justifyContent: "flex-end" }}
            >
                <Grid2 size={6}>
                    <TextField
                        id="name"
                        label="name"
                        value={name}
                        fullWidth
                        required
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                    />
                </Grid2>
                <Grid2 size={6}>
                    <TextField
                        id="email"
                        label="email"
                        defaultValue={userInfo.email}
                        fullWidth
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                    />
                </Grid2>
                <Grid2 size={6}>
                    <TextField
                        id="phone"
                        label="phone"
                        value={phone}
                        fullWidth
                        onChange={(event) => {
                            setPhone(event.target.value);
                        }}
                    />
                </Grid2>
                <Grid2 size={6}>
                    <TextField
                        id="address"
                        label="address"
                        value={address}
                        fullWidth
                        onChange={(event) => {
                            setAddress(event.target.value);
                        }}
                    />
                </Grid2>
                <Grid2 size={6}>
                    <TextField
                        id="country"
                        label="country"
                        value={country}
                        fullWidth
                        onChange={(event) => {
                            setCountry(event.target.value);
                        }}
                    />
                </Grid2>
                <Grid2 size={6}>
                    <TextField
                        id="state"
                        label="state"
                        value={state}
                        fullWidth
                        onChange={(event) => {
                            setState(event.target.value);
                        }}
                    />
                </Grid2>
                <Grid2 size={6}>
                    <TextField
                        id="city"
                        label="city"
                        value={city}
                        fullWidth
                        onChange={(event) => {
                            setCity(event.target.value);
                        }}
                    />
                </Grid2>
                <Grid2 size={6}>
                    <TextField
                        id="postcode"
                        label="postcode"
                        value={postcode}
                        fullWidth
                        onChange={(event) => {
                            setPostcode(event.target.value);
                        }}
                    />
                </Grid2>
                <TextField
                    id="about"
                    label="about"
                    value={about}
                    fullWidth
                    multiline
                    rows={4}
                    onChange={(event) => {
                        setAbout(event.target.value);
                    }}
                />
                <Button variant="contained" size="large" onClick={handleClick}>
                    Save
                </Button>
            </Grid2>
        </Paper>
    );
}

"use client";

import React, { useState } from "react";
import axios from "axios";

const RegistrationForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [phone, setphone] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log(email, password);
		const data = {
			email,
			password,
			name,
			phone,
		};

		try {
			const response = await axios.post("/api/auth/register", data);
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
		localStorage.setItem("userId", response.data.user.id);
		} catch (error) {
			console.error("Registration failed", error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>  
			<input
				type="text"
				placeholder="Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				required
			/>
			<input
				type="num'"
				placeholder="Phone Number"
				value={phone}
				onChange={(e) => setphone(e.target.value)}
				required
			/>
			<button type="submit">Register</button>
		</form>
	);
};

export default RegistrationForm;

/** @type {import('next').NextConfig} */
require('dotenv').config();
const nextConfig = {
	reactStrictMode: true,
	env: {
		API_USER: process.env.API_USER,
		APIU_URL: process.env.APIU_URL,
		APIS_URL: process.env.APIS_URL,
		APIP_URL: process.env.APIP_URL,
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
		PORT: process.env.PORT,
	},
	images: {
		// loader: 'cloudinary',
		domains: ["res.cloudinary.com"],
	}
};

module.exports = nextConfig;

/** @type {import('tailwindcss').Config} */
import { defineConfig } from "tailwindcss";

export default defineConfig({
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-sans)"], // pakai CSS variable Geist
            },
        },
    },
    plugins: [],
});
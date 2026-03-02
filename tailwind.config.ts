import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "bg-primary": "#0A0A0F",
                "bg-secondary": "#12121A",
                gold: "#C9A84C",
                "gold-light": "#E2C97E",
                "text-primary": "#F5F1EB",
                "text-secondary": "#8A8A9A",
            },
            fontFamily: {
                serif: ['"Playfair Display"', "Georgia", "serif"],
                sans: ['"DM Sans"', "system-ui", "sans-serif"],
            },
            animation: {
                "float": "float 3s ease-in-out infinite",
                "glow": "glow 2s ease-in-out infinite",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-8px)" },
                },
                glow: {
                    "0%, 100%": { boxShadow: "0 0 20px rgba(201, 168, 76, 0.15)" },
                    "50%": { boxShadow: "0 0 40px rgba(201, 168, 76, 0.3)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;

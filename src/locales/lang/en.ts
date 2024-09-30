export default {
    login: {
        title: "Welcome to Nexus",
        description: "Please sign in below.",
        password: "Password",
        mainBtn: "Continue with Email",
        googleBtn: "Continue with Google",
        form: {
            email: {
                required: "Email address is required",
                mail: "Email is invalid",
            },
            password: {
                required: "Password is required",
                length: "Password must be at least 8 characters long",
            },
            message: {
                ntExtUser: "User does not exist!",
                invalid: "Invalid fields!",
                cfEmail: "Confirmation email sent!",
                invalidCr: "Invalid credentials!",
                error: "Something went wrong, please try again!"
            }
        }
    },
    theme: {
        dark: "Dark",
        light: "Light",
        system: "System",
    },
} as const;

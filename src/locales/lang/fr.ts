export default {
    login: {
        title: "Bienvenue sur Nexus",
        description: "Veuillez vous connecter ci-dessous.",
        password: "Mot de passe",
        mainBtn: "Continuer avec Email",
        googleBtn: "Continuer avec Google",
        form: {
            email: {
                required: "Veuillez renseigner ce champ.",
                mail: "L'email est invalide",
            },
            password: {
                required: "Veuillez renseigner ce champ.",
                length: "Le mot de passe doit comporter au moins 8 caractères",
            },
            message: {
                ntExtUser: "L'utilisateur n'existe pas!",
                invalid: "Champs invalides!",
                cfEmail: "Email de confirmation envoyé!",
                invalidCr: "Identifiants non valides!",
                error: "Une erreur s'est produite, veuillez réessayer!"
            }
        }
    },
    theme: {
        dark: "Sombre",
        light: "Clair",
        system: "Système",
    },
} as const;
import {auth} from "@/auth";
import {apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes} from "../route";
import {locales} from "@/i18n";
import createIntlMiddleware from "next-intl/middleware"
import {NextRequest} from "next/server";

const intlMiddleware = createIntlMiddleware({
    locales,
    defaultLocale: "en",
});

const authMiddleware = auth((req) => {
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return;
    }

    if (!isLoggedIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }

        const encodedCallbackUrl = encodeURIComponent(callbackUrl);

        return Response.redirect(new URL(
            `/signin?callbackUrl=${encodedCallbackUrl}`,
            nextUrl
        ));
    }

    return;
})

export default function middleware(req: NextRequest) {
    /*const publicPathnameRegex = RegExp(
        `^(/(<span class="math-inline">\{locales\.join\("\|"\)\}\)\)?\(</span>{publicPages.flatMap((p) => (p === "/" ? ["", "/"] : p)).join("|")})/?$`,
        "i"
    );*/
    const publicPathnameRegex = RegExp(
        `^(/(<span class="math-inline">{locales.join("")}))?(</span>{publicPages.flatMap((p) => (p === "/" ? [", /] : p)).join(")})/?$`,
        "i"
    );

    const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

    if (isPublicPage) {
        return intlMiddleware(req); // Apply internationalization for public pages
    } else {
        return (authMiddleware as any)(req); // Apply authentication logic for non-public pages
    }
}

export const config = {
    matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)']
}
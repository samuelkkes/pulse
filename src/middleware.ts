import {createI18nMiddleware} from 'next-international/middleware'
import {NextRequest} from 'next/server'
import {locales} from "@/locales";
import {auth} from "@/auth";
import {apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes} from "../route";

const I18nMiddleware = createI18nMiddleware({
    locales,
    defaultLocale: 'fr',
    urlMappingStrategy: 'rewrite'
})

export function middleware(request: NextRequest) {
    return I18nMiddleware(request)
}

export default auth((req) => {
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;

    console.log(isLoggedIn);

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return ;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return;
    }

    if (!isLoggedIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search){
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

export const config = {
    matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)']
}
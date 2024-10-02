import {withIntl} from "@/middlewares/withIntl";
import {withAuth} from "@/middlewares/withAuth";
import {chain} from "@/middlewares/chain";

/*
const I18nMiddleware = createI18nMiddleware({
    locales,
    defaultLocale: 'fr',
})
export function middleware(request: NextRequest) {
    return I18nMiddleware(request)
}

export default auth((req) => {
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;

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
*/

export default chain([withIntl, withAuth]);

export const config = {
    matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)']
}
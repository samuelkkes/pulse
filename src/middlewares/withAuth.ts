import {CustomMiddleware} from "@/middlewares/chain";
import {NextFetchEvent, NextRequest, NextResponse} from "next/server";
import {apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes} from "../../route";
import {auth} from "@/auth";

export const withAuth = (middleware: CustomMiddleware): CustomMiddleware => {
    return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
        const session = await auth();

        const isApiAuthRoute = request.nextUrl.pathname.startsWith(apiAuthPrefix);
        const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);
        const isAuthRoute = authRoutes.includes(request.nextUrl.pathname);

        if (isApiAuthRoute) {
            return ;
        }

        if (isAuthRoute) {
            if (session) {
                return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.nextUrl));
            }
            return;
        }

        if (!session && !isPublicRoute) {
            let callbackUrl = request.nextUrl.pathname;
            if (request.nextUrl.search){
                callbackUrl += request.nextUrl.search;
            }

            const encodedCallbackUrl = encodeURIComponent(callbackUrl);

            return Response.redirect(new URL(
                `/signin?callbackUrl=${encodedCallbackUrl}`,
                request.nextUrl
            ));
        }

        return middleware(request, event, response);
    }
}
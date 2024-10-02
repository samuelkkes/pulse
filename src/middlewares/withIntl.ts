import {createI18nMiddleware} from "next-international/middleware";
import {locales} from "@/locales";
import {NextFetchEvent, NextRequest, NextResponse} from "next/server";
import {CustomMiddleware} from "@/middlewares/chain";

const I18nMiddleware = createI18nMiddleware({
    locales,
    defaultLocale: 'fr',
})

export function withIntl(middleware: CustomMiddleware) {
    return async (
        request: NextRequest,
        event: NextFetchEvent,
        response: NextResponse
    ) => {
        I18nMiddleware(request)
        return middleware(request, event, response);
    }
}
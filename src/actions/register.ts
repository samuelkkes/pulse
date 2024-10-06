"use server";

import {db} from "@/lib/db";
import {getUserByEmail} from "@/data/user";

export const register = async () => {
    const email = "samuelkkes19@gmail.com";
    const name = "Samuel Eli Kougbam"


    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return {error: "Email already in use!"};
    }

    await db.user.create({
        data: {
            name,
            email
        }
    });
}
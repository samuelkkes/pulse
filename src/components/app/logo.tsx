import Link from 'next/link'
import Image from 'next/image'
import LogoImg from '@/public/images/logo.svg'

interface ILogo {
    withText?: boolean
    link?: string
    size?: number
}

export default function Logo({withText = true, link = "/home", size = 38}: ILogo) {
    return (
        <Link className="group/logo flex cursor-pointer select-none items-center gap-x-1 text-muted-fg" href={link}>
            <Image src={LogoImg} width={size} height={size} priority alt="Pulse logo"/>
            {withText && (
                <span className="font-mono text-base font-bold transition-colors duration-300 ease-in-out group-hover/logo:text-fg sm:text-sm">
                    Pulse
                </span>
            )}
        </Link>
    )
}
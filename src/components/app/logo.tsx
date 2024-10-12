import Link from 'next/link'
import Image from 'next/image'
import LogoImg from '@/public/images/logo.svg'

interface ILogo {
    withText?: boolean
}

export default function Logo({withText = true}: ILogo) {
    return (
        <Link className="group flex cursor-pointer select-none items-center gap-x-2" href={"/home"}>
            <Image src={LogoImg} width={38} height={38} priority alt="Pulse logo"/>
            {withText && (
                <span className="font-mono text-base font-bold transition-colors duration-300 ease-in-out group-hover:text-fg">
                    Pulse
                </span>
            )}
        </Link>
    )
}
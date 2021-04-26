import Link from "next/link";

export default function Navbar() {
    return (
        <div className="absolute w-full z-20">
            <div className="">
                <ul className="px-10 py-4 shadow-md flex justify-between w-full">
                    <li className="uppercase">
                        <Link href="/">
                            home
                        </Link>
                    </li>
                    <li>Call us: {' '}
                        <button className="bg-yellow-900 text-white text-xs rounded-full py-2 px-4">1234567899</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}
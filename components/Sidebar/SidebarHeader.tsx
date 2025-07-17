import Image from "next/image"
import Link from "next/link"

const SidebarHeader = () => {
  return (
    <div className="size-full bg-secondary flex items-center justify-center">
        <Link href={"/"} className="relative size-12 lg:size-24">
          <Image src={"/teamLogo.svg"} fill alt="Logo" className="size-4" />
        </Link>
      </div>
  )
}
export default SidebarHeader
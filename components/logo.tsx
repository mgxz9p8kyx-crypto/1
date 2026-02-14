import Image from "next/image"

export default function Logo({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <div className={`relative ${className} rounded-full overflow-hidden`}>
      <Image
        src="/images/logo-new.jpeg"
        alt="Qabyo-Tire Trading Company Logo"
        width={400}
        height={400}
        className="w-full h-full object-cover"
        priority
      />
    </div>
  )
}

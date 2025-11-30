import Image from "next/image"

export default function Logo({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <div className={className}>
      <Image
        src="/images/e7a4258d-73bb-4fbd-9935.jpeg"
        alt="Qabyo-Tire Trading Company Logo"
        width={240}
        height={240}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  )
}

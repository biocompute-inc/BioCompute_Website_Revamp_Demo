'use client';
import Image from "next/image";
import { motion } from "framer-motion";
export default function OurPartners() {
  return (
    <>
      <div className="bg-white xl:pb-5 xs:pt-8 sm:pt-10 xl:pt-4 pb-3 xs:pb-4 px-6 xs:px-8 sm:px-10">
        <div className="flex items-center justify-center gap-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl text-center font-semibold font-inter text-black/80 whitespace-nowrap">
            WE&apos;RE BACKED BY
          </h1>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
      </div>
      <div className="w-full mb-0 inline-flex flex-nowrap overflow-hidden px-4 xs:px-5 sm:px-6 pb-0 bg-white">
        <motion.div
          className="flex gap-8 xs:gap-10 py-2 sm:gap-12 md:gap-14 flex-none pr-8 xs:pr-10 sm:pr-12 md:pr-14"
          animate={{
            translateX: "-50%",
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
        >
          <Image src="/wtfweb.png" width={144} height={40} className="w-[144px] h-[40px]" alt="WTF" />
          <Image src="/Bits.png" width={144} height={56} className="w-[144px] h-[56px]" alt="BITS Pilani" />
          <Image src="/meity.png" width={120} height={56} className="w-[120px] h-[56px]" alt="Meity" />
          <Image src="/Gradcap.png" width={160} height={40} className="w-[160px] h-[40px]" alt="Grad capital" />
          <Image src="/Nucleate.png" width={192} height={32} className="w-[192px] h-[32px]" alt="Nucleate" />
          <Image src="/ccamp.png" width={144} height={48} className="w-[144px] h-[48px]" alt="CCAMP" />
          <Image src="/nidhi.jpg" width={144} height={48} className="w-[144px] h-[48px]" alt="DST NIDHI" />
          <Image src="/Savant.svg" width={144} height={48} className="w-[144px] h-[48px]" alt="Savant" />
          <Image src="/susmafia.png" width={160} height={48} className="w-[160px] h-[48px]" alt="Susmafia" />
          <Image src="/Meractus.png" width={144} height={48} className="w-[144px] h-[48px]" alt="Meractus" />

          {/*Second set*/}

          <Image src="/wtfweb.png" width={144} height={40} className="w-[144px] h-[40px]" alt="WTF" />
          <Image src="/Bits.png" width={144} height={56} className="w-[144px] h-[56px]" alt="BITS Pilani" />
          <Image src="/meity.png" width={120} height={56} className="w-[120px] h-[56px]" alt="Meity" />
          <Image src="/Gradcap.png" width={160} height={40} className="w-[160px] h-[40px]" alt="Grad capital" />
          <Image src="/Nucleate.png" width={192} height={32} className="w-[192px] h-[32px]" alt="Nucleate" />
          <Image src="/ccamp.png" width={144} height={48} className="w-[144px] h-[48px]" alt="CCAMP" />
          <Image src="/nidhi.jpg" width={144} height={48} className="w-[144px] h-[48px]" alt="DST NIDHI" />
          <Image src="/Savant.svg" width={144} height={48} className="w-[144px] h-[48px]" alt="Savant" />
          <Image src="/susmafia.png" width={160} height={48} className="w-[160px] h-[48px]" alt="Susmafia" />
          <Image src="/Meractus.png" width={144} height={48} className="w-[144px] h-[48px]" alt="Meractus" />
        </motion.div>
      </div>
    </>
  );
};
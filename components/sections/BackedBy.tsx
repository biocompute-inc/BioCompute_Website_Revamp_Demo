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

      {/* First Marquee - Moving Left */}
      <div className="w-full inline-flex flex-nowrap overflow-hidden bg-white pb-4">
        <motion.div
          className="flex gap-8 xs:gap-10 sm:gap-12 md:gap-14 items-center"
          animate={{
            x: "-50%",
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
        >
          {/* First set */}
          <Image src="/wtfweb.png" width={144} height={40} className="w-[120px] xs:w-[144px] h-auto flex-shrink-0" alt="WTF" />
          <Image src="/Bits.png" width={144} height={56} className="w-[120px] xs:w-[144px] h-auto flex-shrink-0" alt="BITS Pilani" />
          <Image src="/meity.png" width={120} height={56} className="w-[100px] xs:w-[120px] h-auto flex-shrink-0" alt="Meity" />
          <Image src="/Gradcap.png" width={160} height={40} className="w-[130px] xs:w-[160px] h-auto flex-shrink-0" alt="Grad capital" />
          <Image src="/Nucleate.png" width={192} height={32} className="w-[150px] xs:w-[192px] h-auto flex-shrink-0" alt="Nucleate" />

          {/* Duplicate set for seamless loop */}
          <Image src="/wtfweb.png" width={144} height={40} className="w-[120px] xs:w-[144px] h-auto flex-shrink-0" alt="WTF" />
          <Image src="/Bits.png" width={144} height={56} className="w-[120px] xs:w-[144px] h-auto flex-shrink-0" alt="BITS Pilani" />
          <Image src="/meity.png" width={120} height={56} className="w-[100px] xs:w-[120px] h-auto flex-shrink-0" alt="Meity" />
          <Image src="/Gradcap.png" width={160} height={40} className="w-[130px] xs:w-[160px] h-auto flex-shrink-0" alt="Grad capital" />
          <Image src="/Nucleate.png" width={192} height={32} className="w-[150px] xs:w-[192px] h-auto flex-shrink-0" alt="Nucleate" />
        </motion.div>
      </div>

      {/* Second Marquee - Moving Right */}
      <div className="w-full inline-flex flex-nowrap overflow-hidden bg-white pb-6">
        <motion.div
          className="flex gap-8 xs:gap-10 sm:gap-12 md:gap-14 items-center"
          initial={{
            x: "0%",
          }}
          animate={{
            x: "50%",
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
        >
          {/* First set */}
          <Image src="/ccamp.png" width={144} height={48} className="w-[120px] xs:w-[144px] h-auto flex-shrink-0" alt="CCAMP" />
          <Image src="/nidhi.jpg" width={144} height={48} className="w-[120px] xs:w-[144px] h-auto flex-shrink-0" alt="DST NIDHI" />
          <Image src="/Savant.svg" width={144} height={48} className="w-[120px] xs:w-[144px] h-auto flex-shrink-0" alt="Savant" />
          <Image src="/susmafia.png" width={160} height={48} className="w-[130px] xs:w-[160px] h-auto flex-shrink-0" alt="Susmafia" />
          <Image src="/Meractus.png" width={144} height={48} className="w-[120px] xs:w-[144px] h-auto flex-shrink-0" alt="Meractus" />

          {/* Duplicate set for seamless loop */}
          <Image src="/ccamp.png" width={144} height={48} className="w-[120px] xs:w-[144px] h-auto flex-shrink-0" alt="CCAMP" />
          <Image src="/nidhi.jpg" width={144} height={48} className="w-[120px] xs:w-[144px] h-auto flex-shrink-0" alt="DST NIDHI" />
          <Image src="/Savant.svg" width={144} height={48} className="w-[120px] xs:w-[144px] h-auto flex-shrink-0" alt="Savant" />
          <Image src="/susmafia.png" width={160} height={48} className="w-[130px] xs:w-[160px] h-auto flex-shrink-0" alt="Susmafia" />
          <Image src="/Meractus.png" width={144} height={48} className="w-[120px] xs:w-[144px] h-auto flex-shrink-0" alt="Meractus" />
        </motion.div>
      </div>
    </>
  );
};
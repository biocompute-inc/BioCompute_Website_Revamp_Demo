'use client';
import Image from "next/image";
import { motion } from "framer-motion";
export default function OurPartners() {
  return (
    <>
      <h1 className="-mt-25 text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-center font-bold font-inter p-6 xs:p-8 sm:p-10 pb-3 xs:pb-4 text-black bg-white">We&apos;re backed by</h1>
      <div className="w-full mb-15 inline-flex flex-nowrap overflow-hidden p-4 xs:p-5 sm:p-6 bg-white">
        <motion.div
          className="flex gap-8 xs:gap-10 sm:gap-12 md:gap-14 flex-none pr-8 xs:pr-10 sm:pr-12 md:pr-14"
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
          <Image src="/wtfweb.png" width={180} height={50} className="w-[120px] xs:w-[140px] sm:w-[160px] md:w-[180px] h-auto" alt="WTF" />
          <Image src="/Bits.png" width={180} height={70} className="w-[120px] xs:w-[140px] sm:w-[160px] md:w-[180px] h-auto" alt="BITS Pilani" />
          <Image src="/meity.png" width={150} height={70} className="w-[100px] xs:w-[120px] sm:w-[135px] md:w-[150px] h-auto" alt="Meity" />
          <Image src="/Gradcap.png" width={200} height={50} className="w-[140px] xs:w-[160px] sm:w-[180px] md:w-[200px] h-auto" alt="Grad capital" />
          <Image src="/Nucleate.png" width={240} height={40} className="w-[160px] xs:w-[180px] sm:w-[210px] md:w-[240px] h-auto" alt="Nucleate" />
          <Image src="/ccamp.png" width={180} height={60} className="w-[120px] xs:w-[140px] sm:w-[160px] md:w-[180px] h-auto" alt="CCAMP" />
          <Image src="/nidhi.jpg" width={180} height={60} className="w-[120px] xs:w-[140px] sm:w-[160px] md:w-[180px] h-auto" alt="DST NIDHI" />
          <Image src="/Savant.svg" width={180} height={60} className="w-[120px] xs:w-[140px] sm:w-[160px] md:w-[180px] h-auto" alt="Savant" />
          <Image src="/susmafia.png" width={200} height={60} className="w-[140px] xs:w-[160px] sm:w-[180px] md:w-[200px] h-auto" alt="Susmafia" />
          <Image src="/Meractus.png" width={180} height={60} className="w-[120px] xs:w-[140px] sm:w-[160px] md:w-[180px] h-auto" alt="Meractus" />

          {/*Second set*/}

          <Image src="/wtfweb.png" width={180} height={50} className="w-[120px] xs:w-[140px] sm:w-[160px] md:w-[180px] h-auto" alt="WTF" />
          <Image src="/Bits.png" width={180} height={70} className="w-[120px] xs:w-[140px] sm:w-[160px] md:w-[180px] h-auto" alt="BITS Pilani" />
          <Image src="/meity.png" width={150} height={70} className="w-[100px] xs:w-[120px] sm:w-[135px] md:w-[150px] h-auto" alt="Meity" />
          <Image src="/Gradcap.png" width={200} height={50} className="w-[140px] xs:w-[160px] sm:w-[180px] md:w-[200px] h-auto" alt="Grad capital" />
          <Image src="/Nucleate.png" width={240} height={40} className="w-[160px] xs:w-[180px] sm:w-[210px] md:w-[240px] h-auto" alt="Nucleate" />
          <Image src="/ccamp.png" width={180} height={60} className="w-[120px] xs:w-[140px] sm:w-[160px] md:w-[180px] h-auto" alt="CCAMP" />
          <Image src="/nidhi.jpg" width={180} height={60} className="w-[120px] xs:w-[140px] sm:w-[160px] md:w-[180px] h-auto" alt="DST NIDHI" />
          <Image src="/Savant.svg" width={180} height={60} className="w-[120px] xs:w-[140px] sm:w-[160px] md:w-[180px] h-auto" alt="Savant" />
          <Image src="/susmafia.png" width={200} height={60} className="w-[140px] xs:w-[160px] sm:w-[180px] md:w-[200px] h-auto" alt="Susmafia" />
          <Image src="/Meractus.png" width={180} height={60} className="w-[120px] xs:w-[140px] sm:w-[160px] md:w-[180px] h-auto" alt="Meractus" />
        </motion.div>
      </div>
    </>
  );
};
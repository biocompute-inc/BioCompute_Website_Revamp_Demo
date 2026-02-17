'use client';
import { motion } from "motion/react";
import Image from "next/image";

export default function OurPartners() {
  return (
    <>
      <div className="bg-white xl:pb-5 xs:pt-8 sm:pt-10 xl:pt-4 pb-3 xs:pb-4 px-6 xs:px-8 sm:px-10">
        <div className="flex items-center justify-center gap-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl text-center font-semibold font-inter text-black/70 whitespace-nowrap">
            We&apos;re Backed By
          </h1>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
      </div>

      {/* first marquee */}
      <div className="w-full mb-0 p-10 inline-flex flex-nowrap overflow-hidden px-4 xs:px-5 sm:px-6 bg-white">
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
          <motion.a
            href="https://www.wtfund.vc/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <Image src="/wtfweb.png" width={144} height={40} className="w-[144px] h-[40px]" alt="WTF" />
          </motion.a>
          <motion.a
            href="https://www.bits-pilani.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <Image src="/Bits.png" width={144} height={56} className="w-[144px] h-[56px]" alt="BITS Pilani" />
          </motion.a>
          <motion.a
            href="https://www.meity.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <Image src="/meity.png" width={120} height={56} className="w-[120px] h-[56px]" alt="Meity" />
          </motion.a>
          <motion.a
            href="https://grad.capital/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <Image src="/Gradcap.png" width={160} height={40} className="w-[160px] h-[40px]" alt="Grad capital" />
          </motion.a>
          <motion.a
            href="https://nucleate.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <Image src="/Nucleate.png" width={192} height={32} className="w-[192px] h-[32px]" alt="Nucleate" />
          </motion.a>
          <motion.a
            href="https://ccamp.res.in/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <Image src="/ccamp.png" width={144} height={48} className="w-[144px] h-[48px]" alt="CCAMP" />
          </motion.a>
          <motion.a
            href="https://www.nidhiprayas.in/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <Image src="/nidhi.jpg" width={144} height={48} className="w-[144px] h-[48px]" alt="DST NIDHI" />
          </motion.a>
          <motion.a
            href="https://www.savantcapital.in/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <Image src="/Savant.svg" width={144} height={48} className="w-[144px] h-[48px]" alt="Savant" />
          </motion.a>
          <motion.a
            href="https://www.susmafia.com/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <Image src="/susmafia.png" width={160} height={48} className="w-[160px] h-[48px]" alt="Susmafia" />
          </motion.a>
          <motion.a
            href="https://meractus.com/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <Image src="/Meractus.png" width={144} height={48} className="w-[144px] h-[48px]" alt="Meractus" />
          </motion.a>
          <motion.a
            href="https://www.1517fund.com/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <Image src="/1517.jpeg" width={160} height={48} className="w-[100px] h-[48px]" alt="1517 Fund" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/akothari/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <Image src="/akshaykothari.png" width={400} height={100} className="w-[150px] h-[60px]" alt="Akshay Kothari" />
          </motion.a>

          {/*Second set*/}

          <motion.a
            href="https://www.wtfund.vc/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <Image src="/wtfweb.png" width={144} height={40} className="w-[144px] h-[40px]" alt="WTF" />
          </motion.a>
          <motion.a
            href="https://www.bits-pilani.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <Image src="/Bits.png" width={144} height={56} className="w-[144px] h-[56px]" alt="BITS Pilani" />
          </motion.a>
          <motion.a
            href="https://www.meity.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <Image src="/meity.png" width={120} height={56} className="w-[120px] h-[56px]" alt="Meity" />
          </motion.a>
          <motion.a
            href="https://grad.capital/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <Image src="/Gradcap.png" width={160} height={40} className="w-[160px] h-[40px]" alt="Grad capital" />
          </motion.a>
          <motion.a
            href="https://nucleate.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <Image src="/Nucleate.png" width={192} height={32} className="w-[192px] h-[32px]" alt="Nucleate" />
          </motion.a>
          <motion.a
            href="https://ccamp.res.in/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <Image src="/ccamp.png" width={144} height={48} className="w-[144px] h-[48px]" alt="CCAMP" />
          </motion.a>
          <motion.a
            href="https://www.nidhiprayas.in/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <Image src="/nidhi.jpg" width={144} height={48} className="w-[144px] h-[48px]" alt="DST NIDHI" />
          </motion.a>
          <motion.a
            href="https://www.savantcapital.in/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <Image src="/Savant.svg" width={144} height={48} className="w-[144px] h-[48px]" alt="Savant" />
          </motion.a>
          <motion.a
            href="https://www.susmafia.com/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <Image src="/susmafia.png" width={160} height={48} className="w-[160px] h-[48px]" alt="Susmafia" />
          </motion.a>
          <motion.a
            href="https://meractus.com/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <Image src="/Meractus.png" width={144} height={48} className="w-[144px] h-[48px]" alt="Meractus" />
          </motion.a>
          <motion.a
            href="https://www.1517fund.com/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <Image src="/1517.png" width={160} height={48} className="w-[160px] h-[48px]" alt="1517 Fund" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/akothari/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <Image src="/akshaykothari.png" width={144} height={48} className="w-[144px] h-[48px]" alt="Akshay Kothari" />
          </motion.a>
        </motion.div>
      </div>
    </>
  );
};
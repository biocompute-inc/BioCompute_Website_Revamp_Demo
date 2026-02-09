"use client";
import Image from "next/image";

export default function Team() {
    const team = [
        {
            avatar: "/Anaghaupdated.jpeg",
            name: "Anagha Rajesh",
            title: "Founder"
        },
        {
            avatar: "/Akansha.jpg",
            name: "Akanksha Dasmohapatra",
            title: "Chief Product Officer"
        },
        {
            avatar: "/Naveen.png",
            name: "Naveen",
            title: "Electronics Engineer"
        },
        {
            avatar: "/SaiPooja.jpg",
            name: "Sai Pooja",
            title: "Bio-Engineer"
        },
    ]
    return (
        <>
            <section className="p-6 sm:p-10 md:p-14" style={{ backgroundImage: `url(/Background.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="max-w-screen-xl mx-auto p-4 sm:p-6 md:p-10">
                    <div className="max-w-xl mx-auto text-center">
                        <h3 className="text-gray-800 text-2xl sm:text-3xl md:text-4xl font-semibold">
                            Our team
                        </h3>
                        <p className="text-gray-600 max-w-lg mx-auto text-base sm:text-lg pt-4 sm:pt-6 px-4">
                            Working together to make a difference
                        </p>
                    </div>
                    <div className="mt-8 sm:mt-10 md:mt-12 flex justify-center">
                        <ul className="grid gap-6 sm:gap-8 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl w-full px-4">
                            {
                                team.map((item, idx) => (
                                    <li key={idx} className="flex flex-col items-center">
                                        <div className="w-full max-w-[280px] h-56 sm:h-60 md:h-64">
                                            <Image
                                                src={item.avatar}
                                                width={280}
                                                height={320}
                                                className="w-full h-full object-cover object-center shadow-md rounded-xl"
                                                alt={item.name}
                                            />
                                        </div>
                                        <div className="mt-4 text-center">
                                            <h4 className="text-base sm:text-lg text-gray-700 font-semibold">{item.name}</h4>
                                            <p className="text-sm sm:text-base text-neutral-800">{item.title}</p>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </section>
        </>

    );
}   

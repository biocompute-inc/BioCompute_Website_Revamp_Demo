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
            <section className="p-14" style={{ backgroundImage: `url(/Background.jpg)` }}>
                <div className="max-w-screen-xl mx-auto p-10 md:px-8">
                    <div className="max-w-xl mx-auto sm:text-center">
                        <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                            Our team
                        </h3>
                        <p className="text-gray-600 max-w-lg mx-auto text-lg pt-6">
                            Working together to make a difference
                        </p>
                    </div>
                    <div className="mt-12 flex justify-evenly">
                        <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                            {
                                team.map((item, idx) => (
                                    <li key={idx}>
                                        <div className="w-full h-60 sm:h-52 md:h-56">
                                            <Image
                                                src={item.avatar}
                                                width={215}
                                                height={240}
                                                className="w-[215px] h-full object-cover object-center shadow-md rounded-xl"
                                                alt=""
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <h4 className="text-lg text-gray-700 font-semibold">{item.name}</h4>
                                            <p className="text-neutral-800">{item.title}</p>
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

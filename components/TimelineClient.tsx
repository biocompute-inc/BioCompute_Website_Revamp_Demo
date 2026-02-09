'use client';

import React from 'react';
import { Timeline } from 'primereact/timeline';
import { motion } from 'framer-motion';

interface TimelineItem {
    title: string;
    cardTitle: string;
    cardSubtitle: string;
    cardDetailedText: string;
}

interface TimelineClientProps {
    data: TimelineItem[];
}

export default function TimelineClient({ data }: TimelineClientProps) {
    // Template for the Marker (The dot on the line)
    const customizedMarker = (item: TimelineItem) => {
        return (
            <div className="flex w-4 h-4 bg-purple-500 rounded-full ring-4 ring-purple-900/50 shadow-[0_0_15px_#a855f7] z-10"></div>
        );
    };

    // Template for the Content (The card)
    const customizedContent = (item: TimelineItem) => {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="flex flex-col mb-8 backdrop-blur-md bg-white/5 border border-purple-500/20 rounded-2xl p-6 shadow-xl hover:bg-white/10 transition-colors duration-300"
            >
                <span className="text-purple-400 text-xs font-bold tracking-widest uppercase mb-2 bg-purple-900/20 px-3 py-1 rounded-full w-fit border border-purple-500/30">
                    {item.title}
                </span>
                <h3 className="text-white text-xl font-bold mb-1">{item.cardTitle}</h3>
                <h4 className="text-purple-300 text-sm font-semibold mb-3">{item.cardSubtitle}</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{item.cardDetailedText}</p>
            </motion.div>
        );
    };

    return (
        <Timeline
            value={data}
            align="alternate"
            marker={customizedMarker}
            content={customizedContent}
        />
    );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

interface BlogContentProps {
    content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Run this on EVERY render to survive DOM resets
    useEffect(() => {
        const container = contentRef.current;
        if (!container) return;

        const images = container.querySelectorAll('img');

        images.forEach((img) => {
            if (img.closest('[data-image-wrapper]')) return;

            // --- MISSION: DESTROY THE "ICON BELOW" ---
            const parentAnchor = img.closest('a');
            if (parentAnchor) {
                parentAnchor.replaceWith(img);
            }

            let sibling = img.nextElementSibling;
            while (sibling && (['A', 'SVG', 'BUTTON', 'SPAN'].includes(sibling.tagName))) {
                const toRemove = sibling;
                sibling = sibling.nextElementSibling;
                toRemove.remove();
            }

            // --- CREATE CUSTOM WRAPPER ---
            const wrapper = document.createElement('div');
            wrapper.setAttribute('data-image-wrapper', 'true');
            wrapper.className = 'relative inline-block group cursor-zoom-in';

            if (img.parentNode) {
                img.parentNode.insertBefore(wrapper, img);
                wrapper.appendChild(img);
            }

            // --- ADD HOVER ICON ---
            const iconDiv = document.createElement('div');
            iconDiv.className = 'absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10';

            iconDiv.innerHTML = `
                <div class="bg-black/50 text-white p-2 rounded-lg backdrop-blur-sm shadow-sm border border-white/20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                </div>
            `;
            wrapper.appendChild(iconDiv);
        });
    });

    const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        const img = target.closest('img');

        if (img && contentRef.current?.contains(img)) {
            e.preventDefault();
            e.stopPropagation();
            const src = img.getAttribute('src');
            if (src) setSelectedImage(src);
        }
    };

    return (
        <>
            <div
                ref={contentRef}
                onClick={handleContentClick}
                className="prose prose-lg prose-gray max-w-none 
                    [&_img]:transition-all [&_img]:duration-300 [&_img]:rounded-lg
                    [&_img+a]:hidden [&_img~a]:hidden [&_img+svg]:hidden"
                dangerouslySetInnerHTML={{ __html: content }}
            />

            <DialogPrimitive.Root open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
                <DialogPrimitive.Portal>
                    <DialogPrimitive.Overlay
                        className="fixed inset-0 bg-black/95 z-[99998] backdrop-blur-sm animate-in fade-in duration-300"
                    />

                    <DialogPrimitive.Content
                        className="fixed inset-0 z-[99999] flex items-center justify-center p-4 outline-none"
                    >
                        <DialogPrimitive.Title className="sr-only">
                            Enlarged view
                        </DialogPrimitive.Title>

                        {/* 1. Added onClick here: This div covers the whole screen. 
                              Clicking it (the empty space) will now close the modal.
                        */}
                        <div
                            className="relative w-full h-full flex items-center justify-center"
                            onClick={() => setSelectedImage(null)}
                        >

                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 md:top-10 md:right-10 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full shadow-2xl hover:scale-110 transition-transform z-[100001] border border-white/10"
                                aria-label="Close"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {selectedImage && (
                                /* 2. Reduced size: Changed from max-w-[70vw] to max-w-[50vw] 
                                */
                                <div className="relative max-w-[50vw] max-h-[50vh] flex items-center justify-center">
                                    <img
                                        src={selectedImage}
                                        alt="Enlarged"
                                        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
                                        style={{ filter: 'none', WebkitFilter: 'none' }}
                                        // Prevents the "background click" from firing when you click the image itself
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </div>
                            )}
                        </div>
                    </DialogPrimitive.Content>
                </DialogPrimitive.Portal>
            </DialogPrimitive.Root>
        </>
    );
}
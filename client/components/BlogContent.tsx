'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/client/components/ui/dialog';

interface BlogContentProps {
    content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageClick = useCallback((imageSrc: string) => {
        setSelectedImage(imageSrc);
    }, []);

    useEffect(() => {
        const container = contentRef.current;
        if (!container) return;

        const images = container.querySelectorAll('img');

        images.forEach((img) => {
            // Check if already processed to avoid duplication
            if (img.closest('.image-wrapper-with-enlarge')) {
                return;
            }

            // Handle parent anchor tags - disable them
            const parentAnchor = img.closest('a');
            if (parentAnchor) {
                parentAnchor.style.cursor = 'default';
                parentAnchor.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                };
            }

            // Create wrapper
            const wrapper = document.createElement('div');
            wrapper.className = 'image-wrapper-with-enlarge relative group w-full inline-block font-sans';

            // Insert wrapper
            const parent = img.parentNode;
            if (parent) {
                parent.insertBefore(wrapper, img);
                wrapper.appendChild(img);
            }

            // Style the image
            img.style.cursor = 'zoom-in';
            img.classList.add('transition-all', 'duration-300', 'group-hover:brightness-95');

            // Image click handler
            const imgSrc = img.src;
            const openModal = (e: Event) => {
                e.preventDefault();
                e.stopPropagation();
                handleImageClick(imgSrc);
            };

            img.onclick = openModal;

            // Enlarge Button (Icon)
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'absolute top-3 right-3 p-2.5 bg-purple hover:bg-purple/90 text-white rounded-full shadow-lg border-2 border-white opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 hover:scale-110 backdrop-blur-sm pointer-events-auto flex items-center justify-center';
            button.setAttribute('aria-label', 'View full size');

            button.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                </svg>
            `;

            button.onclick = openModal;

            wrapper.appendChild(button);
        });

    }, [content, handleImageClick]);

    return (
        <>
            <div
                ref={contentRef}
                className="prose prose-lg prose-gray max-w-none
          prose-headings:text-dark prose-headings:font-bold
          prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
          prose-p:text-gray-700 prose-p:leading-relaxed
          prose-a:text-purple prose-a:no-underline hover:prose-a:underline
          prose-strong:text-dark prose-strong:font-semibold
          prose-code:text-purple prose-code:bg-purple/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-gray-900 prose-pre:text-gray-100
          prose-blockquote:border-l-4 prose-blockquote:border-purple prose-blockquote:pl-4 prose-blockquote:italic
          prose-img:rounded-lg prose-img:shadow-lg
          prose-ul:list-disc prose-ol:list-decimal
          prose-li:text-gray-700"
                dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Lightbox Modal */}
            <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
                <DialogContent
                    className="max-w-none w-screen h-screen p-0 bg-transparent border-none shadow-none flex items-center justify-center focus:outline-none translate-x-0 translate-y-0 left-0 top-0 data-[state=open]:slide-in-from-left-0 data-[state=open]:slide-in-from-top-0 [&>button]:hidden"
                    onInteractOutside={() => setSelectedImage(null)}
                >
                    <DialogTitle className="sr-only">Enlarged Image View</DialogTitle>

                    {/* Close button - Fixed at top right of viewport */}
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-6 right-6 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-all z-[60] hover:scale-110 cursor-pointer border border-white/20"
                        aria-label="Close modal"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Image Container */}
                    <div
                        className="relative w-full h-full flex items-center justify-center p-4 sm:p-8 md:p-12 cursor-zoom-out"
                        onClick={() => setSelectedImage(null)}
                    >
                        {selectedImage && (
                            <img
                                src={selectedImage}
                                alt="Enlarged view"
                                className="max-w-full max-h-full object-contain rounded-sm shadow-2xl animate-in zoom-in-95 duration-300"
                                onClick={(e) => {
                                    e.stopPropagation(); // Don't close if clicking image itself
                                }}
                            />
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

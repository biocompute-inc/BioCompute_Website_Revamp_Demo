'use client';

import ScrollStack, { ScrollStackItem } from '@/client/components/ui/ScrollStack';
import React from 'react';

export default function CarouselPage() {
    return (
        <div className="min-h-screen bg-gray-900 p-4">
            <h1 className="text-4xl font-bold text-white text-center py-8">Scroll Stack Test</h1>

            <ScrollStack className="h-screen max-w-2xl mx-auto">
                <ScrollStackItem itemClassName="bg-red-500 flex items-center justify-center">
                    <h2 className="text-4xl font-bold text-white">Card 1</h2>
                </ScrollStackItem>

                <ScrollStackItem itemClassName="bg-blue-500 flex items-center justify-center">
                    <h2 className="text-4xl font-bold text-white">Card 2</h2>
                </ScrollStackItem>

                <ScrollStackItem itemClassName="bg-green-500 flex items-center justify-center">
                    <h2 className="text-4xl font-bold text-white">Card 3</h2>
                </ScrollStackItem>

                <ScrollStackItem itemClassName="bg-yellow-500 flex items-center justify-center">
                    <h2 className="text-4xl font-bold text-white">Card 4</h2>
                </ScrollStackItem>
            </ScrollStack>
        </div>
    );
}
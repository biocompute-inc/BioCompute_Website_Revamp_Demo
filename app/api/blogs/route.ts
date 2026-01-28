import { NextResponse } from 'next/server';
import { getSubstackBlogs } from '@/lib/blogs';

export const revalidate = 600; // ISR revalidation every 10 minutes

export async function GET() {
    try {
        const blogs = await getSubstackBlogs();
        return NextResponse.json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return NextResponse.json(
            { error: 'Failed to fetch blogs' },
            { status: 500 }
        );
    }
}

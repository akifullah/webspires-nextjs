import { notFound } from 'next/navigation';
import PostForm from '@/components/admin/PostForm';
import { getPostByIdAdmin } from '@/lib/blog';
import { getPostCategoryNames } from '@/lib/postCategories';

export const dynamic = 'force-dynamic';

export default async function EditPostPage({ params }) {
    const { id } = await params;
    const [post, categories] = await Promise.all([
        getPostByIdAdmin(id),
        getPostCategoryNames(),
    ]);
    if (!post) notFound();

    return <PostForm post={post} categories={categories} />;
}

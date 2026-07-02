import PostForm from '@/components/admin/PostForm';
import { getPostCategoryNames } from '@/lib/postCategories';

export const dynamic = 'force-dynamic';

export default async function NewPostPage() {
    const categories = await getPostCategoryNames();
    return <PostForm categories={categories} />;
}

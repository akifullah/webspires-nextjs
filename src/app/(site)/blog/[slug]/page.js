import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
    getPostBySlug,
    getAllPublishedSlugs,
    getRelatedPosts,
    getLatestPosts,
    getCategoriesWithCounts,
    getAllTags,
} from '@/lib/blog';
import { siteConfig } from '@/config/site';
import { formatDate } from '@/lib/format';
import Cover from '@/components/blog/Cover';
import BlogCard from '@/components/blog/BlogCard';
import BlogContent from '@/components/blog/BlogContent';
import BlogSidebar from '@/components/blog/BlogSidebar';
import FaqAccordion from '@/components/blog/FaqAccordion';
import ViewTracker from '@/components/blog/ViewTracker';

export const revalidate = false;
export const dynamicParams = true;

export async function generateStaticParams() {
    try {
        const slugs = await getAllPublishedSlugs();
        return slugs.map((s) => ({ slug: s.slug }));
    } catch {
        return [];
    }
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) {
        return { title: 'Post not found', robots: { index: false } };
    }

    const url = `${siteConfig.url}/blog/${post.slug}`;
    const title = post.seo.metaTitle || post.title;
    const description = post.seo.metaDescription || post.excerpt;
    const image =
        post.seo.ogImage ||
        post.coverImage ||
        `${siteConfig.url}/images/webspires-logo-icon.png`;
    const ogImage = image.startsWith('http') ? image : `${siteConfig.url}${image}`;

    return {
        title,
        description,
        keywords: post.seo.keywords?.length ? post.seo.keywords : post.tags,
        authors: [{ name: post.author }],
        alternates: { canonical: post.seo.canonicalUrl || url },
        robots: post.seo.noIndex
            ? { index: false, follow: false }
            : {
                  index: true,
                  follow: true,
                  googleBot: {
                      index: true,
                      follow: true,
                      'max-image-preview': 'large',
                      'max-snippet': -1,
                  },
              },
        openGraph: {
            type: 'article',
            url,
            title,
            description,
            siteName: siteConfig.name,
            publishedTime: post.publishedAt || undefined,
            modifiedTime: post.updatedAt || undefined,
            authors: [post.author],
            tags: post.tags,
            images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage],
            creator: siteConfig.twitter,
        },
    };
}

export default async function BlogPostPage({ params }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) notFound();

    const [related, latestPosts, categories, tags] = await Promise.all([
        getRelatedPosts(post, 3),
        getLatestPosts(5, post.slug),
        getCategoriesWithCounts(),
        getAllTags(20),
    ]);

    const url = `${siteConfig.url}/blog/${post.slug}`;
    const ogImage =
        post.seo.ogImage ||
        post.coverImage ||
        `${siteConfig.url}/images/webspires-logo-icon.png`;
    const imageAbs = ogImage.startsWith('http')
        ? ogImage
        : `${siteConfig.url}${ogImage}`;

    const articleLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        headline: post.title,
        description: post.seo.metaDescription || post.excerpt,
        image: [imageAbs],
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        author: { '@type': 'Person', name: post.author },
        publisher: {
            '@type': 'Organization',
            name: 'Webspires Limited',
            logo: {
                '@type': 'ImageObject',
                url: `${siteConfig.url}/images/webspires-logo-icon.png`,
            },
        },
        keywords: (post.seo.keywords?.length
            ? post.seo.keywords
            : post.tags
        ).join(', '),
        articleSection: post.category,
        wordCount: post.content.replace(/<[^>]+>/g, ' ').split(/\s+/).length,
    };

    const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: `${siteConfig.url}/blog`,
            },
            { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
    };

    const faqLd =
        post.faqs.length > 0
            ? {
                  '@context': 'https://schema.org',
                  '@type': 'FAQPage',
                  mainEntity: post.faqs.map((f) => ({
                      '@type': 'Question',
                      name: f.question,
                      acceptedAnswer: {
                          '@type': 'Answer',
                          text: f.answer,
                      },
                  })),
              }
            : null;

    const dateStr = formatDate(post.publishedAt || post.createdAt);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(articleLd).replace(/</g, '\\u003c'),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbLd).replace(
                        /</g,
                        '\\u003c'
                    ),
                }}
            />
            {faqLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(faqLd).replace(/</g, '\\u003c'),
                    }}
                />
            )}
            <ViewTracker slug={post.slug} />

            <article className="bg-white">
                {/* Centered title header */}
                <header className="border-b border-gray-100 bg-[#faf9f7] pt-28 pb-12">
                    <div className="mx-auto max-w-[860px] px-4 text-center sm:px-6">
                        <nav aria-label="Breadcrumb" className="mb-5">
                            <ol className="flex flex-wrap items-center justify-center gap-2 text-[13px] text-gray-500">
                                <li>
                                    <Link
                                        href="/"
                                        className="transition-colors hover:text-primary"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li aria-hidden="true" className="text-gray-400">
                                    /
                                </li>
                                <li>
                                    <Link
                                        href="/blog"
                                        className="transition-colors hover:text-primary"
                                    >
                                        Blog
                                    </Link>
                                </li>
                                <li aria-hidden="true" className="text-gray-400">
                                    /
                                </li>
                                <li className="font-medium text-gray-700">
                                    {post.category}
                                </li>
                            </ol>
                        </nav>
                        <h1 className="text-[28px] font-extrabold leading-[1.2] text-[#1a1a2e] sm:text-[40px]">
                            {post.title}
                        </h1>
                    </div>
                </header>

                {/* Two-column body */}
                <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
                        {/* Main */}
                        <div className="lg:col-span-8">
                            {post.coverImage && (
                                <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100">
                                    <Cover
                                        src={post.coverImage}
                                        alt={post.coverImageAlt || post.title}
                                        sizes="(max-width: 1024px) 100vw, 760px"
                                        priority
                                    />
                                </div>
                            )}

                            {/* Meta row */}
                            <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-gray-100 pb-6 text-[13px] text-gray-500">
                                <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary">
                                    {post.category}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <CalendarDot />
                                    {dateStr}
                                </span>
                                <span>{post.readingTime} min read</span>
                                <span>{post.views} views</span>
                                <span className="font-semibold text-gray-700">
                                    By {post.author}
                                </span>
                            </div>

                            <BlogContent html={post.content} />

                            {post.tags.length > 0 && (
                                <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-7">
                                    <span className="text-sm font-bold text-[#1a1a2e]">
                                        Tags:
                                    </span>
                                    {post.tags.map((t) => (
                                        <Link
                                            key={t}
                                            href={`/blog?tag=${encodeURIComponent(
                                                t
                                            )}`}
                                            className="rounded-full bg-[#faf9f7] px-3 py-1.5 text-[12px] font-semibold text-gray-600 transition-colors hover:bg-primary hover:text-white"
                                        >
                                            #{t}
                                        </Link>
                                    ))}
                                </div>
                            )}

                            <FaqAccordion faqs={post.faqs} />

                            {/* Inline CTA */}
                            <div className="mt-12">
                                <a
                                    href="https://call.webspires.co.uk?utm_source=blogpost"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-[15px] font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
                                >
                                    Book A Call Now
                                    <svg
                                        className="h-4 w-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M5 12h14M12 5l7 7-7 7"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4">
                            <div className="lg:sticky lg:top-28">
                                <BlogSidebar
                                    latestPosts={latestPosts}
                                    categories={categories}
                                    tags={tags}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related */}
                {related.length > 0 && (
                    <section className="border-t border-gray-100 bg-[#faf9f7] py-16">
                        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
                            <h2 className="mb-8 text-[24px] font-extrabold text-[#1a1a2e]">
                                Related articles
                            </h2>
                            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                                {related.map((p) => (
                                    <BlogCard key={p.id} post={p} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Bottom CTA */}
                <section className="relative overflow-hidden bg-[#1a1a2e] py-16">
                    <div
                        className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full opacity-10"
                        style={{
                            background:
                                'radial-gradient(circle, #EE314F 0%, transparent 70%)',
                        }}
                        aria-hidden="true"
                    />
                    <div className="relative z-10 mx-auto max-w-[820px] px-4 text-center sm:px-6">
                        <h2 className="mb-4 text-[26px] font-extrabold text-white sm:text-[34px]">
                            Ready to grow your business online?
                        </h2>
                        <p className="mx-auto mb-8 max-w-[520px] text-[15px] leading-relaxed text-gray-400">
                            Book a free strategy call with the Webspires team 
                            no obligation, just honest advice.
                        </p>
                        <a
                            href="https://call.webspires.co.uk?utm_source=blogpostbottom"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-[15px] font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
                        >
                            Book a Free Call
                        </a>
                    </div>
                </section>
            </article>
        </>
    );
}

function CalendarDot() {
    return (
        <svg
            className="h-3.5 w-3.5 text-primary"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M8 2v3M16 2v3M3 9h18M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

import Link from 'next/link';
import { Suspense } from 'react';
import { getPublishedPosts, getAllCategories } from '@/lib/blog';
import { siteConfig } from '@/config/site';
import BlogCard from '@/components/blog/BlogCard';

export const revalidate = 60;

export const metadata = {
    title: 'Blog Web Design, SEO & Digital Marketing Insights',
    description:
        'Actionable guides on web design, SEO, Google Ads, Meta Ads and growing your business online from the Webspires team.',
    alternates: { canonical: `${siteConfig.url}/blog` },
    openGraph: {
        type: 'website',
        url: `${siteConfig.url}/blog`,
        title: 'Webspires Blog Web Design, SEO & Digital Marketing',
        description:
            'Actionable guides on web design, SEO and digital marketing from the Webspires team.',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Webspires Blog Web Design, SEO & Digital Marketing',
        description:
            'Actionable guides on web design, SEO and digital marketing from the Webspires team.',
    },
};

const PER_PAGE = 9;

export default async function BlogIndexPage({ searchParams }) {
    const sp = (await searchParams) || {};
    const page = Math.max(1, parseInt(sp.page, 10) || 1);
    const category = typeof sp.category === 'string' ? sp.category : null;
    const tag = typeof sp.tag === 'string' ? sp.tag : null;
    const search = typeof sp.q === 'string' ? sp.q.trim() : null;

    const [{ posts, total, pages }, categories] = await Promise.all([
        getPublishedPosts({ page, limit: PER_PAGE, category, tag, search }),
        getAllCategories(),
    ]);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Webspires Blog',
        url: `${siteConfig.url}/blog`,
        description:
            'Guides on web design, SEO, Google Ads, Meta Ads and digital marketing.',
        publisher: {
            '@type': 'Organization',
            name: 'Webspires Limited',
            logo: {
                '@type': 'ImageObject',
                url: `${siteConfig.url}/images/webspires-logo-icon.png`,
            },
        },
        blogPost: posts.map((p) => ({
            '@type': 'BlogPosting',
            headline: p.title,
            url: `${siteConfig.url}/blog/${p.slug}`,
            datePublished: p.publishedAt,
            author: { '@type': 'Person', name: p.author },
        })),
    };

    const buildHref = (overrides) => {
        const params = new URLSearchParams();
        if (overrides.category ?? category)
            params.set('category', overrides.category ?? category);
        if (overrides.tag ?? tag) params.set('tag', overrides.tag ?? tag);
        if (overrides.q ?? search) params.set('q', overrides.q ?? search);
        if (overrides.page && overrides.page > 1)
            params.set('page', String(overrides.page));
        const qs = params.toString();
        return qs ? `/blog?${qs}` : '/blog';
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
                }}
            />

            {/* Hero */}
            <section
                aria-labelledby="blog-hero-heading"
                className="relative overflow-hidden bg-[#1a1a2e] pt-28 pb-16"
            >
                <div
                    className="pointer-events-none absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full opacity-10"
                    style={{
                        background:
                            'radial-gradient(circle, #EE314F 0%, transparent 70%)',
                    }}
                    aria-hidden="true"
                />
                <div className="relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
                    <nav aria-label="Breadcrumb" className="mb-6">
                        <ol className="flex items-center gap-2 text-[13px] text-gray-500">
                            <li>
                                <Link
                                    href="/"
                                    className="transition-colors hover:text-primary"
                                >
                                    Home
                                </Link>
                            </li>
                            <li aria-hidden="true" className="text-gray-600">
                                /
                            </li>
                            <li className="font-medium text-gray-300">Blog</li>
                        </ol>
                    </nav>
                    <h1
                        id="blog-hero-heading"
                        className="mb-4 max-w-3xl text-[34px] font-extrabold leading-[1.1] text-white sm:text-[46px]"
                    >
                        Insights on Web Design, SEO &{' '}
                        <span className="text-primary">Growth</span>
                    </h1>
                    <p className="max-w-2xl text-[17px] leading-relaxed text-gray-400">
                        Practical guides and strategies from the Webspires team
                        to help your UK business win online.
                    </p>

                    <form
                        action="/blog"
                        method="get"
                        className="mt-8 flex max-w-md gap-2"
                    >
                        <input
                            type="search"
                            name="q"
                            defaultValue={search || ''}
                            placeholder="Search articles…"
                            aria-label="Search articles"
                            className="w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none focus:border-primary"
                        />
                        <button
                            type="submit"
                            className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:opacity-90"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </section>

            {/* Filters + grid */}
            <section className="bg-[#faf9f7] py-14 lg:py-20">
                <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
                    {categories.length > 0 && (
                        <div className="mb-10 flex flex-wrap gap-2">
                            <Link
                                href={buildHref({ category: '', page: 1 })}
                                className={`rounded-full px-4 py-1.5 text-[13px] font-semibold transition-colors ${
                                    !category
                                        ? 'bg-primary text-white'
                                        : 'bg-white text-gray-600 hover:text-primary'
                                }`}
                            >
                                All
                            </Link>
                            {categories.map((c) => (
                                <Link
                                    key={c}
                                    href={buildHref({ category: c, page: 1 })}
                                    className={`rounded-full px-4 py-1.5 text-[13px] font-semibold transition-colors ${
                                        category === c
                                            ? 'bg-primary text-white'
                                            : 'bg-white text-gray-600 hover:text-primary'
                                    }`}
                                >
                                    {c}
                                </Link>
                            ))}
                        </div>
                    )}

                    {posts.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-16 text-center">
                            <p className="text-gray-500">
                                No articles found
                                {search ? ` for “${search}”` : ''}.
                            </p>
                            <Link
                                href="/blog"
                                className="mt-3 inline-block text-sm font-bold text-primary hover:underline"
                            >
                                ← Back to all articles
                            </Link>
                        </div>
                    ) : (
                        <Suspense>
                            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                                {posts.map((p, i) => (
                                    <BlogCard
                                        key={p.id}
                                        post={p}
                                        priority={i < 3}
                                    />
                                ))}
                            </div>
                        </Suspense>
                    )}

                    {pages > 1 && (
                        <nav
                            aria-label="Pagination"
                            className="mt-14 flex items-center justify-center gap-2"
                        >
                            {page > 1 && (
                                <Link
                                    href={buildHref({ page: page - 1 })}
                                    className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-600 hover:text-primary"
                                >
                                    ← Prev
                                </Link>
                            )}
                            {Array.from({ length: pages }, (_, i) => i + 1).map(
                                (n) => (
                                    <Link
                                        key={n}
                                        href={buildHref({ page: n })}
                                        aria-current={
                                            n === page ? 'page' : undefined
                                        }
                                        className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                                            n === page
                                                ? 'bg-primary text-white'
                                                : 'bg-white text-gray-600 hover:text-primary'
                                        }`}
                                    >
                                        {n}
                                    </Link>
                                )
                            )}
                            {page < pages && (
                                <Link
                                    href={buildHref({ page: page + 1 })}
                                    className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-600 hover:text-primary"
                                >
                                    Next →
                                </Link>
                            )}
                        </nav>
                    )}

                    <p className="mt-8 text-center text-xs text-gray-400">
                        {total} {total === 1 ? 'article' : 'articles'}
                    </p>
                </div>
            </section>
        </>
    );
}

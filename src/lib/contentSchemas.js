// src/lib/contentSchemas.js
// Shared (client + server) field-schema descriptors for every editable
// content type. Pure data + pure helpers ONLY no `server-only`, no
// mongoose, no DB imports so the admin form (client) and the server
// actions can both import it.
//
// Field types:
//   text single line
//   textarea multi line
//   color hex colour (rendered with a swatch)
//   stringList array of plain strings (one per line)
//   objectList array of objects with `subfields`

/** Pure slugifier usable on client and server. */
export function slugify(input = '') {
    return String(input)
        .toLowerCase()
        .trim()
        .replace(/['"]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 90);
}

const FAQ_SUB = [
    { name: 'q', label: 'Question', type: 'text' },
    { name: 'a', label: 'Answer', type: 'textarea' },
];

const TITLE_DESC_SUB = [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'desc', label: 'Description', type: 'textarea' },
];

const LINK_SUB = [
    { name: 'label', label: 'Label', type: 'text' },
    { name: 'href', label: 'Link (href)', type: 'text' },
];

export const CONTENT_TYPES = {
    services: {
        key: 'services',
        label: 'Services',
        singular: 'Service',
        titleField: 'title',
        slugRequired: true,
        slugFromField: 'title',
        basePath: '/services',
        indexPath: '/services',
        // Route-group-prefixed: required for revalidatePath(path, 'page')
        // because these pages live under the (site) route group.
        dynamicPath: '/(site)/services/[slug]',
        // Dedicated (hand-built) service pages that also cross-link via
        // OtherServicesSection revalidated so their links stay fresh.
        extraPaths: [
            '/services/seo',
            '/services/google-ads-management',
            '/services/meta-ads-management',
            '/services/shopify-development',
            '/services/crm-development',
            '/services/social-media-management',
            '/services/google-guarantee',
            '/services/generative-engine-optimisation',
        ],
        fields: [
            { name: 'title', label: 'Title', type: 'text', required: true },
            { name: 'shortTitle', label: 'Short title', type: 'text' },
            { name: 'tagline', label: 'Tagline', type: 'text' },
            { name: 'category', label: 'Category', type: 'text' },
            { name: 'color', label: 'Accent colour', type: 'color' },
            { name: 'bg', label: 'Background colour', type: 'color' },
            {
                name: 'iconPath',
                label: 'Icon SVG path',
                type: 'textarea',
                hint: 'The `d` attribute of a 24×24 SVG path.',
            },
            { name: 'metaTitle', label: 'Meta title', type: 'text' },
            {
                name: 'metaDescription',
                label: 'Meta description',
                type: 'textarea',
            },
            { name: 'heroHeading', label: 'Hero heading', type: 'text' },
            { name: 'heroSub', label: 'Hero subheading', type: 'textarea' },
            { name: 'intro', label: 'Intro paragraph', type: 'textarea' },
            {
                name: 'stats',
                label: 'Stats',
                type: 'objectList',
                subfields: [
                    { name: 'value', label: 'Value', type: 'text' },
                    { name: 'label', label: 'Label', type: 'text' },
                ],
            },
            {
                name: 'process',
                label: 'Process steps',
                type: 'objectList',
                subfields: [
                    { name: 'step', label: 'Step (e.g. 01)', type: 'text' },
                    { name: 'title', label: 'Title', type: 'text' },
                    { name: 'desc', label: 'Description', type: 'textarea' },
                ],
            },
            {
                name: 'features',
                label: 'Features',
                type: 'objectList',
                subfields: TITLE_DESC_SUB,
            },
            {
                name: 'faqs',
                label: 'FAQs',
                type: 'objectList',
                subfields: FAQ_SUB,
            },
        ],
    },

    industries: {
        key: 'industries',
        label: 'Industries',
        singular: 'Industry',
        titleField: 'name',
        slugRequired: true,
        slugFromField: 'name',
        basePath: '/industries',
        indexPath: '/industries',
        dynamicPath: '/(site)/industries/[slug]',
        fields: [
            { name: 'name', label: 'Name', type: 'text', required: true },
            { name: 'label', label: 'Label (plural)', type: 'text' },
            { name: 'category', label: 'Category', type: 'text' },
            { name: 'targetKeyword', label: 'Target keyword', type: 'text' },
            { name: 'color', label: 'Accent colour', type: 'color' },
            {
                name: 'iconPath',
                label: 'Icon SVG path',
                type: 'textarea',
                hint: 'The `d` attribute of a 24×24 SVG path.',
            },
            { name: 'metaTitle', label: 'Meta title', type: 'text' },
            {
                name: 'metaDescription',
                label: 'Meta description',
                type: 'textarea',
            },
            { name: 'heroHeading', label: 'Hero heading', type: 'text' },
            { name: 'heroSub', label: 'Hero subheading', type: 'textarea' },
            {
                name: 'painPoints',
                label: 'Pain points',
                type: 'objectList',
                subfields: TITLE_DESC_SUB,
            },
            {
                name: 'channels',
                label: 'Recommended channels',
                type: 'objectList',
                subfields: TITLE_DESC_SUB,
            },
            {
                name: 'platforms',
                label: 'Platforms (optional)',
                type: 'objectList',
                subfields: [
                    { name: 'name', label: 'Name', type: 'text' },
                    { name: 'desc', label: 'Description', type: 'textarea' },
                ],
            },
            {
                name: 'searchOpportunities',
                label: 'Search opportunities',
                type: 'stringList',
            },
            {
                name: 'competitorInsight',
                label: 'Competitor insight',
                type: 'textarea',
            },
            {
                name: 'roadmap',
                label: '90-day roadmap',
                type: 'objectList',
                subfields: [
                    { name: 'phase', label: 'Phase', type: 'text' },
                    { name: 'title', label: 'Title', type: 'text' },
                    { name: 'desc', label: 'Description', type: 'textarea' },
                ],
            },
            {
                name: 'servicesUsed',
                label: 'Services used',
                type: 'objectList',
                subfields: LINK_SUB,
            },
            {
                name: 'faqs',
                label: 'FAQs',
                type: 'objectList',
                subfields: FAQ_SUB,
            },
            {
                name: 'proofPoints',
                label: 'Proof points (optional override)',
                type: 'stringList',
                hint: 'Leave empty to use the shared default proof points.',
            },
            {
                name: 'pricingFactors',
                label: 'Pricing factors (optional override)',
                type: 'objectList',
                subfields: TITLE_DESC_SUB,
                hint: 'Leave empty to use the shared default pricing factors.',
            },
        ],
    },

    locations: {
        key: 'locations',
        label: 'Locations',
        singular: 'Location',
        titleField: 'city',
        slugRequired: true,
        slugFromField: 'city',
        basePath: '/locations',
        indexPath: '/locations',
        dynamicPath: '/(site)/locations/[slug]',
        fields: [
            { name: 'city', label: 'City', type: 'text', required: true },
            { name: 'region', label: 'Region', type: 'text' },
            {
                name: 'localAreas',
                label: 'Local areas',
                type: 'stringList',
            },
            { name: 'targetKeyword', label: 'Target keyword', type: 'text' },
            { name: 'metaTitle', label: 'Meta title', type: 'text' },
            {
                name: 'metaDescription',
                label: 'Meta description',
                type: 'textarea',
            },
            { name: 'heroHeading', label: 'Hero heading', type: 'text' },
            { name: 'heroSub', label: 'Hero subheading', type: 'textarea' },
            {
                name: 'localProblems',
                label: 'Local problems',
                type: 'objectList',
                subfields: TITLE_DESC_SUB,
            },
            {
                name: 'localSeoAngle',
                label: 'Local SEO angle',
                type: 'textarea',
            },
            {
                name: 'localIndustries',
                label: 'Local industries',
                type: 'stringList',
            },
            {
                name: 'services',
                label: 'Services',
                type: 'objectList',
                subfields: LINK_SUB,
            },
            {
                name: 'faqs',
                label: 'FAQs',
                type: 'objectList',
                subfields: FAQ_SUB,
            },
        ],
    },

    caseStudyCategories: {
        key: 'caseStudyCategories',
        label: 'Case Study Categories',
        singular: 'Case Study Category',
        titleField: 'name',
        slugRequired: true,
        slugFromField: 'name',
        basePath: '/case-studies',
        indexPath: '/case-studies',
        dynamicPath: '/(site)/case-studies/[slug]',
        fields: [
            { name: 'name', label: 'Name', type: 'text', required: true },
            { name: 'category', label: 'Category', type: 'text' },
            { name: 'metaTitle', label: 'Meta title', type: 'text' },
            {
                name: 'metaDescription',
                label: 'Meta description',
                type: 'textarea',
            },
            { name: 'heroHeading', label: 'Hero heading', type: 'text' },
            { name: 'heroSub', label: 'Hero subheading', type: 'textarea' },
            { name: 'intro', label: 'Intro paragraph', type: 'textarea' },
            {
                name: 'approach',
                label: 'Approach',
                type: 'objectList',
                subfields: TITLE_DESC_SUB,
            },
            {
                name: 'measured',
                label: 'What we measure',
                type: 'stringList',
            },
            {
                name: 'relatedServices',
                label: 'Related services',
                type: 'objectList',
                subfields: LINK_SUB,
            },
            {
                name: 'faqs',
                label: 'FAQs',
                type: 'objectList',
                subfields: FAQ_SUB,
            },
        ],
    },

    googleAdsChildren: {
        key: 'googleAdsChildren',
        label: 'Google Ads Services',
        singular: 'Google Ads Service',
        titleField: 'name',
        slugRequired: true,
        slugFromField: 'name',
        basePath: '/services/google-ads-management',
        indexPath: '/services/google-ads-management',
        dynamicPath: '/(site)/services/google-ads-management/[child]',
        paramName: 'child',
        sections: [
            {
                title: 'Basics & SEO',
                fields: [
                    'name',
                    'category',
                    'serviceType',
                    'priceRange',
                    'metaTitle',
                    'metaDescription',
                ],
            },
            {
                title: 'Hero',
                fields: ['heroHeading', 'heroSub', 'heroCta'],
            },
            {
                title: 'Content sections (all optional)',
                fields: [
                    'definitionHeading',
                    'intro',
                    'stats',
                    'deepHeading',
                    'deepBody',
                    'problemsHeading',
                    'problems',
                    'includedHeading',
                    'included',
                    'focusBlocks',
                    'process',
                    'deliverable',
                    'pricingHeading',
                    'pricing',
                    'pricingNote',
                    'whyChoose',
                    'results',
                    'crossLinks',
                ],
            },
            { title: 'FAQ', fields: ['faqs'] },
        ],
        fields: [
            { name: 'name', label: 'Name', type: 'text', required: true },
            { name: 'category', label: 'Category (eyebrow)', type: 'text' },
            {
                name: 'serviceType',
                label: 'SEO — Service type (schema)',
                type: 'text',
                hint: 'e.g. "Google Ads Audit". Used in Service structured data.',
            },
            {
                name: 'priceRange',
                label: 'SEO — Price range (schema)',
                type: 'text',
                hint: 'e.g. "££". Used in Service structured data.',
            },
            { name: 'metaTitle', label: 'Meta title', type: 'text' },
            {
                name: 'metaDescription',
                label: 'Meta description',
                type: 'textarea',
            },
            { name: 'heroHeading', label: 'Hero heading (H1)', type: 'text' },
            { name: 'heroSub', label: 'Hero subheading', type: 'textarea' },
            {
                name: 'heroCta',
                label: 'Hero CTA label',
                type: 'text',
                hint: 'e.g. "Get a free Google Ads audit".',
            },
            {
                name: 'definitionHeading',
                label: 'Definition heading',
                type: 'text',
            },
            {
                name: 'intro',
                label: 'Definition / intro paragraph',
                type: 'textarea',
            },
            {
                name: 'stats',
                label: 'Metric tiles',
                type: 'objectList',
                subfields: [
                    { name: 'value', label: 'Value', type: 'text' },
                    { name: 'label', label: 'Label', type: 'text' },
                ],
            },
            { name: 'deepHeading', label: 'Deep-dive heading', type: 'text' },
            {
                name: 'deepBody',
                label: 'Deep-dive body',
                type: 'textarea',
                rows: 5,
            },
            {
                name: 'problemsHeading',
                label: 'Problems section heading',
                type: 'text',
            },
            {
                name: 'problems',
                label: 'Problem cards',
                type: 'objectList',
                subfields: TITLE_DESC_SUB,
            },
            {
                name: 'includedHeading',
                label: 'What-we-do heading',
                type: 'text',
            },
            {
                name: 'included',
                label: 'What we check / deliver',
                type: 'objectList',
                subfields: TITLE_DESC_SUB,
            },
            {
                name: 'focusBlocks',
                label: 'Focus blocks (key levers)',
                type: 'objectList',
                subfields: TITLE_DESC_SUB,
            },
            {
                name: 'process',
                label: 'Process steps (HowTo)',
                type: 'objectList',
                subfields: [
                    { name: 'step', label: 'Step (e.g. 01)', type: 'text' },
                    { name: 'title', label: 'Title', type: 'text' },
                    { name: 'desc', label: 'Description', type: 'textarea' },
                ],
            },
            {
                name: 'deliverable',
                label: 'What you get (deliverable)',
                type: 'textarea',
            },
            {
                name: 'pricingHeading',
                label: 'Pricing heading',
                type: 'text',
            },
            {
                name: 'pricing',
                label: 'Pricing tiers',
                type: 'objectList',
                subfields: [
                    { name: 'name', label: 'Tier name', type: 'text' },
                    { name: 'range', label: 'Price / range', type: 'text' },
                    { name: 'includes', label: 'Includes', type: 'textarea' },
                ],
            },
            { name: 'pricingNote', label: 'Pricing note', type: 'textarea' },
            {
                name: 'whyChoose',
                label: 'Why choose Webspires',
                type: 'objectList',
                subfields: TITLE_DESC_SUB,
            },
            {
                name: 'results',
                label: 'Results paragraph',
                type: 'textarea',
            },
            {
                name: 'crossLinks',
                label: 'Related links (siblings / cross-silo)',
                type: 'objectList',
                subfields: LINK_SUB,
            },
            {
                name: 'faqs',
                label: 'FAQs',
                type: 'objectList',
                subfields: FAQ_SUB,
            },
        ],
    },

    seoChildren: {
        key: 'seoChildren',
        label: 'SEO Sub-Services',
        singular: 'SEO Sub-Service',
        titleField: 'name',
        slugRequired: true,
        slugFromField: 'name',
        basePath: '/services/seo',
        indexPath: '/services/seo',
        dynamicPath: '/(site)/services/seo/[slug]',
        paramName: 'slug',
        sections: [
            { title: 'Basics & SEO', fields: ['name', 'category', 'serviceType', 'priceRange', 'metaTitle', 'metaDescription'] },
            { title: 'Hero', fields: ['heroHeading', 'heroSub', 'heroCta'] },
            {
                title: 'Content sections (all optional)',
                fields: [
                    'definitionHeading', 'intro', 'stats', 'deepHeading', 'deepBody',
                    'problemsHeading', 'problems', 'includedHeading', 'included', 'focusBlocks',
                    'aiSearchHeading', 'aiSearchBody', 'aiSearchQuery', 'aiSearchAnswer',
                    'process', 'deliverable', 'pricingHeading', 'pricing', 'pricingNote',
                    'whyChoose', 'results', 'crossLinks', 'ctaHeading',
                ],
            },
            { title: 'FAQ', fields: ['faqs'] },
        ],
        fields: [
            { name: 'name', label: 'Name', type: 'text', required: true },
            { name: 'category', label: 'Category (eyebrow)', type: 'text' },
            { name: 'serviceType', label: 'SEO — Service type (schema)', type: 'text' },
            { name: 'priceRange', label: 'SEO — Price range (schema)', type: 'text' },
            { name: 'metaTitle', label: 'Meta title', type: 'text' },
            { name: 'metaDescription', label: 'Meta description', type: 'textarea' },
            { name: 'heroHeading', label: 'Hero heading (H1)', type: 'text' },
            { name: 'heroSub', label: 'Hero subheading', type: 'textarea' },
            { name: 'heroCta', label: 'Hero CTA label', type: 'text' },
            { name: 'definitionHeading', label: 'Definition heading', type: 'text' },
            { name: 'intro', label: 'Definition / intro paragraph', type: 'textarea' },
            {
                name: 'stats', label: 'Metric tiles', type: 'objectList',
                subfields: [{ name: 'value', label: 'Value', type: 'text' }, { name: 'label', label: 'Label', type: 'text' }],
            },
            { name: 'deepHeading', label: 'Deep-dive heading', type: 'text' },
            { name: 'deepBody', label: 'Deep-dive body', type: 'textarea', rows: 5 },
            { name: 'problemsHeading', label: 'Problems heading', type: 'text' },
            { name: 'problems', label: 'Problem cards', type: 'objectList', subfields: TITLE_DESC_SUB },
            { name: 'includedHeading', label: 'What-we-do heading', type: 'text' },
            { name: 'included', label: 'What we do', type: 'objectList', subfields: TITLE_DESC_SUB },
            { name: 'focusBlocks', label: 'Focus blocks (key levers)', type: 'objectList', subfields: TITLE_DESC_SUB },
            { name: 'aiSearchHeading', label: 'AI-search heading', type: 'text' },
            { name: 'aiSearchBody', label: 'AI-search body (shows the signature)', type: 'textarea' },
            { name: 'aiSearchQuery', label: 'AI-search signature — query line', type: 'text' },
            { name: 'aiSearchAnswer', label: 'AI-search signature — cited answer', type: 'textarea' },
            {
                name: 'process', label: 'Process steps (HowTo)', type: 'objectList',
                subfields: [{ name: 'step', label: 'Step', type: 'text' }, { name: 'title', label: 'Title', type: 'text' }, { name: 'desc', label: 'Description', type: 'textarea' }],
            },
            { name: 'deliverable', label: 'What you get', type: 'textarea' },
            { name: 'pricingHeading', label: 'Pricing heading', type: 'text' },
            {
                name: 'pricing', label: 'Pricing tiers', type: 'objectList',
                subfields: [{ name: 'name', label: 'Tier name', type: 'text' }, { name: 'range', label: 'Price / range', type: 'text' }, { name: 'includes', label: 'Includes', type: 'textarea' }],
            },
            { name: 'pricingNote', label: 'Pricing note', type: 'textarea' },
            { name: 'whyChoose', label: 'Why choose Webspires', type: 'objectList', subfields: TITLE_DESC_SUB },
            { name: 'results', label: 'Results paragraph', type: 'textarea' },
            { name: 'ctaHeading', label: 'CTA heading', type: 'text' },
            { name: 'crossLinks', label: 'Related links', type: 'objectList', subfields: LINK_SUB },
            { name: 'faqs', label: 'FAQs', type: 'objectList', subfields: FAQ_SUB },
        ],
    },

    servicePages: {
        key: 'servicePages',
        label: 'Service Pages',
        singular: 'Service Page',
        titleField: 'h1',
        slugRequired: true,
        slugFromField: 'h1',
        basePath: '/services',
        // Bespoke pages are revalidated by their concrete path on edit (the
        // catch-all dynamicPath is not used here). Every hand-built page this
        // type powers must be listed so a backend edit refreshes the live page.
        indexPath: '/services/crm-development',
        extraPaths: [
            '/services/social-media-management',
            '/services/google-ads-management',
            '/services/generative-engine-optimisation',
            '/services/meta-ads-management',
            '/services/shopify-development',
            '/services/seo',
            '/services/seo/local-seo',
        ],
        dynamicPath: null,
        fields: [
            { name: 'metaTitle', label: 'Meta title', type: 'text' },
            { name: 'metaDescription', label: 'Meta description', type: 'textarea' },
            { name: 'h1', label: 'H1 heading', type: 'text', required: true },
            { name: 'heroSub', label: 'Hero subheading', type: 'textarea', rows: 4 },
            { name: 'heroChips', label: 'Hero trust chips', type: 'stringList' },

            { name: 's2Heading', label: 'S2 heading', type: 'text' },
            { name: 's2Definition', label: 'S2 definition', type: 'textarea', rows: 4 },
            {
                name: 'buildRoutes',
                label: 'S2 build routes',
                type: 'objectList',
                subfields: [
                    { name: 'title', label: 'Title', type: 'text' },
                    { name: 'desc', label: 'Description', type: 'textarea' },
                    { name: 'href', label: 'Link (optional)', type: 'text' },
                ],
            },
            { name: 's2Adoption', label: 'S2 adoption line', type: 'textarea' },

            { name: 's3Heading', label: 'S3 heading', type: 'text' },
            { name: 's3Intro', label: 'S3 intro', type: 'textarea' },
            {
                name: 'comparisonRows',
                label: 'S3 comparison rows',
                type: 'objectList',
                subfields: [
                    { name: 'factor', label: 'Factor', type: 'text' },
                    { name: 'offTheShelf', label: 'Off-the-shelf', type: 'textarea' },
                    { name: 'bespoke', label: 'Bespoke build', type: 'textarea' },
                ],
            },
            { name: 's3Verdict', label: 'S3 verdict', type: 'textarea', rows: 4 },

            { name: 's4Heading', label: 'S4 heading', type: 'text' },
            { name: 's4Intro', label: 'S4 intro', type: 'textarea' },
            {
                name: 'outgrownSigns',
                label: 'S4 signs',
                type: 'objectList',
                subfields: [
                    { name: 'title', label: 'Title', type: 'text' },
                    { name: 'desc', label: 'Description', type: 'textarea' },
                ],
            },

            // GEO-specific: short stat/framing tiles for the "why now" section.
            // Keep values qualitative unless a figure can be sourced.
            {
                name: 'statTiles',
                label: 'Stat tiles (GEO "why now")',
                type: 'objectList',
                subfields: [
                    { name: 'value', label: 'Value', type: 'text' },
                    { name: 'label', label: 'Label', type: 'text' },
                ],
            },

            { name: 's5Heading', label: 'S5 heading', type: 'text' },
            {
                name: 'services',
                label: 'S5 services',
                type: 'objectList',
                subfields: [
                    { name: 'title', label: 'Title', type: 'text' },
                    { name: 'desc', label: 'Description', type: 'textarea' },
                    { name: 'href', label: 'Link (optional)', type: 'text' },
                ],
            },

            // SMM-specific: Platforms section (social-media-management page).
            { name: 'platformsHeading', label: 'SMM platforms heading', type: 'text' },
            { name: 'platformsIntro', label: 'SMM platforms intro', type: 'textarea' },
            {
                name: 'platforms',
                label: 'SMM platforms',
                type: 'objectList',
                subfields: [
                    { name: 'title', label: 'Platform', type: 'text' },
                    { name: 'desc', label: 'Who it suits', type: 'textarea' },
                ],
            },

            // SMM-specific: Organic vs Paid section.
            { name: 'orgPaidHeading', label: 'SMM organic vs paid heading', type: 'text' },
            { name: 'orgPaidIntro', label: 'SMM organic vs paid intro', type: 'textarea' },
            {
                name: 'orgPaidPoints',
                label: 'SMM organic vs paid points',
                type: 'objectList',
                subfields: [
                    { name: 'title', label: 'Title', type: 'text' },
                    { name: 'desc', label: 'Description', type: 'textarea' },
                ],
            },
            { name: 'orgPaidVerdict', label: 'SMM organic vs paid verdict', type: 'textarea' },

            // Campaign / ad types section. Shared: Google Ads uses it for
            // campaign types (cards deep-link to child pages), Meta Ads for
            // Facebook/Instagram ad formats.
            { name: 'campaignTypesHeading', label: 'Campaign/ad types heading', type: 'text' },
            { name: 'campaignTypesIntro', label: 'Campaign/ad types intro', type: 'textarea' },
            {
                name: 'campaignTypes',
                label: 'Campaign/ad types items',
                type: 'objectList',
                subfields: [
                    { name: 'title', label: 'Type', type: 'text' },
                    { name: 'desc', label: 'Outcome', type: 'textarea' },
                    { name: 'href', label: 'Link (optional)', type: 'text' },
                ],
            },

            // Two-channel comparison block (part of the comparison section).
            // Shared: Google Ads uses it for PPC vs SEO, Meta Ads for Meta vs Google.
            {
                name: 'ppcSeoPoints',
                label: 'Channel comparison points',
                type: 'objectList',
                subfields: [
                    { name: 'title', label: 'Title', type: 'text' },
                    { name: 'desc', label: 'Description', type: 'textarea' },
                ],
            },
            { name: 'ppcSeoVerdict', label: 'Channel comparison verdict', type: 'textarea' },

            { name: 's6Heading', label: 'S6 heading', type: 'text' },
            {
                name: 'features',
                label: 'S6 features',
                type: 'objectList',
                subfields: [
                    { name: 'title', label: 'Feature', type: 'text' },
                    { name: 'outcome', label: 'Outcome', type: 'textarea' },
                ],
            },

            { name: 's7Heading', label: 'S7 heading', type: 'text' },
            { name: 's7Body', label: 'S7 body', type: 'textarea', rows: 5 },
            { name: 'integrations', label: 'S7 integrations', type: 'stringList' },

            { name: 's8Heading', label: 'S8 heading', type: 'text' },
            { name: 's8Intro', label: 'S8 intro', type: 'textarea' },
            {
                name: 'migrationSteps',
                label: 'S8 migration steps',
                type: 'objectList',
                subfields: [
                    { name: 'title', label: 'Title', type: 'text' },
                    { name: 'desc', label: 'Description', type: 'textarea' },
                ],
            },
            { name: 'migrationSources', label: 'S8 migration source platforms', type: 'stringList' },

            { name: 's9Heading', label: 'S9 heading', type: 'text' },
            { name: 's9Intro', label: 'S9 intro', type: 'textarea' },
            {
                name: 'securityPoints',
                label: 'S9 security points',
                type: 'objectList',
                subfields: [
                    { name: 'title', label: 'Title', type: 'text' },
                    { name: 'desc', label: 'Description', type: 'textarea' },
                ],
            },

            { name: 's10Heading', label: 'S10 heading', type: 'text' },
            { name: 's10Intro', label: 'S10 intro', type: 'textarea' },
            {
                name: 'processSteps',
                label: 'S10 process steps',
                type: 'objectList',
                subfields: [
                    { name: 'title', label: 'Title', type: 'text' },
                    { name: 'desc', label: 'Description', type: 'textarea' },
                ],
            },

            { name: 's11Heading', label: 'S11 heading', type: 'text' },
            { name: 's11Intro', label: 'S11 intro', type: 'textarea' },
            {
                name: 'industries',
                label: 'S11 industries',
                type: 'objectList',
                subfields: [
                    { name: 'title', label: 'Title', type: 'text' },
                    { name: 'desc', label: 'Use case', type: 'textarea' },
                    { name: 'href', label: 'Link (optional)', type: 'text' },
                ],
            },

            { name: 's12Heading', label: 'S12 heading', type: 'text' },
            { name: 's12Intro', label: 'S12 intro', type: 'textarea' },
            {
                name: 'costDrivers',
                label: 'S12 cost drivers',
                type: 'objectList',
                subfields: [
                    { name: 'title', label: 'Title', type: 'text' },
                    { name: 'desc', label: 'Description', type: 'textarea' },
                ],
            },
            {
                name: 'pricingBands',
                label: 'S12 pricing bands',
                type: 'objectList',
                hint: 'Set the Range to a validated £ band (e.g. “£4,000 to £9,000”) when ready.',
                subfields: [
                    { name: 'name', label: 'Tier name', type: 'text' },
                    { name: 'range', label: 'Range / price', type: 'text' },
                    { name: 'includes', label: 'Includes', type: 'textarea' },
                ],
            },
            { name: 's12Note', label: 'S12 note', type: 'textarea' },

            // Shared comparison table. SMM uses all four columns (4-way);
            // Google Ads renders only agency/freelancer/in-house (leaves
            // software empty). Labels kept generic since multiple pages use it.
            { name: 'compHeading', label: 'Comparison heading', type: 'text' },
            { name: 'compIntro', label: 'Comparison intro', type: 'textarea' },
            {
                name: 'comparisonTable',
                label: 'Comparison rows',
                type: 'objectList',
                subfields: [
                    { name: 'factor', label: 'Factor', type: 'text' },
                    { name: 'agency', label: 'Agency', type: 'textarea' },
                    { name: 'freelancer', label: 'Freelancer', type: 'textarea' },
                    { name: 'inhouse', label: 'In-house', type: 'textarea' },
                    { name: 'software', label: 'Software (SMM only)', type: 'textarea' },
                ],
            },
            { name: 'compVerdict', label: 'Comparison verdict', type: 'textarea' },

            { name: 's13Heading', label: 'S13 heading', type: 'text' },
            {
                name: 'whyChoose',
                label: 'S13 edges',
                type: 'objectList',
                subfields: [
                    { name: 'title', label: 'Title', type: 'text' },
                    { name: 'desc', label: 'Description', type: 'textarea' },
                ],
            },

            { name: 's14Heading', label: 'S14 heading', type: 'text' },
            { name: 'caseProblem', label: 'S14 problem', type: 'textarea' },
            { name: 'caseSolution', label: 'S14 solution', type: 'textarea' },
            { name: 'caseOutcome', label: 'S14 outcome', type: 'textarea' },
            { name: 'caseMetric', label: 'S14 highlighted metric (optional)', type: 'text' },
            { name: 'caseNote', label: 'S14 note', type: 'textarea' },

            { name: 's15Heading', label: 'S15 CTA heading', type: 'text' },
            { name: 's15Body', label: 'S15 CTA body', type: 'textarea' },

            { name: 'faqHeading', label: 'FAQ heading', type: 'text' },
            {
                name: 'faqs',
                label: 'FAQ items',
                type: 'objectList',
                subfields: [
                    { name: 'q', label: 'Question', type: 'text' },
                    { name: 'a', label: 'Answer', type: 'textarea' },
                ],
            },
        ],
    },

    homeFaqs: {
        key: 'homeFaqs',
        label: 'Home FAQs',
        singular: 'Home FAQ',
        titleField: 'question',
        slugRequired: false,
        slugFromField: 'question',
        basePath: null,
        indexPath: '/',
        dynamicPath: null,
        fields: [
            {
                name: 'question',
                label: 'Question',
                type: 'text',
                required: true,
            },
            {
                name: 'answer',
                label: 'Answer',
                type: 'textarea',
                required: true,
                rows: 4,
            },
        ],
    },

    projects: {
        key: 'projects',
        label: 'Projects',
        singular: 'Project',
        titleField: 'title',
        slugRequired: true,
        slugFromField: 'title',
        basePath: '/projects',
        indexPath: '/projects',
        dynamicPath: '/(site)/projects/[slug]',
        // Optional grouping for the admin form collapsible cards, in order.
        // Any field not listed here falls into a trailing "Other" group.
        sections: [
            {
                title: 'Basics',
                fields: [
                    'title',
                    'category',
                    'tags',
                    'description',
                    'image',
                    'result',
                    'resultColor',
                    'location',
                    'link',
                ],
            },
            {
                title: 'Detail page (optional)',
                fields: [
                    'content',
                    'industry',
                    'timeframe',
                    'services',
                    'overview',
                    'challenge',
                    'approach',
                    'outcomes',
                    'gallery',
                    'testimonial',
                    'testimonialAuthor',
                ],
            },
            {
                title: 'SEO',
                fields: [
                    'metaTitle',
                    'metaDescription',
                    'canonicalUrl',
                    'ogImage',
                    'keywords',
                    'noIndex',
                ],
            },
        ],
        fields: [
            { name: 'title', label: 'Title', type: 'text', required: true },
            {
                name: 'category',
                label: 'Category',
                type: 'text',
                hint: 'Badge shown on the card, e.g. “Web Design”.',
            },
            { name: 'tags', label: 'Tags', type: 'stringList' },
            {
                name: 'description',
                label: 'Short description',
                type: 'textarea',
                hint: 'Plain-text summary shown on the grid card, the hero, and (by default) the meta description.',
            },
            {
                name: 'content',
                label: 'Full write-up (rich text)',
                type: 'richtext',
                hint: 'The rich project story shown on the detail page headings, lists, links, images. Leave empty to hide the section.',
            },
            { name: 'result', label: 'Headline result', type: 'text' },
            { name: 'resultColor', label: 'Accent colour', type: 'color' },
            {
                name: 'image',
                label: 'Screenshot / cover image',
                type: 'image',
                hint: 'Upload a file, or paste an absolute URL / path like /images/projects/name.png.',
            },
            { name: 'location', label: 'Location', type: 'text' },
            {
                name: 'link',
                label: 'Live site URL',
                type: 'text',
                hint: 'The public website this project links out to.',
            },

            // ── Detail-page extras (all optional) ──
            { name: 'industry', label: 'Industry', type: 'text' },
            {
                name: 'timeframe',
                label: 'Timeframe',
                type: 'text',
                hint: 'e.g. “3 weeks”.',
            },
            {
                name: 'services',
                label: 'Services delivered',
                type: 'stringList',
            },
            {
                name: 'overview',
                label: 'Overview',
                type: 'textarea',
                hint: 'Longer intro paragraph for the detail page.',
            },
            { name: 'challenge', label: 'The challenge', type: 'textarea' },
            {
                name: 'approach',
                label: 'Our approach',
                type: 'objectList',
                subfields: TITLE_DESC_SUB,
            },
            {
                name: 'outcomes',
                label: 'Measured outcomes',
                type: 'objectList',
                subfields: [
                    { name: 'value', label: 'Value', type: 'text' },
                    { name: 'label', label: 'Label', type: 'text' },
                ],
            },
            {
                name: 'gallery',
                label: 'Gallery images',
                type: 'imageList',
                hint: 'Upload multiple images (or paste URLs). Shown in the detail-page gallery.',
            },
            { name: 'testimonial', label: 'Testimonial quote', type: 'textarea' },
            {
                name: 'testimonialAuthor',
                label: 'Testimonial author',
                type: 'text',
            },

            // ── SEO (all optional; sensible fallbacks on the page) ──
            {
                name: 'metaTitle',
                label: 'SEO Meta title',
                type: 'text',
                hint: 'Falls back to “Title Category | Webspires”. Aim for ≤ 60 chars.',
            },
            {
                name: 'metaDescription',
                label: 'SEO Meta description',
                type: 'textarea',
                hint: 'Falls back to the short description. Aim for ≤ 160 chars.',
            },
            {
                name: 'canonicalUrl',
                label: 'SEO Canonical URL',
                type: 'text',
                hint: 'Override only if this project should canonicalise elsewhere.',
            },
            {
                name: 'ogImage',
                label: 'SEO Social share image (OG)',
                type: 'image',
                hint: 'Upload or paste a URL. Falls back to the screenshot image.',
            },
            {
                name: 'keywords',
                label: 'SEO Keywords',
                type: 'stringList',
            },
            {
                name: 'noIndex',
                label: 'SEO Hide from search engines (noindex)',
                type: 'boolean',
            },
        ],
    },
};

export const CONTENT_TYPE_KEYS = Object.keys(CONTENT_TYPES);

export function getContentType(key) {
    return CONTENT_TYPES[key] || null;
}

/**
 * Build a clean `data` object from raw form values, keeping only the
 * fields declared in the descriptor and coercing each to the right
 * shape. Empty optional lists are omitted so falsy checks on the page
 * (e.g. `ind.platforms && …`) keep working.
 */
export function cleanContentData(typeKey, raw = {}) {
    const cfg = CONTENT_TYPES[typeKey];
    if (!cfg) return {};
    const out = {};

    for (const f of cfg.fields) {
        const v = raw[f.name];

        if (f.type === 'boolean') {
            out[f.name] = Boolean(v);
        } else if (f.type === 'richtext') {
            // Raw HTML from the editor kept as-is here; sanitised
            // server-side in the save action before it hits the DB.
            out[f.name] = typeof v === 'string' ? v : '';
        } else if (f.type === 'stringList' || f.type === 'imageList') {
            const arr = (Array.isArray(v) ? v : [])
                .map((s) => String(s ?? '').trim())
                .filter(Boolean);
            if (arr.length) out[f.name] = arr;
        } else if (f.type === 'objectList') {
            const rows = (Array.isArray(v) ? v : [])
                .map((row) => {
                    const o = {};
                    for (const sf of f.subfields) {
                        o[sf.name] = String(row?.[sf.name] ?? '').trim();
                    }
                    return o;
                })
                .filter((row) => f.subfields.some((sf) => row[sf.name]));
            if (rows.length) out[f.name] = rows;
        } else {
            // text / textarea / color
            out[f.name] = String(v ?? '').trim();
        }
    }

    return out;
}

/** The human-readable title for a stored item (for admin lists). */
export function contentItemTitle(typeKey, data = {}) {
    const cfg = CONTENT_TYPES[typeKey];
    if (!cfg) return '';
    return String(data[cfg.titleField] || data.title || data.name || '').trim();
}

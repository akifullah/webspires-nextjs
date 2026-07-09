// src/data/servicePages.js -rich, bespoke service-page records.
// Seed + runtime fallback for the `servicePages` content type, which
// drives hand-built service pages (e.g. /services/crm-development) while
// staying fully editable from /admin/content. Each record is a flat
// object so it maps 1:1 to the contentSchemas descriptor fields.

export const servicePagesData = [
    {
        slug: 'crm-development',

        // Meta
        metaTitle:
            'Custom CRM Development Company UK | Bespoke CRM Software | Webspires',
        metaDescription:
            'Bespoke CRM development in the UK. We build custom CRM software you own outright, no per-seat fees, with integrations, migration, and GDPR-ready security. Book a free CRM consultation.',

        // Hero (Section 1)
        h1: 'Custom CRM Development Services for Growing UK Businesses',
        heroSub:
            'Run sales, marketing, and service from one system you own outright, with no per-seat fees and no rigid off-the-shelf limits. Webspires designs and builds bespoke CRM software around the way your team actually works, then migrates your data, integrates your existing tools, and supports the system long term. Our build moves faster through modern AI tooling, our pricing stays honest for SMEs, and the team that builds your CRM also drives the leads it captures.',
        heroChips: [
            'UK-based build team',
            'Full ownership, no per-seat fees',
            'GDPR-ready security',
            'Integrations and migration included',
        ],

        // Section 2 -definition
        s2Heading: 'What Custom CRM Development Means',
        s2Definition:
            'Custom CRM development is the process of designing and building customer relationship management software around one business’s specific sales, marketing, and service workflows, rather than forcing the business into a generic platform. The result is a tailored system that matches how a team sells, stores customer data in one place, and grows with the business.',
        buildRoutes: [
            {
                title: 'Fully bespoke build',
                desc: 'A system built from the ground up around your processes. Right for proprietary workflows that no off-the-shelf product matches.',
            },
            {
                title: 'Platform customisation',
                desc: 'Deep configuration and custom modules on Salesforce, HubSpot, or Microsoft Dynamics. Right when a mature platform covers most needs and you want to extend it.',
            },
            {
                title: 'Low-code or no-code assembly',
                desc: 'Faster assembly on a low-code foundation. Right for a lean first version that proves the model before a heavier investment.',
            },
        ],
        s2Adoption:
            'Across 2026, more UK SMEs move off shared spreadsheets and per-seat subscriptions toward owned systems that fit their data and their margins.',

        // Section 3 -build vs buy
        s3Heading:
            'Custom CRM vs Off-the-Shelf: Salesforce, HubSpot and Dynamics Compared',
        s3Intro:
            'Off-the-shelf platforms win for standard sales processes and a fast start. A bespoke build wins on fit, ownership, and cost at scale. Read the comparison, then judge against your own situation.',
        comparisonRows: [
            {
                factor: 'Cost model',
                offTheShelf:
                    'Per-seat subscription that recurs every month and grows with headcount.',
                bespoke: 'One-time build you own, with an optional fixed care plan.',
            },
            {
                factor: 'Fit to non-standard workflows',
                offTheShelf:
                    'Strong for standard sales processes, rigid for proprietary ones.',
                bespoke: 'Built around your exact workflow, not the other way round.',
            },
            {
                factor: 'Scalability cost',
                offTheShelf: 'Cost climbs with every new user and premium tier.',
                bespoke: 'Add users and modules without per-seat penalties.',
            },
            {
                factor: 'Data and source-code ownership',
                offTheShelf: 'Vendor holds the platform and the code.',
                bespoke: 'You own the data and the source code outright.',
            },
            {
                factor: 'Lock-in risk',
                offTheShelf:
                    'Switching means migration and retraining on the vendor’s terms.',
                bespoke: 'No vendor lock-in. The system stays yours.',
            },
        ],
        s3Verdict:
            'Choose off-the-shelf when your process is standard and you need to move now. Choose a bespoke build when workflows are proprietary, per-seat fees compound as the team grows, or the business needs full ownership and integration control. The break-even sits where recurring subscription and per-seat costs over three to four years pass the one-time cost of a system you own. Work out that line for your headcount, then decide.',

        // Section 4 -signs
        s4Heading: 'Signs Your Business Has Outgrown Off-the-Shelf CRM',
        s4Intro:
            'UK SMEs in 2026 face rising SaaS subscription costs and tighter expectations on how customer data gets handled. The symptoms below signal that a generic platform now costs more than it returns.',
        outgrownSigns: [
            {
                title: 'Disconnected spreadsheets',
                desc: 'Sales, leads, and customers live across separate sheets and apps. A bespoke CRM centralises every record into one source of truth.',
            },
            {
                title: 'Scattered customer data',
                desc: 'The same customer exists three times across three tools. A custom build deduplicates and unifies the record so the team works from one view.',
            },
            {
                title: 'Per-seat fees climbing',
                desc: 'Every new hire raises the monthly subscription. An owned system removes per-seat fees as the team grows.',
            },
            {
                title: 'Workflow mismatch',
                desc: 'Off-the-shelf stages fight the way your team actually sells. A bespoke build models your real pipeline instead.',
            },
            {
                title: 'Missing integrations',
                desc: 'The CRM does not talk to your ERP or accounting tools, so data gets re-keyed by hand. Custom integration closes that gap.',
            },
            {
                title: 'Poor pipeline visibility',
                desc: 'Forecasting relies on guesswork because deals sit in inboxes. A tailored dashboard surfaces every deal and its stage in real time.',
            },
        ],

        // Section 5 -services
        s5Heading: 'Our Custom CRM Software Development Services',
        services: [
            {
                title: 'Bespoke CRM design and build',
                desc: 'We map your sales, marketing, and service processes, then design and build CRM software around them. The result models your real pipeline, your record structure, and your reporting, so the team adopts it fast and works the way it already thinks.',
            },
            {
                title: 'CRM platform customisation',
                desc: 'We extend Salesforce, HubSpot, and Microsoft Dynamics with custom objects, fields, automations, and modules. The platform stays familiar while the parts that did not fit your business get rebuilt to match it.',
            },
            {
                title: 'CRM integration',
                desc: 'We connect the CRM to the tools you already run through secure APIs. Leads, invoices, orders, and calls flow into one record, so the team stops re-keying data and starts trusting a single source of truth.',
            },
            {
                title: 'CRM data migration',
                desc: 'We move your records from spreadsheets and legacy systems with field mapping, cleansing, and validation. A full backup and a phased cutover keep operations running while the data lands cleanly.',
            },
            {
                title: 'Mobile CRM for field and sales teams',
                desc: 'We build mobile access so field engineers and sales reps update deals, log calls, and check customer history on the move. Records stay current because updating them takes seconds, not a desk and a laptop.',
            },
            {
                title: 'CRM customisation and new modules',
                desc: 'As the business shifts, we add modules, automations, and reports on top of the live system. The CRM grows with you instead of forcing a rebuild every time the process changes.',
            },
            {
                title: 'Ongoing support and maintenance',
                desc: 'We run updates, monitoring, and fixes on an optional care plan. Day-to-day operations stay smooth, and a named team answers directly when something needs attention.',
            },
        ],

        // Section 6 -features
        s6Heading: 'Core Features We Build Into Every Custom CRM',
        features: [
            { title: 'Contact management', outcome: 'Every interaction sits on one record, so the team never loses context on a customer.' },
            { title: 'Lead management and lead scoring', outcome: 'Hot leads surface first, so reps work the prospects most likely to close.' },
            { title: 'Sales pipeline and deal tracking', outcome: 'Each deal shows its stage and value, so forecasting rests on data, not guesswork.' },
            { title: 'Workflow and task automation', outcome: 'Follow-ups and tasks trigger automatically, so leads stop slipping through the cracks.' },
            { title: 'Reporting and KPI dashboards', outcome: 'Live dashboards expose performance, so decisions land faster and with evidence.' },
            { title: 'Role-based access and permissions', outcome: 'Sensitive data stays restricted to the right roles, so customer information stays protected.' },
            { title: 'Multi-channel communication', outcome: 'Email, SMS, and calls log against the record, so the full conversation lives in one place.' },
            { title: 'Mobile access', outcome: 'Field and sales teams update records anywhere, so the data stays current in real time.' },
        ],

        // Section 7 -integrations
        s7Heading: 'CRM Integration With Your Existing Business Tools',
        s7Body:
            'We connect a custom CRM to the systems you already run through secure APIs, so data moves on its own instead of by hand. A lead from a website form lands in the pipeline with its source attached. An invoice raised in your accounting software reflects against the customer record. The result is one source of truth and no double entry. Common connections include the tools your team relies on every day.',
        integrations: [
            'ERP systems',
            'Accounting software (Xero, QuickBooks, Sage)',
            'Email and SMS platforms',
            'VoIP and call systems',
            'E-commerce platforms (Shopify, WooCommerce)',
            'Payment processors',
        ],

        // Section 8 -migration
        s8Heading: 'Safe CRM Data Migration From Spreadsheets and Legacy Systems',
        s8Intro:
            'The biggest fear in changing CRM is losing data or breaking operations during the switch. We control that risk with a backup, a parallel run, and validation at every step. Records move cleanly and the business keeps running.',
        migrationSteps: [
            { title: 'Export', desc: 'We pull a complete export from your current system or spreadsheets.' },
            { title: 'Field mapping', desc: 'We map every field to its new home so nothing lands in the wrong place.' },
            { title: 'Cleansing and de-duplication', desc: 'We remove duplicates and fix broken records before they reach the new system.' },
            { title: 'Validation', desc: 'We check counts and key records against the source so the data matches.' },
            { title: 'Backup', desc: 'We take a full backup so the original data stays safe throughout.' },
            { title: 'Phased cutover', desc: 'We switch over in stages with a parallel run, so operations keep moving with zero downtime.' },
        ],

        // Section 9 -security
        s9Heading: 'Secure, GDPR-Ready CRM With Role-Based Access',
        s9Intro:
            'UK buyers weigh data protection heavily, and 2026 expectations on customer data are tighter than ever. We build security into the system from the first sprint, not as an afterthought.',
        securityPoints: [
            { title: 'Role-based access', desc: 'Permission groups restrict each record and action to the roles that need it.' },
            { title: 'Data encryption', desc: 'Customer data stays encrypted in transit and at rest.' },
            { title: 'Audit logs', desc: 'Access and changes get logged, so every action has an accountable trail.' },
            { title: 'UK GDPR-aligned handling', desc: 'Data handling follows current UK GDPR practice, with consent and retention built in.' },
        ],

        // Section 10 -process
        s10Heading: 'Our Custom CRM Development Process, Step by Step',
        s10Intro:
            'Six clear stages take a CRM from first conversation to a system your team runs every day. Sprints move faster because we build with modern AI tooling, which shortens timelines without cutting quality.',
        processSteps: [
            { title: 'Discovery and requirements', desc: 'We learn your sales, service, and data processes, then agree the scope and goals. You leave with a clear picture of what the build delivers.' },
            { title: 'Workflow mapping and design', desc: 'We map your pipeline and design the structure, screens, and automations. You approve the blueprint before a line of code gets written.' },
            { title: 'Agile build in sprints', desc: 'We build in short sprints with modern AI tooling that shortens timelines without cutting quality. You see working software early and often.' },
            { title: 'Integration and testing', desc: 'We connect your tools and test every workflow against real scenarios. You review a system that behaves the way your business runs.' },
            { title: 'Deployment and team training', desc: 'We migrate your data, go live, and train your team. You start with people who know how to use the system from day one.' },
            { title: 'Post-launch support', desc: 'We monitor, fix, and improve the live system on a care plan. You keep a direct line to the team that built it.' },
        ],

        // Section 11 -industries
        s11Heading: 'Custom CRM Software by Industry',
        industries: [
            { title: 'Estate agents and lettings', desc: 'A lettings pipeline, property matching, and viewing follow-ups in one system.', href: '/industries/real-estate' },
            { title: 'Membership organisations', desc: 'Member portals, renewals, and communications managed against one member record.', href: '' },
            { title: 'Healthcare clinics', desc: 'Patient data, appointments, and recalls with compliance and access control built in.', href: '/industries/healthcare-clinics' },
            { title: 'Professional services', desc: 'Enquiries, proposals, and client matters tracked from first contact to delivery.', href: '/industries/professional-services' },
            { title: 'E-commerce', desc: 'Orders, customers, and support tickets synced from the store into one view.', href: '/industries/ecommerce' },
            { title: 'B2B sales', desc: 'Multi-stage pipelines, lead scoring, and forecasting for longer sales cycles.', href: '/industries/b2b-companies' },
        ],

        // Section 12 -cost
        s12Heading: 'How Much Custom CRM Development Costs in the UK',
        s12Intro:
            'Custom CRM pricing follows the scope, not a fixed sticker. Five drivers move the figure up or down. We price honestly against real delivery, so the number you get is one we stand behind.',
        costDrivers: [
            { title: 'Number of users and roles', desc: 'More roles and permission groups mean more screens, rules, and testing.' },
            { title: 'Integrations', desc: 'Each connected system, from accounting to VoIP, adds build and testing work.' },
            { title: 'Data migration complexity', desc: 'Messy or large legacy data takes more mapping, cleansing, and validation.' },
            { title: 'Custom modules', desc: 'Bespoke workflows beyond the core pipeline expand the scope.' },
            { title: 'Mobile access', desc: 'Field and mobile use adds build work on top of the core system.' },
        ],
        // Ranges left as a guide. Replace with validated £ bands from /admin/content when ready.
        pricingBands: [
            { name: 'Starter bespoke CRM', range: 'Priced after a free discovery call', includes: 'Single team, core pipeline, contacts, and automation.' },
            { name: 'Growth CRM', range: 'Priced after a free discovery call', includes: 'Multi-team, key integrations, reporting, and mobile access.' },
            { name: 'Advanced CRM', range: 'Priced after a free discovery call', includes: 'Complex workflows, ERP and accounting integration, role-based access, and custom modules.' },
            { name: 'Care plan', range: 'Priced after a free discovery call', includes: 'Optional ongoing support and maintenance.' },
        ],
        s12Note:
            'We give an indicative figure during a free consultation and confirm final pricing after a short discovery, once the scope is clear. No guessed quotes, no surprise invoices.',

        // Section 13 -why choose
        s13Heading: 'Why Growing Businesses Choose Webspires for Custom CRM',
        whyChoose: [
            { title: 'AI-accelerated build', desc: 'We build with modern AI tooling that shortens delivery and keeps pricing honest for SMEs, without cutting quality.' },
            { title: 'Full ownership, no per-seat fees', desc: 'You own the software and the source code outright. Add users and grow without a climbing subscription.' },
            { title: 'Direct access to the build team', desc: 'You talk to the people writing the code, not a layer of account managers between you and the work.' },
            { title: 'One partner for CRM and the leads that fill it', desc: 'The same team builds the CRM and runs the marketing that feeds it, so the system and the pipeline stay aligned.' },
        ],

        // Section 14 -case study
        s14Heading: 'A Custom CRM We Built: Problem, Solution, Outcome',
        caseProblem:
            'Our own lead and job management ran across spreadsheets, inboxes, and a calendar. Follow-ups slipped, the same enquiry got logged twice, and no one view showed where a job stood.',
        caseSolution:
            'We built an internal CRM with a single customer record, an automated follow-up sequence, a job pipeline, and a live dashboard. Website enquiries flow straight into the pipeline with their source attached.',
        caseOutcome:
            'Follow-ups stopped slipping, duplicate records disappeared, and every job now sits on one board with a clear stage. The team works from one source of truth instead of five.',
        caseMetric: '',
        caseNote:
            'We publish results we stand behind. As client CRM projects complete and the metrics gain approval, we add them here with named outcomes.',

        // Section 15 -CTA
        s15Heading: 'Book a Free CRM Consultation',
        s15Body:
            'On a short discovery call with the Webspires team you get a scoped understanding of your workflows, an honest build-vs-buy recommendation, and an indicative quote. No obligation, no hard sell.',

        // Section 16 -FAQ
        faqHeading: 'Custom CRM Development FAQs',
        faqs: [
            { q: 'What is custom CRM development?', a: 'Custom CRM development is the process of designing and building CRM software around one business’s specific sales, marketing, and service workflows. Rather than forcing a team into a generic platform, the system models your real pipeline, unifies customer data, and grows with the business.' },
            { q: 'How much does custom CRM development cost in the UK?', a: 'The cost depends on the number of users and roles, the integrations involved, data migration complexity, custom modules, and mobile access. We scope every project and give an indicative figure during a free consultation, with final pricing confirmed after discovery rather than guessed up front.' },
            { q: 'How long does it take to build a custom CRM?', a: 'A focused first version often takes a few weeks, while a multi-team system with integrations runs longer. Agile sprints and modern AI tooling shorten the timeline, and you see working software early instead of waiting for one large reveal at the end.' },
            { q: 'Should I build a custom CRM or use Salesforce or HubSpot?', a: 'Off-the-shelf platforms suit standard sales processes and a fast start. A bespoke build wins when workflows are proprietary, per-seat fees compound at scale, or you need full ownership and integration control. We give an honest recommendation during the consultation, even when the answer is off-the-shelf.' },
            { q: 'Who owns the CRM and the source code?', a: 'You do. With a bespoke build you own the software, the data, and the source code outright. No vendor holds your system hostage, and no per-seat subscription grows as you add people to the team.' },
            { q: 'How do you migrate data without downtime?', a: 'We export your records, map every field, cleanse duplicates, and validate against the source. A full backup and a phased cutover with a parallel run keep operations moving, so the switch happens with zero downtime and no lost data.' },
            { q: 'Is the CRM GDPR-compliant?', a: 'Yes. We build role-based access, encryption, and audit logs, and we follow current 2026 UK GDPR practice on consent and data retention. Sensitive customer data stays restricted to the right roles, and every access leaves an accountable trail.' },
            { q: 'Do you provide ongoing support and maintenance?', a: 'Yes. An optional care plan covers updates, monitoring, and fixes, and a named team answers directly. As your processes change, we add modules and reports to the live system rather than starting over.' },
        ],
    },

    {
        slug: 'social-media-management',

        // Meta
        metaTitle: 'Social Media Management Services UK | Webspires',
        metaDescription:
            'Performance-focused social media management in the UK. We tie content to leads and revenue, run your paid social and SEO under one roof, and price honestly. Book a free social media strategy call.',

        // Hero (Section 1)
        h1: 'Social Media Management Services for UK Businesses',
        heroSub:
            'Consistent, on-brand social media that drives enquiries and revenue, not just followers. Webspires runs your strategy, content, community, and paid social as one service, then reports against the leads it generates. The wedge is simple: performance focus over vanity metrics, AI-accelerated content produced faster at honest pricing, and one team that also runs your paid ads and SEO. Growing UK businesses get a social presence that earns its place in the marketing budget through measurable results in 2026, not follower counts that look good and sell nothing.',
        heroChips: [
            'Performance over vanity metrics',
            'Social, paid, and SEO under one team',
            'AI-accelerated content',
            'Honest UK pricing',
        ],

        // Section 2 -what it includes
        s2Heading: 'What Social Media Management Includes',
        s2Definition:
            'Social media management is the ongoing strategy, content creation, publishing, community management, and reporting that keeps a brand active and growing across social platforms. The work runs as a continuous cycle, not a one-off campaign, so the brand stays consistent and the results compound over time.',
        buildRoutes: [
            {
                title: 'Strategy',
                desc: 'A plan that ties each platform and content pillar to a business goal, so posting follows a purpose instead of a whim.',
            },
            {
                title: 'Content creation',
                desc: 'Graphics, captions, and short-form video built around your brand, produced at pace through AI-accelerated workflows.',
            },
            {
                title: 'Scheduling and publishing',
                desc: 'A managed calendar that keeps posts consistent and timed for when your audience actually engages.',
            },
            {
                title: 'Community management',
                desc: 'Replies, comments, and messages handled promptly, so engagement turns into conversations and conversations into enquiries.',
            },
            {
                title: 'Paid social support',
                desc: 'Boosted posts and targeted ad campaigns that extend reach to the right audience and feed measurable leads.',
            },
            {
                title: 'Analytics and reporting',
                desc: 'Monthly reporting tied to reach, engagement, and enquiries, so every decision rests on data.',
            },
        ],
        s2Adoption:
            'Through 2026, social shifted from simple posting to brand positioning and short-form video, so a scattered, post-when-you-remember approach no longer holds attention or earns reach.',

        // Section 3 -signs you need to outsource
        s4Heading: 'Signs Your Business Needs to Outsource Social Media',
        s4Intro:
            'UK SMEs in 2026 face rising content expectations and steady demand for short-form video that in-house teams struggle to sustain alongside running the business. The symptoms below signal that social media now needs a dedicated team.',
        outgrownSigns: [
            {
                title: 'Posting goes quiet for weeks',
                desc: 'Weeks pass between posts, and the account looks abandoned. A managed service keeps a steady, planned schedule so your brand stays visible.',
            },
            {
                title: 'Last-minute posts with no plan',
                desc: 'Content gets thrown together minutes before it goes live. A content calendar replaces the scramble with a strategy built around your goals.',
            },
            {
                title: 'Effort never turns into enquiries',
                desc: 'Hours go into posting, yet nothing reaches the sales pipeline. Performance-led management ties content to leads and tracks what actually converts.',
            },
            {
                title: 'No time alongside the day job',
                desc: 'Running the business leaves no room to run social well. A dedicated team takes the channel off your plate without losing your voice.',
            },
            {
                title: 'Inconsistent brand voice',
                desc: 'Posts read differently depending on who wrote them that day. One team holds a single, consistent voice across every platform.',
            },
            {
                title: 'No reporting, no idea what works',
                desc: 'Without reporting, nobody knows which posts earn reach or enquiries. Monthly analytics show what works and where the budget should go next.',
            },
        ],

        // Section 4 -our services
        s5Heading: 'Our Social Media Management Services',
        services: [
            {
                title: 'Social media strategy',
                desc: 'We audit your current presence, define content pillars, and match each platform to a clear business goal. The strategy sets the posting cadence, the tone, and the metrics that matter, so the work points at enquiries from day one. You approve the plan before any content goes live.',
            },
            {
                title: 'Content creation: graphics and short-form video',
                desc: 'Our team produces scroll-stopping graphics and short-form video built around your brand, the format that now drives the most reach. AI-accelerated workflows raise the volume and speed of production without dropping quality. The result is a steady stream of on-brand content that earns attention.',
            },
            {
                title: 'Scheduling and publishing',
                desc: 'We manage a content calendar and publish across your platforms at the times your audience engages most. Posts stay consistent and planned weeks ahead, not rushed out at the last minute. You see the calendar before anything ships.',
            },
            {
                title: 'Community management',
                desc: 'We reply to comments, messages, and mentions promptly, so engagement becomes conversation and conversation becomes enquiries. Active community management builds trust and surfaces leads that a quiet account would miss. Your audience gets a brand that responds.',
            },
            {
                title: 'Paid social management',
                desc: 'We plan and run paid social campaigns on Meta, TikTok, and LinkedIn, with targeting that puts spend in front of the right audience. Paid amplifies the organic content that already performs, so the budget follows proven winners. Every campaign reports against leads, not just impressions.',
            },
            {
                title: 'Analytics and reporting',
                desc: 'We track reach, engagement, and enquiries, then report monthly with plain insight and a clear next step. Reporting ties every action to a source, so you see which content drove results. The numbers guide the following month’s plan.',
            },
        ],

        // Section 5 -platforms we manage
        platformsHeading: 'Social Media Platforms We Manage',
        platformsIntro:
            'We recommend platforms by where your customers actually spend time, not by default. Each platform suits a different business type, and a focused presence on the right two or three beats a thin presence on all of them.',
        platforms: [
            {
                title: 'Instagram',
                desc: 'Visual and short-form content for consumer and local brands. Reels drive discovery, while Stories and posts keep an engaged audience close.',
            },
            {
                title: 'TikTok',
                desc: 'Short-form video built for reach and discovery. Right for brands ready to show personality and ride trends to a wider, younger audience.',
            },
            {
                title: 'LinkedIn',
                desc: 'B2B thought leadership and lead generation. The platform where decision-makers research suppliers, so it suits professional services and B2B sellers.',
            },
            {
                title: 'Facebook',
                desc: 'Local reach and community. Strong for local businesses, events, and groups, with a broad audience and mature targeting for paid.',
            },
            {
                title: 'YouTube',
                desc: 'Long-form video and search visibility. Right for brands with how-to, demo, or educational content that earns views for years.',
            },
            {
                title: 'Pinterest',
                desc: 'Visual discovery for ecommerce and lifestyle. Suits product brands in interiors, food, fashion, and weddings where people plan purchases.',
            },
        ],

        // Section 6 -organic vs paid
        orgPaidHeading: 'Organic vs Paid Social: How They Work Together',
        orgPaidIntro:
            'Organic and paid social do different jobs, and the strongest results come when one team runs both. Organic builds the audience and trust over time. Paid accelerates reach and enquiries on demand.',
        orgPaidPoints: [
            {
                title: 'Organic social',
                desc: 'Consistent content, community, and brand trust built steadily over time. Organic earns a loyal audience and proves which messages land before a penny of ad spend goes out.',
            },
            {
                title: 'Paid social',
                desc: 'Targeted reach and lead generation on Meta, TikTok, and LinkedIn. Paid puts your best content in front of the exact audience that matches your customers, and scales the winners fast.',
            },
            {
                title: 'Run together by one team',
                desc: 'Because the same team runs the content and the ad accounts, spend follows what already performs organically. No guesswork, no handover gap, no budget wasted on posts that never proved themselves.',
            },
        ],
        orgPaidVerdict:
            'Organic alone grows slowly. Paid alone burns budget on content that has not earned its place. Run together, they compound, and that is the gap pure-social agencies without paid expertise leave on the table.',

        // Section 7 -process
        s10Heading: 'Our Social Media Management Process, Step by Step',
        s10Intro:
            'Six stages take your social media from first audit to a channel that reports against leads. Production moves faster because we build content with AI-accelerated workflows, so you get more output at honest cost without a drop in quality.',
        processSteps: [
            {
                title: 'Audit and goals',
                desc: 'We review your current social presence, competitors, and audience, then agree the goals that define success. You leave with a clear baseline and targets tied to enquiries.',
            },
            {
                title: 'Strategy and content pillars',
                desc: 'We set the platforms, content pillars, and posting cadence that fit your brand and audience. You approve the strategy before production starts.',
            },
            {
                title: 'Content production',
                desc: 'Our team produces graphics and short-form video at pace through AI-accelerated workflows. You review content ahead of publishing, so nothing goes live without a check.',
            },
            {
                title: 'Scheduling and publishing',
                desc: 'We schedule and publish across your platforms at the times your audience engages most. Posts stay consistent and planned, never rushed.',
            },
            {
                title: 'Community engagement',
                desc: 'We reply to comments and messages, join relevant conversations, and act on trends while they matter. Your brand stays part of the conversation.',
            },
            {
                title: 'Reporting and optimisation',
                desc: 'We report monthly on reach, engagement, and enquiries, then adjust the plan around what works. Each month builds on the data from the last.',
            },
        ],

        // Section 8 -industries
        s11Heading: 'Social Media Management by Industry',
        industries: [
            {
                title: 'Ecommerce',
                desc: 'Product launches, user-generated content, and shoppable posts that turn followers into buyers across Instagram, TikTok, and Pinterest.',
                href: '/industries/ecommerce',
            },
            {
                title: 'Local businesses',
                desc: 'Community-led content, reviews, and local reach on Facebook and Instagram that bring nearby customers through the door.',
                href: '/industries/local-businesses',
            },
            {
                title: 'B2B companies',
                desc: 'LinkedIn thought leadership and lead generation that put your brand in front of decision-makers and feed the sales pipeline.',
                href: '/industries/b2b-companies',
            },
            {
                title: 'Healthcare clinics',
                desc: 'Trust-building, compliant content that informs patients and fills appointment books, with sensitivity to regulated claims.',
                href: '/industries/healthcare-clinics',
            },
            {
                title: 'Real estate',
                desc: 'Listing showcases, area guides, and short-form video tours that attract buyers, sellers, and landlords.',
                href: '/industries/real-estate',
            },
            {
                title: 'Professional services',
                desc: 'Authority-led content and LinkedIn presence that win trust and generate qualified enquiries for firms that sell expertise.',
                href: '/industries/professional-services',
            },
        ],

        // Section 9 -pricing
        s12Heading: 'Social Media Management Pricing in the UK',
        s12Intro:
            'Price follows scope, so the figure moves with what the work involves. The drivers below set where a package lands, and honest bands give you a guide before any call. Final pricing comes after a short strategy call, with ad spend always separate from the management fee.',
        costDrivers: [
            { title: 'Number of platforms', desc: 'More platforms mean more content, scheduling, and community work each month.' },
            { title: 'Content volume', desc: 'The number of posts per month sets much of the production workload.' },
            { title: 'Original video', desc: 'Short-form video and original shoots add production time on top of graphics.' },
            { title: 'Community management depth', desc: 'Light monitoring costs less than proactive, daily engagement and response.' },
            { title: 'Paid social', desc: 'Adding paid campaign management brings targeting, testing, and optimisation work.' },
            { title: 'Reporting depth', desc: 'Standard monthly reports cost less than detailed, lead-tracked reporting.' },
        ],
        pricingBands: [
            {
                name: 'Starter',
                range: '£500 to £900 per month',
                includes: 'Managed posting on 1 to 2 platforms, 8 to 12 posts per month, scheduling, light community management, and a monthly report.',
            },
            {
                name: 'Growth',
                range: '£900 to £1,800 per month',
                includes: 'Content-led management on 2 to 3 platforms, 12 to 20 posts per month, original graphics and short video, proactive community, and strategy.',
            },
            {
                name: 'Performance',
                range: '£1,800 to £3,000+ per month',
                includes: 'Full service across multiple platforms plus paid social management, content, and reporting tied to leads. Ad spend separate.',
            },
            {
                name: 'Add-ons',
                range: 'Priced on scope',
                includes: 'Paid ad management, video production days, and advanced reporting on top of any package.',
            },
        ],
        s12Note:
            'Rolling monthly or a short minimum term, with ad spend always separate from the management fee. You get an indicative figure on the strategy call and a confirmed price once the scope is clear. No guessed quotes, no surprise invoices.',

        // Section 10 -agency vs freelancer vs in-house vs software
        compHeading: 'Agency vs Freelancer vs In-House vs Software',
        compIntro:
            'Four ways exist to run social media, and the right one depends on budget, volume, and how much strategy you need. Read the comparison, then weigh it against your own situation.',
        comparisonTable: [
            {
                factor: 'Cost',
                agency: 'Mid-range monthly fee for a full team',
                freelancer: 'Low monthly fee for one person',
                inhouse: 'High: salary, tools, and training',
                software: 'Low licence fee, your time on top',
            },
            {
                factor: 'Consistency',
                agency: 'High: a team covers holidays and sick days',
                freelancer: 'Variable: one person, one point of failure',
                inhouse: 'High while the role is filled',
                software: 'Depends entirely on your team’s discipline',
            },
            {
                factor: 'Strategy depth',
                agency: 'Strong: strategists, creators, and analysts',
                freelancer: 'Varies with the individual',
                inhouse: 'Strong if you hire senior, limited if junior',
                software: 'None: tools schedule, they do not strategise',
            },
            {
                factor: 'Paid social capability',
                agency: 'Built in when the agency runs ads too',
                freelancer: 'Rare in one freelancer',
                inhouse: 'Needs a separate paid specialist',
                software: 'Not included: a tool, not a marketer',
            },
            {
                factor: 'Scalability',
                agency: 'Scales up or down with your needs',
                freelancer: 'Capped by one person’s hours',
                inhouse: 'Slow: more output means more hires',
                software: 'Scales only as far as your team’s time',
            },
        ],
        compVerdict:
            'Software suits DIY teams with time and discipline. A freelancer suits light, low-budget needs. An in-house hire suits high-volume brands that have the budget to employ. An agency suits businesses that want strategy, content, and paid handled together without hiring, which is where our integrated model fits. When an agency is not the right answer for your stage, we say so.',

        // Section 11 -why choose us
        s13Heading: 'Why Growing Businesses Choose Webspires for Social Media',
        whyChoose: [
            {
                title: 'Performance over vanity metrics',
                desc: 'We tie content to enquiries and revenue, not follower counts. Reporting shows the leads social generated, so the channel earns its budget.',
            },
            {
                title: 'One team for social, paid, and SEO',
                desc: 'The same team runs your organic social, your paid ads, and your SEO. Content, spend, and search pull in one direction instead of three.',
            },
            {
                title: 'AI-accelerated content at honest pricing',
                desc: 'Modern AI tooling raises content volume and speed without cutting quality, so SMEs get more output at a fair, transparent cost.',
            },
            {
                title: 'Direct access to the people doing the work',
                desc: 'You talk to the team running your account, not a layer of account managers. A UK base and a one working day response keep things moving.',
            },
        ],

        // Section 12 -case study
        s14Heading: 'Social Media Work That Drove Results',
        caseProblem:
            'Our own social channels ran in fits and starts. Posts went out when someone found a spare hour, the voice drifted between team members, and nothing tied the effort back to enquiries.',
        caseSolution:
            'We applied the same service we sell: a content calendar, defined pillars, short-form video produced through AI-accelerated workflows, proactive community management, and monthly reporting tied to leads.',
        caseOutcome:
            'Posting became consistent and planned weeks ahead, the brand voice held steady across platforms, and enquiries from social started landing in the pipeline with their source attached.',
        caseMetric: '',
        caseNote:
            'We publish results we stand behind. As client social campaigns complete and the metrics gain approval, we add them here with named outcomes.',

        // Section 13 -CTA
        s15Heading: 'Book a Free Social Media Strategy Call',
        s15Body:
            'On a short call, the Webspires team reviews your current social presence, recommends the platforms and content that fit your goals, and gives you an indicative quote. No obligation, no hard sell, just a clear next step.',

        // Section 14 -FAQ
        faqHeading: 'Social Media Management FAQs',
        faqs: [
            {
                q: 'What does social media management include?',
                a: 'Social media management includes strategy, content creation, scheduling and publishing, community management, paid social support, and monthly reporting. The work runs as an ongoing cycle that keeps your brand consistent across platforms and ties activity back to enquiries and revenue, rather than a one-off burst of posts.',
            },
            {
                q: 'How much does social media management cost in the UK?',
                a: 'UK social media management runs from roughly £500 per month for managed posting on one or two platforms to £1,800 and above for full service with paid social. Price depends on platforms, content volume, video, and reporting depth. Ad spend always sits separate from the management fee.',
            },
            {
                q: 'How many posts will you publish per month?',
                a: 'Most packages run between 8 and 20 posts per month, set by your plan and platforms. A Starter package covers 8 to 12 posts, while a content-led package runs 12 to 20 with original graphics and short-form video. We agree the exact volume on the strategy call.',
            },
            {
                q: 'Which platforms should my business be on?',
                a: 'The right platforms depend on where your customers spend time. Consumer and local brands tend to suit Instagram, TikTok, and Facebook, while B2B and professional services suit LinkedIn. We recommend a focused presence on the two or three platforms that match your audience, not all of them at once.',
            },
            {
                q: 'Do you handle paid social ads too?',
                a: 'Yes. The same team runs your organic content and your paid social on Meta, TikTok, and LinkedIn. Because one team handles both, paid spend follows the content that already performs organically, so the budget backs proven winners instead of guesses. Ad spend stays separate from the management fee.',
            },
            {
                q: 'How do you measure social media ROI?',
                a: 'We track reach and engagement, then go further and tie social activity to enquiries and revenue. Monthly reporting shows which content and campaigns generated leads, with sources attached. Performance, not follower counts, is the measure, so you see the return the channel delivers in plain numbers.',
            },
            {
                q: 'Is there a minimum contract?',
                a: 'We work on rolling monthly terms or a short minimum, depending on the package and goals. Social media needs a few months to build momentum and prove what works, so a short commitment gives the strategy time to land. We confirm the terms before you start.',
            },
            {
                q: 'Should I hire an agency, a freelancer, or use software?',
                a: 'Software suits DIY teams with time, a freelancer suits light and low-budget needs, and an in-house hire suits high-volume brands. An agency suits businesses that want strategy, content, and paid handled together without hiring. In 2026, with short-form video raising the workload, an integrated team often delivers the most for the budget.',
            },
        ],
    },

    {
        slug: 'google-ads-management',

        // Meta
        metaTitle: 'Google Ads Management Services UK | Webspires',
        metaDescription:
            'Performance-focused Google Ads management in the UK. We turn ad spend into qualified enquiries, with transparent flat-fee pricing, no markup on spend, and you own your account. Get a free Google Ads audit.',

        // Hero (Section 1)
        h1: 'Google Ads Management Services That Turn Spend Into Enquiries',
        heroSub:
            'More qualified enquiries at a lower cost per enquiry, not vanity clicks. Webspires builds, manages, and optimises your Google Ads, tracks every lead, and reports in plain English. The wedge sits in the first line: transparent flat-fee pricing, no markup on ad spend, you own your account, and one team that also runs your SEO and landing pages. UK businesses get paid search that answers to revenue in 2026, run by senior people who pick up the phone.',
        heroChips: [
            'UK-based ads team',
            '5-star rated',
            'You own your account',
            'No markup on ad spend',
        ],

        // Section 2 -what it includes
        s2Heading: 'What Google Ads Management Includes',
        s2Definition:
            'Google Ads management is the ongoing strategy, build, optimisation, tracking, and reporting that turns a Google Ads budget into measurable enquiries and sales. The work covers the whole account, from keyword selection and ad copy to bidding, conversion tracking, and the monthly reporting that proves what the spend returned.',
        buildRoutes: [
            { title: 'Account audit', desc: 'A full review of structure, spend, and tracking to find where budget leaks.' },
            { title: 'Keyword research', desc: 'The high-intent searches that signal real buying intent, not just volume.' },
            { title: 'Campaign build', desc: 'Clean, themed campaign structure so every pound stays relevant.' },
            { title: 'Ad copywriting', desc: 'Responsive search ads written to win qualified clicks and filter the rest.' },
            { title: 'Bid management', desc: 'Bid strategies aligned to cost per enquiry and profitable products.' },
            { title: 'Negative keywords', desc: 'Ongoing exclusion of irrelevant searches that drain the budget.' },
            { title: 'Conversion tracking', desc: 'Accurate measurement of calls, forms, and sales through GA4 and tags.' },
            { title: 'Reporting', desc: 'Plain-English monthly reporting tied to leads and cost per enquiry.' },
        ],
        s2Adoption:
            'Through 2026, automation and Performance Max reshaped what good management looks like, so the value now sits in tight tracking, strong creative, and human guardrails rather than leaving Google to spend on autopilot.',

        // Section 3 -why accounts waste money
        s4Heading: 'Why Most Google Ads Accounts Waste Money',
        s4Intro:
            'Most underperforming accounts leak budget in the same predictable places. In 2026, automation and Performance Max make tracking and guardrails more important than ever, because spend drains faster on Google’s defaults. The six mistakes below name the fix for each.',
        outgrownSigns: [
            { title: 'Broad keywords pulling clicks, not customers', desc: 'Generic broad match attracts searches that never convert. Tight keyword and match-type control points spend at real buyers.' },
            { title: 'Missing negative keywords', desc: 'Without negatives, budget bleeds on irrelevant searches. A managed negative list cuts the waste week after week.' },
            { title: 'Broken or missing conversion tracking', desc: 'Without accurate tracking, every optimisation is a guess. Correct GA4 and tag setup turns decisions into evidence.' },
            { title: 'Landing pages that do not convert', desc: 'Paid clicks land on weak pages and bounce. Conversion-focused pages turn the traffic you pay for into enquiries.' },
            { title: 'Performance Max left on autopilot', desc: 'PMax spends freely without guardrails. Asset, audience, and exclusion controls keep it pointed at profit.' },
            { title: 'An agency that went quiet', desc: 'Set-and-forget management lets results slide. Active, senior optimisation and clear reporting keep the account sharp.' },
        ],

        // Section 4 -our services
        s5Heading: 'Our Google Ads Management Services',
        services: [
            { title: 'Account audit and strategy', desc: 'We review your account structure, spend, and tracking, then set a strategy around your goals and margins. You start with a clear plan and a baseline. The outcome: less wasted spend from day one.' },
            { title: 'Keyword and search-term research', desc: 'We find the high-intent searches that lead to enquiries and map the negatives that do not. Targeting follows buying intent, not raw volume. The outcome: clicks that convert.' },
            { title: 'Campaign build and structure', desc: 'We build clean, themed campaigns and ad groups so every search stays relevant to its ad. Structure keeps quality scores up and costs down. The outcome: more reach for the same budget.' },
            { title: 'Ad copywriting and assets', desc: 'We write responsive search ads and assets that win qualified clicks and repel the wrong ones. Strong creative lifts click-through and conversion together. The outcome: a lower cost per enquiry.' },
            { title: 'Bid and budget management', desc: 'We set bid strategies and budgets aligned to cost per enquiry and your profitable services. Spend concentrates where it returns. The outcome: budget that follows profit.' },
            { title: 'Negative keyword refinement', desc: 'We review search terms and exclude the irrelevant ones on a continuous cycle. The waste list shrinks every month. The outcome: a cleaner, cheaper account.' },
            { title: 'Conversion tracking setup', desc: 'We configure GA4, Google Tag Manager, and call tracking so calls, forms, and sales all register. Accurate data underpins every decision. The outcome: optimisation you trust.' },
            { title: 'Ongoing optimisation', desc: 'We test ads, bids, and audiences and act on the data, with every change made by a person. Performance compounds week on week. The outcome: results that improve, not drift.' },
            { title: 'Plain-English reporting', desc: 'We report monthly on leads, cost per enquiry, and what changed, without jargon. You see exactly what the spend returned. The outcome: full clarity on ROI.' },
        ],

        // Section 5 -campaign types (cards link to child silo pages where they exist)
        campaignTypesHeading: 'Google Ads Campaign Types We Manage',
        campaignTypesIntro:
            'Each campaign type does a different job. We match the mix to your goals, your margins, and where your buyers already are, then manage every type to a cost-per-enquiry target.',
        campaignTypes: [
            { title: 'Search Ads', desc: 'Capture active demand from people searching for what you sell, the highest-intent moment in Google.', href: '/services/google-ads-management/search-ads' },
            { title: 'Shopping Ads', desc: 'Put products, prices, and images in front of ready buyers, with a feed structured around margin.', href: '/services/google-ads-management/google-shopping-ads' },
            { title: 'Performance Max', desc: 'Reach across Search, Shopping, YouTube, and Display, managed with guardrails rather than autopilot.', href: '/services/google-ads-management/performance-max' },
            { title: 'Display Ads', desc: 'Build awareness and reach across the Google Display Network with audience targeting that stays relevant.', href: '' },
            { title: 'YouTube Ads', desc: 'Turn video views into demand with targeted placements that reach buyers before competitors do.', href: '' },
            { title: 'Remarketing', desc: 'Re-engage warm visitors who left without converting and bring them back to finish the job.', href: '/services/google-ads-management/remarketing' },
        ],

        // Section 6 -conversion tracking (reuses s7 heading/body + integrations chips)
        s7Heading: 'Conversion Tracking and Reporting in Plain English',
        s7Body:
            'Accurate tracking comes first, because no agency proves ROAS or optimises honestly without it. We set up conversion tracking for calls, forms, and sales through GA4 and Google Tag Manager, add call tracking for businesses that close by phone, and import offline conversions for sales that complete in person or later in your CRM. Reporting then ties every pound to leads and cost per enquiry, not vanity clicks. You get a monthly report in plain English that shows what changed, what it cost, and what happens next.',
        integrations: ['GA4', 'Google Tag Manager', 'Call tracking', 'Offline conversion import'],

        // Section 7 -pricing (costDrivers used as the fee-vs-spend panels)
        s12Heading: 'Google Ads Management Pricing in the UK',
        s12Intro:
            'Two numbers matter, and they are separate. The management fee is what you pay our team. The ad spend is what goes to Google. We never mark up your ad spend, so every pound of budget reaches the auction. The tiers below are indicative, with the final fee set after a free audit.',
        costDrivers: [
            { title: 'Management fee (what you pay us)', desc: 'A flat monthly fee for strategy, build, optimisation, tracking, and reporting. Fixed and predictable, billed rolling monthly.' },
            { title: 'Ad spend (what goes to Google)', desc: 'Your advertising budget, paid directly to Google. Separate from our fee, with no markup added by us.' },
        ],
        pricingBands: [
            { name: 'Starter', range: 'Ad spend up to £1,000/mo · from £200/mo management', includes: 'One to two campaigns, keyword and negative management, conversion tracking, and a monthly report. Right for businesses starting paid search.' },
            { name: 'Growth', range: 'Ad spend £1,000 to £3,000/mo · from £400/mo management', includes: 'Multi-campaign management, search and shopping, ongoing optimisation, call tracking, and strategy reviews. Most popular for growing UK businesses.' },
            { name: 'Scale', range: 'Ad spend £3,000 to £10,000/mo · from £650/mo management', includes: 'Full account management across campaign types, Performance Max with guardrails, advanced tracking, and senior strategic input.' },
        ],
        s12Note:
            'Ad spend is separate and paid to Google, with no markup. Management is rolling monthly with no long contracts, and you own your account and data throughout. Final pricing follows a free audit, once the scope is clear.',

        // Section 8 -process
        s10Heading: 'Our Google Ads Management Process, Step by Step',
        s10Intro:
            'Seven stages take your account from a free audit to a campaign that reports against enquiries. Optimisation moves faster with AI-accelerated analysis, and every change gets made by a person, never left to Google’s automation.',
        processSteps: [
            { title: 'Free audit and discovery', desc: 'We review your account, goals, and margins, then agree what success looks like. You leave with a clear baseline and priorities.' },
            { title: 'Competitor and keyword research', desc: 'We map the high-intent searches and study how competitors bid. Targeting follows buying intent and profitable demand.' },
            { title: 'Conversion tracking setup', desc: 'We configure GA4, tags, and call tracking before launch. Accurate data underpins every decision that follows.' },
            { title: 'Campaign build', desc: 'We build clean, themed campaigns with strong ad copy and assets. Structure keeps spend relevant and efficient.' },
            { title: 'Launch', desc: 'We launch with the right bids, budgets, and guardrails in place. Early spend gathers the data that guides optimisation.' },
            { title: 'Data gathering and optimisation', desc: 'We test, refine, and cut waste on a continuous cycle, with AI-accelerated analysis and human decisions. Cost per enquiry falls as the account matures.' },
            { title: 'Monthly report and strategy', desc: 'We report in plain English and agree the next month’s plan together. You always know what happened and what comes next.' },
        ],

        // Section 9 -industries
        s11Heading: 'Google Ads Management by Industry',
        industries: [
            { title: 'Ecommerce', desc: 'Shopping and Performance Max campaigns structured around margin and ROAS, with feeds tuned to your best-sellers.', href: '/industries/ecommerce' },
            { title: 'Local businesses', desc: 'Local search campaigns and call tracking that turn nearby searches into calls and bookings.', href: '/industries/local-businesses' },
            { title: 'B2B companies', desc: 'Qualified-lead campaigns with offline conversion import, so spend follows the leads that become deals.', href: '/industries/b2b-companies' },
            { title: 'Healthcare clinics', desc: 'Compliant local lead generation that fills appointment books while respecting regulated claims.', href: '/industries/healthcare-clinics' },
            { title: 'Real estate', desc: 'Targeted campaigns for valuations, lettings, and listings that reach buyers, sellers, and landlords at the right moment.', href: '/industries/real-estate' },
            { title: 'Professional services', desc: 'High-intent search campaigns that bring qualified enquiries to firms that sell expertise.', href: '/industries/professional-services' },
        ],

        // Section 10 -comparison: PPC vs SEO block + agency/freelancer/in-house table
        ppcSeoPoints: [
            { title: 'Google Ads (paid search)', desc: 'Fast, controllable demand capture. Spend goes live and brings enquiries within days, with full control over budget, targeting, and messaging.' },
            { title: 'SEO (organic search)', desc: 'Compounding long-term value. Organic rankings build slowly and lower cost per lead over time, without paying for every click.' },
        ],
        ppcSeoVerdict:
            'Paid captures demand now. Organic compounds later. Most businesses need both, so we run paid search here and handle SEO under the same roof.',
        compHeading: 'Google Ads vs SEO, and Agency vs Freelancer vs In-House',
        compIntro:
            'Beyond the channel question sits the management question. Three routes run a Google Ads account, and the right one depends on spend, expertise, and whether you want to hire.',
        comparisonTable: [
            { factor: 'Cost', agency: 'Flat monthly fee, no hire or tools to fund', freelancer: 'Low fee, variable scope', inhouse: 'Salary, tools, and training to fund', software: '' },
            { factor: 'Expertise', agency: 'Senior, multi-account experience', freelancer: 'Varies with the individual', inhouse: 'One person’s knowledge, hard to cover', software: '' },
            { factor: 'Consistency', agency: 'A team covers leave and never goes quiet', freelancer: 'One point of failure', inhouse: 'Gaps when the role is empty', software: '' },
            { factor: 'Tracking capability', agency: 'Full GA4, tags, call, and offline tracking', freelancer: 'Often basic or skipped', inhouse: 'Depends on the hire', software: '' },
            { factor: 'Account ownership', agency: 'You own the account and data with us', freelancer: 'Usually yours, varies', inhouse: 'Yours by default', software: '' },
        ],
        compVerdict:
            'A freelancer suits light, low-budget accounts. An in-house hire suits high-spend brands with the volume to justify a salary. An agency suits businesses that want senior expertise and proper tracking without hiring. When your spend does not yet justify management, we say so.',

        // Section 11 -why choose us
        s13Heading: 'Why Businesses Choose Webspires for Google Ads',
        whyChoose: [
            { title: 'You own your account and data', desc: 'The Google Ads account stays yours, set up under your ownership from day one. Leave whenever you want and keep everything.' },
            { title: 'No markup on ad spend', desc: 'Every pound of budget reaches the auction. We charge a flat management fee and never take a cut of your spend.' },
            { title: 'No long contracts', desc: 'Management runs rolling monthly. We earn the next month by performing, not by locking you in.' },
            { title: 'Plain-English reporting', desc: 'Monthly reporting tied to leads and cost per enquiry, with no jargon and no vanity metrics.' },
            { title: 'One team for ads, SEO, social, and CRO', desc: 'The same team runs your paid search, SEO, social, and conversion work, so the whole funnel pulls together.' },
            { title: 'AI-accelerated optimisation at honest pricing', desc: 'Modern AI tooling speeds analysis, while people make every decision, so you get sharper management at a fair fee.' },
            { title: 'Senior management, direct access', desc: 'A senior UK specialist runs your account and answers directly, not a junior behind an account manager.' },
        ],

        // Section 12 -results
        s14Heading: 'Real Google Ads Results',
        caseProblem:
            'Our own early Google Ads ran without tight tracking. Broad keywords pulled clicks that never became enquiries, negatives were thin, and no report tied spend to leads, so nobody knew the true cost per enquiry.',
        caseSolution:
            'We rebuilt the account the way we build clients’ accounts: clean campaign structure, a managed negative list, GA4 and call tracking wired up properly, conversion-focused landing pages, and weekly optimisation against cost per enquiry.',
        caseOutcome:
            'Wasted spend on irrelevant searches fell sharply, tracking finally showed which campaigns drove enquiries, and the cost per enquiry dropped month on month as the account matured.',
        caseMetric: '',
        caseNote:
            'We publish results we stand behind. As client Google Ads results gain approval, we add them here with named cost-per-enquiry and lead figures.',

        // Section 13 -CTA
        s15Heading: 'Get a Free Google Ads Audit',
        s15Body:
            'On a free audit, the Webspires team reviews your account structure, finds wasted spend, checks your tracking, and shows the quick wins. No obligation, and you keep the findings whether you work with us or not.',

        // Section 14 -FAQ
        faqHeading: 'Google Ads Management FAQs',
        faqs: [
            { q: 'How much does Google Ads management cost in the UK?', a: 'UK Google Ads management fees typically run from around £200 per month for smaller accounts to £650 and above for higher-spend management. The fee depends on ad spend, campaign types, and complexity. Ad spend is separate and paid directly to Google, with no markup from us.' },
            { q: 'What is the difference between the management fee and my ad budget?', a: 'The management fee pays our team to build, run, and optimise your campaigns. The ad budget is the money Google charges for clicks and impressions. They are separate, the budget goes straight to Google, and we never add a markup to it.' },
            { q: 'Is there a minimum ad spend?', a: 'No fixed minimum, though paid search needs enough budget to gather data and compete in the auction. For most UK small businesses, a starting budget of a few hundred pounds a month gives campaigns room to prove themselves. We recommend a realistic figure after the audit.' },
            { q: 'Am I tied into a long contract?', a: 'No. Management runs on rolling monthly terms with no long lock-in. You own your Google Ads account and data throughout, so you keep everything and leave whenever you choose. We hold onto clients by performing, not by contracts.' },
            { q: 'How long until I see results?', a: 'Search campaigns often generate enquiries within days of launch, then improve as the account gathers data and gets optimised over the following weeks. In 2026, with more automation in play, the first few weeks of tight tracking and refinement matter more than ever for a low cost per enquiry.' },
            { q: 'Do I own my account and data?', a: 'Yes. We set up and run the campaigns inside an account you own, so the history, data, and assets stay with you. If you ever leave, you take the account intact. No agency holds your account hostage.' },
            { q: 'Should I hire an agency, a freelancer, or run it in-house?', a: 'A freelancer suits light, low-budget accounts, an in-house hire suits high-spend brands with the volume to justify a salary, and an agency suits businesses that want senior expertise and proper tracking without hiring. We give an honest steer during the audit, even when the answer is not us.' },
            { q: 'Is PPC better than SEO?', a: 'Neither wins outright, because they do different jobs. Paid search captures demand fast and gives full control over budget and targeting, while organic search compounds value over time. Most businesses need both, and we run paid search here while handling SEO under the same roof.' },
        ],
    },

    {
        slug: 'generative-engine-optimisation',

        // Meta - flagship hub of the AI-search silo. Owns GEO/AEO/AI-search
        // terms; routes traditional SEO to /services/seo. /services/geo 301s in.
        metaTitle: 'GEO Agency UK | Generative Engine & Answer Engine Optimisation | Webspires',
        metaDescription:
            'Get found and recommended in AI search. We make your brand the answer in ChatGPT, Perplexity, Gemini, and Google AI Overviews, with real citation tracking and a topical-authority method. Transparent pricing. Get a free AI visibility audit.',

        // Hero (Section 1)
        h1: 'Be the Answer AI Gives',
        heroSub:
            'When customers ask ChatGPT, Perplexity, Gemini, or Google AI Overviews for a recommendation, your brand is the one named and cited. Webspires runs GEO grounded in real SEO and a topical-authority method, tracks your citations across every major AI engine, works your whole footprint rather than your website alone, and prices it transparently. UK businesses get found and recommended at the exact moment a buyer asks an AI which option to choose.',
        heroChips: [
            'ChatGPT, Perplexity, Gemini, AI Overviews',
            'Real citation tracking',
            'SEO-grounded GEO',
            'Own your data',
        ],

        // Section 2 - what GEO is (definition + term chips)
        s2Heading: 'What Generative Engine Optimisation Is',
        s2Definition:
            'Generative engine optimisation is the work that makes a brand the cited, recommended answer when people search with AI engines like ChatGPT, Perplexity, Gemini, and Google AI Overviews. The work shapes how AI systems understand, trust, and quote a business, so the brand appears inside the answer rather than a link buried beneath it.',
        buildRoutes: [
            { title: 'GEO', desc: 'Generative engine optimisation: being cited and recommended inside AI-generated answers.' },
            { title: 'AEO', desc: 'Answer engine optimisation: the same shift, framed around answering the question directly.' },
            { title: 'AI search', desc: 'The umbrella term for discovery happening inside AI assistants and AI Overviews.' },
        ],
        s2Adoption:
            'Through 2026, AI Overviews appear across a large share of Google searches and a growing share of buyers ask AI assistants for recommendations, so discovery increasingly happens inside the answer rather than the list of links beneath it.',

        // Section 3 - why GEO now (editorial + stat tiles + reason cards)
        s3Heading: 'Why Search Is Moving to AI, and Why It Matters Now',
        s3Intro:
            'Search behaviour is shifting. AI Overviews now sit above the classic results on a large share of queries and answer the question before a user clicks, and a growing number of buyers open ChatGPT or Perplexity instead of a results page. A brand absent from those answers loses the recommendation before the customer ever reaches its site.',
        statTiles: [
            { value: 'Above the results', label: 'AI Overviews now answer many queries before the first click' },
            { value: 'Ask, not scroll', label: 'Buyers increasingly ask AI assistants for a recommendation' },
            { value: 'Cited sources win', label: 'A handful of trusted sources shape each AI answer' },
        ],
        outgrownSigns: [
            { title: 'Claim the position early', desc: 'AI engines favour the sources they already trust. Brands cited today build a lead that later entrants struggle to displace.' },
            { title: 'Capture high-intent AI traffic', desc: 'People who ask an AI for a recommendation sit close to a decision. Being the named answer puts you in front of demand at its sharpest.' },
            { title: 'Build authority that compounds', desc: 'Entity clarity and trusted citations strengthen over time. The work done now keeps paying back as AI search grows.' },
        ],

        // Section 4 - our GEO services
        s5Heading: 'Our GEO Services',
        services: [
            { title: 'AI visibility audit', desc: 'We test how ChatGPT, Perplexity, Gemini, and AI Overviews answer the questions in your market and where your brand stands today. You see where you are cited, where you are missing, and who wins instead. The outcome: a clear GEO baseline and priority list.' },
            { title: 'Entity and authority building', desc: 'We define your brand as a recognised entity across your site and the wider web, using the topical-authority method so AI engines understand and trust it. Consistent, connected facts replace a thin or muddled footprint. The outcome: accurate, confident citations.' },
            { title: 'Citation-optimised content', desc: 'We build fact-dense, answer-led content structured for direct quotation, not keyword-stuffed blog posts. Each page answers a real buyer question cleanly and completely. The outcome: content AI engines quote and recommend.' },
            { title: 'Structured data and schema', desc: 'We add FAQ, organisation, and entity schema so the machine-readable layer matches the human one. Clean data feeds models the right facts about your business. The outcome: a brand AI systems read correctly.' },
            { title: 'Whole-footprint optimisation', desc: 'We work the sources AI engines actually pull from: Reddit, G2, Capterra, comparison pages, third-party mentions, and YouTube, not your website alone. Influence the inputs and you influence the answer. The outcome: presence across the sources that shape AI responses.' },
            { title: 'AEO for local and near-me', desc: 'We optimise for the local and "near me" recommendations buyers now ask AI assistants for, tied to your Google Business Profile and local entity signals. Local intent meets the AI answer. The outcome: recommendations when nearby buyers ask AI who to choose.' },
        ],

        // Section 5 - how we measure AI visibility (s7 + engine chips, signature)
        s7Heading: 'How We Measure AI Visibility',
        s7Body:
            'Real GEO lives or dies on measurement. We track a defined set of your core buyer queries across ChatGPT, Perplexity, Gemini, Claude, and Google AI Overviews, then report whether your brand is cited and, more importantly, recommended, because a citation is not a recommendation. We never pass off Search Console impressions as AI visibility. You see before-and-after on AI mentions, which queries moved, and where the next gain sits. Some of this is firmly measurable today and some is still emerging, and we tell you which is which.',
        integrations: ['ChatGPT', 'Perplexity', 'Gemini', 'Claude', 'Google AI Overviews', 'AI Mode'],

        // Section 6 - GEO vs SEO vs AEO (paper break)
        compHeading: 'GEO vs SEO vs AEO, Explained',
        compIntro:
            'Buyers ask about all three, so here is the plain version. SEO is visibility in classic search results. GEO and AEO are visibility and recommendation inside AI answers, with AEO framed around answering the question directly. The three share a technical foundation, which is why GEO works best grounded in strong SEO.',
        ppcSeoPoints: [
            { title: 'SEO', desc: 'Wins rankings, clicks, and organic traffic on the classic results page. SEO remains the foundation of being found on Google.' },
            { title: 'GEO and AEO', desc: 'Win citations and recommendations inside AI answers, where a growing share of questions now end. GEO captures the visibility SEO alone leaves on the table.' },
        ],
        ppcSeoVerdict:
            'Most businesses need both. Our model is SEO-grounded, not a pure-play GEO shop that launched last year, so the entity, content, and authority work feeds your rankings and your AI citations at once.',

        // Section 7 - process
        s10Heading: 'Our GEO Process, Step by Step',
        s10Intro:
            'Five phases take your brand from invisible in AI search to cited and recommended across the engines. The method is built on real SEO and the topical-authority approach, AI-accelerated where it speeds the work, with a person making the calls that shape how models see you.',
        processSteps: [
            { title: 'AI visibility audit', desc: 'We test how the engines answer your market and map where you appear, where you do not, and who wins instead. You leave with a clear baseline and the biggest gaps named.' },
            { title: 'Authority and entity foundation', desc: 'We define your brand as a recognised entity and build topical authority across your core subjects. The foundation makes everything downstream faster and more durable.' },
            { title: 'Citation content and technical execution', desc: 'We produce answer-led, fact-dense content and add the schema and structured data AI engines read. Your site becomes quotable by machines and useful to people.' },
            { title: 'Whole-footprint and third-party work', desc: 'We earn mentions and correct facts across Reddit, review sites, comparison pages, and the sources AI engines trust. The inputs to the answer start to favour you.' },
            { title: 'Measurement and acceleration', desc: 'We track citations and recommendations across the engines and double down on what moves. AI visibility becomes a channel you watch and grow, not a guess.' },
        ],

        // Section 8 - is GEO right for your business (qualifier + business types)
        s11Heading: 'Is GEO Right for Your Business',
        s11Intro:
            'GEO suits businesses whose customers research with AI and where being recommended drives real growth. Here is the honest part most agencies skip: GEO and AEO are not only for enterprise SaaS. UK SMEs and local businesses win too, because customers now ask AI for the best option near them and the best provider in their town, and almost no one optimises for it yet.',
        industries: [
            { title: 'SaaS and B2B', desc: 'Inclusion in AI answers during research and vendor comparison, where long buying journeys now begin.', href: '/industries/b2b-companies' },
            { title: 'Ecommerce', desc: 'Product and category visibility when buyers ask AI what to buy and which brand to trust.', href: '/industries/ecommerce' },
            { title: 'Professional services', desc: 'Authority-led citations that name expert firms when buyers ask AI who to trust.', href: '/industries/professional-services' },
            { title: 'Local and SME businesses', desc: 'Recommendations when nearby buyers ask AI for the best option near them, tied to local entity signals.', href: '/industries/local-businesses' },
        ],

        // Section 9 - pricing (paper break)
        s12Heading: 'GEO Pricing in the UK',
        s12Intro:
            'Honest first: cheap GEO is usually repackaged content with a new label, and credible GEO is an ongoing system that builds over months. The tiers below are indicative, set finally after a free AI visibility audit, and GEO runs standalone or bundles with your SEO.',
        pricingBands: [
            { name: 'Foundation / AEO', range: 'from £600/mo', includes: 'AI visibility audit, entity and schema foundation, and answer-led content on your core queries. Right for brands starting GEO.' },
            { name: 'Growth', range: 'from £1,200/mo', includes: 'Ongoing citation content, whole-footprint work, and tracking across the major engines. The popular choice for businesses competing for AI answers.' },
            { name: 'Authority', range: 'from £2,500/mo', includes: 'Competitive markets, the full footprint, digital PR for AI citations, and fast iteration with senior strategy.' },
        ],
        s12Note:
            'Bands are indicative and confirmed after a free AI visibility audit. Retainers run rolling monthly with no long contracts, GEO bundles with SEO when it makes sense, and the audit findings are yours to keep either way.',

        // Section 10 - why choose us
        s13Heading: 'Why Businesses Choose Webspires for GEO',
        whyChoose: [
            { title: 'SEO-grounded, not rebranded', desc: 'Our GEO sits on real SEO and content foundations, not a pure-play shop that appeared last year and not an old SEO checklist with a new name.' },
            { title: 'Koray topical-authority method', desc: 'We build your brand as a recognised entity with genuine topical authority, the signal AI engines lean on when they choose what to cite.' },
            { title: 'Real citation tracking', desc: 'We track a defined query set across every major AI engine and report cited versus recommended, never Search Console impressions dressed up as AI visibility.' },
            { title: 'Whole-footprint authority', desc: 'We work Reddit, review sites, comparison pages, and the third-party sources the engines pull from, not your website alone.' },
            { title: 'Recommended, not just mentioned', desc: 'We optimise for being named as the answer, because a passing mention is not the same as the recommendation a buyer acts on.' },
            { title: 'Transparent pricing, you own your data', desc: 'Clear retainers, no long contracts, and content and data that stay yours. You always know what you pay for.' },
            { title: 'One team across SEO, content, and CRO', desc: 'The same team runs your AI search, organic search, and conversion work, so visibility turns into enquiries instead of stopping at a citation.' },
            { title: 'GEO made accessible to SMEs', desc: 'We bring AI search within reach of UK SMEs and local businesses, not just enterprise budgets.' },
        ],

        // Section 11 - results
        s14Heading: 'Real GEO Results',
        caseProblem:
            'Our own brand sat outside the AI conversation. Ask ChatGPT or Perplexity about our services and other agencies surfaced, while our facts across the web were thin, scattered, and sometimes wrong.',
        caseSolution:
            'We ran our own GEO programme: a clear entity definition, topical-authority content, schema across the site, citations earned from trusted third-party sources, and tracking across the major engines.',
        caseOutcome:
            'The engines began naming us for relevant questions, the facts they repeated turned accurate, and enquiries that started inside an AI answer arrived as a visible, growing channel.',
        caseMetric: '',
        caseNote:
            'We publish results we stand behind. As client GEO programmes mature and the metrics gain approval, we add them here with named citation and enquiry figures.',

        // Section 12 - CTA
        s15Heading: 'Get a Free AI Visibility Audit',
        s15Body:
            'Book a free AI visibility audit and the Webspires team shows where your brand is and is not cited across ChatGPT, Perplexity, Gemini, and AI Overviews today, the queries you are missing, and the quickest wins. No obligation, and the findings are yours to keep.',

        // Section 13 - FAQ
        faqHeading: 'GEO FAQs',
        faqs: [
            { q: 'What is generative engine optimisation (GEO)?', a: 'Generative engine optimisation is the work of getting your brand cited and recommended inside AI-generated answers from engines like ChatGPT, Perplexity, Gemini, and Google AI Overviews. Rather than ranking a link, GEO makes your business the source the AI quotes when a buyer asks a question.' },
            { q: 'What is the difference between GEO, AEO, and SEO?', a: 'SEO earns rankings and clicks on the classic results page. GEO and AEO earn citations and recommendations inside AI answers, with AEO framed around answering the question directly. They share a technical foundation, which is why GEO works best grounded in strong SEO rather than bolted on.' },
            { q: 'Will GEO replace SEO?', a: 'No. AI answers and classic results sit side by side, and most businesses need both. Strong SEO foundations make GEO faster and more durable, while GEO extends your reach into the AI surfaces where a growing share of questions now end. We run them together.' },
            { q: 'How do you measure AI visibility?', a: 'We track a defined set of your core buyer queries across ChatGPT, Perplexity, Gemini, Claude, and Google AI Overviews, then report whether your brand is cited and whether it is recommended. A citation is not a recommendation, so we measure both, and we never pass off Search Console impressions as AI visibility.' },
            { q: 'How do you check if my brand appears in ChatGPT or Perplexity?', a: 'We run your real buyer questions through each engine, record whether your brand is named and how accurately, and benchmark against competitors. That becomes a tracked query set we monitor over time, so you see movement rather than a one-off snapshot.' },
            { q: 'How long does GEO take to work?', a: 'Early wins like corrected facts and schema inclusion often land within weeks, while stronger citation and recommendation presence builds over a few months. In 2026 the engines update constantly, so GEO is an ongoing discipline rather than a one-off fix, much like SEO.' },
            { q: 'Is GEO worth it for a small or local business?', a: 'Yes, and most agencies miss this. Customers now ask AI for the best option near them and the best provider in their town, and almost no one optimises for it. A focused GEO and AEO programme suits SMEs that want to be found where buyers increasingly ask, without an enterprise budget.' },
            { q: 'How much does GEO cost in the UK?', a: 'UK GEO retainers typically run from around £600 per month for a foundation programme to £2,500 and above for competitive markets and full-footprint work. Price depends on your starting visibility, your market, and the depth of content and authority work. We confirm scope after a free audit, on rolling monthly terms.' },
        ],
    },

    {
        slug: 'meta-ads-management',

        // Meta
        metaTitle: 'Meta Ads Agency UK | Facebook & Instagram Ads | Webspires',
        metaDescription:
            'Performance-focused Meta ads management across Facebook and Instagram. We turn paid social into revenue, with transparent pricing, no markup on ad spend, and you own your account. Get a free Meta ads audit.',

        // Hero (Section 1)
        h1: 'Meta Ads Management That Turns Facebook and Instagram Into Revenue',
        heroSub:
            'More sales and qualified leads from Facebook and Instagram at a lower cost per result, not vanity reach. Webspires builds, tests, and scales your paid social, tracks every conversion server-side, and reports in plain English. The wedge: transparent pricing, no markup on ad spend, you own your account, and one team that also runs your Google Ads, organic social, and CRO. UK businesses get paid social that answers to revenue in 2026, run by senior people who pick up the phone.',
        heroChips: [
            'UK-based paid-social team',
            '5-star rated',
            'You own your account',
            'No markup on ad spend',
        ],

        // Section 2 -what it includes
        s2Heading: 'What Meta Ads Management Includes',
        s2Definition:
            'Meta ads management is the ongoing strategy, build, creative testing, tracking, and optimisation that turns a Facebook and Instagram budget into measurable sales and leads. The work spans placements across Facebook, Instagram, Messenger, and Reels, with every pound aimed at a revenue or lead outcome rather than reach.',
        buildRoutes: [
            { title: 'Strategy', desc: 'A paid social plan tied to revenue and lead goals, not follower counts.' },
            { title: 'Creative testing', desc: 'A steady system of hooks, formats, and angles to find the ads that convert.' },
            { title: 'Audience strategy', desc: 'Custom, lookalike, and retargeting audiences matched to each stage of intent.' },
            { title: 'Campaign build', desc: 'Clean campaign and ad-set structure that keeps spend efficient and learnings clear.' },
            { title: 'Conversion tracking', desc: 'Pixel and Conversions API set up so Meta optimises toward real buyers.' },
            { title: 'Optimisation and scaling', desc: 'Continuous tuning and budget scaling on the ads that prove themselves.' },
            { title: 'Reporting', desc: 'Plain-English monthly reporting tied to ROAS, CPA, and CPL.' },
        ],
        s2Adoption:
            'Through 2026, Advantage+ automation reshaped what good management looks like, so the value now sits in strong creative, clean tracking, and human guardrails rather than handing Meta the budget and hoping.',

        // Section 3 -why most meta ads lose money
        s4Heading: 'Why Most Meta Ads Lose Money',
        s4Intro:
            'Most underperforming Meta accounts leak budget in the same predictable places. In 2026, signal loss from iOS and ad blockers makes server-side tracking essential, and Meta’s new UK location fee makes wasted spend even more expensive. The six mistakes below name the fix for each.',
        outgrownSigns: [
            { title: 'Optimising for reach, not revenue', desc: 'Campaigns chase impressions and engagement that never convert. Optimising for purchases and leads points spend at results.' },
            { title: 'A broken Pixel and no Conversions API', desc: 'Lost signal means Meta optimises toward the wrong people. Pixel plus server-side Conversions API restores the data.' },
            { title: 'Weak creative with no testing', desc: 'One tired ad runs until it dies. A structured testing system finds winners and kills losers fast.' },
            { title: 'Audiences too broad or too narrow', desc: 'Spray-and-pray or a tiny custom list both waste budget. Layered custom, lookalike, and retargeting audiences fix the balance.' },
            { title: 'Advantage+ left on autopilot', desc: 'Automation spends freely without guardrails. Controlled Advantage+ keeps it pointed at profit.' },
            { title: 'Creative churn with no strategy', desc: 'An agency ships new ads with no thesis behind them. Strategy-led testing turns spend into a compounding system.' },
        ],

        // Section 4 -our services
        s5Heading: 'Our Meta Ads Services',
        services: [
            { title: 'Account audit and strategy', desc: 'We review your account, tracking, and creative, then set a paid social strategy around revenue and lead goals. You start with a clear plan and baseline. The outcome: less wasted spend from day one.' },
            { title: 'Campaign build and structure', desc: 'We build clean campaign and ad-set structures that keep learnings clear and spend efficient. Strong foundations make scaling predictable later. The outcome: budget that works harder.' },
            { title: 'Creative testing and production', desc: 'We produce and test hooks, formats, and angles on a steady cycle, scaling winners and cutting losers. Creative is the biggest lever in paid social, so we treat it as one. The outcome: a lower cost per result.' },
            { title: 'Audience strategy', desc: 'We build custom, lookalike, and retargeting audiences matched to each stage of intent. The right message reaches the right person at the right moment. The outcome: warmer prospects and cheaper conversions.' },
            { title: 'Conversion tracking setup', desc: 'We set up the Meta Pixel, Conversions API, and GA4 so calls, forms, and sales all register server-side. Accurate data underpins every decision. The outcome: optimisation you trust.' },
            { title: 'Optimisation and scaling', desc: 'We tune bids, budgets, and creative continuously, then scale the campaigns that prove themselves. Growth follows the data, not a hunch. The outcome: results that compound.' },
            { title: 'Plain-English reporting', desc: 'We report monthly on ROAS, CPA, CPL, and what changed, without jargon. You see exactly what the spend returned. The outcome: full clarity on profit.' },
        ],

        // Section 5 -ad types (reuses campaignTypes)
        campaignTypesHeading: 'Facebook and Instagram Ad Types We Run',
        campaignTypesIntro:
            'Each format does a different job. We match the mix to your goal, your offer, and where your buyers pay attention, then manage every type to a cost-per-result target.',
        campaignTypes: [
            { title: 'Feed ads', desc: 'Broad reach that drives straight to conversion across Facebook and Instagram feeds.', href: '' },
            { title: 'Stories and Reels ads', desc: 'Native short-form placements that capture demand where attention now sits.', href: '' },
            { title: 'Carousel and Collection', desc: 'Multi-image formats that showcase a range and let buyers browse in-feed.', href: '' },
            { title: 'Catalog and Dynamic Product Ads', desc: 'Automated retargeting of products people viewed, the engine of ecommerce ROAS.', href: '/industries/ecommerce' },
            { title: 'Lead ads', desc: 'In-platform forms that capture qualified leads without leaving Facebook or Instagram.', href: '' },
            { title: 'Retargeting', desc: 'Re-engage warm visitors and cart abandoners and bring them back to convert.', href: '' },
            { title: 'Messenger and click-to-WhatsApp', desc: 'Direct conversation ads that suit local and service businesses closing by chat.', href: '/industries/local-businesses' },
        ],

        // Section 6 -tracking and reporting (reuses s7 + integrations chips)
        s7Heading: 'Tracking and Reporting Built on Real Data',
        s7Body:
            'Accurate tracking comes first, because no agency proves profitability without it. We set up the Meta Pixel and the Conversions API together, so conversions report server-side and Meta optimises toward real buyers instead of the wrong action. Server-side data restores the signal lost to iOS restrictions and ad blockers, which is where most accounts quietly bleed performance. We add GA4 and import offline or CRM conversions for businesses that close by phone or in person. Reporting then ties every pound to ROAS, CPA, and CPL, not vanity clicks. You get a monthly report in plain English that shows what changed, what it cost, and what happens next.',
        integrations: ['Meta Pixel', 'Conversions API (CAPI)', 'GA4', 'Offline / CRM conversions'],

        // Section 7 -pricing (costDrivers = fee-vs-spend panels; bands = setup + 3 tiers)
        s12Heading: 'Meta Ads Management Pricing in the UK',
        s12Intro:
            'Two numbers matter, and they are separate. The management fee is what you pay our team. The ad spend is what goes to Meta. We never mark up your ad spend, so every pound of budget reaches the auction. The tiers below are indicative, with the final fee set after a free audit.',
        costDrivers: [
            { title: 'Management fee (what you pay us)', desc: 'A flat monthly fee for strategy, creative testing, tracking, optimisation, and reporting. Fixed and predictable, billed rolling monthly.' },
            { title: 'Ad spend (what goes to Meta)', desc: 'Your advertising budget, paid directly to Meta. Separate from our fee, with no markup added by us.' },
        ],
        pricingBands: [
            { name: 'Setup and launch', range: 'from £750 one-off', includes: 'Pixel and Conversions API setup, account structure, campaign build, and first creatives. A clean foundation before spend goes live.' },
            { name: 'Starter', range: 'Ad spend up to £1,500/mo · from £600/mo management', includes: 'One to two campaigns, creative testing, audience build, tracking, and a monthly report. Right for businesses starting paid social.' },
            { name: 'Growth', range: 'Ad spend £1,500 to £5,000/mo · from £1,200/mo management', includes: 'Multi-campaign management, ongoing creative testing, retargeting, scaling, and strategy reviews. Most popular for growing UK businesses.' },
            { name: 'Scale', range: 'Ad spend £5,000+/mo · from £2,500/mo management', includes: 'Full-funnel management, advanced creative volume, dynamic product ads, and senior strategic input.' },
        ],
        s12Note:
            'Ad spend is separate and paid to Meta, with no markup. Management is rolling monthly with no long contracts, and you own your account and data throughout. Note that Meta applies a UK location fee of 2 to 5 percent on ad delivery from July 2026, a pass-through cost charged by Meta, not by us. Final pricing follows a free audit.',

        // Section 8 -process
        s10Heading: 'Our Meta Ads Management Process, Step by Step',
        s10Intro:
            'Seven stages take your account from a free audit to campaigns that scale on profit. AI-accelerated creative production speeds the work, and every scaling decision gets made by a person, never left to Meta’s automation.',
        processSteps: [
            { title: 'Free audit', desc: 'We review your account, tracking, and creative, then name the biggest gaps. You leave with a clear baseline and priorities.' },
            { title: 'Tracking setup', desc: 'We install the Pixel and Conversions API before spend goes live. Accurate, server-side data underpins everything that follows.' },
            { title: 'Strategy and audience plan', desc: 'We set the funnel, offers, and audiences that fit your goals. The plan defines what to test and how to scale.' },
            { title: 'Creative production', desc: 'We produce hooks, formats, and angles at pace with AI-accelerated workflows. Strong creative is the biggest driver of paid social results.' },
            { title: 'Launch', desc: 'We launch with clean structure, the right budgets, and guardrails in place. Early spend gathers the data that guides testing.' },
            { title: 'Testing and optimisation', desc: 'We test creative and audiences, cut losers, and tune toward cost per result. Performance sharpens week on week.' },
            { title: 'Scale and report', desc: 'We scale the winners and report monthly on ROAS, CPA, and CPL. You always know what happened and what comes next.' },
        ],

        // Section 9 -by business type
        s11Heading: 'Meta Ads by Business Type',
        industries: [
            { title: 'Ecommerce', desc: 'Catalog and dynamic product ads tuned to ROAS, so spend follows your best-selling products.', href: '/industries/ecommerce' },
            { title: 'Lead generation', desc: 'Lead ads and CRM-tracked campaigns that lower cost per lead and feed your sales pipeline.', href: '/industries/professional-services' },
            { title: 'Local service businesses', desc: 'Click-to-call and click-to-WhatsApp ads that turn local demand into booked enquiries.', href: '/industries/local-businesses' },
            { title: 'B2B', desc: 'Qualified-lead campaigns with offline conversion import, so spend follows the leads that become deals.', href: '/industries/b2b-companies' },
        ],

        // Section 10 -Meta vs Google + agency comparison
        ppcSeoPoints: [
            { title: 'Meta ads (paid social)', desc: 'Demand creation. Meta puts your offer in front of people who were not searching yet, using creative and targeting to spark intent.' },
            { title: 'Google Ads (paid search)', desc: 'Demand capture. Google reaches people already searching for what you sell, ready to act now.' },
        ],
        ppcSeoVerdict:
            'Meta creates demand, Google captures it, and most businesses grow fastest running both. We handle Meta here and run Google Ads under the same roof. Organic social is a separate service.',
        compHeading: 'Meta Ads vs Google Ads, and Agency vs Freelancer vs In-House',
        compIntro:
            'Beyond the channel question sits the management question. Three routes run a Meta ads account, and the right one depends on budget, creative needs, and whether you want to hire.',
        comparisonTable: [
            { factor: 'Cost', agency: 'Flat monthly fee, no hires or tools to fund', freelancer: 'Low fee, variable scope', inhouse: 'Salaries for a media buyer and creative', software: '' },
            { factor: 'Expertise', agency: 'Senior media buyers and creative strategists', freelancer: 'Varies with the individual', inhouse: 'One or two people’s knowledge', software: '' },
            { factor: 'Creative output', agency: 'A team producing and testing creative at volume', freelancer: 'Limited by one person’s hours', inhouse: 'Strong if you hire a creative, costly to staff', software: '' },
            { factor: 'Tracking capability', agency: 'Pixel, Conversions API, GA4, and offline tracking', freelancer: 'Often basic or skipped', inhouse: 'Depends on the hire', software: '' },
            { factor: 'Account ownership', agency: 'You own the account and data with us', freelancer: 'Usually yours, varies', inhouse: 'Yours by default', software: '' },
        ],
        compVerdict:
            'A freelancer suits light, low-budget accounts. An in-house team suits brands with the volume to staff a media buyer and a creative. An agency suits businesses that want senior strategy, creative testing, and proper tracking without hiring. When your spend does not yet justify management, we say so.',

        // Section 11 -why choose us
        s13Heading: 'Why Businesses Choose Webspires for Meta Ads',
        whyChoose: [
            { title: 'You own your account and data', desc: 'The ad account, Pixel, and data stay yours, set up under your ownership from day one. Leave whenever you want and keep everything.' },
            { title: 'No markup on ad spend', desc: 'Every pound of budget reaches Meta. We charge a flat management fee and never take a cut of your spend.' },
            { title: 'No long contracts', desc: 'Management runs rolling monthly. We earn the next month by performing, not by locking you in.' },
            { title: 'Server-side tracking done right', desc: 'We set up the Conversions API properly from day one, so Meta optimises on real data while competitors run on guesswork.' },
            { title: 'AI-accelerated creative testing', desc: 'Modern AI tooling lets us produce and test more creative at honest cost, and creative is the biggest lever in paid social.' },
            { title: 'One team for Meta, Google, social, and CRO', desc: 'The same team runs your paid social, paid search, organic social, and conversion work, so the whole funnel pulls together.' },
            { title: 'Plain-English reporting', desc: 'Monthly reporting tied to ROAS, CPA, and CPL, with no jargon and no vanity metrics.' },
            { title: 'Senior UK team, direct access', desc: 'A senior specialist based in the Manchester area runs your account and answers directly, not a junior behind an account manager.' },
        ],

        // Section 12 -results
        s14Heading: 'Real Meta Ads Results',
        caseProblem:
            'Our own early paid social optimised for engagement, not sales. The Pixel fired inconsistently, there was no Conversions API, and creative ran stale, so spend bought likes rather than revenue.',
        caseSolution:
            'We applied our own playbook: Pixel and Conversions API set up server-side, a structured creative testing system, layered custom and lookalike audiences, and reporting tied to ROAS and cost per result.',
        caseOutcome:
            'Tracking finally matched reality, the testing system surfaced creative that converted, and cost per result fell while revenue from paid social climbed month on month.',
        caseMetric: '',
        caseNote:
            'We publish results we stand behind. As client Meta ads results gain approval, we add them here with named ROAS and cost-per-result figures.',

        // Section 13 -CTA
        s15Heading: 'Get a Free Meta Ads Audit',
        s15Body:
            'On a free audit, the Webspires team reviews your account structure, finds wasted spend, checks your Pixel and Conversions API, reviews your creative, and shows the quick wins. No obligation, and you keep the findings whether you work with us or not.',

        // Section 14 -FAQ
        faqHeading: 'Meta Ads Management FAQs',
        faqs: [
            { q: 'How much does Meta ads management cost in the UK?', a: 'UK Meta ads management fees typically run from around £600 per month for smaller accounts to £2,500 and above for higher-spend management, plus a one-off setup from £750. The fee depends on ad spend, creative volume, and complexity. Ad spend is separate and paid directly to Meta, with no markup from us.' },
            { q: 'What is the difference between the management fee and my ad budget?', a: 'The management fee pays our team to plan, build, test, and optimise your campaigns. The ad budget is the money Meta charges to show your ads. They are separate, the budget goes straight to Meta, and we never add a markup to it.' },
            { q: 'Is there a minimum ad spend?', a: 'No fixed minimum, though paid social needs enough budget to exit the learning phase and test creative properly. For most UK small businesses, a starting budget from a few hundred pounds a month upward gives campaigns room to prove themselves. We recommend a realistic figure after the audit.' },
            { q: 'Am I tied into a long contract?', a: 'No. Management runs on rolling monthly terms with no long lock-in. You own your Meta ad account, Pixel, and data throughout, so you keep everything and leave whenever you choose. We hold onto clients by performing, not by contracts.' },
            { q: 'How long until I see results?', a: 'Many accounts see early conversions within the first few weeks as campaigns exit the learning phase, then improve as creative testing and optimisation compound. Paid social rewards patience with creative, so the first month is about gathering data and finding the angles that convert.' },
            { q: 'Do I own my account and data?', a: 'Yes. We set up and run campaigns inside an ad account you own, so the Pixel, audiences, and history stay with you. If you ever leave, you take the account intact. No agency holds your account hostage.' },
            { q: 'Should I run Facebook ads, Instagram ads, or both?', a: 'Usually both. Meta serves your ads across Facebook and Instagram from one campaign, and the platform finds the cheapest conversions across placements. We set the split by where your buyers respond, rather than guessing up front, and let the data decide.' },
            { q: 'Is Meta better than Google Ads?', a: 'Neither wins outright. Meta creates demand by putting your offer in front of the right audience, while Google captures demand from people already searching. Most businesses grow fastest running both, which is why we handle Meta and Google Ads under one roof.' },
            { q: 'Will Meta ads still work in 2026, and what is the new UK location fee?', a: 'Yes, Meta ads remain one of the strongest channels for sales and leads in 2026. From July 2026, Meta applies a UK location fee of 2 to 5 percent on ad delivery, a pass-through cost charged by Meta on top of your budget, not by us. We factor it into planning so your targets stay realistic.' },
        ],
    },

    {
        slug: 'shopify-development',

        // Meta - web-and-dev silo. Owns Shopify build + migration-to-Shopify
        // intent; routes other platforms, general web design, ecommerce SEO,
        // and CRO out. Honest SME/growing-brand scope, no faked Plus status.
        metaTitle: 'Shopify Development Agency UK | Stores Built to Be Found | Webspires',
        metaDescription:
            'Shopify stores designed to convert and engineered to rank in Google and AI search from day one. Custom builds, SEO-safe migration, and integrated growth for UK SMEs and DTC brands. Transparent pricing. Book a free Shopify consultation.',

        // Hero (Section 1)
        h1: 'Shopify Stores Built to Convert and to Be Found',
        heroSub:
            'A fast, conversion-focused Shopify store that also ranks in Google and gets cited in AI search, so it earns traffic and sales, not just compliments. Webspires builds search-native Shopify stores for UK SMEs and growing DTC brands, handles SEO-safe migration, and keeps one team on the build and the growth that follows. Transparent pricing, you own the store, and there is no lock-in. The result is an online store that sells from the day it launches.',
        heroChips: [
            'Custom Shopify builds',
            'Built for search and AI',
            'Own your store',
            'No lock-in',
        ],

        // Section 2 - what we build (definition + deliverable pills)
        s2Heading: 'What We Build on Shopify',
        s2Definition:
            'Shopify development is the design, build, migration, and optimisation of Shopify stores for businesses that want to sell more online. The work spans a custom storefront, the technical setup behind it, and the search foundations that decide whether anyone finds the store once it launches.',
        buildRoutes: [
            { title: 'Custom theme', desc: 'A bespoke, brand-led theme rather than a generic template.' },
            { title: 'Store design', desc: 'Conversion-focused, mobile-first design across the journey.' },
            { title: 'Migration', desc: 'SEO-safe moves from WooCommerce, Magento, and more.' },
            { title: 'Integrations', desc: 'Payments, subscriptions, CRM, and email connected cleanly.' },
            { title: 'Speed', desc: 'Core Web Vitals and load times tuned for ranking and conversion.' },
            { title: 'Support', desc: 'Ongoing care so the store keeps performing after launch.' },
        ],
        s2Adoption:
            'Through 2026, a Shopify store needs to be found in both Google and AI search to earn its traffic, so a build that looks good but ranks nowhere starts at a disadvantage.',

        // Section 3 - why most Shopify stores underperform (mistake -> fix bento)
        s4Heading: 'Why Most Shopify Stores Underperform',
        s4Intro:
            'Most underperforming Shopify stores fail for the same fixable reasons. In 2026, a store that is not built for Google and AI search starts invisible, and good looks alone do not sell. The six issues below name the fix for each.',
        outgrownSigns: [
            { title: 'Beautiful but invisible', desc: 'A polished store with no technical SEO never ranks. A search-native build earns visibility from launch.' },
            { title: 'Slow and failing Core Web Vitals', desc: 'Sluggish pages lose rankings and sales together. A performance-first build passes Core Web Vitals and loads fast.' },
            { title: 'Weak on mobile', desc: 'Most shoppers buy on a phone, yet many themes fight small screens. A mobile-first build converts where buyers actually are.' },
            { title: 'Theme bloat from too many apps', desc: 'Stacked apps slow the store and clash with each other. Lean, custom functionality replaces the bloat.' },
            { title: 'Not built to convert', desc: 'Traffic arrives and leaves because the journey is unclear. Conversion-focused design turns visits into orders.' },
            { title: 'No structure for AI search', desc: 'Without schema and clean structure, AI engines skip the store. Product and FAQ schema make it citable.' },
        ],

        // Section 4 - our Shopify services (bento, flagship first)
        s5Heading: 'Our Shopify Development Services',
        services: [
            { title: 'Custom theme and store design', desc: 'We design and build a bespoke, brand-led theme that is mobile-first and conversion-focused, not a generic template every other store uses. Every page guides the shopper toward the basket. The outcome: a store that reflects the brand and sells.' },
            { title: 'Search-native build', desc: 'We bake technical SEO, clean architecture, and schema into the build from day one, so the store is ready to rank rather than retrofitted later. Search is a foundation, not an afterthought. The outcome: organic visibility from launch.', href: '/services/seo/ecommerce-seo' },
            { title: 'SEO-safe migration to Shopify', desc: 'We move your store to Shopify with redirects mapped and search equity preserved, so rankings and revenue survive the switch. Data, content, and URLs land cleanly. The outcome: a replatform that protects your traffic.' },
            { title: 'Integrations and custom functionality', desc: 'We connect payments, subscriptions, CRM, and email, and build custom features where an app falls short. The store works the way your business runs. The outcome: a store that fits your operations.' },
            { title: 'Speed and Core Web Vitals', desc: 'We tune load times, images, and code so the store passes Core Web Vitals on mobile and desktop. Speed lifts both rankings and conversion. The outcome: a fast store that ranks and converts.' },
            { title: 'Care, support, and growth', desc: 'We keep the store healthy after launch and grow it with SEO, conversion work, and ads from the same team. The store improves instead of stalling. The outcome: a store that compounds.', href: '/services/conversion-rate-optimisation' },
        ],

        // Section 5 - search-native Shopify (s7 + engine chips, signature)
        s7Heading: 'Shopify Stores Built for Google and AI Search',
        s7Body:
            'Most agencies build the store and treat search as an afterthought, then sell SEO as a separate project six months later. We build technical SEO, clean site structure, product and FAQ schema, and AI-citable content into the store from the first line of code, so it is ready to rank in Google and be recommended in AI answers at launch. The result is a store that earns organic traffic and AI visibility from day one, not a rebuild once the bills arrive.',
        integrations: ['Google', 'AI Overviews', 'ChatGPT', 'Gemini'],

        // Section 6 - SEO-safe migration (s8 + checklist + source platforms)
        s8Heading: 'SEO-Safe Migration to Shopify',
        s8Intro:
            'Moving to Shopify is where rankings and revenue go to die if the migration is rushed. We replatform without losing either, with a full data migration, redirect mapping, and metadata preserved, so the store lands on Shopify with its search equity intact.',
        migrationSteps: [
            { title: 'Full data migration', desc: 'Products, customers, orders, and content move across complete and intact.' },
            { title: 'Redirect mapping', desc: 'Every old URL points to its new home, so no link or ranking is lost.' },
            { title: 'Metadata and URL preservation', desc: 'Titles, descriptions, and URL structure carry over to protect search equity.' },
            { title: 'Structured-data rebuild', desc: 'Product and FAQ schema are rebuilt on Shopify so the store stays machine-readable.' },
            { title: 'Pre-launch QA', desc: 'We test redirects, data, and performance before go-live, not after.' },
            { title: 'Monitored launch', desc: 'We watch rankings and crawling through the switch and fix anything that moves.' },
        ],
        migrationSources: ['WooCommerce', 'Magento', 'BigCommerce', 'Wix', 'Squarespace'],

        // Section 7 - process
        s10Heading: 'Our Shopify Build Process, Step by Step',
        s10Intro:
            'Six stages take your store from first conversation to a fast, found, selling Shopify build. Search architecture comes before code, AI-accelerated work speeds delivery, and a person makes the design and build calls.',
        processSteps: [
            { title: 'Discovery and planning', desc: 'We learn your brand, products, and goals, then agree the scope and structure. You leave with a clear plan and a fixed price.' },
            { title: 'Design', desc: 'We design a brand-led, conversion-focused store and map the full shopping journey. You approve the design before any build starts.' },
            { title: 'Search architecture', desc: 'We plan SEO, URL structure, and schema before a line of code, so search is built in rather than bolted on. The foundation is set for ranking from launch.' },
            { title: 'High-performance build', desc: 'We build a fast, clean Shopify store with lean code and tuned Core Web Vitals. Speed and structure are baked in.' },
            { title: 'QA and conversion checks', desc: 'We test the store across devices and pressure-test the journey to the basket. Issues are caught before customers see them.' },
            { title: 'SEO-safe launch and care', desc: 'We launch with redirects in place and monitor the switch, then support and grow the store. Day one is a start, not a handoff.' },
        ],

        // Section 8 - pricing (3 tiers + care plan, middle highlighted)
        s12Heading: 'Shopify Development Pricing in the UK',
        s12Intro:
            'Honest first: every build is scoped, so the figures below are starting points, confirmed after a free consultation. Price follows the design, the functionality, and whether you are migrating, not a one-size sticker.',
        pricingBands: [
            { name: 'Theme Setup and Customisation', range: 'from £2,500', includes: 'A polished store on a strong theme, customised to your brand, with the search foundations in place. Right for a first store or a quick, credible launch.' },
            { name: 'Custom Shopify Build', range: 'from £6,000', includes: 'A bespoke, search-native store with custom design, integrations, and schema built in. The popular choice for growing brands.' },
            { name: 'Migration and Complex Build', range: 'from £15,000', includes: 'A replatform or advanced functionality, with SEO-safe migration, integrations, and bespoke features. Right for established stores moving to Shopify.' },
            { name: 'Care and Growth plan', range: 'from £150/mo', includes: 'Ongoing support, updates, and growth across SEO, conversion, and ads. Optional on any build.' },
        ],
        s12Note:
            'Figures are starting points, confirmed after a free consultation once the scope is clear. You own your store and data, there is no lock-in, and the care plan is optional. No guessed quotes, no surprise invoices.',

        // Section 9 - Shopify vs WooCommerce + agency vs freelancer vs in-house
        ppcSeoPoints: [
            { title: 'Shopify', desc: 'Managed, hosted, and scalable, with security and updates handled for you. Right for most growing brands that want to sell, not maintain servers.' },
            { title: 'WooCommerce', desc: 'Open and flexible on WordPress, but you own the hosting, security, and maintenance. Right for teams that want full control and have the resource to manage it.' },
        ],
        ppcSeoVerdict:
            'For most growing brands, Shopify wins on time, reliability, and total cost of ownership, which is why we build on it. We migrate stores from WooCommerce when the upkeep has outgrown the benefit.',
        compHeading: 'Shopify vs WooCommerce, and Agency vs Freelancer',
        compIntro:
            'Two questions decide a Shopify project: the platform and who builds it. The platform comparison sits above. The build comparison below weighs an agency against a freelancer and an in-house hire.',
        comparisonTable: [
            { factor: 'Cost', agency: 'One scoped project fee for a full team', freelancer: 'Low day rate for one person', inhouse: 'High: salary, tools, and standing cost', software: '' },
            { factor: 'Breadth of skills', agency: 'Design, build, SEO, and conversion in one team', freelancer: 'Strong in one area, thin in others', inhouse: 'Broad only with several hires', software: '' },
            { factor: 'Search and speed built in', agency: 'Search-native build from day one', freelancer: 'Rarely, search is usually separate', inhouse: 'Only if you also employ an SEO', software: '' },
            { factor: 'After launch', agency: 'Ongoing care and growth from the same team', freelancer: 'Often gone once the build ships', inhouse: 'Covered, at a standing cost', software: '' },
            { factor: 'Reliability', agency: 'A team covers absence and deadlines', freelancer: 'One person, one point of failure', inhouse: 'Steady while the roles stay filled', software: '' },
        ],
        compVerdict:
            'A freelancer suits a small one-off build on a tight budget. An in-house team suits brands with constant store work and the budget to employ. An agency suits a brand that wants the build plus ongoing search and conversion growth from one team, which is where we fit. When a freelancer is the right call for your stage, we say so.',

        // Section 10 - why choose us
        s13Heading: 'Why Businesses Choose Webspires for Shopify',
        whyChoose: [
            { title: 'Search-native builds', desc: 'We build technical SEO, schema, and clean structure into the store from day one, so it ranks and gets cited rather than sitting invisible.' },
            { title: 'One team builds and grows', desc: 'The same team builds the store and grows it with SEO, GEO, conversion work, and ads, so launch is the start of growth, not a handoff.' },
            { title: 'SEO-safe migration', desc: 'We replatform to Shopify with redirects mapped and search equity preserved, so rankings and revenue survive the move.' },
            { title: 'Transparent pricing', desc: 'Clear starting points and a scoped fixed price after a consultation. You always know what you pay for.' },
            { title: 'You own your store and data', desc: 'Your Shopify store, theme, and data stay yours, with no lock-in. Leave whenever you want and keep everything.' },
            { title: 'Honest about scope', desc: 'We serve SMEs and growing brands well and say so, rather than posing as an enterprise Shopify Plus shop we are not.' },
            { title: 'AI-accelerated at honest cost', desc: 'Modern AI tooling speeds delivery while senior people make the calls, so you get strong work at a fair fee.' },
            { title: 'Senior UK team, Manchester based', desc: 'A senior team near Manchester builds and supports your store and knows UK ecommerce.' },
        ],

        // Section 11 - results
        s14Heading: 'Real Shopify Results',
        caseProblem:
            'Our own first commerce builds looked good but loaded slowly, leaned on too many apps, and launched with no search foundation, so traffic was thin and the journey to checkout leaked.',
        caseSolution:
            'We rebuilt to our own standard: a lean, fast theme, Core Web Vitals tuned, technical SEO and schema baked in, and a conversion-focused journey from landing to basket.',
        caseOutcome:
            'Pages loaded faster, the store passed Core Web Vitals, organic visibility started from launch instead of months later, and more visits turned into orders.',
        caseMetric: '',
        caseNote:
            'We publish results we stand behind. As client Shopify builds complete and the metrics gain approval, we add them here with named speed, traffic, and revenue figures.',

        // Section 12 - CTA
        s15Heading: 'Book a Free Shopify Consultation',
        s15Body:
            'Book a free Shopify consultation and the Webspires team reviews your goals, looks at your current store or platform, runs a search and speed snapshot, and gives you a clear scope and price. No obligation, and the findings are yours to keep.',

        // Section 13 - FAQ
        faqHeading: 'Shopify Development FAQs',
        faqs: [
            { q: 'How much does Shopify development cost in the UK?', a: 'UK Shopify projects typically start around £2,500 for a customised theme build, rise to £6,000 and above for a bespoke search-native store, and £15,000 and above for migrations or complex functionality. Every build is scoped, so we confirm the figure after a free consultation rather than guessing up front.' },
            { q: 'How long does a Shopify build take?', a: 'A customised theme build often takes a few weeks, while a bespoke or migration project runs longer depending on design, integrations, and data. We agree a timeline at planning and keep you updated, and AI-accelerated work shortens delivery without cutting quality.' },
            { q: 'Can you migrate my store without losing rankings?', a: 'Yes, that is the point of an SEO-safe migration. We map redirects, preserve metadata and URL structure, rebuild schema, and monitor the launch, so products, content, and search equity move across intact. Botched migrations lose rankings, and avoiding that is the whole job.' },
            { q: 'Do you build on Shopify Plus?', a: 'We work at SME and growing-brand level on standard Shopify, where most of our clients sit, and we are honest about that rather than posing as an enterprise Plus agency. For very large, multi-market Plus migrations, a dedicated Plus partner is the better fit, and we say so.' },
            { q: 'Will my store be built for SEO and AI search?', a: 'Yes, and from day one. We build technical SEO, clean structure, and product and FAQ schema into the store so it is ready to rank in Google and be cited in AI answers at launch, not retrofitted six months later. Search is a foundation of the build.' },
            { q: 'Do I own my store and data?', a: 'Yes. Your Shopify store, theme, content, and data stay yours throughout, with no lock-in. If you leave, you keep everything, and the store keeps running on your own Shopify account.' },
            { q: 'Shopify or WooCommerce, which is right for me?', a: 'Shopify suits most growing brands that want a managed, scalable store without running their own hosting and security. WooCommerce suits teams that want full control and have the resource to maintain it. In 2026, for most SMEs that want to sell rather than maintain, Shopify wins on time and reliability.' },
            { q: 'Do you offer ongoing support after launch?', a: 'Yes. A care and growth plan covers updates, monitoring, and improvement, and the same team grows the store with SEO, conversion work, and ads. Launch is the start, so the store keeps improving instead of stalling once it goes live.' },
        ],
    },

    {
        slug: 'seo',

        // Meta - hub of the search silo. Owns "seo services / seo agency" and
        // routes every sub-discipline and niche to its own page.
        metaTitle: 'SEO Services UK | SEO Agency for Google & AI Search | Webspires',
        metaDescription:
            'Performance-focused SEO that grows organic traffic, leads, and revenue, and makes your brand the answer in Google and AI search. Topical-authority method, transparent pricing, no lock-in. Get a free SEO audit.',

        // Hero (Section 1)
        h1: 'SEO Services That Grow Traffic, Leads, and Revenue',
        heroSub:
            'Higher rankings that turn into qualified traffic, enquiries, and revenue, plus visibility in AI search, not vanity keywords. Webspires runs GEO-native SEO built for Google and AI engines, a topical-authority method, transparent pricing, and no lock-in, with one team across content, CRO, and paid. UK businesses get organic growth that answers to revenue in 2026, measured honestly and owned by you from the first audit onward.',
        heroChips: [
            '5-star rated',
            'Google and AI search',
            'Own your data',
            'No lock-in',
        ],

        // Section 2 - what SEO includes (definition + discipline pills that route the silo)
        s2Heading: 'What SEO Includes',
        s2Definition:
            'SEO is the ongoing work that grows a website’s visibility in organic and AI search, across technical health, content, authority, and local presence, so the right people find and choose the business. Strong SEO aligns the three things search rewards: relevance to the query, authority that earns trust, and content structured so AI engines quote it.',
        buildRoutes: [
            { title: 'Technical SEO', desc: 'Site health, crawl, indexation, and Core Web Vitals.', href: '/services/seo/technical-seo' },
            { title: 'On-page SEO', desc: 'Entity-led content and a topical map that earns relevance.', href: '/services/seo/on-page-seo' },
            { title: 'Link building', desc: 'Authority from relevant, editorially earned links.', href: '/services/seo/link-building' },
            { title: 'Local SEO', desc: 'Map pack, Google Business Profile, and "near me" reach.', href: '/services/seo/local-seo' },
            { title: 'Ecommerce SEO', desc: 'Category and product pages built to sell.', href: '/services/seo/ecommerce-seo' },
            { title: 'AI search', desc: 'Entity and citation work that earns answers in AI engines.', href: '/services/generative-engine-optimisation' },
        ],
        s2Adoption:
            'Through 2026, search spans two surfaces at once: the classic ten blue links and the AI answer that sits above them. SEO now earns visibility in both, or it leaves traffic on the table.',

        // Section 3 - why your site is not ranking (mistake → fix bento)
        s4Heading: 'Why Your Site Is Not Ranking',
        s4Intro:
            'Most sites miss the top of search for a handful of fixable reasons. In 2026, ranking means earning visibility in classic results and AI answers, and most sites are built for neither. The six issues below name the fix for each.',
        outgrownSigns: [
            { title: 'Thin, unfocused content', desc: 'Pages with no topical authority never earn trust on a subject. A topical map and entity-led content turn the site into the definitive source.' },
            { title: 'Technical issues block crawling', desc: 'Crawl and indexation errors keep pages out of the index entirely. A technical fix opens the whole site to search engines.' },
            { title: 'Weak or toxic backlinks', desc: 'A thin or spammy link profile drags authority down. Relevant, earned links and a clean-up rebuild it.' },
            { title: 'No local presence', desc: 'A missing or thin Google Business Profile hides you from nearby buyers. A complete local setup puts you in the map pack.' },
            { title: 'Content AI engines ignore', desc: 'Unstructured pages give AI engines nothing to quote. Modular answer blocks and clean schema earn the citation.' },
            { title: 'Chasing vanity keywords', desc: 'High-volume terms with no buying intent burn budget and return nothing. Revenue-first research targets terms that convert.' },
        ],

        // Section 4 - our SEO services (bento, each card routes to its sub-silo)
        s5Heading: 'Our SEO Services',
        services: [
            { title: 'On-page and topical authority', desc: 'We build entity-led content on a Koray-style topical map, with internal linking that signals depth on your subject. Topical authority turns a site into the source Google and AI engines prefer. The outcome: rankings across a whole topic, not one keyword.', href: '/services/seo/on-page-seo' },
            { title: 'Technical SEO', desc: 'We fix crawl, indexation, site speed, and Core Web Vitals so search engines reach and rank every important page. A healthy foundation makes every other effort count. The outcome: a site search engines trust and index in full.', href: '/services/seo/technical-seo' },
            { title: 'Link building and digital PR', desc: 'We earn relevant, editorial links and coverage from sites that pass real authority, never spam or PBNs. Quality links remain one of the strongest ranking signals in search. The outcome: higher authority and stronger positions.', href: '/services/seo/link-building' },
            { title: 'Local SEO', desc: 'We optimise your Google Business Profile, reviews, and citations so nearby customers find you in the map pack and Maps. Local visibility turns "near me" searches into calls and visits. The outcome: more local enquiries at the moment of intent.', href: '/services/seo/local-seo' },
            { title: 'Ecommerce SEO', desc: 'We optimise category, product, and faceted pages so online stores rank for terms that sell. Ecommerce SEO ties rankings to revenue, not just sessions. The outcome: more organic sales from high-intent search.', href: '/services/seo/ecommerce-seo' },
            { title: 'AI search (GEO)', desc: 'We structure entities, schema, and answer blocks so AI engines quote your brand in their answers. AI search is where a growing share of discovery now happens. The outcome: your brand cited in ChatGPT, Perplexity, and AI Overviews.', href: '/services/generative-engine-optimisation' },
        ],

        // Section 5 - SEO and AI search (reuses s7 + integrations chips, signature visual)
        s7Heading: 'SEO Built for Google and AI Search',
        s7Body:
            'Search now happens in two places at once: classic Google results and AI answers from ChatGPT, Perplexity, Gemini, and Google AI Overviews. Most agencies bolt AI search on as an afterthought. Our SEO is GEO-native, with entity-rich content, structured data, modular answer blocks, and the E-E-A-T signals AI engines quote, built into the work from the first sprint rather than added at the end. The result is simple: your brand gets found and cited whether the customer searches Google or asks an assistant for a recommendation.',
        integrations: ['Google AI Overviews', 'ChatGPT', 'Perplexity', 'Gemini'],

        // Section 6 - process
        s10Heading: 'Our SEO Process, Step by Step',
        s10Intro:
            'Six stages take your site from a free audit to compounding organic growth. AI-accelerated research and production speed the groundwork, and a person makes every strategic call. Reporting tracks revenue, not vanity rankings.',
        processSteps: [
            { title: 'Free SEO audit', desc: 'We review technical health, content, backlinks, and AI-search visibility, then name the priorities. You leave with a clear baseline and the quick wins worth doing first.' },
            { title: 'Keyword and entity research', desc: 'We build a topical map of the entities and queries your buyers use, scored by intent and revenue. The map sets the whole content plan, so effort points at terms that convert.' },
            { title: 'Technical fixes', desc: 'We clear crawl, indexation, speed, and Core Web Vitals issues that hold the site back. A clean foundation lets content and links do their job.' },
            { title: 'Content production', desc: 'We produce entity-led content across the topical map, structured for both readers and AI engines. Each page strengthens the site’s authority on the subject.' },
            { title: 'Authority and link building', desc: 'We earn relevant links and digital PR that raise the site’s standing. Authority turns good content into ranked content.' },
            { title: 'Measurement and iteration', desc: 'We report on traffic, leads, and revenue, then refine the plan around what works. Each month builds on the last, honestly and transparently.' },
        ],

        // Section 7 - by industry (routes niche demand to /industries/*)
        s11Heading: 'SEO by Industry',
        industries: [
            { title: 'Ecommerce', desc: 'Category and product SEO that ties organic rankings to online revenue.', href: '/industries/ecommerce' },
            { title: 'Professional services', desc: 'Authority-led content and topical depth that win high-value enquiries for legal, accounting, and advisory firms.', href: '/industries/professional-services' },
            { title: 'Trades and local business', desc: 'Local pack and service-area SEO that turn "near me" into booked jobs.', href: '/industries/local-businesses' },
            { title: 'Healthcare and clinics', desc: 'Compliant, trust-led SEO that fills appointment books from search.', href: '/industries/healthcare-clinics' },
            { title: 'B2B companies', desc: 'Topical authority and content that feed a longer, considered pipeline.', href: '/industries/b2b-companies' },
            { title: 'Real estate', desc: 'Area and listing SEO that attract buyers, sellers, and landlords.', href: '/industries/real-estate' },
        ],

        // Section 8 - pricing (honesty note + three tiers, middle highlighted)
        s12Heading: 'SEO Pricing in the UK',
        s12Intro:
            'Honest first: anyone guaranteeing number-one rankings is a red flag, because no agency controls Google. SEO is an ongoing retainer that compounds over months, not a one-off cost. The tiers below are indicative, with the final scope set after a free audit.',
        pricingBands: [
            { name: 'Starter / Local', range: 'from £500/mo', includes: 'Foundations and a single focus. Right for a local business or a site starting SEO, covering technical basics, core content, and local setup.' },
            { name: 'Growth', range: 'from £900/mo', includes: 'Technical, content, and links across a national campaign. The popular choice for businesses competing seriously in organic search.' },
            { name: 'Scale / Ecommerce', range: 'from £1,800/mo', includes: 'Competitive markets and large sites. Deeper content, authority building, and ecommerce or multi-template optimisation at scale.' },
        ],
        s12Note:
            'Retainers run rolling monthly with no lock-in, and no agency guarantees rankings. You own your content, data, and reporting throughout. Final scope and price follow a free audit, once we have seen your market and your site.',

        // Section 9 - SEO vs PPC (ppcSeo*) + agency vs freelancer vs in-house (comparisonTable)
        ppcSeoPoints: [
            { title: 'SEO', desc: 'Organic visibility that compounds. Slower to start, then steady traffic that keeps returning without paying per click. Right for long-term growth and trust.' },
            { title: 'PPC', desc: 'Paid visibility that switches on instantly. Fast and controllable, but the traffic stops the moment the budget does. Right for speed and testing.' },
        ],
        ppcSeoVerdict:
            'Most businesses run both: PPC for immediate enquiries while SEO builds the compounding base beneath it. We run paid search under the same roof, so the two pull together instead of competing.',
        compHeading: 'SEO vs PPC, and Agency vs Freelancer vs In-House',
        compIntro:
            'Beyond the organic-versus-paid question sits the build-versus-hire one. Three routes exist to deliver SEO, and the right one depends on your scale, budget, and how much you want handled for you.',
        comparisonTable: [
            { factor: 'Cost', agency: 'One monthly retainer for a full team', freelancer: 'Low monthly fee for one person', inhouse: 'High: salaries, tools, and training', software: '' },
            { factor: 'Breadth of skills', agency: 'Technical, content, links, and AI search in one team', freelancer: 'Strong in one area, thin in others', inhouse: 'Broad only if you hire several specialists', software: '' },
            { factor: 'Consistency', agency: 'A team covers holidays and absence', freelancer: 'One person, one point of failure', inhouse: 'Steady while the roles stay filled', software: '' },
            { factor: 'Tools and data', agency: 'Enterprise tools included, you own the data', freelancer: 'Varies with the individual', inhouse: 'You buy and run every tool yourself', software: '' },
            { factor: 'Scalability', agency: 'Scales up or down with your goals', freelancer: 'Capped by one person’s hours', inhouse: 'Slow: more output means more hires', software: '' },
        ],
        compVerdict:
            'A freelancer suits light needs and a tight budget. An in-house team suits large brands with the volume to employ specialists. An agency suits businesses that want technical, content, and authority handled together without hiring, which is where our integrated model fits. When an agency is not the right answer for your stage, we say so.',

        // Section 10 - why choose us
        s13Heading: 'Why Businesses Choose Webspires for SEO',
        whyChoose: [
            { title: 'GEO-native across Google and AI search', desc: 'We optimise for classic results and the AI answers that now sit above them, not one at the expense of the other.' },
            { title: 'Koray topical-authority method', desc: 'We build entity-led topical maps that turn your site into the definitive source on its subject, so rankings arrive as a set, not one term at a time.' },
            { title: 'Transparent pricing, no lock-in', desc: 'Clear monthly retainers, rolling terms, and audit findings you keep. You always know what you pay for.' },
            { title: 'You own your content and data', desc: 'Your pages, links, and reporting stay yours. Leave whenever you want and keep everything you paid for.' },
            { title: 'Direct access, no middlemen', desc: 'You talk to the senior people doing the work, not a layer of account managers between you and the strategy.' },
            { title: 'AI-accelerated at honest cost', desc: 'Modern AI tooling speeds research and production while people make every ranking decision, so you get more for a fair fee.' },
            { title: 'One team across SEO, GEO, CRO, and paid', desc: 'The same team runs your organic search, AI search, conversion work, and ads, so the whole strategy moves as one.' },
            { title: 'Senior UK team, Manchester based', desc: 'A senior specialist near Manchester runs your account and knows how UK search behaves.' },
        ],

        // Section 11 - real results (problem / solution / outcome, no fabricated metric)
        s14Heading: 'Real SEO Results',
        caseProblem:
            'Our own site competed in a crowded agency market with thin topical coverage, a handful of unfocused pages, and little presence in AI answers. Rankings sat outside the first page for the terms that mattered.',
        caseSolution:
            'We applied our own method: a full topical map, entity-led content across each silo, technical fixes, earned links, and structured data built for both Google and AI engines.',
        caseOutcome:
            'Organic visibility climbed across the mapped topics, qualified enquiries from search grew, and AI assistants began naming the brand for relevant queries. The work compounds month on month.',
        caseMetric: '',
        caseNote:
            'We publish results we stand behind. As client SEO results gain approval, we add them here with named traffic, lead, revenue, and AI-citation figures.',

        // Section 12 - CTA
        s15Heading: 'Get a Free SEO Audit',
        s15Body:
            'Book a free SEO audit and the Webspires team reviews your technical health, content and topical gaps, backlink profile, AI-search visibility, and the quick wins worth doing first. No obligation, and you keep the findings whether you work with us or not.',

        // Section 13 - FAQ
        faqHeading: 'SEO FAQs',
        faqs: [
            { q: 'How much does SEO cost in the UK?', a: 'UK SEO retainers typically run from around £500 per month for local or starter work to £1,800 and above for competitive markets and large sites. Price depends on your goals, competition, and the scope of technical, content, and link work. We confirm the figure after a free audit, on rolling monthly terms with no lock-in.' },
            { q: 'How long does SEO take?', a: 'Early movement often shows within a few months, while strong, durable rankings build over six to twelve. SEO compounds, so the longer the foundations run, the harder they are for competitors to dislodge. Anyone promising page one in weeks is selling a result no agency controls.' },
            { q: 'What is included in an SEO retainer?', a: 'A retainer covers a mix of technical fixes, keyword and entity research, content production, link building, and monthly reporting. The exact balance follows your audit and goals. You see what each month delivers and how it ties back to traffic, leads, and revenue.' },
            { q: 'Do you guarantee rankings?', a: 'No, and anyone who does is a red flag. No agency controls Google’s algorithm. We commit to the work that earns rankings, technical health, content, authority, and AI-search optimisation, then report progress honestly rather than promising a position no one controls.' },
            { q: 'What is the difference between SEO and PPC?', a: 'SEO earns organic visibility that compounds and keeps returning traffic without paying per click. PPC buys instant placement that stops the moment the budget does. Most businesses run both, using PPC for speed while SEO builds the lasting base beneath it.' },
            { q: 'What is AI search optimisation (GEO)?', a: 'In 2026, customers increasingly ask ChatGPT, Perplexity, Gemini, and Google AI Overviews for recommendations, and those engines name specific brands. GEO structures your entities, schema, and content so AI engines quote you, not just your competitors. We build it into the SEO work rather than bolting it on.' },
            { q: 'Do I own my content and data?', a: 'Yes. Your pages, links, reporting, and accounts stay yours throughout. There is no lock-in and no hostage data. If you leave, you keep everything you paid for, including the content and the topical authority it earned.' },
            { q: 'Can I do SEO myself or do I need an agency?', a: 'A confident owner with time runs the basics well enough. Technical depth, a topical-authority content plan, link building, and AI-search work are where an agency earns its fee. When a lighter approach is all you need, we say so honestly.' },
        ],
    },

    {
        slug: 'local-seo',

        // Meta
        metaTitle: 'Local SEO Agency UK | Google Business Profile & Map Pack | Webspires',
        metaDescription:
            'Local SEO that puts your business in the Google local pack, Maps, and "near me" results. Google Business Profile optimisation, reviews, citations, and AI-search visibility. Transparent pricing, no lock-in. Get a free local SEO audit.',

        // Hero (Section 1)
        h1: 'Local SEO That Gets You Found by Nearby Customers',
        heroSub:
            'Rank in the Google local pack, Google Maps, and "near me" searches so nearby customers find and call you, not your competitors. Webspires optimises your Google Business Profile, builds reviews and citations, and makes you visible in both Google and AI search. The wedge: transparent pricing, you own your profile and data, one team that also runs your wider SEO, and a Manchester-based crew that knows UK local search. Local businesses get found at the moment of intent in 2026, when a search turns into a call, a visit, or a booking.',
        heroChips: [
            'Local pack and Maps',
            'Own your Google Business Profile',
            'Reviews and citations',
            'Visible in AI search',
        ],

        // Section 2 -what local SEO includes
        s2Heading: 'What Local SEO Includes',
        s2Definition:
            'Local SEO is the work that makes a business visible to nearby customers in the Google local pack, Google Maps, and "near me" searches. Three forces decide local rankings: relevance, how well your business matches the search; distance, how close you are to the searcher; and prominence, how trusted and well-reviewed your business is.',
        buildRoutes: [
            { title: 'Google Business Profile', desc: 'A complete, optimised profile with the right categories, services, and posts.' },
            { title: 'Reviews', desc: 'A steady, ethical flow of reviews, each one answered.' },
            { title: 'Citations', desc: 'Consistent name, address, and phone across the directories that matter.' },
            { title: 'Local content', desc: 'Pages and content built around your services and service areas.' },
            { title: 'Local links', desc: 'Authority from local press, partners, and community sources.' },
            { title: 'AI local visibility', desc: 'Presence in the AI answers that now recommend local businesses.' },
        ],
        s2Adoption:
            'Through 2026, "near me" no longer happens only on Google. Customers ask AI assistants for a local recommendation too, so local visibility now spans the map pack and the AI answer.',

        // Section 3 -why not in the local pack
        s4Heading: 'Why You Are Not in the Local Pack',
        s4Intro:
            'Most local businesses miss the pack for the same fixable reasons. In 2026, customers also ask AI assistants for local recommendations, and most are optimised for neither the map pack nor the AI answer. The six issues below name the fix for each.',
        outgrownSigns: [
            { title: 'Incomplete or unverified profile', desc: 'A thin or unverified Google Business Profile rarely ranks. A complete, verified, optimised profile gives Google what it needs to show you.' },
            { title: 'The wrong primary category', desc: 'A vague or wrong category hides you from the right searches. The correct primary category aligns you with how customers search.' },
            { title: 'Too few or stale reviews', desc: 'Few or old reviews weaken prominence. A steady review system builds the trust the local pack rewards.' },
            { title: 'Inconsistent NAP', desc: 'A name, address, or phone that differs across the web confuses Google. Consistent citations fix the signal.' },
            { title: 'No local content or pages', desc: 'Without local pages, you give Google little to match on relevance. Service and area pages close that gap.' },
            { title: 'Invisible in "near me" AI results', desc: 'AI assistants recommend competitors when your entity data is thin. Structured, citation-rich data puts you back in the answer.' },
        ],

        // Section 4 -our local SEO services
        s5Heading: 'Our Local SEO Services',
        services: [
            { title: 'Google Business Profile optimisation', desc: 'We optimise your categories, services, attributes, posts, photos, and Q&A so the profile works as your strongest local asset. A complete profile lifts relevance and prominence together. The outcome: more local pack appearances.' },
            { title: 'Review generation and management', desc: 'We set up an ethical system that earns reviews steadily and responds to every one. Reviews are a core prominence signal and a deciding factor for callers. The outcome: more trust and more calls.' },
            { title: 'Citation building and NAP consistency', desc: 'We list you accurately across core directories plus industry and UK-specific sites, with one consistent name, address, and phone. Clean citations remove the confusion that holds rankings back. The outcome: stronger local signals.' },
            { title: 'Local content and location pages', desc: 'We build service and area pages that match how customers search, linking to your location pages. Relevance grows when the site speaks to local intent. The outcome: visibility for more local terms.' },
            { title: 'Local link building', desc: 'We earn links from chambers, local press, sponsorships, and partners. Local authority lifts prominence in a way generic links do not. The outcome: a stronger local footprint.' },
            { title: 'Local schema', desc: 'We add LocalBusiness, AggregateRating, and FAQ structured data so Google and AI engines read your business correctly. Clean data underpins both map-pack and AI visibility. The outcome: machines that understand you.' },
            { title: 'Rank tracking with a geo-grid', desc: 'We track your visibility across a grid of points around your area, not a single position. You see exactly where you rank and where to push. The outcome: measurable local progress.' },
        ],

        // Section 5 -local SEO and AI search (reuses s7 + integrations)
        s7Heading: 'Local SEO Built for Google and AI Search',
        s7Body:
            '"Near me" now happens in two places: the Google local pack and AI assistants like ChatGPT, Gemini, and Google AI Overviews, which increasingly recommend local businesses directly. Most local agencies optimise only the first. We optimise both, through entity-rich profiles, consistent structured data, and the citation-worthy local authority that AI engines pull from. The result is simple: your business gets recommended whether the customer opens Google Maps or asks an assistant for a local option.',
        integrations: ['Google AI Overviews', 'ChatGPT', 'Gemini', 'Near-me search'],

        // Section 6 -process
        s10Heading: 'Our Local SEO Process, Step by Step',
        s10Intro:
            'Six stages take your business from invisible to ranked across your area. AI-accelerated work speeds the groundwork, and a person makes every ranking decision.',
        processSteps: [
            { title: 'Free audit and rank-grid snapshot', desc: 'We audit your profile, citations, and reviews, then map your current visibility across a geo-grid. You leave with a clear baseline and priorities.' },
            { title: 'Google Business Profile optimisation', desc: 'We complete and optimise every part of your profile. The profile becomes your strongest local asset from week one.' },
            { title: 'Citation and NAP cleanup', desc: 'We fix inconsistent listings and build the citations that matter. Clean, consistent data steadies your local signals.' },
            { title: 'Review system setup', desc: 'We put an ethical review system in place and respond to incoming reviews. Prominence grows as the reviews build.' },
            { title: 'Local content and links', desc: 'We build local pages and earn local links and authority. Relevance and prominence rise together.' },
            { title: 'Ongoing measurement', desc: 'We track the geo-grid month to month and adjust the plan. You see progress across your whole service area, not one keyword.' },
        ],

        // Section 7 -by business type
        s11Heading: 'Local SEO by Business Type',
        industries: [
            { title: 'Trades and home services', desc: 'Service-area business setup, clear service areas, and call tracking that turns local searches into booked jobs.', href: '/industries/local-businesses' },
            { title: 'Restaurants and hospitality', desc: 'Menu, food attributes, photos, and booking links that win diners searching nearby.', href: '/industries/local-businesses' },
            { title: 'Healthcare and clinics', desc: 'Compliant, review-led local profiles with the trust signals patients and Google expect.', href: '/industries/healthcare-clinics' },
            { title: 'Professional services', desc: 'Industry citations, credentials, and authority for legal, accounting, and advisory firms.', href: '/industries/professional-services' },
            { title: 'Multi-location businesses', desc: 'An optimised profile and location page for every site, managed consistently at scale.', href: '/industries/local-businesses' },
        ],

        // Section 8 -pricing
        s12Heading: 'Local SEO Pricing in the UK',
        s12Intro:
            'Honest first: anyone guaranteeing a number-one local pack spot is a red flag, because no agency controls Google. Local SEO is an ongoing retainer that compounds over months. The tiers below are indicative, with the final scope set after a free audit.',
        pricingBands: [
            { name: 'Starter', range: 'from £400/mo', includes: 'Single location. Google Business Profile optimisation, core citations, and the local foundations. Right for businesses starting local SEO.' },
            { name: 'Growth', range: 'from £700/mo', includes: 'Google Business Profile, citations, local content, a review system, and local links. Most popular for businesses competing in their area.' },
            { name: 'Multi-Location / Competitive', range: 'from £1,200/mo', includes: 'Multiple sites or tough markets. Profiles and location pages per site, deeper links, and geo-grid tracking across every area.' },
        ],
        s12Note:
            'Retainers run rolling monthly with no lock-in, and no agency guarantees rankings. You own your Google Business Profile and data throughout. Final scope and price follow a free audit, once we have seen your market.',

        // Section 9 -local vs national + agency vs DIY
        ppcSeoPoints: [
            { title: 'Local SEO', desc: 'Visibility in the map pack and "near me" searches for customers close to you. Right for businesses that serve a city, town, or service area.' },
            { title: 'National SEO', desc: 'Organic reach for customers across the whole of the UK, regardless of location. Right for businesses that sell or ship nationwide.' },
        ],
        ppcSeoVerdict:
            'Most local businesses start local, where the map pack drives calls and visits fastest, then expand into national SEO as they grow. We run both under one roof, so the strategy scales with you.',
        compHeading: 'Local SEO vs National SEO, and Agency vs DIY',
        compIntro:
            'Beyond the local-versus-national question sits the build-versus-hire one. A confident owner with time runs a basic profile, but the work below is where an agency earns its fee.',
        comparisonTable: [
            { factor: 'Time', agency: 'A team handles the ongoing work', freelancer: '', inhouse: 'Hours every week you take from the business', software: '' },
            { factor: 'Expertise', agency: 'Specialists who track local algorithm shifts', freelancer: '', inhouse: 'Self-taught, learning as you go', software: '' },
            { factor: 'GBP and citation management', agency: 'Optimised profile and consistent citations at scale', freelancer: '', inhouse: 'Easy to start, hard to keep consistent', software: '' },
            { factor: 'Tracking', agency: 'Geo-grid visibility across your whole area', freelancer: '', inhouse: 'A single rank check, if any', software: '' },
            { factor: 'Results', agency: 'Compounding local visibility and calls', freelancer: '', inhouse: 'Slower, and often stalls without a system', software: '' },
        ],
        compVerdict:
            'A confident owner with time manages a basic Google Business Profile well enough. Citation consistency, a review system, local links, and geo-grid tracking are where an agency earns its fee. When a simple profile is all you need, we say so.',

        // Section 10 -why choose us
        s13Heading: 'Why Businesses Choose Webspires for Local SEO',
        whyChoose: [
            { title: 'Built for the map pack and AI search', desc: 'We target the Google local pack and the AI answers that now recommend local businesses, not just one of them.' },
            { title: 'Topical authority method', desc: 'We apply a topical-authority approach to your local entities, so Google and AI engines understand exactly what you do and where.' },
            { title: 'Transparent pricing, no lock-in', desc: 'Clear monthly retainers, rolling terms, and audit findings you keep. You always know what you pay for.' },
            { title: 'You own your profile and data', desc: 'Your Google Business Profile, reviews, and data stay yours. Leave whenever you want and keep everything.' },
            { title: 'One team for local and wider SEO', desc: 'The same team runs your local SEO and your broader SEO and content, so the whole strategy pulls together.' },
            { title: 'AI-accelerated work at honest cost', desc: 'Modern AI tooling speeds the groundwork while people make every ranking decision, so you get more at a fair fee.' },
            { title: 'Geo-grid measurement', desc: 'We report visibility across your whole area, so progress is a map you watch, not a single number.' },
            { title: 'Senior UK team, local knowledge', desc: 'A senior specialist based in the Manchester area runs your account and knows how UK local search behaves.' },
        ],

        // Section 11 -results
        s14Heading: 'Real Local SEO Results',
        caseProblem:
            'Our own local presence sat outside the map pack. The profile was thin, citations clashed across directories, reviews trickled in, and AI assistants pointed people to competitors.',
        caseSolution:
            'We applied our own framework: a fully optimised Google Business Profile, cleaned and consistent citations, a steady review system, local content and links, and structured data for both Google and AI search.',
        caseOutcome:
            'Local pack appearances climbed across the geo-grid, map views and calls rose, reviews grew steadily, and AI assistants began naming the business for relevant local queries.',
        caseMetric: '',
        caseNote:
            'We publish results we stand behind. As client local SEO results gain approval, we add them here with named map-pack, call, and review figures.',

        // Section 12 -CTA
        s15Heading: 'Get a Free Local SEO Audit',
        s15Body:
            'On a free audit, the Webspires team reviews your Google Business Profile, runs a local rank-grid snapshot, checks your citations and NAP, looks at your review profile, and names the quick wins. No obligation, and you keep the findings whether you work with us or not.',

        // Section 13 -FAQ
        faqHeading: 'Local SEO FAQs',
        faqs: [
            { q: 'How much does local SEO cost in the UK?', a: 'UK local SEO retainers typically run from around £400 per month for a single location to £1,200 and above for multi-location or competitive markets. The price depends on your area, competition, and the number of profiles. We confirm scope after a free audit, with rolling monthly terms and no lock-in.' },
            { q: 'How long does local SEO take?', a: 'Profile and citation fixes often show within weeks, while stronger local pack positions build over three to six months. Local SEO compounds, so the longer the foundations run, the harder they are for competitors to dislodge. We track progress on a geo-grid so you see movement early.' },
            { q: 'What is included, and what is Google Business Profile optimisation?', a: 'Local SEO covers your Google Business Profile, reviews, citations, local content, local links, and structured data. Profile optimisation means completing and tuning your categories, services, attributes, posts, photos, and Q&A, so the profile ranks and converts searchers into calls and visits.' },
            { q: 'Do you guarantee a local pack ranking?', a: 'No, and anyone who does is a red flag. No agency controls Google’s local algorithm. We commit to the work that earns rankings, profile optimisation, reviews, citations, and authority, then report progress honestly on a geo-grid rather than promising a position no agency controls.' },
            { q: 'How does "near me" work in AI search now?', a: 'In 2026, customers increasingly ask ChatGPT, Gemini, and Google AI Overviews for local recommendations, and those engines name specific businesses. We optimise your entity data, structured data, and local authority so AI assistants recommend you, not just the map pack.' },
            { q: 'Why does NAP consistency matter?', a: 'NAP stands for name, address, and phone. When these differ across directories, Google loses confidence in which details are correct, and your local rankings suffer. Consistent citations across the web remove that doubt and strengthen the prominence signal the local pack rewards.' },
            { q: 'Do you handle multiple locations?', a: 'Yes. Each site gets its own optimised Google Business Profile and location page, managed consistently so they reinforce rather than compete with each other. Multi-location local SEO scales the same framework across every area, with geo-grid tracking for each one.' },
            { q: 'What is the difference between local SEO and national SEO?', a: 'Local SEO targets the map pack and "near me" searches for customers near your location. National SEO targets organic rankings across the whole UK, regardless of where the searcher sits. Most local businesses start local, then expand into national SEO as they grow, and we run both.' },
        ],
    },
];

export function getServicePage(slug) {
    return servicePagesData.find((p) => p.slug === slug) || null;
}

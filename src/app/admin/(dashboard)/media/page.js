import { listR2Media, isR2Configured } from '@/lib/r2';
import MediaManager from '@/components/admin/MediaManager';

export const dynamic = 'force-dynamic';

export default async function MediaPage() {
    if (!isR2Configured()) {
        return <MediaManager items={[]} error="not-configured" />;
    }

    let items = [];
    let error = null;
    try {
        items = await listR2Media();
    } catch (err) {
        error = err.message;
    }

    const usedBytes = items.reduce((sum, i) => sum + (i.size || 0), 0);
    // R2 has no hard bucket cap; this is a display quota (defaults to the
    // 10 GB free-tier storage allowance). Override with R2_QUOTA_GB.
    const quotaGb = Number(process.env.R2_QUOTA_GB || 10);
    const quotaBytes = quotaGb * 1024 * 1024 * 1024;

    return (
        <MediaManager
            items={items}
            error={error}
            usedBytes={usedBytes}
            quotaBytes={quotaBytes}
        />
    );
}

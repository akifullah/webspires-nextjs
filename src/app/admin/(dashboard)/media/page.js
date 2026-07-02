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

    return <MediaManager items={items} error={error} />;
}

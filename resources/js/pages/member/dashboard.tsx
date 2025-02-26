import { usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';
import MemberLayout from '@/layouts/member-layout';

export default function MemberDashboard() {
    const { auth } = usePage<SharedData>().props;
    console.log('auth: ', auth);
    return (
        <MemberLayout>
            Test
        </MemberLayout>
    );
};

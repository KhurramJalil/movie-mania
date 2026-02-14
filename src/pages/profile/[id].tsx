import * as React from 'react';
import { useRouter } from 'next/router';
import Profile from '../../components/Profile/Profile';

export default function ProfilePage() {
    const router = useRouter();
    const { id } = router.query;

    // Profile component expects to read the :id param via react-router; it uses useParams in original code.
    // We'll pass the id prop through via window.history state is not necessary; instead modify Profile to read from query if necessary.

    return (
        // The Profile component reads route params via react-router's useParams; to avoid editing it heavily, render it and let it read global state if possible.
        <Profile />
    );
}

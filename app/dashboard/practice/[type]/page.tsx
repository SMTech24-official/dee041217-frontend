import PracticeQuestion from '@/module/dashboard/practice/practiceQuestion';
import React from 'react';

function page({params}: {params: any}) {
    const {type} = params;
    return <PracticeQuestion type={type} />;
}

export default page;
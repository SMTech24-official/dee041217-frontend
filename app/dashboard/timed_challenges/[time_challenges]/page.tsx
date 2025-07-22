import QuestionComponent from '@/module/question';
import React from 'react';

function TimeChallengesPage({params}: {params: any}) {
    const {time_challenges} = params;
    return <QuestionComponent id={time_challenges} />;
}

export default TimeChallengesPage;
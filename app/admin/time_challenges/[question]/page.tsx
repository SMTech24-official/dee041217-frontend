import TimeChallengeQuestion from "@/module/admin/time_challenges/TimeChallengeQuestion";


function TimeChallengeQuestionPage({params}: {params: any}) {
    const {question} = params;
    return <TimeChallengeQuestion id={question as string} />;
}

export default TimeChallengeQuestionPage;
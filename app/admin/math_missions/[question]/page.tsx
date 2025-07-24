import MathMissionQuestion from "@/module/admin/math_missions/MathMissionQuestion";

function MathMissionQuestionPage({params}: {params: any}) {
    const {question} = params;
    return <MathMissionQuestion id={question as string} />;
}

export default MathMissionQuestionPage;
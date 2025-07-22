import QuestionComponent from "@/module/question";


function QuestionPage({params}: {params: any}) {
    const {id} = params;
    return <QuestionComponent id={id} />;
}

export default QuestionPage;
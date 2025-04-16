import { useParams } from "react-router-dom"

export const LearnContent = () => {
    const { learnId } = useParams()
    console.log(learnId)
    return (
        (
            <div>{learnId}</div>
        )
    )
}
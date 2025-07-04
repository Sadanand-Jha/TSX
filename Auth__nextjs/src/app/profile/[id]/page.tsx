// import { useParams } from "next/navigation";

export default function UserProfile({params}: any) {
    return (
        <div className="flex justify-center">
            profile:{params.id}
        </div>
    )
    
}
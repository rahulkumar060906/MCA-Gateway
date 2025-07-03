import React from 'react';
import { useLocation } from 'react-router-dom';
import StudyLecturePlayer from '../components/StudyPage';

export default function LectureViewPage() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const videoLink = searchParams.get("video") || "https://www.youtube.com/embed/1O1Vn2y7tQw";
    const videoId = videoLink.includes("embed/") ? videoLink.split("embed/")[1].split(/[?&]/)[0] : videoLink;

    return (
        <div className="w-full px-4 py-10">

            {/* Video Player with Internal Notes Toggle */}
            <div className="w-full lg:w-full  rounded-xl overflow-hidden shadow flex-shrink-0">
                <StudyLecturePlayer videoId={videoId} />
            </div>
        </div>
    );
}

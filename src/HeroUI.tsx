import { useNavigate } from "react-router-dom";

export default function HeroUI() {
    const nav = useNavigate();
    return (
        <div className="hero-ui">
            <p className="subtitle">Beyond Generation to Editing</p>
            <button
                className="cta-btn"
                onClick={() => nav("/start")}
                aria-label="무료로 시작하기"
            >
                무료로 시작하기
            </button>
        </div>
    );
}

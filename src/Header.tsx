import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="site-header" role="banner">
            <div className="site-row">
                {/* Left: Brand */}
                <Link className="brand" to="/">
                    <span className="logo-gem" aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M2.5 7.5L5 3.5h10l2.5 4-7.5 9-7.5-9Z" fill="url(#g)" />
                            <defs>
                                <linearGradient id="g" x1="2" y1="3" x2="18" y2="18" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#7C5CFF" />
                                    <stop offset=".5" stopColor="#7DF3FF" />
                                    <stop offset="1" stopColor="#4CE38A" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </span>
                    <span className="brand-text"><strong>VARCO</strong>&nbsp;3D</span>
                    <span className="beta-chip">Beta</span>
                </Link>

                <nav className="nav">
                    <Link className="btn-primary" to="/login">로그인</Link>
                    <div className="icon-btn divider" aria-label="Divider"></div>
                    {/* Language */}
                    <button className="icon-btn flat" aria-label="Language">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path
                                d="M11 2.75a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5Zm0 0c2.75 2.2 4.125 5.5 4.125 8.25S13.75 17.8 11 19.25M11 2.75C8.25 4.95 6.875 8.25 6.875 11S8.25 17.8 11 19.25M3 11h16"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                            />
                        </svg>
                    </button>
                    {/* Apps */}
                    <button className="icon-btn flat" aria-label="Apps">
                        <svg
                            className="icon-svg apps4"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            preserveAspectRatio="xMidYMid meet"
                            fill="none"
                        >
                            {([-1, 1] as const).flatMap((ix) =>
                                ([-1, 1] as const).map((iy, i) => {
                                    const CENTER = 12;
                                    const R = 3;
                                    const OFFSET = 5;
                                    return (
                                        <circle
                                            key={`${ix}-${iy}-${i}`}
                                            cx={CENTER + ix * OFFSET}
                                            cy={CENTER + iy * OFFSET}
                                            r={R}
                                            fill="currentColor"
                                        />
                                    );
                                })
                            )}
                        </svg>
                    </button>

                    {/* Hamburger */}
                    {/* <button className="icon-btn flat" aria-label="Menu">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </button> */}
                </nav>
            </div>
        </header>
    );
}

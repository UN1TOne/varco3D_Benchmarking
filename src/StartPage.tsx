import "./index.css";
import { useState } from "react";
import { StartScene } from "./StartScene";

export default function StartPage() {
    const [showImage, setShowImage] = useState(false);

    const openImage = () => setShowImage(true);
    const closeImage = () => setShowImage(false);

    return (
        <main className="start-page">
            <div className="start-layout">
                <aside className="start-sidebar">
                    <section className="start-card">
                        <header className="start-card-header">
                            <div className="start-card-title">
                                <span className="start-icon-circle">
                                    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" fill="none" />
                                        <path d="M12 7v5.2l3 1.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                                    </svg>
                                </span>
                                <span className="start-card-label">History</span>
                            </div>
                            <button className="start-chevron-btn" aria-label="Toggle history">
                                <span>▾</span>
                            </button>
                        </header>

                        <button className="start-history-item" type="button">
                            <div className="start-history-index">1</div>
                            <div className="start-history-text">
                                <span className="start-history-step">Mesh Generate</span>
                                <span className="start-history-name">Untitled</span>
                            </div>

                            <div className="start-history-thumb" onClick={openImage}>
                                <img src="/images/burger.webp" alt="Hamburger preview" />
                            </div>
                        </button>
                    </section>

                    <nav className="start-menu">
                        <button className="start-menu-row" type="button">
                            <span className="start-menu-left">
                                <span className="start-menu-icon">
                                    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                                        <path
                                            d="M5 12.5 11 6l6 6.5-6 6.5-6-6.5Z"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.4"
                                        />
                                    </svg>
                                </span>
                                <span className="start-menu-label">Edit</span>
                            </span>
                            <span className="start-menu-chevron">›</span>
                        </button>

                        <button className="start-menu-row" type="button">
                            <span className="start-menu-left">
                                <span className="start-menu-icon">
                                    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                                        <path
                                            d="M5 5h14v10H5z"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.4"
                                        />
                                        <path d="M5 15 3 19h18l-2-4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                                    </svg>
                                </span>
                                <span className="start-menu-label">
                                    Remesh <span className="start-menu-badge">Plus ✚</span>
                                </span>
                            </span>
                            <span className="start-menu-chevron">›</span>
                        </button>

                        <button className="start-menu-row" type="button">
                            <span className="start-menu-left">
                                <span className="start-menu-icon">
                                    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                                        <path
                                            d="M12 5v14M7 10l5-5 5 5"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.4"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </span>
                                <span className="start-menu-label">Animate</span>
                            </span>
                            <span className="start-menu-chevron">›</span>
                        </button>

                        <button className="start-menu-row" type="button">
                            <span className="start-menu-left">
                                <span className="start-menu-icon">
                                    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                                        <path
                                            d="M12 3v13M7 11l5 5 5-5"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.4"
                                            strokeLinecap="round"
                                        />
                                        <path d="M5 19h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                                    </svg>
                                </span>
                                <span className="start-menu-label">Export</span>
                            </span>
                            <span className="start-menu-chevron">›</span>
                        </button>
                    </nav>
                </aside>

                <section className="start-viewport">
                    <header className="start-viewport-header">
                        <div className="start-viewport-title">
                            <h1>Explore the Hamburger</h1>
                            <p>Drag to orbit · Scroll to zoom</p>
                        </div>
                        <div className="start-viewport-actions">
                            <button className="start-share-btn" type="button">
                                Share
                            </button>
                            <button className="start-icon-square" aria-label="Toggle environment">
                                <span />
                            </button>
                            <button className="start-icon-square" aria-label="Reset view">
                                <span />
                            </button>
                        </div>
                    </header>

                    <div className="start-viewport-canvas">
                        <StartScene />
                    </div>
                </section>
            </div>

            {showImage && (
                <div
                    className="start-modal-backdrop"
                    onClick={closeImage}
                    aria-modal="true"
                    role="dialog"
                >
                    <div
                        className="start-modal-body"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="start-modal-close"
                            type="button"
                            aria-label="Close image"
                            onClick={closeImage}
                        >
                            ✕
                        </button>
                        <img
                            className="start-modal-image"
                            src="/images/burger.webp"
                            alt="Hamburger fullsize"
                        />
                    </div>
                </div>
            )}
        </main>
    );
}

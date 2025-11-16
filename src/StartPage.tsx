import { useState } from "react";
import { StartScene } from "./StartScene";

function StartPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) closeModal();
    };

    return (
        <main className="start-main">
            <div className="start-root">
                <div className="start-canvas-layer">
                    <StartScene />
                </div>

                <aside className="start-sidebar">
                    <section className="start-panel">
                        <header className="start-panel-header">
                            <span className="start-panel-title">History</span>
                            <button className="start-panel-toggle" aria-label="Collapse history">
                                ▾
                            </button>
                        </header>

                        <div className="start-history-item">
                            <div className="start-history-index">1</div>
                            <div className="start-history-meta">
                                <p className="start-history-label">Mesh Generate</p>
                                <div className="start-history-row">
                                    <span className="start-history-name">Untitled</span>
                                    <span className="start-history-badge">📄</span>
                                </div>
                            </div>
                            <button
                                className="start-history-thumb"
                                type="button"
                                onClick={openModal}
                            >
                                <img src="/images/burger.webp" alt="Source reference" />
                            </button>
                        </div>
                    </section>

                    <section className="start-section">
                        <button className="start-section-row" type="button">
                            <span className="start-section-icon">🛠</span>
                            <span className="start-section-text">Edit</span>
                            <span className="start-section-arrow">›</span>
                        </button>
                    </section>

                    <section className="start-section">
                        <button className="start-section-row" type="button">
                            <span className="start-section-icon">🌐</span>
                            <span className="start-section-text">
                                Remesh <span className="start-section-tag">Plus ✚</span>
                            </span>
                            <span className="start-section-arrow">›</span>
                        </button>
                    </section>

                    <section className="start-section">
                        <button className="start-section-row" type="button">
                            <span className="start-section-icon">✨</span>
                            <span className="start-section-text">Animation</span>
                            <span className="start-section-arrow">›</span>
                        </button>
                    </section>

                    <section className="start-section">
                        <button className="start-section-row" type="button">
                            <span className="start-section-icon">⬇</span>
                            <span className="start-section-text">Export</span>
                            <span className="start-section-arrow">›</span>
                        </button>
                    </section>
                </aside>

                <div className="start-topbar">
                    <button className="start-share-btn" type="button">
                        Share
                    </button>
                    <button className="start-top-icon-btn" type="button" aria-label="Globe">
                        🌐
                    </button>
                    <button className="start-top-icon-btn" type="button" aria-label="View mode">
                        ⦿
                    </button>
                </div>

                {isModalOpen && (
                    <div
                        className="start-modal-backdrop"
                        onClick={handleBackdropClick}
                    >
                        <div className="start-modal-body">
                            <button
                                className="start-modal-close"
                                type="button"
                                aria-label="Close"
                                onClick={closeModal}
                            >
                                ✕
                            </button>
                            <img
                                src="/images/burger.webp"
                                alt="Full size hamburger reference"
                                className="start-modal-image"
                            />
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

export default StartPage;

import React, { useState, useEffect } from "react";
import type { JSX } from "react/jsx-runtime";

// HumanVerificationPage.tsx
// Bootstrap + small inline styles for a more colorful, centered, and playful UI.
// Place this file in src/components and ensure `bootstrap/dist/css/bootstrap.min.css` is imported in main.tsx.

export default function HumanVerificationPage(): JSX.Element {
    const [step, setStep] = useState<number>(0);
    const [notRobot, setNotRobot] = useState<boolean>(false);
    const [choice, setChoice] = useState<string | null>(null);
    const [typed, setTyped] = useState<string>("");
    const [failMessage, setFailMessage] = useState<string>("");

    // TODO: replace with your number (country code + number, no +)
    const whatsappNumber = "919896424507";
    const whatsappMessage = encodeURIComponent("Hey, I finished the human verification — can we actually talk now?");
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    useEffect(() => {
        // small playful auto-clear of fail message after 3s
        if (!failMessage) return;
        const t = setTimeout(() => setFailMessage(""), 3000);
        return () => clearTimeout(t);
    }, [failMessage]);

    const handleNext = () => {
        if (step === 0) {
            if (!notRobot) {
                setFailMessage("Tick the box if you want to continue. Robots don't get snacks.");
                return;
            }
            setFailMessage("");
            setStep(1);
        } else if (step === 1) {
            if (!choice) {
                setFailMessage("Pick one — indecision looks sus.");
                return;
            }
            setFailMessage("");
            setStep(2);
        } else if (step === 2) {
            if (typed.trim().toLowerCase() !== "only human") {
                setFailMessage("Close, but the magic phrase is: Only Human (case-insensitive).");
                return;
            }
            setFailMessage("");
            setStep(3);
        }
    };

    const reset = () => {
        setStep(0);
        setNotRobot(false);
        setChoice(null);
        setTyped("");
        setFailMessage("");
    };

    // small decorative gradients & styles
    const outerStyle: React.CSSProperties = {
        background: "linear-gradient(135deg,#fff7fb 0%, #f3f8ff 50%, #fffef8 100%)",
        minHeight: "100vh",
        padding: "2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    const cardStyle: React.CSSProperties = {
        maxWidth: 680,
        width: "100%",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(20,20,40,0.08)",
    };

    const leftAccent: React.CSSProperties = {
        background: "linear-gradient(180deg,#ff8fab 0%, #ffb86b 100%)",
        width: 8,
    };

    const avatarStyle: React.CSSProperties = {
        width: 64,
        height: 64,
        borderRadius: 12,
        background: "linear-gradient(135deg,#7c4dff,#ff6b9a)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: 700,
        fontSize: 18,
    };

    return (
        <div style={outerStyle}>
            <div style={cardStyle} className="d-flex bg-white flex-column">
                <div className="d-flex">
                    <div style={leftAccent} />
                    <div className="p-4 flex-grow-1">
                        <div className="d-flex align-items-center gap-3">
                            <div style={avatarStyle}>HI</div>
                            <div>
                                <h3 className="mb-0">Human Verification</h3>
                                <small className="text-muted">Let’s confirm you’re not a bot (flirting-enabled)</small>
                            </div>
                            <div className="ms-auto text-end">
                                <small className="text-muted">Step {step + 1} / 4</small>
                            </div>
                        </div>
                        <hr />
                        {/* content area */}
                        <div style={{ minHeight: 120, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                            {/* Step 0 */}
                            {step === 0 && (
                                <div>
                                    <p className="text-dark">Step 1 — prove you can read tiny words and make basic life choices.</p>
                                    <div className="form-check my-3">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={notRobot}
                                            onChange={(e) => setNotRobot(e.target.checked)}
                                            id="notRobotCheck"
                                            style={{ width: 18, height: 18 }}
                                        />
                                        <label className="form-check-label ms-2" htmlFor="notRobotCheck">
                                            I am not a robot. <small className="text-muted">(Also, I left you on seen. Don’t @ me.)</small>
                                        </label>
                                    </div>
                                    <div className="d-flex gap-2 mt-3">
                                        <button className="btn btn-gradient" onClick={handleNext}>Continue</button>
                                        <button className="btn btn-outline-secondary" onClick={reset}>Reset</button>
                                    </div>
                                    {failMessage && <div className="mt-3 text-danger small">{failMessage}</div>}
                                </div>
                            )}

                            {/* Step 1 */}
                            {step === 1 && (
                                <div>
                                    <p className="text-dark">Step 2 — choose the most human reaction:</p>
                                    <div className="d-flex flex-wrap gap-2 mt-2">
                                        <button onClick={() => setChoice("compliment")} className={`btn ${choice === "compliment" ? "btn-primary" : "btn-outline-primary"}`}>
                                            Awww, you made my day <small className="d-block text-muted">(Too sweet)</small>
                                        </button>
                                        <button onClick={() => setChoice("shrug")} className={`btn ${choice === "shrug" ? "btn-primary" : "btn-outline-primary"}`}>
                                            k <small className="d-block text-muted">(Silent but deadly)</small>
                                        </button>
                                        <button onClick={() => setChoice("flirt")} className={`btn ${choice === "flirt" ? "btn-primary" : "btn-outline-primary"}`}>
                                            Stop, you’re making me blush <small className="d-block text-muted">(Chef's kiss)</small>
                                        </button>
                                    </div>
                                    <div className="mt-3 d-flex gap-2">
                                        <button className="btn btn-gradient" onClick={handleNext}>Next</button>
                                        <button className="btn btn-gradient" onClick={() => setStep(0)}>Back</button>
                                    </div>
                                    {failMessage && <div className="mt-3 text-danger small">{failMessage}</div>}
                                </div>
                            )}

                            {/* Step 2 */}
                            {step === 2 && (
                                <div>
                                    <p className="text-dark">Step 3 — prove you read the tiny instruction:</p>
                                    <div className="p-3 rounded-3 mb-2" style={{ background: "linear-gradient(90deg,#f8f3ff,#fff6f0)" }}>
                                        Type: <strong>Only Human</strong>
                                    </div>
                                    <input value={typed} onChange={(e) => setTyped(e.target.value)} placeholder="Type the phrase here" className="form-control mb-3" />
                                    <div className="d-flex gap-2">
                                        <button className="btn btn-gradient" onClick={handleNext}>Verify</button>
                                        <button className="btn btn-gradient" onClick={() => setStep(1)}>Back</button>
                                    </div>
                                    {failMessage && <div className="mt-3 text-danger small">{failMessage}</div>}
                                </div>
                            )}

                            {/* Step 3 - result */}
                            {step === 3 && (
                                <div className="text-center">
                                    <div style={{ fontSize: 46 }}>💘</div>
                                    <h4 className="mt-2">Verification Complete</h4>
                                    <p className="text-muted">You passed the human test — you can read, have taste, and still left me on seen. Proud of you.</p>
                                    <div className="d-flex flex-column flex-sm-row justify-content-center gap-2 mt-3">
                                        <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn btn-whatsapp">DM on WhatsApp</a>
                                        <button className="btn btn-outline-secondary" onClick={reset}>Verify again</button>
                                    </div>
                                    <div className="mt-3 small text-muted">Made with mild sarcasm and actual effort.</div>
                                </div>
                            )}
                        </div>
                        <footer className="mt-4 text-center">
                            <div className="small text-muted">
                                <span className="d-block mb-1">💡 Flirty Tips:</span>
                                <ul className="list-unstyled mb-0">
                                    <li>• Passing this means you unlocked <strong>Level 2</strong> — replying faster to my texts.</li>
                                    <li>• Don’t worry, I don’t verify everyone… you’re just special.</li>
                                </ul>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
            {/* small styles injected so project doesn't need an extra CSS file */}
            <style>{`
        .btn-gradient{
          background: linear-gradient(90deg,#ff6b9a,#7c4dff);
          border: none;
          color: white;
        }
        .btn-gradient:hover{ filter: brightness(0.95); }
        .btn-whatsapp{
          background: linear-gradient(90deg,#25D366,#1DA851);
          color: white;
          border: none;
        }
        @media (max-width: 576px){
          .d-flex.flex-sm-row{ flex-direction: column !important; }
        }
      `}</style>
        </div>
    );
}

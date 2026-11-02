'use client';

import React, { useEffect, useRef, useState } from 'react';
import './onepage.css';

const WORK_OPTIONS = [
    { value: 'Founder', label: 'Founder' },
    { value: 'computational biologist', label: 'Computational biologist' },
    { value: 'experimental scientist', label: 'Experimental scientist' },
    { value: 'independent researcher', label: 'Independent researcher' },
    { value: 'other', label: 'Other' },
];
const OBSTACLE_OPTIONS = [
    { value: 'Cost', label: 'Cost' },
    { value: 'access to equipment', label: 'Access to equipment' },
    { value: 'time', label: 'Time' },
    { value: 'expertise', label: 'Expertise' },
    { value: 'another obstacle', label: 'Another obstacle' },
];
const WAITLIST_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxwrxDTWXPo6fPsd6NTDKuuGrl9ecL9IG2IVk6u-mmFW0CNTwmUQbSLvgbad0wXAdrwsA/exec';

export default function Home() {
    const heroVideoRef = useRef<HTMLVideoElement>(null);
    const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'done' | 'error' | 'error-network'>('idle');
    const [work, setWork] = useState('');
    const [obstacle, setObstacle] = useState('');

    const handleWaitlistSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const form = event.currentTarget.closest('form');
        if (!form) return;
        if (!form.reportValidity()) return;
        setSubmitState('sending');
        const fd = new FormData(form);
        const workOther = (fd.get('work_other') || '').toString().trim();
        if (fd.get('work') === 'other' && workOther) fd.set('work', 'other: ' + workOther);
        fd.delete('work_other');
        const obstacleOther = (fd.get('obstacle_other') || '').toString().trim();
        if (fd.get('obstacle') === 'another obstacle' && obstacleOther) fd.set('obstacle', 'another obstacle: ' + obstacleOther);
        fd.delete('obstacle_other');
        fetch(WAITLIST_ENDPOINT, { method: 'POST', body: fd })
            .then((r) => r.json())
            .then((j) => {
                if (j && j.ok) {
                    form.reset();
                    setWork('');
                    setObstacle('');
                    setSubmitState('done');
                } else {
                    setSubmitState('error');
                }
            })
            .catch(() => setSubmitState('error-network'));
    };

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches && heroVideoRef.current) {
            heroVideoRef.current.pause();
        }
    }, []);

    return (
        <div className="mock">
            <header className="topbar">
                <img className="logo" src="/logoLG.png" alt="BioCompute" />
                <nav className="topnav">
                    <a className="nav-link" href="https://blog.biocomputeinc.com/" target="_blank" rel="noopener noreferrer">Blog</a>
                    <a className="pill-button" href="#waitlist" onClick={(e) => { e.preventDefault(); document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' }); }}>Join the waitlist</a>
                </nav>
            </header>

            <section className="hero">
                <video
                    ref={heroVideoRef}
                    className="hero-video"
                    src="https://github.com/user-attachments/assets/feaf3ae4-5d01-4ce7-9395-9c2688b31e9c"
                    poster="https://github.com/user-attachments/assets/93399241-7d66-43ec-b67e-fd780450acbe"
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-hidden="true"
                />
                <div className="hero-scrim" aria-hidden="true" />
                <div className="hero-content">
                    <h1>Idea to lab data.<br className="br-mobile" /> In record time.</h1>
                    <p className="tagline">
                        <span className="sent">You or your AI agent bring the experiment.</span>{' '}
                        <span className="sent">We run it on our custom hardware.</span>{' '}
                        <span className="sent">You get the data in record time.</span>
                    </p>
                    <p className="tagline tagline-accent">Think Lovable, but for biology.</p>
                    <a className="pill-button is-large" href="#waitlist" onClick={(e) => { e.preventDefault(); document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' }); }}>Join the waitlist</a>
                </div>
            </section>

            <section className="waitlist" id="waitlist">
                <div className="why">
                    <p className="why-lead">We built this specialized hardware for biocomputing.</p>
                    <p className="why-sub">Now we are opening it up to anyone with a good idea to accelerate scientific discovery.</p>
                    <p className="why-badge">No biology background or wet lab experience needed.</p>
                </div>
                <h2>Join the waitlist</h2>
                <form>
                    <label>Name<input type="text" name="name" required /></label>
                    <label>Email<input type="email" name="email" required /></label>
                    <label>What best describes your work?
                        <select name="work" required value={work} onChange={(e) => setWork(e.target.value)}>
                            <option value="" disabled>Select one</option>
                            {WORK_OPTIONS.map((o) => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                        </select>
                        {work === 'other' && (
                            <input className="other-fill" type="text" name="work_other" placeholder="Please specify" />
                        )}
                    </label>
                    <label>What&apos;s the first experiment you would run?
                        <textarea name="experiment" rows={3} />
                    </label>
                    <label>What&apos;s stopping you from running it today?
                        <select name="obstacle" required value={obstacle} onChange={(e) => setObstacle(e.target.value)}>
                            <option value="" disabled>Select one</option>
                            {OBSTACLE_OPTIONS.map((o) => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                        </select>
                        {obstacle === 'another obstacle' && (
                            <input className="other-fill" type="text" name="obstacle_other" placeholder="Please specify" />
                        )}
                    </label>
                    <label>How often would you need to run experiments like this?
                        <input type="text" name="frequency" />
                    </label>
                    <button className="pill-button is-large" type="button" disabled={submitState === 'sending'} onClick={handleWaitlistSubmit}>
                        {submitState === 'sending' ? 'Submitting...' : 'Submit'}
                    </button>
                    {submitState === 'done' && (
                        <p className="form-note is-success">Thanks - you are on the list. We will be in touch.</p>
                    )}
                    {submitState === 'error' && (
                        <p className="form-note is-error">Something went wrong. Please try again.</p>
                    )}
                    {submitState === 'error-network' && (
                        <p className="form-note is-error">Could not reach the server. Please check your internet connection and try again, or email hello@biocomputeinc.com.</p>
                    )}
                </form>
            </section>

            <footer className="footer">
                <p>BioCompute Inc &middot; 2311 Bowditch Street, Berkeley, CA 94704 &middot; hello@biocomputeinc.com</p>
            </footer>
        </div>
    );
}

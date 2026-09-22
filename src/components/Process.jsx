import React from 'react';
import { process, principles } from '../data/content.js';

export const Process = () => {
  return (
    <section id="process" className="process-section" aria-labelledby="process-heading">
      <div className="process-inner">
        <div className="process-steps-column">
          <span className="process-eyebrow">Process</span>
          <h2 id="process-heading">How I approach a project</h2>
          <p className="process-intro">
            Roughly the same shape whether it's a greenfield product or reliability work
            on something already live.
          </p>

          <ol className="process-list">
            {process.map((step) => (
              <li key={step.number} className="process-step">
                <span className="process-step-number" aria-hidden="true">{step.number}</span>
                <div className="process-step-content">
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="principles-column">
          <span className="process-eyebrow">Principles</span>
          <h3>
            A few things I've learned to insist on
          </h3>
          <div className="principles-list">
            {principles.map((p) => (
              <div key={p.title} className="principle-item">
                <h4>{p.title}</h4>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;

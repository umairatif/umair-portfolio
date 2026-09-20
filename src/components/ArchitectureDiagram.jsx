import React, { useMemo } from 'react';

/**
 * Renders a project's real architecture as a lane diagram: nodes grouped into
 * lanes (Client / API / Queue / etc.), connected by edges. This is drawn from
 * the same data used to write the prose architecture section — it is not a
 * generic decorative graphic, it is the actual system shape.
 *
 * Layout is computed directly (no charting library) since the graph is small,
 * fixed and known ahead of time.
 */
export function ArchitectureDiagram({ diagram, title }) {
  const { lanes, edges, caption } = diagram;

  const layout = useMemo(() => {
    const laneGap = 150;
    const nodeH = 54;
    const nodeGapY = 18;
    const nodeW = 134;
    const padTop = 40;

    const positioned = {};
    const laneMeta = lanes.map((lane, li) => {
      const x = li * laneGap + 74;
      lane.nodes.forEach((n, ni) => {
        const y = padTop + ni * (nodeH + nodeGapY);
        positioned[n.id] = { x, y, w: nodeW, h: nodeH, ...n };
      });
      const maxY = padTop + lane.nodes.length * (nodeH + nodeGapY);
      return { label: lane.label, x, maxY };
    });

    const width = lanes.length * laneGap + 90;
    const height = Math.max(...laneMeta.map((l) => l.maxY)) + 30;

    return { positioned, laneMeta, width, height, nodeW, nodeH };
  }, [lanes]);

  const { positioned, laneMeta, width, height, nodeW, nodeH } = layout;

  return (
    <figure className="diagram-figure">
      <div className="diagram-scroll">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          role="img"
          aria-labelledby="diagram-title diagram-desc"
          className="diagram-svg"
        >
          <title id="diagram-title">{title} architecture diagram</title>
          <desc id="diagram-desc">{caption}</desc>

          {laneMeta.map((lane) => (
            <text
              key={lane.label}
              x={lane.x + nodeW / 2}
              y={20}
              textAnchor="middle"
              className="diagram-lane-label"
            >
              {lane.label}
            </text>
          ))}

          {edges.map((edge, i) => {
            const a = positioned[edge.from];
            const b = positioned[edge.to];
            if (!a || !b) return null;
            const x1 = edge.back ? a.x : a.x + nodeW;
            const x2 = edge.back ? b.x + nodeW : b.x;
            const y1 = a.y + nodeH / 2 + (edge.back ? 14 : 0);
            const y2 = b.y + nodeH / 2 + (edge.back ? 14 : 0);
            const midX = (x1 + x2) / 2;
            return (
              <path
                key={i}
                d={`M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`}
                className={`diagram-edge${edge.dashed ? ' is-dashed' : ''}${edge.back ? ' is-back' : ''}`}
                markerEnd="url(#diagram-arrow)"
              />
            );
          })}

          <defs>
            <marker id="diagram-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" className="diagram-arrowhead" />
            </marker>
          </defs>

          {Object.values(positioned).map((n) => (
            <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
              <rect
                width={nodeW}
                height={nodeH}
                rx="3"
                className={`diagram-node${n.accent ? ' is-accent' : ''}`}
              />
              <text x="12" y="24" className="diagram-node-label">
                {n.label}
              </text>
              {n.sub && (
                <text x="12" y="41" className="diagram-node-sub">
                  {n.sub}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>
      <figcaption className="diagram-caption">{caption}</figcaption>
    </figure>
  );
}

export default ArchitectureDiagram;

import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const width = 900;
const height = 600;
const BORDER_COLOR = "#b22222";
const FILL_COLOR = "rgba(255,51,51,0.07)";
const ANIMATION_DURATION = 700;

const BubbleChart = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    d3.select(ref.current).selectAll("*").remove();

    // Exaggerate value differences for visual clarity
    const minValue = d3.min(data, d => d.value);
    const maxValue = d3.max(data, d => d.value);
    const visualValueScale = d3.scalePow()
      .exponent(2.3)
      .domain([minValue, maxValue])
      .range([1, 100]);

    const packedData = data.map(d => ({
      ...d,
      visualValue: visualValueScale(d.value)
    }));

    const root = d3.hierarchy({ children: packedData }).sum(d => d.visualValue);

    const pack = d3.pack()
      .size([width, height])
      .padding(8);

    const nodes = pack(root).leaves();

    const svg = d3.select(ref.current)
      .attr("width", width)
      .attr("height", height);

    // Add groups for each bubble
    const node = svg.selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("transform", d => `translate(${d.x},${d.y})`);

    node.append("circle")
      .attr("r", 0)
      .attr("fill", FILL_COLOR)
      .attr("stroke", BORDER_COLOR)
      .attr("stroke-width", 4)
      .attr("opacity", 0);

    node.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", ".3em")
      .attr("fill", "#fff")
      .attr("font-size", d => Math.max(12, d.r / 3))
      .attr("opacity", 0)
      .text(d => d.data.name);

    // Animate in: scale up and fade in, staggered
    node.select("circle")
      .transition()
      .delay((d, i) => i * 120)
      .duration(ANIMATION_DURATION)
      .attr("r", d => d.r)
      .attr("opacity", 1);

    node.select("text")
      .transition()
      .delay((d, i) => i * 120 + 100)
      .duration(ANIMATION_DURATION)
      .attr("opacity", 1);

    // After all bubbles are in, start vibration
    setTimeout(() => {
      node.each(function(d, i) {
        vibrate(d3.select(this), d.x, d.y, i);
      });
    }, ANIMATION_DURATION + data.length * 120);

    // Vibration function: recursively animate group position
    function vibrate(selection, baseX, baseY, idx) {
      const amplitude = 4 + Math.random() * 3; // max px offset
      const duration = 700 + Math.random() * 500; // ms

      // Random offset in a circle
      const angle = Math.random() * 2 * Math.PI;
      const dx = Math.cos(angle) * amplitude;
      const dy = Math.sin(angle) * amplitude;

      selection
        .transition()
        .duration(duration)
        .ease(d3.easeSinInOut)
        .attr("transform", `translate(${baseX + dx},${baseY + dy})`)
        .on("end", () => {
          // Animate back to base, then repeat
          selection
            .transition()
            .duration(duration)
            .ease(d3.easeSinInOut)
            .attr("transform", `translate(${baseX},${baseY})`)
            .on("end", () => vibrate(selection, baseX, baseY, idx));
        });
    }

  }, [data]);

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      minHeight: `${height}px`
    }}>
      <svg ref={ref} style={{ display: "block", margin: "0 auto", background: "transparent" }} />
    </div>
  );
};

export default BubbleChart;

import { useEffect, useRef } from "react";
import {
  select,
  forceSimulation,
  forceManyBody,
  forceLink,
  forceCenter,
  drag,
} from "d3";

import { nodes, links, MANY_BODY_STRENGTH } from "./data";

function App() {
  const svgRef = useRef(null);

  // will be called initially and on every data change
  useEffect(() => {
    const svg: any = select(svgRef.current);
    const width = +svg.attr("width");
    const height = +svg.attr("height");
    const centerX = width / 2;
    const centerY = height / 2;

    const simulation = forceSimulation(nodes)
      .force("charge", forceManyBody().strength(MANY_BODY_STRENGTH)) // first argument "charge" is any name
      .force(
        "link",
        forceLink(links).distance((link: any) => link.distance)
      )
      .force("center", forceCenter(centerX, centerY));

    const dragInteraction = drag().on("drag", (event, node: any) => {
      node.fx = event.x;
      node.fy = event.y;
      simulation.alpha(1);
      simulation.restart();
    });

    const lines = svg
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", (link: any) => link.color || "black");

    const circles = svg
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("fill", (node: any) => node.color || "gray")
      .attr("r", (node: any) => node.size)
      .call(dragInteraction);

    const text = svg
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .style("pointer-events", "none")
      .text((node: any) => node.id);

    simulation.on("tick", () => {
      circles
        .attr("cx", (node: any) => node.x)
        .attr("cy", (node: any) => node.y);
      text.attr("x", (node: any) => node.x).attr("y", (node: any) => node.y);

      lines
        .attr("x1", (link: any) => link.source.x)
        .attr("y1", (link: any) => link.source.y)
        .attr("x2", (link: any) => link.target.x)
        .attr("y2", (link: any) => link.target.y);
    });
  }, [svgRef]);

  return <svg id="container" width="960" height="960" ref={svgRef}></svg>;
}

export default App;

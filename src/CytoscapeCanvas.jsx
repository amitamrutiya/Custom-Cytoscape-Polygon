import  { useEffect } from "react";
import cytoscape from "cytoscape";

const shapes = [
  {
    name: "Internal Storage",
    points:
      "-1 -0.6153846153846154 -1 0.6153846153846154 1 0.6153846153846154 1 -0.6153846153846154 -0.7692307692307693 -0.6153846153846154 -0.7692307692307693 0.6153846153846154 -0.7692307692307693 -0.6153846153846154 -1 -0.6153846153846154 -1 -0.38461538461538464 1 -0.38461538461538464 1 -0.6153846153846154",
  },
  {
    name: "Merge",
    points: "-1 -0.7653846153846153 1 -0.7692307692307693 0 0.7692307692307693",
  },
  {
    name: "Sort",
    points: "-1 0 1 0 0 -1 -1 0 0 1 1 0",
  },
  {
    name: "Loop Limit",
    points:
      "-1 0 -1 1 1 1 1 0 0.46153846153846156 -0.7692307692307693 -0.46153846153846156 -0.7692307692307693",
  },
  {
    name: "Action",
    points:
      "-1 -0.6230769230769231 -1 0.6153846153846154 1 0.6153846153846154 1 -0.6153846153846154",
  },
  {
    name: "Manual Oper",
    points:
      "-1 -0.6192307692307693 -0.5384615384615384 0.6153846153846154 0.5384615384615384 0.6153846153846154 1 -0.6153846153846154",
  },
  {
    name: "Collate",
    points: "-1 -1 1 -1 -1 1 1 1",
  },
  {
    name: "Manual Input",
    points: "-1 1 -1 -0.3076923076923077 1 -0.7692307692307693 1 1 -1 1",
  },
  {
    name: "Predefined",
    points:
      "-0.7692307692307693 0.6153846153846154 -0.7692307692307693 -0.6153846153846154 -1 -0.6153846153846154 -1 0.6153846153846154 0.7692307692307693 0.6153846153846154 1 0.6153846153846154 1 -0.6153846153846154 0.7692307692307693 -0.6153846153846154 0.7692307692307693 0.6153846153846154 0.7692307692307693 -0.6153846153846154 -0.7692307692307693 -0.6153846153846154",
  },
  {
    name: "Arrow",
    points: "-1 1 0 -1 1 1 0 0.23076923076923078",
  },
  {
    name: "Styled Arrow",
    points:
      "-1 0.22692307692307692 1 0.23076923076923078 0 -1 -1 0.23076923076923078 0 0.23076923076923078 0 1 0 0.6153846153846154 -0.3076923076923077 0.6153846153846154 0.3076923076923077 0.6153846153846154 0 0.6153846153846154 0 0.23076923076923078",
  },
];

const CytoscapeShapes = () => {
  useEffect(() => {
    const cy = cytoscape({
      container: document.getElementById("cy"), // container to render in
      elements: shapes.map((shape, index) => ({
        data: { id: shape.name, label: shape.name },
        position: { x: 150, y: 100 + index * 100 },
      })),
      style: [
        {
          selector: "node",
          style: {
            shape: "polygon",
            "shape-polygon-points": (ele) => ele.data("points"),
            width: 100,
            height: 100,
            "background-color": "lightblue",
            label: "data(label)",
            "text-valign": "center",
            color: "#000",
            "font-size": 12,
            "border-width": 1,
          },
        },
      ],
      layout: {
        name: "preset",
      },

    });

    // Assign the points to each node after initialization
    cy.batch(() => {
      shapes.forEach((shape) => {
        cy.getElementById(shape.name).data("points", shape.points);
      });
    });

    // Cleanup on unmount
    return () => cy.destroy();
  }, []);

  return (
    <div
      id="cy"
      style={{ width: "100vw", height: "97vh", border: "1px solid black",backgroundColor: "antiquewhite" }}
    />
  );
};

export default CytoscapeShapes;

import { useEffect } from "react";
import cytoscape from "cytoscape";

const shapes1 = [
  {
    name: "Internal Storage",
    points:
      "-1 -0.62 -1 0.62 1 0.62 1 -0.62 -0.77 -0.62 -0.77 0.62 -0.77 -0.62 -1 -0.62 -1 -0.38 1 -0.38 1 -0.62",
  },
  {
    name: "Sort",
    points: "-1 0 1 0 0 -1 -1 0 0 1 1 0",
  },
  {
    name: "Loop Limit",
    points:
      "-1 0 -1 1 1 1 1 0 0.47 -0.77 -0.46 -0.77",
  },
  {
    name: "Manual Oper",
    points:
      "-1 -0.62 -0.54 0.62 0.54 0.62 1 -0.62",
  },
  {
    name: "Collate",
    points: "-1 -1 1 -1 -1 1 1 1",
  },
  {
    name: "Manual Input",
    points: "-1 1 -1 -0.31 1 -0.77 1 1 -1 1",
  },
  {
    name: "Arrow Head",
    points:
      "-1 1 0 -1 1 1 0 0.23",
  },
  {
    name: "Predefined",
    points:
      "-0.77 0.62 -0.77 -0.62 -1 -0.62 -1 0.62 0.77 0.62 1 0.62 1 -0.62 0.77 -0.62 0.77 0.62 0.77 -0.62 -0.77 -0.62",
  },
  {
    name: "Styled Arrow",
    points:
      "-1 0.23 1 0.23 0 -1 -1 0.23 0 0.23 0 1 0 0.62 -0.31 0.62 0.31 0.62 0 0.62 0 0.23",
  },
  {
    name: "Callout",
    points:
      "-1 -0.69 1 -0.69 1 0.31 0.69 0.30 0.54 0.69 0.31 0.31 -1 0.31"
  },
  {
    name: "FourPointStar",
    points: "-1 0 -.2 -.2  0 -1 .2 -.2 1 0 .2 .2  0 1 -.2 .2"
  },
  {
    name: "EightPointStar",
    points: "-0.54 1 -0.54 0.38 -1 0 -0.54 -0.38 -0.54 -1 0 -0.62 0.54 -1 0.54 -0.38 1 0 0.54 0.38 0.54 1 0 0.62"
  },
  {
    name: "Card",
    points: "-0.85 1 -0.85 -0.46 -0.30 -1 0.85 -1 0.85 1"

  },
  {
    name: "Cube",
    points: "-1 -0.77 -1 0.31 -0.54 0.77 -0.54 -0.31 1 -0.31 0.54 -0.77 -1 -0.77 -0.54 -0.31 -0.54 -0.31 -1 -0.77 -1 0.31 -0.54 0.77 1 0.77 1 -0.31 0.54 -0.77"
  },
  {
    name: "Isometric Cube",
    points: "0 -0.08 0 1 -1 0.54 -1 -0.54 -1 -0.54 -1 -0.54 -1 -0.54 -1 -0.54 -1 -0.54 0 -1 1 -0.54 1 0.54 0 1 0 -0.08 -1 -0.54 0 -0.08 1 -0.54"
  },
  {
    name: "Note",
    points: "-0.77 -1 -0.77 1 0.77 1 0.77 -0.38 0.15 -1 0.15 -0.38 0.77 -0.38 0.15 -1 -0.77 -1"
  },
  {
    name: "Horizontal Crossbar",
    points: "-1 -0.54 -1 0.38 -1 -0.08 1 -0.08 1 -0.54 1 0.38 1 -0.08 -1 -0.08"
  },
  {
    name: "Vertical Crossbar",
    points: "-0.47 -1 0.46 -1 0 -1 0 1 -0.46 1 0.46 1 0 1 0 -1"
  },
  {
    name: "Bidirectional Arrow",
    points: "-1 -0.08 -0.69 -0.62 -0.69 -0.31 0.69 -0.31 0.69 -0.62 1 -0.08 0.69 0.46 0.69 0.15 -0.69 0.15 -0.69 0.46"
  },
  {
    name: "Bidirectional Connector",
    points: "-0.54 -0.38 -1 -0.08 -0.54 0.23 -0.69 -0.08 0.69 -0.08 0.54 0.23 1 -0.08 0.54 -0.38 0.69 -0.08 -0.69 -0.08"
  },
];

const shapes2 = [
  {
    name: "Corner",
    points: "-1 1 -1 -1 1 -1 1 -0.62 -0.62 -0.62 -0.62 1 -1 1"
  },
  {
    name: "Tee",
    points: "-1 -0.55 -1 -1 1 -1 1 -0.54 0.23 -0.54 0.23 1 -0.23 1 -0.23 -0.54"
  },
  {
    name: "OffPageConnector",
    points: "-1 0.15 -1 -1 1 -1 1 0.15 0 1"
  },
  {
    name: "DiagonalSnipRectengle",
    points: "-1 0.69 0.69 0.69 1 0.38 1 -0.69 -0.69 -0.69 -1 -0.38"
  },
  {
    name: "LayerdRectengle",
    points: "-1 0.46 -1 -0.77 0.69 -0.77 0.69 0.46 -1 0.46 -0.85 0.46 -0.85 0.62 0.85 0.62 0.85 -0.62 0.69 -0.62 0.85 -0.62 0.85 -0.46 1 -0.46 1 0.77 -0.69 0.77 -0.69 0.62 -0.85 0.62 0.85 0.62 0.85 -0.62 0.69 -0.62 0.69 0.46"
  },
  {
    name: "Message",
    points: "-1 0.69 1 0.69 1 -0.77 -1 -0.77 0 -0.15 1 -0.77 -1 -0.77"
  },
  {
    name: "Pyramid",
    points: "0.23 1 -0.08 -1 -1 0.69 0.23 1 1 0.69 -0.08 -1"
  },
  {
    name: "X (Destrcution)",
    points: "1 1 -1 -1 0 0 1 -1 -1 1 0 0"
  },
  {
    name: "X",
    points: "-0.23 0 -0.92 -1 -0.54 -1 0 -0.31 0.54 -1 0.92 -1 0.23 0 0.92 1 0.46 1 0 0.31 -0.54 1 -0.92 1 -0.92 1",
  },
  {
    name: "ObtuseTriangle",
    points: "-0.38 1 -1 -1 1 1",
  },
  {
    name: "RightArrow",
    points: "-1 0.22 -1 -0.23 0.46 -0.23 0.46 -0.46 1 0 0.46 0.46 0.46 0.23",
  },
  {
    name: "LeftArrow",
    points: "1 0.24 -0.38 0.23 -0.38 0.46 -1 0 -0.38 -0.46 -0.38 -0.23 1 -0.23",
  },
  {
    name: "UpArrow",
    points: "-0.23 1 0.23 1 0.23 -0.38 0.46 -0.38 0 -1 -0.46 -0.38 -0.23 -0.38",
  },
  {
    name: "DownArrow",
    points: "-0.23 -1 0.23 -1 0.23 0.38 0.46 0.38 0 1 -0.46 0.38 -0.23 0.38",
  },
  {
    name: "NotchedArrow",
    points: "-1 0.38 -1 0.38 -0.62 0 -1 -0.38 0.23 -0.38 0.23 -0.77 1 0 0.23 0.77 0.23 0.38"
  },
  {
    name: "TailedArrow",
    points: "-1 0.77 -1 -0.77 -0.54 -0.77 0 -0.23 0.46 -0.23 0.46 -0.46 1 0 0.46 0.46 0.46 0.23 0 0.23 -0.54 0.77"
  },
  {
    name: "TriadArrow",
    points: "-0.62 0.69 -1 0.31 -0.62 -0.08 -0.62 0.15 -0.15 0.15 -0.15 -0.31 -0.38 -0.31 0 -0.69 0.38 -0.31 0.15 -0.31 0.15 0.15 0.62 0.15 0.62 -0.08 1 0.31 0.62 0.69 0.62 0.46 -0.62 0.46"
  },
  {
    name: "QuadArrow",
    points: "-0.62 0.38 -1 0 -0.62 -0.38 -0.62 -0.15 -0.15 -0.15 -0.15 -0.62 -0.38 -0.62 0 -1 0.38 -0.62 0.15 -0.62 0.15 -0.15 0.62 -0.15 0.62 -0.38 1 0 0.62 0.38 0.62 0.15 0.15 0.15 0.15 0.62 0.38 0.62 0 1 -0.38 0.62 -0.15 0.62 -0.15 0.15 -0.62 0.15",
  },
  {
    name: "BendArrow",
    points: "-1 1 -1 -0.62 0.62 -0.62 0.62 -1 0.99 -0.43 0.62 0.15 0.62 -0.23 -0.62 -0.23 -0.62 1",
  },
  {
    name: "BendDoubleArrow",
    points: "-0.54 1 -1 0.54 -0.69 0.54 -0.69 -0.69 0.54 -0.69 0.54 -1 1 -0.54 0.54 -0.08 0.54 -0.38 -0.38 -0.38 -0.38 0.54 -0.08 0.54",
  },
  {
    name: "Signal-InArrow",
    points: "-1 0.37 -1 -0.38 0.62 -0.38 1 0 0.62 0.38",
  },
  {
    name: "CalloutWithDoubleArrow90",
    points: "-1 0.38 -1 -1 0.38 -1 0.38 -0.46 0.62 -0.46 0.62 -0.69 1 -0.31 0.62 0.08 0.62 -0.15 0.38 -0.15 0.38 0.38 -0.15 0.38 -0.15 0.62 0.08 0.62 -0.31 1 -0.69 0.62 -0.46 0.62 -0.46 0.38",
  },
  {
    name: "CalloutWithDoubleArrow",
    points: "-0.62 0.54 -1 0 -0.62 -0.54 -0.62 -0.23 -0.46 -0.23 -0.46 -0.54 0.46 -0.54 0.46 -0.23 0.62 -0.23 0.62 -0.54 1 0 0.62 0.54 0.62 0.23 0.46 0.23 0.46 0.54 -0.46 0.54 -0.46 0.23 -0.62 0.23",
  },
  {
    name: "CalloutQuadArrow",
    points: "-0.62 0.38 -1 0 -0.62 -0.38 -0.62 -0.23 -0.46 -0.23 -0.46 -0.46 -0.23 -0.46 -0.23 -0.62 -0.38 -0.62 0 -1 0.38 -0.62 0.23 -0.62 0.23 -0.46 0.46 -0.46 0.46 -0.23 0.62 -0.23 0.62 -0.38 1 0 0.62 0.38 0.62 0.23 0.46 0.23 0.46 0.46 0.23 0.46 0.23 0.62 0.38 0.62 0 1 -0.38 0.62 -0.23 0.62 -0.23 0.46 -0.46 0.46 -0.46 0.23 -0.62 0.23",
  },
  {
    name: "TailedArrowWithNotch",
    points: "-1 0.69 -0.62 0 -1 -0.69 -0.54 -0.69 -0.23 -0.15 0.38 -0.15 0.38 -0.69 1 0 0.38 0.69 0.38 0.15 -0.23 0.15 -0.54 0.69",
  },
  {
    name: "Entity",
    points: "-1 0.61 -1 -0.62 1 -0.62 1 -0.23 -1 -0.23 -1 0.62 1 0.62 1 -0.23 -1 -0.23",
  },
]

const CytoscapeShapes = () => {
  useEffect(() => {
    const cy1 = cytoscape({
      container: document.getElementById("cy1"), // container to render in
      elements: shapes1.map((shape, index) => ({
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
        name: "circle",
      },
    });

    const cy2 = cytoscape({
      container: document.getElementById("cy2"), // container to render in
      elements: shapes2.map((shape, index) => ({
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
        name: "circle",
      },
    });

    // Assign the points to each node after initialization
    cy1.batch(() => {
      shapes1.forEach((shape) => {
        cy1.getElementById(shape.name).data("points", shape.points);
      });
    });

    cy2.batch(() => {
      shapes2.forEach((shape) => {
        cy2.getElementById(shape.name).data("points", shape.points);
      });
    });

    // Cleanup on unmount
    return () => {
      cy1.destroy();
      cy2.destroy();
    };
  }, []);

  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "97vh",
          border: "1px solid black",
          background: "radial-gradient(circle, #ffecd2, #fcb69f)",
          display: "flex",
        }}
      >
        <div id="cy1" style={{ width: "50%", height: "100%" }} />
        <div id="cy2" style={{ width: "50%", height: "100%" }} />
      </div>
    </>
  );
};

export default CytoscapeShapes;

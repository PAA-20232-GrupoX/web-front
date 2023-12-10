import "./styles.css";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";
import "cytoscape-context-menus/cytoscape-context-menus.css";
import "cytoscape-navigator/cytoscape.js-navigator.css";
import { useEffect, useRef, useState } from "react";
import data from "./data";

cytoscape.use(dagre);

const AnimatedGraph = ({ treePath, setTreePath }) => {
  const [changedNodes, setChangedNodes] = useState([]);
  const [pan, setPan] = useState({});

  var nodeHtmlLabel = require("cytoscape-node-html-label");
  var expandCollapse = require("cytoscape-expand-collapse");
  var navigator = require("cytoscape-navigator");
  
  if (typeof cytoscape("core", "expandCollapse") === "undefined") {
    expandCollapse(cytoscape);
  }
  if (typeof cytoscape("core", "nodeHtmlLabel") === "undefined") {
    nodeHtmlLabel(cytoscape);
  }
  if (typeof cytoscape("core", "navigator") === "undefined") {
  navigator(cytoscape);
  }
  
  
  var options = {
    evtType: "cxttap",
    menuItems: [
      {
        id: "details",
        content: "View Details...",
        tooltipText: "View Details",
        selector: "node, edge",
        hasTrailingDivider: true
      },
      {
        id: "generateReport",
        content: "Generate Report",
        selector: "node, edge",
        onClickFunction: function () {},
        hasTrailingDivider: true
      }
    ],
    menuItemClasses: ["custom-menu-item", "custom-menu-item:hover"],
  };

  const cyRef = useRef(null);
  var currentPositions = null;

  useEffect(() => {

    const cy = cytoscape({
      container: document.getElementById("cy"),
      style: [
        //CORE
        {
          selector: "core",
          css: {
            "active-bg-size": 0 //The size of the active background indicator.
          }
        },
        
        //NODE
        {
          selector: "node",
          css: {
            width: "38px",
            height: "38px",
            "font-family": "Nokia Pure Regular",
            "background-opacity": "1"
          }
        },
        //GROUP
        {
          selector: "node.cy-expand-collapse-collapsed-node",
          css: {
            width: "56px",
            height: "56px",
            "background-opacity": "0",
            "font-family": "Nokia Pure Regular"
          }
        },
        {
          selector: "$node > node",
          css: {
            "background-color": "#fff",
            "background-opacity": "1",
            "border-width": "1px",
            "border-color": "#dcdcdc",
            
            //LABEL
            //label: "data(name)",
            color: "#000",
            shape: "rectangle",
            "text-opacity": "0.56",
            "font-size": "10px",
            "text-transform": "uppercase",
            "text-wrap": "none",
            "text-max-width": "75px",
            "padding-top": "16px",
            "padding-left": "16px",
            "padding-bottom": "16px",
            "padding-right": "16px"
          }
        },
        {
          selector: ":parent",
          css: {
            "text-valign": "top",
            "text-halign": "center"
          }
        },
        //EDGE
        {
          selector: "edge",
          style: {
            width: 1,
            "line-color": "#b8b8b8",
            //LABEL
            width: 3,
            "line-color": (edge) => {
              // atualizar a cor das arestas de acordo com treePath
              if (treePath !== undefined) {
                const idx = treePath.findIndex((item) => item.id === edge._private.source.id())
                return idx >= 0 && idx < treePath.length-1 && treePath[idx + 1].id === edge._private.target.id() ? "#c00" : "#ccc"
              }
              return "#ccc"
            },
            "target-arrow-color": (edge) => {
              if (treePath !== undefined) {
                const idx = treePath.findIndex((item) => item.id === edge._private.source.id())
                return idx >= 0 && idx < treePath.length-1 && treePath[idx + 1].id === edge._private.target.id() ? "#c00" : "#ccc"
              }
              return "#ccc"
            },
            "font-family": "Nokia Pure Regular",
            "target-arrow-shape": "triangle",
            label: "data(label)", // Display edge labels
            "text-rotation": "autorotate",
            "text-background-opacity": 1,
            "text-background-color": "#fff",
            "text-background-padding": "3px",
            "curve-style": "bezier",
          }
        },
        {
          selector: "edge.hover",
          style: {
            width: 2,
            "line-color": "#239df9"
          }
        },
        {
          selector: "edge:selected",
          style: {
            width: 1,
            "line-color": "#239df9"
          }
        }
      ],
      
      layout: {
        name: "dagre",
        padding: 24,
        spacingFactor: 1.5,
      },
      
      elements: data,
      
      zoomingEnabled: true,
      userZoomingEnabled: true,
      autoungrabify: false,
      wheelSensitivity: 0.2,
    });
    
    cyRef.current = cy;

    cytoscape.warnings(true)
    // cy.fit();
    //NODE EVENTS
    cy.on("mouseover", "node", function (e) {
      e.target.addClass("hover");
    });
    cy.on("mouseout", "node", function (e) {
      e.target.removeClass("hover");
    });

    cy.on("mouseup", "node", function (e) {
      e.target.addClass("hover");
      setChangedNodes((prevNodes) => {
        const updatedNodes = [...prevNodes, this];
        return updatedNodes;
      });
    });
    
    cy.on("mousedown", "node", function (e) {
      e.target.addClass("hover");
    });
    cy.on("click", "node", function (e) {
      console.log("clicked:" + this.id());
    });
    
    //EDGES EVENTS
    cy.on("mouseover", "edge", function (e) {
      e.target.addClass("hover");
    });
    cy.on("mouseout", "edge", function (e) {
      e.target.removeClass("hover");
    });
    
    const enableVisited = function(data) { return treePath !== undefined ? data.visited : "No" }
    
    cy.nodeHtmlLabel([
      {
        query: ".groupIcon",
        halign: "center",
        valign: "center",
        halignBox: "center",
        valignBox: "center",
        tpl: function (data) {
          return `<div class="group ${data.collapsedChildren ? "show" : "hide"}">
          <span class="group-graphic alarmSeverity-${data.alarmSeverity}">
          <i class="icon icon-group"></i>
          <span class="overlay"></span>
          </span>
          <span class="group-label">${data.displayName}</span>
          </div>`;
        }
      },
      {
        query: ".groupIcon.hover",
        halign: "center",
        valign: "center",
        halignBox: "center",
        valignBox: "center",
        tpl: function (data) {
          return `<div class="group ${data.collapsedChildren ? "show" : "hide"}">
          <span class="group-graphic hover alarmSeverity-${
            data.alarmSeverity
          }">
          <i class="icon icon-group"></i>
          <span class="overlay"></span>
          </span>
          <span class="group-label">${data.displayName}</span>
          </div>`;
        }
      },
      {
        query: ".groupIcon:selected",
        halign: "center",
        valign: "center",
        halignBox: "center",
        valignBox: "center",
        tpl: function (data) {
          return `<div class="group ${data.collapsedChildren ? "show" : "hide"}">
          <span class="group-graphic selected alarmSeverity-${
            data.alarmSeverity
          }">
          <i class="icon icon-group"></i>
          <span class="overlay"></span>
          </span>
          <span class="group-label">${data.displayName}</span>
          </div>`;
        }
      },
      {
        query: ".groupIcon.hover:selected",
        halign: "center",
        valign: "center",
        halignBox: "center",
        valignBox: "center",
        tpl: function (data) {
          return `<div class="group ${data.collapsedChildren ? "show" : "hide"}">
          <span class="group-graphic hover selected alarmSeverity-${
            data.alarmSeverity
          }">
          <i class="icon icon-group"></i>
          <span class="overlay"></span>
          </span>
          <span class="group-label">${data.displayName}</span>
          </div>`;
        }
      },
      {
        query: ".nodeIcon",
        halign: "center",
        valign: "center",
        halignBox: "center",
        valignBox: "center",
        tpl: function (data) {
          return `<div class="element ${data._hidden}">
          <span class="element-severity_badge">
          <i class="icon icon-${data.alarmSeverity}" /></i>
          </span>
          ${data.probability !== undefined ? `\
          <span class="element-probability"> \
          <i class="icon icon-probability" /></i> \
          <span> &nbsp;${data.probability}</span> \
          </span> \
          ` : ''}
          <span class="element-graphic-${data.type} visited-${enableVisited(data)}">
          <i class="icon icon-${data.kind}" /></i>
          <span class="overlay"></span>
          </span>
          <span title="${data.displayName}" class="element-label">${data.displayName}</span>
          </div>`;
        }
      },
      {
        query: ".nodeIcon.hover",
        halign: "center",
        valign: "center",
        halignBox: "center",
        valignBox: "center",
        tpl: function (data) {
          return `<div class="element ${data._hidden}">
          <span class="element-severity_badge">
          <i class="icon icon-${data.alarmSeverity}" /></i>
          </span>
          ${data.probability !== undefined ? `\
          <span class="element-probability"> \
          <i class="icon icon-probability" /></i> \
          <span> &nbsp;${data.probability}</span> \
          </span> \
          ` : ''}
          <span class="element-graphic-${data.type} hover visited-${enableVisited(data)}">
          <i class="icon icon-${data.kind} icon-hover" /></i>
          <span class="overlay"></span>
          </span>
          <span title="${data.displayName}" class="element-label">${data.displayName}</span>
          </div>`;
        }
      },
      {
        query: ".nodeIcon:selected",
        halign: "center",
        valign: "center",
        halignBox: "center",
        valignBox: "center",
        tpl: function (data) {
          return `<div class="element ${data._hidden}">
          <span class="element-severity_badge">
          <i class="icon icon-${data.alarmSeverity}" /></i>
          </span>
          ${data.probability !== undefined ? `\
          <span class="element-probability"> \
          <i class="icon icon-probability" /></i> \
          <span> &nbsp;${data.probability}</span> \
          </span> \
          ` : ''}
          <span class="element-graphic-${data.type} selected visited-${enableVisited(data)}">
          <i class="icon icon-${data.kind}" /></i>
          <span class="overlay"></span>  
          </span>
          <span title="${data.displayName}" class="element-label">${data.displayName}</span>
          </div>`;
        }
      },
      {
        query: ".nodeIcon.hover:selected",
        halign: "center",
        valign: "center",
        halignBox: "center",
        valignBox: "center",
        tpl: function (data) {
          return `<div class="element ${data._hidden}">
          <span class="element-severity_badge">
          <i class="icon icon-${data.alarmSeverity}" /></i>
          </span>
          ${data.probability !== undefined ? `\
          <span class="element-probability"> \
          <i class="icon icon-probability" /></i> \
          <span>&nbsp;${data.probability}</span> \
          </span> \
          ` : ''}
          <span class="element-graphic-${data.type} hover selected visited-${enableVisited(data)}">
          <i class="icon icon-${data.kind}" /></i>
          <span class="overlay"></span>
          </span>
          <span title="${data.displayName}" class="element-label">${data.displayName}</span>
          </div>`;
        }
      }
    ]);
    
    var defaults = {
      container: false, // html dom element
      viewLiveFramerate: 0, // set false to update graph pan only on drag end; set 0 to do it instantly; set a number (frames per second) to update not more than N times per second
      thumbnailEventFramerate: 30, // max thumbnail's updates per second triggered by graph updates
      thumbnailLiveFramerate: false, // max thumbnail's updates per second. Set false to disable
      dblClickDelay: 200, // milliseconds
      removeCustomContainer: false, // destroy the container specified by user on plugin destroy
      rerenderDelay: 100 // ms to throttle rerender updates to the panzoom for performance
    };

    // Store current node positions
    const newNodePositions = changedNodes.map((node) => ({
      id: node.id(),
      position: node.position(),
    }));

    // restore node positions
    newNodePositions.forEach(({ id, position }) => {
      const node = cy.getElementById(id);
      node.position(position);
    });


    // restore pan (graph position)
    if (pan != {}) {
      cy.pan(pan)
    }
    // store pan
    setPan((prev) => cy.pan());


    var nav = cy.navigator(defaults);
    
    cyRef.current.nodes().forEach((node) => {
      const nodeId = node.id();
      if (treePath !== undefined && treePath.find((item) => item.id === nodeId) !== undefined) {
        node._private.data.visited = "Yes"
      }
    });

  }, [treePath]);
  
}

export default AnimatedGraph;
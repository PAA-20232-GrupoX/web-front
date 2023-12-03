import React, { useEffect, useState, useRef } from 'react';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre'; // Import dagre layout

cytoscape.use(dagre); // Use dagre layout

const AnimatedGraph = () => {
  const [path, setPath] = useState([{ id: 's1_1', label: 'Start' }]);
  const [currentNode, setCurrentNode] = useState('');
  const cyRef = useRef(null);

  useEffect(() => {
    if (!cyRef.current) {
      const cy = cytoscape({
        container: document.getElementById('cy'),
        elements: [
            { data: { id: 's1_1', label: 'S1' } },
            { data: { id: 's2_1', label: 'S2' } },
            { data: { id: 's3_1', label: 'S3' } },
            { data: { id: 's3_2', label: 'S3' } },
            { data: { id: 's4_1', label: 'S4' } },
            { data: { id: 's2_2', label: 'S2' } },
            { data: { id: 's2_3', label: 'S2' } },
            { data: { id: 's4_2', label: 'S4' } },
            { data: { id: 's4_3', label: 'S4' } },
            { data: { id: 's4_4', label: 'S4' } },
            { data: { id: 'c1_1', label: 'C1' } },
            { data: { id: 'c4_1', label: 'C4' } },
            { data: { id: 'c3_1', label: 'C3' } },
            { data: { id: 'c1_2', label: 'C1' } },
            { data: { id: 'c2_1', label: 'C2' } },
            { data: { id: 'c5_1', label: 'C5' } },
            { data: { id: 'c2_2', label: 'C2' } },
            { data: { id: 'c5_2', label: 'C5' } },
            { data: { id: 'c1_3', label: 'C1' } },
            { data: { id: 's1_1s2_1', source: 's1_1', target: 's2_1', label: 'Sim' } },
            { data: { id: 's1_1s3_1', source: 's1_1', target: 's3_1', label: 'Não' } },
            { data: { id: 's1_1s4_1', source: 's1_1', target: 's4_1', label: 'Sim/Não' } },
            { data: { id: 's2_1c1_1', source: 's2_1', target: 'c1_1', label: 'Sim' } },
            { data: { id: 's2_1s3_2', source: 's2_1', target: 's3_2', label: 'Não' } },
            { data: { id: 's3_2c4_1', source: 's3_2', target: 'c4_1', label: 'Sim' } },
            { data: { id: 's3_2s4_2', source: 's3_2', target: 's4_2', label: 'Não' } },
            { data: { id: 's4_2c3_1', source: 's4_2', target: 'c3_1', label: 'Sim' } },
            { data: { id: 's4_2c1_2', source: 's4_2', target: 'c1_2', label: 'Não' } },
            { data: { id: 's3_1s2_2', source: 's3_1', target: 's2_2', label: 'Sim' } },
            { data: { id: 's3_1s2_3', source: 's3_1', target: 's2_3', label: 'Não' } },
            { data: { id: 's2_2c2_1', source: 's2_2', target: 'c2_1', label: 'Sim' } },
            { data: { id: 's2_2s4_3', source: 's2_2', target: 's4_3', label: 'Não' } },
            { data: { id: 's4_3c5_1', source: 's4_3', target: 'c5_1', label: 'Sim' } },
            { data: { id: 's4_3c2_2', source: 's4_3', target: 'c2_2', label: 'Não' } },
            { data: { id: 's2_3s4_4', source: 's2_3', target: 's4_4', label: 'Sim' } },
            { data: { id: 's2_3s4_1', source: 's2_3', target: 's4_1', label: 'Não' } },
            { data: { id: 's4_4c5_2', source: 's4_4', target: 'c5_2', label: 'Sim' } },
            { data: { id: 's4_4c1_3', source: 's4_4', target: 'c1_3', label: 'Não' } }
        ],
        style: [
          {
            selector: 'node',
            style: {
              'background-color': node =>
                path.find(item => item.id === node.id())
                  ? 'red'
                  : '#666',
              label: 'data(label)',
              'text-valign': 'center',
              'text-halign': 'center',
              'text-wrap': 'wrap',
              'text-max-width': '80px' // Adjust based on node size
            }
          },
          {
            selector: 'edge',
            style: {
              width: 3,
              'line-color': '#ccc',
              'target-arrow-color': '#ccc',
              'target-arrow-shape': 'triangle',
              label: 'data(label)', // Display edge labels
              'text-rotation': 'autorotate',
              'text-background-opacity': 1,
              'text-background-color': '#fff',
              'text-background-padding': '3px',
              'curve-style': 'bezier'
            }
          }
        ],
        layout: {
            name: 'dagre', // Use 'dagre' layout for vertical tree orientation
            rankDir: 'TB', // Set direction to top to bottom
            nodeDimensionsIncludeLabels: true,
            avoidOverlap: true,
            spacingFactor: 1.2 // Adjust the spacing factor as needed
          }
      });

      cyRef.current = cy;
    }

    cyRef.current.nodes().forEach(node => {
      const nodeId = node.id();
      node.style('background-color', path.find(item => item.id === nodeId) ? 'red' : '#666');
    });
  }, [path]);

  const handleInputChange = event => {
    setCurrentNode(event.target.value);
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      if (cyRef.current.getElementById(currentNode).isNode()) {
        const nodeLabel = cyRef.current.getElementById(currentNode).data('label');
        setPath([...path, { id: currentNode, label: nodeLabel }]);
        setCurrentNode('');
      } else {
        alert('Node does not exist!');
      }
    }
  };

  return (
    <div>
      <div id="cy" style={{ width: '100%', height: '70vh' }}></div>
      <div>
        <label htmlFor="nextNodeInput">Próximo nó:</label>
        <input
          type="text"
          id="nextNodeInput"
          value={currentNode}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default AnimatedGraph;
"use client"
import Header from "@/components/header";
import AnimatedGraph from "@/components/graph";
import graphFile from "@/app/admin/graphFile"

function dataToGraph(dictData) {
  var graph = []
  
  // nodes
  for (var key in dictData) {
    key = key.replaceAll(' ', '_')
    var display = key.replaceAll('c_', '').replaceAll('s_', '')

    var node = {}
    node.group = "nodes"
    node.data = {
      id: key.length != 0 ? key : 'start',
      displayName: key.length != 0 ? display : 'start',
      type: (key[0] === 's' || key.length == 0) ? "Symptom" : "Cause",
      kind: "NetworkService",
      visited: "No",
      alarmSeverity: "cleared"
    }
    node.classes = "nodeIcon"
    graph.push(node)
  }

  // edges
  graph.forEach((node) => {
    var key = node.data.id === 'start' ? '' : node.data.id.replaceAll('_', ' ')
    for (var value of dictData[key]) {
      
      if (value[0] !== '!') {
        value[0] = value[0].replaceAll(' ', '_')

        var edge = {}
        edge.data = {
          group: "edges",
          label: value[1].toFixed(2).toString(),
          source: node.data.id,
          target: value[0]
        }
        graph.push(edge)
      }
    }
  });

  return graph
}


export default function Admin() {

  // grafo recebido do back
  var data = {
  's a': [['c x', 0.6], ['s a;s b', 0.7], ['s a;s c', 0.5]],
  's b': [['c x', 0.9], ['s a;s b', 0.7]],
  's a;s c': [['c y', 0.5]],
  's a;s b': [['c y', 0.7]],
  's c': [['s a;s c', 0.5]],
  '': [['s b', 1.6], ['s c', 0.5], ['s a', 1.8]],
  'c x': [['!', 0.0]],
  'c y': [['!', 0.0]]
  }

  data = graphFile;

  const graph = dataToGraph(data)
  
  console.log("graph length:", graph.length)

  return (
    <main className="w-full h-full bg-bglight">
      <Header title="PAA 4" />
      <div id="cy" className="flex justify-center items-center w-2/4">
          <AnimatedGraph data={graph}/>
        </div>
    </main>
  );
}

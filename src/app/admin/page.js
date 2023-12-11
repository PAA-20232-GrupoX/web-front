"use client"
import Header from "@/components/header";
import AnimatedGraph from "@/components/graph";
import biggerGraph from "@/app/admin/graphFile"
import { useEffect, useState } from "react";
import UploadFile from "@/components/UploadFile";

function dataToGraph(dictData) {
  var graph = []

  var symptoms = {}
  for (var value of dictData['']) {
    symptoms[value[0]] = true
  }

  // nodes
  for (var key in dictData) {
    var id = key.replaceAll(' ', '_')
    var type = ""
    if (key.length == 0) {
      type = "Root"
    } else {
      type = symptoms[key] ? "Symptom" : "Cause"
      type = key.match(".*;.*") !== null ? "Association" : type
    }
   
    var node = {}
    node.group = "nodes"
    node.data = {
      id: key.length != 0 ? id : 'start',
      displayName: key.length != 0 ? key : 'start',
      type: type,
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
        var target = value[0].replaceAll(' ', '_')

        var edge = {}
        edge.data = {
          group: "edges",
          label: value[1].toFixed(2).toString(),
          source: node.data.id,
          target: target
        }
        graph.push(edge)
      }
    }
  });

  return graph
}


export default function Admin() {
  const [graph, setGraph] = useState({});

  useEffect (() => {
    // grafo recebido do back
    var data = {
    'a': [['x', 0.6], ['a;b', 0.7], ['a;c', 0.5]],
    'b': [['x', 0.9], ['a;b', 0.7]],
    'a;c': [['y', 0.5]],
    'a;b': [['y', 0.7]],
    'c': [['a;c', 0.5]],
    '': [['b', 1.6], ['c', 0.5], ['a', 1.8]],
    'x': [['!', 0.0]],
    'y': [['!', 0.0]]
    }

    // comente para ver o grafo mais simples, senão sobrescreve com o grafo do arquivo graphFile.js
    data = biggerGraph;

    setGraph(dataToGraph(data))
  },  []);

  return (
    <main className="w-full h-full bg-bglight">
      <Header title="PAA 4" />
      <div className="flex h-5/6">
        <UploadFile></UploadFile>
        <div id="cy" className="flex justify-center items-center w-2/4">
            <AnimatedGraph data={graph} setData={setGraph} allowDelete={true}/>
        </div>
      </div>
    </main>
  );
}

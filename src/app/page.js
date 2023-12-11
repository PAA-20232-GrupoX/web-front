"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import Quiz from "@/components/quiz";
import AnimatedGraph from "@/components/graph";
import data from '@/components/graph/data'

export default function Home() {
  const [treePath, setTreePath] = useState([{ id: "s1.1", label: "Start" }]);
  const [tree, setTree] = useState([]);
  const [currentNode, setCurrentNode] = useState("s1.1");
  const [finished, setFinished] = useState(false);
  const [solution, setSolution] = useState("");

  const answer = (answer) => {
    tree.forEach((node) => {
      if (node.data.source === currentNode && node.data.label.toLowerCase() === answer.toLowerCase()) {
        setTreePath([...treePath, { id: node.data.target, label: answer }]);
        if (node.data.target[0] === "c") {
          // chegou em um nó final
          setFinished(true);
          setSolution(node.data.target);
          return;
        }
        setCurrentNode(node.data.target);
      }
    });
  };

  useEffect(() => {
    // puxar árvore da api
    setTree([
      { data: { group: "edges", label:"sim", source: "s1.1", target: "s2.1" } },
      { data: { group: "edges", label:"não", source: "s1.1", target: "s3.1" } },
      { data: { group: "edges", label:"não sei", source: "s1.1", target: "s4.1" } },
      { data: { group: "edges", label:"sim", source: "s2.1", target: "c1.1" } },
      { data: { group: "edges", label:"não", source: "s2.1", target: "s3.2" } },
      { data: { group: "edges", label:"sim", source: "s3.2", target: "c4.1" } },
      { data: { group: "edges", label:"não", source: "s3.2", target: "s4.2" } },
      { data: { group: "edges", label:"sim", source: "s4.2", target: "c3.1" } },
      { data: { group: "edges", label:"não", source: "s4.2", target: "c1.2" } },
      { data: { group: "edges", label:"sim", source: "s3.1", target: "s2.2" } },
      { data: { group: "edges", label:"não", source: "s3.1", target: "s2.3" } },
      { data: { group: "edges", label:"sim", source: "s2.2", target: "c2.1" } },
      { data: { group: "edges", label:"não", source: "s2.2", target: "s4.3" } },
      { data: { group: "edges", label:"sim", source: "s4.3", target: "c5.1" } },
      { data: { group: "edges", label:"não", source: "s4.3", target: "c2.2" } },
      { data: { group: "edges", label:"sim", source: "s2.3", target: "s4.4" } },
      { data: { group: "edges", label:"não", source: "s2.3", target: "s4.1" } },
      { data: { group: "edges", label:"sim", source: "s4.4", target: "c5.2" } },
      { data: { group: "edges", label:"não", source: "s4.4", target: "c1.3" } },
    ])
  }, []);

  return (
    <main className="w-full h-full bg-bglight">
      <Header title="PAA 4" />

      <div className="flex h-5/6">
        {!finished ? (
          <div className="flex justify-center items-center w-2/4">
            <Quiz currentNode={currentNode} answer={answer} />
          </div>
        ) : (
          <div className="flex justify-center items-center w-2/4">
            <h1 className="text-4xl text-primary">A sua solução é {solution}</h1>
          </div>
        )}
        <div id="cy" className="flex justify-center items-center w-2/4">
          <AnimatedGraph data={data} treePath={treePath} setTreePath={setTreePath} allowDelete={false} />
        </div>
      </div>
    </main>
  );
}

"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import Quiz from "@/components/quiz";
import AnimatedGraph from "@/components/graph";

export default function Home() {
  const [treePath, setTreePath] = useState([{ id: "s1_1", label: "Start" }]);
  const [tree, setTree] = useState([]);
  const [currentNode, setCurrentNode] = useState("s1_1");
  const [finished, setFinished] = useState(false);
  const [solution, setSolution] = useState("");

  const answer = (answer) => {
    tree.forEach((node) => {
      if (node.data.source === currentNode && node.data.label === answer) {
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
      {
        data: {
          id: "s1_1s2_1",
          source: "s1_1",
          target: "s2_1",
          label: "Sim",
        },
      },
      {
        data: {
          id: "s1_1s3_1",
          source: "s1_1",
          target: "s3_1",
          label: "Não",
        },
      },
      {
        data: {
          id: "s1_1s4_1",
          source: "s1_1",
          target: "s4_1",
          label: "Sim/Não",
        },
      },
      {
        data: {
          id: "s2_1c1_1",
          source: "s2_1",
          target: "c1_1",
          label: "Sim",
        },
      },
      {
        data: {
          id: "s2_1s3_2",
          source: "s2_1",
          target: "s3_2",
          label: "Não",
        },
      },
      {
        data: {
          id: "s3_2c4_1",
          source: "s3_2",
          target: "c4_1",
          label: "Sim",
        },
      },
      {
        data: {
          id: "s3_2s4_2",
          source: "s3_2",
          target: "s4_2",
          label: "Não",
        },
      },
      {
        data: {
          id: "s4_2c3_1",
          source: "s4_2",
          target: "c3_1",
          label: "Sim",
        },
      },
      {
        data: {
          id: "s4_2c1_2",
          source: "s4_2",
          target: "c1_2",
          label: "Não",
        },
      },
      {
        data: {
          id: "s3_1s2_2",
          source: "s3_1",
          target: "s2_2",
          label: "Sim",
        },
      },
      {
        data: {
          id: "s3_1s2_3",
          source: "s3_1",
          target: "s2_3",
          label: "Não",
        },
      },
      {
        data: {
          id: "s2_2c2_1",
          source: "s2_2",
          target: "c2_1",
          label: "Sim",
        },
      },
      {
        data: {
          id: "s2_2s4_3",
          source: "s2_2",
          target: "s4_3",
          label: "Não",
        },
      },
      {
        data: {
          id: "s4_3c5_1",
          source: "s4_3",
          target: "c5_1",
          label: "Sim",
        },
      },
      {
        data: {
          id: "s4_3c2_2",
          source: "s4_3",
          target: "c2_2",
          label: "Não",
        },
      },
      {
        data: {
          id: "s2_3s4_4",
          source: "s2_3",
          target: "s4_4",
          label: "Sim",
        },
      },
      {
        data: {
          id: "s2_3s4_1",
          source: "s2_3",
          target: "s4_1",
          label: "Não",
        },
      },
      {
        data: {
          id: "s4_4c5_2",
          source: "s4_4",
          target: "c5_2",
          label: "Sim",
        },
      },
      {
        data: {
          id: "s4_4c1_3",
          source: "s4_4",
          target: "c1_3",
          label: "Não",
        },
      },
    ]);
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
        <div className="flex justify-center items-center w-2/4">
          <AnimatedGraph treePath={treePath} setTreePath={setTreePath} />
        </div>
      </div>
    </main>
  );
}

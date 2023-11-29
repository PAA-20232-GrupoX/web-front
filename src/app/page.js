"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import Quiz from "@/components/quiz";

export default function Home() {
  const [question, setQuestion] = useState(1);

  const answer = (answer) => {
    // alterar a pergunta
    setQuestion(question + 1);
    console.log(answer);
  };

  useEffect(() => {
    // puxar árvore da api
  })

  return (
    <main className="w-full h-full bg-bglight">
      <Header title="PAA 4" />

      <div className="flex justify-center items-center h-5/6">
        <Quiz questionNumber={question} answer={answer} />
      </div>
    </main>
  );
}

"use client"
import Header from "@/components/header";
import AnimatedGraph from "@/components/graph";

function printNothing() {
  console.log("Nothing")
}


export default function Admin() {

  const data = {
    'a': [['x', 0.6], ['a;b', 0.7], ['a;c', 0.5]],
    'b': [['x', 0.9], ['a;b', 0.7]],
    'a;c': [['y', 0.5]],
    'a;b': [['y', 0.7]],
    'c': [['a;c', 0.5]],
    '': [['b', 1.6], ['c', 0.5], ['a', 1.8]],
    'x': [['!', 0.0]],
    'y': [['!', 0.0]]
  }

  return (
    <main className="w-full h-full bg-bglight">
      <Header title="PAA 4" />
      <div id="cy" className="flex justify-center items-center w-2/4">
          <AnimatedGraph />
        </div>
    </main>
  );
}

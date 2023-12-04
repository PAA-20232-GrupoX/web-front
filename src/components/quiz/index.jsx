const Quiz = ({ currentNode, answer }) => {
  return (
    <div className="flex flex-col items-center gap-4 w-2/5">
      {/* label */}
      <p className="text-primary text-2xl">{currentNode}?</p>

      {/* options */}
      <div className="flex gap-8">
        <button
          className="px-4 py-2 rounded-md text-xl bg-primary text-bgdark hover:text-primary hover:bg-bgdark"
          onClick={() => answer("Sim")}
        >
          Sim
        </button>
        <button
          className="px-4 py-2 rounded-md text-xl bg-primary text-bgdark hover:text-primary hover:bg-bgdark"
          onClick={() => answer("Não")}
        >
          Não
        </button>
      </div>
    </div>
  );
};

export default Quiz;

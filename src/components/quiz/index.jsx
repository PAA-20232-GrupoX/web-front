const Quiz = ({ questionNumber, answer }) => {
  return (
    <div className="flex flex-col items-center gap-4 w-2/5">
      {/* label */}
      <p className="text-primary text-2xl">Pergunta número {questionNumber}?</p>

      {/* options */}
      <div className="flex gap-8">
        <button
          className="px-4 py-2 rounded-md text-xl bg-primary text-bgdark hover:text-primary hover:bg-bgdark"
          onClick={() => answer("sim")}
        >
          Sim
        </button>
        <button
          className="px-4 py-2 rounded-md text-xl bg-primary text-bgdark hover:text-primary hover:bg-bgdark"
          onClick={() => answer("não sei")}
        >
          Não sei
        </button>
        <button
          className="px-4 py-2 rounded-md text-xl bg-primary text-bgdark hover:text-primary hover:bg-bgdark"
          onClick={() => answer("não")}
        >
          Não
        </button>
      </div>
    </div>
  );
};

export default Quiz;

const Header = ({ title }) => {
  const handleSeeTree = () => {
    // não sei ainda como vamos fazer a árvore, fica só o esqueleto por enquanto
  };

  return (
    <div className="flex justify-between items-center p-5 bg-bgdark">
      <h1 className="text-4xl text-primary">{title}</h1>
      <button
        className="text-xl text-primary hover:text-bglight hover:cursor-pointer"
        onClick={() => handleSeeTree()}
      >
        Ver árvore
      </button>
    </div>
  );
};

export default Header;

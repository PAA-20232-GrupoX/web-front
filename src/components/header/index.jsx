const Header = ({ title }) => {
  const handleSeeTree = () => {
    // não sei ainda como vamos fazer a árvore, fica só o esqueleto por enquanto
  };

  return (
    <div className="flex fixed top-0 w-full z-10 justify-between items-center p-5 bg-bgdark">
      <h1 className="text-4xl text-primary">{title}</h1>
    </div>
  );
};

export default Header;

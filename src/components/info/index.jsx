const InfoBox = ({ node, setNode }) => {

	const infoBoxStyle = {
	  position: 'fixed',
	  top: '100px',
	  right: '20px',
	  padding: '10px',
	  border: '1px solid #ccc',
	  borderRadius: '4px',
	  backgroundColor: '#f9f9f9',
	  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    maxWidth: '350px',
    zIndex: '999'
	};

  if (node !== null) {
    var type = ""
    switch (node._private.data.type) {
      case "Symptom":
        type = "Sintoma"
        break;
      case "Cause":
        type = "Causa"
        break;
      case "Association":
        type = "Associação"
        break;
      case "Root":
        type = "Raíz"
        break;
      default:
        break;
    }
    return (
      <div style={infoBoxStyle}>
        <p><strong>Tipo: </strong> {type} </p>
        <p><strong>Nome: </strong> {node._private.data.displayName} </p>
      </div>
    );
  } else {
    return <div/>
  }
}
  
export default InfoBox;
  
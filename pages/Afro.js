import AfroForm from '../components/forms/AfroForm';

function ShowAfroForm() {
  return (
    <div style={{
      marginTop: '20px',
      marginBottom: '30px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
    >
      <h1 style={{ color: 'white' }}> Mamiza Hair Afro </h1>
      <AfroForm />
    </div>

  );
}

export default ShowAfroForm;

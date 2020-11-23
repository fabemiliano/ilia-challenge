import React, { useState } from 'react';

function Teste() {
  const [a, seta] = useState('');
  console.log(a, seta);
  return (
    <div>
      <p>Teste</p>
    </div>
  );
}

export default Teste;

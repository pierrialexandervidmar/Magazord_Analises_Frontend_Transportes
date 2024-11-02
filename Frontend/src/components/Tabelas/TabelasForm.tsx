import React from 'react';

interface TabelasFormProps {
  fields: any[]; // Tipo apropriado para a array fields
  register: any; // Tipo apropriado para o register, dependendo do que é retornado por useForm
  errors: any; // Tipo apropriado para os erros, dependendo do que é retornado por useForm
  addNewItemTable: () => void; // Função para adicionar nova tecnologia
  removerSigla: () => void; // Função para remover sigla
}

const TabelasForm: React.FC<TabelasFormProps> = ({ fields, register, errors, addNewItemTable, removerSigla }) => {
  return (
    <label htmlFor="" className="flex items-center justify-end">
      <button
        type='button'
        onClick={addNewItemTable}
        className="text-white text-sm mx-2 bg-emerald-500 rounded hover:bg-emerald-600 p-2 mb-5"
        title="Clique aqui para adicinoar a sigla - SIGLA + PRAZO + PREÇO + TRANSFERÊNCIA"
      >
        Adicionar Sigla
      </button>

      <button
        type='button'
        onClick={removerSigla}
        className="text-white text-sm mx-2 bg-red-500 rounded hover:bg-red-600 p-2 mb-5"
        title="Clique aqui para remover a sigla - SIGLA + PRAZO + PREÇO + TRANSFERÊNCIA"
      >
        Remover Sigla
      </button>
    </label>
  );
}

export default TabelasForm;

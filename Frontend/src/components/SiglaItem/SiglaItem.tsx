import React from 'react';

interface SiglaItemProps {
  field: {
    id: string; // Tipo apropriado para o id do field
    // Outros campos do field aqui, se necessário
  };
  index: number; // Tipo apropriado para o índice
  register: any; // Tipo apropriado para o register, dependendo do que é retornado por useForm
  errors: any; // Tipo apropriado para os erros, dependendo do que é retornado por useForm
}

const SiglaItem: React.FC<SiglaItemProps> = ({ field, index, register, errors }) => {
  return (
    <div className='flex gap-2' key={field.id}>
      {/* Campos para cada sigla */}
      <div className='flex flex-2 flex-col gap-1'>
        <input
          type="text"
          className='w-16 first-letter:border text- border-zinc-600 shadow-sm rounded h-8 px-1 bg-zinc-800 text-white'
          {...register(`tabs.${index}.sigla`)}
          title="Adicione a SIGLA"
        />
        {errors.tabs?.[index]?.sigla && <span className='text-red-500 text-sm'>{errors.tabs?.[index]?.sigla.message}</span>}
      </div>

      <div className='flex flex-col gap-1'>
        <input
          type="text"
          className='input-number-tab w-14 appearance-none border border-zinc-600 shadow-sm rounded h-8 px-1 bg-zinc-800 text-white'
          {...register(`tabs.${index}.idPrazo`)}
          title="Adicione ID de PRAZO"
        />
        {/* {errors.tabs?.[index]?.idPrazo && <span className='text-red-500 text-sm'>{errors.tabs?.[index]?.idPrazo.message}</span>} */}
      </div>

      <div className='flex flex-col gap-1'>
        <input
          type="text"
          className='input-number-tab w-14 appearance-none border border-zinc-600 shadow-sm rounded h-8 px-1 bg-zinc-800 text-white'
          {...register(`tabs.${index}.idPreco`)}
          title="Adicione ID de PREÇO"
        />
        {/* {errors.tabs?.[index]?.idPreco && <span className='text-red-500 text-sm'>{errors.tabs?.[index]?.idPreco.message}</span>} */}
      </div>

      <div className='flex flex-col gap-1'>
        <input
          type="text"
          className='input-number-tab w-14 appearance-none border border-zinc-600 shadow-sm rounded h-8 px-1 bg-zinc-800 text-white'
          {...register(`tabs.${index}.idTransf`)}
          title="Adicione ID de TRANSFERÊNCIA"
        />
        {/* {errors.tabs?.[index]?.idPreco && <span className='text-red-500 text-sm'>{errors.tabs?.[index]?.idPreco.message}</span>} */}
      </div>
    </div>
  );
}

export default SiglaItem;

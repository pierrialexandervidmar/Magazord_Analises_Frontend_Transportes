import React from 'react';

interface IdentificadoresFormProps {
  register: any; // Tipo apropriado para o register, dependendo do que é retornado por useForm
  errors: any; // Tipo apropriado para os erros, dependendo do que é retornado por useForm
}

const IdentificadoresForm: React.FC<IdentificadoresFormProps> = ({ register, errors }) => {
  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor="name">Identificador</label>
      <input
        className='border border-zinc-600 shadow-sm rounded h-10 px-3 p-1 bg-zinc-800 text-white'
        {...register('identificador')}
      />
      {errors.identificador && <span className='text-red-500 text-sm'>{errors.identificador.message}</span>}
    </div>
  );
}

export default IdentificadoresForm;

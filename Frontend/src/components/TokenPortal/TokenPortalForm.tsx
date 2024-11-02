import React from 'react';

interface TokenPortalFormProps {
  register: any; // Tipo apropriado para o register, dependendo do que é retornado por useForm
  errors: any; // Tipo apropriado para os erros, dependendo do que é retornado por useForm
}

const TokenPortalForm: React.FC<TokenPortalFormProps> = ({ register, errors }) => {
  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor="name">Token do Clientão</label>
      <input
        className='border border-zinc-600 shadow-sm rounded h-10 px-3 p-1 bg-zinc-800 text-white'
        {...register('tokenPortal')}
      />
      {errors.tokenPortal && <span className='text-red-500 text-sm'>{errors.tokenPortal.message}</span>}
    </div>
  );
}

export default TokenPortalForm;

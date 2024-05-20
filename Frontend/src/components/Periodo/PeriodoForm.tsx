import React from 'react';

interface PeriodoFormProps {
  register: any; // Tipo apropriado para o register, dependendo do que é retornado por useForm
  errors: any; // Tipo apropriado para os erros, dependendo do que é retornado por useForm
}

const PeriodoForm: React.FC<PeriodoFormProps> = ({ register, errors }) => {
  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor="" className="flex items-center justify-start">
        Período (até 30 dias)
      </label>
      {/* Formulário para o período */}
      <div className='flex items-center justify-start gap-1'>
        <div className='flex gap-1'>
          <input
            type="date"
            className='border border-zinc-600 shadow-sm rounded h-8 px-1 bg-zinc-800 text-white'
            {...register('dataInicio')}
          />
          {errors.dataInicio && <span className='text-red-500 text-sm'>{errors.dataInicio.message}</span>}
        </div>
        <span>até</span>
        <div className='flex gap-1'>
          <input
            type="date"
            className='border border-zinc-600 shadow-sm rounded h-8 px-1 bg-zinc-800 text-white'
            {...register('dataFim')}
          />
          {errors.dataFim && <span className='text-red-500 text-sm'>{errors.dataFim.message}</span>}
        </div>
      </div>
    </div>
  );
}

export default PeriodoForm;

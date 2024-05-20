import { useState } from 'react';
import './styles/global.css';

import { useForm, useFieldArray } from 'react-hook-form';
import { date, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import IdentificadoresForm from './components/identificadores/IdentificadoresForm';
import PeriodoForm from './components/Periodo/PeriodoForm';
import TabelasForm from './components/Tabelas/TabelasForm';
import SiglaItem from './components/SiglaItem/SiglaItem';


// ESQUEMA DO FORMULARIO COM SUAS VALIDAÇÕES DE ENTRADA EMBUTIDAS
const createUserFormSchema = z.object({
  identificador: z.string()
    .nonempty('O identificador é obrigatório')
    .transform(identificador => {
      // Remover espaços extras e transformar em maiúsculas
      return identificador.trim().toLowerCase().replace(/\s+/g, '');
    }),
  dataInicio: z.coerce.date().min(new Date(0), 'Data não pode ser vazia'),
  dataFim: z.coerce.date().min(new Date(0), 'Data não pode ser vazia'), // Adicionando o campo dataFim
  tabs: z.array(z.object({
    sigla: z.string()
      .nonempty('A sigla é obrigatória')
      .toUpperCase()
      .trim()
      .transform(sigla => {
        return sigla.replace(/\s+/g, '');
      }),
    idPrazo: z.coerce.number(),
    idPreco: z.coerce.number(),
    idTransf: z.coerce.number(),
  })).min(1, 'Insira pelo menos uma sigla e/ou tabela')
})

type CreateUserFormData = z.infer<typeof createUserFormSchema>

// ESTRUTURA GERAL DO COMPONENTE APP ===================================================================
export function App() {
  const [output, setOutput] = useState('')


  // UTILIZAÇÃO DO USE-FORM COM SEU TIPO E SCHEMA E VALIDAÇÕES
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema)
  })

  // UTILIZAÇÃO DO FIELDARRAY
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tabs',
  })

  // FUNÇÃO PARA ADICIONAR NOVA SIGLA NA TABELA
  function addNewTech() {
    append({
      sigla: '',
      idPrazo: 0,
      idPreco: 0,
      idTransf: 0
    })
  }

  // REMOVER UMA SIGLA DA TABELA
  function removerSigla() {
    remove({
      sigla: '',
      idPrazo: 0,
      idPreco: 0,
      idTransf: 0
    })
  }

  // ENVIAR DADOS PARA A API
  function createUser(data: any) {

    const adjustedDate = {
      ...data,
      dataInicio: data.dataInicio.toISOString().substring(0, 10),
      dataFim: data.dataFim.toISOString().substring(0, 10)
    };

    console.log(adjustedDate); // Verificar se as datas estão ajustadas corretamente

    setOutput(JSON.stringify(adjustedDate, null, 2));
  }


  // ESTRUTURA RETORNADA AO FRONTEND =========================================================================
  return (
    <main className="h-screen text-zinc-300 flex flex-col gap-10 items-center justify-start m-5">
      <h1 className="text-emerald-500 text-2xl font-semibold mt-5">Análise de cotações</h1>
      <form
        onSubmit={handleSubmit(createUser)}
        className='flex flex-col gap-2 w-full max-w-screen-2xl'
      >

        {/* FORMULARIO - IDENTIFICADORES */}
        <IdentificadoresForm register={register} errors={errors} />


        {/* FORMULARIO - PERÍODO */}
        <PeriodoForm register={register} errors={errors} />


        {/* FORMULÁRIO - TABELAS PARA COTAÇÃO */}
        <div className='flex flex-col gap-1'>
          <TabelasForm
            fields={fields}
            register={register}
            errors={errors}
            addNewTech={addNewTech}
            removerSigla={removerSigla}
          />

          {/* RETORNA LISTA DE TABELAS PARA PREENCHER */}
          <div className='flex flex-wrap gap-5'>

            {/* Implementando o SiglaItem */}
            {fields.map((field, index) => (
              <SiglaItem
                key={field.id}
                field={field}
                index={index}
                register={register}
                errors={errors}
              />
            ))}

          </div>

          {errors.tabs && <span className='text-red-500 text-sm'>{errors.tabs.message}</span>}
        </div>

        {/* REALIZAR COTAÇÃO BUTTON */}
        <div className="flex items-center justify-end">
          <button
            type='submit'
            className='bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600 mb-10 w-[300px] mt-5'
          >
            Realizar Cotação
          </button>
        </div>

      </form>

      <pre>
        {output}
      </pre>

    </main>
  )
}
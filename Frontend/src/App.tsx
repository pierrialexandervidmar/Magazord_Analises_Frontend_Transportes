import { zodResolver } from '@hookform/resolvers/zod' // Importa o resolver Zod para validação de formulários
import axios from 'axios'; // Importa a biblioteca Axios para fazer requisições HTTP
import { useState } from 'react'; // Importa o hook useState para gerenciar estado
import { useFieldArray, useForm } from 'react-hook-form'; // Importa hooks para gerenciar formulários
import { date, z } from 'zod'; // Importa funções de validação do Zod

// Importa componentes personalizados
import IdentificadoresForm from './components/identificadores/IdentificadoresForm';
import PeriodoForm from './components/Periodo/PeriodoForm';
import SiglaItem from './components/SiglaItem/SiglaItem';
import TabelasForm from './components/Tabelas/TabelasForm';
import { GerarGraficos } from './helpers/GerarGraficos'; // Função para gerar gráficos
import { construirURL } from './helpers/Urls'; // Função para construir URLs

import './styles/global.css'; // Importa estilos globais
import TokenPortalForm from './components/TokenPortal/TokenPortalForm';

// ESQUEMA DO FORMULÁRIO COM SUAS VALIDAÇÕES DE ENTRADA EMBUTIDAS
const createUserFormSchema = z.object({
  identificador: z.string()
    .nonempty('O identificador é obrigatório') // Verifica se o campo não está vazio
    .transform(identificador => {
      // Remove espaços extras e transforma em minúsculas
      return identificador.trim().toLowerCase().replace(/\s+/g, '');
    }),
  tokenPortal: z.string()
    .optional() // Permite que o campo seja opcional
    .transform(tokenPortal => {
      // Remove o campo se for uma string vazia ou undefined
      return tokenPortal && tokenPortal.trim() !== '' ? tokenPortal.toUpperCase().trim() : undefined;
    }),
  dataInicio: z.coerce.date().min(new Date(0), 'Data não pode ser vazia'), // Valida a data de início
  dataFim: z.coerce.date().min(new Date(0), 'Data não pode ser vazia'), // Valida a data de fim
  tabs: z.array(z.object({
    sigla: z.string()
      .nonempty('A sigla é obrigatória') // Valida se a sigla não está vazia
      .toUpperCase()
      .trim()
      .transform(sigla => {
        // Remove espaços extras da sigla
        return sigla.replace(/\s+/g, '');
      }),
    idPrazo: z.coerce.number().optional(), // Valida se idPrazo é um número
    idPreco: z.coerce.number().optional(), // Valida se idPreco é um número
    idTransf: z.coerce.number().optional(), // Valida se idTransf é um número
  })).min(1, 'Insira pelo menos uma sigla e/ou tabela') // Valida que pelo menos uma sigla deve ser fornecida
})

// Inferindo o tipo de dados a partir do esquema definido
type CreateUserFormData = z.infer<typeof createUserFormSchema>

// ESTRUTURA GERAL DO COMPONENTE APP ===================================================================
export function App() {
  const [output, setOutput] = useState('') // Estado para armazenar a saída da API

  // UTILIZAÇÃO DO USE-FORM COM SEU TIPO E SCHEMA E VALIDAÇÕES
  const {
    register, // Função para registrar inputs no formulário
    handleSubmit, // Função para lidar com a submissão do formulário
    formState: { errors }, // Erros de validação do formulário
    control // Controle para o useFieldArray
  } = useForm<CreateUserFormData>({ // Configuração do formulário
    resolver: zodResolver(createUserFormSchema) // Configuração do resolver para validação
  })

  // UTILIZAÇÃO DO FIELDARRAY
  const { fields, append, remove } = useFieldArray({ // Hook para gerenciar um array de campos
    control,
    name: 'tabs', // Nome do campo array no estado do formulário
  })

  // FUNÇÃO PARA ADICIONAR NOVA SIGLA NA TABELA
  function addNewItemTable() {
    append({ // Adiciona um novo item ao array 'tabs'
      sigla: '',
      idPrazo: 0,
      idPreco: 0,
      idTransf: 0
    })
  }

  // REMOVER UMA SIGLA DA TABELA
  function removerSigla(index: number) {
    remove(index); // Remove o item pelo índice
  }

  // ENVIAR DADOS PARA A API
  async function realizarCotacao(data: CreateUserFormData) {
    const adjustedDate = { // Ajusta as datas para o formato ISO
      ...data,
      dataInicio: data.dataInicio.toISOString().substring(0, 10),
      dataFim: data.dataFim.toISOString().substring(0, 10)
    };

    console.log(adjustedDate); // Verifica se as datas estão ajustadas corretamente

    const url = construirURL(adjustedDate); // Constrói a URL com os dados ajustados
    alert("URL gerada: " +  url); // Log da URL para verificação

    try {
      const response = await axios.get(url); // Faz uma requisição GET usando Axios

      setOutput(JSON.stringify(response.data, null, 2)); // Armazena a resposta formatada no estado
    } catch (error: any) {
      console.error("Erro ao fazer a requisição:", error);
      setOutput(`Erro: ${error.message}`); // Armazena mensagem de erro no estado
    }
  }

  // ESTRUTURA RETORNADA AO FRONTEND =========================================================================
  return (
    <main className="h-screen text-zinc-300 flex flex-col gap-10 items-center justify-start m-5">
      <h1 className="text-emerald-500 text-2xl font-semibold mt-5">Análise de cotações</h1>
      <form
        onSubmit={handleSubmit(realizarCotacao)} // Envia o formulário chamando a função realizarCotacao
        className='flex flex-col gap-2 w-full max-w-screen-2xl'
      >

        {/* FORMULÁRIO - IDENTIFICADORES */}
        <IdentificadoresForm register={register} errors={errors} /> {/* Componente para campos de identificador */}

        <TokenPortalForm register={register} errors={errors} />

        {/* FORMULÁRIO - PERÍODO */}
        <PeriodoForm register={register} errors={errors} /> {/* Componente para selecionar o período */}

        {/* FORMULÁRIO - TABELAS PARA COTAÇÃO */}
        <div className='flex flex-col gap-1'>
          <TabelasForm
            fields={fields} // Campos dinâmicos
            register={register} // Função de registro
            errors={errors} // Erros de validação
            addNewItemTable={addNewItemTable} // Função para adicionar nova sigla
            removerSigla={removerSigla} // Função para remover sigla
          />

          {/* RETORNA LISTA DE TABELAS PARA PREENCHER */}
          <div className='flex flex-wrap gap-5'>

            {/* Implementando o SiglaItem */}
            {fields.map((field, index) => ( // Mapeia os campos para renderizar cada SiglaItem
              <SiglaItem
                key={field.id} // Chave única para o elemento
                field={field} // Dados do campo
                index={index} // Índice do campo
                register={register} // Função de registro
                errors={errors} // Erros de validação
              />
            ))}

          </div>

          {errors.tabs && <span className='text-red-500 text-sm'>{errors.tabs.message}</span>} {/* Exibe mensagem de erro */}
        </div>

        {/* BOTÃO DE REALIZAR COTAÇÃO */}
        <div className="flex items-center justify-end">
          <button
            type='submit'
            className='bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600 mb-10 w-[300px] mt-5 mr-5'
          >
            Realizar Cotação
          </button>
        </div>

      </form>

      {/* GRAFICOS ============================================== */}
      <button
        onClick={GerarGraficos} // Gera gráficos ao clicar
        className='bg-violet-500 rounded font-semibold text-white h-10 hover:bg-violet-600 mb-1 w-[300px] mt-2'
      >
        Gerar Gráficos
      </button>

      <div className='flex gap-20'>
        <div className='grafico1'>
          <canvas id='grafico1'></canvas> {/* Elemento de canvas para o primeiro gráfico */}
        </div>

        <div className='grafico2'>
          <canvas id='grafico2'></canvas> {/* Elemento de canvas para o segundo gráfico */}
        </div>
      </div>

      <pre>
        {output} {/* Exibe a saída da API formatada */}
      </pre>
    </main>
  )
}

'use client'//Faz com que o código seja rodado no navegador
import { useState } from 'react'; //imprta a a funcionalidade de useState, um hook que permite adicionar estados aos componentes
import { supabase } from '../../src/lib/supabaseClient'; //Importação do cliente 
import styles from './style.module.css'
import { serverHooks } from 'next/dist/server/app-render/entry-base';

export default function RegistroEmprestimo() { //função para cadastrar o usuário 
    const [formData, setFormData] = useState({
        ferramentas: '',
        quantidade: 1,
        categoria: '',
        estado: '',
        observacao: '',
        quem_pegou: '',
        funcao: '',
        servico: '',
        data: new Date().toISOString().split('T')[0] // Data atual como padrão
    });
    const [mensagem, setMensagem] = useState('');
    const [enviando, setEnviando] = useState(false);

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => { //função assincrona 
        e.preventDefault();
        setEnviando(true);//Por padrão a pagina recarrega ao ser enviado os dados, sendo importante bloquear a função de clicar varias vezes no botao
    
    
        const {error} = await supabase //Enviando dados pra o banco 
            .from('emprestimo')//indica qual tbela do banco os dados devem ir 
            .insert([{//Envia o objeto com os dados 
                ferramentas: formData.ferramentas,
                quantidade: formData.quantidade,
                categoria: formData.categoria,
                data_emprestimo: formData.data,
                estado: formData.estado,
                observacao: formData.observacao,
                quem_pegou: formData.quem_pegou,
                funcao: formData.funcao,
                servico: formData.servico
            }]);

            if (error) {//Se houver erro, mostrará a mensagem de erro
                setMensagem('Erro:' + error.message)
            } else {//Se não, mostrará que a  operação foi bem sucedida 
                setMensagem('Requerimento registrado com sucesso!')
                setFormData({...formData, ferramentas:'', observacao:'', quem_pegou: ''})
            }
            setEnviando(false);
    };

    return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Almoxarerife🕵️‍♂️</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
           {/* Dados de quem pega */}
          <input placeholder="Nome de quem pegou" value={formData.quem_pegou} onChange={e => setFormData({...formData, quem_pegou: e.target.value})} required className={styles.input}/>
          <input placeholder="Função" value={formData.funcao} onChange={e => setFormData({...formData, funcao: e.target.value})} required className={styles.input}/>
          
          {/* Dados da ferramenta */}
          <input placeholder="Ferramentas (ex: Chave Fenda, Martelo)" value={formData.ferramentas} onChange={e => setFormData({...formData, ferramentas: e.target.value})} required className={styles.input}/>
          <input type="number" placeholder="Quantidade" value={formData.quantidade} onChange={e => setFormData({...formData, quantidade: Number(e.target.value)})} required className={styles.input}/>
          
          <input placeholder="Categoria" value={formData.categoria} onChange={e => setFormData({...formData, categoria: e.target.value})} className={styles.input}/>
          <input type="date" value={formData.data} onChange={e => setFormData({...formData, data: e.target.value})} className={styles.input}/>
          
          <select value={formData.estado} onChange={e => setFormData({...formData, estado: e.target.value})} className={styles.input} required>
            <option value="">Estado da Ferramenta</option>
            <option value="Novo">Novo</option>
            <option value="Bom">Bom</option>
            <option value="Desgastado">Desgastado</option>
          </select>

          <input placeholder="Serviço a ser realizado" value={formData.servico} onChange={e => setFormData({...formData, servico: e.target.value})} className={styles.input}/>
        </div>

        <textarea placeholder="Observações extras" value={formData.observacao} onChange={e => setFormData({...formData, observacao: e.target.value})} className={styles.textarea}/>

        <button type="submit" disabled={enviando} className={styles.botao}>
          {enviando ? 'Registrando...' : 'Confirmar Retirada'}
        </button>
      </form>
      {mensagem && <p className={mensagem.includes('Erro') ? styles.erro : styles.sucesso}>{mensagem}</p>}
    </div>
  );
}

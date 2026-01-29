'use client'//Faz com que o código seja rodado no navegador
import { useState } from 'react'; //imprta a a funcionalidade de useState, um hook que permite adicionar estados aos componentes
import { supabase } from '../../src/lib/supabaseClient'; //Importação do cliente 
import styles from './style.module.css'

export default function CadastroTrabalhador() { //função para cadastrar o usuário 
    const [nome, setNome] = useState('');
    const [funcao, setFuncao] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [enviando, setEnviando] = useState(false);

    const handleCadastro = async (e: React.SyntheticEvent<HTMLFormElement>) => {//Função assíncrona, onde esperamos a resposta do banco de dados 
        e.preventDefault() //interrompe o carregamento automático da página 
        setEnviando(true);//Alterando o estado do useState(false) para useState(truess)
        setMensagem('Enviando dados...');//Altera o useState da mensagem mostrando: 'Enviando dados...'

        const { error } = await supabase //Faz o código esperar a resposta do banco de dados 
            .from('trabalhador')//extrai dados da tabela chamada Trabalhador do banco de dados 
            .insert([//inserir [Arraz] e um {Objeto}, possobilitando varios registros de uma vez
                { nome: nome, funcao: funcao }//relação do nome da coluna com o nome da variável 
            ]);
        if (error) {
            setMensagem('Erro ao cadastrar:' + error.message);//Se tiver algum erro mostrará uma mensagem 
        } else {
            setMensagem('Trabalhador cadastrado com sucesso!');//Se não mostrará que o trabalhador foi cadastrado 
            setNome('');//apaga o nome 
            setFuncao('');//apaga a função 
        }
        setEnviando(false)//volta ao estado normal
    };
    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Cadastrar Trabalhador</h1>

            <form onSubmit={handleCadastro} className={styles.form}>
                <div className={styles.campo}>
                    <label className={styles.label}>Nome:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className={styles.input}
                        required
                    />
                </div>

                <div className={styles.campo}>
                    <label className={styles.label}>Função / Cargo:</label>
                    <input
                        type='text'
                        value={funcao}
                        onChange={(e) => setFuncao(e.target.value)}
                        className={styles.input}
                        required
                    />
                </div>
                <button type="submit" disabled={enviando} className={styles.botao}>
                    {enviando ? 'Processando...' : 'Salvar no Almoxarifado'}
                </button>
            </form>
            {mensagem && (
                <p className={`${styles.mensagem} ${mensagem.includes('Erro') ? styles.erro : styles.sucesso}`}>
                    {mensagem}
                </p>
            )}
        </div>
    );
}
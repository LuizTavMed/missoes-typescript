import { type Request, type Response } from 'express'
import banco from '../../bancoDados/bancos'

export const excluirCadastro = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id
  try {
    // Aqui você pode implementar a lógica para excluir o cadastro do banco de dados
    // Por exemplo, você pode usar um query SQL para deletar o registro com o id fornecido
    const bd = await banco()
    const query = 'DELETE FROM cadastros WHERE id =?'
    const resultado = await bd.execute(query, [id])
    if (resultado === 0) {
      res.status(404).json({ message: 'Cadastro não encontrado' })
      return
    }
    res.status(200).json({ message: 'Cadastro excluído com sucesso' })
  } catch (error) {
    console.error('Error ao excluir cadastro: ', error)
    res.status(500).json({ message: 'Erro interno no servidor', detail: error })
  }
}

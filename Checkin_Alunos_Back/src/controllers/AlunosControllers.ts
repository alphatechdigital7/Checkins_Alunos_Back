import { Request, Response } from "express";
import fs from 'fs';
import multer from 'multer';
import { ExcelParser } from '../utils/excelParser';
import { CsvParser } from '../utils/csvParser';
import { Tb_Alunos } from "../entities/Tb_Alunos";
import { AlunosServices } from "../services/AlunosServices";

const alunosServices = new AlunosServices();

export class AlunosControllers {
    constructor() {
        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.getByName = this.getByName.bind(this);
        this.getByResponsavel = this.getByResponsavel.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            console.log('Dados recebidos para criação:', req.body);
            // Garante que estamos trabalhando com um único usuário
            const dadosAluno = Array.isArray(req.body) ? req.body[0] : req.body;
            const aluno = await alunosServices.create(dadosAluno);
            
            console.log('Aluno criado com MATRICULA:', aluno.matricula);
            return res.status(201).json({
                success: true,
                aluno,
                mensagem: "Aluno criado com sucesso"
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
            console.error('Erro no controller ao criar aluno:', errorMessage);
            
            return res.status(400).json({ 
                success: false,
                error: errorMessage,
                mensagem: "Falha ao criar aluno",
                detalhes: {
                    campoEmail: errorMessage.includes('Email') ? 'email inválido' : undefined,
                    camposFaltantes: errorMessage.includes('obrigatórios') 
                        ? ['matricula', 'nome', 'telefone', 'email', 'resp1', 'telefone_resp1', 'email_resp1'].filter(f => !req.body[f])
                        : undefined
                }
            });
        }
    }

    async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const alunos = await alunosServices.findAll();
            return res.json(
                //{
                //success: true,
                //message: "Lista de usuários obtida com sucesso",
                //data: usuarios
                //}
                alunos, 
            );
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "Erro ao buscar alunos"
            });
        }
    }

    async getById(req: Request, res: Response): Promise<Response> {
        try {
            const aluno = await alunosServices.findById(String(req.params.matricula));
            if (!aluno) return res.status(404).json({ 
                success: false,
                error: "Aluno não encontrado" 
            });
            return res.json({
                success: true,
                message: "Aluno encontrado com sucesso",
                data: aluno
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "Erro ao buscar aluno"
            });
        }
    }

    async getByName(req: Request, res: Response): Promise<Response> {
        try {
            const { nome } = req.query;
            const alunos = await alunosServices.findByName(nome as string);
            return res.json({
                success: true,
                message: "Alunos encontrados com sucesso",
                data: alunos
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "Erro ao buscar alunos por nome"
            });
        }
    }
    async getByResponsavel(req: Request, res: Response): Promise<Response> {
        try {
            const { nome } = req.query;
            
            if (!nome) {
                return res.status(400).json({
                    success: false,
                    error: "Parâmetro 'nome' é obrigatório"
                });
            }

            const alunos = await alunosServices.findByResponsavel(nome as string);
            
            if (alunos.length === 0) {
                return res.status(404).json({
                    success: false,
                    error: "Nenhum aluno encontrado para o responsável informado"
                });
            }

            return res.json({
                success: true,
                message: "Alunos encontrados com sucesso",
                data: alunos
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
            console.error('Erro ao buscar alunos por responsável:', errorMessage);
            return res.status(500).json({
                success: false,
                error: "Erro ao buscar alunos pelo Responsável",
                details: errorMessage
            });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const dadosAtualizacao = Array.isArray(req.body) ? req.body[0] : req.body;
            
            const aluno = await alunosServices.update(String(req.params.matricula), dadosAtualizacao);
            if (!aluno) return res.status(404).json({ 
                success: false,
                error: "Aluno não encontrado" 
            });
            
            return res.json({
                success: true,
                message: "Aluno atualizado com sucesso",
                data: aluno
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "Erro ao atualizar Aluno"
            });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const success = await alunosServices.delete(Number(req.params.matricula));
            if (!success) return res.status(404).json({ 
                success: false,
                error: "Aluno não encontrado" 
            });
            return res.json({
                success: true,
                message: "Aluno deletado com sucesso"
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "Erro ao deletar Aluno"
            });
        }
    }

    async importFromExcel(req: Request, res: Response): Promise<Response> {
        try {
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    error: "Nenhum arquivo enviado"
                });
            }

            // Verifica se é um arquivo XLSX ou CSV
            const isExcel = req.file.mimetype.includes('spreadsheetml') || req.file.originalname.endsWith('.xlsx');
            const isCsv = req.file.mimetype.includes('text/csv') || req.file.originalname.endsWith('.csv');
            
            if (!isExcel && !isCsv) {
                fs.unlinkSync(req.file.path);
                return res.status(400).json({
                    success: false,
                    error: "Apenas arquivos Excel (.xlsx) ou CSV (.csv) são permitidos"
                });
            }

            console.log('Iniciando importação do arquivo:', req.file.originalname);
            let alunosData;
            try {
                const fileContent = fs.readFileSync(req.file.path);
                console.log('Tamanho do arquivo:', fileContent.length, 'bytes');
                alunosData = isExcel 
                    ? ExcelParser.parseAlunos(fileContent)
                    : CsvParser.parseAlunos(fileContent.toString());
                console.log('Alunos parseados:', alunosData.length);
                
                if (!Array.isArray(alunosData) || alunosData.length === 0) {
                    throw new Error('O arquivo não contém dados válidos de alunos');
                }
            } catch (error) {
                fs.unlinkSync(req.file.path);
                const errorMessage = error instanceof Error ? error.message : 'Erro ao processar arquivo';
                console.error('Erro no parser do Excel:', errorMessage);
                return res.status(400).json({
                    success: false,
                    error: 'Erro ao processar arquivo Excel',
                    details: errorMessage
                });
            }
            
            // Obtém o primeiro aluno como referência para o usuário admin
            if (alunosData.length === 0) {
                throw new Error('Nenhum aluno encontrado no arquivo');
            }
            
            // Verifica se o usuário admin está definido corretamente
            const usuarioAdmin = alunosData[0].usuario_id;
            if (!usuarioAdmin || !usuarioAdmin.id_usuarios) {
                throw new Error('Usuário admin não configurado corretamente no arquivo');
            }

            const alunosCriados = await Promise.all(
                alunosData.map(async (data: Partial<Tb_Alunos>) => {
                    try {
                        // Garante que o objeto de usuário está completo
                        if (!data.usuario_id) {
                            data.usuario_id = usuarioAdmin;
                        }
                        return await alunosServices.create(data);
                    } catch (error) {
                        console.error('Erro ao criar aluno:', error);
                        return null;
                    }
                })
            ).then(results => results.filter(Boolean));

            const totalImportados = alunosCriados.length;

            fs.unlinkSync(req.file.path); // Remove o arquivo após processamento

            return res.json({
                success: true,
                message: `${totalImportados} alunos importados com sucesso`,
                data: alunosCriados,
                total: totalImportados,
                erros: alunosData.length - totalImportados
            });
        } catch (error) {
            if (req.file?.path) {
                fs.unlinkSync(req.file.path); // Remove o arquivo em caso de erro
            }
            
            const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
            console.error('Erro ao importar alunos:', errorMessage);
            
            return res.status(500).json({
                success: false,
                error: "Erro ao importar alunos",
                details: errorMessage
            });
        }
    }
}

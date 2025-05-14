#!/bin/bash

# Script para testar o endpoint de importação de alunos via CSV

BASE_URL="http://localhost:3000/alunos"  # Altere para a porta correta do seu servidor
IMPORT_ENDPOINT="$BASE_URL/import"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEST_FILES_DIR="$SCRIPT_DIR/test_files"

echo "Teste 1: Importação bem-sucedida com arquivo CSV válido"
curl -i -X POST "$IMPORT_ENDPOINT" -F "file=@$TEST_FILES_DIR/alunos_validos.csv"
echo -e "\n\n"

echo "Teste 2: Nenhum arquivo enviado"
curl -i -X POST "$IMPORT_ENDPOINT"
echo -e "\n\n"

echo "Teste 3: Tipo de arquivo inválido (arquivo .txt)"
curl -i -X POST "$IMPORT_ENDPOINT" -F "file=@$TEST_FILES_DIR/arquivo_invalido.txt"
echo -e "\n\n"

echo "Teste 4: Arquivo CSV vazio"
curl -i -X POST "$IMPORT_ENDPOINT" -F "file=@$TEST_FILES_DIR/alunos_vazio.csv"
echo -e "\n\n"

echo "Teste 5: Arquivo CSV com dados inválidos"
curl -i -X POST "$IMPORT_ENDPOINT" -F "file=@$TEST_FILES_DIR/alunos_invalidos.csv"
echo -e "\n\n"

echo "Fim dos testes."

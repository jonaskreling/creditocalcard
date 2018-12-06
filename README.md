**Análise de Crédito - Prova**

Ideia Principal: Desenvolver uma aplicação web que realize o cadastro de proposta de crédito para um determinado cliente, efetue a análise de dados e efetive a aprovação ou negação de um limite de crédito para o mesmo.

A proposta de crédito consiste em um formulário contendo as seguintes informações de cadastro de cliente:

1. Nome
2. CPF
3. idade
4. sexo
5. estado civil
6. estado
7. dependentes
8. renda

---

Para gerar uma análise de crédito:

1. Faça o cadastro do Cliente
2. Cadastre o endereço para o cliente
3. Cadastre os dependentes (Opcional)
4. Faça as simulações de credito

Obs: Para cada análise feita o sistema cria um novo registro para a análise exibindo se foi aceita ou não aceita, o motivo, e o limite.   

---

## Tecnologias

Foi usado as seguintes tecnologias

1. Frontend: AngularJs, Html5, Bootstrap
2. Backend: Java 8, Spring-Boot
3. Integração: Restfull
4. Documentação da API Rest em formato Swager

---

## Rodar o projeto

Para rodar o projeto

1. Clone este projeto
2. Com o CMD abra a pasta do projeto
3. Execute mvn clean install -DskipTests
4. Execute docker-compose build
5. Execute docker-compose up
6. Execute um browser e acesse o seguinte endereço http://localhost:8087/

Pré-requisitos

1. Maven
2. Docker

---

## Docentação

A documentação foi feita seguindo o formato swager

1. Acessar o arquivo swagger.yaml
# <p align = "center"> HomeCare </p>

##  :clipboard: Descrição

HomeCare é uma aplicação de prestação de serviços domésticos. Profissionais podem se cadastrar e escolhero tipo de serviço que irá prestar, FAXINA, JARDINAGEM ou SERVIÇOS ELÉTRICOS. Por outro lado, qualquer pessoa que necessita de algum serviço desse tipo, pode se cadastrar como cliente e contratar o serviço desses profissionais.

***
## Usabilidade

Caso crie um novo cliente sugiro que bote como localidade o Rio de Janeiro. Já existem profissionais fictícios criados nesta localidade, com isso poderá fazer a experiência completa do aplicativo e testar as funcionalidades.

Caso queira testar a aplicação com usuários já existentes, logue com essas credenciais:
- Conta de Cliente:
email: victor@gmail.com,
password: 1234

- Conta Profissional:
email: carlos@gmail.com,
password: 123

***
##  :hammer: Principais Funcionalidades

- Profissionais podem criar uma descrição e atualizá-la quando quiser.
- Profissionais recebem a notificação de alguma reserva de serviço feito por algum cliente e possuem a opção de aceitar ou não o trabalho. Caso rejeite, a solicitação é apagada imediatamente.
- Profissionais podem ver avaliações deixadas por clientes.
- Na página dos clientes, os profissionais são filtrados a partir de sua localização.
- Clientes podem atualizar sua localização a qualquer momento.
- Clientes podem escolher a categoria de serviço que querem contratar.
- Clientes podem solicitar um trabalho escolhendo a data para que o serviço seja prestado.
- Clientes possuem uma aba "requests" contendo todas suas solicitações de serviços e seus status, aceito ou pendente.
- Logando como cliente após ter recebido um profissional do aplicativo, será exbibido um modal com a opção de escrever uma avaliação para o profissional.
- Clientes possuem acesso às avaliações dos profissionais feitas pelos clientes.

***

## :computer:	 Tecnologias e Ferramentas usadas

- React.js
- Node.js
- Express.js
- PostgresSQL
- Prisma
- JWTs & refresh tokens

***
## 🏁 Rodando a aplicação

Certifique-se que voce tem a ultima versão estável do Node.js e npm rodando localmente.

Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/vvictorfonseca/homeCare-backEnd-Autoral.git
```

Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias.

```
npm install
```

Finalizado o processo, é só inicializar o servidor.
```
npm run dev
```

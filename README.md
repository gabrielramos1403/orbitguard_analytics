# 🚀 OrbitGuard Analytics

<p align="center">
  <img src="./assets/screenshots/banner.png" alt="Banner OrbitGuard Analytics" width="100%">
</p>

<h3 align="center">
  Plataforma mobile para monitoramento inteligente de missão espacial simulada
</h3>

<p align="center">
  <strong>Global Solution 2026.1 — Cross-Platform Application Development | FIAP</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-0F172A?style=for-the-badge&logo=typescript&logoColor=3178C6" />
  <img src="https://img.shields.io/badge/Mobile-App-5B8CFF?style=for-the-badge" />
</p>

---



## 👨‍💻 Autores

| Autor | Participação |
| ----- | ------------ |
| Gabriel Ramos Moreira | Desenvolvimento do aplicativo, estruturação das telas, lógica de alertas e documentação |
| Vinicius Mello Siqueira | Apoio no desenvolvimento, testes, validação das funcionalidades e documentação |



## 🛰️ Sobre o Projeto

O **OrbitGuard Analytics** é um aplicativo mobile desenvolvido em **React Native + Expo** para o desafio **Global Solution 2026.1** da FIAP, dentro do tema **Space Predictive Analytics**.

A proposta da aplicação é simular uma plataforma inteligente de monitoramento de uma missão espacial, acompanhando dados de **sensores**, **energia**, **comunicação** e **estabilidade orbital** em tempo real simulado.

O app gera alertas automáticos com base em limiares críticos configuráveis e apresenta uma interpretação simples do risco da missão, apoiando a tomada de decisão em um ambiente operacional crítico.

---

## 🎯 Objetivo da Solução

O objetivo do **OrbitGuard Analytics** é oferecer uma visão rápida, visual e organizada do estado de uma missão espacial simulada.

A aplicação permite que o usuário acompanhe:

| Área Monitorada      | Indicadores                                     |
| -------------------- | ----------------------------------------------- |
| 🌡️ Sensores         | Temperatura, pressão e radiação                 |
| 🔋 Energia           | Bateria, geração solar e consumo                |
| 📡 Comunicação       | Qualidade do sinal, latência e pacotes perdidos |
| 🛰️ Operação Orbital | Estabilidade da missão e status geral           |

Com base nesses dados, o sistema classifica a missão em:

| Status                | Significado                                             |
| --------------------- | ------------------------------------------------------- |
| 🟢 Operação normal    | Todos os sistemas estão dentro dos parâmetros esperados |
| 🟡 Atenção necessária | Um ou mais indicadores estão próximos do limite         |
| 🔴 Risco crítico      | Há indicadores críticos que exigem ação imediata        |

---

## 👨‍🚀 Equipe

| Integrante    | RM       |
| ------------- | -------- |
| Gabriel Ramos | RM000000 |
| Integrante 2  | RM000000 |
| Integrante 3  | RM000000 |

> Substituir pelos nomes e RMs oficiais antes da entrega final.

---

## 📱 Demonstração Visual

### 🏠 Home — Dashboard Principal

![Home](./assets/screenshots/home.png)

A tela inicial apresenta uma visão geral da missão, incluindo temperatura, energia, sinal, estabilidade orbital e o status geral da operação.

---

### 🌡️ Dashboard de Sensores

![Sensores](./assets/screenshots/sensores.png)

A tela de sensores exibe temperatura, pressão e radiação da missão, além de um gráfico com o histórico recente das leituras simuladas.

---

### 🔋 Dashboard de Energia

![Energia](./assets/screenshots/energia.png)

A tela de energia mostra a bateria principal, geração dos painéis solares, consumo dos sistemas e um gráfico com o histórico da bateria.

---

### 📡 Dashboard de Comunicação

![Comunicação](./assets/screenshots/comunicacao.png)

A tela de comunicação acompanha qualidade do sinal, latência e pacotes perdidos. Caso algum indicador ultrapasse o limite configurado, o sistema gera alertas automaticamente.

---

### ⚠️ Alertas

![Alertas](./assets/screenshots/alertas.png)

A tela de alertas lista os eventos gerados automaticamente, mostrando título, descrição, criticidade e horário.

---

### ⚙️ Configurações

![Configurações](./assets/screenshots/configuracoes.png)

A tela de configurações permite ajustar os limiares críticos da missão por meio de um formulário com validação.

---

## ✨ Funcionalidades

* [x] Navegação com **Expo Router**
* [x] Navegação inferior com **Tabs**
* [x] Dashboard principal da missão
* [x] Dashboard de sensores
* [x] Dashboard de energia
* [x] Dashboard de comunicação
* [x] Sistema de alertas automáticos
* [x] Histórico de alertas
* [x] Limpeza do histórico de alertas
* [x] Formulário de configurações
* [x] Inputs controlados
* [x] Validação de campos vazios
* [x] Validação de valores inválidos
* [x] Validação de faixas aceitáveis
* [x] Persistência local com AsyncStorage
* [x] Context API para estado global
* [x] Simulação de dados em tempo real
* [x] Gráficos simples nos dashboards
* [x] Interface temática espacial
* [x] Componentes reutilizáveis
* [x] Código organizado com TypeScript

---

## 🧠 Lógica Preditiva Simples

O projeto possui uma função chamada:

```ts
analyzeMissionRisk()
```

Essa função interpreta os dados atuais da missão e retorna:

* Status geral
* Nível de risco
* Mensagem interpretativa

A análise é feita com regras simples e compreensíveis, como:

| Condição                                | Resultado esperado       |
| --------------------------------------- | ------------------------ |
| Temperatura próxima do limite           | Atenção necessária       |
| Bateria abaixo do mínimo                | Risco crítico            |
| Sinal abaixo do configurado             | Atenção ou risco crítico |
| Latência acima do limite                | Alerta de comunicação    |
| Vários indicadores ruins ao mesmo tempo | Risco crítico            |

Essa abordagem foi escolhida para manter o projeto coerente com o nível acadêmico da disciplina, sem uso de machine learning real, backend externo ou APIs pagas.

---

## ⚠️ Sistema de Alertas

Os alertas são gerados automaticamente quando algum dado simulado ultrapassa os limiares definidos pelo usuário.

Cada alerta possui:

| Informação | Descrição                          |
| ---------- | ---------------------------------- |
| Título     | Nome do problema identificado      |
| Descrição  | Explicação clara do ocorrido       |
| Nível      | Baixo, médio ou crítico            |
| Horário    | Momento em que o alerta foi gerado |

Exemplos de alertas:

* 🔴 Temperatura crítica
* 🔴 Bateria abaixo do limite
* 🔴 Perda severa de sinal
* 🟡 Sinal abaixo do ideal
* 🟡 Latência elevada
* 🔵 Estabilidade orbital reduzida

---

## 🗂️ Estrutura do Projeto

```txt
OrbitGuardAnalytics/
├── assets/
│   └── screenshots/
│       ├── banner.png
│       ├── home.png
│       ├── sensores.png
│       ├── energia.png
│       ├── comunicacao.png
│       ├── alertas.png
│       └── configuracoes.png
│
├── src/
│   ├── app/
│   │   ├── _layout.tsx
│   │   └── (tabs)/
│   │       ├── _layout.tsx
│   │       ├── index.tsx
│   │       ├── sensores.tsx
│   │       ├── energia.tsx
│   │       ├── comunicacao.tsx
│   │       ├── alertas.tsx
│   │       └── configuracoes.tsx
│   │
│   ├── components/
│   │   ├── AlertCard.tsx
│   │   ├── ChartCard.tsx
│   │   ├── MissionCard.tsx
│   │   ├── SectionTitle.tsx
│   │   └── StatusBadge.tsx
│   │
│   ├── constants/
│   │   └── theme.ts
│   │
│   ├── context/
│   │   └── MissionContext.tsx
│   │
│   ├── data/
│   │   └── mockMissionData.ts
│   │
│   ├── types/
│   │   └── mission.ts
│   │
│   └── utils/
│       ├── formatters.ts
│       ├── riskAnalysis.ts
│       └── storage.ts
│
├── .gitignore
├── app.json
├── package-lock.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🧩 Principais Componentes

| Componente     | Função                                         |
| -------------- | ---------------------------------------------- |
| `MissionCard`  | Exibe indicadores da missão em formato de card |
| `AlertCard`    | Exibe alertas com nível de criticidade         |
| `SectionTitle` | Padroniza títulos e subtítulos das telas       |
| `StatusBadge`  | Mostra o status geral da missão                |
| `ChartCard`    | Exibe gráficos simples dos dashboards          |

---

## 🌐 Gerenciamento de Estado

O estado global da aplicação é controlado com **Context API** no arquivo:

```txt
src/context/MissionContext.tsx
```

O contexto armazena:

* Dados atuais da missão
* Histórico das leituras
* Alertas gerados
* Configurações dos limiares
* Função para atualizar dados
* Função para salvar configurações
* Função para limpar alertas

O projeto utiliza:

| Hook         | Uso no Projeto                             |
| ------------ | ------------------------------------------ |
| `useState`   | Controle dos inputs do formulário          |
| `useEffect`  | Atualização automática dos dados simulados |
| `useReducer` | Organização das mudanças no estado global  |
| `useContext` | Consumo dos dados globais nas telas        |

--

## 🛠️ Tecnologias Utilizadas

| Tecnologia             | Finalidade                             |
| ---------------------- | -------------------------------------- |
| React Native           | Desenvolvimento mobile cross-platform  |
| Expo                   | Ambiente de desenvolvimento e execução |
| Expo Router            | Navegação baseada em arquivos          |
| TypeScript             | Tipagem e organização do código        |
| Context API            | Estado global da aplicação             |
| AsyncStorage           | Persistência local                     |
| React Native Chart Kit | Gráficos dos dashboards                |
| React Native SVG       | Suporte aos gráficos                   |
| @expo/vector-icons     | Ícones da interface                    |

---

## 📦 Bibliotecas Principais

```json
{
  "@react-native-async-storage/async-storage": "persistência local",
  "@expo/vector-icons": "ícones da interface",
  "expo-router": "navegação entre telas",
  "react-native-chart-kit": "gráficos dos dashboards",
  "react-native-svg": "suporte visual aos gráficos"
}
```

## 🎓 Observação Acadêmica

O **OrbitGuard Analytics** foi desenvolvido com foco em uma solução completa, funcional e coerente com os conteúdos da disciplina.

O projeto não utiliza backend, banco de dados externo, autenticação, Firebase, Redux ou inteligência artificial real. A proposta foi criar uma aplicação mobile bem estruturada, com dados simulados, análise por regras, estado global, persistência local e dashboards visuais.

Essa escolha mantém o app tecnicamente consistente, explicável e adequado para uma entrega acadêmica de **Ciência da Computação — 3º semestre**.

---

## Motivo do projeto

Este projeto foi desenvolvido exclusivamente para fins acadêmicos como parte da **Global Solution 2026.1 — FIAP**.

---

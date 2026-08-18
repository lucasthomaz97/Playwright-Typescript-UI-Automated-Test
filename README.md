# SauceDemo E2E Tests

![Playwright](https://img.shields.io/badge/Playwright-1.60-45ba4c?style=flat-square&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-24.x-339933?style=flat-square&logo=nodedotjs&logoColor=white)

---

[English](#english) | [Português](#português)

---

## English

### Project Overview

End-to-end (E2E) automated tests for [SauceDemo](https://www.saucedemo.com), a demo e-commerce web application. The test suite covers critical user flows including authentication, product browsing, inventory item details, and checkout.

### Tech Stack

- **Playwright** - Browser automation framework
- **TypeScript** - Type-safe test development
- **Node.js** - Runtime environment
- **GitHub Actions** - CI/CD pipeline
- **Faker** - Deterministic fake data generation for checkout forms

### Project Structure

```
SauceDemoE2E/
├── e2e/                          # Test specifications
│   ├── login.spec.ts             # Login flow tests (8)
│   ├── products.spec.ts          # Products page tests (15)
│   ├── checkout.spec.ts          # Checkout flow tests (19)
│   └── inventory_item.spec.ts    # Inventory item detail tests (9)
├── page_objects/                 # Page Object Model
│   ├── login_page.ts
│   ├── products_page.ts
│   ├── checkout_page.ts
│   └── inventory_item_page.ts
├── fixtures/
│   └── index.ts                  # Custom fixtures + expect
├── helpers/
│   └── data_factory.ts           # Faker-based test data factory + credentials
├── playwright.config.ts          # Test configuration
└── .github/workflows/
    └── playwright.yml            # CI/CD pipeline
```

**Total: 53 tests per browser (159 across Chromium, Firefox, WebKit)**

### Test Coverage

**Login Flow (`login.spec.ts`) — 8 tests**
- Login page display
- Empty field validation (username, password, both)
- Invalid credentials handling (invalid username, invalid password)
- Locked user account handling
- Successful login with URL verification
- Error message dismissal

**Products Page (`products.spec.ts`) — 15 tests**
- Side menu functionality (open, close, logout)
- Product list display (6 items, exact count verification)
- Product sorting: A-Z, Z-A, Price Low-High, Price High-Low
- Add/Remove toggles with cart badge and visibility verification

**Checkout Flow (`checkout.spec.ts`) — 19 tests**
- Cart consistency: continue shopping, cart persistence, product display (1, 3, 6 products) in cart and overview
- Cart functionality: checkout page display, remove product
- Your Information: empty inputs, cancel navigation, field validation (first name, last name, postal code)
- Overview & Complete: cancel from overview, finish checkout with URL verification, back home navigation

**Inventory Item (`inventory_item.spec.ts`) — 9 tests**
- Product detail page displays correct name, price, and description with URL navigation verification (all 6 items)
- Back to Products button with URL verification
- Add to cart from detail page with badge update
- Remove from cart from detail page

### Key Features

- **Page Object Model (POM)**: Encapsulates page-specific locators and actions for maintainability and reusability
- **Custom Fixtures**: Shared authentication flow and page object injection across test files
- **Centralized Credentials**: `CREDENTIALS` constant for all test accounts, eliminating hardcoded strings
- **Data Factory**: Deterministic fake data via Faker (seeded) for checkout forms
- **Data-driven Image Mapping**: `IMAGE_SLUGS` array for product images instead of brittle switch-case
- **Strong Assertions**: `toHaveText()`, `toHaveCount()`, `toBeHidden()`, and URL verification throughout
- **Multi-browser Testing**: Chromium, Firefox, and WebKit
- **CI/CD Integration**: Automated execution on push and pull requests via GitHub Actions
- **HTML Reports**: Built-in Playwright reporter for test results visualization
- **Screenshots & Video**: Captured on failure and retry for debugging
- **Trace Viewer**: Trace recording on first retry for deep failure analysis

### Running Tests

```bash
# Install dependencies
npm install
npx playwright install --with-deps

# Run all tests headlessly (default)
npx playwright test

# Run with browser UI visible
npm run test:headed

# Run in debug mode (Playwright Inspector)
npm run test:debug

# Run only on Chromium
npm run test:chromium

# Run only on Firefox
npm run test:firefox

# Run only on WebKit
npm run test:webkit

# Run on all three browsers explicitly
npm run test:all

# Run specific test tags (grep)
npx playwright test --grep "@products"
npx playwright test --grep "@login"
npx playwright test --grep "@inventory_item_consistency"
npx playwright test --grep "@inventory_item_components"
npx playwright test --grep "@checkout_consistency"
npx playwright test --grep "@checkout_functionality_cart"
npx playwright test --grep "@checkout_functionality_your_information"
npx playwright test --grep "@checkout_functionality_overview_and_complete"

# Run specific tag on specific browser
npx playwright test --project chromium --grep "@products"
npx playwright test --project firefox --grep "@checkout_consistency"
```

### CI/CD

Tests run automatically on every push and pull request to `main`/`master` branches. The pipeline runs all 53 tests across Chromium, Firefox, and WebKit with 2 retries on failure. Reports and video artifacts are available for 30 days as GitHub Actions artifacts.

---

## Português

### Visão Geral do Projeto

Testes automatizados end-to-end (E2E) para o [SauceDemo](https://www.saucedemo.com), uma aplicação web demo de e-commerce. O conjunto de testes cobre fluxos críticos do usuário, incluindo autenticação, navegação de produtos, detalhes de itens e checkout.

### Stack Tecnológica

- **Playwright** - Framework de automação de navegadores
- **TypeScript** - Desenvolvimento de testes com tipagem segura
- **Node.js** - Ambiente de execução
- **GitHub Actions** - Pipeline de CI/CD
- **Faker** - Geração determinística de dados fictícios para formulários

### Estrutura do Projeto

```
SauceDemoE2E/
├── e2e/                          # Especificações de teste
│   ├── login.spec.ts             # Testes de login (8)
│   ├── products.spec.ts          # Testes de produtos (15)
│   ├── checkout.spec.ts          # Testes de checkout (19)
│   └── inventory_item.spec.ts    # Testes de detalhes do item (9)
├── page_objects/                 # Page Object Model
│   ├── login_page.ts
│   ├── products_page.ts
│   ├── checkout_page.ts
│   └── inventory_item_page.ts
├── fixtures/
│   └── index.ts                  # Fixtures personalizados + expect
├── helpers/
│   └── data_factory.ts           # Fábrica de dados com Faker + credenciais
├── playwright.config.ts          # Configuração de testes
└── .github/workflows/
    └── playwright.yml            # Pipeline de CI/CD
```

**Total: 53 testes por browser (159 entre Chromium, Firefox, WebKit)**

### Cobertura de Testes

**Fluxo de Login (`login.spec.ts`) — 8 testes**
- Exibição da página de login
- Validação de campos vazios (username, password, ambos)
- Tratamento de credenciais inválidas (username inválido, password inválido)
- Tratamento de conta de usuário bloqueada
- Login com sucesso com verificação de URL
- Dispensação de mensagens de erro

**Página de Produtos (`products.spec.ts`) — 15 testes**
- Funcionalidade do menu lateral (abrir, fechar, logout)
- Exibição da lista de produtos (6 itens, verificação de contagem exata)
- Ordenação de produtos: A-Z, Z-A, Preço Menor-Maior, Preço Maior-Menor
- Alternância Adicionar/Remover com verificação do badge e visibilidade

**Fluxo de Checkout (`checkout.spec.ts`) — 19 testes**
- Consistência do carrinho: continuar comprando, persistência, exibição de produtos (1, 3, 6) no carrinho e overview
- Funcionalidade do carrinho: exibição da página de checkout, remover produto
- Sua Informação: entradas vazias, navegação de cancelamento, validação de campos (nome, sobrenome, CEP)
- Overview e Conclusão: cancelar do overview, finalizar checkout com verificação de URL, navegação de voltar ao início

**Detalhes do Item (`inventory_item.spec.ts`) — 9 testes**
- Página de detalhes exibe nome, preço e descrição corretos com verificação de navegação por URL (todos os 6 itens)
- Botão "Back to Products" com verificação de URL
- Adicionar ao carrinho pela página de detalhes com atualização do badge
- Remover do carrinho pela página de detalhes

### Funcionalidades Principais

- **Page Object Model (POM)**: Encapsula localizadores e ações específicos de cada página para manutenibilidade e reusabilidade
- **Fixtures Personalizados**: Injeção de página e autenticação compartilhada entre arquivos de teste
- **Credenciais Centralizadas**: Constante `CREDENTIALS` para todas as contas de teste, eliminando strings hardcoded
- **Data Factory**: Dados fictícios determinísticos via Faker (com semente) para formulários de checkout
- **Mapeamento de Imagens Data-driven**: Array `IMAGE_SLUGS` para imagens de produtos substituindo switch-case frágil
- **Asserções Fortes**: `toHaveText()`, `toHaveCount()`, `toBeHidden()` e verificação de URL em todo o suite
- **Testes Multi-navegador**: Chromium, Firefox e WebKit
- **Integração CI/CD**: Execução automatizada em push e pull requests via GitHub Actions
- **Relatórios HTML**: Reporter nativo do Playwright para visualização dos resultados
- **Screenshots & Vídeo**: Capturados em falha e retry para depuração
- **Trace Viewer**: Gravação de trace no primeiro retry para análise profunda de falhas

### Executando os Testes

```bash
# Instalar dependências
npm install
npx playwright install --with-deps

# Executar todos os testes headless (padrão)
npx playwright test

# Executar com interface do navegador visível
npm run test:headed

# Executar em modo debug (Playwright Inspector)
npm run test:debug

# Executar apenas no Chromium
npm run test:chromium

# Executar apenas no Firefox
npm run test:firefox

# Executar apenas no WebKit
npm run test:webkit

# Executar nos três navegadores explicitamente
npm run test:all

# Executar tags específicas (grep)
npx playwright test --grep "@products"
npx playwright test --grep "@login"
npx playwright test --grep "@inventory_item_consistency"
npx playwright test --grep "@inventory_item_components"
npx playwright test --grep "@checkout_consistency"
npx playwright test --grep "@checkout_functionality_cart"
npx playwright test --grep "@checkout_functionality_your_information"
npx playwright test --grep "@checkout_functionality_overview_and_complete"

# Executar tag específica em navegador específico
npx playwright test --project chromium --grep "@products"
npx playwright test --project firefox --grep "@checkout_consistency"
```

### CI/CD

Os testes são executados automaticamente a cada push e pull request para as branches `main`/`master`. O pipeline executa todos os 53 testes nos navegadores Chromium, Firefox e WebKit com 2 retries em caso de falha. Relatórios e artefatos de vídeo ficam disponíveis por 30 dias como artefatos do GitHub Actions.

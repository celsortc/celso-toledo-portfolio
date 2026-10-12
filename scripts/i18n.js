/* All public copy lives here. Only the two trusted headline strings contain HTML. */
(() => {
  const messages = {
    en: {
      skip: "Skip to content",
      navigation: "Main navigation",
      language: "Language",
      navWork: "Projects",
      navAbout: "About",
      navContact: "Contact",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      menuTitle: "Navigation menu",
      themeLight: "Use light theme",
      themeDark: "Use dark theme",
      heroTagline: "Turning everyday problems into useful software.",
      role: "Software Developer",
      heroTitle: "Software<br>with purpose.",
      heroDescription:
        "I’m Celso. I turn everyday problems into simpler solutions through code, curiosity and a little persistence.",
      viewWork: "Explore my projects",
      talk: "Let’s talk",
      artCaption: "Small parts. A bigger picture.",
      scroll: "A little further down",
      heroStack: "Built with HTML, CSS & JavaScript",
      workTitle: "Learning by building.",
      workIntro:
        "Real problems, hands-on projects. Here’s what I’ve been working on.",
      personal: "Personal project",
      academic: "Academic team project",
      inDevelopment: "In development",
      technologies: "Technologies",
      viewCode: "View source code",
      projectDetails: "The problem & what I’m learning",
      axisDescription:
        "A clearer view of everyday finances. A web app for recording income and expenses, organizing transactions by category and filtering your history.",
      axisProblem:
        "I started Axis because I wanted to understand where my money was going. Building it on my own has meant learning how to organize JavaScript modules, validate input and keep filters consistent as transactions change.",
      axisNext:
        "Transactions are saved locally in the browser. The financial overview currently uses sample values; dynamic totals, editable budget percentages and a database are next steps.",
      doaeDescription:
        "An inventory project with a social purpose: helping NGOs organize donated goods. Built as a team project, starting with item registration and a desktop interface.",
      doaeProblem:
        "Donation inventory needs a clear record of what comes in and what goes out. I’m part of the development team, learning to model items in Java and build a solution around that need.",
      doaeNext:
        "The current prototype registers and lists items in memory, with an initial Swing interface. MySQL persistence, stock movements and donor management are planned.",
      conceptCaption: "Concept illustration · sample data",
      doaeCaption: "Concept illustration · donation inventory",
      previewTransactions: "Your transactions",
      previewSalary: "Salary",
      previewIncome: "Income",
      previewRent: "Rent",
      previewFixed: "Fixed costs",
      previewCourse: "Course",
      previewKnowledge: "Learning",
      previewOrganized: "Organized by category",
      previewSaved: "Saved in your browser",
      aboutLabel: "The person behind the code",
      aboutTitle: "Curiosity first.<br>Code follows.",
      aboutLead:
        "I like understanding how things work. Even more, I like finding a way to make them work better.",
      aboutBody:
        "I’m a software developer and a Systems Analysis and Development student at Facens. My professional experience brought me close to real users, technical problems and opportunities to simplify everyday processes.",
      aboutFocus:
        "Today I build for the web, study React and work on an academic project with Java and MySQL. I’m growing toward fullstack development, with a particular interest in back-end.",
      skillsTitle: "What I work with",
      web: "Web development",
      learning: "Building & learning",
      toolkit: "Along the way",
      experienceTitle: "From problems to progress.",
      experienceIntro: "The experience that shapes the way I build.",
      experienceDate: "Jun 2022 — present",
      experienceType: "Professional experience",
      experienceRole: "Assistant · Department of Education",
      organization: "Municipality of Cesário Lange",
      experienceBody:
        "Supporting users and solving technical problems gave me a practical view of how technology can help people. I built an invoice registration solution with AppSheet and Google Sheets to simplify data entry and make information easier to find.",
      experienceCallout:
        "A repetitive task became a simpler process. That’s the kind of problem I enjoy solving.",
      education: "Always learning",
      degree: "Systems Analysis & Development",
      educationDate: "2026 — expected Jul 2028",
      reactStudy: "Currently deepening my knowledge of React.",
      spoken: "Portuguese & fluent English",
      opportunities: "Open to new opportunities",
      contactTitle: "Let’s build<br>something useful.",
      contactBody:
        "Have a project in mind or a place on your team? I’d love to hear about it.",
      copyEmail: "Copy email address",
      availability: "Remote, hybrid or on-site · Sorocaba & São Paulo",
      footerNote: "Made with curiosity. And code.",
      motionOff: "Pause animations",
      motionOn: "Enable animations",
      motionReduced: "Reduced motion enabled",
      motionUnavailable: "Animations unavailable",
      copied: "Email address copied.",
      copyFailed: "Select and copy the email address above.",
      backTop: "Back to top",
      pageTitle: "Celso Toledo — Software Developer",
      pageDescription:
        "Celso Toledo — Software Developer. Projects, experience and a curiosity for solving real problems with code.",
      homeLabel: "Celso Toledo, home",
    },
    pt: {
      skip: "Pular para o conteúdo",
      navigation: "Navegação principal",
      language: "Idioma",
      navWork: "Projetos",
      navAbout: "Sobre",
      navContact: "Contato",
      menuOpen: "Abrir menu",
      menuClose: "Fechar menu",
      menuTitle: "Menu de navegação",
      themeLight: "Usar tema claro",
      themeDark: "Usar tema escuro",
      heroTagline: "Transformando problemas do dia a dia em software útil.",
      role: "Desenvolvedor de software",
      heroTitle: "Software<br>com propósito.",
      heroDescription:
        "Sou o Celso. Transformo problemas do dia a dia em soluções mais simples com código, curiosidade e um pouco de persistência.",
      viewWork: "Conheça meus projetos",
      talk: "Vamos conversar",
      artCaption: "Pequenas partes. Um todo maior.",
      scroll: "Um pouco mais abaixo",
      heroStack: "Feito com HTML, CSS e JavaScript",
      workTitle: "Aprender construindo.",
      workIntro:
        "Problemas reais, projetos na prática. Veja o que estou desenvolvendo.",
      personal: "Projeto pessoal",
      academic: "Projeto acadêmico em equipe",
      inDevelopment: "Em desenvolvimento",
      technologies: "Tecnologias",
      viewCode: "Ver código-fonte",
      projectDetails: "O problema e o que estou aprendendo",
      axisDescription:
        "Mais clareza nas finanças do dia a dia. Uma aplicação web para registrar entradas e saídas, organizar lançamentos por categoria e filtrar o histórico.",
      axisProblem:
        "Comecei o Axis para entender para onde meu dinheiro estava indo. Desenvolver o projeto sozinho me fez aprender a organizar módulos JavaScript, validar dados e manter os filtros consistentes quando os lançamentos mudam.",
      axisNext:
        "Os lançamentos são salvos localmente no navegador. O resumo financeiro ainda usa valores de exemplo; totais dinâmicos, percentuais de orçamento editáveis e banco de dados são próximos passos.",
      doaeDescription:
        "Um projeto de estoque com propósito social: ajudar ONGs a organizar doações. Desenvolvido em equipe, começando pelo cadastro de itens e uma interface desktop.",
      doaeProblem:
        "Organizar doações exige clareza sobre o que entra e o que sai. Integro a equipe de desenvolvimento, aprendendo a modelar itens em Java e construir uma solução para essa necessidade.",
      doaeNext:
        "O protótipo atual cadastra e lista itens em memória, com uma interface inicial em Swing. Persistência em MySQL, movimentações de estoque e gestão de doadores estão planejadas.",
      conceptCaption: "Ilustração conceitual · dados de exemplo",
      doaeCaption: "Ilustração conceitual · estoque de doações",
      previewTransactions: "Seus lançamentos",
      previewSalary: "Salário",
      previewIncome: "Entrada",
      previewRent: "Aluguel",
      previewFixed: "Custos fixos",
      previewCourse: "Curso",
      previewKnowledge: "Conhecimento",
      previewOrganized: "Organizado por categoria",
      previewSaved: "Salvo no navegador",
      aboutLabel: "A pessoa por trás do código",
      aboutTitle: "Primeiro, curiosidade.<br>Depois, código.",
      aboutLead:
        "Gosto de entender como as coisas funcionam. E, mais ainda, de encontrar um jeito de fazê-las funcionar melhor.",
      aboutBody:
        "Sou desenvolvedor de software e estudante de Análise e Desenvolvimento de Sistemas na Facens. Minha experiência profissional me aproximou de usuários reais, problemas técnicos e oportunidades de simplificar processos do dia a dia.",
      aboutFocus:
        "Hoje desenvolvo para a web, estudo React e participo de um projeto acadêmico com Java e MySQL. Quero ampliar minha atuação em desenvolvimento fullstack, com especial interesse por back-end.",
      skillsTitle: "Com o que trabalho",
      web: "Desenvolvimento web",
      learning: "Construindo e aprendendo",
      toolkit: "Ao longo do caminho",
      experienceTitle: "De problemas a melhorias.",
      experienceIntro: "A experiência que influencia meu jeito de construir.",
      experienceDate: "Jun 2022 — atualmente",
      experienceType: "Experiência profissional",
      experienceRole: "Assistente · Secretaria de Educação",
      organization: "Prefeitura Municipal de Cesário Lange",
      experienceBody:
        "Apoiar usuários e resolver problemas técnicos me deu uma visão prática de como a tecnologia pode ajudar as pessoas. Criei uma solução de cadastro de notas fiscais com AppSheet e Google Sheets para simplificar o registro e facilitar a consulta de informações.",
      experienceCallout:
        "Uma tarefa repetitiva virou um processo mais simples. É esse tipo de problema que gosto de resolver.",
      education: "Sempre aprendendo",
      degree: "Análise e Desenvolvimento de Sistemas",
      educationDate: "2026 — conclusão prevista em jul 2028",
      reactStudy: "Atualmente aprofundando meus conhecimentos em React.",
      spoken: "Português e inglês fluente",
      opportunities: "Aberto a novas oportunidades",
      contactTitle: "Vamos construir<br>algo útil.",
      contactBody:
        "Tem um projeto em mente ou um lugar na sua equipe? Quero conhecer a oportunidade.",
      copyEmail: "Copiar endereço de e-mail",
      availability: "Remoto, híbrido ou presencial · Sorocaba e São Paulo",
      footerNote: "Feito com curiosidade. E código.",
      motionOff: "Pausar animações",
      motionOn: "Ativar animações",
      motionReduced: "Movimento reduzido ativado",
      motionUnavailable: "Animações indisponíveis",
      copied: "Endereço de e-mail copiado.",
      copyFailed: "Selecione e copie o endereço de e-mail acima.",
      backTop: "Voltar ao início",
      pageTitle: "Celso Toledo — Desenvolvedor de software",
      pageDescription:
        "Celso Toledo — Desenvolvedor de software. Projetos, experiência e curiosidade para resolver problemas reais com código.",
      homeLabel: "Celso Toledo, início",
    },
  };

  let language = "en";
  try {
    const saved = localStorage.getItem("portfolio-language");
    if (Object.hasOwn(messages, saved)) language = saved;
  } catch {
    /* Storage is optional. */
  }

  function translate(key) {
    return messages[language][key] ?? messages.en[key] ?? key;
  }
  function setLanguage(next) {
    if (!Object.hasOwn(messages, next)) return;
    language = next;
    document.documentElement.lang = next === "pt" ? "pt-BR" : "en";
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = translate(element.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
      element.innerHTML = translate(element.dataset.i18nHtml);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
      element.setAttribute("aria-label", translate(element.dataset.i18nAria));
    });
    document.querySelectorAll("[data-lang]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.lang === next));
    });
    document.title = translate("pageTitle");
    document.querySelector('meta[name="description"]').content =
      translate("pageDescription");
    document
      .querySelector(".brand")
      .setAttribute("aria-label", translate("homeLabel"));
    document.querySelector(".copy-status").textContent = "";
    try {
      localStorage.setItem("portfolio-language", next);
    } catch {
      /* Private browsing still works. */
    }
    document.dispatchEvent(
      new CustomEvent("portfolio:languagechange", { detail: next }),
    );
  }

  document
    .querySelectorAll("[data-lang]")
    .forEach((button) =>
      button.addEventListener("click", () => setLanguage(button.dataset.lang)),
    );
  window.portfolioI18n = { translate, setLanguage };
  setLanguage(language);
})();

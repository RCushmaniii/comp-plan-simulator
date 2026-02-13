export type Locale = "en" | "es";

export const translations = {
  en: {
    // Header
    title: "Compensation Plan Simulator",
    subtitle: "Model commission structures and see financial impact in real time",

    // Tabs
    tabConfigure: "Configure",
    tabCompare: "Compare",

    // Plan toggle
    currentPlan: "Current Plan",
    proposedPlan: "Proposed Plan",

    // Tier names
    tierConsultant: "Consultant",
    tierLeader: "Leader",
    tierLoL: "Leader of Leaders",

    // Tier configurator labels
    personalDiscount: "Personal Discount",
    overrideRate: "Override Rate",
    overrideDepth: "Override Depth",
    minPersonalVolume: "Min Personal Volume",
    minTeamVolume: "Min Team Volume",
    minRecruits: "Min Recruits",

    // Network params
    networkParams: "Network Parameters",
    headcount: "Headcount",
    avgMonthlySales: "Avg Monthly Sales",
    growthRate: "Monthly Growth Rate",
    promotionRate: "Promotion Rate",
    attritionRate: "Attrition Rate",

    // KPI labels
    totalRevenue: "Total Revenue",
    totalPayout: "Total Payout",
    companyMargin: "Company Margin",
    marginPercent: "Margin %",
    avgConsultantPayout: "Avg Consultant Payout",
    avgLeaderPayout: "Avg Leader Payout",
    avgLoLPayout: "Avg LoL Payout",
    payoutRatio: "Payout Ratio",

    // Charts
    payoutDistribution: "Payout Distribution",
    revenueWaterfall: "Revenue Waterfall",
    breakEvenAnalysis: "Break-Even Analysis",
    grossRevenue: "Gross Revenue",
    consultantDiscounts: "Consultant Discounts",
    leaderOverrides: "Leader Overrides",
    lolOverrides: "LoL Overrides",
    netMargin: "Net Margin",
    volume: "Volume (units)",
    costCurve: "Cost",

    // Comparison
    metric: "Metric",
    current: "Current",
    proposed: "Proposed",
    delta: "Delta",
    deltaPercent: "Delta %",
    noCrossover: "No crossover within range",
    breakEvenAt: (vol: string) => `Break-even at ${vol} volume`,

    // Presets
    presetsLabel: "Presets",
    presetDefault: "Current Default",
    presetDefaultDesc: "Standard balanced compensation structure",
    presetAggressive: "Aggressive Overrides",
    presetAggressiveDesc: "Higher overrides to incentivize leadership",
    presetFlat: "Flat Structure",
    presetFlatDesc: "Minimal tier differentiation, lower overrides",
    presetHighGrowth: "High Growth",
    presetHighGrowthDesc: "Optimized for rapid network expansion",

    // Assumptions banner
    assumptionsBanner: "Demo Mode — All data shown is illustrative. Not based on any real company's compensation plan.",

    // Export
    shareLink: "Share Link",
    resetAll: "Reset All",
    linkCopied: "Link copied!",

    // Footer
    builtBy: "Built by",
    tagline: "AI Integration & Software Development Consulting",

    // Misc
    perMonth: "/mo",
    levels: "levels",
    financialDashboard: "Financial Dashboard",
  },
  es: {
    // Header
    title: "Simulador de Plan de Compensación",
    subtitle: "Modele estructuras de comisiones y vea el impacto financiero en tiempo real",

    // Tabs
    tabConfigure: "Configurar",
    tabCompare: "Comparar",

    // Plan toggle
    currentPlan: "Plan Actual",
    proposedPlan: "Plan Propuesto",

    // Tier names
    tierConsultant: "Consultor",
    tierLeader: "Líder",
    tierLoL: "Líder de Líderes",

    // Tier configurator labels
    personalDiscount: "Descuento Personal",
    overrideRate: "Tasa de Override",
    overrideDepth: "Profundidad de Override",
    minPersonalVolume: "Volumen Personal Mín",
    minTeamVolume: "Volumen de Equipo Mín",
    minRecruits: "Reclutas Mín",

    // Network params
    networkParams: "Parámetros de Red",
    headcount: "Personal",
    avgMonthlySales: "Ventas Mensuales Prom",
    growthRate: "Tasa de Crecimiento Mensual",
    promotionRate: "Tasa de Promoción",
    attritionRate: "Tasa de Deserción",

    // KPI labels
    totalRevenue: "Ingresos Totales",
    totalPayout: "Pago Total",
    companyMargin: "Margen de la Empresa",
    marginPercent: "% de Margen",
    avgConsultantPayout: "Pago Prom Consultor",
    avgLeaderPayout: "Pago Prom Líder",
    avgLoLPayout: "Pago Prom LdL",
    payoutRatio: "Ratio de Pago",

    // Charts
    payoutDistribution: "Distribución de Pagos",
    revenueWaterfall: "Cascada de Ingresos",
    breakEvenAnalysis: "Análisis de Punto de Equilibrio",
    grossRevenue: "Ingresos Brutos",
    consultantDiscounts: "Descuentos de Consultores",
    leaderOverrides: "Overrides de Líderes",
    lolOverrides: "Overrides de LdL",
    netMargin: "Margen Neto",
    volume: "Volumen (unidades)",
    costCurve: "Costo",

    // Comparison
    metric: "Métrica",
    current: "Actual",
    proposed: "Propuesto",
    delta: "Delta",
    deltaPercent: "Delta %",
    noCrossover: "Sin cruce dentro del rango",
    breakEvenAt: (vol: string) => `Punto de equilibrio en volumen ${vol}`,

    // Presets
    presetsLabel: "Presets",
    presetDefault: "Predeterminado Actual",
    presetDefaultDesc: "Estructura de compensación estándar equilibrada",
    presetAggressive: "Overrides Agresivos",
    presetAggressiveDesc: "Overrides más altos para incentivar el liderazgo",
    presetFlat: "Estructura Plana",
    presetFlatDesc: "Diferenciación mínima de niveles, overrides bajos",
    presetHighGrowth: "Alto Crecimiento",
    presetHighGrowthDesc: "Optimizado para expansión rápida de la red",

    // Assumptions banner
    assumptionsBanner: "Modo Demo — Todos los datos son ilustrativos. No se basa en el plan de compensación de ninguna empresa real.",

    // Export
    shareLink: "Compartir Enlace",
    resetAll: "Restablecer Todo",
    linkCopied: "¡Enlace copiado!",

    // Footer
    builtBy: "Construido por",
    tagline: "Consultoría de Integración de IA y Desarrollo de Software",

    // Misc
    perMonth: "/mes",
    levels: "niveles",
    financialDashboard: "Panel Financiero",
  },
};

export type Translations = (typeof translations)["en"];

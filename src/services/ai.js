export async function gerarCarrossel({ apiKey, pageName, niche, theme, reference, referenceImage }) {
  const prompt = `
Você é um especialista em criação de conteúdos para redes sociais, com foco em carrosséis para Instagram.
Crie um carrossel atraente e estratégico.
- Página: ${pageName}
- Nicho: ${niche}
- Tema: ${theme}
${reference ? `- Modelo de Referência para seguir a estrutura/estilo:\n${reference}` : ''}
${referenceImage ? `- A imagem anexada a esta mensagem é um modelo de referência visual. Analise o estilo do conteúdo nela para se inspirar e crie o texto seguindo a mesma pegada lógica ou visual observada nela.` : ''}

REGRAS OBRIGATÓRIAS:
- Retorne APENAS um objeto JSON. Você não pode retornar nenhum texto fora do JSON.
- O formato JSON deve seguir EXATAMENTE esta estrutura:
{
  "titulo": "Título Principal / Nome do Carrossel (usado apenas internamente)",
  "legenda": "Texto persuasivo para a legenda do post (caption), incluindo hashtags e CTA final. Utilize quebra de linhas adequadas.",
  "slides": [
    {
      "titulo": "Texto principal em destaque do slide (Ex: gancho no slide 1)",
      "texto": "Texto de apoio/desenvolvimento (opcional, deixe vazio se não houver)",
      "notaAdicional": "Idéia visual ou nota para o designer do post (opcional)"
    }
  ]
}
- O carrossel deve ter começo forte, desenvolvimento e final com CTA.
- Adapte a linguagem ao público.
`;

  let contentPayload;
  let modelToUse = "llama-3.3-70b-versatile";

  if (referenceImage) {
    modelToUse = "llama-3.2-90b-vision-preview";
    contentPayload = [
      { type: "text", text: prompt },
      { type: "image_url", image_url: { url: referenceImage } }
    ];
  } else {
    contentPayload = prompt;
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey.trim()}`
    },
    body: JSON.stringify({
      model: modelToUse,
      messages: [{ role: "user", content: contentPayload }],
      response_format: { type: "json_object" },
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || 'Falha ao gerar carrossel com a IA.');
  }

  const data = await response.json();
  const resultString = data.choices[0].message.content;
  return JSON.parse(resultString);
}

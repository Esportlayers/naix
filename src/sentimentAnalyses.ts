import language from '@google-cloud/language';
const client = new language.LanguageServiceClient();

export async function sentimentAnalyses(content: string): Promise<{
    score: number,
    magnitude: number,
}> {
    const [result] = await client.analyzeSentiment({document: {
        content,
        type: 'PLAIN_TEXT',
    }, encodingType: 'UTF8'});

    return {
        score: result?.documentSentiment?.score ?? 0,
        magnitude: result?.documentSentiment?.magnitude ?? 0,
    };
}
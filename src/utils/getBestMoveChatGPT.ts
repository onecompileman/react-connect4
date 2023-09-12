import { DiscType } from 'constants/DiscType';
import OpenAI from 'openai';

const apiKey = <string>process.env.OPENAI_API_KEY;
const openai = initOpenAI(apiKey);

export async function getBestMoveChatGPT(
  gameBoard: string[][],
  aiDiscType: DiscType
): Promise<number> {
  const gameBoardString = JSON.stringify(gameBoard);
  const message = `
    We are playing connect 4, you are ${aiDiscType}.
    Return the column index where you put your move, don't explain anything, just return the number.
    Board below: 
    ${gameBoardString}
  `;

  const chatCompletion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: message }],
  });

  return +chatCompletion.choices[0].message;
}

function initOpenAI(apiKey: string): OpenAI {
  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,
  });
}

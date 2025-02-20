import { createOpenAI } from '@ai-sdk/openai';
import { Controller, Post, Res } from '@nestjs/common';
import { pipeDataStreamToResponse, streamText } from 'ai';
import { Response } from 'express';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://aihubmix.com/v1',
});

console.log('this.openai', process.env.OPENAI_API_KEY);

@Controller()
export class AppController {
  @Post('/')
  async root(@Res() res: Response) {
    const result = streamText({
      model: openai('gpt-4o-mini'),
      prompt: 'Invent a new holiday and describe its traditions.',
    });

    result.pipeDataStreamToResponse(res);
  }

  @Post('/stream-data')
  async streamData(@Res() res: Response) {
    pipeDataStreamToResponse(res, {
      execute: async (dataStreamWriter) => {
        dataStreamWriter.writeData('initialized call');

        const result = streamText({
          model: openai('gpt-4o-mini'),
          prompt: '你好',
        });

        result.mergeIntoDataStream(dataStreamWriter);
      },
      onError: (error) => {
        console.error(error);
        // Error messages are masked by default for security reasons.
        // If you want to expose the error message to the client, you can do so here:
        return error instanceof Error ? error.message : String(error);
      },
    });
  }
}

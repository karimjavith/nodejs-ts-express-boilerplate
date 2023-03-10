process.env.PORT = '3001';
import express from 'express';
import { Server } from 'net';
import { startServer } from '@server/index';

describe('Index', () => {
  beforeEach(() =>
    jest.mock('@server/app', () => ({
      createServer: jest.fn().mockReturnValue(express()),
    })),
  );
  let server: Server;
  it('should test the express server setup and server respond with listen', async () => {
    const listen = jest.spyOn(Server.prototype, 'listen');
    await startServer();
    expect(listen).toBeCalled();
    server = listen.mock.results[0].value as Server;
    setImmediate(() => server.close());
  });
});

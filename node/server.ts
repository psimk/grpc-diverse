import * as grpc from 'grpc';
import { HelloMonasteryService, IHelloMonasteryServer, Monk } from './stubs';

const rpc: IHelloMonasteryServer = {
  sayHelloMonk: (_, send) => {
    const res = new Monk();

    res.setName('Paul');
    res.setMessage("Let's use gRPC!");

    send(null, res);
  },

  sayHelloMonks: (stream) => {
    const { request } = stream;
    let id: NodeJS.Timeout;
    const delay = request.getDelay() || 100;
    const res = new Monk();
    let requestNumber = 0;

    res.setName('Paul');
    res.setMessage("Let's use gRPC on Node!");

    const writeHello = () => {
      requestNumber += 1;
      res.setRequestNumber(requestNumber);
      stream.write(res);
    };
    const handleError = (err: Error) => {
      clearInterval(id);
      console.log(err);
      stream.end();
    };

    id = setInterval(writeHello, delay);
    stream.on('error', handleError);
  },
};

const createServer = (lifeTime: number, onShutDown = () => {}) => {
  const port = '9099';
  const host = `0.0.0.0:${port}`;

  const server = new grpc.Server();

  server.addService(HelloMonasteryService, rpc);
  server.bind(host, grpc.ServerCredentials.createInsecure());

  server.start();
  console.log(`Running on ${host}`);

  setTimeout(() => server.tryShutdown(onShutDown), lifeTime * 1000);
};

createServer(60, () => console.log('Server has shut down..'));

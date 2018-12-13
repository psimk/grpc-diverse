import * as grpc from 'grpc';
import { HelloMonasteryClient, UnaryRequest, StreamRequest, Monk } from './stubs';

const port = '9099';
const host = `0.0.0.0:${port}`;

const client = new HelloMonasteryClient(host, grpc.credentials.createInsecure());
const metaData = new grpc.Metadata();

const sayHello = () => {
  const request = new UnaryRequest();

  client.sayHelloMonk(request, metaData, (err, res) => {
    if (err) return console.error(err);
    console.log(res.toObject());
  });
};

const sayHelloStream = () => {
  const request = new StreamRequest();
  request.setDelay(500);

  const stream = client.sayHelloMonks(request, metaData);

  const readHello = (chunk: Monk) => console.log(chunk.toObject());

  stream.on('data', readHello);
};

sayHello();
sayHelloStream();

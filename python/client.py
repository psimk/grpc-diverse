from __future__ import print_function

import grpc

import hello_monk_pb2_grpc
import hello_monk_pb2


def run():
    port = 9091
    host = "0.0.0.0:" + str(port)

    with grpc.insecure_channel(host) as channel:
        stub = hello_monk_pb2_grpc.HelloMonasteryStub(channel)

        response = stub.SayHelloMonk(hello_monk_pb2.UnaryRequest())
        print(response)

        monks = stub.SayHelloMonks(hello_monk_pb2.StreamRequest(delay=1000))
        for monk in monks:
            print(monk)


if __name__ == '__main__':
    run()

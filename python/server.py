from concurrent import futures
import time

import grpc

import hello_monk_pb2_grpc
import hello_monk_pb2

_ONE_DAY_IN_SECONDS = 60 * 60 * 24


class Greeter(hello_monk_pb2_grpc.HelloMonasteryServicer):
    def SayHelloMonk(self, request, context):
        return hello_monk_pb2.Monk(name="Paul", message="Let's use gRPC on Python!")

    def SayHelloMonks(self, request, context):
        request_number = 0

        while True:
            request_number += 1
            new_monk = hello_monk_pb2.Monk(
                name="Paul", message="Let's use gRPC on Python!", request_number=request_number)

            print(request_number)

            yield new_monk
            time.sleep(request.delay / 1000)


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    port = 9091
    host = "0.0.0.0:" + str(port)

    hello_monk_pb2_grpc.add_HelloMonasteryServicer_to_server(Greeter(), server)
    server.add_insecure_port(host)
    server.start()

    print("Running on %s" % host)

    try:
        while True:
            time.sleep(_ONE_DAY_IN_SECONDS)
    except KeyboardInterrupt:
        server.stop(0)


if __name__ == '__main__':
    serve()

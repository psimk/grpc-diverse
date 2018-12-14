# #!/bin/sh
OUT_DIR="."

# TODO: Figure out a better way to remove and store generated files
rm ./hello_monk_pb2_grpc.py
rm ./hello_monk_pb2.py

# Generate Python for protobuf
python3 -m grpc_tools.protoc \
  --python_out="${OUT_DIR}" \
  --grpc_python_out="${OUT_DIR}" \
  -I=../protos \
  ../protos/*.proto
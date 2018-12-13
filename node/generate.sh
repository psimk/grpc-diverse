# #!/bin/sh
PROTOC_PLUGIN_PATH="node_modules/.bin/grpc_tools_node_protoc_plugin"
PROTOC_PLUGIN_GRPC_TS_PATH="node_modules/grpc_tools_node_protoc_ts/bin/protoc-gen-ts"

OUT_DIR="generated"

rm -rf $OUT_DIR

mkdir -p ${OUT_DIR}

# Generate JS for protobuf
protoc \
  --js_out="import_style=commonjs,binary:${OUT_DIR}" \
  -I=../proto \
  ../proto/*.proto

# Generate JS GRPC Stubs
protoc \
  --plugin="protoc-gen-grpc=${PROTOC_PLUGIN_PATH}" \
  --grpc_out="${OUT_DIR}" \
  -I=../proto \
  ../proto/*.proto

# TS Type definitions for protobuf and GRPC stubs
protoc \
  --plugin="protoc-gen-grpc=${PROTOC_PLUGIN_GRPC_TS_PATH}" \
  --grpc_out="${OUT_DIR}" \
  -I=../proto \
  ../proto/*.proto
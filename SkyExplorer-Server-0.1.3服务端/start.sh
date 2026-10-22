#!/usr/bin/env sh
set -eu
cd -- "$(dirname -- "$0")"
SERVER_JAVA=java
if [ -n "${JAVA_HOME:-}" ]; then SERVER_JAVA="$JAVA_HOME/bin/java"; fi
exec "$SERVER_JAVA" @user_jvm_args.txt @libraries/net/neoforged/neoforge/21.1.249/unix_args.txt nogui

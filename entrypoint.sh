#!/bin/sh
# entrypoint.sh
FILTER_CMD=""
COMMAND=${COMMAND:-start}  # Default to 'start' if no command specified

if [ -n "$FILTERS" ]; then
    for filter in $FILTERS; do
        FILTER_CMD="$FILTER_CMD --filter $filter"
    done
fi

exec pnpm $FILTER_CMD $COMMAND
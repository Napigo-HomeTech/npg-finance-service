FROM node

WORKDIR /app


ENTRYPOINT ["./scripts/entrypoint.sh"]
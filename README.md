# Remix Template

## DB立ち上げる
1. `cd db`
2. `pnpm install`
4. `pnpm prisma generate`
5. `docker-compose up`

## Webアプリ立ち上げる
1. `cd web`
2. `pnpm dev`
デフォルトでは`localhost:5173`に立ち上がる。

## Prisma Studioを立ち上げる
1. `cd db`
2. `pnpm prisma studio`

## DBにseedを適用する
1. `cd db`
2. `pnpm prisma db seed`

## DBのSchemaを変更する
1. `db/prisma/schema.prisma` を変更する
2. `pnpm prisma migrate dev`
3. `pnpm prisma generate`
※Webで型推論が更新されなかったら、`Reload Window`などする。
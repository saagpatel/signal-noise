.PHONY: dev build test typecheck lint clean install

# pnpm project (packageManager pnpm@11.5.2).
install:
	pnpm install --frozen-lockfile

dev:
	pnpm dev

build:
	pnpm build

test:
	pnpm test

lint:
	pnpm lint

typecheck:
	pnpm typecheck

clean:
	rm -rf node_modules out .next

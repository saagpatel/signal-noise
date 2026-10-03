.PHONY: dev build test typecheck clean install

# pnpm project (packageManager pnpm@11.5.2). No lint target: the `lint` script
# calls `next lint`, which Next.js 16 removed.
install:
	pnpm install --frozen-lockfile

dev:
	pnpm dev

build:
	pnpm build

test:
	pnpm test

typecheck:
	pnpm typecheck

clean:
	rm -rf node_modules out .next

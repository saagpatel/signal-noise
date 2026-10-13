.PHONY: dev build test typecheck lint check clean install

check:
	@if ! command -v node >/dev/null 2>&1 || ! command -v pnpm >/dev/null 2>&1; then echo "Install Node.js from .node-version and pnpm from packageManager, then run make check."; exit 1; fi
	pnpm check

# pnpm project (packageManager pnpm@11.28.5).
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

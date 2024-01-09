FROM lukemathwalker/cargo-chef:latest-rust-slim AS chef
WORKDIR /app

# Planner
FROM chef AS planner
COPY . .
RUN cargo chef prepare --recipe-path recipe.json

# Builder
FROM chef AS builder 
COPY --from=planner /app/recipe.json recipe.json
RUN rustup toolchain install nightly
RUN cargo +nightly chef cook --release --recipe-path recipe.json
COPY . .
RUN cargo build --release --bin cinemazarelos

# Runner
FROM debian:stable-slim AS runner
WORKDIR /app
COPY --from=builder /app/target/release/cinemazarelos /usr/local/bin
ENTRYPOINT ["/usr/local/bin/cinemazarelos"]

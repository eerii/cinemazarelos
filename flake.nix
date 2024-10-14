{
  description = "A Nix-flake-based Rust development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

    rust-overlay = {
      url = "github:oxalica/rust-overlay";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      nixpkgs,
      rust-overlay,
      flake-utils,
      ...
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        overlays = [ (import rust-overlay) ];
        pkgs = import nixpkgs { inherit system overlays; };
        toolchain = pkgs.rust-bin.nightly.latest.default.override {
          extensions = [
            "clippy"
            "rustfmt"
            "rust-src"
            "rust-analyzer"
          ];
        };
      in
      {
        devShells.default =
          with pkgs;
          mkShell rec {
            buildInputs = [
              openssl
              perl
              pkg-config
              cargo-watch
              imagemagick
              toolchain
            ];

            RUST_SRC_PATH = "${toolchain}/lib/rustlib/src/rust/library";
            LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath buildInputs;
          };
      }
    );
}
